YUI.add('aui-map', function (A, NAME) {

/**
 * The Collection Utility
 *
 * @module aui-collection
 * @submodule aui-map
 */

var Lang = A.Lang,
    AArray = A.Array,
    AObject = A.Object;

/**
 * A base class for HashMap.
 *
 * @class A.HashMap
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var HashMap = A.Base.create('map', A.Base, [], {
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
     * Construction logic executed during `A.HashMap` instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.publish({
            clear: {
                defaultFn: instance._defClearFn
            },
            put: {
                defaultFn: instance._defPutFn
            },
            remove: {
                defaultFn: instance._defRemoveFn
            }
        });

        instance._keys = {};
        instance._values = {};
        instance._objects = [];
    },

    /**
     * Fires the `clear` custom event.
     *
     * @method clear
     */
    clear: function() {
        this.fire('clear');
    },

    /**
     * Returns the value from a key in this map.
     *
     * @method getValue
     * @param key
     * @return {Object}
     */
    getValue: function(key) {
        var instance = this;

        return instance._values[instance._getHash(key)];
    },

    /**
     * Checks if this map has the specified key.
     *
     * @method has
     * @param key
     * @param opt_hash
     * @return {Boolean}
     */
    has: function(key, opt_hash) {
        var instance = this;

        return instance._values.hasOwnProperty(
            opt_hash || instance._getHash(key));
    },

    /**
     * Returns `true` if this map contains a certain value.
     *
     * @method hasValue
     * @param value
     * @return {Boolean}
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
     * Returns a collection of the keys contained in this map.
     *
     * @method keys
     * @return {Object}
     */
    keys: function() {
        return AObject.values(this._keys);
    },

    /**
     * Returns `true` if this map contains no key-value mappings.
     *
     * @method isEmpty
     * @return {Boolean}
     */
    isEmpty: function() {
        return this._size === 0;
    },

    /**
     * Fires the `put` custom event.
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
     * Copies all of the mappings from the specified map to this map.
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
     * Fires the `remove` custom event.
     *
     * @method remove
     * @param key
     * @param opt_hash
     * @return {Object}
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
     * Returns the number of key-value mappings in this map.
     *
     * @method size
     * @return {Number}
     */
    size: function() {
        return this._size;
    },

    /**
     * Returns a collection of the values contained in this map.
     *
     * @method values
     * @return {Object}
     */
    values: function() {
        return AObject.values(this._values);
    },

    /**
     * Implements the `clear` custom event behavior. Removes all of the mappings
     * from this map.
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
     * Implements the `put` custom event behavior. Associates the specified
     * value with the specified key in this map.
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
     * Implements the `remove` custom event behavior. Removes the mapping for a
     * key from this map if it is present.
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
     * Returns a hash in `String` format based in the function argument.
     *
     * @method _getHash
     * @param value
     * @protected
     * @return {String}
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

            value = instance.NUMBER + '_' + value;
        }

        return String(value);
    },

    /**
     * Returns a hash from an `Object`.
     *
     * @method _getHashForObject
     * @param value
     * @protected
     */
    _getHashForObject: function(value) {
        var instance = this,
            valueIndex;

        if (instance._isObjectWithHashCode(value)) {
            return instance.OBJECT + '_' + value.hashCode();
        }
        // When object hash code is missing, falls back to O(N) implementation
        valueIndex = AArray.indexOf(instance._objects, value);

        return instance.OBJECT + '_' +
            ((valueIndex > -1) ? valueIndex :
            instance._objects.push(value) - 1);
    },

    /**
     * Returns `true` if the argument's hash code is a `Function`.
     *
     * @method _isObjectWithHashCode
     * @param value
     * @protected
     * @return {Boolean}
     */
    _isObjectWithHashCode: function(value) {
        if (!Lang.isObject(value)) {
            return false;
        }
        return Lang.isFunction(value.hashCode);
    }
}, {});

A.Map = HashMap;


}, '3.0.1', {"requires": ["base-build"]});
