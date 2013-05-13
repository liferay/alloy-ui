var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isString = Lang.isString,

	getClassName = A.getClassName,

	ACTIVE = 'active',
	ACTIVE_CHANGE = 'activeChange',
	BUBBLE_TARGET = 'bubbleTarget',
	CLICK = 'click',
	CONTENT_BOX = 'contentBox',
	DEFAULT = 'default',
	DEFAULT_CHANGE = 'defaultChange',
	DEFAULT_STATE = 'defaultState',
	DISABLED = 'disabled',
	DISABLED_CHANGE = 'disabledChange',
	DISABLED_STATE = 'disabledState',
	HOVER = 'hover',
	HOVER_CHANGE = 'hoverChange',
	MOUSE_ENTER = 'mouseenter',
	MOUSE_LEAVE = 'mouseleave',
	MOUSE_OUT = 'mouseout',
	MOUSE_OVER = 'mouseover',
	NODE = 'node',
	STATE = 'state',

	CSS_STATE_ACTIVE = getClassName(STATE, ACTIVE),
	CSS_STATE_DEFAULT = getClassName(STATE, DEFAULT),
	CSS_STATE_DISABLED = getClassName(STATE, DISABLED),
	CSS_STATE_HOVER = getClassName(STATE, HOVER);

var StateInteraction = A.Component.create(
	{
		NAME: 'stateinteraction',
		NS: 'StateInteraction',

		ATTRS: {
			active: {
				value: false
			},

			activeState: {
				value: true,
				validator: isBoolean
			},

			bubbleTarget: {
				value: null
			},

			classNames: {
				value: {}
			},

			'default': {
				value: false
			},

			defaultState: {
				value: true,
				validator: isBoolean
			},

			disabled: {
				value: false,
				validator: isBoolean
			},

			disabledState: {
				value: true,
				validator: isBoolean
			},

			hover: {
				value: false
			},

			hoverState: {
				value: true,
				validator: isBoolean
			},

			node: {
				value: null
			}
		},

		EXTENDS: A.Plugin.Base,

		constructor: function(config) {
			var host = config.host;
			var node = host;

			if (A.Widget && host instanceof A.Widget) {
				node = host.get(CONTENT_BOX);
			}

			config.node = node;

			StateInteraction.superclass.constructor.apply(this, arguments);
		},

		prototype: {
			initializer: function() {
				var instance = this;

				var activeClass = instance.get('classNames.active');
				var defaultClass = instance.get('classNames.default');
				var disabledClass = instance.get('classNames.disabled');
				var hoverClass = instance.get('classNames.hover');
				var node = instance.get(NODE);

				instance._CSS_STATES = {
					active: isString(activeClass) ? activeClass : CSS_STATE_ACTIVE,
					'default': isString(defaultClass) ? defaultClass : CSS_STATE_DEFAULT,
					disabled: isString(disabledClass) ? disabledClass : CSS_STATE_DISABLED,
					hover: isString(hoverClass) ? hoverClass : CSS_STATE_HOVER
				};

				if (instance.get(DEFAULT_STATE)) {
					node.addClass(instance._CSS_STATES[DEFAULT]);
				}

				if (instance.get(DISABLED)) {
					node.addClass(instance._CSS_STATES[DISABLED]);
				}
				else {
					instance._createEvents();
				}

				instance._attachInteractionEvents();
			},

			_attachInteractionEvents: function() {
				var instance = this;

				var node = instance.get(NODE);

				if (!instance.get(DISABLED)) {
					node.on(CLICK, instance._fireEvents, instance);

					node.on(MOUSE_ENTER, A.rbind(instance._fireEvents, instance, MOUSE_OVER));
					node.on(MOUSE_LEAVE, A.rbind(instance._fireEvents, instance, MOUSE_OUT));
				}

				instance.after(ACTIVE_CHANGE, instance._uiSetState);
				instance.after(HOVER_CHANGE, instance._uiSetState);
				instance.after(DEFAULT_CHANGE, instance._uiSetState);
				instance.after(DISABLED_CHANGE, instance._uiSetState);
			},

			_fireEvents: function(event, officialType) {
				var instance = this;

				var bubbleTarget = instance.get(BUBBLE_TARGET);

				officialType = officialType || event.type;

				if (bubbleTarget) {
					bubbleTarget.fire(officialType);
				}

				return instance.fire(officialType);
			},

			_createEvents: function() {
				var instance = this;

				var bubbleTarget = instance.get(BUBBLE_TARGET);

				if (bubbleTarget) {
					instance.addTarget(bubbleTarget);
				}

				instance.publish(
					CLICK,
					{
						defaultFn: instance._defClickFn,
						emitFacade: true
					}
				);

				instance.publish(
					MOUSE_OUT,
					{
						defaultFn: instance._defMouseOutFn,
						emitFacade: true
					}
				);

				instance.publish(
					MOUSE_OVER,
					{
						defaultFn: instance._defMouseOverFn,
						emitFacade: true
					}
				);
			},

			_defClickFn: function(event) {
				var instance = this;

				instance.set(ACTIVE, !instance.get(ACTIVE));
			},

			_defMouseOutFn: function() {
				var instance = this;

				instance.set(HOVER, false);
			},

			_defMouseOverFn: function() {
				var instance = this;

				instance.set(HOVER, true);
			},

			_uiSetState: function(event) {
				var instance = this;

				var attrName = event.attrName;

				if (instance.get(attrName + 'State')) {
					var action = 'addClass';

					if (!event.newVal) {
						action = 'removeClass';
					}

					instance.get(NODE)[action](instance._CSS_STATES[attrName]);
				}
			}
		}
	}
);

A.namespace('Plugin').StateInteraction = StateInteraction;