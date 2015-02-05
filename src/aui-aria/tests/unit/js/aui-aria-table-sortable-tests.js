YUI.add('aui-aria-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-aria-table-sortable');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        init: function() {
        	var data = [
        	    { name: 'Joan B. Jones', address: '3271 Another Ave', city: 'New York', state: 'AL' },
        	    { name: 'Bob C. Uncle', address: '9996 Random Road', city: 'Los Angeles', state: 'CA' },
        	    { name: 'John D. Smith', address: '1623 Some Street', city: 'San Francisco', state: 'CA' },
        	    { name: 'Joan E. Jones', address: '3217 Another Ave', city: 'New York', state: 'KY' }
        	];

        	var dataTable = new Y.DataTable({
        	    cssClass: 'table-striped',
        	    boundingBox: '#simple',
        	    columns: [
        	        {
        	            key: 'name',
        	            sortable: true
        	        },
        	        {
        	            key: 'address'
        	        },
        	        {
        	            key: 'city'
        	        },
        	        {
        	            key: 'state',
                        sortable: true
        	        }
        	    ],
        	    data: data,
        	    scrollable: 'x',
        	    width: '100%'
        	}).render();

        	dataTable.plug(Y.Plugin.Aria);

            this.dataTable = dataTable;
        },

        'Caption can be toggled visible': function() {
            var ariaPlugin = this.dataTable.aria,
                captionNode = ariaPlugin.get('captionNode'),
                captionVisible = ariaPlugin.get('captionVisible'),
                screenReaderClass = ariaPlugin.get('screenReaderClass');

            ariaPlugin.set('captionVisible', !captionVisible);

            Y.Assert.isTrue(captionNode.hasClass(screenReaderClass) === captionVisible);

            ariaPlugin.set('captionVisible', !!captionVisible);

            Y.Assert.isTrue(captionNode.hasClass(screenReaderClass) !== captionVisible);
        },

        'Caption is updated correctly when table is sorted': function() {
            var ariaPlugin = this.dataTable.aria,
                captionNode = ariaPlugin.get('captionNode'),
                captionText,
                direction,
                sortableHeader = Y.one('.table-sortable-column');

            sortableHeader.simulate('click');

            direction = sortableHeader.attr('aria-sort');

            captionText = captionNode.html();

            Y.Assert.isTrue(captionText.indexOf(direction) > -1);

            sortableHeader.simulate('click');

            direction = sortableHeader.attr('aria-sort');

            captionText = captionNode.html();

            Y.Assert.isTrue(captionText.indexOf(direction) > -1);
        },

        'Custom caption is update correctly when table is sorted': function() {
            var ariaPlugin = this.dataTable.aria,
                captionText,
                customCaption = Y.Node.create('<caption class="custom"></caption>'),
                direction,
                sortableHeader = Y.one('.table-sortable-column');

            Y.one('body').append(customCaption);

            ariaPlugin.set('captionNode', customCaption);

            sortableHeader.simulate('click');

            direction = sortableHeader.attr('aria-sort');

            captionText = customCaption.html();

            Y.Assert.isTrue(captionText.indexOf(direction) > -1);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'node-event-simulate', 'aui-datatable', 'aui-aria-table-sortable']
});
