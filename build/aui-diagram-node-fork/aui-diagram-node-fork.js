YUI.add('aui-diagram-node-fork', function (A, NAME) {

/**
 * A base class for DiagramNodeFork.
 *
 * @class A.DiagramNodeFork
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramNodeFork = A.Component.create({

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
     * configuration for the `A.DiagramNodeFork`.
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
         * @default 'fork'
         * @type String
         */
        type: {
            value: 'fork'
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

        renderShapeBoundary: A.DiagramNodeCondition.prototype.renderShapeBoundary,

        _valueShapeBoundary: A.DiagramNode.prototype._valueShapeBoundary
    }
});

A.DiagramNodeFork = DiagramNodeFork;


}, '3.0.1', {"requires": ["aui-diagram-node-state"]});
