AUI.add('aui-tree-data', function(A) {
/**
 * The TreeData Utility
 *
 * @module aui-tree
 * @submodule aui-tree-data
 */

var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isObject = L.isObject,
	isUndefined = L.isUndefined,

	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CONTAINER = 'container',
	DOT = '.',
	ID = 'id',
	INDEX = 'index',
	LAZY_LOAD = 'lazyLoad',
	LEAF = 'leaf',
	NEXT_SIBLING = 'nextSibling',
	NODE = 'node',
	OWNER_TREE = 'ownerTree',
	PARENT_NODE = 'parentNode',
	PREV_SIBLING = 'prevSibling',
	PREVIOUS_SIBLING = 'previousSibling',
	TREE = 'tree',
	TREE_NODE = 'tree-node',
	TREE_DATA = 'tree-data',

	isTreeNode = function(v) {
		return ( A.instanceOf(v, A.TreeNode) );
	},

	isTreeView = function(v) {
		return ( A.instanceOf(v, A.TreeView) );
	},

	getCN = A.getClassName,

	CSS_TREE_NODE = getCN(TREE, NODE);

/**
 * A base class for TreeData, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Handle the data of the tree</li>
 *    <li>Basic DOM implementation (append/remove/insert)</li>
 *    <li>Indexing management to handle the children nodes</li>
 * </ul>
 *
 * Check the list of <a href="TreeData.html#configattributes">Configuration Attributes</a> available for
 * TreeData.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeData
 * @constructor
 * @extends Base
 */

var TreeData = function () {};

TreeData.ATTRS = {
	/**
	 * Container to nest children nodes. If has cntainer it's not a leaf.
	 *
	 * @attribute container
	 * @default null
	 * @type Node | String
	 */
	container: {
		setter: A.one
	},

	/**
	 * Array of children (i.e. could be a JSON metadata object or a TreeNode instance).
	 *
	 * @attribute children
	 * @default []
	 * @type Array
	 */
	children: {
		value: [],
		validator: isArray,
		setter: '_setChildren'
	},

	/**
	 * Index the nodes.
	 *
	 * @attribute index
	 * @default {}
	 * @type Object
	 */
	index: {
		value: {}
	}
};

A.mix(TreeData.prototype, {
	_indexPrimed: false,

	childrenLength: 0,

	/**
	 * Construction logic executed during TreeData instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initTreeData: function() {
		var instance = this;

		// binding on initializer, needed before .render() phase
		instance.publish('move');
		instance.publish('append', { defaultFn: instance._appendChild });
		instance.publish('remove', { defaultFn: instance._removeChild });
	},

	/**
	 * Descructor lifecycle implementation for the TreeData class.
	 * Purges events attached to the node (and all child nodes).
	 *
	 * @method destructor
	 * @protected
	 */
	destructor: function() {
		var instance = this;

		instance.eachChildren(function(node) {
			node.destroy();
		}, true);
	},

	/**
	 * Get a TreeNode by id.
	 *
	 * @method getNodeById
	 * @param {String} uid
	 * @return {TreeNode}
	 */
	getNodeById: function(uid) {
		var instance = this;

		if (!instance._indexPrimed) {
			instance.refreshIndex();
		}

		return instance.get(INDEX)[uid];
	},

	/**
	 * Whether the TreeNode is registered on this TreeData.
	 *
	 * @method isRegistered
	 * @param {TreeNode} node
	 * @return {boolean}
	 */
	isRegistered: function(node) {
		var instance = this;

		return !!(instance.get(INDEX)[ node.get(ID) ]);
	},

	/**
	 * Update the references of the passed TreeNode.
	 *
	 * @method updateReferences
	 * @param {node} TreeNode
	 * @param {parentNode} TreeNode
	 * @param {ownerTree} TreeView
	 */
	updateReferences: function(node, parentNode, ownerTree) {
		var instance = this;
		var oldParent = node.get(PARENT_NODE);
		var oldOwnerTree = node.get(OWNER_TREE);
		var moved = oldParent && (oldParent !== parentNode);

		if (oldParent) {
			if (moved) {
				// when moved update the oldParent children
				var children = oldParent.get(CHILDREN);

				A.Array.removeItem(children, node);

				oldParent.set(CHILDREN, children);
			}

			oldParent.unregisterNode(node);
		}

		if (oldOwnerTree) {
			oldOwnerTree.unregisterNode(node);
		}

		// update parent reference when registered
		node.set(PARENT_NODE, parentNode);

		// update the ownerTree of the node
		node.set(OWNER_TREE, ownerTree);

		if (parentNode) {
			// register the new node on the parentNode index
			parentNode.registerNode(node);
		}

		if (ownerTree) {
			// register the new node to the ownerTree index
			ownerTree.registerNode(node);
		}

		if (oldOwnerTree != ownerTree) {
			// when change the OWNER_TREE update the children references also
			node.eachChildren(function(child) {
				instance.updateReferences(child, child.get(PARENT_NODE), ownerTree);
			});
		}

		// trigger move event
		if (moved) {
			var output = instance.getEventOutputMap(node);

			if (!oldParent.get(CHILDREN).length) {
				oldParent.collapse();
				oldParent.hideHitArea();
			}

			output.tree.oldParent = oldParent;
			output.tree.oldOwnerTree = oldOwnerTree;

			instance.bubbleEvent('move', output);
		}
	},

	/**
	 * Refresh the index (i.e. re-index all nodes).
	 *
	 * @method refreshIndex
	 */
	refreshIndex: function() {
		var instance = this;

		// reset index
		instance.updateIndex({});

		// get all descendent children - deep
		instance.eachChildren(function(node) {
			instance.registerNode(node);
		}, true);
	},

	/**
	 * Register the passed TreeNode on this TreeData.
	 *
	 * @method registerNode
	 * @param {TreeNode} node
	 */
	registerNode: function(node) {
		var instance = this;
		var uid = node.get(ID);
		var index = instance.get(INDEX);

		if (uid) {
			index[uid] = node;
		}

		if (isTreeView(instance)) {
			node.addTarget(instance);

			// when the node is appended to the TreeView set the OWNER_TREE
			node.set(OWNER_TREE, instance);
		}

		node._inheritOwnerTreeAttrs();

		instance.updateIndex(index);
	},

	/**
	 * Update the <a href="TreeData.html#config_index">index</a> attribute value.
	 *
	 * @method updateIndex
	 * @param {Object} index
	 */
	updateIndex: function(index) {
		var instance = this;

		if (index) {
			instance._indexPrimed = true;

			instance.set(INDEX, index);
		}
	},

	/**
	 * Unregister the passed TreeNode from this TreeData.
	 *
	 * @method unregisterNode
	 * @param {TreeNode} node
	 */
	unregisterNode: function(node) {
		var instance = this;
		var index = instance.get(INDEX);

		delete index[ node.get(ID) ];

		if (isTreeView(instance)) {
			node.removeTarget(instance);
		}

		instance.updateIndex(index);
	},

	/**
	 * Collapse all children of the TreeData.
	 *
	 * @method collapseAll
	 */
	collapseAll: function() {
		var instance = this;

		instance.eachChildren(function(node) {
			node.collapse();
		}, true);
	},

	/**
	 * Expand all children of the TreeData.
	 *
	 * @method expandAll
	 */
	expandAll: function() {
		var instance = this;

		instance.eachChildren(function(node) {
			node.expand();
		}, true);
	},

	/**
	 * Select all children of the TreeData.
	 *
	 * @method selectAll
	 */
	selectAll: function() {
		var instance = this;

		instance.eachChildren(function(child) {
			child.select();
		}, true);
	},

	/**
	 * Unselect all children of the TreeData.
	 *
	 * @method unselectAll
	 */
	unselectAll: function() {
		var instance = this;

		instance.eachChildren(function(child) {
			child.unselect();
		}, true);
	},

	/**
	 * Loop each children and execute the <code>fn</code> callback.
	 *
	 * @method eachChildren
	 * @param {function} fn callback
	 * @param {boolean} fn recursive
	 */
	eachChildren: function(fn, deep) {
		var instance = this;
		var children = instance.getChildren(deep);

		A.Array.each(children, function(node) {
			if (node) {
				fn.apply(instance, arguments);
			}
		});
	},

	/**
	 * Loop each parent node and execute the <code>fn</code> callback.
	 *
	 * @method eachParent
	 * @param {function} fn callback
	 */
	eachParent: function(fn) {
		var instance = this;
		var parentNode = instance.get(PARENT_NODE);

		while (parentNode) {
			if (parentNode) {
				fn.call(instance, parentNode);
			}
			parentNode = parentNode.get(PARENT_NODE);
		}
	},

	/**
	 * Bubble event to all parent nodes.
	 *
	 * @method bubbleEvent
	 * @param {String} eventType
	 * @param {Array} args
	 * @param {boolean} cancelBubbling
	 * @param {boolean} stopActionPropagation
	 */
	bubbleEvent: function(eventType, args, cancelBubbling, stopActionPropagation) {
		var instance = this;

		// event.stopActionPropagation === undefined, invoke the event native action
		instance.fire(eventType, args);

		if (!cancelBubbling) {
			var parentNode = instance.get(PARENT_NODE);

			// Avoid execution of the native action (private methods) while propagate
			// for example: private _appendChild() is invoked only on the first level of the bubbling
			// the intention is only invoke the user callback on parent nodes.
			args = args || {};

			if (isUndefined(stopActionPropagation)) {
				stopActionPropagation = true;
			}

			args.stopActionPropagation = stopActionPropagation;

			while(parentNode) {
				parentNode.fire(eventType, args);
				parentNode = parentNode.get(PARENT_NODE);
			}
		}
	},

	/**
	 * Create a TreeNode instance.
	 *
	 * @method createNode
	 * @param {Object} options
	 * @return {TreeNode}
	 */
	createNode: function(options) {
		var instance = this;
		var classType = A.TreeNode.nodeTypes[ isObject(options) ? options.type : options ] || A.TreeNode;

		return new classType(
			isObject(options) ? options : {}
		);
	},

	/**
	 * Append a child node to the TreeData.
	 *
	 * @method appendChild
	 * @param {TreeNode} node
	 * @param {boolean} cancelBubbling
	 */
	appendChild: function(node, cancelBubbling) {
		var instance = this;
		var output = instance.getEventOutputMap(node);

		instance.bubbleEvent('append', output, cancelBubbling);
	},

	/**
	 * Append a child node to the TreeData.
	 *
	 * @method _appendChild
	 * @param {TreeNode} node
	 * @param {boolean} cancelBubbling
	 * @protected
	 */
	_appendChild: function(event) {
		// stopActionPropagation while bubbling
		if (event.stopActionPropagation) {
			return false;
		}

		var instance = this;
		var node = event.tree.node;
		var ownerTree = instance.get(OWNER_TREE);
		var children = instance.get(CHILDREN);

		// updateReferences first
		instance.updateReferences(node, instance, ownerTree);
		// and then set the children, to have the appendChild propagation
		// the PARENT_NODE references should be updated
		var length = children.push(node);

		instance.childrenLength = children.length;

		// updating prev/nextSibling attributes
		var prevIndex = length - 2;
		var prevSibling = instance.item(prevIndex);

		node._nextSibling = null;
		node._prevSibling = prevSibling;

		// render node
		node.render(instance.get(CONTAINER));
	},

	/**
	 * Get a TreeNode children by index.
	 *
	 * @method item
	 * @param {Number} index
	 * @return {TreeNode}
	 */
	item: function(index) {
		var instance = this;

		return instance.get(CHILDREN)[index];
	},

	/**
	 * Index of the passed TreeNode on the <a
     * href="TreeData.html#config_children">children</a> attribute.
	 *
	 * @method indexOf
	 * @param {TreeNode} node
	 * @return {Number}
	 */
	indexOf: function(node) {
		var instance = this;

		return A.Array.indexOf( instance.get(CHILDREN), node );
	},

	/**
	 * Whether the TreeData contains children or not.
	 *
	 * @method hasChildNodes
	 * @return {boolean}
	 */
	hasChildNodes: function() {
		var instance = this;

		return (instance.getChildrenLength() > 0);
	},

	/**
	 * Get an Array of the children nodes of the current TreeData.
	 *
	 * @method getChildren
	 * @param {boolean} deep
	 * @return {Array}
	 */
	getChildren: function(deep) {
		var instance = this;
		var cNodes = [];
		var children = instance.get(CHILDREN);

		cNodes = cNodes.concat(children);

		if (deep) {
			instance.eachChildren(function(child) {
				cNodes = cNodes.concat( child.getChildren(deep) );
			});
		}

		return cNodes;
	},

	getChildrenLength: function() {
		var instance = this;

		return (instance.childrenLength || instance.get(CHILDREN).length);
	},

	/**
	 * Get an object containing metadata for the custom events.
	 *
	 * @method getEventOutputMap
	 * @param {TreeData} node
	 * @return {Object}
	 */
	getEventOutputMap: function(node) {
		var instance = this;

		return {
			tree: {
				instance: instance,
				node: node || instance
			}
		};
	},

	/**
	 * Remove the passed <code>node</code> from the current TreeData.
	 *
	 * @method removeChild
	 * @param {TreeData} node
	 */
	removeChild: function(node) {
		var instance = this;
		var output = instance.getEventOutputMap(node);

		instance.bubbleEvent('remove', output);
	},

	/**
	 * Remove the passed <code>node</code> from the current TreeData.
	 *
	 * @method _removeChild
	 * @param {TreeData} node
	 */
	_removeChild: function(event) {
		// stopActionPropagation while bubbling
		if (event.stopActionPropagation) {
			return false;
		}

		var instance = this;
		var node = event.tree.node;
		var ownerTree = instance.get(OWNER_TREE);

		if (instance.isRegistered(node)) {
			// update parent reference when removed
			node.set(PARENT_NODE, null);

			// unregister the node
			instance.unregisterNode(node);

			// no parent, no ownerTree
			node.set(OWNER_TREE, null);

			if (ownerTree) {
				// unregister the removed node from the tree index
				ownerTree.unregisterNode(node);
			}

			// remove child from the container
			node.get(BOUNDING_BOX).remove();

			var children = instance.get(CHILDREN);

			A.Array.removeItem(children, node);
			instance.set(CHILDREN, children);
		}
	},

	/**
	 * Delete all children of the current TreeData.
	 *
	 * @method empty
	 */
	empty: function() {
		var instance = this;

		instance.eachChildren(function(node) {
			var parentNode = node.get(PARENT_NODE);

			if (parentNode) {
				parentNode.removeChild(node);
			}
		});
	},

	/**
	 * Insert <code>treeNode</code> before or after the <code>refTreeNode</code>.
	 *
	 * @method insert
	 * @param {TreeNode} treeNode
	 * @param {TreeNode} refTreeNode
	 * @param {TreeNode} where 'before' or 'after'
	 */
	insert: function(treeNode, refTreeNode, where) {
		var instance = this;
		refTreeNode = refTreeNode || this;

		if (refTreeNode === treeNode) {
			return false; // NOTE: return
		}

		var refParentTreeNode = refTreeNode.get(PARENT_NODE);

		if (treeNode && refParentTreeNode) {
			var nodeBoundingBox = treeNode.get(BOUNDING_BOX);
			var refBoundingBox = refTreeNode.get(BOUNDING_BOX);
			var ownerTree = refTreeNode.get(OWNER_TREE);

			if (where === 'before') {
				refBoundingBox.placeBefore(nodeBoundingBox);
			}
			else if (where === 'after') {
				refBoundingBox.placeAfter(nodeBoundingBox);
			}

			var refSiblings = [];
			// using the YUI selector to regenerate the index based on the real dom
			// this avoid misscalculations on the nodes index number
			var DOMChildren = refParentTreeNode.get(BOUNDING_BOX).all('> ul > li');

			DOMChildren.each(function(child) {
				refSiblings.push( child.getData(TREE_NODE) );
			});

			// updating prev/nextSibling attributes
			var nextSiblingNode = nodeBoundingBox.get(NEXT_SIBLING);

			treeNode.set(NEXT_SIBLING, nextSiblingNode && nextSiblingNode.getData(TREE_NODE));

			var prevSiblingNode = nodeBoundingBox.get(PREVIOUS_SIBLING);

			treeNode.set(PREV_SIBLING, prevSiblingNode && prevSiblingNode.getData(TREE_NODE));

			// update all references
			refTreeNode.updateReferences(treeNode, refParentTreeNode, ownerTree);

			// updating refParentTreeNode childTreeNodes
			refParentTreeNode.set(CHILDREN, refSiblings);
		}

		// render treeNode after it's inserted
		treeNode.render();

		// invoking insert event
		var output = refTreeNode.getEventOutputMap(treeNode);

		output.tree.refTreeNode = refTreeNode;

		refTreeNode.bubbleEvent('insert', output);
	},

	/**
	 * Insert <code>treeNode</code> after the <code>refTreeNode</code>.
	 *
	 * @method insertAfter
	 * @param {TreeNode} treeNode
	 * @param {TreeNode} refTreeNode
	 */
	insertAfter: function(treeNode, refTreeNode) {
		var instance = this;

		instance.insert(treeNode, refTreeNode, 'after');
	},

	/**
	 * Insert <code>treeNode</code> before the <code>refTreeNode</code>.
	 *
	 * @method insertBefore
	 * @param {TreeNode} treeNode
	 * @param {TreeNode} refTreeNode
	 */
	insertBefore: function(treeNode, refTreeNode) {
		var instance = this;

		instance.insert(treeNode, refTreeNode, 'before');
	},

	/**
	 * Get a TreeNode instance by a child DOM Node.
	 *
	 * @method getNodeByChild
	 * @param {Node} child
	 * @return {TreeNode}
	 */
	getNodeByChild: function(child) {
		var instance = this;
		var treeNodeEl = child.ancestor(DOT+CSS_TREE_NODE);

		if (treeNodeEl) {
			return treeNodeEl.getData(TREE_NODE);
		}

		return null;
	},

	_inheritOwnerTreeAttrs: L.emptyFn,

	/**
	 * Setter for <a href="TreeData.html#config_children">children</a>.
	 *
	 * @method _setChildren
	 * @protected
	 * @param {Array} v
	 * @return {Array}
	 */
	_setChildren: function(v) {
		var instance = this;
		var childNodes = [];
		var container = instance.get(CONTAINER);

		if (!container) {
			container = instance._createNodeContainer();
		}

		instance.childrenLength = v.length;

		// before render the node, make sure the PARENT_NODE and OWNER_TREE references are updated
		// this is required on the render phase of the TreeNode (_createNodeContainer)
		// to propagate the events callback (appendChild/expand)
		var ownerTree = instance;

		if (isTreeNode(instance)) {
			ownerTree = instance.get(OWNER_TREE);
		}

		var hasOwnerTree = isTreeView(ownerTree);
		var lazyLoad = true;

		if (hasOwnerTree) {
			lazyLoad = ownerTree.get(LAZY_LOAD);
		}

		instance.updateIndex({});

		if (instance.childrenLength > 0) {
			instance.set(LEAF, false);
		}

		A.Array.each(v, function(node, index) {
			if (node) {
				if (!isTreeNode(node) && isObject(node)) {
					// cache and remove children to lazy add them later for
					// performance reasons
					var children = node[CHILDREN];
					var hasChildren = children && children.length;

					node[OWNER_TREE] = ownerTree;
					node[PARENT_NODE] = instance;

					if (hasChildren && lazyLoad) {
						delete node[CHILDREN];
					}

					// creating node from json
					var jsonNode = node;

					node = instance.createNode(node);

					if (hasChildren && lazyLoad) {
						jsonNode.children = children;

						node.childrenLength = children.length;

						A.setTimeout(function() {
							node.set(CHILDREN, children);
						}, 50);
					}
				}

				instance.registerNode(node);

				if (hasOwnerTree) {
					ownerTree.registerNode(node);
				}

				node.render(container);

				// avoid duplicated children on the childNodes list
				if (A.Array.indexOf(childNodes, node) === -1) {
					childNodes.push(node);
				}
			}
		});

		return childNodes;
	}
});

A.TreeData = TreeData;

}, '@VERSION@' ,{requires:['aui-base','aui-task-manager'], skinnable:false});
AUI.add('aui-tree-node', function(A) {
/**
 * The TreeNode Utility
 *
 * @module aui-tree
 * @submodule aui-tree-node
 */

var Lang = A.Lang,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,

	ALWAYS_SHOW_HITAREA = 'alwaysShowHitArea',
	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CLEARFIX = 'clearfix',
	COLLAPSED = 'collapsed',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	DRAGGABLE = 'draggable',
	EXPANDED = 'expanded',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	HIT_AREA_EL = 'hitAreaEl',
	HITAREA = 'hitarea',
	ICON = 'icon',
	ICON_EL = 'iconEl',
	INVALID = 'invalid',
	ID = 'id',
	LABEL = 'label',
	LABEL_EL = 'labelEl',
	LAST_SELECTED = 'lastSelected',
	LEAF = 'leaf',
	NODE = 'node',
	OVER = 'over',
	OWNER_TREE = 'ownerTree',
	PARENT_NODE = 'parentNode',
	RADIO = 'radio',
	RENDERED = 'rendered',
	SELECTED = 'selected',
	SPACE = ' ',
	TREE = 'tree',
	TREE_NODE = 'tree-node',

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isTreeNode = function(v) {
		return (v instanceof A.TreeNode);
	},

	isTreeView = function(v) {
		return (v instanceof A.TreeView);
	},

	getCN = A.getClassName,

	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_TREE_COLLAPSED = getCN(TREE, COLLAPSED),
	CSS_TREE_CONTAINER = getCN(TREE, CONTAINER),
	CSS_TREE_CONTENT_BOX = getCN(TREE, CONTENT_BOX),
	CSS_TREE_EXPANDED = getCN(TREE, EXPANDED),
	CSS_TREE_HIDDEN = getCN(TREE, HIDDEN),
	CSS_TREE_HITAREA = getCN(TREE, HITAREA),
	CSS_TREE_ICON = getCN(TREE, ICON),
	CSS_TREE_LABEL = getCN(TREE, LABEL),
	CSS_TREE_NODE = getCN(TREE, NODE),
	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),
	CSS_TREE_NODE_CONTENT_INVALID = getCN(TREE, NODE, CONTENT, INVALID),
	CSS_TREE_NODE_HIDDEN_HITAREA = getCN(TREE, NODE, HIDDEN, HITAREA),
	CSS_TREE_NODE_LEAF = getCN(TREE, NODE, LEAF),
	CSS_TREE_NODE_OVER = getCN(TREE, NODE, OVER),
	CSS_TREE_NODE_SELECTED = getCN(TREE, NODE, SELECTED),

	HIT_AREA_TPL = '<div class="' + CSS_TREE_HITAREA + '"></div>',
	ICON_TPL = '<div class="' + CSS_TREE_ICON + '"></div>',
	LABEL_TPL = '<div class="' + CSS_TREE_LABEL + '"></div>',
	NODE_CONTAINER_TPL = '<ul></ul>',

	NODE_BOUNDING_TEMPLATE = '<li class="' + CSS_TREE_NODE + '"></li>',
	NODE_CONTENT_TEMPLATE = '<div class="' + concat(CSS_HELPER_CLEARFIX, CSS_TREE_NODE_CONTENT) + '"></div>';

/**
 * A base class for TreeNode, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>The node for the TreeView component</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.TreeNode({
	boundingBox: ''
}).render();
 * </code></pre>
 *
 * Check the list of <a href="TreeNode.html#configattributes">Configuration Attributes</a> available for
 * TreeNode.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNode
 * @constructor
 * @extends TreeData
 */
var TreeNode = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeNode.
		 *
		 * @property TreeNode.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Always show the hitarea icon.
			 *
			 * @attribute alwaysShowHitArea
			 * @default true
			 * @type boolean
			 */
			alwaysShowHitArea: {
				validator: isBoolean,
				value: true
			},

			boundingBox: {
				valueFn: function() {
					return A.Node.create(NODE_BOUNDING_TEMPLATE);
				}
			},

			contentBox: {
				valueFn: function() {
					return A.Node.create(NODE_CONTENT_TEMPLATE);
				}
			},

			/**
			 * If true the TreeNode is draggable.
			 *
			 * @attribute draggable
			 * @default true
			 * @type boolean
			 */
			draggable: {
				validator: isBoolean,
				value: true
			},

			/**
			 * Whether the TreeNode is expanded by default.
			 *
			 * @attribute expanded
			 * @default false
			 * @type boolean
			 */
			expanded: {
				validator: isBoolean,
				value: false
			},

			/**
			 * Hitarea element.
			 *
			 * @attribute hitAreaEl
			 * @default Generated DOM element.
			 * @type Node | String
			 */
			hitAreaEl: {
				setter: A.one,
				valueFn: function() {
					return A.Node.create(HIT_AREA_TPL);
				}
			},

			/**
			 * Icon element.
			 *
			 * @attribute iconEl
			 * @type Node | String
			 */
			iconEl: {
				setter: A.one,
				valueFn: function() {
					return A.Node.create(ICON_TPL);
				}
			},

			/**
			 * Id of the TreeNode.
			 *
			 * @attribute id
			 * @default null
			 * @type String
			 */
			id: {
				validator: isString,
				valueFn: function() {
					return A.guid();
				}
			},

			/**
			 * Label of the TreeNode.
			 *
			 * @attribute label
			 * @default ''
			 * @type String
			 */
			label: {
				validator: isString,
				value: BLANK
			},

			/**
			 * Label element to house the <code>label</code> attribute.
			 *
			 * @attribute labelEl
			 * @default Generated DOM element.
			 * @type Node | String
			 */
			labelEl: {
				setter: A.one,
				valueFn: function() {
					var instance = this;

					var label = instance.get(LABEL);

					return A.Node.create(LABEL_TPL).html(label).unselectable();
				}
			},

			/**
			 * Whether the TreeNode could have children or not (i.e. if any
			 * children is present the TreeNode is a leaf).
			 *
			 * @attribute leaf
			 * @default true
			 * @type boolean
			 */
			leaf: {
				setter: function(v) {
					var instance = this;

					// if has children it's not a leaf
					if (v && instance.get(CHILDREN).length) {
						return false;
					}

					return v;
				},
				validator: isBoolean,
				value: true
			},

			/**
			 * Next sibling of the current TreeNode.
			 *
			 * @attribute nextSibling
			 * @default null
			 * @type TreeNode
			 */
			nextSibling: {
				getter: '_getSibling',
				validator: isTreeNode,
				value: null
			},

			/**
			 * TreeView which contains the current TreeNode.
			 *
			 * @attribute ownerTree
			 * @default null
			 * @type TreeView
			 */
			ownerTree: {
				value: null
			},

			/**
			 * Parent node of the current TreeNode.
			 *
			 * @attribute parentNode
			 * @default null
			 * @type TreeNode
			 */
			parentNode: {
				validator: function(val) {
					return isTreeNode(val) || isTreeView(val);
				},
				value: null
			},

			/**
			 * Previous sibling of the current TreeNode.
			 *
			 * @attribute prevSibling
			 * @default null
			 * @type TreeNode
			 */
			prevSibling: {
				getter: '_getSibling',
				validator: isTreeNode,
				value: null
			},

			rendered: {
				validator: isBoolean,
				value: false
			},

			tabIndex: {
				value: null
			}
		},

		AUGMENTS: [A.TreeData],

		EXTENDS: A.Base,

		prototype: {
			/**
			 * Replaced BOUNDING_TEMPLATE with NODE_BOUNDING_TEMPLATE.
			 *
			 * @property BOUNDING_TEMPLATE
			 * @type String
			 * @protected
			 */
			BOUNDING_TEMPLATE: NODE_BOUNDING_TEMPLATE,
			/**
			 * Replaced CONTENT_TEMPLATE with NODE_CONTENT_TEMPLATE.
			 *
			 * @property CONTENT_TEMPLATE
			 * @type String
			 * @protected
			 */
			CONTENT_TEMPLATE: NODE_CONTENT_TEMPLATE,

			/**
			 * Construction logic executed during TreeNode instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			initializer: function() {
				var instance = this;

				instance.get(BOUNDING_BOX).setData(TREE_NODE, instance);

				// Sync the Widget TreeNode id with the BOUNDING_BOX id
				instance._syncTreeNodeBBId();

				instance._uiSetDraggable(instance.get(DRAGGABLE));
				instance._uiSetExpanded(instance.get(EXPANDED));
				instance._uiSetLeaf(instance.get(LEAF));

				instance.initTreeData();
			},

			/**
			 * Bind the events on the TreeNode UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));
				instance.after('draggableChange', A.bind(instance._afterDraggableChange, instance));
				instance.after('expandedChange', A.bind(instance._afterExpandedChange, instance));
				instance.after('idChange', instance._afterSetId, instance);
				instance.after('leafChange', A.bind(instance._afterLeafChange, instance));
			},

			render: function(container) {
				var instance = this;

				if (!instance.get(RENDERED)) {
					instance.renderUI();
					instance.bindUI();
					instance.syncUI();

					instance.set(RENDERED, true);
				}

				if (container) {
					var boundingBox = instance.get(BOUNDING_BOX);
					var parentNode = instance.get(PARENT_NODE);

					boundingBox.appendTo(container);

					if (parentNode) {
						var paginator = parentNode.get(PAGINATOR);

						if (paginator) {
							boundingBox.insertBefore(paginator.element, null);
						}
					}
				}
			},

			/**
			 * Create the DOM structure for the TreeNode. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				var instance = this;

				instance._renderBoundingBox();
				instance._renderContentBox();
			},

			/**
			 * Sync the TreeNode UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				var instance = this;

				instance._syncIconUI();
			},

			/*
			* Methods
			*/

			append: function(node) {
				var instance = this;

				instance.appendChild(node);
			},

			/*
			* Methods
			*/

			appendChild: function() {
				var instance = this;

				if (!instance.isLeaf()) {
					A.TreeNode.superclass.appendChild.apply(instance, arguments);
				}
			},

			/**
			 * Collapse the current TreeNode.
			 *
			 * @method collapse
			 */
			collapse: function() {
				var instance = this;

				instance.set(EXPANDED, false);
			},

			collapseAll: function() {
				var instance = this;

				A.TreeNode.superclass.collapseAll.apply(instance, arguments);

				// instance is also a node, so collapse itself
				instance.collapse();
			},

			/**
			 * Check if the current TreeNode contains the passed <code>node</code>.
			 *
			 * @method contains
			 * @param {TreeNode} node
			 * @return {boolean}
			 */
			contains: function(node) {
				var instance = this;

				return node.isAncestor(instance);
			},

			/**
			 * Expand the current TreeNode.
			 *
			 * @method expand
			 */
			expand: function() {
				var instance = this;

				instance.set(EXPANDED, true);
			},

			expandAll: function() {
				var instance = this;

				A.TreeNode.superclass.expandAll.apply(instance, arguments);

				// instance is also a node, so expand itself
				instance.expand();
			},

			/**
			 * Get the depth of the current TreeNode.
			 *
			 * @method getDepth
			 * @return {Number}
			 */
			getDepth: function() {
				var instance = this;

				var depth = 0;

				var parentNode = instance.get(PARENT_NODE);

				while (parentNode) {
					++depth;

					parentNode = parentNode.get(PARENT_NODE);
				}

				return depth;
			},

			hasChildNodes: function() {
				var instance = this;

				return (!instance.isLeaf() && A.TreeNode.superclass.hasChildNodes.apply(instance, arguments));
			},

			/*
			* Hide hitarea icon.
			*
			* @method hideHitArea
			*/
			hideHitArea: function() {
				var instance = this;

				instance.get(HIT_AREA_EL).addClass(CSS_TREE_NODE_HIDDEN_HITAREA);
			},

			/**
			 * Whether the current TreeNode is ancestor of the passed <code>node</code> or not.
			 *
			 * @method isLeaf
			 * @return {boolean}
			 */
			isAncestor: function(node) {
				var instance = this;

				var parentNode = instance.get(PARENT_NODE);

				while (parentNode) {
					if (parentNode === node) {
						return true;
					}
					parentNode = parentNode.get(PARENT_NODE);
				}

				return false;
			},

			/**
			 * Whether the current TreeNode is a leaf or not.
			 *
			 * @method isLeaf
			 * @return {boolean}
			 */
			isLeaf: function() {
				var instance = this;

				return instance.get(LEAF);
			},

			/**
			 * Whether the current TreeNode is selected or not.
			 *
			 * @method isSelected
			 * @return {boolean}
			 */
			isSelected: function() {
				var instance = this;

				return instance.get(CONTENT_BOX).hasClass(CSS_TREE_NODE_SELECTED);
			},

			/*
			* Fires when <code>mouseout</code> the current TreeNode.
			*
			* @method over
			*/
			out: function() {
				var instance = this;

				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_OVER);
			},

			/*
			* Fires when <code>mouseover</code> the current TreeNode.
			*
			* @method over
			*/
			over: function() {
				var instance = this;

				instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_OVER);
			},

			/*
			* Select the current TreeNode.
			*
			* @method select
			*/
			select: function() {
				var instance = this;

				var ownerTree = instance.get(OWNER_TREE);

				if (ownerTree) {
					ownerTree.set(LAST_SELECTED, instance);
				}

				instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_SELECTED);

				instance.fire('select');
			},

			/*
			* Show hitarea icon.
			*
			* @method showHitArea
			*/
			showHitArea: function() {
				var instance = this;

				instance.get(HIT_AREA_EL).removeClass(CSS_TREE_NODE_HIDDEN_HITAREA);
			},

			/**
			 * Toggle the current TreeNode, <code>collapsed</code> or <code>expanded</code>.
			 *
			 * @method toggle
			 */
			toggle: function() {
				var instance = this;

				if (instance.get(EXPANDED)) {
					instance.collapse();
				}
				else {
					instance.expand();
				}
			},

			/*
			* Unselect the current TreeNode.
			*
			* @method unselect
			*/
			unselect: function() {
				var instance = this;

				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_SELECTED);

				instance.fire('unselect');
			},

			/**
			 * Fire after draggable change.
			 *
			 * @method _afterDraggableChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterDraggableChange: function(event) {
				var instance = this;

				instance._uiSetDraggable(event.newVal);
				instance._syncIconUI();
			},

			/**
			 * Fire after expanded change.
			 *
			 * @method _afterExpandedChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterExpandedChange: function(event) {
				var instance = this;

				instance._uiSetExpanded(event.newVal);
				instance._syncIconUI();
			},

			/**
			 * Fire after leaf change.
			 *
			 * @method _afterLeafChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterLeafChange: function(event) {
				var instance = this;

				instance._uiSetLeaf(event.newVal);
				instance._syncIconUI();
			},

			/**
			 * Fire after loading change.
			 *
			 * @method _afterLoadingChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterLoadingChange: function(event) {
				var instance = this;

				instance._syncIconUI();
			},

			/**
			 * Fire after set children.
			 *
			 * @method _afterSetChildren
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterSetChildren: function(event) {
				var instance = this;

				instance._syncIconUI();
			},

			/**
			 * Render the node container.
			 *
			 * @method _createNodeContainer
			 * @protected
			 * @return {Node}
			 */
			_createNodeContainer: function() {
				var instance = this;

				// creating <ul class="aui-tree-container">
				var nodeContainer = instance.get(CONTAINER) || A.Node.create(NODE_CONTAINER_TPL);

				nodeContainer.addClass(CSS_TREE_CONTAINER);

				// when it's not a leaf it has a <ul> container
				instance.set(CONTAINER, nodeContainer);

				return nodeContainer;
			},

			_getSibling: function(value, attrName) {
				var instance = this;

				var propName = '_' + attrName;
				var sibling = instance[propName];

				if (sibling !== null && !isTreeNode(sibling)) {
					sibling = null;

					instance[propName] = sibling;
				}

				return sibling;
			},

			/**
			 * Render the <code>boundingBox</code> node.
			 *
			 * @method _renderBoundingBox
			 * @protected
			 * @return {Node}
			 */
			_renderBoundingBox: function() {
				var instance = this;

				var boundingBox = instance.get(BOUNDING_BOX);
				var contentBox = instance.get(CONTENT_BOX);

				contentBox.append(instance.get(ICON_EL));
				contentBox.append(instance.get(LABEL_EL));

				boundingBox.append(contentBox);

				var nodeContainer = instance.get(CONTAINER);

				if (nodeContainer) {
					if (!instance.get(EXPANDED)) {
						nodeContainer.addClass(CSS_TREE_HIDDEN);
					}

					boundingBox.append(nodeContainer);
				}

				return boundingBox;
			},

			/**
			 * Render the <code>contentBox</code> node.
			 *
			 * @method _renderContentBox
			 * @protected
			 * @return {Node}
			 */
			_renderContentBox: function(v) {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);

				if (!instance.isLeaf()) {
					var expanded = instance.get(EXPANDED);

					// add folder css classes state
					contentBox.addClass(
						expanded ? CSS_TREE_EXPANDED : CSS_TREE_COLLAPSED
					);

					if (expanded) {
						instance.expand();
					}
				}

				return contentBox;
			},

			/**
			 * Sync the hitarea UI.
			 *
			 * @method _syncHitArea
			 * @protected
			 */
			_syncHitArea: function() {
				var instance = this;

				if (instance.get(ALWAYS_SHOW_HITAREA) || instance.getChildrenLength()) {
					instance.showHitArea();
				}
				else {
					instance.hideHitArea();

					instance.collapse();
				}
			},

			/**
			 * Sync the hitarea UI.
			 *
			 * @method _syncIconUI
			 * @param {Array} children
			 * @protected
			 */
			_syncIconUI: function() {
				var instance = this;

				instance._syncHitArea();
			},

			/**
			 * Set the <code>boundingBox</code> id.
			 *
			 * @method _syncTreeNodeBBId
			 * @param {String} id
			 * @protected
			 */
			_syncTreeNodeBBId: function(id) {
				var instance = this;

				instance.get(BOUNDING_BOX).attr(
					ID,
					instance.get(ID)
				);
			},

			_uiSetDraggable: function(val) {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);

				contentBox.toggleClass(CSS_TREE_NODE_CONTENT_INVALID, !val);
			},

			_uiSetExpanded: function(val) {
				var instance = this;

				if (!instance.isLeaf()) {
					var container = instance.get(CONTAINER);
					var contentBox = instance.get(CONTENT_BOX);

					if (val) {
						contentBox.replaceClass(CSS_TREE_COLLAPSED, CSS_TREE_EXPANDED);

						if (container) {
							container.removeClass(CSS_TREE_HIDDEN);
						}
					}
					else {
						contentBox.replaceClass(CSS_TREE_EXPANDED, CSS_TREE_COLLAPSED);

						if (container) {
							container.addClass(CSS_TREE_HIDDEN);
						}
					}
				}
			},

			_uiSetLeaf: function(val) {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);

				if (val) {
					instance.get(CONTAINER).remove();
					instance.get(HIT_AREA_EL).remove();
				}
				else {
					// append hitarea element
					contentBox.prepend( instance.get(HIT_AREA_EL) );

					// if has children append them to this model
					instance._createNodeContainer();

					instance._uiSetExpanded(instance.get(EXPANDED));
				}

				// add leaf css classes
				contentBox.toggleClass(CSS_TREE_NODE_LEAF, val);
			}
		}
	}
);

