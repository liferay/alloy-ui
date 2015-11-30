YUI.add('aui-hsva-palette', function (A, NAME) {

/**
 * The Color Picker Component
 *
 * @module aui-color-picker
 * @submodule aui-hsva-palette
 */

var Lang = A.Lang,
    AColor = A.Color,
    AWidget = A.Widget,

    getClassName = A.getClassName,

    MIN_ALPHA = 0,

    MAX_ALPHA = 255,
    MAX_HUE = 360,
    MAX_SATURATION = 100,
    MAX_VALUE = 100,

    MAXLEN_HEX = 8,

    CSS_CONTAINER_ALPHA = getClassName('hsv-container-alpha'),

    CSS_ALPHA_CANVAS = getClassName('hsv-alpha-canvas'),
    CSS_ALPHA_SLIDER_CONTAINER = getClassName('hsv-alpha-slider-container'),
    CSS_ALPHA_SLIDER_WRAPPER = getClassName('hsv-alpha-slider-wrapper'),
    CSS_ALPHA_THUMB = getClassName('hsv-alpha-thumb'),
    CSS_ALPHA_THUMB_IMAGE = getClassName('hsv-alpha-image'),

    REGEX_HEX_COLOR_ALPHA = /^([a-f0-9]{6}|[a-f0-9]{8}|[a-f0-9]{3})$/i,

    /**
     * A base class for `HSVAPalette`.
     *
     * @class A.HSVAPalette
     * @extends A.HSVPalette
     * @param {Object} config Object literal specifying widget configuration
     *      properties.
     * @constructor
     */
    HSVAPalette = A.Base.create('hsva-palette', A.HSVPalette, [], {
        CSS_VALUE_RIGHT_SIDE_CONTAINER: 'col-sm-8 col-xs-8',

        TPL_ALPHA_CANVAS: '<span class="' + CSS_ALPHA_CANVAS + '"></span>',

        TPL_ALPHA_SLIDER_WRAPPER: '<div class="col-sm-2 col-xs-2 ' +
            CSS_ALPHA_SLIDER_WRAPPER + '"><div class="' +
            CSS_ALPHA_SLIDER_CONTAINER + '"></div></div>',

        TPL_ALPHA_THUMB: '<span class="' + CSS_ALPHA_THUMB + '"><span class="' + CSS_ALPHA_THUMB_IMAGE +
            '"></span></span>',

        /**
         * Construction logic executed during `HSVAPalette` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.set('fieldValidator.hex', REGEX_HEX_COLOR_ALPHA);

            instance.after('selectedChange', instance._updateAlphaValue, instance);

            instance.onceAfter('render', instance._updateAlphaValue, instance);
        },

        /**
         * Sets color after hex input `valueChange`.
         *
         * @method _afterHexInputChange
         * @param {EventFacade} event
         * @protected
         */
        _afterHexInputChange: function(event) {
            // YUI Code toHSVA from hex + alpha is broken, will remove the alpha
            // value
            var instance = this,
                hexColor = event.hexColor,
                alpha = hexColor.substr(6, 2),
                alphaDec = parseInt(alpha, 16);

            instance._alphaSlider.set(
                'value',
                MAX_ALPHA - alphaDec, {
                    src: AWidget.UI_SRC
                }
            );

            instance._alphaSliderContainer.setStyle('backgroundColor', hexColor);

            instance._resultView.setStyle('opacity', alphaDec / MAX_ALPHA);

            instance._setFieldValue(instance._aContainer, alphaDec);
        },

        /**
         * Calculates and returns RGB value from array of values.
         *
         * @method _calculateRGBArray
         * @param {Number} r
         * @param {Number} g
         * @param {Number} b
         * @return {String} RGB value
         * @protected
         */
        _calculateRGBArray: function(r, g, b) {
            var instance = this,
                alpha;

            alpha = 255 - instance._alphaSlider.get('value');

            return AColor.fromArray([r, g, b, alpha], 'RGBA');
        },

        /**
         * Calculates and returns RGB color value.
         *
         * @method _calculateRGBColor
         * @param {Number} hue
         * @param {Number} saturation
         * @param {Number} value
         * @return {String} RGB value
         * @protected
         */
        _calculateRGBColor: function(hue, saturation, value) {
            var instance = this,
                alpha = 255 - instance._alphaSlider.get('value');

            // TODO: Use feature checking instead
            if (A.UA.ie === 8) {
                return instance._calculateRGB(hue, saturation, value, alpha);
            }
            else {
                return instance._calculateRGBA(hue, saturation, value, alpha);
            }
        },

        /**
         * Calculates RGB color value from HSVA color value.
         *
         * @method _calculateRGBA
         * @param {Number} hue
         * @param {Number} saturation
         * @param {Number} value
         * @param {Number} alpha
         * @return {String} RGB value
         * @protected
         */
        _calculateRGBA: function(hue, saturation, value, alpha) {
            var rgbColor = 'rgb(255, 0, 0, 0)',
                hsvColor,
                tmp;

            if (hue !== MAX_HUE || Lang.toInt(saturation) !== MAX_SATURATION || Lang.toInt(value) !== MAX_VALUE) {
                hsvColor = 'hsva(' + (hue === MAX_HUE ? MAX_HUE - 1 : hue) + ', ' + saturation + '%, ' + value +
                    '%, ' + alpha + ')';

                rgbColor = AColor.toRGBA(hsvColor);

                // fix YUI bug on getting alpha - if it is 0, they return 1
                if (Lang.toInt(alpha) === 0) {
                    tmp = AColor.toArray(rgbColor);

                    tmp[3] = '0';

                    rgbColor = AColor.fromArray(tmp, 'RGBA');
                }
            }

            return rgbColor;
        },

        /**
         * Converts one color value type to another.
         *
         * @method _convertColor
         * @param {String} color value
         * @param {String} from type
         * @param {String} to type
         * @return {String} converted color value
         * @protected
         */
        _convertColor: function(value, from, to) {
            var out,
                outputHex;

            outputHex = (to === 'hex');

            if (from === 'hex') {
                value = '#' + value;
            }

            if (outputHex) {
                to = 'Hex';
            }
            else {
                to = (to + 'a').toUpperCase();
            }

            out = AColor['to' + to](value);

            if (outputHex) {
                out = out.substr(1);
            }

            return out;
        },

        /**
         * Returns container class name.
         *
         * @method _getContainerClassName
         * @return {String} class name
         * @protected
         */
        _getContainerClassName: function() {
            var instance = this,
                className;

            className = A.HSVAPalette.superclass._getContainerClassName.call(instance);

            className += ' ' + CSS_CONTAINER_ALPHA;

            return className;
        },

        /**
         * Returns hexadecimal color value.
         *
         * @method _getHexValue
         * @param {String} hexColor
         * @param {Array} rgbColorArray
         * @return {String} hex value
         * @protected
         */
        _getHexValue: function(hexColor, rgbColorArray) {
            // YUI doesn't have toRGBA method, we have to add alpha explicitly
            var alpha,
                result;

            alpha = parseInt(rgbColorArray[3], 10).toString(16);

            if (alpha.length === 1) {
                alpha = '0' + alpha;
            }

            result = hexColor + alpha;

            return result.substring(1);
        },

        /**
         * Returns HSV color values.
         *
         * @method _getHSVArray
         * @param {Number} hsv
         * @return {Array} hsv color array
         * @protected
         */
        _getHSVArray: function(hsv) {
            return AColor.toArray(hsv, 'HSVA');
        },

        /**
         * Renders alpha slider and binds events.
         *
         * @method _createAlphaSlider
         * @protected
         */
        _createAlphaSlider: function() {
            var instance = this,
                alphaThumbHeight,
                contentBox,
                slider;

            contentBox = instance.get('contentBox'),

            slider = new A.Slider({
                axis: 'y',
                min: MIN_ALPHA,
                max: MAX_ALPHA
            });

            slider.RAIL_TEMPLATE = instance.TPL_ALPHA_CANVAS;
            slider.THUMB_TEMPLATE = instance.TPL_ALPHA_THUMB;

            slider.render(instance._alphaSliderContainer);

            alphaThumbHeight = contentBox.one('.' + CSS_ALPHA_THUMB_IMAGE).get('offsetHeight');

            slider.set(
                'length',
                instance._alphaSliderContainer.get('offsetHeight') + (alphaThumbHeight / 2)
            );

            slider.on(['slideStart', 'railMouseDown'], instance._setHSContainerXY, instance);

            slider.on('valueChange', instance._onAlphaChange, instance);

            instance._alphaSlider = slider;
        },

        /**
         * Creates sliders.
         *
         * @method _createSliders
         * @protected
         */
        _createSliders: function() {
            var instance = this;

            A.HSVAPalette.superclass._createSliders.call(instance);

            instance._createAlphaSlider();
        },

        /**
         * Returns hex container configuration.
         *
         * @method _getHexContainerConfig
         * @return {Object} hex container config object
         * @protected
         */
        _getHexContainerConfig: function() {
            var instance = this;

            return {
                label: instance.get('strings').hex,
                maxlength: MAXLEN_HEX,
                suffix: '-hex',
                type: 'hex',
                unit: '',
                value: 'ff0000ff'
            };
        },

        /**
         * Formats hexadecimal color values.
         *
         * @method _normalizeHexValue
         * @param {String} hex
         * @return {String} formatted hex color value
         * @protected
         */
        _normalizeHexValue: function(hex) {
            var padding = '';

            if (hex.length === 3) {
                padding = 'fffff';
            }
            else if (hex.length === 6) {
                padding = 'ff';
            }

            return (hex += padding);
        },

        /**
         * Syncs `HSVAPalette` UI on alpha `valueChange`.
         *
         * @method _onAlphaChange
         * @param {EventFacade} event
         * @protected
         */
        _onAlphaChange: function(event) {
            var instance = this,
                alpha,
                thumbXY,
                x,
                y,
                hue,
                saturation,
                value,
                rgbColor,
                rgbColorArray,
                hexValue;

            if (event.src !== AWidget.UI_SRC) {
                alpha = event.newVal;

                instance._resultView.setStyle('opacity', 1 - (alpha / MAX_ALPHA));

                thumbXY = instance._colorThumb.getXY();

                x = (thumbXY[0] - instance._hsContainerXY[0] + instance._colorThumbGutter);
                y = (thumbXY[1] - instance._hsContainerXY[1] + instance._colorThumbGutter);

                hue = instance._calculateHue(x);
                saturation = instance._calculateSaturation(y);
                value = MAX_VALUE - instance._valueSlider.get('value');

                rgbColor = instance._calculateRGBA(hue, saturation, value, MAX_ALPHA - alpha);
                rgbColorArray = AColor.toArray(rgbColor);
                hexValue = instance._getHexValue(AColor.toHex(rgbColor), rgbColorArray);

                instance._setFieldValue(instance._outputContainer, hexValue);
                instance._setFieldValue(instance._aContainer, MAX_ALPHA - alpha);
                instance._setFieldValue(instance._rContainer, rgbColorArray[0]);
                instance._setFieldValue(instance._gContainer, rgbColorArray[1]);
                instance._setFieldValue(instance._bContainer, rgbColorArray[2]);
            }
        },

        /**
         * Renders alpha slider container.
         *
         * @method _renderAlphaSliderContainer
         * @protected
         */
        _renderAlphaSliderContainer: function() {
            var instance = this,
                sliderWrapper;

            sliderWrapper = A.Node.create(this.TPL_ALPHA_SLIDER_WRAPPER);
            instance._valueSliderWrapper.insert(sliderWrapper, 'after');

            instance._alphaSliderContainer = sliderWrapper.one(
                '.' + CSS_ALPHA_SLIDER_CONTAINER
            );
        },

        /**
         * Renders alpha field.
         *
         * @method _renderFields
         * @protected
         */
        _renderFields: function() {
            var instance = this;

            A.HSVAPalette.superclass._renderFields.apply(instance, arguments);

            instance._aContainer = instance._renderField(
                instance._labelValueHSVContainer, {
                    label: instance.get('strings').a,
                    max: 255,
                    maxlength: 3,
                    min: 0,
                    suffix: '-a',
                    type: 'alpha',
                    unit: '',
                    value: MAX_ALPHA
                }
            );
        },

        /**
         * Renders view container content.
         *
         * @method _renderViewContainerContent
         * @protected
         */
        _renderViewContainerContent: function() {
            var instance = this;

            A.HSVAPalette.superclass._renderViewContainerContent.call(instance);

            instance._renderAlphaSliderContainer();
        },

        /**
         * Updates the alpha slider's value according to the currently selected
         * hex color.
         *
         * @method _updateAlphaValue
         * @protected
         */
        _updateAlphaValue: function() {
            var alpha = this._getFieldValue(this._aContainer),
                hex = '#' + this.get('selected').substr(0, 6);

            this._alphaSlider.set(
                'value',
                MAX_ALPHA - alpha, {
                    src: AWidget.UI_SRC
                }
            );

            this._alphaSliderContainer.setStyle('backgroundColor', hex);

            this._resultView.setStyle('opacity', alpha / MAX_ALPHA);
        }
    }, {

        /**
         * Static property provides a string to identify the class.
         *
         * @property NAME
         * @type {String}
         * @static
         */
        NAME: 'hsva-palette',

        /**
         * Static property provides a string to identify the namespace.
         *
         * @property NS
         * @type {String}
         * @static
         */
        NS: 'hsva-palette'
    });

A.HSVAPalette = HSVAPalette;


}, '3.0.1', {"requires": ["aui-hsv-palette"], "skinnable": true});
