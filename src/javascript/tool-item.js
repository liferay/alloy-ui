AUI().add(
	'tool-item',
	function(A) {
		var Lang = A.Lang,
			isString = Lang.isString,

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
			classNames: {
				value: {
					active: ''
				}
			},

			icon: {
				setter: function(value) {
					var instance = this;

					var iconNode = instance.get('iconNode');

					if (iconNode) {
						iconNode.addClass(getClassName(ICON, value))
					}

					return value;
				}
			},

			iconNode: {
				value: null,
				setter: function(value) {
					var instance = this;

					var icon = A.get(value);

					if (!icon) {
						icon = instance._createDefaultIconNodeToolItem();
					}
					else {
						icon = icon.item(0);
					}

					icon.addClass(CSS_ICON);
					icon.addClass(getClassName(ICON, instance.get(ICON)));

					return icon;
				}
			},

			node: {
				value: null,
				setter: function(value) {
					var instance = this;

					var node = A.get(value);

					if (!node) {
						node = instance._createDefaultNodeToolItem();
					}
					else {
						node = node.item(0);
					}

					node.addClass(CSS_TOOL);

					node.plug(
						A.StateInteractionPlugin,
						{
							classNames: instance.get('classNames'),
							bubbleTarget: instance
						}
					);

					return node;
				}
			},

			renderTo: {
				value: null
			}
		};

		A.extend(
			ToolItem,
			A.Widget,
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

					var node = instance.get('node');
					var icon = instance.get('iconNode');

					node.appendChild(icon);

					instance.get('contentBox').appendChild(node);
				},

				bindUI: function() {
					var instance = this;

					instance.after('iconChange', instance._afterIconChange);
				},

				_afterIconChange: function(event) {
					var instance = this;

					var prevVal = event.prevVal;
					var iconNode = instance.get('iconNode');

					iconNode.removeClass(getClassName(ICON, prevVal));
				},

				_createDefaultNodeToolItem: function() {
					return A.Node.create(TPL_TOOL);
				},

				_createDefaultIconNodeToolItem: function() {
					return A.Node.create(TPL_ICON);
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
