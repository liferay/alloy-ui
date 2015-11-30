YUI.add('aui-surface-base', function (A, NAME) {

var getNodeById = function(id) {
    return A.one(A.config.doc.getElementById(id));
};

A.Surface = A.Base.create('surface', A.Base, [], {
    /**
     * Holds the active child element.
     *
     * @property activeChild
     * @type {Node}
     * @protected
     */
    activeChild: null,

    /**
     * Holds the default child element.
     *
     * @property defaultChild
     * @type {Node}
     * @protected
     */
    defaultChild: null,

    /**
     * Holds the element with the specified surface id, if not found creates a
     * new element with the specified id.
     *
     * @property el
     * @type {Node}
     * @protected
     */
    el: null,

    /**
     * Construction logic executed during Surface instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var id = this.get('id');

        if (!id) {
            throw new Error('Surface element id not specified.');
        }

        this.el = this.getEl(id);

        this.activeChild = this.defaultChild = this.addContent(A.Surface.DEFAULT);
    },

    /**
     * Adds screen content to a surface. If content hasn't been passed, see if
     * an element exists in the DOM that matches the id. By convention, the
     * element should already be nested in the right element and should have an
     * id that is a concatentation of the surface id + '-' + the screen id.
     *
     * @method addContent
     * @param {String} screenId The screen id the content belongs too.
     * @param {String | Node} opt_content The string content or node to add.
     * @return {Node}
     */
    addContent: function(screenId, opt_content) {
        if (!opt_content) {
            return this.getChild(screenId);
        }

        A.log('Screen [' + screenId + '] add content to surface [' + this + ']', 'info');

        var el = this.getEl(),
            child = this.createChild(screenId);

        child.append(opt_content);
        this.transition(child, null);

        if (el) {
            el.append(child);
        }

        return child;
    },

    /**
     * Creates child node of the surface.
     *
     * @method createChild
     * @param {String} screenId The screen id.
     * @return {Node | null}
     */
    createChild: function(screenId) {
        return A.Node.create('<div/>').setAttribute('id', this._makeId(screenId));
    },

    /**
     * Gets child node of the surface.
     *
     * @method getChild
     * @param {String} screenId The screen id.
     * @return {Node | null}
     */
    getChild: function(screenId) {
        return getNodeById(this._makeId(screenId));
    },

    /**
     * Retrieves the surface element from DOM, and sets it to the el property of
     * the current instance.
     *
     * @method getEl
     * @param  {String} opt_id The ID of the surface element. If not provided,
     *     this.el will be used.
     * @return {Node} The retrieved element.
     */
    getEl: function(opt_id) {
        if (this.el) {
            return this.el;
        }

        this.el = getNodeById(opt_id || this.get('id'));
        if (this.el) {
            this.el.plug(A.Plugin.ParseContent, {
                preserveScriptNodes: true
            });
        }

        return this.el;
    },

    /**
     * Shows screen content from a surface.
     *
     * @method show
     * @param {String} screenId The screen id to show.
     * @return {Promise} This can return a promise, which will pause the
     *     navigation until it is resolved.
     */
    show: function(screenId) {
        var deferred,
            el,
            from = this.activeChild,
            to = this.getChild(screenId);

        if (!to) {
            // When surface child for screen not found retrieve the default
            // content from DOM element with id `surfaceId-default`
            to = this.defaultChild;
        }

        if (from && from !== to) {
            from.remove();
        }

        // Avoid repainting if the child is already in place or the element does
        // not exist
        el = this.getEl();
        if (el && to && !to.inDoc()) {
            el.append(to);
        }

        deferred = this.transition(from, to);
        this.activeChild = to;

        return deferred;
    },

    /**
     * Removes screen content from a surface.
     *
     * @method remove
     * @param {String} screenId The screen id to remove.
     */
    remove: function(screenId) {
        var child = this.getChild(screenId);

        if (child) {
            child.remove(true);
        }
    },

    /**
     * @method toString
     * @return {String}
     */
    toString: function() {
        return this.get('id');
    },

    /**
     * Invokes the transition function specified on `transition` attribute.
     *
     * @method transition
     * @param {Node} from
     * @param {Node} to
     * @return {Promise} This can return a promise, which will pause the
     *     navigation until it is resolved.
     */
    transition: function(from, to) {
        return A.CancellablePromise.resolve(this.get('transition').call(this, from, to));
    },

    /**
     * Make the id for the element that holds content for a screen.
     *
     * @method _makeId
     * @param {String} screenId The screen id the content belongs too.
     * @return {String}
     */
    _makeId: function(screenId) {
        return this.get('id') + '-' + screenId;
    }
}, {
    ATTRS: {
        /**
         * If false, the screen will be disposed after being deactivated.
         * If true, the surface content will be left in the DOM with
         * display:none.
         *
         * @attribute transition
         * @default false
         * @type {Function}
         */
        transition: {
            validator: A.Lang.isFunction,
            valueFn: function() {
                return A.Surface.TRANSITION;
            }
        },

        /**
         * The surface id.
         *
         * @attribute id
         * @writeOnce
         * @default Generated using `A.guid()`.
         * @type {String}
         */
        id: {
            validator: A.Lang.isString,
            writeOnce: true
        }
    },

    DEFAULT: 'default',

    /**
     * Transition function that returns a promise, the navigation will be paused
     * until all surfaces' promise have completed. This is useful for
     * animations.
     *
     * @static
     * @property TRANSITION
     * @param {Node} from
     * @param {Node} to
     * @return {Promise} This can return a promise, which will pause the
     *     navigation until it is resolved.
     */
    TRANSITION: function(from, to) {
        if (from) {
            from.hide();
        }
        if (to) {
            to.show();
        }
        return null;
    }
});


}, '3.0.1', {"requires": ["base-build", "node-style", "timers", "aui-debounce", "aui-promise", "aui-parse-content"]});
