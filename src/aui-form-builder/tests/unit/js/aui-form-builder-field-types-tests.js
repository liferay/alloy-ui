YUI.add('aui-form-builder-field-types-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-types');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Field Types Unit Tests',

        tearDown: function() {
            this._formBuilder && this._formBuilder.destroy();
        },

        createFormBuilder: function(config) {
            var layout;

            layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 6,
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldText({
                                            help: 'Help',
                                            title: 'Title'
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
                        fieldClass: Y.FormBuilderFieldText,
                        label: 'Text'
                    }
                ],
                layouts: [layout] 
            }, config)).render('#container');
        },

        'should add a new field type on form': function() {
            this.createFormBuilder();

            this._formBuilder.showFieldsPanel();

            this._formBuilder.registerFieldTypes([{
                icon: 'icon1'
            }]);
            Y.Assert.isNotNull(Y.one('.icon1'));
            this._formBuilder.registerFieldTypes([
                new Y.FormBuilderFieldType({
                    icon: 'icon2'
                })
            ]);
            Y.Assert.isNotNull(Y.one('.icon2'));
        },

        'should remove a field type from form': function() {
            var fieldType1 = new Y.FormBuilderFieldType({
                icon: 'icon-test'
            });

            this.createFormBuilder();
            this._formBuilder.showFieldsPanel();
            this._formBuilder.registerFieldTypes(fieldType1);
            this._formBuilder.unregisterFieldTypes(fieldType1);

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

        'should ignore removing unexisting field type from form': function() {
            this.createFormBuilder();
            this._formBuilder.showFieldsPanel();
            this._formBuilder.registerFieldTypes(new Y.FormBuilderFieldType({icon: 'icon-test'}));
            this._formBuilder.unregisterFieldTypes(new Y.FormBuilderFieldType({icon: 'icon-test'}));

            Y.Assert.isNotNull(Y.one('.icon-test'));
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

        'should find field type of field': function() {
            var fieldType1,
                fieldType2,
                Field1 = function() {},
                Field2 = function() {};

            fieldType1 = new Y.FormBuilderFieldType({
                fieldClass: Field1
            });
            fieldType2 = new Y.FormBuilderFieldType({
                fieldClass: Field2
            });

            this.createFormBuilder({
                fieldTypes: [fieldType1, fieldType2]
            });

            Y.Assert.areSame(fieldType1, this._formBuilder.findTypeOfField(new Field1()));
            Y.Assert.areSame(fieldType2, this._formBuilder.findTypeOfField(new Field2()));
        },

        'should not render field types before necessary': function() {
            this.createFormBuilder();
            Y.Assert.isNull(Y.one('.form-builder-modal'));

            this._formBuilder.showFieldsPanel();
            Y.Assert.isNotNull(Y.one('.form-builder-modal'));
        },

        'should not throw error when hiding the panel before rendered': function() {
            this.createFormBuilder();

            this._formBuilder.hideFieldsPanel();
            Y.Assert.isNull(Y.one('.form-builder-modal'));
        },

        'should show the form builder modal': function() {
            var formBuilderModal;

            this.createFormBuilder();
            formBuilderModal = Y.one('.form-builder-modal');
            Y.Assert.isNull(formBuilderModal);

            this._formBuilder.showFieldsPanel();
            formBuilderModal = Y.one('.form-builder-modal');
            Y.Assert.isFalse(formBuilderModal.hasClass('modal-dialog-hidden'));

            this._formBuilder.hideFieldsPanel();
            Y.Assert.isTrue(formBuilderModal.hasClass('modal-dialog-hidden'));

            this._formBuilder.showFieldsPanel();
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

        'should open settings editor for the clicked field type': function() {
            var mock = new Y.Mock();

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'fieldClass'
            });
            mock.fieldClass.prototype.renderSettingsPanel = function() {};
            mock.fieldClass.prototype.on = function() {};

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

        'should open settings editor for the keypressed field type': function() {
            var mock = new Y.Mock();

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'fieldClass'
            });
            mock.fieldClass.prototype.renderSettingsPanel = function() {};
            mock.fieldClass.prototype.on = function() {};

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: mock.fieldClass,
                    label: 'My Field'
                }]
            });

            this._formBuilder.showFieldsPanel();

            Y.one('.field-type').simulate('keydown', { keyCode: 13 });

            Y.Mock.verify(mock);
        },

        'should not be able to click on a disabled field': function() {
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

        'should not be able to click on a used unique field': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldText,
                    unique: true
                }]
            });

            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should be able to click on an unused unique field': function() {
            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: Y.FormBuilderFieldSentence,
                    unique: true
                }]
            });

            this._formBuilder.showFieldsPanel();
            Y.Assert.isFalse(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should consider nested fields when checking if unique field is used': function() {
            var layout;

            layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 6,
                                value: new Y.FormBuilderFieldList({
                                fields: [
                                    new Y.FormBuilderFieldText({
                                        help: 'Help',
                                        nestedFields: [
                                            new Y.FormBuilderFieldText({
                                                help: 'Help',
                                                title: 'Title'
                                            })
                                        ],
                                        title: 'Title'
                                    })
                                ]
                            })
                            }),
                            new Y.LayoutCol({
                                size: 6,
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldText({
                                            help: 'Help',
                                            nestedFields: [
                                                new Y.FormBuilderFieldText({
                                                    help: 'Help',
                                                    nestedFields: [
                                                        new Y.FormBuilderFieldSentence({
                                                            help: 'Help',
                                                            title: 'Title'
                                                        })
                                                    ],
                                                    title: 'Title'
                                                })
                                            ],
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
                    fieldClass: Y.FormBuilderFieldSentence,
                    unique: true
                }],
                layouts: [layout]
            });
            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should disable used unique types after update': function() {
            var layout;
            layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 6,
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldSentence({
                                            help: 'Help',
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
                fieldTypes: [
                    {
                        fieldClass: Y.FormBuilderFieldSentence,
                        unique: true
                    },
                    {
                        fieldClass: Y.FormBuilderFieldText
                    }
                ]
            });

            this._formBuilder.set('layouts', [layout]);
            this._formBuilder.showFieldsPanel();
            Y.Assert.isTrue(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should enable unused unique types after update': function() {
            this.createFormBuilder({
                fieldTypes: [
                    {
                        fieldClass: Y.FormBuilderFieldText,
                        unique: true
                    }
                ]
            });

            this._formBuilder.set('layouts', [new Y.Layout()]);
            this._formBuilder.showFieldsPanel();
            Y.Assert.isFalse(Y.one('.field-type').hasClass('field-type-disabled'));
        },

        'should disable field type of field if unique': function() {
            var fieldType1,
                fieldType2,
                Field1 = function() {},
                Field2 = function() {};

            fieldType1 = new Y.FormBuilderFieldType({
                fieldClass: Field1
            });
            fieldType2 = new Y.FormBuilderFieldType({
                fieldClass: Field2,
                unique: true
            });

            this.createFormBuilder({
                fieldTypes: [fieldType1, fieldType2]
            });

            this._formBuilder.disableUniqueFieldType(new Field1());
            this._formBuilder.disableUniqueFieldType(new Field2());

            Y.Assert.isFalse(fieldType1.get('disabled'));
            Y.Assert.isTrue(fieldType2.get('disabled'));
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