A.TreeNode = TreeNode;

/*
* TreeNodeIO
*/
var isFunction = Lang.isFunction,

	CACHE = 'cache',
	IO = 'io',
	LOADED = 'loaded',
	LOADING = 'loading',
	PAGINATOR = 'paginator',
	TREE_NODE_IO = 'tree-node-io',

	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);

/**
 * A base class for TreeNodeIO, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>Ajax support to load the children of the current TreeNode</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var treeNodeIO = new A.TreeNodeIO({
 *  	label: 'TreeNodeIO',
 *  	cache: false,
 *  	io: {
 *  		url: 'assets/content.html'
 *  	}
 *  });
 * </code></pre>
 *
 * Check the list of <a href="TreeNodeIO.html#configattributes">Configuration Attributes</a> available for
 * TreeNodeIO.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNodeIO
 * @constructor
 * @extends TreeNode
 */
var TreeNodeIO = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE_IO,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeNode.
		 *
		 * @property TreeNode.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Whether the current TreeNode should cache the loaded content or not.
			 *
			 * @attribute cache
			 * @default true
			 * @type boolean
			 */
			cache: {
				validator: isBoolean,
				value: true
			},

			leaf: {
				validator: isBoolean,
				value: false
			},

			/**
			 * Whether the current TreeNode has loaded the content.
			 *
			 * @attribute loaded
			 * @default false
			 * @type boolean
			 */
			loaded: {
				validator: isBoolean,
				value: false
			},

			/**
			 * Whether the current TreeNode IO transaction is loading.
			 *
			 * @attribute loading
			 * @default false
			 * @type boolean
			 */
			loading: {
				validator: isBoolean,
				value: false
			}
		},

		AUGMENTS: [A.TreeViewPaginator, A.TreeViewIO],

		EXTENDS: A.TreeNode,

		prototype: {
			/**
			 * Bind the events on the TreeNodeIO UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				A.TreeNodeIO.superclass.bindUI.apply(instance, arguments);

				instance.on('ioRequestSuccess', instance._onIOSuccess, instance);
			},

			syncUI: function() {
				var instance = this;

				A.TreeNodeIO.superclass.syncUI.apply(instance, arguments);
			},

			/*
			* Methods
			*/
			expand: function() {
				var instance = this;

				var cache = instance.get(CACHE);
				var io = instance.get(IO);
				var loaded = instance.get(LOADED);
				var loading = instance.get(LOADING);

				if (!cache) {
					// if cache is false on expand, always set LOADED to false
					instance.set(LOADED, false);
				}

				if (io && !loaded && !loading && !instance.hasChildNodes()) {
					if (!cache) {
						// remove all children to reload
						instance.empty();
					}

					instance.initIO();
				}
				else {
					A.TreeNodeIO.superclass.expand.apply(instance, arguments);
				}
			},

			/**
			 * If not specified on the TreeNode some attributes are inherited from the
			 * ownerTree by this method.
			 *
			 * @method _inheritOwnerTreeAttrs
			 * @protected
			 */
			_inheritOwnerTreeAttrs: function() {
				var instance = this;

				var ownerTree = instance.get(OWNER_TREE);

				if (ownerTree) {
					if (!instance.get(IO)) {
						var io = A.clone(
							ownerTree.get(IO),
							true,
							function(value, key) {
								if (isFunction(value) && (value.defaultFn || value.wrappedFn)) {
									return false;
								}

								return true;
							}
						);

						instance.set(IO, io);
					}

					if (!instance.get(PAGINATOR)) {
						var ownerTreePaginator = ownerTree.get(PAGINATOR);

						var paginator = A.clone(ownerTreePaginator);

						// make sure we are not using the same element passed to the ownerTree on the TreeNode
						if (paginator && paginator.element) {
							paginator.element = ownerTreePaginator.element.clone();
						}

						instance.set(PAGINATOR, paginator);
					}
				}
			},

			_onIOSuccess: function(event) {
				var instance = this;

				instance.expand();
			}
		}
	}
);

