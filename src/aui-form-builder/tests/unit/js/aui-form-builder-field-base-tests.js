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
            var instance = this,
                container = Y.Node.create('<div></div>');

            this._field = new Y.FormBuilderFieldBase();

            Y.Assert.throwsError(Error, function() {
                instance._field.renderSettingsPanel(container);
            });
        },

        'should render settings modal correctly': function() {
            var container = Y.Node.create('<div></div>'),
                input;

            this._field = new TestField();

            this._field.renderSettingsPanel(container);

            input = container.one('input[type="text"]');
            Y.Assert.areEqual('Attr1', input.get('value'));

            input = container.all('input[type="text"]').item(1);
            Y.Assert.areEqual('Attr3', input.get('value'));

            input = container.one('input[type="checkbox"]');
            Y.Assert.isTrue(input.get('checked'));
        },

        'should update settings modal correctly': function() {
            var container = Y.Node.create('<div></div>'),
                input;

            this._field = new TestField();

            this._field.renderSettingsPanel(container);

            this._field.set('attr1', 'Attr1New');
            this._field.renderSettingsPanel(container);

            Y.Assert.isFalse(container.hasClass('modal-dialog-hidden'));

            input = container.one('input[type="text"]');
            Y.Assert.areEqual('Attr1New', input.get('value'));
        },

        'should save edited settings': function() {
            var container = Y.Node.create('<div></div>'),
                input;

            this._field = new TestField();

            this._field.renderSettingsPanel(container);
            input = container.one('input[type="text"]');
            input.set('value', 'Attr1New');

            Y.Assert.areEqual('Attr1', this._field.get('attr1'));

            this._field.saveSettings();
            Y.Assert.areEqual('Attr1New', this._field.get('attr1'));
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
