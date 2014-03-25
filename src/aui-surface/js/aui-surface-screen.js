A.ScreenBase = function() {};

A.ScreenBase.NAME = 'screen';

A.ScreenBase._uniqueIdCounter = Date.now();

A.ScreenBase.prototype = {
    /**
     * Allows a screen to perform any setup that requires its DOM to be
     * visible.
     *
     * @method afterFlip
     */
    afterFlip: function() {
        A.log('Screen [' + this + '] afterFlip', 'info');
    },

    /**
     * Gives the Screen a chance to cancel the navigation and stop itself from
     * being deactivated. Can be used, for example, if the screen has unsaved
     * state.
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
     * made visible.
     *
     * @method beforeFlip
     * @return {Promise} This can return a promise, which will pause the
     *     navigation until it is resolved.
     */
    beforeFlip: function() {
        A.log('Screen [' + this + '] beforeFlip', 'info');
    },

    /**
     * Allows a screen to do any cleanup necessary after it has been
     * deactivated, for example cancelling outstanding XHRs or stopping
     * timers.
     *
     * @method deactivate
     */
    deactivate: function() {
        A.log('Screen [' + this + '] deactivate', 'info');
    },

    /**
     * Destroy a screen, either after it is deactivated (in the case of a
     * non-cacheable view) or when the App is itself disposed for whatever
     * reason.
     *
     * @method destroy
     */
    destroy: function() {
        A.log('Screen [' + this + '] destroy', 'info');
    },

    /**
     * Returns the content for the given surface, or null if the surface isn't
     * used by this screen. This will be called when a screen is initially
     * constructed or, if a screen is non-cacheable, when navigated.
     *
     * @method getSurfaceContent
     * @param {String} surfaceId The id of the surface DOM element.
     * @param {Object} req The request object.
     * @return {String | Promise} This can return a string representing the
     *     content of the surface or a promise, which will pause the navigation
     *     until it is resolved. This is useful for loading async content.
     */
    getSurfaceContent: function() {
        A.log('Screen [' + this + '] getSurfaceContent', 'info');
    },

    /**
     * Returns all contents for the surfaces. This will pass an `opt_contents`
     * to `getSurfaceContent` with all information you need to fulfill the
     * surfaces.
     *
     * @method getSurfacesContent
     * @param {Array} surfaces Array with surface ids.
     * @param {Object} req The request object.
     * @return {String | Promise} This can return a string representing the
     *     contents of the surfaces or a promise, which will pause the navigation
     *     until it is resolved. This is useful for loading async content.
     */
    getSurfacesContent: function() {
        A.log('Screen [' + this + '] getSurfacesContent', 'info');
    },

    /**
     * Handles getSurfaceContent call for the given surface. This is useful for
     * class extensions add extra logic such as cache.
     *
     * @method handleSurfaceContent
     * @protected
     * @param {String} surfaceId The id of the surface DOM element.
     * @param {Object} req The request object.
     * @return {String | Promise} This can return a string representing the
     * content of the surface or a promise, which will pause the navigation
     * until it is resolved. This is useful for loading async content.
     */
    handleSurfaceContent: function(surfaceId, req, opt_contents) {
        return this.getSurfaceContent(surfaceId, req, opt_contents);
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
     * Holds the cache information.
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
    addCache: function(surfaceId, content) {
        this.cache = this.cache || {};
        this.cache[surfaceId] = content;
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
     * If the screen is cacheable returns the cached content for the given
     * surface.
     *
     * @method handleSurfaceContent
     * @protected
     * @param {String} surfaceId The id of the surface DOM element.
     * @param {Object} req The request object.
     * @return {String | Promise} This can return a string representing the
     *     content of the surface or a promise, which will pause the navigation
     *     until it is resolved. This is useful for loading async content.
     */
    handleSurfaceContent: function(surfaceId, req, opt_contents) {
        if (this.cache && A.Lang.isString(this.cache[surfaceId]) && this.get('cacheable')) {
            A.log('Surface [' + surfaceId + '] content from cache', 'info');
            return this.cache[surfaceId];
        }

        return this.getSurfaceContent(surfaceId, req, opt_contents);
    },

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
