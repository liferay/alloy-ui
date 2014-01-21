/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-text
 */

var L = A.Lang,

    FIELD = 'field',
    FORM_BUILDER_FIELD = 'form-builder-field',
    FORM_BUILDER_TEXT_FIELD = 'form-builder-text-field',
    ID = 'id',
    INPUT = 'input',
    LABEL = 'label',
    LARGE = 'large',
    MEDIUM = 'medium',
    NAME = 'name',
    NODE = 'node',
    PREDEFINED_VALUE = 'predefinedValue',
    SMALL = 'small',
    SPACE = ' ',
    TEMPLATE = 'template',
    TEMPLATE_NODE = 'templateNode',
    TEXT = 'text',
    WIDTH = 'width',

    getCN = A.getClassName,

    CSS_FIELD_INPUT = getCN(FIELD, INPUT),
    CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
    CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
    CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

    TPL_INPUT = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(
        SPACE) + '" name="{name}" type="text" value="{value}" />',

    WIDTH_VALUES_MAP = {
        small: 'large',
        medium: 'xlarge',
        large: 'xxlarge'
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
    NAME: FORM_BUILDER_TEXT_FIELD,

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
            value: SMALL
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
                instance.get(TEMPLATE), {
                    id: instance.get(ID),
                    label: instance.get(LABEL),
                    name: instance.get(NAME),
                    value: instance.get(PREDEFINED_VALUE),
                    width: instance.get(WIDTH)
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
                attributeName: WIDTH,
                editor: new A.RadioCellEditor({
                    options: {
                        small: strings[SMALL],
                        medium: strings[MEDIUM],
                        large: strings[LARGE]
                    }
                }),
                formatter: function(o) {
                    return strings[o.data.value];
                },
                name: strings[WIDTH]
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
                templateNode = instance.get(TEMPLATE_NODE);

            templateNode.addClass(getCN(INPUT, WIDTH_VALUES_MAP[val]));
            templateNode.removeClass(getCN(INPUT, WIDTH_VALUES_MAP[instance.prevWidth]));

            instance.prevWidth = val;
        }

    }

});

A.FormBuilderTextField = FormBuilderTextField;

A.FormBuilder.types.text = A.FormBuilderTextField;
