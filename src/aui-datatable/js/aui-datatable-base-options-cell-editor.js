var BaseOptionsCellEditor,

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
    CSS_ICON = A.getClassName('glyphicon'),
    CSS_ICON_GRIP_DOTTED_VERTICAL = A.getClassName('glyphicon', 'resize', 'vertical');


/**
 * Abstract class BaseOptionsCellEditor for options attribute support.
 *
 * @class A.BaseOptionsCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
BaseOptionsCellEditor = A.Component.create({

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
            validator: A.Lang.isObject
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
            validator: A.Lang.isString
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
                    label: A.Escape.html(oLabel),
                    name: A.Escape.html(oValue),
                    value: A.Escape.html(oValue)
                };

                if (optionTpl) {
                    optionsBuffer.push(A.Lang.sub(optionTpl, values));
                }

                if (optionWrapperTpl) {
                    wrappersBuffer.push(A.Lang.sub(optionWrapperTpl, values));
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
                A.Lang.sub(instance.EDIT_LABEL_TEMPLATE, {
                    editOptions: strings.editOptions
                })
            );

            A.each(instance.get('options'), function(name, value) {
                buffer.push(instance._createEditOption(name, value));
            });

            buffer.push(
                A.Lang.sub(instance.EDIT_ADD_LINK_TEMPLATE, {
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

            return A.Lang.sub(
                instance.EDIT_OPTION_ROW_TEMPLATE, {
                    remove: strings.remove,
                    titleName: A.Escape.html(strings.name),
                    titleValue: A.Escape.html(strings.value),
                    valueName: A.Escape.html(name),
                    valueValue: A.Escape.html(value)
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
                A.WidgetStdMod.BODY,
                editContainer.hide(),
                A.WidgetStdMod.AFTER
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

            if (A.Lang.isArray(val)) {
                A.Array.each(val, function(value) {
                    options[value] = value;
                });
            }
            else if (A.Lang.isObject(val)) {
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

                if (A.Lang.isValue(val)) {
                    if (!A.Lang.isArray(val)) {
                        val = String(val).split(',');
                    }

                    A.Array.each(val, function(value) {
                        options.filter('[value="' + A.Escape.html(A.Lang.trim(value)) + '"]').set(instance.get(
                            'selectedAttrName'), true);
                    });
                }
            }

            return val;
        }
    }
});

A.BaseOptionsCellEditor = BaseOptionsCellEditor;
