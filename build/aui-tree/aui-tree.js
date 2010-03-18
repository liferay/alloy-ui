AUI.add('aui-tree-data', function(A) {
/**
 * The TreeData Utility
 * 
 * @module aui-tree
 * @submodule aui-tree-data
 */

var L = A.Lang,
	isArray = L.isArray,
	isObject = L.isObject,
	isString = L.isString,
	isUndefined = L.isUndefined,

	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CONTAINER = 'container',
	DOT = '.',
	ID = 'id',
	INDEX = 'index',
	NEXT_SIBLING = 'nextSibling',
	NODE = 'node',
	OWNER_TREE = 'ownerTree',
	PARENT_NODE = 'parentNode',
	PREV_SIBLING = 'prevSibling',
	PREVIOUS_SIBLING = 'previousSibling',
	TREE = 'tree',
	TREE_DATA = 'tree-data',

	nodeSetter = function(v) {
		return A.get(v);
	},

	isTreeNode = function(v) {
		return ( v instanceof A.TreeNode );
	},

	getCN = A.ClassNameManager.getClassName,

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
function TreeData(config) {
	TreeData.superclass.constructor.apply(this, arguments);
}

A.mix(TreeData, {
	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property TreeData.NAME
	 * @type String
	 * @static
	 */
	NAME: TREE_DATA,

	/**
	 * Static property used to define the default attribute
	 * configuration for the TreeData.
	 *
	 * @property TreeData.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {
		/**
		 * Container to nest children nodes. If has cntainer it's not a leaf.
		 *
		 * @attribute container
		 * @default null
		 * @type Node | String
		 */
		container: {
			setter: nodeSetter
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
			setter: function(v) {
				return this._setChildren(v);
			}
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
	}
});

A.extend(TreeData, A.Widget, {
	/**
	 * Empty UI_EVENTS.
	 *
	 * @property UI_EVENTS
	 * @type Object
	 * @protected
	 */
	UI_EVENTS: {},

	/**
	 * Construction logic executed during TreeData instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function() {
		var instance = this;

		// binding on initializer, needed before .render() phase
		instance.publish('move');
		instance.publish('collapseAll', { defaultFn: instance._collapseAll });
		instance.publish('expandAll', { defaultFn: instance._expandAll });
		instance.publish('append', { defaultFn: instance._appendChild });
		instance.publish('remove', { defaultFn: instance._removeChild });

		TreeData.superclass.initializer.apply(this, arguments);
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
		var moved = oldParent && (oldParent != parentNode);

		if (oldParent) {
			if (moved) {
				// when moved update the oldParent children
				var children = oldParent.get(CHILDREN);

				A.Array.removeItem(children, instance);

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

		instance.updateIndex(index);
	},

	/**
	 * Collapse all children of the TreeData.
	 *
	 * @method collapseAll
	 */
	collapseAll: function() {
		var instance = this;
		var output = instance.getEventOutputMap(instance);

		instance.fire('collapseAll', output);
	},

	/**
	 * Collapse all children of the TreeData.
	 *
	 * @method _collapseAll
	 * @protected
	 */
	_collapseAll: function(event) {
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
		var output = instance.getEventOutputMap(instance);

		instance.fire('expandAll', output);
	},

	/**
	 * Expand all children of the TreeData.
	 *
	 * @method _expandAll
	 * @protected
	 */
	_expandAll: function(event) {
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
	 * @method selectAll
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
	 * @method eachChildren
	 * @param {function} fn callback
	 */
	eachParent: function(fn) {
		var instance = this;
		var parentNode = instance.get(PARENT_NODE);

		while (parentNode) {
			if (parentNode) {
				fn.apply(instance, [parentNode]);
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

		// event.stopActionPropagation == undefined, invoke the event native action
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
		var classType = options.type;

		if (isString(classType) && A.TreeNode.nodeTypes) {
			classType = A.TreeNode.nodeTypes[classType];
		}

		if (!classType) {
			classType = A.TreeNode;
		}

		return new classType(options);
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
		instance.set(CHILDREN, children);

		// updating prev/nextSibling attributes
		var prevIndex = length - 2;
		var prevSibling = instance.item(prevIndex);

		node.set(NEXT_SIBLING, null);
		node.set(PREV_SIBLING, prevSibling);

		instance.get(CONTAINER).append(
			node.get(BOUNDING_BOX)
		);

		// render node after it's appended
		node.render();
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
		return ( this.get(CHILDREN).length > 0 );
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

		if (refTreeNode == treeNode) {
			return false; // NOTE: return
		}
		var refParentTreeNode = refTreeNode.get(PARENT_NODE);

		if (treeNode && refParentTreeNode) {
			var nodeBoundinBox = treeNode.get(BOUNDING_BOX);
			var refBoundinBox = refTreeNode.get(BOUNDING_BOX);
			var ownerTree = refTreeNode.get(OWNER_TREE);

			if (where == 'before') {
				refBoundinBox.placeBefore(nodeBoundinBox);
			}
			else if (where == 'after') {
				refBoundinBox.placeAfter(nodeBoundinBox);
			}

			var refSiblings = [];
			// using the YUI selector to regenerate the index based on the real dom
			// this avoid misscalculations on the nodes index number
			var DOMChildren = refParentTreeNode.get(BOUNDING_BOX).all('> ul > li');

			DOMChildren.each(function(child) {
				refSiblings.push( A.Widget.getByNode(child) );
			});

			// updating prev/nextSibling attributes
			treeNode.set(
				NEXT_SIBLING,
				A.Widget.getByNode( nodeBoundinBox.get(NEXT_SIBLING) )
			);
			treeNode.set(
				PREV_SIBLING,
				A.Widget.getByNode( nodeBoundinBox.get(PREVIOUS_SIBLING) )
			);

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
		refTreeNode.insert(treeNode, refTreeNode, 'after');
	},

	/**
	 * Insert <code>treeNode</code> before the <code>refTreeNode</code>.
	 *
	 * @method insertBefore
	 * @param {TreeNode} treeNode
	 * @param {TreeNode} refTreeNode
	 */
	insertBefore: function(treeNode, refTreeNode) {
		refTreeNode.insert(treeNode, refTreeNode, 'before');
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
			return instance.getNodeById( treeNodeEl.attr(ID) );
		}

		return null;
	},

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

		A.Array.each(v, function(node) {
			if (node) {
				if (!isTreeNode(node) && isObject(node)) {
					// creating node from json
					node = instance.createNode(node);
				}

				// before render the node, make sure the PARENT_NODE references are updated
				// this is required on the render phase of the TreeNode (_createNodeContainer)
				// to propagate the appendChild callback
				node.render();

				// avoid duplicated children on the childNodes list
				if (A.Array.indexOf(childNodes, node) == -1) {
					childNodes.push(node);
				}
			}
		});

		return childNodes;
	}
});

A.TreeData = TreeData;

}, '@VERSION@' ,{skinnable:false, requires:['aui-base']});
AUI.add('aui-tree-node', function(A) {
/**
 * The TreeNode Utility
 *
 * @module aui-tree
 * @submodule aui-tree-node
 */

var L = A.Lang,
	isString = L.isString,
	isBoolean = L.isBoolean,

	ALWAYS_SHOW_HITAREA = 'alwaysShowHitArea',
	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CLEARFIX = 'clearfix',
	COLLAPSED = 'collapsed',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	EXPANDED = 'expanded',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	HITAREA = 'hitarea',
	HIT_AREA_EL = 'hitAreaEl',
	ICON = 'icon',
	ICON_EL = 'iconEl',
	ID = 'id',
	LABEL = 'label',
	LABEL_EL = 'labelEl',
	LAST_SELECTED = 'lastSelected',
	LEAF = 'leaf',
	NODE = 'node',
	OVER = 'over',
	OWNER_TREE = 'ownerTree',
	PARENT_NODE = 'parentNode',
	SELECTED = 'selected',
	SPACE = ' ',
	TREE = 'tree',
	TREE_NODE = 'tree-node',

	nodeSetter = function(v) {
		return A.get(v);
	},

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isTreeNode = function(v) {
		return ( v instanceof A.TreeNode );
	},

	isTreeView = function(v) {
		return ( v instanceof A.TreeView );
	},

	getCN = A.ClassNameManager.getClassName,

	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_TREE_COLLAPSED = getCN(TREE, COLLAPSED),
	CSS_TREE_CONTAINER = getCN(TREE, CONTAINER),
	CSS_TREE_EXPANDED = getCN(TREE, EXPANDED),
	CSS_TREE_HIDDEN = getCN(TREE, HIDDEN),
	CSS_TREE_HITAREA = getCN(TREE, HITAREA),
	CSS_TREE_ICON = getCN(TREE, ICON),
	CSS_TREE_LABEL = getCN(TREE, LABEL),
	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),
	CSS_TREE_NODE_HIDDEN_HITAREA = getCN(TREE, NODE, HIDDEN, HITAREA),
	CSS_TREE_NODE_LEAF = getCN(TREE, NODE, LEAF),
	CSS_TREE_NODE_OVER = getCN(TREE, NODE, OVER),
	CSS_TREE_NODE_SELECTED = getCN(TREE, NODE, SELECTED),

	HIT_AREA_TPL = '<div class="'+CSS_TREE_HITAREA+'"></div>',
	ICON_TPL = '<div class="'+CSS_TREE_ICON+'"></div>',
	LABEL_TPL = '<div class="'+CSS_TREE_LABEL+'"></div>',
	NODE_CONTAINER_TPL = '<ul></ul>',

	NODE_BOUNDING_TEMPLATE = '<li></li>',
	NODE_CONTENT_TEMPLATE = '<div class="'+concat(CSS_HELPER_CLEARFIX, CSS_TREE_NODE_CONTENT)+'"></div>';

/**
 * A base class for TreeNode, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>The node for the TreeView component</li>
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
function TreeNode(config) {
	TreeNode.superclass.constructor.apply(this, arguments);
}

A.mix(TreeNode, {
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
		 * If true the TreeNode is draggable.
		 *
		 * @attribute draggable
		 * @default true
		 * @type boolean
		 */
		draggable: {
			value: true,
			validator: isBoolean
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
		 * Label of the TreeNode.
		 *
		 * @attribute label
		 * @default ''
		 * @type String
		 */
		label: {
			value: BLANK,
			validator: isString
		},

		/**
		 * Whether the TreeNode is expanded by default.
		 *
		 * @attribute expanded
		 * @default false
		 * @type boolean
		 */
		expanded: {
			value: false,
			validator: isBoolean
		},

		/**
		 * Id of the TreeNode.
		 *
		 * @attribute id
		 * @default null
		 * @type String
		 */
		id: {
			validator: isString
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
			value: true,
			setter: function(v) {
				// if has children it's not a leaf
				if (v && this.get(CHILDREN).length) {
					return false;
				}

				return v;
			},
			validator: isBoolean
		},

		/**
		 * Next sibling of the current TreeNode.
		 *
		 * @attribute nextSibling
		 * @default null
		 * @type TreeNode
		 */
		nextSibling: {
			value: null,
			validator: isTreeNode
		},

		/**
		 * Previous sibling of the current TreeNode.
		 *
		 * @attribute prevSibling
		 * @default null
		 * @type TreeNode
		 */
		prevSibling: {
			value: null,
			validator: isTreeNode
		},

		/**
		 * Parent node of the current TreeNode.
		 *
		 * @attribute parentNode
		 * @default null
		 * @type TreeNode
		 */
		parentNode: {
			value: null,
			validator: function(val) {
				return isTreeNode(val) || isTreeView(val);
			}
		},

		/**
		 * Label element to house the <code>label</code> attribute.
		 *
		 * @attribute labelEl
		 * @default Generated DOM element.
		 * @type Node | String
		 */
		labelEl: {
			setter: nodeSetter,
			valueFn: function() {
				var label = this.get(LABEL);

				return A.Node.create(LABEL_TPL).html(label).unselectable();
			}
		},

		/**
		 * Hitarea element.
		 *
		 * @attribute hitAreaEl
		 * @default Generated DOM element.
		 * @type Node | String
		 */
		hitAreaEl: {
			setter: nodeSetter,
			valueFn: function() {
				return A.Node.create(HIT_AREA_TPL);
			}
		},

		/**
		 * Always show the hitarea icon.
		 *
		 * @attribute alwaysShowHitArea
		 * @default true
		 * @type boolean
		 */
		alwaysShowHitArea: {
			value: true,
			validator: isBoolean
		},

		/**
		 * Icon element.
		 *
		 * @attribute iconEl
		 * @type Node | String
		 */
		iconEl: {
			setter: nodeSetter,
			valueFn: function() {
				return A.Node.create(ICON_TPL);
			}
		},

		tabIndex: {
			value: null
		}
	}
});


A.extend(TreeNode, A.TreeData, {
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

		// Sync the Widget TreeNode id with the BOUNDING_BOX id
		instance._syncTreeNodeBBId();

		// invoking TreeData initializer
		TreeNode.superclass.initializer.apply(this, arguments);
	},

	/**
	 * Bind the events on the TreeNode UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		var instance = this;

		// binding collapse/expand
		instance.publish('collapse', { defaultFn: instance._collapse });
		instance.publish('expand', { defaultFn: instance._expand });

		instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));
		instance.after('idChange', instance._afterSetId, instance);
	},

	/**
	 * Create the DOM structure for the TreeNode. Lifecycle. Overloading
     * private _renderUI, don't call this._renderBox method avoid render node on
     * the body.
	 *
	 * @method _renderUI
	 * @protected
	 */
    _renderUI: function(parentNode) {
        this._renderBoxClassNames();
		// this._renderBox(parentNode);
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

		instance._syncHitArea( instance.get( CHILDREN ) );
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

		if (instance.isLeaf()) {
			// add leaf css classes
			contentBox.addClass(CSS_TREE_NODE_LEAF);
		}
		else {
			// add folder css classes state
			contentBox.addClass(
				instance.get(EXPANDED) ? CSS_TREE_EXPANDED : CSS_TREE_COLLAPSED
			);
		}

		return contentBox;
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

		var nodeContainer = null;

		if (!instance.isLeaf()) {
			// append hitarea element
			contentBox.append( instance.get(HIT_AREA_EL) );

			// if has children append them to this model
			nodeContainer = instance._createNodeContainer();
		}

		contentBox.append( instance.get(ICON_EL) );
		contentBox.append( instance.get(LABEL_EL) );

		boundingBox.append(contentBox);

		if (nodeContainer) {
			if (!instance.get(EXPANDED)) {
				nodeContainer.addClass(CSS_TREE_HIDDEN);
			}

			boundingBox.append(nodeContainer);
		}

		return boundingBox;
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

		instance.eachChildren(function(node) {
			instance.appendChild(node);
		});

		return nodeContainer;
	},

	/**
	 * Sync the hitarea UI.
	 *
	 * @method _syncHitArea
	 * @param {Array} children
	 * @protected
	 */
	_syncHitArea: function(children) {
		var instance = this;

		if (instance.get(ALWAYS_SHOW_HITAREA) || children.length) {
			instance.showHitArea();
		}
		else {
			instance.hideHitArea();

			instance.collapse();
		}
	},

	/*
	* Methods
	*/
	appendChild: function() {
		var instance = this;

		if (!instance.isLeaf()) {
			TreeNode.superclass.appendChild.apply(instance, arguments);
		}
	},

	/**
	 * Collapse the current TreeNode.
	 *
	 * @method collapse
	 */
	collapse: function() {
		var instance = this;

		if (instance.get(EXPANDED)) {
			var output = instance.getEventOutputMap(instance);

			instance.bubbleEvent('collapse', output);
		}
	},

	/**
	 * Collapse the current TreeNode.
	 *
	 * @method _collapse
	 * @protected
	 */
	_collapse: function(event) {
		// stopActionPropagation while bubbling
		if (event.stopActionPropagation) {
			return false;
		}

		var instance = this;

		if (!instance.isLeaf()) {
			var container = instance.get(CONTAINER);
			var contentBox = instance.get(CONTENT_BOX);

			contentBox.replaceClass(CSS_TREE_EXPANDED, CSS_TREE_COLLAPSED);

			if (container) {
				container.addClass(CSS_TREE_HIDDEN);
			}

			instance.set(EXPANDED, false);
		}
	},

	collapseAll: function() {
		var instance = this;

		TreeNode.superclass.collapseAll.apply(instance, arguments);

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
        return node.isAncestor(this);
	},

	/**
	 * Expand the current TreeNode.
	 *
	 * @method expand
	 */
	expand: function() {
		var instance = this;

		if (!instance.get(EXPANDED)) {
			var output = instance.getEventOutputMap(instance);

			instance.bubbleEvent('expand', output);
		}
	},

	/**
	 * Expand the current TreeNode.
	 *
	 * @method _expand
	 */
	_expand: function(event) {
		// stopActionPropagation while bubbling
		if (event.stopActionPropagation) {
			return false;
		}

		var instance = this;

		if (!instance.isLeaf()) {
			var container = instance.get(CONTAINER);
			var contentBox = instance.get(CONTENT_BOX);

			contentBox.replaceClass(CSS_TREE_COLLAPSED, CSS_TREE_EXPANDED);

			if (container) {
				container.removeClass(CSS_TREE_HIDDEN);
			}

			instance.set(EXPANDED, true);
		}
	},

	expandAll: function() {
		var instance = this;

		TreeNode.superclass.expandAll.apply(instance, arguments);

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
		var depth = 0;
		var instance = this;
		var parentNode = instance.get(PARENT_NODE);

		while (parentNode) {
			++depth;
			parentNode = parentNode.get(PARENT_NODE);
		}

		return depth;
	},

	hasChildNodes: function() {
		var instance = this;

		return (!instance.isLeaf() &&
				TreeNode.superclass.hasChildNodes.apply(this, arguments));
	},

	/**
	 * Whether the current TreeNode is selected or not.
	 *
	 * @method isSelected
	 * @return {boolean}
	 */
	isSelected: function() {
		return this.get(CONTENT_BOX).hasClass(CSS_TREE_NODE_SELECTED);
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
	 * Whether the current TreeNode is ancestor of the passed <code>node</code> or not.
	 *
	 * @method isLeaf
	 * @return {boolean}
	 */
	isAncestor: function(node) {
		var instance = this;
		var parentNode = instance.get(PARENT_NODE);

		while (parentNode) {
			if (parentNode == node) {
				return true;
			}
			parentNode = parentNode.get(PARENT_NODE);
		}

		return false;
	},

	insertAfter: function(node, refNode) {
		var instance = this;

		TreeNode.superclass.insertAfter.apply(this, [node, instance]);
	},

	insertBefore: function(node) {
		var instance = this;

		TreeNode.superclass.insertBefore.apply(this, [node, instance]);
	},

	removeChild: function(node) {
		var instance = this;

		if (!instance.isLeaf()) {
			TreeNode.superclass.removeChild.apply(instance, arguments);
		}
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
	* Unselect the current TreeNode.
	* 
	* @method unselect
	*/
	unselect: function() {
		var instance = this;

		instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_SELECTED);

		instance.fire('unselect');
	},

	/*
	* Fires when <code>mouseover</code> the current TreeNode.
	* 
	* @method over
	*/
	over: function() {
		this.get(CONTENT_BOX).addClass(CSS_TREE_NODE_OVER);
	},

	/*
	* Fires when <code>mouseout</code> the current TreeNode.
	* 
	* @method over
	*/
	out: function() {
		this.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_OVER);
	},

	/*
	* Show hitarea icon.
	* 
	* @method showHitArea
	*/
	showHitArea: function() {
		var instance = this;
		var hitAreaEl = instance.get(HIT_AREA_EL);

		hitAreaEl.removeClass(CSS_TREE_NODE_HIDDEN_HITAREA);
	},

	/*
	* Hide hitarea icon.
	* 
	* @method hideHitArea
	*/
	hideHitArea: function() {
		var instance = this;
		var hitAreaEl = instance.get(HIT_AREA_EL);

		hitAreaEl.addClass(CSS_TREE_NODE_HIDDEN_HITAREA);
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

	/**
	 * Fires after set children.
	 *
	 * @method _afterSetChildren
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterSetChildren: function(event) {
		var instance = this;

		instance._syncHitArea(event.newVal);
	}
});

A.TreeNode = TreeNode;


/*
* TreeNodeIO
*/
var isFunction = L.isFunction,

	CACHE = 'cache',
	IO = 'io',
	LOADED = 'loaded',
	LOADING = 'loading',
	TREE_NODE_IO = 'tree-node-io',

	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);

/**
 * A base class for TreeNodeIO, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Ajax support to load the children of the current TreeNode</li>
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
function TreeNodeIO(config) {
	TreeNodeIO.superclass.constructor.apply(this, arguments);
}

A.mix(TreeNodeIO, {
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
		},

		/**
		 * Whether the current TreeNode IO transaction is loading.
		 *
		 * @attribute loading
		 * @default false
		 * @type boolean
		 */
		loading: {
			value: false,
			validator: isBoolean
		},

		/**
		 * Whether the current TreeNode has loaded the content.
		 *
		 * @attribute loaded
		 * @default false
		 * @type boolean
		 */
		loaded: {
			value: false,
			validator: isBoolean
		},

		/**
		 * Whether the current TreeNode should cache the loaded content or not.
		 *
		 * @attribute cache
		 * @default true
		 * @type boolean
		 */
		cache: {
			value: true,
			validator: isBoolean
		},

		leaf: {
			value: false,
			validator: isBoolean
		}
	}
});

