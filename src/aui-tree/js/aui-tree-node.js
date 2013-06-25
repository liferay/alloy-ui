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

	CACHE = 'cache',
	IO = 'io',
	LOADED = 'loaded',
	LOADING = 'loading',
	PAGINATOR = 'paginator',
	ALWAYS_SHOW_HITAREA = 'alwaysShowHitArea',
	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	COLLAPSED = 'collapsed',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	DRAGGABLE = 'draggable',
	EXPANDED = 'expanded',
	HIDDEN = 'hidden',
	HIT_AREA_EL = 'hitAreaEl',
	HITAREA = 'hitarea',
	ICON = 'icon',
	ICON_EL = 'iconEl',
	INVALID = 'invalid',
	HIDE = 'hide',
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
	OK = 'ok',
	REFRESH = 'refresh',
	MINUS = 'minus',
	PLUS = 'plus',
	FILE = 'file',
	CLOSE = 'close',
	FOLDER = 'folder',
	SIGN = 'sign',
	OPEN = 'open',
	CHECK = 'check',

	isTreeNode = function(v) {
		return ( v instanceof A.TreeNode );
	},

	isTreeView = function(v) {
		return ( v instanceof A.TreeView );
	},

	getCN = A.getClassName,

	CSS_TREE_COLLAPSED = getCN(TREE, COLLAPSED),
	CSS_TREE_CONTAINER = getCN(TREE, CONTAINER),
	CSS_TREE_EXPANDED = getCN(TREE, EXPANDED),
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
	CSS_ICON_FOLDER_CLOSE = getCN(ICON, FOLDER, CLOSE),
	CSS_ICON_FOLDER_OPEN = getCN(ICON, FOLDER, OPEN),
	CSS_ICON_ICON_PLUS = getCN(ICON, PLUS),
	CSS_ICON_ICON_MINUS = getCN(ICON, MINUS),
	CSS_ICON_ICON_FILE = getCN(ICON, FILE),
	CSS_ICON_ICON_REFRESH = getCN(ICON, REFRESH),
	CSS_ICON_OK_SIGN = getCN(ICON, OK, SIGN),
	CSS_ICON_CHECK = getCN(ICON, CHECK),

	HIT_AREA_TPL = '<i class="'+CSS_TREE_HITAREA+'"></i>',
	ICON_TPL = '<i class="'+CSS_TREE_ICON+'"></i>',
	LABEL_TPL = '<span class="'+CSS_TREE_LABEL+'"></span>',
	NODE_CONTAINER_TPL = '<ul></ul>',

	NODE_BOUNDING_TEMPLATE = '<li class="'+CSS_TREE_NODE+'"></li>',
	NODE_CONTENT_TEMPLATE = '<div class="'+CSS_TREE_NODE_CONTENT+'"></div>';

