YUI.add('aui-form-builder-field-text-deprecated', function (A, NAME) {

/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-text
 */

var L = A.Lang,

    AEscape = A.Escape,

    getCN = A.getClassName,

    CSS_FORM_CONTROL = getCN('form', 'control'),
    CSS_FIELD_INPUT = getCN('field', 'input'),
    CSS_FIELD_INPUT_TEXT = getCN('field', 'input', 'text'),
    CSS_FORM_BUILDER_FIELD = getCN('form-builder-field'),
    CSS_FORM_BUILDER_FIELD_NODE = getCN('form-builder-field', 'node'),

    TPL_INPUT = '<div class="form-builder-field-wrapper"><input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE,
        CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT,
        CSS_FORM_CONTROL].join(' ') + '" name="{name}" type="text" value="{value}" /></div>',

    WIDTH_VALUES_MAP = {
        small: 'col-xs-4',
        medium: 'col-xs-8',
        large: 'col-xs-12'
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
            validator: function(val) {
                val = A.Lang.String.toLowerCase(val);
                return val in WIDTH_VALUES_MAP;
            },
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
                    id: AEscape.html(instance.get('id')),
                    label: AEscape.html(instance.get('label')),
                    name: AEscape.html(instance.get('name')),
                    value: AEscape.html(instance.get('predefinedValue')),
                    width: AEscape.html(instance.get('width'))
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
                        small: strings.small,
                        medium: strings.medium,
                        large: strings.large
                    }
                }),
                formatter: function(o) {
                    return strings[o.data.value];
                },
                name: strings.width
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

            templateNode.removeClass(WIDTH_VALUES_MAP[instance.prevWidth]);
            templateNode.addClass(WIDTH_VALUES_MAP[val]);

            instance.prevWidth = val;
        }

    }

});

A.FormBuilderTextField = FormBuilderTextField;

A.FormBuilderField.types.text = A.FormBuilderTextField;


}, '3.0.1', {"requires": ["aui-form-builder-field-deprecated"]});
