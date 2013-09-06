/**
 * The TabView Component
 *
 * @module aui-tabview
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,

    _DOT = '.',

    ACTIVE = 'active',
    BOUNDING_BOX = 'boundingBox',
    CONTENT = 'content',
    CONTENT_BOX = 'contentBox',
    DISABLED = 'disabled',
    LABEL = 'label',
    LIST = 'list',
    LIST_NODE = 'listNode',
    NAV = 'nav',
    PANE = 'pane',
    PANEL_NODE = 'panelNode',
    PILLS = 'pills',
    STACKED = 'stacked',
    SYNC_UI = 'syncUI',
    TAB = 'tab',
    TABBABLE = 'tabbable',
    TABS = 'tabs',
    TYPE = 'type',
    TYPE_CHANGE = 'typeChange',
    SELECTED_CHANGE = 'selectedChange',

    getClassName = A.getClassName;

A.TabviewBase._classNames = {
    selectedPanel: getClassName(ACTIVE),
    selectedTab: getClassName(ACTIVE),
    tab: getClassName(TAB),
    tabLabel: getClassName(TAB, LABEL),
    tabPanel: getClassName(TAB, PANE),
    tabview: getClassName(TABBABLE),
    tabviewList: getClassName(NAV),
    tabviewListStacked: getClassName(NAV, STACKED),
    tabviewPanel: getClassName(TAB, CONTENT)
};

A.TabviewBase._queries = {
    selectedPanel: '> div ' + _DOT + A.TabviewBase._classNames.selectedPanel,
    selectedTab: '> ul > ' + _DOT + A.TabviewBase._classNames.selectedTab,
    tab: '> ul > li:not(.nav-header)',
    tabLabel: '> ul > li:not(.nav-header) > a',
    tabPanel: '> div > div',
    tabview: _DOT + A.TabviewBase._classNames.tabview,
    tabviewList: '> ul',
    tabviewPanel: '> div'
};

A.Tab.CSS_PREFIX = getClassName(TAB);
A.Tab.NAME = TAB;

/**
 * A base class for Tab.
 *
 * Check the [live demo](http://alloyui.com/examples/tabview/).
 *
 * @class A.Tab
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.Tab = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property Tab.NAME
     * @type String
     * @static
     */
    NAME: TAB,

    ATTRS: {

        /**
         * @attribute disabled
         */
        disabled: {
            validator: isBoolean,
            valueFn: '_valueDisabled'
        }
    },

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property Tab.CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: getClassName(TAB),

    /**
     * Static property used to define which component it extends.
     *
     * @property Tab.EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Tab,

    prototype: {

        /**
         * Construction logic executed during Tab instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.on(SELECTED_CHANGE, instance._onTabSelectedChange);

            A.after(instance._afterUiSetDisabled, instance, '_uiSetDisabled');
        },

        /**
         * Fire after <code>disabled</code> class been set on the UI.
         *
         * @method _afterUiSetDisabled
         * @param val
         * @protected
         */
        _afterUiSetDisabled: function(val) { // TODO: move to A.Component?
            var instance = this;

            instance.get(BOUNDING_BOX).toggleClass(getClassName(DISABLED), val);
        },

        /**
         * Fire before <code>selected</code> attribute change.
         *
         * @method _onTabSelectedChange
         * @param event
         * @protected
         */
        _onTabSelectedChange: function(event) {
            var instance = this;

            if (instance.get(DISABLED)) {
                event.halt();
            }
        },

        /**
         * Render tab panel.
         *
         * @method _renderPanel
         * @protected
         */
        _renderPanel: function() {
            var instance = this,
                tabPanelNode = instance.get('panelNode'),
                tabviewPanelNode = instance.get('parent').get('panelNode');

            // Overwrite Y.Tab._renderPanel in order to avoid re-appending tab
            // panel nodes if they are already in doc. This operation can
            // potentially steal focus of internal elements.
            if (!tabviewPanelNode.contains(tabPanelNode)) {
                tabviewPanelNode.appendChild(tabPanelNode);
            }
        },

        /**
         * Determines the value of the disabled attribute
         *
         * @method _valueDisabled
         * @protected
         * @return {Boolean}
         */
         _valueDisabled: function() {
            var instance = this;

            return instance.get(BOUNDING_BOX).hasClass(DISABLED);
        }
    }
});

A.TabView.NAME = TABBABLE;
A.TabView.CSS_PREFIX = getClassName(TABBABLE);

