var Lang = A.Lang,

getClassName = A.ClassNameManager.getClassName,

TAB = 'tab',
TABVIEW = 'tabview',
TABVIEWMENU = 'tabviewmenu',
TABVIEWMENU_PLUGIN = 'TabViewMenuPlugin',

HOST = 'host',
CONTENT_NODE = 'contentNode',
RENDERED = 'rendered',

CSS_TAB = getClassName(TAB),
CSS_TABVIEW_LIST = getClassName(TABVIEW, 'list'),
CSS_TABVIEW_LIST_CONTENT = getClassName(TABVIEW, 'list', 'content'),
CSS_TABVIEW_WRAPPER = getClassName(TABVIEW, 'wrapper'),
CSS_TABVIEW_MENU_LIST = getClassName(TABVIEWMENU, 'list'),
CSS_TABVIEW_MENU_ITEM = getClassName(TABVIEWMENU, 'item'),
CSS_TABVIEW_MENU_ITEM_LABEL = getClassName(TABVIEWMENU, 'item', 'label'),
CSS_TABVIEW_MENU_TRIGGER = getClassName(TABVIEWMENU, 'trigger'),

CSS_HIDDEN = getClassName('helper-hidden'),

TPL_CONTENT_MENU = '<ul></ul>',
TPL_CONTENT_MENU_ITEM = '<li class="' + CSS_TABVIEW_MENU_ITEM + '"><a href="javascript:;" class="' + CSS_TABVIEW_MENU_ITEM_LABEL + '">{0}</a></li>',
TPL_CONTENT_MENU_TRIGGER = '<div></div>';

