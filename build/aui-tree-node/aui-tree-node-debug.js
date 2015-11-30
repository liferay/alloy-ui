YUI.add('aui-tree-node', function (A, NAME) {

/**
 * The TreeNode Utility
 *
 * @module aui-tree
 * @submodule aui-tree-node
 */

var Lang = A.Lang,
    isString = Lang.isString,
    isBoolean = Lang.isBoolean,
    isFunction = Lang.isFunction,

    isTreeNode = function(v) {
        return (v instanceof A.TreeNode);
    },

    isTreeView = function(v) {
        return (v instanceof A.TreeView);
    },

    getCN = A.getClassName,

    CSS_ICON = getCN('glyphicon'),
    CSS_TREE_COLLAPSED = getCN('tree', 'collapsed'),
    CSS_TREE_CONTAINER = getCN('tree', 'container'),
    CSS_TREE_EXPANDED = getCN('tree', 'expanded'),
    CSS_TREE_HITAREA = getCN('tree', 'hitarea'),
    CSS_TREE_ICON = getCN('tree', 'icon'),
    CSS_TREE_LABEL = getCN('tree', 'label'),
    CSS_TREE_NODE = getCN('tree', 'node'),
    CSS_TREE_NODE_CONTENT = getCN('tree', 'node', 'content'),
    CSS_TREE_NODE_CONTENT_INVALID = getCN('tree', 'node', 'content', 'invalid'),
    CSS_TREE_NODE_HIDDEN_HITAREA = getCN('tree', 'node', 'hidden', 'hitarea'),
    CSS_TREE_NODE_LEAF = getCN('tree', 'node', 'leaf'),
    CSS_TREE_NODE_OVER = getCN('tree', 'node', 'over'),
    CSS_TREE_NODE_SELECTED = getCN('tree', 'node', 'selected'),
    CSS_ICON_FOLDER_CLOSE = getCN('glyphicon', 'folder', 'close'),
    CSS_ICON_FOLDER_OPEN = getCN('glyphicon', 'folder', 'open'),
    CSS_ICON_ICON_PLUS = getCN('glyphicon', 'plus'),
    CSS_ICON_ICON_MINUS = getCN('glyphicon', 'minus'),
    CSS_ICON_ICON_FILE = getCN('glyphicon', 'file'),
    CSS_ICON_ICON_REFRESH = getCN('glyphicon', 'refresh'),
    CSS_ICON_OK_SIGN = getCN('glyphicon', 'ok', 'sign'),
    CSS_ICON_CHECK = getCN('glyphicon', 'check'),

    HIT_AREA_TPL = '<span tabindex="0" class="' + CSS_TREE_HITAREA + '"></span>',
    ICON_TPL = '<span class="' + CSS_TREE_ICON + '"></span>',
    LABEL_TPL = '<span class="' + CSS_TREE_LABEL + '"></span>',
    NODE_CONTAINER_TPL = '<ul></ul>',

    NODE_BOUNDING_TEMPLATE = '<li class="' + CSS_TREE_NODE + '"></li>',
    NODE_CONTENT_TEMPLATE = '<div class="' + CSS_TREE_NODE_CONTENT + '"></div>';

/**
 * A base class for TreeNode, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - The node for the TreeView component
 *
 * Check the [live demo](http://alloyui.com/examples/tree/).
 *
 * @class A.TreeNode
 * @extends Base
 * @uses A.TreeData
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TreeNode = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'tree-node',

    /**
     * Static property used to define the default attribute
     * configuration for the TreeNode.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The widget's outermost node, used for sizing and positioning.
         *
         * @attribute boundingBox
         */
        boundingBox: {
            valueFn: function() {
                return A.Node.create(NODE_BOUNDING_TEMPLATE);
            }
        },

        /**
         * The direct descendant of a widget's
         * bounding box and houses its content.
         *
         * @attribute contentBox
         */
        contentBox: {
            valueFn: function() {
                return A.Node.create(NODE_CONTENT_TEMPLATE);
            }
        },

        /**
         * CSS classes used on TreeNode.
         *
         * @attribute cssClasses
         * @type Object
         */
        cssClasses: {
            value: {
                file: {
                    iconCheck: [CSS_ICON, CSS_ICON_CHECK].join(' '),
                    iconCollapsed: [CSS_ICON, CSS_ICON_FOLDER_CLOSE].join(' '),
                    iconExpanded: [CSS_ICON, CSS_ICON_FOLDER_OPEN].join(' '),
                    iconHitAreaCollapsed: [CSS_TREE_HITAREA, CSS_ICON_ICON_PLUS].join(' '),
                    iconHitAreaExpanded: [CSS_TREE_HITAREA, CSS_ICON_ICON_MINUS].join(' '),
                    iconLeaf: [CSS_ICON, CSS_ICON_ICON_FILE].join(' '),
                    iconLoading: [CSS_ICON, CSS_ICON_ICON_REFRESH].join(' '),
                    iconUncheck: [CSS_ICON, CSS_ICON_CHECK].join(' ')
                },
                normal: {
                    iconCheck: [CSS_ICON, CSS_ICON_CHECK].join(' '),
                    iconHitAreaCollapsed: [CSS_TREE_HITAREA, CSS_ICON_ICON_PLUS].join(' '),
                    iconHitAreaExpanded: [CSS_TREE_HITAREA, CSS_ICON_ICON_MINUS].join(' '),
                    iconLoading: [CSS_ICON, CSS_ICON_ICON_REFRESH].join(' '),
                    iconUncheck: [CSS_ICON, CSS_ICON_CHECK].join(' ')
                }
            }
        },

        /**
         * If true the TreeNode is draggable.
         *
         * @attribute draggable
         * @default true
         * @type Boolean
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
            value: '',
            validator: isString
        },

        /**
         * Whether the TreeNode is expanded by default.
         *
         * @attribute expanded
         * @default false
         * @type Boolean
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
            validator: isString,
            valueFn: function() {
                return A.guid();
            }
        },

        /**
         * Whether the TreeNode could have children or not (i.e. if any
         * children is present the TreeNode is a leaf).
         *
         * @attribute leaf
         * @default true
         * @type Boolean
         */
        leaf: {
            value: true,
            setter: function(v) {
                // if has children it's not a leaf
                if (v && this.get('children').length) {
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
            getter: '_getSibling',
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
            getter: '_getSibling',
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
         * Label element to house the `label` attribute.
         *
         * @attribute labelEl
         * @default Generated DOM element.
         * @type Node | String
         */
        labelEl: {
            setter: A.one,
            valueFn: function() {
                var label = this.get('label');

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
            setter: A.one,
            valueFn: function() {
                return A.Node.create(HIT_AREA_TPL);
            }
        },

        /**
         * Always show the hitarea icon.
         *
         * @attribute alwaysShowHitArea
         * @default true
         * @type Boolean
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
            setter: A.one,
            valueFn: function() {
                return A.Node.create(ICON_TPL);
            }
        },

        /**
         * Specify the tab order.
         *
         * @attribute tabIndex
         * @default null
         */
        tabIndex: {
            value: null
        },

        /**
         * If true the TreeNode is rendered.
         *
         * @attribute rendered
         * @default false
         * @type Boolean
         */
        rendered: {
            validator: isBoolean,
            value: false
        }
    },

    AUGMENTS: [A.TreeData, A.TreeViewIO, A.TreeViewPaginator],

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

            var boundingBox = instance.get('boundingBox');

            boundingBox.setData('tree-node', instance);

            // Sync the Widget TreeNode id with the BOUNDING_BOX id
            instance._syncTreeNodeBBId();

            instance._uiSetDraggable(instance.get('draggable'));
            instance._uiSetExpanded(instance.get('expanded'));
            instance._uiSetLeaf(instance.get('leaf'));
        },

        /**
         * Bind the events on the TreeNode UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance.after({
                childrenChange: instance._afterSetChildren,
                draggableChange: instance._afterDraggableChange,
                expandedChange: instance._afterExpandedChange,
                idChange: instance._afterSetId,
                leafChange: instance._afterLeafChange,
                loadingChange: instance._afterLoadingChange
            });
        },

        /**
         * Render TreeNode.
         *
         * @method render
         * @param container
         */
        render: function(container) {
            var instance = this;

            if (!instance.get('rendered')) {
                instance.renderUI();
                instance.bindUI();
                instance.syncUI();

                instance.set('rendered', true);
            }

            if (container) {
                var boundingBox = instance.get('boundingBox');
                var paginator = instance.get('paginator');

                boundingBox.appendTo(container);

                if (paginator) {
                    boundingBox.insertBefore(paginator.element);
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
        _afterLoadingChange: function() {
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
        _afterSetChildren: function() {
            var instance = this;

            instance._syncIconUI();
        },

        /**
         * Render the `contentBox` node.
         *
         * @method _renderContentBox
         * @protected
         * @return {Node}
         */
        _renderContentBox: function() {
            var instance = this;

            var contentBox = instance.get('contentBox');

            if (!instance.isLeaf()) {
                var expanded = instance.get('expanded');

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
         * Render the `boundingBox` node.
         *
         * @method _renderBoundingBox
         * @protected
         * @return {Node}
         */
        _renderBoundingBox: function() {
            var instance = this;

            var boundingBox = instance.get('boundingBox');
            var contentBox = instance.get('contentBox');

            contentBox.append(instance.get('iconEl'));
            contentBox.append(instance.get('labelEl'));
            boundingBox.append(contentBox);

            var nodeContainer = instance.get('container');

            if (nodeContainer) {
                if (!instance.get('expanded')) {
                    nodeContainer.hide();
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

            // creating <ul class="tree-container">
            var nodeContainer = instance.get('container') || A.Node.create(NODE_CONTAINER_TPL);

            nodeContainer.addClass(CSS_TREE_CONTAINER);

            // when it's not a leaf it has a <ul> container
            instance.set('container', nodeContainer);

            return nodeContainer;
        },

        /**
         * Sync the hitarea UI.
         *
         * @method _syncHitArea
         * @protected
         */
        _syncHitArea: function() {
            var instance = this;

            if (instance.get('alwaysShowHitArea') || instance.getChildrenLength()) {
                instance.showHitArea();
            }
            else {
                instance.hideHitArea();
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
            var instance = this,
                ownerTree = instance.get('ownerTree');

            if (ownerTree) {
                var type = ownerTree.get('type'),
                    cssClasses = instance.get('cssClasses.' + type);

                if (!cssClasses) {
                    return;
                }

                var expanded = instance.get('expanded'),
                    iconEl = instance.get('iconEl'),
                    hitAreaEl = instance.get('hitAreaEl'),
                    icon = instance.isLeaf() ?
                    cssClasses.iconLeaf :
                    (expanded ? cssClasses.iconExpanded : cssClasses.iconCollapsed),
                    iconHitArea = expanded ?
                    cssClasses.iconHitAreaExpanded :
                    cssClasses.iconHitAreaCollapsed;

                if (instance.get('loading')) {
                    icon = cssClasses.iconLoading;
                }

                iconEl.setAttribute('className', icon || '');
                hitAreaEl.setAttribute('className', iconHitArea || '');
            }

            instance._syncHitArea();
        },

        /**
         * Append child on TreeNode.
         *
         * @method appendChild
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

            instance.set('expanded', false);
        },

        /**
         * Collapse all TreeNodes.
         *
         * @method collapseAll
         */
        collapseAll: function() {
            var instance = this;

            A.TreeNode.superclass.collapseAll.apply(instance, arguments);

            // instance is also a node, so collapse itself
            instance.collapse();
        },

        /**
         * Check if the current TreeNode contains the passed `node`.
         *
         * @method contains
         * @param {TreeNode} node
         * @return {Boolean}
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

            instance.set('expanded', true);
        },

        /**
         * Expand all TreeNodes.
         *
         * @method expandAll
         */
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

            var parentNode = instance.get('parentNode');

            while (parentNode) {
                ++depth;
                parentNode = parentNode.get('parentNode');
            }

            return depth;
        },

        /**
         * Check if it has child nodes.
         *
         * @method hasChildNodes
         */
        hasChildNodes: function() {
            var instance = this;

            return (!instance.isLeaf() &&
                A.TreeNode.superclass.hasChildNodes.apply(this, arguments));
        },

        /**
         * Whether the current TreeNode is selected or not.
         *
         * @method isSelected
         * @return {Boolean}
         */
        isSelected: function() {
            return this.get('contentBox').hasClass(CSS_TREE_NODE_SELECTED);
        },

        /**
         * Whether the current TreeNode is a leaf or not.
         *
         * @method isLeaf
         * @return {Boolean}
         */
        isLeaf: function() {
            var instance = this;

            return instance.get('leaf');
        },

        /**
         * Whether the current TreeNode is ancestor of the passed `node` or not.
         *
         * @method isLeaf
         * @return {Boolean}
         */
        isAncestor: function(node) {
            var instance = this;

            var parentNode = instance.get('parentNode');

            while (parentNode) {
                if (parentNode === node) {
                    return true;
                }
                parentNode = parentNode.get('parentNode');
            }

            return false;
        },

        /**
         * Toggle the current TreeNode, `collapsed` or `expanded`.
         *
         * @method toggle
         */
        toggle: function() {
            var instance = this;

            if (instance.get('expanded')) {
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

            var ownerTree = instance.get('ownerTree');

            if (ownerTree) {
                ownerTree.set('lastSelected', instance);
            }

            instance.get('contentBox').addClass(CSS_TREE_NODE_SELECTED);

            instance.fire('select');
        },

        /*
         * Unselect the current TreeNode.
         *
         * @method unselect
         */
        unselect: function() {
            var instance = this;

            instance.get('contentBox').removeClass(CSS_TREE_NODE_SELECTED);

            instance.fire('unselect');
        },

        /*
         * Fire when `mouseover` the current TreeNode.
         *
         * @method over
         */
        over: function() {
            this.get('contentBox').addClass(CSS_TREE_NODE_OVER);
        },

        /*
         * Fire when `mouseout` the current TreeNode.
         *
         * @method over
         */
        out: function() {
            this.get('contentBox').removeClass(CSS_TREE_NODE_OVER);
        },

        /*
         * Show hitarea icon.
         *
         * @method showHitArea
         */
        showHitArea: function() {
            var instance = this;

            var hitAreaEl = instance.get('hitAreaEl');

            hitAreaEl.removeClass(CSS_TREE_NODE_HIDDEN_HITAREA);
        },

        /*
         * Hide hitarea icon.
         *
         * @method hideHitArea
         */
        hideHitArea: function() {
            var instance = this;

            var hitAreaEl = instance.get('hitAreaEl');

            hitAreaEl.addClass(CSS_TREE_NODE_HIDDEN_HITAREA);
        },

        /**
         * Set the `boundingBox` id.
         *
         * @method _syncTreeNodeBBId
         * @param {String} id
         * @protected
         */
        _syncTreeNodeBBId: function() {
            var instance = this;

            instance.get('boundingBox').attr(
                'id',
                instance.get('id')
            );
        },

        /**
         * Get get sibling.
         *
         * @method _getSibling
         * @param value, attrName
         * @protected
         */
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
         * Set `draggable` attribute on the UI.
         *
         * @method _uiSetDraggable
         * @param val
         * @protected
         */
        _uiSetDraggable: function(val) {
            var instance = this;
            var contentBox = instance.get('contentBox');

            contentBox.toggleClass(CSS_TREE_NODE_CONTENT_INVALID, !val);
        },

        /**
         * Set `expanded` attribute on the UI.
         *
         * @method _uiSetExpanded
         * @param val
         * @protected
         */
        _uiSetExpanded: function(val) {
            var instance = this;

            if (!instance.isLeaf()) {
                var container = instance.get('container');
                var contentBox = instance.get('contentBox');
                var ownerTree = instance.get('ownerTree');
                var treeHitArea = contentBox.one('.' + CSS_TREE_HITAREA);

                if (val) {
                    contentBox.replaceClass(CSS_TREE_COLLAPSED, CSS_TREE_EXPANDED);

                    if (!ownerTree && treeHitArea) {
                        treeHitArea.replaceClass(CSS_ICON_ICON_PLUS, CSS_ICON_ICON_MINUS);
                    }

                    if (container) {
                        container.show();
                    }
                }
                else {
                    contentBox.replaceClass(CSS_TREE_EXPANDED, CSS_TREE_COLLAPSED);

                    if (!ownerTree && treeHitArea) {
                        treeHitArea.replaceClass(CSS_ICON_ICON_MINUS, CSS_ICON_ICON_PLUS);
                    }

                    if (container) {
                        container.hide();
                    }
                }
            }
        },

        /**
         * Set `leaf` attribute on the UI.
         *
         * @method _uiSetLeaf
         * @param val
         * @protected
         */
        _uiSetLeaf: function(val) {
            var instance = this;

            var contentBox = instance.get('contentBox');

            if (val) {
                instance.get('container').remove();
                instance.get('hitAreaEl').remove();
            }
            else {
                // append hitarea element
                contentBox.prepend(instance.get('hitAreaEl'));

                // if has children append them to this model
                instance._createNodeContainer();

                instance._uiSetExpanded(instance.get('expanded'));
            }

            // add leaf css classes
            contentBox.toggleClass(CSS_TREE_NODE_LEAF, val);
        }
    }
});

A.TreeNode = TreeNode;

/*
 * TreeNodeIO
 */

/**
 * A base class for TreeNodeIO, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - Ajax support to load the children of the current TreeNode
 *
 * @class A.TreeNodeIO
 * @extends A.TreeNode
 * @uses A.TreeViewPaginator, A.TreeViewIO
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TreeNodeIO = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'tree-node-io',

    /**
     * Static property used to define the default attribute
     * configuration for the TreeNode.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Whether the current TreeNode IO transaction is loading.
         *
         * @attribute loading
         * @default false
         * @type Boolean
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
         * @type Boolean
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
         * @type Boolean
         */
        cache: {
            value: true,
            validator: isBoolean
        },

        /**
         * Whether the TreeNode could have children or not (i.e. if any
         * children is present the TreeNode is a leaf).
         *
         * @attribute leaf
         * @default false
         * @type Boolean
         */
        leaf: {
            value: false,
            validator: isBoolean
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

            A.TreeNodeIO.superclass.bindUI.apply(this, arguments);

            instance.on('ioRequestSuccess', instance._onIOSuccess, instance);
        },

        /**
         * Sync the TreeNodeIO UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            A.TreeNodeIO.superclass.syncUI.apply(this, arguments);
        },

        /**
         * Expand the current TreeNodeIO.
         *
         * @method expand
         */
        expand: function() {
            var instance = this;

            var cache = instance.get('cache');
            var io = instance.get('io');
            var loaded = instance.get('loaded');
            var loading = instance.get('loading');

            if (!cache) {
                // if cache is false on expand, always set LOADED to false
                instance.set('loaded', false);
            }

            if (io && !loaded && !loading && !instance.hasChildNodes() && !instance.isLeaf()) {
                if (!cache) {
                    // remove all children to reload
                    instance.empty();
                }

                instance.initIO();
            }
            else {
                A.TreeNodeIO.superclass.expand.apply(this, arguments);
            }
        },

        /**
         * If not specified on the TreeNode some attributes are inherited from
         * the ownerTree by this method.
         *
         * @method _inheritOwnerTreeAttrs
         * @protected
         */
        _inheritOwnerTreeAttrs: function() {
            var instance = this;

            var ownerTree = instance.get('ownerTree');

            if (ownerTree) {
                if (!instance.get('io')) {
                    var io = A.clone(
                        ownerTree.get('io'),
                        true,
                        function(value) {
                            if (isFunction(value) && (value.defaultFn || value.wrappedFn)) {
                                return false;
                            }

                            return true;
                        }
                    );

                    instance.set('io', io);
                }

                if (!instance.get('paginator')) {
                    var ownerTreePaginator = ownerTree.get('paginator');

                    var paginator = A.clone(ownerTreePaginator);

                    // make sure we are not using the same element passed to the
                    // ownerTree on the TreeNode
                    if (paginator && paginator.element) {
                        paginator.element = ownerTreePaginator.element.clone();
                    }

                    instance.set('paginator', paginator);
                }
            }
        },

        /**
         * Fire when IO success.
         *
         * @method _onIOSuccess
         * @param event
         */
        _onIOSuccess: function() {
            var instance = this;

            instance.expand();
        }
    }
});

A.TreeNodeIO = TreeNodeIO;

/*
 * TreeNodeCheck
 */
var CSS_TREE_NODE_CHECKBOX = getCN('tree', 'node', 'checkbox'),
    CSS_TREE_NODE_CHECKBOX_CONTAINER = getCN('tree', 'node', 'checkbox', 'container'),
    CSS_TREE_NODE_CHECKED = getCN('tree', 'node', 'checked'),

    CHECKBOX_CONTAINER_TPL = '<span class="' + CSS_TREE_NODE_CHECKBOX_CONTAINER + '"></span>',
    CHECKBOX_TPL = '<input class="' + CSS_TREE_NODE_CHECKBOX + '" type="checkbox" />';

/**
 * A base class for TreeNodeCheck, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - Checkbox support for the TreeNode
 *
 * @class A.TreeNodeCheck
 * @extends A.TreeNodeIO
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TreeNodeCheck = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'tree-node-check',

    /**
     * Static property used to define the default attribute
     * configuration for the TreeNode.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Whether the TreeNode is checked or not.
         *
         * @attribute checked
         * @default false
         * @type Boolean
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
            value: 'tree-node-check',
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
                var checkName = this.get('checkName');

                return A.Node.create(CHECKBOX_TPL).attr('name', checkName);
            }
        }
    },

    EXTENDS: A.TreeNodeIO,

    prototype: {

        /**
         * Create the DOM structure for the TreeNodeCheck. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            A.TreeNodeCheck.superclass.renderUI.apply(instance, arguments);

            var labelEl = instance.get('labelEl');
            var checkEl = instance.get('checkEl');
            var checkContainerEl = instance.get('checkContainerEl');

            checkEl.hide();

            checkContainerEl.append(checkEl);

            labelEl.placeBefore(checkContainerEl);

            if (instance.isChecked()) {
                instance.check();
            }

            instance._uiSetChecked(instance.get('checked'));
        },

        /**
         * Bind the events on the TreeNodeCheck UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            var contentBox = instance.get('contentBox');
            var labelEl = instance.get('labelEl');

            A.TreeNodeCheck.superclass.bindUI.apply(instance, arguments);

            instance.after('checkedChange', A.bind(instance._afterCheckedChange, instance));

            contentBox.delegate('click', A.bind(instance.toggleCheck, instance), '.' +
                CSS_TREE_NODE_CHECKBOX_CONTAINER);
            contentBox.delegate('click', A.bind(instance.toggleCheck, instance), '.' + CSS_TREE_LABEL);

            // cancel dblclick because of the check
            labelEl.swallowEvent('dblclick');
        },

        /**
         * Check the current TreeNode.
         *
         * @method check
         */
        check: function(originalTarget) {
            var instance = this;

            instance.set('checked', true, {
                originalTarget: originalTarget
            });
        },

        /**
         * Uncheck the current TreeNode.
         *
         * @method uncheck
         */
        uncheck: function(originalTarget) {
            var instance = this;

            instance.set('checked', false, {
                originalTarget: originalTarget
            });
        },

        /**
         * Toggle the check status of the current TreeNode.
         *
         * @method toggleCheck
         */
        toggleCheck: function() {
            var instance = this;

            var checkEl = instance.get('checkEl');
            var checked = checkEl.attr('checked');

            if (!checked) {
                instance.check();
            }
            else {
                instance.uncheck();
            }
        },

        /**
         * Whether the current TreeNodeCheck is checked.
         *
         * @method isChecked
         * @return Boolean
         */
        isChecked: function() {
            var instance = this;

            return instance.get('checked');
        },

        /**
         * Sync icon check on the UI.
         *
         * @method _syncIconCheckUI
         * @protected
         */
        _syncIconCheckUI: function() {
            var instance = this,
                ownerTree = instance.get('ownerTree');

            if (ownerTree) {
                var type = ownerTree.get('type'),
                    cssClasses = instance.get('cssClasses.' + type);

                if (!cssClasses) {
                    return;
                }

                var checkContainerEl = instance.get('checkContainerEl'),
                    isChecked = instance.isChecked();
                checkContainerEl.removeClass(
                    isChecked ?
                    cssClasses.iconUncheck : cssClasses.iconCheck);
                checkContainerEl.addClass(
                    isChecked ?
                    cssClasses.iconCheck : cssClasses.iconUncheck);
            }
        },

        /**
         * Fire after `checked` change.
         *
         * @method _afterCheckedChange
         * @param event
         * @protected
         */
        _afterCheckedChange: function(event) {
            var instance = this;

            instance._uiSetChecked(event.newVal);
        },

        /**
         * Set the `checked` attribute on the UI.
         *
         * @method _uiSetChecked
         * @param val
         * @protected
         */
        _uiSetChecked: function(val) {
            var instance = this;

            instance._syncIconCheckUI();
            instance.get('checkEl').attr('checked', val ? 'checked' : '');
            instance.get('contentBox').toggleClass(CSS_TREE_NODE_CHECKED, val);
        }
    }
});

A.TreeNodeCheck = TreeNodeCheck;

/*
 * TreeNodeTask
 */
var CSS_TREE_NODE_CHILD_UNCHECKED = getCN('tree', 'node', 'child', 'unchecked'),

    isTreeNodeTask = function(node) {
        return node instanceof A.TreeNodeCheck;
    };

/**
 * A base class for TreeNodeTask, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - 3 states checkbox support
 * - Automatic check/uncheck the parent status based on the children checked
 *   status
 *
 * @class A.TreeNodeTask
 * @extends A.TreeNodeCheck
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TreeNodeTask = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'tree-node-task',

    EXTENDS: A.TreeNodeCheck,

    prototype: {

        /**
         * Check the current TreeNodeTask.
         *
         * @method check
         * @param originalTarget
         */
        check: function(originalTarget) {
            var instance = this;

            var contentBox = instance.get('contentBox');

            originalTarget = originalTarget || instance;

            if (!instance.isLeaf()) {
                instance.eachChildren(function(child) {
                    if (isTreeNodeTask(child)) {
                        child.check(originalTarget);
                    }
                });
            }

            instance._uncheckedAncestorChildRemoveClass();

            contentBox.removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

            // invoke default check logic
            A.TreeNodeTask.superclass.check.call(this, originalTarget);
        },

        /**
         * Uncheck the current TreeNodeTask.
         *
         * @method uncheck
         * @param originalTarget
         */
        uncheck: function(originalTarget) {
            var instance = this;

            var contentBox = instance.get('contentBox');

            originalTarget = originalTarget || instance;

            if (!instance.isLeaf()) {
                instance.eachChildren(function(child) {
                    if (child instanceof A.TreeNodeCheck) {
                        child.uncheck(originalTarget);
                    }
                });
            }

            instance._uncheckedAncestorChildAddClass();

            contentBox.removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

            // invoke default uncheck logic
            A.TreeNodeTask.superclass.uncheck.call(this, originalTarget);
        },

        /**
         * Adds the class `tree-node-child-unchecked` to all checked ancestor TreeNodeTasks.
         *
         * @method _uncheckedAncestorChildAddClass
         */
        _uncheckedAncestorChildAddClass: function() {
            var instance = this;

            instance.eachParent(
                function(parentNode) {
                    if (isTreeNodeTask(parentNode) && parentNode.isChecked()) {
                        parentNode.get('contentBox').addClass(CSS_TREE_NODE_CHILD_UNCHECKED);
                    }
                }
            );
        },

        /**
         * Removes the class `tree-node-child-unchecked` from ancestor TreeNodeTasks, when all descendant TreeNodeTasks are checked.
         *
         * @method _uncheckedAncestorChildRemoveClass
         */
        _uncheckedAncestorChildRemoveClass: function() {
            var instance = this,
                children,
                childHasUncheckedChild,
                parentHasUncheckedDescendants;

            instance.eachParent(
                function(parentNode) {
                    if (isTreeNodeTask(parentNode) && !parentHasUncheckedDescendants) {
                        children = parentNode.getChildren();

                        parentHasUncheckedDescendants = A.Array.some(children, function(child) {
                            if ((child !== instance) && !child.isChecked()) {
                                return true;
                            }
                            else {
                                childHasUncheckedChild = child.get('contentBox').hasClass(CSS_TREE_NODE_CHILD_UNCHECKED);

                                if (childHasUncheckedChild) {
                                    return true;
                                }
                            }
                        });

                        if (!parentHasUncheckedDescendants) {
                            parentNode.get('contentBox').removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);
                        }
                    }
                }
            );
        }
    }
});

