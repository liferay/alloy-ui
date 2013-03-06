var HashSet = A.Base.create('set', A.Base, [],
    {
        _map: null,

        initializer: function() {
            var instance = this;

            instance._map = new A.Map();
            instance.publish({
                add: { defaultFn: instance._defAddFn },
                clear: { defaultFn: instance._defClearFn },
                remove: { defaultFn: instance._defRemoveFn }
            });
        },

        add: function(value) {
            this.fire('add', { value: value });
        },

        clear: function() {
            this.fire('clear');
        },

        has: function(value, opt_hash) {
            return this._map.has(value, opt_hash);
        },

        isEmpty: function() {
            return this._map.isEmpty();
        },

        remove: function(value) {
            this.fire('remove', { value: value });
        },

        size: function() {
            return this._map.size();
        },

        values: function() {
            return this._map.keys();
        },

        _defAddFn: function(event) {
            this._map.put(event.value, HashSet.PRESENT, event.hash);
        },

        _defClearFn: function() {
            var instance = this;

            A.Array.each(instance.values(), function(value) {
                instance.remove(value);
            });
        },

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