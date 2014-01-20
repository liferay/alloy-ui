/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-base
 */

var L = A.Lang,
    isArray = L.isArray,
    isBoolean = L.isBoolean,
    isObject = L.isObject,
    isString = L.isString,

    AArray = A.Array,

    getAvailableFieldById = A.AvailableField.getAvailableFieldById,

    isAvailableField = function(v) {
        return (v instanceof A.AvailableField);
    },

    isFormBuilderField = function(v) {
        return (v instanceof A.FormBuilderField);
    },

    ALLOW_REMOVE_REQUIRED_FIELDS = 'allowRemoveRequiredFields',
    ATTRIBUTE_NAME = 'attributeName',
    AVAILABLE_FIELD = 'availableField',
    AVAILABLE_FIELDS = 'availableFields',
    BOUNDING_BOX = 'boundingBox',
    BUILDER = 'builder',
    DATA = 'data',
    DD = 'dd',
    DIAGRAM = 'diagram',
    DRAGGABLE = 'draggable',
    DRAGGING = 'dragging',
    DROP = 'drop',
    EMPTY_STR = '',
    FIELD = 'field',
    FIELDS = 'fields',
    FIELDS_SORTABLE_LIST_CONFIG = 'fieldsSortableListConfig',
    FORM = 'form',
    FORM_BUILDER = 'form-builder',
    HIDDEN_ATTRIBUTES = 'hiddenAttributes',
    ID = 'id',
    LABEL = 'label',
    LOCALIZATION_MAP = 'localizationMap',
    NAME = 'name',
    NODE = 'node',
    OPACITY = 'opacity',
    OPTIONS = 'options',
    PARENT = 'parent',
    PARENT_NODE = 'parentNode',
    PLACEHOLDER = 'placeholder',
    PREDEFINED_VALUE = 'predefinedValue',
    READ_ONLY_ATTRIBUTES = 'readOnlyAttributes',
    RENDERED = 'rendered',
    REQUIRED = 'required',
    SELECTED = 'selected',
    SHOW_LABEL = 'showLabel',
    TIP = 'tip',
    TYPE = 'type',
    UNIQUE = 'unique',
    VALUE = 'value',
    WIDTH = 'width',
    HOVER = 'hover',
    ZONE = 'zone',

    _DOT = '.',
    _EMPTY_STR = '',
    _UNDERLINE = '_',

    getCN = A.getClassName,

    AVAILABLE_FIELDS_ID_PREFIX = AVAILABLE_FIELDS + _UNDERLINE + FIELD + _UNDERLINE,
    FIELDS_ID_PREFIX = FIELDS + _UNDERLINE + FIELD + _UNDERLINE,

    CSS_DD_DRAGGING = getCN(DD, DRAGGING),
    CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE = getCN(DIAGRAM, BUILDER, FIELD, DRAGGABLE),
    CSS_FIELD_HOVER = getCN(FORM, BUILDER, FIELD, HOVER),
    CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
    CSS_FORM_BUILDER_FIELD = getCN(FORM, BUILDER, FIELD),
    CSS_FORM_BUILDER_PLACEHOLDER = getCN(FORM, BUILDER, PLACEHOLDER),

    INVALID_CLONE_ATTRS = [ID, NAME],

    TPL_PLACEHOLDER = '<div class="' + CSS_FORM_BUILDER_PLACEHOLDER + '"></div>';

