AUI.add('tree-node', function(A) {

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
	EL = 'el',
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
				return isTreeNode(val) || isTreeView(val)
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
		var boundingBox = instance.get(BOUNDING_BOX);

		if (!instance.get(ID)) {
			// add a default unique id for the index
			instance.set( ID, A.guid(TREE_NODE) );
		}

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

		if (!instance.isLeaf()) {
			// append hitarea element
			contentBox.append( instance.get(HIT_AREA_EL) );

			// if has children append them to this model
			var nodeContainer = instance._createNodeContainer();
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

	/*
	* Listeners
	*/
	_afterSetChildren: function(event) {
		var instance = this;

		instance._syncHitArea(event.newVal);
	},

	_afterSetId: function(event) {
		var instance = this;

		instance.get(BOUNDING_BOX).attr(ID, event.newVal);
	}
});

A.TreeNode = TreeNode;


/*
* TreeNodeIO
*/
var isFunction = L.isFunction,

	CACHE = 'cache',
	FORMATTER = 'formatter',
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
			var id = args[0], o = args[1];
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

}, '@VERSION', { requires: [ 'tree-data', 'io', 'json', 'tree-css' ] });