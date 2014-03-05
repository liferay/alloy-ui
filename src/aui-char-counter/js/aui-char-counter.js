/**
 * The CharCounter Utility
 *
 * @module aui-char-counter
 */

var E = A.Env,
    L = A.Lang,
    isNumber = L.isNumber,

    CHAR_COUNTER = 'char-counter',
    COUNTER = 'counter',
    INPUT = 'input',
    MAX_LENGTH = 'maxLength',
    SCROLL_LEFT = 'scrollLeft',
    SCROLL_TOP = 'scrollTop';

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
    NAME: CHAR_COUNTER,

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
            value: Infinity,
            validator: isNumber
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
         * Boolean value to indicate if we want to correct the character counting with multiple letters.
         *
         * @attribute multiLettersCorrection
         * @default false
         * @type {Boolean}
         */
        multiLettersCorrection: false,

        /**
         * Configuration array for multi letters characters to display real-world alphabetical characters instead of
         * the computer characters.
         *
         * @property multiLetters
         * @type Array
         * @protected
         */
        multiLetters: null,

        /**
         * Event handler for the input [aui-event](../modules/aui-event.html)
         * event.
         *
         * @property handler
         * @type EventHandle
         * @protected
         */
        handler: null,

        /**
         * Construction logic executed during CharCounter instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @param config
         * @protected
         */
        initializer: function(config) {
            var instance = this;
            instance.multiLetters = config.multiLetters || (E.lang[A.config.lang] && E.lang[A.config.lang].multiLetters);
            if (config.multiLetters) {
                instance.multiLettersCorrection = true;
            }
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
            var input = instance.get(INPUT);

            instance.publish('maxLength');

            instance.after('maxLengthChange', instance.checkLength);

            if (input) {
                // use cross browser input-handler event
                instance.handler = input.on(INPUT, A.bind(instance._onInputChange, instance));
            }
        },

        /**
         *
         * @method _getMultiLettersLength
         * @param {String} v A string to check the length and correct with the muliple-letters.
         * @returns {Number}
         * @private
         */
        _getMultiLettersLength: function (v) {
            var instance = this;
            var multiLetters = instance.multiLetters;
            var i = multiLetters && multiLetters.length;
            var len;
            var m;

            v = v || instance.get(INPUT).val();
            len = v.length;

            while (i) {
                i-=1;
                if (multiLetters[i]) {
                    m = v.match(multiLetters[i]);
                    if (m) {
                        len -= (i * m.length);
                        v = v.replace(multiLetters[i], '');
                    }
                }
            }
            return len;
        },

        /**
         * Return with the length of the input value. If the multiLettersCorrection is on (TRUE) then the real length
         * will be corrected with the multi-letters.
         *
         * @method getValueLength
         * @param {String} v A string to check the length.
         * @protected
         */
        getValueLength: function (v) {
            var instance = this;

            v = v || instance.get(INPUT).val();
            return instance.multiLettersCorrection ? instance._getMultiLettersLength(v) : v.length;
        },

        /**
         * Sync the CharCounter UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;
            var counter = instance.get(COUNTER);
            var length;

            if (counter) {
                length = instance.getValueLength();
                counter.html(
                    instance.get(MAX_LENGTH) - length
                );
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

            if (instance.handler) {
                instance.handler.detach();
            }
        },

        /**
         * Check the current value of the
         * [input](A.CharCounter.html#attr_input), truncate the data if needed,
         * and re-sync the UI. Fired from
         * [_onInputChange](A.CharCounter.html#method__onInputChange).
         *
         * @method checkLength
         */
        checkLength: function() {
            var instance = this;
            var input = instance.get(INPUT);
            var maxLength = instance.get(MAX_LENGTH);

            if (!input) {
                return false; // NOTE: return
            }

            var value = input.val();
            var scrollTop = input.get(SCROLL_TOP);
            var scrollLeft = input.get(SCROLL_LEFT);
            var length = instance.getValueLength();

            if (length > maxLength) {
                input.val(
                    value.substring(0, maxLength)
                );
            }

            if (length == maxLength) {
                instance.fire('maxLength');
            }

            input.set(SCROLL_TOP, scrollTop);
            input.set(SCROLL_LEFT, scrollLeft);

            instance.syncUI();
        },

        /**
         * Fired on input value change.
         *
         * @method _onInputChange
         * @param {EventFacade} event
         * @protected
         */
        _onInputChange: function(event) {
            var instance = this;

            instance.checkLength();
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
            var input = instance.get(INPUT);

            if (input && (v < Infinity)) {
                input.set(MAX_LENGTH, v);
            }

            return v;
        }
    }
});

A.CharCounter = CharCounter;
