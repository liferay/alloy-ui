YUI.add('aui-color-picker-tests', function(Y) {

    //--------------------------------------------------------------------------
    // ColorPicker Tests
    //--------------------------------------------------------------------------

    var IE,
        colorPicker,
        hsvPalette,
        suite;

    suite = new Y.Test.Suite('aui-color-picker');

    colorPicker = new Y.ColorPickerPopover({
        trigger: '.color-picker-trigger',
        zIndex: 2
    }).render();

    hsvPalette = new Y.HSVPalette().render('#hsvPalette');

    IE = Y.UA.ie;

    //--------------------------------------------------------------------------
    // Test Case for ColorPicker
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'ColorPicker Trigger tests',

        // Tests: AUI-983
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

        name: 'HSV Palette Value tests',

        _should: {
            // Ignore IE 10 due to unrelated issues
            ignore: {
                'assert results view color changes with value slider change': (IE === 10),
                'assert value slider background and results view are synced correctly with selected palette color': (
                    IE === 10)
            }
        },

        // Tests: AUI-1083
        'assert results view color changes with value slider change': function() {
            var instance = this,
                hsvPaletteContainer,
                valueSlider,
                valueSliderY;

            hsvPaletteContainer = Y.one('#hsvPalette');

            valueSlider = hsvPaletteContainer.one('.hsv-value-canvas');

            valueSliderY = valueSlider.getY();

            valueSlider.simulate('mousedown', {
                clientY: (valueSliderY + 200)
            });

            valueSlider.simulate('mouseup');

            if ((IE > 0) && (IE < 10)) {
                valueSlider.simulate('mousemove');

                hsvPalette._valueSlider.set('value', 50);
            }

            instance._assertSelectedColorResultsViewEquality();
            instance._assertSliderBackgroundColorAfterValueChange();
        },

        'assert value slider background and results view are synced correctly with selected palette color': function() {
            var instance = this,
                hsvPaletteContainer,
                hsvCanvas,
                hsvCanvasXY;

            hsvPaletteContainer = Y.one('#hsvPalette');

            hsvCanvas = hsvPaletteContainer.one('.hsv-hs-container');

            hsvCanvasXY = hsvCanvas.getXY();

            hsvCanvas.simulate('mousedown', {
                clientX: (hsvCanvasXY[0] + 100),
                clientY: (hsvCanvasXY[1] + 100)
            });

            hsvCanvas.simulate('mouseup');

            instance._assertSelectedColorResultsViewEquality();
            instance._assertSliderBackgroundColorAfterValueChange();
        },

        _assertSelectedColorResultsViewEquality: function() {
            var hexInput,
                hexValue,
                hsvPaletteContainer,
                resultsView,
                resultsViewColor;

            hsvPaletteContainer = Y.one('#hsvPalette');

            hexInput = hsvPaletteContainer.one('.hsv-value[data-type=hex]');

            resultsView = hsvPaletteContainer.one('.hsv-result-view');

            hexValue = hexInput.val();

            hexValue = '#' + hexValue;

            resultsViewColor = resultsView.getStyle('backgroundColor');

            resultsViewColor = Y.Color.toHex(resultsViewColor);

            Y.Test.Assert.areEqual(hexValue.toUpperCase(), resultsViewColor.toUpperCase(),
                'selected color should be equal to background color of results view');
        },

        _assertSliderBackgroundColorAfterValueChange: function() {
            var hsv,
                hsvPaletteContainer,
                hueInputVal,
                resultsViewColor,
                rgbColor,
                saturationInputVal,
                sliderContainerColor;

            hsvPaletteContainer = Y.one('#hsvPalette');

            hueInputVal = hsvPaletteContainer.one('.hsv-value[data-type=hue]').val();

            resultsViewColor = hsvPaletteContainer.one('.hsv-result-view').getStyle('backgroundColor');

            saturationInputVal = hsvPaletteContainer.one('.hsv-value[data-type=saturation]').val();

            sliderContainerColor = hsvPaletteContainer.one('.hsv-value-slider-container').getStyle(
                'backgroundColor');

            hsv = 'hsv(' + hueInputVal + ',' + saturationInputVal + '%,' + '100%)';

            rgbColor = Y.Color.toHex(hsv);

            Y.Test.Assert.areEqual(rgbColor, Y.Color.toHex(sliderContainerColor),
                'Slider container background color should equal currently selected color with a value of 100'
            );

            // should only pass when value is less than 100
            Y.Test.Assert.areNotEqual(sliderContainerColor, resultsViewColor,
                'Slider container background color should not equal results view');
        }
    }));

    suite.add(new Y.Test.Case({

        name: 'ColorPicker value change tests',

        // Tests: AUI-1091
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
