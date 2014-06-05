/**
 * The Datatable Component
 *
 * @module aui-datatable
 * @submodule aui-datatable-edit
 */

var Lang = A.Lang,
    AArray = A.Array,
    isArray = Lang.isArray,
    isBoolean = Lang.isBoolean,
    isFunction = Lang.isFunction,
    isObject = Lang.isObject,
    isString = Lang.isString,
    isValue = Lang.isValue,
    LString = Lang.String,
    DataType = A.DataType,

    WidgetStdMod = A.WidgetStdMod,

    REGEX_BR = /<br\s*\/?>/gi,
    REGEX_NL = /[\r\n]/g,

    CSS_FORM_CONTROL = A.getClassName('form', 'control'),
    CSS_CELLEDITOR_EDIT = A.getClassName('celleditor', 'edit'),
    CSS_CELLEDITOR_EDIT_ADD_OPTION = A.getClassName('celleditor', 'edit', 'add', 'option'),
    CSS_CELLEDITOR_EDIT_DD_HANDLE = A.getClassName('celleditor', 'edit', 'dd', 'handle'),
    CSS_CELLEDITOR_EDIT_DELETE_OPTION = A.getClassName('celleditor', 'edit', 'delete', 'option'),
    CSS_CELLEDITOR_EDIT_HIDE_OPTION = A.getClassName('celleditor', 'edit', 'hide', 'option'),
    CSS_CELLEDITOR_EDIT_INPUT_NAME = A.getClassName('celleditor', 'edit', 'input', 'name'),
    CSS_CELLEDITOR_EDIT_INPUT_VALUE = A.getClassName('celleditor', 'edit', 'input', 'value'),
    CSS_CELLEDITOR_EDIT_LABEL = A.getClassName('celleditor', 'edit', 'label'),
    CSS_CELLEDITOR_EDIT_LINK = A.getClassName('celleditor', 'edit', 'link'),
    CSS_CELLEDITOR_EDIT_OPTION_ROW = A.getClassName('celleditor', 'edit', 'option', 'row'),
    CSS_CELLEDITOR_ELEMENT = A.getClassName('celleditor', 'element'),
    CSS_CELLEDITOR_OPTION = A.getClassName('celleditor', 'option'),
    CSS_ICON = A.getClassName('glyphicon'),
    CSS_ICON_GRIP_DOTTED_VERTICAL = A.getClassName('glyphicon', 'resize', 'vertical'),

    TPL_BR = '<br/>';

/**
 * DropDownCellEditor class.
 *
 * @class A.DropDownCellEditor
 * @extends A.BaseOptionsCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DropDownCellEditor = A.Component.create({

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
            validator: isBoolean
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

/**
 * CheckboxCellEditor class.
 *
 * @class A.CheckboxCellEditor
 * @extends A.BaseOptionsCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var CheckboxCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'checkboxCellEditor',

    /**
     * Static property used to define the default attribute
     * configuration for the CheckboxCellEditor.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute selectedAttrName
         * @default 'checked'
         * @type String
         */
        selectedAttrName: {
            value: 'checked'
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

    prototype: {
        ELEMENT_TEMPLATE: '<div class="' + CSS_CELLEDITOR_ELEMENT + '"></div>',
        OPTION_TEMPLATE: '<input class="' +
            CSS_CELLEDITOR_OPTION + '" id="{id}" name="{name}" type="checkbox" value="{value}"/>',
        OPTION_WRAPPER: '<label class="checkbox" for="{id}"> {label}</label>',

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method getElementsValue
         */
        getElementsValue: function() {
            var instance = this;

            return instance._getSelectedOptions().get('value');
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _syncElementsFocus
         * @protected
         */
        _syncElementsFocus: function() {
            var instance = this;
            var options = instance.options;

            if (options && options.size()) {
                options.item(0).focus();
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _syncElementsName
         * @protected
         */
        _syncElementsName: function() {
            var instance = this;
            var options = instance.options;

            if (options) {
                options.setAttribute('name', instance.get('elementName'));
            }
        }
    }
});

A.CheckboxCellEditor = CheckboxCellEditor;

/**
 * RadioCellEditor class.
 *
 * @class A.RadioCellEditor
 * @extends A.CheckboxCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var RadioCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'radioCellEditor',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.CheckboxCellEditor,

    prototype: {
        OPTION_TEMPLATE: '<input class="field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',
        OPTION_WRAPPER: '<label class="radio" for="{id}"> {label}</label>',

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method getElementsValue
         */
        getElementsValue: function() {
            var instance = this;

            return instance._getSelectedOptions().get('value')[0];
        }
    }
});

