AUI(
	{
		combine: false,
		debug: true,
		filter: 'RAW'
	}
).use('aui-search-ternary-search-tree', 'test', 'console', 'console-filters', function(A) {
	var AArray = A.Array;

	var console = new A.Console(
		{
			entryTemplate: '<pre class="{entry_class} {cat_class} {src_class}">'+
					'<span class="{entry_cat_class}">{label}</span>'+
					'<span class="{entry_content_class}">{message}</span>'+
			'</pre>',
			newestOnTop : false,
			printTimeout: 0,
			verbose : false
		}
	).plug(A.Plugin.ConsoleFilters).plug(
		A.Plugin.Drag,
		{
			handles: ['.yui3-console-hd']
		}
	).render();

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

	var tstree = new A.TernarySearchTree();

	var testContains = new A.Test.Case(
		{
			name: 'Test if TST contains everything we\'ve added to it',

			testContains: function() {
				AArray.each(
					words,
					function(item, index) {
						A.Assert.isTrue(tstree.contains(item), 'TST does not contain this word: ' + item);
					}
				);
			},

			testDoesNotContain: function() {
				var word = 'NON_EXISTING_WORD';

				A.Assert.isFalse(tstree.contains(word), 'TST does contain this word: ' + word + ' but it shouldn\'t');
			}
		}
	);

	var testPrefixes = new A.Test.Case(
		{
			name: 'Test TST Prefixes',

			assertPrefixEquals: function(prefix, expected, caseInsensitive) {
				var instance = this;

				var words = tstree.prefixSearch(prefix, caseInsensitive);

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

				A.Assert.isTrue(result, 'Prefix Search on: ' + prefix + ' failed');
				

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

				A.Assert.isTrue(result, 'Prefix Search on: ' + prefix + ' failed');
			},

			testPrefixSearchCaseInsensitive: function() {
				var instance = this;

				var prefix = 'EL';

				var result = instance.assertPrefixEquals(
					prefix,
					[
						'else',
						'elseif'
					],
					true
				);

				A.Assert.isTrue(result, 'Prefix Search on: ' + prefix + ' failed');
			}
		}
	);

	var testPatterns = new A.Test.Case(
		{
			name: 'Test pattern search in TST',

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

				A.Assert.isTrue(result, 'Pattern Match on: ' + pattern + ' failed');

				pattern = 'visit?';

				result = instance.assertPatternMatch(
					pattern,
					[
						'visit',
						'visita'
					]
				);

				A.Assert.isFalse(result, 'Pattern Match on: ' + pattern + ' failed');


				pattern = 'visit?';

				result = instance.assertPatternMatch(
					pattern,
					[
						'visita'
					]
				);

				A.Assert.isTrue(result, 'Pattern Match on: ' + pattern + ' failed');
			}
		}
	);

	A.Test.Runner.on(
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

	A.Test.Runner.on(
		'complete',
		function(resultsContainer) {
			var results = resultsContainer.results;
			
			var resultsNode = A.one('#results');

			resultsNode.setContent(
				[
					'Ternary Search Tree - tests completed.<br>',
					'Passed:', results.passed,
					'Failed:', results.failed,
					'Ignored:', results.ignored,
					'Total:', results.total
				].join(' ')
			);

			var color = 'green';

			if (results.failed > 0) {
				color = 'red';
			}

			resultsNode.setStyle('color', color);
		}
	);

	var suite = new A.Test.Suite('Ternary Search Tree');
	
	suite.add(testContains);
	suite.add(testPrefixes);
	suite.add(testPatterns);

	A.Test.Runner.add(suite);

	A.Test.Runner.run();
});