YUI.add('aui-widget-toggle', function (A, NAME) {

/**
 * Provides standard module support for toggle visibility method through an
 * extension.
 * @module aui-widget-toggle
 */

/**
 * Widget extension, which can be used to add toggle visibility support to the
 * base Widget class, through the [Base.build](Base.html#method_build)
 * method.
 *
 * @class A.WidgetToggle
 * @param {Object} The user configuration object
 */

function WidgetToggle() {}

WidgetToggle.prototype = {
    /**
     * Toggles widget visibility.
     *
     * @method toggle
     * @param {Boolean} visible Force the widget to be visible.
     */
    toggle: function(visible) {
        var instance = this;

        if (!A.Lang.isBoolean(visible)) {
            visible = !instance.get('visible');
        }

        return instance.set('visible', visible);
    }
};

A.WidgetToggle = WidgetToggle;


}, '3.0.1');
