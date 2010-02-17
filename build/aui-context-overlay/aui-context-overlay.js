AUI.add('aui-context-overlay', function(A) {
var L = A.Lang,
	isString = L.isString,
	isNumber = L.isNumber,
	isObject = L.isObject,
	isBoolean = L.isBoolean,

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	ALIGN = 'align',
	BL = 'bl',
	BOUNDING_BOX = 'boundingBox',
	CANCELLABLE_HIDE = 'cancellableHide',
	CONTEXT_OVERLAY = 'contextoverlay',
	CURRENT_NODE = 'currentNode',
	FOCUSED = 'focused',
	HIDE = 'hide',
	HIDE_DELAY = 'hideDelay',
	HIDE_ON = 'hideOn',
	HIDE_ON_DOCUMENT_CLICK = 'hideOnDocumentClick',
	MOUSEDOWN = 'mousedown',
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

		cancellableHide: {
			value: true,
			validator: isBoolean
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

		hideOnDocumentClick: {
			lazyAdd: false,
			setter: function(v) {
				return this._setHideOnDocumentClick(v);
			},
			value: true,
			validator: isBoolean
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
				if (isNodeList(v)) {
					return v;
				}
				else if (isString(v)) {
					return A.all(v);
				}

				return new A.NodeList([v]);
			}
		},

		visible: {
			value: false
		}
	}
});

A.extend(ContextOverlay, A.ComponentOverlay, {
	/*
	* Lifecycle
	*/
	bindUI: function(){
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.on(MOUSEDOWN, instance._stopTriggerEventPropagation);

		instance.before('triggerChange', instance._beforeTriggerChange);
		instance.before('showOnChange', instance._beforeShowOnChange);
		instance.before('hideOnChange', instance._beforeHideOnChange);

		instance.after('triggerChange', instance._afterTriggerChange);
		instance.after('showOnChange', instance._afterShowOnChange);
		instance.after('hideOnChange', instance._afterHideOnChange);

		boundingBox.on('click', A.bind(instance._cancelAutoHide, instance));
		boundingBox.on('mouseenter', A.bind(instance._cancelAutoHide, instance));
		boundingBox.on('mouseleave', A.bind(instance._invokeHideTaskOnInteraction, instance));
		instance.after('focusedChange', A.bind(instance._invokeHideTaskOnInteraction, instance));
	},

	destructor: function() {
		var instance = this;

		instance.get(BOUNDING_BOX).remove();
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

		instance.clearIntervals();

		instance.updateCurrentNode(event);

		instance.fire('show');

		ContextOverlay.superclass.show.apply(instance, arguments);

		instance.refreshAlign();
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

	updateCurrentNode: function(event) {
		var instance = this;
		var align = instance.get(ALIGN);
		var trigger = instance.get(TRIGGER);
		var currentTarget = null;

		if (event) {
			currentTarget = event.currentTarget;
		}

		var node = align.node || currentTarget || trigger.item(0);

		if (node) {
			instance.set(CURRENT_NODE, node);
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

		event.stopPropagation();

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
		trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);
	},

	// cancel hide if the user does some interaction with the tooltip
	// interaction = focus, click, mouseover
	_cancelAutoHide: function(event) {
		var instance = this;

		if (instance.get(CANCELLABLE_HIDE)) {
			instance.clearIntervals();
		}

		event.stopPropagation();
	},

	_invokeHideTaskOnInteraction: function(event) {
		var instance = this;
		var cancellableHide = instance.get(CANCELLABLE_HIDE);
		var focused = instance.get(FOCUSED);

		if (!focused && !cancellableHide) {
			instance._hideTask.delay( instance.get(HIDE_DELAY) );
		}
	},

	_stopTriggerEventPropagation: function(event) {
		event.stopPropagation();
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

				event.stopPropagation();
			};
		}

		trigger.on(eventType, instance._hideCallback);

		return eventType;
	},

	_setHideOnDocumentClick: function(value) {
		var instance = this;

		if (value) {
			A.ContextOverlayManager.register(instance);
		}
		else {
			A.ContextOverlayManager.remove(instance);
		}

		return value;
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

				event.stopPropagation();
			};
		}

		if (eventType != MOUSEDOWN) {
			trigger.on(MOUSEDOWN, instance._stopTriggerEventPropagation);
		}
		else {
			trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);
		}

		trigger.on(eventType, instance._showCallback);

		return eventType;
	}
});

A.ContextOverlay = ContextOverlay;

A.ContextOverlayManager = new A.OverlayManager({});

A.on(MOUSEDOWN, function() { A.ContextOverlayManager.hideAll(); }, A.getDoc());

}, '@VERSION@' ,{requires:['aui-overlay-manager','aui-delayed-task'], skinnable:false});
