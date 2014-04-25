/**
 * The Diagram Builder Base
 *
 * @module aui-diagram-builder
 * @submodule aui-diagram-builder-base
 */

var Lang = A.Lang,
    isArray = Lang.isArray,
    isBoolean = Lang.isBoolean,
    isNumber = Lang.isNumber,
    isObject = Lang.isObject,
    isString = Lang.isString,

    isArrayList = function(val) {
        return A.instanceOf(val, A.ArrayList);
    },

    isNode = function(val) {
        return A.instanceOf(val, A.Node);
    },

    isAvailableField = function(val) {
        return A.instanceOf(val, A.AvailableField);
    },

    AArray = A.Array,

    aGetClassName = A.getClassName,

    CSS_CLEARFIX = aGetClassName('clearfix'),
    CSS_DIAGRAM_BUILDER_CANVAS = aGetClassName('diagram', 'builder', 'canvas'),
    CSS_DIAGRAM_BUILDER_CONTENT_CONTAINER = aGetClassName('diagram', 'builder', 'content', 'container'),
    CSS_DIAGRAM_BUILDER_DROP_CONTAINER = aGetClassName('diagram', 'builder', 'drop', 'container'),
    CSS_DIAGRAM_BUILDER_FIELD = aGetClassName('diagram', 'builder', 'field'),
    CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE = aGetClassName('diagram', 'builder', 'field', 'draggable'),
    CSS_DIAGRAM_BUILDER_FIELD_ICON = aGetClassName('diagram', 'builder', 'field', 'icon'),
    CSS_DIAGRAM_BUILDER_FIELD_LABEL = aGetClassName('diagram', 'builder', 'field', 'label'),
    CSS_DIAGRAM_BUILDER_FIELDS_CONTAINER = aGetClassName('diagram', 'builder', 'fields', 'container'),
    CSS_DIAGRAM_BUILDER_TABS = aGetClassName('diagram', 'builder', 'tabs'),
    CSS_DIAGRAM_BUILDER_TOOLBAR_CONTAINER = aGetClassName('diagram', 'builder', 'toolbar', 'container'),
    CSS_ICON = aGetClassName('icon'),
    CSS_LAYOUT = aGetClassName('layout'),
    CSS_TABBABLE = aGetClassName('tabbable'),
    CSS_TABBABLE_CONTENT = aGetClassName('tabbable', 'content'),
    CSS_TABLE_STRIPED = aGetClassName('table', 'striped');

