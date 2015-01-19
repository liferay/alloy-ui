YUI.add('aui-live-search-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-live-search-deprecated');

    suite.add(new Y.Test.Case({
        name: 'Live Search',

        'search() should update UI results': function() {
            var liveSearch,
                nodes = Y.all('#myList > li'),
                visibleItems = [];

            liveSearch = new Y.LiveSearch(
                {
                    input: '#myInput',
                    nodes: '#myList > li'
                }
            );
            liveSearch.search('bar');

            for (var i = 0; i < nodes.size(); i++) {
                if (nodes.item(i).getStyle('display') !== 'none') {
                    visibleItems.push(nodes.item(i));
                }
            }
            Y.Assert.areSame(1, visibleItems.length);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-live-search-deprecated', 'test']
});
