YUI.add('aui-form-builder-field-select-deprecated', function (A, NAME) {

/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-select
 */

var L = A.Lang,

    AEscape = A.Escape,

    getCN = A.getClassName,

    CSS_FORM_CONTROL = getCN('form', 'control'),
    CSS_FORM_BUILDER_FIELD = getCN('form-builder-field'),
    CSS_FORM_BUILDER_FIELD_NODE = getCN('form-builder-field', 'node'),

    TPL_SELECT =
        '<select id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FORM_CONTROL]
        .join(' ') + '" name="{name}" value="{value}"></select>';

/**
 * A base class for `A.FormBuilderSelectField`.
 *
 * @class A.FormBuilderSelectField
 * @extends A.FormBuilderMultipleChoiceField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderSelectField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder-select-field',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderSelectField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Checks if the drop-down list allows multiple selections.
         *
         * @attribute multiple
         * @default false
         * @type Boolean
         */
        multiple: {
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
                return TPL_SELECT;
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
    UI_ATTRS: A.FormBuilderField.UI_ATTRS.concat(['multiple', 'predefinedValue']),

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
    EXTENDS: A.FormBuilderMultipleChoiceField,

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
                    value: AEscape.html(instance.get('predefinedValue'))
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

            var model = A.FormBuilderSelectField.superclass.getPropertyModel.apply(instance, arguments);

            model.push({
                attributeName: 'multiple',
                editor: new A.RadioCellEditor({
                    options: {
                        'true': strings.yes,
                        'false': strings.no
                    }
                }),
                formatter: A.bind(instance._booleanFormatter, instance),
                name: strings.multiple
            });

            return model;
        },

        /**
         * Set the `multiple` attribute in the UI.
         *
         * @method _uiSetMultiple
         * @param val
         * @protected
         */
        _uiSetMultiple: function(val) {
            var instance = this,
                templateNode = instance.get('templateNode');

            if (val) {
                templateNode.setAttribute('multiple', 'multiple');
            }
            else {
                templateNode.removeAttribute('multiple');
            }

            instance.predefinedValueEditor.set('multiple', val);
        }

    }

});

A.FormBuilderSelectField = FormBuilderSelectField;

A.FormBuilderField.types.select = A.FormBuilderSelectField;


}, '3.0.1', {"requires": ["aui-form-builder-field-deprecated"]});
