var HashSet = A.Base.create('hashset', A.Base, [],
    {
        _map: null,

        initializer: function() {
            var instance = this;

            instance._map = new A.HashMap();
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

        contains: function(value) {
            return this._map.containsKey(value);
        },

        isEmpty: function() {
            return this._map.size() === 0;
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
            this._map.put(event.value, HashSet.PRESENT);
        },

        _defClearFn: function() {
            this._map.clear();
        },

        _defRemoveFn: function(event) {
            var instance = this,
                map = instance._map,
                value = map.remove(event.value);

            event.removed = (value === HashSet.PRESENT);
        }
    },
    {
        PRESENT: {}
    }
);

A.HashSet = HashSet;