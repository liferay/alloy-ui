YUI.add('aui-form-builder-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createFormBuilder({
                boundingBox: '#content'
            });
        },

        tearDown: function() {
            this._formBuilder && this._formBuilder.destroy();
        },

        createFormBuilder: function(config) {
            var content = Y.Node.create('<div id="content" />');

            this._container.append(content);
            this._formBuilder = new Y.FormBuilder(config).render();
        },

        'should not render field types before necessary': function() {
            this._formBuilder.registerFieldTypes([{
                icon: 'icon1'
            }]);

            Y.Assert.isNull(Y.one('.form-builder-modal'));

            this._formBuilder.showFieldsPanel();
            Y.Assert.isNotNull(Y.one('.form-builder-modal'));
        },

        'should not throw error when hiding the panel before rendered': function() {
            this._formBuilder.hideFieldsPanel();
            Y.Assert.isNull(Y.one('.form-builder-modal'));
        },

        'should add a new field type on form': function() {
            var formBuilder = this._formBuilder;

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
            var formBuilder = this._formBuilder,
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
            this._formBuilder.registerFieldTypes([
                {
                    fieldClass: 'Class1'
                },
                {
                    fieldClass: 'Class2'
                },
                {
                    fieldClass: 'Class1'
                }
            ]);

            this._formBuilder.unregisterFieldTypes('Class1');
            Y.Assert.areEqual(1, this._formBuilder.get('fieldTypes').length);

            this._formBuilder.unregisterFieldTypes('Class3');
            Y.Assert.areEqual(1, this._formBuilder.get('fieldTypes').length);
        },

        'should remove multiple field types on same call': function() {
            var fieldType1 = new Y.FormBuilderFieldType({
                fieldClass: 'Class1'
            });

            this._formBuilder.registerFieldTypes([
                fieldType1,
                {
                    fieldClass: 'Class2'
                },
                {
                    fieldClass: 'Class2'
                },
                {
                    fieldClass: 'Class3'
                }
            ]);

            this._formBuilder.unregisterFieldTypes(['Class2', fieldType1]);
            Y.Assert.areEqual(1, this._formBuilder.get('fieldTypes').length);
            Y.Assert.areEqual(
                'Class3',
                this._formBuilder.get('fieldTypes')[0].get('fieldClass')
            );
        },

        'should show the form builder modal': function() {
            var formBuilder = this._formBuilder,
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
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-form-builder', 'test']
});
