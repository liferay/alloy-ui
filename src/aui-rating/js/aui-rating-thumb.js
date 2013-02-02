/*
* ThumbRating
*/
var CSS_CLASSES = 'cssClasses',
    DOWN = 'down',
    ELEMENT = 'element',
    ELEMENTS = 'elements',
    ICON = 'icon',
    LABEL = 'Label',
    OFF = 'off',
    ON = 'on',
    RATING = 'rating',
    THUMB = 'thumb',
    THUMB_RATING = 'ThumbRating',
    THUMBS = 'thumbs',
    UP = 'up',

    getCN = A.getClassName,

    CSS_ICON_THUMBS_DOWN = getCN(ICON, THUMBS, DOWN),
    CSS_ICON_THUMBS_UP = getCN(ICON, THUMBS, UP),
    CSS_RATING_OFF = getCN(RATING, OFF),
    CSS_RATING_ON = getCN(RATING, ON);

/**
 * <p><img src="assets/images/aui-rating/thumb-rating.png"/></p>
 *
 * A base class for ThumbRating, providing:
 * <ul>
 *    <li>A non-obstrusive star rating control using Thumb up and Thumb down icons</li>
 *    <li>Could be based on a set of radio input boxes</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.ThumbRating({
 *   boundingBox: '#rating',
 *   defaultSelected: 3,
 *   disabled: false,
 *   label: LABEL
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="ThumbRating.html#configattributes">Configuration Attributes</a> available for
 * ThumbRating.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class ThumbRating
 * @constructor
 * @extends Rating
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
            fillTo: function(index, className) {
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