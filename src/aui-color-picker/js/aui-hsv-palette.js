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

    _DOT = '.',
    _EMPTY = '',
    _POUND = '#',

    CSS_ERROR = 'error',

    BACKGROUND_COLOR = 'backgroundColor',
    CHANGE = 'change',
    CHILDREN = 'children',
    CLIENT_HEIGHT = 'clientHeight',
    CLIENT_WIDTH = 'clientWidth',
    COLOR_TYPE_HSV = 'HSV',
    CONTENT_BOX = 'contentBox',
    CONTROLS = 'controls',
    DATA_TYPE = 'data-type',
    DEFAULT_HEX_VALUE = 'ff0000',
    DEFAULT_PADDING = 'fff',
    DEFAULT_RGB = 'rgb(255, 0, 0)',
    DRAG = 'drag',
    FIELD_VALIDATOR = 'fieldValidator',
    HEX_INPUT_CHANGE = 'hexInputChange',
    HS_THUMB_CHANGE = 'hsThumbChange',
    HSVA_INPUT_CHANGE = 'hsvaInputChange',
    INPUT = 'input',
    LENGTH = 'length',
    OFFSET_HEIGHT = 'offsetHeight',
    OPACITY = 'opacity',
    RAIL_MOUSEDOWN = 'railMouseDown',
    RENDER = 'render',
    RGB = 'RGB',
    RGB_INPUT_CHANGE = 'rgbInputChange',
    SELECTED = 'selected',
    SELECTED_CHANGE = 'selectedChange',
    SELECTED_INDEX = 'selectedIndex',
    SLIDE_START = 'slideStart',
    START = 'start',
    STRINGS = 'strings',
    TO = 'to',
    VALUE = 'value',
    VALUE_CHANGE = 'valueChange',

    MAXLEN_B = 3,
    MAXLEN_G = 3,
    MAXLEN_HEX = 6,
    MAXLEN_HUE = 3,
    MAXLEN_R = 3,
    MAXLEN_SATURATION = 3,
    MAXLEN_VALUE = 3,

    MAX_ALPHA = 100,
    MAX_R = '255',
    MAX_HUE = 360,
    MAX_SATURATION = 100,
    MAX_VALUE = 100,
    MAX_OPACITY_PERC = 100,

    MIN_B = 0,
    MIN_G = 0,
    MIN_HUE = 0,
    MIN_R = 0,
    MIN_SATURATION = 0,
    MIN_VALUE = 0,
    MOUSEDOWN = 'mousedown',

    TYPE_ALPHA = 'alpha',
    TYPE_B = 'b',
    TYPE_G = 'g',
    TYPE_HEX = 'hex',
    TYPE_HSV = 'hsv',
    TYPE_HUE = 'hue',
    TYPE_R = 'r',
    TYPE_RGB = 'rgb',
    TYPE_SATURATION = 'saturation',
    TYPE_VALUE = 'value',

    UNIT_HUE = '&#176;',
    UNIT_SATURATION = '%',
    UNIT_VALUE = '%',

    SELECTOR_CONTROL_GROUP_ERROR = '.control-group.error',
    SELECTOR_CONTROL_GROUP = '.control-group',
    SELECTOR_HSV_VALUE = '.hsv-value',

    CSS_CONTAINER = getClassName('hsv-container'),
    CSS_CONTAINER_CONTROLS = getClassName('hsv-container-controls'),

    CSS_VIEW_CONTAINER = getClassName('hsv-view-container'),

    CSS_HS_IMAGE_BACKDROP = getClassName('hsv-image-backdrop'),
    CSS_HS_VIEW_BACKDROP = getClassName('hsv-view-backdrop'),

    CSS_HS_CONTAINER = getClassName('hsv-hs-container'),
    CSS_HS_THUMB = getClassName('hsv-hs-thumb'),

    CSS_VALUE_SLIDER_CONTAINER = getClassName('hsv-value-slider-container'),

    CSS_VALUE_CANVAS = getClassName('hsv-value-canvas'),
    CSS_VALUE_THUMB = getClassName('hsv-value-thumb'),
    CSS_VALUE_THUMB_IMAGE = getClassName('hsv-value-image'),

    CSS_RESULT_VIEW = getClassName('hsv-result-view'),

    CSS_LABEL_VALUE_CONTAINER = getClassName('hsv-label-value-container'),
    CSS_LABEL_VALUE_HSV_CONTAINER = getClassName('hsv-label-value-hsv-container'),
    CSS_LABEL_VALUE_RGB_CONTAINER = getClassName('hsv-label-value-rgb-container'),
    CSS_LABEL_VALUE_OUTPUT_CONTAINER = getClassName('hsv-label-value-hex-container'),

    CSS_LABEL_VALUE = getClassName('hsv-label-value'),
    CSS_LABEL_VALUE_HEX = getClassName('hsv-label-value-hex'),

    CSS_LABEL_HIDDEN = getClassName('hsv-label-hidden'),

    CSS_LABEL = getClassName('hsv-label'),
    CSS_VALUE = getClassName('hsv-value'),

    NAME = 'hsv-palette',

    REGEX_HEX_COLOR = /^([a-f0-9]{6}|[a-f0-9]{3})$/i,

    REGEX_RANGE_0_100 = /^([0-9]|[1-9][0-9]|100)$/,

    REGEX_RANGE_0_255 = /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,

    REGEX_RANGE_0_360 = /^([0]{0,2}[1-9]|[0]?[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|360)$/,

/**
 * A base class for HSVPalette.
 *
 * @class A.HSVPalette
 * @extends A.Widget
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
HSVPalette = A.Base.create(NAME, A.Widget, [A.WidgetCssClass, A.WidgetToggle], {
    TPL_CONTAINER:
        '<div class="' + CSS_CONTAINER + ' {subClass}"><div>',

    TPL_VIEW_CONTAINER:
        '<div class="' + CSS_VIEW_CONTAINER + '"><div>',

    TPL_IMAGE_BACKDROP:
        '<div class="' + CSS_HS_IMAGE_BACKDROP + '"><div>',

    TPL_VIEW_BACKDROP:
        '<div class="' + CSS_HS_VIEW_BACKDROP + '"><div>',

    TPL_HS_CONTAINER:
        '<div class="' + CSS_HS_CONTAINER + '"><div>',

    TPL_HS_THUMB:
        '<div class="' + CSS_HS_THUMB + '"><div>',

    TPL_VALUE_SLIDER_CONTAINER:
        '<div class="' + CSS_VALUE_SLIDER_CONTAINER + '"><div>',

    TPL_VALUE_CANVAS: '<span class="' + CSS_VALUE_CANVAS + '"></span>',

    TPL_VALUE_THUMB: '<span class="' + CSS_VALUE_THUMB + '"><span class="' + CSS_VALUE_THUMB_IMAGE + '"></span></span>',

    TPL_RESULT_VIEW: '<div class="' + CSS_RESULT_VIEW + '"></div>',

    TPL_LABEL_VALUE_CONTAINER:  '<div class="' + CSS_LABEL_VALUE_CONTAINER + ' {subClass}"></div>',

    TPL_OUTPUT:  '<div class="control-group ' + CSS_LABEL_VALUE + ' ' + CSS_LABEL_VALUE_HEX + '">' +
                    '<label>{label}</label>' +
                    '<div class="controls">' +
                        '<input class="' + CSS_VALUE + '" data-type="{type}" type="text" maxlength="{maxlength}" value="{value}">' +
                    '</div>' +
                '</div>',

    TPL_LABEL_VALUE: '<div class="control-group input-prepend input-append">' +
                        '<label class="add-on">{label}</label>' +
                        '<input class="span2 ' + CSS_VALUE + '" data-type="{type}" type="text" maxlength="{maxlength}" value="{value}">' +
                        '<label class="' + CSS_LABEL + '">{labelUnit}</label>' +
                    '</div>',

    _outputType: TYPE_HEX,

    /**
     * Construction logic executed during HSVPalette instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.onceAfter(RENDER, instance._createSliders, instance);

        instance.on(SELECTED_CHANGE, instance._onSelectedChange, instance);
    },

    /**
     * Bind the events on the HSVPalette UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var instance = this;

        instance._hsContainer.after(MOUSEDOWN, instance._afterPaletteMousedown, instance);

        instance._paletteContainer.delegate(INPUT, instance._afterInputChange, SELECTOR_HSV_VALUE, instance);

        instance._bindDD();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var instance = this;

        instance._dd.destroy();
    },

    /**
     * Render the HSVPalette component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this;

        instance._renderContainer();

        instance.get(CONTENT_BOX).appendChild(instance._paletteContainer);

        instance._colorThumbGutter = Math.floor(instance._colorThumb.get(OFFSET_HEIGHT) / 2);

        instance._hsContainerWidth = instance._hsContainer.get(CLIENT_WIDTH);
        instance._hsContainerHeight = instance._hsContainer.get(CLIENT_HEIGHT);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterInputChange
     * @param event
     * @protected
     */
    _afterInputChange: function(event) {
        var instance = this,
            fieldNode,
            type,
            value;

        fieldNode = event.currentTarget;

        if (instance._validateFieldValue(fieldNode)) {
            value = fieldNode.get(VALUE);

            type = fieldNode.getAttribute(DATA_TYPE);

            fieldNode.ancestor(SELECTOR_CONTROL_GROUP).removeClass(CSS_ERROR);
        }
        else {
            fieldNode.ancestor(SELECTOR_CONTROL_GROUP).addClass(CSS_ERROR);
        }

        if (!instance._paletteContainer.one(SELECTOR_CONTROL_GROUP_ERROR)) {
            instance._updateViewFromInput(fieldNode);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterHSThumbChange
     * @param x
     * @param y
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
        value = MAX_VALUE - instance._valueSlider.get(VALUE);

        rgbColor = instance._calculateRGBColor(hue, saturation, value);
        rgbColorArray = AColor.toArray(rgbColor);
        hexColor = AColor.toHex(rgbColor);

        hexValue = instance._getHexValue(hexColor, rgbColorArray);

        instance._resultView.setStyle(BACKGROUND_COLOR, hexColor);
        instance._valueSliderContainer.setStyle(BACKGROUND_COLOR, hexColor);

        instance._setFieldValue(instance._outputContainer, hexValue);

        if (instance.get(CONTROLS)) {
            instance._setFieldValue(instance._hContainer, Math.round(hue));
            instance._setFieldValue(instance._sContainer, Math.round(saturation));
            instance._setFieldValue(instance._rContainer, rgbColorArray[0]);
            instance._setFieldValue(instance._gContainer, rgbColorArray[1]);
            instance._setFieldValue(instance._bContainer, rgbColorArray[2]);
        }

        instance.fire(
            HS_THUMB_CHANGE,
            {
                x: x,
                y: y,
                hexColor: hexColor
            }
        );

        instance.set(SELECTED, hexValue, {
            src: AWidget.UI_SRC
        });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterPaletteMousedown
     * @param event
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterPaletteDragStart
     * @protected
     */
    _afterPaletteDragStart: function() {
        var instance = this;

        instance._setHSContainerXY();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterPaletteThumbDrag
     * @param event
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
     * TODO. Wanna help? Please send a Pull Request.
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

        dd.after(START, instance._afterPaletteDragStart, instance);
        dd.after(DRAG, instance._afterPaletteThumbDrag, instance);

        instance._dd = dd;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _calculateRGBColor
     * @param hue, saturation, value
     * @protected
     */
    _calculateRGBColor: function(hue, saturation, value) {
        var instance = this;

        return instance._calculateRGB(hue, saturation, value);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _calculateHue
     * @param x
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

        return hue;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _calculateRGB
     * @param hue, saturation, value
     * @protected
     */
    _calculateRGB: function(hue, saturation, value) {
        var rgbColor = DEFAULT_RGB,
            hsvColor;

        if (hue !== MAX_HUE || Lang.toInt(saturation) !== MAX_SATURATION || Lang.toInt(value) !== MAX_VALUE) {
            hsvColor = 'hsva(' + (hue === MAX_HUE ? MAX_HUE - 1 : hue) + ', ' + saturation + '%, ' + value + '%' + ')';

            rgbColor = AColor.toRGB(hsvColor);
        }

        return rgbColor;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _calculateRGBArray
     * @param r, g, b
     * @protected
     */
    _calculateRGBArray: function(r, g, b) {
        var instance = this;

        return AColor.fromArray([r, g, b], RGB);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _calculateSaturation
     * @param y
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

        return saturation;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _calculateX
     * @param hue
     * @protected
     */
    _calculateX: function(hue) {
        var instance = this,
            x;

        if (hue <= MIN_HUE) {
            x = MIN_HUE;
        }
        else if (hue >= MAX_HUE) {
            x = instance._hsContainerWidth;
        }
        else {
            x = hue / MAX_HUE * instance._hsContainerWidth;
        }

        return x;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _calculateY
     * @param saturation
     * @protected
     */
    _calculateY: function(saturation) {
        var instance = this,
            y;

        if (saturation <= MIN_SATURATION) {
            y = instance._hsContainerHeight;
        }
        else if (saturation >= MAX_SATURATION) {
            y = MIN_SATURATION;
        }
        else {
            y = instance._hsContainerHeight / MAX_SATURATION * (MAX_SATURATION - saturation);
        }

        return y;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _createSliders
     * @protected
     */
    _createSliders: function() {
        var instance = this;

        instance._createValueSlider();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _createValueSlider
     * @protected
     */
    _createValueSlider: function() {
        var instance = this,
            contentBox,
            slider,
            valueThumbHeight;

        contentBox = instance.get(CONTENT_BOX);

        slider = new A.Slider(
            {
                axis: 'y',
                min: MIN_VALUE,
                max: MAX_VALUE
            }
        );

        slider.RAIL_TEMPLATE = instance.TPL_VALUE_CANVAS;
        slider.THUMB_TEMPLATE = instance.TPL_VALUE_THUMB;

        slider.render(instance._valueSliderContainer);

        valueThumbHeight = contentBox.one(_DOT + CSS_VALUE_THUMB_IMAGE).get(OFFSET_HEIGHT);

        slider.set(
            LENGTH,
            instance._valueSliderContainer.get(OFFSET_HEIGHT) + (valueThumbHeight / 2)
        );

        slider.on([SLIDE_START, RAIL_MOUSEDOWN], instance._setHSContainerXY, instance);

        slider.on(VALUE_CHANGE, instance._onValueChange, instance);

        instance._valueSlider = slider;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getContainerClassName
     * @protected
     */
    _getContainerClassName: function() {
        var instance = this,
            className = _EMPTY;

        if (instance.get(CONTROLS)) {
            className = CSS_CONTAINER_CONTROLS;
        }

        return className;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getFieldValue
     * @param fieldNode
     * @protected
     */
    _getFieldValue: function(fieldNode) {
        var instance = this;

        return fieldNode.one(_DOT + CSS_VALUE).get(VALUE);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getHexValue
     * @param hexColor, rgbColorArray
     * @protected
     */
    _getHexValue: function(hexColor, rgbColorArray) {
        return hexColor.substring(1);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getHexContainerConfig
     * @protected
     */
    _getHexContainerConfig: function() {
        var instance = this;

        return {
            label: instance.get(STRINGS).hex,
            maxlength: MAXLEN_HEX,
            type: TYPE_HEX,
            unit: _EMPTY,
            value: DEFAULT_HEX_VALUE
        };
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getHSVArray
     * @param hsv
     * @protected
     */
    _getHSVArray: function(hsv) {
        var instance = this;

        return AColor.toArray(hsv, COLOR_TYPE_HSV);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getXYFromHueSaturation
     * @param hue, saturation
     * @protected
     */
    _getXYFromHueSaturation: function(hue, saturation) {
        var instance = this,
            x,
            y;

        x = instance._calculateX(hue);

        y = instance._calculateY(saturation);

        return [x,y];
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _normalizeHexValue
     * @param hex
     * @protected
     */
    _normalizeHexValue: function(hex) {
        var padding = _EMPTY;

        if (hex.indexOf(_POUND) === 0) {
            hex = hex.substring(1);
        }

        if (hex.length === 3) {
            padding = DEFAULT_PADDING;
        }

        return (hex += padding).toUpperCase();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onSelectedChange
     * @param event
     * @protected
     */
    _onSelectedChange: function(event) {
        var instance = this;

        if (event.src !== AWidget.UI_SRC) {
            instance._updateViewByHEX(event.newVal);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onValueChange
     * @param event
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

            instance._hsContainer.setStyle(OPACITY, 1 - (val / MAX_VALUE));

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

            instance._setFieldValue(instance._outputContainer, hexValue);

            if (instance.get(CONTROLS)) {
                instance._setFieldValue(instance._vContainer, val);
                instance._setFieldValue(instance._rContainer, rgbColorArray[0]);
                instance._setFieldValue(instance._gContainer, rgbColorArray[1]);
                instance._setFieldValue(instance._bContainer, rgbColorArray[2]);
            }

            instance.fire(
                VALUE_CHANGE,
                {
                    value: val,
                    hexColor: hexColor
                }
            );

            instance.set(SELECTED, hexValue, {
                src: AWidget.UI_SRC
            });
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
                instance.TPL_CONTAINER,
                {
                    subClass: className
                }
            )
        );

        instance._renderViewContainer();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderViewContainerContent
     * @protected
     */
    _renderViewContainerContent: function() {
        var instance = this;

        instance._renderImageBackdrop();

        instance._renderHSContainer();

        instance._renderThumb();

        instance._renderValueSliderContainer();

        instance._renderResultBackdrop();

        instance._renderResultView();

        if (instance.get(CONTROLS)) {
            instance._renderFields();
        }

        instance._renderHexNode();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderField
     * @param container, data
     * @protected
     */
    _renderField: function(container, data) {
        var instance = this;

        return container.appendChild(
            Lang.sub(
                instance.TPL_LABEL_VALUE,
                {
                    classLabel: data.classLabel || _EMPTY,
                    label: data.label,
                    labelUnit: data.unit,
                    maxlength: data.maxlength,
                    type: data.type,
                    value: data.value
                }
            )
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderOutputField
     * @param container, data
     * @protected
     */
    _renderOutputField: function(container, data) {
        var instance = this;

        return container.appendChild(
            Lang.sub(
                instance.TPL_OUTPUT,
                {
                    label: data.label,
                    maxlength: data.maxlength,
                    type: data.type,
                    value: data.value
                }
            )
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderHexNode
     * @protected
     */
    _renderHexNode: function() {
        var instance = this,
            labelValueHexContainer,
            hexContainerConfig;

        labelValueHexContainer = A.Node.create(
            Lang.sub(
                instance.TPL_LABEL_VALUE_CONTAINER,
                {
                    subClass: CSS_LABEL_VALUE_OUTPUT_CONTAINER
                }
            )
        );

        hexContainerConfig = instance._getHexContainerConfig();

        instance._outputContainer = instance._renderOutputField(labelValueHexContainer, hexContainerConfig);

        instance._viewContainer.appendChild(labelValueHexContainer);

        instance._labelValueRGBContainer = labelValueHexContainer;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderFields
     * @protected
     */
    _renderFields: function() {
        var instance = this,
            labelValueHSVContainer,
            labelValueRGBContainer;

        labelValueHSVContainer = A.Node.create(
            Lang.sub(
                instance.TPL_LABEL_VALUE_CONTAINER,
                {
                    subClass: CSS_LABEL_VALUE_HSV_CONTAINER
                }
            )
        );

        labelValueRGBContainer = A.Node.create(
            Lang.sub(
                instance.TPL_LABEL_VALUE_CONTAINER,
                {
                    subClass: CSS_LABEL_VALUE_RGB_CONTAINER
                }
            )
        );

        instance._hContainer = instance._renderField(
            labelValueHSVContainer,
            {
                label: instance.get(STRINGS).h,
                maxlength: MAXLEN_HUE,
                type: TYPE_HUE,
                unit: UNIT_HUE,
                value: MIN_HUE
            }
        );

        instance._sContainer = instance._renderField(
            labelValueHSVContainer,
            {
                label: instance.get(STRINGS).s,
                maxlength: MAXLEN_SATURATION,
                type: TYPE_SATURATION,
                unit: UNIT_SATURATION,
                value: MAX_SATURATION
            }
        );

        instance._vContainer = instance._renderField(
            labelValueHSVContainer,
            {
                label: instance.get(STRINGS).v,
                maxlength: MAXLEN_VALUE,
                type: TYPE_VALUE,
                unit: UNIT_VALUE,
                value: MAX_VALUE
            }
        );

        instance._rContainer = instance._renderField(
            labelValueRGBContainer,
            {
                classLabel: CSS_LABEL_HIDDEN,
                label: instance.get(STRINGS).r,
                maxlength: MAXLEN_R,
                type: TYPE_R,
                unit: _EMPTY,
                value: MAX_R
            }
        );

        instance._gContainer = instance._renderField(
            labelValueRGBContainer,
            {
                classLabel: CSS_LABEL_HIDDEN,
                label: instance.get(STRINGS).g,
                maxlength: MAXLEN_G,
                type: TYPE_G,
                unit: _EMPTY,
                value: MIN_G
            }
        );
        instance._bContainer = instance._renderField(
            labelValueRGBContainer,
            {
                classLabel: CSS_LABEL_HIDDEN,
                label: instance.get(STRINGS).b,
                maxlength: MAXLEN_B,
                type: TYPE_B,
                unit: _EMPTY,
                value: MIN_B
            }
        );

        instance._viewContainer.appendChild(labelValueHSVContainer);
        instance._viewContainer.appendChild(labelValueRGBContainer);

        instance._labelValueHSVContainer = labelValueHSVContainer;
        instance._labelValueRGBContainer = labelValueRGBContainer;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderImageBackdrop
     * @protected
     */
    _renderImageBackdrop: function() {
        var instance = this;

        instance._hsImageBackdrop = instance._viewContainer.appendChild(
            instance.TPL_IMAGE_BACKDROP
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderHSContainer
     * @protected
     */
    _renderHSContainer: function() {
        var instance = this;

        instance._hsContainer = instance._viewContainer.appendChild(
            instance.TPL_HS_CONTAINER
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderValueSliderContainer
     * @protected
     */
    _renderValueSliderContainer: function() {
        var instance = this;

        instance._valueSliderContainer = instance._viewContainer.appendChild(
            instance.TPL_VALUE_SLIDER_CONTAINER
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderResultBackdrop
     * @protected
     */
    _renderResultBackdrop: function() {
        var instance = this;

        instance._resultViewBackdrop = instance._viewContainer.appendChild(
            instance.TPL_VIEW_BACKDROP
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderResultView
     * @protected
     */
    _renderResultView: function() {
        var instance = this;

        instance._resultView = instance._viewContainer.appendChild(
            instance.TPL_RESULT_VIEW
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderThumb
     * @protected
     */
    _renderThumb: function() {
        var instance = this;

        instance._colorThumb = instance._viewContainer.appendChild(
            instance.TPL_HS_THUMB
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _setHSContainerXY
     * @protected
     */
    _setHSContainerXY: function() {
        var instance = this;

        instance._hsContainerXY = instance._hsContainer.getXY();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _setFieldValue
     * @param fieldNode, value
     * @protected
     */
    _setFieldValue: function(fieldNode, value) {
        var instance = this;

        fieldNode.one(_DOT + CSS_VALUE).set(VALUE, value);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _updatePaletteThumbPosition
     * @param xy
     * @protected
     */
    _updatePaletteThumbPosition: function(xy) {
        var instance = this;

        instance._colorThumb.setXY([xy[0] - instance._colorThumbGutter, xy[1] - instance._colorThumbGutter]);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _updateViewFromInput
     * @param fieldNode
     * @protected
     */
    _updateViewFromInput: function(fieldNode) {
        var instance = this,
            type;

        type = fieldNode.getAttribute(DATA_TYPE);

        if (type === TYPE_HUE || type === TYPE_SATURATION || type === VALUE || type === TYPE_ALPHA) {
            instance._updateViewByHSVA(fieldNode);
        }
        else if(type === TYPE_R || type === TYPE_G || type === TYPE_B) {
            instance._updateViewByRGB(fieldNode);
        }
        else if(type === TYPE_HEX) {
            instance._updateViewByHEXNode(fieldNode);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _updateViewByHSVA
     * @param fieldNode
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

        instance._colorThumb.setStyles(
            {
                left: position[0],
                top: position[1]
            }
        );

        instance._valueSlider.set(
            VALUE,
            MAX_VALUE - value,
            {
                src: AWidget.UI_SRC
            }
        );

        rgbColor = instance._calculateRGBColor(hue, saturation, value);
        rgbColorArray = AColor.toArray(rgbColor);
        hexColor = AColor.toHex(rgbColor);
        hexValue = instance._getHexValue(hexColor, rgbColorArray);

        instance._resultView.setStyle(BACKGROUND_COLOR, hexColor);
        instance._valueSliderContainer.setStyle(BACKGROUND_COLOR, hexColor);

        instance._hsContainer.setStyle(OPACITY, 1 - ((MAX_OPACITY_PERC - value) / MAX_OPACITY_PERC));

        instance._setFieldValue(instance._outputContainer, hexValue);

        if (instance.get(CONTROLS)) {
            instance._setFieldValue(instance._rContainer, rgbColorArray[0]);
            instance._setFieldValue(instance._gContainer, rgbColorArray[1]);
            instance._setFieldValue(instance._bContainer, rgbColorArray[2]);
        }

        instance.fire(
            HSVA_INPUT_CHANGE,
            {
                hexColor: hexColor,
                node: fieldNode
            }
        );

        instance.set(SELECTED, hexValue, {
            src: AWidget.UI_SRC
        });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _updateViewByRGB
     * @param fieldNode
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

        instance._colorThumb.setStyles(
            {
                left: position[0],
                top: position[1]
            }
        );

        instance._valueSlider.set(
            VALUE,
            MAX_VALUE - value,
            {
                src: AWidget.UI_SRC
            }
        );

        instance._resultView.setStyle(BACKGROUND_COLOR, hexColor);
        instance._valueSliderContainer.setStyle(BACKGROUND_COLOR, hexColor);

        instance._hsContainer.setStyle(OPACITY, 1 - ((MAX_OPACITY_PERC - value) / MAX_OPACITY_PERC));

        instance._setFieldValue(instance._outputContainer, hexValue);

        if (instance.get(CONTROLS)) {
            instance._setFieldValue(instance._hContainer, hue);
            instance._setFieldValue(instance._sContainer, saturation);
            instance._setFieldValue(instance._vContainer, value);
        }

        instance.fire(
            RGB_INPUT_CHANGE,
            {
                hexColor: hexColor,
                node: fieldNode
            }
        );

        instance.set(SELECTED, hexValue, {
            src: AWidget.UI_SRC
        });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _updateViewByHEXNode
     * @param fieldNode
     * @protected
     */
    _updateViewByHEXNode: function(fieldNode) {
        var instance = this,
            hex;

        hex = fieldNode.get(VALUE);

        instance._updateViewByHEX(hex);

        instance.fire(
            HEX_INPUT_CHANGE,
            {
                hexColor: hex,
                fieldNode: fieldNode
            }
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _updateViewByHEX
     * @param hex
     * @protected
     */
    _updateViewByHEX: function(hex) {
        var instance = this,
            b,
            g,
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

        hex = instance._normalizeHexValue(hex);

        hex = hex.substr(0, 6);

        hsvColor = AColor.toHSV(hex);
        hsvColorArray = AColor.toArray(hsvColor, COLOR_TYPE_HSV);

        hue = hsvColorArray[0];
        saturation = hsvColorArray[1];
        value = hsvColorArray[2];

        rgb = AColor.toRGBA(hsvColor);
        rgbColorArray = AColor.toArray(rgb);

        r = rgbColorArray[0];
        g = rgbColorArray[1];
        b = rgbColorArray[2];

        position = instance._getXYFromHueSaturation(hsvColorArray[0], hsvColorArray[1]);

        instance._colorThumb.setStyles(
            {
                left: position[0],
                top: position[1]
            }
        );

        instance._valueSlider.set(
            VALUE,
            MAX_VALUE - value,
            {
                src: AWidget.UI_SRC
            }
        );

        hexColor = _POUND + hex;

        instance._resultView.setStyle(BACKGROUND_COLOR, hexColor);
        instance._valueSliderContainer.setStyle(BACKGROUND_COLOR, hexColor);

        instance._hsContainer.setStyle(OPACITY, 1 - ((MAX_OPACITY_PERC - value) / MAX_OPACITY_PERC));

        if (instance.get(CONTROLS)) {
            instance._setFieldValue(instance._hContainer, hue);
            instance._setFieldValue(instance._sContainer, saturation);
            instance._setFieldValue(instance._vContainer, value);

            instance._setFieldValue(instance._rContainer, r);
            instance._setFieldValue(instance._gContainer, g);
            instance._setFieldValue(instance._bContainer, b);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _validateFieldValue
     * @param fieldNode
     * @protected
     */
    _validateFieldValue: function(fieldNode) {
        var instance = this,
            fieldValidator,
            result,
            validator,
            value;

        fieldValidator = instance.get(FIELD_VALIDATOR);

        validator = fieldValidator[fieldNode.getAttribute(DATA_TYPE)];

        result = false;

        value = fieldNode.get(VALUE);

        if (validator && validator.test(value)) {
            result = true;
        }

        return result;
    }
}, {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property HSVPalette.CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: getClassName(NAME),

    /**
     * Static property used to define the default attribute
     * configuration for the HSVPalette.
     *
     * @property HSVPalette.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute controls
         * @default true
         * @type Boolean
         * @writeOnce
         */
        controls: {
            validator: Lang.isBoolean,
            value: true,
            writeOnce: true
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute fieldValidator
         * @type Object
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
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute selected
         * @default ''
         * @type String
         */
        selected: {
            validator: Lang.isString,
            value: _EMPTY
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute strings
         * @type Object
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
     * @property HSVPalette.NAME
     * @type String
     * @static
     */
    NAME: NAME,

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property HSVPalette.NS
     * @type String
     * @static
     */
    NS: NAME
});

A.HSVPalette = HSVPalette;