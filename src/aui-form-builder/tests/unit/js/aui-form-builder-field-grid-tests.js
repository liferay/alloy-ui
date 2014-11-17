YUI.add('aui-form-builder-field-grid-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-grid');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Grid Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        /**
         * Creates a field instance.
         *
         * @method _createField
         * @protected
         */
        _createField: function() {
            this._field = new Y.FormBuilderFieldGrid();
            Y.one('#container').append(this._field.get('content'));
        },

        'should be able to edit rows and columns': function() {
            var settings = Y.one('#settings');

            this._createField();
            this._field.renderSettingsPanel(settings);

            settings.all('.button-switch').item(0).simulate('click');

            settings.all('.options-data-editor-add').item(0).simulate('click');
            settings.all('.options-data-editor-option').item(0).one('input').set('value', 'Column 1');
            settings.all('.options-data-editor-add').item(1).simulate('click');
            settings.all('.options-data-editor-option').item(1).one('input').set('value', 'Row 1');

            this._field.saveSettings();

            Y.Assert.isTrue(this._field.get('required'));
            Y.Assert.areEqual('Row 1', this._field.get('rows')[0]);
            Y.Assert.areEqual('Column 1', this._field.get('columns')[0]);
        },

        'should render correctly': function() {
            this._createField();

            this._field.set('columns', ['Column1', 'Column2', 'Column3']);
            Y.Assert.areEqual(
                4,
                this._field.get('content').one('.form-field-grid-columns').all('th').size()
            );

            this._field.set('columns', ['Column1', 'Column2']);
            Y.Assert.areEqual(
                3,
                this._field.get('content').one('.form-field-grid-columns').all('th').size()
            );

            this._field.set('rows', ['Row1', 'Row2']);
            Y.Assert.areEqual(
                3,
                this._field.get('content').one('.form-field-grid-table').all('tr').size()
            );

            this._field.set('rows', ['Row1', 'Row2', 'Row3']);
            Y.Assert.areEqual(
                4,
                this._field.get('content').one('.form-field-grid-table').all('tr').size()
            );
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-grid', 'node-event-simulate', 'test']
});
