YUI.add('aui-datatable-tests', function(Y) {

    var CSS_CELLEDITOR_EDIT_INPUT_NAME = Y.getClassName('celleditor', 'edit', 'input', 'name'),
        CSS_CELLEDITOR_EDIT_INPUT_VALUE = Y.getClassName('celleditor', 'edit', 'input', 'value');

    var suite = new Y.Test.Suite('aui-datatable');

    var data = [
        {
            fruit: ['apple']
        },
        {
            fruit: ['cherry']
        },
        {
            fruit: ['cherry']
        },
        {
            fruit: ['apple', 'cherry']
        }
    ];

    var datatable = null,
        dropdownEditor = null;

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
            datatable = datatable.render();

            Y.Assert.isNotNull(datatable);
        },

        'Initialize CheckboxCellEditor': function() {
            checkboxCellEditor = new Y.CheckboxCellEditor({
                editable: true,
                options: [ 'Yes', 'No' ]
            });
        },

        'Initialize Datatable PropertyList': function() {
            propertyList = new Y.PropertyList({
                boundingBox: '#datatablePropertyList',
                data: [{
                    editor: checkboxCellEditor,
                    name: 'Boolean',
                    value: 'Yes'
                }]
            });

            Y.Assert.isNotNull(propertyList);
        },

        'Render DatatablePropertyList': function() {
            propertyList = propertyList.render();

            Y.Assert.isNotNull(propertyList);
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

            dropdownEditor.hide();
        },

        'AUI-1288 open cell edit only when the target is inside our bounding box': function() {
            var instance = this;

            var aui1288TestErrorFlag = false;

            var boundingBox = dropdownEditor.get('boundingBox');

            var ancestor = boundingBox.ancestor();

            var node = Y.Node.create('<input autofocus="autofocus" type="text" />');

            Y.Node.prototype.simulateWithCallback = function (type, options, cb) {
                var eventQueue = new Y.AsyncQueue();

                Y.Event.simulate(Y.Node.getDOMNode(this), type, options);

                if (cb && Y.Lang.isFunction(cb)) {
                    eventQueue.add({
                        fn: cb
                    });

                    eventQueue.run();
                }
            };

            ancestor.prepend(node);

            node.focus();

            Y.getWin().on('error', function() {
                aui1288TestErrorFlag = true;
            });

            //simulate a keypress on the Enter key
            node.simulate("keydown", { keyCode: 13 });
            node.simulateWithCallback("keyup", { keyCode: 13 },
                function() {
                    instance.resume(function() {
                        Y.Assert.isTrue(!aui1288TestErrorFlag, 'There were JavaScript errors.');
                    });
                }
            );

            instance.wait();
    }}));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-base', 'aui-datatable', 'aui-datatable-property-list', 'node-event-simulate', 'test']
});
