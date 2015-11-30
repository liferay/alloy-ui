YUI.add('aui-datatable-checkbox-cell-editor', function (A, NAME) {

var CheckboxCellEditor,
    CSS_CELLEDITOR_ELEMENT = A.getClassName('celleditor', 'element'),
    CSS_CELLEDITOR_OPTION = A.getClassName('celleditor', 'option');

/**
 * CheckboxCellEditor class.
 *
 * @class A.CheckboxCellEditor
 * @extends A.BaseOptionsCellEditor
 * @param {Object} config Object literal specifying widget configuration
 * properties.
 * @constructor
 */
var CheckboxCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'checkboxCellEditor',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.CheckboxCellEditor`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Defines the selected state of an option.
         *
         * @attribute selectedAttrName
         * @default 'checked'
         * @type String
         */
        selectedAttrName: {
            value: 'checked'
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.BaseOptionsCellEditor,

    prototype: {
        ELEMENT_TEMPLATE: '<div class="' + CSS_CELLEDITOR_ELEMENT + '"></div>',
        OPTION_TEMPLATE: '<input class="' +
            CSS_CELLEDITOR_OPTION + '" id="{id}" name="{name}" type="checkbox" value="{value}"/>',
        OPTION_WRAPPER: '<label class="checkbox" for="{id}"> {label}</label>',

        /**
         * Gets the `A.CheckboxCellEditor` input value.
         *
         * @method getElementsValue
         * @return {String} Input value.
         */
        getElementsValue: function() {
            var instance = this;

            return instance._getSelectedOptions().get('value');
        },

        /**
         * Syncs the name attribute of the form input.
         *
         * @method _syncElementsFocus
         * @protected
         */
        _syncElementsFocus: function() {
            var instance = this;
            var options = instance.options;

            if (options && options.size()) {
                options.item(0).focus();
            }
        },

        /**
         * Syncs the name attribute of the form input.
         *
         * @method _syncElementsName
         * @protected
         */
        _syncElementsName: function() {
            var instance = this;
            var options = instance.options;

            if (options) {
                options.setAttribute('name', instance.get('elementName'));
            }
        }
    }
});

A.CheckboxCellEditor = CheckboxCellEditor;


}, '3.0.1', {"requires": ["aui-datatable-base-options-cell-editor"]});
