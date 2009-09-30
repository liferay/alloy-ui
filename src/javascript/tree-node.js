AUI.add('tree-node', function(A) {

var L = A.Lang,
	isString = L.isString,
	isBoolean = L.isBoolean,

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
	CSS_TREE_NODE_LEAF = getCN(TREE, NODE, LEAF),
	CSS_TREE_NODE_OVER = getCN(TREE, NODE, OVER),
	CSS_TREE_NODE_SELECTED = getCN(TREE, NODE, SELECTED),

	HIT_AREA_TPL = '<div class="'+CSS_TREE_HITAREA+'"></div>',
	ICON_TPL = '<div class="'+CSS_TREE_ICON+'"></div>',
	LABEL_TPL = '<div class="'+CSS_TREE_LABEL+'"></div>',
	NODE_CONTAINER_TPL = '<ul class="'+CSS_TREE_CONTAINER+'"></ul>',

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
		ownerTree: {
			value: null
		},

		label: {
			value: BLANK,
			validador: isString
		},

		expanded: {
			value: false,
			validador: isBoolean
		},

		id: {
			validador: isString,
			setter: function(v) {
				this.get(BOUNDING_BOX).attr(ID, v);

				return v;
			}
		},

		leaf: {
			value: true,
			setter: function(v) {
				// if has children it's not a leaf
				if (this.get(CHILDREN).length) {
					return false;
				}

				return v;
			},
			validador: isBoolean
		},

		nextSibling: {
			value: null,
			validador: isTreeNode
		},

		prevSibling: {
			value: null,
			validador: isTreeNode
		},

		parentNode: {
			value: null,
			validador: isTreeNode
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

		// invoking TreeData initializer
		TreeNode.superclass.initializer.apply(this, arguments);

		if (!instance.get(ID)) {
			// add a default unique id for the index
			instance.set( ID, A.guid(TREE_NODE) );
		}
	},

	bindUI: function() {
		var instance = this;

		// binding collapse/expand
		instance.publish('collapse', { defaultFn: instance._collapse });
		instance.publish('expand', { defaultFn: instance._expand });
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

		// when it's not a leaf it has a <ul> container
		instance.set(CONTAINER, nodeContainer);

		instance.eachChildren(function(node) {
			instance.appendChild(node, true);
		});

		return nodeContainer;
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
		var output = instance.getEventOutputMap(instance);

		instance.bubbleEvent('collapse', output);
	},

	_collapse: function(event) {
		// stopActionPropagation while bubbling
		if (event.stopActionPropagation) {
			return false;
		}

		var instance = this;

		if (!instance.isLeaf() && instance.get(EXPANDED)) {
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
		var output = instance.getEventOutputMap(instance);

		instance.bubbleEvent('expand', output);
	},

	_expand: function(event) {
		// stopActionPropagation while bubbling
		if (event.stopActionPropagation) {
			return false;
		}

		var instance = this;

		if (!instance.isLeaf() && !instance.get(EXPANDED)) {
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
		this.get(CONTENT_BOX).addClass(CSS_TREE_NODE_SELECTED);
	},

	unselect: function() {
		this.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_SELECTED);
	},

	over: function() {
		this.get(CONTENT_BOX).addClass(CSS_TREE_NODE_OVER);
	},

	out: function() {
		this.get(CONTENT_BOX).removeClass(CSS_TREE_NODE_OVER);
	}
});

A.TreeNode = TreeNode;


/*
* TreeNodeIO
*/
var isFunction = L.isFunction,

	CACHE = 'cache',
	IO = 'io',
	LOADING = 'loading',
	LOADED = 'loaded',
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
			validador: isBoolean
		},

		loaded: {
			value: false,
			validador: isBoolean
		},

		cache: {
			value: true,
			validador: isBoolean
		},

		leaf: {
			value: false,
			validador: isBoolean
		}
	}
});

A.extend(TreeNodeIO, A.TreeNode, {
	/*
	* Methods
	*/
	createNode: function(nodes) {
		var instance = this;

		instance.expand();

		A.each(nodes, function(node) {
			var newNode = TreeNodeIO.superclass.createNode.apply(instance, [node]);

			instance.appendChild(newNode);
		});
	},

	expand: function() {
		var instance = this;
		var io = instance.get(IO);
		var loaded = instance.get(LOADED);
		var loading = instance.get(LOADING);
		var cache = instance.get(CACHE);

		if (!cache) {
			// if cache is false on expand, always set LOADED to false
			instance.set(LOADED, false);
		}

		if (loaded) {
			TreeNodeIO.superclass.expand.apply(this, arguments);
		}
		else {
			if (!loading) {

				if (!cache) {
					// remove all children to reload
					instance.empty();
				}

				A.io(io.url, io.cfg);
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

	ioSuccessHandler: function(id, o) {
		var instance = this;
		var responseText = o.responseText;

		try {
			var nodes = A.JSON.parse(responseText);
		}
		catch(e) {}

		instance.createNode(nodes);
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

		if (isString(v)) {
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
	NAME = 'name',
	TREE_NODE_CHECK = 'tree-node-check',

	CSS_TREE_NODE_CHECKBOX = getCN(TREE, NODE, CHECKBOX),
	CSS_TREE_NODE_CHECKBOX_CONTAINER = getCN(TREE, NODE, CHECKBOX, CONTAINER),

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
			validador: isBoolean
		},

		checkName: {
			value: TREE_NODE_CHECK,
			validador: isString
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

A.extend(TreeNodeCheck, A.TreeNode, {
	/*
	* Lifecycle
	*/
	renderUI: function() {
		var instance = this;

		TreeNodeCheck.superclass.renderUI.apply(instance, arguments);

		var labelEl = instance.get(LABEL_EL);
		var checkEl = instance.get(CHECK_EL);
		var checkContainerEl = instance.get(CHECK_CONTAINER_EL);

		checkContainerEl.append(checkEl);

		labelEl.placeBefore(checkContainerEl);
	},

	bindUI: function() {
		var instance = this;
		var labelEl = instance.get(LABEL_EL);

		TreeNodeCheck.superclass.bindUI.apply(instance, arguments);

		instance.publish('check');
		instance.publish('uncheck');

		labelEl.on('mousedown', A.bind(instance.toggleCheck, instance));
	},

	/*
	* Methods
	*/
	check: function() {
		var instance = this;
		var checkEl = instance.get(CHECK_EL);

		instance.set(CHECKED, true);

		checkEl.attr(CHECKED, CHECKED);

		instance.fire('check');
	},

	uncheck: function() {
		var instance = this;
		var checkEl = instance.get(CHECK_EL);

		instance.set(CHECKED, true);

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
	}
});

A.TreeNodeCheck = TreeNodeCheck;


/*
* A.TreeNode.nodeTypes
*/
A.TreeNode.nodeTypes = {
	check: A.TreeNodeCheck,
	node: A.TreeNode,
	io: A.TreeNodeIO
};

}, '@VERSION', { requires: [ 'tree-data', 'io', 'json' ] });