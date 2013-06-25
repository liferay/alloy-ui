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
