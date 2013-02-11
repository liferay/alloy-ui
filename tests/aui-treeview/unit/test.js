AUI(
	{
		combine: false,
		debug: true,
		filter: 'RAW'
	}
).use('aui-tree-view', 'test', 'console', 'console-filters', function(A) {
	var AArray = A.Array;

	var tree;

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

	var testPaginatorVisible = new A.Test.Case(
		{
			name: 'Test if Tree paginator is still visible if alwaysVisible is false and there aren\'t any children',

			testPaginatorVisible: function() {
				var paginatorNode = A.one('#tree').one('.aui-tree-node-paginator');

				A.Assert.isNull(paginatorNode, 'TreeView shouldn\'t have paginator, but it does');
			},

			testPaginatorNotVisible: function() {
				var children = [
					{
						type: 'io',
						label: 'CachedTreeNodeIO1',
						cache: true,
						io: 'assets/content.php'
					},
					{
						type: 'io',
						label: 'CachedTreeNodeIO2',
						cache: true,
						io: 'assets/content.php'
					},
					{
						type: 'io',
						label: 'CachedTreeNodeIO3',
						cache: true,
						io: 'assets/content.php'
					},
					{
						type: 'io',
						label: 'CachedTreeNodeIO4',
						cache: true,
						io: 'assets/content.php'
					}
				];

				tree.set('children', children);

				var paginatorNode = A.one('#tree').one('.aui-tree-view-content > .aui-tree-node-paginator');

				A.Assert.isNotNull(paginatorNode, 'TreeView should have paginator, but it doesn\'t');
			}
		}
	);

	A.Test.Runner.on(
		'testcasebegin',
		function() {
			if (tree) {
				tree.destroy();
			}

			tree = new A.TreeViewDD({
				paginator: {
					alwaysVisible: false,
					offsetParam: 'start',
					limit: 3,
					total: 1000
				},
				io: {
					cache: false,
					url: 'assets/content.php'
				},
				selectOnToggle: false,
				type: 'file',
				width: 200,
				height: 400,
				boundingBox: '#tree',
				children: []
			}).render();
		}
	);

	A.Test.Runner.on(
		'complete',
		function(resultsContainer) {
			var results = resultsContainer.results;
			
			var resultsNode = A.one('#results');

			resultsNode.setContent(
				[
					'AUI TreeView - tests completed.<br>',
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

	var suite = new A.Test.Suite('AUI TreeView tests');
	
	suite.add(testPaginatorVisible);

	A.Test.Runner.add(suite);

	A.Test.Runner.run();
});