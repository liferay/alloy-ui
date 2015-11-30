YUI.add('aui-diagram-node-manager-base', function (A, NAME) {

/**
 * A base class for DiagramNodeManagerBase.
 *
 * @class A.DiagramNodeManagerBase
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramNodeManagerBase = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node-manager',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.Base
});

A.DiagramNodeManager = new DiagramNodeManagerBase();


}, '3.0.1', {"requires": ["base"]});