A.TreeNodeIO = TreeNodeIO;

/*
* TreeNodeCheck
*/
var	CHECKBOX = 'checkbox',
	CHECKED = 'checked',
	CHECK_CONTAINER_EL = 'checkContainerEl',
	CHECK_EL = 'checkEl',
	CHECK_NAME = 'checkName',
	DOT = '.',
	NAME = 'name',
	TREE_NODE_CHECK = 'tree-node-check',

	CSS_TREE_NODE_CHECKBOX = getCN(TREE, NODE, CHECKBOX),
	CSS_TREE_NODE_CHECKBOX_CONTAINER = getCN(TREE, NODE, CHECKBOX, CONTAINER),
	CSS_TREE_NODE_CHECKED = getCN(TREE, NODE, CHECKED),

	CHECKBOX_CONTAINER_TPL = '<div class="' + CSS_TREE_NODE_CHECKBOX_CONTAINER + '"></div>',
	CHECKBOX_TPL = '<input class="' + CSS_TREE_NODE_CHECKBOX + '" type="checkbox" />';

/**
 * <p><img src="assets/images/aui-tree-nod-check/main.png"/></p>
 *
 * A base class for TreeNodeCheck, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>Checkbox support for the TreeNode</li>
 * </ul>
 *
 * Check the list of <a href="TreeNodeCheck.html#configattributes">Configuration Attributes</a> available for
 * TreeNodeCheck.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNodeCheck
 * @constructor
 * @extends TreeNodeIO
 */