/**
 * A base class for TabView.
 *
 * Check the [live demo](http://alloyui.com/examples/tabview/).
 *
 * @class A.TabView
 * @extends TabView
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.TabView = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property TabView.NAME
     * @type String
     * @static
     */
    NAME: TABBABLE,

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property TabView.CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: getClassName(TABBABLE),

    /**
     * Static property used to define the default attribute
     * configuration for the TabView.
     *
     * @property TabView.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Determine the orientation of tabs.
         * Can be stacked (vertical) or not (horizontal).
         *
         * @attribute stacked
         * @default false
         * @type {Boolean}
         */
        stacked: {
            validator: isBoolean,
            value: false
        },

        /**
         * Determine the type of tabs.
         *
         * @attribute type
         * @default tabs
         * @type {String}
         */
        type: {
            validator: function(val) {
                return val === LIST || val === TABS || val === PILLS;
            },
            value: TABS
        }
    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property TabView.UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: [STACKED, TYPE],

    /**
     * Static property used to define which component it extends.
     *
     * @property TabView.EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.TabView,

    prototype: {

        /**
         * Construction logic executed during TabView instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.after(instance._afterSyncUI, instance, SYNC_UI);
            instance.after(TYPE_CHANGE, instance._afterTypeChange);
        },

        /**
         * Disable tab based on its index.
         *
         * @method disableTab
         * @param i
         */
        disableTab: function(i) {
            var instance = this;

            instance.item(i).set(DISABLED, true);
        },

        /**
         * Enable tab based on its index.
         *
         * @method enableTab
         * @param i
         */
        enableTab: function(i) {
            var instance = this;

            instance.item(i).set(DISABLED, false);
        },

        /**
         * Get the active tab.
         *
         * @method getActiveTab
         */
        getActiveTab: function() {
            var instance = this,
                _queries = A.TabviewBase._queries;

            return instance.get(CONTENT_BOX).one(_queries.selectedTab);
        },

        /**
         * Get the tabs.
         *
         * @method getActiveTab
         */
        getTabs: function() {
            var instance = this,
                _queries = A.TabviewBase._queries;

            return instance.get(CONTENT_BOX).all(_queries.tab);
        },

        /**
         * Fire after selected tab changes.
         *
         * @method _afterSelectionChange
         * @param event
         * @protected
         */
        _afterSelectionChange: function(event) {
            var newVal = event.newVal,
                prevVal = event.prevVal,
                selectedTabClassName = A.TabviewBase._classNames.selectedTab;

            A.TabView.superclass._afterSelectionChange.apply(this, arguments);

            if (newVal) {
                newVal.get(BOUNDING_BOX).addClass(selectedTabClassName);
                newVal.get(PANEL_NODE).addClass(selectedTabClassName);
            }
            if (prevVal) {
                prevVal.get(BOUNDING_BOX).removeClass(selectedTabClassName);
                prevVal.get(PANEL_NODE).removeClass(selectedTabClassName);
            }
        },

        /**
         * Fire after <code>type</code> attribute changes.
         *
         * @method _afterTypeChange
         * @param event
         * @protected
         */
        _afterTypeChange: function(event) {
            var instance = this,
                listNode = instance.get(LIST_NODE);

            if (event.prevVal) {
                listNode.removeClass(getClassName(NAV, event.prevVal));
            }
        },

        /**
         * Check if the child is already inDoc to avoid be appended to the renderTo node.
         *
         * @method _renderChildren
         * @protected
         */
        _renderChildren: function () { // TODO: file issue on YUI.
            var instance = this,
                renderTo = instance._childrenContainer || instance.get(CONTENT_BOX);

            instance._childrenContainer = renderTo;

            instance.each(function (child) {
                if (child.get(BOUNDING_BOX).inDoc()) {
                    renderTo = null;
                }
                child.render(renderTo);
            });
        },

        /**
         * Set the <code>type</code> attribute on the UI.
         *
         * @method _uiSetType
         * @param val
         * @protected
         */
        _uiSetType: function(val) {
            var instance = this,
                listNode = instance.get(LIST_NODE);

            listNode.addClass(getClassName(NAV, val));
        },

        /**
         * Toggle <code>stacked</code> attribute on the UI.
         *
         * @method _uiSetStacked
         * @param val
         * @protected
         */
        _uiSetStacked: function(val) {
            var instance = this,
                listNode = instance.get(LIST_NODE);

            listNode.toggleClass(
                A.TabviewBase._classNames.tabviewListStacked, val);
        }
    }
});