/**
 * A base class for TreeNode, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>The node for the TreeView component</li>
 * </ul>
 *
 * Check the [live demo](http://alloyui.com/examples/tree/).
 *
 * @class A.TreeNode
 * @extends A.Base
 * @uses A.TreeData
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
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
						iconCheck: CSS_ICON_CHECK,
						iconCollapsed: CSS_ICON_FOLDER_CLOSE,
						iconExpanded: CSS_ICON_FOLDER_OPEN,
						iconHitAreaCollapsed: [ CSS_TREE_HITAREA, CSS_ICON_ICON_PLUS ].join(SPACE),
						iconHitAreaExpanded: [ CSS_TREE_HITAREA, CSS_ICON_ICON_MINUS ].join(SPACE),
						iconLeaf: CSS_ICON_ICON_FILE,
						iconLoading: CSS_ICON_ICON_REFRESH,
						iconUncheck: CSS_ICON_CHECK
					},
					normal: {
						iconCheck: CSS_ICON_CHECK,
						iconHitAreaCollapsed: [ CSS_TREE_HITAREA, CSS_ICON_ICON_PLUS ].join(SPACE),
						iconHitAreaExpanded: [ CSS_TREE_HITAREA, CSS_ICON_ICON_MINUS ].join(SPACE),
						iconLoading: CSS_ICON_ICON_REFRESH,
						iconUncheck: CSS_ICON_CHECK
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
				value: BLANK,
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
			 * Label element to house the <code>label</code> attribute.
			 *
			 * @attribute labelEl
			 * @default Generated DOM element.
			 * @type Node | String
			 */
			labelEl: {
				setter: A.one,
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

				var boundingBox = instance.get(BOUNDING_BOX);

				boundingBox.setData(TREE_NODE, instance);

				// Sync the Widget TreeNode id with the BOUNDING_BOX id
				instance._syncTreeNodeBBId();

				instance._uiSetDraggable(instance.get(DRAGGABLE));
				instance._uiSetExpanded(instance.get(EXPANDED));
				instance._uiSetLeaf(instance.get(LEAF));
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

				if (!instance.get(RENDERED)) {
					instance.renderUI();
					instance.bindUI();
					instance.syncUI();

					instance.set(RENDERED, true);
				}

				if (container) {
					var boundingBox = instance.get(BOUNDING_BOX);
					var paginator = instance.get(PAGINATOR);

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

				contentBox.append( instance.get(ICON_EL) );
				contentBox.append( instance.get(LABEL_EL) );
				boundingBox.append(contentBox);

				var nodeContainer = instance.get(CONTAINER);

				if (nodeContainer) {
					if (!instance.get(EXPANDED)) {
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
				var nodeContainer = instance.get(CONTAINER) || A.Node.create(NODE_CONTAINER_TPL);

				nodeContainer.addClass(CSS_TREE_CONTAINER);

				// when it's not a leaf it has a <ul> container
				instance.set(CONTAINER, nodeContainer);

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

				if (instance.get(ALWAYS_SHOW_HITAREA) || instance.getChildrenLength()) {
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
					ownerTree = instance.get(OWNER_TREE);

				if (ownerTree) {
					var type = ownerTree.get('type'),
						cssClasses = instance.get('cssClasses.' + type);

					if (!cssClasses) {
						return;
					}

					var expanded = instance.get(EXPANDED),
						iconEl = instance.get(ICON_EL),
						hitAreaEl = instance.get(HIT_AREA_EL),
						icon = instance.isLeaf() ?
								cssClasses.iconLeaf :
								(expanded ? cssClasses.iconExpanded : cssClasses.iconCollapsed),
						iconHitArea = expanded ?
										cssClasses.iconHitAreaExpanded :
										cssClasses.iconHitAreaCollapsed;

					if (instance.get(LOADING)) {
						icon = cssClasses.iconLoading;
					}

					iconEl.setAttribute('className', icon || BLANK);
					hitAreaEl.setAttribute('className', iconHitArea || BLANK);
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

				instance.set(EXPANDED, false);
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
			 * Check if the current TreeNode contains the passed <code>node</code>.
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

				instance.set(EXPANDED, true);
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

				var parentNode = instance.get(PARENT_NODE);

				while (parentNode) {
					++depth;
					parentNode = parentNode.get(PARENT_NODE);
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
				return this.get(CONTENT_BOX).hasClass(CSS_TREE_NODE_SELECTED);
			},

			/**
			 * Whether the current TreeNode is a leaf or not.
			 *
			 * @method isLeaf
			 * @return {Boolean}
			 */
			isLeaf: function() {
				var instance = this;

				return instance.get(LEAF);
			},

			/**
			 * Whether the current TreeNode is ancestor of the passed <code>node</code> or not.
			 *
			 * @method isLeaf
			 * @return {Boolean}
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
			* Fire when <code>mouseover</code> the current TreeNode.
			*
			* @method over
			*/
			over: function() {
				this.get(CONTENT_BOX).addClass(CSS_TREE_NODE_OVER);
			},

			/*
			* Fire when <code>mouseout</code> the current TreeNode.
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
			 * Set <code>draggable</code> attribute on the UI.
			 *
			 * @method _uiSetDraggable
			 * @param val
			 * @protected
			 */
			_uiSetDraggable: function(val) {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);

				contentBox.toggleClass(CSS_TREE_NODE_CONTENT_INVALID, !val);
			},

			/**
			 * Set <code>expanded</code> attribute on the UI.
			 *
			 * @method _uiSetExpanded
			 * @param val
			 * @protected
			 */
			_uiSetExpanded: function(val) {
				var instance = this;

				if (!instance.isLeaf()) {
					var container = instance.get(CONTAINER);
					var contentBox = instance.get(CONTENT_BOX);

					if (val) {
						contentBox.replaceClass(CSS_TREE_COLLAPSED, CSS_TREE_EXPANDED);

						if (container) {
							container.show();
						}
					}
					else {
						contentBox.replaceClass(CSS_TREE_EXPANDED, CSS_TREE_COLLAPSED);

						if (container) {
							container.hide();
						}
					}
				}
			},

			/**
			 * Set <code>leaf</code> attribute on the UI.
			 *
			 * @method _uiSetLeaf
			 * @param val
			 * @protected
			 */
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
var TREE_NODE_IO = 'tree-node-io';

/**
 * A base class for TreeNodeIO, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>Ajax support to load the children of the current TreeNode</li>
 * </ul>
 *
 * @class A.TreeNodeIO
 * @extends A.TreeNode
 * @uses A.TreeViewPaginator, A.TreeViewIO
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
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
				var instance = this;

				A.TreeNodeIO.superclass.syncUI.apply(this, arguments);
			},

			/**
			 * Create nodes.
			 *
			 * @method createNodes
			 * @param nodes
			 */
			createNodes: function(nodes) {
				var instance = this;

				A.Array.each(A.Array(nodes), function(node) {
					var newNode = instance.createNode(node);

					instance.appendChild(newNode);
				});

				instance._syncPaginatorUI(nodes);
			},

			/**
			 * Expand the current TreeNodeIO.
			 *
			 * @method expand
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

				if (io && !loaded && !loading && !this.hasChildNodes()) {
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

			/**
			 * Fire when IO success.
			 *
			 * @method _onIOSuccess
			 * @param event
			 */
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
var CHECKBOX = 'checkbox',
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

	CHECKBOX_CONTAINER_TPL = '<i class="'+CSS_TREE_NODE_CHECKBOX_CONTAINER+'"></i>',
	CHECKBOX_TPL = '<input class="'+CSS_TREE_NODE_CHECKBOX+'" type="checkbox" />';

/**
 * A base class for TreeNodeCheck, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>Checkbox support for the TreeNode</li>
 * </ul>
 *
 * @class A.TreeNodeCheck
 * @extends A.TreeNodeIO
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
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
					var checkName = this.get(CHECK_NAME);

					return A.Node.create(CHECKBOX_TPL).attr(NAME, checkName);
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

				var labelEl = instance.get(LABEL_EL);
				var checkEl = instance.get(CHECK_EL);
				var checkContainerEl = instance.get(CHECK_CONTAINER_EL);

				checkEl.hide();

				checkContainerEl.append(checkEl);

				labelEl.placeBefore(checkContainerEl);

				if (instance.isChecked()) {
					instance.check();
				}

				instance._uiSetChecked(instance.get(CHECKED));
			},

			/**
			 * Bind the events on the TreeNodeCheck UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);
				var labelEl = instance.get(LABEL_EL);

				A.TreeNodeCheck.superclass.bindUI.apply(instance, arguments);

				instance.after('checkedChange', A.bind(instance._afterCheckedChange, instance));

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
			check: function(originalTarget) {
				var instance = this;

				instance.set(CHECKED, true, {
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

				instance.set(CHECKED, false, {
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
			 * Whether the current TreeNodeCheck is checked.
			 *
			 * @method isChecked
			 * @return Boolean
			 */
			isChecked: function() {
				var instance = this;

				return instance.get(CHECKED);
			},

			/**
			 * Sync icon check on the UI.
			 *
			 * @method _syncIconCheckUI
			 * @protected
			 */
			_syncIconCheckUI: function() {
				var instance = this,
					ownerTree = instance.get(OWNER_TREE);

				if (ownerTree) {
					var type = ownerTree.get('type'),
						cssClasses = instance.get('cssClasses.' + type);

					if (!cssClasses) {
						return;
					}

					var checkContainerEl = instance.get(CHECK_CONTAINER_EL),
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
			 * Fire after <code>checked</code> change.
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
			 * Set the <code>checked</code> attribute on the UI.
			 *
			 * @method _uiSetChecked
			 * @param val
			 * @protected
			 */
			_uiSetChecked: function(val) {
				var instance = this;

				instance._syncIconCheckUI();
				instance.get(CHECK_EL).attr(CHECKED, val ? CHECKED : BLANK);
				instance.get(CONTENT_BOX).toggleClass(CSS_TREE_NODE_CHECKED, val);
			}
		}
	}
);

A.TreeNodeCheck = TreeNodeCheck;

/*
* TreeNodeTask
*/
var CHILD = 'child',
	TREE_NODE_TASK = 'tree-node-task',
	UNCHECKED = 'unchecked',

	isTreeNodeTask = function(node) {
		return node instanceof A.TreeNodeCheck;
	},

	CSS_TREE_NODE_CHILD_UNCHECKED = getCN(TREE, NODE, CHILD, UNCHECKED);

/**
 * A base class for TreeNodeTask, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>3 states checkbox support</li>
 *	<li>Automatic check/uncheck the parent status based on the children checked status</li>
 * </ul>
 *
 * @class A.TreeNodeTask
 * @extends A.TreeNodeCheck
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
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

			/**
			 * Check the current TreeNodeTask.
			 *
			 * @method check
			 * @param originalTarget
			 */
			check: function(originalTarget) {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);

				originalTarget = originalTarget || instance;

				if (!instance.isLeaf()) {
					instance.eachChildren(function(child) {
						if (isTreeNodeTask(child)) {
							child.check(originalTarget);
						}
					});
				}

				instance.eachParent(
					function(parentNode) {
						if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {
							parentNode.get(CONTENT_BOX).addClass(CSS_TREE_NODE_CHILD_UNCHECKED);
						}
					}
				);

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

				var contentBox = instance.get(CONTENT_BOX);

				originalTarget = originalTarget || instance;

				if (!instance.isLeaf()) {
					instance.eachChildren(function(child) {
						if (child instanceof A.TreeNodeCheck) {
							child.uncheck(originalTarget);
						}
					});
				}

				instance.eachParent(
					function(parentNode) {
						if (isTreeNodeTask(parentNode) && !parentNode.isChecked()) {
							parentNode.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);
						}
					}
				);

				contentBox.removeClass(CSS_TREE_NODE_CHILD_UNCHECKED);

				// invoke default uncheck logic
				A.TreeNodeTask.superclass.uncheck.call(this, originalTarget);
			}
		}
	}
);

