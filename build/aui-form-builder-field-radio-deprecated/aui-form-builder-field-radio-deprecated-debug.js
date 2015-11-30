YUI.add('aui-form-builder-field-radio-deprecated', function (A, NAME) {

/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-radio
 */

var L = A.Lang,

    AEscape = A.Escape,

    getCN = A.getClassName,

    CSS_RADIO = getCN('radio'),
    CSS_FIELD = getCN('field'),
    CSS_FIELD_CHOICE = getCN('field', 'choice'),
    CSS_FIELD_RADIO = getCN('field', 'radio'),
    CSS_FORM_BUILDER_FIELD = getCN('form-builder-field'),
    CSS_FORM_BUILDER_FIELD_NODE = getCN('form-builder-field', 'node'),
    CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER = getCN('form-builder-field', 'options', 'container'),

    TPL_OPTIONS_CONTAINER = '<div class="' + CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER + '"></div>',
    TPL_RADIO =
        '<div class="' + CSS_RADIO + '"><label class="field-label" for="{id}"><input id="{id}" class="' +
        [CSS_FIELD, CSS_FIELD_CHOICE, CSS_FIELD_RADIO, CSS_FORM_BUILDER_FIELD_NODE].join(' ') +
        '" name="{name}" type="radio" value="{value}" {checked} {disabled} />{label}</label></div>';

/**
 * A base class for `A.FormBuilderRadioField`.
 *
 * @class A.FormBuilderRadioField
 * @extends A.FormBuilderMultipleChoiceField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderRadioField = A.Component.create({

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderRadioField`.
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
                return TPL_RADIO;
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
    EXTENDS: A.FormBuilderMultipleChoiceField,

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder-radio-field',

    prototype: {

        /**
         * Returns the HTML template.
         *
         * @method getHTML
         * @return {String}
         */
        getHTML: function() {
            return TPL_OPTIONS_CONTAINER;
        },

        /**
         * Set the `disabled` attribute in the UI.
         *
         * @method _uiSetDisabled
         * @param val
         * @protected
         */
        _uiSetDisabled: function(val) {
            var instance = this,
                templateNode = instance.get('templateNode');

            templateNode.all('input').each(function(input) {
                if (val) {
                    input.setAttribute('disabled', val);
                }
                else {
                    input.removeAttribute('disabled');
                }
            });
        },

        /**
         * Set the `options` attribute in the UI.
         *
         * @method _uiSetOptions
         * @param val
         * @protected
         */
        _uiSetOptions: function(val) {
            var instance = this,
                buffer = [],
                counter = 0,
                predefinedValue = instance.get('predefinedValue'),
                templateNode = instance.get('templateNode');

            A.each(val, function(item) {
                var checked = A.Array.indexOf(predefinedValue, item.value) > -1;

                buffer.push(
                    L.sub(
                        TPL_RADIO, {
                            checked: checked ? 'checked="checked"' : '',
                            disabled: instance.get('disabled') ? 'disabled="disabled"' : '',
                            id: AEscape.html(instance.get('id') + counter++),
                            label: AEscape.html(item.label),
                            name: AEscape.html(instance.get('name')),
                            value: AEscape.html(item.value)
                        }
                    )
                );
            });

            instance.optionNodes = A.NodeList.create(buffer.join(''));

            templateNode.setContent(instance.optionNodes);
        },

        /**
         * Set the `predefinedValue` attribute in the UI.
         *
         * @method _uiSetPredefinedValue
         * @param val
         * @protected
         */
        _uiSetPredefinedValue: function(val) {
            var instance = this,
                optionNodes = instance.optionNodes;

            if (!optionNodes) {
                return;
            }

            optionNodes.set('checked', false);

            optionNodes.all('input[value="' + AEscape.html(val) + '"]').set('checked', true);
        }
    }

});

A.FormBuilderRadioField = FormBuilderRadioField;

A.FormBuilderField.types.radio = A.FormBuilderRadioField;


}, '3.0.1', {"requires": ["aui-form-builder-field-deprecated"]});
