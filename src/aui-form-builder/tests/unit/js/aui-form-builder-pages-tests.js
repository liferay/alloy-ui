YUI.add('aui-form-builder-pages-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-pages');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Pages Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this._container.append('<div id="header"></div><div id="pages"></div>');
        },

        tearDown: function() {
            this._container.empty();
            this._pages && this._pages.destroy();
        },

        /**
         * Creates a new form builder pages instance with the given config.
         *
         * @method createFormBuilderPages
         * @param {Object} config
         * @return {Y.FormBuilderPages}
         */
        createFormBuilderPages: function(config) {
            this._pages = new Y.FormBuilderPages(config).render();

            return this._pages;
        },

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

            pages = this.createFormBuilderPages({
                activePageNumber: 10,
                pageHeader: '#header',
                contentBox: '#pages',
                pagesQuantity: 10
            });

            title = pages.get('pageHeader').one('.form-builder-page-header-title');

            Y.Assert.areEqual('Untitled Page (10 of ' + 10 + ')', title.get('placeholder'));

            pages.set('pagesQuantity', 20);
            Y.Assert.areEqual('Untitled Page (10 of ' + 20 + ')', title.get('placeholder'));
        },

        'should add a new page on addPage button clicked': function() {
            this.createFormBuilderPages({
                activePageNumber: 1,
                pageHeader: '#header',
                contentBox: '#pages',
                pagesQuantity: 1
            });

            Y.Assert.areEqual(3, Y.one('.pagination-content').all('li').size());

            Y.one('.form-builder-pages-add-page').simulate('click');

            Y.Assert.areEqual(4, Y.one('.pagination-content').all('li').size());
        },

        'should remove the current page on removePage button clicked': function() {
            this.createFormBuilderPages({
                activePageNumber: 2,
                pageHeader: '#header',
                contentBox: '#pages',
                pagesQuantity: 2
            });

            Y.Assert.areEqual(4, Y.one('.pagination-content').all('li').size());

            Y.one('.form-builder-pages-remove-page').simulate('click');

            Y.Assert.areEqual(3, Y.one('.pagination-content').all('li').size());

            Y.one('.form-builder-pages-remove-page').simulate('click');

            Y.Assert.areEqual(3, Y.one('.pagination-content').all('li').size());
        },

        'should update `title` attribute on title input change': function() {
            var pages,
                titleNode;

            pages = this.createFormBuilderPages({
                activePageNumber: 1,
                pageHeader: '#header',
                contentBox: '#pages',
                pagesQuantity: 1
            });

            titleNode = Y.one('.form-builder-page-header-title');

            Y.Assert.areEqual('Untitled Page (1 of 1)', titleNode.get('placeholder'));

            this._simulateInputChange(titleNode, 'title', function() {
                Y.Assert.areEqual('title', pages.get('titles')[0]);
                this._simulateInputChange(titleNode, '', function() {
                    Y.Assert.areEqual('Untitled Page (1 of 1)', titleNode.get('placeholder'));
                });
            });
        },

        'should show the right title on page change': function() {
            var titleNode;

            this.createFormBuilderPages({
                activePageNumber: 1,
                pageHeader: '#header',
                contentBox: '#pages',
                pagesQuantity: 2,
                titles: ['Title', '']
            });

            titleNode = Y.one('.form-builder-page-header-title');

            Y.Assert.areEqual('Title', titleNode.get('value'));

            Y.one('.pagination-control').simulate('click');

            Y.Assert.areEqual('Untitled Page (2 of 2)', titleNode.get('placeholder'));
        },

        'should update `descriptions` attribute on title input change': function() {
            var descriptionNode,
                pages;

            pages = this.createFormBuilderPages({
                activePageNumber: 1,
                pageHeader: '#header',
                contentBox: '#pages',
                pagesQuantity: 1
            });

            descriptionNode = Y.one('.form-builder-page-header-description');

            Y.Assert.areEqual('An aditional info about this page', descriptionNode.get('placeholder'));

            this._simulateInputChange(descriptionNode, 'descriptions', function() {
                Y.Assert.areEqual('descriptions', pages.get('descriptions')[0]);
                this._simulateInputChange(descriptionNode, '', function() {
                    Y.Assert.areEqual('An aditional info about this page', descriptionNode.get('placeholder'));
                });
            });
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-pages', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
