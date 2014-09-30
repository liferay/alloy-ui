/**
 * The Form Builder II Component
 *
 * @module aui-form-builder-II
 */

/**
 * A base class for `A.FormBuilderII`.
 *
 * @class A.FormBuilderII
 * @extends A.Widget
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderII  = A.Base.create('form-builder-II', A.Widget, [], {
    /**
     * Construction logic executed during the `A.FormBuilderII`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._modal = new A.Modal({
            bodyContent: '<div class="field-types-list" role="main" />',
            centered: true,
            draggable: false,
            modal: true,
            resizable: false,
            toolbars: null,
            visible: false,
            cssClass: 'form-builder-modal'
        }).render(this.get('contentBox'));
    },

    /**
     * Destructor lifecycle implementation for the `A.FormBuilderII` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        A.Array.each(this.get('fieldTypes'), function(field) {
            field.destroy();
        });

        this._modal.destroy();
    },

    /**
     * Hides the fields modal.
     *
     * @method hideFieldsPanel
     */
    hideFieldsPanel: function() {
        this._modal.hide();
    },

    /**
     * Adds a new Field Type to the Form Builder.
     *
     * @method registerFieldType
     * @param {Array | Object | A.FormBuilderIIFieldType} val
     */
    registerFieldType: function(val) {
        var instance = this;

        if (A.Lang.isArray(val)) {
            A.Array.each(val, function(field) {
                instance._registerFieldType(field);
            });
        }
        else {
            instance._registerFieldType(val);
        }
    },

    /**
     * Shows the fields modal.
     *
     * @method showFieldsPanel
     */
    showFieldsPanel: function() {
        this._modal.show();
    },

    /**
     * Removes a Field Type from fieldTypes of this Form Builder.
     *
     * @method unregisterFieldType
     * @param {A.FormBuilderIIFieldType} field
     */
    unregisterFieldType: function(field) {
        var index,
            fieldTypes = this.get('fieldTypes');

        if (A.instanceOf(field, A.FormBuilderIIFieldType)) {
            index = fieldTypes.indexOf(field);
            if (index !== -1) {
                fieldTypes[index].destroy();
                fieldTypes.splice(index, 1);
            }
        }
    },

    /**
     * Removes a Field Type from fieldTypes of this Form Buider.
     *
     * @method _registerFieldType
     * @param {Object | A.FormBuilderIIFieldType} field
     */
    _registerFieldType: function(field) {
        if (!A.instanceOf(field, A.FormBuilderIIFieldType)) {
            field = new A.FormBuilderIIFieldType(field);
        }

        this.get('boundingBox').one('.field-types-list').appendChild(field.get('node'));
        this.get('fieldTypes').push(field);
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderII`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The collection of field types that can be selected as fields for
         * this form builder.
         *
         * @attribute fields
         * @default []
         * @type Array
         */
        fieldTypes: {
            validator: A.Lang.isArray,
            value: []
        }
    }
});
