YUI.add('aui-tree-data', function (A, NAME) {

/**
 * The TreeData Utility
 *
 * @module aui-tree
 * @submodule aui-tree-data
 */

var L = A.Lang,
    isArray = L.isArray,
    isObject = L.isObject,
    isUndefined = L.isUndefined,

    isTreeNode = function(v) {
        return (A.instanceOf(v, A.TreeNode));
    },

    isTreeView = function(v) {
        return (A.instanceOf(v, A.TreeView));
    },

    getCN = A.getClassName,

    CSS_TREE_NODE = getCN('tree', 'node');

/**
 * A base class for TreeData, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - Handle the data of the tree
 * - Basic DOM implementation (append/remove/insert)
 * - Indexing management to handle the children nodes
 *
 * @class A.TreeData
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

var TreeData = function() {};

/**
 * Static property used to define the default attribute
 * configuration for the TreeData.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
TreeData.ATTRS = {

    /**
     * Container to nest children nodes. If it has a container it's not a leaf.
     *
     * @attribute container
     * @default null
     * @type Node | String
     */
    container: {
        setter: A.one
    },

    /**
     * Array of children (i.e. could be a JSON metadata object or a TreeNode
     * instance).
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
    initializer: function() {
        var instance = this;

        // binding on initializer, needed before .render() phase
        instance.publish('move');
        instance.publish('append', {
            defaultFn: instance._appendChild
        });
        instance.publish('remove', {
            defaultFn: instance._removeChild
        });
    },

    /**
     * Destructor lifecycle implementation for the `TreeData` class.
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

        return instance.get('index')[uid];
    },

    /**
     * Whether the TreeNode is registered on this TreeData.
     *
     * @method isRegistered
     * @param {TreeNode} node
     * @return {Boolean}
     */
    isRegistered: function(node) {
        var instance = this;

        return !!(instance.get('index')[node.get('id')]);
    },

    /**
     * Update the references of the passed TreeNode.
     *
     * @method updateReferences
     * @param {TreeNode} node
     * @param {TreeNode} parentNode
     * @param {TreeView} ownerTree
     */
    updateReferences: function(node, parentNode, ownerTree) {
        var instance = this;
        var oldParent = node.get('parentNode');
        var oldOwnerTree = node.get('ownerTree');
        var moved = oldParent && (oldParent !== parentNode);

        if (oldParent) {
            if (moved) {
                // when moved update the oldParent children
                var children = oldParent.get('children');

                A.Array.removeItem(children, node);

                oldParent.set('children', children);
            }

            oldParent.unregisterNode(node);
        }

        if (oldOwnerTree) {
            oldOwnerTree.unregisterNode(node);
        }

        // update parent reference when registered
        node.set('parentNode', parentNode);

        // update the ownerTree of the node
        node.set('ownerTree', ownerTree);

        if (parentNode) {
            // register the new node on the parentNode index
            parentNode.registerNode(node);
        }

        if (ownerTree) {
            // register the new node to the ownerTree index
            ownerTree.registerNode(node);
        }

        if (oldOwnerTree !== ownerTree) {
            // when change the OWNER_TREE update the children references also
            node.eachChildren(function(child) {
                instance.updateReferences(child, child.get('parentNode'), ownerTree);
            });
        }

        // trigger move event
        if (moved) {
            var output = instance.getEventOutputMap(node);

            if (!oldParent.get('children').length) {
                oldParent.collapse();
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
        var uid = node.get('id');
        var index = instance.get('index');

        if (uid) {
            index[uid] = node;
        }

        if (isTreeView(instance)) {
            node.addTarget(instance);

            // when the node is appended to the TreeView set the OWNER_TREE
            node.set('ownerTree', instance);
        }

        node._inheritOwnerTreeAttrs();

        instance.updateIndex(index);
    },

    /**
     * Update the [index](A.TreeData.html#attr_index) attribute value.
     *
     * @method updateIndex
     * @param {Object} index
     */
    updateIndex: function(index) {
        var instance = this;

        if (index) {
            instance._indexPrimed = true;

            instance.set('index', index);
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
        var index = instance.get('index');

        delete index[node.get('id')];

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
     * Loop each children and execute the `fn` callback.
     *
     * @method eachChildren
     * @param {Function} fn Callback
     * @param {Boolean} deep Recursive
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
     * Loop each parent node and execute the `fn` callback.
     *
     * @method eachParent
     * @param {Function} fn Callback
     */
    eachParent: function(fn) {
        var instance = this;
        var parentNode = instance.get('parentNode');

        while (parentNode) {
            if (parentNode) {
                fn.call(instance, parentNode);
            }
            parentNode = parentNode.get('parentNode');
        }
    },

    /**
     * Bubble event to all parent nodes.
     *
     * @method bubbleEvent
     * @param {String} eventType
     * @param {Array} args
     * @param {Boolean} cancelBubbling
     * @param {Boolean} stopActionPropagation
     */
    bubbleEvent: function(eventType, args, cancelBubbling, stopActionPropagation) {
        var instance = this;

        // event.stopActionPropagation === undefined, invoke the event native
        // action
        instance.fire(eventType, args);

        if (!cancelBubbling) {
            var parentNode = instance.get('parentNode');

            // Avoid execution of the native action (private methods) while
            // propagate for example: private _appendChild() is invoked only on
            // the first level of the bubbling the intention is only invoke the
            // user callback on parent nodes.
            args = args || {};

            if (isUndefined(stopActionPropagation)) {
                stopActionPropagation = true;
            }

            args.stopActionPropagation = stopActionPropagation;

            while (parentNode) {
                parentNode.fire(eventType, args);
                parentNode = parentNode.get('parentNode');
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
        var ClassType = A.TreeNode.nodeTypes[isObject(options) ? options.type : options] || A.TreeNode;

        return new ClassType(
            isObject(options) ? options : {}
        );
    },

    /**
     * Append a child node to the TreeData.
     *
     * @method appendChild
     * @param {TreeNode} node
     * @param {Boolean} cancelBubbling
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
     * @param {Boolean} cancelBubbling
     * @protected
     */
    _appendChild: function(event) {
        // stopActionPropagation while bubbling
        if (event.stopActionPropagation) {
            return false;
        }

        var instance = this;
        var node = event.tree.node;
        var ownerTree = instance.get('ownerTree');
        var children = instance.get('children');

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
        node.render(instance.get('container'));
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

        return instance.get('children')[index];
    },

    /**
     * Index of the passed TreeNode on the
     * [children](A.TreeData.html#attr_children) attribute.
     *
     * @method indexOf
     * @param {TreeNode} node
     * @return {Number}
     */
    indexOf: function(node) {
        var instance = this;

        return A.Array.indexOf(instance.get('children'), node);
    },

    /**
     * Whether the TreeData contains children or not.
     *
     * @method hasChildNodes
     * @return {Boolean}
     */
    hasChildNodes: function() {
        var instance = this;

        return (instance.getChildrenLength() > 0);
    },

    /**
     * Get an Array of the children nodes of the current TreeData.
     *
     * @method getChildren
     * @param {Boolean} deep
     * @return {Array}
     */
    getChildren: function(deep) {
        var instance = this;
        var cNodes = [];
        var children = instance.get('children');

        cNodes = cNodes.concat(children);

        if (deep) {
            instance.eachChildren(function(child) {
                cNodes = cNodes.concat(child.getChildren(deep));
            });
        }

        return cNodes;
    },

    getChildrenLength: function() {
        var instance = this;

        return (instance.childrenLength || instance.get('children').length);
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
     * Remove the passed `node` from the current TreeData.
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
     * Remove the passed `node` from the current TreeData.
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
        var ownerTree = instance.get('ownerTree');

        if (instance.isRegistered(node)) {
            // update parent reference when removed
            node.set('parentNode', null);

            // unregister the node
            instance.unregisterNode(node);

            // no parent, no ownerTree
            node.set('ownerTree', null);

            if (ownerTree) {
                // unregister the removed node from the tree index
                ownerTree.unregisterNode(node);
            }

            // remove child from the container
            node.get('boundingBox').remove();

            var children = instance.get('children');

            A.Array.removeItem(children, node);
            instance.set('children', children);
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
            var parentNode = node.get('parentNode');

            if (parentNode) {
                parentNode.removeChild(node);
            }
        });
    },

    /**
     * Insert `treeNode` before or after the `refTreeNode`.
     *
     * @method insert
     * @param {TreeNode} treeNode
     * @param {TreeNode} refTreeNode
     * @param {TreeNode} where 'before' or 'after'
     */
    insert: function(treeNode, refTreeNode, where) {
        refTreeNode = refTreeNode || this;

        if (refTreeNode === treeNode) {
            return false; // NOTE: return
        }

        var refParentTreeNode = refTreeNode.get('parentNode');

        if (treeNode && refParentTreeNode) {
            var nodeBoundingBox = treeNode.get('boundingBox');
            var refBoundingBox = refTreeNode.get('boundingBox');
            var ownerTree = refTreeNode.get('ownerTree');

            if (where === 'before') {
                refBoundingBox.placeBefore(nodeBoundingBox);
            }
            else if (where === 'after') {
                refBoundingBox.placeAfter(nodeBoundingBox);
            }

            var refSiblings = [];
            // using the YUI selector to regenerate the index based on the real dom
            // this avoid misscalculations on the nodes index number
            var DOMChildren = refParentTreeNode.get('boundingBox').all('> ul > li');

            DOMChildren.each(function(child) {
                refSiblings.push(child.getData('tree-node'));
            });

            // updating prev/nextSibling attributes
            var nextSiblingNode = nodeBoundingBox.get('nextSibling');

            treeNode.set('nextSibling', nextSiblingNode && nextSiblingNode.getData('tree-node'));

            var prevSiblingNode = nodeBoundingBox.get('previousSibling');

            treeNode.set('prevSibling', prevSiblingNode && prevSiblingNode.getData('tree-node'));

            // update all references
            refTreeNode.updateReferences(treeNode, refParentTreeNode, ownerTree);

            // updating refParentTreeNode childTreeNodes
            refParentTreeNode.set('children', refSiblings);
        }

        // render treeNode after it's inserted
        treeNode.render();

        // invoking insert event
        var output = refTreeNode.getEventOutputMap(treeNode);

        output.tree.refTreeNode = refTreeNode;

        refTreeNode.bubbleEvent('insert', output);
    },

    /**
     * Insert `treeNode` after the `refTreeNode`.
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
     * Insert `treeNode` before the `refTreeNode`.
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
        var treeNodeEl = child.ancestor('.' + CSS_TREE_NODE);

        if (treeNodeEl) {
            return treeNodeEl.getData('tree-node');
        }

        return null;
    },

    _inheritOwnerTreeAttrs: L.emptyFn,

    /**
     * Setter for [children](A.TreeData.html#attr_children).
     *
     * @method _setChildren
     * @protected
     * @param {Array} v
     * @return {Array}
     */
    _setChildren: function(v) {
        var instance = this;
        var childNodes = [];
        var container = instance.get('container');

        if (!container) {
            container = instance._createNodeContainer();
        }

        instance.childrenLength = v.length;

        // before render the node, make sure the PARENT_NODE and OWNER_TREE
        // references are updated this is required on the render phase of the
        // TreeNode (_createNodeContainer) to propagate the events callback
        // (appendChild/expand)
        var ownerTree = instance;

        if (isTreeNode(instance)) {
            ownerTree = instance.get('ownerTree');
        }

        var hasOwnerTree = isTreeView(ownerTree);
        var lazyLoad = true;

        if (hasOwnerTree) {
            lazyLoad = ownerTree.get('lazyLoad');
        }

        instance.updateIndex({});

        if (instance.childrenLength > 0) {
            instance.set('leaf', false);
        }

        A.Array.each(v, function(node) {
            if (node) {
                if (!isTreeNode(node) && isObject(node)) {
                    // cache and remove children to lazy add them later for
                    // performance reasons
                    var children = node.children;
                    var hasChildren = children && children.length;

                    node.ownerTree = ownerTree;
                    node.parentNode = instance;

                    if (hasChildren && lazyLoad) {
                        delete node.children;
                    }

                    // creating node from json
                    var jsonNode = node;

                    node = instance.createNode(node);

                    if (hasChildren && lazyLoad) {
                        jsonNode.children = children;

                        node.childrenLength = children.length;

                        A.setTimeout(function() {
                            node.set('children', children);
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


}, '3.0.1', {"requires": ["aui-base-core", "aui-base-lang", "aui-node-base", "aui-timer", "aui-component"]});
