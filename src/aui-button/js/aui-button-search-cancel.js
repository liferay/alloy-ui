var Lang = A.Lang,

    _DOCUMENT = A.one(A.config.doc),
    _NAME = 'btn-search-cancel',

    BODY = 'body',
    CLICK = 'click',
    CONTAINER = 'container',
    FOCUS = 'focus',
    GUTTER = 'gutter',
    ICON_CLASS = 'iconClass',
    INPUT = 'input',
    REGION = 'region',
    REMOVE = 'remove',
    TRIGGER = 'trigger',
    Z_INDEX = 'zIndex';

/**
 *
 * A base class for ButtonSearchCancel, providing:
 * <ul>
 *    <li>Adds a button search cancel icon in order to clear the text on inputs
 *    and textareas. Similar behavior of the HTML5 search input that contains a
 *    cancel button to clear the current element value.</li>
 * </ul>
 *
 * @class A.ButtonSearchCancel
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var ButtonSearchCancel = A.Base.create(_NAME, A.Base, [],
    {
        /**
         * HTML template used on the button search cancel.
         *
         * @property TEMPLATE
         * @type String
         * @default '<i class="btn-search-cancel icon-remove" />'
         * @protected
         */
        TEMPLATE: '<div class="' + A.getClassName(_NAME) + '" style="padding: 5px; position: absolute; z-index: {zIndex};">' +
                    '<i class="{iconClass}"></i>' +
                  '</div>',

        /**
         * Array that holds the created buttons for each element match from
         * the trigger selector.
         *
         * @property _buttons
         * @type Array
         * @protected
         */
        _buttons: null,

        /**
         * Array that holds the event handles for any bind event from the
         * internal implementation.
         *
         * @property _eventHandles
         * @type Array
         * @protected
         */
        _eventHandles: null,

        /**
         * Construction logic executed during CharCounter instantiation.
         * Lifecycle.
         *
         * @method initializer
         */
        initializer: function() {
            var instance = this;

            instance._buttons = [];

            instance.bindDelegateUI();
        },

        /**
         * Destructor lifecycle implementation for the AutosizeIframe class.
         * Lifecycle.
         *
         * @method destroy
         */
        destroy: function() {
            var instance = this;

            A.Array.invoke(instance._buttons, REMOVE);
            (new A.EventHandle(instance._eventHandles)).detach();
        },

        /**
         * Delegate events on the UI. Lifecycle.
         *
         * @method bindDelegateUI
         */
        bindDelegateUI: function() {
            var instance = this,
                container = instance.get(CONTAINER),
                trigger = instance.get(TRIGGER);

            instance._eventHandles = [
                container.delegate(
                    [FOCUS, INPUT],
                    A.debounce(instance._onUserInteraction, 50, instance), trigger)
            ];
        },

        /**
         * Delegate events on the UI. Lifecycle.
         *
         * @method getButtonForElement
         * @param {Node} element Input or textarea element align the created
         * button.
         * @return {Node} Button node.
         */
        getButtonForElement: function(element) {
            var instance = this,
                button = element.getData(_NAME);

            if (!button) {
                button = A.Node.create(
                    A.Lang.sub(
                        instance.TEMPLATE,
                        {
                            iconClass: instance.get(ICON_CLASS),
                            zIndex: instance.get(Z_INDEX)
                        }));

                element.setData(_NAME, button);
                instance._buttons.push(button.hide());
                button.on(CLICK, instance._onButtonClick, instance, element);
            }

            return button;
        },

        /**
         * Fires when the user clicks on the cancel search button.
         *
         * @method _onButtonClick
         * @protected
         */
        _onButtonClick: function(event, element) {
            var instance = this;

            instance._syncButtonUI(element.val('').focus());
        },

        /**
         * Fires when the user focus or input value on the host element.
         *
         * @method _onUserInteraction
         * @protected
         */
        _onUserInteraction: function(event) {
            var instance = this;

            instance._syncButtonUI(event.target);
        },

        /**
         * Position the cancel search button and aligns it with the passed
         * <code>element</code>.
         *
         * @method _syncButtonUI
         * @param {Node} element Input or textarea element align the created
         * button.
         * @protected
         */
        _syncButtonUI: function(element) {
            var instance = this,
                button = instance.getButtonForElement(element),
                gutter,
                buttonRegion,
                elementRegion;

            if (!element.val()) {
                button.hide();
                return;
            }

            A.one(BODY).append(button.show());
            gutter = instance.get(GUTTER);
            buttonRegion = button.get(REGION);
            elementRegion = element.get(REGION);

            button.setXY([
                elementRegion.right - buttonRegion.width + gutter[0],
                elementRegion.top + elementRegion.height/2 - buttonRegion.height/2 + gutter[1] ]);
        }
    },
    {
        ATTRS: {
            /**
             * The container of Toggler Delegate instance.
             *
             * @attribute container
             */
            container: {
                setter: A.one,
                value: _DOCUMENT,
                writeOnce: true
            },

            /**
             * Gutter values are added to the x and y alignment values of the
             * button search cancel. They can be utilized as a padding in case
             * the user needs a different alignment.
             *
             * @attribute gutter
             * @default [-5, 0]
             * @type Array
             */
            gutter: {
                value: [-5, 0]
            },

            /**
             * Icon css class to be used on the search cancel button.
             *
             * @attribute iconClass
             * @default 'icon-remove'
             * @type String
             */
            iconClass: {
                validator: Lang.isString,
                value: 'icon-remove'
            },

            /**
             * Selector to the button search cancel be applied. Supports single
             * or multiple node selector.
             *
             * @attribute trigger
             * @type String
             */
            trigger: {
                validator: Lang.isString,
                writeOnce: true
            },

            /**
             * Button search cancel z-index.
             *
             * @attribute zIndex
             * @default 2
             * @type Number
             */
            zIndex: {
                value: 2,
                writeOnce: true
            }
        }
    }
);

A.ButtonSearchCancel = ButtonSearchCancel;