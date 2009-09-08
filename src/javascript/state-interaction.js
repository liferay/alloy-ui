AUI().add(
	'state-interaction',
	function(A) {
		var Lang = A.Lang,
			isString = Lang.isString,

			getClassName = A.ClassNameManager.getClassName,

			STATE = 'state',

			CSS_STATE_DEFAULT = getClassName(STATE, 'default'),
			CSS_STATE_HOVER = getClassName(STATE, 'hover');
			CSS_STATE_ACTIVE = getClassName(STATE, 'active');

		var StateInteractionPlugin = function() {
			StateInteractionPlugin.superclass.constructor.apply(this, arguments);
		};

		StateInteractionPlugin.NAME = 'stateinteraction';
		StateInteractionPlugin.NS = 'StateInteraction';

		StateInteractionPlugin.ATTRS = {
			active: {
				value: false,
				setter: function(value) {
					var instance = this;

					var action = 'addClass';

					if (!value) {
						action = 'removeClass';
					}

					instance.get('host')[action](instance._CSS_STATE_ACTIVE);
				}
			},

			'default': {
				value: false,
				setter: function(value) {
					var instance = this;

					var action = 'addClass';

					if (!value) {
						action = 'removeClass';
					}

					instance.get('host')[action](instance._CSS_STATE_DEFAULT);
				}
			},

			hover: {
				value: false,
				setter: function(value) {
					var instance = this;

					var action = 'addClass';

					if (!value) {
						action = 'removeClass';
					}

					instance.get('host')[action](instance._CSS_STATE_HOVER);
				}
			},

			bubbleTarget: {
				value: null
			},

			classNames: {
				value: {}
			}
		};

		A.extend(
			StateInteractionPlugin,
			A.Plugin.Base,
			{
				initializer: function() {
					var instance = this;

					var activeClass = instance.get('classNames.active');
					var defaultClass = instance.get('classNames.default');
					var hoverClass = instance.get('classNames.hover');

					instance._CSS_STATE_ACTIVE = isString(activeClass) ? activeClass : CSS_STATE_ACTIVE;
					instance._CSS_STATE_DEFAULT = isString(defaultClass) ? defaultClass : CSS_STATE_DEFAULT;
					instance._CSS_STATE_HOVER = isString(hoverClass) ? hoverClass : CSS_STATE_HOVER;

					instance.get('host').addClass(instance._CSS_STATE_DEFAULT);

					instance._createEvents();

					instance._attachInteractionEvents();
				},

				_attachInteractionEvents: function() {
					var instance = this;

					var node = instance.get('host');

					node.on('click', instance._fireEvents, instance);

					node.on('mouseenter', A.rbind(instance._fireEvents, instance, 'mouseover'));
					node.on('mouseleave', A.rbind(instance._fireEvents, instance, 'mouseout'));
				},

				_fireEvents: function(event, officialType) {
					var instance = this;

					var bubbleTarget = instance.get('bubbleTarget');

					officialType = officialType || event.type;

					if (bubbleTarget) {
						bubbleTarget.fire(officialType);
					}

					return instance.fire(officialType);
				},

				_createEvents: function() {
					var instance = this;

					var bubbleTarget = instance.get('bubbleTarget');

					if (bubbleTarget) {
						instance.addTarget(bubbleTarget);
					}

					instance.publish(
						'click',
						{
							defaultFn: instance._defClickFn,
							emitFacade: true
						}
					);

					instance.publish(
						'mouseout',
						{
							defaultFn: instance._defMouseOutFn,
							emitFacade: true
						}
					);

					instance.publish(
						'mouseover',
						{
							defaultFn: instance._defMouseOverFn,
							emitFacade: true
						}
					);
				},

				_defClickFn: function(event) {
					var instance = this;

					instance.set('active', !instance.get('active'));
				},

				_defMouseOutFn: function() {
					var instance = this;

					instance.set('hover', false);
				},

				_defMouseOverFn: function() {
					var instance = this;

					instance.set('hover', true);
				}
			}
		);

		A.StateInteractionPlugin = StateInteractionPlugin;
	},
	'@VERSION',
	{
		requires: ['aui-base', 'plugin']
	}
);