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
