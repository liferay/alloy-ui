/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-multiple-choice
 */

var Lang = A.Lang,

    isArray = Lang.isArray,

    AArray = A.Array,
    AEscape = A.Escape,

    getCN = A.getClassName,

    getEditorOptions = function(val) {
        var options = {};

        AArray.each(
            val,
            function(item) {
                options[item.value] = item.label;
            }
        );

        return options;
    },

    CSS_FORM_BUILDER_FIELD = getCN('form-builder', 'field'),
    CSS_FORM_BUILDER_OPTIONS_EDITOR_HIDDEN = getCN('form-builder', 'options', 'editor', 'hidden');

/**
 * A base class for `A.OptionsEditor`.
 *
 * @class A.OptionsEditor
 * @extends A.RadioCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var OptionsEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder-options-editor',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.OptionsEditor`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Defines if a field is editable.
         *
         * @attribute editable
         */
        editable: {
            setter: function() {
                return false;
            }
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.RadioCellEditor,

    prototype: {
        ELEMENT_TEMPLATE: '<div class="' + CSS_FORM_BUILDER_OPTIONS_EDITOR_HIDDEN + '"></div>',

        /**
         * Construction logic executed during `A.OptionsEditor` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.set('hideEditContainerOnSave', false);

            instance.after('render', function() {
                instance.fire('edit');
            });
        },

        /**
         * Handles the logic to save an event.
         *
         * @method _handleSaveEvent
         * @param event
         * @protected
         */
        _handleSaveEvent: function() {
            var instance = this;

            instance.saveOptions();

            OptionsEditor.superclass._handleSaveEvent.apply(this, arguments);
        }
    }
});

/**
 * A base class for `A.FormBuilderMultipleChoiceField`.
 *
 * @class A.FormBuilderMultipleChoiceField
 * @extends A.FormBuilderField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderMultipleChoiceField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder-multiple-choice-field',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderMultipleChoiceField`.
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
            value: false,
            readOnly: true
        },

        /**
         * Collection of options. Each option is made of a label and value.
         *
         * @attribute options
         * @type Object
         */
        options: {
            value: [
                {
                    label: 'option 1',
                    value: 'value 1'
                },
                {
                    label: 'option 2',
                    value: 'value 2'
                },
                {
                    label: 'option 3',
                    value: 'value 3'
                }
            ]
        },

        /**
         * Markup used to generate each item from `options` attribute.
         *
         * @attribute optionTemplate
         * @default '<option value="{value}">{label}</option>'
         * @type String
         */
        optionTemplate: {
            value: '<option value="{value}">{label}</option>'
        },

        /**
         * Specifies a predefined value for the multiple choice field.
         *
         * @attribute predefinedValue
         */
        predefinedValue: {
            setter: function(val) {
                return isArray(val) ? val : [val];
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
    UI_ATTRS: ['acceptChildren', 'label', 'name', 'options', 'predefinedValue', 'showLabel'],

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
         * Construction logic executed during `A.FormBuilderMultipleChoiceField`
         * instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this,
                options = instance.get('options');

            instance.predefinedValueEditor = new A.DropDownCellEditor({
                options: instance._getPredefinedValuesOptions(options)
            });
        },

        /**
         * Returns a list of property models including the `A.RadioCellEditor`
         * model.
         *
         * @method getPropertyModel
         */
        getPropertyModel: function() {
            var instance = this,
                options = instance.get('options'),
                strings = instance.getStrings();

            var model = A.FormBuilderMultipleChoiceField.superclass.getPropertyModel.apply(instance, arguments);

            AArray.each(
                model,
                function(item, index, collection) {
                    if (item.attributeName === 'predefinedValue') {
                        collection[index] = A.merge(
                            item, {
                                editor: instance.predefinedValueEditor,
                                formatter: function(o) {
                                    var editorOptions = instance.predefinedValueEditor.get('options'),
                                        values = o.data.value;

                                    if (!isArray(values)) {
                                        values = [values];
                                    }

                                    var labels = A.Array.map(values, function(val) {
                                        return editorOptions[val];
                                    });

                                    return labels.join(',' + ' ');
                                }
                            }
                        );
                    }
                }
            );

            model.push({
                attributeName: 'options',
                editor: new OptionsEditor({
                    editable: true,
                    on: {
                        optionsChange: function(event) {
                            var values = instance._normalizeValues(event.newVal);

                            values = instance._getPredefinedValuesOptions(values);

                            instance.predefinedValueEditor.set('options', values);
                        }
                    },
                    options: getEditorOptions(options),
                    inputFormatter: function() {
                        var input = [];

                        A.each(
                            this.get('options'),
                            function(item, index) {
                                var option = {
                                    label: item,
                                    value: index
                                };

                                AArray.each(
                                    options,
                                    function(oItem) {
                                        if (oItem.value === index) {
                                            option = A.merge(oItem, option);
                                        }
                                    }
                                );

                                input.push(option);
                            }
                        );

                        return input;
                    }
                }),
                formatter: function(o) {
                    var buffer = [];

                    A.each(
                        o.data.value,
                        function(item) {
                            buffer.push(item.label);
                        }
                    );

                    return buffer.join(', ');
                },
                name: strings.options
            });

            return model;
        },

        /**
         * Returns a list of predefined values with an empty option
         *
         * @method _getPredefinedValuesOptions
         * @param options
         * @protected
         */
        _getPredefinedValuesOptions: function(options) {
            var emptyOption = {
                label: '',
                value: ''
            };

            return getEditorOptions([emptyOption].concat(options));
        },

        /**
         * Returns an array of objects with values
         *
         * @method _normalizeValues
         * @param values
         * @protected
         */
        _normalizeValues: function(values) {
            return A.map(values, function(label, value) {
                return {
                    label: label,
                    value: value
                };
            });
        },

        /**
         * Set the `options` attribute on the UI.
         *
         * @method _uiSetOptions
         * @param val
         * @protected
         */
        _uiSetOptions: function(val) {
            var instance = this;

            var buffer = [];

            A.each(
                val,
                function(item) {
                    buffer.push(
                        Lang.sub(
                            instance.get('optionTemplate'), {
                                label: AEscape.html(item.label),
                                value: AEscape.html(item.value)
                            }
                        )
                    );
                }
            );

            instance.optionNodes = A.NodeList.create(buffer.join(''));

            instance.get('templateNode').setContent(instance.optionNodes);

            instance._uiSetPredefinedValue(
                instance.get('predefinedValue')
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
                optionNodes = instance.optionNodes;

            if (!optionNodes) {
                return;
            }

            optionNodes.set('selected', false);

            AArray.each(val, function(item) {
                optionNodes.filter('[value="' + AEscape.html(item) + '"]').set('selected', true);
            });
        }
    }

});

A.FormBuilderMultipleChoiceField = FormBuilderMultipleChoiceField;

A.FormBuilderField.types['multiple-choice'] = A.FormBuilderMultipleChoiceField;
