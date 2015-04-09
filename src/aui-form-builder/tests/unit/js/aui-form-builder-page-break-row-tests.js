YUI.add('aui-form-builder-page-break-row-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-page-break-row');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Page Break Row Tests',

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

        'should render index': function() {
            var row,
                title;

            row = new Y.FormBuilderPageBreakRow({
                index: 10,
                quantity: 10
            });
            title = row.get('node').one('.form-builder-page-break-title');

            Y.Assert.areEqual('Untitled Page ' + 10 + '/10', title.get('value'));
        },

        'should update index': function() {
            var row,
                title;

            row = new Y.FormBuilderPageBreakRow({
                index: 10,
                quantity: 10
            });
            title = row.get('node').one('.form-builder-page-break-title');
            Y.Assert.areEqual('Untitled Page ' + 10 + '/10', title.get('value'));

            row.set('index', 20);
            Y.Assert.areEqual('Untitled Page ' + 20 + '/10', title.get('value'));
        },

        'should render quantity': function() {
            var row,
                title;

            row = new Y.FormBuilderPageBreakRow({
                index: 10,
                quantity: 10
            });
            title = row.get('node').one('.form-builder-page-break-title');

            Y.Assert.areEqual('Untitled Page 10/' + 10, title.get('value'));
        },

        'should update quantity': function() {
            var row,
                title;

            row = new Y.FormBuilderPageBreakRow({
                index: 10,
                quantity: 10
            });
            title = row.get('node').one('.form-builder-page-break-title');

            Y.Assert.areEqual('Untitled Page 10/' + 10, title.get('value'));

            row.set('quantity', 20);
            Y.Assert.areEqual('Untitled Page 10/' + 20, title.get('value'));
        },

        'should render title': function() {
            var row,
                title;

            row = new Y.FormBuilderPageBreakRow({
                title: 'title'
            });
            title = row.get('node').one('.form-builder-page-break-title');

            Y.Assert.areEqual('title', title.get('value'));
        },

        'should update title': function() {
            var row,
                title;

            row = new Y.FormBuilderPageBreakRow({
                title: 'untitle'
            });
            title = row.get('node').one('.form-builder-page-break-title');

            row.set('title', 'title');
            Y.Assert.areEqual('title', title.get('value'));

            this._simulateInputChange(title, 'try untitle here', function() {
                Y.Assert.areEqual('try untitle here', row.get('title'));
            });
        },

        'should toggle the visibility of the border around the title on mouseover/mouseleave': function() {
            var node,
                row = new Y.FormBuilderPageBreakRow();

            node = row.get('node').one('.form-builder-page-break-title');

            Y.Assert.isTrue(node.hasClass('form-builder-page-break-title-hide-border'));
            node.simulate('mouseover');
            Y.Assert.isFalse(node.hasClass('form-builder-page-break-title-hide-border'));
            node.simulate('mouseout');
            Y.Assert.isTrue(node.hasClass('form-builder-page-break-title-hide-border'));
        },

        'should make first page break unmovable': function() {
            var row = new Y.FormBuilderPageBreakRow({
                index: 1,
                quantity: 2
            });

            Y.Assert.isFalse(row.get('movable'));

            row.set('index', 2);
            Y.Assert.isTrue(row.get('movable'));

            row.set('index', 3);
            Y.Assert.isTrue(row.get('movable'));

            row.set('index', 1);
            Y.Assert.isFalse(row.get('movable'));
        },

        'should make first page break unremovable': function() {
            var row = new Y.FormBuilderPageBreakRow({
                index: 1,
                quantity: 2
            });

            Y.Assert.isFalse(row.get('removable'));

            row.set('index', 2);
            Y.Assert.isTrue(row.get('removable'));

            row.set('index', 3);
            Y.Assert.isTrue(row.get('removable'));

            row.set('index', 1);
            Y.Assert.isFalse(row.get('removable'));
        },

        'shouldn\'t hide input\'s border on on mouseout when the input has focus': function() {
            var row,
                title,
                yeti;

            row = new Y.FormBuilderPageBreakRow();
            Y.one('#container').append(row.get('node'));

            title = row.get('node').one('.form-builder-page-break-title');

            title.simulate('mouseover');

            title.focus();
            if (document.activeElement !== title) {
                yeti = true;
                // When the test is run with Yeti, focus is always stolen by the runner,
                // so we need to call the function directly.
                row._onInputFocus();
            }
            title.simulate('mouseout');
            Y.Assert.isFalse(title.hasClass('form-builder-page-break-title-hide-border'));

            title.blur();
            if (yeti) {
                row._onInputBlur();
            }
            Y.Assert.isTrue(title.hasClass('form-builder-page-break-title-hide-border'));

            Y.one('#container').empty();
        },

        'should show input\'s border when click on edit icon': function() {
            var row,
                editIcon,
                title;

            row = new Y.FormBuilderPageBreakRow();
            Y.one('#container').append(row.get('node'));

            editIcon = row.get('node').one('.form-builder-page-break-title-edit-icon');
            title = row.get('node').one('.form-builder-page-break-title');

            Y.Assert.isTrue(title.hasClass('form-builder-page-break-title-hide-border'));

            editIcon.simulate('click');
            if (document.activeElement !== title) {
                // When the test is run with Yeti, focus is always stolen by the runner,
                // so we need to call the function directly.
                row._onInputFocus();
            }
            Y.Assert.isFalse(title.hasClass('form-builder-page-break-title-hide-border'));
            Y.one('#container').empty();
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-page-break-row', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
