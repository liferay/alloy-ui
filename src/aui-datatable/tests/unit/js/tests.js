YUI.add('module-tests', function(Y) {

    var YgetClassName = Y.getClassName;

    var CSS_CELLEDITOR_EDIT_INPUT_NAME = YgetClassName('celleditor', 'edit', 'input', 'name');

    var CSS_CELLEDITOR_EDIT_INPUT_VALUE = YgetClassName('celleditor', 'edit', 'input', 'value');

    var suite = new Y.Test.Suite('aui-datatable');

    var data = [
        { fruit: ['apple'] },
        { fruit: ['cherry'] },
        { fruit: ['cherry'] },
        { fruit: ['apple','cherry'] }
    ];

    var datatable = null, dropdownEditor = null;

    suite.add(new Y.Test.Case({
        name: 'Datatable',
        'Initialize DropDownCellEditor': function() {
            dropdownEditor = new Y.DropDownCellEditor({
                editable: true,
                multiple: true,
                options: {
                    apple: 'Apple',
                    cherry: 'Cherry',
                    banana: 'Banana',
                    kiwi: 'Kiwi'
                }
            });
        },

        'Initialize Datatable': function() {
            datatable = new Y.DataTable({
                boudingBox: '#datatable',
                columns: [
                    {
                        editor: dropdownEditor,
                        key: 'fruit',
                        sortable: true
                    }
                ],
                data: data,
                plugins: [
                    {
                        fn: Y.Plugin.DataTableHighlight
                    }
                ]
            });

            Y.Assert.isNotNull(datatable);
        },

        'Render Datatable': function() {
            datatable =  datatable.render();

            Y.Assert.isNotNull(datatable);
        },

        'AUI-1194 Allow empty values in BaseCellEditor': function() {
            datatable.set('activeCoord', [0, 0]);

            datatable._onEditCell({});

            dropdownEditor.fire('initEdit');
            dropdownEditor.fire('edit');

            dropdownEditor.editContainer.one('.' + CSS_CELLEDITOR_EDIT_INPUT_NAME).val('');
            dropdownEditor.editContainer.one('.' + CSS_CELLEDITOR_EDIT_INPUT_VALUE).val('');

            dropdownEditor.saveOptions();

            var options = dropdownEditor.get('options');

            Y.Assert.isTrue(options.hasOwnProperty(''));
            Y.Assert.isNotUndefined(options['']);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-datatable', 'test']
});
