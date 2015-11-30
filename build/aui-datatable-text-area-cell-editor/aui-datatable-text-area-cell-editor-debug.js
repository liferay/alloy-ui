YUI.add('aui-datatable-text-area-cell-editor', function (A, NAME) {

var CSS_FORM_CONTROL = A.getClassName('form', 'control'),
    CSS_CELLEDITOR_ELEMENT = A.getClassName('celleditor', 'element');

/**
 * TextAreaCellEditor class.
 *
 * @class A.TextAreaCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 * properties.
 * @constructor
 */
var TextAreaCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'textAreaCellEditor',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.BaseCellEditor,

    prototype: {
        ELEMENT_TEMPLATE: '<textarea class="' + [CSS_CELLEDITOR_ELEMENT, CSS_FORM_CONTROL].join(' ') +
            '"></textarea>'
    }
});

A.TextAreaCellEditor = TextAreaCellEditor;


}, '3.0.1', {"requires": ["aui-datatable-base-options-cell-editor"]});
