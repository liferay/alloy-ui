YUI.add('aui-property-builder-available-field', function (A, NAME) {

var PropertyBuilderAvailableField,

    CSS_PROPERTY_BUILDER_FIELD = A.getClassName('property', 'builder', 'field'),
    CSS_PROPERTY_BUILDER_FIELD_DRAGGABLE = A.getClassName('property', 'builder', 'field', 'draggable'),
    CSS_PROPERTY_BUILDER_FIELD_ICON = A.getClassName('property', 'builder', 'field', 'icon'),
    CSS_PROPERTY_BUILDER_FIELD_LABEL = A.getClassName('property', 'builder', 'field', 'label'),
    CSS_ICON = A.getClassName('icon');

/**
 * A base class for PropertyBuilderAvailableField.
 *
 * @class A.PropertyBuilderAvailableField
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
PropertyBuilderAvailableField = A.Component.create({

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
     * configuration for the `A.PropertyBuilderAvailableField`.
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
            validator: A.Lang.isBoolean
        },

        /**
         * The descriptor of a field.
         *
         * @attribute label
         * @type String
         */
        label: {
            validator: A.Lang.isString
        },

        /**
         * The CSS class name used in the icon.
         *
         * @attribute iconClass
         * @type String
         */
        iconClass: {
            validator: A.Lang.isString
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
            validator: A.Lang.isString
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

                if (!A.Lang.isNode(val)) {
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
            validator: A.Lang.isNode,
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
            validator: A.Lang.isString
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
        return A.PropertyBuilderAvailableField.getAvailableFieldByNode('#' + A.PropertyBuilderAvailableField.buildNodeId(id));
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

        if (A.Lang.isNode(node)) {
            return node.getData('availableField');
        }

        return null;
    },

    prototype: {
        FIELD_ITEM_TEMPLATE: '<li class="' + CSS_PROPERTY_BUILDER_FIELD + '">' + '<span class="' + [CSS_ICON,
            CSS_PROPERTY_BUILDER_FIELD_ICON].join(' ') +
            ' {iconClass}"></span>' + '<div class="' + CSS_PROPERTY_BUILDER_FIELD_LABEL + '"></div>' + '</li>',

        /**
         * Construction logic executed during `A.PropertyBuilderAvailableField` instantiation.
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

            instance.labelNode = node.one('.' + CSS_PROPERTY_BUILDER_FIELD_LABEL);

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
            return A.PropertyBuilderAvailableField.buildNodeId(val);
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

            instance.get('node').toggleClass(CSS_PROPERTY_BUILDER_FIELD_DRAGGABLE, val);
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
            instance.labelNode.setContent(A.Escape.html(val));
        }
    }
});

A.PropertyBuilderAvailableField = PropertyBuilderAvailableField;


}, '3.0.1', {"requires": ["base", "aui-component", "aui-node"]});
