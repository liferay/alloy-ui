/**
 * The Form Builder Field List Component
 *
 * @module aui-form-builder-field-list
 */

var CSS_FIELD_LIST = A.getClassName('form', 'builder', 'field', 'list'),
    CSS_FIELD_LIST_ADD_BUTTON =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button'),
    CSS_FIELD_LIST_ADD_BUTTON_CIRCLE =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'circle'),
    CSS_FIELD_LIST_ADD_BUTTON_ICON =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'icon'),
    CSS_FIELD_LIST_CONTAINER =
        A.getClassName('form', 'builder', 'field', 'list', 'container'),
    CSS_FIELD_LIST_EMPTY = A.getClassName('form', 'builder', 'field', 'list', 'empty'),
    CSS_FIELD_MOVE_TARGET =
        A.getClassName('form', 'builder', 'field', 'move', 'target');

/**
 * A base class for `A.FormBuilderFieldList`.
 *
 * @class A.FormBuilderFieldList
 * @extends A.Widget
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldList  = A.Base.create('form-builder-field-list', A.Widget, [], {
    TPL_FIELD_LIST: '<div class="' + CSS_FIELD_LIST + '">' +
        '<div class="' + CSS_FIELD_LIST_CONTAINER + '"></div>' +
        '<div class="' + CSS_FIELD_LIST_ADD_BUTTON + '" tabindex="9">' +
        '<span class="' + CSS_FIELD_LIST_ADD_BUTTON_CIRCLE + '">' +
        '<span class="' + CSS_FIELD_LIST_ADD_BUTTON_ICON + '"></span>' +
        '</span>' +
        '<button type="button" class="' + CSS_FIELD_MOVE_TARGET +
        ' layout-builder-move-target layout-builder-move-col-target btn btn-default">' +
        'Paste here</button>' +
        '</div>' +
        '</div>',

    /**
     * Construction logic executed during the `A.FormBuilderFieldList`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var contentBox = this.get('contentBox');

        contentBox.append(this.TPL_FIELD_LIST);
        this._uiSetFields(this.get('fields'));

        this.after('fieldsChange', A.bind(this._afterFieldsChange, this));
    },

    /**
     * Adds a new field to the `A.FormBuilderFieldList`.
     *
     * @method addField
     * @param {A.FormBuilderFieldBase} field
     */
    addField: function(field) {
        var fields = this.get('fields');

        fields.push(field);
        this.set('fields', fields);
    },

    /**
     * Removes the given field from the `A.FormBuilderFieldList`.
     *
     * @method removeField
     * @param {A.FormBuilderFieldBase} field
     */
    removeField: function(field) {
        var fields = this.get('fields'),
            indexOf = fields.indexOf(field);

        fields.splice(indexOf, 1);
        this.set('fields', fields);
    },

    /**
     * Fired after the `fields` attribute is set.
     *
     * @method _afterFieldsChange
     * @protected
     */
    _afterFieldsChange: function() {
        this._uiSetFields(this.get('fields'));
    },

    /**
     * Updates the ui according to the value of the `fields` attribute.
     *
     * @method _uiSetFields
     * @param {Array} fields
     * @protected
     */
    _uiSetFields: function(fields) {
        var contentBox = this.get('contentBox'),
            container = contentBox.one('.' + CSS_FIELD_LIST_CONTAINER);

        container.empty();
        A.each(fields, function(field) {
            container.append(field.get('content'));
        });

        contentBox.toggleClass(CSS_FIELD_LIST_EMPTY, !fields.length);
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderFieldList`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * List of field.
         *
         * @attribute fields
         * @type {Array}
         */
        fields: {
            value: []
        }
    }
});
