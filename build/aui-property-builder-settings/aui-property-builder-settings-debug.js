YUI.add('aui-property-builder-settings', function (A, NAME) {

var PropertyBuilderSettings;

/**
 * A base class for `A.PropertyBuilderSettings`.
 *
 * @class A.PropertyBuilderSettings
 * @constructor
 */
var PropertyBuilderSettings = function() {},
    CSS_PROPERTY_BUILDER_TABS = A.getClassName('property', 'builder', 'tabs'),
    CSS_PROPERTY_BUILDER_TOOLBAR_CONTAINER = A.getClassName('property', 'builder', 'toolbar', 'container'),
    CSS_TABBABLE = A.getClassName('tabbable'),
    CSS_TABBABLE_CONTENT = A.getClassName('tabbable', 'content'),
    CSS_TABLE_STRIPED = A.getClassName('table', 'striped');

/**
 * Static property used to define the default attribute
 * configuration for the `A.PropertyBuilderSettings`.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
PropertyBuilderSettings.ATTRS = {
    /**
     * Stores an instance of `A.PropertyList`.
     *
     * @attribute propertyList
     * @default null
     * @type Object
     */
    propertyList: {
        setter: '_setPropertyList',
        validator: A.Lang.isObject,
        value: null
    },

    /**
     * Stores an instance of `A.TabView`.
     *
     * @attribute tabView
     * @default null
     * @type Object
     * @writeOnce
     */
    tabView: {
        setter: '_setTabView',
        validator: A.Lang.isObject,
        value: null,
        writeOnce: true
    },

    /**
     * Stores an instance of `A.Toolbar`.
     *
     * @attribute toolbar
     * @default null
     * @type Object
     */
    toolbar: {
        setter: '_setToolbar',
        validator: A.Lang.isObject,
        value: null
    },

    /**
     * Host node for toolbar created using the `TOOLBAR_CONTAINER_TEMPLATE`
     * template.
     *
     * @attribute toolbarContainer
     */
    toolbarContainer: {
        valueFn: function() {
            return A.Node.create(this.TOOLBAR_CONTAINER_TEMPLATE);
        }
    }
};

/**
 * Object hash, defining how attribute values have to be parsed from markup.
 *
 * @property HTML_PARSER
 * @type Object
 * @extends A.PropertyBuilder.HTML_PARSER
 * @static
 */
PropertyBuilderSettings.HTML_PARSER = {
    toolbarContainer: '.' + CSS_PROPERTY_BUILDER_TOOLBAR_CONTAINER
};

A.mix(PropertyBuilderSettings.prototype, {
    TOOLBAR_CONTAINER_TEMPLATE: '<div class="' + CSS_PROPERTY_BUILDER_TOOLBAR_CONTAINER + '"></div>',

    propertyList: null,

    settingsNode: null,

    tabView: null,

    toolbar: null,

    initializer: function() {
        this.publish({
            cancel: {
                defaultFn: this._defCancelFn
            }
        });

        this.on('render', function() {
            this._renderTabs();
        });
    },

    /**
     * Fires after one or more attributes on the model are changed.
     *
     * @method _afterModelChange
     * @param event
     * @protected
     */
    _afterModelChange: function() {
        var instance = this;

        instance._handleSaveEvent();
    },

    /**
     * Fires after `tabView` selection change.
     *
     * @method _afterSelectionChange
     * @param event
     * @protected
     */
    _afterSelectionChange: function(event) {
        var instance = this,
            tabview = event.newVal,
            tabNode;

        if (tabview) {
            tabNode = tabview.get('panelNode');

            if (instance.get('rendered') && (tabNode === instance.settingsNode)) {
                instance._renderSettings();
            }
        }
    },

    /**
     * Selects the `tabView` child at index zero.
     *
     * @method _defCancelFn
     * @param event
     * @protected
     */
    _defCancelFn: function() {
        var instance = this;

        instance.tabView.selectChild(0);
    },

    /**
     * Fires a cancel event.
     *
     * @method _handleCancelEvent
     * @protected
     */
    _handleCancelEvent: function() {
        var instance = this;

        instance.fire('cancel');
    },

    /**
     * Fires a save event.
     *
     * @method _handleSaveEvent
     * @protected
     */
    _handleSaveEvent: function() {
        var instance = this;

        instance.fire('save');
    },

    /**
     * Creates an instance of `A.PropertyList` in `propertyList` attribute
     * and renders it.
     *
     * @method _renderPropertyList
     * @protected
     */
    _renderPropertyList: function() {
        var instance = this;

        if (!instance.propertyList) {
            var propertyList = instance.propertyList = new A.PropertyList(instance.get('propertyList'));

            propertyList.render(instance.settingsNode);

            propertyList.get('boundingBox').unselectable().addClass(CSS_TABLE_STRIPED);
        }
    },

    /**
     * Calls the `_renderPropertyList` and `_renderToolbar` functions.
     *
     * @method _renderSettings
     * @protected
     */
    _renderSettings: function() {
        var instance = this;

        instance._renderPropertyList();

        instance._renderToolbar();
    },

    /**
     * Creates an instance of `A.TabView` in `tabView` attribute.
     *
     * @method _renderTabs
     * @protected
     */
    _renderTabs: function() {
        var instance = this;

        if (!instance.tabView) {
            var tabView = new A.TabView(instance.get('tabView'));

            instance.tabView = tabView;
            instance.fieldsNode = tabView.item(0).get('panelNode');
            instance.settingsNode = tabView.item(1).get('panelNode');
        }
    },

    /**
     * Creates an instance of `A.Toolbar` in `toolbar` attribute and renders
     * it.
     *
     * @method _renderToolbar
     * @protected
     */
    _renderToolbar: function() {
        var instance = this;

        if (!instance.toolbar) {
            instance.toolbar = new A.Toolbar(
                instance.get('toolbar')
            ).render(instance.settingsNode);
        }
    },

    /**
     * Sets the `propertyList` attribute.
     *
     * @method _setPropertyList
     * @param val
     * @protected
     */
    _setPropertyList: function(val) {
        var instance = this;

        return A.merge({
                bubbleTargets: instance,
                scroll: {
                    height: 400,
                    width: 'auto'
                },
                width: '99%'
            },
            val
        );
    },

    /**
     * Sets the `tabView` attribute.
     *
     * @method _setTabView
     * @param val
     * @protected
     */
    _setTabView: function(val) {
        var instance = this,
            boundingBox = instance.get('boundingBox'),
            tabViewContentNode = boundingBox.one('.' + CSS_TABBABLE_CONTENT),
            defaultValue;

        defaultValue = {
            after: {
                selectionChange: A.bind(instance._afterSelectionChange, instance)
            },
            boundingBox: boundingBox.one('.' + CSS_TABBABLE),
            bubbleTargets: instance,
            cssClass: CSS_PROPERTY_BUILDER_TABS,
            render: instance.get('contentBox'),
            srcNode: tabViewContentNode
        };

        if (!tabViewContentNode) {
            var strings = instance.getStrings();

            defaultValue.children = [
                {
                    label: strings.addNode
                },
                {
                    label: strings.settings,
                    disabled: true
                }
            ];
        }

        return A.merge(defaultValue, val);
    },

    /**
     * Sets the `toolbar` attribute.
     *
     * @method _setToolbar
     * @param val
     * @protected
     */
    _setToolbar: function(val) {
        var instance = this;
        var strings = instance.getStrings();

        return A.merge({
                bubbleTargets: instance,
                children: [
                    {
                        on: {
                            click: A.bind(instance._handleCancelEvent, instance)
                        },
                        label: strings.close
                    }
                ]
            },
            val
        );
    }
});

A.PropertyBuilderSettings = PropertyBuilderSettings;


}, '3.0.1', {"requires": ["aui-tabview", "aui-datatable-property-list"]});
