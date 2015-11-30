YUI.add('aui-datatable-text-cell-editor', function (A, NAME) {

var CSS_FORM_CONTROL = A.getClassName('form', 'control'),
    CSS_CELLEDITOR_ELEMENT = A.getClassName('celleditor', 'element');

/**
 * TextCellEditor class.
 *
 * @class A.TextCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 * properties.
 * @constructor
 */
var TextCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'textCellEditor',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.BaseCellEditor,

    prototype: {
        ELEMENT_TEMPLATE: '<input autocomplete="off" class="' +
            [CSS_CELLEDITOR_ELEMENT, CSS_FORM_CONTROL].join(' ') + '" type="text" />'
    }
});

A.TextCellEditor = TextCellEditor;


}, '3.0.1', {"requires": ["aui-datatable-base-options-cell-editor"]});
