YUI.add('aui-diagram-node-state', function (A, NAME) {

/**
 * A base class for DiagramNodeState.
 *
 * @class A.DiagramNodeState
 * @extends A.DiagramNode
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramNodeState = A.Component.create({

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
     * configuration for the `A.DiagramNodeState`.
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
         * @default 40
         * @type Number
         */
        height: {
            value: 40
        },

        /**
         * The type of the node.
         *
         * @attribute type
         * @default 'state'
         * @type String
         */
        type: {
            value: 'state'
        },

        /**
         * The width of the node.
         *
         * @attribute width
         * @default 40
         * @type Number
         */
        width: {
            value: 40
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNode,

    prototype: {
        hotPoints: A.DiagramNode.CIRCLE_POINTS,

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

            boundary.translate(5, 5);

            return boundary;
        },

        /**
         * Gets the shape boundary definitions.
         *
         * @method _valueShapeBoundary
         * @protected
         */
        _valueShapeBoundary: function() {
            return {
                radius: 15,
                type: 'circle',
                stroke: {
                    weight: 7,
                    color: 'transparent',
                    opacity: 0
                }
            };
        }
    }
});

A.DiagramNodeState = DiagramNodeState;


}, '3.0.1', {"requires": ["aui-diagram-node"]});