var TreeNodeCheck = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE_CHECK,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeNode.
		 *
		 * @property TreeNode.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Whether the TreeNode is checked or not.
			 *
			 * @attribute checked
			 * @default false
			 * @type boolean
			 */
			checked: {
				validator: isBoolean,
				value: false
			},

			/**
			 * Container element for the checkbox.
			 *
			 * @attribute checkContainerEl
			 * @default Generated DOM element.
			 * @type Node | String
			 */
			checkContainerEl: {
				setter: A.one,
				valueFn: function() {
					return A.Node.create(CHECKBOX_CONTAINER_TPL);
				}
			},

			/**
			 * Checkbox element.
			 *
			 * @attribute checkEl
			 * @default Generated DOM element.
			 * @type Node | String
			 */
			checkEl: {
				setter: A.one,
				valueFn: function() {
					var instance = this;

					var checkBoxId = instance.get(ID) + 'Checkbox';

					var attributes = {
						ID: checkBoxId,
						NAME: instance.get(CHECK_NAME)
					};

					return A.Node.create(CHECKBOX_TPL).attr(attributes);
				}
			},

			/**
			 * Name of the checkbox element used on the current TreeNode.
			 *
			 * @attribute checkName
			 * @default 'tree-node-check'
			 * @type String
			 */
			checkName: {
				value: TREE_NODE_CHECK,
				validator: isString
			}
		},

		EXTENDS: A.TreeNodeIO,

		prototype: {

			initializer: function() {
				var instance = this;

				instance._uiSetChecked(instance.get(CHECKED));
			},

			/*
			* Lifecycle
			*/
			renderUI: function() {
				var instance = this;

				A.TreeNodeCheck.superclass.renderUI.apply(instance, arguments);

				var checkEl = instance.get(CHECK_EL);
				var checkContainerEl = instance.get(CHECK_CONTAINER_EL);

				checkEl.hide();

				checkContainerEl.append(checkEl);

				instance.get(LABEL_EL).placeBefore(checkContainerEl);

				if (instance.isChecked()) {
					instance.check();
				}
			},

			bindUI: function() {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);

				A.TreeNodeCheck.superclass.bindUI.apply(instance, arguments);

				instance.after('checkedChange', A.bind(instance._afterCheckedChange, instance));

				contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_NODE_CHECKBOX_CONTAINER);
				contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT + CSS_TREE_LABEL);

				// cancel dblclick because of the check
				instance.get(LABEL_EL).swallowEvent('dblclick');
			},

			/**
			 * Check the current TreeNode.
			 *
			 * @method check
			 */
			check: function(originalTarget) {
				var instance = this;

				instance.set(
					CHECKED,
					true,
					{
						originalTarget: originalTarget
					}
				);
			},

			/*
			* Whether the current TreeNodeCheck is checked.
			*
			* @method isChecked
			* @return boolean
			*/
			isChecked: function() {
				var instance = this;

				return instance.get(CHECKED);
			},

			/**
			 * Toggle the check status of the current TreeNode.
			 *
			 * @method toggleCheck
			 */
			toggleCheck: function() {
				var instance = this;

				var checkEl = instance.get(CHECK_EL);

				var checked = checkEl.attr(CHECKED);

				if (!checked) {
					instance.check();
				}
				else {
					instance.uncheck();
				}
			},

			/**
			 * Uncheck the current TreeNode.
			 *
			 * @method uncheck
			 */
			uncheck: function(originalTarget) {
				var instance = this;

				instance.set(
					CHECKED,
					false,
					{
						originalTarget: originalTarget
					}
				);
			},

			_afterCheckedChange: function(event) {
				var instance = this;

				instance._uiSetChecked(event.newVal);
			},

			_uiSetChecked: function(val) {
				var instance = this;

				var checkEl = instance.get(CHECK_EL);
				var contentBox = instance.get(CONTENT_BOX);

				if (val) {
					contentBox.addClass(CSS_TREE_NODE_CHECKED);
					checkEl.attr(CHECKED, CHECKED);
				}
				else {
					contentBox.removeClass(CSS_TREE_NODE_CHECKED);
					checkEl.attr(CHECKED, BLANK);
				}
			}
		}
	}
);

