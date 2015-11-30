YUI.add('aui-hsv-palette', function (A, NAME) {

/**
 * The Color Picker Component
 *
 * @module aui-color-picker
 * @submodule aui-hsv-palette
 */

var AColor = A.Color,
    AWidget = A.Widget,
    Lang = A.Lang,

    getClassName = A.getClassName,

    MAXLEN_HEX = 6,

    MAX_HUE = 360,
    MAX_SATURATION = 100,
    MAX_VALUE = 100,
    MAX_OPACITY_PERC = 100,

    MIN_HUE = 0,
    MIN_SATURATION = 0,
    MIN_VALUE = 0,

    SELECTOR_FORM_GROUP_ERROR = '.form-group.has-error',
    SELECTOR_FORM_GROUP = '.form-group',
    SELECTOR_HSV_VALUE = '.hsv-value',

    CSS_CONTAINER = getClassName('hsv-container'),
    CSS_CONTAINER_CONTROLS = getClassName('hsv-container-controls'),

    CSS_DEFAULT_SIZE = getClassName('hsv-default-size'),

    CSS_VIEW_CONTAINER = getClassName('hsv-view-container'),

    CSS_HS_IMAGE_CONTAINER = getClassName('hsv-image-container'),
    CSS_HS_IMAGE_WRAPPER = getClassName('hsv-image-wrapper'),

    CSS_HS_IMAGE_BACKDROP = getClassName('hsv-image-backdrop'),
    CSS_HS_VIEW_BACKDROP = getClassName('hsv-view-backdrop'),

    CSS_HS_CONTAINER = getClassName('hsv-hs-container'),
    CSS_HS_THUMB = getClassName('hsv-hs-thumb'),

    CSS_VALUE_CONTAINER = getClassName('hsv-value-container'),

    CSS_VALUE_SLIDER_CONTAINER = getClassName('hsv-value-slider-container'),
    CSS_VALUE_SLIDER_WRAPPER = getClassName('hsv-value-slider-wrapper'),

    CSS_VALUE_CANVAS = getClassName('hsv-value-canvas'),
    CSS_VALUE_THUMB = getClassName('hsv-value-thumb'),
    CSS_VALUE_THUMB_IMAGE = getClassName('hsv-value-image'),

    CSS_RESULT_VIEW = getClassName('hsv-result-view'),

    CSS_CONTROLS_WRAPPER = getClassName('hsv-controls-wrapper'),
    CSS_HEX_WRAPPER = getClassName('hsv-hex-wrapper'),
    CSS_RESULT_WRAPPER = getClassName('hsv-result-wrapper'),

    CSS_LABEL_VALUE_CONTAINER = getClassName('hsv-label-value-container'),
    CSS_LABEL_VALUE_HSV_CONTAINER = getClassName('hsv-label-value-hsv-container'),
    CSS_LABEL_VALUE_RGB_CONTAINER = getClassName('hsv-label-value-rgb-container'),
    CSS_LABEL_VALUE_OUTPUT_CONTAINER = getClassName('hsv-label-value-hex-container'),

    CSS_LABEL_VALUE = getClassName('hsv-label-value'),
    CSS_LABEL_VALUE_HEX = getClassName('hsv-label-value-hex'),

    CSS_LABEL_HIDDEN = getClassName('hsv-label-hidden'),

    CSS_LABEL = getClassName('hsv-label'),
    CSS_VALUE = getClassName('hsv-value'),

    REGEX_HEX_COLOR = /^([a-f0-9]{6}|[a-f0-9]{3})$/i,

    REGEX_RANGE_0_100 = /^([0-9]|[1-9][0-9]|100)$/,

    REGEX_RANGE_0_255 = /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,

    REGEX_RANGE_0_360 = /^([0]{0,2}[1-9]|[0]?[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|360)$/,

    /**
     * A base class for `HSVPalette`.
     *
     * @class A.HSVPalette
     * @extends Widget
     * @uses A.WidgetCssClass, A.WidgetToggle
     * @param {Object} config Object literal specifying widget configuration
     *     properties.
     * @constructor
     * @include http://alloyui.com/examples/color-picker/hsv-markup.html
     * @include http://alloyui.com/examples/color-picker/hsv.js
     */
    HSVPalette = A.Base.create('hsv-palette', A.Widget, [A.WidgetCssClass, A.WidgetToggle], {
        CSS_VALUE_RIGHT_SIDE_CONTAINER: 'col-sm-10 col-xs-10',

        TPL_CONTAINER: '<div class="row ' + CSS_CONTAINER + ' {subClass}"></div>',

        TPL_VIEW_CONTAINER: '<div class="' + CSS_VIEW_CONTAINER + '"></div>',

        TPL_IMAGE_BACKDROP: '<div class="' + CSS_HS_IMAGE_BACKDROP + '"></div>',

        TPL_IMAGE_WRAPPER: '<div class="col-xs-6 ' +
            CSS_HS_IMAGE_WRAPPER + '"><div class="' +
            CSS_HS_IMAGE_CONTAINER + '"></div></div>',

        TPL_VIEW_BACKDROP: '<div class="' + CSS_HS_VIEW_BACKDROP + '"></div>',

        TPL_HS_CONTAINER: '<div class="' + CSS_HS_CONTAINER + '"></div>',

        TPL_HS_THUMB: '<div class="' + CSS_HS_THUMB + '"></div>',

        TPL_VALUE_CONTAINER: '<div class="col-xs-6 ' + CSS_VALUE_CONTAINER + '"><div class="row"></div></div>',

        TPL_VALUE_RIGHT_SIDE_CONTAINER: '<div>' +
            '<div class="row"><div class="col-sm-6 col-xs-6 ' +
            CSS_RESULT_WRAPPER + '"></div>' +
            '<div class="col-sm-6 col-xs-6 ' + CSS_HEX_WRAPPER +
            '"></div></div><div class="row ' + CSS_CONTROLS_WRAPPER +
            '"></div></div>',

        TPL_VALUE_SLIDER_WRAPPER: '<div class="col-sm-2 col-xs-2 ' +
            CSS_VALUE_SLIDER_WRAPPER + '"><div class="' +
            CSS_VALUE_SLIDER_CONTAINER + '"></div></div>',

        TPL_VALUE_CANVAS: '<span class="' + CSS_VALUE_CANVAS + '"></span>',

        TPL_VALUE_THUMB: '<span class="' + CSS_VALUE_THUMB + '"><span class="' +
            CSS_VALUE_THUMB_IMAGE + '"></span></span>',

        TPL_RESULT_VIEW: '<div class="' + CSS_RESULT_VIEW + '"></div>',

        TPL_LABEL_VALUE_CONTAINER: '<div class="' + CSS_LABEL_VALUE_CONTAINER + ' {subClass}"></div>',

        TPL_OUTPUT: '<div class="form-group ' + CSS_LABEL_VALUE + ' ' +
            CSS_LABEL_VALUE_HEX + '">' + '<label>{label}</label>' +
            '<input class="form-control ' + CSS_VALUE +
            '" data-type="{type}" type="text" maxlength="{maxlength}" value="{value}">' +
            '</div>',

        TPL_LABEL_VALUE: '<div class="form-group input-prepend input-append">' +
            '<label class="add-on col-sm-2 col-xs-2 control-label">{label}</label>' +
            '<div class="col-sm-6 col-xs-6 form-control-wrapper"><input class="span2 form-control ' + CSS_VALUE +
            '" data-type="{type}" type="number" max="{max}" maxlength="{maxlength}" min="{min}" value="{value}"></div>' +
            '<label class="col-sm-2 col-xs-2 control-label ' + CSS_LABEL + '">{labelUnit}</label>' + '</div>',

        _outputType: 'hex',

        /**
         * Construction logic executed during `HSVPalette` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.on('selectedChange', instance._onSelectedChange, instance);
        },

        /**
         * Bind the events on the `HSVPalette` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance._hsContainer.after('mousedown', instance._afterPaletteMousedown, instance);

            instance._paletteContainer.delegate('input', instance._afterInputChange, SELECTOR_HSV_VALUE, instance);

            instance._bindDD();
        },

        /**
         * Destructor lifecycle implementation for the `HSVPalette` class.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var instance = this;

            instance._dd.destroy();
        },

        /**
         * Render the `HSVPalette` component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance._renderContainer();

            instance.get('contentBox').appendChild(instance._paletteContainer);

            instance._colorThumbGutter = Math.floor(instance._colorThumb.get('offsetHeight') / 2);

            instance._hsContainerWidth = instance._hsContainer.get('offsetWidth');
            instance._hsContainerHeight = instance._hsContainer.get('offsetHeight');

            this._createSliders();
        },

        /**
         * Updates selected color after input `valueChange`.
         *
         * @method _afterInputChange
         * @param {EventFacade} event
         * @protected
         */
        _afterInputChange: function(event) {
            var instance = this,
                fieldNode,
                type,
                value;

            fieldNode = event.currentTarget;

            if (instance._validateFieldValue(fieldNode)) {
                value = fieldNode.get('value');

                type = fieldNode.getAttribute('data-type');

                fieldNode.ancestor(SELECTOR_FORM_GROUP).removeClass('has-error');
            }
            else {
                fieldNode.ancestor(SELECTOR_FORM_GROUP).addClass('has-error');
            }

            if (!instance._paletteContainer.one(SELECTOR_FORM_GROUP_ERROR)) {
                instance._updateViewFromInput(fieldNode);
            }
        },

        /**
         * Updates color based on the X and Y coordinates.
         *
         * @method _afterHSThumbChange
         * @param {Number} x
         * @param {Number} y
         * @protected
         */
        _afterHSThumbChange: function(x, y) {
            var instance = this,
                hexColor,
                hexValue,
                hue,
                rgbColor,
                rgbColorArray,
                saturation,
                value;

            hue = instance._calculateHue(x);
            saturation = instance._calculateSaturation(y);
            value = MAX_VALUE - instance._valueSlider.get('value');

            rgbColor = instance._calculateRGBColor(hue, saturation, value);
            rgbColorArray = AColor.toArray(rgbColor);
            hexColor = AColor.toHex(rgbColor);

            hexValue = instance._getHexValue(hexColor, rgbColorArray);

            instance._resultView.setStyle('backgroundColor', hexColor);
            instance._setValueSliderContainerStyle(hue, saturation);

            instance._setFieldValue(instance._outputContainer, hexValue);
            instance._setFieldValue(instance._hContainer, Math.round(hue));
            instance._setFieldValue(instance._sContainer, Math.round(saturation));
            instance._setFieldValue(instance._rContainer, rgbColorArray[0]);
            instance._setFieldValue(instance._gContainer, rgbColorArray[1]);
            instance._setFieldValue(instance._bContainer, rgbColorArray[2]);

            instance.fire(
                'hsThumbChange', {
                    x: x,
                    y: y,
                    hexColor: hexColor
                }
            );

            instance.set('selected', hexValue, {
                src: AWidget.UI_SRC
            });
        },

        /**
         * Gets X and Y coordinates from mousedown on HS container and updates
         * color selection based on position.
         *
         * @method _afterPaletteMousedown
         * @param {EventFacade} event
         * @protected
         */
        _afterPaletteMousedown: function(event) {
            var instance = this,
                hsContainerXY,
                thumbXY,
                x,
                y;

            instance._updatePaletteThumbPosition([event.pageX, event.pageY]);

            hsContainerXY = instance._hsContainer.getXY();

            thumbXY = instance._colorThumb.getXY();

            x = (thumbXY[0] - hsContainerXY[0] + instance._colorThumbGutter);
            y = (thumbXY[1] - hsContainerXY[1] + instance._colorThumbGutter);

            instance._afterHSThumbChange(x, y);

            event.target = instance._colorThumb;

            instance._dd._handleMouseDownEvent(event);
        },

        /**
         * Sets the X and Y coordinates of the HS container on drag start.
         *
         * @method _afterPaletteDragStart
         * @protected
         */
        _afterPaletteDragStart: function() {
            var instance = this;

            instance._setHSContainerXY();
        },

        /**
         * Sets the X and Y coordinates of the HS container after drag.
         *
         * @method _afterPaletteThumbDrag
         * @param {EventFacade} event
         * @protected
         */
        _afterPaletteThumbDrag: function(event) {
            var instance = this,
                x,
                y;

            x = (event.pageX - instance._hsContainerXY[0] + instance._colorThumbGutter);
            y = (event.pageY - instance._hsContainerXY[1] + instance._colorThumbGutter);

            instance._afterHSThumbChange(x, y);
        },

        /**
         * Binds drag events to thumb selector.
         *
         * @method _bindDD
         * @protected
         */
        _bindDD: function() {
            var instance = this,
                dd;

            dd = new A.DD.Drag({
                node: instance._colorThumb
            }).plug(A.Plugin.DDConstrained, {
                constrain2node: instance._hsContainer,
                gutter: '-' + instance._colorThumbGutter
            });

            dd.after('start', instance._afterPaletteDragStart, instance);
            dd.after('drag', instance._afterPaletteThumbDrag, instance);

            instance._dd = dd;
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
            var instance = this;

            return instance._calculateRGB(hue, saturation, value);
        },

        /**
         * Calculates and returns hue value based on X position.
         *
         * @method _calculateHue
         * @param {Number} x
         * @return {Number} hue
         * @protected
         */
        _calculateHue: function(x) {
            var instance = this,
                hue;

            if (x <= MIN_HUE) {
                hue = MIN_HUE;
            }
            else if (x >= instance._hsContainerWidth) {
                hue = MAX_HUE;
            }
            else {
                hue = x / instance._hsContainerWidth * MAX_HUE;
            }

            return Math.round(hue);
        },

        /**
         * Calculates RGB color value from HSV color value.
         *
         * @method _calculateRGB
         * @param {Number} hue
         * @param {Number} saturation
         * @param {Number} value
         * @return {String} RGB value
         * @protected
         */
        _calculateRGB: function(hue, saturation, value) {
            var rgbColor = 'rgb(255, 0, 0)',
                hsvColor;

            if (hue !== MAX_HUE || Lang.toInt(saturation) !== MAX_SATURATION || Lang.toInt(value) !== MAX_VALUE) {
                hsvColor = 'hsva(' + (hue === MAX_HUE ? MAX_HUE - 1 : hue) + ', ' + saturation + '%, ' + value +
                    '%' + ')';

                rgbColor = AColor.toRGB(hsvColor);
            }

            return rgbColor;
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
            return AColor.fromArray([r, g, b], 'RGB');
        },

        /**
         * Calculates and returns saturation value based on Y position.
         *
         * @method _calculateSaturation
         * @param {Number} y
         * @return {Number} saturation
         * @protected
         */
        _calculateSaturation: function(y) {
            var instance = this,
                saturation;

            if (y <= MIN_SATURATION) {
                saturation = MAX_SATURATION;
            }
            else if (y >= instance._hsContainerHeight) {
                saturation = MIN_SATURATION;
            }
            else {
                saturation = MAX_SATURATION - (y / instance._hsContainerHeight * MAX_SATURATION);
            }

            return Math.round(saturation);
        },

        /**
         * Calculates X value based on hue input value.
         *
         * @method _calculateX
         * @param {Number} hue
         * @return {Number} x
         * @protected
         */
        _calculateX: function(hue) {
            var instance = this,
                x = this._colorThumbGutter * -1;

            if (hue <= MIN_HUE) {
                x += MIN_HUE;
            }
            else if (hue >= MAX_HUE) {
                x += instance._hsContainerWidth;
            }
            else {
                x += hue / MAX_HUE * instance._hsContainerWidth;
            }

            return x;
        },

        /**
         * Calculates Y value based on saturation input value.
         *
         * @method _calculateY
         * @param {Number} saturation
         * @return {Number} y
         * @protected
         */
        _calculateY: function(saturation) {
            var instance = this,
                y = this._colorThumbGutter * -1;

            if (saturation <= MIN_SATURATION) {
                y += instance._hsContainerHeight;
            }
            else if (saturation >= MAX_SATURATION) {
                y += MIN_SATURATION;
            }
            else {
                y += instance._hsContainerHeight / MAX_SATURATION * (MAX_SATURATION - saturation);
            }

            return y;
        },

        /**
         * Creates sliders.
         *
         * @method _createSliders
         * @protected
         */
        _createSliders: function() {
            var instance = this;

            instance._createValueSlider();
        },

        /**
         * Renders and binds events to the sliders.
         *
         * @method _createValueSlider
         * @protected
         */
        _createValueSlider: function() {
            var instance = this,
                contentBox,
                slider,
                valueThumbHeight;

            contentBox = instance.get('contentBox');

            slider = new A.Slider({
                axis: 'y',
                min: MIN_VALUE,
                max: MAX_VALUE
            });

            slider.RAIL_TEMPLATE = instance.TPL_VALUE_CANVAS;
            slider.THUMB_TEMPLATE = instance.TPL_VALUE_THUMB;

            slider.render(instance._valueSliderContainer);

            valueThumbHeight = contentBox.one('.' + CSS_VALUE_THUMB_IMAGE).get('offsetHeight');

            slider.set(
                'length',
                instance._valueSliderContainer.get('offsetHeight') + (valueThumbHeight / 2)
            );

            slider.on(['slideStart', 'railMouseDown'], instance._setHSContainerXY, instance);

            slider.on('valueChange', instance._onValueChange, instance);

            instance._valueSlider = slider;
        },

        /**
         * Returns container class name.
         *
         * @method _getContainerClassName
         * @return {String} class name
         * @protected
         */
        _getContainerClassName: function() {
            return CSS_CONTAINER_CONTROLS;
        },

        /**
         * Returns field value.
         *
         * @method _getFieldValue
         * @param {Node} fieldNode
         * @return {Number} field value
         * @protected
         */
        _getFieldValue: function(fieldNode) {
            return fieldNode.one('.' + CSS_VALUE).get('value');
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
        _getHexValue: function(hexColor) {
            return hexColor.substring(1);
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
                type: 'hex',
                unit: '',
                value: 'ff0000'
            };
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
            return AColor.toArray(hsv, 'HSV');
        },

        /**
         * Returns X and Y values from hue and saturation input values.
         *
         * @method _getXYFromHueSaturation
         * @param {Number} hue
         * @param {Number} saturation
         * @return {Array} x and y positions
         * @protected
         */
        _getXYFromHueSaturation: function(hue, saturation) {
            var instance = this,
                x,
                y;

            x = instance._calculateX(hue);

            y = instance._calculateY(saturation);

            return [x, y];
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

            if (hex.indexOf('#') === 0) {
                hex = hex.substring(1);
            }

            if (hex.length === 3) {
                padding = 'fff';
            }

            return (hex += padding).toUpperCase();
        },

        /**
         *  Updates view on `selectedChange`.
         *
         * @method _onSelectedChange
         * @param {EventFacade} event
         * @protected
         */
        _onSelectedChange: function(event) {
            var instance = this;

            if (event.src !== AWidget.UI_SRC) {
                instance._updateViewByHEX(event.newVal);
            }
        },

        /**
         * Updates color on input `valueChange`.
         *
         * @method _onValueChange
         * @param {EventFacade} event
         * @protected
         */
        _onValueChange: function(event) {
            var instance = this,
                hexColor,
                hexValue,
                hue,
                rgbColor,
                rgbColorArray,
                saturation,
                thumbXY,
                val,
                x,
                y;

            if (event.src !== AWidget.UI_SRC) {
                val = event.newVal;

                instance._hsContainer.setStyle('opacity', 1 - (val / MAX_VALUE));

                thumbXY = instance._colorThumb.getXY();

                x = (thumbXY[0] - instance._hsContainerXY[0] + instance._colorThumbGutter);
                y = (thumbXY[1] - instance._hsContainerXY[1] + instance._colorThumbGutter);

                hue = instance._calculateHue(x);
                saturation = instance._calculateSaturation(y);

                val = MAX_VALUE - val;

                rgbColor = instance._calculateRGBColor(hue, saturation, val);
                rgbColorArray = AColor.toArray(rgbColor);
                hexColor = AColor.toHex(rgbColor);
                hexValue = instance._getHexValue(hexColor, rgbColorArray);

                instance._resultView.setStyle('backgroundColor', hexColor);
                instance._setFieldValue(instance._outputContainer, hexValue);
                instance._setFieldValue(instance._vContainer, val);
                instance._setFieldValue(instance._rContainer, rgbColorArray[0]);
                instance._setFieldValue(instance._gContainer, rgbColorArray[1]);
                instance._setFieldValue(instance._bContainer, rgbColorArray[2]);

                instance.fire(
                    'valueChange', {
                        value: val,
                        hexColor: hexColor
                    }
                );

                instance.set('selected', hexValue, {
                    src: AWidget.UI_SRC
                });
            }
        },

        /**
         * Renders container.
         *
         * @method _renderContainer
         * @protected
         */
        _renderContainer: function() {
            var instance = this,
                className;

            className = instance._getContainerClassName();

            instance._paletteContainer = A.Node.create(
                Lang.sub(
                    instance.TPL_CONTAINER, {
                        subClass: className
                    }
                )
            );

            instance._renderViewContainer();
        },

        /**
         * Renders view container.
         *
         * @method _renderViewContainer
         * @protected
         */
        _renderViewContainer: function() {
            var instance = this;

            instance._viewContainer = A.Node.create(instance.TPL_VIEW_CONTAINER);

            instance._renderViewContainerContent();

            instance._paletteContainer.appendChild(instance._viewContainer);
        },

        /**
         * Renders contents of container.
         *
         * @method _renderViewContainerContent
         * @protected
         */
        _renderViewContainerContent: function() {
            var instance = this;

            instance._renderImageContainer();

            instance._renderValueContainer();
        },

        /**
         * Renders input field.
         *
         * @method _renderField
         * @param {Node} container
         * @param {Object} data
         * @return {Node} field node
         * @protected
         */
        _renderField: function(container, data) {
            var instance = this;

            return container.appendChild(
                Lang.sub(
                    instance.TPL_LABEL_VALUE, {
                        classLabel: data.classLabel || '',
                        label: data.label,
                        labelUnit: data.unit,
                        max: data.max,
                        maxlength: data.maxlength,
                        min: data.min,
                        type: data.type,
                        value: data.value
                    }
                )
            );
        },

        /**
         * Renders hexadecimal output field.
         *
         * @method _renderOutputField
         * @param {Node} container
         * @param {Object} data
         * @return {Node} field node
         * @protected
         */
        _renderOutputField: function(container, data) {
            var instance = this;

            return container.appendChild(
                Lang.sub(
                    instance.TPL_OUTPUT, {
                        label: data.label,
                        maxlength: data.maxlength,
                        type: data.type,
                        value: data.value
                    }
                )
            );
        },

        /**
         * Renders hexNode.
         *
         * @method _renderHexNode
         * @param {Node} container Container node where the contents
         *     should be rendered.
         * @protected
         */
        _renderHexNode: function(container) {
            var instance = this,
                labelValueHexContainer,
                hexContainerConfig;

            labelValueHexContainer = A.Node.create(
                Lang.sub(
                    instance.TPL_LABEL_VALUE_CONTAINER, {
                        subClass: CSS_LABEL_VALUE_OUTPUT_CONTAINER
                    }
                )
            );

            hexContainerConfig = instance._getHexContainerConfig();

            instance._outputContainer = instance._renderOutputField(labelValueHexContainer, hexContainerConfig);

            container.appendChild(labelValueHexContainer);

            instance._labelValueRGBContainer = labelValueHexContainer;
        },

        /**
         * Renders input fields.
         *
         * @method _renderFields
         * @param {Node} container Container node where the contents
         *     should be rendered.
         * @protected
         */
        _renderFields: function(container) {
            var instance = this,
                labelValueHSVContainer,
                labelValueRGBContainer;

            labelValueHSVContainer = A.Node.create(
                Lang.sub(
                    instance.TPL_LABEL_VALUE_CONTAINER, {
                        subClass: CSS_LABEL_VALUE_HSV_CONTAINER +
                            ' form-horizontal col-sm-6 col-xs-6'
                    }
                )
            );

            labelValueRGBContainer = A.Node.create(
                Lang.sub(
                    instance.TPL_LABEL_VALUE_CONTAINER, {
                        subClass: CSS_LABEL_VALUE_RGB_CONTAINER +
                            ' form-horizontal col-sm-6 col-xs-6'
                    }
                )
            );

            instance._hContainer = instance._renderField(
                labelValueHSVContainer, {
                    label: instance.get('strings').h,
                    max: 360,
                    maxlength: 3,
                    min: 0,
                    type: 'hue',
                    unit: '&#176;',
                    value: MIN_HUE
                }
            );

            instance._sContainer = instance._renderField(
                labelValueHSVContainer, {
                    label: instance.get('strings').s,
                    max: MAX_SATURATION,
                    maxlength: 3,
                    min: 0,
                    type: 'saturation',
                    unit: '%',
                    value: MAX_SATURATION
                }
            );

            instance._vContainer = instance._renderField(
                labelValueHSVContainer, {
                    label: instance.get('strings').v,
                    max: MAX_VALUE,
                    maxlength: 3,
                    min: 0,
                    type: 'value',
                    unit: '%',
                    value: MAX_VALUE
                }
            );

            instance._rContainer = instance._renderField(
                labelValueRGBContainer, {
                    classLabel: CSS_LABEL_HIDDEN,
                    label: instance.get('strings').r,
                    max: 255,
                    maxlength: 3,
                    min: 0,
                    type: 'r',
                    unit: '',
                    value: 255
                }
            );

            instance._gContainer = instance._renderField(
                labelValueRGBContainer, {
                    classLabel: CSS_LABEL_HIDDEN,
                    label: instance.get('strings').g,
                    max: 255,
                    maxlength: 3,
                    min: 0,
                    type: 'g',
                    unit: '',
                    value: 0
                }
            );
            instance._bContainer = instance._renderField(
                labelValueRGBContainer, {
                    classLabel: CSS_LABEL_HIDDEN,
                    label: instance.get('strings').b,
                    max: 255,
                    maxlength: 3,
                    min: 0,
                    type: 'b',
                    unit: '',
                    value: 0
                }
            );

            container.appendChild(labelValueHSVContainer);
            container.appendChild(labelValueRGBContainer);

            instance._labelValueHSVContainer = labelValueHSVContainer;
            instance._labelValueRGBContainer = labelValueRGBContainer;
        },

        /**
         * Renders color canvas backdrop.
         *
         * @method _renderImageBackdrop
         * @protected
         */
        _renderImageBackdrop: function() {
            var instance = this;

            instance._hsImageBackdrop = instance._hsImageContainer.appendChild(
                instance.TPL_IMAGE_BACKDROP
            );
        },

        /**
         * Renders the image container and its contents.
         *
         * @method _renderImageContainer
         * @protected
         */
        _renderImageContainer: function() {
            var imageContainer;

            imageContainer = this._viewContainer.appendChild(
                this.TPL_IMAGE_WRAPPER
            );
            this._hsImageContainer = imageContainer.one(
                '.' + CSS_HS_IMAGE_CONTAINER
            );

            this._renderImageBackdrop();

            this._renderHSContainer();

            this._renderThumb();
        },

        /**
         * Renders color canvas.
         *
         * @method _renderHSContainer
         * @protected
         */
        _renderHSContainer: function() {
            var instance = this;

            instance._hsContainer = instance._hsImageContainer.appendChild(
                instance.TPL_HS_CONTAINER
            );
        },

        _renderValueContainer: function() {
            this._valueContainer = this._viewContainer.appendChild(
                this.TPL_VALUE_CONTAINER
            );
            this._valueContainer = this._valueContainer.one('.row');

            this._renderValueSliderContainer();

            this._renderValueRightSideContainer();
        },

        _renderValueRightSideContainer: function() {
            var controlsWrapper,
                hexWrapper,
                resultWrapper,
                rightSideContainer;

            rightSideContainer = this._valueContainer.appendChild(
                this.TPL_VALUE_RIGHT_SIDE_CONTAINER
            );
            rightSideContainer.addClass(this.CSS_VALUE_RIGHT_SIDE_CONTAINER);

            resultWrapper = rightSideContainer.one('.' + CSS_RESULT_WRAPPER);
            this._renderResultBackdrop(resultWrapper);
            this._renderResultView(resultWrapper);

            hexWrapper = rightSideContainer.one('.' + CSS_HEX_WRAPPER);
            this._renderHexNode(hexWrapper);

            controlsWrapper = rightSideContainer.one('.' + CSS_CONTROLS_WRAPPER);
            this._renderFields(controlsWrapper);

            if (!this.get('controls')) {
                controlsWrapper.hide();
            }
        },

        /**
         * Renders value slider container.
         *
         * @method _renderValueSliderContainer
         * @protected
         */
        _renderValueSliderContainer: function() {
            this._valueSliderWrapper = this._valueContainer.appendChild(
                this.TPL_VALUE_SLIDER_WRAPPER
            );
            this._valueSliderContainer = this._valueSliderWrapper.one(
                '.' + CSS_VALUE_SLIDER_CONTAINER
            );
        },

        /**
         * Renders results backdrop.
         *
         * @method _renderResultBackdrop
         * @param {Node} container Container node where the contents
         *     should be rendered.
         * @protected
         */
        _renderResultBackdrop: function(container) {
            var instance = this;

            instance._resultViewBackdrop = container.appendChild(
                instance.TPL_VIEW_BACKDROP
            );
        },

        /**
         * Render results view.
         *
         * @method _renderResultView
         * @param {Node} container Container node where the contents
         *     should be rendered.
         * @protected
         */
        _renderResultView: function(container) {
            var instance = this;

            instance._resultView = container.appendChild(
                instance.TPL_RESULT_VIEW
            );
        },

        /**
         * Renders thumb selector.
         *
         * @method _renderThumb
         * @protected
         */
        _renderThumb: function() {
            var instance = this;

            instance._colorThumb = instance._hsContainer.appendChild(
                instance.TPL_HS_THUMB
            );
        },

        /**
         * Sets X and Y coordinates of HS container.
         *
         * @method _setHSContainerXY
         * @protected
         */
        _setHSContainerXY: function() {
            var instance = this;

            instance._hsContainerXY = instance._hsContainer.getXY();
        },

        /**
         * Sets value of field node.
         *
         * @method _setFieldValue
         * @param {Node} fieldNode
         * @param {Number} value
         * @protected
         */
        _setFieldValue: function(fieldNode, value) {
            fieldNode.one('.' + CSS_VALUE).set('value', value);
        },

        /**
         * Sets background style of value slider container.
         *
         * @method _setValueSliderContainerStyle
         * @param {Number} hue
         * @param {Number} saturation
         * @protected
         */
        _setValueSliderContainerStyle: function(hue, saturation) {
            var instance = this,
                rgbColor;

            rgbColor = instance._calculateRGBColor(hue, saturation, 100);

            instance._valueSliderContainer.setStyle('backgroundColor', rgbColor);
        },

        /**
         * Set the `width` attribute on the UI. This is called
         * automatically whenever the `width` attribute changes.
         *
         * @method _uiSetWidth
         * @protected
         */
        _uiSetWidth: function(val) {
            val = Lang.isNumber(val) ? val + this.DEF_UNIT : val;

            if (val) {
                this._paletteContainer.setStyle('width', val);
                this._paletteContainer.removeClass(CSS_DEFAULT_SIZE);
            }
            else {
                this._paletteContainer.setStyle('width', '');
                this._paletteContainer.addClass(CSS_DEFAULT_SIZE);
            }

            this._updateViewByHEX(this.get('selected'));
        },

        /**
         * Updates X and Y position of thumb selector.
         *
         * @method _updatePaletteThumbPosition
         * @param {Array} xy
         * @protected
         */
        _updatePaletteThumbPosition: function(xy) {
            var instance = this;

            instance._colorThumb.setXY([xy[0] - instance._colorThumbGutter, xy[1] - instance._colorThumbGutter]);
        },

        /**
         * Updates results view from input values.
         *
         * @method _updateViewFromInput
         * @param {Node} fieldNode
         * @protected
         */
        _updateViewFromInput: function(fieldNode) {
            var instance = this,
                type;

            type = fieldNode.getAttribute('data-type');

            if (type === 'hue' || type === 'saturation' || type === 'value' || type === 'alpha') {
                instance._updateViewByHSVA(fieldNode);
            }
            else if (type === 'r' || type === 'g' || type === 'b') {
                instance._updateViewByRGB(fieldNode);
            }
            else if (type === 'hex') {
                instance._updateViewByHEXNode(fieldNode);
            }
        },

        /**
         * Updates results view from HSVA input values.
         *
         * @method _updateViewByHSVA
         * @param {Node} fieldNode
         * @protected
         */
        _updateViewByHSVA: function(fieldNode) {
            var instance = this,
                hexColor,
                hexValue,
                hue,
                position,
                rgbColor,
                rgbColorArray,
                saturation,
                value;

            hue = instance._getFieldValue(instance._hContainer);
            saturation = instance._getFieldValue(instance._sContainer);
            value = instance._getFieldValue(instance._vContainer);

            position = instance._getXYFromHueSaturation(hue, saturation);

            instance._colorThumb.setStyles({
                left: position[0],
                top: position[1]
            });

            instance._valueSlider.set(
                'value',
                MAX_VALUE - value, {
                    src: AWidget.UI_SRC
                }
            );

            rgbColor = instance._calculateRGBColor(hue, saturation, value);
            rgbColorArray = AColor.toArray(rgbColor);
            hexColor = AColor.toHex(rgbColor);
            hexValue = instance._getHexValue(hexColor, rgbColorArray);

            instance._resultView.setStyle('backgroundColor', hexColor);
            instance._setValueSliderContainerStyle(hue, saturation);

            instance._hsContainer.setStyle('opacity', 1 - ((MAX_OPACITY_PERC - value) / MAX_OPACITY_PERC));

            instance._setFieldValue(instance._outputContainer, hexValue);
            instance._setFieldValue(instance._rContainer, rgbColorArray[0]);
            instance._setFieldValue(instance._gContainer, rgbColorArray[1]);
            instance._setFieldValue(instance._bContainer, rgbColorArray[2]);

            instance.fire(
                'hsvaInputChange', {
                    hexColor: hexColor,
                    node: fieldNode
                }
            );

            instance.set('selected', hexValue, {
                src: AWidget.UI_SRC
            });
        },

        /**
         * Updates results view from RGB input values.
         *
         * @method _updateViewByRGB
         * @param {Node} fieldNode
         * @protected
         */
        _updateViewByRGB: function(fieldNode) {
            var instance = this,
                b,
                g,
                hexColor,
                hexValue,
                hsv,
                hsvArray,
                hue,
                position,
                r,
                rgbArray,
                rgbColor,
                rgbColorArray,
                saturation,
                value;

            r = instance._getFieldValue(instance._rContainer);
            g = instance._getFieldValue(instance._gContainer);
            b = instance._getFieldValue(instance._bContainer);

            rgbArray = instance._calculateRGBArray(r, g, b);
            hsv = AColor.toHSV(rgbArray);
            hsvArray = instance._getHSVArray(hsv);

            hue = hsvArray[0];
            saturation = hsvArray[1];
            value = hsvArray[2];

            rgbColor = instance._calculateRGBColor(hue, saturation, value);
            rgbColorArray = AColor.toArray(rgbColor);

            hexColor = AColor.toHex(rgbColor);
            hexValue = instance._getHexValue(hexColor, rgbColorArray);

            position = instance._getXYFromHueSaturation(hue, saturation);

            instance._colorThumb.setStyles({
                left: position[0],
                top: position[1]
            });

            instance._valueSlider.set(
                'value',
                MAX_VALUE - value, {
                    src: AWidget.UI_SRC
                }
            );

            instance._resultView.setStyle('backgroundColor', hexColor);
            instance._setValueSliderContainerStyle(hue, saturation);

            instance._hsContainer.setStyle('opacity', 1 - ((MAX_OPACITY_PERC - value) / MAX_OPACITY_PERC));

            instance._setFieldValue(instance._outputContainer, hexValue);
            instance._setFieldValue(instance._hContainer, hue);
            instance._setFieldValue(instance._sContainer, saturation);
            instance._setFieldValue(instance._vContainer, value);

            instance.fire(
                'rgbInputChange', {
                    hexColor: hexColor,
                    node: fieldNode
                }
            );

            instance.set('selected', hexValue, {
                src: AWidget.UI_SRC
            });
        },

        /**
         * Updates results view from hexNode values.
         *
         * @method _updateViewByHEXNode
         * @param {Node} fieldNode
         * @protected
         */
        _updateViewByHEXNode: function(fieldNode) {
            var instance = this,
                hex;

            hex = fieldNode.get('value');

            instance._updateViewByHEX(hex);

            instance.fire(
                'hexInputChange', {
                    hexColor: hex,
                    fieldNode: fieldNode
                }
            );

            instance.set('selected', hex, {
                src: AWidget.UI_SRC
            });
        },

        /**
         * Update the HSV Palette view according to the provided HEX value.
         *
         * The function normalizes and extracts the hue, saturation, value, also
         * r, g and b and updates their representatives - the sliders, the
         * image, etc. Also, it updates the text fields (if the "controls"
         * attribute is set to true) with the extracted values.
         *
         * @method _updateViewByHEX
         * @param {String} hexValue
         * @protected
         */
        _updateViewByHEX: function(hexValue) {
            var instance = this,
                b,
                currentHexValue,
                g,
                hex,
                hexColor,
                hsvColor,
                hsvColorArray,
                hue,
                position,
                r,
                rgb,
                rgbColorArray,
                saturation,
                value;

            hex = instance._normalizeHexValue(hexValue);

            hex = hex.substr(0, 6);

            hsvColor = AColor.toHSV(hex);
            hsvColorArray = AColor.toArray(hsvColor, 'HSV');

            hue = hsvColorArray[0];
            saturation = hsvColorArray[1];
            value = hsvColorArray[2];

            rgb = AColor.toRGBA(hsvColor);
            rgbColorArray = AColor.toArray(rgb);

            r = rgbColorArray[0];
            g = rgbColorArray[1];
            b = rgbColorArray[2];

            position = instance._getXYFromHueSaturation(hsvColorArray[0], hsvColorArray[1]);

            instance._colorThumb.setStyles({
                left: position[0],
                top: position[1]
            });

            instance._valueSlider.set(
                'value',
                MAX_VALUE - value, {
                    src: AWidget.UI_SRC
                }
            );

            hexColor = '#' + hex;

            instance._resultView.setStyle('backgroundColor', hexColor);
            instance._setValueSliderContainerStyle(hue, saturation);

            instance._hsContainer.setStyle('opacity', 1 - ((MAX_OPACITY_PERC - value) / MAX_OPACITY_PERC));

            currentHexValue = instance._getFieldValue(instance._outputContainer);

            if (hexValue.toLowerCase() !== currentHexValue.toLowerCase()) {
                instance._setFieldValue(instance._outputContainer, hexValue);
            }

            instance._setFieldValue(instance._hContainer, hue);
            instance._setFieldValue(instance._sContainer, saturation);
            instance._setFieldValue(instance._vContainer, value);

            instance._setFieldValue(instance._rContainer, r);
            instance._setFieldValue(instance._gContainer, g);
            instance._setFieldValue(instance._bContainer, b);
        },

        /**
         * Validates field value.
         *
         * @method _validateFieldValue
         * @param {Node} fieldNode
         * @param {Boolean} field validation
         * @return {Boolean} The result of the validation
         * @protected
         */
        _validateFieldValue: function(fieldNode) {
            var instance = this,
                fieldValidator,
                result,
                validator,
                value;

            fieldValidator = instance.get('fieldValidator');

            validator = fieldValidator[fieldNode.getAttribute('data-type')];

            result = false;

            value = fieldNode.get('value');

            if (validator && validator.test(value)) {
                result = true;
            }

            return result;
        }
    }, {

        /**
         * Static property provides a string to identify the CSS prefix.
         *
         * @property CSS_PREFIX
         * @type {String}
         * @static
         */
        CSS_PREFIX: getClassName('hsv-palette'),

        /**
         * Static property used to define the default attribute
         * configuration for the `HSVPalette`.
         *
         * @property ATTRS
         * @type {Object}
         * @static
         */
        ATTRS: {

            /**
             * Determines if HSVA and RGB input `controls` are visible.
             *
             * @attribute controls
             * @default true
             * @type {Boolean}
             * @writeOnce
             */
            controls: {
                validator: Lang.isBoolean,
                value: true,
                writeOnce: true
            },

            /**
             * Collection of regular expressions used to validate field values.
             *
             * @attribute fieldValidator
             * @type {Object}
             */
            fieldValidator: {
                validator: Lang.isObject,
                value: {
                    alpha: REGEX_RANGE_0_255,
                    b: REGEX_RANGE_0_255,
                    g: REGEX_RANGE_0_255,
                    hex: REGEX_HEX_COLOR,
                    hue: REGEX_RANGE_0_360,
                    r: REGEX_RANGE_0_255,
                    saturation: REGEX_RANGE_0_100,
                    value: REGEX_RANGE_0_100
                }
            },

            /**
             * Currently `selected` color value.
             *
             * @attribute selected
             * @default ''
             * @type {String}
             */
            selected: {
                validator: Lang.isString,
                value: 'ff0000ff'
            },

            /**
             * Collection of strings used to label elements of the UI.
             *
             * @attribute strings
             * @type {Object}
             */
            strings: {
                value: {
                    a: 'A',
                    b: 'B',
                    g: 'G',
                    h: 'H',
                    r: 'R',
                    hex: 'Hex',
                    s: 'S',
                    v: 'V'
                }
            }
        },

        /**
         * Static property provides a string to identify the class.
         *
         * @property NAME
         * @type {String}
         * @static
         */
        NAME: 'hsv-palette',

        /**
         * Static property provides a string to identify the namespace.
         *
         * @property NS
         * @type {String}
         * @static
         */
        NS: 'hsv-palette'
    });

A.HSVPalette = HSVPalette;


}, '3.0.1', {
    "requires": [
        "aui-classnamemanager",
        "aui-widget-cssclass",
        "aui-widget-toggle",
        "aui-event-input",
        "base-build",
        "clickable-rail",
        "color-hsv",
        "dd-constrain",
        "slider",
        "widget"
    ],
    "skinnable": true
});