A.TreeNodeTask = TreeNodeTask;

/*
 * TreeNodeRadio
 */

var CSS_NODE_RADIO = getCN('tree', 'node', 'radio'),

    isTreeNodeRadio = function(node) {
        return node instanceof A.TreeNodeRadio;
    };

/**
 * A base class for TreeNodeRadio, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - 3 states checkbox support
 * - Automatic check/uncheck the parent status based on the children checked
 *   status
 *
 * @class A.TreeNodeRadio
 * @extends A.TreeNodeTask
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TreeNodeRadio = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'tree-node-radio',

    /**
     * Static property used to define the default attribute
     * configuration for the TreeNodeRadio.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * CSS classes used on TreeNodeRadio.
         *
         * @attribute cssClasses
         * @type Object
         */
        cssClasses: {
            value: {
                file: {
                    iconCheck: [CSS_ICON, CSS_ICON_OK_SIGN].join(' '),
                    iconCollapsed: [CSS_ICON, CSS_ICON_FOLDER_CLOSE].join(' '),
                    iconExpanded: [CSS_ICON, CSS_ICON_FOLDER_OPEN].join(' '),
                    iconHitAreaCollapsed: [CSS_TREE_HITAREA, CSS_ICON_ICON_PLUS].join(' '),
                    iconHitAreaExpanded: [CSS_TREE_HITAREA, CSS_ICON_ICON_MINUS].join(' '),
                    iconLeaf: [CSS_ICON, CSS_ICON_ICON_FILE].join(' '),
                    iconLoading: [CSS_ICON, CSS_ICON_ICON_REFRESH].join(' '),
                    iconUncheck: [CSS_ICON, CSS_ICON_OK_SIGN].join(' ')
                },
                normal: {
                    iconCheck: [CSS_ICON, CSS_ICON_OK_SIGN].join(' '),
                    iconHitAreaCollapsed: [CSS_TREE_HITAREA, CSS_ICON_ICON_PLUS].join(' '),
                    iconHitAreaExpanded: [CSS_TREE_HITAREA, CSS_ICON_ICON_MINUS].join(' '),
                    iconLoading: [CSS_ICON, CSS_ICON_ICON_REFRESH].join(' '),
                    iconUncheck: [CSS_ICON, CSS_ICON_OK_SIGN].join(' ')
                }
            }
        }
    },

    EXTENDS: A.TreeNodeCheck,

    prototype: {

        /**
         * Create the DOM structure for the TreeNodeRadio. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            A.TreeNodeRadio.superclass.renderUI.apply(instance, arguments);

            instance.get('contentBox').addClass(CSS_NODE_RADIO);
        },

        /**
         * Check the current TreeNodeRadio.
         *
         * @method check
         */
        check: function() {
            var instance = this;

            instance._uncheckNodesRadio();

            A.TreeNodeRadio.superclass.check.apply(this, arguments);
        },

        /**
         * Uncheck radio nodes.
         *
         * @method _uncheckNodesRadio
         * @param node
         * @protected
         */
        _uncheckNodesRadio: function(node) {
            var instance = this;

            var children;

            if (node) {
                children = node.get('children');
            }
            else {
                var ownerTree = instance.get('ownerTree');

                if (ownerTree) {
                    children = ownerTree.get('children');
                }
                else {
                    return;
                }
            }

            A.Array.each(
                children,
                function(value) {
                    if (!value.isLeaf()) {
                        instance._uncheckNodesRadio(value);
                    }

                    if (isTreeNodeRadio(value)) {
                        value.uncheck();
                    }
                }
            );
        }
    }
});

A.TreeNodeRadio = TreeNodeRadio;

/**
 * TreeNode types hash map.
 *
 * ```
 * A.TreeNode.nodeTypes = {
 *  radio: A.TreeNodeRadio,
 *  task: A.TreeNodeTask,
 *  check: A.TreeNodeCheck,
 *  node: A.TreeNode,
 *  io: A.TreeNodeIO
 * };
 * ```
 *
 * @for TreeNode
 * @property nodeTypes
 * @type Object
 */
A.TreeNode.nodeTypes = {
    radio: A.TreeNodeRadio,
    task: A.TreeNodeTask,
    check: A.TreeNodeCheck,
    node: A.TreeNode,
    io: A.TreeNodeIO
};


}, '3.0.1', {
    "requires": [
        "json",
        "querystring-stringify",
        "aui-tree-data",
        "aui-tree-io",
        "aui-tree-paginator",
        "event-key"
    ]
});
