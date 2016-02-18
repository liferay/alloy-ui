/**
 * The ProgressBar Utility provides a visual means of showing progress of an
 * ongoing operation. The ProgressBar can be enhanced via CSS styles to provide
 * different colors, shapes and textures. The bar can move horizontally or
 * vertically. The movement can be enhanced by using the Animation utility.
 *
 * @module aui-progressbar
 */

var toNumber = function(v) {
        return parseFloat(v) || 0;
    },

    CSS_BAR = A.getClassName('progress', 'bar'),
    CSS_HORIZONTAL = A.getClassName('horizontal'),
    CSS_VERTICAL = A.getClassName('vertical'),

    TPL_TEXT = '<p></p>';

/**
 * A base class for Progressbar, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - A visual means of showing progress of an ongoing operation
 * - Can be enhanced via CSS styles to provide different colors, shapes and
 *   textures
 * - The bar can move horizontally or vertically
 * - The movement can be enhanced by using the Animation utility
 *
 * Check the [live demo](http://alloyui.com/examples/progress-bar/).
 *
 * @class A.ProgressBar
 * @extends A.Component
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/progress-bar/basic-markup.html
 * @include http://alloyui.com/examples/progress-bar/basic.js
 */
var ProgressBar = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'progress',

    /**
     * Static property used to define the default attribute
     * configuration for the ProgressBar.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Display height of the progressbar.
         *
         * @attribute height
         * @default 25
         * @type int | String
         */
        height: {
            valueFn: function() {
                return this.get('boundingBox').get('offsetHeight') || 25;
            }
        },

        /**
         * Display label of the progressbar. If not specified try to query
         * using HTML_PARSER an element inside boundingBox which matches
         * `aui-progressbar-text` and get its innerHTML to be
         * used as label.
         *
         * @attribute label
         * @default undefined
         * @type String
         */
        label: {},

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
            validator: A.Lang.isNumber,
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
            validator: A.Lang.isNumber,
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
            value: 'horizontal',
            validator: function(val) {
                return A.Lang.isString(val) && (val === 'horizontal' || val === 'vertical');
            }
        },

        /**
         * Calculate the ratio based on `max` and `min` values.
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
         * Calculate the progressbar step based on `ratio` value.
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
         * Specify the tab order of elements.
         *
         * @attribute tabIndex
         * @default 1
         * @type Number
         */
        tabIndex: {
            value: 1
        },

        /**
         * DOM Node to display the text of the progressbar. If not
         * specified try to query using HTML_PARSER an element inside
         * contentBox which matches `aui-progressbar-text`.
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
                return A.Lang.isNumber(toNumber(val)) && ((val >= this.get('min')) && (val <= this.get('max')));
            },
            value: 0
        }
    },

    /**
     * Object hash, defining how attribute values are to be parsed from
     * markup contained in the widget's bounding box.
     *
     * @property HTML_PARSER
     * @type Object
     * @static
     */
    HTML_PARSER: {
        label: function(boundingBox) {
            var textNode = boundingBox.one('p');

            if (textNode) {
                return textNode.html();
            }
        },

        textNode: 'p'
    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['label', 'orientation', 'value'],

    prototype: {

        /**
         * Create the DOM structure for the ProgressBar. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            this.get('contentBox').addClass(CSS_BAR);

            this._renderTextNodeIfLabelSet();
        },

        /**
         * Sync the ProgressBar UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            if (this.get('useARIA')) {
                this.plug(A.Plugin.Aria, {
                    attributes: {
                        value: 'valuenow',
                        max: 'valuemax',
                        min: 'valuemin',
                        orientation: 'orientation'
                    },
                    roleName: 'progressbar'
                });
            }
        },

        /**
         * Calculate the boundingBox size based on the
         * `orientation` of the progressbar. If the orientation
         * is HORIZONTAL get the width, if the orientation is VERTICAL get
         * the height.
         *
         * @method _getBoundingBoxSize
         * @protected
         * @return {Number}
         */
        _getBoundingBoxSize: function() {
            return toNumber(
                this.get('boundingBox').getStyle(
                    this.get('orientation') === 'horizontal' ? 'width' : 'height'
                )
            );
        },

        /**
         * Calculate the ratio based on `max` and `min` values.
         *
         * @method _getRatio
         * @protected
         * @return {Number}
         */
        _getRatio: function() {
            var min = this.get('min'),
                ratio = (this.get('value') - min) / (this.get('max') - min);

            return Math.max(ratio, 0);
        },

        /**
         * Calculate the progressbar step based on `ratio` value.
         *
         * @method _getStep
         * @protected
         * @return {Number}
         */
        _getStep: function() {
            return this.get('ratio') * 100;
        },

        /**
         * Render the `textNode` of the progressbar if label is set.
         *
         * @method _renderTextNodeIfLabelSet
         * @protected
         */
        _renderTextNodeIfLabelSet: function() {
            if (!A.Lang.isUndefined(this.get('label'))) {
                this.get('contentBox').append(this.get('textNode'));
            }
        },

        /**
         * Invoked automatically by the UI_ATTRS Widget API when bind or sync
         * the `label` attribute.
         *
         * @method _uiSetLabel
         * @param {String} val Display label
         * @protected
         */
        _uiSetLabel: function(val) {
            var textNode = this.get('textNode');

            if (!textNode.inDoc()) {
                this._renderTextNodeIfLabelSet();
            }

            textNode.html(val);
        },

        /**
         * Invoked automatically by the UI_ATTRS Widget API when bind or sync
         * the `orientation` attribute.
         *
         * @method _uiSetOrientation
         * @param {String} val Orientation
         * @protected
         */
        _uiSetOrientation: function(val) {
            var boundingBox = this.get('boundingBox'),
                horizontal = (val === 'horizontal');

            boundingBox.toggleClass(CSS_HORIZONTAL, horizontal);
            boundingBox.toggleClass(CSS_VERTICAL, !horizontal);

            this._uiSetValue(this.get('value'));
            this._uiSizeTextNode();
        },

        /**
         * Invoked automatically by the UI_ATTRS Widget API when bind or sync
         * the `value` attribute.
         *
         * @method _uiSetValue
         * @protected
         */
        _uiSetValue: function() {
            var percentStep = this._getStep(),
                styles;

            if (this.get('orientation') === 'horizontal') {
                styles = {
                    height: '100%',
                    width: percentStep + '%'
                };
            }
            else {
                styles = {
                    height: percentStep + '%',
                    width: '100%'
                };
            }

            if (this.get('step') >= 100) {
                this.fire('complete');
            }

            this.get('contentBox').setStyles(styles);
        },

        /**
         * Sync the size of the ProgressBar when some UI attribute change.
         *
         * @method _uiSizeTextNode
         * @protected
         */
        _uiSizeTextNode: function() {
            this.get('textNode').setStyle('lineHeight', this.get('boundingBox').getStyle('height'));
        }
    }
});

A.ProgressBar = ProgressBar;
