AUI.add('tree-data', function(A) {

var L = A.Lang,
	isArray = L.isArray,
	isObject = L.isObject,
	isString = L.isString,
	isUndefined = L.isUndefined,

	AFTER = 'after',
	APPEND = 'append',
	BEFORE = 'before',
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
			validador: isArray,
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

		if (oldParent) {
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
		if (oldParent && (oldParent != parentNode)) {
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
				parentNode = parentNode.get(PARENT_NODE)
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

	insert: function(node, refNode, where) {
		var instance = refNode || this; // INFO: using instance as refNode

		if (instance == node) {
			return false;
		}

		var refParentNode = instance.get(PARENT_NODE);
		var nodeBounginBox = node.get(BOUNDING_BOX);

		if (node && refParentNode) {
			var ownerTree = instance.get(OWNER_TREE);
			var refSiblings = refParentNode.getChildren();
			var refIndex = refParentNode.indexOf(instance);

			// update all references
			instance.updateReferences(node, refParentNode, ownerTree);

			var nextSibling = null;
			var prevSibling = null;

			if (where == 'before') {
				// positioning node on the ref childNodes
				refSiblings.splice(refIndex, 0, node);

				// placing nodeBounginBox before nextSibling
				nextSibling = refSiblings[refIndex + 1];
				prevSibling = refSiblings[refIndex - 1];
				nextSibling.get(BOUNDING_BOX).placeBefore(nodeBounginBox);
			}
			else if (where == 'after') {
				// positioning node on the ref childNodes
				refSiblings.splice(refIndex + 1, 0, node);

				// placing nodeBounginBox after prevSibling
				nextSibling = refSiblings[refIndex + 2];
				prevSibling = refSiblings[refIndex];
				prevSibling.get(BOUNDING_BOX).placeAfter(nodeBounginBox);
			}

			// updating prev/nextSibling attributes
			node.set(NEXT_SIBLING, nextSibling);
			node.set(PREV_SIBLING, prevSibling);

			// updating refParentNode childNodes
			refParentNode.set(CHILDREN, refSiblings);
		}

		// render node after it's inserted
		node.render();

		// invoking insert event
		var output = instance.getEventOutputMap(node);

		output.tree.refNode = refNode;

		instance.bubbleEvent('insert', output);
	},

	insertAfter: function(node, refNode) {
		refNode.insert(node, refNode, 'after');
	},

	insertBefore: function(node, refNode) {
		refNode.insert(node, refNode, 'before');
	},

	getNodeByChild: function(child) {
		var instance = this;
		var treeNodeEl = child.ancestor(DOT+CSS_TREE_NODE);

		return instance.getNodeById( treeNodeEl.attr(ID) );
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

}, '@VERSION', { requires: [ 'aui-base' ] });