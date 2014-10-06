YUI.add('aui-form-builder-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        tearDown: function() {
            this._formBuilder && this._formBuilder.destroy();
        },

        createFormBuilder: function(config) {
            this._formBuilder = new Y.FormBuilder(config).render('#container');
            return this._formBuilder;
        },

        'should show message if layout is empty': function() {
            this.createFormBuilder();

            Y.Assert.areEqual('block', Y.one('.form-builder-empty-layout').getStyle('display'));
        },

        'should not show message if layout is not empty': function() {
            this.createFormBuilder({
                layout: new Y.Layout({
                    rows: [
                        new Y.LayoutRow()
                    ]
                })
            });

            Y.Assert.areEqual('none', Y.one('.form-builder-empty-layout').getStyle('display'));
        },

        'should hide empty layout message when layout gains rows': function() {
            var formBuilder = this.createFormBuilder();

            formBuilder.get('contentBox').one('.form-builder-add-row').simulate('click');
            Y.Assert.areEqual('none', Y.one('.form-builder-empty-layout').getStyle('display'));
        },

        'should udpate empty layout message when layout changes': function() {
            var formBuilder = this.createFormBuilder();

            formBuilder.set('layout', new Y.Layout({
                rows: [
                    new Y.LayoutRow()
                ]
            }))
            Y.Assert.areEqual('none', Y.one('.form-builder-empty-layout').getStyle('display'));

            formBuilder.set('layout', new Y.Layout())
            Y.Assert.areEqual('block', Y.one('.form-builder-empty-layout').getStyle('display'));
        },

        'should not render field types before necessary': function() {
            this.createFormBuilder();

            this._formBuilder.registerFieldTypes([{
                icon: 'icon1'
            }]);

            Y.Assert.isNull(Y.one('.form-builder-modal'));

            this._formBuilder.showFieldsPanel();
            Y.Assert.isNotNull(Y.one('.form-builder-modal'));
        },

        'should not throw error when hiding the panel before rendered': function() {
            this.createFormBuilder();

            this._formBuilder.hideFieldsPanel();
            Y.Assert.isNull(Y.one('.form-builder-modal'));
        },

        'should add a new field type on form': function() {
            var formBuilder = this.createFormBuilder();

            formBuilder.showFieldsPanel();

            formBuilder.registerFieldTypes([{
                icon: 'icon1'
            }]);
            Y.Assert.isNotNull(Y.one('.icon1'));

            formBuilder.registerFieldTypes({icon: 'icon2'});
            Y.Assert.isNotNull(Y.one('.icon2'));

            formBuilder.registerFieldTypes([
                new Y.FormBuilderFieldType({
                    icon: 'icon3'
                })
            ]);
            Y.Assert.isNotNull(Y.one('.icon3'));

            formBuilder.registerFieldTypes(
                new Y.FormBuilderFieldType({
                    icon: 'icon4'
                })
            );
            Y.Assert.isNotNull(Y.one('.icon4'));
        },

        'should remove a field type from form': function() {
            var formBuilder = this.createFormBuilder(),
                fieldType1 = new Y.FormBuilderFieldType({
                    icon: 'icon-test'
                });

            formBuilder.showFieldsPanel();
            formBuilder.registerFieldTypes(fieldType1);
            Y.Assert.isNotNull(Y.one('.icon-test'));

            formBuilder.unregisterFieldTypes(new Y.FormBuilderFieldType({icon: 'icon-test'}));
            Y.Assert.isNotNull(Y.one('.icon-test'));

            Y.Assert.isNotNull(Y.one('.icon-test'));
            formBuilder.unregisterFieldTypes(fieldType1);
            Y.Assert.isNull(Y.one('.icon-test'));
        },

        'should remove field types by field class': function() {
            var fn1 = function() {},
                fn2 = function() {};

            this.createFormBuilder();

            this._formBuilder.registerFieldTypes([
                {
                    fieldClass: fn1
                },
                {
                    fieldClass: fn2
                },
                {
                    fieldClass: fn1
                }
            ]);

            this._formBuilder.unregisterFieldTypes(fn1);
            Y.Assert.areEqual(1, this._formBuilder.get('fieldTypes').length);

            this._formBuilder.unregisterFieldTypes(function() {});
            Y.Assert.areEqual(1, this._formBuilder.get('fieldTypes').length);
        },

        'should remove multiple field types on same call': function() {
            var fieldType1,
                fn1 = function() {},
                fn2 = function() {},
                fn3 = function() {};

            fieldType1 = new Y.FormBuilderFieldType({
                fieldClass: fn1
            });

            this.createFormBuilder();

            this._formBuilder.registerFieldTypes([
                fieldType1,
                {
                    fieldClass: fn2
                },
                {
                    fieldClass: fn2
                },
                {
                    fieldClass: fn3
                }
            ]);

            this._formBuilder.unregisterFieldTypes([fn2, fieldType1]);
            Y.Assert.areEqual(1, this._formBuilder.get('fieldTypes').length);
            Y.Assert.areEqual(
                fn3,
                this._formBuilder.get('fieldTypes')[0].get('fieldClass')
            );
        },

        'should show the form builder modal': function() {
            var formBuilder = this.createFormBuilder(),
                formBuilderModal = Y.one('.form-builder-modal');

            Y.Assert.isNull(formBuilderModal);

            formBuilder.showFieldsPanel();
            formBuilderModal = Y.one('.form-builder-modal');
            Y.Assert.isFalse(formBuilderModal.hasClass('modal-dialog-hidden'));

            formBuilder.hideFieldsPanel();
            Y.Assert.isTrue(formBuilderModal.hasClass('modal-dialog-hidden'));

            formBuilder.showFieldsPanel();
            Y.Assert.isFalse(formBuilderModal.hasClass('modal-dialog-hidden'));
        },

        'should use new field types when attribute changes': function() {
            this.createFormBuilder();

            this._formBuilder.showFieldsPanel();
            this._formBuilder.registerFieldTypes([
                {
                    icon: 'icon1'
                },
                {
                    icon: 'icon2'
                }
            ]);
            this._formBuilder.set('fieldTypes', [
                {
                    icon: 'icon3'
                },
                {
                    icon: 'icon4'
                }
            ]);

            Y.Assert.isNull(Y.one('.icon1'));
            Y.Assert.isNull(Y.one('.icon2'));
            Y.Assert.isNotNull(Y.one('.icon3'));
            Y.Assert.isNotNull(Y.one('.icon4'));
        },

        'should add a row on layout from form': function() {
            var formBuilder = this.createFormBuilder();

            Y.Assert.isNull(formBuilder.get('contentBox').one('.row'));

            formBuilder.get('contentBox').one('.form-builder-add-row').simulate('click');
            Y.Assert.isNotNull(Y.one('#container').one('.row'));
        },

        'should open settings editor for the clicked field type': function() {
            var mock = new Y.Mock();

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'fieldClass'
            });
            mock.fieldClass.prototype.renderSettingsPanel = function() {};

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: mock.fieldClass,
                    label: 'My Field'
                }]
            });

            this._formBuilder.showFieldsPanel();

            Y.one('.field-type').simulate('click');

            Y.Mock.verify(mock);
        },

        'should save the edited settings of the chosen new field': function() {
            var field,
                settingsPane;

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    label: 'Text'
                }]
            });

            this._formBuilder.showFieldsPanel();
            Y.one('.field-type').simulate('click');

            field = this._formBuilder._fieldBeingEdited;
            Y.Assert.isNotNull(field);

            settingsPane = Y.one('.form-builder-field-settings');
            settingsPane.all('input[type="text"]').item(0).set('value', 'My Title');
            settingsPane.all('input[type="text"]').item(1).set('value', 'My Help');
            settingsPane.all('input[type="checkbox"]').item(0).set('checked', true);
            settingsPane.all('input[type="checkbox"]').item(1).set('checked', true);

            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');

            Y.Assert.areEqual('My Title', field.get('title'));
            Y.Assert.areEqual('My Help', field.get('help'));
            Y.Assert.isTrue(field.get('multiline'));
            Y.Assert.isTrue(field.get('required'));
        },

        'should open and close the field settings editor': function() {
            var field = new Y.FormBuilderFieldText(),
                settingsPane;

            this.createFormBuilder();
            Y.Assert.isNull(Y.one('.form-builder-field-settings'));

            this._formBuilder.showFieldSettingsPanel(field);
            settingsPane = Y.one('.form-builder-field-settings');
            Y.Assert.isNotNull(settingsPane);
            Y.Assert.isFalse(settingsPane.hasClass('modal-dialog-hidden'));

            this._formBuilder.hideFieldSettingsPanel(field);
            Y.Assert.isTrue(settingsPane.hasClass('modal-dialog-hidden'));

            this._formBuilder.showFieldSettingsPanel(field);
            Y.Assert.isFalse(settingsPane.hasClass('modal-dialog-hidden'));
        },

        'should not throw error if hiding settings panel before rendered': function() {
            this.createFormBuilder();

            this._formBuilder.hideFieldSettingsPanel();
            Y.Assert.isNull(Y.one('.form-builder-field-settings'));
        },

        'should fill initial empty columns with content': function() {
            this.createFormBuilder({
                layout: new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: {content: 'Something'}
                                }),
                                new Y.LayoutCol({
                                    size: 4
                                })
                            ]
                        })
                    ]
                })
            });

            Y.Assert.areEqual(
                2,
                Y.one('.form-builder-field-list').all('.form-builder-empty-col').size()
            );
        },

        'should fill empty columns for new rows': function() {
            this.createFormBuilder({
                layout: new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: {content: 'Something'}
                                }),
                                new Y.LayoutCol({
                                    size: 4
                                })
                            ]
                        })
                    ]
                })
            });

            this._formBuilder.get('layout').addRow(0, new Y.LayoutRow({
                cols: [
                    new Y.LayoutCol({
                        size: 6
                    }),
                    new Y.LayoutCol({
                        size: 6,
                        value: {content: 'Something'}
                    })
                ]
            }));

            Y.Assert.areEqual(
                3,
                Y.one('.form-builder-field-list').all('.form-builder-empty-col').size()
            );
        },

        'should fill empty columns for new cols': function() {
            this.createFormBuilder({
                layout: new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: {content: 'Something'}
                                }),
                                new Y.LayoutCol({
                                    size: 4
                                })
                            ]
                        })
                    ]
                })
            });

            this._formBuilder.get('layout').get('rows')[0].set('cols', [
                new Y.LayoutCol({
                    size: 6
                }),
                new Y.LayoutCol({
                    size: 6,
                    value: {content: 'Something'}
                })
            ]);

            Y.Assert.areEqual(
                1,
                Y.one('.form-builder-field-list').all('.form-builder-empty-col').size()
            );
        },

        'should fill empty columns for new layouts': function() {
            this.createFormBuilder({
                layout: new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: {content: 'Something'}
                                }),
                                new Y.LayoutCol({
                                    size: 4
                                })
                            ]
                        })
                    ]
                })
            });

            this._formBuilder.set('layout', new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 6
                            }),
                            new Y.LayoutCol({
                                size: 6,
                                value: {content: 'Something'}
                            })
                        ]
                    })
                ]
            }));

            Y.Assert.areEqual(
                1,
                Y.one('.form-builder-field-list').all('.form-builder-empty-col').size()
            );

            this._formBuilder.get('layout').addRow(0, new Y.LayoutRow({
                cols: [
                    new Y.LayoutCol({
                        size: 6
                    }),
                    new Y.LayoutCol({
                        size: 6,
                        value: {content: 'Something'}
                    })
                ]
            }));

            Y.Assert.areEqual(
                2,
                Y.one('.form-builder-field-list').all('.form-builder-empty-col').size()
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [
        'aui-form-builder',
        'aui-form-builder-field-text',
        'node-event-simulate',
        'test'
    ]
});
