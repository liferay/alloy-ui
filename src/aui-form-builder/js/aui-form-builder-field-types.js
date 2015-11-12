/**
 * The Form Builder Field Types Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-types
 */

/**
 * `A.FormBuilder` extension, which is responsible for all the logic related
 * to field types.
 *
 * @class A.FormBuilderFieldTypes
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldTypes = function() {};

A.FormBuilderFieldTypes.prototype = {
    /**
     * Construction logic executed during the `A.FormBuilderFieldTypes`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after('fieldTypesChange', this._afterFieldTypesChange);
        this.after('form-builder-field-types-modal:selectFieldType', this._afterSelectFieldType);
    },

    /**
     * Destructor lifecycle implementation for the `A.FormBuilderFieldTypes` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        A.Array.each(this.get('fieldTypes'), function(field) {
            field.destroy();
        });

        this.get('fieldTypesModal').destroy();
    },

    /**
     * Disables unique fields for the field class that the given field is an
     * instance of.
     *
     * @method disableUniqueFieldType
     * @param {A.FormField} field
     */
    disableUniqueFieldType: function(field) {
        var fieldType = this.findTypeOfField(field);

        if (fieldType.get('unique')) {
            fieldType.set('disabled', true);
        }
    },

    /**
     * Finds the type of the given field.
     *
     * @method findTypeOfField
     * @param {A.FormBuilderFieldBase} field
     */
    findTypeOfField: function(field) {
        var fieldTypes = this.get('fieldTypes'),
            i;

        for (i = 0; i < fieldTypes.length; i++) {
            if (field.constructor === fieldTypes[i].get('fieldClass')) {
                return fieldTypes[i];
            }
        }
    },

    /**
     * Hides the fields modal.
     *
     * @method hideFieldsPanel
     */
    hideFieldsPanel: function() {
        var fieldTypesModal = this.get('fieldTypesModal');

        fieldTypesModal.hide();
    },

    /**
     * Adds a the given field types to this form builder.
     *
     * @method registerFieldTypes
     * @param {Array | Object | A.FormBuilderFieldType} typesToAdd This can be
     *   either an array of items or a single item. Each item should be either
     *   an instance of `A.FormBuilderFieldType`, or the configuration object
     *   to be used when instantiating one.
     */
    registerFieldTypes: function(typesToAdd) {
        var fieldTypes = this.get('fieldTypes');

        typesToAdd = A.Lang.isArray(typesToAdd) ? typesToAdd : [typesToAdd];

        A.Array.each(typesToAdd, function(type) {
            fieldTypes.push(type);
        });

        this.set('fieldTypes', fieldTypes);
    },

    /**
     * Shows the fields modal.
     *
     * @method showFieldsPanel
     */
    showFieldsPanel: function() {
        var fieldTypesModal = this.get('fieldTypesModal');

        if (!fieldTypesModal.get('rendered')) {
            fieldTypesModal.render();
        }

        fieldTypesModal.show();
    },

    /**
     * Removes the given field types from this form builder.
     *
     * @method unregisterFieldTypes
     * @param {Array | String | A.FormBuilderFieldType} typesToRemove This can be
     *   either an array of items, or a single one. For each item, if it's a
     *   string, the form builder will remove all registered field types with
     *   a field class that matches it. For items that are instances of
     *   `A.FormBuilderFieldType`, only the same instances will be removed.
     */
    unregisterFieldTypes: function(typesToRemove) {
        var instance = this;

        typesToRemove = A.Lang.isArray(typesToRemove) ? typesToRemove : [typesToRemove];

        A.Array.each(typesToRemove, function(type) {
            instance._unregisterFieldType(type);
        });

        this.set('fieldTypes', this.get('fieldTypes'));
    },

    /**
     * Fired after the `fieldTypes` attribute is set.
     *
     * @method _afterFieldTypesChange
     * @param {EventFacade} event
     * @protected
     */
    _afterFieldTypesChange: function(event) {
        this.get('fieldTypesModal').set('fieldTypes', event.newVal);
    },

    /**
     * Fired after a field type is selected by the user.
     *
     * @method _afterSelectFieldType
     * @param {EventFacade} event
     * @protected
     */
    _afterSelectFieldType: function(event) {
        var field,
            fieldType = event.fieldType;

        if (!fieldType.get('disabled')) {
            field = new(fieldType.get('fieldClass'))(fieldType.get('defaultConfig'));
            this.showFieldSettingsPanel(field, fieldType.get('label'));
        }
    },

    /**
     * Check on all created fields if there is one of the same type
     * of the parameter.
     *
     * @method _checkActiveLayoutHasFieldType
     * @param {Object} fieldType
     * @return {Boolean}
     * @protected
     */
    _checkActiveLayoutHasFieldType: function(fieldType) {
        var col,
            cols,
            fieldList,
            row,
            rows = this.getActiveLayout().get('rows');

        for (row = 0; row < rows.length; row++) {
            cols = rows[row].get('cols');
            for (col = 0; col < cols.length; col++) {
                fieldList = cols[col].get('value');
                if (fieldList && this._checkListHasFieldType(fieldList, fieldType)) {
                    return true;
                }
            }
        }

        return false;
    },

    /**
     * Checks on all fields of a field list if there is one of the
     * same type of the parameter.
     *
     * @method _checkListHasFieldType
     * @param {A.FormBuilderFIeldList} fieldList
     * @param {Object} fieldType
     * @return {Boolean}
     * @protected
     */
    _checkListHasFieldType: function(fieldList, fieldType) {
        var fields = fieldList.get('fields'),
            i;

        for (i = 0; i < fields.length; i++) {
            if (this._hasFieldType(fieldType, fields[i])) {
                return true;
            }
        }

        return false;
    },

    /**
     * Checks if the given field is of the given field type.
     *
     * @method _hasFieldType
     * @param  {A.FormBuilderFieldType} fieldType
     * @param  {A.FormField} field
     * @return {Boolean}
     * @protected
     */
    _hasFieldType: function(fieldType, field) {
        var i,
            nestedFields = field.get('nestedFields');

        if (field.constructor === fieldType.get('fieldClass')) {
            return true;
        }

        for (i = 0; i < nestedFields.length; i++) {
            if (this._hasFieldType(fieldType, nestedFields[i])) {
                return true;
            }
        }

        return false;
    },

    /**
     * Sets the `fieldTypes` attribute.
     *
     * @method _setFieldTypes
     * @param {Object | A.FormBuilderFieldType} val
     * @return {A.FormBuilderFieldType}
     * @protected
     */
    _setFieldTypes: function(val) {
        for (var i = 0; i < val.length; i++) {
            if (!A.instanceOf(val[i], A.FormBuilderFieldType)) {
                val[i] = new A.FormBuilderFieldType(val[i]);
            }
        }

        return val;
    },

    /**
     * Removes a single given field type from this form builder.
     *
     * @method _unregisterFieldType
     * @param {String | A.FormBuilderFieldType} fieldType
     * @protected
     */
    _unregisterFieldType: function(fieldType) {
        var fieldTypes = this.get('fieldTypes'),
            i;

        if (A.Lang.isFunction(fieldType)) {
            for (i = fieldTypes.length - 1; i >= 0; i--) {
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
    },

    /**
     * Enable or disable unique FieldTypes based on created Fields.
     *
     * @method _updateUniqueFieldType
     * @protected
     */
    _updateUniqueFieldType: function() {
        var instance = this;

        A.Array.each(instance.get('fieldTypes'), function(fieldType) {
            if (fieldType.get('unique')) {
                fieldType.set('disabled', instance._checkActiveLayoutHasFieldType(fieldType));
            }
        });
    },

    /**
     * Default value for the modal displayed to select a field.
     *
     * @method _valueFieldTypesModal
     * @return {A.FormBuilderFieldTypesModal}
     * @protected
     */
    _valueFieldTypesModal: function() {
        var fieldTypesModal = new A.FormBuilderFieldTypesModal({
            centered: true,
            cssClass: 'form-builder-modal',
            draggable: false,
            fieldTypes: this.get('fieldTypes'),
            modal: true,
            resizable: false,
            visible: false,
            zIndex: 4
        });

        fieldTypesModal.addTarget(this);

        return fieldTypesModal;
    }
};

/**
 * Static property used to define the default attribute
 * configuration for the `A.FormBuilderFieldTypes`.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
A.FormBuilderFieldTypes.ATTRS = {
    /**
     * The collection of field types that can be selected as fields for
     * this form builder.
     *
     * @attribute fieldTypes
     * @default []
     * @type Array
     */
    fieldTypes: {
        setter: '_setFieldTypes',
        validator: A.Lang.isArray,
        value: []
    },

    /**
     * The modal that will be used to select a field type.
     *
     * @attribute fieldTypesModal
     * @type `A.FormBuilderFieldTypesModal`
     */
    fieldTypesModal: {
        valueFn: '_valueFieldTypesModal'
    }
};
