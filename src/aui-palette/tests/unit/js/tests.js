YUI.add('aui-palette-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Palette Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-palette'),
        items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        objectItems = [
            {
                name: 'item1',
                value: 1
            }, {
                name: 'item2',
                value: 2
            }, {
                name: 'item3',
                value: 3
            }
        ],
        palette;

    //--------------------------------------------------------------------------
    // Test Case for render items
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Render items',

        setUp: function() {
            if (palette) {
                palette.destroy();

                palette = null;
            }
        },

        /*
         * Check if an array of objects can be stored and retrieved
         * Tests: AUI-1033
         */
        'store and retrieve objects as items': function() {
            palette = new Y.Palette({
                columns: 1,
                items: objectItems
            }).render('#palette');

            // Assert we can get the palette item by value
            Y.Assert.areEqual(palette.getItemByValue(2).attr('data-value'), 2, 'Item value should be 2');

            // Assert we can get the palette item by the object itself
            Y.Assert.areEqual(palette.getItemByValue(objectItems[1]).attr('data-value'), 2,
                'Item value should be 2');
        },

        'render items in 5 columns': function() {
            palette = new Y.Palette({
                columns: 5,
                items: items
            }).render('#palette');

            // Assert there are only two rows with 5 columns each
            Y.Assert.isNotNull(Y.one('.palette-items-container-0'), 'First row should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-1'), 'Second row should exist');

            // Third row does not exist
            Y.Assert.isNull(Y.one('.palette-items-container-2'), 'Third row should not exist');

            // The first row should contain 5 columns only
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="0"]'),
                'First column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="1"]'),
                'Second column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="2"]'),
                'Third column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="3"]'),
                'Fourth column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="4"]'),
                'Fifth column should exist');

            // Sixth column does not exist
            Y.Assert.isNull(Y.one('.palette-items-container-0 .palette-item[data-column="5"]'),
                'Sixth column should not exist');

            // The second row should contain 5 columns only
            Y.Assert.isNotNull(Y.one('.palette-items-container-1 .palette-item[data-column="0"]'),
                'First column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-1 .palette-item[data-column="1"]'),
                'Second column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-1 .palette-item[data-column="2"]'),
                'Third column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-1 .palette-item[data-column="3"]'),
                'Fourth column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-1 .palette-item[data-column="4"]'),
                'Fifth column should exist');

            // Sixth column does not exist
            Y.Assert.isNull(Y.one('.palette-items-container-1 .palette-item[data-column="5"]'),
                'Sixth column should not exist');
        },

        'render items in 1 columns': function() {
            palette = new Y.Palette({
                columns: 1,
                items: items
            }).render('#palette');

            // Assert there are 10 rows and 1 columns each
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="0"]'),
                'First row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-0 .palette-item[data-column="1"]'),
                'First row should have only one column');

            Y.Assert.isNotNull(Y.one('.palette-items-container-1 .palette-item[data-column="0"]'),
                'Second row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-1 .palette-item[data-column="1"]'),
                'Second row should have only one column');

            Y.Assert.isNotNull(Y.one('.palette-items-container-2 .palette-item[data-column="0"]'),
                'Third row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-2 .palette-item[data-column="1"]'),
                'Third row should have only one column');

            Y.Assert.isNotNull(Y.one('.palette-items-container-3 .palette-item[data-column="0"]'),
                'Fourth row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-3 .palette-item[data-column="1"]'),
                'Fourth row should have only one column');

            Y.Assert.isNotNull(Y.one('.palette-items-container-4 .palette-item[data-column="0"]'),
                'Fifth row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-4 .palette-item[data-column="1"]'),
                'Fifth row should have only one column');

            Y.Assert.isNotNull(Y.one('.palette-items-container-5 .palette-item[data-column="0"]'),
                'Sixth row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-5 .palette-item[data-column="1"]'),
                'Sixth row should have only one column');

            Y.Assert.isNotNull(Y.one('.palette-items-container-6 .palette-item[data-column="0"]'),
                'Seventh row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-6 .palette-item[data-column="1"]'),
                'Seventh row should have only one column');

            Y.Assert.isNotNull(Y.one('.palette-items-container-7 .palette-item[data-column="0"]'),
                'Eighth row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-7 .palette-item[data-column="1"]'),
                'Eighth row should have only one column');

            Y.Assert.isNotNull(Y.one('.palette-items-container-8 .palette-item[data-column="0"]'),
                'Ninth row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-8 .palette-item[data-column="1"]'),
                'Ninth row should have only one column');

            Y.Assert.isNotNull(Y.one('.palette-items-container-9 .palette-item[data-column="0"]'),
                'Tenth row should have one column');
            Y.Assert.isNull(Y.one('.palette-items-container-9 .palette-item[data-column="1"]'),
                'Tenth row should have only one column');

            // Eleventh column does not exist
            Y.Assert.isNull(Y.one('.palette-items-container-10 .palette-item[data-column="0"]'),
                'Eleventh row should have only one column');
        },

        'render items without columns': function() {
            palette = new Y.Palette({
                columns: -1,
                items: items
            }).render('#palette');

            // Assert there is 1 row and 10 columns
            Y.Assert.isNotNull(Y.one('.palette-items-container-0'), 'First row should exist');
            Y.Assert.isNull(Y.one('.palette-items-container-1'), 'Second row should not exist');

            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="0"]'),
                'First column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="1"]'),
                'Second column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="2"]'),
                'Third column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="3"]'),
                'Fourth column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="4"]'),
                'Fifth column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="5"]'),
                'Sixth column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="6"]'),
                'Seventh column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="7"]'),
                'Eighth column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="8"]'),
                'Ninth column should exist');
            Y.Assert.isNotNull(Y.one('.palette-items-container-0 .palette-item[data-column="9"]'),
                'Tenth column should exist');

            // Eleventh column does not exist
            Y.Assert.isNull(Y.one('.palette-items-container-0 .palette-item[data-column="10"]'),
                'Eleventh column should not exist');
        }
    }));

    //--------------------------------------------------------------------------
    // Test Case for select items
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Select items',

        'select the third item by default': function() {
            var selectedItem,
                selectedItems;

            if (palette) {
                palette.destroy();
            }

            palette = new Y.Palette({
                selected: 2,
                items: items
            }).render('#palette');

            selectedItems = Y.all('.palette-item-selected');

            Y.Assert.areEqual(1, selectedItems.size(), 'There must be only one selected item');

            selectedItem = selectedItems.item(0);

            Y.Assert.areEqual(
                2, selectedItem.getAttribute('data-index'), 'The index of selected item must be 2');
        },

        'select the fourth item': function() {
            var selectedItem,
                selectedItems;

            palette.set('selected', 3);

            selectedItems = Y.all('.palette-item-selected');

            Y.Assert.areEqual(1, selectedItems.size(), 'There must be only one selected item');

            selectedItem = selectedItems.item(0);

            Y.Assert.areEqual(
                3, selectedItem.getAttribute('data-index'), 'The index of selected item must be 3');
        },

        'test selection of an item when toggleSelection is set to false': function() {
            var selectedItem,
                selectedItems;

            palette.set('toggleSelection', false);

            Y.one('.palette-item[data-index="2"]').simulate('click');
            Y.one('.palette-item[data-index="2"]').simulate('click');

            selectedItems = Y.all('.palette-item-selected');

            Y.Assert.areEqual(1, selectedItems.size(), 'There must be one selected item');

            selectedItem = selectedItems.item(0);

            Y.Assert.areEqual(
                2, selectedItem.getAttribute('data-index'), 'The index of the selected item must be 2');
        },

        'test selection of an item when toggleSelection is set to true': function() {
            var selectedItems;

            palette.set('toggleSelection', true);

            Y.one('.palette-item[data-index="2"]').simulate('click');

            selectedItems = Y.all('.palette-item-selected');

            Y.Assert.areEqual(0, selectedItems.size(), 'There must be no any selected item');
        }
    }));

    //--------------------------------------------------------------------------
    // Test Case for events
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Test subscription to events',

        'subscribe to select/unselect events': function() {
            var selectEventFired,
                unselectEventFired;

            selectEventFired = false;
            unselectEventFired = false;

            palette.on('select', function() {
                selectEventFired = true;
            });

            palette.on('unselect', function() {
                unselectEventFired = true;
            });

            Y.one('.palette-item[data-index="4"]').simulate('click');
            Y.Assert.isTrue(selectEventFired, 'Select event must be fired');
            Y.Assert.isFalse(unselectEventFired, 'Unselect event must not be fired');

            Y.one('.palette-item[data-index="4"]').simulate('click');
            Y.Assert.isTrue(unselectEventFired, 'Unselect event must be fired');
        },

        'subscribe to enter/leave events': function() {
            var enterEventFired,
                leaveEventFired;

            enterEventFired = false;
            leaveEventFired = false;

            palette.on('enter', function() {
                enterEventFired = true;
            });

            palette.on('leave', function() {
                leaveEventFired = true;
            });

            Y.one('.palette-item[data-index="4"]').simulate('mouseover');

            Y.Assert.isTrue(enterEventFired, 'Enter event must be fired');
            Y.Assert.isFalse(leaveEventFired, 'Leave event must not be fired');

            Y.one('.palette-item[data-index="4"]').simulate('mouseout');
            Y.Assert.isTrue(leaveEventFired, 'Leave event must be fired');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-palette', 'node-event-simulate']
});
