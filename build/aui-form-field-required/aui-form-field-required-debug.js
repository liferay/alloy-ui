YUI.add('aui-form-field-required', function (A, NAME) {

/**
 * The Form Builder Field Base Component
 *
 * @module aui-form-field
 * @submodule aui-form-field-required
 */

var CSS_FIELD_REQUIRED = A.getClassName('form', 'field', 'required'),
    CSS_FIELD_TITLE = A.getClassName('form', 'field', 'title');

/**
 * An augmentation class which adds the required funcionality to form fields.
 *
 * @class A.FormFieldRequired
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldRequired = function() {};

A.FormFieldRequired.prototype = {
    TPL_REQUIRED: '<span class="' + CSS_FIELD_REQUIRED + '">*</span>',

    /**
     * Constructor for the `A.FormFieldRequired` component. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._uiSetRequired(this.get('required'));

        this.after({
            requiredChange: this._afterRequiredChange
        });
    },

    /**
     * Fired after the `required` attribute is set.
     *
     * @method _afterRequiredChange
     * @protected
     */
    _afterRequiredChange: function() {
        this._uiSetRequired(this.get('required'));
    },

    /**
     * Updates the ui according to the value of the `required` attribute.
     *
     * @method _uiSetRequired
     * @param {String} required
     * @protected
     */
    _uiSetRequired: function(required) {
        var titleNode = this.get('content').one('.' + CSS_FIELD_TITLE);

        if (required) {
            titleNode.append(this.TPL_REQUIRED);
        } else {
            if (titleNode.one('.' + CSS_FIELD_REQUIRED)) {
                titleNode.one('.' + CSS_FIELD_REQUIRED).remove(true);
            }
        }
    }
};


/**
 * Static property used to define the default attribute configuration
 * for the `A.FormFieldRequired`.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
A.FormFieldRequired.ATTRS = {
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
};

}, '3.0.1', {"requires": ["aui-form-field"]});
