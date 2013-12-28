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

        /**
         * @tests AUI-1106
         */
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

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-pagination', 'node-event-simulate']
});
