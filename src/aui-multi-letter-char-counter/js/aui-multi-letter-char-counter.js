/**
 * The MultiLetterCharCounter Utility
 *
 * @module aui-multi-letter-char-counter
 */

var E = A.Env,

    MULTI_LETTER_CHAR_COUNTER = 'multi-letter-char-counter',
    COUNTER = 'counter',
    INPUT = 'input',
    MAX_LENGTH = 'maxLength',
    SCROLL_LEFT = 'scrollLeft',
    SCROLL_TOP = 'scrollTop';

/**
 * A base class for MultiLetterCharCounter, providing:
 *
 * - Limit the number of characters allowed in an input box
 * - Display the number of characters left
 * - Support to count multi (double and triple) letters characters (eg.: zs in Hungarian language) as one
 *
 * Check the [live demo](http://alloyui.com/examples/multi-letter-char-counter/).
 *
 * @class A.MultiLetterCharCounter
 * @extends CharCounter
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/multi-letter-char-counter/basic-markup.html
 * @include http://alloyui.com/examples/multi-letter-char-counter/basic.js
 */
var MultiLetterCharCounter = function (config) {
    var instance = this;
    instance.multiLetters = config.multiLetters || (E.lang[A.config.lang] && E.lang[A.config.lang].multiLetters);
    if (config.multiLetters) {
        instance.multiLettersCorrection = true;
    }
    MultiLetterCharCounter.superclass.constructor.apply(this, arguments);
};

/**
 * Static property provides a string to identify the class.
 *
 * @property NAME
 * @type String
 * @static
 */
MultiLetterCharCounter.NAME = MULTI_LETTER_CHAR_COUNTER;

/**
 * Static property used to define which component it extends.
 *
 * @property EXTENDS
 * @type Object
 * @static
 */
MultiLetterCharCounter.EXTENDS = A.CharCounter,

A.extend(MultiLetterCharCounter, A.CharCounter, {

    /**
     * Boolean value to indicate if we want to correct the character counting with multiple letters.
     *
     * @attribute multiLettersCorrection
     * @default true
     * @type {Boolean}
     */
    multiLettersCorrection: true,

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
        var length = instance.getValueLength(value);

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
    }

});
A.MultiLetterCharCounter = MultiLetterCharCounter;