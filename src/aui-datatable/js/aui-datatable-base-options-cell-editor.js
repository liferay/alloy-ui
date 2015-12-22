var BaseOptionsCellEditor,

    L = A.Lang,

    AEscape = A.Escape,

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
 * Abstract class `A.BaseOptionsCellEditor` for options attribute support.
 *
 * @class A.BaseOptionsCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 * properties.
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
     * Static property used to define the default attribute configuration
     * for the `A.BaseOptionsCellEditor`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Static property of input formatter for modifying the data values
         * for showing on the UI.
         *
         * Default `null` Function will not modify the value.
         *
         * @attribute inputFormatter
         * @default null
         */
        inputFormatter: {
            value: null
        },

        /**
         * Indicates if the options Edit Container is hidden on the `save` event.
         *
         * @attribute hideEditContainerOnSave
         * @default true
         * @type Boolean
         */
        hideEditContainerOnSave: {
            value: true,
            validator: A.Lang.isBoolean
        },

        /**
         * Array or Object which defines the available options for the
         * `A.BaseOptionsCellEditor`.
         *
         * @attribute options
         * @default {}
         * @type Object|Array
         */
        options: {
            setter: '_setOptions',
            value: {},
            validator: L.isObject
        },

        /**
         * Defines the custom rules used to validate options.
         *
         * @attribute optionsValidatorCustomRules
         * @type Object
         */
        optionsValidatorCustomRules: {
            validator: A.Lang.isObject,
            valueFn: function() {
                var instance = this;

                return {
                    'uniqueValue': {
                        condition: function(fieldValue, fieldNode) {
                            var instance = this;

                            var editContainerNode = fieldNode.ancestor('.' + CSS_CELLEDITOR_EDIT);

                            var inputValueNodelist = editContainerNode.all('.' + CSS_CELLEDITOR_EDIT_INPUT_VALUE);

                            var validate = function (validateNode, nodelist, recurse) {
                                var duplicates = false;

                                nodelist.each(
                                    function(node){
                                        if (validateNode !== node) {
                                            if (validateNode.val() === node.val()) {
                                                instance.highlight(validateNode);
                                                instance.addFieldError(validateNode, 'uniqueValue');

                                                duplicates = true;
                                            }

                                            if (recurse) {
                                                validate(node, inputValueNodelist, false);
                                            }
                                        }
                                    }
                                );

                                if (!duplicates) {
                                    instance.resetField(validateNode);
                                    instance.highlight(validateNode, true);
                                }

                                return !duplicates;
                            };

                            return validate(fieldNode, inputValueNodelist, true);
                        },
                        errorMessage: instance.getStrings().valueNotUnique
                    }
                };
            }
        },

        /**
         * Defines the initial rules used to validate options.
         *
         * @attribute optionsValidatorInputRules
         * @default {custom: true, uniqueValue: true}
         * @type Object
         */
        optionsValidatorInputRules: {
            validator: A.Lang.isObject,
            value: {
                custom: true,
                uniqueValue: true
            }
        },

        /**
         * Static property of output formatter for modifying the data values
         * for output.
         *
         * Default `null` Function will not modify the value.
         *
         * @attribute outputFormatter
         * @default null
         */
        outputFormatter: {
            value: null
        },

        /**
         * Defines the selected state of an option.
         *
         * @attribute selectedAttrName
         * @default 'selected'
         * @type String
         */
        selectedAttrName: {
            value: 'selected',
            validator: L.isString
        },

        /**
         * Collection of strings used to label elements of UI.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            value: {
                add: 'Add',
                addOption: 'Add option',
                cancel: 'Cancel',
                edit: 'Edit options',
                editOptions: 'Edit option(s)',
                name: 'Name',
                optionName: 'Option Name',
                optionValue: 'Option Value',
                remove: 'Remove',
                save: 'Save',
                stopEditing: 'Stop editing',
                value: 'Value',
                valueNotUnique: 'Value not unique.'
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
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['options'],

    prototype: {
        EDIT_TEMPLATE: '<div class="' + CSS_CELLEDITOR_EDIT + '"></div>',

        EDIT_OPTION_ROW_TEMPLATE: '<div class="form-inline ' + CSS_CELLEDITOR_EDIT_OPTION_ROW + '">' +
                '<div class="form-group">' +
                    '<span class="' + [CSS_CELLEDITOR_EDIT_DD_HANDLE, CSS_ICON, CSS_ICON_GRIP_DOTTED_VERTICAL].join(' ') + '"></span>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="sr-only" for="{optionValueName}_name">{labelOptionName}</label>' +
                    '<input class="' + CSS_CELLEDITOR_EDIT_INPUT_NAME + ' form-control input-sm" size="7" id="{optionValueName}_name"' +
                    'placeholder="{titleName}" title="{titleName}" type="text" value="{valueName}" /> ' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="sr-only" for="{optionValueName}">{labelOptionValue}</label>' +
                    '<input class="' + CSS_CELLEDITOR_EDIT_INPUT_VALUE + ' form-control input-sm" id="{optionValueName}"' +
                    ' name="{optionValueName}" placeholder="{titleValue}" size="7" title="{titleValue}" type="text" value="{valueValue}" /> ' +
                '</div>' +
                '<div class="form-group">' +
                    '<button aria-label="{remove}" class="close ' + [CSS_CELLEDITOR_EDIT_LINK, CSS_CELLEDITOR_EDIT_DELETE_OPTION].join(' ') +
                    '" type="button"><span aria-hidden="true">&times;</span></button>' +
                '</div>' +
            '</div>' +
        '</div>',

        EDIT_ADD_LINK_TEMPLATE: '<div class="form-group"><a class="' + [CSS_CELLEDITOR_EDIT_LINK, CSS_CELLEDITOR_EDIT_ADD_OPTION].join(
            ' ') + '" href="javascript:void(0);">{addOption}</a></div> ',
        EDIT_LABEL_TEMPLATE: '<div class="' + CSS_CELLEDITOR_EDIT_LABEL + '">{editOptions}</div>',

        editContainer: null,
        editSortable: null,
        options: null,

        /**
         * Construction logic executed during `A.BaseOptionsCellEditor`
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

            A.FormValidator.addCustomRules(instance.get('optionsValidatorCustomRules'));
        },

        /**
         * Adds a new option to the `A.BaseOptionsCellEditor`.
         *
         * If `name` or `value` is omitted, a blank string is used in it's
         * place.
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
         * Removes the given `optionRow` Node from `A.BaseOptionsCellEditor`.
         *
         * @method removeOption
         * @param optionRow
         */
        removeOption: function(optionRow) {
            optionRow.remove();
        },

        /**
         * Saves the `BaseOptionsCellEditor` `options` property.
         *
         * @method saveOptions
         */
        saveOptions: function() {
            var instance = this;
            var editContainer = instance.editContainer;

            if (editContainer && !editContainer.hasAttribute('hidden')) {
                var names = editContainer.all('.' + CSS_CELLEDITOR_EDIT_INPUT_NAME);
                var values = editContainer.all('.' + CSS_CELLEDITOR_EDIT_INPUT_VALUE);
                var options = {};

                names.each(function(inputName, index) {
                    var name = inputName.val();
                    var value = values.item(index).val();

                    options[value] = name;
                });

                instance.set('options', options);

                if (instance.get('hideEditContainerOnSave')) {
                    instance.toggleEdit();
                }
            }
        },

        /**
         * Toggles the display of the `A.BaseOptionsCellEditor`.
         *
         * @method toggleEdit
         */
        toggleEdit: function() {
            var instance = this;

            instance.editContainer.toggle();
        },

        /**
         * Creates option elements and stores a reference to them in
         * the `option` property.
         * TODO. Rewrite this method.
         *
         * @method _createOptions
         * @param {Array} val
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
                    label: AEscape.html(oLabel),
                    name: AEscape.html(oValue),
                    value: AEscape.html(oValue)
                };

                if (optionTpl) {
                    optionsBuffer.push(L.sub(optionTpl, values));
                }

                if (optionWrapperTpl) {
                    wrappersBuffer.push(L.sub(optionWrapperTpl, values));
                }
            });

            var optionsNodeList = A.NodeList.create(optionsBuffer.join(''));
            var wrappersNodeList = A.NodeList.create(wrappersBuffer.join(''));

            if (wrappersNodeList.size()) {
                wrappersNodeList.each(function(wrapper, i) {
                    wrapper.prepend(optionsNodeList.item(i));
                });

                elements.setContent(wrappersNodeList);
            }
            else {
                elements.setContent(optionsNodeList);
            }

            instance.options = optionsNodeList;
        },

        /**
         * Create edit buffer.
         *
         * @method _createEditBuffer
         * @protected
         * @return {String} HTML string for the `A.BaseOptionsCellEditor`.
         */
        _createEditBuffer: function() {
            var instance = this;
            var strings = instance.getStrings();
            var buffer = [];

            buffer.push(
                L.sub(instance.EDIT_LABEL_TEMPLATE, {
                    editOptions: strings.editOptions
                })
            );

            A.each(instance.get('options'), function(name, value) {
                buffer.push(instance._createEditOption(name, value));
            });

            buffer.push(
                L.sub(instance.EDIT_ADD_LINK_TEMPLATE, {
                    addOption: strings.addOption
                })
            );

            return buffer.join('');
        },

        /**
         * Create Edit option.
         *
         * @method _createEditOption
         * @param {String} name
         * @param {String} value
         * @protected
         * @return {String} HTML string for the `A.BaseOptionsCellEditor` input
         * option.
         */
        _createEditOption: function(name, value) {
            var instance = this;
            var fieldName = A.guid() + '_value';
            var strings = instance.getStrings();

            instance.validator.get('rules')[fieldName] = instance.get('optionsValidatorInputRules');

            return L.sub(
                instance.EDIT_OPTION_ROW_TEMPLATE, {
                    labelOptionName: AEscape.html(strings.optionName),
                    labelOptionValue: AEscape.html(strings.optionValue),
                    optionValueName: AEscape.html(fieldName),
                    remove: strings.remove,
                    titleName: AEscape.html(strings.name),
                    titleValue: AEscape.html(strings.value),
                    valueName: AEscape.html(name),
                    valueValue: AEscape.html(value)
                }
            );
        },

        /**
         * Default callback for `initEdit` event of `A.BaseOptionsCellEditor`.
         *
         * @method _defInitEditFn
         * @param {EventFacade} event
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
         * Getter for the selected options.
         *
         * @method _getSelectedOptions
         * @protected
         * @return {NodeList} Selected options.
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
         * Fires on `edit` event, loading the editing UI.
         *
         * @method _onEditEvent
         * @param {EventFacade} event
         * @protected
         */
        _onEditEvent: function() {
            var instance = this;

            instance._handleInitEditEvent();

            instance.toggleEdit();

            instance._syncEditOptionsUI();
        },

        /**
         * Updates the option state on the UI on event `click` on the edit link.
         *
         * @method _onEditLinkClickEvent
         * @param {EventFacade} event
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
         * Listen to `keydown` event on `A.BaseOptionsCellEditor` to focus on
         * the next option.
         *
         * @method _onEditKeyEvent
         * @param {EventFacade} event
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
         * Fires on `save` event. Save the options.
         *
         * @method _onSave
         * @param {EventFacade} event
         * @protected
         */
        _onSave: function() {
            var instance = this;

            instance.saveOptions();
        },

        /**
         * Determines the proper format for the `options` attribute.
         *
         * @method _setOptions
         * @param {Array} val
         * @protected
         */
        _setOptions: function(val) {
            var options = {};

            if (L.isArray(val)) {
                A.Array.each(val, function(value) {
                    options[value] = value;
                });
            }
            else if (L.isObject(val)) {
                options = val;
            }

            return options;
        },

        /**
         * Sync edit options UI.
         *
         * @method _syncEditOptionsUI
         * @protected
         */
        _syncEditOptionsUI: function() {
            var instance = this;

            instance.editContainer.setContent(instance._createEditBuffer());
        },

        /**
         * Set UI Options values.
         *
         * @method _uiSetOptions
         * @param {Array} val
         * @protected
         */
        _uiSetOptions: function(val) {
            var instance = this;

            instance._createOptions(val);
            instance._uiSetValue(instance.get('value'));
            instance._syncElementsName();
        },

        /**
         * Sets the `selectedAttrName` (`selected`) attribute on the option
         * elements matching `val`.
         *
         * @method _uiSetValue
         * @param {Array|String} val
         * @protected
         * @return {Array} Resulting new values.
         */
        _uiSetValue: function(val) {
            var instance = this;

            var optionsNodeList = instance.options;

            if (optionsNodeList && optionsNodeList.size()) {
                optionsNodeList.set(instance.get('selectedAttrName'), false);

                if (L.isValue(val)) {
                    if (!L.isArray(val)) {
                        val = String(val).split(',');
                    }

                    A.Array.each(val, function(value) {
                        optionsNodeList.filter('[value="' + AEscape.html(L.trim(value)) + '"]').set(instance.get(
                            'selectedAttrName'), true);
                    });
                }
            }

            return val;
        }
    }
});

A.BaseOptionsCellEditor = BaseOptionsCellEditor;
