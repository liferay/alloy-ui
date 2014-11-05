YUI.add('aui-form-builder-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Unit Tests',

        _should: {
            // Ignore the following tests in touch enabled browsers. They will
            // be tested properly in the tests for the aui-form-builder module.
            ignore: {
                'should show the toolbar of field when touch on field': !Y.UA.mobile,
                'should show the toolbar of field when touch on field in mobile device': Y.UA.mobile
            }
        },

        init: function() {
            this._container = Y.one('#container');
        },

        tearDown: function() {
            this._formBuilder && this._formBuilder.destroy();
        },

        createFormBuilder: function(config) {
            this._formBuilder = new Y.FormBuilder(Y.merge({
                fieldTypes: [
                    {
                        fieldClass: Y.FormBuilderFieldSentence
                    },
                    {
                        fieldClass: Y.FormBuilderFieldText
                    }
                ],
                layout: new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4
                                }),
                                new Y.LayoutCol({
                                    size: 4
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: new Y.FormBuilderFieldSentence({
                                        help: 'My Help',
                                        nestedFields: [
                                            new Y.FormBuilderFieldText({
                                                help: 'First nested field',
                                                title: 'Nested Field 1'
                                            }),
                                            new Y.FormBuilderFieldText({
                                                help: 'Second nested field',
                                                title: 'Nested Field 2'
                                            })
                                        ],
                                        title: 'My Title'
                                    })
                                })
                            ]
                        })
                    ]
                })
            }, config)).render('#container');

            return this._formBuilder;
        },

        'should have default empty layout': function() {
            this._formBuilder = new Y.FormBuilder().render('#container');

            Y.Assert.isNotNull(this._formBuilder.get('layout'));
            Y.Assert.areEqual(1, this._formBuilder.get('layout').get('rows').length);
        },

        'should show message if layout is empty': function() {
            this.createFormBuilder({
                layout: new Y.Layout()
            });

            Y.Assert.areEqual('block', Y.one('.form-builder-empty-layout').getStyle('display'));
        },

        'should not show message if layout is not empty': function() {
            this.createFormBuilder();

            Y.Assert.areEqual('none', Y.one('.form-builder-empty-layout').getStyle('display'));
        },

        'should hide empty layout message when layout gains rows': function() {
            var formBuilder = this.createFormBuilder({
                layout: new Y.Layout()
            });

            formBuilder.get('contentBox').one('.layout-builder-add-row-choose-row').simulate('click');
            Y.Assert.areEqual('none', Y.one('.form-builder-empty-layout').getStyle('display'));
        },

        'should update empty layout message when layout changes': function() {
            var formBuilder = this.createFormBuilder({
                layout: new Y.Layout()
            });

            formBuilder.set('layout', new Y.Layout({
                rows: [
                    new Y.LayoutRow()
                ]
            }));
            Y.Assert.areEqual('none', Y.one('.form-builder-empty-layout').getStyle('display'));

            formBuilder.set('layout', new Y.Layout());
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

        'should add page break to layout that doesn\'t have one': function() {
            this.createFormBuilder();

            Y.Assert.areEqual(2, Y.all('.layout-row').size());
        },

        'should not add page break to layout that has one': function() {
            this.createFormBuilder({
                layout: new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.FormBuilderPageBreak()
                            ]
                        })
                    ]
                })
            });

            Y.Assert.areEqual(1, Y.all('.layout-row').size());
        },

        'should add a new page break on form': function() {
            var formBuilder = this.createFormBuilder();

            formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');
            Y.Assert.areEqual(2, Y.all('.form-builder-page-break').size());
        },

        'should make page breaks columns unmovable and unremovable': function() {
            var row;

            this.createFormBuilder();
            row = this._formBuilder.get('layout').get('rows')[0];

            Y.Assert.isFalse(row.get('cols')[0].get('movableContent'));
            Y.Assert.isFalse(row.get('cols')[0].get('removable'));
        },

        'should make first page break row unmovable and unremovable': function() {
            var row;

            this.createFormBuilder();
            this._formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');
            this._formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');

            row = this._formBuilder.get('layout').get('rows')[0];
            Y.Assert.isFalse(row.get('movable'));
            Y.Assert.isFalse(row.get('removable'));

            row = this._formBuilder.get('layout').get('rows')[1];
            Y.Assert.isTrue(row.get('movable'));
            Y.Assert.isTrue(row.get('removable'));

            row = this._formBuilder.get('layout').get('rows')[2];
            Y.Assert.isTrue(row.get('movable'));
            Y.Assert.isTrue(row.get('removable'));
        },

        'should update quantity value of all pages break on form': function() {
            var formBuilder = this.createFormBuilder();

            formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');

            Y.Assert.areEqual(2, Y.one('.form-builder-page-break-quantity').get('text'));

            formBuilder.get('contentBox').one('.layout-builder-add-row-choose-row').simulate('click');
            formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');
            formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');
            Y.Assert.areEqual(4, Y.one('.form-builder-page-break-quantity').get('text'));
        },

        'should update page breaks when one is removed': function() {
            var row;

            this.createFormBuilder();
            this._formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');
            this._formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);

            row = this._formBuilder.get('layout').get('rows')[2];
            row.get('node').one('.layout-builder-remove-row-button').simulate('click');
            Y.Assert.areEqual(2, Y.all('.form-builder-page-break').size());

            row = this._formBuilder.get('layout').get('rows')[2];
            Y.Assert.areEqual(2, row.get('cols')[0].get('value').get('index'));
            Y.Assert.areEqual(2, row.get('cols')[0].get('value').get('quantity'));
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
            formBuilder.unregisterFieldTypes(fieldType1);-
            Y.Assert.isNull(Y.one('.icon-test'));
        },

        'should remove field types by field class': function() {
            var fn1 = function() {},
                fn2 = function() {};

            this.createFormBuilder({
                fieldTypes: [
                    {
                        fieldClass: fn1
                    },
                    {
                        fieldClass: fn2
                    },
                    {
                        fieldClass: fn1
                    }
                ]
            });

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

            this.createFormBuilder({
                fieldTypes: [
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
                ]
            });

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

        'should close field types panel through close button': function() {
            var formBuilderModal;

            this.createFormBuilder();
            this._formBuilder.showFieldsPanel();

            formBuilderModal = Y.one('.form-builder-modal');
            formBuilderModal.one('.close').simulate('mousemove');
            formBuilderModal.one('.close').simulate('click');

            Y.Assert.isTrue(formBuilderModal.hasClass('modal-dialog-hidden'));
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
            settingsPane.all('input[type="checkbox"]').item(0).simulate('click');
            settingsPane.all('input[type="checkbox"]').item(1).simulate('click');

            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');

            Y.Assert.areEqual('My Title', field.get('title'));
            Y.Assert.areEqual('My Help', field.get('help'));
            Y.Assert.isTrue(field.get('multiline'));
            Y.Assert.isTrue(field.get('required'));
        },

        'shouldn\'t save a disabled field': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    disabled: true,
                    fieldClass: Y.FormBuilderFieldText
                }]
            });

            this._formBuilder.showFieldsPanel();
            Y.one('.field-type').simulate('click');
            Y.Assert.isNull(Y.one('.form-builder-field-settings'));
        },

        'shouldn\'t save a second field from a field type with unique true': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    defaultConfig: {
                        title: 'Title'
                    },
                    fieldClass: Y.FormBuilderFieldText,
                    unique: true
                }]
            });

            this._formBuilder.showFieldsPanel();
            Y.one('.field-type').simulate('click');
            Y.Assert.isFalse(Y.one('.form-builder-field-settings').hasClass('modal-dialog-hidden'));
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');

            this._formBuilder.showFieldsPanel();
            Y.one('.field-type').simulate('click');
            Y.Assert.isTrue(Y.one('.form-builder-field-settings').hasClass('modal-dialog-hidden'));
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

        'should show the toolbar of field when clicked on configuration button of field': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText
                }]
            });

            Y.one('.form-builder-empty-col-add-button').simulate('click');

            Y.one('.field-type').simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');
            Y.Assert.isTrue(Y.one('.form-builder-field-toolbar').hasClass('hide'));

            Y.one('.form-builder-field-configuration').simulate('click');
            Y.Assert.isFalse(Y.one('.form-builder-field-toolbar').hasClass('hide'));
        },

        'should show the toolbar of field when touch on field': function() {
            var instance = this;

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText
                }]
            });

            Y.one('.form-builder-empty-col-add-button').simulate('click');

            Y.one('.field-type').simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');

            Y.one('.form-builder-field-content').simulateGesture('tap', {}, function() {
                instance.resume(function() {
                    Y.Assert.isFalse(Y.one('.form-builder-field-toolbar').hasClass('hide'));
                });
            });
            this.wait();
        },

        'shouldn\'t show the toolbar of field when touch on field in not mobile device': function() {
            var instance = this;

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText
                }]
            });

            Y.one('.form-builder-empty-col-add-button').simulate('click');

            Y.one('.field-type').simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');

            Y.one('.form-builder-field-content').simulateGesture('tap', {}, function() {
                instance.resume(function() {
                    Y.Assert.isTrue(Y.one('.form-builder-field-toolbar').hasClass('hide'));
                });
            });
            this.wait();
        },

        'should show field settings when clicked on editing button': function() {
            this.createFormBuilder({
                fieldTypes: [
                    {
                        fieldClass: Y.FormBuilderFieldSentence
                    },
                    {
                        defaultConfig: {
                            title: 'Title'
                        },
                        fieldClass: Y.FormBuilderFieldText
                    }
                ]
            });

            Y.one('.form-builder-empty-col-add-button').simulate('click');

            Y.all('.field-type').item(1).simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');
            Y.one('.form-builder-field-configuration').simulate('click');
            Y.Assert.isTrue(Y.one('.form-builder-field-settings').hasClass('modal-dialog-hidden'));

            Y.one('.form-builder-field-toolbar-edit').simulate('click');
            Y.Assert.isFalse(Y.one('.form-builder-field-settings').hasClass('modal-dialog-hidden'));
        },

        'should show a configuration button when mouse enter on field region': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText
                }]
            });

            Y.one('.form-builder-empty-col-add-button').simulate('click');

            Y.one('.field-type').simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');
            Y.one('.form-builder-field-content').simulate('mouseover');
            Y.Assert.isFalse(Y.one('.form-builder-field-configuration').hasClass('hide'));

            Y.one('.form-builder-field-content-toolbar').simulate('mouseout');
            Y.Assert.isTrue(Y.one('.form-builder-field-configuration').hasClass('hide'));
        },

        'should not show config button on mouseover if toolbar is already open': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText
                }]
            });

            Y.one('.form-builder-empty-col-add-button').simulate('click');

            Y.one('.field-type').simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');

            Y.one('.form-builder-field').simulate('mouseover');
            Y.one('.form-builder-field-configuration').simulate('click');
            Y.Assert.isTrue(Y.one('.form-builder-field-configuration').hasClass('hide'));

            Y.one('.form-builder-field').simulate('mouseover');
            Y.Assert.isTrue(Y.one('.form-builder-field-configuration').hasClass('hide'));
        },

        'should remove a field when clicking on remove button': function() {
            var col;

            this.createFormBuilder({
                fieldTypes: [{
                    defaultConfig: {
                        title: 'Title'
                    },
                    fieldClass: Y.FormBuilderFieldText
                }]
            });

            col = this._formBuilder.get('layout').get('rows')[1].get('cols')[0];
            col.get('node').one('.form-builder-empty-col-add-button').simulate('click');

            Y.one('.field-type').simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');
            Y.Assert.isNull(col.get('node').one('.form-builder-empty-col'));
            Y.Assert.isNotNull(col.get('node').one('.form-builder-field'));

            Y.one('.form-builder-field-configuration').simulate('click');
            Y.one('.form-builder-field-toolbar-remove').simulate('click');
            Y.Assert.isNotNull(col.get('node').one('.form-builder-empty-col'));
            Y.Assert.isNull(col.get('node').one('.form-builder-field'));

            Y.Assert.isFalse(col.get('movableContent'));
        },

        'should remove a nested field when clicking on remove button': function() {
            var col,
                nestedField;

            this.createFormBuilder();

            col = this._formBuilder.get('layout').get('rows')[1].get('cols')[2];
            nestedField = col.get('value').get('nestedFields')[0];
            nestedField.get('content').one('.form-builder-field-configuration').simulate('click');
            nestedField.get('content').one('.form-builder-field-toolbar-remove').simulate('click');

            Y.Assert.isNull(col.get('node').one('.form-builder-empty-col'));
            Y.Assert.areEqual(1, col.get('value').get('nestedFields').length);
        },

        'should close field configuration when clicked on editing button': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText
                }]
            });

            Y.one('.form-builder-empty-col-add-button').simulate('click');

            Y.one('.field-type').simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');
            Y.one('.form-builder-field-configuration').simulate('click');
            Y.Assert.isFalse(Y.one('.form-builder-field-toolbar').hasClass('hide'));

            Y.one('.form-builder-field-toolbar-close').simulate('click');
            Y.Assert.isTrue(Y.one('.form-builder-field-toolbar').hasClass('hide'));
        },

        'should not throw error if hiding settings panel before rendered': function() {
            this.createFormBuilder();

            this._formBuilder.hideFieldSettingsPanel();
            Y.Assert.isNull(Y.one('.form-builder-field-settings'));
        },

        'should fill initial empty columns with content': function() {
            this.createFormBuilder();

            Y.Assert.areEqual(
                2,
                Y.one('.form-builder-layout').all('.form-builder-empty-col').size()
            );
        },

        'should turn col with null value into empty column': function() {
            var col;

            this.createFormBuilder();

            col = this._formBuilder.get('layout').get('rows')[1].get('cols')[2];
            col.set('value', null);

            Y.Assert.isNotNull(col.get('node').one('.form-builder-empty-col'));
        },

        'should fill empty columns for new rows': function() {
            this.createFormBuilder();

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
                Y.one('.form-builder-layout').all('.form-builder-empty-col').size()
            );
        },

        'should fill empty columns for new cols': function() {
            this.createFormBuilder();

            this._formBuilder.get('layout').get('rows')[1].set('cols', [
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
                Y.one('.form-builder-layout').all('.form-builder-empty-col').size()
            );
        },

        'should fill empty columns for new layouts': function() {
            this.createFormBuilder();

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
                Y.all('.form-builder-empty-col').size()
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
                Y.all('.form-builder-empty-col').size()
            );
        },

        'should make empty columns unmovable': function() {
            var emptyCol;

            this.createFormBuilder();
            emptyCol = this._formBuilder.get('layout').get('rows')[1].get('cols')[0];

            Y.Assert.isFalse(emptyCol.get('movableContent'));
        },

        'should add a field to a column': function() {
            var col,
                colNode,
                modal;

            this.createFormBuilder({
                fieldTypes: [{
                    defaultConfig: {
                        title: 'Title'
                    },
                    fieldClass: Y.FormBuilderFieldText,
                    label: 'Text'
                }]
            });

            colNode = Y.one('.form-builder-empty-col-add-button');
            colNode.simulate('click');

            modal = Y.one('.form-builder-modal');
            Y.Assert.isNotNull(modal, 'Field types modal should have been opened');

            modal.one('.field-type').simulate('click');

            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');

            col = this._formBuilder.get('layout').get('rows')[1].get('cols')[0];
            Y.Assert.isTrue(Y.instanceOf(col.get('value'), Y.FormBuilderFieldText));
        },

        'should not allow creating fields without required data': function() {
            var settingsModal;

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    label: 'Text'
                }]
            });

            Y.one('.form-builder-empty-col-add-button').simulate('click');
            Y.one('.form-builder-modal').one('.field-type').simulate('click');

            settingsModal = Y.one('.form-builder-field-settings');
            Y.Assert.isNotNull(settingsModal);
            Y.Assert.areNotEqual('none', settingsModal.getStyle('display'));

            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');
            Y.Assert.areNotEqual('none', settingsModal.getStyle('display'));

            settingsModal.one('input[type="text"]').set('value', 'My Title');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');
            Y.Assert.areEqual('none', settingsModal.getStyle('display'));
        },

        'should make field columns movable': function() {
            var col;

            this.createFormBuilder({
                fieldTypes: [{
                    defaultConfig: {
                        title: 'Title'
                    },
                    fieldClass: Y.FormBuilderFieldText,
                    label: 'Text'
                }]
            });

            col = this._formBuilder.get('layout').get('rows')[1].get('cols')[0];
            col.get('node').one('.form-builder-empty-col-add-button').simulate('click');

            Y.one('.form-builder-modal').one('.field-type').simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');

            Y.Assert.isTrue(col.get('movableContent'));
        },

        'should change to layout mode when menu button is clicked': function() {
            var contentBox;

            this.createFormBuilder();

            contentBox = this._formBuilder.get('contentBox');
            contentBox.one('.form-builder-menu-button').simulate('click');
            contentBox.one('.form-builder-edit-layout-button').simulate('click');

            Y.Assert.areEqual(Y.FormBuilder.MODES.LAYOUT, this._formBuilder.get('mode'));

            contentBox.one('.form-builder-header-back').simulate('click');
            Y.Assert.areEqual(Y.FormBuilder.MODES.REGULAR, this._formBuilder.get('mode'));
        },

        'souhld show corret label when open settings editor': function() {
            var col;

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    label: 'Text'
                }]
            });

            col = this._formBuilder.get('layout').get('rows')[1].get('cols')[0];
            col.get('node').one('.form-builder-empty-col-add-button').simulate('click');

            Y.one('.form-builder-modal').one('.field-type').simulate('click');
            Y.one('.form-builder-field-settings-save').simulate('click');
            Y.one('.form-builder-field-toolbar-edit').simulate('click');

            Y.Assert.areEqual(Y.one('.modal-header').getHTML(), 'Text');
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
