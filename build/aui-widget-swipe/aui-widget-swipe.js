YUI.add('aui-widget-swipe', function (A, NAME) {

/**
 * This adds the functionality of swiping to go to the previous/next item
 * inside a widget. After mixed in, this funcionality is enabled by default, but
 * it can be disabled through the `swipe` attribute.
 *
 * @module aui-widget-swipe
 */

var CSS_WIDGET_SWIPE = A.getClassName('widget', 'swipe');

function WidgetSwipe() {}

WidgetSwipe.prototype = {
    /**
     * Static property used to define the `Plugin.ScrollViewPaginator` index
     * configuration.
     *
     * @property WIDGET_INDEX_ATTRIBUTE
     * @type {String}
     * @static
     */
    WIDGET_INDEX_ATTRIBUTE: 'index',

    /**
     * Static property used to define the `Plugin.ScrollViewPaginator` selector
     * configuration.
     *
     * @property WIDGET_ITEM_SELECTOR
     * @type {String}
     * @static
     */
    WIDGET_ITEM_SELECTOR: 'img',

    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        A.onceAfter(this._afterWidgetUISetVisible, this, '_uiSetVisible');
        this.on('responsive', this._onResponsiveSwipe);
        this.after({
            responsive: this._afterResponsiveSwipe,
            swipeChange: this._uiSetSwipe
        });
    },

    /**
     * Destructor lifecycle implementation.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        if (this._scrollView) {
            this._scrollView.destroy();
            this._scrollView = null;

            this._detachSwipeEvents();
        }
    },

    /**
     * Fired after the scrollview's `index` attribute is changed. Will update
     * the widget's index accordingly.
     *
     * @method _afterIndexChange
     * @param {EventFacade} event
     * @protected
     */
    _afterIndexChange: function(event) {
        if (this.get(this.WIDGET_INDEX_ATTRIBUTE) !== event.newVal) {
            this.set(this.WIDGET_INDEX_ATTRIBUTE, event.newVal);
        }
    },

    /**
     * Fired after the widget's `responsive` event. This adds back the swipe css
     * class that was removed by `_onResponsiveSwipe` and then syncs the scroll UI.
     *
     * @method _afterResponsiveSwipe
     * @protected
     */
    _afterResponsiveSwipe: function() {
        if (this._scrollView && !this._scrollView.get('disabled')) {
            this.get('boundingBox').addClass(CSS_WIDGET_SWIPE);

            // Wait for other events after `responsive` to finish before syncing
            // the scroll UI.
            A.soon(A.bind(this._syncScrollUI, this));
        }
    },

    /**
     * Fired after the widget's index attribute is changed. Will update the
     * scrollview to show the right item, if it isn't showing it yet.
     *
     * @method _afterCurrentIndexChange
     * @param {EventFacade} event
     * @protected
     */
    _afterWidgetIndexChange: function(event) {
        if (this._scrollView && event.newVal !== this._scrollView.pages.get('index')) {
            this._scrollToCurrentIndex();
        }
    },

    /**
     * Fired after the widget's _uiSetVisible function is called. It prepares
     * the swipe funcionality for use.
     *
     * @method _afterWidgetUISetVisible
     * @protected
     */
    _afterWidgetUISetVisible: function() {
        if (this.get('visible')) {
            this._uiSetSwipe();
            this._syncScrollUI();
        }
    },

    /**
     * Listens to the necessary events for the swipe funcionality to work correctly.
     *
     * @method _attachSwipeEvents
     * @protected
     */
    _attachSwipeEvents: function() {
        if (!this._swipeEventHandles) {
            this._swipeEventHandles = [
                A.after('windowresize', A.bind(this._syncScrollUI, this))
            ];

            if (this._scrollView.pages) {
                this._swipeEventHandles.push(
                    this._scrollView.pages.after('indexChange', A.bind(this._afterIndexChange, this)),
                    this.after(this.WIDGET_INDEX_ATTRIBUTE + 'Change', this._afterWidgetIndexChange)
                );
            }
        }
    },

    /**
     * Detaches all events related to the swipe funcionality.
     *
     * @method _detachSwipeEvents
     * @protected
     */
    _detachSwipeEvents: function() {
        if (this._swipeEventHandles) {
            (new A.EventHandle(this._swipeEventHandles)).detach();
            this._swipeEventHandles = null;
        }
    },

    /**
     * Disables the scroll view, removing the swipe funcionality.
     *
     * @method _disableScrollView
     * @protected
     */
    _disableScrollView: function() {
        if (this._scrollView) {
            this._scrollView.set('disabled', true);

            this.get('boundingBox').removeClass(CSS_WIDGET_SWIPE);

            this._detachSwipeEvents();
        }
    },

    /**
     * Enables the scroll view, adding the swipe funcionality.
     *
     * @method _enableScrollView
     * @protected
     */
    _enableScrollView: function() {
        this.get('boundingBox').addClass(CSS_WIDGET_SWIPE);

        if (this._scrollView) {
            this._scrollView.set('disabled', false);
            this._attachSwipeEvents();

            return;
        }

        if (!this.get('visible')) {
            // The ScrollView should only be created for the first time after
            // the widget is visible, so ignore calls to enable it when that's not
            // true.
            return;
        }

        this._scrollView = new A.ScrollView(this.get('swipe'));
        this._plugPaginator();
        this._scrollView.render();

        this._attachSwipeEvents();
    },

    /**
     * Fired on the widget's `responsive` event. This removes the swipe css class,
     * so the responsive code can correctly calculate the widget's size. The css
     * class will be added back by `_afterResponsiveSwipe`.
     *
     * @method _onResponsiveSwipe
     * @protected
     */
    _onResponsiveSwipe: function() {
        this.get('boundingBox').removeClass(CSS_WIDGET_SWIPE);
    },

    /**
     * Plugs ScrollViewPaginator if the `useScrollViewPaginator` is true.
     *
     * @method _plugPaginator
     * @protected
     */
    _plugPaginator: function() {
        if (this.get('useScrollViewPaginator')) {
            this._scrollView.plug(A.Plugin.ScrollViewPaginator, {
                index: this.get(this.WIDGET_INDEX_ATTRIBUTE),
                selector: this.WIDGET_ITEM_SELECTOR
            });
        }
    },

    /**
     * Sets `swipe` attribute.
     *
     * @method _setSwipe
     * @protected
     */
    _setSwipe: function(val) {
        if (A.Lang.isBoolean(val)) {
            if (val) {
                val = {};
            }
            else {
                return false;
            }
        }

        return A.merge({
            axis: 'x',
            contentBox: this.get('contentBox'),
            flick: {
                minDistance: 10,
                minVelocity: 0.3,
                axis: 'x'
            }
        }, val);
    },

    /**
     * Scrolls to the widget's current index.
     *
     * @method _scrollToCurrentIndex
     * @protected
     */
    _scrollToCurrentIndex: function() {
        if (this._scrollView.pages) {
            this._scrollView.pages.scrollToIndex(
                this.get(this.WIDGET_INDEX_ATTRIBUTE),
                0 // Zero duration, animation will be done through ImageViewer.
            );
        }
    },

    /**
     * This method updates the scroll view with new dimensions and makes
     * sure it's at the correct position.
     *
     * @method _syncScrollUI
     * @protected
     */
    _syncScrollUI: function() {
        if (this._scrollView) {
            this._scrollView.syncUI();
            this._scrollToCurrentIndex();
        }
    },

    /**
     * Updates the UI according to the current value of `swipe`.
     *
     * @method _uiSetSwipe
     * @protected
     */
    _uiSetSwipe: function() {
        if (this.get('swipe')) {
            this._enableScrollView();
        }
        else {
            this._disableScrollView();
        }
    }
};

WidgetSwipe.ATTRS = {
    /**
     * Turns the swipe interaction on/off.
     *
     * @attribute swipe
     * @type {Object|Boolean}
     */
    swipe: {
        setter: '_setSwipe',
        value: {}
    },

    /**
     * Flag indicating if ScrollViewPaginator should be plugged.
     *
     * @attribute useScrollViewPaginator
     * @default true
     * @type {Boolean}
     */
    useScrollViewPaginator: {
        value: true
    }
};

A.WidgetSwipe = WidgetSwipe;


}, '3.0.1', {"requires": ["classnamemanager", "scrollview-base", "scrollview-paginator", "timers"]});
