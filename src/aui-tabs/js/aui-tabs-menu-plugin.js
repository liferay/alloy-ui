var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	TAB = 'tab',
	TABVIEW = 'tabview',
	TABVIEWMENU = 'tabviewmenu',
	TABVIEWMENU_PLUGIN = 'TabViewMenuPlugin',

	CONTENT_NODE = 'contentNode',
	HOST = 'host',
	LIST_NODE = 'listNode',
	RENDERED = 'rendered',

	CSS_HIDDEN = getClassName('helper-hidden'),

	CSS_TAB = getClassName(TAB),
	CSS_TABVIEW_LIST = getClassName(TABVIEW, 'list'),
	CSS_TABVIEW_LIST_CONTENT = getClassName(TABVIEW, 'list', 'content'),
	CSS_TABVIEW_MENU_ITEM = getClassName(TABVIEWMENU, 'item'),
	CSS_TABVIEW_MENU_ITEM_LABEL = getClassName(TABVIEWMENU, 'item', 'label'),
	CSS_TABVIEW_MENU_LIST = getClassName(TABVIEWMENU, 'list'),
	CSS_TABVIEW_MENU_TRIGGER = getClassName(TABVIEWMENU, 'trigger'),
	CSS_TABVIEW_WRAPPER = getClassName(TABVIEW, 'wrapper'),

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

			A.on('windowresize',
				function (event) {
					if (instance._menuNode != null) {
						var contentNode = host.get(CONTENT_NODE);

						instance._contentWidth = contentNode.get('offsetWidth') - instance._listNodePadding;

						instance._updateMenu();
					}
					else {
						instance._updateUI();
					}
				}
			);
		},

		renderUI: function () {
			var instance = this;

			var host = instance.get(HOST);
			var listNode = host.get(LIST_NODE);

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

			if (host.get(RENDERED)) {
				instance._updateUI();
			}
		},

		removeTab: function (index) {
			var instance = this;

			var host = instance.get(HOST);

			if (host.get(RENDERED)) {
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

		_removeMenu: function () {
			var instance = this;
			var host = instance.get(HOST);

			var listNode = host.get(LIST_NODE);

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

		_renderTabs: function () {
			var instance = this;
			var host = instance.get(HOST);

			var contentNode = host.get(CONTENT_NODE);
			var listNode = host.get(LIST_NODE);

			listNode.removeClass(CSS_TABVIEW_LIST);
			listNode.addClass(CSS_TABVIEW_LIST_CONTENT);

			var contentEl = host._createDefaultContentContainer();

			contentEl.addClass(CSS_TABVIEW_LIST);

			var wrapperEl = host._createDefaultContentContainer();

			wrapperEl.addClass(CSS_TABVIEW_WRAPPER);
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
				var wrapperWidth = instance._wrapper.get('offsetWidth');

				if (instance._itemsWidth[instance._itemsWidth.length - 1] > instance._contentWidth) {
					var listNode = host.get(LIST_NODE);
					var tabs = listNode.all('.' + CSS_TAB);

					var selectedIndex = host.getTabIndex(host.get('activeTab'));
					var selectedOffset = (selectedIndex != 0 ? instance._itemsWidth[selectedIndex] - instance._itemsWidth[selectedIndex - 1] : 0);

					instance._menuNode.empty();

					tabs.each(
						function (node, i, nodeList) {
							var offset = (i < selectedIndex ? selectedOffset : 0);

							if (i != selectedIndex && instance._itemsWidth[i] + offset > instance._contentWidth) {
								node.addClass(CSS_HIDDEN);

								var tplObj = Lang.sub(TPL_CONTENT_MENU_ITEM, [node.get('text')]);

								var menuItem = A.Node.create(tplObj);

								instance._menuNode.insert(menuItem);

								instance._menuNode.all('li a').last().on('click',
									function (index) {
										return function () {
											host.selectTab(index);
										}
									} (i)
								);

								removeMenu = false;
							}
							else {
								node.removeClass(CSS_HIDDEN);
							}
						}
					);
				}

				if (removeMenu) {
					instance._removeMenu();
				}
				else {
					var borderWidth = parseFloat(instance._wrapper.getComputedStyle('borderLeftWidth')) + parseFloat(instance._wrapper.getComputedStyle('borderRightWidth'))

					instance._triggerNode.setStyle('left', (wrapperWidth - instance._triggerNode.get('offsetWidth') - borderWidth) + 'px');
				}
			}
		},

		_updateUI: function () {
			var instance = this;
			var host = instance.get(HOST);

			instance._removeMenu();

			var contentNode = host.get(CONTENT_NODE);
			var listNode = host.get(LIST_NODE);
			var tabs = listNode.all('.' + CSS_TAB);

			instance._contentWidth = contentNode.get('offsetWidth') - instance._listNodePadding;
			instance._itemsWidth = [];

			var listNodePadding = parseFloat(listNode.getComputedStyle('paddingLeft')) + parseFloat(listNode.getComputedStyle('paddingRight'));

			tabs.each(
				function (node, i, nodeList) {
					var listItemMargin = parseFloat(node.getComputedStyle('marginRight')) + parseFloat(node.getComputedStyle('marginLeft'));

					if (i > 0) {
						instance._itemsWidth[i - 1] = listNodePadding + listItemMargin + node.get('offsetLeft');
					}

					if (i == nodeList.size() - 1) {
						instance._itemsWidth[i] = instance._itemsWidth[i - 1] + node.get('offsetWidth');
					}
				}
			);

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

				instance._menuOverlay = new A.OverlayContext(
					{
						trigger: instance._triggerNode,
						boundingBox: instance._menuNode,
						showOn: 'click',
						cancellableHide: false,
						hideOn: 'mouseout',
						hideDelay: 1000,
						showDelay: 0,
						align: { node: instance._triggerNode, points: ['tr', 'br'] }
					}
				);

				instance._menuOverlay.render();
			}
		}
	}
});

A.namespace('Plugin').TabViewMenu = TabViewMenu;