A.TreeNodeCheck = TreeNodeCheck;

/*
* TreeNodeTask
*/
var	CHILD = 'child',
	TREE_NODE_TASK = 'tree-node-task',
	UNCHECKED = 'unchecked',

	isTreeNodeTask = function(node) {
		return node instanceof A.TreeNodeCheck;
	},

	CSS_TREE_NODE_CHILD_UNCHECKED = getCN(TREE, NODE, CHILD, UNCHECKED);

/**
 * <p><img src="assets/images/aui-treeNodeTask/main.png"/></p>
 *
 * A base class for TreeNodeTask, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>3 states checkbox support</li>
 *	<li>Automatic check/uncheck the parent status based on the children checked status</li>
 * </ul>
 *
 * Check the list of <a href="TreeNodeTask.html#configattributes">Configuration Attributes</a> available for
 * TreeNodeTask.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNodeTask
 * @constructor
 * @extends TreeNodeCheck
 */
var TreeNodeTask = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE_TASK,

		EXTENDS: A.TreeNodeCheck,

		prototype: {
			/*
			* Methods
			*/
			check: function(originalTarget) {
				var instance = this;

				originalTarget = originalTarget || instance;

				if (!instance.isLeaf()) {
					instance.eachChildren(
						function(child) {
							if (isTreeNodeTask(child)) {
								child.check(originalTarget);
							}
						}
					);
				}

				instance.eachParent(
					function(parentNode) {
						if (isTreeNodeTask(parentNode)) {
							var parentHasUncheckedDescendants = false;

							parentNode.eachChildren(function(child) {
								if ((child !== instance) && !child.isChecked()) {
									parentHasUncheckedDescendants = true;
								}
								else {
									var childHasUncheckedChild = child.get(CONTENT_BOX).hasClass(CSS_TREE_NODE_CHILD_UNCHECKED);

									if (childHasUncheckedChild) {
										parentHasUncheckedDescendants = true;
									}
								}
							});

							if (!parentHasUncheckedDescendants) {
								parentNode.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);
							}
						}
					}
				);

				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

				// invoke default check logic
				A.TreeNodeTask.superclass.check.call(instance, originalTarget);
			},

			uncheck: function(originalTarget) {
				var instance = this;

				originalTarget = originalTarget || instance;

				if (!instance.isLeaf()) {
					instance.eachChildren(
						function(child) {
							if (child instanceof A.TreeNodeCheck) {
								child.uncheck(originalTarget);
							}
						}
					);
				}

				instance.eachParent(
					function(parentNode) {
						if (isTreeNodeTask(parentNode) && parentNode.isChecked()) {
							parentNode.get(CONTENT_BOX).addClass(CSS_TREE_NODE_CHILD_UNCHECKED);
						}
					}
				);

				instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

				// invoke default uncheck logic
				A.TreeNodeTask.superclass.uncheck.call(instance, originalTarget);
			}
		}
	}
);

A.TreeNodeTask = TreeNodeTask;

/*
* TreeNodeRadio
*/

var	TREE_NODE_RADIO = 'tree-node-radio',

	isTreeNodeRadio = function(node) {
		return node instanceof A.TreeNodeRadio;
	},

	CSS_NODE_RADIO = getCN(TREE, NODE, RADIO),
	CSS_NODE_RADIO_CHECKED = getCN(TREE, NODE, RADIO, CHECKED);

/**
 * <p><img src="assets/images/aui-treeNodeRadio/main.png"/></p>
 *
 * A base class for TreeNodeRadio, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>3 states checkbox support</li>
 *	<li>Automatic check/uncheck the parent status based on the children checked status</li>
 * </ul>
 *
 * Check the list of <a href="TreeNodeRadio.html#configattributes">Configuration Attributes</a> available for
 * TreeNodeRadio.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeNodeRadio
 * @constructor
 * @extends TreeNodeTask
 */
var TreeNodeRadio = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNode.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE_RADIO,

		EXTENDS: A.TreeNodeCheck,

		prototype: {
			/*
			* Methods
			*/
			renderUI: function() {
				var instance = this;

				A.TreeNodeRadio.superclass.renderUI.apply(instance, arguments);

				instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO);
			},

			_uncheckNodesRadio: function(node) {
				var instance = this;

				var children;

				if (node) {
					children = node.get(CHILDREN);
				}
				else {
					var ownerTree = instance.get(OWNER_TREE);

					if (ownerTree) {
						children = ownerTree.get(CHILDREN);
					}
					else {
						return;
					}
				}

				A.Array.each(
					children,
					function(value, index, collection) {
						if (!value.isLeaf()) {
							instance._uncheckNodesRadio(value);
						}

						if (isTreeNodeRadio(value)) {
							value.uncheck();
						}
					}
				);
			},

			_uiSetChecked: function(val) {
				var instance = this;

				if (val) {
					instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO_CHECKED);
					instance.get(CHECK_EL).attr(CHECKED, CHECKED);
				}
				else {
					instance.get(CONTENT_BOX).removeClass(CSS_NODE_RADIO_CHECKED);
					instance.get(CHECK_EL).attr(CHECKED, BLANK);
				}
			},

			check: function() {
				var instance = this;

				instance._uncheckNodesRadio();

				A.TreeNodeRadio.superclass.check.apply(instance, arguments);
			}
		}
	}
);

