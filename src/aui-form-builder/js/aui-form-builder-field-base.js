/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-base
 */

var L = A.Lang,
    isArray = L.isArray,
    isObject = L.isObject,

    AArray = A.Array,

    ACCEPT_CHILDREN = 'acceptChildren',
    ALERT = 'alert',
    ALLOW_REMOVE_REQUIRED_FIELDS = 'allowRemoveRequiredFields',
    ASTERISK = 'asterisk',
    BODY_CONTENT = 'bodyContent',
    BOOLEAN = 'boolean',
    BOUNDING_BOX = 'boundingBox',
    BUILDER = 'builder',
    CHILDREN = 'children',
    CLEARFIX = 'clearfix',
    COMPONENT = 'component',
    CONTENT_BOX = 'contentBox',
    CONTROLS_TOOLBAR = 'controlsToolbar',
    DELETE_FIELDS_MESSAGE = 'deleteFieldsMessage',
    DISABLED = 'disabled',
    DOT = '.',
    DROP = 'drop',
    DROP_ZONE_NODE = 'dropZoneNode',
    EMPTY_STR = '',
    FIELD = 'field',
    FIELDS = 'fields',
    FORM = 'form',
    FORM_BUILDER_FIELD = 'form-builder-field',
    HIDDEN_ATTRIBUTES = 'hiddenAttributes',
    ICON = 'icon',
    ID = 'id',
    INFO = 'info',
    LABEL = 'label',
    LABEL_NODE = 'labelNode',
    NAME = 'name',
    NO = 'no',
    PARENT = 'parent',
    PLUS = 'plus',
    PREDEFINED_VALUE = 'predefinedValue',
    QUESTION = 'question',
    READ_ONLY = 'readOnly',
    READ_ONLY_ATTRIBUTES = 'readOnlyAttributes',
    REQUIRED = 'required',
    REQUIRED_FLAG_NODE = 'requiredFlagNode',
    SELECTED = 'selected',
    SHOW_LABEL = 'showLabel',
    SIGN = 'sign',
    SPACE = ' ',
    STRING = 'string',
    TEMPLATE_NODE = 'templateNode',
    TIP = 'tip',
    TIP_FLAG_NODE = 'tipFlagNode',
    TRASH = 'trash',
    TYPE = 'type',
    UNIQUE = 'unique',
    WIDGET = 'widget',
    WRENCH = 'wrench',
    YES = 'yes',
    ZONE = 'zone',

    _UNDERLINE = '_',

    getCN = A.getClassName,

    CSS_ALERT = getCN(ALERT),
    CSS_ALERT_INFO = getCN(ALERT, INFO),
    CSS_CLEARFIX = getCN(CLEARFIX),
    CSS_COMPONENT = getCN(COMPONENT),
    CSS_FB_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
    CSS_FB_FIELD = getCN(FORM, BUILDER, FIELD),
    CSS_FB_FIELD_SELECTED = getCN(FORM, BUILDER, FIELD, SELECTED),
    CSS_FB_UNIQUE = getCN(FORM, BUILDER, UNIQUE),
    CSS_ICON = getCN(ICON),
    CSS_ICON_ASTERISK = getCN(ICON, ASTERISK),
    CSS_ICON_PLUS = getCN(ICON, PLUS),
    CSS_ICON_QUESTION_SIGN = getCN(ICON, QUESTION, SIGN),
    CSS_ICON_TRASH = getCN(ICON, TRASH),
    CSS_ICON_WRENCH = getCN(ICON, WRENCH),
    CSS_WIDGET = getCN(WIDGET),

    TPL_ALERT_TIP = '<div class="' + [CSS_ALERT, CSS_ALERT_INFO].join(SPACE) + '"></div>',
    TPL_BOUNDING_BOX = '<div class="' + [CSS_WIDGET, CSS_COMPONENT, CSS_FB_FIELD].join(SPACE) + '"></div>',
    TPL_DROP_ZONE = '<div class="' + CSS_FB_DROP_ZONE + '"></div>',
    TPL_FLAG_REQUIRED = '<span class="' + [CSS_ICON, CSS_ICON_ASTERISK].join(SPACE) + '"></span>',
    TPL_FLAG_TIP = '<span class="' + [CSS_ICON, CSS_ICON_QUESTION_SIGN].join(SPACE) + '"></span>',
    TPL_LABEL = '<label for="{id}">{label}</label>';

