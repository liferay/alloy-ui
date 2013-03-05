var Lang = A.Lang,
    AArray = A.Array,
    AObject = A.Object,

    _UNDERLINE = '_',

    HashMap = A.Base.create('map', A.Base, [],
    {
        FALSE: A.guid(),
        NAN: A.guid(),
        NULL: A.guid(),
        NUMBER: A.guid(),
        OBJECT: A.guid(),
        TRUE: A.guid(),
        UNDEFINED: A.guid(),

        _hashToKeyMap: null,
        _hashToValueMap: null,
        _objects: null,
        _size: 0,

        initializer: function() {
            var instance = this;

            instance.publish({
                clear: { defaultFn: instance._defClearFn },
                put: { defaultFn: instance._defPutFn },
                remove: { defaultFn: instance._defRemoveFn }
            });

            instance._hashToKeyMap = {};
            instance._hashToValueMap = {};
            instance._objects = [];
        },

        clear: function() {
            this.fire('clear');
        },

        containsKey: function(key) {
            var instance = this;

            return instance._hashToValueMap.hasOwnProperty(instance._getHash(key));
        },

        containsValue: function(value) {
            var found = false;

            AObject.some(this._hashToValueMap, function(val) {
                found = val === value;
                return found;
            });

            return found;
        },

        getValue: function(key) {
            var instance = this;

            return instance._hashToValueMap[instance._getHash(key)];
        },

        keys: function() {
            return AObject.values(this._hashToKeyMap);
        },

        isEmpty: function() {
            return this._size === 0;
        },

        put: function(key, value) {
            this.fire('put', { key: key, value: value });
        },

        putAll: function(map) {
            var instance = this;

            AObject.each(map, function(value, key) {
                instance.put(key, value);
            });
        },

        remove: function(key) {
            var instance = this,
                oldValue = instance.getValue(key);

            this.fire('remove', { key: key, value: oldValue });

            return oldValue;
        },

        size: function() {
            return this._size;
        },

        values: function() {
            return AObject.values(this._hashToValueMap);
        },

        _defClearFn: function() {
            var instance = this;

            AObject.each(instance._hashToValueMap, function(value, hash) {
                instance.remove(instance._unhash(hash));
            });

            instance._size = 0;
        },

        _defPutFn: function(event) {
            var instance = this,
                hash = instance._getHash(event.key);

            if (!instance.containsKey(event.key)) {
                instance._size++;
            }
            instance._hashToKeyMap[hash] = event.key;
            instance._hashToValueMap[hash] = event.value;
        },

        _defRemoveFn: function(event) {
            var instance = this,
                key = event.key,
                hashToKeyMap = instance._hashToKeyMap,
                hashToValueMap = instance._hashToValueMap,
                hash,
                objects,
                oldValue,
                valueIndex;

            if (instance.containsKey(key)) {
                hash = instance._getHash(key);
                oldValue = hashToValueMap[hash];

                delete hashToValueMap[hash];
                delete hashToKeyMap[hash];

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

        _isObjectWithHashCode: function(value) {
            if (!Lang.isObject(value)) {
                return false;
            }
            return Lang.isFunction(value.hashCode);
        },

        _unhash: function(hash) {
            return this._hashToKeyMap[hash];
        }
    },
    {}
);

A.Map = HashMap;