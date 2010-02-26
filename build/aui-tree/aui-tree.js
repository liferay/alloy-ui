AUI.add('aui-tree-data', function(A) {
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

/*
* AUI TreeData
*
* Contains the logic to handle the data of the tree.
* Basic DOM methods (append/remove/insert) and
* indexing management for the children.
*/
function TreeData(config) {
	TreeData.superclass.constructor.apply(this, arguments);
}

A.mix(TreeData, {
	NAME: TREE_DATA,

	ATTRS: {
		container: {
			setter: nodeSetter
		},

		// childNodes
		children: {
			value: [],
			validator: isArray,
			setter: function(v) {
				return this._setChildren(v);
			}
		},

		index: {
			value: {}
		}
	}
});

A.extend(TreeData, A.Widget, {
	UI_EVENTS: {},

	/*
	* Lifecycle
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

	/*
	* Index methods
	*/
	getNodeById: function(uid) {
		var instance = this;

		return instance.get(INDEX)[uid];
	},

	isRegistered: function(node) {
		var instance = this;

		return !!(instance.get(INDEX)[ node.get(ID) ]);
	},

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

	refreshIndex: function() {
		var instance = this;

		// reset index
		instance.updateIndex({});

		// get all descendent children - deep
		instance.eachChildren(function(node) {
			instance.registerNode(node);
		}, true);
	},

	registerNode: function(node) {
		var instance = this;
		var uid = node.get(ID);
		var index = instance.get(INDEX);

		if (uid) {
			index[uid] = node;
		}

		instance.updateIndex(index);
	},

	updateIndex: function(index) {
		var instance = this;

		if (index) {
			instance.set(INDEX, index);
		}
	},

	unregisterNode: function(node) {
		var instance = this;
		var index = instance.get(INDEX);

		delete index[ node.get(ID) ];

		instance.updateIndex(index);
	},

	/*
	* Methods
	*/
	collapseAll: function() {
		var instance = this;
		var output = instance.getEventOutputMap(instance);

		instance.fire('collapseAll', output);
	},

	_collapseAll: function(event) {
		var instance = this;

		instance.eachChildren(function(node) {
			node.collapse();
		}, true);
	},

	expandAll: function() {
		var instance = this;
		var output = instance.getEventOutputMap(instance);

		instance.fire('expandAll', output);
	},

	_expandAll: function(event) {
		var instance = this;

		instance.eachChildren(function(node) {
			node.expand();
		}, true);
	},

	selectAll: function() {
		var instance = this;

		instance.eachChildren(function(child) {
			child.select();
		}, true);
	},

	unselectAll: function() {
		var instance = this;

		instance.eachChildren(function(child) {
			child.unselect();
		}, true);
	},

	eachChildren: function(fn, deep) {
		var instance = this;
		var children = instance.getChildren(deep);

		A.Array.each(children, function(node) {
			if (node) {
				fn.apply(instance, arguments);
			}
		});
	},

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

	appendChild: function(node, cancelBubbling) {
		var instance = this;
		var output = instance.getEventOutputMap(node);

		instance.bubbleEvent('append', output, cancelBubbling);
	},

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

	item: function(index) {
		var instance = this;

		return instance.get(CHILDREN)[index];
	},

	indexOf: function(node) {
		var instance = this;

		return A.Array.indexOf( instance.get(CHILDREN), node );
	},

	hasChildNodes: function() {
		return ( this.get(CHILDREN).length > 0 );
	},

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

	getEventOutputMap: function(node) {
		var instance = this;

		return {
			tree: {
				instance: instance,
				node: node || instance
			}
		};
	},

	removeChild: function(node) {
		var instance = this;
		var output = instance.getEventOutputMap(node);

		instance.bubbleEvent('remove', output);
	},

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

	empty: function() {
		var instance = this;

		instance.eachChildren(function(node) {
			var parentNode = node.get(PARENT_NODE);

			if (parentNode) {
				parentNode.removeChild(node);
			}
		});
	},

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

	insertAfter: function(treeNode, refTreeNode) {
		refTreeNode.insert(treeNode, refTreeNode, 'after');
	},

	insertBefore: function(treeNode, refTreeNode) {
		refTreeNode.insert(treeNode, refTreeNode, 'before');
	},

	getNodeByChild: function(child) {
		var instance = this;
		var treeNodeEl = child.ancestor(DOT+CSS_TREE_NODE);

		if (treeNodeEl) {
			return instance.getNodeById( treeNodeEl.attr(ID) );
		}

		return null;
	},

	/*
	* Setters
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

}, '@VERSION@' ,{requires:['aui-base'], skinnable:false});
AUI.add('aui-tree-node', function(A) {
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

/*
* TreeNode
*/
function TreeNode(config) {
	TreeNode.superclass.constructor.apply(this, arguments);
}

A.mix(TreeNode, {
	NAME: TREE_NODE,

	ATTRS: {
		draggable: {
			value: true,
			validator: isBoolean
		},

		ownerTree: {
			value: null
		},

		label: {
			value: BLANK,
			validator: isString
		},

		expanded: {
			value: false,
			validator: isBoolean
		},

		id: {
			validator: isString
		},

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

		nextSibling: {
			value: null,
			validator: isTreeNode
		},

		prevSibling: {
			value: null,
			validator: isTreeNode
		},

		parentNode: {
			value: null,
			validator: function(val) {
				return isTreeNode(val) || isTreeView(val);
			}
		},

		labelEl: {
			setter: nodeSetter,
			valueFn: function() {
				var label = this.get(LABEL);

				return A.Node.create(LABEL_TPL).html(label).unselectable();
			}
		},

		hitAreaEl: {
			setter: nodeSetter,
			valueFn: function() {
				return A.Node.create(HIT_AREA_TPL);
			}
		},

		alwaysShowHitArea: {
			value: true,
			validator: isBoolean
		},

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
	BOUNDING_TEMPLATE: NODE_BOUNDING_TEMPLATE,
	CONTENT_TEMPLATE: NODE_CONTENT_TEMPLATE,

	/*
	* Lifecycle
	*/
	initializer: function() {
		var instance = this;

		// Sync the Widget TreeNode id with the BOUNDING_BOX id
		instance._syncTreeNodeBBId();

		// invoking TreeData initializer
		TreeNode.superclass.initializer.apply(this, arguments);
	},

	bindUI: function() {
		var instance = this;

		// binding collapse/expand
		instance.publish('collapse', { defaultFn: instance._collapse });
		instance.publish('expand', { defaultFn: instance._expand });

		instance.after('childrenChange', A.bind(instance._afterSetChildren, instance));
		instance.after('idChange', instance._afterSetId, instance);
	},

	// overloading private _renderUI, don't call this._renderBox method
	// avoid render node on the body
    _renderUI: function(parentNode) {
        this._renderBoxClassNames();
		// this._renderBox(parentNode);
    },

	renderUI: function() {
		var instance = this;

		instance._renderBoundingBox();
		instance._renderContentBox();
	},

	syncUI: function() {
		var instance = this;

		instance._syncHitArea( instance.get( CHILDREN ) );
	},

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

	collapse: function() {
		var instance = this;

		if (instance.get(EXPANDED)) {
			var output = instance.getEventOutputMap(instance);

			instance.bubbleEvent('collapse', output);
		}
	},

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

	contains: function(node) {
        return node.isAncestor(this);
	},

	expand: function() {
		var instance = this;

		if (!instance.get(EXPANDED)) {
			var output = instance.getEventOutputMap(instance);

			instance.bubbleEvent('expand', output);
		}
	},

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

	isSelected: function() {
		return this.get(CONTENT_BOX).hasClass(CSS_TREE_NODE_SELECTED);
	},

	isLeaf: function() {
		var instance = this;

		return instance.get(LEAF);
	},

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

	toggle: function() {
		var instance = this;

		if (instance.get(EXPANDED)) {
			instance.collapse();
		}
		else {
			instance.expand();
		}
	},

	select: function() {
		var instance = this;
		var ownerTree = instance.get(OWNER_TREE);

		if (ownerTree) {
			ownerTree.set(LAST_SELECTED, instance);
		}

		instance.get(CONTENT_BOX).addClass(CSS_TREE_NODE_SELECTED);

		instance.fire('select');
	},

	unselect: function() {
		var instance = this;

		instance.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_SELECTED);

		instance.fire('unselect');
	},

	over: function() {
		this.get(CONTENT_BOX).addClass(CSS_TREE_NODE_OVER);
	},

	out: function() {
		this.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_OVER);
	},

	showHitArea: function() {
		var instance = this;
		var hitAreaEl = instance.get(HIT_AREA_EL);

		hitAreaEl.removeClass(CSS_TREE_NODE_HIDDEN_HITAREA);
	},

	hideHitArea: function() {
		var instance = this;
		var hitAreaEl = instance.get(HIT_AREA_EL);

		hitAreaEl.addClass(CSS_TREE_NODE_HIDDEN_HITAREA);
	},

	_syncTreeNodeBBId: function(id) {
		var instance = this;

		instance.get(BOUNDING_BOX).attr(
			ID,
			instance.get(ID)
		);
	},

	/*
	* Listeners
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

function TreeNodeIO(config) {
	TreeNodeIO.superclass.constructor.apply(this, arguments);
}

A.mix(TreeNodeIO, {
	NAME: TREE_NODE_IO,

	ATTRS: {
		io: {
			lazyAdd: false,
			value: null,
			setter: function(v) {
				return this._setIO(v);
			}
		},

		loading: {
			value: false,
			validator: isBoolean
		},

		loaded: {
			value: false,
			validator: isBoolean
		},

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

	ioStartHandler: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);

		instance.set(LOADING, true);

		contentBox.addClass(CSS_TREE_NODE_IO_LOADING);
	},

	ioCompleteHandler: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);

		instance.set(LOADING, false);
		instance.set(LOADED, true);

		contentBox.removeClass(CSS_TREE_NODE_IO_LOADING);
	},

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

	ioFailureHandler: function() {
		var instance = this;

		instance.set(LOADING, false);
		instance.set(LOADED, false);
	},

	/*
	* Setters
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

function TreeNodeCheck(config) {
	TreeNodeCheck.superclass.constructor.apply(this, arguments);
}

A.mix(TreeNodeCheck, {
	NAME: TREE_NODE_CHECK,

	ATTRS: {
		checked: {
			value: false,
			validator: isBoolean
		},

		checkName: {
			value: TREE_NODE_CHECK,
			validator: isString
		},

		checkContainerEl: {
			setter: nodeSetter,
			valueFn: function() {
				return A.Node.create(CHECKBOX_CONTAINER_TPL);
			}
		},

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

	/*
	* Methods
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

	uncheck: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var checkEl = instance.get(CHECK_EL);

		contentBox.removeClass(CSS_TREE_NODE_CHECKED);

		instance.set(CHECKED, false);

		checkEl.attr(CHECKED, BLANK);

		instance.fire('uncheck');
	},

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

function TreeNodeTask(config) {
	TreeNodeTask.superclass.constructor.apply(this, arguments);
}

A.mix(TreeNodeTask, {
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

/*
* A.TreeNode.nodeTypes
*/
A.TreeNode.nodeTypes = {
	task: A.TreeNodeTask,
	check: A.TreeNodeCheck,
	node: A.TreeNode,
	io: A.TreeNodeIO
};

}, '@VERSION@' ,{requires:['aui-tree-data','io','json'], skinnable:false});
AUI.add('aui-tree-view', function(A) {
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

/*
* TreeView
*/

function TreeView(config) {
	// A.DD.DDM.set('throttleTime', -1);

	TreeView.superclass.constructor.apply(this, arguments);
}

A.mix(TreeView, {
	NAME: TREE_VIEW,

	ATTRS: {
		type: {
			value: FILE,
			validator: isString
		},

		lastSelected: {
			value: null,
			validator: isTreeNode
		},

		io: {
			value: null
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
			var lastSelected = instance.get(LAST_SELECTED);

			// select drag node
			if (lastSelected) {
				lastSelected.unselect();
			}

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


function TreeViewDD(config) {
	TreeViewDD.superclass.constructor.apply(this, arguments);
}

A.mix(TreeViewDD, {
	NAME: TREE_DRAG_DROP,

	ATTRS: {
		helper: {
			value: null
		},

		scrollDelay: {
			value: 100,
			validator: isNumber
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
	bindUI: function() {
		var instance = this;

		TreeViewDD.superclass.bindUI.apply(this, arguments);

		instance._bindDragDrop();
	},

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

	/*
	* Methods
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

	/*
	* Listeners
	*/
	_afterAppend: function(event) {
		var instance = this;
		var treeNode = event.tree.node;

		if (treeNode.get(DRAGGABLE)) {
			instance._createDrag( treeNode.get(CONTENT_BOX) );
		}
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

	_onDropOver: function(event) {
		var instance = this;

		instance._updateNodeState(event);
	},

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

	_onDropExit: function() {
		var instance = this;

		instance.dropAction = null;

		instance._resetState(instance.nodeContent);
	}
});

A.TreeViewDD = TreeViewDD;

}, '@VERSION@' ,{requires:['aui-tree-node','dd'], skinnable:true});


AUI.add('aui-tree', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-view']});

