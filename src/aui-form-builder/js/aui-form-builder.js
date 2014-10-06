/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 */

var CSS_FORM_BUILDER_ADD_ROW = A.getClassName('form', 'builder', 'add', 'row'),
    CSS_FORM_BUILDER_EMPTY_LAYOUT = A.getClassName('form', 'builder', 'empty', 'layout'),
    CSS_FORM_BUILDER_FIELD_LIST = A.getClassName('form', 'builder', 'field', 'list'),
    CSS_FORM_BUILDER_FIELD_SETTINGS = A.getClassName('form', 'builder', 'field', 'settings'),
    CSS_FORM_BUILDER_FIELD_SETTINGS_SAVE =
        A.getClassName('form', 'builder', 'field', 'settings', 'save'),
    CSS_FORM_BUILDER_FIELD_TYPES_LIST = A.getClassName('form', 'builder', 'field', 'types', 'list');

/**
 * A base class for `A.FormBuilder`.
 *
 * @class A.FormBuilder
 * @extends A.Widget
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilder  = A.Base.create('form-builder', A.Widget, [], {
    TPL_BUTTON_ADD_NEW_LINE: '<button class="btn-default btn ' + CSS_FORM_BUILDER_ADD_ROW + '" type="span">' +
        '<span class="glyphicon glyphicon-th-list"></span>' +
        'Add New Line' +
        '</button>',
    TPL_EMPTY_LAYOUT: '<div class="' + CSS_FORM_BUILDER_EMPTY_LAYOUT + '">' +
        '<div>You don\'t have any question yet.</div>' +
        '<div>First for all let\'s create a new line?</div></div>',
    TPL_FIELD_LIST: '<div class="' + CSS_FORM_BUILDER_FIELD_LIST + '" ></div>',

    /**
     * Construction logic executed during the `FormBuilder`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var contentBox = this.get('contentBox');

        contentBox.append(this.TPL_FIELD_LIST);
        contentBox.append(this.TPL_EMPTY_LAYOUT);
        contentBox.append(this.TPL_BUTTON_ADD_NEW_LINE);

        this._emptyLayoutMsg = contentBox.one('.' + CSS_FORM_BUILDER_EMPTY_LAYOUT);

        this.get('layout').addTarget(this);
    },

    /**
     * Bind the events for the `A.FormBuilder` UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        this._eventHandles = [
            this.after('fieldTypesChange', this._afterFieldTypesChange),
            this.after('layoutChange', this.syncUI),
            this.after('layout:rowsChange', this.syncUI),
            this.get('contentBox').one('.' + CSS_FORM_BUILDER_ADD_ROW).on('click', this._onClickAddRow, this)
        ];
    },

    /**
     * Destructor lifecycle implementation for the `A.FormBuilder` class.
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

        if (this._fieldSettingsModal) {
            this._fieldSettingsModal.destroy();
        }

        (new A.EventHandle(this._eventHandles)).detach();
    },

    /**
     * Syncs the UI. Lifecycle.
     *
     * @method syncUI
     * @protected
     */
    syncUI: function() {
        var contentBox = this.get('contentBox'),
            emptyLayout = contentBox.one('.' + CSS_FORM_BUILDER_EMPTY_LAYOUT),
            layout = this.get('layout');

        this.get('layout').draw(contentBox.one('.' + CSS_FORM_BUILDER_FIELD_LIST));

        if (layout.get('rows').length === 0) {
            this._emptyLayoutMsg.show();
        } else {
            this._emptyLayoutMsg.hide();
        }
    },

    /**
     * Hides the settings panel for the given field.
     *
     * @method hideFieldSettingsPanel
     */
    hideFieldSettingsPanel: function() {
        if (this._fieldSettingsModal) {
            this._fieldSettingsModal.hide();

            this._fieldBeingEdited = null;
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
     * Shows the settings panel for the given field.
     *
     * @method showFieldSettingsPanel
     * @param {A.FormBuilderFieldBase} field
     * @param {String} typeName The name of the field type.
     */
    showFieldSettingsPanel: function(field, typeName) {
        var bodyNode;

        if (!this._fieldSettingsModal) {
            this._renderFieldSettingsModal();
        }

        bodyNode = this._fieldSettingsModal.getStdModNode(A.WidgetStdMod.BODY);
        bodyNode.empty();
        field.renderSettingsPanel(bodyNode);

        this._fieldSettingsModal.setStdModContent(A.WidgetStdMod.HEADER, typeName);

        this._fieldSettingsModal.show();
        this._fieldSettingsModal.align();

        this._fieldBeingEdited = field;
    },

    /**
     * Shows the fields modal.
     *
     * @method showFieldsPanel
     */
    showFieldsPanel: function() {
        if (!this._fieldTypesPanel) {
            this._fieldTypesPanel = A.Node.create(
                '<div class="' + CSS_FORM_BUILDER_FIELD_TYPES_LIST + '" role="main" />'
            );

            this._fieldTypesModal = new A.Modal({
                bodyContent: this._fieldTypesPanel,
                centered: true,
                draggable: false,
                modal: true,
                resizable: false,
                toolbars: null,
                visible: false,
                cssClass: 'form-builder-modal'
            }).render();

            this._uiSetFieldTypes(this.get('fieldTypes'));

            this._eventHandles.push(
                this._fieldTypesPanel.delegate(
                    'click',
                    this._onClickFieldType,
                    '.field-type',
                    this
                )
            );
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
     * Adds a new row to `layout`.
     *
     * @method _onClickAddRow
     * @protected
     */
    _onClickAddRow: function () {
        this.get('layout').addRow();
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

        this.hideFieldsPanel();

        field = new (fieldType.get('fieldClass'))(fieldType.get('defaultConfig'));
        this.showFieldSettingsPanel(field, fieldType.get('label'));
    },

    /**
     * Renders the field settings modal.
     *
     * @method _renderFieldSettingsModal
     * @protected
     */
    _renderFieldSettingsModal: function() {
        this._fieldSettingsModal = new A.Modal({
            centered: true,
            cssClass: CSS_FORM_BUILDER_FIELD_SETTINGS,
            draggable: false,
            modal: true,
            resizable: false,
            zIndex: 1
        }).render();

        this._fieldSettingsModal.addToolbar([{
            cssClass: CSS_FORM_BUILDER_FIELD_SETTINGS_SAVE,
            label: 'Save',
            on: {
                click: A.bind(this._saveFieldSettings, this)
            },
            render: true
        }], A.WidgetStdMod.FOOTER);
    },

    /**
     * Saves the settings for the field currently being edited.
     *
     * @method _saveFieldSettings
     * @protected
     */
    _saveFieldSettings: function() {
        this._fieldBeingEdited.saveSettings();
        this.hideFieldSettingsPanel();
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
        var fieldTypes = this.get('fieldTypes');

        if (A.Lang.isFunction(fieldType)) {
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
     * configuration for the `A.FormBuilder`.
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
         * @attribute fieldTypes
         * @default []
         * @type Array
         */
        fieldTypes: {
            setter: function(val) {
                for (var i = 0; i < val.length; i++) {
                    if (!A.instanceOf(val[i], A.FormBuilderFieldType)) {
                        val[i] = new A.FormBuilderFieldType(val[i]);
                    }
                }

                return val;
            },
            validator: A.Lang.isArray,
            value: []
        },

        /**
         * The layout where the form fields will be rendered.
         *
         * @attribute layout
         * @type A.Layout
         */
        layout: {
            validator: function(val) {
                return A.instanceOf(val, A.Layout);
            },
            valueFn: function() {
                return new A.Layout();
            }
        }
    }
});
