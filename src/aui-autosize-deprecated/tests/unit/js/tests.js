YUI.add('aui-autosize-deprecated-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-autosize-deprecated');

    suite.add(new Y.Test.Case({
        name: 'AUI Autosize Unit Tests',

        init: function() {
            this._container = Y.one('#textArea');
        },

        setUp: function() {
            this._container.plug(
                Y.Plugin.Autosize,
                {
                    maxHeight: 200,
                    minHeight: '1em'
                }
            );
        },

        'test text is removed from pre tag when resizing autosize element': function() {
            var autosizeHeightMonitor = Y.one('.autosize-height-monitor');

            Y.Assert.areEqual('&nbsp;\n&nbsp;', autosizeHeightMonitor.html());

            this._container.val('test content');

            this._container.simulate('keydown', {keycode: 13});

            this.wait(function() {
                Y.Assert.areEqual('', autosizeHeightMonitor.html());
            }, 500);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [
        'aui-autosize-deprecated', 'node', 'node-event-simulate', 'test'
    ]
});