A.TreeNodeRadio = TreeNodeRadio;

/**
 * TreeNode types hash map.
 *
 * <pre><code>A.TreeNode.nodeTypes = {
 *  check: A.TreeNodeCheck,
 *  io: A.TreeNodeIO,
 *  node: A.TreeNode,
 *  radio: A.TreeNodeRadio,
 *  task: A.TreeNodeTask
 *};</code></pre>
 *
 * @for TreeNode
 * @property A.TreeNode.nodeTypes
 * @type Object
 */
A.TreeNode.nodeTypes = {
	check: A.TreeNodeCheck,
	io: A.TreeNodeIO,
	node: A.TreeNode,
	radio: A.TreeNodeRadio,
	task: A.TreeNodeTask
};

}, '@VERSION@' ,{requires:['aui-tree-data','aui-tree-io','aui-tree-paginator','json','querystring-stringify'], skinnable:false});
AUI.add('aui-tree-paginator', function(A) {
var Lang = A.Lang,
	isObject = Lang.isObject,
	isValue = Lang.isValue,

	getCN = A.getClassName,

	CHILDREN = 'children',
	CONTAINER = 'container',
	END = 'end',
	IO = 'io',
	LIMIT = 'limit',
	MORE_RESULTS_LABEL = 'Load more results',
	NODE = 'node',
	OWNER_TREE = 'ownerTree',
	PAGINATOR = 'paginator',
	START = 'start',
	TREE = 'tree',
	TREE_NODE_IO = 'tree-node-io',

	EV_TREE_NODE_PAGINATOR_CLICK = 'paginatorClick',

	CSS_TREE_NODE_PAGINATOR = getCN(TREE, NODE, PAGINATOR),

	TPL_PAGINATOR = '<a class="' + CSS_TREE_NODE_PAGINATOR + '" href="javascript:void(0);">{moreResultsLabel}</a>';

function TreeViewPaginator(config) {
	var instance = this;

	A.after(instance._bindPaginatorUI, this, 'bindUI');

	A.after(instance._syncPaginatorUI, this, 'syncUI');
}

TreeViewPaginator.ATTRS = {
	paginator: {
		setter: function(value) {
			var instance = this;

			var paginatorNode = A.Node.create(
				Lang.sub(
					TPL_PAGINATOR,
					{
						moreResultsLabel: value.moreResultsLabel || MORE_RESULTS_LABEL
					}
				)
			);

			return A.merge(
				{
					alwaysVisible: false,
					autoFocus: true,
					element: paginatorNode,
					endParam: END,
					limitParam: LIMIT,
					start: 0,
					startParam: START
				},
				value
			);
		},
		validator: isObject
	}
};


TreeViewPaginator.prototype = {
	/**
	 * Bind events to the paginator "show more" link.
	 *
	 * @method _bindPaginatorUI
	 * @protected
	 */
	_bindPaginatorUI: function() {
		var instance = this;

		var paginator = instance.get(PAGINATOR);

		if (paginator) {
			paginator.element.on('click', A.bind(instance._handlePaginatorClickEvent, instance));
		}

		instance._createEvents();
	},

	/**
	 * Create custom events.
	 *
	 * @method _createEvents
	 * @private
	 */
	_createEvents: function() {
		var instance = this;

		instance.publish(
			EV_TREE_NODE_PAGINATOR_CLICK,
			{
				defaultFn: instance._defPaginatorClickFn,
				prefix: TREE_NODE_IO
			}
		);
	},

	/**
	 * Default paginatorClick event handler. Increment the
	 * <code>paginator.start</code> to the next <code>paginator.limit</code>.
	 *
	 * @method _defPaginatorClickFn
	 * @param {EventFacade} event The Event object
	 * @protected
	 */
	_defPaginatorClickFn: function(event) {
		var instance = this;

		var paginator = instance.get(PAGINATOR);

		if (isValue(paginator.limit)) {
			paginator.start = instance.getChildrenLength();
		}

		if (instance.get(IO)) {
			instance.initIO();
		}
	},

	/**
	 * Fires the paginatorClick event.
	 *
	 * @method _handlePaginatorClickEvent
	 * @param {EventFacade} event paginatorClick event facade
	 * @protected
	 */
	_handlePaginatorClickEvent: function(event) {
		var instance = this;

		var output = instance.getEventOutputMap(instance);

		instance.fire(EV_TREE_NODE_PAGINATOR_CLICK, output);

		event.halt();
	},

	/**
	 * Adds two extra IO data parameter to the request to handle the
	 * paginator. By default these parameters are <code>limit</code> and
	 * <code>start</code>.
	 *
	 * @method _syncPaginatorIOData
	 * @protected
	 */
	_syncPaginatorIOData: function(io) {
		var instance = this;

		var paginator = instance.get(PAGINATOR);

		if (paginator && isValue(paginator.limit)) {
			var data = io.cfg.data || {};

			data[ paginator.limitParam ] = paginator.limit;
			data[ paginator.startParam ] = paginator.start;
			data[ paginator.endParam ] = (paginator.start + paginator.limit);

			io.cfg.data = data;
		}
	},

	/**
	 * Sync the paginator link UI.
	 *
	 * @method _syncPaginatorUI
	 * @protected
	 */
	_syncPaginatorUI: function(newNodes) {
		var instance = this;

		var paginator = instance.get(PAGINATOR);

		if (paginator) {
			var hasMoreData = true;

			if (newNodes) {
				hasMoreData = (newNodes.length > 0);
			}

			var childrenLength = instance.getChildrenLength();
			var start = paginator.start;
			var total = paginator.total || childrenLength;

			var showPaginator = childrenLength && hasMoreData && (total > childrenLength);

			if (paginator.alwaysVisible || showPaginator) {
				instance.get(CONTAINER).append(
					paginator.element.show()
				);

				if (paginator.autoFocus) {
					try {
						paginator.element.focus();
					}
					catch(e) {}
				}
			}
			else {
				paginator.element.hide();
			}
		}
	}
};

A.TreeViewPaginator = TreeViewPaginator;

}, '@VERSION@' ,{requires:['aui-base'], skinnable:false});
AUI.add('aui-tree-view', function(A) {
/**
 * The TreeView Utility
 *
 * @module aui-tree
 * @submodule aui-tree-view
 */

var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,

	UA = A.UA,

	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	DOT = '.',
	FILE = 'file',
	HITAREA = 'hitarea',
	ICON = 'icon',
	INVALID = 'invalid',
	LABEL = 'label',
	LAST_SELECTED = 'lastSelected',
	LEAF = 'leaf',
	NODE = 'node',
	OWNER_TREE = 'ownerTree',
	ROOT = 'root',
	SELECT_ON_TOGGLE = 'selectOnToggle',
	SPACE = ' ',
	TREE = 'tree',
	TREE_NODE = 'tree-node',
	TREE_VIEW = 'tree-view',
	TYPE = 'type',
	VIEW = 'view',

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isTreeNode = function(v) {
		return ( v instanceof A.TreeNode );
	},

	getCN = A.getClassName,

	CSS_TREE_HITAREA = getCN(TREE, HITAREA),
	CSS_TREE_ICON = getCN(TREE, ICON),
	CSS_TREE_LABEL = getCN(TREE, LABEL),
	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),
	CSS_TREE_NODE_CONTENT_INVALID = getCN(TREE, NODE, CONTENT, INVALID),
	CSS_TREE_ROOT_CONTAINER = getCN(TREE, ROOT, CONTAINER),
	CSS_TREE_VIEW_CONTENT = getCN(TREE, VIEW, CONTENT);

/**
 * <p><img src="assets/images/aui-tree-view/main.png"/></p>
 *
 * A base class for TreeView, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var tree2 = new A.TreeView({
 *  	width: 200,
 *  	type: 'normal',
 *  	boundingBox: '#tree',
 *  	children: [
 *  		{ label: 'Folder 1', children: [ { label: 'file' }, { label: 'file' }, { label: 'file' } ] },
 *  		{ label: 'Folder 2', expanded: true, children: [ { label: 'file' }, { label: 'file' } ] },
 *  		{ label: 'Folder 3', children: [ { label: 'file' } ] },
 *  		{ label: 'Folder 4', expanded: true, children: [ { label: 'Folder 4-1', expanded: true, children: [ { label: 'file' } ] } ] }
 *  	]
 *  })
 *  .render();
 * </code></pre>
 *
 * Check the list of <a href="TreeView.html#configattributes">Configuration Attributes</a> available for
 * TreeView.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeView
 * @constructor
 * @extends TreeData
 */
var TreeView = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeView.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_VIEW,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeView.
		 *
		 * @property TreeView.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Type of the treeview (i.e. could be 'file' or 'normal').
			 *
			 * @attribute type
			 * @default 'file'
			 * @type String
			 */
			type: {
				value: FILE,
				validator: isString
			},

			/**
			 * Last selected TreeNode.
			 *
			 * @attribute lastSelected
			 * @default null
			 * @type TreeNode
			 */
			lastSelected: {
				value: null,
				validator: isTreeNode
			},

			lazyLoad: {
				validator: isBoolean,
				value: true
			},

			selectOnToggle: {
				validator: isBoolean,
				value: false
			}
		},

		AUGMENTS: [A.TreeData, A.TreeViewPaginator, A.TreeViewIO],

		prototype: {
			CONTENT_TEMPLATE: '<ul></ul>',

			initializer: function() {
				var instance = this;
				var boundingBox = instance.get(BOUNDING_BOX);

				boundingBox.setData(TREE_VIEW, instance);

				instance.initTreeData();
			},

			/**
			 * Bind the events on the TreeView UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));

				instance._delegateDOM();
			},

			/**
			 * Create the DOM structure for the TreeView. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				var instance = this;

				instance._renderElements();
			},

			/**
			 * Fires after set children.
			 *
			 * @method _afterSetChildren
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterSetChildren: function(event) {
				var instance = this;

            var paginator = instance.get('paginator');

            if (paginator && paginator.total) {
                var increment = -1;

                if (event.newVal.length > event.prevVal.length) {
                    increment = 1;
                }

                paginator.total += increment;
            }

				instance._syncPaginatorUI();
			},

			/**
			 * Create TreeNode from HTML markup.
			 *
			 * @method _createFromHTMLMarkup
			 * @param {Node} container
			 * @protected
			 */
			_createFromHTMLMarkup: function(container) {
				var instance = this;

				container.all('> li').each(function(node) {
					// use firstChild as label
					var labelEl = node.one('> *').remove();
					var label = labelEl.outerHTML();
					var deepContainer = node.one('> ul');

					var treeNode = new A.TreeNode({
						boundingBox: node,
						container: deepContainer,
						label: label,
						leaf: !deepContainer,
						ownerTree: instance
					});

					if (instance.get('lazyLoad')) {
						A.setTimeout(function() {
							treeNode.render();
						}, 50);
					}
					else {
						treeNode.render();
					}

					// find the parent TreeNode...
					var parentNode = node.get(PARENT_NODE).get(PARENT_NODE);
					var parentInstance = parentNode.getData(TREE_NODE);

					if (!A.instanceOf(parentInstance, A.TreeNode)) {
						parentInstance = parentNode.getData(TREE_VIEW);
					}

					// and simulate the appendChild.
					parentInstance.appendChild(treeNode);

					if (deepContainer) {
						// propgating markup recursion
						instance._createFromHTMLMarkup(deepContainer);
					}
				});
			},

			_createNodeContainer: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);

				instance.set(CONTAINER, contentBox);

				return contentBox;
			},

			/**
			 * Render elements.
			 *
			 * @method _renderElements
			 * @protected
			 */
			_renderElements: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);
				var children = instance.get(CHILDREN);
				var type = instance.get(TYPE);
				var CSS_TREE_TYPE = getCN(TREE, type);

				contentBox.addClass(CSS_TREE_VIEW_CONTENT);

				contentBox.addClass(
					concat(CSS_TREE_TYPE, CSS_TREE_ROOT_CONTAINER)
				);

				if (!children.length) {
					// if children not specified try to create from markup
					instance._createFromHTMLMarkup(contentBox);
				}
			},

			/**
			 * Delegate events.
			 *
			 * @method _delegateDOM
			 * @protected
			 */
			_delegateDOM: function() {
				var instance = this;

				var boundingBox = instance.get(BOUNDING_BOX);

				// expand/collapse delegations
				boundingBox.delegate('click', A.bind(instance._onClickNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
				boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_ICON);
				boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_LABEL);
				// other delegations
				boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
				boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
			},

			/**
			 * Fires on click the TreeView (i.e. set the select/unselect state).
			 *
			 * @method _onClickNodeEl
			 * @param {EventFacade} event
			 * @protected
			 */
			_onClickNodeEl: function(event) {
				var instance = this;

				var treeNode = instance.getNodeByChild( event.currentTarget );

				if (treeNode) {
					if (event.target.test(DOT+CSS_TREE_HITAREA)) {
						treeNode.toggle();

						if (!instance.get(SELECT_ON_TOGGLE)) {
							return;
						}
					}

					if (!treeNode.isSelected()) {
						var lastSelected = instance.get(LAST_SELECTED);

						// select drag node
						if (lastSelected) {
							lastSelected.unselect();
						}

						treeNode.select();
					}
				}
			},

			/**
			 * Fires on <code>mouseeneter</code> the TreeNode.
			 *
			 * @method _onMouseEnterNodeEl
			 * @param {EventFacade} event
			 * @protected
			 */
			_onMouseEnterNodeEl: function(event) {
				var instance = this;
				var treeNode = instance.getNodeByChild( event.currentTarget );

				if (treeNode) {
					treeNode.over();
				}
			},

			/**
			 * Fires on <code>mouseleave</code> the TreeNode.
			 *
			 * @method _onMouseLeaveNodeEl
			 * @param {EventFacade} event
			 * @protected
			 */
			_onMouseLeaveNodeEl: function(event) {
				var instance = this;
				var treeNode = instance.getNodeByChild( event.currentTarget );

				if (treeNode) {
					treeNode.out();
				}
			},

			/**
			 * Fires on <code>click</code> the TreeNode hitarea.
			 *
			 * @method _onClickHitArea
			 * @param {EventFacade} event
			 * @protected
			 */
			_onClickHitArea: function(event) {
				var instance = this;
				var treeNode = instance.getNodeByChild( event.currentTarget );

				if (treeNode) {
					treeNode.toggle();
				}
			}
		}
	}
);

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
	DRAGGABLE = 'draggable',
	DRAG_CURSOR = 'dragCursor',
	DRAG_NODE = 'dragNode',
	EXPANDED = 'expanded',
	HELPER = 'helper',
	INSERT = 'insert',
	OFFSET_HEIGHT = 'offsetHeight',
	PARENT_NODE = 'parentNode',
	SCROLL_DELAY = 'scrollDelay',
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

