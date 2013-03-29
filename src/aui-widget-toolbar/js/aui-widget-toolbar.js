var StdMod = A.WidgetStdMod,

    BOUNDING_BOX = 'boundingBox',
    TOOLBARS = 'toolbars',
    SYNC_UI = 'syncUI',
    TOOLBARS_CHANGE = 'toolbarsChange';

var WidgetToolbars = function() {};

WidgetToolbars.ATTRS = {
    toolbars: {
    },

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

    initializer: function() {
        var instance = this;

        instance.toolbars = {};

        A.after(instance._syncUIToolbars, instance, SYNC_UI);

        instance.after(TOOLBARS_CHANGE, instance._afterToolbarsChange);
    },

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

    getToolbar: function(section) {
        var instance = this;

        return instance.toolbars[instance.getToolbarSection(section)];
    },

    getToolbarSection: function(section) {
        return section || StdMod.FOOTER;
    },

    removeToolbar: function(section) {
        var instance = this,
            toolbar = instance.toolbars[instance.getToolbarSection(section)];

        if (toolbar) {
            toolbar.destroy();
        }

        return toolbar;
    },

    _syncPrimaryButtonUI: function() {
        var instance = this,
            primaryButtonNode = instance.get(BOUNDING_BOX).one(
                '.' + A.ButtonCore.CLASS_NAMES.PRIMARY);

        if (primaryButtonNode) {
            // TODO: Check double focus workaround
            primaryButtonNode.focus().focus();
        }
    },

    _syncUIToolbars: function() {
        var instance = this;

        instance._uiSetToolbars(this.get(TOOLBARS));
    },

    _uiSetToolbars: function(val) {
        var instance = this;

        A.each(val, A.bind(instance.addToolbar, instance));
    }
};

A.WidgetToolbars = WidgetToolbars;