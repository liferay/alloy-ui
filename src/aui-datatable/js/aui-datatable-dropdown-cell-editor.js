var CSS_FORM_CONTROL = A.getClassName('form', 'control'),
    CSS_CELLEDITOR_ELEMENT = A.getClassName('celleditor', 'element'),
    DropDownCellEditor;

/**
 * DropDownCellEditor class.
 *
 * @class A.DropDownCellEditor
 * @extends A.BaseOptionsCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
DropDownCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'dropDownCellEditor',

    /**
     * Static property used to define the default attribute
     * configuration for the DropDownCellEditor.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute multiple
         * @default false
         * @type Boolean
         */
        multiple: {
            value: false,
            validator: A.Lang.isBoolean
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

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['multiple'],

    prototype: {
        ELEMENT_TEMPLATE: '<select class="' + [CSS_CELLEDITOR_ELEMENT, CSS_FORM_CONTROL].join(' ') + '"></select>',

        OPTION_TEMPLATE: '<option value="{value}">{label}</option>',

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method getElementsValue
         */
        getElementsValue: function() {
            var instance = this;

            if (instance.get('multiple')) {
                return instance._getSelectedOptions().get('value');
            }

            return instance.elements.get('value');
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _syncElementsFocus
         * @protected
         */
        _syncElementsFocus: function() {
            var instance = this;

            instance.elements.focus();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _uiSetMultiple
         * @param val
         * @protected
         */
        _uiSetMultiple: function(val) {
            var instance = this;
            var elements = instance.elements;

            if (val) {
                elements.setAttribute('multiple', 'multiple');
            }
            else {
                elements.removeAttribute('multiple');
            }
        }
    }
});

A.DropDownCellEditor = DropDownCellEditor;
