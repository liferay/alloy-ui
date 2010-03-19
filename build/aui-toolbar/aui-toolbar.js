AUI.add('aui-toolbar', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,

	NAME = 'toolbar',

	getClassName = A.ClassNameManager.getClassName,

	CSS_TOOLBAR = getClassName(NAME),
	CSS_FIRST = getClassName(NAME, 'first'),
	CSS_ITEM = getClassName(NAME, 'item'),
	CSS_ITEM_CONTENT = getClassName(NAME, 'item', 'content'),
	CSS_LAST = getClassName(NAME, 'last'),
	CSS_TOOLSET = getClassName(NAME),

	TPL_GENERIC = '<span></span>';

function Toolbar(config) {
	Toolbar.superclass.constructor.apply(this, arguments);
}

A.mix(Toolbar, {
	NAME: NAME,

	ATTRS: {
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
		 * The default type of child widget to render into the Element
		 *
		 * @attribute defaultChildType
		 * @default Button
		 * @type String | Object
		 */
		defaultChildType: {
			value: 'Button'
		}
	}
});

A.extend(Toolbar, A.Component, {
	BOUNDING_TEMPLATE: TPL_GENERIC,
	CONTENT_TEMPLATE: TPL_GENERIC,

	initializer: function() {
		var instance = this;

		A.Do.before(instance._addByIconId, instance, 'add');
	},

	/*
	* Lifecycle
	*/
	bindUI: function() {
		var instance = this;

		instance.on('addChild', instance._onAddButton);

		instance.after('addChild', instance._afterAddButton);
		instance.after('removeChild', instance._afterRemoveButton);
	},

	syncUI: function() {
		var instance = this;

		var length = instance.size() - 1;

		instance.each(
			function(item, index, collection) {
				var itemBoundingBox = item.get('boundingBox');

				itemBoundingBox.toggleClass(CSS_FIRST, index == 0);
				itemBoundingBox.toggleClass(CSS_LAST, index == length);

				itemBoundingBox.addClass(CSS_ITEM);
			}
		);
	},

	/*
	* Methods
	*/

	_addByIconId: function(icon) {
		var instance = this;

		if (Lang.isString(icon)) {
			var item = {
				icon: icon
			};

			return new A.Do.AlterArgs(null, [item]);
		}
	},

	_afterAddButton: function(event) {
		var instance = this;

		instance.syncUI();
	},

	_afterRemoveButton: function(event) {
		var instance = this;

		event.child.destroy();

		instance.syncUI();
	}
});

var WidgetParentId = function() {
	var instance = this;

	instance._CHILD_MAP = new A.DataSet();

	instance.on('addChild', instance._onAddChildById);

	instance.after('addChild', instance._afterAddChildById);
	instance.after('removeChild', instance._afterRemoveChildById);

	A.Do.before(instance._findById, instance, 'item');
	A.Do.before(instance._findById, instance, 'remove');
};

WidgetParentId.prototype = {
	_afterAddChildById: function(event) {
		var instance = this;

		var id = event.child.get('id');

		instance._CHILD_MAP.insert(event.index, id, event.child);
	},

	_afterRemoveChildById: function(event) {
		var instance = this;

		var id = event.child.get('id');

		// delete instance._CHILD_MAP[id];
		instance._CHILD_MAP.removeKey(id);
	},

	_findById: function(id) {
		var instance = this;

		if (Lang.isString(id)) {
			var index = instance._CHILD_MAP.indexOfKey(id);

			return new A.Do.AlterArgs(null, [index]);
		}
	},

	_getItemById: function(id) {
		var instance = this;

		var index = -1;

		if (Lang.isString(id)) {
			index = instance._CHILD_MAP[id];
		}

		return index;
	},

	_onAddChildById: function(event) {
		var instance = this;

		var id = event.child.get('id');

		if (instance._CHILD_MAP.indexOfKey(id) > -1) {
			event.preventDefault();
		}
	}
};

A.Toolbar = A.Base.build(NAME, Toolbar, [A.WidgetParent, WidgetParentId], { dynamic: false });

}, '@VERSION@' ,{requires:['aui-base','aui-button','aui-data-set','widget-parent'], skinnable:true});
