/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 */

var CSS_ADD_PAGE_BREAK = A.getClassName('form', 'builder', 'add', 'page', 'break'),
    CSS_EDIT_LAYOUT_BUTTON = A.getClassName('form', 'builder', 'edit', 'layout', 'button'),
    CSS_EMPTY_COL = A.getClassName('form', 'builder', 'empty', 'col'),
    CSS_EMPTY_COL_ADD_BUTTON = A.getClassName('form', 'builder', 'empty', 'col', 'add', 'button'),
    CSS_EMPTY_COL_ICON = A.getClassName('form', 'builder', 'empty', 'col', 'icon'),
    CSS_EMPTY_COL_LABEL = A.getClassName('form', 'builder', 'empty', 'col', 'label'),
    CSS_EMPTY_LAYOUT = A.getClassName('form', 'builder', 'empty', 'layout'),
    CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_FIELD_CONTENT = A.getClassName('form', 'builder', 'field', 'content'),
    CSS_FIELD_CONTENT_TOOLBAR = A.getClassName('form', 'builder', 'field', 'content', 'toolbar'),
    CSS_FIELD_CONFIGURATION = A.getClassName('form', 'builder', 'field', 'configuration'),
    CSS_FIELD_MOVE_TARGET = A.getClassName('form', 'builder', 'field', 'move', 'target'),
    CSS_FIELD_SETTINGS = A.getClassName('form', 'builder', 'field', 'settings'),
    CSS_FIELD_SETTINGS_CANCEL =
        A.getClassName('form', 'builder', 'field', 'settings', 'cancel'),
    CSS_FIELD_SETTINGS_LABEL = A.getClassName('form', 'builder', 'field', 'settings', 'label'),
    CSS_FIELD_SETTINGS_SAVE =
        A.getClassName('form', 'builder', 'field', 'settings', 'save'),
    CSS_FIELD_TOOLBAR_ADD_NESTED = A.getClassName('form', 'builder', 'field', 'toolbar', 'add', 'nested'),
    CSS_FIELD_TOOLBAR_CLOSE = A.getClassName('form', 'builder', 'field', 'toolbar', 'close'),
    CSS_FIELD_TOOLBAR_EDIT = A.getClassName('form', 'builder', 'field', 'toolbar', 'edit'),
    CSS_FIELD_TOOLBAR_REMOVE = A.getClassName('form', 'builder', 'field', 'toolbar', 'remove'),
    CSS_FIELD_TYPES_LIST = A.getClassName('form', 'builder', 'field', 'types', 'list'),
    CSS_HEADER = A.getClassName('form', 'builder', 'header'),
    CSS_HEADER_BACK = A.getClassName('form', 'builder', 'header', 'back'),
    CSS_HEADER_TITLE = A.getClassName('form', 'builder', 'header', 'title'),
    CSS_LAYOUT = A.getClassName('form', 'builder', 'layout'),
    CSS_MENU = A.getClassName('form', 'builder', 'menu'),
    CSS_MENU_BUTTON = A.getClassName('form', 'builder', 'menu', 'button'),
    CSS_MENU_CONTENT = A.getClassName('form', 'builder', 'menu', 'content'),

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
    TITLE_REGULAR: 'Build your form',

    TPL_BUTTON_ADD_PAGEBREAK: '<button class="btn-default btn ' + CSS_ADD_PAGE_BREAK + '">' +
        '<span class="glyphicon glyphicon-th-list"></span>' +
        'Add Page Break' +
        '</button>',
    TPL_EDIT_LAYOUT_BUTTON: '<div class="' + CSS_EDIT_LAYOUT_BUTTON + '">' +
        '<a>Edit Layout</a></div>',
    TPL_EMPTY_COL: '<div class="' + CSS_EMPTY_COL + '">' +
        '<div class="' + CSS_EMPTY_COL_ADD_BUTTON + '">' +
        '<span class="glyphicon glyphicon-plus ' + CSS_EMPTY_COL_ICON + '"></span>' +
        '<div class="' + CSS_EMPTY_COL_LABEL + '">Add Field</div></div>' +
        '<button class="' + CSS_FIELD_MOVE_TARGET +
        ' layout-builder-move-target layout-builder-move-col-target btn btn-default">' +
        'Paste here</button>' +
        '</div>',
    TPL_EMPTY_LAYOUT: '<div class="' + CSS_EMPTY_LAYOUT + '">' +
        '<div>You don\'t have any question yet.</div>' +
        '<div>First for all let\'s create a new line?</div></div>',
    TPL_HEADER: '<div class="' + CSS_HEADER + '">' +
        '<a class="' + CSS_HEADER_BACK + '"><span class="glyphicon glyphicon-chevron-left"></span></a>' +
        '<div class="' + CSS_MENU + '">' +
        '<a class="dropdown-toggle ' + CSS_MENU_BUTTON + '" data-toggle="dropdown">' +
        '<span class="glyphicon glyphicon-cog"></span></a>' +
        '<div class="' + CSS_MENU_CONTENT + ' dropdown-menu dropdown-menu-right"></div></div>' +
        '<div class="' + CSS_HEADER_TITLE + '"></div>' +
        '</div>',
    TPL_LAYOUT: '<div class="' + CSS_LAYOUT + '" ></div>',

    /**
     * Construction logic executed during the `A.FormBuilder`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var contentBox = this.get('contentBox');

        contentBox.append(this.TPL_HEADER);
        contentBox.append(this.TPL_LAYOUT);
        contentBox.append(this.TPL_EMPTY_LAYOUT);
        contentBox.append(this.TPL_BUTTON_ADD_PAGEBREAK);

        this._emptyLayoutMsg = contentBox.one('.' + CSS_EMPTY_LAYOUT);

        this.get('layout').addTarget(this);
    },

    /**
     * Renders the `A.FormBuilder` UI. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        this._menuEditLayoutItem = new A.MenuItem({
            content: this.TPL_EDIT_LAYOUT_BUTTON
        });

        this._menu = new A.Menu({
            boundingBox: '.' + CSS_MENU,
            contentBox: '.' + CSS_MENU,
            items: [this._menuEditLayoutItem],
            trigger: '.' + CSS_MENU_BUTTON
        }).render();
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
            boundingBox.delegate('mouseleave', this._onFieldMouseLeave, '.' + CSS_FIELD_CONTENT_TOOLBAR, this),
            boundingBox.delegate('click', this._onClickAddField, '.' + CSS_EMPTY_COL_ADD_BUTTON, this),
            boundingBox.delegate('click', this._onClickAddNestedField, '.' + CSS_FIELD_TOOLBAR_ADD_NESTED, this),
            boundingBox.delegate('click', this._onClickConfigurationField, '.' + CSS_FIELD_CONFIGURATION, this),
            boundingBox.delegate('click', this._onClickEditField, '.' + CSS_FIELD_TOOLBAR_EDIT, this),
            boundingBox.delegate('click', this._onClickCloseField, '.' + CSS_FIELD_TOOLBAR_CLOSE, this),
            boundingBox.delegate('click', this._onClickRemoveField, '.' + CSS_FIELD_TOOLBAR_REMOVE, this),
            boundingBox.one('.' + CSS_ADD_PAGE_BREAK).on('click', this._onClickAddPageBreak, this),
            boundingBox.one('.' + CSS_HEADER_BACK).on('click', this._onClickHeaderBack, this),
            this._menu.after('itemSelected', A.bind(this._afterItemSelected, this))
        ];

        if (A.UA.mobile) {
            this._eventHandles.push(boundingBox.delegate('tap', this._onTapField, '.' + CSS_FIELD_CONTENT, this));
        }
    },

    /**
     * Syncs the UI. Lifecycle.
     *
     * @method syncUI
     * @protected
     */
    syncUI: function() {
        this._syncLayoutRows();

        this._updateUniqueFieldType();
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
     * Returns the `fieldInstance`'s row.
     *
     * @method getFieldRow
     * @param {A.FormField} fieldInstance
     * @return {Node} The row where is the field parameter
     */
    getFieldRow: function(fieldInstance) {
        return fieldInstance.get('content').ancestor('.layout-row');
    },

    /**
     * Hides the settings panel for the given field.
     *
     * @method hideFieldSettingsPanel
     */
    hideFieldSettingsPanel: function() {
        if (this._fieldSettingsModal) {
            this._fieldSettingsModal.hide();
            this._newFieldContainer = null;
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
     * @param {A.FormField} field
     * @param {String} typeName The name of the field type.
     */
    showFieldSettingsPanel: function(field, typeName) {
        var bodyNode,
            firstInput;

        if (!this._fieldSettingsModal) {
            this._renderFieldSettingsModal();
        }

        bodyNode = this._fieldSettingsModal.getStdModNode(A.WidgetStdMod.BODY);
        bodyNode.empty();
        field.renderSettingsPanel(bodyNode);

        this._fieldSettingsModal.get('boundingBox').one('.' + CSS_FIELD_SETTINGS_LABEL).set('text', typeName);

        this._fieldSettingsModal.show();
        this._fieldSettingsModal.align();

        firstInput = bodyNode.one('input[type="text"]');
        if (firstInput) {
            firstInput.focus();
        }

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
                                    instance._newFieldContainer = null;
                                }
                            },
                            render: true
                        }
                    ]
                },
                visible: false,
                zIndex: 2
            }).render();

            this._uiSetFieldTypes(this.get('fieldTypes'));

            this._eventHandles.push(
                this._fieldTypesPanel.delegate(
                    'click',
                    this._onClickFieldType,
                    '.field-type',
                    this
                ),
                A.getDoc().on(
                    'key',
                    this._onEscKey,
                    'esc',
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
     * Adds a field into field's nested list and normalizes the columns height.
     *
     * @method _addNestedField
     * @param {A.FormField} field The Field with nested list that will receive the field
     * @param {A.FormField} nested Field to add as nested
     * @param {Number} index The position where the nested field should be added
     * @protected
     */
    _addNestedField: function(field, nested, index) {
        field.addNestedField(index, nested);
        this.get('layout').normalizeColsHeight([this.getFieldRow(nested)]);
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
     * Fired after the `itemSelected` event is triggered for the form builder's
     * menu.
     *
     * @method _afterItemSelected
     * @param {EventFacade} event
     * @protected
     */
    _afterItemSelected: function(event) {
        if (event.item === this._menuEditLayoutItem) {
            this.set('mode', A.FormBuilder.MODES.LAYOUT);
        }
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

        this._updateUniqueFieldType();
    },

    /**
     * Fired after the `layout-row:colsChange` event is triggered.
     *
     * @method _afterLayoutColsChange
     * @protected
     */
    _afterLayoutColsChange: function() {
        this._renderEmptyColumns();

        this._updateUniqueFieldType();
    },

    /**
     * Fired after the `layout-col:valueChange` event is triggered.
     *
     * @method _afterLayoutColValueChange
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutColValueChange: function(event) {
        var col = event.target;

        if (A.instanceOf(event.newVal, A.FormField)) {
            col.set('movableContent', true);
        }
        else if (!event.newVal) {
            this._makeColumnEmpty(col);
        }
        else {
            col.set('movableContent', false);
        }
    },

    /**
     * Fired after the `layout:rowsChange` event is triggered.
     *
     * @method _afterLayoutRowsChange
     * @protected
     */
    _afterLayoutRowsChange: function() {
        this._syncLayoutRows();
        this._updatePageBreaks();

        this._updateUniqueFieldType();
    },

    /**
     * Creates a new page break row.
     *
     * @method _createPageBreakRow
     * @param  {Number} nextPageBreakIndex The index of the next page break.
     * @return {A.LayoutRow}
     */
    _createPageBreakRow: function(nextPageBreakIndex) {
        return new A.FormBuilderPageBreak({
            index: nextPageBreakIndex,
            quantity: nextPageBreakIndex
        });
    },

    /**
     * Gets the number of page breaks currently inside the layout.
     *
     * @method _getNumberOfPageBreaks
     * @protected
     */
    _getNumberOfPageBreaks: function() {
        return this.get('contentBox').all('.form-builder-page-break').size();
    },

    /**
     * Check all Field created if there is a someone of the same type
     * of the parameter.
     *
     * @method _hasFieldType
     * @param {Object} fieldType
     * @return {Boolean}
     * @protected
     */
    _hasFieldType: function(fieldType) {
        var col,
            cols,
            field,
            row,
            rows = this.get('layout').get('rows');

        for (row = 0; row < rows.length; row++) {
            cols = rows[row].get('cols');
            for (col = 0; col < cols.length; col++) {
                field = cols[col].get('value');
                if (field && (field instanceof A.FormField)) {
                    if (field.constructor === fieldType.get('fieldClass')) {
                        return true;
                    }
                    else if (this._hasFieldTypeOnNested(fieldType.get('fieldClass'), field)) {
                        return true;
                    }
                }
            }
        }

        return false;
    },

    /**
     * Check all nested Field created if there is a someone of the same
     * type of the parameter.
     * @param  {A.FormBuilderFieldType} fieldTypeClass
     * @param  {A.FormField} field
     * @return {Boolean}
     * @protected
     */
    _hasFieldTypeOnNested: function(fieldTypeClass, field) {
        var nestedFields = field.get('nestedFields');

        if (nestedFields.length === 0) {
            return false;
        }

        for (var i = 0; i < nestedFields.length; i++) {
            if (nestedFields[i].constructor === fieldTypeClass) {
                return true;
            }
            else if (this._hasFieldTypeOnNested(fieldTypeClass, nestedFields[i])) {
                return true;
            }
        }

        return false;
    },

    /**
     * Fires when the esc key is pressed
     *
     * @method _onEscKey
     * @protected
     */
    _onEscKey: function() {
        this._newFieldContainer = null;
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
    },

    /**
     * Fired when the button for adding a new field is clicked.
     *
     * @method _onClickAddField
     * @param {EventFacade} event
     * @protected
     */
    _onClickAddField: function(event) {
        this._newFieldContainer = event.currentTarget.ancestor('.col').getData('layout-col');

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
            row;

        row = this._createPageBreakRow(this._getNumberOfPageBreaks() + 1);

        this.get('layout').addRow(newRowIndex, row);
    },

    /**
     * Fired when the button for adding a field in nested is clicked.
     *
     * @method _onClickAddNestedField
     * @param {EventFacade} event
     * @protected
     */
    _onClickAddNestedField: function (event) {
        this._newFieldContainer = event.currentTarget.ancestor('.' + CSS_FIELD).getData('field-instance');

        this.showFieldsPanel();
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
        var field = event.currentTarget.ancestor('.form-builder-field').getData('field-instance'),
            fieldTypes = this.get('fieldTypes'),
            i;

        field.toggleToolbar(false);

        for (i = 0; i < fieldTypes.length; i++) {
            if (field.constructor === fieldTypes[i].get('fieldClass')) {
                this.showFieldSettingsPanel(field, fieldTypes[i].get('label'));
                break;
            }
        }
    },

    /**
     * Fired when the header back button is clicked.
     *
     * @method _onClickHeaderBack
     * @protected
     */
    _onClickHeaderBack: function() {
        this.set('mode', A.FormBuilder.MODES.REGULAR);
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
        var field = event.currentTarget.ancestor('.' + CSS_FIELD).getData('field-instance');

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
        var col,
            field,
            parentField,
            nestedFieldsNode = event.currentTarget.ancestor('.form-builder-field-nested');

        if (nestedFieldsNode) {
            field = event.currentTarget.ancestor('.form-builder-field').getData('field-instance');
            parentField = nestedFieldsNode.ancestor('.form-builder-field').getData('field-instance');
            parentField.removeNestedField(field);

            this.get('layout').normalizeColsHeight([this.getFieldRow(parentField)]);
        }
        else {
            col = event.currentTarget.ancestor('.col').getData('layout-col');
            this._makeColumnEmpty(col);
        }

        this._updateUniqueFieldType();

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
        var instance = this;

        this._fieldSettingsModal = new A.Modal({
            centered: true,
            cssClass: CSS_FIELD_SETTINGS,
            draggable: false,
            modal: true,
            headerContent: '<div class="' + CSS_FIELD_SETTINGS_LABEL + '"></div>',
            resizable: false,
            toolbars: {
                header: [
                    {
                        cssClass: 'close',
                        label: '\u00D7',
                        on: {
                            click: function() {
                                instance.hideFieldSettingsPanel();
                            }
                        },
                        render: true
                    }
                ]
            },
            zIndex: 2
        }).render();

        this._fieldSettingsModal.addToolbar([{
            cssClass: CSS_FIELD_SETTINGS_CANCEL,
            label: 'Cancel',
            on: {
                click: function() {
                    instance.hideFieldSettingsPanel();
                }
            },
            render: true
        },
        {
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
        if (this._fieldBeingEdited.validateSettings()) {
            this._fieldBeingEdited.saveSettings();

            if (this._newFieldContainer) {
                if (A.instanceOf(this._newFieldContainer, A.LayoutCol)) {
                    this._newFieldContainer.set('value', this._fieldBeingEdited);
                }
                else if (A.instanceOf(this._newFieldContainer, A.FormField)) {
                    this._addNestedField(
                        this._newFieldContainer,
                        this._fieldBeingEdited,
                        this._newFieldContainer.get('nestedFields').length
                    );
                }
                this._newFieldContainer = null;
            }
            else {
                this.get('layout').normalizeColsHeight([this._fieldBeingEdited.get('content').ancestor('.layout-row')]);
            }

            this._toggleUniqueDisabled(this._fieldBeingEdited, true);

            this.hideFieldSettingsPanel();
        }
    },

    /**
     * Sets the `val` attribute.
     *
     * @method _setLayout
     * @param {A.Layout} val
     * @protected
     */
    _setLayout: function(val) {
        var firstRow;

        if (val.get('rows').length > 0) {
            firstRow = val.get('rows')[0];
        }

        if (!firstRow || !A.instanceOf(firstRow, A.FormBuilderPageBreak)) {
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
     * @param {A.FormField} field
     * @param {Boolean} disabled
     * @protected
     */
    _toggleUniqueDisabled: function (field, disabled) {
        A.Array.each(this.get('fieldTypes'), function (fieldType) {
            if (field.constructor === fieldType.get('fieldClass') && fieldType.get('unique')) {
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
     * Updates the form builder header's title.
     *
     * @method _updateHeaderTitle
     * @param {String} title
     * @protected
     */
    _updateHeaderTitle: function(title) {
        var titleNode = this.get('contentBox').one('.' + CSS_HEADER_TITLE);

        titleNode.set('text', title);
    },

    /**
     * Update the quantity value of each page break created.
     *
     * @method _updatePageBreaks
     * @protected
     */
    _updatePageBreaks: function () {
        var index = 1,
            quantity = this._getNumberOfPageBreaks();

        A.Array.each(this.get('layout').get('rows'), function (row) {
            if (A.instanceOf(row, A.FormBuilderPageBreak)) {
                row.set('index', index++);
                row.set('quantity', quantity);
            }
        });
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
                fieldType.set('disabled', instance._hasFieldType(fieldType));
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
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: A.getClassName('form-builder'),

    /**
     * Static property used to define the valid `A.FormBuilder` modes.
     *
     * @property MODES
     * @type Object
     * @static
     */
    MODES: MODES
});
