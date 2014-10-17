/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 */

var CSS_ADD_PAGE_BREAK = A.getClassName('form', 'builder', 'add', 'page', 'break'),
    CSS_EMPTY_COL = A.getClassName('form', 'builder', 'empty', 'col'),
    CSS_EMPTY_COL_ICON = A.getClassName('form', 'builder', 'empty', 'col', 'icon'),
    CSS_EMPTY_COL_LABEL = A.getClassName('form', 'builder', 'empty', 'col', 'label'),
    CSS_EMPTY_LAYOUT = A.getClassName('form', 'builder', 'empty', 'layout'),
    CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_FIELD_CONTENT = A.getClassName('form', 'builder', 'field', 'content'),
    CSS_FIELD_CONFIGURATION = A.getClassName('form', 'builder', 'field', 'configuration'),
    CSS_FIELD_LIST = A.getClassName('form', 'builder', 'field', 'list'),
    CSS_FIELD_SETTINGS = A.getClassName('form', 'builder', 'field', 'settings'),
    CSS_FIELD_SETTINGS_SAVE =
        A.getClassName('form', 'builder', 'field', 'settings', 'save'),
    CSS_FIELD_TOOLBAR_CLOSE = A.getClassName('form', 'builder', 'field', 'toolbar', 'close'),
    CSS_FIELD_TOOLBAR_EDIT = A.getClassName('form', 'builder', 'field', 'toolbar', 'edit'),
    CSS_FIELD_TOOLBAR_REMOVE = A.getClassName('form', 'builder', 'field', 'toolbar', 'remove'),
    CSS_FIELD_TYPES_LIST = A.getClassName('form', 'builder', 'field', 'types', 'list'),
    CSS_PAGE_BREAK_ROW = A.getClassName('form', 'builder', 'page', 'break', 'row'),

    MODES = {
        LAYOUT: 'layout',
        REGULAR: 'regular'
    };

