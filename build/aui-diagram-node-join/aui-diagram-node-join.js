YUI.add('aui-diagram-node-join', function (A, NAME) {

/**
 * A base class for DiagramNodeJoin.
 *
 * @class A.DiagramNodeJoin
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramNodeJoin = A.Component.create({

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
     * configuration for the `A.DiagramNodeJoin`.
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
         * @default 'join'
         * @type String
         */
        type: {
            value: 'join'
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

A.DiagramNodeJoin = DiagramNodeJoin;


}, '3.0.1', {"requires": ["aui-diagram-node-state"]});
