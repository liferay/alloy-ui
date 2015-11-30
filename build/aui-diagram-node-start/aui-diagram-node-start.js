YUI.add('aui-diagram-node-start', function (A, NAME) {

/**
 * A base class for DiagramNodeStart.
 *
 * @class A.DiagramNodeStart
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramNodeStart = A.Component.create({

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
     * configuration for the `A.DiagramNodeStart`.
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
         * @default 'start'
         * @type String
         */
        type: {
            value: 'start'
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

A.DiagramNodeStart = DiagramNodeStart;


}, '3.0.1', {"requires": ["aui-diagram-node-state"]});
