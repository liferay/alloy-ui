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
        },

        _fillAdvancedSettings: function() {
            this._advancedSettings.push(
                {
                    attrName: 'name1',
                    footerLabel: 'Footer',
                    editor: new Y.TextDataEditor({
                        label: 'Name'
                    })
                },
                {
                    attrName: 'name2',
                    editor: new Y.TextDataEditor({
                        label: 'Name2'
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
            },
            attrOptions: {
                value: []
            },
            name1: {
                value: ''
            },
            name2: {
                value: ''
            }
        }
    });

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Base Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
                Y.one('#container').empty();
            }
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
            var instance = this;

            input.set('value', text + '-prev');
            input.simulate('keydown');

            this.wait(function() {
                input.set('value', text);
                input.simulate('keydown');

                instance.wait(callback, Y.ValueChange.POLL_INTERVAL);
            }, Y.ValueChange.POLL_INTERVAL);
        },

        'should render settings modal correctly': function() {
            var container = Y.one('#container'),
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

        'should render advanced settings modal correctly': function() {
            var advancedSetting,
                container = Y.one('#container'),
                input;

            this._field = new TestField({
                help: 'Help',
                title: 'Title',
                name1: 'Name'
            });

            this._field.renderSettingsPanel(container);
            this._field.saveSettings();

            advancedSetting = this._field._advancedSettings[0];
            input = container.all('input[type="text"]').item(4);
            Y.Assert.areEqual('Name', input.get('value'));

            Y.Assert.areEqual(this._field.get('content').one('.form-builder-field-footer-content').getHTML(),
                advancedSetting.footerLabel + ': ' + this._field.get(advancedSetting.attrName));
        },

        'shouldn\'t render advanced without footerLabel': function() {
            var advancedSetting,
                container = Y.one('#container'),
                input;

            this._field = new TestField({
                help: 'Help',
                title: 'Title',
                name2: 'Name2'
            });

            this._field.renderSettingsPanel(container);
            this._field.saveSettings();

            advancedSetting = this._field._advancedSettings[0];
            input = container.all('input[type="text"]').item(5);
            Y.Assert.areEqual('Name2', input.get('value'));
            Y.Assert.isNull(this._field.get('content').one('.form-builder-field-footer-content'));
        },

        'should render settings modal for extensions correctly': function() {
            var container = Y.one('#container'),
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

        'should update settings modal correctly': function() {
            var container = Y.one('#container'),
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
            var instance = this,
                container = Y.one('#container'),
                input;

            this._field = new TestField({
                help: 'Help',
                title: 'Title'
            });

            this._field.renderSettingsPanel(container);
            Y.Assert.isTrue(this._field.validateSettings());

            input = container.all('input[type="text"]').item(2);
            this._simulateInputChange(input, '', function() {
                Y.Assert.isFalse(instance._field.validateSettings());

                instance._simulateInputChange(input, 'Attr1New', function() {
                    Y.Assert.isTrue(instance._field.validateSettings());
                });
            });
        },

        'should show errors when invalid settings are detected': function() {
            var container = Y.one('#container');

            this._field = new TestField();
            this._field.renderSettingsPanel(container);

            Y.Assert.isFalse(container.one('.data-editor').hasClass('has-error'));
            this._field.validateSettings();
            Y.Assert.isTrue(container.one('.data-editor').hasClass('has-error'));
        },

        'should not show errors when no invalid settings are detected': function() {
            var container = Y.one('#container');

            this._field = new TestField({
                help: 'Help',
                title: 'Title'
            });
            this._field.renderSettingsPanel(container);

            this._field.validateSettings();
            Y.Assert.isFalse(container.one('.data-editor').hasClass('has-error'));
        },

        'should save edited settings': function() {
            var instance = this,
                container = Y.one('#container'),
                input,
                TestField2 = Y.Base.create('test-field2', Y.FormField, [Y.FormBuilderFieldBase]);

            this._field = new TestField2({
                title: 'Attr1'
            });

            this._field.renderSettingsPanel(container);

            input = container.all('input[type="text"]').item(0);
            this._simulateInputChange(input, 'Attr1New', function() {
                Y.Assert.areEqual('Attr1', instance._field.get('title'));

                instance._field.saveSettings();
                Y.Assert.areEqual('Attr1New', instance._field.get('title'));
            });
        },

        'should save advanced edited settings': function() {
            var instance = this,
                container = Y.one('#container'),
                input;

            this._field = new TestField({
                name1: 'Name',
                name2: 'Name2'
            });

            Y.Assert.areEqual('Name', this._field.get('name1'));

            this._field.renderSettingsPanel(container);

            input = container.all('input[type="text"]').item(4);
            this._simulateInputChange(input, 'NameNew', function() {
                Y.Assert.areEqual('Name', this._field.get('name1'));

                instance._field.saveSettings();
                Y.Assert.areEqual('NameNew', this._field.get('name1'));
            });
        },

        'should toggle advanced edited settings': function() {
            var container = Y.one('#container');

            this._field = new TestField({
                name1: 'Name',
                name2: 'Name2'
            });

            this._field.renderSettingsPanel(container);

            Y.Assert.isTrue(Y.one('.form-builder-field-settings-panel-advanced-content').hasClass('toggler-content-expanded'));

            Y.one('.form-builder-field-settings-panel-toggler-advanced').simulate('click');
            this.wait(function(){
                Y.Assert.isTrue(Y.one('.form-builder-field-settings-panel-advanced-content').hasClass('toggler-content-collapsed'));

                Y.one('.form-builder-field-settings-panel-toggler-advanced').simulate('click');
                this.wait(function(){
                    Y.Assert.isTrue(Y.one('.form-builder-field-settings-panel-advanced-content').hasClass('toggler-content-expanded'));
                }, 500);
            }, 500);
        },

        'should toggle advanced edited settings by tap event': function() {
            var container = Y.one('#container');

            this._field = new TestField({
                name1: 'Name',
                name2: 'Name2'
            });

            this._field.renderSettingsPanel(container);

            Y.Assert.isTrue(Y.one('.form-builder-field-settings-panel-advanced-content').hasClass('toggler-content-expanded'));

            Y.one('.form-builder-field-settings-panel-toggler-advanced').simulateGesture('tap');
            this.wait(function(){
                Y.Assert.isTrue(Y.one('.form-builder-field-settings-panel-advanced-content').hasClass('toggler-content-collapsed'));

                Y.one('.form-builder-field-settings-panel-toggler-advanced').simulateGesture('tap');
                this.wait(function(){
                    Y.Assert.isTrue(Y.one('.form-builder-field-settings-panel-advanced-content').hasClass('toggler-content-expanded'));
                }, 500);
            }, 500);
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
        },

        'should collapse advanced content after function collapseModalContent be called': function() {
            var container = Y.one('#container');

            this._field = new TestField({
                name1: 'Name',
                name2: 'Name2'
            });

            Y.Assert.areEqual('Name', this._field.get('name1'));

            this._field.renderSettingsPanel(container);

            this._field.collapseModalContent();

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.form-builder-field-settings-panel-advanced-content').hasClass('toggler-content-collapsed'));
            }, 500);

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
    ],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
