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

        'should open settings editor when field type is clicked': function() {
            var fieldTypeNode,
                mock = new Y.Mock();

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'fieldClass'
            });
            mock.fieldClass.prototype.showSettings = function() {};

            this.createFormBuilder({
                fieldTypes: [{
                    fieldClass: mock.fieldClass,
                    label: 'My Field'
                }]
            });

            this._formBuilder.showFieldsPanel();

            fieldTypeNode = Y.one('.field-type');
            fieldTypeNode.simulate('click');

            Y.Mock.verify(mock);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-form-builder', 'node-event-simulate', 'test']
});
