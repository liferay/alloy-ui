/**
 * The Collection Utility
 *
 * @module aui-collection
 * @submodule aui-set
 */

/**
 * A base class for HashSet.
 *
 * @class A.HashSet
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var HashSet = A.Base.create('set', A.Base, [],
    {
        _map: null,

        /**
         * Construction logic executed during HashSet instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance._map = new A.Map();
            instance.publish({
                add: { defaultFn: instance._defAddFn },
                clear: { defaultFn: instance._defClearFn },
                remove: { defaultFn: instance._defRemoveFn }
            });
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method add
         * @param value
         */
        add: function(value) {
            this.fire('add', { value: value });
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method clear
         */
        clear: function() {
            this.fire('clear');
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method has
         * @param value, opt_hash
         */
        has: function(value, opt_hash) {
            return this._map.has(value, opt_hash);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method isEmpty
         */
        isEmpty: function() {
            return this._map.isEmpty();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method remove
         * @param value
         */
        remove: function(value) {
            this.fire('remove', { value: value });
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method size
         */
        size: function() {
            return this._map.size();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method values
         */
        values: function() {
            return this._map.keys();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defAddFn
         * @param event
         * @protected
         */
        _defAddFn: function(event) {
            this._map.put(event.value, HashSet.PRESENT, event.hash);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defClearFn
         * @protected
         */
        _defClearFn: function() {
            var instance = this;

            A.Array.each(instance.values(), function(value) {
                instance.remove(value);
            });
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defRemoveFn
         * @param event
         * @protected
         */
        _defRemoveFn: function(event) {
            var instance = this,
                map = instance._map,
                value = map.remove(event.value, event.hash);

            event.removed = (value === HashSet.PRESENT);
        }
    },
    {
        PRESENT: {}
    }
);

A.Set = HashSet;