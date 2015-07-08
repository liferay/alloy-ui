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

        /**
         * Creates a new form builder instance with the given config.
         *
         * @method createFormBuilder
         * @param {Object} config
         * @return {Y.FormBuilder}
         */
        createFormBuilder: function(config) {
            var layout = new Y.Layout({
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
                                value: new Y.FormBuilderFieldList({
                                fields: [
                                    new Y.FormBuilderFieldSentence({
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
                                ]
                            })
                            })
                        ]
                    })
                ]
            });

            this._formBuilder = new Y.FormBuilder(Y.merge({
                fieldTypes: [
                    {
                        defaultConfig: {
                            title: 'Title'
                        },
                        fieldClass: Y.FormBuilderFieldSentence,
                        label: 'Sentence'
                    },
                    {
                        defaultConfig: {
                            title: 'Title'
                        },
                        fieldClass: Y.FormBuilderFieldText,
                        label: 'Text'
                    }
                ],
                layouts: [layout]
            }, config)).render('#container');

            return this._formBuilder;
        },

        /**
         * Creates a new row, clicking on the appropriate button.
         *
         * @method _clickAddRowButton
         * @protected
         */
        _clickAddRowButton: function() {
            var rowButton = Y.one('.layout-builder-add-row-choose-row');

            if (!rowButton) {
                rowButton = Y.one('.layout-builder-add-row-small-screen');
            }

            rowButton.simulate('click');
        },

        /**
         * Clicks on the first button for creating a new field.
         *
         * @method_clickCreateNewField
         * @protected
         */
        _clickCreateNewField: function() {
            Y.one('.form-builder-field-list-add-button-circle').simulate('click');
        },

        /**
         * Clicks on the first field type in the field type modal.
         *
         * @method _clickFieldType
         * @protected
         */
        _clickFieldType: function() {
            Y.one('.field-type').simulate('click');
        },

        /**
         * Clicks on the save button for the field settings modal.
         *
         * @method _clickFieldSettingsSaveButton
         * @protected
         */
        _clickFieldSettingsSaveButton: function() {
            Y.one('.form-builder-field-settings-save').simulate('mousemove');
            Y.one('.form-builder-field-settings-save').simulate('click');
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

        'should have default empty layout': function() {
            this._formBuilder = new Y.FormBuilder().render('#container');

            Y.Assert.isNotNull(this._formBuilder.getActiveLayout());
            Y.Assert.areEqual(1, this._formBuilder.getActiveLayout().get('rows').length);
        },

        'should edit field and save correctly after closing modal through esc': function() {
            var field,
                layout,
                row;

            layout = new Y.Layout({
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
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldText({
                                            help: 'help',
                                            title: 'Title'
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            });

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    label: 'Text'
                }],
                layouts: [layout]
            });

            this._clickCreateNewField();
            Y.one('body').simulate('keydown', {
                keyCode: 27
            });

            row = this._formBuilder.getActiveLayout().get('rows')[1].get('cols')[0];
            Y.Assert.isNotNull(row.get('value').get('fields'));

            field = Y.one('.form-builder-field').getData('field-instance');
            this._formBuilder.editField(field);

            Y.one('.form-builder-field-settings-content').all('input[type="text"]').item(0).set('value', 'My Title');

            this._clickFieldSettingsSaveButton();

            Y.Assert.isNotNull(row.get('value').get('fields'));
        },

        'should show field settings when editField method is called': function() {
            var field;

            this.createFormBuilder();

            this._clickCreateNewField();
            this._clickFieldType();
            this._clickFieldSettingsSaveButton();

            field = Y.one('.form-builder-field').getData('field-instance');
            this._formBuilder.editField(field);
            Y.Assert.isFalse(Y.one('.form-builder-field-settings').hasClass('modal-dialog-hidden'));
        },

        'should create unremovable layout column for column with form': function() {
            var cols;

            this.createFormBuilder();

            cols = this._formBuilder.getActiveLayout().get('rows')[0].get('cols');

            Y.Assert.isTrue(cols[0].get('removable'));
            Y.Assert.isTrue(cols[1].get('removable'));
            Y.Assert.isFalse(cols[2].get('removable'));
        },

        'should add a field in nested when addNestedField method is called': function() {
            var currentCol,
                field,
                nestedField,
                originalNestedFieldLength;

            this.createFormBuilder();
            currentCol = this._formBuilder.getActiveLayout().get('rows')[0].get('cols')[2];

            nestedField = currentCol.get('value').get('fields')[0].get('nestedFields');
            originalNestedFieldLength = nestedField.length;

            field = Y.one('.form-builder-field').getData('field-instance');
            this._formBuilder.addNestedField(field);
            this._clickFieldType();
            this._clickFieldSettingsSaveButton();

            Y.Assert.isTrue(nestedField.length > originalNestedFieldLength);
        },

        'should remove a field when removeField method is called': function() {
            var col,
                field;

            this.createFormBuilder();

            field = Y.one('.form-builder-field').getData('field-instance');
            col = field.get('content').ancestor('.col').getData('layout-col');

            Y.Assert.areEqual(1, col.get('value').get('fields').length);

            this._formBuilder.removeField(field);
            Y.Assert.isNull(col.get('node').one('.form-builder-field'));
            Y.Assert.areEqual(0, col.get('value').get('fields').length);
        },

        'should remove a nested field when clicking on remove button': function() {
            var col,
                nestedField,
                nestedFields;

            this.createFormBuilder();

            col = this._formBuilder.getActiveLayout().get('rows')[0].get('cols')[2];
            nestedFields = col.get('value').get('fields')[0].get('nestedFields');
            nestedField = nestedFields[0];
            this._formBuilder.removeField(nestedField);

            Y.Assert.areEqual(1, nestedFields.length);
        },

        'should update removable rows before a row is moved': function() {
            var activeLayout;

            this.createFormBuilder();

            activeLayout = this._formBuilder.getActiveLayout();

            Y.Assert.areEqual(2, activeLayout.get('rows').length);
            Y.Assert.isTrue(activeLayout.get('rows')[0].get('removable'));
            Y.Assert.isFalse(activeLayout.get('rows')[1].get('removable'));

            Y.one('.layout-builder-move-cut-button').simulate('click');
            Y.one('.layout-builder-move-row-target').simulate('click');

            Y.Assert.areEqual(3, activeLayout.get('rows').length);
            Y.Assert.isTrue(activeLayout.get('rows')[0].get('removable'));
            Y.Assert.isTrue(activeLayout.get('rows')[1].get('removable'));
            Y.Assert.isFalse(activeLayout.get('rows')[2].get('removable'));
        },

        'should resize the row when a nested field is edited': function() {
            var field,
                heightAfterMode,
                heightBeforeMode,
                settingsPane;

            this.createFormBuilder();

            heightAfterMode = Y.all('.layout-row-container-row').item(0).getStyle('height');

            field = Y.one('.form-builder-field-nested .form-builder-field').getData('field-instance');
            this._formBuilder.editField(field);

            settingsPane = Y.one('.form-builder-field-settings');
            settingsPane.all('.radio-group-data-editor-button').item(1).simulate('click');

            this._clickFieldSettingsSaveButton();

            heightBeforeMode = Y.all('.layout-row-container-row').item(0).getStyle('height');

            Y.Assert.isTrue(heightAfterMode < heightBeforeMode);
        },

        'should fill initial empty columns with content': function() {
            this.createFormBuilder();

            Y.Assert.areEqual(
                4,
                Y.one('.form-builder-layout').all('.form-builder-field-list').size()
            );
        },

        'should fill empty columns for new rows': function() {
            this.createFormBuilder();

            this._formBuilder.getActiveLayout().addRow(0, new Y.LayoutRow({
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
                5,
                Y.one('.form-builder-layout').all('.form-builder-field-list').size()
            );
        },

        'should fill empty columns for new cols': function() {
            this.createFormBuilder();

            this._formBuilder.getActiveLayout().get('rows')[1].set('cols', [
                new Y.LayoutCol({
                    size: 6
                }),
                new Y.LayoutCol({
                    size: 6,
                    value: {content: 'Something'}
                })
            ]);

            Y.Assert.areEqual(
                5,
                Y.one('.form-builder-layout').all('.form-builder-field-list').size()
            );
        },

        'should fill empty columns for new layouts': function() {
            var layout = new Y.Layout({
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
            });

            this.createFormBuilder();

            this._formBuilder.set('layouts', [layout]);

            Y.Assert.areEqual(
                2,
                Y.all('.form-builder-field-list').size()
            );

            this._formBuilder.getActiveLayout().addRow(0, new Y.LayoutRow({
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
                Y.all('.form-builder-field-list').size()
            );
        },

        'should open field types modal': function() {
            this.createFormBuilder();

            this._clickCreateNewField();
            Y.Assert.isNotNull(Y.one('.form-builder-modal'), 'Field types modal should have been opened');
        },

        'should add a field to a column': function() {
            var col,
                fields;

            this.createFormBuilder();
            col = this._formBuilder.getActiveLayout().get('rows')[0].get('cols')[0];
            fields = col.get('value').get('fields');
            Y.Assert.areEqual(0, fields.length);

            this._clickCreateNewField();
            this._clickFieldType();
            this._clickFieldSettingsSaveButton();

            Y.Assert.isTrue(Y.instanceOf(fields[0], Y.FormBuilderFieldSentence));
        },

        'should show corret label when open settings editor': function() {
            var field;

            this.createFormBuilder();

            field = Y.one('.form-builder-field').getData('field-instance');
            this._formBuilder.editField(field);
            Y.Assert.areEqual(Y.one('.form-builder-field-settings-label').getHTML(), 'Sentence');

            field = Y.all('.form-builder-field').item(1).getData('field-instance');
            Y.one('.form-builder-field-settings-cancel').simulate('mousemove');
            Y.one('.form-builder-field-settings-cancel').simulate('click');
            this._formBuilder.editField(field);
            Y.Assert.areEqual(Y.one('.form-builder-field-settings-label').getHTML(), 'Text');
        },

        'should disable adding unique field already used by creating one': function() {
            var layout;

            layout = new Y.Layout({
                rows: [new Y.LayoutRow()]
            });

            this.createFormBuilder({
                fieldTypes: [{
                    defaultConfig: {
                        title: 'Title'
                    },
                    fieldClass: Y.FormBuilderFieldSentence,
                    unique: true
                }],
                layouts: [layout]
            });

            this._clickCreateNewField();
            this._clickFieldType();
            this._clickFieldSettingsSaveButton();

            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should enable unique type after its last instance is removed': function() {
            var field;

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldSentence,
                    unique: true
                }]
            });

            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
            this._formBuilder.hideFieldsPanel();

            field = Y.one('.form-builder-field').getData('field-instance');
            this._formBuilder.removeField(field);

            this._formBuilder.showFieldsPanel();
            Y.Assert.isFalse(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should disable adding unique field already used when setting a new layout': function() {
            var layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 4,
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldText({
                                            title: 'Title'
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            });

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    unique: true
                }],
                layouts: [new Y.Layout()]
            });

            this._formBuilder.showFieldsPanel();
            Y.Assert.isFalse(Y.one('.field-type').hasClass('field-type-disabled'));
            this._formBuilder.hideFieldsPanel();

            this._formBuilder.set('layouts', [layout]);

            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should disable adding unique field already used when setting a new column': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    unique: true
                }],
                layouts: [new Y.Layout()]
            });

            this._formBuilder.showFieldsPanel();
            Y.Assert.isFalse(Y.one('.field-type').hasClass('field-type-disabled'));
            this._formBuilder.hideFieldsPanel();

            this._formBuilder.getActiveLayout().set('rows',
                [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 4,
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldText({
                                            title: 'Monarch'
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            );

            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should disable adding unique field already used when setting a new row': function() {
            var layout;

            layout = new Y.Layout({
                rows: [new Y.LayoutRow()]
            });

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    unique: true
                }],
                layouts: [layout]
            });

            this._formBuilder.showFieldsPanel();
            Y.Assert.isFalse(Y.one('.field-type').hasClass('field-type-disabled'));
            this._formBuilder.hideFieldsPanel();

            this._formBuilder.getActiveLayout().get('rows')[0].set('cols', [
                new Y.LayoutCol({
                    size: 12,
                    value: new Y.FormBuilderFieldList({
                        fields: [
                            new Y.FormBuilderFieldText({
                                help: 'not just anybody',
                                title: 'Monarch'
                            })
                        ]
                    })
                })
            ]);

            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should open new field type selection when key press on add field button': function() {
            var addFieldButton;

            this.createFormBuilder();

            addFieldButton = Y.one('.form-builder-field-list-add-button-circle');
            addFieldButton.focus();
            addFieldButton.simulate('keydown', {
                keyCode: 13
            });

            this._formBuilder._fieldTypesModal.get('visible');

            Y.Assert.isTrue(this._formBuilder._fieldTypesModal.get('visible'));
        },

        'should show toolbar settings only when focus on a field': function() {
            var node;

            this.createFormBuilder();

            node = Y.one('.form-builder-field');

            this._formBuilder._onFocus({ target: node });

            Y.Assert.isNotNull(Y.one('.form-builder-field-toolbar'));

            node = Y.one('.form-builder-field-list-add-button');

            this._formBuilder._onFocus({ target: node });

            Y.Assert.isNull(Y.one('.form-builder-field-toolbar'));
        },

        'should be able to create a layout using an object instead of an instance of Layout': function() {
            var config,
                layout;

            layout = {
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 12
                            })
                        ]
                    })
                ]
            };

            config = {
                layouts: [layout]
            };

            this.createFormBuilder(config);
            Y.Assert.isTrue(Y.instanceOf(this._formBuilder.getActiveLayout(), Y.Layout));
        },

        'should fire create event after a new field has been created': function() {
            var created = false,
                field;

            this.createFormBuilder();
            this._formBuilder.on('create', function (event) {
                field = event.field;
                created = true;
            });

            this._clickCreateNewField();
            Y.Assert.isFalse(created);

            this._clickFieldType();
            Y.Assert.isFalse(created);

            this._clickFieldSettingsSaveButton();
            Y.Assert.isTrue(created);

            Y.Assert.areEqual(Y.one('.form-builder-field').getData('field-instance'), field);
        },

        'should fire edit event after a field has been edited': function() {
            var edited = false,
                field,
                settingsPane;

            this.createFormBuilder();
            this._formBuilder.on('edit', function (event) {
                Y.Assert.areEqual(field, event.field);
                edited = true;
            });

            field = Y.one('.form-builder-field-nested .form-builder-field').getData('field-instance');
            this._formBuilder.editField(field);
            Y.Assert.isFalse(edited);

            settingsPane = Y.one('.form-builder-field-settings');
            settingsPane.all('.radio-group-data-editor-button').item(1).simulate('click');

            Y.Assert.isFalse(edited);

            this._clickFieldSettingsSaveButton();
            Y.Assert.isTrue(edited);
        },

        'should fire remove event after a field has been removed': function() {
            var col,
                field,
                removed = false;

            this.createFormBuilder();
            this._formBuilder.on('remove', function (event) {
                Y.Assert.areEqual(field, event.field);
                removed = true;
            });

            field = Y.one('.form-builder-field').getData('field-instance');
            col = field.get('content').ancestor('.col').getData('layout-col');

            this._formBuilder.removeField(field);
            Y.Assert.isTrue(removed);
        },

        'should add a new page when add page button clicked': function() {
            this.createFormBuilder();

            Y.Assert.areEqual(1, this._formBuilder.get('layouts').length);
            Y.one('.form-builder-pages-add-page').simulate('click');
            Y.Assert.areEqual(2, this._formBuilder.get('layouts').length);
        },

        'should remove the current page when remove page button clicked': function() {
            this.createFormBuilder({
                layouts: [new Y.Layout(), new Y.Layout()]
            });

            Y.Assert.areEqual(2, this._formBuilder.get('layouts').length);
            Y.one('.form-builder-pages-remove-page').simulate('click');
            Y.Assert.areEqual(1, this._formBuilder.get('layouts').length);
            Y.one('.form-builder-pages-remove-page').simulate('click');
            Y.Assert.areEqual(1, this._formBuilder.get('layouts').length);
        },

        'should update page when page selected': function() {
            this.createFormBuilder();

            Y.one('.form-builder-pages-add-page').simulate('click');

            Y.Assert.areEqual(1, this._formBuilder.getActiveLayout().get('rows').length);
            Y.one('.pagination-control').simulate('click');
            Y.Assert.areEqual(2, this._formBuilder.getActiveLayout().get('rows').length);
            Y.one('.pagination-control').simulate('click');
            Y.Assert.areEqual(1, this._formBuilder.getActiveLayout().get('rows').length);
        },

        'should only update the DOM content when setting list of layouts after form builder is rendered': function() {
            var markup,
                formbuilder = new Y.FormBuilder({
                    layouts: [new Y.Layout(), new Y.Layout()],
                });

            Y.one('#container').empty();

            markup = Y.one('#container').get('innerHTML');

            formbuilder.set('layouts', [new Y.Layout()]);
            Y.Assert.areEqual(markup, Y.one('#container').get('innerHTML'));

            formbuilder.render('#container');

            formbuilder.set('layouts', [new Y.Layout(), new Y.Layout()]);
            Y.Assert.areNotEqual(markup, Y.one('#container').get('innerHTML'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: [
        'aui-form-builder',
        'aui-form-builder-field-sentence',
        'aui-form-builder-field-text',
        'node-event-simulate',
        'test'
    ],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
