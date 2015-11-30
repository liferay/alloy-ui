YUI.add('aui-datatable-radio-cell-editor', function (A, NAME) {

/**
 * RadioCellEditor class.
 *
 * @class A.RadioCellEditor
 * @extends A.CheckboxCellEditor
 * @param {Object} config Object literal specifying widget configuration
 * properties.
 * @constructor
 */
var RadioCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'radioCellEditor',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.CheckboxCellEditor,

    prototype: {
        OPTION_TEMPLATE: '<input class="field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',
        OPTION_WRAPPER: '<label class="radio" for="{id}"> {label}</label>',

        /**
         * Gets the `A.RadioCellEditor` input value.
         *
         * @method getElementsValue
         * @return {String} Input value.
         */
        getElementsValue: function() {
            var instance = this;

            return instance._getSelectedOptions().get('value')[0];
        }
    }
});

A.RadioCellEditor = RadioCellEditor;


}, '3.0.1', {"requires": ["aui-datatable-base-options-cell-editor"]});
