YUI.add('aui-widget-toolbars', function (A, NAME) {

/**
 * The Widget Toolbars Utility
 *
 * @module aui-widget-toolbars
 */

var StdMod = A.WidgetStdMod;

/**
 * A base class for Widget Toolbars.
 *
 * @class A.WidgetToolbars
 * @constructor
 */
var WidgetToolbars = function() {};

/**
 * Static property used to define the default attribute configuration.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
WidgetToolbars.ATTRS = {

    /**
     * Collection of `A.Toolbar` instances.
     *
     * @attribute toolbars
     * @default {}
     * @type Object
     */
    toolbars: {},

    /**
     * Collection of toolbar's header, body, and footer positions.
     *
     * @attribute toolbarPosition
     * @type Object
     */
    toolbarPosition: {
        value: {
            body: StdMod.AFTER,
            footer: StdMod.AFTER,
            header: StdMod.BEFORE
        }
    },

    /**
     * Collection of toolbar's header, body, and footer CSS classes.
     *
     * @attribute toolbarCssClass
     * @type Object
     */
    toolbarCssClass: {
        value: {
            body: '',
            footer: '',
            header: ''
        }
    }
};

WidgetToolbars.prototype = {
    toolbars: null,

    /**
     * Construction logic executed during WidgetToolbars instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.toolbars = {};

        A.after(instance._syncUIToolbars, instance, 'syncUI');

        instance.after('toolbarsChange', instance._afterToolbarsChange);
    },

    /**
     * Includes a `A.Toolbar` instance into the widget.
     *
     * @method addToolbar
     * @param toolbar
     * @param section
     * @return {A.Toolbar}
     */
    addToolbar: function(toolbar, section) {
        var instance = this;

        section = instance.getToolbarSection(section);

        instance.removeToolbar(section);

        if (!A.instanceOf(toolbar, A.Toolbar)) {
            toolbar = new A.Toolbar({
                cssClass: this.get('toolbarCssClass.' + section) || '',
                children: toolbar,
                render: instance.getStdModNode(section, true)
            });
        }

        toolbar.addTarget(instance);

        instance.toolbars[section] = toolbar;

        instance.setStdModContent(
            section,
            toolbar.get('boundingBox'),
            instance.get('toolbarPosition.' + section));

        instance._syncPrimaryButtonUI();

        return toolbar;
    },

    /**
     * Gets the `A.Toolbar` instance based on its section.
     *
     * @method getToolbar
     * @param section
     * @return {A.Toolbar}
     */
    getToolbar: function(section) {
        var instance = this;

        return instance.toolbars[instance.getToolbarSection(section)];
    },

    /**
     * Gets the toolbar's section. If no argument is passed, returns the
     * `StdMod.FOOTER`.
     *
     * @method getToolbarSection
     * @param section
     * @return {String}
     *
     */
    getToolbarSection: function(section) {
        return section || StdMod.FOOTER;
    },

    /**
     * Destroys the `A.Toolbar` instance based on its section.
     *
     * @method removeToolbar
     * @param section
     */
    removeToolbar: function(section) {
        var instance = this,
            toolbar = instance.toolbars[instance.getToolbarSection(section)];

        if (toolbar) {
            toolbar.destroy();
        }

        return toolbar;
    },

    /**
     * Sync the primary button on the UI.
     *
     * @method _syncPrimaryButtonUI
     * @protected
     */
    _syncPrimaryButtonUI: function() {
        var instance = this,
            primaryButtonNode = instance.get('boundingBox').one(
                '.' + A.ButtonCore.CLASS_NAMES.PRIMARY);

        if (primaryButtonNode) {
            // TODO: Check double focus workaround
            primaryButtonNode.focus().focus();
        }
    },

    /**
     * Sync `A.Toolbar` instances on the UI.
     *
     * @method _syncUIToolbars
     * @protected
     */
    _syncUIToolbars: function() {
        var instance = this;

        instance._uiSetToolbars(this.get('toolbars'));
    },

    /**
     * Set `A.Toolbar` instances.
     *
     * @method _uiSetToolbars
     * @protected
     */
    _uiSetToolbars: function(val) {
        var instance = this;

        A.each(val, A.bind(instance.addToolbar, instance));
    }
};

A.WidgetToolbars = WidgetToolbars;


}, '3.0.1', {"requires": ["widget-stdmod", "aui-toolbar"]});
