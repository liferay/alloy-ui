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
            Y.Test.Assert.isNotNull(
                Y.one('.yui3-color-picker-popover-hidden'), 'The ColorPicker Popover should be not visible'
            );
        },

        _assertVisible: function() {
            Y.Test.Assert.isNull(
                Y.one('.yui3-color-picker-popover-hidden'), 'The ColorPicker Popover should be visible');
        }
    }));

    suite.add(new Y.Test.Case({

        name: 'ColorPicker value change tests',

        /**
         * @tests AUI-1091
         */
        'assert changing the HEX value field changes selected attribute': function() {
            var field;

            Y.one('.palette-item[data-index="0"][data-value="#FFF"] .palette-item-inner').simulate('click');

            field = Y.one('.hsv-value[data-type="hex"]');

            Y.one('.hsv-value[data-type="hex"]').val('FABADA');

            colorPicker._hsvPaletteModal._hsvPalette._afterInputChange({
                currentTarget: field
            });

            Y.Test.Assert.areEqual('FABADA', colorPicker._hsvPaletteModal.get('selected'),
                'The stored value in ColorPicker must be FABADA');

            colorPicker._hsvPaletteModal.hide();
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-color-picker-popover', 'node-event-simulate']
});