/**
 * A base class for `A.FormBuilder`.
 *
 * @class A.FormBuilder
 * @extends A.Widget
 * @uses A.FormBuilderLayoutBuilder
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilder  = A.Base.create('form-builder', A.Widget, [A.FormBuilderLayoutBuilder], {
    TPL_BUTTON_ADD_PAGEBREAK: '<button class="btn-default btn ' + CSS_ADD_PAGE_BREAK + '">' +
        '<span class="glyphicon glyphicon-th-list"></span>' +
        'Add Page Break' +
        '</button>',
    TPL_EMPTY_COL: '<div class="' + CSS_EMPTY_COL + '">' +
        '<span class="glyphicon glyphicon-plus ' + CSS_EMPTY_COL_ICON + '"></span>' +
        '<div class="' + CSS_EMPTY_COL_LABEL + '">Add Field</div>' +
        '</div>',
    TPL_EMPTY_LAYOUT: '<div class="' + CSS_EMPTY_LAYOUT + '">' +
        '<div>You don\'t have any question yet.</div>' +
        '<div>First for all let\'s create a new line?</div></div>',
    TPL_FIELD_LIST: '<div class="' + CSS_FIELD_LIST + '" ></div>',

    /**
     * Construction logic executed during the `A.FormBuilder`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var contentBox = this.get('contentBox');

        contentBox.append(this.TPL_FIELD_LIST);
        contentBox.append(this.TPL_EMPTY_LAYOUT);
        contentBox.append(this.TPL_BUTTON_ADD_PAGEBREAK);

        this._emptyLayoutMsg = contentBox.one('.' + CSS_EMPTY_LAYOUT);

        this.get('layout').addTarget(this);
    },

    /**
     * Create the DOM structure for the `A.FormBuilder`. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        this._renderEmptyColumns();
    },

    /**
     * Bind the events for the `A.FormBuilder` UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var boundingBox = this.get('boundingBox');

        this._eventHandles = [
            this.after('fieldTypesChange', this._afterFieldTypesChange),
            this.after('layoutChange', this._afterLayoutChange),
            this.after('layout:rowsChange', this._afterLayoutRowsChange),
            this.after('layout-row:colsChange', this._afterLayoutColsChange),
            this.after('layout-col:valueChange', this._afterLayoutColValueChange),
            boundingBox.delegate('mouseenter', this._onFieldMouseEnter, '.' + CSS_FIELD_CONTENT, this),
            boundingBox.delegate('mouseleave', this._onFieldMouseLeave, '.' + CSS_FIELD, this),
            boundingBox.delegate('tap', this._onTapField, '.' + CSS_FIELD_CONTENT, this),
            boundingBox.delegate('click', this._onClickAddField, '.' + CSS_EMPTY_COL, this),
            boundingBox.delegate('click', this._onClickConfigurationField, '.' + CSS_FIELD_CONFIGURATION, this),
            boundingBox.delegate('click', this._onClickEditField, '.' + CSS_FIELD_TOOLBAR_EDIT, this),
            boundingBox.delegate('click', this._onClickCloseField, '.' + CSS_FIELD_TOOLBAR_CLOSE, this),
            boundingBox.delegate('click', this._onClickRemoveField, '.' + CSS_FIELD_TOOLBAR_REMOVE, this),
            boundingBox.one('.' + CSS_ADD_PAGE_BREAK).on('click', this._onClickAddPageBreak, this)
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
        this._syncLayoutRows();
    },

    /**
     * Hides the settings panel for the given field.
     *
     * @method hideFieldSettingsPanel
     */
    hideFieldSettingsPanel: function() {
        if (this._fieldSettingsModal) {
            this._fieldSettingsModal.hide();
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
        var instance = this;

        if (!this._fieldTypesPanel) {
            this._fieldTypesPanel = A.Node.create(
                '<div class="clearfix ' + CSS_FIELD_TYPES_LIST + '" role="main" />'
            );

            this._fieldTypesModal = new A.Modal({
                bodyContent: this._fieldTypesPanel,
                centered: true,
                cssClass: 'form-builder-modal',
                draggable: false,
                headerContent: 'Add Field',
                modal: true,
                resizable: false,
                toolbars: {
                    header: [
                        {
                            cssClass: 'close',
                            label: '\u00D7',
                            on: {
                                click: function() {
                                    instance.hideFieldsPanel();
                                    instance._colAddingField = null;
                                }
                            },
                            render: true
                        }
                    ]
                },
                visible: false,
                zIndex: 1
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
     * Fired after the `layout` attribute is set.
     *
     * @method _afterLayoutChange
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutChange: function(event) {
        this._syncLayoutRows();

        event.prevVal.removeTarget(this);
        event.newVal.addTarget(this);
    },

    /**
     * Fired after the `layout-row:colsChange` event is triggered.
     *
     * @method _afterLayoutColsChange
     * @protected
     */
    _afterLayoutColsChange: function() {
        this._renderEmptyColumns();
    },

    /**
     * Fired after the `layout-col:valueChange` event is triggered.
     * @return {[type]} [description]
     */
    _afterLayoutColValueChange: function() {
        this._renderEmptyColumns();
    },

    /**
     * Fired after the `layout:rowsChange` event is triggered.
     *
     * @method _afterLayoutRowsChange
     * @protected
     */
    _afterLayoutRowsChange: function() {
        this._syncLayoutRows();
    },

    /**
     * Creates a new page break row.
     *
     * @method _createPageBreakRow
     * @param  {Number} nextPageBreakIndex The index of the next page break.
     * @return {A.LayoutRow}
     */
    _createPageBreakRow: function(nextPageBreakIndex) {
        var pageBreak,
            row;

        pageBreak = new A.FormBuilderPageBreak({
            index: nextPageBreakIndex,
            quantity: nextPageBreakIndex
        });

        row = new A.LayoutRow({
            cols: [
                new A.LayoutCol({
                    movableContent: false,
                    removable: false,
                    size: 12,
                    value: pageBreak
                })
            ],
            maximumCols: 1,
            movable: nextPageBreakIndex > 1,
            removable: nextPageBreakIndex > 1
        });

        row.get('node').addClass(CSS_PAGE_BREAK_ROW);

        return row;
    },

    /**
     * Turns the given column into an empty form builder column.
     *
     * @method _makeColumnEmpty
     * @param  {A.LayoutCol} col
     * @protected
     */
    _makeColumnEmpty: function(col) {
        col.set('value', {content: this.TPL_EMPTY_COL});
        col.set('movableContent', false);
        col.set('removable', false);
    },

    /**
     * Generate a new page break position.
     *
     * @method _nextPageBreakPosition
     * @protected
     */
    _nextPageBreakPosition: function() {
        return this.get('contentBox').all('.form-builder-page-break').size() + 1;
    },

    /**
     * Fired when the button for adding a new field is clicked.
     *
     * @method _onClickAddField
     * @param {EventFacade} event
     * @protected
     */
    _onClickAddField: function(event) {
        this._colAddingField = event.currentTarget.ancestor('.col').getData('layout-col');

        this.showFieldsPanel();
    },

    /**
     * Adds a new page break to `layout`.
     *
     * @method _onClickAddPageBreak
     * @protected
     */
    _onClickAddPageBreak: function () {
        var newRowIndex = this.get('layout').get('rows').length,
            pageBreakQuant = this._nextPageBreakPosition(),
            row;

        row = this._createPageBreakRow(pageBreakQuant);

        this.get('layout').addRow(newRowIndex, row);

        this._updatePageBreaks(pageBreakQuant);
    },

    /**
     * Fired when the button for configuration a field is clicked.
     *
     * @method _onClickConfigurationField
     * @param {EventFacade} event
     * @protected
     */
    _onClickConfigurationField: function (event) {
        var field = event.currentTarget.ancestor('.' + CSS_FIELD).getData('field-instance');

        field.toggleToolbar(true);
    },

    /**
     * Fired when the button for closing a toolbar of field is clicked.
     *
     * @method _onClickCloseField
     * @param {EventFacade} event
     * @protected
     */
    _onClickCloseField: function (event) {
        var field = event.currentTarget.ancestor('.' + CSS_FIELD).getData('field-instance');

        field.toggleToolbar(false);
    },

    /**
     * Fired when the button for editing a field is clicked.
     *
     * @method _onClickEditField
     * @param {EventFacade} event
     * @protected
     */
    _onClickEditField: function (event) {
        var field = event.currentTarget.ancestor('.form-builder-field').getData('field-instance');

        field.toggleToolbar(false);
        this.showFieldSettingsPanel(field, field.get('title'));
    },

    /**
     * Fires when mouse enters on field.
     *
     * @method _onFieldMouseEnter
     * @param {EventFacade} event
     * @protected
     */
    _onFieldMouseEnter: function (event) {
        var field = event.currentTarget.ancestor('.' + CSS_FIELD).getData('field-instance');

        if (!field.isToolbarVisible()) {
            field.toggleConfigurationButton(true);
        }
    },

    /**
     * Fires when mouse leaves the field.
     *
     * @method _onFieldMouseLeave
     * @param {EventFacade} event
     * @protected
     */
    _onFieldMouseLeave: function (event) {
        var field = event.currentTarget.getData('field-instance');

        field.toggleConfigurationButton(false);
    },

    /**
     * Fired when a field is clicked.
     *
     * @method _onTapField
     * @param {EventFacade} event
     * @protected
     */
    _onTapField: function (event) {
        var field = event.currentTarget.ancestor('.' + CSS_FIELD).getData('field-instance');

        field.toggleToolbar(true);
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
     * Fired when the button for removing a field is clicked.
     *
     * @method _onClickRemoveField
     * @param {EventFacade} event
     * @protected
     */
    _onClickRemoveField: function (event) {
        var col = event.currentTarget.ancestor('.col').getData('layout-col');

        this._makeColumnEmpty(col);
    },

    /**
     * Renders some content inside the empty columns of the current layout.
     *
     * @method _renderEmptyColumns
     * @protected
     */
    _renderEmptyColumns: function() {
        var instance = this,
            rows = this.get('layout').get('rows');

        A.Array.each(rows, function(row) {
            A.Array.each(row.get('cols'), function(col) {
                if (!col.get('value')) {
                    instance._makeColumnEmpty(col);
                }
            });
        });
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
            cssClass: CSS_FIELD_SETTINGS,
            draggable: false,
            modal: true,
            resizable: false,
            zIndex: 1
        }).render();

        this._fieldSettingsModal.addToolbar([{
            cssClass: CSS_FIELD_SETTINGS_SAVE,
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

        if (this._colAddingField) {
            this._colAddingField.set('value', this._fieldBeingEdited);
            this._colAddingField.set('movableContent', true);
            this._colAddingField.set('removable', true);
            this._colAddingField = null;
        }

        this._toggleUniqueDisabled(this._fieldBeingEdited, true);

        this.hideFieldSettingsPanel();
        this._fieldBeingEdited = null;
    },

    /**
     * Sets the `val` attribute.
     *
     * @method _setLayout
     * @param {A.Layout} val
     * @protected
     */
    _setLayout: function(val) {
        var firstCol;

        if (val.get('rows').length > 0) {
            firstCol = val.get('rows')[0].get('cols')[0];
        }

        if (!firstCol || !A.instanceOf(firstCol, A.FormBuilderPageBreak)) {
            val.addRow(0, this._createPageBreakRow(1));
        }
    },

    /**
     * Syncs the UI according to changes in the layout's rows.
     *
     * @method _syncLayoutRows
     * @protected
     */
    _syncLayoutRows: function() {
        var layout = this.get('layout');

        this._renderEmptyColumns();

        // Show the empty layout msg if there's only the initial page break in
        // the layout.
        if (layout.get('rows').length === 1) {
            this._emptyLayoutMsg.show();
        } else {
            this._emptyLayoutMsg.hide();
        }
    },

    /**
     * Disables or enabled unique fields for the field class that the given
     * field is an instance of.
     *
     * @method _toggleUniqueDisabled
     * @param {A.FormBuilderFieldBase} field
     * @param {Boolean} disabled
     * @protected
     */
    _toggleUniqueDisabled: function (field, disabled) {
        A.Array.each(this.get('fieldTypes'), function (fieldType) {
            if (A.instanceOf(field, fieldType.get('fieldClass')) && fieldType.get('unique')) {
                fieldType.set('disabled', disabled);
            }
        });
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
    },

    /**
     * Update the quantity value of each page break created.
     *
     * @method _updatePageBreaks
     * @param {Number} quantity
     * @protected
     */
    _updatePageBreaks: function (quantity) {
        var pageBreak;

        A.Array.each(this.get('layout').get('rows'), function (row) {
            pageBreak = row.get('cols')[0].get('value');

            if (A.instanceOf(pageBreak, A.FormBuilderPageBreak)) {
                pageBreak.set('quantity', quantity);
            }
        });
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
            setter: '_setLayout',
            validator: function(val) {
                return A.instanceOf(val, A.Layout);
            },
            valueFn: function() {
                return new A.Layout();
            }
        },

        /**
         * The form builder's current mode. Valid values are the ones listed on
         * `A.FormBuilder.MODES`.
         *
         * @attribute mode
         * @default 'regular'
         * @type String
         */
        mode: {
            validator: function(val) {
                return A.Object.hasValue(MODES, val);
            },
            value: MODES.REGULAR
        }
    },

    /**
     * Static property used to define the valid `A.FormBuilder` modes.
     *
     * @property MODES
     * @type Object
     * @static
     */
    MODES: MODES
});
