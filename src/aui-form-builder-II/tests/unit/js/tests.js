YUI.add('aui-form-builder-II-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-II');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder II Unit Tests',

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
            this._formBuilder = new Y.FormBuilderII(config).render();
        },

        'should add a new field type on form': function() {
            var formBuilder = this._formBuilder;

            formBuilder.registerFieldType([{
                icon: 'icon1'
            }]);
            Y.Assert.isNotNull(Y.one('.icon1'));

            formBuilder.registerFieldType({icon: 'icon2'});
            Y.Assert.isNotNull(Y.one('.icon2'));

            formBuilder.registerFieldType([
                new Y.FormBuilderIIFieldType({
                    icon: 'icon3'
                })
            ]);
            Y.Assert.isNotNull(Y.one('.icon3'));

            formBuilder.registerFieldType(
                new Y.FormBuilderIIFieldType({
                    icon: 'icon4'
                })
            );
            Y.Assert.isNotNull(Y.one('.icon4'));
        },

        'should remove a field type from form': function() {
            var formBuilder = this._formBuilder,
                fieldType1 = new Y.FormBuilderIIFieldType({
                    icon: 'icon-test'
                });

            formBuilder.registerFieldType(fieldType1);


            formBuilder.unregisterFieldType('icon-test');
            Y.Assert.isNotNull(Y.one('.icon-test'));

            formBuilder.unregisterFieldType(new Y.FormBuilderIIFieldType({icon: 'icon-test'}));
            Y.Assert.isNotNull(Y.one('.icon-test'));

            Y.Assert.isNotNull(Y.one('.icon-test'));
            formBuilder.unregisterFieldType(fieldType1);
            Y.Assert.isNull(Y.one('.icon-test'));
        },

        'should show the form builder modal': function() {
            var formBuilder = this._formBuilder,
                formBuilderModal = Y.one('.form-builder-modal');

            Y.Assert.isTrue(formBuilderModal.hasClass('modal-dialog-hidden'));

            formBuilder.showFieldsPanel();
            Y.Assert.isFalse(formBuilderModal.hasClass('modal-dialog-hidden'));

            formBuilder.hideFieldsPanel();
            Y.Assert.isTrue(formBuilderModal.hasClass('modal-dialog-hidden'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-form-builder-II', 'test']
});