A.extend(TreeNodeIO, A.TreeNode, {
	/*
	* Methods
	*/
	createNode: function(nodes) {
		var instance = this;

		A.each(nodes, function(node) {
			var newNode = TreeNodeIO.superclass.createNode.apply(instance, [node]);

			instance.appendChild(newNode);
		});
	},

	expand: function() {
		var instance = this;
		var cache = instance.get(CACHE);
		var io = instance.get(IO);
		var loaded = instance.get(LOADED);
		var loading = instance.get(LOADING);
		var ownerTree = instance.get(OWNER_TREE);

		// inheriting the IO configuration from the OWNER_TREE
		if (!io && ownerTree) {
			instance.set( IO, A.clone(ownerTree.get(IO)) );

			io = instance.get(IO);
		}

		if (!cache) {
			// if cache is false on expand, always set LOADED to false
			instance.set(LOADED, false);
		}

		if (!io || loaded) {
			TreeNodeIO.superclass.expand.apply(this, arguments);
		}
		else {
			if (!loading) {
				if (!cache) {
					// remove all children to reload
					instance.empty();
				}

				if (isFunction(io.cfg.data)) {
					io.cfg.data = io.cfg.data.apply(instance, [instance]);
				}

				if (isFunction(io.loader)) {
					var loader = A.bind(io.loader, instance);

					// apply loader in the TreeNodeIO scope
					loader(io.url, io.cfg, instance);
				}
				else {
					A.io(io.url, io.cfg);
				}
			}
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
		var nodes = args[0];

		// if using (id, o) yui callback syntax
		if (length >= 2) {
			var o = args[1];
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

		instance.createNode(nodes);

		instance.expand();
	},

	/**
	 * IO Failure handler.
	 *
	 * @method ioFailureHandler
	 */
	ioFailureHandler: function() {
		var instance = this;

		instance.set(LOADING, false);
		instance.set(LOADED, false);
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

			if (isFunction(userFn)) {
				// wrapping user callback and default callback, invoking both handlers
				var wrappedFn = function() {
					fn.apply(instance, arguments);
					userFn.apply(instance, arguments);
				};

				v.cfg.on[name] = A.bind(wrappedFn, instance);
			}
			else {
				// get from defCallbacks map
				v.cfg.on[name] = fn;
			}

		});

		return v;
	}
});

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

	CHECKBOX_CONTAINER_TPL = '<div class="'+CSS_TREE_NODE_CHECKBOX_CONTAINER+'"></div>',
	CHECKBOX_TPL = '<input class="'+CSS_TREE_NODE_CHECKBOX+'" type="checkbox" />';

