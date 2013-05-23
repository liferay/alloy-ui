/**
 * The ProgressBar Utility provides a visual means of showing progress of an
 * ongoing operation. The ProgressBar can be enhanced via CSS styles to provide
 * different colors, shapes and textures. The bar can move horizontally or
 * vertically. The movement can be enhanced by using the Animation utility.
 *
 * @module aui-progressbar
 */

var L = A.Lang,
    isNumber = L.isNumber,
    isString = L.isString,
    isUndefined = L.isUndefined,

    BLANK = '',
    DOT = '.',
    SPACE = ' ',

    AUTO = 'auto',
    BAR = 'bar',
    BOUNDING_BOX = 'boundingBox',
    COMPLETE = 'complete',
    CONTENT_BOX = 'contentBox',
    HEIGHT = 'height',
    HORIZONTAL = 'horizontal',
    LABEL = 'label',
    LINE_HEIGHT = 'lineHeight',
    MAX = 'max',
    MIN = 'min',
    OFFSET_HEIGHT = 'offsetHeight',
    ORIENTATION = 'orientation',
    P = 'p',
    PROGRESS = 'progress',
    PX = 'px',
    RATIO = 'ratio',
    STEP = 'step',
    TEXT = 'text',
    TEXT_NODE = 'textNode',
    USE_ARIA = 'useARIA',
    VALUE = 'value',
    VALUEMAX = 'valuemax',
    VALUEMIN = 'valuemin',
    VALUENOW = 'valuenow',
    VERTICAL = 'vertical',
    WIDTH = 'width',

    toNumber = function(v) {
        return parseFloat(v) || 0;
    },

    getCN = A.getClassName,

    CSS_BAR = getCN(BAR),
    CSS_HORIZONTAL = getCN(HORIZONTAL),
    CSS_VERTICAL = getCN(VERTICAL),

    TPL_TEXT = '<p></p>';

