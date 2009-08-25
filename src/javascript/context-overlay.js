AUI.add('context-overlay', function(A) {

var L = A.Lang,
	isString = L.isString,
	isNumber = L.isNumber,
	isObject = L.isObject,

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	ALIGN = 'align',
	BL = 'bl',
	CONTEXT_OVERLAY = 'ContextOverlay',
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
	this._lazyAddAttrs = false;
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
			validator: function(v) {
				return isString(v) || isNodeList(v);
			},
			setter: function(v) {
				return this._setTrigger(v);
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

		instance.before('showOnChange', instance._beforeSetHideShow);
		instance.before('hideOnChange', instance._beforeSetHideShow);
	},

	/*
	* Methods
	*/
	show: function(force) {
		var instance = this;
		var delay = force ? 0 : instance.get(SHOW_DELAY);

		instance.fire('beforeShow');

		instance.clearIntervals();

		var interval = A.later(delay, instance, function() {
			ContextOverlay.superclass.show.apply(this, arguments);

			instance.fire('show');
		});

		var intervals = A.merge(
			instance.get(INTERVALS),
			{ show: interval }
		);

		instance.set(INTERVALS, intervals);
	},

	hide: function(force) {
		var instance = this;
		var delay = force ? 0 : instance.get(HIDE_DELAY);

		instance.fire('beforeHide');

		instance.clearIntervals();

		var interval = A.later(delay, instance, function() {
			ContextOverlay.superclass.hide.apply(this, arguments);

			instance.fire('hide');
		});

		var intervals = A.merge(
			instance.get(INTERVALS),
			{ hide: interval }
		);

		instance.set(INTERVALS, intervals);
	},

	toggle: function(force) {
		var instance = this;

		if (instance.get(VISIBLE)) {
			instance.hide(force);
		}
		else {
			instance.show(force);
		}
	},

	clearIntervals: function() {
		var instance = this;
		var intervals = instance.get(INTERVALS) || {};

		if (intervals.hide) {
			intervals.hide.cancel();
		}
		if (intervals.show) {
			intervals.show.cancel();
		}
	},

	_bindShowHide: function(eventType, fn, delay) {
		var instance = this;

		var align = instance.get(ALIGN);
		var trigger = instance.get(TRIGGER);

		if (isNumber(delay)) {
			trigger.on(eventType, A.rbind(instance._showHideContextOverlay, instance, align, fn));
		}
	},

	_showHideContextOverlay: function(event, align, fn) {
		var instance = this;

		var node = align.node || event.currentTarget;

		instance._uiSetAlign(node, align.points);

		fn.call(instance);

		event.stopPropagation();
		event.preventDefault();
	},

	/*
	* Attribute Listeners
	*/
	_beforeSetHideShow: function(event) {
		var instance = this;

		instance.get(TRIGGER).detach(event.prevVal);
	},

	/*
	* Setters
	*/
	_setHideOn: function(eventType) {
		var instance = this;
		var delay = instance.get(HIDE_DELAY);
		var fn = instance.hide;

		if (eventType == instance.get(SHOW_ON)) {
			fn = instance.toggle;
		}

		instance._bindShowHide(eventType, fn, delay);

		return eventType;
	},

	_setShowOn: function(eventType) {
		var instance = this;
		var delay = instance.get(SHOW_DELAY);
		var fn = instance.show;

		if (eventType == instance.get(HIDE_ON)) {
			fn = instance.toggle;
		}

		instance._bindShowHide(eventType, fn, delay);

		return eventType;
	},

	_setTrigger: function(value) {
		return (isNodeList(value) ? value : A.get(document).queryAll(value));
	}
});

A.ContextOverlay = ContextOverlay;

}, '@VERSION', { requires: [ 'overlay' ] });