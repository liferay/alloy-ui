YUI.add('aui-datatable-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-datatable');

    var data = [
        {
            active: 'no',
            address: '3271 Another Ave',
            amount: 3,
            city: 'New York',
            colors: ['red', 'blue'],
            date: '2013-01-01',
            fruit: ['apple'],
            name: 'Joan B. Jones',
            state: 'AL'
        },
        {
            active: 'maybe',
            address: '9996 Random Road',
            amount: 0,
            city: 'Los Angeles',
            colors: ['green'],
            date: '2013-01-01',
            fruit: ['cherry'],
            name: 'Bob C. Uncle',
            state: 'CA'
        },
        {
            active: 'yes',
            address: '1623 Some Street',
            amount: 5,
            city: 'San Francisco',
            colors: ['red'],
            date: '',
            fruit: ['cherry'],
            name: 'John D. Smith',
            state: 'CA'
        },
        {
            active: 'no',
            address: '3217 Another Ave',
            amount: 3,
            city: 'New York',
            colors: ['red', 'blue'],
            date: '2013-01-06',
            fruit: ['apple', 'cherry'],
            name: 'Joan E. Jones',
            state: 'KY'
        }
    ];

    new Y.DataTable({
        boundingBox: '#simple',
        columns: [
            {
                editor: new Y.TextAreaCellEditor({
                    on: {
                        cancel: function(event) {
                            console.log('cancel', event);
                        },
                        save: function(event) {
                            console.log('save', event.newVal);
                        }
                    },
                    validator: {
                        rules: {
                            value: {
                                required: true
                            }
                        }
                    }
                }),
                key: 'name',
                sortable: true
            },
            {
                editor: new Y.TextAreaCellEditor(),
                key: 'address'
            },
            {
                editor: new Y.TextAreaCellEditor(),
                key: 'city'
            },
            {
                editor: new Y.DropDownCellEditor({
                    editable: true,
                    options: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID',
                        'IL', 'IN', 'IA', 'KS', 'KY', 'LA']
                }),
                key: 'state'
            },
            'amount',
            {
                editor: new Y.RadioCellEditor({
                    editable: true,
                    options: {
                        yes: 'Yes',
                        no: 'No',
                        maybe: 'Maybe'
                    }
                }),
                key: 'active'
            },
            {
                editor: new Y.CheckboxCellEditor({
                    editable: true,
                    multiple: true,
                    options: {
                        red: 'Red',
                        green: 'Green',
                        blue: 'Blue'
                    }
                }),
                key: 'colors'
            },
            {
                editor: new Y.DropDownCellEditor({
                    editable: true,
                    multiple: true,
                    options: {
                        apple: 'Apple',
                        banana: 'Banana',
                        cherry: 'Cherry',
                        kiwi: 'Kiwi'
                    }
                }),
                key: 'fruit',
                sortable: true
            },
            {
                editor: new Y.DateCellEditor({
                    calendar: {
                        selectionMode: 'multiple',
                        showNextMonth: true,
                        showPrevMonth: true,
                        width: '400px'
                    }
                }),
                key: 'date',
                sortable: true
            }
        ],
        data: data,
        editEvent: 'dblclick',
        plugins: [
            {
                fn: Y.Plugin.DataTableHighlight
            }
        ]
    }).render();

    function assertHighlightPosition(tableData) {
        var lowerXLimit,
            lowerYLimit,
            overlayActiveBorderWidth,
            overlayActiveBottomWidth,
            overlayActiveChildren,
            overlayActiveLeftHeight,
            overlayActiveNode,
            overlayActiveRightHeight,
            overlayActiveTopWidth,
            overlaySelectionNode,
            tableDataHeight,
            tableDataWidth,
            upperXLimit,
            upperYLimit;

        overlayActiveNode = Y.one('.table-highlight-overlay-active');
        overlayActiveChildren = overlayActiveNode.get('children');
        overlaySelectionNode = overlayActiveNode ? overlayActiveNode.next('.table-highlight-overlay') : null;

        lowerXLimit = tableData.getX() >= (overlayActiveNode.getX() - 1);
        lowerYLimit = tableData.getY() >= (overlayActiveNode.getY() - 1);

        overlayActiveBorderWidth = overlayActiveChildren.item(0).get('offsetHeight');
        overlayActiveBottomWidth = overlayActiveChildren.item(2).get('offsetWidth');

        overlayActiveLeftHeight = overlayActiveChildren.item(3).get('offsetHeight') + overlayActiveBorderWidth;
        overlayActiveRightHeight = overlayActiveChildren.item(1).get('offsetHeight') + overlayActiveBorderWidth;

        overlayActiveTopWidth = overlayActiveChildren.item(0).get('offsetWidth');

        tableDataHeight = tableData.get('offsetHeight');
        tableDataWidth = tableData.get('offsetWidth');

        upperXLimit = tableData.getX() <= (overlayActiveNode.getX() + 1);
        upperYLimit = tableData.getY() <= (overlayActiveNode.getY() + 1);

        Y.Assert.isTrue(
            (lowerXLimit && upperXLimit),
            'X Position of <td></td> and highlight are not the similar.');

        Y.Assert.isTrue(
            (lowerYLimit && upperYLimit),
            'Y Position of <td></td> and highlight are not the similar.');

        Y.Assert.areSame(
            tableDataWidth,
            overlayActiveBottomWidth,
            'Hightlight bottom border width ' + overlayActiveBottomWidth + ' is not same width as table data ' +
            tableDataWidth + '.');

        Y.Assert.areSame(
            tableDataWidth,
            overlayActiveTopWidth,
            'Hightlight top border width ' + overlayActiveTopWidth + ' is not same width as table data ' +
            tableDataWidth + '.');

        Y.Assert.areSame(
            tableDataHeight,
            overlayActiveLeftHeight,
            'Hightlight left border height ' + overlayActiveLeftHeight + ' is not same height as table data ' +
            tableDataHeight + '.');

        Y.Assert.areSame(
            tableDataHeight,
            overlayActiveRightHeight,
            'Hightlight right border height ' + overlayActiveRightHeight + ' is not same height as table data ' +
            tableDataHeight + '.');
    }

    suite.add(new Y.Test.Case({
        name: 'Datatable Highlight',
        'table-cell should be highlighted on click': function() {
            var test = this,
                tableData;

            tableData = Y.one('tr.table-odd td.table-col-amount');

            tableData.once('mousedown', function(event) {
                setTimeout(function() {
                    test.resume(function() {
                        assertHighlightPosition(event.currentTarget);
                    });
                }, 800);
            });

            setTimeout(function() {
                tableData.simulate('mousedown');
                tableData.simulate('mouseup');
            }, 0);

            test.wait(1000);
        },

        'table-cell should still be highlighted when table is scrolled horizontally': function() {
            var test = this,
                datatableContainer,
                datatableContent,
                tableData;

            datatableContainer = Y.one('#simple');
            datatableContent = datatableContainer.one('.table-content');
            tableData = Y.one('tr.table-odd td.table-col-amount');

            datatableContainer.setStyle('width', '300px');
            datatableContent.setStyle('overflow', 'auto');

            tableData.once('mousedown', function(event) {
                setTimeout(function() {
                    test.resume(function() {
                        assertHighlightPosition(event.currentTarget);
                    });
                }, 800);
            });

            setTimeout(function() {
                tableData.simulate('mousedown');
                tableData.simulate('mouseup');
                datatableContent.set('scrollLeft', 200);
            }, 0);

            test.wait(1000);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Datatable',

        init: function() {
            var data = [
                {
                    active: 'no',
                    address: '3271 Another Ave',
                    amount: 3,
                    city: 'New York',
                    colors: ['red', 'blue'],
                    date: '2013-01-01',
                    fruit: ['apple'],
                    name: 'Joan B. Jones',
                    state: 'AL'
                },
                {
                    active: 'maybe',
                    address: '9996 Random Road',
                    amount: 0,
                    city: 'Los Angeles',
                    colors: ['green'],
                    date: '2013-01-01',
                    fruit: ['cherry'],
                    name: 'Bob C. Uncle',
                    state: 'CA'
                },
                {
                    active: 'yes',
                    address: '1623 Some Street',
                    amount: 5,
                    city: 'San Francisco',
                    colors: ['red'],
                    date: '',
                    fruit: ['cherry'],
                    name: 'John D. Smith',
                    state: 'CA'
                },
                {
                    active: 'no',
                    address: '3217 Another Ave',
                    amount: 3,
                    city: 'New York',
                    colors: ['red', 'blue'],
                    date: '2013-01-06',
                    fruit: ['apple', 'cherry'],
                    name: 'Joan E. Jones',
                    state: 'KY'
                }
            ];

            this._dataTable = new Y.DataTable({
                cssClass: 'table-striped',
                boundingBox: '#datatable',
                columns: [
                    {
                        key: 'name',
                        sortable: true,
                        editor: new Y.TextAreaCellEditor({
                            validator: {
                                rules: {
                                    value: {
                                        required: true
                                    }
                                }
                            }
                        })
                    },
                    {
                        key: 'address',
                        editor: new Y.TextAreaCellEditor()
                    },
                    {
                        key: 'city',
                        editor: new Y.TextAreaCellEditor()
                    },
                    {
                        key: 'state',
                        editor: new Y.DropDownCellEditor({
                            editable: true,
                            options: [
                                'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE',
                                'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
                                'KS', 'KY', 'LA'
                            ]
                        })
                    },
                    'amount',
                    {
                        key: 'active',
                        editor: new Y.RadioCellEditor({
                            editable: true,
                            options: {
                                yes: 'Yes',
                                no: 'No',
                                maybe: 'Maybe'
                            }
                        })
                    },
                    {
                        key: 'colors',
                        editor: new Y.CheckboxCellEditor({
                            editable: true,
                            multiple: true,
                            options: {
                                red: 'Red',
                                green: 'Green',
                                blue: 'Blue'
                            }
                        })
                    },
                    {
                        key: 'fruit',
                        sortable: true,
                        editor: new Y.DropDownCellEditor({
                            editable: true,
                            multiple: true,
                            options: {
                                apple: 'Apple',
                                cherry: 'Cherry',
                                banana: 'Banana',
                                kiwi: 'Kiwi'
                            }
                        })
                    },
                    {
                        key: 'date',
                        sortable: true,
                        editor: new Y.DateCellEditor({
                            calendar: {
                                width: '400px',
                                showPrevMonth: true,
                                showNextMonth: true,
                                selectionMode: 'multiple'
                            }
                        })
                    }
                ],
                data: data,
                editEvent: 'dblclick',
                plugins: [
                    {
                        fn: Y.Plugin.DataTableHighlight
                    }
                ]
            }).render();
        },

        _simulateKey: function(node, keyCode, focusNode) {
            if (focusNode) {
                node.focus();
            }

            node.simulate('keydown', {
                keyCode: keyCode
            });
        },

        'navigate on arrow keys': function() {
            var dataTable = this._dataTable,
                activeCoords,
                boundingBox = dataTable.get('boundingBox'),
                cellCoords = {
                    topLeft: [0, 0],
                    topRight: [0, 1],
                    bottomLeft: [1, 0],
                    bottomRight: [1, 1]
                };

            dataTable.focus();
            dataTable.set('activeCoord', cellCoords.topLeft);
            dataTable.set('selection', cellCoords.topLeft);

            //simulate right arrow key press

            this._simulateKey(boundingBox, 39);

            activeCoords = dataTable.get('activeCoord');

            Y.ArrayAssert.itemsAreSame(cellCoords.topRight, activeCoords, 'Right arrow should have moved selection.');

            //simulate down arrow key press

            this._simulateKey(boundingBox, 40);

            activeCoords = dataTable.get('activeCoord');

            Y.ArrayAssert.itemsAreSame(cellCoords.bottomRight, activeCoords, 'Down arrow should have moved selection.');

            //simulate left arrow key press

            this._simulateKey(boundingBox, 37);

            activeCoords = dataTable.get('activeCoord');

            Y.ArrayAssert.itemsAreSame(cellCoords.bottomLeft, activeCoords, 'Left arrow should have moved selection.');

            //simulate up arrow key press

            this._simulateKey(boundingBox, 38);

            activeCoords = dataTable.get('activeCoord');

            Y.ArrayAssert.itemsAreSame(cellCoords.topLeft, activeCoords, 'Up arrow should have moved selection.');
        },

        'open editor on double click': function() {
            var dataTable = this._dataTable,
                firstCell = dataTable.getCell([0, 0]);

            firstCell.simulate('dblclick');

            var editorNode = Y.one('.basecelleditor');

            Y.Assert.isNotNull(editorNode, 'The editor should have been opened.');

            Y.Widget.getByNode(editorNode).fire('cancel');
        },

        'open editor on enter key': function() {
            var dataTable = this._dataTable,
                boundingBox = dataTable.get('boundingBox'),
                editor,
                editorNode;

            dataTable.set('activeCoord', [0, 0]);
            dataTable.set('selection', [0, 0]);

            //simulate enter key press
            this._simulateKey(boundingBox, 13, true);

            editorNode = Y.one('.basecelleditor');
            editor = Y.Widget.getByNode(editorNode);

            Y.Assert.isTrue(editor.get('visible'), 'The editor should have been opened.');
        },

        'cancel cell editor on click': function() {
            var cancelBtn,
                cell = this._dataTable.getCell([0, 0]),
                editor,
                editorNode,
                newVal = 'Testing editor node save.',
                originalVal = cell.html(),
                textArea;

            cell.simulate('dblclick');

            editorNode = Y.one('.basecelleditor');
            editor = Y.Widget.getByNode(editorNode);
            cancelBtn = editorNode.all('button').item(1);
            textArea = editorNode.one('textarea');

            textArea.val(newVal);

            //simulate click cancel button

            cancelBtn.simulate('mousemove');
            cancelBtn.simulate('click');

            Y.Assert.areEqual(cell.html(), originalVal);
            Y.Assert.isFalse(editor.get('visible'), 'editor should be hidden');
        },

        'cancel cell editor on escape key press': function() {
            var cell = this._dataTable.getCell([0, 0]),
                editor,
                editorNode,
                newVal = 'Testing editor node save.',
                originalVal = cell.html(),
                textArea;

            cell.simulate('dblclick');

            editorNode = Y.one('.basecelleditor');
            editor = Y.Widget.getByNode(editorNode);
            textArea = editorNode.one('textarea');

            textArea.val(newVal);

            var test = this;

            setTimeout(function() {
                test.resume(function() {
                    //simulate press escape key var test = this;

                    this._simulateKey(editorNode, 27);

                    Y.Assert.areEqual(cell.html(), originalVal);
                    Y.Assert.isFalse(editor.get('visible'), 'editor should be hidden');
                });
            }, 500);

            test.wait();
        },

        'save cell edit': function() {
            var cell = this._dataTable.getCell([0, 0]),
                editor,
                editorNode,
                newVal = 'Testing editor node save.',
                saveBtn,
                textArea;

            cell.simulate('dblclick');

            editorNode = Y.one('.basecelleditor');
            editor = Y.Widget.getByNode(editorNode);
            saveBtn = editorNode.all('button').item(0);
            textArea = editorNode.one('textarea');

            textArea.val(newVal);

            saveBtn.simulate('mousemove');
            saveBtn.simulate('click');

            Y.Assert.areEqual(cell.html(), newVal);
            Y.Assert.isFalse(editor.get('visible'), 'editor should be hidden');
        },

        'cell focus after cancel': function() {
            var boundingBox = this._dataTable.get('boundingBox'),
                cancelBtn,
                coords = [0, 0],
                editor,
                editorNode,
                testCoords = [1, 0];

            this._dataTable.set('activeCoord', coords);
            this._dataTable.set('selection', coords);

            this._simulateKey(boundingBox, 13, true);

            editorNode = Y.one('.basecelleditor');
            editor = Y.Widget.getByNode(editorNode);
            cancelBtn = editorNode.all('button').item(1);

            cancelBtn.simulate('mousemove');
            cancelBtn.simulate('click');

            //simulate press down key to change active cell after CANCEL

            this._simulateKey(boundingBox, 40);

            coords = this._dataTable.get('activeCoord');

            Y.ArrayAssert.itemsAreSame(testCoords, coords);
            Y.Assert.isFalse(editor.get('visible'), 'editor should be hidden');
        },

        'cell focus after save': function() {
            var boundingBox = this._dataTable.get('boundingBox'),
                coords = [1, 0],
                editor,
                editorNode,
                saveBtn,
                testCoords = [2, 0];

            this._dataTable.set('activeCoord', coords);
            this._dataTable.set('selection', coords);

            this._simulateKey(boundingBox, 13, true);

            editorNode = Y.one('.basecelleditor');
            editor = Y.Widget.getByNode(editorNode);
            saveBtn = editorNode.all('button').item(0);

            saveBtn.simulate('mousemove');
            saveBtn.simulate('click');

            //simulate press down key to change active cell after SAVE

            this._simulateKey(boundingBox, 40);

            coords = this._dataTable.get('activeCoord');

            Y.ArrayAssert.itemsAreSame(testCoords, coords);
            Y.Assert.isFalse(editor.get('visible'), 'editor should be hidden');
        },

        'fields sorted on caret click': function() {
            var sortableHeader = Y.one('#datatable .table-sortable-column'),
                colId = sortableHeader.getData('yui3-col-id');

            sortableHeader.simulate('click');

            var columnList = Y.all('#datatable .table-cell.table-col-' + colId),
                sortBy = sortableHeader.get('aria-sort');

            Y.Assert.isFalse(
                columnList.some(
                    function(item, index) {
                        var sorted;

                        if (index > 0) {
                            var text = item.text().toLowerCase(),
                                prevCell = columnList.item(index - 1),
                                prevCellText = prevCell.text().toLowerCase();

                            if (sortBy === 'ascending') {
                                sorted = prevCellText <= text;
                            }
                            else {
                                sorted = prevCellText >= text;
                            }
                        }
                        else {
                            sorted = true;
                        }

                        return !sorted;
                    }
                ),
                'Items are not sorted correctly.'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-datatable', 'node', 'node-event-simulate', 'test']
});
