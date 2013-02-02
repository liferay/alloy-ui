YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-search');

    var words = [
        'assign',
        'attempt',
        'break',
        'case',
        'compress',
        'default',
        'else',
        'elseif',
        'escape',
        'fallback',
        'flush',
        'ftl',
        'function',
        'global',
        'if',
        'import',
        'include',
        'list',
        'local',
        'lt',
        'macro',
        'nested',
        'noescape',
        'nt',
        'recover',
        'recurse',
        'returne',
        'return',
        'rt',
        'setting',
        'stop',
        'switch',
        't',
        'visit',
        'visita'
    ];

    var checkArrays = function(array1, array2){
        var result = false;

        if (array1.length === array2.length) {
            result = array1.slice().sort().join('') === array2.slice().sort().join('');
        }

        return result;
    };

    var tstree = new Y.TernarySearchTree();

    suite.add(new Y.Test.Case({
        name: 'test if tst contains everything we\'ve added to it',

        testContains: function() {
            Y.Array.each(
                words,
                function(item, index) {
                    Y.Assert.isTrue(tstree.contains(item), 'tst does not contain this word: ' + item);
                }
            );
        },

        testDoesNotContain: function() {
            var word = 'NON_EXISTING_WORD';

            Y.Assert.isFalse(tstree.contains(word), 'tst does contain this word: ' + word + ' but it shouldn\'t');
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test tst prefixes',

        assertPrefixEquals: function(prefix, expected) {
            var instance = this;

            var words = tstree.prefixSearch(prefix);

            return checkArrays(expected, words);
        },

        testPrefixSearch: function() {
            var instance = this;

            var prefix = 'el';

            var result = instance.assertPrefixEquals(
                prefix,
                [
                    'else',
                    'elseif'
                ]
            );

            Y.Assert.isTrue(result, 'prefix search on: ' + prefix + ' failed');

            prefix = 're';

            result = instance.assertPrefixEquals(
                prefix,
                [
                    'recover',
                    'recurse',
                    'returne',
                    'return'
                ]
            );

            Y.Assert.isTrue(result, 'prefix search on: ' + prefix + ' failed');
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test pattern search in tst',

        assertPatternMatch: function(prefix, expected) {
            var instance = this;

            var words = tstree.patternMatch(prefix);

            return checkArrays(expected, words);
        },

        testPatternMatch: function() {
            var instance = this;

            var pattern = 're?ur?e';

            var result = instance.assertPatternMatch(
                pattern,
                [
                    'recurse',
                    'returne'
                ]
            );

            Y.Assert.isTrue(result, 'pattern match on: ' + pattern + ' failed');

            pattern = 'visit?';

            result = instance.assertPatternMatch(
                pattern,
                [
                    'visit',
                    'visita'
                ]
            );

            Y.Assert.isFalse(result, 'pattern match on: ' + pattern + ' failed');

            pattern = 'visit?';

            result = instance.assertPatternMatch(
                pattern,
                [
                    'visita'
                ]
            );

            Y.Assert.isTrue(result, 'pattern match on: ' + pattern + ' failed');
        }
    }));

    Y.Test.Runner.on(
        'testcasebegin',
        function() {
            var tmp = words.slice();

            do {
                var index = Math.floor(Math.random() * (length + 1));

                tstree.add(tmp[index]);

                tmp.splice(index, 1);
            }
            while(tmp.length);
        }
    );

    Y.Test.Runner.add(suite);

},'', { requires: [ 'test', 'aui-search' ] });
