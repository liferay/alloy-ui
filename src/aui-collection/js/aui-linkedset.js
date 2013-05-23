/**
 * The Collection Utility
 *
 * @module aui-collection
 * @submodule aui-linkedset
 */

/**
 * A base class for LinkedSet.
 *
 * @class A.LinkedSet
 * @extends A.Set
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var LinkedSet = A.Base.create('linkedset', A.Set, [],
    {
        _header: null,
        _entries: null,

        /**
         * Construction logic executed during LinkedSet instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance._header  = {};
            instance._entries = {};
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defAddFn
         * @param event
         * @protected
         */
        _defAddFn: function(event) {
            var instance = this,
                value = event.value,
                hash = instance._map._getHash(value),
                header = instance._header,
                entry;

            if (!instance.has(value, hash)) {
                entry = {
                    after: header.after,
                    before: header,
                    value: value
                };

                instance._entries[hash] = entry;

                if (header.after) {
                    header.after.before = entry;
                }

                header.after = entry;
            }

            // The hash was already calculated, pass it to avoid recompute it
            // during remove chain. Good to improve performance on linear cases
            event.hash = hash;

            A.LinkedSet.superclass._defAddFn.apply(this, arguments);
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
                hash = instance._map._getHash(event.value),
                entries = instance._entries,
                entry = entries[hash];

            delete entries[hash];

            if (entry.before) {
                entry.before.after = entry.after;
            }
            if (entry.after) {
                entry.after.before = entry.before;
            }

            // The hash was already calculated, pass it to avoid recompute it
            // during remove chain. Good to improve performance on linear cases
            event.hash = hash;

            A.LinkedSet.superclass._defRemoveFn.apply(this, arguments);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method values
         */
        values: function() {
            var instance = this,
                entry = instance._header.after,
                values = [];

            while (entry) {
                values.unshift(entry.value);
                entry = entry.after;
            }

            return values;
        }
    },
    {}
);

A.LinkedSet = LinkedSet;