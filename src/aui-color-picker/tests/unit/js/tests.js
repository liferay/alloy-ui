YUI.add('module-tests', function(Y) {

    //--------------------------------------------------------------------------
    // ColorPicker Freemarker Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-color-picker'),
        colorPicker;

    colorPicker = new Y.ColorPickerPopover({
        trigger: '.color-picker-trigger',
        zIndex: 2
    }).render();

    //--------------------------------------------------------------------------
    // Test Case for ColorPicker
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'ColorPicker Trigger tests',

        /**
         * @tests AUI-983
         */
        'assert ColorPicker could be opened via multiple triggers': function() {
            var instance = this,
                trigger1;

            trigger1 = Y.one('#trigger1');

            trigger1.simulate('click');

            instance._assertVisible();

            trigger1.simulate('click');

            instance._assertNotVisible();

            Y.one('#trigger2').simulate('click');

            instance._assertVisible();

            Y.one('#trigger3').simulate('click');

            instance._assertVisible();
        },

        _assertNotVisible: function() {
            Y.Test.Assert.isNotNull(Y.one('.yui3-color-picker-popover-hidden'), 'The ColorPicker Popover should be not visible');
        },

        _assertVisible: function() {
            Y.Test.Assert.isNull(Y.one('.yui3-color-picker-popover-hidden'), 'The ColorPicker Popover should be visible');
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'aui-color-picker-popover', 'node-event-simulate' ] });