/**
 * <p><img src="assets/images/aui-tree-nod-check/main.png"/></p>
 *
 * A base class for TreeNodeCheck, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Checkbox support for the TreeNode</li>
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
function TreeNodeCheck(config) {
	TreeNodeCheck.superclass.constructor.apply(this, arguments);
}

A.mix(TreeNodeCheck, {
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
			value: false,
			validator: isBoolean
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
		},

		/**
		 * Container element for the checkbox.
		 *
		 * @attribute checkContainerEl
		 * @default Generated DOM element.
		 * @type Node | String
		 */
		checkContainerEl: {
			setter: nodeSetter,
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
			setter: nodeSetter,
			valueFn: function() {
				var checkName = this.get(CHECK_NAME);

				return A.Node.create(CHECKBOX_TPL).attr(NAME, checkName);
			}
		}
	}
});

A.extend(TreeNodeCheck, A.TreeNodeIO, {
	/*
	* Lifecycle
	*/
	renderUI: function() {
		var instance = this;

		TreeNodeCheck.superclass.renderUI.apply(instance, arguments);

		var labelEl = instance.get(LABEL_EL);
		var checkEl = instance.get(CHECK_EL);
		var checkContainerEl = instance.get(CHECK_CONTAINER_EL);

		checkEl.hide();

		checkContainerEl.append(checkEl);

		labelEl.placeBefore(checkContainerEl);

		if (instance.isChecked()) {
			instance.check();
		}
	},

	bindUI: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var labelEl = instance.get(LABEL_EL);

		TreeNodeCheck.superclass.bindUI.apply(instance, arguments);

		instance.publish('check');
		instance.publish('uncheck');
		contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT+CSS_TREE_NODE_CHECKBOX_CONTAINER);
		contentBox.delegate('click', A.bind(instance.toggleCheck, instance), DOT+CSS_TREE_LABEL);

		// cancel dblclick because of the check
		labelEl.swallowEvent('dblclick');
	},

	/**
	 * Check the current TreeNode.
	 *
	 * @method check
	 */
	check: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var checkEl = instance.get(CHECK_EL);

		contentBox.addClass(CSS_TREE_NODE_CHECKED);

		instance.set(CHECKED, true);

		checkEl.attr(CHECKED, CHECKED);

		instance.fire('check');
	},

	/**
	 * Uncheck the current TreeNode.
	 *
	 * @method uncheck
	 */
	uncheck: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var checkEl = instance.get(CHECK_EL);

		contentBox.removeClass(CSS_TREE_NODE_CHECKED);

		instance.set(CHECKED, false);

		checkEl.attr(CHECKED, BLANK);

		instance.fire('uncheck');
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

	/*
	* Whether the current TreeNodeCheck is checked.
	* 
	* @method isChecked
	* @return boolean
	*/
	isChecked: function() {
		var instance = this;

		return instance.get(CHECKED);
	}
});

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
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>3 states checkbox support</li>
 *    <li>Automatic check/uncheck the parent status based on the children checked status</li>
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
function TreeNodeTask(config) {
	TreeNodeTask.superclass.constructor.apply(this, arguments);
}