/**
 * A base class for `A.FormBuilderAvailableField`.
 *
 * @class A.FormBuilderAvailableField
 * @extends A.AvailableField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

var FormBuilderAvailableField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: AVAILABLE_FIELD,

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderAvailableField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * List of hidden attributes.
         *
         * @attribute hiddenAttributes
         * @type Array
         */
        hiddenAttributes: {
            validator: isArray
        },

        /**
         * The name of the input field.
         *
         * @attribute name
         */
        name: {},

        /**
         * Collection of options.
         *
         * @attribute options
         * @type Object
         */
        options: {
            validator: isObject
        },

        /**
         * Specifies a predefined value for the input field.
         *
         * @attribute predefinedValue
         */
        predefinedValue: {},

        /**
         * List of read-only input fields.
         *
         * @attribute readOnlyAttributes
         * @type Array
         */
        readOnlyAttributes: {
            validator: isArray
        },

        /**
         * Checks if an input field is required.
         * In other words, it needs content to be valid.
         *
         * @attribute required
         * @type Boolean
         */
        required: {
            validator: isBoolean
        },

        /**
         * If `true` the label is showed.
         *
         * @attribute showLabel
         * @default true
         * @type Boolean
         */
        showLabel: {
            validator: isBoolean,
            value: true
        },

        /**
         * Hint to help the user to fill the input field.
         *
         * @attribute tip
         * @type String
         */
        tip: {
            validator: isString
        },

        /**
         * Checks if the input field is unique or not.
         *
         * @attribute unique
         * @type Boolean
         */
        unique: {
            validator: isBoolean
        },

        /**
         * The width of the input field.
         *
         * @attribute width
         */
        width: {}
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.AvailableField
});

A.FormBuilderAvailableField = FormBuilderAvailableField;

/**
 * A base class for `A.FormBuilder`.
 *
 * @class A.FormBuilder
 * @extends A.DiagramBuilderBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/form-builder/basic-markup.html
 * @include http://alloyui.com/examples/form-builder/basic.js
 */
