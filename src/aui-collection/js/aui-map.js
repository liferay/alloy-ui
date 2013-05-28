/**
 * The Collection Utility
 *
 * @module aui-collection
 * @submodule aui-map
 */

var Lang = A.Lang,
    AArray = A.Array,
    AObject = A.Object,

    _UNDERLINE = '_';

/**
 * A base class for HashMap.
 *
 * @class A.HashMap
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var HashMap = A.Base.create('map', A.Base, [],
    {
        FALSE: A.guid(),
        NAN: A.guid(),
        NULL: A.guid(),
        NUMBER: A.guid(),
        OBJECT: A.guid(),
        TRUE: A.guid(),
        UNDEFINED: A.guid(),

        _keys: null,
        _objects: null,
        _size: 0,
        _values: null,

        /**
         * Construction logic executed during HashMap instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.publish({
                clear: { defaultFn: instance._defClearFn },
                put: { defaultFn: instance._defPutFn },
                remove: { defaultFn: instance._defRemoveFn }
            });

            instance._keys = {};
            instance._values = {};
            instance._objects = [];
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
         * @method getValue
         * @param key
         */
        getValue: function(key) {
            var instance = this;

            return instance._values[instance._getHash(key)];
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method has
         * @param key
         * @param opt_hash
         */
        has: function(key, opt_hash) {
            var instance = this;

            return instance._values.hasOwnProperty(
                    opt_hash || instance._getHash(key));
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method hasValue
         * @param value
         */
        hasValue: function(value) {
            var found = false;

            AObject.some(this._values, function(val) {
                found = val === value;
                return found;
            });

            return found;
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method keys
         */
        keys: function() {
            return AObject.values(this._keys);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method isEmpty
         */
        isEmpty: function() {
            return this._size === 0;
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method put
         * @param key
         * @param value
         * @param opt_hash
         */
        put: function(key, value, opt_hash) {
            this.fire('put', {
                key: key,
                value: value,
                hash: opt_hash
            });
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method putAll
         * @param map
         */
        putAll: function(map) {
            var instance = this;

            AObject.each(map, function(value, key) {
                instance.put(key, value);
            });
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method remove
         * @param key
         * @param opt_hash
         */
        remove: function(key, opt_hash) {
            var instance = this,
                oldValue = instance.getValue(key);

            instance.fire('remove', {
                key: key,
                value: oldValue,
                hash: opt_hash
            });

            return oldValue;
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method size
         */
        size: function() {
            return this._size;
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method values
         */
        values: function() {
            return AObject.values(this._values);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defClearFn
         * @protected
         */
        _defClearFn: function() {
            var instance = this;

            AArray.each(instance.keys(), function(key) {
                instance.remove(key);
            });

            instance._size = 0;
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defPutFn
         * @param event
         * @protected
         */
        _defPutFn: function(event) {
            var instance = this,
                hash = event.hash;

            if (Lang.isUndefined(hash)) {
                hash = instance._getHash(event.key);
            }

            if (!instance.has(event.key)) {
                instance._size++;
            }
            instance._keys[hash] = event.key;
            instance._values[hash] = event.value;
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
                key = event.key,
                keys = instance._keys,
                values = instance._values,
                hash = event.hash,
                objects,
                oldValue,
                valueIndex;


            if (instance.has(key)) {
                if (Lang.isUndefined(hash)) {
                    hash = instance._getHash(key);
                }

                oldValue = values[hash];

                delete values[hash];
                delete keys[hash];

                if (!instance._isObjectWithHashCode(oldValue)) {
                    objects = instance._objects;
                    valueIndex = AArray.indexOf(objects, key);
                    if (valueIndex > -1) {
                        objects[valueIndex] = null;
                    }
                }

                instance._size--;
            }
            event.value = oldValue;
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _getHash
         * @param value
         * @protected
         */
        _getHash: function(value) {
            var instance = this;

            // A reliable way for ECMAScript code to test if a value X is a NaN
            // is an expression of the form X !== X. The result will be true if
            // and only if X is a NaN.
            if (value !== value) {
                value = instance.NAN;
            }
            else if (value === false) {
                value = instance.FALSE;
            }
            else if (value === null) {
                value = instance.NULL;
            }
            else if (value === true) {
                value = instance.TRUE;
            }
            else if (value === undefined) {
                value = instance.UNDEFINED;
            }
            else if (Lang.isObject(value)) {
                value = instance._getHashForObject(value);
            }
            else if (Lang.isNumber(value) ||
                     value === Number.POSITIVE_INFINITY ||
                     value === Number.NEGATIVE_INFINITY) {

                value = instance.NUMBER + _UNDERLINE + value;
            }

            return String(value);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _getHashForObject
         * @param value
         * @protected
         */
        _getHashForObject: function(value) {
            var instance = this,
                valueIndex;

            if (instance._isObjectWithHashCode(value)) {
                return value.hashCode();
            }
            // When object hash code is missing, falls back to O(N) implementation
            valueIndex = AArray.indexOf(instance._objects, value);

            return instance.OBJECT + _UNDERLINE +
                    ((valueIndex > -1) ? valueIndex :
                        instance._objects.push(value) - 1);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _isObjectWithHashCode
         * @param value
         * @protected
         */
        _isObjectWithHashCode: function(value) {
            if (!Lang.isObject(value)) {
                return false;
            }
            return Lang.isFunction(value.hashCode);
        }
    },
    {}
);

A.Map = HashMap;