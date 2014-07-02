/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-checkbox
 */

var L = A.Lang,

    AArray = A.Array,

    getCN = A.getClassName,

    CSS_FIELD = getCN('field'),
    CSS_FIELD_CHECKBOX = getCN('field', 'checkbox'),
    CSS_FIELD_CHOICE = getCN('field', 'choice'),
    CSS_FORM_BUILDER_FIELD = getCN('form-builder-field'),
    CSS_FORM_BUILDER_FIELD_NODE = getCN('form-builder-field', 'node'),

    TPL_CHECKBOX = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_CHECKBOX,
        CSS_FIELD_CHOICE].join(' ') + '" name="{name}" type="checkbox" value="{value}" {checked} />';

/**
 * A base class for `A.FormBuilderCheckBoxField`.
 *
 * @class A.FormBuilderCheckBoxField
 * @extends A.FormBuilderField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderCheckBoxField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder-checkbox-field',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderCheckBoxField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Indicates which is the type of data for the input field.
         *
         * @attribute dataType
         * @default 'boolean'
         * @type String
         */
        dataType: {
            value: 'boolean'
        },

        /**
         * Specifies a predefined value for the checkbox field.
         *
         * @attribute predefinedValue
         * @default false
         * @type Boolean
         */
        predefinedValue: {
            setter: A.DataType.Boolean.parse,
            value: false
        },

        /**
         * Reusable block of markup used to generate the field.
         *
         * @attribute template
         */
        template: {
            valueFn: function() {
                return TPL_CHECKBOX;
            }
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
         * Render the `A.FormBuilderCheckBoxField` component instance.
         * Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this,
                templateNode = instance.get('templateNode'),
                labelNode = instance.get('labelNode');

            A.FormBuilderCheckBoxField.superclass.renderUI.apply(instance, arguments);

            labelNode.insert(templateNode, labelNode, 'before');
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

            var model = A.FormBuilderCheckBoxField.superclass.getPropertyModel.apply(instance, arguments);

            AArray.each(model, function(item, index, collection) {
                if (item.attributeName === 'predefinedValue') {
                    collection[index] = {
                        attributeName: 'predefinedValue',
                        editor: new A.RadioCellEditor({
                            options: {
                                'true': strings.yes,
                                'false': strings.no
                            }
                        }),
                        formatter: A.bind(instance._booleanFormatter, instance),
                        name: strings.predefinedValue
                    };
                }
            });

            return model;
        },

        /**
         * Injects data into the template and returns the HTML result.
         *
         * @method getHTML
         * @return {String}
         */
        getHTML: function() {
            var instance = this,
                checked = instance.get('checked');

            return L.sub(
                instance.get('template'), {
                    checked: checked ? 'checked="checked"' : '',
                    id: A.Escape.html(instance.get('id')),
                    label: A.Escape.html(instance.get('label')),
                    name: A.Escape.html(instance.get('name')),
                    value: A.Escape.html(instance.get('predefinedValue'))
                }
            );
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

            if (val) {
                templateNode.setAttribute('checked', val);
            }
            else {
                templateNode.removeAttribute('checked');
            }
        }

    }

});

A.FormBuilderCheckBoxField = FormBuilderCheckBoxField;

A.namespace('FormBuilder.types').checkbox = A.FormBuilderCheckBoxField;
