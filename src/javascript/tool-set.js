AUI().add(
	'tool-set',
	function(A) {
		var Lang = A.Lang,
			isArray = Lang.isArray,
			isNumber = Lang.isNumber,
			isString = Lang.isString,

			isToolItem = function(item) {
				return (item instanceof A.ToolItem);
			},

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

				/*
				* Lifecycle
				*/
				initializer: function() {
					var instance = this;

					instance.tools = new A.DataSet();

					instance.tools.on('add', instance._afterAddToolItem, instance);
					instance.tools.on('remove', instance._afterRemoveToolItem, instance);
				},

				renderUI: function() {
					var instance = this;
					var toolItems = instance.get('tools');

					A.each(toolItems, function(item, i) {
						instance.add(item);
					});
				},

				syncUI: function() {
					var instance = this;
					var toolItems = instance.get('tools');
					var toolSet = instance.tools;
					var length = toolSet.size() - 1;

					// loop all items applying the CSS_FIRST and
					// CSS_LAST class names on the correct elements
					toolSet.each(function(item, index) {
						var itemBoundingBox = item.get('boundingBox');

						itemBoundingBox.removeClass(CSS_FIRST);
						itemBoundingBox.removeClass(CSS_LAST);

						if (index == 0) {
							itemBoundingBox.addClass(CSS_FIRST);
						}

						if (index == length) {
							itemBoundingBox.addClass(CSS_LAST);
						}
					});
				},

				/*
				* Methods
				*/
				add: function(toolItem) {
					var instance = this;
					var toolSet = instance.tools;

					// fix the toolItem argument the user passed, supports plain object, ToolItem and String
					// NOTE: if ToolItem passed as argument it will return the same instance
					toolItem = instance._createToolItem(toolItem);

					if (!toolSet.contains(toolItem)) {
						toolSet.add(toolItem);
					}
				},

				remove: function(item) {
					var instance = this;
					var toolSet = instance.tools;

					if (isNumber(item)) {
						toolSet.removeAt(item);
					}
					if (isString(item)) {
						toolSet.removeKey(item);
					}
					else {
						toolSet.remove(item);
					}
				},

				_createToolItem: function(item) {
					var instance = this;
					var toolItem = null;

					// check if is needed to instantiate a new ToolItem
					if (isToolItem(item)) {
						toolItem = item;
					}
					else {
						var defaultToolConfig = {
							activeState: instance.get('activeState'),
							defaultState: instance.get('defaultState'),
							hoverState: instance.get('hoverState')
						};

						if (isString(item)) {
							item = {
								icon: item
							};
						}

						A.mix(item, defaultToolConfig);

						toolItem = new A.ToolItem(item);
					}

					var itemBoundingBox = toolItem.get('boundingBox');
					var itemContentBox = toolItem.get('contentBox');

					itemBoundingBox.addClass(CSS_ITEM);
					itemContentBox.addClass(CSS_ITEM_CONTENT);

					return toolItem;
				},

				/*
				* Listeners
				*/
				_afterAddToolItem: function(event) {
					var instance = this;
					var toolItem = event.item;
					var contentBox = instance.get('contentBox');

					if (isToolItem(toolItem)) {
						toolItem.render(contentBox);
					}

					instance.syncUI();
				},

				_afterRemoveToolItem: function(event) {
					var instance = this;
					var toolItem = event.item;
					var contentBox = instance.get('contentBox');

					if (isToolItem(toolItem)) {
						toolItem.destroy();
					}

					instance.syncUI();
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