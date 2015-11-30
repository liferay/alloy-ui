YUI.add('aui-tree-io', function (A, NAME) {

/**
 * The TreeViewIO Utility
 *
 * @module aui-tree
 * @submodule aui-tree-io
 */

var Lang = A.Lang,
    isFunction = Lang.isFunction,
    isString = Lang.isString,

    getCN = A.getClassName,

    CSS_TREE_NODE_IO_LOADING = getCN('tree', 'node', 'io', 'loading');

/**
 * A base class for TreeViewIO.
 *
 * @class A.TreeViewIO
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

function TreeViewIO() {
    var instance = this;

    instance.publish(
        'ioRequestSuccess', {
            defaultFn: instance._onIOSuccessDefault
        }
    );
}

/**
 * Static property used to define the default attribute
 * configuration for the TreeViewIO.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
TreeViewIO.ATTRS = {

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
    }
};

TreeViewIO.prototype = {

    /**
     * Construction logic executed during TreeViewIO instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.publish(

        );
    },

    /**
     * Create nodes.
     *
     * @method createNodes
     * @param nodes
     */
    createNodes: function(nodes) {
        var instance = this,
            paginator = instance.get('paginator');

        A.Array.each(A.Array(nodes), function(node) {
            var childrenLength = instance.getChildrenLength();

            if (paginator && (paginator.total <= childrenLength)) {
                return;
            }

            instance.appendChild(
                instance.createNode(node)
            );
        });

        instance._syncPaginatorUI(nodes);
    },

    /**
     * Initialize the IO transaction setup on the
     * [io](A.TreeViewIO.html#attr_io) attribute.
     *
     * @method initIO
     */
    initIO: function() {
        var instance = this;

        var io = instance.get('io');

        if (isFunction(io.cfg.data)) {
            io.cfg.data = io.cfg.data.call(instance, instance);
        }

        instance._syncPaginatorIOData(io);

        if (isFunction(io.loader)) {
            var loader = A.bind(io.loader, instance);

            // apply loader in the TreeNodeIO scope
            loader(io.url, io.cfg, instance);
        }
        else {
            A.io.request(io.url, io.cfg);
        }
    },

    /**
     * IO Start handler.
     *
     * @method ioStartHandler
     */
    ioStartHandler: function() {
        var instance = this;

        var contentBox = instance.get('contentBox');

        instance.set('loading', true);

        contentBox.addClass(CSS_TREE_NODE_IO_LOADING);
    },

    /**
     * IO Complete handler.
     *
     * @method ioCompleteHandler
     */
    ioCompleteHandler: function() {
        var instance = this;

        var contentBox = instance.get('contentBox');

        instance.set('loading', false);
        instance.set('loaded', true);

        contentBox.removeClass(CSS_TREE_NODE_IO_LOADING);
    },

    /**
     * IO Success handler.
     *
     * @method ioSuccessHandler
     */
    ioSuccessHandler: function() {
        var instance = this;

        var io = instance.get('io');

        var args = Array.prototype.slice.call(arguments);
        var length = args.length;

        // if using the first argument as the JSON object
        var nodes = args[1];

        // if using (event, id, o) yui callback syntax
        if (length >= 3) {
            var o = args[2];
            // try to convert responseText to JSON
            try {
                nodes = A.JSON.parse(o.responseText);
            }
            catch (e) {}
        }

        var formatter = io.formatter;

        if (formatter) {
            nodes = formatter(nodes);
        }

        instance.createNodes(nodes);

        instance.fire('ioRequestSuccess', nodes);
    },

    /**
     * IO Failure handler.
     *
     * @method ioFailureHandler
     */
    ioFailureHandler: function() {
        var instance = this;

        instance.fire('ioRequestFailure');

        instance.set('loading', false);
        instance.set('loaded', false);
    },

    /**
     * Fire after IO success default.
     *
     * @method _onIOSuccessDefault
     * @param event
     * @protected
     */
    _onIOSuccessDefault: function() {
        var instance = this;

        var ownerTree = instance.get('ownerTree');

        if (ownerTree && ownerTree.ddDelegate) {
            ownerTree.ddDelegate.syncTargets();
        }
    },

    /**
     * Setter for [io](A.TreeViewIO.html#attr_io).
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
            v = {
                url: v
            };
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

            fn.defaultFn = true;

            if (isFunction(userFn)) {
                // wrapping user callback and default callback, invoking both
                // handlers
                var wrappedFn = A.bind(
                    function() {
                        fn.apply(instance, arguments);
                        userFn.apply(instance, arguments);
                    },
                    instance
                );

                wrappedFn.wrappedFn = true;

                v.cfg.on[name] = wrappedFn;
            }
            else {
                // get from defCallbacks map
                v.cfg.on[name] = fn;
            }

        });

        return v;
    }
};

A.TreeViewIO = TreeViewIO;


}, '3.0.1', {"requires": ["aui-component", "aui-io"]});
