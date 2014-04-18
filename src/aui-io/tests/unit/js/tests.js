YUI.add('aui-io-tests', function(Y) {

    //--------------------------------------------------------------------------
    // IO Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-io');

    suite.add(new Y.Test.Case({

        name: 'IO Request Configuration Tests',

        // Tests: AUI-843
        'assert upper and lower case can be used for method attribute': function() {
            var ioRequest1 = Y.io.request (
                '',
                {
                    method: 'GET'
                }
            );

            var ioRequest2 = Y.io.request (
                '',
                {
                    method: 'get'
                }
            );

            Y.Assert.areSame(ioRequest1.get('method'), ioRequest2.get('method'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-io']
});
