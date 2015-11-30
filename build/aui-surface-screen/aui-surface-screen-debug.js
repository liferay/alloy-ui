YUI.add('aui-surface-screen', function (A, NAME) {

A.ScreenBase = function() {};

A.ScreenBase.NAME = 'screen';

A.ScreenBase._uniqueIdCounter = A.Lang.now();

A.ScreenBase.prototype = {
    /**
     * Fires when the screen is active. Allows a screen to perform any setup
     * that requires its DOM to be visible. Lifecycle.
     *
     * @method activate
     */
    activate: function() {
        A.log('Screen [' + this + '] activate', 'info');
    },

    /**
     * Gives the Screen a chance to cancel the navigation and stop itself from
     * being deactivated. Can be used, for example, if the screen has unsaved
     * state. Lifecycle.
     *
     * Clean-up should not be preformed here, since the navigation may still be
     * cancelled. Do clean-up in deactivate.
     *
     * @method beforeDeactivate
     * @return {Boolean}
     */
    beforeDeactivate: function() {
        A.log('Screen [' + this + '] beforeDeactivate', 'info');
    },

    /**
     * Allows a screen to perform any setup immediately before the DOM is
     * made visible. Lifecycle.
     *
     * @method flip
     * @return {Promise} This can return a promise, which will pause the
     *     navigation until it is resolved.
     */
    flip: function(surfaces) {
        var instance = this,
            transitions = [];

        A.log('Screen [' + this + '] flip', 'info');
        A.each(surfaces, function(surface) {
            transitions.push(surface.show(instance.get('id')));
        });

        return A.CancellablePromise.all(transitions);
    },

    /**
     * Allows a screen to do any cleanup necessary after it has been
     * deactivated, for example cancelling outstanding XHRs or stopping
     * timers. Lifecycle.
     *
     * @method deactivate
     */
    deactivate: function() {
        A.log('Screen [' + this + '] deactivate', 'info');
    },

    /**
     * Destroy a screen, either after it is deactivated (in the case of a
     * non-cacheable view) or when the App is itself disposed for whatever
     * reason. Lifecycle.
     *
     * @method destructor
     */
    destructor: function() {
        A.log('Screen [' + this + '] destructor', 'info');
    },

    /**
     * Returns the content for the given surface, or null if the surface isn't
     * used by this screen. This will be called when a screen is initially
     * constructed or, if a screen is non-cacheable, when navigated.
     *
     * @method getSurfaceContent
     * @param {String} surfaceId The id of the surface DOM element.
     * @param {String} opt_contents Optional content fetch by
     *     `getSurfacesContent`.
     * @return {String | Node} This can return a string or node representing the
     *     content of the surface.
     */
    getSurfaceContent: function() {
        A.log('Screen [' + this + '] getSurfaceContent', 'info');
    },

    /**
     * Returns all contents for the surfaces. This will pass an `opt_contents`
     * to `getSurfaceContent` with all information you need to fulfill the
     * surfaces. Lifecycle.
     *
     * @method getSurfacesContent
     * @param {String} path The requested path.
     * @return {String | Promise} This can return a string representing the
     *     contents of the surfaces or a promise, which will pause the
     *     navigation until it is resolved. This is useful for loading async
     *     content.
     */
    load: function() {
        A.log('Screen [' + this + '] getSurfacesContent', 'info');
    },

    /**
     * @method toString
     * @return {String}
     */
    toString: function() {
        return this.get('id');
    },

    /**
     * Sets the id attribute.
     *
     * @method _setId
     * @param {String} val The screen id to be set.
     * @return {String} Value of the screen name concatenated with the id.
     */
    _setId: function(val) {
        return this.constructor.NAME + '_' + val;
    },

    /**
     * Value of the id attribute.
     *
     * @method  _valueId
     * @return {String}
     */
    _valueId: function() {
        return String(A.ScreenBase._uniqueIdCounter++);
    }
};

A.ScreenBase.ATTRS = {
    /**
     * The screen id.
     *
     * @attribute id
     * @writeOnce
     * @default Generated using `A.guid()`.
     * @type String
     */
    id: {
        setter: '_setId',
        validator: A.Lang.isString,
        valueFn: '_valueId',
        writeOnce: true
    },

    /**
     * The document.title to set when the screen is active.
     *
     * @attribute title
     * @type {String}
     */
    title: {
        validator: A.Lang.isString
    }
};

A.ScreenCacheable = function() {};

A.ScreenCacheable.prototype = {
    /**
     * Holds the cached data.
     *
     * @property cache
     * @type {Object}
     * @protected
     */
    cache: null,

    /**
     * Adds content to the cache.
     *
     * @method addCache
     * @param {String} surfaceId The id of the surface DOM element.
     * @param {String} content Content to be cached.
     */
    addCache: function(content) {
        if (this.get('cacheable')) {
            this.cache = content;
        }
        else {
            A.log('Screen [' + this + '] is not cacheable', 'info');
        }
    },

    /**
     * Clears the cache.
     *
     * @method clearCache
     */
    clearCache: function() {
        this.cache = null;
    },

    /**
     * Destroys a cacheable screen.
     *
     * @method destructor
     */
    destructor: function() {
        this.clearCache();
    },

    /**
     * If the screen is cacheable returns the cached content for the surfaces.
     *
     * @method getCache
     * @protected
     * @return {Object} Cached content.
     */
    getCache: function() {
        return this.cache;
    },

    /**
     * Sets the cache content.
     *
     * @method _setCacheable
     * @protected
     * @return {Object} Cached content.
     */
    _setCacheable: function(val) {
        if (!val) {
            this.clearCache();
        }
        return val;
    }
};

A.ScreenCacheable.ATTRS = {
    /**
     * If false, the screen will be disposed after being deactivated.
     * If true, the surface content will be left in the DOM with
     * display:none.
     *
     * @attribute cacheable
     * @default false
     * @type Boolean
     */
    cacheable: {
        setter: '_setCacheable',
        validator: A.Lang.isBoolean,
        value: false
    }
};

A.Screen = A.Base.create(A.ScreenBase.NAME, A.Base, [A.ScreenBase, A.ScreenCacheable], {}, {});


}, '3.0.1', {"requires": ["base-build"]});
