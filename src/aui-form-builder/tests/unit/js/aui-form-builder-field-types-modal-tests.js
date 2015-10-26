YUI.add('aui-form-builder-field-types-modal-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-types-modal');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Field Types Modal Unit Tests',

        tearDown: function() {
            this._fieldTypesModal && this._fieldTypesModal.destroy();
        },

        createFieldTypesSettingsModal: function(config) {
            this._fieldTypesModal = new Y.FormBuilderFieldTypesModal(
                Y.merge({
                    centered: true,
                    cssClass: 'form-builder-modal',
                    draggable: false,
                    fieldTypes: [
                        new Y.FormBuilderFieldType({
                            fieldClass: Y.FormBuilderFieldText,
                            label: 'Text'
                        })
                    ],
                    modal: true,
                    resizable: false,
                    visible: false,
                    zIndex: 3
                }, config)
            );
        },

        'should not render field types before necessary': function() {
            this.createFieldTypesSettingsModal();
            Y.Assert.isNull(Y.one('.form-builder-modal'));

            this._fieldTypesModal.render();
            Y.Assert.isNotNull(Y.one('.form-builder-modal'));
        },

        'should not throw error when hiding the modal before rendered': function() {
            this.createFieldTypesSettingsModal();

            this._fieldTypesModal.hide();
            Y.Assert.isNull(Y.one('.form-builder-modal'));
        },

        'should close field types modal after clicking on the close button': function() {
            var formBuilderModal;

            this.createFieldTypesSettingsModal();
            this._fieldTypesModal.render();
            this._fieldTypesModal.show();

            formBuilderModal = Y.one('.form-builder-modal');
            formBuilderModal.one('.close').simulate('mousemove');
            formBuilderModal.one('.close').simulate('click');

            Y.Assert.isTrue(formBuilderModal.hasClass('modal-dialog-hidden'));
            Y.Assert.isFalse(this._fieldTypesModal.get('visible'));
        },

        'should fire the event "selectFieldType" after clicking on a field type': function() {
            var mock = new Y.Mock();

            this.createFieldTypesSettingsModal({
                fieldTypes: [
                    new Y.FormBuilderFieldType({
                        fieldClass: mock.fieldClass,
                        label: 'My Field'
                    })
                ]
            });

            this._fieldTypesModal.render();

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'callback'
            });

            this._fieldTypesModal.after('selectFieldType', mock.callback);

            this._fieldTypesModal.show();

            Y.one('.field-type').simulate('click');

            Y.Mock.verify(mock);
        },

        'should fire the event "selectFieldType" after keypress on a field type': function() {
            var mock = new Y.Mock();

            this.createFieldTypesSettingsModal({
                fieldTypes: [
                    new Y.FormBuilderFieldType({
                        fieldClass: mock.fieldClass,
                        label: 'My Field'
                    })
                ]
            });

            this._fieldTypesModal.render();

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'callback'
            });

            this._fieldTypesModal.after('selectFieldType', mock.callback);

            this._fieldTypesModal.show();

            Y.one('.field-type').simulate('keydown', { keyCode: 13 });

            Y.Mock.verify(mock);
        },

        'should update the UI after changing the fieldTypes attribute': function() {
            var mock = new Y.Mock();

            this.createFieldTypesSettingsModal({
                fieldTypes: [
                    new Y.FormBuilderFieldType({
                        fieldClass: mock.fieldClass,
                        label: 'My Field'
                    })
                ]
            });

            this._fieldTypesModal.render();

            Y.Assert.areEqual(Y.all('.field-type').size(), 1);

            this._fieldTypesModal.set('fieldTypes', [
                new Y.FormBuilderFieldType({
                    fieldClass: mock.fieldClass,
                    label: 'My new Field 1'
                }),
                new Y.FormBuilderFieldType({
                    fieldClass: mock.fieldClass,
                    label: 'My new Field 2'
                })
            ]);

            Y.Assert.areEqual(Y.all('.field-type').size(), 2);
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: [
        'aui-form-builder',
        'aui-form-builder-field-text',
        'node-event-simulate',
        'test'
    ],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
