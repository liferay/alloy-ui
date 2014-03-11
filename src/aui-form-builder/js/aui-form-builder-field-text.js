/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-text
 */

var L = A.Lang,

    getCN = A.getClassName,

    CSS_FIELD_INPUT = getCN('field', 'input'),
    CSS_FIELD_INPUT_TEXT = getCN('field', 'input', 'text'),
    CSS_FORM_BUILDER_FIELD = getCN('form-builder-field'),
    CSS_FORM_BUILDER_FIELD_NODE = getCN('form-builder-field', 'node'),

    TPL_INPUT = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(
        ' ') + '" name="{name}" type="text" value="{value}" />',

    WIDTH_VALUES_MAP = {
        small: 'small',
        medium: 'medium',
        large: 'large'
    };

/**
 * A base class for `A.FormBuilderTextField`.
 *
 * @class A.FormBuilderTextField
 * @extends A.FormBuilderField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderTextField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder-text-field',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderTextField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Reusable block of markup used to generate the field.
         *
         * @attribute template
         */
        template: {
            valueFn: function() {
                return TPL_INPUT;
            }
        },

        /**
         * The width of the input field.
         *
         * @attribute width
         * @default 'small'
         */
        width: {
            value: 'small'
        }

    },

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
                    id: instance.get('id'),
                    label: instance.get('label'),
                    name: instance.get('name'),
                    value: instance.get('predefinedValue'),
                    width: instance.get('width')
                }
            );
        },

        /**
         * Returns a list of property models including the `A.RadioCellEditor`
         * model.
         *
         * @method getPropertyModel
         */
        getPropertyModel: function() {
            var instance = this,
                strings = instance.getStrings();

            var model = A.FormBuilderTextField.superclass.getPropertyModel.apply(instance, arguments);

            model.push({
                attributeName: 'width',
                editor: new A.RadioCellEditor({
                    options: {
                        small: strings['small'],
                        medium: strings['medium'],
                        large: strings['large']
                    }
                }),
                formatter: function(o) {
                    return strings[o.data.value];
                },
                name: strings['width']
            });

            return model;
        },

        /**
         * Set the `width` attribute in the UI.
         *
         * @method _uiSetWidth
         * @param val
         * @protected
         */
        _uiSetWidth: function(val) {
            var instance = this,
                templateNode = instance.get('templateNode');

            templateNode.addClass(getCN('input', WIDTH_VALUES_MAP[val]));
            templateNode.removeClass(getCN('input', WIDTH_VALUES_MAP[instance.prevWidth]));

            instance.prevWidth = val;
        }

    }

});

A.FormBuilderTextField = FormBuilderTextField;

A.FormBuilder.types.text = A.FormBuilderTextField;