A.mix(TreeNodeTask, {
	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property TreeNode.NAME
	 * @type String
	 * @static
	 */
	NAME: TREE_NODE_TASK
});

A.extend(TreeNodeTask, A.TreeNodeCheck, {
	/*
	* Methods
	*/
	check: function(stopPropagation) {
		var instance = this;
		var parentNode = instance.get(PARENT_NODE);
		var contentBox = instance.get(CONTENT_BOX);

		// invoke default check logic
		TreeNodeTask.superclass.check.apply(this, arguments);

		if (!stopPropagation) {
			// always remove the CSS_TREE_NODE_CHILD_UNCHECKED of the checked node
			contentBox.removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

			// loop all parentNodes
			instance.eachParent(
				function(parentNode) {
					// if isTreeNodeTask and isChecked
					if (isTreeNodeTask(parentNode)) {
						var hasUnchecked = false;

						// after check a child always check the parentNode temporary
						// and add the CSS_TREE_NODE_CHILD_UNCHECKED state until the !hasUnchecked check
						parentNode.check(true);
						parentNode.get(CONTENT_BOX).addClass(CSS_TREE_NODE_CHILD_UNCHECKED);

						// check if has at least one child uncheked
						parentNode.eachChildren(function(child) {
							if (isTreeNodeTask(child) && !child.isChecked()) {
								hasUnchecked = true;
							}
						}, true);

						// if doesn't have unchecked children remove the CSS_TREE_NODE_CHILD_UNCHECKED class
						if (!hasUnchecked) {
							parentNode.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);
						}
					}
				}
			);

			if (!instance.isLeaf()) {
				// check all TreeNodeTask children
				instance.eachChildren(function(child) {
					if (isTreeNodeTask(child)) {
						child.check();
					}
				});
			}
		}
	},

	uncheck: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);

		// invoke default uncheck logic
		TreeNodeTask.superclass.uncheck.apply(this, arguments);

		// always remove the CSS_TREE_NODE_CHILD_UNCHECKED of the clicked node
		contentBox.removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

		instance.eachParent(
			function(parentNode) {
				// if isTreeNodeTask and isChecked
				if (isTreeNodeTask(parentNode) && parentNode.isChecked()) {
					// add CSS_TREE_NODE_CHILD_UNCHECKED class
					parentNode.get(CONTENT_BOX).addClass(CSS_TREE_NODE_CHILD_UNCHECKED);
				}
			}
		);

		if (!instance.isLeaf()) {
			// uncheck all TreeNodeTask children
			instance.eachChildren(function(child) {
				if (child instanceof A.TreeNodeCheck) {
					child.uncheck();
				}
			});
		}
	}
});

