AUI.add('context-overlay', function(A) {

var L = A.Lang,
	isString = L.isString,
	isNumber = L.isNumber,
	isObject = L.isObject,

	ALIGN = 'align',
	BL = 'bl',
	BOUNDING_BOX = 'boundingBox',
	CONTEXT_OVERLAY = 'contextoverlay',
	DELAY = 'delay',
	HIDE_DELAY = 'hideDelay',
	HIDE_ON = 'hideOn',
	INTERVALS = 'intervals',
	SHOW_DELAY = 'showDelay',
	SHOW_ON = 'showOn',
	TL = 'tl',
	TRIGGER = 'trigger',
	VISIBLE = 'visible';

function ContextOverlay(config) {
	var instance = this;

	this._lazyAddAttrs = false;

	instance._hideTask = new A.DelayedTask(instance._hideContextOverlay, instance);
	instance._showTask = new A.DelayedTask(instance._showContextOverlay, instance);
	instance._toggleTask = new A.DelayedTask(instance._toggleContextOverlay, instance);

	instance._hideCallbackContextOverlay = null;
	instance._showCallbackContextOverlay = null;
	instance._toggleCallbackContextOverlay = null;

 	ContextOverlay.superclass.constructor.apply(this, arguments);
}

A.mix(ContextOverlay, {
	NAME: CONTEXT_OVERLAY,

	ATTRS: {
		align: {
            value: { node: null, points: [ TL, BL ] }
        },

		delay: {
			value: null,
			validator: isObject
		},

		hideOn: {
			value: 'mouseout',
			validator: isString,
			setter: function(v) {
				return this._setHideOn(v);
			}
		},

		hideDelay: {
			value: 0
		},

		intervals: {
			value: {}
		},

		showOn: {
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
			value: null,
			setter: function(value) {
				var node = A.get(value);

				if (!node) {
					A.error('AUI.ContextOverlay: Invalid Trigger Given: ' + value);
				}
				else {
					node = node.item(0);
				}

				return node;
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

		instance.before('showOnChange', instance._syncListeners);
		instance.before('hideOnChange', instance._syncListeners);
	},

	/*
	* Methods
	*/

	toggle: function() {
		var instance = this;

		if (instance.get(VISIBLE)) {
			instance.hide();
		}
		else {
			instance.show();
		}
	},

	_hideContextOverlay: function(event) {
		var instance = this;

		instance._showTask.cancel();

		instance.fire('hide');

		instance.hide();

		event.halt();
	},

	_showContextOverlay: function(event) {
		var instance = this;

		instance._hideTask.cancel();

		instance.fire('show');

		if (event.currentTarget.compareTo(instance.get(TRIGGER))) {
			var align = instance.get('align');

			var node = align.node || event.currentTarget;

			instance._uiSetAlign(node, align.points);
		}

		instance.show();

		event.halt();
	},

	_toggleContextOverlay: function() {
		var instance = this;

		if (instance.get(VISIBLE)) {
			instance.hide();
		}
		else {
			instance.show();
		}
	},

	/*
	* Attribute Listeners
	*/
	_syncListeners: function(event) {
		var instance = this;

		var trigger = instance.get(TRIGGER);
		var boundingBox = instance.get(BOUNDING_BOX);

		var hideOn = instance.get(HIDE_ON);
		var showOn = instance.get(SHOW_ON);

		var oldEventType = event.prevVal;
		var attrName = event.attrName;

		// Changing from a toggle
		if (oldEventType == hideOn || oldEventType == showOn) {
			trigger.detach(oldEventType, instance._toggleCallbackContextOverlay);
		}
		else {
			var oldListener;

			if (attrName == HIDE_ON) {
				oldListener = instance._hideCallbackContextOverlay;
			}
			else if (attrName == SHOW_ON) {
				oldListener = instance._showCallbackContextOverlay;
			}

			if (oldListener) {
				trigger.detach(oldEventType, oldListener);
				boundingBox.detach(oldEventType, oldListener);
			}
		}
	},

	_addListenersContextOverlay: function(eventType, listener) {
		var instance = this;

		var trigger = instance.get(TRIGGER);
		var boundingBox = instance.get(BOUNDING_BOX);

		trigger.on(eventType, listener);
		boundingBox.on(eventType, listener);
	},

	_createToggleOn: function(eventType) {
		var instance = this;

		if (!instance._toggleCallbackContextOverlay) {
			var fn = instance._toggleTask;
			var hideDelay = instance.get(HIDE_DELAY);
			var showDelay = instance.get(SHOW_DELAY);

			var delay = Math.min(hideDelay, showDelay);

			instance._toggleCallbackContextOverlay = A.bind(fn.delay, fn, delay, null, null);
		}

		var trigger = instance.get(TRIGGER);
		var boundingBox = instance.get(BOUNDING_BOX);

		var hideCallback = instance._hideCallbackContextOverlay;
		var showCallback = instance._showCallbackContextOverlay;

		trigger.detach(eventType, hideCallback);
		trigger.detach(eventType, showCallback);

		boundingBox.detach(eventType, hideCallback);
		boundingBox.detach(eventType, showCallback);

		trigger.on(eventType, instance._toggleCallbackContextOverlay);
	},

	/*
	* Setters
	*/

	_setHideOn: function(eventType) {
		var instance = this;

		if (eventType == instance.get(SHOW_ON)) {
			instance._createToggleOn(eventType);
		}
		else {
			var trigger = instance.get(TRIGGER);

			if (!instance._hideCallbackContextOverlay) {
				var fn = instance._hideTask;
				var delay = instance.get(HIDE_DELAY);

				instance._hideCallbackContextOverlay = A.bind(fn.delay, fn, delay, null, null);
			}

			instance._addListenersContextOverlay(eventType, instance._hideCallbackContextOverlay);
		}

		return eventType;
	},

	_setShowOn: function(eventType) {
		var instance = this;

		if (eventType == instance.get(HIDE_ON)) {
			instance._createToggleOn(eventType);
		}
		else {
			var trigger = instance.get(TRIGGER);

			if (!instance._showCallbackContextOverlay) {
				var fn = instance._showTask;
				var delay = instance.get(SHOW_DELAY);

				instance._showCallbackContextOverlay = A.bind(fn.delay, fn, delay, null, null);
			}

			instance._addListenersContextOverlay(eventType, instance._showCallbackContextOverlay);
		}

		return eventType;
	}
});

A.ContextOverlay = ContextOverlay;

}, '@VERSION', { requires: [ 'aui-base', 'overlay', 'delayed-task' ] });