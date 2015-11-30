YUI.add('aui-tabview', function (A, NAME) {

/**
 * The TabView Component
 *
 * @module aui-tabview
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,

    getClassName = A.getClassName;

A.TabviewBase._classNames = {
    selectedPanel: getClassName('active'),
    selectedTab: getClassName('active'),
    tab: getClassName('tab'),
    tabLabel: getClassName('tab', 'label'),
    tabPanel: getClassName('tab', 'pane'),
    tabview: getClassName('tabbable'),
    tabviewList: getClassName('nav'),
    tabviewListStacked: getClassName('nav', 'stacked'),
    tabviewPanel: getClassName('tab', 'content')
};

A.TabviewBase._queries = {
    selectedPanel: '> div ' + '.' + A.TabviewBase._classNames.selectedPanel,
    selectedTab: '> ul > ' + '.' + A.TabviewBase._classNames.selectedTab,
    tab: '> ul > li:not(.nav-header)',
    tabLabel: '> ul > li:not(.nav-header) > a',
    tabPanel: '> div > div',
    tabview: '.' + A.TabviewBase._classNames.tabview,
    tabviewList: '> ul',
    tabviewPanel: '> div'
};

A.Tab.CSS_PREFIX = getClassName('tab');
A.Tab.NAME = 'tab';

/**
 * A base class for Tab.
 *
 * Check the [live demo](http://alloyui.com/examples/tabview/).
 *
 * @class A.Tab
 * @extends Tab
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/tabview/basic-markup.html
 * @include http://alloyui.com/examples/tabview/basic.js
 */
A.Tab = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'tab',

    /**
     * Static property used to define the default attribute
     * configuration for the Tab.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Defines if the tabs should be enable or not.
         *
         * @attribute disabled
         * @type Boolean
         */
        disabled: {
            validator: isBoolean,
            valueFn: '_valueDisabled'
        }
    },

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: getClassName('tab'),

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
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

            instance.on('selectedChange', instance._onTabSelectedChange);

            A.after(instance._afterUiSetDisabled, instance, '_uiSetDisabled');
        },

        /**
         * Fire after `disabled` attribute been set on the UI.
         *
         * @method _afterUiSetDisabled
         * @param val
         * @protected
         */
        _afterUiSetDisabled: function(val) { // TODO: move to A.Component?
            var instance = this;

            instance.get('boundingBox').toggleClass(getClassName('disabled'), val);
        },

        /**
         * Fire before `selected` attribute change.
         *
         * @method _onTabSelectedChange
         * @param event
         * @protected
         */
        _onTabSelectedChange: function(event) {
            var instance = this;

            if (instance.get('disabled')) {
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
         * Determines the value of the `disabled` attribute.
         *
         * @method _valueDisabled
         * @protected
         * @return {Boolean}
         */
        _valueDisabled: function() {
            var instance = this;

            return instance.get('boundingBox').hasClass('disabled');
        }
    }
});

A.TabView.NAME = 'tabbable';
A.TabView.CSS_PREFIX = getClassName('tabbable');

/**
 * A base class for TabView.
 *
 * Check the [live demo](http://alloyui.com/examples/tabview/).
 *
 * @class A.TabView
 * @extends TabView
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.TabView = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'tabbable',

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: getClassName('tabbable'),

    /**
     * Constants for available tab view types.
     */
    TYPE_TABS: 'tabs',
    TYPE_LIST: 'list',
    TYPE_PILLS: 'pills',

    /**
     * Static property used to define the default attribute
     * configuration for the TabView.
     *
     * @property ATTRS
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
                return val === A.TabView.TYPE_LIST ||
                    val === A.TabView.TYPE_TABS ||
                    val === A.TabView.TYPE_PILLS;
            },
            value: 'tabs'
        }
    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['stacked', 'type'],

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.TabView,

    /**
     * Static property used to define the augmented classes.
     *
     * @property AUGMENTS
     * @type Array
     * @static
     */
    AUGMENTS: [A.WidgetCssClass],

    prototype: {

        /**
         * Construction logic executed during TabView instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.after(instance._afterSyncUI, instance, 'syncUI');
            instance.after('typeChange', instance._afterTypeChange);
        },

        /**
         * Disable tab based on its index.
         *
         * @method disableTab
         * @param i
         */
        disableTab: function(i) {
            var instance = this;

            instance.item(i).set('disabled', true);
        },

        /**
         * Enable tab based on its index.
         *
         * @method enableTab
         * @param i
         */
        enableTab: function(i) {
            var instance = this;

            instance.item(i).set('disabled', false);
        },

        /**
         * Get the active tab.
         *
         * @method getActiveTab
         */
        getActiveTab: function() {
            var instance = this,
                _queries = A.TabviewBase._queries;

            return instance.get('contentBox').one(_queries.selectedTab);
        },

        /**
         * Get the tabs.
         *
         * @method getTabs
         */
        getTabs: function() {
            var instance = this,
                _queries = A.TabviewBase._queries;

            return instance.get('contentBox').all(_queries.tab);
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
                newVal.get('boundingBox').addClass(selectedTabClassName);
                newVal.get('panelNode').addClass(selectedTabClassName);
            }
            if (prevVal) {
                prevVal.get('boundingBox').removeClass(selectedTabClassName);
                prevVal.get('panelNode').removeClass(selectedTabClassName);
            }
        },

        /**
         * Fire after `type` attribute changes.
         *
         * @method _afterTypeChange
         * @param event
         * @protected
         */
        _afterTypeChange: function(event) {
            var instance = this,
                listNode = instance.get('listNode');

            if (event.prevVal) {
                listNode.removeClass(getClassName('nav', event.prevVal));
            }
        },

        /**
         * Check if the child is already inDoc to avoid be appended to the
         * renderTo node.
         *
         * @method _renderChildren
         * @protected
         */
        _renderChildren: function() { // TODO: file issue on YUI.
            var instance = this,
                renderTo = instance._childrenContainer || instance.get('contentBox');

            instance._childrenContainer = renderTo;

            instance.each(function(child) {
                if (child.get('boundingBox').inDoc()) {
                    renderTo = null;
                }
                child.render(renderTo);
            });
        },

        /**
         * Set the `type` attribute on the UI.
         *
         * @method _uiSetType
         * @param val
         * @protected
         */
        _uiSetType: function(val) {
            var instance = this,
                listNode = instance.get('listNode');

            // Stacked tab views can't have the 'nav-tabs' class, they need
            // to only have 'nav-stacked' instead.
            if (val !== A.TabView.TYPE_TABS || !this.get('stacked')) {
                listNode.addClass(getClassName('nav', val));
            }
        },

        /**
         * Toggle `stacked` attribute on the UI.
         *
         * @method _uiSetStacked
         * @param val
         * @protected
         */
        _uiSetStacked: function(val) {
            var instance = this,
                listNode = instance.get('listNode');

            listNode.toggleClass(
                A.TabviewBase._classNames.tabviewListStacked, val);

            if (this.get('type') === A.TabView.TYPE_TABS) {
                listNode.toggleClass(getClassName('nav', A.TabView.TYPE_TABS), !val);
            }
        }
    }
});


}, '3.0.1', {"requires": ["selector-css3", "tabview", "aui-component", "aui-widget-css"], "skinnable": true});