/**
 * A base class for Progressbar, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>A visual means of showing progress of an ongoing operation</li>
 *    <li>Can be enhanced via CSS styles to provide different colors, shapes and textures</li>
 *    <li>The bar can move horizontally or vertically</li>
 *    <li>The movement can be enhanced by using the Animation utility</li>
 * </ul>
 *
 * Check the [live demo](http://alloyui.com/examples/progressbar/).
 *
 * @class A.ProgressBar
 * @extends A.Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var ProgressBar = A.Component.create(
    {
        /**
         * Static property provides a string to identify the class.
         *
         * @property ProgressBar.NAME
         * @type String
         * @static
         */
        NAME: PROGRESS,

        /**
         * Static property used to define the default attribute
         * configuration for the ProgressBar.
         *
         * @property ProgressBar.ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * Boolean indicating if use of the WAI-ARIA Roles and States
             * should be enabled.
             *
             * @attribute useARIA
             * @default true
             * @type Boolean
             */
            useARIA: {
                value: true
            },

            /**
             * Display height of the progressbar.
             *
             * @attribute height
             * @default 25
             * @type int | String
             */
            height: {
                valueFn: function() {
                    return this.get(BOUNDING_BOX).get(OFFSET_HEIGHT) || 25;
                }
            },

            /**
             * Display label of the progressbar. If not specified try to query
             * using HTML_PARSER an element inside boundingBox which matches
             * <code>aui-progressbar-text</code> and get its innerHTML to be
             * used as label.
             *
             * @attribute label
             * @default undefined
             * @type String
             */
            label: {
            },

            /**
             * Represents the top value for the bar. The bar will be fully
             * extended when reaching this value. Values higher than this will
             * be ignored.
             *
             * @attribute max
             * @default 100
             * @type Number
             */
            max: {
                validator: isNumber,
                value: 100
            },

            /**
             * Represents the lowest value for the bar. The bar will be
             * totally collapsed when reaching this value. Values lower than
             * this will be ignored.
             *
             * @attribute min
             * @default 0
             * @type Number
             */
            min: {
                validator: isNumber,
                value: 0
            },

            /**
             * Display orientation of the progressbar (i.e. vertical or
             * horizontal).
             *
             * @attribute orientation
             * @default HORIZONTAL
             * @type String
             */
            orientation: {
                value: HORIZONTAL,
                validator: function(val) {
                    return isString(val) && (val === HORIZONTAL || val === VERTICAL);
                }
            },

            /**
             * Calculate the ratio based on <code>max</code> and
             * <code>min</code> values.
             *
             * @attribute ratio
             * @readOnly
             * @type number
             */
            ratio: {
                getter: '_getRatio',
                readOnly: true
            },

            /**
             * Calculate the progressbar step based on <code>ratio</code>
             * value.
             *
             * @attribute step
             * @readOnly
             * @type number
             */
            step: {
                getter: '_getStep',
                readOnly: true
            },

            /**
             * DOM Node to display the text of the progressbar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-progressbar-text</code>.
             *
             * @attribute textNode
             * @default Generated div element.
             * @type String
             */
            textNode: {
                valueFn: function() {
                    return A.Node.create(TPL_TEXT);
                }
            },

            /**
             * The value for the bar. Valid values are in between the minValue
             * and maxValue attributes.
             *
             * @attribute value
             * @default 0
             * @type Number | String
             */
            value: {
                setter: toNumber,
                validator: function(val) {
                    return isNumber(toNumber(val)) && ((val >= this.get(MIN)) && (val <= this.get(MAX)));
                },
                value: 0
            }
        },

        /**
         * Object hash, defining how attribute values are to be parsed from
         * markup contained in the widget's bounding box.
         *
         * @property ProgressBar.HTML_PARSER
         * @type Object
         * @static
         */
        HTML_PARSER: {
            label: function(boundingBox) {
                var textNode = boundingBox.one(P);

                if (textNode) {
                    return textNode.html();
                }
            },

            textNode: P
        },

        /**
         * Static property used to define the UI attributes.
         *
         * @property ProgressBar.UI_ATTRS
         * @type Array
         * @static
         */
        UI_ATTRS: [LABEL, ORIENTATION, VALUE],

        prototype: {

            /**
             * Create the DOM structure for the ProgressBar. Lifecycle.
             *
             * @method renderUI
             * @protected
             */
            renderUI: function() {
                var instance = this;

                instance.get(CONTENT_BOX).addClass(CSS_BAR);

                instance._renderTextNodeIfLabelSet();
            },

            /**
             * Sync the ProgressBar UI. Lifecycle.
             *
             * @method syncUI
             * @protected
             */
            syncUI: function() {
                var instance = this;

                if (instance.get(USE_ARIA)) {
                    instance.plug(A.Plugin.Aria, {
                        attributes: {
                            value: VALUENOW,
                            max: VALUEMAX,
                            min: VALUEMIN,
                            orientation: ORIENTATION,
                            label: LABEL
                        }
                    });
                }
            },

            /**
             * Calculate the boundingBox size based on the
             * <code>orientation</code> of the progressbar. If the orientation
             * is HORIZONTAL get the width, if the orientation is VERTICAL get
             * the height.
             *
             * @method _getBoundingBoxSize
             * @protected
             * @return {Number}
             */
            _getBoundingBoxSize: function() {
                var instance = this;
                var boundingBox = instance.get(BOUNDING_BOX);

                return toNumber(
                    boundingBox.getStyle(
                        this.get(ORIENTATION) === HORIZONTAL ? WIDTH : HEIGHT
                    )
                );
            },

            /**
             * Calculate the number of pixels to set the <code>contentBox</code> bar.
             *
             * @method _getPixelStep
             * @protected
             * @return {Number}
             */
            _getPixelStep: function() {
                var instance = this;

                return instance._getBoundingBoxSize() * instance.get(RATIO);
            },

            /**
             * Calculate the ratio based on <code>max</code> and
             * <code>min</code> values.
             *
             * @method _getRatio
             * @protected
             * @return {Number}
             */
            _getRatio: function() {
                var instance = this;
                var min = instance.get(MIN);
                var ratio = (instance.get(VALUE) - min) / (instance.get(MAX) - min);

                return Math.max(ratio, 0);
            },

            /**
             * Calculate the progressbar step based on <code>ratio</code>
             * value.
             *
             * @method _getStep
             * @protected
             * @return {Number}
             */
            _getStep: function() {
                return this.get(RATIO) * 100;
            },

            /**
             * Render the <code>textNode</code> of the progressbar if label is set.
             *
             * @method _renderTextNodeIfLabelSet
             * @protected
             */
            _renderTextNodeIfLabelSet: function() {
                var instance = this;

                if (!isUndefined(instance.get(LABEL))) {
                    instance.get(CONTENT_BOX).append(instance.get(TEXT_NODE));
                }
            },

            /**
             * Invoked automatically by the UI_ATTRS Widget API when bind or sync the
             * <code>label</code> attribute.
             *
             * @method _uiSetLabel
             * @param {String} val Display label
             * @protected
             */
            _uiSetLabel: function(val) {
                var instance = this,
                    textNode = instance.get(TEXT_NODE);

                if (!textNode.inDoc()) {
                    instance._renderTextNodeIfLabelSet();
                }

                textNode.html(val);
            },

            /**
             * Invoked automatically by the UI_ATTRS Widget API when bind or sync the
             * <code>orientation</code> attribute.
             *
             * @method _uiSetOrientation
             * @param {String} val Orientation
             * @protected
             */
            _uiSetOrientation: function(val) {
                var instance = this;
                var boundingBox = instance.get(BOUNDING_BOX);
                var horizontal = (val === HORIZONTAL);

                boundingBox.toggleClass(CSS_HORIZONTAL, horizontal);
                boundingBox.toggleClass(CSS_VERTICAL, !horizontal);

                instance._uiSetValue(instance.get(VALUE));
                instance._uiSizeTextNode();
            },

            /**
             * Invoked automatically by the UI_ATTRS Widget API when bind or sync the
             * <code>value</code> attribute.
             *
             * @method _uiSetValue
             * @param {String} val Progress value
             * @protected
             */
            _uiSetValue: function(val) {
                var instance = this;
                var pixelStep = instance._getPixelStep();

                var styles = {};

                if (instance.get(ORIENTATION) === HORIZONTAL) {
                    styles = {
                        height: '100%',
                        top: AUTO,
                        width: pixelStep+PX
                    };
                }
                else {
                     styles = {
                        height: pixelStep+PX,
                        top: toNumber(instance._getBoundingBoxSize() - pixelStep)+PX,
                        width: '100%'
                    };
                }

                if (instance.get(STEP) >= 100) {
                    instance.fire(COMPLETE);
                }

                instance.get(CONTENT_BOX).setStyles(styles);
            },

            /**
             * Sync the size of the ProgressBar when some UI attribute change.
             *
             * @method _uiSizeTextNode
             * @protected
             */
            _uiSizeTextNode: function() {
                var instance = this;
                var boundingBox = instance.get(BOUNDING_BOX);
                var textNode = instance.get(TEXT_NODE);

                textNode.setStyle(
                    LINE_HEIGHT,
                    boundingBox.getStyle(HEIGHT)
                );
            }
        }
    }
);

A.ProgressBar = ProgressBar;