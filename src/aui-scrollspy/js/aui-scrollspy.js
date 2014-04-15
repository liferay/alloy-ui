/**
 * The Scrollspy Component
 *
 * @module aui-scrollspy
 */

var getClassName = A.getClassName,
    Lang = A.Lang,

    ACTIVATE_EVENT = 'activate',
    CSS_ACTIVE_CLASS = getClassName('active');

/**
 * A base class for Scrollspy.
 *
 * Check the [live demo](http://alloyui.com/examples/scrollspy/).
 *
 * @class A.Scrollspy
 * @extends Base
 * @param {Object} config Object literal specifying scrollspy configuration
 *     properties.
 * @constructor
 */
A.Scrollspy = A.Base.create('scrollspy', A.Base, [], {

    activeLink: null,

    links: null,

    /**
     * Construction logic executed during Scrollspy instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var scrollNode = this.get('scrollNode');

        /**
         * Fired when any target's link changes.
         *
         * @event scrollspy:activate
         * @param {EventFacade} event That activate link change event.
         */
        this.publish(ACTIVATE_EVENT, {
            defaultFn: this._defActivateEventFn
        });

        this.refresh();
        scrollNode.on('scroll', A.bind(this._onScroll, this));
    },

    /**
     * Cleans the cached target's links.
     *
     * @method flush
     */
    flush: function() {
        this.links = null;
    },

    /**
     * Recalculates the current active node in the list and resets the active
     * CSS class names.
     *
     * @method refresh
     **/
    refresh: function() {
        var link = this._findLinkBestMatch();

        // Early return to avoid fire activate event when not necessary.
        // Event should be fired only when link is different from activeLink.
        if (link === this.activeLink || (!link && !this.activeLink)) {
            return;
        }

        this.fire(ACTIVATE_EVENT, {
            newVal: link,
            prevVal: this.activeLink
        });
    },

    /**
     * Handler function for scrollNode's scroll event.
     *
     * @param event
     * @method _defActivateEventFn
     **/
    _defActivateEventFn: function(event) {
        this._uiSetLink(event.newVal, event.prevVal);
    },

    /**
     * Finds the node whose target should be activated.
     *
     * @method _findLinkBestMatch
     * @protected
     **/
    _findLinkBestMatch: function() {
        var links = this._getValidLinks();

        return links.filter(A.bind(this._isLinkInViewport, this)).pop();
    },

    /**
     * Gets target ids from target links.
     *
     * @method _getValidLinks
     * @protected
     **/
    _getValidLinks: function() {
        if (!this.links) {
            this.links = this.get('target').all('a');
        }

        this.links = this.links.filter(function(link) {
            var href = link.getAttribute('href');
            return (href && (href.length > 1) && href.charAt(0) === '#');
        });

        return this.links;
    },

    /**
     * Checks if there's a link corresponding to an anchor in the viewport.
     *
     * @method _isLinkInViewport
     * @param link
     * @protected
     **/
    _isLinkInViewport: function(link) {
        var offset = this.get('offset'),
            scrollNode = this.get('scrollNode'),
            anchor = scrollNode.one(link.getAttribute('href'));

        return (anchor && (scrollNode.getY() >= (anchor.getY() - offset)));
    },

    /**
     * Call refresh on scroll event from scrollNode.
     *
     * @method _onScroll
     * @protected
     **/
    _onScroll: function() {
        this.refresh();
    },

    /**
     * Sets correct class to active node.
     *
     * @method _uiSetLink
     * @param val
     * @param prevVal
     * @protected
     **/
    _uiSetLink: function(val, prevVal) {
        var activeGroup = this.get('activeGroup');

        if (prevVal) {
            prevVal.ancestors(activeGroup).removeClass(CSS_ACTIVE_CLASS);
            this.activeLink = null;
        }

        if (val) {
            val.ancestors(activeGroup).addClass(CSS_ACTIVE_CLASS);
            this.activeLink = val;
        }
    }
},
{
    /**
     * Static property used to define the default attribute
     * configuration for the Scrollspy.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Ancestors which should be added the .active class.
         *
         * @attribute activeGroup
         * @type Object
         */
        activeGroup: {
            validator: Lang.isString,
            value: 'li, .dropdown'
        },

        /**
         * Pixels to offset from top when calculating position of scroll.
         *
         * @attribute offset
         * @type Object
         */
        offset: {
            validator: Lang.isNumber,
            value: 10
        },

        /**
         * Container that maps target links.
         *
         * @attribute scrollNode
         * @type Object
         * @writeOnce
         */
        scrollNode: {
            setter: A.one,
            validator: Lang.isString,
            writeOnce: 'initOnly'
        },

        /**
         * Target list. Usually a nav bar element with anchors.
         *
         * @attribute target
         * @type Object
         * @writeOnce
         */
        target: {
            setter: A.one,
            validator: Lang.isString,
            writeOnce: 'initOnly'
        }
    }
});
