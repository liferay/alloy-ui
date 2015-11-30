YUI.add('aui-form-builder-deprecated', function (A, NAME) {

/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-base
 */

var L = A.Lang,
    isObject = L.isObject,

    aArray = A.Array,

    getAvailableFieldById = A.PropertyBuilderAvailableField.getAvailableFieldById,

    isAvailableField = function(v) {
        return (v instanceof A.PropertyBuilderAvailableField);
    },

    isFormBuilderField = function(v) {
        return (v instanceof A.FormBuilderField);
    },

    getCN = A.getClassName,

    AVAILABLE_FIELDS_ID_PREFIX = 'availableFields' + '_' + 'field' + '_',
    FIELDS_ID_PREFIX = 'fields' + '_' + 'field' + '_',

    CSS_DD_DRAGGING = getCN('dd', 'dragging'),
    CSS_PROPERTY_BUILDER_CONTENT_CONTAINER = getCN('property', 'builder', 'content', 'container'),
    CSS_PROPERTY_BUILDER_FIELD_DRAGGABLE = getCN('property', 'builder', 'field', 'draggable'),
    CSS_FIELD_HOVER = getCN('form', 'builder', 'field', 'hover'),
    CSS_FORM_BUILDER_DROP_ZONE = getCN('form', 'builder', 'drop', 'zone'),
    CSS_FORM_BUILDER_FIELD = getCN('form', 'builder', 'field'),
    CSS_FORM_BUILDER_PLACEHOLDER = getCN('form', 'builder', 'placeholder'),
    CSS_FORM_BUILDER_TABS = getCN('form', 'builder', 'tabs'),

    MOBILE_TOUCH_ENABLED = A.UA.touchEnabled && A.UA.mobile,

    TPL_PLACEHOLDER = '<div class="' + CSS_FORM_BUILDER_PLACEHOLDER + '"></div>';

/**
 * A base class for `A.FormBuilder`.
 *
 * @class A.FormBuilder
 * @extends A.PropertyBuilder
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
    NAME: 'form-builder',

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
            validator: A.Lang.isBoolean,
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
        },

        /**
         * Stores an instance of `A.TabView`.
         *
         * @attribute tabView
         * @default null
         * @type Object
         * @writeOnce
         */
        tabView: {
            value: {
                cssClass: CSS_FORM_BUILDER_TABS
            }
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.PropertyBuilder,

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['allowRemoveRequiredFields'],

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
        CONTENT_CONTAINER_TEMPLATE: '<div class="col-xs-12 col-sm-6 col-md-8 ' + CSS_PROPERTY_BUILDER_CONTENT_CONTAINER + '"></div>',

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

            instance.uniqueFieldsMap = new A.Map();
            instance.uniqueFieldsMap.after({
                put: A.bind(instance._afterUniqueFieldsMapPut, instance),
                remove: A.bind(instance._afterUniqueFieldsMapRemove, instance)
            });

            instance.selectedFieldsLinkedSet = new A.LinkedSet();
            instance.selectedFieldsLinkedSet.after({
                add: A.bind(instance._afterSelectedFieldsSetAdd, instance),
                remove: A.bind(instance._afterSelectedFieldsSetRemove, instance)
            });

            instance.on({
                'cancel': instance._onCancel,
                'drag:end': instance._onDragEnd,
                'drag:start': instance._onDragStart,
                'drag:mouseDown': instance._onDragMouseDown,
                'save': instance._onSave
            });

            instance.after('*:focusedChange', instance._afterFieldFocusedChange);

            instance.dropContainer.delegate('click', A.bind(instance._onClickField, instance), '.' + CSS_FORM_BUILDER_FIELD);

            if (!MOBILE_TOUCH_ENABLED) {
                instance.dropContainer.delegate('mouseover', A.bind(instance._onMouseOverField, instance), '.' + CSS_FORM_BUILDER_FIELD);
                instance.dropContainer.delegate('mouseout', A.bind(instance._onMouseOutField, instance), '.' + CSS_FORM_BUILDER_FIELD);
            }

            instance.get('contentBox').addClass('row');
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

                config = new(instance.getFieldClass(config.type || 'field'))(A.mix(attrs, config));
            }

            config.addTarget(instance);

            return config;
        },

        /**
         * Gets the current field index and then clones the field. Inserts the
         * new one after the current field index, inside of the current field
         * parent.
         *
         * @method duplicateField
         * @param field
         */
        duplicateField: function(field) {
            var instance = this,
                index = instance._getFieldNodeIndex(field.get('boundingBox')),
                newField = instance._cloneField(field, true),
                boundingBox = newField.get('boundingBox');

            boundingBox.setStyle('opacity', 0);
            instance.insertField(newField, ++index, field.get('parent'));
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
            var clazz = A.FormBuilderField.types[type];

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
        getFieldProperties: function(field, excludeHidden) {
            return field.getProperties(excludeHidden);
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
            field.get('parent').removeField(field);

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
            instance.propertyList.set('data', instance.getFieldProperties(field, true));
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
                boundingBox = field.get('boundingBox');

            if (!field.get('rendered')) {
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
            fields = fields || instance.get('fields');

            container.setContent('');

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

            aArray.each(aArray(fields), function(field) {
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

            if (lastFocusedField && (field !== lastFocusedField)) {
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

            aArray.each(aArray(fields), function(field) {
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

            if (event.newVal && isFormBuilderField(field) && !MOBILE_TOUCH_ENABLED) {
                instance.editField(field);
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
                node = availableField.get('node');

                availableField.set('draggable', false);
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
                node = availableField.get('node');

                availableField.set('draggable', true);
                node.selectable();
            }
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
                config = field.getAttributesForCloning();

            if (deep) {
                config.fields = [];

                A.each(field.get('fields'), function(child, index) {
                    if (!child.get('unique')) {
                        config.fields[index] = instance._cloneField(child, deep);
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
                availableField = dragNode.getData('availableField'),
                field = A.Widget.getByNode(dragNode);

            if (isAvailableField(availableField)) {
                var config = {
                    hiddenAttributes: availableField.get('hiddenAttributes'),
                    label: availableField.get('label'),
                    localizationMap: availableField.get('localizationMap'),
                    options: availableField.get('options'),
                    predefinedValue: availableField.get('predefinedValue'),
                    readOnlyAttributes: availableField.get('readOnlyAttributes'),
                    required: availableField.get('required'),
                    showLabel: availableField.get('showLabel'),
                    tip: availableField.get('tip'),
                    type: availableField.get('type'),
                    unique: availableField.get('unique'),
                    width: availableField.get('width')
                };

                if (config.unique) {
                    config.id = instance._getFieldId(availableField);
                    config.name = availableField.get('name');
                }

                field = instance.createField(config);
            }

            if (isFormBuilderField(field)) {
                var parentNode = dragNode.get('parentNode'),
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
            var id = field.get('id'),
                prefix;

            if (isAvailableField(field)) {
                prefix = AVAILABLE_FIELDS_ID_PREFIX;
            }
            else {
                prefix = FIELDS_ID_PREFIX;
            }

            return id.replace(prefix, '');
        },

        /**
         * Gets the index from the field node.
         *
         * @method _getFieldNodeIndex
         * @param fieldNode
         * @protected
         */
        _getFieldNodeIndex: function(fieldNode) {
            return fieldNode.get('parentNode').all(
                // prevent the placeholder interference on the index
                // calculation
                '> *:not(' + '.' + CSS_FORM_BUILDER_PLACEHOLDER + ')'
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
                dragNode = drag.get('node');

            instance._dropField(dragNode);

            // skip already instanciated fields
            if (!isFormBuilderField(A.Widget.getByNode(dragNode))) {
                dragNode.remove();

                drag.set('node', instance._originalDragNode);
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
            var dragNode = event.target.get('node'),
                availableField = A.PropertyBuilderAvailableField.getAvailableFieldByNode(dragNode);

            if (isAvailableField(availableField) && !availableField.get('draggable')) {
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
                dragNode = drag.get('node');

            // skip already instanciated fields
            if (isFormBuilderField(A.Widget.getByNode(dragNode))) {
                return;
            }

            // in the dragEnd we`re going to restore the drag node
            // to the original node
            instance._originalDragNode = dragNode;

            var clonedDragNode = dragNode.clone();
            dragNode.placeBefore(clonedDragNode);

            drag.set('node', clonedDragNode);

            var availableFieldData = dragNode.getData('availableField');
            clonedDragNode.setData('availableField', availableFieldData);

            clonedDragNode.attr('id', '');
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
            field.get('boundingBox').removeClass(CSS_FIELD_HOVER);

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
            field.get('boundingBox').addClass(CSS_FIELD_HOVER);

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
                var modelList = instance.propertyList.get('data');

                modelList.each(function(model) {
                    editingField.set(model.get('attributeName'), model.get('value'));
                });

                instance._syncUniqueField(editingField);
            }
        },

        /**
         * Overrides PropertyBuilderSettings's `_renderTabs` method, which renders
         * the builder's tabs.
         *
         * @method _renderTabs
         * @protected
         */
        _renderTabs: function() {
            FormBuilder.superclass._renderTabs.apply(this, arguments);

            this.tabView.get('boundingBox').addClass('col-xs-12 col-sm-6 col-md-4');
        },

        /**
         * Set list of available fields by checking if a field is a
         * `A.PropertyBuilderAvailableField` instance. If not creates a new
         * instance of `A.FormBuilderAvailableField`.
         *
         * @method _setAvailableFields
         * @param val
         * @protected
         * @return {Array}
         */
        _setAvailableFields: function(val) {
            var fields = [];

            aArray.each(val, function(field) {
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
                        groups: ['availableFields'],
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
                        var dropNode = event.drop.get('node'),
                            field = A.Widget.getByNode(dropNode);

                        if (isFormBuilderField(field)) {
                            return true;
                        }

                        return false;
                    },
                    placeholder: A.Node.create(TPL_PLACEHOLDER),
                    dropOn: '.' + CSS_FORM_BUILDER_DROP_ZONE,
                    sortCondition: function(event) {
                        var dropNode = event.drop.get('node');

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
                    '.' + CSS_PROPERTY_BUILDER_FIELD_DRAGGABLE
                );

                instance.availableFieldsSortableList = new A.SortableList(
                    A.merge(
                        instance.get('fieldsSortableListConfig'), {
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
                    instance.get('fieldsSortableListConfig')
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
                if (availableField.get('unique') || field.get('unique')) {
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

            instance.get('fields').each(function(field) {
                field._uiSetRequired(field.get('required'));
            });
        }
    }

});

A.FormBuilder = FormBuilder;


}, '3.0.1', {
    "requires": [
        "aui-button",
        "aui-collection",
        "aui-form-builder-available-field-deprecated",
        "aui-form-builder-field-deprecated",
        "aui-form-builder-field-button-deprecated",
        "aui-form-builder-field-checkbox-deprecated",
        "aui-form-builder-field-fieldset-deprecated",
        "aui-form-builder-field-file-upload-deprecated",
        "aui-form-builder-field-multiple-choice-deprecated",
        "aui-form-builder-field-radio-deprecated",
        "aui-form-builder-field-select-deprecated",
        "aui-form-builder-field-text-deprecated",
        "aui-form-builder-field-textarea-deprecated",
        "aui-property-builder",
        "aui-property-builder-settings",
        "aui-sortable-list",
        "aui-tabview",
        "aui-tooltip-base",
        "escape",
        "transition"
    ],
    "skinnable": true
});
