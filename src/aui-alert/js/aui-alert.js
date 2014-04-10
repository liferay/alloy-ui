/**
 * The Alert Component
 *
 * @module aui-alert
 */

var getClassName = A.getClassName;

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
 */
A.Alert = A.Base.create('alert', A.Widget, [
    A.WidgetCssClass,
    A.WidgetTransition
], {

    /**
     * Render the Alert component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this;

        instance.get('contentBox').append(instance.get('closeableNode'));
    },

    /**
     * Bind the events on the Alert UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var instance = this;

        instance.get('closeableNode').on('click', A.bind(instance._onClickClose, instance));
        instance.after('visibleChange', instance._afterVisibleChange);
    },

    /**
     * Fire after visibility changes.
     *
     * @method _afterVisibleChange
     * @param event
     * @protected
     */
    _afterVisibleChange: function(event) {
        var instance = this;

        if (!event.newVal && instance.get('destroyOnHide')) {
            A.soon(A.bind('destroy', instance));
        }
    },

    /**
     * Fires the click event on the close icon.
     *
     * @method _onClickClose
     * @param event
     * @protected
     */
    _onClickClose: function(event) {

        this.hide();

        event.halt();
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
         * Node used to generate a close button.
         *
         * @attribute closeableNode
         */
        closeableNode: {
            valueFn: function() {
                return A.Node.create('<button type="button" class="close" data-dismiss="alert">×</button>');
            }
        },

        /**
         * CSS class for alert.
         *
         * @attribute popoverCssClass
         * @default A.getClassName('alert-error')
         * @type {String}
         */
        cssClass: {
            value: getClassName('alert', 'error')
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
        closeableNode: '.' + getClassName('close')
    }
});
