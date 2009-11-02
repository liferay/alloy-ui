AUI().add(
	'tool-item',
	function(A) {
		var Lang = A.Lang,
			isString = Lang.isString,
			isFunction = Lang.isFunction,
			isObject = Lang.isObject,

			getClassName = A.ClassNameManager.getClassName,

			TOOL = 'tool',
			ICON = 'icon',
			STATE = 'state',

			CSS_TOOL = getClassName(TOOL),
			CSS_ICON = getClassName(ICON),

			TPL_GENERIC = '<span></span>',
			TPL_ICON = TPL_GENERIC,
			TPL_TOOL = TPL_GENERIC;

		var ToolItem = function(config) {
			if (isString(config)) {
				config = {
					icon: config
				};
			}

			ToolItem.superclass.constructor.apply(this, arguments);
		};

		ToolItem.NAME = 'tool-item';

		ToolItem.ATTRS = {
			classNames: {},

			activeState: {
				value: false
			},

			defaultState: {},

			handler: {
				lazyAdd: false,
				value: null,
				setter: function(value) {
					var instance = this;

					var fn = value;
					var context = instance;
					var args = instance;
					var type = 'click';

					if (isObject(fn)) {
						var handlerConfig = fn;

						fn = handlerConfig.fn || fn;
						context = handlerConfig.context || context;
						type = handlerConfig.type || type;
					}

					if (isFunction(fn)) {
						instance.on(type, A.rbind(fn, context, args, handlerConfig.args));
					}

					return value;
				}
			},

			hoverState: {},

			iconNode: {
				valueFn: function() {
					var instance = this;

					return A.Node.create(TPL_ICON);
				}
			},

			icon: {
				lazyAdd: false,
				setter: function(value) {
					var instance = this;

					instance._uiSetIcon(value);

					return value;
				}
			},

			id: {
				valueFn: function() {
					return A.guid();
				}
			},

			renderTo: {
				value: null
			}
		};

		A.extend(
			ToolItem,
			A.Component,
			{
				BOUNDING_TEMPLATE: TPL_GENERIC,
				CONTENT_TEMPLATE: TPL_GENERIC,

				initializer: function() {
					var instance = this;

					var renderTo = instance.get('renderTo');

					if (renderTo) {
						instance.render(renderTo);
					}
				},

				renderUI: function() {
					var instance = this;

					var contentBox = instance.get('contentBox');
					var iconNode = instance.get('iconNode');

					contentBox.addClass(CSS_TOOL);

					iconNode.addClass(CSS_ICON);

					instance.plug(
						A.StateInteractionPlugin,
						{
							activeState: instance.get('activeState'),
							classNames: instance.get('classNames'),
							defaultState: instance.get('defaultState'),
							hoverState: instance.get('hoverState'),
							bubbleTarget: instance
						}
					);

					contentBox.appendChild(iconNode);
				},

				bindUI: function() {
					var instance = this;

					instance.after('iconChange', instance._afterIconChange);
				},

				_afterIconChange: function(event) {
					var instance = this;

					instance._uiSetIcon(event.newVal, event.prevVal);
				},

				_uiSetIcon: function(newVal, prevVal) {
					var instance = this;

					var contentBox = instance.get('iconNode');

					newVal = getClassName(ICON, newVal);

					if (prevVal) {
						prevVal = getClassName(ICON, prevVal);
					}

					contentBox.replaceClass(prevVal, newVal);
				}
			}
		);

		A.ToolItem = ToolItem;
	},
	'@VERSION',
	{
		requires: ['aui-base', 'state-interaction'],
		use: []
	}
);
