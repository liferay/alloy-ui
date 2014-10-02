YUI.add('aui-form-builder-field-base-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-base'),
        TestField;

    TestField = Y.Base.create('test-field', Y.FormBuilderFieldBase, [], {
        _fillSettings: function() {
            this._settings = [
                {
                    attrName: 'attr1',
                    editor: new Y.TextDataEditor({
                        label: 'Attribute 1'
                    })
                },
                {
                    attrName: 'attr3',
                    editor: new Y.TextDataEditor({
                        label: 'Attribute 3'
                    })
                },
                {
                    attrName: 'attrBool',
                    editor: new Y.BooleanDataEditor({
                        label: 'Attribute Boolean'
                    })
                }
            ];
        }
    }, {
        ATTRS: {
            attr1: {
                value: 'Attr1'
            },
            attr2: {
                value: 'Attr2'
            },
            attr3: {
                value: 'Attr3'
            },
            attrBool: {
                value: true
            }
        }
    });

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Base Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should throw error when using abstract class directly': function() {
            var instance = this;

            this._field = new Y.FormBuilderFieldBase();

            Y.Assert.throwsError(Error, function() {
                instance._field.showSettings();
            });
        },

        'should not render settings modal before using it': function() {
            this._field = new TestField();

            Y.Assert.isNull(Y.one('.modal-dialog'));
        },

        'should render settings modal correctly': function() {
            var input,
                modal;

            this._field = new TestField();

            this._field.showSettings();

            modal = Y.one('.modal-dialog');
            Y.Assert.isNotNull(modal);

            input = modal.one('input[type="text"]');
            Y.Assert.areEqual('Attr1', input.get('value'));

            input = modal.all('input[type="text"]').item(1);
            Y.Assert.areEqual('Attr3', input.get('value'));

            input = modal.one('input[type="checkbox"]');
            Y.Assert.isTrue(input.get('checked'));
        },

        'should hide settings modal correctly': function() {
            this._field = new TestField();

            this._field.showSettings();
            this._field.hideSettings();

            Y.Assert.isTrue(Y.one('.modal-dialog').hasClass('modal-dialog-hidden'));
        },

        'should not throw error when hiding settings before rendered': function() {
            this._field = new TestField();

            this._field.hideSettings();
            Y.Assert.isNull(Y.one('.modal-dialog'));
        },

        'should update settings modal correctly': function() {
            var input,
                modal;

            this._field = new TestField();

            this._field.showSettings();
            this._field.hideSettings();

            this._field.set('attr1', 'Attr1New');
            this._field.showSettings();

            modal = Y.one('.modal-dialog');
            Y.Assert.isFalse(modal.hasClass('modal-dialog-hidden'));

            input = modal.one('input[type="text"]');
            Y.Assert.areEqual('Attr1New', input.get('value'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: [
        'aui-boolean-data-editor',
        'aui-form-builder-field-base',
        'aui-text-data-editor',
        'test'
    ]
});