/**
 * A base class for AvailableField.
 *
 * @class A.AvailableField
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var AvailableField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'availableField',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.AvailableField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Defines if the field is draggable or not.
         *
         * @attribute draggable
         * @default true
         * @type Boolean
         */
        draggable: {
            value: true,
            validator: isBoolean
        },

        /**
         * The descriptor of a field.
         *
         * @attribute label
         * @type String
         */
        label: {
            validator: isString
        },

        /**
         * The CSS class name used in the icon.
         *
         * @attribute iconClass
         * @type String
         */
        iconClass: {
            validator: isString
        },

        /**
         * The identifier of a field.
         *
         * @attribute id
         * @type String
         */
        id: {
            value: A.guid(),
            setter: '_setId',
            validator: isString
        },

        /**
         * The node used in a field.
         *
         * @attribute node
         * @type Node
         * @writeOnce
         */
        node: {
            valueFn: function(val) {
                var instance = this;

                if (!isNode(val)) {
                    val = A.Node.create(
                        A.Lang.sub(
                            instance.FIELD_ITEM_TEMPLATE, {
                                iconClass: instance.get('iconClass')
                            }
                        )
                    );

                    val.setData('availableField', instance);
                }

                return val;
            },
            validator: isNode,
            writeOnce: true
        },

        /**
         * The type of a field.
         *
         * @attribute type
         * @default 'node'
         * @type String
         */
        type: {
            value: 'node',
            validator: isString
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.Base,

    /**
     * Constructs the node id string.
     *
     * @method buildNodeId
     * @param id
     * @private
     * @return {String}
     */
    buildNodeId: function(id) {
        return 'availableFields' + '_' + 'field' + '_' + id;
    },

    /**
     * Gets the `availableField` instance by its id.
     *
     * @method getAvailableFieldById
     * @param id
     * @private
     */
    getAvailableFieldById: function(id) {
        return A.AvailableField.getAvailableFieldByNode('#' + A.AvailableField.buildNodeId(id));
    },

    /**
     * Gets the `availableField` instance by its node.
     *
     * @method getAvailableFieldById
     * @param node
     * @private
     */
    getAvailableFieldByNode: function(node) {
        node = A.one(node);

        if (isNode(node)) {
            return node.getData('availableField');
        }

        return null;
    },

    prototype: {
        FIELD_ITEM_TEMPLATE: '<li class="' + CSS_DIAGRAM_BUILDER_FIELD + '">' + '<span class="' + [CSS_ICON,
            CSS_DIAGRAM_BUILDER_FIELD_ICON].join(' ') +
            ' {iconClass}"></span>' + '<div class="' + CSS_DIAGRAM_BUILDER_FIELD_LABEL + '"></div>' + '</li>',

        /**
         * Construction logic executed during `A.AvailableField` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;
            var node = instance.get('node');

            instance.after({
                draggableChange: instance._afterDraggableChange,
                idChange: instance._afterIdChange,
                labelChange: instance._afterLabelChange
            });

            instance.labelNode = node.one('.' + CSS_DIAGRAM_BUILDER_FIELD_LABEL);

            instance._uiSetDraggable(
                instance.get('draggable')
            );

            instance._uiSetId(
                instance.get('id')
            );

            instance._uiSetLabel(
                instance.get('label')
            );
        },

        /**
         * Fires after `draggable` attribute value change.
         *
         * @method _afterDraggableChange
         * @param event
         * @protected
         */
        _afterDraggableChange: function(event) {
            var instance = this;

            instance._uiSetDraggable(
                event.newVal
            );
        },

        /**
         * Fires after `id` attribute value change.
         *
         * @method _afterIdChange
         * @param event
         * @protected
         */
        _afterIdChange: function(event) {
            var instance = this;

            instance._uiSetId(
                event.newVal
            );
        },

        /**
         * Fires after `label` attribute value change.
         *
         * @method _afterLabelChange
         * @param event
         * @protected
         */
        _afterLabelChange: function(event) {
            var instance = this;

            instance._uiSetLabel(
                event.newVal
            );
        },

        /**
         * Sets the `id` attribute.
         *
         * @method _setId
         * @param val
         * @protected
         */
        _setId: function(val) {
            return A.AvailableField.buildNodeId(val);
        },

        /**
         * Sets the `draggable` attribute in the UI.
         *
         * @method _uiSetDraggable
         * @param val
         * @protected
         */
        _uiSetDraggable: function(val) {
            var instance = this;

            instance.get('node').toggleClass(CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE, val);
        },

        /**
         * Sets the `id` attribute in the UI.
         *
         * @method _uiSetId
         * @param val
         * @protected
         */
        _uiSetId: function(val) {
            var instance = this;

            instance.get('node').set('id', val);
        },

        /**
         * Sets the `label` attribute in the UI.
         *
         * @method _uiSetLabel
         * @param val
         * @protected
         */
        _uiSetLabel: function(val) {
            var instance = this;

            instance.get('node').attr('title', val);
            instance.labelNode.setContent(val);
        }
    }
});

A.AvailableField = AvailableField;

/**
 * A base class for `A.FieldSupport`.
 *
 * @class A.FieldSupport
 * @constructor
 */
var FieldSupport = function() {};

/**
 * Static property used to define the default attribute
 * configuration for the `A.FieldSupport`.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
FieldSupport.ATTRS = {

    /**
     * The collection of fields.
     *
     * @attribute fields
     * @default []
     * @type Array
     */
    fields: {
        value: [],
        setter: '_setFields',
        validator: function(val) {
            return isArray(val) || isArrayList(val);
        }
    },

    /**
     * Defines the maximum number of fields.
     *
     * @attribute maxFields
     * @default Infinity
     * @type Number
     */
    maxFields: {
        value: Infinity,
        validator: isNumber
    }
};

