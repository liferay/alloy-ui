YUI.add('aui-form-builder-field-button-deprecated', function (A, NAME) {

/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-button
 */

var L = A.Lang,

    toInitialCap = A.cached(
        function(str) {
            return str.substring(0, 1).toUpperCase() + str.substring(1);
        }
    ),

    AEscape = A.Escape,

    getCN = A.getClassName,

    CSS_BTN = getCN('btn'),
    CSS_BTN_DEFAULT = getCN('btn', 'default'),
    CSS_FORM_BUILDER_FIELD = getCN('form-builder-field'),
    CSS_FORM_BUILDER_FIELD_NODE = getCN('form-builder-field', 'node'),

    TPL_BUTTON = '<button id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_BTN,
        CSS_BTN_DEFAULT].join(' ') + '" type="{type}">{value}</button>',

    BUTTON_TYPES = ['submit', 'reset', 'button'];

/**
 * A base class for `A.FormBuilderButtonField`.
 *
 * @class A.FormBuilderButtonField
 * @extends A.FormBuilderField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderButtonField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder-button-field',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderButtonField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * If `true` children are accepted.
         *
         * @attribute acceptChildren
         * @default false
         * @type Boolean
         * @readOnly
         */
        acceptChildren: {
            readOnly: true,
            value: false
        },

        /**
         * Defines the button type attribute, e.g. `type="reset"`.
         *
         * @attribute buttonType
         * @default 'submit'
         */
        buttonType: {
            validator: function(val) {
                return A.Array(BUTTON_TYPES).indexOf(val.toLowerCase()) > -1;
            },
            value: 'submit'
        },

        /**
         * Specifies a predefined value for the button field.
         *
         * @attribute predefinedValue
         */
        predefinedValue: {
            value: toInitialCap('submit')
        },

        /**
         * If `true` the label is showed.
         *
         * @attribute showLabel
         * @default false
         * @type Boolean
         */
        showLabel: {
            value: false
        },

        /**
         * Reusable block of markup used to generate the field.
         *
         * @attribute template
         */
        template: {
            valueFn: function() {
                return TPL_BUTTON;
            }
        }

    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: A.FormBuilderField.UI_ATTRS.concat(['buttonType']),

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.FormBuilderField,

    prototype: {

        /**
         * Injects data into the template and returns the HTML result.
         *
         * @method getHTML
         * @return {String}
         */
        getHTML: function() {
            var instance = this;

            return L.sub(
                instance.get('template'), {
                    id: AEscape.html(instance.get('id')),
                    label: AEscape.html(instance.get('label')),
                    name: AEscape.html(instance.get('name')),
                    type: AEscape.html(instance.get('buttonType')),
                    value: AEscape.html(instance.get('predefinedValue'))
                }
            );
        },

        /**
         * Returns a list of property models including the `A.RadioCellEditor`
         * model.
         *
         * @method getPropertyModel
         * @return {Array}
         */
        getPropertyModel: function() {
            var instance = this,
                strings = instance.getStrings();

            var model = A.FormBuilderButtonField.superclass.getPropertyModel.apply(instance, arguments);

            model.push({
                attributeName: 'buttonType',
                editor: new A.RadioCellEditor({
                    options: {
                        'button': strings.button,
                        'reset': strings.reset,
                        'submit': strings.submit
                    }
                }),
                name: strings.buttonType
            });

            return model;
        },

        /**
         * Set the `buttonType` attribute on the UI.
         *
         * @method _uiSetButtonType
         * @param val
         * @protected
         */
        _uiSetButtonType: function(val) {
            var instance = this,
                templateNode = instance.get('templateNode');

            templateNode.setAttribute('type', val);
        },

        /**
         * Set the `predefinedValue` attribute on the UI.
         *
         * @method _uiSetPredefinedValue
         * @param val
         * @protected
         */
        _uiSetPredefinedValue: function(val) {
            var instance = this,
                templateNode = instance.get('templateNode');

            templateNode.setContent(AEscape.html(val));
        }

    }

});

A.FormBuilderButtonField = FormBuilderButtonField;
A.FormBuilderField.types.button = A.FormBuilderButtonField;


}, '3.0.1', {"requires": ["aui-form-builder-field-deprecated"]});
