AUI.add('aui-tabs-menu-plugin', function(A) {
var Lang = A.Lang,

	getClassName = A.getClassName,

	TAB = 'tab',
	TABVIEW = 'tabview',
	TABVIEWMENU = 'tabviewmenu',
	TABVIEWMENU_PLUGIN = 'TabViewMenuPlugin',

	CONTENT_NODE = 'contentNode',
	HOST = 'host',
	LIST_NODE = 'listNode',
	RENDERED = 'rendered',

	CSS_TAB = getClassName(TAB),
	CSS_TABVIEW_LIST = getClassName(TABVIEW, 'list'),
	CSS_TABVIEW_LIST_CONTENT = getClassName(TABVIEW, 'list', 'content'),
	CSS_TABVIEW_MENU_ITEM = getClassName(TABVIEWMENU, 'item'),
	CSS_TABVIEW_MENU_ITEM_LABEL = getClassName(TABVIEWMENU, 'item', 'label'),
	CSS_TABVIEW_MENU_LIST = getClassName(TABVIEWMENU, 'list'),
	CSS_TABVIEW_MENU_TRIGGER = getClassName(TABVIEWMENU, 'trigger'),
	CSS_TABVIEW_WRAPPER = getClassName(TABVIEW, 'wrapper'),

	STR_FIRST = 'first',
	STR_LAST = 'last',

	TPL_CONTENT_MENU = '<ul></ul>',
	TPL_CONTENT_MENU_ITEM = '<li class="' + CSS_TABVIEW_MENU_ITEM + '" data-index="{0}"><a href="javascript:;" class="' + CSS_TABVIEW_MENU_ITEM_LABEL + '">{1}</a></li>',
	TPL_CONTENT_MENU_TRIGGER = '<div></div>';

var TabViewMenu = A.Component.create(
	{
		NAME: TABVIEWMENU_PLUGIN,

		NS: TABVIEWMENU,

		EXTENDS: A.Plugin.Base,

		prototype: {
			initializer: function() {
				var instance = this;

				instance.afterHostMethod('renderUI', instance.renderUI);
				instance.afterHostMethod('bindUI', instance.bindUI);

				instance.afterHostMethod('addTab', instance.addTab);
				instance.afterHostMethod('removeTab', instance.removeTab);
				instance.afterHostMethod('selectTab', instance.selectTab);

				instance.afterHostMethod('_onActiveTabChange', instance._onActiveTabChange);
				instance.afterHostMethod('_renderTabs', instance._renderTabs);

				instance._updateMenuTask = A.debounce(instance._updateMenu, 1, instance);
				instance._updateUITask = A.debounce(instance._updateUI, 1, instance);
			},

			bindUI: function() {
				var instance = this;

				var host = instance.get(HOST);

				A.on('windowresize', instance._onWindowResize, instance);
			},

			renderUI: function() {
				var instance = this;

				var host = instance.get(HOST);
				var listNode = host.get(LIST_NODE);

				var wrapper = instance._wrapper;

				instance._listNodeOuterWidth = (
					parseFloat(listNode.getComputedStyle('marginLeft')) +
					parseFloat(wrapper.getComputedStyle('borderLeftWidth')) +
					parseFloat(listNode.getComputedStyle('paddingLeft')) +
					parseFloat(listNode.getComputedStyle('paddingRight')) +
					parseFloat(wrapper.getComputedStyle('borderRightWidth')) +
					parseFloat(listNode.getComputedStyle('marginRight'))
				);

				instance._updateUITask();
			},

			addTab: function(tab, index) {
				var instance = this;

				var host = instance.get(HOST);

				if (host.get(RENDERED)) {
					instance._updateUITask();
				}
			},

			removeTab: function(index) {
				var instance = this;

				var host = instance.get(HOST);

				if (host.get(RENDERED)) {
					instance._updateUITask();
				}
			},

			selectTab: function(index) {
				var instance = this;

				instance._updateMenuTask();

				instance.fire(
					'selectTab',
					{
						index: index
					}
				);
			},

			_hideMenu: function() {
				var instance = this;

				var host = instance.get(HOST);

				var listNode = host.get(LIST_NODE);

				listNode.all('.' + CSS_TAB).show();

				if (instance._menuOverlay) {
					instance._menuOverlay.hide();

					instance._triggerNode.hide();
				}
			},

			_onActiveTabChange: function(event) {
				var instance = this;

				instance._updateMenuTask();
			},

			_onWindowResize: function(event) {
				var instance = this;

				if (instance._menuNode) {
					var contentNode = instance.get(HOST).get(CONTENT_NODE);

					instance._contentWidth = contentNode.get('offsetWidth') - instance._listNodeOuterWidth;

					instance._updateMenuTask();
				}
				else {
					instance._updateUITask();
				}
			},

			_renderMenu: function() {
				var instance = this;

				var trigger = A.Node.create(TPL_CONTENT_MENU_TRIGGER);
				var menuNode = A.Node.create(TPL_CONTENT_MENU);

				trigger.addClass(CSS_TABVIEW_MENU_TRIGGER);

				instance._wrapper.append(trigger);

				var menuOverlay = new A.OverlayContext(
					{
						align: {
							points: ['tr', 'br']
						},
						contentBox: menuNode,
						cancellableHide: true,
						cssClass: CSS_TABVIEW_MENU_LIST,
						hideDelay: 1000,
						hideOn: 'mouseout',
						showDelay: 0,
						showOn: 'click',
						trigger: trigger
					}
				).render();

				menuOverlay.refreshAlign();

				instance._menuNode = menuNode;
				instance._triggerNode = trigger;
				instance._menuOverlay = menuOverlay;

				instance.after('selectTab', menuOverlay.hide, menuOverlay);

				var host = instance.get(HOST);

				menuNode.delegate(
					'click',
					function(event) {
						var index = event.currentTarget.get('parentNode').attr('data-index');

						host.selectTab(index);
					},
					'li a'
				);
			},

			_renderTabs: function() {
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

			_updateMenu: function() {
				var instance = this;

				var host = instance.get(HOST);

				var menuNode = instance._menuNode;

				var wrapper = instance._wrapper;

				if (menuNode) {
					var hideMenu = true;
					var wrapperWidth = wrapper.get('offsetWidth');

					var itemsWidth = instance._itemsWidth;

					if (itemsWidth[itemsWidth.length - 1] > instance._contentWidth) {
						var listNode = host.get(LIST_NODE);
						var tabs = listNode.all('.' + CSS_TAB);

						var selectedIndex = host.getTabIndex(host.get('activeTab'));
						var selectedOffset = (selectedIndex != 0 ? itemsWidth[selectedIndex] - itemsWidth[selectedIndex - 1] : 0);

						var contentWidth = instance._contentWidth;

						var selectTab = host.selectTab;
						var textBuffer = [];
						var tplBuffer = [];

						tabs.each(
							function(item, index, collection) {
								var offset = (index < selectedIndex ? selectedOffset : 0);

								if (index != selectedIndex && itemsWidth[index] + offset > contentWidth) {
									item.hide();

									textBuffer[0] = index;
									textBuffer[1] = item.get('text');

									var tplObj = Lang.sub(TPL_CONTENT_MENU_ITEM, textBuffer);

									tplBuffer.push(tplObj);

									hideMenu = false;
								}
								else {
									item.show();
								}
							}
						);

						menuNode.setContent(tplBuffer.join(''));

						var menuItems = menuNode.all('li');

						menuItems.first().addClass(STR_FIRST);
						menuItems.last().addClass(STR_LAST);
					}

					if (hideMenu) {
						instance._hideMenu();
					}
					else {
						instance._triggerNode.show();
					}
				}
			},

			_updateUI: function() {
				var instance = this;

				var host = instance.get(HOST);

				instance._hideMenu();

				var contentNode = host.get(CONTENT_NODE);
				var listNode = host.get(LIST_NODE);
				var tabs = listNode.all('.' + CSS_TAB);

				instance._contentWidth = contentNode.get('offsetWidth') - instance._listNodeOuterWidth;
				instance._itemsWidth = [];

				var itemsWidth = instance._itemsWidth;

				var listNodePadding = (
					parseFloat(listNode.getComputedStyle('paddingLeft')) +
					parseFloat(listNode.getComputedStyle('paddingRight'))
				);

				var lastIndex = tabs.size() - 1;

				tabs.each(
					function(item, index, collection) {
						var listItemMargin = (
							parseFloat(item.getComputedStyle('marginRight')) +
							parseFloat(item.getComputedStyle('marginLeft'))
						);

						var previousIndex = index - 1;

						if (index > 0) {
							itemsWidth[previousIndex] = listNodePadding + listItemMargin + item.get('offsetLeft');
						}

						if (index == lastIndex) {
							itemsWidth[index] = itemsWidth[previousIndex] + item.get('offsetWidth');
						}
					}
				);

				if (itemsWidth[itemsWidth.length - 1] > instance._contentWidth) {
					if (!instance._menuOverlay) {
						instance._renderMenu();
					}

					instance._updateMenuTask();
				}
			}
		}
	}
);

A.namespace('Plugin').TabViewMenu = TabViewMenu;

}, '@VERSION@' ,{requires:['aui-component','aui-state-interaction','aui-tabs-base','aui-overlay-context','plugin']});