/**
 * A base class for `A.FormBuilderFieldBase`.
 *
 * @class A.FormBuilderFieldBase
 * @uses A.FieldSupport
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderFieldBase = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: FORM_BUILDER_FIELD,

    /**
     * Static property used to define the augmented classes.
     *
     * @property AUGMENTS
     * @type Array
     * @static
     */
    AUGMENTS: [A.FieldSupport]
});

/**
 * A base class for `A.FormBuilderField`.
 *
 * @class A.FormBuilderField
 * @extends A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: FORM_BUILDER_FIELD,

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * If `true` children are accepted.
         *
         * @attribute acceptChildren
         * @default true
         * @type Boolean
         */
        acceptChildren: {
            value: true
        },

        /**
         * The `A.FormBuilder` instance.
         *
         * @attribute builder
         * @default null
         */
        builder: {
            value: null
        },

        /**
         * Collection of toolbar controls.
         *
         * @attribute controlsToolbar
         * @type Object
         */
        controlsToolbar: {
            validator: isObject,
            valueFn: function() {
                var instance = this;

                return {
                    children: instance._getToolbarItems(instance.get(REQUIRED), instance.get(UNIQUE)),
                    visible: false
                };
            }
        },

        /**
         * Indicates which is the type of data for the input field.
         *
         * @attribute dataType
         * @default 'string'
         * @type String
         */
        dataType: {
            value: STRING
        },

        /**
         * Checks if the input field is disabled or not.
         *
         * @attribute disabled
         * @default false
         * @type Boolean
         */
        disabled: {
            value: false
        },

        /**
         * Checks if the input field is selected or not.
         *
         * @attribute selected
         * @default false
         * @type Boolean
         */
        selected: {
            value: false
        },

        /**
         * List of hidden attributes.
         *
         * @attribute hiddenAttributes
         * @default []
         * @type Array
         */
        hiddenAttributes: {
            validator: isArray,
            value: []
        },

        /**
         * The id of the input field.
         *
         * @attribute id
         */
        id: {
            setter: '_setId'
        },

        /**
         * The label of the input field.
         *
         * @attribute label
         * @default ''
         * @type String
         */
        label: {
            value: EMPTY_STR
        },

        /**
         * Collection for content localization.
         *
         * @attribute localizationMap
         * @default {}
         * @type Object
         */
        localizationMap: {
            value: {}
        },

        /**
         * The name of the input field.
         *
         * @attribute name
         */
        name: {
            valueFn: function() {
                var instance = this,
                    type = instance.get(TYPE);

                return A.FormBuilderField.buildFieldName(type);
            }
        },

        /**
         * Container for the field parent.
         *
         * @attribute parent
         * @default null
         */
        parent: {
            value: null
        },

        /**
         * Specifies a predefined value for the input field.
         *
         * @attribute predefinedValue
         * @default ''
         * @type String
         */
        predefinedValue: {
            value: EMPTY_STR
        },

        /**
         * Checks if an input field is read-only.
         * In other words, it cannot be modified.
         *
         * @attribute readOnly
         * @default false
         * @type Boolean
         */
        readOnly: {
            setter: A.DataType.Boolean.parse,
            value: false
        },

        /**
         * List of read-only input fields.
         *
         * @attribute readOnlyAttributes
         * @default []
         * @type Array
         */
        readOnlyAttributes: {
            validator: isArray,
            value: []
        },

        /**
         * Checks if an input field is required.
         * In other words, it needs content to be valid.
         *
         * @attribute required
         * @default false
         * @type Boolean
         */
        required: {
            setter: A.DataType.Boolean.parse,
            value: false
        },

        /**
         * If `true` the label is showed.
         *
         * @attribute showLabel
         * @default true
         * @type Boolean
         */
        showLabel: {
            setter: A.DataType.Boolean.parse,
            value: true
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            value: {
                button: 'Button',
                buttonType: 'Button Type',
                deleteFieldsMessage: 'Are you sure you want to delete the selected field(s)?',
                duplicateMessage: 'Duplicate',
                editMessage: 'Edit',
                label: 'Label',
                large: 'Large',
                medium: 'Medium',
                multiple: 'Multiple',
                name: 'Name',
                no: 'No',
                options: 'Options',
                predefinedValue: 'Predefined Value',
                readOnly: 'Read Only',
                required: 'Required',
                reset: 'Reset',
                showLabel: 'Show Label',
                small: 'Small',
                submit: 'Submit',
                tip: 'Tip',
                type: 'Type',
                width: 'Width',
                yes: 'Yes'
            }
        },

        /**
         * Specify the tab order.
         *
         * @attribute tabIndex
         * @default 0
         * @type Number
         */
        tabIndex: {
            value: 0
        },

        /**
         * Reusable block of markup used to generate the field.
         *
         * @attribute template
         * @default ''
         * @type String
         */
        template: {
            value: EMPTY_STR
        },

        /**
         * Hint to help the user to fill the input field.
         *
         * @attribute tip
         * @default ''
         * @type String
         */
        tip: {
            value: EMPTY_STR
        },

        /**
         * Defines the type of field.
         *
         * @attribute type
         * @default ''
         * @type String
         */
        type: {
            value: EMPTY_STR
        },

        /**
         * Checks if the input field is unique or not.
         *
         * @attribute unique
         * @default false
         * @type Boolean
         */
        unique: {
            setter: A.DataType.Boolean.parse,
            value: false
        },

        /**
         * Stack order of the field.
         *
         * An element with greater stack order is always in front of an element
         * with a lower stack order.
         *
         * @attribute zIndex
         * @default 100
         * @type Number
         */
        zIndex: {
            value: 100
        },

        /**
         * Node used to generate the drop zone.
         *
         * @attribute dropZoneNode
         */
        dropZoneNode: {
            valueFn: function() {
                return A.Node.create(TPL_DROP_ZONE);
            }
        },

        /**
         * Node used to generate a label.
         *
         * @attribute labelNode
         */
        labelNode: {
            valueFn: function() {
                var instance = this;

                return A.Node.create(
                    L.sub(
                        TPL_LABEL, {
                            id: instance.get(ID),
                            label: instance.get(LABEL)
                        }
                    )
                );
            }
        },

        /**
         * Node used to generate the required flag.
         *
         * @attribute requiredFlagNode
         */
        requiredFlagNode: {
            valueFn: function() {
                return A.Node.create(TPL_FLAG_REQUIRED);
            }
        },

        /**
         * Node used to generate a template.
         *
         * @attribute templateNode
         */
        templateNode: {
            valueFn: 'getNode'
        },

        /**
         * Node used to generate a tip.
         *
         * @attribute tipFlagNode
         */
        tipFlagNode: {
            valueFn: function() {
                return A.Node.create(TPL_FLAG_TIP);
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
    UI_ATTRS: [ACCEPT_CHILDREN, DISABLED, FIELDS, LABEL, NAME, PREDEFINED_VALUE, REQUIRED, SELECTED, SHOW_LABEL,
        TIP, UNIQUE],

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: FormBuilderFieldBase,

    /**
     * Creates the field id.
     *
     * @method buildFieldId
     * @param id
     * @private
     * @return {String}
     */
    buildFieldId: function(id) {
        return FIELDS + _UNDERLINE + FIELD + _UNDERLINE + id;
    },

    /**
     * Creates the field name.
     *
     * @method buildFieldName
     * @param type
     * @private
     * @return {String}
     */
    buildFieldName: function(type) {
        return type + (++A.Env._uidx);
    },

    /**
     * Object hash, defining how attribute values have to be parsed from markup.
     *
     * @property HTML_PARSER
     * @type Object
     * @static
     */
    HTML_PARSER: {
        dropZoneNode: DOT + CSS_FB_DROP_ZONE,
        labelNode: LABEL,
        requiredFlagNode: DOT + CSS_ICON_ASTERISK,
        tipFlagNode: DOT + CSS_ICON_QUESTION_SIGN
    },

    prototype: {
        BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,

        /**
         * Construction logic executed during `A.FormBuilderField` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.controlsToolbar = new A.Toolbar(
                instance.get(CONTROLS_TOOLBAR)
            );

            instance.toolTip = new A.Overlay({
                align: {
                    node: instance.get(TIP_FLAG_NODE),
                    points: [A.WidgetPositionAlign.LC, A.WidgetPositionAlign.RC]
                },
                boundingBox: A.Node.create(TPL_ALERT_TIP),
                zIndex: 500,
                visible: false
            });
        },

        /**
         * Bind the events on the `A.FormBuilderField` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this,
                tipFlagNode = instance.get(TIP_FLAG_NODE);

            tipFlagNode.on('mouseover', A.bind(instance._onMouseOverTipFlagNode, instance));
            tipFlagNode.on('mouseout', A.bind(instance._onMouseOutTipFlagNode, instance));
        },

        /**
         * Render the `A.FormBuilderField` component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX),
                contentBox = instance.get(CONTENT_BOX),
                labelNode = instance.get(LABEL_NODE),
                requiredFlagNode = instance.get(REQUIRED_FLAG_NODE),
                templateNode = instance.get(TEMPLATE_NODE),
                tipFlagNode = instance.get(TIP_FLAG_NODE);

            contentBox.addClass(CSS_CLEARFIX);

            contentBox.append(labelNode);
            contentBox.append(requiredFlagNode);
            contentBox.append(tipFlagNode);
            contentBox.append(templateNode);

            instance.controlsToolbar.render(boundingBox);
            instance.toolTip.render(contentBox);
        },

        /**
         * Destructor lifecycle implementation for the `A.FormBuilderField`
         * class.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var instance = this,
                builder = instance.get(BUILDER),
                fieldId = builder._getFieldId(instance);

            instance.get(FIELDS).each(function(field) {
                field.destroy();
            });

            if (builder.editingField === instance) {
                delete builder.editingField;

                builder.closeEditProperties();
            }

            if (instance.controlsToolbar) {
                instance.controlsToolbar.destroy();
            }

            // destroy manually because NestedList doesn`t
            // use delegate
            instance.get(BOUNDING_BOX).dd.destroy();

            instance.toolTip.destroy();

            instance.get(PARENT).removeField(instance);

            builder.uniqueFieldsMap.remove(fieldId);
        },

        /**
         * Creates the field using the `createField` method from
         * `A.FormBuilder`.
         *
         * @method createField
         * @param val
         * @return {Object}
         */
        createField: function(val) {
            var instance = this,
                builder = instance.get(BUILDER);

            val = builder.createField(val);

            val.set(PARENT, instance);

            return val;
        },

        /**
         * Gets the field markup.
         *
         * To developer: Implement this
         *
         * @method getHTML
         * @return {String}
         */
        getHTML: function() {
            return EMPTY_STR;
        },

        /**
         * Creates a `Node` from the HTML string.
         *
         * @method getNode
         * @return {Node}
         */
        getNode: function() {
            var instance = this;

            return A.Node.create(instance.getHTML());
        },

        /**
         * Gets properties from the property model.
         *
         * @method getProperties
         * @return {Array}
         */
        getProperties: function() {
            var instance = this,
                propertyModel = instance.getPropertyModel(),
                hiddenAttributes = instance.get(HIDDEN_ATTRIBUTES),
                readOnlyAttributes = instance.get(READ_ONLY_ATTRIBUTES),
                properties = [];

            AArray.each(propertyModel, function(property) {
                var attribute = property.attributeName;

                // TODO - Change checking to use hashes O(1) instead of indexOf
                // arrays O(N)
                if (AArray.indexOf(hiddenAttributes, attribute) > -1) {
                    return;
                }

                var value = instance.get(attribute),
                    type = L.type(value);

                if (type === BOOLEAN) {
                    value = String(value);
                }

                property.value = value;

                // TODO - Change checking to use hashes O(1) instead of indexOf
                // arrays O(N)
                if (AArray.indexOf(readOnlyAttributes, attribute) > -1) {
                    property.readOnly = true;
                }

                properties.push(property);
            });

            return properties;
        },

        /**
         * Returns a list of property models. Each property model is made of a
         * name, attribute, editor, and formatter.
         *
         * @method getPropertyModel
         * @return {Array}
         */
        getPropertyModel: function() {
            var instance = this,
                strings = instance.getStrings();

            return [{
                attributeName: TYPE,
                editor: false,
                name: strings[TYPE]
            }, {
                attributeName: LABEL,
                editor: new A.TextCellEditor(),
                name: strings[LABEL]
            }, {
                attributeName: SHOW_LABEL,
                editor: new A.RadioCellEditor({
                    options: {
                        'true': strings[YES],
                        'false': strings[NO]
                    }
                }),
                formatter: A.bind(instance._booleanFormatter, instance),
                name: strings[SHOW_LABEL]
            }, {
                attributeName: READ_ONLY,
                editor: new A.RadioCellEditor({
                    options: {
                        'true': strings[YES],
                        'false': strings[NO]
                    }
                }),
                formatter: A.bind(instance._booleanFormatter, instance),
                name: strings[READ_ONLY]
            }, {
                attributeName: REQUIRED,
                editor: new A.RadioCellEditor({
                    options: {
                        'true': strings[YES],
                        'false': strings[NO]
                    }
                }),
                formatter: A.bind(instance._booleanFormatter, instance),
                name: strings[REQUIRED]
            }, {
                attributeName: NAME,
                editor: new A.TextCellEditor({
                    validator: {
                        rules: {
                            value: {
                                required: true
                            }
                        }
                    }
                }),
                name: strings[NAME]
            }, {
                attributeName: PREDEFINED_VALUE,
                editor: new A.TextCellEditor(),
                name: strings[PREDEFINED_VALUE]
            }, {
                attributeName: TIP,
                editor: new A.TextAreaCellEditor(),
                name: strings[TIP]
            }];
        },

        /**
         * Transforms a `Boolean` value into "yes" or "no" string.
         *
         * @method _booleanFormatter
         * @param o
         * @protected
         */
        _booleanFormatter: function(o) {
            var instance = this,
                strings = instance.getStrings();

            return A.DataType.Boolean.parse(o.data.value) ? strings[YES] : strings[NO];
        },

        /**
         * Gets a list of toolbar items.
         *
         * @method _getToolbarItems
         * @return {Array}
         */
        _getToolbarItems: function() {
            var instance = this,
                builder = instance.get(BUILDER),
                items = [
                    {
                        icon: CSS_ICON_WRENCH,
                        on: {
                            click: A.bind(instance._handleEditEvent, instance)
                        }
                    }
                ];

            if (!instance.get(UNIQUE)) {
                items.push({
                    icon: CSS_ICON_PLUS,
                    on: {
                        click: A.bind(instance._handleDuplicateEvent, instance)
                    }
                });
            }

            if ((builder && builder.get(ALLOW_REMOVE_REQUIRED_FIELDS)) || !instance.get(REQUIRED)) {
                items.push({
                    icon: CSS_ICON_TRASH,
                    on: {
                        click: A.bind(instance._handleDeleteEvent, instance)
                    }
                });
            }

            return [items];
        },

        /**
         * Checks if the field isn't unique. If not, duplicates the instance.
         *
         * @method _handleDuplicateEvent
         * @param event
         * @protected
         */
        _handleDuplicateEvent: function(event) {
            var instance = this;

            if (!instance.get(UNIQUE)) {
                instance.get(BUILDER).duplicateField(instance);
            }

            event.stopPropagation();
        },

        /**
         * Handles the edit event.
         *
         * @method _handleEditEvent
         * @param event
         * @protected
         */
        _handleEditEvent: function(event) {
            var instance = this;

            instance.get(BUILDER).editField(instance);

            event.stopPropagation();
        },

        /**
         * Popups a dialog to confirm deletion. If "yes", destroys the instance.
         *
         * @method _handleDeleteEvent
         * @param event
         * @protected
         */
        _handleDeleteEvent: function(event) {
            var instance = this,
                strings = instance.getStrings();

            if (confirm(strings[DELETE_FIELDS_MESSAGE])) {
                instance.destroy();
            }

            event.stopPropagation();
        },

        /**
         * Triggers when the mouse is out a tip flag node. Hides the tooltip.
         *
         * @method _onMouseOutTipFlagNode
         * @protected
         */
        _onMouseOutTipFlagNode: function() {
            var instance = this;

            instance.toolTipTime = setTimeout(function() {
                instance.toolTip.hide();
            }, 300);
        },

        /**
         * Triggers when the mouse is over a tip flag node. Shows the tooltip.
         *
         * @method _onMouseOverTipFlagNode
         * @protected
         */
        _onMouseOverTipFlagNode: function() {
            var instance = this;

            clearInterval(instance.toolTipTime);

            instance.toolTip.show();
        },

        /**
         * Set the `id` attribute on the UI.
         *
         * @method _setId
         * @param val
         * @protected
         */
        _setId: function(val) {
            return A.FormBuilderField.buildFieldId(val);
        },

        /**
         * Set the `acceptChildren` attribute on the UI.
         *
         * @method _uiSetAcceptChildren
         * @param val
         * @protected
         */
        _uiSetAcceptChildren: function(val) {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX),
                dropZone = instance.get(DROP_ZONE_NODE),
                markupDropZone = boundingBox.one(DOT + CSS_FB_DROP_ZONE);

            if (val && !markupDropZone) {
                boundingBox.append(dropZone);
            }
            else if (!val && markupDropZone) {
                markupDropZone.remove();
            }
            else if (val && markupDropZone) {
                instance.set(DROP_ZONE_NODE, markupDropZone);
            }
        },

        /**
         * Set the `selected` attribute on the UI.
         *
         * @method _uiSetSelected
         * @param val
         * @protected
         */
        _uiSetSelected: function(val) {
            var instance = this;

            instance.get(BOUNDING_BOX).toggleClass(CSS_FB_FIELD_SELECTED, val);
        },

        /**
         * Set the `disabled` attribute on the UI.
         *
         * @method _uiSetSelected
         * @param val
         * @protected
         */
        _uiSetDisabled: function(val) {
            var instance = this,
                templateNode = instance.get(TEMPLATE_NODE);

            if (val) {
                templateNode.setAttribute(DISABLED, val);
            }
            else {
                templateNode.removeAttribute(DISABLED);
            }
        },

        /**
         * Set the fields on the UI using the `plotFields` method from
         * `A.FormBuilder`.
         *
         * @method _uiSetFields
         * @param val
         * @protected
         */
        _uiSetFields: function(val) {
            var instance = this,
                builder = instance.get(BUILDER);

            builder.plotFields(val, instance.get(DROP_ZONE_NODE));
        },

        /**
         * Set the label content on the UI.
         *
         * @method _uiSetLabel
         * @param val
         * @protected
         */
        _uiSetLabel: function(val) {
            var instance = this,
                labelNode = instance.get(LABEL_NODE);

            labelNode.setContent(val);
        },

        /**
         * Set the `name` attribute on the UI.
         *
         * @method _uiSetName
         * @param val
         * @protected
         */
        _uiSetName: function(val) {
            var instance = this,
                templateNode = instance.get(TEMPLATE_NODE);

            templateNode.set(NAME, val);
        },

        /**
         * Set the `predefinedValue` attribute on the UI.
         *
         * @method _uiSetPredefinedValue
         * @param val
         * @protected
         */
        _uiSetPredefinedValue: function(val) {
            var instance = this,
                templateNode = instance.get(TEMPLATE_NODE);

            templateNode.val(val);
        },

        /**
         * Set the `required` attribute on the UI.
         *
         * @method _uiSetRequired
         * @param val
         * @protected
         */
        _uiSetRequired: function(val) {
            var instance = this,
                controlsToolbar = instance.controlsToolbar,
                requiredNode = instance.get(REQUIRED_FLAG_NODE);

            if (val) {
                requiredNode.show();
            }
            else {
                requiredNode.hide();
            }

            controlsToolbar.set(CHILDREN, instance._getToolbarItems());
        },

        /**
         * Set the `showLabel` attribute on the UI.
         *
         * @method _uiSetShowLabel
         * @param val
         * @protected
         */
        _uiSetShowLabel: function(val) {
            var instance = this,
                labelNode = instance.get(LABEL_NODE);

            if (val) {
                labelNode.show();
            }
            else {
                labelNode.hide();
            }
        },

        /**
         * Set the `tip` attribute on the UI.
         *
         * @method _uiSetTip
         * @param val
         * @protected
         */
        _uiSetTip: function(val) {
            var instance = this,
                tipFlagNode = instance.get(TIP_FLAG_NODE);

            if (val) {
                tipFlagNode.show();
            }
            else {
                tipFlagNode.hide();
            }

            instance.toolTip.set(BODY_CONTENT, val);
        },

        /**
         * Set the `unique` attribute on the UI.
         *
         * @method _uiSetUnique
         * @param val
         * @protected
         */
        _uiSetUnique: function(val) {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX),
                controlsToolbar = instance.controlsToolbar;

            boundingBox.toggleClass(CSS_FB_UNIQUE, val);

            controlsToolbar.set(CHILDREN, instance._getToolbarItems());
        }

    }

});

A.FormBuilderField = FormBuilderField;

A.FormBuilder.types.field = A.FormBuilderField;
