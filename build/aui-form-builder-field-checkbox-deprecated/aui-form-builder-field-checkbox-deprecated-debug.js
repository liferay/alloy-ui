YUI.add('aui-form-builder-field-checkbox-deprecated', function (A, NAME) {

/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-checkbox
 */

var L = A.Lang,

    AArray = A.Array,
    AEscape = A.Escape,

    getCN = A.getClassName,

    CSS_CHECKBOX = getCN('checkbox'),
    CSS_FIELD = getCN('field'),
    CSS_FIELD_CHECKBOX = getCN('field', 'checkbox'),
    CSS_FIELD_CHECKBOX_TEXT = getCN('field', 'checkbox', 'text'),
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

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder-checkbox-field',

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
                contentBox = instance.get('contentBox');

            A.FormBuilderCheckBoxField.superclass.renderUI.apply(instance, arguments);

            contentBox.addClass(CSS_CHECKBOX);
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
                                'false': strings.no,
                                'true': strings.yes
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
                    id: AEscape.html(instance.get('id')),
                    label: AEscape.html(instance.get('label')),
                    name: AEscape.html(instance.get('name')),
                    value: AEscape.html(instance.get('predefinedValue'))
                }
            );
        },

        /**
         * Set the `label` attribute on the UI.
         *
         * @method _uiSetLabel
         * @param val
         * @protected
         */
        _uiSetLabel: function(val) {
            var instance = this,
                labelNode = instance.get('labelNode'),
                showLabel = instance.get('showLabel'),
                templateNode = instance.get('templateNode');

            labelNode.setContent('<span class="' + CSS_FIELD_CHECKBOX_TEXT + '">' + AEscape.html(val) + '</span>');

            instance._uiSetShowLabel(showLabel);

            labelNode.prepend(templateNode);
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
        },

        /**
         * Set the `showLabel` attribute on the UI.
         *
         * @method _uiSetShowLabel
         * @param val
         * @protected
         */
        _uiSetShowLabel: function(val) {
            var instance = this,
                labelNode = instance.get('labelNode'),
                labelTextNode = labelNode.one('.' + CSS_FIELD_CHECKBOX_TEXT);

            if (labelTextNode) {
                labelTextNode.toggle(val);
            }
        }
    }

});

A.FormBuilderCheckBoxField = FormBuilderCheckBoxField;

A.FormBuilderField.types.checkbox = A.FormBuilderCheckBoxField;


}, '3.0.1', {"requires": ["aui-form-builder-field-deprecated"]});
