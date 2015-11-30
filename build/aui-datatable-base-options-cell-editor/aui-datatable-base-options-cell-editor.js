YUI.add('aui-datatable-base-options-cell-editor', function (A, NAME) {

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
     * Static property used to define the UI attributes.
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
         * Saves the `BaseOptionsCellEditor` options.
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
         * Toggles the display of the `A.BaseOptionsCellEditor`.
         *
         * @method toggleEdit
         */
        toggleEdit: function() {
            var instance = this;

            instance.editContainer.toggle();
        },

        /**
         * Create UI options values.
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
            var strings = instance.getStrings();

            return L.sub(
                instance.EDIT_OPTION_ROW_TEMPLATE, {
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
         * @param {Object} val
         * @protected
         */
        _uiSetOptions: function(val) {
            var instance = this;

            instance._createOptions(val);
            instance._uiSetValue(instance.get('value'));
            instance._syncElementsName();
        },

        /**
         * Sets the `A.BaseOptionsCellEditor` option values.
         *
         * @method _uiSetValue
         * @param {Array} val
         * @protected
         * @return {Array} Resulting new values.
         */
        _uiSetValue: function(val) {
            var instance = this;
            var options = instance.options;

            if (options && options.size()) {
                options.set(instance.get('selectedAttrName'), false);

                if (L.isValue(val)) {
                    if (!L.isArray(val)) {
                        val = String(val).split(',');
                    }

                    A.Array.each(val, function(value) {
                        options.filter('[value="' + AEscape.html(L.trim(value)) + '"]').set(instance.get(
                            'selectedAttrName'), true);
                    });
                }
            }

            return val;
        }
    }
});

A.BaseOptionsCellEditor = BaseOptionsCellEditor;


}, '3.0.1', {"requires": ["aui-datatable-base-cell-editor", "escape"]});
