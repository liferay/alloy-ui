YUI.add('aui-aria-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-aria-table-sortable');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        init: function() {
        	var data = [
        	    { name: 'Joan B. Jones', address: '3271 Another Ave', city: 'New York', state: 'AL', amount: 3, active: 'no', colors: ['red','blue'], fruit: ['apple'], date: '2013-01-01' },
        	    { name: 'Bob C. Uncle', address: '9996 Random Road', city: 'Los Angeles', state: 'CA', amount: 0, active: 'maybe', colors: ['green'], fruit: ['cherry'], date: '2013-01-01' },
        	    { name: 'John D. Smith', address: '1623 Some Street', city: 'San Francisco', state: 'CA', amount: 5, active: 'yes', colors: ['red'], fruit: ['cherry'], date: '' },
        	    { name: 'Joan E. Jones', address: '3217 Another Ave', city: 'New York', state: 'KY', amount: 3, active: 'no', colors: ['red','blue'], fruit: ['apple','cherry'], date: '2013-01-06' }
        	];

        	var dataTable = new Y.DataTable({
        	    cssClass: 'table-striped',
        	    boundingBox: '#simple',
        	    columns: [
        	        {
        	            key: 'name',
        	            sortable: true,
        	            editor: new Y.TextAreaCellEditor({
        	                on: {
        	                    save: function(event) {
        	                        Y.log('save', event.newVal);
        	                    },
        	                    cancel: function(event) {
        	                        Y.log('cancel', event);
        	                    }
        	                },
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
        	                options: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA"]
        	            })
        	        },
        	        'amount',
        	        {
        	            key:"active",
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
        	            key:"colors",
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
        	                    width:'400px',
        	                    showPrevMonth: true,
        	                    showNextMonth: true,
        	                    selectionMode: 'multiple'
        	                }
        	            })
        	        }
        	    ],
        	    data: data,
        	    editEvent: Y.UA.touchEnabled ? 'click' : 'dblclick',
        	    scrollable: 'x',
        	    width: '100%'
        	}).render();

        	dataTable.plug(Y.Plugin.Aria);

            this.dataTable = dataTable;
        },

        'Sorting a column updates the aria-sort attribute': function() {
            var sortableHeaders = Y.all('.table-sortable-column'),
                sortableHeaderA = sortableHeaders.item(0),
                sortableHeaderB = sortableHeaders.item(1),
                ariaSort;

            sortableHeaderA.simulate('click');

            ariaSort = sortableHeaderA.attr('aria-sort');

            Y.Assert.areEqual('ascending', ariaSort);

            sortableHeaderA.simulate('click');

            ariaSort = sortableHeaderA.attr('aria-sort');

            Y.Assert.areEqual('descending', ariaSort);

            sortableHeaderB.simulate('click');

            ariaSort = sortableHeaderB.attr('aria-sort');

            Y.Assert.areEqual('ascending', ariaSort);

            sortableHeaderB.simulate('click');
        },

        'Caption can be toggled visible': function() {
            var ariaPlugin = this.dataTable.aria,
                screenReaderClass = ariaPlugin.get('screenReaderClass'),
                captionNode = ariaPlugin.get('captionNode'),
                captionVisible = ariaPlugin.get('captionVisible');

            Y.Assert.isTrue(captionNode.hasClass(screenReaderClass) === !captionVisible);

            ariaPlugin.set('captionVisible', !captionVisible);

            Y.Assert.isTrue(captionNode.hasClass(screenReaderClass) === captionVisible);

            ariaPlugin.set('captionVisible', !!captionVisible);

            Y.Assert.isTrue(captionNode.hasClass(screenReaderClass) === !captionVisible);

            ariaPlugin.set('captionNode', captionNode);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'node-event-simulate', 'aui-datatable', 'aui-aria', 'aui-aria-table-sortable', 'datatable-scroll']
});
