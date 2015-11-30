YUI.add('aui-diagram-node-condition', function (A, NAME) {

/**
 * A base class for DiagramNodeCondition.
 *
 * @class A.DiagramNodeCondition
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramNodeCondition = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramNodeCondition`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The height of the node.
         *
         * @attribute height
         * @default 60
         * @type Number
         */
        height: {
            value: 60
        },

        /**
         * The type of the node.
         *
         * @attribute type
         * @default 'condition'
         * @type String
         */
        type: {
            value: 'condition'
        },

        /**
         * The width of the node.
         *
         * @attribute width
         * @default 60
         * @type Number
         */
        width: {
            value: 60
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNodeState,

    prototype: {
        hotPoints: A.DiagramNode.DIAMOND_POINTS,

        /**
         * Renders the shape boundary.
         *
         * @method renderShapeBoundary
         */
        renderShapeBoundary: function() {
            var instance = this;

            var boundary = instance.boundary = instance.get('graphic').addShape(
                instance.get('shapeBoundary')
            );

            boundary.translate(10, 10);
            boundary.rotate(45);

            return boundary;
        },

        _valueShapeBoundary: A.DiagramNode.prototype._valueShapeBoundary
    }
});

A.DiagramNodeCondition = DiagramNodeCondition;


}, '3.0.1', {"requires": ["aui-diagram-node-state"]});
