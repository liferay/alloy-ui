/**
 * The Form Field Component
 *
 * @module aui-form-field
 */

var CSS_FIELD = A.getClassName('form', 'field'),
    CSS_FIELD_CONTENT = A.getClassName('form', 'field', 'content'),
    CSS_FIELD_NESTED = A.getClassName('form', 'field', 'nested');

/**
 * A base class for `A.FormField`. All form fields should extend from this.
 *
 * @class A.FormField
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormField = A.Base.create('form-field', A.Base, [], {
    TPL_FIELD: '<div class="' + CSS_FIELD + '">' +
        '<div class="' + CSS_FIELD_CONTENT + '"></div>' +
        '<div class="' + CSS_FIELD_NESTED + '"></div>' +
        '</div>',

    /**
     * Construction logic executed during the `A.FormField`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        content.setData('field-instance', this);

        this._fieldEventHandles = [
            this.after('nestedFieldsChange', this._afterNestedFieldsChange)
        ];

        this._uiSetNestedFields(this.get('nestedFields'));
    },

    /**
     * Destructor lifecycle implementation for the `A.FormField` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this.get('content').remove(true);

        (new A.EventHandle(this._fieldEventHandles)).detach();
    },

    /**
     * Adds the given field to this field's nested list.
     *
     * @method addNestedField
     * @param {Number} index
     * @param {A.FormField} field
     */
    addNestedField: function(index, field) {
        var nestedFields = this.get('nestedFields');

        nestedFields.splice(index, 0, field);

        this.set('nestedFields', nestedFields);
    },

    /**
     * Removes the given field from this field's nested list.
     *
     * @method removeNestedField
     * @param {A.FormField} field
     */
    removeNestedField: function(field) {
        var index,
            nestedFields = this.get('nestedFields');

        index = A.Array.indexOf(nestedFields, field);
        if (index !== -1) {
            nestedFields.splice(index, 1);
        }

        this.set('nestedFields', nestedFields);
    },

    /**
     * Fired after the `nestedFields` attribute is set.
     *
     * @method _afterNestedFieldsChange
     * @protected
     */
    _afterNestedFieldsChange: function() {
        this._uiSetNestedFields(this.get('nestedFields'));
    },

    /**
     * Updates the UI according to the value of the `nestedFields` attribute.
     *
     * @method _uiSetNestedFields
     * @param  {Array} nestedFields
     * @protected
     */
    _uiSetNestedFields: function(nestedFields) {
        var nestedFieldsNode = this.get('content').one('.' + CSS_FIELD_NESTED);

        nestedFieldsNode.empty();
        A.Array.each(nestedFields, function(nestedField) {
            nestedFieldsNode.append(nestedField.get('content'));
        });
    },

    /**
     * Validates the value being set to the `nestedFields` attribute.
     *
     * @method _validateNestedFields
     * @param {Array} val
     * @protected
     */
    _validateNestedFields: function(val) {
        var i;

        if (!A.Lang.isArray(val)) {
            return false;
        }

        for (i = 0; i < val.length; i++) {
            if (!A.instanceOf(val[i], A.FormField)) {
                return false;
            }
        }

        return true;
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Node containing the contents of this field.
         *
         * @attribute content
         * @type Node
         */
        content: {
            validator: function(val) {
                return A.instanceOf(val, A.Node);
            },
            valueFn: function() {
                return A.Node.create(this.TPL_FIELD);
            },
            writeOnce: 'initOnly'
        },

        /**
         * The fields that are nested inside this field.
         *
         * @attribute nestedFields
         * @default []
         * @type Array
         */
        nestedFields: {
            validator: '_validateNestedFields',
            value: []
        }
    }
});