A.RadioCellEditor = RadioCellEditor;

/**
 * DateCellEditor class.
 *
 * @class A.DateCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DateCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'dateCellEditor',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.BaseCellEditor,

    /**
     * Static property used to define the default attribute
     * configuration for the DateCellEditor.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute bodyContent
         * @default ''
         * @type String
         */
        bodyContent: {
            value: ''
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute calendar
         * @default null
         * @type Object
         */
        calendar: {
            setter: '_setCalendar',
            validator: isObject,
            value: null
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute dateFormat
         * @default '%Y-%m-%d'
         * @type String
         */
        dateFormat: {
            value: '%Y-%m-%d',
            validator: isString
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute inputFormatter
         * @type Function
         */
        inputFormatter: {
            value: function(val) {
                var instance = this,
                    values = [];

                AArray.each(val, function(date) {
                    values.push(instance.formatDate(date).toString());
                });

                return values;
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute outputFormatter
         * @type Function
         */
        outputFormatter: {
            value: function(val) {
                var instance = this,
                    values = [];

                AArray.each(val, function(date) {
                    values.push(DataType.Date.parse(instance.get('dateFormat'), date));
                });

                return values;
            }
        }
    },

    prototype: {
        ELEMENT_TEMPLATE: '<input class="' + CSS_CELLEDITOR_ELEMENT + '" type="hidden" />',

        /**
         * Construction logic executed during DateCellEditor instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.after('calendar:dateClick', A.bind(instance._afterDateSelect, instance));
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method getElementsValue
         */
        getElementsValue: function() {
            var instance = this;

            return instance.calendar.get('selectedDates');
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method formatDate
         * @param date
         */
        formatDate: function(date) {
            var instance = this,
                mask = instance.get('dateFormat'),
                locale = instance.get('locale');

            return DataType.Date.format(date, {
                format: mask,
                locale: locale
            });
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _afterDateSelect
         * @param event
         * @protected
         */
        _afterDateSelect: function() {
            var instance = this,
                selectedDates = instance.calendar.get('selectedDates');

            instance.elements.val(AArray.invoke(selectedDates, 'getTime').join(','));
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _afterRender
         * @protected
         */
        _afterRender: function() {
            var instance = this;

            A.DateCellEditor.superclass._afterRender.apply(instance, arguments);

            instance.calendar = new A.Calendar(
                instance.get('calendar')
            ).render(instance.bodyNode);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _setCalendar
         * @param val
         * @protected
         */
        _setCalendar: function(val) {
            var instance = this;

            return A.merge({
                    bubbleTargets: instance
                },
                val
            );
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _uiSetValue
         * @param val
         * @protected
         */
        _uiSetValue: function(val) {
            var instance = this,
                calendar = instance.calendar,
                formatedValue;

            if (calendar) {
                if (!isArray(val)) {
                    val = [val];
                }

                formatedValue = instance.formatValue(instance.get('outputFormatter'), val);

                calendar._clearSelection();

                if (formatedValue[0]) {
                    calendar.set('date', formatedValue[0]);
                    calendar.selectDates(formatedValue);
                }
                else {
                    calendar.set('date', new Date());
                }
            }
        }
    }
});

A.DateCellEditor = DateCellEditor;