var FormBuilder = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: FORM_BUILDER,

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
         * Checks if removing required fields is permitted or not.
         *
         * @attribute allowRemoveRequiredFields
         * @default false
         * @type Boolean
         */
        allowRemoveRequiredFields: {
            validator: isBoolean,
            value: false
        },

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
         * Collection of sortable fields.
         *
         * @attribute fieldsSortableListConfig
         * @default null
         * @type Object
         */
        fieldsSortableListConfig: {
            setter: '_setFieldsSortableListConfig',
            validator: isObject,
            value: null
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
    UI_ATTRS: [ALLOW_REMOVE_REQUIRED_FIELDS],

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramBuilderBase,

    /**
     * Static property used to define the fields tab.
     *
     * @property FIELDS_TAB
     * @default 0
     * @type Number
     * @static
     */
    FIELDS_TAB: 0,

    /**
     * Static property used to define the settings tab.
     *
     * @property SETTINGS_TAB
     * @default 1
     * @type Number
     * @static
     */
    SETTINGS_TAB: 1,

    prototype: {

        selectedFieldsLinkedSet: null,
        uniqueFieldsMap: null,

        /**
         * Construction logic executed during `A.FormBuilder` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.selectedFieldsLinkedSet = new A.LinkedSet({
                after: {
                    add: A.bind(instance._afterSelectedFieldsSetAdd, instance),
                    remove: A.bind(instance._afterSelectedFieldsSetRemove, instance)
                }
            });

            instance.uniqueFieldsMap = new A.Map({
                after: {
                    put: A.bind(instance._afterUniqueFieldsMapPut, instance),
                    remove: A.bind(instance._afterUniqueFieldsMapRemove, instance)
                }
            });

            instance.on({
                cancel: instance._onCancel,
                'drag:end': instance._onDragEnd,
                'drag:start': instance._onDragStart,
                'drag:mouseDown': instance._onDragMouseDown,
                save: instance._onSave
            });

            instance.after('*:focusedChange', instance._afterFieldFocusedChange);

            instance.dropContainer.delegate('click', A.bind(instance._onClickField, instance), _DOT +
                CSS_FORM_BUILDER_FIELD);
            instance.dropContainer.delegate('mouseover', A.bind(instance._onMouseOverField, instance), _DOT +
                CSS_FORM_BUILDER_FIELD);
            instance.dropContainer.delegate('mouseout', A.bind(instance._onMouseOutField, instance), _DOT +
                CSS_FORM_BUILDER_FIELD);
        },

        /**
         * Sync the `A.FormBuilder` UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            instance._setupAvailableFieldsSortableList();
            instance._setupFieldsSortableList();
        },

        /**
         * Selects the field tab and disables the setting tabs.
         *
         * @method closeEditProperties
         */
        closeEditProperties: function() {
            var instance = this;

            instance.tabView.selectChild(A.FormBuilder.FIELDS_TAB);
            instance.tabView.disableTab(A.FormBuilder.SETTINGS_TAB);
        },

        /**
         * Creates a field and returns its configuration.
         *
         * @method createField
         * @param config
         * @return {Object}
         */
        createField: function(config) {
            var instance = this,
                attrs = {
                    builder: instance,
                    parent: instance
                };

            if (isFormBuilderField(config)) {
                config.setAttrs(attrs);
            }
            else {
                A.each(config, function(value, key) {
                    if (value === undefined) {
                        delete config[key];
                    }
                });

                config = new(instance.getFieldClass(config.type || FIELD))(A.mix(attrs, config));
            }

            config.addTarget(instance);

            return config;
        },

        /**
         * Gets the current field index and then clones the field.
         * Inserts the new one after the current field index, inside of the
         * current field parent.
         *
         * @method duplicateField
         * @param field
         */
        duplicateField: function(field) {
            var instance = this,
                index = instance._getFieldNodeIndex(field.get(BOUNDING_BOX)),
                newField = instance._cloneField(field, true),
                boundingBox = newField.get(BOUNDING_BOX);

            boundingBox.setStyle(OPACITY, 0);
            instance.insertField(newField, ++index, field.get(PARENT));
            boundingBox.show(true);
        },

        /**
         * Checks if the current field is a `A.FormBuilderField` instance and
         * selects it.
         *
         * @method editField
         * @param field
         */
        editField: function(field) {
            var instance = this;

            if (isFormBuilderField(field)) {
                instance.editingField = field;

                instance.unselectFields();
                instance.selectFields(field);
            }
        },

        /**
         * Gets the field class based on the `A.FormBuilder` type. If the type
         * doesn't exist, logs an error message.
         *
         * @method getFieldClass
         * @param type
         * @return {Object | null}
         */
        getFieldClass: function(type) {
            var clazz = A.FormBuilder.types[type];

            if (clazz) {
                return clazz;
            }
            else {
                A.log('The field type: [' + type + '] couldn\'t be found.');

                return null;
            }
        },

        /**
         * Gets a list of properties from the field.
         *
         * @method getFieldProperties
         * @param field
         * @return {Array}
         */
        getFieldProperties: function(field) {
            return field.getProperties();
        },

        /**
         * Removes field from previous parent and inserts into the new parent.
         *
         * @method insertField
         * @param field
         * @param index
         * @param parent
         */
        insertField: function(field, index, parent) {
            var instance = this;

            parent = parent || instance;

            // remove from previous parent
            field.get(PARENT).removeField(field);

            parent.addField(field, index);
        },

        /**
         * Enables the settings tab.
         *
         * @method openEditProperties
         * @param field
         */
        openEditProperties: function(field) {
            var instance = this;

            instance.tabView.enableTab(A.FormBuilder.SETTINGS_TAB);
            instance.tabView.selectChild(A.FormBuilder.SETTINGS_TAB);
            instance.propertyList.set(DATA, instance.getFieldProperties(field));
        },

        /**
         * Renders a field in the container.
         *
         * @method plotField
         * @param field
         * @param container
         */
        plotField: function(field, container) {
            var instance = this,
                boundingBox = field.get(BOUNDING_BOX);

            if (!field.get(RENDERED)) {
                field.render(container);
            }
            else {
                container.append(boundingBox);
            }

            instance._syncUniqueField(field);

            instance.fieldsSortableList.add(boundingBox);
        },

        /**
         * Renders a list of fields in the container.
         *
         * @method plotFields
         * @param fields
         * @param container
         */
        plotFields: function(fields, container) {
            var instance = this;

            container = container || instance.dropContainer;
            fields = fields || instance.get(FIELDS);

            container.setContent(EMPTY_STR);

            A.each(fields, function(field) {
                instance.plotField(field, container);
            });
        },

        /**
         * Adds fields to a `A.LinkedSet` instance.
         *
         * @method selectFields
         * @param fields
         */
        selectFields: function(fields) {
            var instance = this,
                selectedFieldsLinkedSet = instance.selectedFieldsLinkedSet;

            AArray.each(AArray(fields), function(field) {
                selectedFieldsLinkedSet.add(field);
            });
        },

        /**
         * Triggers a focus event in the current field and a blur event in the
         * last focused field.
         *
         * @method simulateFocusField
         * @param field
         */
        simulateFocusField: function(field) {
            var instance = this,
                lastFocusedField = instance.lastFocusedField;

            if (lastFocusedField) {
                lastFocusedField.blur();
            }

            instance.lastFocusedField = field.focus();
        },

        /**
         * Removes fields from the `A.LinkedSet` instance.
         *
         * @method unselectFields
         * @param fields
         */
        unselectFields: function(fields) {
            var instance = this,
                selectedFieldsLinkedSet = instance.selectedFieldsLinkedSet;

            if (!fields) {
                fields = selectedFieldsLinkedSet.values();
            }

            AArray.each(AArray(fields), function(field) {
                selectedFieldsLinkedSet.remove(field);
            });
        },

        /**
         * Triggers after field focused change.
         *
         * @method _afterFieldFocusedChange
         * @param event
         * @protected
         */
        _afterFieldFocusedChange: function(event) {
            var instance = this,
                field = event.target;

            if (event.newVal && isFormBuilderField(field)) {
                instance.editField(field);
            }
        },

        /**
         * Triggers after adding unique fields to a `A.Map` instance.
         *
         * @method _afterUniqueFieldsMapPut
         * @param event
         * @protected
         */
        _afterUniqueFieldsMapPut: function(event) {
            var availableField = getAvailableFieldById(event.key),
                node;

            if (isAvailableField(availableField)) {
                node = availableField.get(NODE);

                availableField.set(DRAGGABLE, false);
                node.unselectable();
            }
        },

        /**
         * Triggers after removing unique fields from the `A.Map` instance.
         *
         * @method _afterUniqueFieldsMapRemove
         * @param event
         * @protected
         */
        _afterUniqueFieldsMapRemove: function(event) {
            var availableField = getAvailableFieldById(event.key),
                node;

            if (isAvailableField(availableField)) {
                node = availableField.get(NODE);

                availableField.set(DRAGGABLE, true);
                node.selectable();
            }
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

            event.value.set(SELECTED, true);

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

            event.value.set(SELECTED, false);

            instance.closeEditProperties();
        },

        /**
         * Clones a field.
         *
         * @method _cloneField
         * @param field
         * @param deep
         * @protected
         * @return {Object}
         */
        _cloneField: function(field, deep) {
            var instance = this,
                config = {};

            AArray.each(instance.getFieldProperties(field), function(property) {
                var name = property.attributeName;

                if (AArray.indexOf(INVALID_CLONE_ATTRS, name) === -1) {
                    config[name] = property.value;
                }
            });

            if (deep) {
                config[FIELDS] = [];

                A.each(field.get(FIELDS), function(child, index) {
                    if (!child.get(UNIQUE)) {
                        config[FIELDS][index] = instance._cloneField(child, deep);
                    }
                });
            }

            return instance.createField(config);
        },

        /**
         * Executes when the field is dropped.
         *
         * @method _dropField
         * @param dragNode
         * @protected
         */
        _dropField: function(dragNode) {
            var instance = this,
                availableField = dragNode.getData(AVAILABLE_FIELD),
                field = A.Widget.getByNode(dragNode);

            if (isAvailableField(availableField)) {
                var config = {
                    hiddenAttributes: availableField.get(HIDDEN_ATTRIBUTES),
                    label: availableField.get(LABEL),
                    localizationMap: availableField.get(LOCALIZATION_MAP),
                    options: availableField.get(OPTIONS),
                    predefinedValue: availableField.get(PREDEFINED_VALUE),
                    readOnlyAttributes: availableField.get(READ_ONLY_ATTRIBUTES),
                    required: availableField.get(REQUIRED),
                    showLabel: availableField.get(SHOW_LABEL),
                    tip: availableField.get(TIP),
                    type: availableField.get(TYPE),
                    unique: availableField.get(UNIQUE),
                    width: availableField.get(WIDTH)
                };

                if (config.unique) {
                    config.id = instance._getFieldId(availableField);
                    config.name = availableField.get(NAME);
                }

                field = instance.createField(config);
            }

            if (isFormBuilderField(field)) {
                var parentNode = dragNode.get(PARENT_NODE),
                    dropField = A.Widget.getByNode(parentNode),
                    index = instance._getFieldNodeIndex(dragNode);

                if (!isFormBuilderField(dropField)) {
                    dropField = instance;
                }

                instance.insertField(field, index, dropField);
            }
        },

        /**
         * Gets the field id.
         *
         * @method _getFieldId
         * @param field
         * @protected
         * @return {String}
         */
        _getFieldId: function(field) {
            var id = field.get(ID),
                prefix;

            if (isAvailableField(field)) {
                prefix = AVAILABLE_FIELDS_ID_PREFIX;
            }
            else {
                prefix = FIELDS_ID_PREFIX;
            }

            return id.replace(prefix, _EMPTY_STR);
        },

        /**
         * Gets the index from the field node.
         *
         * @method _getFieldNodeIndex
         * @param fieldNode
         * @protected
         */
        _getFieldNodeIndex: function(fieldNode) {
            return fieldNode.get(PARENT_NODE).all(
                // prevent the placeholder interference on the index
                // calculation
                '> *:not(' + _DOT + CSS_FORM_BUILDER_PLACEHOLDER + ')'
            ).indexOf(fieldNode);
        },

        /**
         * Triggers on cancel. Unselect fields, stops the event propagation and
         * prevents the default event behavior.
         *
         * @method _onCancel
         * @param event
         * @protected
         */
        _onCancel: function(event) {
            var instance = this;

            instance.unselectFields();

            event.halt();
        },

        /**
         * Triggers when the drag ends.
         *
         * @method _onDragEnd
         * @param event
         * @protected
         */
        _onDragEnd: function(event) {
            var instance = this,
                drag = event.target,
                dragNode = drag.get(NODE);

            instance._dropField(dragNode);

            // skip already instanciated fields
            if (!isFormBuilderField(A.Widget.getByNode(dragNode))) {
                dragNode.remove();

                drag.set(NODE, instance._originalDragNode);
            }
        },

        /**
         * Triggers when a field is clicked.
         *
         * @method _onClickField
         * @param event
         * @protected
         */
        _onClickField: function(event) {
            var instance = this,
                field = A.Widget.getByNode(event.target);

            instance.simulateFocusField(field);

            event.stopPropagation();
        },

        /**
         * Triggers when the drag mouse down.
         *
         * @method _onDragMouseDown
         * @param event
         * @protected
         */
        _onDragMouseDown: function(event) {
            var dragNode = event.target.get(NODE),
                availableField = A.AvailableField.getAvailableFieldByNode(dragNode);

            if (isAvailableField(availableField) && !availableField.get(DRAGGABLE)) {
                event.halt();
            }
        },

        /**
         * Triggers when the drag starts.
         *
         * @method _onDragStart
         * @param event
         * @protected
         */
        _onDragStart: function(event) {
            var instance = this,
                drag = event.target,
                dragNode = drag.get(NODE);

            // skip already instanciated fields
            if (isFormBuilderField(A.Widget.getByNode(dragNode))) {
                return;
            }

            // in the dragEnd we`re going to restore the drag node
            // to the original node
            instance._originalDragNode = dragNode;

            var clonedDragNode = dragNode.clone();
            dragNode.placeBefore(clonedDragNode);

            drag.set(NODE, clonedDragNode);

            var availableFieldData = dragNode.getData(AVAILABLE_FIELD);
            clonedDragNode.setData(AVAILABLE_FIELD, availableFieldData);

            clonedDragNode.attr(ID, EMPTY_STR);
            clonedDragNode.hide();

            dragNode.removeClass(CSS_DD_DRAGGING);
            dragNode.show();

            instance.fieldsSortableList.add(clonedDragNode);
        },

        /**
         * Triggers when the mouse is out a field.
         *
         * @method _onMouseOutField
         * @param event
         * @protected
         */
        _onMouseOutField: function(event) {
            var field = A.Widget.getByNode(event.currentTarget);

            field.controlsToolbar.hide();
            field.get(BOUNDING_BOX).removeClass(CSS_FIELD_HOVER);

            event.stopPropagation();
        },

        /**
         * Triggers when the mouse is over a field.
         *
         * @method _onMouseOverField
         * @param event
         * @protected
         */
        _onMouseOverField: function(event) {
            var field = A.Widget.getByNode(event.currentTarget);

            field.controlsToolbar.show();
            field.get(BOUNDING_BOX).addClass(CSS_FIELD_HOVER);

            event.stopPropagation();
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
                var modelList = instance.propertyList.get(DATA);

                modelList.each(function(model) {
                    editingField.set(model.get(ATTRIBUTE_NAME), model.get(VALUE));
                });

                instance._syncUniqueField(editingField);
            }
        },

        /**
         * Set list of available fields by checking if a field is a
         * `A.AvailableField` instance. If not creates a new instance of
         * `A.FormBuilderAvailableField`.
         *
         * @method _setAvailableFields
         * @param val
         * @protected
         * @return {Array}
         */
        _setAvailableFields: function(val) {
            var fields = [];

            AArray.each(val, function(field) {
                fields.push(
                    isAvailableField(field) ? field : new A.FormBuilderAvailableField(field)
                );
            });

            return fields;
        },

        /**
         * Set the `fieldsSortableListConfig` attribute.
         *
         * @method _setFieldsSortableListConfig
         * @param val
         * @protected
         */
        _setFieldsSortableListConfig: function(val) {
            var instance = this,
                dropContainer = instance.dropContainer;

            return A.merge({
                    bubbleTargets: instance,
                    dd: {
                        groups: [AVAILABLE_FIELDS],
                        plugins: [
                            {
                                cfg: {
                                    horizontal: false,
                                    scrollDelay: 150
                                },
                                fn: A.Plugin.DDWinScroll
                            }
                        ]
                    },
                    dropCondition: function(event) {
                        var dropNode = event.drop.get(NODE),
                            field = A.Widget.getByNode(dropNode);

                        if (isFormBuilderField(field)) {
                            return true;
                        }

                        return false;
                    },
                    placeholder: A.Node.create(TPL_PLACEHOLDER),
                    dropOn: _DOT + CSS_FORM_BUILDER_DROP_ZONE,
                    sortCondition: function(event) {
                        var dropNode = event.drop.get(NODE);

                        return (dropNode !== instance.dropContainer &&
                            dropContainer.contains(dropNode));
                    }
                },
                val || {}
            );
        },

        /**
         * Setup a `A.SortableList` of available fields.
         *
         * @method _setupAvailableFieldsSortableList
         * @protected
         */
        _setupAvailableFieldsSortableList: function() {
            var instance = this;

            if (!instance.availableFieldsSortableList) {
                var availableFieldsNodes = instance.fieldsContainer.all(
                    _DOT + CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE
                );

                instance.availableFieldsSortableList = new A.SortableList(
                    A.merge(
                        instance.get(FIELDS_SORTABLE_LIST_CONFIG), {
                            nodes: availableFieldsNodes
                        }
                    )
                );
            }
        },

        /**
         * Setup a `A.SortableList` of fields.
         *
         * @method _setupFieldsSortableList
         * @protected
         */
        _setupFieldsSortableList: function() {
            var instance = this;

            if (!instance.fieldsSortableList) {
                instance.fieldsSortableList = new A.SortableList(
                    instance.get(FIELDS_SORTABLE_LIST_CONFIG)
                );
            }
        },

        /**
         * Sync unique fields.
         *
         * @method _syncUniqueField
         * @param field
         * @protected
         */
        _syncUniqueField: function(field) {
            var instance = this,
                fieldId = instance._getFieldId(field),
                availableField = getAvailableFieldById(fieldId);

            if (isAvailableField(availableField)) {
                if (availableField.get(UNIQUE) || field.get(UNIQUE)) {
                    instance.uniqueFieldsMap.put(fieldId, field);
                }
            }
        },

        /**
         * Set the `allowRemoveRequiredFields` attribute on the UI.
         *
         * @method _uiSetAllowRemoveRequiredFields
         * @param val
         * @protected
         */
        _uiSetAllowRemoveRequiredFields: function() {
            var instance = this;

            instance.get(FIELDS).each(function(field) {
                field._uiSetRequired(field.get(REQUIRED));
            });
        }
    }

});

A.FormBuilder = FormBuilder;

A.FormBuilder.types = {};
