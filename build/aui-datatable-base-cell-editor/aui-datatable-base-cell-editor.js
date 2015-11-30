YUI.add('aui-datatable-base-cell-editor', function (A, NAME) {

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
 * properties.
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
     * Static property used to define the default attribute configuration for
     * the `A.BaseCellEditor`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The node to constrain the widget's bounding box to, when setting xy.
         * Can also be set to true, to constrain to the viewport.
         *
         * @attribute constrain
         * @type boolean | Node
         * @default true
         */
        constrain: {
            value: true
        },

        /**
         * Indicates if `A.BaseCellEditor` is able to edit a cell's value.
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
         * Defines the `name` of the `A.BaseCellEditor` input.
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
         * Overrides `footerContent`. Defaults to a blank string.
         *
         * Originally defined in `WidgetStdMod`.
         *
         * @attribute footerContent
         * @default ''
         * @type String
         */
        footerContent: {
            value: ''
        },

        /**
         * Indicates if `A.BaseCellEditor` is hidden on the `save` event.
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
         * Set input formatter for HTML display.
         *
         * Default Function replaces line feeds (`[\r\n]`) with `<br>`.
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
         * Set output formatter for data storage.
         *
         * Default Function unescapes HTML Entities as well as replaces `<br>`
         * with line feeds (`\n`).
         *
         * Set attribute `unescapeValue` to 'false' to keep HTML Entities
         * unchanged.
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
         * Indicates if `A.BaseCellEditor` toolbar is shown.
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
         * Collection of strings used to label elements of UI.
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
         * Number defining the `tabindex` of `A.BaseCellEditor` input.
         *
         * @attribute tabIndex
         * @default 1
         * @type Number
         */
        tabIndex: {
            value: 1
        },

        /**
         * Defines the `Toolbar` config for the `A.BaseCellEditor`.
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
         * Indicates whether or not HTML Entities get unescaped on input.
         *
         * See `outputFormatter` for more details.
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
         * Defines the `FormValidator` config for the `A.BaseCellEditor`.
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
         * Stores the input value of `A.BaseCellEditor`.
         *
         * @attribute value
         * @default ''
         * @type String
         */
        value: {
            value: ''
        },

        /**
         * Indicates if `A.BaseCellEditor` is visible.
         *
         * Originally defined in `Widget`.
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
     * Static property used to define the UI attributes.
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
         * Construction logic executed during the `A.BaseCellEditor`
         * instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            this._initEvents();
        },

        /**
         * Destructor lifecycle implementation for the `A.BaseCellEditor` class.
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
         * Bind the events on the `A.BaseCellEditor` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance.get('boundingBox').on('key', A.bind(instance._onEscKey, instance), 'down:27');
        },

        /**
         * Utility method, which calls the passed `inputFormatter` Function,
         * using `val` as an argument.
         *
         * @method formatValue
         * @param {Function} inputFormatter See `inputFormatter` attribute.
         * @param {mixed} val
         * @return {mixed} Formated Value.
         */
        formatValue: function(inputFormatter, val) {
            var instance = this;

            if (A.Lang.isFunction(inputFormatter)) {
                val = inputFormatter.call(instance, val);
            }

            return val;
        },

        /**
         * Gets and formats the `A.BaseCellEditor` input value.
         *
         * @method getValue
         * @return {mixed} Formated Value.
         */
        getValue: function() {
            var instance = this;

            return instance.formatValue(
                instance.get('inputFormatter'),
                instance.getElementsValue()
            );
        },

        /**
         * `publish()` custom events during `initializer`.
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
         * Fires after the `render` event. Initializes validation and toolbar.
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
         * Default callback for the `cancel` event. Hides the `A.BaseCellEditor`.
         *
         * @method _defCancelFn
         * @param {EventFacade} event
         * @protected
         */
        _defCancelFn: function() {
            this.hide();
        },

        /**
         * Default callback for the `initValidator` event. Initializes the
         * `FormValidator` using the config from the `validator`
         * attribute.
         *
         * @method _defInitValidatorFn
         * @param {EventFacade} event
         * @protected
         */
        _defInitValidatorFn: function() {
            this.validator = new A.FormValidator(
                this.get('validator')
            );
        },

        /**
         * Default callback for the `initToolbar` event. Initializes the `Toolbar` using
         * the config from the `toolbar` attribute.
         *
         * @method _defInitToolbarFn
         * @param {EventFacade} event
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
         * Default callback for the `save` event. Conditionally hides the
         * `A.BaseCellEditor` based on the `hideOnSave` attribute.
         *
         * @method _defSaveFn
         * @param {EventFacade} event
         * @protected
         */
        _defSaveFn: function() {
            var instance = this;

            if (instance.get('hideOnSave')) {
                instance.hide();
            }
        },

        /**
         * Fires after the `visibleChange` event. Binds the `mousedown` event.
         *
         * See: `_onDocMouseDownExt` for details.
         *
         * @method _debounceVisibleChange
         * @param {EventFacade} event
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
         * Fires the `click` event.
         *
         * @method _handleCancelEvent
         * @protected
         */
        _handleCancelEvent: function() {
            var instance = this;

            instance.fire('cancel');
        },

        /**
         * Fires the `edit` event.
         *
         * @method _handleEditEvent
         * @protected
         */
        _handleEditEvent: function() {
            var instance = this;

            instance.fire('edit');
        },

        /**
         * Fires the `initEdit` event when the `A.BaseCellEditor` is rendered.
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
         * Fires the `initValidator` event when the `A.BaseCellEditor` is
         * rendered.
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
         * Fires the `initToolbar` event when the `A.BaseCellEditor` is rendered
         * and the toolbar is visible.
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
         * Fires the `save` event when the cell values are valid.
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
         * Fires after the `visibleChange` event binding the mousedown event.
         *
         * @method _onDocMouseDownExt
         * @param {EventFacade} event
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
         * Fires the `keydown` event listener for the esc key.
         *
         * @method _onEscKey
         * @param {EventFacade} event
         * @protected
         */
        _onEscKey: function() {
            var instance = this;

            instance._handleCancelEvent();
        },

        /**
         * Fires the `submit` event.
         *
         * @method _onSubmit
         * @param {EventFacade} event
         * @protected
         */
        _onSubmit: function(event) {
            var validator = event.validator;

            if (validator) {
                validator.formEvent.halt();
            }
        },

        /**
         * Setter for Toolbar attribute.
         *
         * @method _setToolbar
         * @param {Object} val
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
         * Setter for Validator attribute.
         *
         * @method _setValidator
         * @param {Object} val
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
         * Setter for ShowToolbar attribute.
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
         * Gets the `A.BaseCellEditor` input value.
         *
         * NOTE FOR DEVELOPERS: Yoy *may* want to replace the methods from
         * this section on your implementation.
         *
         * @method getElementsValue
         * @return {String} Input value.
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
         * Render the `A.BaseCellEditor` component instance. Lifecycle.
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
         * Default callback for `initEdit` event of `A.BaseCellEditor`.
         *
         * @method _defInitEditFn
         * @param {EventFacade} event
         * @protected
         */
        _defInitEditFn: function() {},

        /**
         * Syncs the element focus.
         *
         * @method _syncElementsFocus
         * @protected
         */
        _syncElementsFocus: function() {
            var instance = this;

            instance.elements.selectText();
        },

        /**
         * Syncs the name attribute of form input.
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
         * Syncs the cell editor focus.
         *
         * @method _syncFocus
         * @protected
         */
        _syncFocus: function() {
            var instance = this;

            A.later(0, instance, instance._syncElementsFocus);
        },

        /**
         * Syncs the name attribute of form input.
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
         * Sets and formats `A.BaseCellEditor` input value.
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


}, '3.0.1', {"requires": ["datatable-base", "overlay"], "skinnable": true});
