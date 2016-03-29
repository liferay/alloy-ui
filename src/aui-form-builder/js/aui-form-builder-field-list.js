/**
 * The Form Builder Field List Component
 *
 * @module aui-form-builder-field-list
 */

var CSS_FIELD_LIST = A.getClassName('form', 'builder', 'field', 'list'),
    CSS_FIELD_LIST_ADD_BUTTON =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button'),
    CSS_FIELD_LIST_ADD_BUTTON_ICON =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'icon'),
    CSS_FIELD_LIST_ADD_BUTTON_LABEL =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'label'),
    CSS_FIELD_LIST_ADD_BUTTON_LARGE =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'large'),
    CSS_FIELD_LIST_ADD_BUTTON_PLUS_ICON =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'plus', 'icon'),
    CSS_FIELD_LIST_ADD_BUTTON_VISIBLE =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'visible'),
    CSS_FIELD_LIST_ADD_CONTAINER =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'container'),
    CSS_FIELD_LIST_CONTAINER =
        A.getClassName('form', 'builder', 'field', 'list', 'container'),
    CSS_FIELD_LIST_EMPTY = A.getClassName('form', 'builder', 'field', 'list', 'empty'),
    CSS_FIELD_MOVE_TARGET =
        A.getClassName('form', 'builder', 'field', 'move', 'target'),
    CSS_FIELD_MOVE_TARGET_LABEL =
        A.getClassName('form', 'builder', 'field', 'move', 'target', 'label'),
    CSS_LIST_MOVE_TARGET =
        A.getClassName('form', 'builder', 'list', 'move', 'target');

