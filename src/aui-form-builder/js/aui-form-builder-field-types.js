/**
 * The Form Builder Field Types Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-types
 */

var CSS_FIELD_TYPE = A.getClassName('field', 'type'),
    CSS_FIELD_TYPES_LABEL = A.getClassName('form', 'builder', 'field', 'types', 'label'),
    CSS_FIELD_TYPES_LIST = A.getClassName('form', 'builder', 'field', 'types', 'list');

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
    TPL_HEADER_LABEL: '<div class="' + CSS_FIELD_TYPES_LABEL + '">{addField}</div>',

    /**
     * Construction logic executed during the `A.FormBuilderFieldTypes`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after('fieldTypesChange', this._afterFieldTypesChange);
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

        if (this._fieldTypesModal) {
            this._fieldTypesModal.destroy();
        }
    },

    /**
     * Disables unique fields for the field class that the given field is an
     * instance of.
     *
     * @method disableUniqueFieldType
     * @param {A.FormField} field
     */
    disableUniqueFieldType: function (field) {
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
        if (this._fieldTypesModal) {
            this._fieldTypesModal.hide();
        }
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
        if (!this._fieldTypesPanel) {
            this._createFieldTypesPanel();
        }

        this._fieldTypesModal.show();
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
     * @protected
     */
    _afterFieldTypesChange: function() {
        this._uiSetFieldTypes(this.get('fieldTypes'));
    },

    /**
     * Binds all necessary events for the field types modal to work.
     *
     * @method _bindFieldTypesModalEvents
     * @protected
     */
    _bindFieldTypesModalEvents: function() {
        this._eventHandles.push(
            this._fieldTypesPanel.delegate('click', this._onClickFieldType, '.' + CSS_FIELD_TYPE, this),
            this._fieldTypesPanel.delegate('key', A.bind(this._onKeyPressFieldType, this), 'enter', '.' + CSS_FIELD_TYPE)
        );
    },

    /**
     * Builds and returns the configuration object for the field types modal
     * toolbar.
     *
     * @method _buildFieldTypesToolbarConfig
     * @return {Object}
     * @protected
     */
    _buildFieldTypesToolbarConfig: function() {
        return {
            header: [
                {
                    cssClass: 'close',
                    label: '\u00D7',
                    on: {
                        click: A.bind(this._onFieldTypesModalCloseClick, this)
                    }
                }
            ]
        };
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
     * Creates the field types panel.
     *
     * @method _createFieldTypesPanel
     * @protected
     */
    _createFieldTypesPanel: function() {
        var headerNode;

        headerNode = A.Lang.sub(this.TPL_HEADER_LABEL, {
            addField: this.get('strings').addField
        });

        this._fieldTypesPanel = A.Node.create(
            '<div class="clearfix ' + CSS_FIELD_TYPES_LIST + '" role="main" />'
        );

        this._fieldTypesModal = new A.Modal({
            bodyContent: this._fieldTypesPanel,
            centered: true,
            cssClass: 'form-builder-modal',
            draggable: false,
            headerContent: headerNode,
            modal: true,
            resizable: false,
            toolbars: this._buildFieldTypesToolbarConfig(),
            visible: false,
            zIndex: 2
        }).render();

        this._uiSetFieldTypes(this.get('fieldTypes'));
        this._bindFieldTypesModalEvents();
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
     * Fired when a field type is clicked.
     *
     * @method _onClickFieldType
     * @param {EventFacade} event
     * @protected
     */
    _onClickFieldType: function(event) {
        var field,
            fieldType = event.currentTarget.getData('fieldType');

        if (!fieldType.get('disabled')) {
            this.hideFieldsPanel();

            field = new (fieldType.get('fieldClass'))(fieldType.get('defaultConfig'));
            this.showFieldSettingsPanel(field, fieldType.get('label'));
        }
    },

    /**
     * Fired when the close button for the field types modal is clicked.
     *
     * @method _onFieldTypesModalCloseClick
     * @protected
     */
    _onFieldTypesModalCloseClick: function() {
        this.hideFieldsPanel();
        this._newFieldContainer = null;
    },

    /**
     * Fired when a field type is keypressed.
     *
     * @method _onKeyPressFieldType
     * @param {EventFacade} event
     * @protected
     */
    _onKeyPressFieldType: function(event) {
        this._onClickFieldType(event);
    },

    /**
     * Sets the `fieldTypes` attribute.
     *
     * @method _setFieldTypes
     * @param {Object | A.FormBuilderFieldType} val
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
     * Updates the ui according to the value of the `fieldTypes` attribute.
     *
     * @method _uiSetFieldTypes
     * @param {Array} fieldTypes
     * @protected
     */
    _uiSetFieldTypes: function(fieldTypes) {
        var instance = this;

        if (!this._fieldTypesPanel) {
            return;
        }

        this._fieldTypesPanel.get('children').remove();
        A.Array.each(fieldTypes, function(type) {
            instance._fieldTypesPanel.append(type.get('node'));
        });
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

        A.Array.each(instance.get('fieldTypes'), function (fieldType) {
            if (fieldType.get('unique')) {
                fieldType.set('disabled', instance._checkActiveLayoutHasFieldType(fieldType));
            }
        });
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
    }
};