/**
 * A base class for TreeViewDD, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>DragDrop support for the TreeNodes</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * Check the list of <a href="TreeViewDD.html#configattributes">Configuration Attributes</a> available for
 * TreeViewDD.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TreeViewDD
 * @constructor
 * @extends TreeView
 */
var TreeViewDD = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeViewDD.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_DRAG_DROP,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeViewDD.
		 *
		 * @property TreeViewDD.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Dragdrop helper element.
			 *
			 * @attribute helper
			 * @default null
			 * @type Node | String
			 */
			helper: {
				value: null
			},

			/**
			 * Delay of the scroll while dragging the TreeNodes.
			 *
			 * @attribute scrollDelay
			 * @default 100
			 * @type Number
			 */
			scrollDelay: {
				value: 100,
				validator: isNumber
			}
		},

		EXTENDS: A.TreeView,

		prototype: {
			/**
			 * Direction of the drag (i.e. could be 'up' or 'down').
			 *
			 * @property direction
			 * @type String
			 * @protected
			 */
			direction: BELOW,

			/**
			 * Drop action (i.e. could be 'append', 'below' or 'above').
			 *
			 * @attribute dropAction
			 * @default null
			 * @type String
			 */
			dropAction: null,

			/**
			 * Last Y.
			 *
			 * @attribute lastY
			 * @default 0
			 * @type Number
			 */
			lastY: 0,

			node: null,

			/**
			 * Reference for the current drop node.
			 *
			 * @attribute nodeContent
			 * @default null
			 * @type Node
			 */
			nodeContent: null,

			/**
			 * Descructor lifecycle implementation for the TreeViewDD class.
			 * Purges events attached to the node (and all child nodes).
			 *
			 * @method destructor
			 * @protected
			 */
			destructor: function() {
				var instance = this;
				var helper = instance.get(HELPER);

				if (helper) {
					helper.remove(true);
				}

				if (instance.ddDelegate) {
					instance.ddDelegate.destroy();
				}
			},

			/**
			 * Bind the events on the TreeViewDD UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				A.TreeViewDD.superclass.bindUI.apply(this, arguments);

				instance._bindDragDrop();
			},

			/**
			 * Create the DOM structure for the TreeViewDD. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				var instance = this;

				A.TreeViewDD.superclass.renderUI.apply(this, arguments);

				// creating drag helper and hiding it
				var helper = A.Node.create(HELPER_TPL).hide();

				// append helper to the body
				A.one(BODY).append(helper);

				instance.set(HELPER, helper);

				// set DRAG_CURSOR to the default arrow
				DDM.set(DRAG_CURSOR, DEFAULT);
			},

			/**
			 * Bind DragDrop events.
			 *
			 * @method _bindDragDrop
			 * @protected
			 */
			_bindDragDrop: function() {
				var instance = this;

				var	boundingBox = instance.get(BOUNDING_BOX);

				var	dragInitHandle = null;

				instance._createDragInitHandler = function() {
					instance.ddDelegate = new A.DD.Delegate(
						{
							bubbleTargets: instance,
							container: boundingBox,
							invalid: DOT+CSS_TREE_NODE_CONTENT_INVALID,
							nodes: DOT+CSS_TREE_NODE_CONTENT,
							target: true
						}
					);

					var dd = instance.ddDelegate.dd;

					dd.plug(A.Plugin.DDProxy, {
						moveOnEnd: false,
						positionProxy: false,
						borderStyle: null
					})
					.plug(A.Plugin.DDNodeScroll, {
						scrollDelay: instance.get(SCROLL_DELAY),
						node: boundingBox
					});

					dd.removeInvalid('a');

					if (dragInitHandle) {
						dragInitHandle.detach();
					}

				};

				// Check for mobile devices and execute _createDragInitHandler before events
				if (!UA.touch) {
					// only create the drag on the init elements if the user mouseover the boundingBox for init performance reasons
					dragInitHandle = boundingBox.on(['focus', 'mousedown', 'mousemove'], instance._createDragInitHandler);
				}
				else {
					instance._createDragInitHandler();
				}

				// drag & drop listeners
				instance.on('drag:align', instance._onDragAlign);
				instance.on('drag:start', instance._onDragStart);
				instance.on('drop:exit', instance._onDropExit);
				instance.after('drop:hit', instance._afterDropHit);
				instance.on('drop:hit', instance._onDropHit);
				instance.on('drop:over', instance._onDropOver);
			},

			/**
			 * Set the append CSS state on the passed <code>nodeContent</code>.
			 *
			 * @method _appendState
			 * @param {Node} nodeContent
			 * @protected
			 */
			_appendState: function(nodeContent) {
				var instance = this;

				instance.dropAction = APPEND;

				instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_APPEND);

				nodeContent.addClass(CSS_TREE_DRAG_INSERT_APPEND);
			},

			/**
			 * Set the going down CSS state on the passed <code>nodeContent</code>.
			 *
			 * @method _goingDownState
			 * @param {Node} nodeContent
			 * @protected
			 */
			_goingDownState: function(nodeContent) {
				var instance = this;

				instance.dropAction = BELOW;

				instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_BELOW);

				nodeContent.addClass(CSS_TREE_DRAG_INSERT_BELOW);
			},

			/**
			 * Set the going up CSS state on the passed <code>nodeContent</code>.
			 *
			 * @method _goingUpState
			 * @param {Node} nodeContent
			 * @protected
			 */
			_goingUpState: function(nodeContent) {
				var instance = this;

				instance.dropAction = ABOVE;

				instance.get(HELPER).addClass(CSS_TREE_DRAG_STATE_INSERT_ABOVE);

				nodeContent.addClass(CSS_TREE_DRAG_INSERT_ABOVE);
			},

			/**
			 * Set the reset CSS state on the passed <code>nodeContent</code>.
			 *
			 * @method _resetState
			 * @param {Node} nodeContent
			 * @protected
			 */
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

			/**
			 * Update the CSS node state (i.e. going down, going up, append etc).
			 *
			 * @method _updateNodeState
			 * @param {EventFacade} event
			 * @protected
			 */
			_updateNodeState: function(event) {
				var instance = this;
				var drag = event.drag;
				var drop = event.drop;
				var nodeContent = drop.get(NODE);
				var dropNode = nodeContent.get(PARENT_NODE);
				var dragNode = drag.get(NODE).get(PARENT_NODE);
				var dropTreeNode = dropNode.getData(TREE_NODE);

				// reset the classNames from the last nodeContent
				instance._resetState(instance.nodeContent);

				// cannot drop the dragged element into any of its children
				// nor above an undraggable element
				// using DOM contains method for performance reason
				if (!!dropTreeNode.get(DRAGGABLE) && !dragNode.contains(dropNode)) {
					// nArea splits the height in 3 areas top/center/bottom
					// these areas are responsible for defining the state when the mouse is over any of them
					var nArea = nodeContent.get(OFFSET_HEIGHT) / 3;
					var yTop = nodeContent.getY();
					var yCenter = yTop + nArea;
					var yBottom = yTop + nArea*2;
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
						if (dropTreeNode && !dropTreeNode.isLeaf()) {
							instance._appendState(nodeContent);
						}
						// if it's a leaf we need to set the ABOVE or BELOW state instead of append
						else {
							if (instance.direction === UP) {
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

			/**
			 * Fires after the drop hit event.
			 *
			 * @method _afterDropHit
			 * @param {EventFacade} event drop hit event facade
			 * @protected
			 */
			_afterDropHit: function(event) {
				var instance = this;
				var dropAction = instance.dropAction;
				var dragNode = event.drag.get(NODE).get(PARENT_NODE);
				var dropNode = event.drop.get(NODE).get(PARENT_NODE);

				var dropTreeNode = dropNode.getData(TREE_NODE);
				var dragTreeNode = dragNode.getData(TREE_NODE);

				var output = instance.getEventOutputMap(instance);

				output.tree.dropNode = dropTreeNode;
				output.tree.dragNode = dragTreeNode;

				if (dropAction === ABOVE) {
					dropTreeNode.insertBefore(dragTreeNode);

					instance.bubbleEvent('dropInsert', output);
				}
				else if (dropAction === BELOW) {
					dropTreeNode.insertAfter(dragTreeNode);

					instance.bubbleEvent('dropInsert', output);
				}
				else if (dropAction === APPEND) {
					if (dropTreeNode && !dropTreeNode.isLeaf()) {
						if (!dropTreeNode.get(EXPANDED)) {
							// expand node when drop a child on it
							dropTreeNode.expand();
						}

						dropTreeNode.appendChild(dragTreeNode);

						instance.bubbleEvent('dropAppend', output);
					}
				}

				instance._resetState(instance.nodeContent);

				// bubbling drop event
				instance.bubbleEvent('drop', output);

				instance.dropAction = null;
			},

			/**
			 * Fires on drag align event.
			 *
			 * @method _onDragAlign
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDragAlign: function(event) {
				var instance = this;
				var lastY = instance.lastY;
				var y = event.target.lastXY[1];

				// if the y change
				if (y !== lastY) {
					// set the drag direction
					instance.direction = (y < lastY) ? UP : DOWN;
				}

				instance.lastY = y;
			},

			/**
			 * Fires on drag start event.
			 *
			 * @method _onDragStart
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDragStart: function(event) {
				var instance = this;
				var drag = event.target;
				var dragNode = drag.get(NODE).get(PARENT_NODE);
				var dragTreeNode = dragNode.getData(TREE_NODE);
				var lastSelected = instance.get(LAST_SELECTED);

				// select drag node
				if (lastSelected) {
					lastSelected.unselect();
				}

				dragTreeNode.select();

				// initialize drag helper
				var helper = instance.get(HELPER);
				var helperLabel = helper.one(DOT+CSS_TREE_DRAG_HELPER_LABEL);

				// show helper, we need display block here, yui dd hide it with display none
				helper.setStyle(DISPLAY, BLOCK).show();

				// set the CSS_TREE_DRAG_HELPER_LABEL html with the label of the dragged node
				helperLabel.html( dragTreeNode.get(LABEL) );

				// update the DRAG_NODE with the new helper
				drag.set(DRAG_NODE, helper);
			},

			/**
			 * Fires on drop over event.
			 *
			 * @method _onDropOver
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDropOver: function(event) {
				var instance = this;

				instance._updateNodeState(event);
			},

			/**
			 * Fires on drop hit event.
			 *
			 * @method _onDropHit
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDropHit: function(event) {
				var dropNode = event.drop.get(NODE).get(PARENT_NODE);
				var dropTreeNode = dropNode.getData(TREE_NODE);

				if (!isTreeNode(dropTreeNode)) {
					event.preventDefault();
				}
			},

			/**
			 * Fires on drop exit event.
			 *
			 * @method _onDropExit
			 * @param {EventFacade} event append event facade
			 * @protected
			 */
			_onDropExit: function() {
				var instance = this;

				instance.dropAction = null;

				instance._resetState(instance.nodeContent);
			}
		}
	}
);

A.TreeViewDD = TreeViewDD;

}, '@VERSION@' ,{requires:['aui-tree-node','aui-tree-paginator','aui-tree-io','dd-delegate','dd-proxy'], skinnable:true});
AUI.add('aui-tree-io', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	EVENT_IO_REQUEST_SUCCESS = 'ioRequestSuccess',

	CONTENT_BOX = 'contentBox',
	IO = 'io',
	OWNER_TREE = 'ownerTree',
	LOADED = 'loaded',
	LOADING = 'loading',
	NODE = 'node',
	TREE = 'tree',

	getCN = A.getClassName,

	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);

