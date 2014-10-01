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
     * Adds a the given field types to this form builder.
     *
     * @method registerFieldTypes
     * @param {Array | Object | A.FormBuilderIIFieldType} fieldTypes This can be
     *   either an array of items or a single item. Each item should be either
     *   an instance of `A.FormBuilderIIFieldType`, or the configuration object
     *   to be used when instantiating one.
     */
    registerFieldTypes: function(fieldTypes) {
        var instance = this;

        fieldTypes = A.Lang.isArray(fieldTypes) ? fieldTypes : [fieldTypes];

        A.Array.each(fieldTypes, function(type) {
            instance._registerFieldType(type);
        });
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
     * Removes the given field types from this form builder.
     *
     * @method unregisterFieldTypes
     * @param {Array | String | A.FormBuilderIIFieldType} fieldTypes This can be
     *   either an array of items, or a single one. For each item, if it's a
     *   string, the form builder will remove all registered field types with
     *   a field class that matches it. For items that are instances of
     *   `A.FormBuilderIIFieldType`, only the same instances will be removed.
     */
    unregisterFieldTypes: function(fieldTypes) {
        var instance = this;

        fieldTypes = A.Lang.isArray(fieldTypes) ? fieldTypes : [fieldTypes];

        A.Array.each(fieldTypes, function(type) {
            instance._unregisterFieldType(type);
        });
    },

    /**
     * Removes a Field Type from fieldTypes of this Form Buider.
     *
     * @method _registerFieldType
     * @param {Object | A.FormBuilderIIFieldType} field
     */
    _registerFieldType: function(fieldType) {
        if (!A.instanceOf(fieldType, A.FormBuilderIIFieldType)) {
            fieldType = new A.FormBuilderIIFieldType(fieldType);
        }

        this.get('boundingBox').one('.field-types-list').appendChild(fieldType.get('node'));
        this.get('fieldTypes').push(fieldType);
    },

    /**
     * Removes a single given field type from this form builder.
     *
     * @method _unregisterFieldType
     * @param {String | A.FormBuilderIIFieldType} fieldType
     * @protected
     */
    _unregisterFieldType: function(fieldType) {
        var fieldTypes = this.get('fieldTypes');

        if (A.Lang.isString(fieldType)) {
            for (var i = fieldTypes.length - 1; i >= 0; i--) {
                if (fieldTypes[i].get('fieldClass') === fieldType) {
                    this._unregisterFieldTypeByIndex(i);
                }
            }
        }
        else {
            this._unregisterFieldTypeByIndex(fieldTypes.indexOf(fieldType));
        }
    },

    /**
     * Unregisters the field type at the given index.
     *
     * @method _unregisterFieldTypeByIndex
     * @param {Number} index
     * @protected
     */
    _unregisterFieldTypeByIndex: function(index) {
        var fieldTypes = this.get('fieldTypes');

        if (index !== -1) {
            fieldTypes[index].destroy();
            fieldTypes.splice(index, 1);
        }
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
