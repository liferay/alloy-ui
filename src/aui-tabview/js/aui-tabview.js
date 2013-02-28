var Lang = A.Lang,
    isBoolean = Lang.isBoolean,

    _DOT = '.',
    _SPACE = ' ',

    ACTIVE = 'active',
    BOUNDING_BOX = 'boundingBox',
    CONTENT = 'content',
    LABEL = 'label',
    LIST_NODE = 'listNode',
    NAV = 'nav',
    PANE = 'pane',
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
    tab: '> ul > li',
    tabLabel: '> ul > li > a',
    tabPanel: '> div > div',
    tabview: _DOT + A.TabviewBase._classNames.tabview,
    tabviewList: '> ul',
    tabviewPanel: '> div'
};

A.TabView.NAME = 'tabbable';
A.TabView.CSS_PREFIX = getClassName('tabbable');
A.Tab.CSS_PREFIX = getClassName('tab');

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
                return val === TABS || val === PILLS;
            },
            value: TABS
        }
    },

    UI_ATTRS: [STACKED, TYPE],

    EXTENDS: A.TabView,

    prototype: {
        LIST_TEMPLATE: '<span></span>',
        PANEL_TEMPLATE: '<span></span>',

        initializer: function() {
            var instance = this;

            instance.after(instance._afterSyncUI, instance, SYNC_UI);
            instance.after(TYPE_CHANGE, instance._afterTypeChange);
        },

        _afterSelectionChange: function(event) {
            var instance = this,
                newVal = event.newVal,
                prevVal = event.prevVal,
                selectedTabClassName = A.TabviewBase._classNames.selectedTab;

            A.TabView.superclass._afterSelectionChange.apply(this, arguments);

            if (newVal) {
                newVal.get(BOUNDING_BOX).addClass(selectedTabClassName);
            }
            if (prevVal) {
                prevVal.get(BOUNDING_BOX).removeClass(selectedTabClassName);
            }
        },

        _afterTypeChange: function(event) {
            var instance = this,
                listNode = instance.get(LIST_NODE);

            if (event.prevVal) {
                listNode.removeClass(getClassName(NAV, event.prevVal));
            }
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