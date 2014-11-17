YUI.add('aui-form-builder-field-base-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-base'),
        TestField;

    TestField = Y.Base.create('test-field', Y.FormField, [Y.FormBuilderFieldBase], {
        _fillSettings: function() {
            this._settings.push(
                {
                    attrName: 'attr1',
                    editor: new Y.TextDataEditor({
                        label: 'Attribute 1',
                        required: true
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
                },
                {
                    attrName: 'attrOptions',
                    editor: new Y.OptionsDataEditor({
                        label: 'Attribute Options'
                    })
                }
            );
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

        'should render settings modal correctly': function() {
            var container = Y.Node.create('<div></div>'),
                input,
                TestField2 = Y.Base.create('test-field2', Y.FormField, [Y.FormBuilderFieldBase]);

            this._field = new TestField2({
                help: 'Help',
                title: 'Title'
            });

            this._field.renderSettingsPanel(container);

            input = container.all('input[type="text"]').item(0);
            Y.Assert.areEqual('Title', input.get('value'));

            input = container.all('input[type="text"]').item(1);
            Y.Assert.areEqual('Help', input.get('value'));
        },

        'should render settings modal for extensions correctly': function() {
            var container = Y.Node.create('<div></div>'),
                input;

            this._field = new TestField({
                help: 'Help',
                title: 'Title'
            });

            this._field.renderSettingsPanel(container);

            input = container.all('input[type="text"]').item(0);
            Y.Assert.areEqual('Title', input.get('value'));

            input = container.all('input[type="text"]').item(1);
            Y.Assert.areEqual('Help', input.get('value'));

            input = container.all('input[type="text"]').item(2);
            Y.Assert.areEqual('Attr1', input.get('value'));

            input = container.all('input[type="text"]').item(3);
            Y.Assert.areEqual('Attr3', input.get('value'));

            input = container.one('.button-switch');
            Y.Assert.isTrue(input.hasClass('activated'));
        },

        'should toggle the toolbar': function() {
            var container = Y.Node.create('<div></div>');

            this._field = new TestField();

            container.appendChild(this._field.get('content'));

            Y.Assert.isTrue(container.one('.form-builder-field-toolbar').hasClass('hide'));

            this._field.toggleToolbar(true);
            Y.Assert.isFalse(container.one('.form-builder-field-toolbar').hasClass('hide'));

            this._field.toggleToolbar(false);
            Y.Assert.isTrue(container.one('.form-builder-field-toolbar').hasClass('hide'));
        },

        'should check if toolbar is visible': function() {
            this._field = new TestField();
            Y.one('#container').append(this._field.get('node'));

            this._field.toggleToolbar(true);
            Y.Assert.isTrue(this._field.isToolbarVisible());

            this._field.toggleToolbar(false);
            Y.Assert.isFalse(this._field.isToolbarVisible());
        },

        'should toggle the configuration button': function() {
            var container = Y.Node.create('<div></div>');

            this._field = new TestField();

            container.appendChild(this._field.get('content'));

            Y.Assert.isTrue(container.one('.form-builder-field-configuration').hasClass('hide'));

            this._field.toggleConfigurationButton(true);
            Y.Assert.isFalse(container.one('.form-builder-field-configuration').hasClass('hide'));

            this._field.toggleConfigurationButton(false);
            Y.Assert.isTrue(container.one('.form-builder-field-configuration').hasClass('hide'));
        },

        'should hide the toolbar on click outside': function() {
            var container = Y.one('#container');

            this._field = new TestField();

            container.appendChild(this._field.get('content'));

            Y.Assert.isTrue(container.one('.form-builder-field-configuration').hasClass('hide'));
            Y.Assert.isTrue(container.one('.form-builder-field-toolbar').hasClass('hide'));

            this._field.toggleToolbar(true);
            Y.Assert.isTrue(container.one('.form-builder-field-configuration').hasClass('hide'));
            Y.Assert.isFalse(container.one('.form-builder-field-toolbar').hasClass('hide'));

            container.simulate('mousemove');
            container.simulate('click');
            Y.Assert.isTrue(container.one('.form-builder-field-configuration').hasClass('hide'));
            Y.Assert.isTrue(container.one('.form-builder-field-toolbar').hasClass('hide'));
        },

        'should update settings modal correctly': function() {
            var container = Y.Node.create('<div></div>'),
                input;

            this._field = new TestField();

            this._field.renderSettingsPanel(container);

            this._field.set('attr1', 'Attr1New');
            this._field.renderSettingsPanel(container);

            Y.Assert.isFalse(container.hasClass('modal-dialog-hidden'));

            input = container.all('input[type="text"]').item(2);
            Y.Assert.areEqual('Attr1New', input.get('value'));
        },

        'should validate edited settings': function() {
            var container = Y.Node.create('<div></div>'),
                input;

            this._field = new TestField({
                help: 'Help',
                title: 'Title'
            });

            this._field.renderSettingsPanel(container);
            Y.Assert.isTrue(this._field.validateSettings());

            input = container.all('input[type="text"]').item(2);
            input.set('value', '');
            Y.Assert.isFalse(this._field.validateSettings());

            input.set('value', 'Attr1New');
            Y.Assert.isTrue(this._field.validateSettings());
        },

        'should save edited settings': function() {
            var container = Y.Node.create('<div></div>'),
                input;

            this._field = new TestField();

            this._field.renderSettingsPanel(container);
            input = container.all('input[type="text"]').item(2);
            input.set('value', 'Attr1New');

            Y.Assert.areEqual('Attr1', this._field.get('attr1'));

            this._field.saveSettings();
            Y.Assert.areEqual('Attr1New', this._field.get('attr1'));
        },

        'should render nested fields move targets': function() {
            this._field = new TestField({
                nestedFields: [new TestField(), new TestField()]
            });

            Y.Assert.areEqual(5, this._field.get('content').all('.form-builder-field-move-target').size());

            this._field.set('nestedFields', [new TestField()]);
            Y.Assert.areEqual(3, this._field.get('content').all('.form-builder-field-move-target').size());

            this._field.set('nestedFields', []);
            Y.Assert.areEqual(1, this._field.get('content').all('.form-builder-field-move-target').size());
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: [
        'aui-boolean-data-editor',
        'aui-form-builder-field-base',
        'aui-form-field',
        'aui-options-data-editor',
        'aui-text-data-editor',
        'node-event-simulate',
        'test'
    ]
});
