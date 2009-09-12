AUI.add('tooltip', function(A) {

var L = A.Lang,
	isString = L.isString,
	isUndefined = L.isUndefined,
	isBoolean = L.isBoolean,

	BL = 'bl',
	TR = 'tr',
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

		showOn: {
			value: 'mouseover'
		},

		hideOn: {
			value: 'mouseout'
		},

		hideDelay: {
			value: 500
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

	_cancelHideOnInteraction: function(event) {
		var OverlayManagerClass = Tooltip.superclass.constructor.superclass;

		// Tooltips should have automatic hide like the ContextOverlay
		OverlayManagerClass._cancelHideOnInteraction.apply(this, arguments);
	},

	_invokeHideTaskOnInteraction: function() {
		var OverlayManagerClass = Tooltip.superclass.constructor.superclass;

		// Tooltips should have automatic hide like the ContextOverlay
		OverlayManagerClass._invokeHideTaskOnInteraction.apply(this, arguments);
	},

	/*
	* Listeners
	*/
	_afterBodyChange: function(e) {
		var instance = this;

		Tooltip.superclass._afterBodyChange.apply(this, arguments);

		// need to refreshAlign() after body change
		instance.refreshAlign();
	}
});

A.Tooltip = Tooltip;

}, '@VERSION', { requires: [ 'context-panel' ] });