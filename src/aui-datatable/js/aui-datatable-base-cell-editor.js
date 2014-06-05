var BaseCellEditor,
    REGEX_BR = /<br\s*\/?>/gi,
    REGEX_NL = /[\r\n]/g,
    TPL_BR = '<br/>';

/**
 * Abstract class BaseCellEditor.
 *
 * @class A.BaseCellEditor
 * @extends Overlay
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
BaseCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'baseCellEditor',

    /**
     * Static property used to define the default attribute
     * configuration for the BaseCellEditor.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute editable
         * @default false
         * @type Boolean
         */
        editable: {
            value: false,
            validator: A.Lang.isBoolean
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute elementName
         * @default 'value'
         * @type String
         */
        elementName: {
            value: 'value',
            validator: A.Lang.isString
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute footerContent
         * @default ''
         * @type String
         */
        footerContent: {
            value: ''
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute hideOnSave
         * @default true
         * @type Boolean
         */
        hideOnSave: {
            value: true,
            validator: A.Lang.isBoolean
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute inputFormatter
         * @type Function
         */
        inputFormatter: {
            value: function(val) {
                if (A.Lang.isString(val)) {
                    val = val.replace(REGEX_NL, TPL_BR);
                }

                return val;
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
                var instance = this;

                if (A.Lang.isString(val)) {
                    if (instance.get('unescapeValue')) {
                        val = A.Lang.String.unescapeEntities(val);
                    }

                    val = val.replace(REGEX_BR, 'n');
                }

                return val;
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute showToolbar
         * @default true
         * @type Boolean
         */
        showToolbar: {
            value: true,
            validator: A.Lang.isBoolean
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            value: {
                edit: 'Edit',
                save: 'Save',
                cancel: 'Cancel'
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute tabIndex
         * @default 1
         * @type Number
         */
        tabIndex: {
            value: 1
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute toolbar
         * @default null
         * @type Object
         */
        toolbar: {
            setter: '_setToolbar',
            validator: A.Lang.isObject,
            value: null
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute unescapeValue
         * @default true
         * @type Boolean
         */
        unescapeValue: {
            value: true,
            validator: A.Lang.isBoolean
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute validator
         * @default null
         * @type Object
         */
        validator: {
            setter: '_setValidator',
            validator: A.Lang.isObject,
            value: null
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute value
         * @default ''
         * @type String
         */
        value: {
            value: ''
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute visible
         * @default false
         * @type Boolean
         */
        visible: {
            value: false
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Overlay,

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['editable', 'showToolbar', 'value'],

    prototype: {
        CONTENT_TEMPLATE: '<form></form>',
        ELEMENT_TEMPLATE: null,

        elements: null,
        validator: null,

        _hDocMouseDownEv: null,

        /**
         * Construction logic executed during BaseCellEditor instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            this._initEvents();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request. Lifecycle.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var hDocMouseDown = this._hDocMouseDownEv,
                toolbar = this.toolbar,
                validator = this.validator;

            if (hDocMouseDown) {
                hDocMouseDown.detach();
            }

            if (toolbar) {
                toolbar.destroy();
            }

            if (validator) {
                validator.destroy();
            }
        },

        /**
         * Bind the events on the BaseCellEditor UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance.get('boundingBox').on('key', A.bind(instance._onEscKey, instance), 'down:27');
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method formatValue
         * @param formatter
         * @param val
         */
        formatValue: function(formatter, val) {
            var instance = this;

            if (A.Lang.isFunction(formatter)) {
                val = formatter.call(instance, val);
            }

            return val;
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method getValue
         */
        getValue: function() {
            var instance = this;

            return instance.formatValue(
                instance.get('inputFormatter'),
                instance.getElementsValue()
            );
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _initEvents
         * @protected
         */
        _initEvents: function() {
            var instance = this;

            instance.publish({
                cancel: {
                    defaultFn: instance._defCancelFn
                },

                initEdit: {
                    defaultFn: instance._defInitEditFn,
                    fireOnce: true
                },

                initValidator: {
                    defaultFn: instance._defInitValidatorFn,
                    fireOnce: true
                },

                initToolbar: {
                    defaultFn: instance._defInitToolbarFn,
                    fireOnce: true
                },

                save: {
                    defaultFn: instance._defSaveFn
                }
            });

            instance.after({
                render: instance._afterRender,
                visibleChange: A.debounce(instance._debounceVisibleChange, 350, instance)
            });

            instance.on({
                'form-validator:submit': A.bind(instance._onSubmit, instance)
            });
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _afterRender
         * @protected
         */
        _afterRender: function() {
            var instance = this;

            instance._handleInitValidatorEvent();
            instance._handleInitToolbarEvent();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defCancelFn
         * @param event
         * @protected
         */
        _defCancelFn: function() {
            this.hide();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defInitValidatorFn
         * @param event
         * @protected
         */
        _defInitValidatorFn: function() {
            this.validator = new A.FormValidator(
                this.get('validator')
            );
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defInitToolbarFn
         * @param event
         * @protected
         */
        _defInitToolbarFn: function() {
            var instance = this;
            var editable = instance.get('editable');

            instance.toolbar = new A.Toolbar(
                instance.get('toolbar')
            ).render(instance.footerNode);

            if (editable) {
                instance._uiSetEditable(editable);
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defSaveFn
         * @param event
         * @protected
         */
        _defSaveFn: function() {
            var instance = this;

            if (instance.get('hideOnSave')) {
                instance.hide();
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _debounceVisibleChange
         * @param event
         * @protected
         */
        _debounceVisibleChange: function(event) {
            var instance = this;
            var hDocMouseDown = instance._hDocMouseDownEv;

            if (event.newVal) {
                if (!hDocMouseDown) {
                    instance._hDocMouseDownEv = A.getDoc().on('mousedown', A.bind(instance._onDocMouseDownExt,
                        instance));
                }
            }
            else if (hDocMouseDown) {
                hDocMouseDown.detach();
                instance._hDocMouseDownEv = null;
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _handleCancelEvent
         * @protected
         */
        _handleCancelEvent: function() {
            var instance = this;

            instance.fire('cancel');
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _handleEditEvent
         * @protected
         */
        _handleEditEvent: function() {
            var instance = this;

            instance.fire('edit');
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _handleInitEditEvent
         * @protected
         */
        _handleInitEditEvent: function() {
            var instance = this;

            if (instance.get('rendered')) {
                this.fire('initEdit');
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _handleInitValidatorEvent
         * @protected
         */
        _handleInitValidatorEvent: function() {
            var instance = this;

            if (instance.get('rendered')) {
                this.fire('initValidator');
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _handleInitToolbarEvent
         * @protected
         */
        _handleInitToolbarEvent: function() {
            var instance = this;

            if (instance.get('rendered') && instance.get('showToolbar')) {
                this.fire('initToolbar');
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _handleSaveEvent
         * @protected
         */
        _handleSaveEvent: function() {
            var instance = this;

            if (!instance.validator.hasErrors()) {
                instance.fire('save', {
                    newVal: instance.getValue(),
                    prevVal: instance.get('value')
                });
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _onDocMouseDownExt
         * @param event
         * @protected
         */
        _onDocMouseDownExt: function(event) {
            var instance = this;
            var boundingBox = instance.get('boundingBox');

            if (!boundingBox.contains(event.target)) {
                instance.set('visible', false);
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _onEscKey
         * @param event
         * @protected
         */
        _onEscKey: function() {
            var instance = this;

            instance.hide();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _onSubmit
         * @param event
         * @protected
         */
        _onSubmit: function(event) {
            var validator = event.validator;

            if (validator) {
                validator.formEvent.halt();
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _setToolbar
         * @param val
         * @protected
         */
        _setToolbar: function(val) {
            var instance = this;
            var strings = instance.getStrings();

            return A.merge({
                activeState: false,
                children: [
                    [
                        {
                            on: {
                                click: A.bind(instance._handleSaveEvent, instance)
                            },
                            label: strings.save,
                            icon: 'glyphicon glyphicon-ok-sign'
                        },
                        {
                            on: {
                                click: A.bind(instance._handleCancelEvent, instance)
                            },
                            label: strings.cancel
                        }
                    ]
                ]
            }, val);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _setValidator
         * @param val
         * @protected
         */
        _setValidator: function(val) {
            var instance = this;

            return A.merge({
                    boundingBox: instance.get('contentBox'),
                    bubbleTargets: instance
                },
                val
            );
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _uiSetShowToolbar
         * @param val
         * @protected
         */
        _uiSetShowToolbar: function(val) {
            var instance = this;
            var footerNode = instance.footerNode;

            if (val) {
                footerNode.show();
            }
            else {
                footerNode.hide();
            }

            instance._handleInitToolbarEvent();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * NOTE FOR DEVELOPERS: Yoy *may* want to replace the methods from
         * this section on your implementation.
         *
         * @method getElementsValue
         */
        getElementsValue: function() {
            var instance = this;
            var elements = instance.elements;

            if (elements) {
                return elements.get('value');
            }

            return '';
        },

        /**
         * Render the BaseCellEditor component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            if (instance.ELEMENT_TEMPLATE) {
                instance.elements = A.Node.create(instance.ELEMENT_TEMPLATE);

                instance._syncElementsName();

                instance.setStdModContent(A.WidgetStdMod.BODY, instance.elements);
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _defInitEditFn
         * @param event
         * @protected
         */
        _defInitEditFn: function() {},

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _syncElementsFocus
         * @protected
         */
        _syncElementsFocus: function() {
            var instance = this;

            instance.elements.selectText();
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _syncElementsName
         * @protected
         */
        _syncElementsName: function() {
            var instance = this;

            instance.elements.setAttribute(
                'name',
                instance.get('elementName')
            );
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _syncFocus
         * @protected
         */
        _syncFocus: function() {
            var instance = this;

            A.later(0, instance, instance._syncElementsFocus);
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _uiSetEditable
         * @param val
         * @protected
         */
        _uiSetEditable: function(val) {
            var instance = this;
            var toolbar = instance.toolbar;

            if (instance.get('rendered') && toolbar) {
                if (val) {
                    toolbar.add(
                        [
                            {
                                icon: 'glyphicon glyphicon-edit',
                                label: instance.getString('edit'),
                                on: {
                                    click: A.bind(instance._handleEditEvent, instance)
                                }
                            }
                        ], 1
                    );
                }
                else {
                    toolbar.remove(1);
                }
            }
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
            var elements = instance.elements;

            if (elements) {
                elements.val(
                    instance.formatValue(instance.get('outputFormatter'), val)
                );
            }
        }
    }
});

A.BaseCellEditor = BaseCellEditor;
