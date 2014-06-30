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

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-datatable', 'node-event-simulate', 'test']
});
