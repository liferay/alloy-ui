YUI.add('aui-property-builder', function (A, NAME) {

/**
 * The Property Builder
 *
 * @module aui-property-builder
 */

var Lang = A.Lang,
    isArray = Lang.isArray,
    isNumber = Lang.isNumber,
    isObject = Lang.isObject,

    isAvailableField = function(val) {
        return A.instanceOf(val, A.PropertyBuilderAvailableField);
    },

    AArray = A.Array,

    aGetClassName = A.getClassName,

    CSS_CLEARFIX = aGetClassName('clearfix'),
    CSS_PROPERTY_BUILDER_CANVAS = aGetClassName('property', 'builder', 'canvas'),
    CSS_PROPERTY_BUILDER_CONTENT_CONTAINER = aGetClassName('property', 'builder', 'content', 'container'),
    CSS_PROPERTY_BUILDER_DROP_CONTAINER = aGetClassName('property', 'builder', 'drop', 'container'),
    CSS_PROPERTY_BUILDER_FIELD_DRAGGABLE = A.getClassName('property', 'builder', 'field', 'draggable'),
    CSS_PROPERTY_BUILDER_FIELDS_CONTAINER = aGetClassName('property', 'builder', 'fields', 'container'),
    CSS_LAYOUT = aGetClassName('layout');

/**
 * A base class for PropertyBuilder.
 *
 * @class A.PropertyBuilder
 * @extends A.Component
 * @uses A.PropertyBuilderFieldSupport
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var PropertyBuilder = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'property-builder',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.PropertyBuilder`.
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
        contentContainer: '.' + CSS_PROPERTY_BUILDER_CONTENT_CONTAINER,
        dropContainer: '.' + CSS_PROPERTY_BUILDER_DROP_CONTAINER,
        fieldsContainer: '.' + CSS_PROPERTY_BUILDER_FIELDS_CONTAINER,
        canvas: '.' + CSS_PROPERTY_BUILDER_CANVAS
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
    AUGMENTS: [A.PropertyBuilderFieldSupport, A.PropertyBuilderSettings],

    prototype: {
        CANVAS_TEMPLATE: '<div tabindex="1" class="' + CSS_PROPERTY_BUILDER_CANVAS + '"></div>',
        CONTENT_CONTAINER_TEMPLATE: '<div class="' + CSS_PROPERTY_BUILDER_CONTENT_CONTAINER + '"></div>',
        DROP_CONTAINER_TEMPLATE: '<div class="' + CSS_PROPERTY_BUILDER_DROP_CONTAINER + '"></div>',
        FIELDS_CONTAINER_TEMPLATE: '<ul class="' + [CSS_PROPERTY_BUILDER_FIELDS_CONTAINER, CSS_CLEARFIX].join(' ') +
            '"></ul>',

        fieldsNode: null,
        settingsNode: null,

        /**
         * Construction logic executed during `A.PropertyBuilder`
         * instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            this.publish('render');

            instance.after({
                render: instance._afterRender,
                'model:change': instance._afterModelChange
            });

            instance.after(instance._afterUiSetHeight, instance, '_uiSetHeight');

            instance.canvas = instance.get('canvas');
            instance.contentContainer = instance.get('contentContainer');
            instance.dropContainer = instance.get('dropContainer');
            instance.fieldsContainer = instance.get('fieldsContainer');
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
         * Render the `A.PropertyBuilder` component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance.fire('render');

            instance._renderCanvas();

            instance._uiSetAvailableFields(
                instance.get('availableFields')
            );
        },

        /**
         * Sync the `A.PropertyBuilder` UI. Lifecycle.
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
         * Fires after `A.PropertyBuilder` instance is rendered.
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
                    isAvailableField(field) ? field : new A.PropertyBuilderAvailableField(field)
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
                    nodes: '.' + CSS_PROPERTY_BUILDER_FIELD_DRAGGABLE
                },
                val || {}
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

A.PropertyBuilder = PropertyBuilder;


}, '3.0.1', {
    "requires": [
        "dd",
        "collection",
        "aui-property-builder-available-field",
        "aui-property-builder-field-support",
        "aui-property-builder-settings",
        "aui-tabview"
    ],
    "skinnable": true
});
