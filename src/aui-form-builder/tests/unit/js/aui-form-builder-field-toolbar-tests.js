YUI.add('aui-form-builder-field-toolbar-tests', function(Y) {

    var FakeFormBuilder,
        suite = new Y.Test.Suite('aui-form-builder-field-toolbar');

    FakeFormBuilder = Y.Base.create('fake-form-builder', Y.Widget, [], {
        renderUI: function() {
            var textField = new Y.FormBuilderFieldText();
            this.get('contentBox').append(textField.get('content'));
        }
    });

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Field Toolbar Unit Tests',

        _should: {
            ignore: {
                'should show toolbar toggle when mouse enters field': Y.UA.mobile,
                'should hide toolbar toggle when mouse leaves field': Y.UA.mobile,
                'should show open toolbar when field is clicked': !Y.UA.mobile,
                'should open toolbar when toggle is clicked': Y.UA.mobile
            }
        },

        setUp: function() {
            this._toolbar = new Y.FormBuilderFieldToolbar({
                formBuilder: new FakeFormBuilder().render('#container')
            });
        },

        tearDown: function() {
            this._toolbar.get('formBuilder').destroy();
            this._toolbar.destroy();
        },

        _openToolbar: function() {
            var fieldNode = Y.one('.form-builder-field-content-toolbar');

            if (Y.UA.mobile) {
                Y.one('.form-builder-field-content').simulate('click');
            } else {
                Y.one('.form-builder-field-content-toolbar').simulate('mouseover');
                fieldNode.one('.form-builder-field-toolbar-toggle').simulate('click');
            }
        },

        /**
         * Non Mobile Only
         */
        'should show toolbar toggle when mouse enters field': function() {
            var fieldNode = Y.one('.form-builder-field-content-toolbar');

            Y.Assert.isNull(fieldNode.one('.form-builder-field-toolbar'));
            fieldNode.simulate('mouseover');
            Y.Assert.isNotNull(fieldNode.one('.form-builder-field-toolbar'));
            Y.Assert.isFalse(fieldNode.one('.form-builder-field-toolbar').hasClass('open'));
        },

        /**
         * Non Mobile Only
         */
        'should hide toolbar toggle when mouse leaves field': function() {
            var fieldNode = Y.one('.form-builder-field-content-toolbar');

            fieldNode.simulate('mouseover');
            fieldNode.simulate('mouseout');
            Y.Assert.isNull(fieldNode.one('.form-builder-field-toolbar'));
        },

        /**
         * Mobile Only
         */
        'should show open toolbar when field is clicked': function() {
            var fieldContentNode = Y.one('.form-builder-field-content'),
                fieldNode = Y.one('.form-builder-field-content-toolbar');

            Y.Assert.isNull(fieldNode.one('.form-builder-field-toolbar'));
            fieldContentNode.simulate('click');
            Y.Assert.isNotNull(fieldNode.one('.form-builder-field-toolbar'));
            Y.Assert.isTrue(fieldNode.one('.form-builder-field-toolbar').hasClass('open'));
        },

        /**
         * Non Mobile Only
         */
        'should open toolbar when toggle is clicked': function() {
            var fieldNode = Y.one('.form-builder-field-content-toolbar');

            fieldNode.simulate('mouseover');
            fieldNode.one('.form-builder-field-toolbar-toggle').simulate('click');
            Y.Assert.isTrue(fieldNode.one('.form-builder-field-toolbar').hasClass('open'));
        },

        'should have default items': function() {
            this._openToolbar();
            Y.Assert.areEqual(5, this._toolbar.get('items').length);
            Y.Assert.areEqual(5, Y.all('.form-builder-field-toolbar-item').size());
        },

        'should have default item for adding nested field': function() {
            var formBuilder = this._toolbar.get('formBuilder');

            Y.Mock.expect(formBuilder, {
                args: [Y.Mock.Value.Object],
                method: 'addNestedField'
            });

            this._openToolbar();
            Y.one('.form-builder-field-toolbar-item').simulate('click');
            Y.Mock.verify(formBuilder);
        },

        'should have default item for editing a field': function() {
            var formBuilder = this._toolbar.get('formBuilder');

            Y.Mock.expect(formBuilder, {
                args: [Y.Mock.Value.Object],
                method: 'editField'
            });

            this._openToolbar();
            Y.all('.form-builder-field-toolbar-item').item(1).simulate('click');
            Y.Mock.verify(formBuilder);
        },

        'should have default item for removing a field': function() {
            var formBuilder = this._toolbar.get('formBuilder');

            Y.Mock.expect(formBuilder, {
                args: [Y.Mock.Value.Object],
                method: 'removeField'
            });

            this._openToolbar();
            Y.all('.form-builder-field-toolbar-item').item(3).simulate('click');
            Y.Mock.verify(formBuilder);
        },

        'should have default item for closing the toolbar': function() {
            this._openToolbar();
            Y.all('.form-builder-field-toolbar-item').item(4).simulate('click');
            Y.Assert.isFalse(Y.one('.form-builder-field-toolbar').hasClass('open'));
        },

        'should update ui when items are changed': function() {
            this._openToolbar();
            this._toolbar.set('items', [
                {
                    handler: 'itemHandler',
                    iconClass: 'item'
                }
            ]);

            Y.Assert.areEqual(1, this._toolbar.get('items').length);
            Y.Assert.areEqual(1, Y.all('.form-builder-field-toolbar-item').size());
        },

        'should call handler for changed items when clicked': function() {
            var formBuilder = this._toolbar.get('formBuilder');

            Y.Mock.expect(formBuilder, {
                args: [Y.Mock.Value.Object],
                method: 'itemHandler'
            });
            this._openToolbar();
            this._toolbar.set('items', [
                {
                    handler: 'itemHandler',
                    iconClass: 'item'
                }
            ]);
            Y.one('.form-builder-field-toolbar-item').simulate('click');

            Y.Mock.verify(formBuilder);
        },

        'should return an item': function() {
            var item = this._toolbar.getItem('.glyphicon');
            Y.Assert.isNotNull(item);

            item = this._toolbar.getItem('.foo-bar');
            Y.Assert.isNull(item);
        },

        'should not add to a field if toolbar is disabled': function() {
            var fieldNode = Y.one('.form-builder-field-content-toolbar');

            this._toolbar.set('disabled', true);
            fieldNode.simulate('mouseover');
            Y.Assert.isNull(fieldNode.one('.form-builder-field-toolbar-toggle'));

            this._toolbar.set('disabled', false);
            fieldNode.simulate('mouseover');
            Y.Assert.isNotNull(fieldNode.one('.form-builder-field-toolbar-toggle'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: [
        'aui-form-builder',
        'aui-form-builder-field-text',
        'aui-form-builder-field-toolbar',
        'node-event-simulate',
        'test'
    ],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
