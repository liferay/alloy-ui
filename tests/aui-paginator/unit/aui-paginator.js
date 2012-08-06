AUI(
	{
		combine: false,
		debug: true,
		filter: 'RAW'
	}
).use('aui-paginator', 'test', 'console', 'console-filters', 'dd-plugin', 'node-event-simulate', function(A) {
	var console = new A.Console(
		{
			verbose : false,
			printTimeout: 0,
			newestOnTop : false,
			entryTemplate: '<pre class="{entry_class} {cat_class} {src_class}">'+
					'<span class="{entry_cat_class}">{label}</span>'+
					'<span class="{entry_content_class}">{message}</span>'+
			'</pre>'
		}
	).plug(A.Plugin.ConsoleFilters).plug(
		A.Plugin.Drag,
		{
			handles: ['.yui3-console-hd']
		}
	).render();

	var paginator = new A.Paginator(
		{
			circular: true,
			containers: '.paginator',
			maxPageLinks: 10,
			on: {
				changeRequest: function(event) {
					var instance = this;

					var newState = event.state;
					var page = newState.page;

					if (newState.before) {
						var lastPage = newState.before.page;

						A.one('.content .page' + lastPage).setStyle('display', 'none');
					}

					A.one('.content .page' + page).setStyle('display', 'block');

					instance.setState(newState);
				}
			},
			page: 3,
			rowsPerPage: 1,
			rowsPerPageOptions: [1, 3, 5, 7, 20],
			total: 10
		}
	);

	var testBuildFromMarkup = new A.Test.Case(
		{
			name: 'Test Paginator, build from markup',

			testContainersCount: function() {
				var containers = paginator.get('containers');

				A.Assert.areSame(2, containers.size(), 'Paginator must be rendered in two containers');
			},

			testActivePage: function() {
				var activePage = paginator.get('page');

				var visiblePaginatorNode = A.one('.content :visible');

				A.Assert.areSame(3, activePage, 'Active page must be the third one');
				A.Assert.isTrue(visiblePaginatorNode.hasClass('page3'), 'Active node must be the third one');
			}
		}
	);

	var testUserInteraction = new A.Test.Case(
		{
			name: 'Test user interaction with Paginator',

			testClickFirstLink: function() {
				var instance = this;

				A.one('.aui-paginator-first-link').simulate('click');

				A.Assert.isTrue(A.one('.content :visible').hasClass('page1'), 'Active node must be the first one');
				A.Assert.areSame(1, paginator.get('page'), 'Active page must be the first one');
				A.Assert.areSame(A.one('.aui-paginator-current-page-report').text(), '(1 of 10)', 'There must be 1 of 10 pages');
			},

			testClickPrevLink: function() {
				var instance = this;

				A.one('.aui-paginator-prev-link').simulate('click');

				instance._assertPage10();
			},

			testClickNextLink: function() {
				var nextLinkNode = A.one('.aui-paginator-next-link');

				nextLinkNode.simulate('click');
				nextLinkNode.simulate('click');

				A.Assert.isTrue(A.one('.content :visible').hasClass('page2'), 'Active node must be the second one');
				A.Assert.areSame(2, paginator.get('page'), 'Active page must be the second one');
				A.Assert.areSame(A.one('.aui-paginator-current-page-report').text(), '(2 of 10)', 'The value of the current page must be 2');
			},

			testClickLastLink: function() {
				var instance = this;

				var lastLinkNode = A.one('.aui-paginator-last-link').simulate('click');

				instance._assertPage10();
			},

			testTotal: function() {
				var instance = this;

				paginator.set('total', 100);

				instance._assertPage10();

				A.Assert.areSame(A.one('.aui-paginator-current-page-report').text(), '(10 of 100)', 'There must be 10 of 100 pages');

				paginator.set('total', 10);
			},

			testChangeRowsPerPage: function() {
				var instance = this;

				var rowsPerPageEl = A.one('.aui-paginator-rows-per-page');

				rowsPerPageEl.set('selectedIndex', 2);
				rowsPerPageEl.simulate('change');

				A.Assert.isTrue(A.one('.content :visible').hasClass('page1'), 'Active node must be the first one');
				A.Assert.areSame(1, paginator.get('page'), 'Active page must be the first one');
				A.Assert.areSame(A.one('.aui-paginator-current-page-report').text(), '(1 of 2)', 'There must be 1 of 2 pages');

				rowsPerPageEl.set('selectedIndex', 0);
				rowsPerPageEl.simulate('change');

				A.one('.aui-paginator-first-link').simulate('click');
			},

			_assertPage10: function() {
				A.Assert.isTrue(A.one('.content :visible').hasClass('page10'), 'Active node must be the last one (if circle is enabled)');
				A.Assert.areSame(10, paginator.get('page'), 'Active page must be 10-th one');
				A.Assert.areSame(A.one('.aui-paginator-current-page').text(), '10', 'The value of the last page must be 10');
			}
		}
	);

	A.Test.Runner.on(
		'complete',
		function(resultsContainer) {
			var results = resultsContainer.results;
			
			var resultsNode = A.one('#results');

			resultsNode.setContent(
				[
					'Paginator - tests completed.<br>',
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

	var suite = new A.Test.Suite('Paginator');
    
    suite.add(testBuildFromMarkup);
    suite.add(testUserInteraction);

	A.Test.Runner.add(suite);

	paginator.after('render', A.Test.Runner.run, A.Test.Runner);

	paginator.render();
});