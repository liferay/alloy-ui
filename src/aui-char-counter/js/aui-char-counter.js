/**
 * The CharCounter Utility
 *
 * @module aui-char-counter
 */

var L = A.Lang,
    isNumber = L.isNumber;

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
                // use cross browser input-handler event
                instance.handler = input.on('input', A.bind(instance._onInputChange, instance));
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

            if (counter) {
                var value = instance.get('input').val();

                counter.html(
                    instance.get('maxLength') - value.length
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
            var input = instance.get('input');
            var maxLength = instance.get('maxLength');

            if (!input) {
                return false; // NOTE: return
            }

            var value = input.val();
            var scrollTop = input.get('scrollTop');
            var scrollLeft = input.get('scrollLeft');

            if (value.length > maxLength) {
                input.val(
                    value.substring(0, maxLength)
                );
            }

            if (value.length === maxLength) {
                instance.fire('maxLength');
            }

            input.set('scrollTop', scrollTop);
            input.set('scrollLeft', scrollLeft);

            instance.syncUI();
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
            var input = instance.get('input');

            if (input && (v < Infinity)) {
                input.set('maxLength', v);
            }

            return v;
        }
    }
});

A.CharCounter = CharCounter;
