YUI.add('aui-alert', function (A, NAME) {

/**
 * The Alert Component
 *
 * @module aui-alert
 */

var getClassName = A.getClassName,
    CSS_CLOSE = getClassName('close'),
    CSS_INFO = getClassName('alert', 'info'),
    CSS_DISMISSABLE = getClassName('alert', 'dismissable');

/**
 * A base class for Alert.
 *
 * Check the [live demo](http://alloyui.com/examples/alert/).
 *
 * @class A.Alert
 * @extends Widget
 * @uses A.WidgetCssClass, A.WidgetTransition
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/alert/basic-markup.html
 * @include http://alloyui.com/examples/alert/basic.js
 */
A.Alert = A.Base.create('alert', A.Widget, [
    A.WidgetCssClass,
    A.WidgetStdMod,
    A.WidgetTransition
], {
    CONTENT_TEMPLATE: null,

    _eventHandle: null,

    /**
     * Renders the Alert component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        this._uiSetCloseable(this.get('closeable'));
    },

    /**
     * Binds the events on the Alert UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        this.on('closeableChange', this._onCloseableChange);
        this.after('visibleChange', this._afterVisibleChange);
    },

    /**
     * Fires after visibility changes.
     *
     * @method _afterVisibleChange
     * @param {EventFacade} event
     * @protected
     */
    _afterVisibleChange: function(event) {
        if (!event.newVal && this.get('destroyOnHide')) {
            A.soon(A.bind('destroy', this));
        }
    },

    /**
     * Handles close icon click event.
     *
     * @method _onClickBoundingBox
     * @param {EventFacade} event
     * @protected
     */
    _onClickBoundingBox: function(event) {
        if (event.target.test('.' + CSS_CLOSE)) {
            this.hide();
        }
    },

    /**
     * Handles `closeable` events.
     *
     * @method _onCloseableChange
     * @param {EventFacade} event
     * @protected
     */
    _onCloseableChange: function(event) {
        this._uiSetCloseable(event.newVal);
    },

    /**
     * Sets `closeable` UI.
     *
     * @method _uiSetCloseable
     * @protected
     */
    _uiSetCloseable: function(val) {
        var boundingBox = this.get('boundingBox'),
            closeableNode = this.get('closeableNode');

        boundingBox.toggleClass(CSS_DISMISSABLE, val);

        closeableNode.remove();

        if (this._eventHandle) {
            this._eventHandle.detach();
        }

        if (val) {
            boundingBox.insert(closeableNode, 0);
            this._eventHandle = boundingBox.on('click', this._onClickBoundingBox, this);
        }
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the Alert.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Whether the alert can be closed.
         *
         * @attribute closeable
         * @default true
         * @type {Boolean}
         */
        closeable: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * Node used to generate a close button.
         *
         * @attribute closeableNode
         * @default `<button type="button" class="close">×</button>`
         * @type {Node}
         */
        closeableNode: {
            valueFn: function() {
                return A.Node.create('<button type="button" class="close">×</button>');
            }
        },

        /**
         * CSS class for alert.
         *
         * @attribute popoverCssClass
         * @default A.getClassName('alert-info')
         * @type {String}
         */
        cssClass: {
            value: CSS_INFO
        },

        /**
         * Determine if Alert should be destroyed when hidden.
         *
         * @attribute destroyOnHide
         * @default false
         * @type Boolean
         */
        destroyOnHide: {
            validator: A.Lang.isBoolean,
            value: false
        }
    },

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type {String}
     * @static
     */
    CSS_PREFIX: 'alert',

    /**
     * Object hash, defining how closeableNode value have to be parsed from markup.
     *
     * @property HTML_PARSER
     * @type Object
     * @static
     */
    HTML_PARSER: {
        closeableNode: '.' + CSS_CLOSE
    }
});


}, '3.0.1', {
    "requires": [
        "timers",
        "widget",
        "widget-stdmod",
        "aui-classnamemanager",
        "aui-widget-cssclass",
        "aui-widget-transition"
    ],
    "skinnable": true
});