/**
 * A base class for `A.FormBuilderFieldList`.
 *
 * @class A.FormBuilderFieldList
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldList  = A.Base.create('form-builder-field-list', A.Base, [], {
    TPL_ADD_FIELD: '<div class="' + CSS_FIELD_LIST_ADD_CONTAINER + '">' +
        '<a class="' + CSS_FIELD_LIST_ADD_BUTTON + '" href="javascript:;">' +
        '<span class="' + CSS_FIELD_LIST_ADD_BUTTON_ICON + ' ' + CSS_FIELD_LIST_ADD_BUTTON_PLUS_ICON + '">+</span>' +
        '<label class="' + CSS_FIELD_LIST_ADD_BUTTON_LABEL + '">' +
        '{addField}' +
        '</label>' +
        '</a></div>',
    TPL_FIELD_LIST: '<div class="' + CSS_FIELD_LIST + '">' +
        '<div class="' + CSS_FIELD_LIST_CONTAINER + '"></div>' +
        '</div>',
    TPL_FIELD_MOVE_TARGET: '<button type="button" class="' + CSS_FIELD_MOVE_TARGET + ' ' + CSS_LIST_MOVE_TARGET +
        ' layout-builder-move-target layout-builder-move-col-target">' +
        '<label class="' + CSS_FIELD_MOVE_TARGET_LABEL + '">{pasteHere}</label></button>',

    /**
     * Construction logic executed during the `A.FormBuilderFieldList`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        this._uiSetFields(this.get('fields'));

        content.delegate('click', this._onClickAddField, '.' + CSS_FIELD_LIST_ADD_BUTTON, this);
        content.delegate('mouseenter', this._onMouseEnterAddButton, '.' + CSS_FIELD_LIST_ADD_CONTAINER, this);
        content.delegate('mouseleave', this._onMouseLeaveAddButton, '.' + CSS_FIELD_LIST_ADD_CONTAINER, this);

        this.after('fieldsChange', A.bind(this._afterFieldsChange, this));
    },

    /**
     * Adds a new field to the `A.FormBuilderFieldList`.
     *
     * @method addField
     * @param {A.FormBuilderFieldBase} field
     * @param {Number} index
     */
    addField: function(field, index) {
        var fields = this.get('fields');

        if (A.Lang.isNumber(index)) {
            fields.splice(index, 0, field);
        }
        else {
            fields.splice(this._newFieldIndex, 0, field);
        }

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
     * Executed to the last empty column.
     *
     * @method _addEmptyColumnFieldClasses
     * @param {Node} content
     * @protected
     */
    _addEmptyColumnFieldClasses: function(content) {
        content.one('.' + CSS_FIELD_LIST_ADD_CONTAINER).addClass(CSS_FIELD_LIST_ADD_BUTTON_VISIBLE);
        content.one('.' + CSS_FIELD_LIST_ADD_BUTTON).addClass(CSS_FIELD_LIST_ADD_BUTTON_LARGE);
    },

    /**
     * Fired after the `fields` attribute is set.
     *
     * @method _afterFieldsChange
     * @protected
     */
    _afterFieldsChange: function() {
        var fields = this.get('fields');

        this._uiSetFields(fields);
        this._updateRemovableLayoutColProperty();
    },

    /**
     * Appends add field on the given container.
     *
     * @method _appendAddFieldNode
     * @param {Node} container
     * @protected
     */
    _appendAddFieldNode: function(container) {
        var addFieldNode;

        addFieldNode = A.Node.create(A.Lang.sub(this.TPL_ADD_FIELD, {
            addField: this.get('strings').addField
        }));

        container.append(addFieldNode);

        return addFieldNode;
    },

    /**
     * Appends move target button on the given container.
     *
     * @method _appendAddMoveTargetNode
     * @param {Node} container
     * @param {Number} index
     * @protected
     */
    _appendAddMoveTargetNode: function(container, index) {
        var moveTargetNode;

        moveTargetNode = A.Node.create(A.Lang.sub(this.TPL_FIELD_MOVE_TARGET, {
            pasteHere: this.get('strings').pasteHere
        }));

        moveTargetNode.setData('field-list-index', index);

        container.append(moveTargetNode);

        return moveTargetNode;
    },

    /**
     * Fired when the button for adding a new field is clicked.
     *
     * @method _onClickAddField
     * @param {EventFacade} event
     * @protected
     */
    _onClickAddField: function(event) {
        var emptyFieldList = this.get('content').all('.' + CSS_FIELD_LIST_ADD_BUTTON);

        this._newFieldIndex = emptyFieldList.indexOf(event.currentTarget);
    },

    /**
     * Fired when mouse enters the button for adding a new field.
     *
     * @method _onMouseEnterAddButton
     * @param {EventFacade} event
     * @protected
     */
    _onMouseEnterAddButton: function(event) {
        var addButtonNode = event.currentTarget;

        if (this.get('fields').length > 0) {
            addButtonNode.addClass(CSS_FIELD_LIST_ADD_BUTTON_VISIBLE);
        }
    },

    /**
     * Fired when mouse leaves the button for adding a new field.
     *
     * @method _onMouseLeaveAddButton
     * @param {EventFacade} event
     * @protected
     */
    _onMouseLeaveAddButton: function(event) {
        var addButtonNode = event.currentTarget;

        if (this.get('fields').length > 0) {
            addButtonNode.removeClass(CSS_FIELD_LIST_ADD_BUTTON_VISIBLE);
        }
    },

    /**
     * Append a field and its necessaries elements into a given container.
     *
     * @method _uiSetField
     * @param {Node} container
     * @param {Node} field
     * @param {Number} index
     * @protected
     */
    _uiSetField: function(container, field, index) {
        this._appendAddFieldNode(container);
        this._appendAddMoveTargetNode(container, index);

        container.append(field.get('content'));
    },

    /**
     * Updates the ui according to the value of the `fields` attribute.
     *
     * @method _uiSetFields
     * @param {Array} fields
     * @protected
     */
    _uiSetFields: function(fields) {
        var content = this.get('content'),
            container = content.one('.' + CSS_FIELD_LIST_CONTAINER),
            index;

        container.empty();

        for (index = 0; index < fields.length; index++) {
            this._uiSetField(container, fields[index], index);
        }

        this._appendAddFieldNode(container);
        this._appendAddMoveTargetNode(container, index);

        content.toggleClass(CSS_FIELD_LIST_EMPTY, !fields.length);

        if (fields.length === 0) {
            this._addEmptyColumnFieldClasses(content);
        }
    },

    /**
     * Update removable property for layout cols.
     *
     * @method _updateRemovableLayoutColProperty
     * @protected
     */
    _updateRemovableLayoutColProperty: function() {
        var fields = this.get('fields'),
            content = this.get('content'),
            col = content.ancestor('.col'),
            layoutCol;

        if (col) {
            layoutCol = col.getData('layout-col');
            layoutCol.set('removable', fields.length === 0);
        }
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
         * Node containing the contents of this field list.
         *
         * @attribute content
         * @type Node
         */
        content: {
            validator: function(val) {
                return A.instanceOf(val, A.Node);
            },
            valueFn: function() {
                return A.Node.create(this.TPL_FIELD_LIST);
            },
            writeOnce: 'initOnly'
        },

        /**
         * List of field.
         *
         * @attribute fields
         * @type {Array}
         */
        fields: {
            value: []
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
                pasteHere: 'Paste here'
            },
            writeOnce: true
        }
    }
});