A.mix(FieldSupport.prototype, {

    /**
     * Sets the `fields` attribute.
     *
     * @method _setFields
     * @param val
     * @protected
     */
    _setFields: function(val) {
        var instance = this;

        if (isArrayList(val)) {
            return val;
        }
        else {
            return instance.createFields(val);
        }
    },

    /**
     * Updates the collection of fields.
     *
     * @method _updateFields
     * @param fields
     * @protected
     */
    _updateFields: function(fields) {
        var instance = this;

        instance.set('fields', fields);
    },

    /**
     * Adds a single field in the field list.
     *
     * @method addField
     * @param field
     * @param index
     */
    addField: function(field, index) {
        var instance = this;

        if (instance.get('fields').size() < instance.get('maxFields')) {
            var newField = instance.createField(field);

            if (newField) {
                instance._updateFields(
                    instance.get('fields').add(newField, index)
                );
            }

            return newField;
        }

        return null;
    },

    /**
     * Creates a collection of fields.
     *
     * @method createFields
     * @param val
     * @return {A.ArrayList}
     */
    createFields: function(val) {
        var instance = this;
        var fields = [];

        AArray.each(val, function(field, index) {
            if (index < instance.get('maxFields')) {
                fields.push(instance.createField(field));
            }
        });

        return new A.ArrayList(fields);
    },

    /**
     * Removes a single field from the field list.
     *
     * @method removeField
     * @param field
     */
    removeField: function(field) {
        var instance = this;

        instance._updateFields(
            instance.get('fields').remove(field)
        );
    },

    /**
     * Creates a single field.
     *
     * NOTE FOR DEVELOPERS: Yoy *may* want to replace the
     * methods from this section on your implementation.
     *
     * @method createField
     * @param val
     */
    createField: function(val) {
        return val;
    }
});

A.FieldSupport = FieldSupport;
// A.FieldSupport = A.Base.create('field-support', A.Base, [FieldSupport]);

