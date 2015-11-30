YUI.add('aui-tree-paginator', function (A, NAME) {

/**
 * The TreeViewPaginator Utility
 *
 * @module aui-tree
 * @submodule aui-tree-paginator
 */

var Lang = A.Lang,
    isObject = Lang.isObject,
    isValue = Lang.isValue,

    getCN = A.getClassName,

    CSS_TREE_NODE_PAGINATOR = getCN('tree', 'node', 'paginator'),

    TPL_PAGINATOR = '<a class="' + CSS_TREE_NODE_PAGINATOR + '" hrsef="javascript:void(0);">{moreResultsLabel}</a>';

/**
 * A base class for TreeViewPaginator.
 *
 * @class A.TreeViewPaginator
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

function TreeViewPaginator() {
    var instance = this;

    A.after(instance._bindPaginatorUI, this, 'bindUI');

    A.after(instance._syncPaginatorUI, this, 'syncUI');
}

/**
 * Static property used to define the default attribute
 * configuration for the TreeView.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
TreeViewPaginator.ATTRS = {

    /**
     * Paginator.
     *
     * @attribute paginator
     * @type Object
     */
    paginator: {
        setter: function(value) {
            var paginatorNode = A.Node.create(
                Lang.sub(
                    TPL_PAGINATOR, {
                        moreResultsLabel: value.moreResultsLabel || 'Load more results'
                    }
                )
            );

            return A.merge({
                    alwaysVisible: false,
                    autoFocus: true,
                    element: paginatorNode,
                    endParam: 'end',
                    limitParam: 'limit',
                    start: 0,
                    startParam: 'start'
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

        var paginator = instance.get('paginator');

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
            'paginatorClick', {
                defaultFn: instance._defPaginatorClickFn,
                prefix: 'tree-node-io'
            }
        );
    },

    /**
     * Default paginatorClick event handler. Increment the
     * `paginator.start` to the next `paginator.limit`.
     *
     * @method _defPaginatorClickFn
     * @param {EventFacade} event The Event object
     * @protected
     */
    _defPaginatorClickFn: function() {
        var instance = this;

        var paginator = instance.get('paginator');

        if (isValue(paginator.limit)) {
            paginator.start = instance.getChildrenLength();
        }

        if (instance.get('io')) {
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

        instance.fire('paginatorClick', output);

        event.halt();
    },

    /**
     * Adds two extra IO data parameter to the request to handle the
     * paginator. By default these parameters are `limit` and `start`.
     *
     * @method _syncPaginatorIOData
     * @protected
     */
    _syncPaginatorIOData: function(io) {
        var instance = this;

        var paginator = instance.get('paginator');

        if (paginator && isValue(paginator.limit)) {
            var data = io.cfg.data || {};

            data[paginator.limitParam] = paginator.limit;
            data[paginator.startParam] = paginator.start;
            data[paginator.endParam] = (paginator.start + paginator.limit);

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

        var paginator = instance.get('paginator');

        if (paginator) {
            var hasMoreData = true;

            if (newNodes) {
                hasMoreData = (newNodes.length > 0);
            }

            var childrenLength = instance.getChildrenLength();
            var total = paginator.total || childrenLength;

            var showPaginator = childrenLength && hasMoreData && (total > childrenLength);

            if (paginator.alwaysVisible || showPaginator) {
                instance.get('container').append(
                    paginator.element.show()
                );

                if (paginator.autoFocus) {
                    try {
                        paginator.element.focus();
                    }
                    catch (e) {}
                }
            }
            else {
                paginator.element.hide();
            }
        }
    }
};

A.TreeViewPaginator = TreeViewPaginator;


}, '3.0.1', {"requires": ["yui-base"]});
