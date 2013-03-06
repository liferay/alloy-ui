YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-collection');

    suite.add(new Y.Test.Case({
        name: 'Map',

        //---------------------------------------------
        // Tests
        //---------------------------------------------

        'put/get string key': function() {
            var map = new Y.Map();
            map.put('string', 1);
            map.put('string', 2);
            Y.Assert.areSame(map.getValue('string'), 2);
        },

        'put/get empty string key': function() {
            var map = new Y.Map();
            map.put('', 1);
            map.put('', 2);
            Y.Assert.areSame(map.getValue(''), 2);
        },

        'put/get number key': function() {
            var map = new Y.Map();

            map.put(Infinity, 1);
            map.put(-Infinity, 1);
            map.put(0, 1);
            map.put(31, 1);
            map.put(-31, 1);
            map.put(3.1, 1);
            map.put(-3.1, 1);
            map.put(3.1e-10, 1);
            map.put(3.1e+10, 1);
            map.put(-3.1e-10, 1);
            map.put(-3.1e+10, 1);

            map.put('Infinity', 2);
            map.put('-Infinity', 2);
            map.put('0', 2);
            map.put('31', 2);
            map.put('-31', 2);
            map.put('3.1', 2);
            map.put('-3.1', 2);
            map.put('3.1e-10', 2);
            map.put('3.1e+10', 2);
            map.put('-3.1e-10', 2);
            map.put('-3.1e+10', 2);

            Y.Assert.areSame(map.getValue(Infinity), 1);
            Y.Assert.areSame(map.getValue(-Infinity), 1);
            Y.Assert.areSame(map.getValue(0), 1);
            Y.Assert.areSame(map.getValue(31), 1);
            Y.Assert.areSame(map.getValue(-31), 1);
            Y.Assert.areSame(map.getValue(3.1), 1);
            Y.Assert.areSame(map.getValue(-3.1), 1);
            Y.Assert.areSame(map.getValue(3.1e-10), 1);
            Y.Assert.areSame(map.getValue(3.1e+10), 1);
            Y.Assert.areSame(map.getValue(-3.1e-10), 1);
            Y.Assert.areSame(map.getValue(-3.1e+10), 1);

            Y.Assert.areSame(map.getValue('Infinity'), 2);
            Y.Assert.areSame(map.getValue('-Infinity'), 2);
            Y.Assert.areSame(map.getValue('0'), 2);
            Y.Assert.areSame(map.getValue('31'), 2);
            Y.Assert.areSame(map.getValue('-31'), 2);
            Y.Assert.areSame(map.getValue('3.1'), 2);
            Y.Assert.areSame(map.getValue('-3.1'), 2);
            Y.Assert.areSame(map.getValue('3.1e-10'), 2);
            Y.Assert.areSame(map.getValue('3.1e+10'), 2);
            Y.Assert.areSame(map.getValue('-3.1e-10'), 2);
            Y.Assert.areSame(map.getValue('-3.1e+10'), 2);
        },

        'put/get boolean key': function() {
            var map = new Y.Map();
            map.put(true, 1);
            map.put(false, 1);
            map.put('true', 2);
            map.put('false', 2);
            Y.Assert.areSame(map.getValue(true), 1);
            Y.Assert.areSame(map.getValue(false), 1);
            Y.Assert.areSame(map.getValue('true'), 2);
            Y.Assert.areSame(map.getValue('false'), 2);
        },

        'put/get null key': function() {
            var map = new Y.Map();
            map.put(null, 1);
            map.put('null', 2);
            Y.Assert.areSame(map.getValue(null), 1);
            Y.Assert.areSame(map.getValue('null'), 2);
        },

        'put/get undefined key': function() {
            var map = new Y.Map();
            map.put(undefined, 1);
            map.put('undefined', 2);
            Y.Assert.areSame(map.getValue(undefined), 1);
            Y.Assert.areSame(map.getValue('undefined'), 2);
        },


        'put/get NaN key': function() {
            var map = new Y.Map();
            map.put(NaN, 1);
            map.put('NaN', 2);
            Y.Assert.areSame(map.getValue(NaN), 1);
            Y.Assert.areSame(map.getValue('NaN'), 2);
        },

        'is empty': function() {
            var map = new Y.Map();
            Y.Assert.isTrue(map.isEmpty());
        },

        'put all': function() {
            var map = new Y.Map();
            map.putAll({
                a: 1,
                b: 2
            });
            map.put('c', 3);
            Y.Assert.areSame(map.size(), 3);
            Y.Assert.areSame(map.getValue('a'), 1);
            Y.Assert.areSame(map.getValue('b'), 2);
            Y.Assert.areSame(map.getValue('c'), 3);
        },

        'test keys': function() {
            var map = new Y.Map(),
                keys;
            map.put('a', 1);
            map.put('b', 2);
            keys = map.keys();
            Y.Assert.areSame(keys.length, 2);
            Y.Assert.areSame(keys[0], 'a');
            Y.Assert.areSame(keys[1], 'b');
        },

        'test values': function() {
            var map = new Y.Map(),
                values;
            map.put('a', 1);
            map.put('b', 2);
            values = map.values();
            Y.Assert.areSame(values.length, 2);
            Y.Assert.areSame(values[0], 1);
            Y.Assert.areSame(values[1], 2);
        },

        'test size': function() {
            var map = new Y.Map();
            map.put('key1', 'value');
            map.put('key1', 'value');
            map.put('key2', 'value');
            Y.Assert.areSame(map.size(), 2);
        },

        'test clear': function() {
            var map = new Y.Map();
            map.put('key', 'value');
            map.clear();
            Y.Assert.areSame(map.size(), 0);
            Y.Assert.isTrue(Y.Object.isEmpty(map._values), 'map should be empty after a clear');
        },

        'put/get object reference': function() {
            var map = new Y.Map(),
                reference = {};

            map.put('string', reference);
            Y.Assert.areSame(map.getValue('string'), reference);
            map.put('string', {});
            Y.Assert.areNotSame(map.getValue('string'), reference);
        },

        'put/get object key': function() {
            var map = new Y.Map(),
                arrayKey = [],
                objectKey = {},
                functionKey = function() {};

            map.put(arrayKey, 1);
            map.put(objectKey, 2);
            map.put(functionKey, 3);
            Y.Assert.isTrue(Y.Object.isEmpty(objectKey));
            Y.Assert.areSame(map.getValue(arrayKey), 1);
            Y.Assert.areSame(map.getValue(objectKey), 2);
            Y.Assert.areSame(map.getValue(functionKey), 3);
        },

        'has value': function() {
            var map = new Y.Map();
            map.put('key1', 'value');
            map.put('key2', null);
            Y.Assert.isTrue(map.hasValue('value'));
            Y.Assert.isTrue(map.hasValue(null));
            Y.Assert.isFalse(map.hasValue('bar'));
        },

        'remove value': function() {
            var map = new Y.Map(),
                arrayKey = [],
                objectKey = {};

            map.put(arrayKey, 'value');
            map.put('key1', 'value');
            map.put(objectKey, 'value');
            Y.Assert.areSame(map.remove('key1'), 'value');
            Y.Assert.areSame(map.remove(arrayKey), 'value');
            Y.Assert.areSame(map.remove(objectKey), 'value');
            Y.Assert.isUndefined(map.remove('foo'));
            Y.Assert.isUndefined(map._keys[map._getHash('key1')]);
            Y.Assert.isUndefined(map._keys[map._getHash(arrayKey)]);
            Y.Assert.isUndefined(map._keys[map._getHash(objectKey)]);
        },

        'put/remove/clear events': function() {
            var cleared = false,
                put = false,
                removed = false,
                afterPut = false,
                afterRemove = false,
                afterClear = false,
                map = new Y.Map({
                on: {
                    clear: function(event) {
                        cleared = true;
                    },

                    put: function(event) {
                        put = true;
                        Y.Assert.isTrue(event.hasOwnProperty('key'));
                        Y.Assert.isTrue(event.hasOwnProperty('value'));
                        Y.Assert.areSame(event.key, 'key1');
                        Y.Assert.areSame(event.value, 'value');
                    },

                    remove: function(event) {
                        removed = true;
                        Y.Assert.isTrue(event.hasOwnProperty('key'));
                        Y.Assert.isTrue(event.hasOwnProperty('value'));
                        Y.Assert.areSame(event.key, 'key1');
                        Y.Assert.areSame(event.value, 'value');
                    }
                },
                after: {
                    clear: function(event) {
                        afterClear = true;
                    },

                    put: function(event) {
                        afterPut = true;
                    },

                    remove: function(event) {
                        afterRemove = true;
                    }
                }
            });

            map.put('key1', 'value');
            map.clear();

            Y.Assert.isTrue(cleared);
            Y.Assert.isTrue(put);
            Y.Assert.isTrue(removed);
            Y.Assert.isTrue(afterClear);
            Y.Assert.isTrue(afterPut);
            Y.Assert.isTrue(afterRemove);
        },

        'put/remove/clear halt events': function() {
            var cleared = false,
                afterPut = false,
                afterRemove = false,
                afterClear = false,
                map = new Y.Map({
                on: {
                    clear: function(event) {
                        cleared = true;

                        event.halt();
                    },

                    put: function(event) {
                        Y.Assert.isTrue(event.hasOwnProperty('key'));
                        Y.Assert.isTrue(event.hasOwnProperty('value'));
                        Y.Assert.areSame(event.key, 'key1');
                        Y.Assert.areSame(event.value, 'value');

                        event.halt();
                    },

                    remove: function(event) {
                        Y.Assert.isTrue(event.hasOwnProperty('key'));
                        Y.Assert.isTrue(event.hasOwnProperty('value'));
                        Y.Assert.areSame(event.key, 'key1');
                        Y.Assert.areSame(event.value, 'value');

                        event.halt();
                    }
                },
                after: {
                    clear: function(event) {
                        afterClear = true;
                    },

                    put: function(event) {
                        afterPut = true;
                    },

                    remove: function(event) {
                        afterRemove = true;
                    }
                }
            });

            map.put('key1', 'value');
            map.clear();

            Y.Assert.isTrue(cleared);
            Y.Assert.isFalse(afterClear);
            Y.Assert.isFalse(afterPut);
            Y.Assert.isFalse(afterRemove);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Set',

        //---------------------------------------------
        // Tests
        //---------------------------------------------

        'test add': function() {
            var set = new Y.Set(),
                reference = {};

            set.add('string1');
            set.add('string1');
            Y.Assert.areSame(set.size(), 1);
            Y.Assert.areSame(set.values()[0], 'string1');

            set.clear();
            set.add(1);
            set.add(1);
            Y.Assert.areSame(set.size(), 1);
            Y.Assert.areSame(set.values()[0], 1);

            set.clear();
            set.add(null);
            set.add(null);
            Y.Assert.areSame(set.size(), 1);
            Y.Assert.areSame(set.values()[0], null);

            set.clear();
            set.add(NaN);
            set.add(NaN);
            Y.Assert.areSame(set.size(), 1);
            Y.Assert.isNaN(set.values()[0]);

            set.clear();
            set.add(reference);
            set.add(reference);
            Y.Assert.areSame(set.size(), 1);
            Y.Assert.areSame(set.values()[0], reference);
        },

        'test size': function() {
            var set = new Y.Set();
            set.add('string1');
            set.add('string1');
            set.add('string2');
            set.add('string2');
            Y.Assert.areSame(set.size(), 2);
        },

        'test clear': function() {
            var set = new Y.Set();
            set.add('string');
            set.clear();
            Y.Assert.areSame(set.size(), 0);
        },

        'has value': function() {
            var set = new Y.Set();
            set.add('string1');
            set.add('string2');
            Y.Assert.isTrue(set.has('string1'));
            Y.Assert.isTrue(set.has('string2'));
            Y.Assert.isFalse(set.has('string3'));
        },

        'is empty': function() {
            var set = new Y.Set();
            Y.Assert.isTrue(set.isEmpty());
        },

        'remove value': function() {
            var set = new Y.Set();
            set.add('string1');
            set.add('string2');
            set.remove('string1');
            Y.Assert.areSame(set.values()[0], 'string2');
            Y.Assert.areSame(set.size(), 1);
        },

        'add/remove/clear events': function() {
            var added,
                cleared,
                removed,
                afterAdd,
                afterRemove,
                afterClear,
                set = new Y.Set({
                    on: {
                        add: function(event) {
                            added = true;
                        },
                        clear: function(event) {
                            cleared = true;
                        },
                        remove: function(event) {
                            removed = true;
                        }
                    },
                    after: {
                        add: function(event) {
                            afterAdd = true;
                        },
                        clear: function(event) {
                            afterClear = true;
                        },
                        remove: function(event) {
                            afterRemove = true;
                        }
                    }
                });
            set.add(1);
            set.remove(1);
            set.clear(1);
            Y.Assert.isTrue(added);
            Y.Assert.isTrue(cleared);
            Y.Assert.isTrue(removed);
            Y.Assert.isTrue(afterAdd);
            Y.Assert.isTrue(afterClear);
            Y.Assert.isTrue(afterRemove);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'LinkedSet',

        //---------------------------------------------
        // Tests
        //---------------------------------------------

        'test add': function() {
            var linkedSet = new Y.LinkedSet();

            linkedSet.add('foo');
            Y.Assert.areSame(linkedSet.values()[0], 'foo');
            linkedSet.add('bar');
            Y.Assert.areSame(linkedSet.values()[1], 'bar');
        },

        'test remove': function() {
            var linkedSet = new Y.LinkedSet(),
                reference = {};

            linkedSet.add('foo');
            linkedSet.add('foo');
            linkedSet.add('bar');
            linkedSet.add('bar');
            linkedSet.add('baz');
            linkedSet.add('baz');
            linkedSet.add(reference);
            linkedSet.add(reference);

            linkedSet.remove('foo');
            Y.Assert.areSame(linkedSet.values().length, 3);
            linkedSet.remove('bar');
            Y.Assert.areSame(linkedSet.values().length, 2);
            linkedSet.remove('baz');
            Y.Assert.areSame(linkedSet.values().length, 1);
            linkedSet.remove(reference);
            Y.Assert.areSame(linkedSet.values().length, 0);
        },

        'test size': function() {
            var linkedSet = new Y.LinkedSet();
            linkedSet.add('foo');
            linkedSet.add('bar');
            Y.Assert.areSame(linkedSet.size(), 2);
        },

        'test clear': function() {
            var linkedSet = new Y.LinkedSet();

            linkedSet.add('foo');
            linkedSet.add('bar');
            linkedSet.clear();
            Y.Assert.isTrue(linkedSet.isEmpty());
            Y.Assert.isTrue(Y.Object.isEmpty(linkedSet._entries), 'Internal entries linked list should be empty after removing all elements');
        },

        'test isEmpty': function() {
            var linkedSet = new Y.LinkedSet();

            linkedSet.add('foo');
            linkedSet.add('bar');
            linkedSet.remove('foo');
            linkedSet.remove('bar');
            Y.Assert.isTrue(linkedSet.isEmpty());
            Y.Assert.isTrue(Y.Object.isEmpty(linkedSet._entries), 'Internal entries linked list should be empty after removing all elements');
        }
    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'test', 'aui-collection' ] });