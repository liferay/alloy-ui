AUI().add(
	'tool-set',
	function(A) {
		var Lang = A.Lang,
			isArray = Lang.isArray,
			isString = Lang.isString,

			getClassName = A.ClassNameManager.getClassName,

			NAME = 'toolset',

			CSS_FIRST = getClassName(NAME, 'first'),
			CSS_ITEM = getClassName(NAME, 'item'),
			CSS_ITEM_CONTENT = getClassName(NAME, 'item', 'content'),
			CSS_LAST = getClassName(NAME, 'last'),
			CSS_TOOLSET = getClassName(NAME),

			TPL_GENERIC = '<span></span>';

		var ToolSet = function() {
			ToolSet.superclass.constructor.apply(this, arguments);
		};

		ToolSet.NAME = NAME;

		ToolSet.ATTRS = {
			activeState: {},
			defaultState: {},
			hoverState: {},

			tools: {
				value: [],
				validator: isArray
			}
		};

		A.extend(
			ToolSet,
			A.Component,
			{
				BOUNDING_TEMPLATE: TPL_GENERIC,
				CONTENT_TEMPLATE: TPL_GENERIC,

				initializer: function() {
					var instance = this;

					instance.tools = new A.DataSet();
				},

				renderUI: function() {
					var instance = this;

					instance._renderToolItems();
				},

				_renderToolItems: function() {
					var instance = this;

					var contentBox = instance.get('contentBox');
					var toolItems = instance.get('tools');

					var toolSet = instance.tools;
					var length = toolItems.length;

					var defaultToolConfig = {
						activeState: instance.get('activeState'),
						defaultState: instance.get('defaultState'),
						hoverState: instance.get('hoverState')
					};

					A.each(
						toolItems,
						function(item) {
							var toolItem = null;

							if (isString(item)) {
								item = {
									icon: item
								};
							}

							// check if is needed to instantiate a new ToolItem
							if (item instanceof A.ToolItem) {
								toolItem = item;
							}
							else {
								A.mix(item, defaultToolConfig);

								toolItem = new A.ToolItem(item);
							}

							var itemBoundingBox = toolItem.get('boundingBox');
							var itemContentBox = toolItem.get('contentBox');

							itemBoundingBox.addClass(CSS_ITEM);
							itemContentBox.addClass(CSS_ITEM_CONTENT);

							toolItem.render(contentBox);

							toolSet.add(toolItem);
						}
					);

					if (length > 0) {
						toolSet.get('first').get('boundingBox').addClass(CSS_FIRST);
						toolSet.get('last').get('boundingBox').addClass(CSS_LAST);
					}
				}
			}
		);

		A.ToolSet = ToolSet;
	},
	'@VERSION',
	{
		requires: ['data-set', 'tool-item'],
		use: []
	}
);