function TreeViewIO(config) {
	var instance = this;

	instance.publish(
		EVENT_IO_REQUEST_SUCCESS,
		{
			defaultFn: instance._onIOSuccessDefault
		}
	);
}


TreeViewIO.ATTRS = {
	/**
	 * IO options for the current TreeNode load the children.
	 *
	 * @attribute io
	 * @default Default IO Configuration.
	 * @type Object
	 */
	io: {
		lazyAdd: false,
		value: null,
		setter: function(v) {
			return this._setIO(v);
		}
	}
};

TreeViewIO.prototype = {
	initializer: function() {
		var instance = this;

		instance.publish(

		);
	},

	/**
	 * Create nodes.
	 *
	 * @method createNodes
	 * @param nodes
	 */
	createNodes: function(nodes) {
		var instance = this;

		var paginator = instance.get('paginator');

		A.Array.each(
			A.Array(nodes),
			function(node) {
				var childrenLength = instance.getChildrenLength();

				if (paginator && paginator.total <= childrenLength) {
					return;
				}

				instance.appendChild(
					instance.createNode(node)
				);
			}
		);

		instance._syncPaginatorUI(nodes);
	},

	/**
	 * Initialize the IO transaction setup on the <a
	 * href="TreeNode.html#config_io">io</a> attribute.
	 *
	 * @method initIO
	 */
	initIO: function() {
		var instance = this;

		var io = instance.get(IO);

		if (isFunction(io.cfg.data)) {
			io.cfg.data = io.cfg.data.call(instance, instance);
		}

		instance._syncPaginatorIOData(io);

		if (isFunction(io.loader)) {
			var loader = A.bind(io.loader, instance);

			// apply loader in the TreeNodeIO scope
			loader(io.url, io.cfg, instance);
		}
		else {
			A.io.request(io.url, io.cfg);
		}
	},

	/**
	 * IO Start handler.
	 *
	 * @method ioStartHandler
	 */
	ioStartHandler: function() {
		var instance = this;

		var contentBox = instance.get(CONTENT_BOX);

		instance.set(LOADING, true);

		contentBox.addClass(CSS_TREE_NODE_IO_LOADING);
	},

	/**
	 * IO Complete handler.
	 *
	 * @method ioCompleteHandler
	 */
	ioCompleteHandler: function() {
		var instance = this;

		var contentBox = instance.get(CONTENT_BOX);

		instance.set(LOADING, false);
		instance.set(LOADED, true);

		contentBox.removeClass(CSS_TREE_NODE_IO_LOADING);
	},

	/**
	 * IO Success handler.
	 *
	 * @method ioSuccessHandler
	 */
	ioSuccessHandler: function() {
		var instance = this;

		var io = instance.get(IO);

		var args = Array.prototype.slice.call(arguments);
		var length = args.length;

		// if using the first argument as the JSON object
		var nodes = args[1];

		// if using (event, id, o) yui callback syntax
		if (length >= 3) {
			var o = args[2];
			// try to convert responseText to JSON
			try {
				nodes = A.JSON.parse(o.responseText);
			}
			catch(e) {}
		}

		var formatter = io.formatter;

		if (formatter) {
			nodes = formatter(nodes);
		}

		instance.createNodes(nodes);

		instance.fire(EVENT_IO_REQUEST_SUCCESS, nodes);
	},

	/**
	 * IO Failure handler.
	 *
	 * @method ioFailureHandler
	 */
	ioFailureHandler: function() {
		var instance = this;

		instance.fire('ioRequestFailure');

		instance.set(LOADING, false);
		instance.set(LOADED, false);
	},

	_onIOSuccessDefault: function(event) {
		var instance = this;

		var ownerTree = instance.get(OWNER_TREE);

		if (ownerTree && ownerTree.ddDelegate) {
			ownerTree.ddDelegate.syncTargets();
		}
	},

	/**
	 * Setter for <a href="TreeNodeIO.html#config_io">io</a>.
	 *
	 * @method _setIO
	 * @protected
	 * @param {Object} v
	 * @return {Object}
	 */
	_setIO: function(v) {
		var instance = this;

		if (!v) {
			return null;
		}
		else if (isString(v)) {
			v = { url: v };
		}

		v = v || {};
		v.cfg = v.cfg || {};
		v.cfg.on = v.cfg.on || {};

		var defCallbacks = {
			start: A.bind(instance.ioStartHandler, instance),
			complete: A.bind(instance.ioCompleteHandler, instance),
			success: A.bind(instance.ioSuccessHandler, instance),
			failure: A.bind(instance.ioFailureHandler, instance)
		};

		A.each(defCallbacks, function(fn, name) {
			var userFn = v.cfg.on[name];

			fn.defaultFn = true;

			if (isFunction(userFn)) {
				// wrapping user callback and default callback, invoking both handlers
				var wrappedFn = A.bind(
					function() {
						fn.apply(instance, arguments);
						userFn.apply(instance, arguments);
					},
					instance
				);

				wrappedFn.wrappedFn = true;

				v.cfg.on[name] = wrappedFn;
			}
			else {
				// get from defCallbacks map
				v.cfg.on[name] = fn;
			}

		});

		return v;
	}
};

A.TreeViewIO = TreeViewIO;

}, '@VERSION@' ,{requires:['aui-io','json'], skinnable:false});


AUI.add('aui-tree', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-io', 'aui-tree-paginator', 'aui-tree-view']});

