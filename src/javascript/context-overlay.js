AUI.add('context-overlay', function(A) {

var L = A.Lang,
	isString = L.isString,
	isNumber = L.isNumber,
	isObject = L.isObject,

	ALIGN = 'align',
	BL = 'bl',
	CONTEXT_OVERLAY = 'contextoverlay',
	CURRENT_NODE = 'currentNode',
	HIDE = 'hide',
	HIDE_DELAY = 'hideDelay',
	HIDE_ON = 'hideOn',
	SHOW = 'show',
	SHOW_DELAY = 'showDelay',
	SHOW_ON = 'showOn',
	TL = 'tl',
	TRIGGER = 'trigger',
	VISIBLE = 'visible';

function ContextOverlay(config) {
	var instance = this;

	instance._hideTask = new A.DelayedTask(instance.hide, instance);
	instance._showTask = new A.DelayedTask(instance.show, instance);

	instance._showCallback = null;
	instance._hideCallback = null;

 	ContextOverlay.superclass.constructor.apply(this, arguments);
}

A.mix(ContextOverlay, {
	NAME: CONTEXT_OVERLAY,

	ATTRS: {
		align: {
            value: { node: null, points: [ TL, BL ] }
        },

		currentNode: {
			valueFn: function() {
				// define default currentNode as the first item from trigger
				return this.get(TRIGGER).item(0);
			}
		},

		delay: {
			value: null,
			validator: isObject
		},

		hideOn: {
			lazyAdd: false,
			value: 'mouseout',
			validator: isString,
			setter: function(v) {
				return this._setHideOn(v);
			}
		},

		hideDelay: {
			value: 0
		},

		showOn: {
			lazyAdd: false,
			value: 'mouseover',
			validator: isString,
			setter: function(v) {
				return this._setShowOn(v);
			}
		},

		showDelay: {
			value: 0,
			validator: isNumber
		},

		trigger: {
			lazyAdd: false,
			setter: function(v) {
				return A.all(v);
			}
		},

		visible: {
			value: false
		}
	}
});

A.extend(ContextOverlay, A.Overlay, {
	/*
	* Lifecycle
	*/
	bindUI: function(){
		var instance = this;

		instance.before('triggerChange', instance._beforeTriggerChange);
		instance.before('showOnChange', instance._beforeShowOnChange);
		instance.before('hideOnChange', instance._beforeHideOnChange);

		instance.after('triggerChange', instance._afterTriggerChange);
		instance.after('showOnChange', instance._afterShowOnChange);
		instance.after('hideOnChange', instance._afterHideOnChange);
	},

	/*
	* Methods
	*/
	hide: function() {
		var instance = this;

		instance.clearIntervals();

		instance.fire('hide');

		ContextOverlay.superclass.hide.apply(instance, arguments);
	},

	show: function(event) {
		var instance = this;
		var align = instance.get(ALIGN);
		var currentTarget = null;

		if (event) {
			currentTarget = event.currentTarget;
		}

		var node = align.node || currentTarget;

		if (node) {
			instance.set(CURRENT_NODE, node);
		}

		instance.clearIntervals();

		instance.refreshAlign();

		instance.fire('show');

		ContextOverlay.superclass.show.apply(instance, arguments);
	},

	toggle: function(event) {
		var instance = this;

		if (instance.get(VISIBLE)) {
			instance._hideTask.delay( instance.get(HIDE_DELAY), null, null, [event] );
		}
		else {
			instance._showTask.delay( instance.get(SHOW_DELAY), null, null, [event] );
		}
	},

	clearIntervals: function() {
		this._hideTask.cancel();
		this._showTask.cancel();
	},

	refreshAlign: function() {
		var instance = this;
		var align = instance.get(ALIGN);
		var currentNode = instance.get(CURRENT_NODE);

		if (currentNode) {
			instance._uiSetAlign(currentNode, align.points);
		}
	},

	_toggle: function(event) {
		var instance = this;
		var currentTarget = event.currentTarget;

		// check if the target is different and simulate a .hide() before toggle
		if (instance._lastTarget != currentTarget) {
			instance.hide();
		}

		instance.toggle(event);

		event.halt();

		instance._lastTarget = currentTarget;
	},

	/*
	* Attribute Listeners
	*/
	_afterShowOnChange: function(event) {
		var instance = this;
		var wasToggle = event.prevVal == instance.get(HIDE_ON);

		if (wasToggle) {
			var trigger = instance.get(TRIGGER);

			// if wasToggle remove the toggle callback
			trigger.detach(event.prevVal, instance._hideCallback);
			// and re attach the hide event
			instance._setHideOn( instance.get(HIDE_ON) );
		}
	},

	_afterHideOnChange: function(event) {
		var instance = this;
		var wasToggle = event.prevVal == instance.get(SHOW_ON);

		if (wasToggle) {
			var trigger = instance.get(TRIGGER);

			// if wasToggle remove the toggle callback
			trigger.detach(event.prevVal, instance._showCallback);
			// and re attach the show event
			instance._setShowOn( instance.get(SHOW_ON) );
		}
	},

	_afterTriggerChange: function(event) {
		var instance = this;

		instance._setShowOn( instance.get(SHOW_ON) );
		instance._setHideOn( instance.get(HIDE_ON) );
	},

	_beforeShowOnChange: function(event) {
		var instance = this;
		var trigger = instance.get(TRIGGER);

		// detach the old callback
		trigger.detach(event.prevVal, instance._showCallback);
	},

	_beforeHideOnChange: function(event) {
		var instance = this;
		var trigger = instance.get(TRIGGER);

		// detach the old callback
		trigger.detach(event.prevVal, instance._hideCallback);
	},

	_beforeTriggerChange: function(event) {
		var instance = this;
		var trigger = instance.get(TRIGGER);
		var showOn = instance.get(SHOW_ON);
		var hideOn = instance.get(HIDE_ON);

		trigger.detach(showOn, instance._showCallback);
		trigger.detach(hideOn, instance._hideCallback);
	},

	/*
	* Setters
	*/
	_setHideOn: function(eventType) {
		var instance = this;
		var trigger = instance.get(TRIGGER);
		var toggle = eventType == instance.get(SHOW_ON);

		if (toggle) {
			instance._hideCallback = A.bind(instance._toggle, instance);

			// only one attached event is enough for toggle
			trigger.detach(eventType, instance._showCallback);
		}
		else {
			var delay = instance.get(HIDE_DELAY);

			instance._hideCallback = function(event) {
				instance._hideTask.delay(delay, null, null, [event]);

				event.halt();
			};
		}

		trigger.on(eventType, instance._hideCallback);

		return eventType;
	},

	_setShowOn: function(eventType) {
		var instance = this;
		var trigger = instance.get(TRIGGER);
		var toggle = eventType == instance.get(HIDE_ON);

		if (toggle) {
			instance._showCallback = A.bind(instance._toggle, instance);

			// only one attached event is enough for toggle
			trigger.detach(eventType, instance._hideCallback);
		}
		else {
			var delay = instance.get(SHOW_DELAY);

			instance._showCallback = function(event) {
				instance._showTask.delay(delay, null, null, [event]);

				event.halt();
			};
		}

		trigger.on(eventType, instance._showCallback);

		return eventType;
	}
});

A.ContextOverlay = ContextOverlay;

}, '@VERSION', { requires: [ 'aui-base', 'overlay', 'delayed-task' ] });