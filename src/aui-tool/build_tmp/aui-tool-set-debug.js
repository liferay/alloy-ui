AUI.add('aui-tool-set', function(A) {
/**
 * The ToolSet Utility is a managed collection of <a
 * href="ToolItem.html">ToolItems</a>.
 *
 * @module aui-tool
 * @submodule aui-tool-set
 */

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

/**
 * <p><img src="assets/images/aui-tool-set/main.png"/></p>
 *
 * A base class for ToolSet, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Managed collection for <a href="ToolItems.html">ToolItems</a></li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.ToolSet({
 *  tools: [
 *  	{
 *  		id: 'close',
 *  		icon: 'close'
 *  	},
 *  	{
 *  		id: 'expand',
 *  		icon: 'plus'
 *  	}
 *  ]
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="ToolSet.html#configattributes">Configuration Attributes</a> available for
 * ToolSet.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class ToolSet
 * @constructor
 * @extends Component
 */
var ToolSet = function() {
	ToolSet.superclass.constructor.apply(this, arguments);
};

/**
 * Static property provides a string to identify the class.
 *
 * @property ToolSet.NAME
 * @type String
 * @static
 */
ToolSet.NAME = NAME;

/**
 * Static property used to define the default attribute
 * configuration for the ToolSet.
 *
 * @property ToolSet.ATTRS
 * @type Object
 * @static
 */
ToolSet.ATTRS = {
	/**
	 * Receives an interaction state of active when the user clicks on it.
	 *
	 * @attribute activeState
	 * @type boolean
	 */
	activeState: {},

	/**
	 * Receives a default interaction state.
	 *
	 * @attribute defaultState
	 * @type boolean
	 */
	defaultState: {},

	/**
	 * Receives an interaction state of hover during the
     * <code>mouseover</code> event.
	 *
	 * @attribute hoverState
	 * @type boolean
	 */
	hoverState: {},

	/**
	 * Array of <a href="ToolItem.html">ToolItem</a> elements to render when
     * the ToolSet renders.
	 *
	 * @attribute tools
	 * @default []
	 * @type Array
	 */
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

		/**
		 * Construction logic executed during ToolSet instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this;

			instance.tools = new A.DataSet();

			instance.tools.on('add', instance._afterAddToolItem, instance);
			instance.tools.on('remove', instance._afterRemoveToolItem, instance);
		},

		/**
		 * Create the DOM structure for the ToolSet. Lifecycle.
		 *
		 * @method renderUI
		 * @protected
		 */
		renderUI: function() {
			var instance = this;
			var toolItems = instance.get('tools');

			A.each(toolItems, function(item, i) {
				instance.add(item);
			});
		},

		/**
		 * Sync the ToolSet UI. Lifecycle.
		 *
		 * @method syncUI
		 * @protected
		 */
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

		/**
		 * Add a <a href="ToolItem.html">ToolItem</a> to this ToolSet.
		 *
		 * @method add
		 * @param {Object} toolItem
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

		/**
		 * Get a <a href="ToolItem.html">ToolItem</a> by its <code>key</code>.
		 *
		 * @method item
		 * @param {String} key
		 */
		item: function(key) {
			var instance = this;

			return instance.tools.item(key);
		},

		/**
		 * Remove a <a href="ToolItem.html">ToolItem</a> from this ToolSet.
		 *
		 * @method remove
		 * @param {Object} item
		 */
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

		/**
		 * Create a new <a href="ToolItem.html">ToolItem</a>.
		 *
		 * @method _createToolItem
		 * @param {Object} toolItem
		 * @protected
		 * @return {ToolItem}
		 */
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

		/**
		 * Fires after add a <a href="ToolItem.html">ToolItem</a>.
		 *
		 * @method _afterAddToolItem
		 * @param {EventFacade} event
		 * @protected
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

		/**
		 * Fires after remove a <a href="ToolItem.html">ToolItem</a>.
		 *
		 * @method _afterRemoveToolItem
		 * @param {EventFacade} event
		 * @protected
		 */
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

}, '@VERSION@' ,{skinnable:true, requires:['aui-data-set','aui-tool-item']});
