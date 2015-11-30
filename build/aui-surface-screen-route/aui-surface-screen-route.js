YUI.add('aui-surface-screen-route', function (A, NAME) {

A.ScreenRoute = A.Base.create('screenRoute', A.Base, [], {
    /**
     * Matches if the `ScreenRouter` can handle the tested `value` path, if not
     * returns null.
     *
     * @method matchesPath
     * @param {String} value Path to test and may contains the querystring part.
     * @return {Boolean} Returns true if matches.
     */
    matchesPath: function(value) {
        var path = this.get('path');

        if (A.Lang.isString(path)) {
            return value === path;
        }
        if (A.Lang.isFunction(path)) {
            return path(value);
        }
        if (A.instanceOf(path, RegExp)) {
            return value.search(path) > -1;
        }
        return null;
    },

    /**
     * Validates the value of path attribute. A value will be accepted as valid
     * if it is `String`, `RegExp` or `Function`.
     *
     * @method _validatePath
     * @param  {String|RegExp|Function} value The provided value to be
     * validated.
     * @protected
     */
    _validatePath: function(value) {
        return A.Lang.isString(value) || A.Lang.isFunction(value) || A.instanceOf(value, RegExp);
    },

    /**
     * Validates the value of screen attribute. A value will be accepted as
     * valid if it is component like `A.Screen` or class which extends
     * `A.Screen`, for example `A.HTMLScreen`.
     *
     * @method _validateScreen
     * @param {Function} value The provided value to be validated.
     * @protected
     */
    _validateScreen: function(value) {
        return A.Lang.isFunction(value);
    }
}, {
    ATTRS: {
        /**
         * Defines the path which will trigger the rendering of the screen,
         * specified in `screen` attribute. Could be `String`, `RegExp` or
         * `Function`. In case of `Function`, it will receive the URL as
         * parameter and it should return true if this URL could be handled by
         * the screen.
         *
         * @attribute path
         * @type {String|RegExp|Function}
         */
        path: {
            validator: '_validatePath'
        },

        /**
         * Defines the screen which will be rendered once a URL in the
         * application matches the path, specified in `path` attribute. Could be
         * `A.Screen` or its extension, like `A.HTMLScreen`.
         *
         * @attribute screen
         * @type {A.Screen}
         */
        screen: {
            validator: '_validateScreen'
        }
    }
});


}, '3.0.1', {"requires": ["base-build"]});
