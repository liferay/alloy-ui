YUI.add('aui-set', function (A, NAME) {

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
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var HashSet = A.Base.create('set', A.Base, [], {
    _map: null,

    /**
     * Construction logic executed during `A.HashSet` instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance._map = new A.Map();
        instance.publish({
            add: {
                defaultFn: instance._defAddFn
            },
            clear: {
                defaultFn: instance._defClearFn
            },
            remove: {
                defaultFn: instance._defRemoveFn
            }
        });
    },

    /**
     * Fires the `add` custom event.
     *
     * @method add
     * @param value
     */
    add: function(value) {
        this.fire('add', {
            value: value
        });
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
     * Checks if this set has the specified key.
     *
     * @method has
     * @param value
     * @param opt_hash
     * @return {Boolean}
     */
    has: function(value, opt_hash) {
        return this._map.has(value, opt_hash);
    },

    /**
     * Returns `true` if this set contains no elements.
     *
     * @method isEmpty
     */
    isEmpty: function() {
        return this._map.isEmpty();
    },

    /**
     * Fires the `remove` custom event with an argument.
     *
     * @method remove
     * @param value
     */
    remove: function(value) {
        this.fire('remove', {
            value: value
        });
    },

    /**
     * Get the size of the map.
     *
     * @method size
     */
    size: function() {
        return this._map.size();
    },

    /**
     * Get the keys of the map.
     *
     * @method values
     */
    values: function() {
        return this._map.keys();
    },

    /**
     * Implements the `add` custom event behavior. Adds the specified element to
     * this set.
     *
     * @method _defAddFn
     * @param event
     * @protected
     */
    _defAddFn: function(event) {
        this._map.put(event.value, HashSet.PRESENT, event.hash);
    },

    /**
     * Implements the `clear` custom event behavior. Removes all of the elements
     * from this set.
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
     * Implements the `remove` custom event behavior. Removes the specified
     * element from this set if it is present.
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
}, {
    PRESENT: {}
});

A.Set = HashSet;


}, '3.0.1', {"requires": ["aui-map"]});
