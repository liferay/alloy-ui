YUI.add('aui-widget-cssclass', function (A, NAME) {

/**
 * Provides standard module support for cssClass attribute through an extension.
 *
 * @module aui-widget-cssclass
 */

/**
 * Widget extension, which can be used to add cssClass support to the
 * base Widget class, through the [Base.build](Base.html#method_build) method.
 *
 * @class A.WidgetCssClass
 * @param {Object} The user configuration object
 */

function WidgetCssClass() {}

/**
 * Static property used to define the default attribute
 * configuration for the Component.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
WidgetCssClass.ATTRS = {
    /**
     * CSS class to be automatically added to the `boundingBox`.
     *
     * @attribute cssClass
     * @type String
     */
    cssClass: {}
};

/**
 * Static property used to define the default suffix for cssClass attribute
 * value applied on `contentBox` node.
 *
 * @property CSS_CLASS_CONTENT_SUFFIX
 * @type String
 * @static
 */
WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX = '-content';

WidgetCssClass.prototype = {
    /**
     * Construction logic executed during Component instantiation. Lifecycle.
     *
     * @method initializer
     * @param {Object} config
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance._uiSetCssClass(instance.get('cssClass'));
        instance.after('cssClassChange', instance._afterCssClassChange);
    },

    /**
     * Fires after the value of the [cssClass](Component.html#attr_cssClass)
     * attribute change.
     *
     * @method _afterCssClassChange
     * @param {EventFacade} event
     * @protected
     */
    _afterCssClassChange: function(event) {
        var instance = this,
            prevVal;

        prevVal = event.prevVal;

        if (prevVal) {
            instance.get('boundingBox').removeClass(prevVal);
            instance.get('contentBox').removeClass(
                prevVal + WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX);
        }

        instance._uiSetCssClass(event.newVal);
    },

    /**
     * Applies the CSS classes to the `boundingBox` and `contentBox`.
     *
     * @method _uiSetCssClass
     * @protected
     * @param {String} newVal
     * @param {String} prevVal
     */
    _uiSetCssClass: function(val) {
        var instance = this;

        if (val) {
            instance.get('boundingBox').addClass(val);
            instance.get('contentBox').addClass(
                val + WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX);
        }
    }
};

A.WidgetCssClass = WidgetCssClass;


}, '3.0.1', {"requires": ["widget-base"]});
