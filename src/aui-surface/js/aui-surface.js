var Lang = A.Lang;

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
     * Holds the element with the specified surface id, if not found creates a
     * new element with the specified id.
     *
     * @property element
     * @type {Node}
     * @protected
     */
    element: null,

    /**
     * Construction logic executed during Surface instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var id = this.get('id');

        this.element = A.one(A.DOM.byId(id));
        this.activeChild = this.addContent(A.Surface.DEFAULT);
    },

    /**
     * Adds screen content to a surface. If content hasn't been passed, see if
     * an element exists in the DOM that matches the id. By convention, the
     * element should already be nested in the right element and should have an
     * id that is a concatentation of the surface id + '-' + the screen id.
     *
     * @method addContent
     * @param {String} screenId The screen id the content belongs too.
     * @param {Node | String} opt_content The content to add.
     * @return {Node}
     */
    addContent: function(screenId, opt_content) {
        var child = this.getChild(screenId);

        if (!opt_content) {
            return child;
        }
        if (!child) {
            child = this.createChild(screenId);
        }
        A.log('Screen [' + screenId + '] is adding content to surface [' + this + ']', 'info');
        child.setContent(opt_content);
        this.transition(child, null);
        this.element.append(child);
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
        return A.one(A.DOM.byId(this._makeId(screenId)));
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
        var child = this.getChild(screenId),
            deffered;

        // When child for screenId not found use activeChild instead, then the
        // transition goes from activeChild to child (activeChild)
        if (!child) {
            child = this.getChild(A.Surface.DEFAULT);
        }
        deffered = this.transition(this.activeChild, child);
        this.activeChild = child;
        return deffered;
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
            child.remove();
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
        return this.get('transition').call(this, from, to);
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
            validator: Lang.isFunction,
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
            validator: Lang.isString,
            value: A.guid(),
            writeOnce: true
        },

        /**
         * The document.title to set when the screen is active.
         *
         * @attribute title
         * @type {String}
         */
        title: {
            validator: Lang.isString
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
