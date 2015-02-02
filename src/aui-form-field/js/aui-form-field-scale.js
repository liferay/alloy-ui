/**
 * The Form Field Scale Component
 *
 * @module  aui-form-field-scale
 */

var CSS_FIELD_SCALE = A.getClassName('form', 'field', 'scale'),
    CSS_FIELD_SCALE_INPUT_HIGHER_VALUE =
        A.getClassName('form', 'field', 'scale', 'input', 'higher', 'value'),
    CSS_FIELD_SCALE_INPUT_LOWER_VALUE =
        A.getClassName('form', 'field', 'scale', 'input', 'lower', 'value'),
    CSS_FIELD_SCALE_RAIL = A.getClassName('form', 'field', 'scale', 'rail'),
    CSS_FIELD_SCALE_RANGE = A.getClassName('form', 'field', 'scale', 'range'),
    CSS_FIELD_SCALE_SLIDER = A.getClassName('form', 'field', 'scale', 'slider'),
    CSS_FIELD_SCALE_THUMB = A.getClassName('form', 'field', 'scale', 'thumb'),
    CSS_FIELD_SCALE_THUMB_TOOLTIP = A.getClassName('form', 'field', 'scale', 'thumb', 'tooltip'),
    CSS_FIELD_SCALE_THUMB_TOOLTIP_INNER = A.getClassName('form', 'field', 'scale', 'thumb', 'tooltip', 'inner');

/**
 * A base class for `A.FormFieldScale`.
 *
 * @class A.FormFieldScale
 * @extends A.FormField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldScale = A.Base.create('form-field-scale', A.FormField, [A.FormFieldRequired], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_SCALE_RANGE + ' clearfix">' +
        '<div class="' + CSS_FIELD_SCALE_INPUT_LOWER_VALUE + '"><label></label></div>' +
        '<div class="' + CSS_FIELD_SCALE_INPUT_HIGHER_VALUE + '"><label></label></div>' +
        '<div class="' + CSS_FIELD_SCALE_SLIDER + '">' +
        '<div class="' + CSS_FIELD_SCALE_RAIL + '">' +
        '</div>' +
        '<div class="' + CSS_FIELD_SCALE_THUMB + '">' +
        '<div class="' + CSS_FIELD_SCALE_THUMB_TOOLTIP + ' tooltip top" role="tooltip">' +
        '<div class="tooltip-arrow"></div>' +
        '<div class="' + CSS_FIELD_SCALE_THUMB_TOOLTIP_INNER + ' tooltip-inner"></div>' +
        '</div>' +
        '<p></p>' +
        '</div>' +
        '</div>' +
        '</div>',

    /**
     * Constructor for the `A.FormFieldScale`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            rangeChange: this._afterRangeChange,
            valueChange: this._afterValueChange
        });
    },

    /**
     * Create the DOM structure for the `A.FormFieldScale`. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var content = this.get('content');

        A.FormFieldScale.superclass.renderUI.call(this);
        
        content.addClass(CSS_FIELD_SCALE);

        this._uiSetRange(this.get('range'));
        this._uiSetValue(this.get('value'));

        this._renderDrag();
    },

    /**
     * Fired when the `drag:start` event is triggered.
     *
     * @method _onDragStart
     * @protected
     */
    _onDragStart: function(event) {
        event.target.get('dragNode').hide();
        this.get('content').all('.' + CSS_FIELD_SCALE_THUMB).one('p').hide();
        this.get('content').all('.' + CSS_FIELD_SCALE_THUMB_TOOLTIP).setStyle('opacity', 1);
    },

    /**
     * Fired when the `drag:end` event is triggered.
     *
     * @method _onDragEnd
     * @protected
     */
    _onDragEnd: function() {
        this.get('content').all('.' + CSS_FIELD_SCALE_THUMB).one('p').show();
        this.get('content').all('.' + CSS_FIELD_SCALE_THUMB_TOOLTIP).setStyle('opacity', 0);
    },

    /**
     * Fired after the `range` attribute is set.
     *
     * @method _afterRangeChange
     * @protected
     */
    _afterRangeChange: function() {
        this._uiSetRange(this.get('range'));
    },

    /**
     * Fired after the `value` attribute is set.
     *
     * @method _afterValueChange
     * @protected
     */
    _afterValueChange: function() {
        this._uiSetValue(this.get('value'));
    },

    /**
     * Sync the thumb position based on `value` attribute.
     *
     * @method _onDrag
     * @param {EventFacade} event
     * @protected
     */
    _onDrag: function(event) {
        var content = this.get('content'),
            rail = content.one('.' + CSS_FIELD_SCALE_RAIL),
            changeScale = (this.get('range')[1] - this.get('range')[0]) / rail.get('offsetWidth'),
            lowerValue = this.get('range')[0],
            thumbX = (event.pageX - rail.getX());

        this.set('value', Math.round(thumbX * changeScale) + lowerValue);
    },

    /**
     * Plug Drag into Field Scale.
     *
     * @method _renderDrag
     * @protected
     */
    _renderDrag: function() {
        var content = this.get('content'),
            drag;

        drag = new A.DD.Drag({
            node: content.one('.' + CSS_FIELD_SCALE_THUMB),
            dragMode: 'strict'
        });

        drag.plug(
            A.Plugin.DDConstrained, {
                constrain: content.one('.' + CSS_FIELD_SCALE_RAIL),
                tickY: 10,
                stickX: true
            }
        );

        drag.plug(
            A.Plugin.DDProxy, {
                cloneNode: true,
                moveOnEnd: false
            }
        );

        drag.on('drag:start', this._onDragStart, this);
        drag.on('drag:end', this._onDragEnd, this);
        drag.on('drag:drag', this._onDrag, this);

        this._drag = drag;
    },

    /**
     * Updates the ui according to the value of the `range` attribute.
     *
     * @method _uiSetRange
     * @param {Array} range
     * @protected
     */
    _uiSetRange: function(range) {
        var content = this.get('content'),
            lowerValue = content.one('.' + CSS_FIELD_SCALE_INPUT_LOWER_VALUE).one('label'),
            higherValue = content.one('.' + CSS_FIELD_SCALE_INPUT_HIGHER_VALUE).one('label');

        lowerValue.set('text', range[0]);
        higherValue.set('text', range[1]);

        this._uiSetValue(this.get('value'));
    },

    /**
     * Updates the ui according to the value of the `value` attribute.
     *
     * @method _uiSetValue
     * @param {Number} value
     * @protected
     */
    _uiSetValue: function(value) {
        var thumb = this.get('content').one('.' + CSS_FIELD_SCALE_THUMB),
            range = this.get('range')[1] - this.get('range')[0],
            lowerValue = this.get('range')[0];

        thumb.setStyle('left', (((value - lowerValue) * 100) / range) + '%');
        thumb.one('p').setHTML(value);

        this.get('content').one('.' + CSS_FIELD_SCALE_THUMB_TOOLTIP_INNER).setHTML(value);
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormFieldScale`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Id to reference form data after a form is submitted.
         *
         * @attribute name
         * @default ''
         * @type String
         */
        name: {
            validator: A.Lang.isString,
            value: ''
        },

        /**
         * Array with the lower and the higher value to the scale.
         *
         * @attribute range
         * @default [1, 10]
         * @type {Array}
         */
        range: {
            validator: A.Lang.isArray,
            value: [1, 10]
        },

        /**
         * It's chosen value of field scale.
         *
         * @attribute value
         * @default 0
         * @type {Number}
         */
        value: {
            validator: A.Lang.isNumber,
            value: 0
        }
    }
});
