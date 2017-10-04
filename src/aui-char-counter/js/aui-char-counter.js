/**
 * The CharCounter Utility
 *
 * @module aui-char-counter
 */

var L = A.Lang,
    isNumber = L.isNumber,
    isString = L.isString;

    A.Node.DOM_EVENTS.compositionend = 1;
    A.Node.DOM_EVENTS.compositionstart = 1;

/**
 * A base class for CharCounter, providing:
 *
 * - Limit the number of characters allowed in an input box
 * - Display the number of characters left
 *
 * Check the [live demo](http://alloyui.com/examples/char-counter/).
 *
 * @class A.CharCounter
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/char-counter/basic-markup.html
 * @include http://alloyui.com/examples/char-counter/basic.js
 */
var CharCounter = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'char-counter',

    /**
     * Static property used to define the default attribute
     * configuration for the CharCounter.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * ARIA atomic attribute that describes assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.
         *
         * @attribute atomic
         * @default true
         * @type {Boolean}
         */
        atomic: {
            value: true
        },

        /**
         * Node or Selector to display the information of the counter.
         *
         * @attribute counter
         * @default null
         * @type {Node | String}
         */
        counter: {
            setter: A.one
        },

        /**
         * ARIA describedby attribute that describes the current element.
         *
         * @attribute describedby
         * @default ''
         * @type {String}
         */
        describedby: {
            value: ''
        },

        /**
         * Node or Selector for the input field. Required.
         *
         * @attribute input
         * @default null
         * @type {Node | String}
         */
        input: {
            setter: A.one
        },

        /**
         * ARIA live attribute to help assistive technology properly read updates
         * to the number of characters remaining.
         *
         * @attribute live
         * @default 'polite'
         * @type {String}
         */
        live: {
            validator: isString,
            value: 'polite'
        },

        /**
         * Max number of characters the [input](A.CharCounter.html#attr_input)
         * can have.
         *
         * @attribute maxLength
         * @default Infinity
         * @type Number
         */
        maxLength: {
            lazyAdd: false,
            setter: function(v) {
                return this._setMaxLength(v);
            },
            validator: isNumber,
            value: Infinity
        },

        /**
         * Boolean indicating if use of the WAI-ARIA Roles and States
         * should be enabled.
         *
         * @attribute useARIA
         * @default true
         * @type Boolean
         */
        useARIA: {
            value: true,
            validator: L.isBoolean,
            writeOnce: 'initOnly'
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Base,

    prototype: {

        /**
         * Holds the event handles for any bind event from the internal
         * implementation.
         *
         * @property _eventHandles
         * @type {Array}
         * @protected
         */
        _eventHandles: null,

        /**
         * Tracks whether input is being manipulated by an IME tool.
         *
         * @property _inputComposition
         * @type {Boolean}
         * @protected
         */
        _inputComposition: false,

        /**
         * Construction logic executed during CharCounter instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.bindUI();

            instance.checkLength();
        },

        /**
         * Bind the events on the CharCounter UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            var input = instance.get('input');

            instance.publish('maxLength');

            instance.after('maxLengthChange', instance.checkLength);

            if (input) {
                instance._eventHandles = [
                    input.on('compositionend', A.bind(instance._onInputCompositionEnd, instance)),
                    input.on('compositionstart', A.bind(instance._onInputCompositionStart, instance)),
                    // use cross browser input-handler event
                    input.on('input', A.bind(instance._onInputChange, instance))
                ];
            }
        },

        /**
         * Sync the CharCounter UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            var counter = instance.get('counter');
            var useAria = instance.get('useARIA');

            if (counter) {
                var value = instance.get('input').val();

                var counterValue = instance.get('maxLength') - instance._getNormalizedLength(value);

                counter.html(counterValue);
            }

            if (useAria) {
                this._syncAriaControlsUI();
            }
        },

        /**
         * Destructor lifecycle implementation for the `CharCounter` class.
         * Purges events attached to the node (and all child nodes).
         *
         * @method destroy
         * @protected
         */
        destroy: function() {
            var instance = this;

            (new A.EventHandle(instance._eventHandles)).detach();
        },

        /**
         * Check the current value of the
         * [input](A.CharCounter.html#attr_input), truncate the data if needed,
         * and re-sync the UI. Fired from
         * [_onInputChange](A.CharCounter.html#method__onInputChange).
         *
         * @method checkLength
         * @return {Boolean | String} Returns the final value if it was changed.
         *   Otherwise returns either true, when the input value was checked, or
         *   false if there was no input to check the value for.
         */
        checkLength: function() {
            var instance = this;

            var input = instance.get('input');

            var returnValue = false;

            if (input) {
                var maxLength = instance.get('maxLength');
                var value = input.val();

                var normalizedLength = instance._getNormalizedLength(value);

                returnValue = true;

                if (normalizedLength > maxLength) {
                    var scrollTop = input.get('scrollTop');
                    var scrollLeft = input.get('scrollLeft');

                    var trimLength = maxLength - (normalizedLength - value.length);

                    value = value.substring(0, trimLength);

                    input.val(value);

                    input.set('scrollTop', scrollTop);
                    input.set('scrollLeft', scrollLeft);

                    returnValue = value;
                }

                instance.syncUI();

                if (normalizedLength >= maxLength) {
                    instance.fire('maxLength');
                }
            }

            return returnValue;
        },

        /**
         * Normalize reported length between browsers.
         *
         * @method _getNormalizedLength
         * @param {String} value.
         * @protected
         * @return {Number}
         */
        _getNormalizedLength: function(value) {
            var newLines = value.match(/(\r\n|\n|\r)/g);

            var newLinesCorrection = 0;

            if (newLines !== null) {
                newLinesCorrection = newLines.length;
            }

            return value.length + newLinesCorrection;
        },

        /**
         * Fired on input value change.
         *
         * @method _onInputChange
         * @param {EventFacade} event
         * @protected
         */
        _onInputChange: function() {
            var instance = this;

            if (!instance._inputComposition) {
                instance.checkLength();
            }
        },

        /**
         * Fired on input when `compositionend` event occurs.
         *
         * @method _onInputCompositionEnd
         * @param {EventFacade} event
         * @protected
         */
        _onInputCompositionEnd: function() {
            var instance = this;

            instance._inputComposition = false;

            instance.checkLength();
        },

        /**
         * Fired on input when `compositionstart` event occurs.
         *
         * @method _onInputCompositionStart
         * @param {EventFacade} event
         * @protected
         */
        _onInputCompositionStart: function() {
            var instance = this;

            instance._inputComposition = true;
        },

        /**
         * Setter for [maxLength](A.CharCounter.html#attr_maxLength).
         *
         * @method _setMaxLength
         * @param {Number} v Value of the new
         *     [maxLength](A.CharCounter.html#attr_maxLength).
         * @protected
         * @return {Number}
         */
        _setMaxLength: function(v) {
            var instance = this;

            var input = instance.get('input');

            if (input && (v < Infinity)) {
                input.set('maxLength', v);
            }

            return v;
        },

         /**
         * Updates the aria attribute for the component.
         *
         * @method _syncAriaControlsUI
         * @protected
         */
        _syncAriaControlsUI: function() {
            var instance = this;

            instance.plug(
                A.Plugin.Aria,
                {
                    attributes: {
                        describedby: 'describedby',
                    },
                    attributeNode: instance.get('input')
                }
            );

            var describedBy = instance.get('describedby');

            describedBy = A.one('#' + describedBy);

            if (describedBy) {
                var atomic = instance.get('atomic');
                var live = instance.get('live');

                this.aria.setAttributes(
                    [
                        {
                            name: 'atomic',
                            node: describedBy,
                            value: atomic
                        },
                        {
                            name: 'live',
                            node: describedBy,
                            value: live
                        }
                    ]
                );
            }
        }
    }
});

A.CharCounter = CharCounter;
