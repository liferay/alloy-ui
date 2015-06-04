YUI.add('aui-form-builder-field-list-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-list');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Field List Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        tearDown: function() {
            this._fieldList && this._fieldList.destroy();
        },

        createFieldList: function(config) {
            this._fieldList = new Y.FormBuilderFieldList(config);
            this._container.append(this._fieldList.get('contentBox'));
        },

        'should add a field to the field list': function() {
            this.createFieldList();

            Y.Assert.isNull(Y.one('.form-builder-field'));

            this._fieldList.addField(new Y.FormBuilderFieldSentence());
            Y.Assert.isNotNull(Y.one('.form-builder-field'));
        },

        'should remove a field from the field list': function() {
            var sentence = new Y.FormBuilderFieldSentence();

            this.createFieldList({ fields: [sentence] });
            Y.Assert.isNotNull(Y.one('.form-builder-field'));

            this._fieldList.removeField(sentence);
            Y.Assert.isNull(Y.one('.form-builder-field'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-form-builder-field-list', 'aui-form-builder-field-sentence', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});