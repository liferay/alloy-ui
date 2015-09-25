YUI.add('aui-form-builder-page-manager-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-page-manager');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Pages Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this._container.append('<div id="header"></div><div id="tabs"></div>' +
                '<div id="pages"></div>');
        },

        tearDown: function() {
            this._container.empty();
            this._pages && this._pages.destroy();
        },

        /**
         * Creates a new form builder pages instance with the given config.
         *
         * @method createFormBuilderPageManager
         * @param {Object} config
         * @return {Y.FormBuilderPageManager}
         */
        createFormBuilderPageManager: function(config) {
            this._pages = new Y.FormBuilderPageManager(config);

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

            pages = this.createFormBuilderPageManager({
                activePageNumber: 10,
                pageHeader: '#header',
                pagesQuantity: 10,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            title = pages.get('pageHeader').one('.form-builder-page-header-title');

            Y.Assert.areEqual('Untitled page (10 of ' + 10 + ')', title.get('placeholder'));

            pages.set('pagesQuantity', 20);
            Y.Assert.areEqual('Untitled page (10 of ' + 20 + ')', title.get('placeholder'));
        },

        'should add a new page on addPage button clicked': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });
 
            Y.Assert.areEqual(3, Y.one('.pagination-content').all('li').size());

            Y.one('.form-builder-page-manager-add-last-position').simulate('click');

            Y.Assert.areEqual(4, Y.one('.pagination-content').all('li').size());
        },

        'should show the popover with a list of options': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });
  
            Y.Assert.isTrue(Y.one('.form-builder-page-manager-popover').hasClass('popover-hidden'));

            Y.one('.form-builder-switch-view').simulate('click');

            Y.Assert.isFalse(Y.one('.form-builder-page-manager-popover').hasClass('popover-hidden'));
        },

        'should remove the current page on removePage button clicked': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 2,
                pageHeader: '#header',
                pagesQuantity: 2,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            Y.Assert.areEqual(4, Y.one('.pagination-content').all('li').size());

            Y.one('.form-builder-page-manager-delete-page').simulate('click');

            Y.Assert.areEqual(3, Y.one('.pagination-content').all('li').size());

            Y.one('.form-builder-page-manager-delete-page').simulate('click');

            Y.Assert.areEqual(3, Y.one('.pagination-content').all('li').size());
        },

        'should add a new tab on addPage button clicked': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });
 
            Y.Assert.areEqual(1, Y.one('.tabbable-content').all('.tab').size());

            Y.one('.form-builder-page-manager-add-last-position').simulate('click');

            Y.Assert.areEqual(2, Y.one('.tabbable-content').all('.tab').size());
        },

        'should remove the current tab on removePage button clicked': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 2,
                pageHeader: '#header',
                pagesQuantity: 2,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            Y.Assert.areEqual(2, Y.one('.tabbable-content').all('.tab').size());

            Y.one('.form-builder-page-manager-delete-page').simulate('click');

            Y.Assert.areEqual(1, Y.one('.tabbable-content').all('.tab').size());

            Y.one('.form-builder-page-manager-delete-page').simulate('click');

            Y.Assert.areEqual(1, Y.one('.tabbable-content').all('.tab').size());
        },

        'should update `title` attribute on title input change': function() {
            var pages,
                titleNode;

            pages = this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            titleNode = Y.one('.form-builder-page-header-title');

            Y.Assert.areEqual('Untitled page (1 of 1)', titleNode.get('placeholder'));

            this._simulateInputChange(titleNode, 'title', function() {
                Y.Assert.areEqual('title', pages.get('titles')[0]);
                this._simulateInputChange(titleNode, '', function() {
                    Y.Assert.areEqual('Untitled page (1 of 1)', titleNode.get('placeholder'));
                });
            });
        },

        'should update tab title on title of the current page change': function() {
            var pages,
                titleNode;

            pages = this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            Y.one('.form-builder-page-manager-switch-mode').simulate('click');

            titleNode = Y.one('.form-builder-page-header-title');

            Y.Assert.areEqual('Untitled page (1 of 1)', titleNode.get('placeholder'));

            this._simulateInputChange(titleNode, 'title', function() {
                Y.Assert.areEqual('1.title', Y.one('.tab-label').text());
                this._simulateInputChange(titleNode, '', function() {
                    Y.Assert.areEqual('1.Untitled page (1 of 1)', Y.one('.tab-label').text());
                });
            });
        },

        'should show/hide the tabview/pagination on switch button clicked': function() {
            var pages;

            pages = this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            Y.Assert.isFalse(Y.one('.pagination-content').hasClass('hide'));
            Y.Assert.isTrue(Y.one('.tabbable-content').hasClass('hide'));

            Y.one('.form-builder-page-manager-switch-mode').simulate('click');

            Y.Assert.isTrue(Y.one('.pagination-content').hasClass('hide'));
            Y.Assert.isFalse(Y.one('.tabbable-content').hasClass('hide'));

            Y.one('.form-builder-page-manager-switch-mode').simulate('click');

            Y.Assert.isFalse(Y.one('.pagination-content').hasClass('hide'));
            Y.Assert.isTrue(Y.one('.tabbable-content').hasClass('hide'));
        },

        'should show the right title on page change': function() {
            var titleNode;

            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 2,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs',
                titles: ['Title', '']
            });

            titleNode = Y.one('.form-builder-page-header-title');

            Y.Assert.areEqual('Title', titleNode.get('value'));

            Y.one('.pagination-control').simulate('click');

            Y.Assert.areEqual('Untitled page (2 of 2)', titleNode.get('placeholder'));
        },

        'should update `descriptions` attribute on title input change': function() {
            var descriptionNode,
                pages;

            pages = this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            descriptionNode = Y.one('.form-builder-page-header-description');

            Y.Assert.areEqual('An aditional info about this page', descriptionNode.get('placeholder'));

            this._simulateInputChange(descriptionNode, 'descriptions', function() {
                Y.Assert.areEqual('descriptions', pages.get('descriptions')[0]);
                this._simulateInputChange(descriptionNode, '', function() {
                    Y.Assert.areEqual('An aditional info about this page', descriptionNode.get('placeholder'));
                });
            });
        },

        'should initialize with pagination tabs if the default option was replaced': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs',
                mode: 'tabs'
            });

            Y.Assert.isFalse(Y.one('.tabbable-content').hasClass('hide'));
            Y.Assert.isTrue(Y.one('.pagination-content').hasClass('hide'));
        },

        'should not mode attribute accept values not equal to `pagination` or `tabs`': function() {
            var pages;

            pages = this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs',
                mode: 'numbers'
            });

            Y.Assert.areNotEqual(pages.get('mode'), 'numbers');
        },

        'should the active tab match with current active page after switch page mode from pagination to tabs': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 2,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            Y.all('.pagination-control').item(1).simulate('click');
            Y.one('.form-builder-page-manager-switch-mode').simulate('click');

            Y.Assert.isTrue(Y.all('.nav.nav-tabs .tab').item(1).hasClass('active'));
        },

        'should the active page match with current active tab after page mode change from tabs to pagination': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 2,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs',
                mode: 'tabs'
            });

            Y.all('.nav.nav-tabs .tab').item(1).simulate('click');
            Y.one('.form-builder-page-manager-switch-mode').simulate('click');

            Y.Assert.isTrue(Y.all('.pagination.pagination-content li').item(2).hasClass('active'));
        },

        'should show `Reset page` button if the page quantity is equal to one': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            Y.Assert.areEqual('Reset page', Y.one('.form-builder-page-manager-delete-page').text());
        },

        'should show `Delete current page` button if the page quantity is greater than one': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 2,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            Y.Assert.areEqual('Delete current page', Y.one('.form-builder-page-manager-delete-page').text());
        },

        'should show `Reset page` button dynamically after deleting the second page': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 2,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            Y.one('.form-builder-page-manager-delete-page').simulate('click');
            Y.Assert.areEqual('Reset page', Y.one('.form-builder-page-manager-delete-page').text());
        },

        'should show `Delete current page` button dynamically after adding a second page': function() {
            this.createFormBuilderPageManager({
                activePageNumber: 1,
                pageHeader: '#header',
                pagesQuantity: 1,
                paginationContainer: '#pages',
                tabviewContainer: '#tabs'
            });

            Y.one('.form-builder-page-manager-add-last-position').simulate('click');
            Y.Assert.areEqual('Delete current page', Y.one('.form-builder-page-manager-delete-page').text());
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-page-manager', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