/**
 * A base class for DiagramBuilderBase.
 *
 * @class A.DiagramBuilderBase
 * @extends A.Component
 * @uses A.FieldSupport
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramBuilderBase = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-builder',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramBuilderBase`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * List of available fields.
         *
         * @attribute availableFields
         * @type Array
         */
        availableFields: {
            setter: '_setAvailableFields',
            validator: isArray
        },

        /**
         * The configuration object for draggable available fields.
         *
         * @attribute availableFieldsDragConfig
         * @default null
         * @type Object
         */
        availableFieldsDragConfig: {
            value: null,
            setter: '_setAvailableFieldsDragConfig',
            validator: isObject
        },

        /**
         * A node created using the `CANVAS_TEMPLATE` template.
         *
         * @attribute canvas
         */
        canvas: {
            valueFn: function() {
                return A.Node.create(this.CANVAS_TEMPLATE);
            }
        },

        /**
         * The configuration object for drop container node.
         *
         * @attribute dropConfig
         * @default null
         * @type Object
         */
        dropConfig: {
            value: null,
            setter: '_setDropConfig',
            validator: isObject
        },

        /**
         * Host node for content created using the `CONTENT_CONTAINER_TEMPLATE`
         * template.
         *
         * @attribute contentContainer
         */
        contentContainer: {
            valueFn: function() {
                return A.Node.create(this.CONTENT_CONTAINER_TEMPLATE);
            }
        },

        /**
         * Host node for drop created using the `DROP_CONTAINER_TEMPLATE`
         * template.
         *
         * @attribute dropContainer
         */
        dropContainer: {
            valueFn: function() {
                return A.Node.create(this.DROP_CONTAINER_TEMPLATE);
            }
        },

        /**
         * Host node for fields created using the `FIELDS_CONTAINER_TEMPLATE`
         * template.
         *
         * @attribute fieldsContainer
         */
        fieldsContainer: {
            valueFn: function() {
                return A.Node.create(this.FIELDS_CONTAINER_TEMPLATE);
            }
        },

        /**
         * Stores an instance of `A.PropertyList`.
         *
         * @attribute propertyList
         * @default null
         * @type Object
         */
        propertyList: {
            setter: '_setPropertyList',
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
                addNode: 'Add node',
                cancel: 'Cancel',
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
            setter: '_setTabView',
            validator: isObject,
            value: null,
            writeOnce: true
        },

        /**
         * Stores an instance of `A.Toolbar`.
         *
         * @attribute toolbar
         * @default null
         * @type Object
         */
        toolbar: {
            setter: '_setToolbar',
            validator: isObject,
            value: null
        },

        /**
         * Host node for toolbar created using the `TOOLBAR_CONTAINER_TEMPLATE`
         * template.
         *
         * @attribute toolbarContainer
         */
        toolbarContainer: {
            valueFn: function() {
                return A.Node.create(this.TOOLBAR_CONTAINER_TEMPLATE);
            }
        }
    },

    /**
     * Object hash, defining how attribute values have to be parsed from markup.
     *
     * @property HTML_PARSER
     * @type Object
     * @static
     */
    HTML_PARSER: {
        contentContainer: '.' + CSS_DIAGRAM_BUILDER_CONTENT_CONTAINER,
        dropContainer: '.' + CSS_DIAGRAM_BUILDER_DROP_CONTAINER,
        fieldsContainer: '.' + CSS_DIAGRAM_BUILDER_FIELDS_CONTAINER,
        toolbarContainer: '.' + CSS_DIAGRAM_BUILDER_TOOLBAR_CONTAINER,
        canvas: '.' + CSS_DIAGRAM_BUILDER_CANVAS
    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['availableFields', 'fields'],

    /**
     * Static property used to define the augmented classes.
     *
     * @property AUGMENTS
     * @type Array
     * @static
     */
    AUGMENTS: [A.FieldSupport],

    prototype: {
        CANVAS_TEMPLATE: '<div tabindex="1" class="' + CSS_DIAGRAM_BUILDER_CANVAS + '"></div>',
        CONTENT_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_CONTENT_CONTAINER + '"></div>',
        DROP_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_DROP_CONTAINER + '"></div>',
        FIELDS_CONTAINER_TEMPLATE: '<ul class="' + [CSS_DIAGRAM_BUILDER_FIELDS_CONTAINER, CSS_CLEARFIX].join(' ') + '"></ul>',
        TOOLBAR_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_TOOLBAR_CONTAINER + '"></div>',

        fieldsNode: null,
        propertyList: null,
        settingsNode: null,
        tabView: null,
        toolbar: null,

        /**
         * Construction logic executed during `A.DiagramBuilderBase`
         * instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.publish({
                cancel: {
                    defaultFn: instance._defCancelFn
                }
            });

            instance.after({
                render: instance._afterRender,
                'model:change': instance._afterModelChange
            });

            instance.after(instance._afterUiSetHeight, instance, '_uiSetHeight');

            instance.canvas = instance.get('canvas');
            instance.contentContainer = instance.get('contentContainer');
            instance.dropContainer = instance.get('dropContainer');
            instance.fieldsContainer = instance.get('fieldsContainer');
            instance.toolbarContainer = instance.get('toolbarContainer');
        },

        /**
         * Checks if the `availableFields` are draggable.
         *
         * @method isAvailableFieldsDrag
         * @param drag
         * @return {Boolean}
         */
        isAvailableFieldsDrag: function(drag) {
            var instance = this;
            var availableFieldsDrag = instance.availableFieldsDrag;

            return (drag === availableFieldsDrag.dd);
        },

        /**
         * Plots a collection of fields.
         *
         * @method plotFields
         */
        plotFields: function() {
            var instance = this;
            var fields = instance.get('fields');

            fields.each(function(field) {
                instance.plotField(field);
            });
        },

        /**
         * Render the `A.DiagramBuilderBase` component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance._renderTabs();
            instance._renderCanvas();

            instance._uiSetAvailableFields(
                instance.get('availableFields')
            );
        },

        /**
         * Sync the `A.DiagramBuilderBase` UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;
            var contentBox = instance.get('contentBox');

            instance._setupDrop();
            instance._setupAvailableFieldsDrag();

            contentBox.addClass(CSS_LAYOUT);
        },

        /**
         * Fires after one or more attributes on the model are changed.
         *
         * @method _afterModelChange
         * @param event
         * @protected
         */
        _afterModelChange: function() {
            var instance = this;

            instance._handleSaveEvent();
        },

        /**
         * Fires after `A.DiagramBuilderBase` instance is rendered.
         *
         * @method _afterRender
         * @param event
         * @protected
         */
        _afterRender: function() {
            var instance = this;

            instance.plotFields();
        },

        /**
         * Fires after `tabView` selection change.
         *
         * @method _afterSelectionChange
         * @param event
         * @protected
         */
        _afterSelectionChange: function(event) {
            var instance = this,
                tabview = event.newVal,
                tabNode;

            if (tabview) {
                tabNode = tabview.get('panelNode');

                if (instance.get('rendered') && (tabNode === instance.settingsNode)) {
                    instance._renderSettings();
                }
            }
        },

        /**
         * Fires after setting height in the UI.
         *
         * @method _afterUiSetHeight
         * @param val
         * @protected
         */
        _afterUiSetHeight: function(val) {
            var instance = this;

            instance.contentContainer.setStyle('height', isNumber(val) ? val + instance.DEF_UNIT : val);
            instance.dropContainer.setStyle('height', isNumber(val) ? val + instance.DEF_UNIT : val);
        },

        /**
         * Selects the `tabView` child at index zero.
         *
         * @method _defCancelFn
         * @param event
         * @protected
         */
        _defCancelFn: function() {
            var instance = this;

            instance.tabView.selectChild(0);
        },

        /**
         * Fires a cancel event.
         *
         * @method _handleCancelEvent
         * @protected
         */
        _handleCancelEvent: function() {
            var instance = this;

            instance.fire('cancel');
        },

        /**
         * Fires a save event.
         *
         * @method _handleSaveEvent
         * @protected
         */
        _handleSaveEvent: function() {
            var instance = this;

            instance.fire('save');
        },

        /**
         * Renders the `canvas` attribute.
         *
         * @method _renderCanvas
         * @protected
         */
        _renderCanvas: function() {
            var instance = this;
            var contentBox = instance.get('contentBox');
            var canvas = instance.canvas;
            var contentContainer = instance.contentContainer;
            var dropContainer = instance.dropContainer;

            if (!canvas.inDoc()) {
                contentContainer.appendChild(canvas);
            }

            if (!dropContainer.inDoc()) {
                canvas.appendChild(dropContainer);
            }

            if (contentContainer.inDoc()) {
                contentContainer.get('parentNode').append(contentContainer);
            }
            else {
                contentBox.appendChild(contentContainer);
            }
        },

        /**
         * Creates an instance of `A.PropertyList` in `propertyList` attribute
         * and renders it.
         *
         * @method _renderPropertyList
         * @protected
         */
        _renderPropertyList: function() {
            var instance = this;

            if (!instance.propertyList) {
                var propertyList = instance.propertyList = new A.PropertyList(instance.get('propertyList'));

                propertyList.render(instance.settingsNode);

                propertyList.get('boundingBox').unselectable().addClass(CSS_TABLE_STRIPED);
            }
        },

        /**
         * Calls the `_renderPropertyList` and `_renderToolbar` functions.
         *
         * @method _renderSettings
         * @protected
         */
        _renderSettings: function() {
            var instance = this;

            instance._renderPropertyList();

            instance._renderToolbar();
        },

        /**
         * Creates an instance of `A.TabView` in `tabView` attribute.
         *
         * @method _renderTabs
         * @protected
         */
        _renderTabs: function() {
            var instance = this;

            if (!instance.tabView) {
                var tabView = new A.TabView(instance.get('tabView'));

                instance.tabView = tabView;
                instance.fieldsNode = tabView.item(0).get('panelNode');
                instance.settingsNode = tabView.item(1).get('panelNode');
            }
        },

        /**
         * Creates an instance of `A.Toolbar` in `toolbar` attribute and renders
         * it.
         *
         * @method _renderToolbar
         * @protected
         */
        _renderToolbar: function() {
            var instance = this;

            if (!instance.toolbar) {
                instance.toolbar = new A.Toolbar(
                    instance.get('toolbar')
                ).render(instance.settingsNode);
            }
        },

        /**
         * Creates a new instance of `A.DD.Drop` in `drop` attribute.
         *
         * @method _setupDrop
         * @protected
         */
        _setupDrop: function() {
            var instance = this;

            instance.drop = new A.DD.Drop(
                instance.get('dropConfig')
            );
        },

        /**
         * Creates a new instance of `A.DD.Delegate` in `availableFieldsDrag`
         * attribute.
         *
         * @method _setupAvailableFieldsDrag
         * @protected
         */
        _setupAvailableFieldsDrag: function() {
            var instance = this;

            instance.availableFieldsDrag = new A.DD.Delegate(
                instance.get('availableFieldsDragConfig')
            );
        },

        /**
         * Sets the `availableFields` attribute.
         *
         * @method _setAvailableFields
         * @param val
         * @protected
         */
        _setAvailableFields: function(val) {
            var fields = [];

            AArray.each(val, function(field) {
                fields.push(
                    isAvailableField(field) ? field : new A.AvailableField(field)
                );
            });

            return fields;
        },

        /**
         * Set the `dropConfig` attribute.
         *
         * @method _setDropConfig
         * @param val
         * @protected
         */
        _setDropConfig: function(val) {
            var instance = this;

            return A.merge({
                    bubbleTargets: instance,
                    groups: ['availableFields'],
                    node: instance.dropContainer
                },
                val || {}
            );
        },

        /**
         * Set the `availableFieldsDragConfig` attribute.
         *
         * @method _setAvailableFieldsDragConfig
         * @param val
         * @protected
         */
        _setAvailableFieldsDragConfig: function(val) {
            var instance = this;

            return A.merge({
                    bubbleTargets: instance,
                    container: instance.get('boundingBox'),
                    dragConfig: {
                        groups: ['availableFields'],
                        plugins: [
                            {
                                cfg: {
                                    moveOnEnd: false
                                },
                                fn: A.Plugin.DDProxy
                            }
                        ]
                    },
                    nodes: '.' + CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE
                },
                val || {}
            );
        },

        /**
         * Sets the `propertyList` attribute.
         *
         * @method _setPropertyList
         * @param val
         * @protected
         */
        _setPropertyList: function(val) {
            var instance = this;

            return A.merge({
                    bubbleTargets: instance,
                    scroll: {
                        height: 400,
                        width: 'auto'
                    },
                    width: '99%'
                },
                val
            );
        },

        /**
         * Sets the `tabView` attribute.
         *
         * @method _setTabView
         * @param val
         * @protected
         */
        _setTabView: function(val) {
            var instance = this,
                boundingBox = instance.get('boundingBox'),
                tabViewContentNode = boundingBox.one('.' + CSS_TABBABLE_CONTENT),
                defaultValue;

            defaultValue = {
                after: {
                    selectionChange: A.bind(instance._afterSelectionChange, instance)
                },
                boundingBox: boundingBox.one('.' + CSS_TABBABLE),
                bubbleTargets: instance,
                cssClass: CSS_DIAGRAM_BUILDER_TABS,
                render: instance.get('contentBox'),
                srcNode: tabViewContentNode
            };

            if (!tabViewContentNode) {
                var strings = instance.getStrings();

                defaultValue.children = [
                    {
                        label: strings.addNode
                    },
                    {
                        label: strings.settings,
                        disabled: true
                    }
                ];
            }

            return A.merge(defaultValue, val);
        },

        /**
         * Sets the `toolbar` attribute.
         *
         * @method _setToolbar
         * @param val
         * @protected
         */
        _setToolbar: function(val) {
            var instance = this;
            var strings = instance.getStrings();

            return A.merge({
                    bubbleTargets: instance,
                    children: [
                        {
                            on: {
                                click: A.bind(instance._handleCancelEvent, instance)
                            },
                            label: strings.close
                        }
                    ]
                },
                val
            );
        },

        /**
         * Sets the `availableFields` attribute in the UI.
         *
         * @method _uiSetAvailableFields
         * @param val
         * @protected
         */
        _uiSetAvailableFields: function(val) {
            var instance = this;
            var fieldsNode = instance.fieldsNode;

            if (fieldsNode) {
                var docFrag = A.getDoc().invoke('createDocumentFragment');

                AArray.each(val, function(field) {
                    docFrag.appendChild(field.get('node'));
                });

                fieldsNode.setContent(
                    instance.fieldsContainer.setContent(docFrag)
                );
            }
        },

        /**
         * Sets the `fields` attribute in the UI.
         *
         * @method _uiSetFields
         * @param event
         * @protected
         */
        _uiSetFields: function() {
            var instance = this;

            if (instance.get('rendered')) {
                instance.plotFields();
            }
        }
    }
});

A.DiagramBuilderBase = DiagramBuilderBase;
