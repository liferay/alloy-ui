/**
 * The Widget Toolbars Utility
 *
 * @module aui-widget-toolbars
 */

var StdMod = A.WidgetStdMod,

    BOUNDING_BOX = 'boundingBox',
    TOOLBARS = 'toolbars',
    SYNC_UI = 'syncUI',
    TOOLBARS_CHANGE = 'toolbarsChange';

/**
 * A base class for Widget Toolbars.
 *
 * @class WidgetToolbars
 * @constructor
 */
var WidgetToolbars = function() {};

/**
 * Static property used to define the default attribute
 * configuration.
 *
 * @property WidgetToolbars.ATTRS
 * @type Object
 * @static
 */
WidgetToolbars.ATTRS = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute toolbars
     * @default undefined
     */
    toolbars: {
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
    }
};

WidgetToolbars.prototype = {
    toolbars: null,

    /**
     * Construction logic executed during WidgetToolbars instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.toolbars = {};

        A.after(instance._syncUIToolbars, instance, SYNC_UI);

        instance.after(TOOLBARS_CHANGE, instance._afterToolbarsChange);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method addToolbar
     * @param toolbar
     * @param section
     */
    addToolbar: function(toolbar, section) {
        var instance = this;

        section = instance.getToolbarSection(section);

        instance.removeToolbar(section);

        if (!A.instanceOf(toolbar, A.Toolbar)) {
            toolbar = new A.Toolbar({
                children: toolbar,
                render: instance.getStdModNode(section, true)
            });
        }

        toolbar.addTarget(instance);

        instance.toolbars[section] = toolbar;

        instance.setStdModContent(
            section,
            toolbar.get(BOUNDING_BOX),
            instance.get('toolbarPosition.' + section));

        instance._syncPrimaryButtonUI();

        return toolbar;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getToolbar
     * @param section
     */
    getToolbar: function(section) {
        var instance = this;

        return instance.toolbars[instance.getToolbarSection(section)];
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getToolbarSection
     * @param section
     */
    getToolbarSection: function(section) {
        return section || StdMod.FOOTER;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _syncPrimaryButtonUI
     * @protected
     */
    _syncPrimaryButtonUI: function() {
        var instance = this,
            primaryButtonNode = instance.get(BOUNDING_BOX).one(
                '.' + A.ButtonCore.CLASS_NAMES.PRIMARY);

        if (primaryButtonNode) {
            // TODO: Check double focus workaround
            primaryButtonNode.focus().focus();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _syncUIToolbars
     * @protected
     */
    _syncUIToolbars: function() {
        var instance = this;

        instance._uiSetToolbars(this.get(TOOLBARS));
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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