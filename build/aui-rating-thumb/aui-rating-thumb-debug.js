YUI.add('aui-rating-thumb', function (A, NAME) {

/**
 * The Rating Utility - The Thumb Rating creates a non-obstrusive star rating
 * control with only two options using Thumb Up and Thumb Down icons.
 *
 * @module aui-rating
 */

var getCN = A.getClassName,

    CSS_ICON = getCN('glyphicon'),
    CSS_ICON_THUMBS_DOWN = getCN('glyphicon', 'thumbs', 'down'),
    CSS_ICON_THUMBS_UP = getCN('glyphicon', 'thumbs', 'up'),
    CSS_RATING_OFF = getCN('rating', 'off'),
    CSS_RATING_ON = getCN('rating', 'on');

/**
 * A base class for ThumbRating, providing:
 *
 * - A non-obstrusive star rating control using Thumb up and Thumb down icons
 * - Could be based on a set of radio input boxes
 *
 * Check the [live demo](http://alloyui.com/examples/rating/).
 *
 * @class A.ThumbRating
 * @extends A.Rating
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var ThumbRating = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'ThumbRating',

    /**
     * Static property used to define the default attribute
     * configuration for the ThumbRating.
     *
     * @property ATTRS
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
                down: [CSS_ICON, CSS_ICON_THUMBS_DOWN].join(' '),
                element: CSS_RATING_OFF,
                hover: CSS_RATING_ON,
                off: CSS_RATING_OFF,
                on: CSS_RATING_ON,
                up: [CSS_ICON, CSS_ICON_THUMBS_UP].join(' ')
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
     * @property EXTENDS
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
                cssClasses = instance.get('cssClasses');

            ThumbRating.superclass.renderUI.apply(this, arguments);

            var elements = instance.get('elements');

            elements.addClass(cssClasses.off);
            elements.item(0).addClass(cssClasses.up);
            elements.item(1).addClass(cssClasses.down);
        },

        /**
         * Add the `className` on the the `index` element
         * and all the previous Rating elements.
         *
         * @method fillTo
         * @param {Number} index Index to be selected
         * @param {String} className Class name to be applied when fill the
         *     Rating elements
         */
        fillTo: function(index) {
            var instance = this,
                cssClasses = instance.get('cssClasses');

            this.clearSelection();

            if (index >= 0) {
                var el = this.get('elements').item(index);
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
});

A.ThumbRating = ThumbRating;


}, '3.0.1', {"requires": ["aui-rating-base"]});
