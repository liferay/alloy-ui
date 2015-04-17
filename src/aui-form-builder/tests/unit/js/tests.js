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
            Y.one('.form-builder-empty-col-add-button').simulate('click');
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

            Y.Assert.isNotNull(this._formBuilder.get('layout'));
            Y.Assert.areEqual(2, this._formBuilder.get('layout').get('rows').length);
        },

        'should not show message if layout is not empty': function() {
            this.createFormBuilder();

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

        'should add page break to layout that doesn\'t have one': function() {
            this.createFormBuilder();

            Y.Assert.areEqual(3, Y.all('.layout-row').size());
        },

        'should not add page break to layout that has one': function() {
            this.createFormBuilder({
                layout: new Y.Layout({
                    rows: [
                        new Y.FormBuilderPageBreakRow()
                    ]
                })
            });

            Y.Assert.areEqual(2, Y.all('.layout-row').size());
        },

        'should add a new page break on form': function() {
            var formBuilder = this.createFormBuilder();

            formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');
            Y.Assert.areEqual(2, Y.all('.form-builder-page-break-row').size());
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

            Y.Assert.areEqual('Untitled Page 1/' + 1, Y.one('.form-builder-page-break-title').get('value'));

            formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');

            Y.Assert.areEqual('Untitled Page 1/' + 2, Y.one('.form-builder-page-break-title').get('value'));

            formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');
            formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');
            Y.Assert.areEqual('Untitled Page 1/' + 4, Y.one('.form-builder-page-break-title').get('value'));
        },

        'should update page breaks when one is removed': function() {
            var row;

            this.createFormBuilder();
            this._formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');
            this._formBuilder.get('contentBox').one('.form-builder-add-page-break').simulate('click');

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);

            row = this._formBuilder.get('layout').get('rows')[3];
            this._formBuilder.get('layout').removeRow(row);
            Y.Assert.areEqual(2, Y.all('.form-builder-page-break-row').size());

            row = this._formBuilder.get('layout').get('rows')[3];
            Y.Assert.areEqual(2, row.get('index'));
            Y.Assert.areEqual(2, row.get('quantity'));
        },

        'should edit field and save correctly after closing modal through esc': function() {
            var field,
                row;

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    label: 'Text'
                }],
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
                                    value: new Y.FormBuilderFieldText({
                                        help: 'help',
                                        title: 'Title'
                                    })
                                })
                            ]
                        })
                    ]
                })
            });

            this._clickCreateNewField();
            Y.one('body').simulate('keydown', {
                keyCode: 27
            });

            row = this._formBuilder.get('layout').get('rows')[1].get('cols')[0];
            Y.Assert.isNotNull(row.get('node').all('.form-builder-empty-col').item(0));

            field = Y.one('.form-builder-field').getData('field-instance');
            this._formBuilder.editField(field);

            Y.one('.form-builder-field-settings-content').all('input[type="text"]').item(0).set('value', 'My Title');

            this._clickFieldSettingsSaveButton();

            Y.Assert.isNotNull(row.get('node').all('.form-builder-empty-col').item(0));
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

        'should add a field in nested when addNestedField method is called': function() {
            var field,
                nestedField,
                originalNestedFieldLength;

            this.createFormBuilder();

            nestedField = this._formBuilder.get('layout').get('rows')[1].get('cols')[2].get('value').get('nestedFields');
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

            this._formBuilder.removeField(field);
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
            this._formBuilder.removeField(nestedField);

            Y.Assert.isNull(col.get('node').one('.form-builder-empty-col'));
            Y.Assert.areEqual(1, col.get('value').get('nestedFields').length);
        },

        'should resize the row when a nested field is edited': function() {
            var field,
                heightAfterMode,
                heightBeforeMode,
                settingsPane;

            this.createFormBuilder();

            heightAfterMode = Y.all('.layout-row-container-row').item(1).getStyle('height');

            field = Y.one('.form-builder-field-nested .form-builder-field').getData('field-instance');
            this._formBuilder.editField(field);

            settingsPane = Y.one('.form-builder-field-settings');
            settingsPane.all('.radio-group-data-editor-button').item(1).simulate('click');

            this._clickFieldSettingsSaveButton();

            heightBeforeMode = Y.all('.layout-row-container-row').item(1).getStyle('height');

            Y.Assert.isTrue(heightAfterMode < heightBeforeMode);
        },

        'should fill initial empty columns with content': function() {
            this.createFormBuilder();

            Y.Assert.areEqual(
                5,
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
                6,
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
                4,
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

        'should open field types modal': function() {
            this.createFormBuilder();

            this._clickCreateNewField();
            Y.Assert.isNotNull(Y.one('.form-builder-modal'), 'Field types modal should have been opened');
        },

        'should add a field to a column': function() {
            var col;

            this.createFormBuilder();
            col = this._formBuilder.get('layout').get('rows')[1].get('cols')[0];
            Y.Assert.isFalse(Y.instanceOf(col.get('value'), Y.FormBuilderFieldSentence));

            this._clickCreateNewField();
            this._clickFieldType();
            this._clickFieldSettingsSaveButton();

            Y.Assert.isTrue(Y.instanceOf(col.get('value'), Y.FormBuilderFieldSentence));
        },

        'should make field columns movable': function() {
            var col;

            this.createFormBuilder();

            col = this._formBuilder.get('layout').get('rows')[1].get('cols')[0];
            Y.Assert.isFalse(col.get('movableContent'));

            this._clickCreateNewField();
            this._clickFieldType();
            this._clickFieldSettingsSaveButton();

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

        'should change to layout mode when menu button is key pressed': function() {
            var contentBox;

            this.createFormBuilder();

            contentBox = this._formBuilder.get('contentBox');
            contentBox.one('.form-builder-menu-button').simulate('keypress', { keyCode: 13 });
            contentBox.one('.form-builder-edit-layout-button').simulate('keypress', { keyCode: 13 });

            Y.Assert.areEqual(Y.FormBuilder.MODES.LAYOUT, this._formBuilder.get('mode'));

            contentBox.one('.form-builder-header-back').simulate('keypress', { keyCode: 13 });
            Y.Assert.areEqual(Y.FormBuilder.MODES.REGULAR, this._formBuilder.get('mode'));
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
            this.createFormBuilder({
                fieldTypes: [{
                    defaultConfig: {
                        title: 'Title'
                    },
                    fieldClass: Y.FormBuilderFieldSentence,
                    unique: true
                }],
                layout: new Y.Layout({
                    rows: [new Y.LayoutRow()]
                })
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
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    unique: true
                }],
                layout: new Y.Layout()
            });

            this._formBuilder.showFieldsPanel();
            Y.Assert.isFalse(Y.one('.field-type').hasClass('field-type-disabled'));
            this._formBuilder.hideFieldsPanel();

            this._formBuilder.set('layout',
                new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4,
                                    value: new Y.FormBuilderFieldText({
                                        title: 'Title'
                                    })
                                })
                            ]
                        })
                    ]
                })
            );

            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should disable adding unique field already used when setting a new column': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    unique: true
                }],
                layout: new Y.Layout()
            });

            this._formBuilder.showFieldsPanel();
            Y.Assert.isFalse(Y.one('.field-type').hasClass('field-type-disabled'));
            this._formBuilder.hideFieldsPanel();

            this._formBuilder.get('layout').set('rows',
                [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 4,
                                value: new Y.FormBuilderFieldText({
                                    title: 'Monarch'
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
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    unique: true
                }],
                layout: new Y.Layout({
                    rows: [new Y.LayoutRow()]
                })
            });

            this._formBuilder.showFieldsPanel();
            Y.Assert.isFalse(Y.one('.field-type').hasClass('field-type-disabled'));
            this._formBuilder.hideFieldsPanel();

            this._formBuilder.get('layout').get('rows')[1].set('cols', [
                new Y.LayoutCol({
                    size: 12,
                    value: new Y.FormBuilderFieldText({
                        help: 'not just anybody',
                        title: 'Monarch'
                    })
                })
            ]);

            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should open new field type selection when key press on add field button': function() {
            var addFieldButton;

            this.createFormBuilder();

            addFieldButton = Y.one('.form-builder-empty-col-add-button');
            addFieldButton.focus();
            addFieldButton.simulate('keydown', {
                keyCode: 13
            });

            this._formBuilder._fieldTypesModal.get('visible');

            Y.Assert.isTrue(this._formBuilder._fieldTypesModal.get('visible'));
        },

        'should show toolbar settings when focus on a field': function() {
            var node;

            this.createFormBuilder();

            node = Y.one('.form-builder-field');

            this._formBuilder._onFocus({ target: node });

            Y.Assert.isNotNull(Y.one('.form-builder-field-toolbar'));
        },

        'should be able to create a layout using an object instead of an instance of Layout': function() {
            var config = {
                layout: {
                    rows: [
                        new Y.FormBuilderPageBreakRow({
                            index: 1,
                            quantity: 2
                        }),
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 12
                                })
                            ]
                        })
                    ]
                }
            };

            this.createFormBuilder(config);
            Y.Assert.isTrue(Y.instanceOf(this._formBuilder.get('layout'), Y.Layout));
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