A.TreeNodeTask = TreeNodeTask;

/*
* TreeNodeRadio
*/

var TREE_NODE_RADIO = 'tree-node-radio',

	isTreeNodeRadio = function(node) {
		return node instanceof A.TreeNodeRadio;
	},

	CSS_NODE_RADIO = getCN(TREE, NODE, RADIO);

/**
 * A base class for TreeNodeRadio, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>3 states checkbox support</li>
 *	<li>Automatic check/uncheck the parent status based on the children checked status</li>
 * </ul>
 *
 * @class A.TreeNodeRadio
 * @extends A.TreeNodeTask
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var TreeNodeRadio = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property TreeNodeRadio.NAME
		 * @type String
		 * @static
		 */
		NAME: TREE_NODE_RADIO,

		/**
		 * Static property used to define the default attribute
		 * configuration for the TreeNodeRadio.
		 *
		 * @property TreeNodeRadio.ATTRS
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
						iconCheck: CSS_ICON_OK_SIGN,
						iconCollapsed: CSS_ICON_FOLDER_CLOSE,
						iconExpanded: CSS_ICON_FOLDER_OPEN,
						iconHitAreaCollapsed: [ CSS_TREE_HITAREA, CSS_ICON_ICON_PLUS ].join(SPACE),
						iconHitAreaExpanded: [ CSS_TREE_HITAREA, CSS_ICON_ICON_MINUS ].join(SPACE),
						iconLeaf: CSS_ICON_ICON_FILE,
						iconLoading: CSS_ICON_ICON_REFRESH,
						iconUncheck: CSS_ICON_OK_SIGN
					},
					normal: {
						iconCheck: CSS_ICON_OK_SIGN,
						iconHitAreaCollapsed: [ CSS_TREE_HITAREA, CSS_ICON_ICON_PLUS ].join(SPACE),
						iconHitAreaExpanded: [ CSS_TREE_HITAREA, CSS_ICON_ICON_MINUS ].join(SPACE),
						iconLoading: CSS_ICON_ICON_REFRESH,
						iconUncheck: CSS_ICON_OK_SIGN
					}
				}
			}
		},

		EXTENDS: A.TreeNodeTask,

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

				instance.get(CONTENT_BOX).addClass(CSS_NODE_RADIO);
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
			}
		}
	}
);

A.TreeNodeRadio = TreeNodeRadio;

/**
 * TreeNode types hash map.
 *
 * <pre><code>A.TreeNode.nodeTypes = {
 *  radio: A.TreeNodeRadio,
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
	radio: A.TreeNodeRadio,
	task: A.TreeNodeTask,
	check: A.TreeNodeCheck,
	node: A.TreeNode,
	io: A.TreeNodeIO
};