A.TreeNodeTask = TreeNodeTask;

/**
 * TreeNode types hash map.
 *
 * <pre><code>A.TreeNode.nodeTypes = {
 *  task: A.TreeNodeTask,
 *  check: A.TreeNodeCheck,
 *  node: A.TreeNode,
 *  io: A.TreeNodeIO
 *};</code></pre>
 * 
 * @for TreeNode
 * @property A.TreeNode.nodeTypes
 * @type Object
 */
A.TreeNode.nodeTypes = {
	task: A.TreeNodeTask,
	check: A.TreeNodeCheck,
	node: A.TreeNode,
	io: A.TreeNodeIO
};

}, '@VERSION@' ,{skinnable:false, requires:['aui-tree-data','io','json']});
AUI.add('aui-tree-view', function(A) {
/**
 * The TreeView Utility
 *
 * @module aui-tree
 * @submodule aui-tree-view
 */

var L = A.Lang,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	DOT = '.',
	FILE = 'file',
	HITAREA = 'hitarea',
	ICON = 'icon',
	LABEL = 'label',
	LAST_SELECTED = 'lastSelected',
	LEAF = 'leaf',
	NODE = 'node',
	OWNER_TREE = 'ownerTree',
	ROOT = 'root',
	SPACE = ' ',
	TREE = 'tree',
	TREE_VIEW = 'tree-view',
	TYPE = 'type',
	VIEW = 'view',

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isTreeNode = function(v) {
		return ( v instanceof A.TreeNode );
	},

	getCN = A.ClassNameManager.getClassName,

	CSS_TREE_HITAREA = getCN(TREE, HITAREA),
	CSS_TREE_ICON = getCN(TREE, ICON),
	CSS_TREE_LABEL = getCN(TREE, LABEL),
	CSS_TREE_NODE_CONTENT = getCN(TREE, NODE, CONTENT),
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
function TreeView(config) {
	// A.DD.DDM.set('throttleTime', -1);

	TreeView.superclass.constructor.apply(this, arguments);
}

A.mix(TreeView, {
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

		/**
		 * IO metadata for loading the children using ajax.
		 *
		 * @attribute io
		 * @default null
		 * @type Object
		 */
		io: {
			value: null
		}
	}
});

A.extend(TreeView, A.TreeData, {
	CONTENT_TEMPLATE: '<ul></ul>',

	/**
	 * Bind the events on the TreeView UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		var instance = this;

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
	 * Sync the TreeView UI. Lifecycle.
	 *
	 * @method syncUI
	 * @protected
	 */
	syncUI: function() {
		var instance = this;

		instance.refreshIndex();
	},

	registerNode: function(node) {
		var instance = this;

		// when the node is appended to the TreeView set the OWNER_TREE
		node.set(OWNER_TREE, instance);

		TreeView.superclass.registerNode.apply(this, arguments);
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

			// avoid memory leak
			docFrag = null;

			var treeNode = new A.TreeNode({
				boundingBox: node,
				label: label
			});

			var deepContainer = node.one('> ul');

			if (deepContainer) {
				// if has deepContainer it's not a leaf
				treeNode.set(LEAF, false);
				treeNode.set(CONTAINER, deepContainer);

				// render node before invoke the recursion
				treeNode.render();

				// propagating markup recursion
				instance._createFromHTMLMarkup(deepContainer);
			}
			else {
				treeNode.render();
			}

			// find the parent TreeNode...
			var parentNode = node.get(PARENT_NODE).get(PARENT_NODE);
			var parentTreeNode = A.Widget.getByNode(parentNode);

			// and simulate the appendChild.
			parentTreeNode.appendChild(treeNode);
		});
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

		instance.set(CONTAINER, contentBox);

		contentBox.addClass(
			concat(CSS_TREE_TYPE, CSS_TREE_ROOT_CONTAINER)
		);

		if (children.length) {
			// if has children appendChild them
			instance.eachChildren(function(node) {
				instance.appendChild(node, true);
			});
		}
		else {
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
		boundingBox.delegate('click', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_HITAREA);
		boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_ICON);
		boundingBox.delegate('dblclick', A.bind(instance._onClickHitArea, instance), DOT+CSS_TREE_LABEL);
		// other delegations
		boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
		boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
		boundingBox.delegate('click', A.bind(instance._onClickNodeEl, instance), DOT+CSS_TREE_NODE_CONTENT);
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

		if (treeNode && !treeNode.isSelected()) {
			var lastSelected = instance.get(LAST_SELECTED);

			// select drag node
			if (lastSelected) {
				lastSelected.unselect();
			}

			treeNode.select();
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
function TreeViewDD(config) {
	TreeViewDD.superclass.constructor.apply(this, arguments);
}

A.mix(TreeViewDD, {
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
	}
});

A.extend(TreeViewDD, A.TreeView, {
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
	 * Bind the events on the TreeViewDD UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		var instance = this;

		TreeViewDD.superclass.bindUI.apply(this, arguments);

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

		TreeViewDD.superclass.renderUI.apply(this, arguments);

		// creating drag helper and hiding it
		var helper = A.Node.create(HELPER_TPL).hide();

		// append helper to the body
		A.get(BODY).append(helper);

		instance.set(HELPER, helper);

		// set DRAG_CURSOR to the default arrow
		DDM.set(DRAG_CURSOR, DEFAULT);
	},

	/**
	 * Setup DragDrop on the TreeNodes.
	 *
	 * @method _createDrag
	 * @param {Node} node
	 * @protected
	 */
	_createDrag: function(node) {
		var instance = this;

		if (!instance.dragTimers) {
			instance.dragTimers = [];
		}

		if (!DDM.getDrag(node)) {
			var dragTimers = instance.dragTimers;
			// dragDelay is a incremental delay for create the drag instances
			var dragDelay = 50 * dragTimers.length;

			// wrapping the _createDrag on a setTimeout for performance reasons
			var timer = setTimeout(
				function() {
					if (!DDM.getDrag(node)) {
						// creating delayed drag instance
						var drag = new A.DD.Drag({
							bubbleTargets: instance,
							node: node,
							target: true
						})
						.plug(A.Plugin.DDProxy, {
							moveOnEnd: false,
							positionProxy: false,
							borderStyle: null
						})
						.plug(A.Plugin.DDNodeScroll, {
							scrollDelay: instance.get(SCROLL_DELAY),
							node: instance.get(BOUNDING_BOX)
						});
					}

					A.Array.removeItem(dragTimers, timer);
				},
				dragDelay
			);

			dragTimers.push(timer);
		}
	},

	/**
	 * Bind DragDrop events.
	 *
	 * @method _bindDragDrop
	 * @protected
	 */
	_bindDragDrop: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		instance._createDragInitHandler = A.bind(
			function() {
				// set init elements as draggable
				instance.eachChildren(function(child) {
					if (child.get(DRAGGABLE)) {
						instance._createDrag( child.get(CONTENT_BOX) );
					}
				}, true);

				boundingBox.detach('mouseover', instance._createDragInitHandler);
			},
			instance
		);

		// only create the drag on the init elements if the user mouseover the boundingBox for init performance reasons
		boundingBox.on('mouseover', instance._createDragInitHandler);

		// when append new nodes, make them draggable
		instance.after('insert', A.bind(instance._afterAppend, instance));
		instance.after('append', A.bind(instance._afterAppend, instance));

		// drag & drop listeners
		instance.on('drag:align', instance._onDragAlign);
		instance.on('drag:start', instance._onDragStart);
		instance.on('drop:exit', instance._onDropExit);
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
		var dropTreeNode = A.Widget.getByNode(dropNode);

		// reset the classNames from the last nodeContent
		instance._resetState(instance.nodeContent);

		// cannot drop the dragged element into any of its children
		// using DOM contains method for performance reason
		if ( !dragNode.contains(dropNode) ) {
			// nArea splits the height in 3 areas top/center/bottom
			// these areas are responsible for defining the state when the mouse is over any of them
			var nArea = nodeContent.get(OFFSET_HEIGHT) / 3;
			var yTop = nodeContent.getY();
			var yCenter = yTop + nArea*1;
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
					if (instance.direction == UP) {
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
	 * Fires after the append event.
	 *
	 * @method _handleEvent
	 * @param {EventFacade} event append event facade
	 * @protected
	 */
	_afterAppend: function(event) {
		var instance = this;
		var treeNode = event.tree.node;

		if (treeNode.get(DRAGGABLE)) {
			instance._createDrag( treeNode.get(CONTENT_BOX) );
		}
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
		if (y != lastY) {
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
		var dragTreeNode = A.Widget.getByNode(dragNode);
		var lastSelected = instance.get(LAST_SELECTED);

		// select drag node
		if (lastSelected) {
			lastSelected.unselect();
		}

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
		var instance = this;
		var dropAction = instance.dropAction;
		var dragNode = event.drag.get(NODE).get(PARENT_NODE);
		var dropNode = event.drop.get(NODE).get(PARENT_NODE);

		var dropTreeNode = A.Widget.getByNode(dropNode);
		var dragTreeNode = A.Widget.getByNode(dragNode);

		var output = instance.getEventOutputMap(instance);

		output.tree.dropNode = dropTreeNode;
		output.tree.dragNode = dragTreeNode;

		if (dropAction == ABOVE) {
			dropTreeNode.insertBefore(dragTreeNode);

			instance.bubbleEvent('dropInsert', output);
		}
		else if (dropAction == BELOW) {
			dropTreeNode.insertAfter(dragTreeNode);

			instance.bubbleEvent('dropInsert', output);
		}
		else if (dropAction == APPEND) {
			if (dropTreeNode && !dropTreeNode.isLeaf()) {
				dropTreeNode.appendChild(dragTreeNode);

				if (!dropTreeNode.get(EXPANDED)) {
					// expand node when drop a child on it
					dropTreeNode.expand();
				}

				instance.bubbleEvent('dropAppend', output);
			}
		}

		instance._resetState(instance.nodeContent);

		// bubbling drop event
		instance.bubbleEvent('drop', output);
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
});

A.TreeViewDD = TreeViewDD;

}, '@VERSION@' ,{skinnable:true, requires:['aui-tree-node','dd']});


AUI.add('aui-tree', function(A){}, '@VERSION@' ,{use:['aui-tree-data', 'aui-tree-node', 'aui-tree-view'], skinnable:true});

