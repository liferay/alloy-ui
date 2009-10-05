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
	VIEW = 'view',

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	getCN = A.ClassNameManager.getClassName,

	CSS_TREE_HITAREA = getCN(TREE, HITAREA),
	CSS_TREE_ICON = getCN(TREE, ICON),
	CSS_TREE_LABEL = getCN(TREE, LABEL),
	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),
	CSS_TREE_NODE_SELECTED = getCN(TREE, NODE, SELECTED),
	CSS_TREE_ROOT_CONTAINER = getCN(TREE, ROOT, CONTAINER),
	CSS_TREE_VIEW_CONTENT = getCN(TREE, VIEW, CONTENT);


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

		contentBox.addClass(CSS_TREE_VIEW_CONTENT);

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
		boundingBox.delegate('click', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_HITAREA);
		boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_ICON);
		boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_LABEL);
		// other delegations
		boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
		boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
		boundingBox.delegate('click', A.bind(instance._onClickNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
	},

	_onClickNodeEl: function(event) {
		var instance = this;
		var treeNode = instance.getNodeByChild( event.currentTarget );

		if (treeNode && !treeNode.isSelected()) {
			instance.unselectAll();

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

	_onClickHitArea: function(event) {
		var instance = this;
		var treeNode = instance.getNodeByChild( event.currentTarget );

		if (treeNode) {
			treeNode.toggle();
		}
	}
});

A.TreeView = TreeView;


/*
* TreeViewDD - Drag & Drop
*/
var isNumber = L.isNumber,

	ABOVE = 'above',
	APPEND = 'append',
	BELOW = 'below',
	BLOCK = 'block',
	BODY = 'body',
	CLEARFIX = 'clearfix',
	DEFAULT = 'default',
	DISPLAY = 'display',
	DOWN = 'down',
	DRAG = 'drag',
	DRAG_CURSOR = 'dragCursor',
	DRAG_NODE = 'dragNode',
	EXPANDED = 'expanded',
	HELPER = 'helper',
	ID = 'id',
	INSERT = 'insert',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_TOP = 'offsetTop',
	PARENT_NODE = 'parentNode',
	STATE = 'state',
	TREE_DRAG_DROP = 'tree-drag-drop',
	UP = 'up',

	DDM = A.DD.DDM,

	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_ICON = getCN(ICON),
	CSS_TREE_DRAG_HELPER = getCN(TREE, DRAG, HELPER),
	CSS_TREE_DRAG_HELPER_CONTENT = getCN(TREE, DRAG, HELPER, CONTENT),
	CSS_TREE_DRAG_HELPER_LABEL = getCN(TREE, DRAG, HELPER, LABEL),
	CSS_TREE_DRAG_INSERT_ABOVE = getCN(TREE, DRAG, INSERT, ABOVE),
	CSS_TREE_DRAG_INSERT_APPEND = getCN(TREE, DRAG, INSERT, APPEND),
	CSS_TREE_DRAG_INSERT_BELOW = getCN(TREE, DRAG, INSERT, BELOW),
	CSS_TREE_DRAG_STATE_APPEND = getCN(TREE, DRAG, STATE, APPEND),
	CSS_TREE_DRAG_STATE_INSERT_ABOVE = getCN(TREE, DRAG, STATE, INSERT, ABOVE),
	CSS_TREE_DRAG_STATE_INSERT_BELOW = getCN(TREE, DRAG, STATE, INSERT, BELOW),

	HELPER_TPL = '<div class="'+CSS_TREE_DRAG_HELPER+'">'+
					'<div class="'+[CSS_TREE_DRAG_HELPER_CONTENT, CSS_HELPER_CLEARFIX].join(SPACE)+'">'+
						'<span class="'+CSS_ICON+'"></span>'+
						'<span class="'+CSS_TREE_DRAG_HELPER_LABEL+'"></span>'+
					'</div>'+
				 '</div>';


function TreeViewDD(config) {
	TreeViewDD.superclass.constructor.apply(this, arguments);
}

A.mix(TreeViewDD, {
	NAME: TREE_DRAG_DROP,

	ATTRS: {
		helper: {
			value: null
		}
	}
});

A.extend(TreeViewDD, A.TreeView, {
	direction: BELOW,

	dropAction: null,

	lastY: 0,

	node: null,

	nodeContent: null,

	/*
	* Lifecycle
	*/
	initializer: function() {
		var instance = this;

		TreeViewDD.superclass.initializer.apply(this, arguments);

		// set DRAG_CURSOR to the default arrow
		DDM.set(DRAG_CURSOR, DEFAULT);
	},

	bindUI: function() {
		var instance = this;

		TreeViewDD.superclass.bindUI.apply(this, arguments);

		instance._bindDragDrop();
	},

	renderUI: function() {
		var instance = this;

		TreeViewDD.superclass.renderUI.apply(this, arguments);

		var helper = A.Node.create(HELPER_TPL).hide();

		A.get(BODY).append(helper);

		instance.set(HELPER, helper);
	},

	/*
	* Methods
	*/
	_createDrag: function(node) {
		var instance = this;

		if (!DDM.getDrag(node)) {
			new A.DD.Drag({
				node: node,
				bubbles: instance,
				target: true
			})
			.plug(A.Plugin.DDProxy, {
				moveOnEnd: false,
				borderStyle: null
			});
		}
	},

	_bindDragDrop: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		instance.eachChildren(function(child) {
			// set init elements as draggable
			instance._createDrag( child.get(CONTENT_BOX) );
		}, true);

		// when append new nodes, make them draggable
		instance.after('append', A.bind(instance._afterAppend, instance));

		instance.on('drag:align', instance._onDragAlign);
		instance.on('drag:start', instance._onDragStart);
		instance.on('drop:exit', instance._onDropExit);
		instance.on('drop:hit', instance._onDropHit);
		instance.on('drop:over', instance._onDropOver);
	},

	_appendState: function(nodeContent) {
		var instance = this;

		instance.dropAction = APPEND;

		instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_APPEND);

		nodeContent.addClass(CSS_TREE_DRAG_INSERT_APPEND);
	},

	_goingDownState: function(nodeContent) {
		var instance = this;

		instance.dropAction = BELOW;

		instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);

		nodeContent.addClass(CSS_TREE_DRAG_INSERT_BELOW);
	},

	_goingUpState: function(nodeContent) {
		var instance = this;

		instance.dropAction = ABOVE;

		instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);

		nodeContent.addClass(CSS_TREE_DRAG_INSERT_ABOVE);
	},

	_resetState: function(nodeContent) {
		var instance = this;
		var helper = instance.get(HELPER);

		helper.removeClass(CSS_TREE_DRAG_STATE_APPEND);
		helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);
		helper.removeClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);

		if (nodeContent) {
			nodeContent.removeClass(CSS_TREE_DRAG_INSERT_ABOVE);
			nodeContent.removeClass(CSS_TREE_DRAG_INSERT_APPEND);
			nodeContent.removeClass(CSS_TREE_DRAG_INSERT_BELOW);
		}
	},

	_updateNodeState: function(event) {
		var instance = this;
		var drag = event.drag;
		var drop = event.drop;
		var nodeContent = drop.get(NODE);
		var dropNode = nodeContent.get(PARENT_NODE);
		var dragNode = drag.get(NODE).get(PARENT_NODE);

		// reset the classNames from the last nodeContent
		instance._resetState(instance.nodeContent);

		var direction = instance.direction;
		var dropTreeNode = instance.getNodeById( dropNode.get(ID) );
		var dragTreeNode = instance.getNodeById( dragNode.get(ID) );
		// check if the dragged node is interacting with a child
		var contains = dragTreeNode.contains(dropTreeNode);

		// if 'dragNode' not contains 'dropNode' the dragged node can be appended/inserted
		if (!contains) {
			var nTop = nodeContent.get(OFFSET_TOP);
			var nHeight = nodeContent.get(OFFSET_HEIGHT);

			// nArea splits the height in 3 areas top/center/bottom
			// these areas are responsible for defining the state when the mouse is over any of them
			var nArea = nHeight / 3;
			var yTop = nTop;
			var yCenter = nTop + nArea*1;
			var yBottom = nTop + nArea*2;
			var mouseY = drag.mouseXY[1];

			// UP: mouse on the top area of the node
			if ((mouseY > yTop) && (mouseY < yCenter)) {
				instance._goingUpState(nodeContent);
			}
			// DOWN: mouse on the bottom area of the node
			else if (mouseY > yBottom) {
				instance._goingDownState(nodeContent);
			}
			// APPEND: mouse on the center area of the node
			else if ((mouseY > yCenter) && (mouseY < yBottom)) {
				// if it's a folder set the state to append
				if (!dropTreeNode.isLeaf()) {
					instance._appendState(nodeContent);
				}
				// if it's a leaf we need to set the ABOVE or BELOW state instead of append
				else {
					if (direction == UP) {
						instance._goingUpState(nodeContent);
					}
					else {
						instance._goingDownState(nodeContent);
					}
				}
			}
		}

		instance.nodeContent = nodeContent;
	},

	/*
	* Listeners
	*/
	_afterAppend: function(event) {
		var instance = this;
		var treeNode = event.tree.node;

		instance._createDrag( treeNode.get(CONTENT_BOX) );
	},

	_onDragAlign: function(event) {
		var instance = this;
		var lastY = instance.lastY;
		var y = event.target.lastXY[1];

		// if the y change
		if (y != lastY) {
			// set the drag direction
			instance.direction = (y < lastY) ? UP : DOWN;
		}

		instance.lastY = y;
	},

 	_onDragStart: function(event) {
 		var instance = this;
		var drag = event.target;
		var dragNode = drag.get(NODE).get(PARENT_NODE);
		var dragTreeNode = instance.getNodeById( dragNode.get(ID) );

		// select drag node
 		instance.unselectAll();
 		dragTreeNode.select();

		// initialize drag helper
		var helper = instance.get(HELPER);
		var helperLabel = helper.query(DOT+CSS_TREE_DRAG_HELPER_LABEL);

		// show helper, we need display block here, yui dd hide it with display none
		helper.setStyle(DISPLAY, BLOCK).show();

		// set the CSS_TREE_DRAG_HELPER_LABEL html with the label of the dragged node
		helperLabel.html( dragTreeNode.get(LABEL) );

		// update the DRAG_NODE with the new helper
		drag.set(DRAG_NODE, helper);
 	},

	_onDropOver: function(event) {
		var instance = this;

		instance._updateNodeState(event);
	},

	_onDropHit: function(event) {
		var instance = this;
		var dropAction = instance.dropAction;
		var dragNode = event.drag.get(NODE).get(PARENT_NODE);
		var dropNode = event.drop.get(NODE).get(PARENT_NODE);
		var dropTreeNode = instance.getNodeById( dropNode.get(ID) );
		var dragTreeNode = instance.getNodeById( dragNode.get(ID) );

		if (dropAction == ABOVE) {
			dropTreeNode.insertBefore(dragTreeNode);
		}
		else if (dropAction == BELOW) {
			dropTreeNode.insertAfter(dragTreeNode);
		}
		else if (dropAction == APPEND) {
			if (!dropTreeNode.isLeaf()) {
				dropTreeNode.appendChild(dragTreeNode);

				if (!dropTreeNode.get(EXPANDED)) {
					// expand node when drop a child on it
					dropTreeNode.expand();
				}
			}
		}

		instance._resetState(instance.nodeContent);
	},

	_onDropExit: function() {
		var instance = this;

		instance.dropAction = null;

		instance._resetState(instance.nodeContent);
	}
});

A.TreeViewDD = TreeViewDD;

}, '@VERSION', { requires: [ 'tree-node', 'dd' ] });