YUI.add('aui-diagram-node-end', function (A, NAME) {

/**
 * A base class for DiagramNodeEnd.
 *
 * @class A.DiagramNodeEnd
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramNodeEnd = A.Component.create({

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
     * configuration for the `A.DiagramNodeEnd`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The type of the node.
         *
         * @attribute type
         * @default 'end'
         * @type String
         */
        type: {
            value: 'end'
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNodeState
});

A.DiagramNodeEnd = DiagramNodeEnd;


}, '3.0.1', {"requires": ["aui-diagram-node-state"]});
