/**
 * The Form Builder Field Scale Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-scale
 */

var CSS_FIELD_SCALE = A.getClassName('form', 'builder', 'field', 'scale'),
    CSS_FIELD_SCALE_RANGE = A.getClassName('form', 'builder', 'field', 'scale', 'range'),
    CSS_FIELD_SCALE_INPUT_LOWER_VALUE =
    A.getClassName('form', 'builder', 'field', 'scale', 'input', 'lower', 'value'),
    CSS_FIELD_SCALE_INPUT_HIGHER_VALUE =
    A.getClassName('form', 'builder', 'field', 'scale', 'input', 'higher', 'value');

/**
 * A base class for Form Builder Field Scale.
 *
 * @class A.FormBuilderFieldScale
 * @extends A.FormBuilderFieldSentence
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldScale = A.Base.create('form-builder-field-scale', A.FormBuilderFieldSentence, [], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_SCALE_RANGE + '">' +
        '<div class="' + CSS_FIELD_SCALE_INPUT_LOWER_VALUE + '"><label></label></div>' +
        '<div class="' + CSS_FIELD_SCALE_INPUT_HIGHER_VALUE + '"><label></label></div>' +
        '</div>',

    /**
     * Constructor for the `A.FormBuilderFieldScale`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.get('content').addClass(CSS_FIELD_SCALE);

        this._uiSetRange(this.get('range'));

        this.after({
            rangeChange: this._afterRangeChange
        });
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
     * Fills the settings array with the information for this field.
     *
     * @method _fillSettings
     * @override
     * @protected
     */
    _fillSettings: function() {
        A.FormBuilderFieldScale.superclass._fillSettings.apply(this, arguments);

        this._settings.push(
            {
                attrName: 'range',
                editor: new A.ScaleDataEditor({
                    label: 'Scale'
                })
            },
            {
                attrName: 'required',
                editor: new A.BooleanDataEditor({
                    label: 'Required'
                })
            }
        );
    },

    /**
     * Updates the ui according to the value of the `range` attribute.
     *
     * @method _uiSetRange
     * @param {String} range
     * @protected
     */
    _uiSetRange: function(range) {
        var content = this.get('content'),
            lowerValue = content.one('.' + CSS_FIELD_SCALE_INPUT_LOWER_VALUE).one('label'),
            higherValue = content.one('.' + CSS_FIELD_SCALE_INPUT_HIGHER_VALUE).one('label');

        lowerValue.set('text', range[0]);
        higherValue.set('text', range[1]);
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormBuilderFieldScale`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Array with the lower and the higher value to the scale.
         *
         * @attribute range
         * @default []
         * @type {Array}
         */
        range: {
            validator: A.Lang.isArray,
            value: []
        },

        /**
         * Flag indicating if this field is required.
         *
         * @attribute required
         * @default false
         * @type {Boolean}
         */
        required: {
            validator: A.Lang.isBoolean,
            value: false
        }
    }
});
