AUI.add('tree-view', function(A) {

var L = A.Lang,
	isString = L.isString,

	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	DOT = '.',
	EL = 'el',
	FILE = 'file',
	HITAREA = 'hitarea',
	ICON = 'icon',
	LABEL = 'label',
	NODE = 'node',
	OWNER_TREE = 'ownerTree',
	ROOT = 'root',
	SELECTED = 'selected',
	SPACE = ' ',
	TREE = 'tree',
	TREE_VIEW = 'tree-view',
	TYPE = 'type',

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	getCN = A.ClassNameManager.getClassName,

	CSS_TREE_HITAREA = getCN(TREE, HITAREA),
	CSS_TREE_ICON = getCN(TREE, ICON),
	CSS_TREE_LABEL = getCN(TREE, LABEL),
	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),
	CSS_TREE_NODE_SELECTED = getCN(TREE, NODE, SELECTED),
	CSS_TREE_ROOT_CONTAINER = getCN(TREE, ROOT, CONTAINER);

/*
* TreeView
*/

function TreeView(config) {
	TreeView.superclass.constructor.apply(this, arguments);
}

A.mix(TreeView, {
	NAME: TREE_VIEW,

	ATTRS: {
		type: {
			value: FILE,
			validator: isString
		}
	}
});

A.extend(TreeView, A.TreeData, {
	CONTENT_TEMPLATE: '<ul></ul>',

	/*
	* Lifecycle
	*/
	bindUI: function() {
		var instance = this;

		instance._delegateDOM();
	},

	renderUI: function() {
		var instance = this;

		instance._renderElements();
	},

	syncUI: function() {
		var instance = this;

		instance.refreshIndex();
	},

	/*
	* Methods
	*/
	registerNode: function(node) {
		var instance = this;

		// when the node is appended to the TreeView set the OWNER_TREE
		node.set(OWNER_TREE, instance);

		TreeView.superclass.registerNode.apply(this, arguments);
	},

	_renderElements: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var type = instance.get(TYPE);
		var CSS_TREE_TYPE = getCN(TREE, type);

		instance.set(CONTAINER, contentBox);

		contentBox.addClass(
			concat(CSS_TREE_TYPE, CSS_TREE_ROOT_CONTAINER)
		);

		instance.eachChildren(function(node) {
			instance.appendChild(node, true);
		});
	},

	/*
	* Listeners
	*/
	_delegateDOM: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		// expand/collapse delegations
		boundingBox.delegate('mousedown', A.bind(instance._onMouseDownHitArea, instance), DOT+CSS_TREE_HITAREA);
		boundingBox.delegate('dblclick', A.bind(instance._onMouseDownHitArea, instance), DOT+CSS_TREE_ICON);
		boundingBox.delegate('dblclick', A.bind(instance._onMouseDownHitArea, instance), DOT+CSS_TREE_LABEL);
		// other delegations
		boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
		boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
		boundingBox.delegate('mousedown', A.bind(instance._onMouseDownNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
	},

	_onMouseDownNodeEl: function(event) {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var treeNode = instance.getNodeByChild( event.currentTarget );

		if (treeNode && !treeNode.isSelected()) {
			var nodeContents = contentBox.all(DOT+CSS_TREE_NODE_CONTENT);

			nodeContents.removeClass(CSS_TREE_NODE_SELECTED);

			treeNode.select();
		}
	},

	_onMouseEnterNodeEl: function(event) {
		var instance = this;
		var treeNode = instance.getNodeByChild( event.currentTarget );

		if (treeNode) {
			treeNode.over();
		}
	},

	_onMouseLeaveNodeEl: function(event) {
		var instance = this;
		var treeNode = instance.getNodeByChild( event.currentTarget );

		if (treeNode) {
			treeNode.out();
		}
	},

	_onMouseDownHitArea: function(event) {
		var instance = this;
		var treeNode = instance.getNodeByChild( event.currentTarget );

		if (treeNode) {
			treeNode.toggle();
		}
	}
});

A.TreeView = TreeView;

}, '@VERSION', { requires: [ 'tree-node' ] });