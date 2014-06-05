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
 * Abstract class BaseOptionsCellEditor for options attribute support.
 *
 * @class A.BaseOptionsCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var BaseOptionsCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'optionsCellEditor',

    /**
     * Static property used to define the default attribute
     * configuration for the BaseOptionsCellEditor.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute inputFormatter
         * @default null
         */
        inputFormatter: {
            value: null
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute options
         * @default {}
         * @type Object
         */
        options: {
            setter: '_setOptions',
            value: {},
            validator: isObject
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute outputFormatter
         * @default null
         */
        outputFormatter: {
            value: null
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute selectedAttrName
         * @default 'selected'
         * @type String
         */
        selectedAttrName: {
            value: 'selected',
            validator: isString
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            value: {
                add: 'Add',
                cancel: 'Cancel',
                addOption: 'Add option',
                edit: 'Edit options',
                editOptions: 'Edit option(s)',
                name: 'Name',
                remove: 'Remove',
                save: 'Save',
                stopEditing: 'Stop editing',
                value: 'Value'
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
    EXTENDS: A.BaseCellEditor,

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['options'],

    prototype: {
        EDIT_TEMPLATE: '<div class="' + CSS_CELLEDITOR_EDIT + '"></div>',

        EDIT_OPTION_ROW_TEMPLATE: '<div class="' + CSS_CELLEDITOR_EDIT_OPTION_ROW + '">' +
            '<span class="' + [CSS_CELLEDITOR_EDIT_DD_HANDLE,
            CSS_ICON, CSS_ICON_GRIP_DOTTED_VERTICAL].join(' ') + '"></span>' +
            '<input class="' + CSS_CELLEDITOR_EDIT_INPUT_NAME +
            '" size="7" placeholder="{titleName}" title="{titleName}" type="text" value="{valueName}" /> ' +
            '<input class="' + CSS_CELLEDITOR_EDIT_INPUT_VALUE +
            '" size="7" placeholder="{titleValue}" title="{titleValue}" type="text" value="{valueValue}" /> ' +
            '<a class="' + [CSS_CELLEDITOR_EDIT_LINK,
            CSS_CELLEDITOR_EDIT_DELETE_OPTION].join(' ') + '" href="javascript:void(0);">{remove}</a> ' + '</div>',

        EDIT_ADD_LINK_TEMPLATE: '<a class="' + [CSS_CELLEDITOR_EDIT_LINK, CSS_CELLEDITOR_EDIT_ADD_OPTION].join(
            ' ') + '" href="javascript:void(0);">{addOption}</a> ',
        EDIT_LABEL_TEMPLATE: '<div class="' + CSS_CELLEDITOR_EDIT_LABEL + '">{editOptions}</div>',

        editContainer: null,
        editSortable: null,
        options: null,

        /**
         * Construction logic executed during BaseOptionsCellEditor
         * instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.on('edit', instance._onEditEvent);
            instance.on('save', instance._onSave);
            instance.after('initToolbar', instance._afterInitToolbar);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method addNewOption
         * @param name
         * @param value
         */
        addNewOption: function(name, value) {
            var instance = this;
            var addOptionLink = instance.editContainer.one('.' + CSS_CELLEDITOR_EDIT_ADD_OPTION);

            var newRow = A.Node.create(
                instance._createEditOption(
                    name || '',
                    value || ''
                )
            );

            addOptionLink.placeBefore(newRow);
            newRow.one('input').focus();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method removeOption
         * @param optionRow
         */
        removeOption: function(optionRow) {
            optionRow.remove();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method saveOptions
         */
        saveOptions: function() {
            var instance = this;
            var editContainer = instance.editContainer;

            if (editContainer) {
                var names = editContainer.all('.' + CSS_CELLEDITOR_EDIT_INPUT_NAME);
                var values = editContainer.all('.' + CSS_CELLEDITOR_EDIT_INPUT_VALUE);
                var options = {};

                names.each(function(inputName, index) {
                    var name = inputName.val();
                    var value = values.item(index).val();

                    options[value] = name;
                });

                instance.set('options', options);

                instance._uiSetValue(
                    instance.get('value')
                );

                instance.toggleEdit();
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method toggleEdit
         */
        toggleEdit: function() {
            var instance = this;

            instance.editContainer.toggle();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         * TODO. Rewrite this method.
         *
         * @method _createOptions
         * @param val
         * @protected
         */
        _createOptions: function(val) {
            var instance = this;
            var elements = instance.elements;
            var optionsBuffer = [];
            var wrappersBuffer = [];
            var optionTpl = instance.OPTION_TEMPLATE;
            var optionWrapperTpl = instance.OPTION_WRAPPER;

            A.each(val, function(oLabel, oValue) {
                var values = {
                    id: A.guid(),
                    label: oLabel,
                    name: oValue,
                    value: oValue
                };

                if (optionTpl) {
                    optionsBuffer.push(Lang.sub(optionTpl, values));
                }

                if (optionWrapperTpl) {
                    wrappersBuffer.push(Lang.sub(optionWrapperTpl, values));
                }
            });

            var options = A.NodeList.create(optionsBuffer.join(''));
            var wrappers = A.NodeList.create(wrappersBuffer.join(''));

            if (wrappers.size()) {
                wrappers.each(function(wrapper, i) {
                    wrapper.prepend(options.item(i));
                });

                elements.setContent(wrappers);
            }
            else {
                elements.setContent(options);
            }

            instance.options = options;
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _createEditBuffer
         * @protected
         */
        _createEditBuffer: function() {
            var instance = this;
            var strings = instance.getStrings();
            var buffer = [];

            buffer.push(
                Lang.sub(instance.EDIT_LABEL_TEMPLATE, {
                    editOptions: strings.editOptions
                })
            );

            A.each(instance.get('options'), function(name, value) {
                buffer.push(instance._createEditOption(name, value));
            });

            buffer.push(
                Lang.sub(instance.EDIT_ADD_LINK_TEMPLATE, {
                    addOption: strings.addOption
                })
            );

            return buffer.join('');
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _createEditOption
         * @param name
         * @param value
         * @protected
         */
        _createEditOption: function(name, value) {
            var instance = this;
            var strings = instance.getStrings();

            return Lang.sub(
                instance.EDIT_OPTION_ROW_TEMPLATE, {
                    remove: strings.remove,
                    titleName: strings.name,
                    titleValue: strings.value,
                    valueName: name,
                    valueValue: value
                }
            );
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defInitEditFn
         * @param event
         * @protected
         */
        _defInitEditFn: function() {
            var instance = this;
            var editContainer = A.Node.create(instance.EDIT_TEMPLATE);

            editContainer.delegate('click', A.bind(instance._onEditLinkClickEvent, instance), '.' +
                CSS_CELLEDITOR_EDIT_LINK);
            editContainer.delegate('keydown', A.bind(instance._onEditKeyEvent, instance), 'input');

            instance.editContainer = editContainer;

            instance.setStdModContent(
                WidgetStdMod.BODY,
                editContainer.hide(),
                WidgetStdMod.AFTER
            );

            instance.editSortable = new A.Sortable({
                container: editContainer,
                handles: ['.' + CSS_CELLEDITOR_EDIT_DD_HANDLE],
                nodes: '.' + CSS_CELLEDITOR_EDIT_OPTION_ROW,
                opacity: '.3'
            }).delegate.dd.plug(A.Plugin.DDConstrained, {
                constrain: editContainer,
                stickY: true
            });

            instance._syncEditOptionsUI();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _getSelectedOptions
         * @protected
         */
        _getSelectedOptions: function() {
            var instance = this;
            var options = [];

            instance.options.each(function(option) {
                if (option.get(instance.get('selectedAttrName'))) {
                    options.push(option);
                }
            });

            return A.all(options);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _onEditEvent
         * @param event
         * @protected
         */
        _onEditEvent: function() {
            var instance = this;

            instance._handleInitEditEvent();

            instance.toggleEdit();

            instance._syncEditOptionsUI();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _onEditLinkClickEvent
         * @param event
         * @protected
         */
        _onEditLinkClickEvent: function(event) {
            var instance = this;
            var currentTarget = event.currentTarget;

            if (currentTarget.test('.' + CSS_CELLEDITOR_EDIT_ADD_OPTION)) {
                instance.addNewOption();
            }
            else if (currentTarget.test('.' + CSS_CELLEDITOR_EDIT_HIDE_OPTION)) {
                instance.toggleEdit();
            }
            else if (currentTarget.test('.' + CSS_CELLEDITOR_EDIT_DELETE_OPTION)) {
                instance.removeOption(
                    currentTarget.ancestor('.' + CSS_CELLEDITOR_EDIT_OPTION_ROW)
                );
            }

            event.halt();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _onEditKeyEvent
         * @param event
         * @protected
         */
        _onEditKeyEvent: function(event) {
            var instance = this;
            var currentTarget = event.currentTarget;

            if (event.isKey('return')) {
                var nextInput = currentTarget.next('input');

                if (nextInput) {
                    nextInput.selectText();
                }
                else {
                    instance.addNewOption();
                }

                event.halt();
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _onSave
         * @param event
         * @protected
         */
        _onSave: function() {
            var instance = this;

            instance.saveOptions();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _setOptions
         * @param val
         * @protected
         */
        _setOptions: function(val) {
            var options = {};

            if (isArray(val)) {
                AArray.each(val, function(value) {
                    options[value] = value;
                });
            }
            else if (isObject(val)) {
                options = val;
            }

            return options;
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _syncEditOptionsUI
         * @protected
         */
        _syncEditOptionsUI: function() {
            var instance = this;

            instance.editContainer.setContent(instance._createEditBuffer());
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _uiSetOptions
         * @param val
         * @protected
         */
        _uiSetOptions: function(val) {
            var instance = this;

            instance._createOptions(val);
            instance._uiSetValue(instance.get('value'));
            instance._syncElementsName();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _uiSetValue
         * @param val
         * @protected
         */
        _uiSetValue: function(val) {
            var instance = this;
            var options = instance.options;

            if (options && options.size()) {
                options.set(instance.get('selectedAttrName'), false);

                if (isValue(val)) {
                    if (!isArray(val)) {
                        val = String(val).split(',');
                    }

                    AArray.each(val, function(value) {
                        options.filter('[value="' + Lang.trim(value) + '"]').set(instance.get(
                            'selectedAttrName'), true);
                    });
                }
            }

            return val;
        }
    }
});

A.BaseOptionsCellEditor = BaseOptionsCellEditor;

/**
 * TextCellEditor class.
 *
 * @class A.TextCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TextCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'textCellEditor',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.BaseCellEditor,

    prototype: {
        ELEMENT_TEMPLATE: '<input autocomplete="off" class="' + [CSS_CELLEDITOR_ELEMENT, CSS_FORM_CONTROL].join(' ') +
            '" type="text" />'
    }
});

A.TextCellEditor = TextCellEditor;

/**
 * TextAreaCellEditor class.
 *
 * @class A.TextAreaCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TextAreaCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'textAreaCellEditor',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.BaseCellEditor,

    prototype: {
        ELEMENT_TEMPLATE: '<textarea class="' + [CSS_CELLEDITOR_ELEMENT, CSS_FORM_CONTROL].join(' ') +
            '"></textarea>'
    }
});

A.TextAreaCellEditor = TextAreaCellEditor;

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
