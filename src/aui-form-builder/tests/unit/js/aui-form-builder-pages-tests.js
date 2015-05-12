YUI.add('aui-form-builder-pages-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-pages');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Pages Tests',

        /**
         * Simulates a `valuechange` event for the given input.
         *
         * @method _simulateInputChange
         * @param {Node} input The input node to simulate the event for.
         * @param {String} text The text that should be set as the input's final value.
         * @param {Function} callback The function to be called when the simulation is
         *   done.
         * @protected
         */
        _simulateInputChange: function(input, text, callback) {
            input.simulate('keydown');
            input.set('value', text);
            input.simulate('keydown');

            this.wait(callback, Y.ValueChange.POLL_INTERVAL);
        },

        'should update quantity': function() {
            var pages,
                title;

            pages = new Y.FormBuilderPages({
                activeIndexPage: 10,
                pageHeader: '#header',
                contentBox: '#pages',
                pagesQuantity: 10
            }).render();

            title = pages.get('pageHeader').one('.form-builder-page-header-title');

            Y.Assert.areEqual('Untitled Page (10 of ' + 10 + ')', title.get('value'));
// console.log(pages.get('activeIndexPage'));
//             pages.set('pagesQuantity', 20);
//             Y.Assert.areEqual('Untitled Page (10 of ' + 20 + ')', title.get('value'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-pages', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
