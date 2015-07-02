/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 */

var CSS_EDIT_LAYOUT_BUTTON = A.getClassName('form', 'builder', 'edit', 'layout', 'button'),
    CSS_EMPTY_COL_ADD_BUTTON_CIRCLE =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'circle'),
    CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_HEADER = A.getClassName('form', 'builder', 'header'),
    CSS_HEADER_TITLE = A.getClassName('form', 'builder', 'header', 'title'),
    CSS_LAYOUT = A.getClassName('form', 'builder', 'layout'),
    CSS_PAGE_HEADER = A.getClassName('form', 'builder', 'pages', 'header'),
    CSS_PAGES = A.getClassName('form', 'builder', 'pages');

/**
 * A base class for `A.FormBuilder`.
 *
 * @class A.FormBuilder
 * @extends A.Widget
 * @uses A.FormBuilderFieldTypes, A.FormBuilderLayoutBuilder
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilder = A.Base.create('form-builder', A.Widget, [
    A.FormBuilderFieldTypes,
    A.FormBuilderLayoutBuilder
], {
    TPL_EDIT_LAYOUT_BUTTON: '<div class="' + CSS_EDIT_LAYOUT_BUTTON + '">' +
        '<a>{editLayout}</a></div>',
    TPL_HEADER: '<div class="' + CSS_HEADER + '">' +
        '<div class="' + CSS_HEADER_TITLE + '">{formTitle}</div>' +
        '</div>',
    TPL_LAYOUT: '<div class="' + CSS_LAYOUT + '" ></div>',
    TPL_PAGE_HEADER: '<div class="' + CSS_PAGE_HEADER + '" ></div>',
    TPL_PAGES: '<div class="' + CSS_PAGES + '" ></div>',

    /**
     * Construction logic executed during the `A.FormBuilder`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var contentBox = this.get('contentBox'),
            headerTemplate;

        headerTemplate = A.Lang.sub(this.TPL_HEADER, {
            formTitle: this.get('strings').formTitle
        });

        contentBox.append(headerTemplate);
        contentBox.append(this.TPL_PAGE_HEADER);
        contentBox.append(this.TPL_LAYOUT);
        contentBox.append(this.TPL_PAGES);

        this._fieldToolbar = new A.FormBuilderFieldToolbar(this.get('fieldToolbarConfig'));

        this._eventHandles = [
            this.after('layoutsChange', A.bind(this._afterLayoutsChange, this)),
            this.after('layout:valueChange', this._afterLayoutChange),
            this.after('layout:rowsChange', this._afterLayoutRowsChange),
            this.after('layout-row:colsChange', this._afterLayoutColsChange)
        ];

        this._pages = new A.FormBuilderPages({
            pageHeader: '.' + CSS_PAGE_HEADER,
            pagesQuantity: this.get('layouts').length
        });

        A.Array.invoke(this.get('layouts'), 'addTarget', this);
    },

    /**
     * Renders the `A.FormBuilder` UI. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var layoutButtonNode;

        layoutButtonNode = A.Lang.sub(this.TPL_EDIT_LAYOUT_BUTTON, {
            editLayout: this.get('strings').titleOnEditLayoutMode
        });

        this._pages.render('.' + CSS_PAGES);

        this.getActiveLayout().addTarget(this);

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

        this._eventHandles.push(
            this.get('contentBox').on('focus', A.bind(this._onFocus, this)),
            boundingBox.delegate('click', this._onClickAddField, '.' + CSS_EMPTY_COL_ADD_BUTTON_CIRCLE, this),
            boundingBox.delegate('key', A.bind(this._onKeyPressAddField, this), 'enter', '.' +
                CSS_EMPTY_COL_ADD_BUTTON_CIRCLE),
            this._pages.on('add', A.bind(this._addPage, this)),
            this._pages.on('remove', A.bind(this._removeLayout, this)),
            this._pages.after('activePageNumberChange', A.bind(this._afterActivePageNumberChange, this)),
            this._pages.after('updatePageContent', A.bind(this._afterUpdatePageContentChange, this)),
            A.getDoc().on('key', this._onEscKey, 'esc', this)
        );
    },

    /**
     * Syncs the UI. Lifecycle.
     *
     * @method syncUI
     * @protected
     */
    syncUI: function() {
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
        if (this._fieldSettingsModal) {
            this._fieldSettingsModal.destroy();
        }

        (new A.EventHandle(this._eventHandles)).detach();
    },

    /**
     * Adds a nested field to the given field.
     *
     * @method addNestedField
     * @param {A.FormBuilderFieldBase} field
     */
    addNestedField: function(field) {
        this._newFieldContainer = field;
        this.showFieldsPanel();
    },

    /**
     * Opens the settings panel for editing the given field.
     *
     * @method editField
     * @param {A.FormBuilderFieldBase} field
     */
    editField: function(field) {
        var fieldType = this.findTypeOfField(field);
        this.showFieldSettingsPanel(field, fieldType.get('label'));
    },

    /**
     * Returns the active `LayoutPage`.
     *
     * @method getActiveLayout
     * @return {A.LayoutPage}
     */
    getActiveLayout: function() {
        return this.get('layouts')[this._getActiveLayoutIndex()];
    },

    /**
     * Returns the row of the given field.
     *
     * @method getFieldRow
     * @param {A.FormField} field
     * @return {Node} The row where is the field parameter
     */
    getFieldRow: function(field) {
        return field.get('content').ancestor('.layout-row');
    },

    /**
     * Removes the given field from the form builder.
     *
     * @method removeField
     * @param {A.FormBuilderFieldBase} field
     */
    removeField: function(field) {
        var col,
            parentField,
            row,
            nestedFieldsNode = field.get('content').ancestor('.form-builder-field-nested');

        this._handleRemoveEvent(field);

        if (nestedFieldsNode) {
            parentField = nestedFieldsNode.ancestor('.form-builder-field').getData('field-instance');
            parentField.removeNestedField(field);
            this.getActiveLayout().normalizeColsHeight(new A.NodeList(this.getFieldRow(parentField)));
        }
        else {
            col = field.get('content').ancestor('.col').getData('layout-col');
            row = this.getFieldRow(field);
            col.get('value').removeField(field);
            this.getActiveLayout().normalizeColsHeight(new A.NodeList(row));
        }

        this._updateUniqueFieldType();
    },

    /**
     * Shows the settings panel for the given field.
     *
     * @method showFieldSettingsPanel
     * @param {A.FormField} field
     * @param {String} typeName The name of the field type.
     */
    showFieldSettingsPanel: function(field, typeName) {
        if (!this._fieldSettingsModal) {
            this._fieldSettingsModal = new A.FormBuilderSettingsModal();
            this._fieldSettingsModal.after('hide', A.bind(this._afterFieldSettingsModalHide, this));
            this._fieldSettingsModal.after('save', A.bind(this._afterFieldSettingsModalSave, this));
        }

        this._fieldSettingsModal.show(field, typeName);
    },

    /**
     * Adds a new page on form builder.
     *
     * @method _addPage
     * @protected
     */
    _addPage: function() {
        var layouts = this.get('layouts');
        var newLayout = new A.Layout({
            rows: [
                new A.LayoutRow()
            ]
        });

        layouts.push(newLayout);
        this.set('layouts', layouts);
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
    },

    /**
     * Fired after the `activePageNumber` change.
     *
     * @method _afterActivePageNumberChange
     * @protected
     */
    _afterActivePageNumberChange: function(event) {
        var layouts = this.get('layouts'),
            activeLayout = layouts[event.newVal - 1];

        this._updatePageContent(activeLayout);
    },

    /**
     * Fired when the field settings modal is hidden.
     *
     * @method _afterFieldSettingsModalHide
     * @protected
     */
    _afterFieldSettingsModalHide: function() {
        this._newFieldContainer = null;
    },

    /**
     * Fired when the field settings modal is saved.
     *
     * @method _afterFieldSettingsModalSave
     * @param {EventFacade} event
     * @protected
     */
    _afterFieldSettingsModalSave: function(event) {
        var field = event.field;

        if (this._newFieldContainer) {
            if (A.instanceOf(this._newFieldContainer.get('value'), A.FormBuilderFieldList)) {
                this._newFieldContainer.get('value').addField(field);
                this._newFieldContainer.set('removable', false);
            }
            else {
                this._addNestedField(
                    this._newFieldContainer,
                    field,
                    this._newFieldContainer.get('nestedFields').length
                );
            }
            this._newFieldContainer = null;
        }
        else {
            this._handleEditEvent(field);
        }
        this.getActiveLayout().normalizeColsHeight(new A.NodeList(field.get('content').ancestor('.layout-row')));

        this._handleCreateEvent(field);
        this.disableUniqueFieldType(field);
    },

    /**
     * Fired after the `layout-row:colsChange` event is triggered.
     *
     * @method _afterLayoutColsChange
     * @protected
     */
    _afterLayoutColsChange: function() {
        this._updateUniqueFieldType();
    },

    /**
     * Fired after the `layout:rowsChange` event is triggered.
     *
     * @method _afterLayoutRowsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutRowsChange: function(event) {
        var rows = event.newVal;

        for (var i = 0; i < rows.length; i++) {
            rows[i].set('removable', true);
        }

        this._renderEmptyColumns();
        this._updateUniqueFieldType();
        this._checkLastRow();
    },

    /**
     * Fires after layouts changes.
     *
     * @method _afterLayoutsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutsChange: function(event) {
        A.Array.invoke(event.prevVal, 'removeTarget', this);
        A.Array.invoke(event.newVal, 'addTarget', this);

        this._updatePageContent(this.get('layouts')[0]);
        this._updateUniqueFieldType();

        this._pages.set('activePageNumber', 1);
        this._pages.set('pagesQuantity', this.get('layouts').length);

        this._checkLastRow();
    },

    /**
     * Fired after the `activePageNumber` change.
     *
     * @method _afterUpdatePageContentChange
     * @param {EventFacade} event
     * @protected
     */
    _afterUpdatePageContentChange: function(event) {
        var layouts = this.get('layouts'),
            activeLayout = layouts[event.newVal - 1];

        this._updatePageContent(activeLayout);
    },

    /**
     * Fire event of create a field.
     *
     * @method _getActiveLayoutIndex
     * @protected
     */
    _getActiveLayoutIndex: function() {
        return this._pages.get('activePageNumber') - 1;
    },

    /**
     * Fire event of create a field.
     *
     * @method _handleCreateEvent
     * @param {A.FormBuilderFieldBase} field
     * @protected
     */
    _handleCreateEvent: function(field) {
        this.fire('create', {
            field: field
        });
    },

    /**
     * Fire event of edit a field.
     *
     * @method _handleEditEvent
     * @param {A.FormBuilderFieldBase} field
     * @protected
     */
    _handleEditEvent: function(field) {
        this.fire('edit', {
            field: field
        });
    },

    /**
     * Fire event of remove a field.
     *
     * @method _handleRemoveEvent
     * @param {A.FormBuilderFieldBase} field
     * @protected
     */
    _handleRemoveEvent: function(field) {
        this.fire('remove', {
            field: field
        });
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
     * @method _makeEmptyFieldList
     * @param {A.LayoutCol} col
     * @protected
     */
    _makeEmptyFieldList: function(col) {
        col.set('value', new A.FormBuilderFieldList());
    },

    /**
     * Fired when the button for adding a new field is clicked.
     *
     * @method _onClickAddField
     * @param {EventFacade} event
     * @protected
     */
    _onClickAddField: function(event) {
        this._openNewFieldPanel(event.currentTarget);
    },

    /**
     * Fired when some node is focused inside content box.
     *
     * @method _onFocus
     * @param {EventFacade} event
     * @protected
     */
    _onFocus: function(event) {
        var fieldContainer,
            target = event.target;

        if (target.hasClass(CSS_FIELD)) {
            fieldContainer = target;
        }
        else {
            fieldContainer = target.ancestor('.' + CSS_FIELD);
        }

        if (fieldContainer) {
            this._fieldToolbar.addForField(fieldContainer.getData('field-instance'));
        }
        else {
            this._fieldToolbar.remove();
        }
    },

    /**
     * Fired when the add field button is pressed.
     *
     * @method _onKeyPressAddField
     * @params {EventFacade} event
     * @protected
     */
    _onKeyPressAddField: function(event) {
        this._openNewFieldPanel(event.currentTarget);
    },

    /**
     * Opens a panel to select a new field type.
     *
     * @method _openNewFieldPanel
     * @param {Node} target
     * @protected
     */
    _openNewFieldPanel: function(target) {
        this._newFieldContainer = target.ancestor('.col').getData('layout-col');

        this.showFieldsPanel();
    },

    /**
     * Remove a layout from the form builder. The paramenter `event` has the
     * layout index to be removed.
     *
     * @method _removeLayout
     * @params {EventFacade} event
     * @protected
     */
    _removeLayout: function(event) {
        var layouts = this.get('layouts');

        layouts[event.removedIndex].destroy();
        layouts.splice(event.removedIndex, 1);
    },

    /**
     * Renders some content inside the empty columns of the current layout.
     *
     * @method _renderEmptyColumns
     * @protected
     */
    _renderEmptyColumns: function() {
        var instance = this,
            rows = this.get('layouts')[this._getActiveLayoutIndex()].get('rows');

        A.Array.each(rows, function(row) {
            A.Array.each(row.get('cols'), function(col) {
                var colValue = col.get('value');

                if (!colValue) {
                    instance._makeEmptyFieldList(col);
                }

                if (colValue && colValue._updateRemovableLayoutColProperty) {
                    colValue._updateRemovableLayoutColProperty();
                }
            });
        });
    },

    /**
     * Sets the `fieldToolbar` attribute.
     *
     * @method _setFieldToolbarConfig
     * @params {Object} val
     * @return {Object}
     */
    _setFieldToolbarConfig: function(val) {
        return A.merge({
            formBuilder: this
        }, val);
    },

    /**
     * Sets the `layouts` attribute.
     *
     * @method _setLayouts
     * @param {A.Array} val
     * @protected
     */
    _setLayouts: function(val) {
        var layouts = [];

        A.Array.each(val, function(layout) {
            if (!A.instanceOf(layout, A.Layout)) {
                layout = new A.Layout(layout);
            }

            if (layout.get('rows').length === 0) {
                layout.set('rows', [new A.LayoutRow()]);
            }

            layout.get('rows')[layout.get('rows').length - 1].set('removable', false);
            
            layouts.push(layout);
        });

        return layouts;
    },

    /**
     * Fired after the `activePageNumber` change.
     *
     * @method _updatePageContent
     * @protected
     */
    _updatePageContent: function(activeLayout) {
        activeLayout.addTarget(this);

        if (this.get('rendered')) {
            this._layoutBuilder.set('layout', activeLayout);
            this._renderEmptyColumns();
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
         * A configuration object for the creation of the `A.FormBuilderFieldToolbar`
         * instance to be used for the form builder field toolbars.
         *
         * @attribute fieldToolbarConfig
         * @type Object
         */
        fieldToolbarConfig: {
            setter: '_setFieldToolbarConfig',
            validator: A.Lang.isObject,
            value: {}
        },

        /**
         * The layouts where the forms fields will be rendered.
         *
         * @attribute layouts
         * @default [A.Layout]
         * @type Array
         */
        layouts: {
            setter: '_setLayouts',
            validator: A.Lang.isArray,
            valueFn: function() {
                return [new A.Layout()];
            }
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                addField: 'Add Field',
                formTitle: 'Build your form',
                cancelRemoveRow: 'Cancel',
                confirmRemoveRow: 'Yes, delete',
                modalHeader: 'Remove confirmation',
                removeRowModal: 'You will also delete fields with this row. ' +
                    'Are you sure you want delete it?'
            },
            writeOnce: true
        }
    },

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: A.getClassName('form-builder')
});
