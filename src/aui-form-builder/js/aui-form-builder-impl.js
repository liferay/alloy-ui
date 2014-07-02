var FormBuilder = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderSettings`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Enables a field to be editable.
         *
         * @attribute enableEditing
         * @default true
         * @type Boolean
         */
        enableEditing: {
            value: true
        },

        /**
         * Checks if removing required fields is permitted or not.
         *
         * @attribute allowRemoveRequiredFields
         * @default false
         * @type Boolean
         */
        allowRemoveRequiredFields: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            value: {
                addNode: 'Add field',
                close: 'Close',
                propertyName: 'Property Name',
                save: 'Save',
                settings: 'Settings',
                value: 'Value'
            }
        }
    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['allowRemoveRequiredFields'],

    /**
     * Static property used to define the augmented classes.
     *
     * @property AUGMENTS
     * @type Array
     * @static
     */
    AUGMENTS: [A.PropertyBuilderSettings],

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.FormBuilderBase,

    prototype: {
        /**
         * Construction logic executed during `A.FormBuildeSettings` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            this.selectedFieldsLinkedSet.after({
                add: A.bind(this._afterSelectedFieldsSetAdd, this),
                remove: A.bind(this._afterSelectedFieldsSetRemove, this)
            });

            this.on({
                save: this._onSave
            });
        },



        /**
         * Triggers after adding selected fields to a `A.LinkedSet` instance.
         *
         * @method _afterSelectedFieldsSetAdd
         * @param event
         * @protected
         */
        _afterSelectedFieldsSetAdd: function(event) {
            var instance = this;

            event.value.set('selected', true);

            instance.openEditProperties(event.value);
        },

        /**
         * Triggers after removing selected fields from the `A.LinkedSet`
         * instance.
         *
         * @method _afterSelectedFieldsSetRemove
         * @param event
         * @protected
         */
        _afterSelectedFieldsSetRemove: function(event) {
            var instance = this;

            event.value.set('selected', false);

            instance.closeEditProperties();
        },

        /**
         * Selects the field tab and disables the setting tabs.
         *
         * @method closeEditProperties
         */
        closeEditProperties: function() {
            var instance = this;

            instance.tabView.selectChild(A.FormBuilderBase.FIELDS_TAB);
            instance.tabView.disableTab(A.FormBuilderBase.SETTINGS_TAB);
        },

        /**
         * Gets a list of properties from the field.
         *
         * @method getFieldProperties
         * @param field
         * @return {Array}
         */
        getFieldProperties: function(field, excludeHidden) {
            return field.getProperties(excludeHidden);
        },

        /**
         * Triggers on saving a field. First checks if the field is being
         * edited, if it is then sets the data and syncs on the UI.
         *
         * @method _onSave
         * @param event
         * @protected
         */
        _onSave: function() {
            var instance = this,
                editingField = instance.editingField;

            if (editingField) {
                var modelList = instance.propertyList.get('data');

                modelList.each(function(model) {
                    editingField.set(model.get('attributeName'), model.get('value'));
                });

                instance._syncUniqueField(editingField);
            }
        },

        /**
         * Enables the settings tab.
         *
         * @method openEditProperties
         * @param field
         */
        openEditProperties: function(field) {
            var instance = this;

            instance.tabView.enableTab(A.FormBuilderBase.SETTINGS_TAB);
            instance.tabView.selectChild(A.FormBuilderBase.SETTINGS_TAB);
            instance.propertyList.set('data', instance.getFieldProperties(field, true));
        }
    }
});

A.FormBuilder = FormBuilder;
