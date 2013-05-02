var Lang = A.Lang,
    isBoolean = Lang.isBoolean,

    _DOT = '.',
    _SPACE = ' ',

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
    tab: '> ul > li:not(.nav-header):not(.disabled)',
    tabLabel: '> ul > li:not(.nav-header) > a',
    tabPanel: '> div > div',
    tabview: _DOT + A.TabviewBase._classNames.tabview,
    tabviewList: '> ul',
    tabviewPanel: '> div'
};

A.Tab.CSS_PREFIX = getClassName(TAB);
A.Tab.NAME = TAB;

A.Tab = A.Component.create({
    NAME: TAB,

    CSS_PREFIX: getClassName(TAB),

    EXTENDS: A.Tab,

    prototype: {
        initializer: function() {
            var instance = this;

            A.after(instance._afterUiSetDisabled, instance, '_uiSetDisabled');
        },

        // TODO: move to A.Component?
        _afterUiSetDisabled: function(val) {
            var instance = this;

            instance.get(BOUNDING_BOX).toggleClass(getClassName(DISABLED), val);
        }
    }
});

A.TabView.NAME = TABBABLE;
A.TabView.CSS_PREFIX = getClassName(TABBABLE);

A.TabView = A.Component.create({
    NAME: TABBABLE,

    CSS_PREFIX: getClassName(TABBABLE),

    ATTRS: {
        stacked: {
            validator: isBoolean,
            value: false
        },

        type: {
            validator: function(val) {
                return val === LIST || val === TABS || val === PILLS;
            },
            value: TABS
        }
    },

    UI_ATTRS: [STACKED, TYPE],

    EXTENDS: A.TabView,

    prototype: {
        initializer: function() {
            var instance = this;

            instance.after(instance._afterSyncUI, instance, SYNC_UI);
            instance.after(TYPE_CHANGE, instance._afterTypeChange);
        },

        disableTab: function(i) {
            var instance = this;

            instance.item(i).set(DISABLED, true);
        },

        enableTab: function(i) {
            var instance = this;

            instance.item(i).set(DISABLED, false);
        },

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

        _afterTypeChange: function(event) {
            var instance = this,
                listNode = instance.get(LIST_NODE);

            if (event.prevVal) {
                listNode.removeClass(getClassName(NAV, event.prevVal));
            }
        },

        // Check if the child is already inDoc to avoid be appended to the renderTo node.
        // TODO: file issue on yui.
        _renderChildren: function () {
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

        _uiSetType: function(val) {
            var instance = this,
                listNode = instance.get(LIST_NODE);

            listNode.addClass(getClassName(NAV, val));
        },

        _uiSetStacked: function(val) {
            var instance = this,
                listNode = instance.get(LIST_NODE);

            listNode.toggleClass(
                A.TabviewBase._classNames.tabviewListStacked, val);
        }
    }
});