YUI.add('aui-toolbar-tests', function(Y) {

    //--------------------------------------------------------------------------
    // AUI Toolbar Unit Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-toolbar');

    suite.add(new Y.Test.Case({
        name: 'Toolbar Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createToolbar({
            boundingBox: '#toolbar'
        });
        },

        tearDown: function() {
            this._toolbar && this._toolbar.destroy();
        },

        createToolbar: function(config) {
            var content = Y.Node.create('<div id="toolbar" class="toolbar"></div>');

            this._container.append(content);

            this._toolbar = new Y.Toolbar(config).render();
        },

        addContent: function(options) {
            var content;

            content = Y.merge({
                label: 'Test',
                domType: 'button',
                id: 'button'
            }, options);

            this._toolbar.add([content]);

            return content;
        },

        'should add a item': function() {
            this.addContent();

            Y.Assert.isNotNull(Y.one('#button'));
        },

        'should remove a item': function() {
            this.addContent();

            this._toolbar.remove(0);
            Y.Assert.isNull(Y.one('#button'));
        },

        'should remove all items on call clear function': function() {
            this.addContent();

            this._toolbar.clear();
            Y.Assert.isNull(Y.one('#button'));
        },

        'should item function return the right valeu': function() {
            var item = this.addContent();

            Y.Assert.areEqual(item.id, this._toolbar.item(0).get('id'));
        },

        'shouldn\'t add button default classes': function() {
            var button;

            this.addContent({
                cssClass: '',
                discardDefaultButtonCssClasses: true
            });

            button = this._toolbar.get('boundingBox').one('.btn-toolbar-button');

            Y.Assert.isFalse(button.hasClass('btn-default'), 'The button has the default classe btn-default.');
            Y.Assert.isFalse(button.hasClass('btn'), 'The button has the default classe btn.');
        },

        'should write a html as button content': function() {
            var HTMLContent = '<span>\u00D7</span>';

            this.addContent({
                label: undefined,
                labelHTML: HTMLContent
            });

            Y.Assert.areEqual(HTMLContent, this._toolbar.item(0).getNode().getHTML());
        }
    }));

    //--------------------------------------------------------------------------
    // Test Case for setting title to button node
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'AUI Toolbar Render Button Tests',

        /*
         * Check if title attribute is set during the process of creation
         * Tests: AUI-971
         */
        'test setting title attribute': function() {
            var title,
                toolbar;

            title = 'Title should be present';

            toolbar = new Y.Toolbar({
                boundingBox: '#toolbar-971',
                children: [{
                    label: 'Test label',
                    title: title
                }]
            }).render();

            Y.Assert.isNotNull(
                Y.one('#toolbar-971').one('button[title="' + title + '"]'),
                'Title attribute should be set to the button node.');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-toolbar']
});