var TabViewMenu = A.Component.create(
{
    NAME: TABVIEWMENU_PLUGIN,
    
    NS: TABVIEWMENU,

    EXTENDS: A.Plugin.Base,

    prototype: {
		initializer: function() {
			var instance = this;
			
			instance.afterHostMethod('bindUI', instance.bindUI);
			instance.afterHostMethod('renderUI', instance.renderUI);
			instance.afterHostMethod('addTab', instance.addTab);
			instance.afterHostMethod('removeTab', instance.removeTab);
			instance.afterHostMethod('selectTab', instance.selectTab);
			instance.afterHostMethod('_onActiveTabChange', instance._onActiveTabChange);
			instance.afterHostMethod('_renderTabs', instance._renderTabs);
		},
        bindUI: function () {
            var instance = this;
            var host = instance.get(HOST);

            A.on('windowresize', function (event) {
                if (instance._menuNode != null) {
                    var contentNode = host.get(CONTENT_NODE);

                    instance._contentWidth = contentNode.get('offsetWidth') - instance._listNodePadding;
                    instance._updateMenu();
                }
                else {
                    instance._updateUI();
                }
            });
        },
        renderUI: function () {
            var instance = this;
            var host = instance.get(HOST);
            
            var listNode = host.get('listNode');

            instance._listNodePadding = parseFloat(listNode.getComputedStyle('marginLeft')) +
                                        parseFloat(instance._wrapper.getComputedStyle('borderLeftWidth')) +
                                        parseFloat(listNode.getComputedStyle('paddingLeft')) +
                                        parseFloat(listNode.getComputedStyle('paddingRight')) +
                                        parseFloat(instance._wrapper.getComputedStyle('borderRightWidth')) +
                                        parseFloat(listNode.getComputedStyle('marginRight'));

            instance._updateUI();
        },

        addTab: function (tab, index) {
            var instance = this;
            var host = instance.get(HOST);

            if (host.get('rendered')) {
                instance._updateUI();
            }
        },

        removeTab: function (index) {
            var instance = this;
            var host = instance.get(HOST);

            if (host.get('rendered')) {
                instance._updateUI();
            }
        },

        selectTab: function (index) {
            var instance = this;

            instance._updateMenu();
        },

        _onActiveTabChange: function (event) {
            var instance = this;

            instance._updateMenu();
        },

        _renderTabs: function () {
            var instance = this;
            var host = instance.get(HOST);

            var contentNode = host.get(CONTENT_NODE);
            var listNode = host.get('listNode');

            listNode.removeClass(CSS_TABVIEW_LIST);
            listNode.addClass(CSS_TABVIEW_LIST_CONTENT);

            var wrapperEl = host._createDefaultContentContainer();
            wrapperEl.addClass(CSS_TABVIEW_WRAPPER);

            var contentEl = host._createDefaultContentContainer();
            contentEl.addClass(CSS_TABVIEW_LIST);

            wrapperEl.append(contentEl);

            contentNode.insert(wrapperEl, listNode);
            contentEl.append(listNode);

            instance._wrapper = wrapperEl;
            instance._content = contentEl;
        },
        _updateMenu: function () {
            var instance = this;
            var host = instance.get(HOST);

            if (instance._menuNode != null) {
                var removeMenu = true;

                if (instance._itemsWidth[instance._itemsWidth.length - 1] > instance._contentWidth) {
                    var listNode = host.get('listNode');
                    var tabs = listNode.all('.' + CSS_TAB);

                    var selectedIndex = host.getTabIndex(host.get('activeTab'));
                    var selectedOffset = (selectedIndex != 0 ? instance._itemsWidth[selectedIndex] - instance._itemsWidth[selectedIndex - 1] : 0);

                    instance._menuNode.empty();

                    tabs.each(function (node, i, nodeList) {
                        if (i != selectedIndex && instance._itemsWidth[i] + (i < selectedIndex ? selectedOffset : 0) > instance._contentWidth) {
                            node.addClass(CSS_HIDDEN);

                            instance._menuNode.insert(TPL_CONTENT_MENU_ITEM.replace('{0}', node.get('text')));

                            instance._menuNode.all('li a').last().on('click', function (index) {
                                return function () {
                                	host.selectTab(index);
                                }
                            } (i));

                            removeMenu = false;
                        }
                        else {
                            node.removeClass(CSS_HIDDEN);
                        }
                    });
                }

                if (removeMenu) {
                    instance._removeMenu();
                }
                else {
                    instance._triggerNode.setStyle('left', (instance._wrapper.get('offsetWidth') - instance._triggerNode.get('offsetWidth') - (parseFloat(instance._wrapper.getComputedStyle('borderLeftWidth')) + parseFloat(instance._wrapper.getComputedStyle('borderRightWidth')))) + 'px');
                }
            }
        },
        _removeMenu: function () {
            var instance = this;
            var host = instance.get(HOST);

            var listNode = host.get('listNode');

            listNode.all('.' + CSS_TAB).removeClass(CSS_HIDDEN);

            if (instance._triggerNode != null) {
                instance._triggerNode.remove();
                instance._triggerNode = null;
            }

            if (instance._menuNode != null) {
                instance._menuNode.remove();
                instance._menuNode = null;
            }

            if (instance._menuOverlay != null) {
                instance._menuOverlay.destroy();
                instance._menuOverlay = null;
            }
        },
        _updateUI: function () {
            var instance = this;
            var host = instance.get(HOST);

            instance._removeMenu();

            var contentNode = host.get(CONTENT_NODE);
            var listNode = host.get('listNode');
            var tabs = listNode.all('.' + CSS_TAB);

            instance._itemsWidth = [];
            instance._contentWidth = contentNode.get('offsetWidth') - instance._listNodePadding;

            var listNodePadding = parseFloat(listNode.getComputedStyle('paddingLeft')) + parseFloat(listNode.getComputedStyle('paddingRight'));

            tabs.each(function (node, i, nodeList) {
                var listItemMargin = parseFloat(node.getComputedStyle('marginRight')) + parseFloat(node.getComputedStyle('marginLeft'));
                if (i > 0) {
                    instance._itemsWidth[i - 1] = listNodePadding + listItemMargin + node.get('offsetLeft');
                }
                if (i == nodeList.size() - 1) {
                    instance._itemsWidth[i] = instance._itemsWidth[i - 1] + node.get('offsetWidth');
                }
            });

            if (instance._itemsWidth[instance._itemsWidth.length - 1] > instance._contentWidth) {
                var trigger = A.Node.create(TPL_CONTENT_MENU_TRIGGER);
                trigger.addClass(CSS_TABVIEW_MENU_TRIGGER);
                instance._content.append(trigger);

                instance._triggerNode = trigger;

                var menuNode = A.Node.create(TPL_CONTENT_MENU);
                menuNode.addClass(CSS_TABVIEW_MENU_LIST);
                menuNode.appendTo(A.one('body'));

                instance._menuNode = menuNode;

                instance._updateMenu();

                instance._menuOverlay = new A.OverlayContext({
                    trigger: instance._triggerNode,
                    boundingBox: instance._menuNode,
                    showOn: 'click',
                    cancellableHide: false,
                    hideOn: 'mouseout',
                    hideDelay: 1000,
                    showDelay: 0,
                    align: { node: instance._triggerNode, points: ['tr', 'br'] }
	            });

	            instance._menuOverlay.render();
	        }
	    }
	}
});

A.namespace('Plugin').TabViewMenu = TabViewMenu;