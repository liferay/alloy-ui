/**
 * The Rating Utility - The Thumb Rating creates a non-obstrusive star rating
 * control with only two options using Thumb Up and Thumb Down icons.
 *
 * @module aui-rating
 */

var CSS_CLASSES = 'cssClasses',
    DOWN = 'down',
    ELEMENTS = 'elements',
    ICON = 'icon',
    OFF = 'off',
    ON = 'on',
    RATING = 'rating',
    THUMB_RATING = 'ThumbRating',
    THUMBS = 'thumbs',
    UP = 'up',

    getCN = A.getClassName,

    CSS_ICON_THUMBS_DOWN = getCN(ICON, THUMBS, DOWN),
    CSS_ICON_THUMBS_UP = getCN(ICON, THUMBS, UP),
    CSS_RATING_OFF = getCN(RATING, OFF),
    CSS_RATING_ON = getCN(RATING, ON);

/**
 *
 * A base class for ThumbRating, providing:
 * <ul>
 *    <li>A non-obstrusive star rating control using Thumb up and Thumb down icons</li>
 *    <li>Could be based on a set of radio input boxes</li>
 * </ul>
 *
 * Check the [live demo](http://alloyui.com/examples/rating/).
 *
 * @class A.ThumbRating
 * @extends A.Rating
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var ThumbRating = A.Component.create(
    {
        /**
         * Static property provides a string to identify the class.
         *
         * @property ThumbRating.NAME
         * @type String
         * @static
         */
        NAME: THUMB_RATING,

        /**
         * Static property used to define the default attribute
         * configuration for the ThumbRating.
         *
         * @property ThumbRating.ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * CSS classes applied on ThumbRating.
             *
             * @attribute cssClasses
             * @type Object
             */
            cssClasses: {
                value: {
                    down: CSS_ICON_THUMBS_DOWN,
                    element: CSS_RATING_OFF,
                    hover: CSS_RATING_ON,
                    off: CSS_RATING_OFF,
                    on: CSS_RATING_ON,
                    up: CSS_ICON_THUMBS_UP
                }
            },

            /**
             * The size on ThumbRating is always 2 (i.e., thumb up and thumb down).
             *
             * @attribute size
             * @default 2
             * @readOnly
             * @type Number
             */
            size: {
                value: 2,
                readOnly: true
            }
        },

        /**
         * Static property used to define which component it extends.
         *
         * @property ThumbRating.EXTENDS
         * @type Object
         * @static
         */
        EXTENDS: A.Rating,

        prototype: {

            /**
             * Create the DOM structure for the ThumbRating. Lifecycle.
             *
             * @method renderUI
             * @protected
             */
            renderUI: function() {
                var instance = this,
                    cssClasses = instance.get(CSS_CLASSES);

                ThumbRating.superclass.renderUI.apply(this, arguments);

                var elements = instance.get(ELEMENTS);

                elements.addClass(cssClasses.off);
                elements.item(0).addClass(cssClasses.up);
                elements.item(1).addClass(cssClasses.down);
            },

            /**
             * Add the <code>className</code> on the the <code>index</code> element
             * and all the previous Rating elements.
             *
             * @method fillTo
             * @param {Number} index Index to be selected
             * @param {String} className Class name to be applied when fill the Rating elements
             */
            fillTo: function(index) {
                var instance = this,
                    cssClasses = instance.get(CSS_CLASSES);

                this.clearSelection();

                if (index >= 0) {
                    var el = this.get(ELEMENTS).item(index);
                    el.addClass(cssClasses.on);
                    el.removeClass(cssClasses.off);
                }
            },

            /**
             * Empty method, no logic needed on this method on ThumbRating.
             *
             * @method _syncElements
             * @protected
             */
            _syncElements: function() {}
        }
    }
);

A.ThumbRating = ThumbRating;