YUI.add('aui-pagination-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Pagination Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-pagination');

    var pagination = new Y.Pagination({
        boundingBox: '#pagination',
        circular: false,
        showControls: false,
        total: 10
    }).render();

    suite.add(new Y.Test.Case({

        name: 'Pagination control rendering tests',

        // Tests: AUI-1106
        'assert that pagination controls do not render': function() {
            var instance = this,
                paginationContent,
                paginationItems;

            paginationContent = Y.one('#pagination .pagination-content');
            paginationItems = paginationContent.all('li');

            Y.Test.Assert.isNull(paginationContent.one('.pagination-control'));

            instance._assertItemsCanBeSelectedWhenControlsAreDisabled(paginationItems.item(1));

            instance._assertItemsCanBeSelectedWhenControlsAreDisabled(paginationItems.item(0));
        },

        _assertItemsCanBeSelectedWhenControlsAreDisabled: function(item) {
            item.simulate('click');

            Y.Test.Assert.isTrue(item.hasClass('active'));
        }
    }));

    //--------------------------------------------------------------------------
    // Test Case for Testing Pagination Links States
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Pagination link state tests',

        // Tests: AUI-1274
        'Assert that Pagination State and Pagination UI are in Sync': function() {
            var paginationItems = Y.one('#pagination .pagination-content').all('li'),
                state = {
                    page: 5
                },
                pageIndex = (state.page - 1);

            pagination.setState(state);

            paginationItems.each(function(item, index) {
                Y.Test.Assert.isTrue((index === pageIndex) === item.hasClass('active'));
            });
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-pagination', 'node-event-simulate']
});
