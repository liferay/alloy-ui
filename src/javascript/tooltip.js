AUI.add('tooltip', function(A) {

var L = A.Lang,
	isString = L.isString,
	isUndefined = L.isUndefined,
	isBoolean = L.isBoolean,

	BL = 'bl',
	TR = 'tr',
	FOCUSED = 'focused',
	CANCEL_HIDE_ON_INTERACTION = 'cancelHideOnInteraction',
	BOUNDING_BOX = 'boundingBox',
	HIDE_DELAY = 'hideDelay',
	BLANK = '',
	ATTR = 'attr',
	TITLE = 'title',
	CURRENT_NODE = 'currentNode',
	SECTION = 'section',
	TRIGGER = 'trigger',
	BODY_CONTENT = 'bodyContent',
	TOOLTIP = 'tooltip';

function Tooltip(config) {
	Tooltip.superclass.constructor.apply(this, arguments);
}

A.mix(Tooltip, {
	NAME: TOOLTIP,

	ATTRS: {
		anim: {
			value: true
		},

		align: {
			value: { node: null, points: [ BL, TR ] }
		},

		cancelHideOnInteraction: {
			value: true,
			validador: isBoolean
		},

		showOn: {
			value: 'mouseover'
		},

		hideOn: {
			value: 'mouseout'
		},

		hideDelay: {
			value: 1500
		},

		title: {
			value: false,
			validador: isBoolean
		}
	}
});

A.extend(Tooltip, A.ContextPanel, {
	/*
	* Lifecycle
	*/
	bindUI: function() {
		var instance = this;
		var boudingBox = instance.get(BOUNDING_BOX);

		boudingBox.on('click', A.bind(instance._cancelHideOnInteraction, instance));
		boudingBox.on('mouseenter', A.bind(instance._cancelHideOnInteraction, instance));
		boudingBox.on('mouseleave', A.bind(instance._invokeHideTask, instance));
		instance.after('focusedChange', A.bind(instance._invokeHideTask, instance));

		Tooltip.superclass.bindUI.apply(instance, arguments);
	},

	/*
	* Methods
	*/
	show: function() {
		var instance = this;
		var bodyContent = instance.get(BODY_CONTENT);

		Tooltip.superclass.show.apply(instance, arguments);

		if (instance.get(TITLE)) {
			instance._loadBodyContentFromTitle( instance.get(CURRENT_NODE) );
		}
	},

	_loadBodyContentFromTitle: function(currentNode) {
		var instance = this;
		var trigger = instance.get(TRIGGER);

		if (!instance._titles) {
			instance._titles = trigger.attr(TITLE);

			// prevent default browser tooltip for title
			trigger.attr(TITLE, BLANK);
		}

		if (currentNode) {
			var index = trigger.indexOf(currentNode);
			var title = instance._titles[index];

			instance.set(BODY_CONTENT, title);
		}
	},

	_invokeHideTask: function() {
		var instance = this;

		if (!instance.get(FOCUSED)) {
			instance._hideTask.delay( instance.get(HIDE_DELAY) );
		}
	},

	/*
	* Listeners
	*/
	_afterBodyChange: function(e) {
		var instance = this;

		Tooltip.superclass._afterBodyChange.apply(this, arguments);

		// need to refreshAlign() after body change
		instance.refreshAlign();
	},

	// cancel hide if the user does some interaction with the tooltip
	// interaction = focus, mouseover
	_cancelHideOnInteraction: function(event) {
		var instance = this;

		if (instance.get(CANCEL_HIDE_ON_INTERACTION)) {
			instance.clearIntervals();
		}

		event.halt();
	}
});

A.Tooltip = Tooltip;

}, '@VERSION', { requires: [ 'context-panel' ] });