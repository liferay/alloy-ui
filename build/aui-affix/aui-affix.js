YUI.add('aui-affix', function (A, NAME) {

/**
 * The Affix Component
 *
 * @module aui-affix
 */

var win = A.config.win;

/**
 * A base class for Affix.
 *
 * Check the [live demo](http://alloyui.com/examples/affix/).
 *
 * @class A.Affix
 * @extends Base
 * @param {Object} config Object literal specifying scrollspy configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/affix/basic-markup.html
 * @include http://alloyui.com/examples/affix/basic.js
 */
A.Affix = A.Base.create('affix', A.Base, [], {
    /**
     * Holds the scroll event handle.
     *
     * @type {Node}
     * @private
     */
    _eventHandle: null,

    /**
     * Holds the last event (bottom, default, top).
     * @type {String}
     * @private
     */
    _lastPosition: null,

    /**
     * Constructor for the Affix component.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.publish({
            bottom: {
                defaultFn: this._defAffixBottomFn
            },
            'default': {
                defaultFn: this._defAffixFn
            },
            top: {
                defaultFn: this._defAffixTopFn
            }
        });

        this.after({
            offsetBottomChange: this._afterOffsetChange,
            offsetTopChange: this._afterOffsetChange
        });

        this.refresh();
        this._eventHandle = A.one(win).on('scroll', this._onScroll, this);
    },

    /**
     * Destructor for the Affix component
     * @method destructor
     * @private
     */
    destructor: function() {
        this._eventHandle.detach();
    },

    /**
     * Refreshes the affix component to its current state.
     *
     * @method refresh
     */
    refresh: function() {
        var scrollY = A.DOM.docScrollY(),
            offsetBottom = this.get('offsetBottom'),
            offsetTop = this.get('offsetTop'),
            targetRegion;

        if ((offsetTop >= 0) && (offsetTop >= scrollY)) {
            this._handleAffixEvent(A.Affix.EVENTS.TOP);
            return;
        }

        targetRegion = this.get('target').get('region');

        if ((offsetBottom >= 0) && ((A.DOM.docHeight() - A.DOM.winHeight() - offsetBottom) <= targetRegion.bottom)) {
            this._handleAffixEvent(A.Affix.EVENTS.BOTTOM);
            return;
        }

        this._handleAffixEvent(A.Affix.EVENTS.DEFAULT);
    },

    /**
     * Call the refresh method after changing the offset
     *
     * @method  _afterOffsetChange
     * @private
     */
    _afterOffsetChange: function() {
        this.refresh();
    },

    /**
     * Affix bottom position syncing callback function.
     *
     * @method _defAffixBottomFn
     * @private
     */
    _defAffixBottomFn: function() {
        this._syncClassesUI(A.Affix.EVENTS.BOTTOM);
    },

    /**
     * Affix default position syncing callback function.
     *
     * @method _defAffixFn
     * @private
     */
    _defAffixFn: function() {
        this._syncClassesUI(A.Affix.EVENTS.DEFAULT);
    },

    /**
     * Affix top position syncing callback function.
     *
     * @method _defAffixTopFn
     * @private
     */
    _defAffixTopFn: function() {
        this._syncClassesUI(A.Affix.EVENTS.TOP);
    },

    /**
     * Get the `offset` attribute.
     *
     * @method _getOffset
     * @param {Number | Number.NEGATIVE_INFINITY} val
     * @protected
     */
    _getOffset: function(val) {
        if (A.Lang.isFunction(val)) {
            val = val.call(this);
        }
        return val;
    },

    /**
     * Safeguard function for firing the affix change event only when necessary.
     *
     * @method _handleAffixEvent
     * @param {String} Position value, could be 'bottom', 'default' or 'top'.
     * @private
     */
    _handleAffixEvent: function(position) {
        if (position !== this._lastPosition) {
            this.fire(position);
        }
    },

    /**
     * Scroll event listener function.
     *
     * @method _onScroll
     * @private
     */
    _onScroll: function() {
        this.refresh();
    },

    /**
     * Sync the target element class based on the affix positioning.
     *
     * @method _syncClassesUI
     * @param {String} Position value, could be 'bottom', 'default' or 'top'.
     * @private
     */
    _syncClassesUI: function(position) {
        var target = this.get('target');
        target.toggleClass(A.Affix.CSS_CLASSES.BOTTOM, position === A.Affix.EVENTS.BOTTOM);
        target.toggleClass(A.Affix.CSS_CLASSES.DEFAULT, position === A.Affix.EVENTS.DEFAULT);
        target.toggleClass(A.Affix.CSS_CLASSES.TOP, position === A.Affix.EVENTS.TOP);
        this._lastPosition = position;
    },

    /**
     * Validate the offset type.
     *
     * @method _validateOffset
     * @param  {Function | Number | Number.NEGATIVE_INFINITY} val
     */
    _validateOffset: function(val) {
        if (A.Lang.isFunction(val)) {
            val = val.call(this);
        }

        return A.Lang.isNumber(val) ||
            A.Lang.isFunction(val) ||
            (val === Number.NEGATIVE_INFINITY);
    }
}, {
    ATTRS: {
        /**
         * Defines the bottom offset.
         *
         * @attribute offsetBottom
         * @type {Function | Number}
         */
        offsetBottom: {
            getter: '_getOffset',
            validator: '_validateOffset',
            value: Number.NEGATIVE_INFINITY
        },

        /**
         * Defines the top offset.
         *
         * @attribute offsetTop
         * @type {Function | Number}
         */
        offsetTop: {
            getter: '_getOffset',
            validator: '_validateOffset',
            value: Number.NEGATIVE_INFINITY
        },

        /**
         * Defines the target element.
         *
         * @attribute target
         * @type {Node | String}
         */
        target: {
            setter: A.one
        }
    },
    /**
     * Map of events containing `BOTTOM`, `DEFAULT` or `TOP` keys.
     *
     * @type {Object}
     */
    EVENTS: {
        BOTTOM: 'bottom',
        DEFAULT: 'default',
        TOP: 'top'
    },
    /**
     * Map of class names containing `BOTTOM`, `DEFAULT` or `TOP` keys.
     *
     * @type {Object}
     */
    CSS_CLASSES: {
        BOTTOM: A.getClassName('affix', 'bottom'),
        DEFAULT: A.getClassName('affix'),
        TOP: A.getClassName('affix', 'top')
    }
});


}, '3.0.1', {"requires": ["base", "node-screen", "aui-node"]});
