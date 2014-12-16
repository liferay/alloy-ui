YUI.add('aui-live-search-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-live-search-deprecated');

    suite.add(new Y.Test.Case({
        name: 'Live Search',

        'search() should update UI results': function() {
            var liveSearch = new Y.LiveSearch(
                {
                    input: '#myInput',
                    nodes: '#myList > li'
                }
            );

            liveSearch.search('bar');

            var visibleItems = Y.all('#myList > li:not([hidden])');

            Y.Assert.areSame(1, visibleItems.size(), 'size() should return 1.');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-live-search-deprecated', 'test']
});
