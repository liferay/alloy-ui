AUI.add('aui-tabs-base', function(A) {
var Lang = A.Lang,

	getClassName = A.getClassName,

	TAB = 'tab',
	TABVIEW = 'tabview',

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	CONTENT_NODE = 'contentNode',

	CSS_TAB = getClassName(TAB),
	CSS_TAB_CONTENT = getClassName(TAB, 'content'),
	CSS_TAB_LABEL = getClassName(TAB, 'label'),
	CSS_TAB_DISABLED = getClassName(TAB, 'disabled'),
	CSS_TAB_ACTIVE = getClassName(TAB, 'active'),
	CSS_TABVIEW_CONTENT = getClassName(TABVIEW, 'content'),
	CSS_TABVIEW_CONTENT_ITEM = getClassName(TABVIEW, 'content', 'item'),
	CSS_TABVIEW_LIST = getClassName(TABVIEW, 'list'),
	CSS_WIDGET_HEAD = getClassName('widget', 'hd'),
	CSS_WIDGET_BODY = getClassName('widget', 'bd'),

	CSS_TABVIEW_LIST_WIDGET = [CSS_TABVIEW_LIST, CSS_WIDGET_HEAD].join(' '),
	CSS_TABVIEW_CONTENT_WIDGET = [CSS_TABVIEW_CONTENT, CSS_WIDGET_BODY].join(' '),

	CSS_HIDDEN = getClassName('helper-hidden'),

	TPL_DIV = '<div></div>',
	TPL_UL = '<ul></ul>',

	TPL_LABEL = '<em></em>',
	TPL_TAB_CONTAINER = TPL_UL,
	TPL_CONTENT_ITEM = TPL_DIV,
	TPL_CONTENT_CONTAINER = TPL_DIV;

var Tab = A.Component.create(
	{
		NAME: TAB,

		ATTRS: {
			label: {
				lazyAdd: false,
				valueFn: function() {
					var instance = this;

					var boundingBox = instance.get(BOUNDING_BOX);

					var label = boundingBox.one('.' + CSS_TAB_LABEL);

					var value;

					if (label) {
						value = label.html();

						instance.set('labelNode', label);
					}
					else {
						value = boundingBox.html();
						boundingBox.html('');
					}

					return value;
				},

				setter: function(value) {
					var instance = this;

					var labelNode = instance.get('labelNode');

					labelNode.html(value);

					return value;
				}
			},

			labelNode: {
				valueFn: function() {
					var instance = this;

					var labelNode = instance.get(BOUNDING_BOX).one('.' + CSS_TAB_LABEL);

					if (!labelNode) {
						labelNode = instance._createDefaultLabel();
					}

					instance.get(CONTENT_BOX).appendChild(labelNode);

					return labelNode;
				},
				setter: function(value) {
					var instance = this;

					var node = A.one(value);

					if (!node) {
						node = instance._createDefaultLabel();

						instance.get(CONTENT_BOX).appendChild(node);
					}

					node.addClass(CSS_TAB_LABEL);

					return node;
				}
			},

			contentNode: {
				value: null,
				setter: function(value) {
					var instance = this;

					var node = A.one(value);

					if (!node) {
						node = instance._createDefaultContentEl();

						instance.get(CONTENT_BOX).prepend(node);
					}

					node.addClass(CSS_TABVIEW_CONTENT_ITEM);

					var current = instance.get(CONTENT_NODE);

					if (current) {
						if (!instance.get('active')) {
							node.addClass(CSS_HIDDEN);
						}

						var currentHTML = node.html();

						instance.set('content', currentHTML);
					}

					return node;
				}
			},

			content: {
				lazyAdd: false,
				valueFn: function() {
					var instance = this;

					var value = '';
					var contentNode = instance.get(CONTENT_NODE);

					if (contentNode) {
						value = contentNode.html();
					}

					return value;
				},
				setter: function(value) {
					var instance = this;

					var node = instance.get(CONTENT_NODE);

					var currentHTML = node.html();

					if (currentHTML != value) {
						node.html(value);
					}

					return value;
				}
			},

			active: {
				valueFn: function() {
					var instance = this;

					return instance.get(BOUNDING_BOX).hasClass(CSS_TAB_ACTIVE);
				},
				validator: function(value) {
					var instance = this;

					return Lang.isBoolean(value) && !instance.get('disabled');
				},
				setter: function(value) {
					var instance = this;

					var action = 'addClass';
					var boundingBox = instance.get(BOUNDING_BOX);

					if (value === false) {
						action = 'removeClass';
					}

					instance.StateInteraction.set('active', value);

					boundingBox[action](CSS_TAB_ACTIVE);

					instance.set('contentVisible', value);

					return value;
				}
			},

			disabled: {
				valueFn: function() {
					var instance = this;

					return instance.get(BOUNDING_BOX).hasClass(CSS_TAB_DISABLED);
				},
				setter: function(value) {
					var instance = this;

					var action = 'addClass';
					var boundingBox = instance.get(BOUNDING_BOX);

					if (value === false) {
						action = 'removeClass';
					}

					boundingBox[action](CSS_TAB_DISABLED);

					return value;
				}
			},

			contentVisible: {
				value: false,
				setter: function(value) {
					var instance = this;

					var action = 'addClass';
					var contentNode = instance.get(CONTENT_NODE);

					if (value === true) {
						action = 'removeClass';
					}

					if (!instance.get('active')) {
						contentNode[action](CSS_HIDDEN);
					}

					return value;
				}
			},

			tabView: {
				value: null
			}
		},

		prototype: {
			BOUNDING_TEMPLATE: '<li></li>',
			CONTENT_TEMPLATE: '<span></span>',
			bindUI: function() {
				var instance = this;

				var boundingBox = instance.get(BOUNDING_BOX);

				boundingBox.plug(
					A.Plugin.StateInteraction,
					{
						bubbleTarget: instance
					}
				);

				boundingBox.StateInteraction.on('click', instance._onActivateTab, instance);

				instance.StateInteraction = boundingBox.StateInteraction;

				instance.get('labelNode').on('click', instance._onLabelClick, instance);
			},

			_createDefaultLabel: function() {
				var instance = this;

				return A.Node.create(TPL_LABEL);
			},

			_createDefaultContentEl: function() {
				var instance = this;

				return A.Node.create(TPL_CONTENT_ITEM);
			},

			_onActivateTab: function(event) {
				var instance = this;

				event.halt();

				if (instance.get('disabled')) {
					return;
				}

				var tabView = instance.get('tabView');

				tabView.set('activeTab', instance);
			},

			_onLabelClick: function(event) {
				event.preventDefault();
			}
		}
	}
);

A.Tab = Tab;

var TabView = A.Component.create(
	{
		NAME: TABVIEW,

		ATTRS: {
			listNode: {
				value: null,
				setter: function(value) {
					var instance = this;

					var node = A.one(value);

					if (!node) {
						node = instance._createDefaultList();
					}

					instance.get(CONTENT_BOX).prepend(node);

					node.addClass(CSS_TABVIEW_LIST_WIDGET);

					return node;
				}
			},

			contentNode: {
				value: null,
				setter: function(value) {
					var instance = this;

					var node = A.one(value);

					if (!node) {
						node = instance._createDefaultContentContainer();
					}

					instance.get(CONTENT_BOX).appendChild(node);

					node.addClass(CSS_TABVIEW_CONTENT_WIDGET);

					return node;
				}
			},

			items: {
				value: []
			},

			activeTab: {
				value: null,
				setter: function(value) {
					var instance = this;

					var activeTab = instance.get('activeTab');

					if (activeTab) {
						if (activeTab != value) {
							activeTab.set('active', false);
						}
						else if (activeTab.get('disabled')) {
							value = null;
						}
					}

					return value;
				}
			}
		},

		prototype: {
			renderUI: function() {
				var instance = this;

				instance.after('activeTabChange', instance._onActiveTabChange);

				instance._renderContentSections();
				instance._renderTabs();
			},

			addTab: function(tab, index) {
				var instance = this;

				var before = instance.getTab(index);

				var items = instance.get('items');

				if (Lang.isUndefined(index)) {
					index = A.Array.indexOf(items, tab);
				}

				var inArray = index > -1;

				if (!inArray) {
					index = items.length;

					items.splice(index, 0, tab);
				}

				if (!instance.get('rendered') && !inArray) {
					return;
				}

				if (!(tab instanceof Tab)) {
					tab = new Tab(tab);

					items.splice(index, 1, tab);
				}

				var listNode = instance.get('listNode');

				tab.render(listNode);

				tab.set('tabView', instance);

				if (before) {
					listNode.insert(tab.get(BOUNDING_BOX), before.get(BOUNDING_BOX));
				}
				else {
					listNode.appendChild(tab.get(BOUNDING_BOX));
				}

				var tabContentNode = tab.get(CONTENT_NODE);

				var tabViewContentNode = instance.get(CONTENT_NODE);

				if (!tabViewContentNode.contains(tabContentNode)) {
					tabViewContentNode.appendChild(tabContentNode);
				}

				if (tab.get('active')) {
					instance.set('activeTab', tab);
				}
			},

			deselectTab: function(index){
				var instance = this;

				if (instance.getTab(index) === instance.get('activeTab')) {
					instance.set('activeTab', null);
				}
			},

			disableTab: function(index){
				var instance = this;

				var tab;

				if (Lang.isNumber(index)) {
					tab = instance.getTab(index);
				}
				else {
					tab = index;
				}

				if (tab) {
					tab.set('disabled', true);
				}
			},

			enableTab: function(index){
				var instance = this;

				var tab;

				if (Lang.isNumber(index)) {
					tab = instance.getTab(index);
				}
				else {
					tab = index;
				}

				if (tab) {
					tab.set('disabled', false);
				}
			},

			getTab: function(index){
				var instance = this;

				return instance.get('items')[index];
			},

			getTabIndex: function(tab){
				var instance = this;

				var items = instance.get('items');

				return A.Array.indexOf(items, tab);
			},

			removeTab: function(index){
				var instance = this;

				var tab;

				if (Lang.isNumber(index)) {
					tab = instance.getTab(index);
				}
				else {
					tab = index;

					index = instance.getTabIndex(tab);
				}

				if (tab) {
					var items = instance.get('items');

					var tabCount = items.length;

					if (tab === instance.get('activeTab')) {
						if (tabCount > 1) {
							if (index + 1 === tabCount) {
								instance.selectTab(index - 1);
							}
							else {
								instance.selectTab(index + 1);
							}
						}
						else {
							instance.set('activeTab', null);
						}
					}

					tab.destroy();

					items.splice(index, 1);
				}
			},

			selectTab: function(index){
				var instance = this;

				var selectedTab = instance.getTab(index);

				instance.set('activeTab', selectedTab);
			},

			_createDefaultList: function() {
				var instance = this;

				return A.Node.create(TPL_TAB_CONTAINER);
			},

			_createDefaultContentContainer: function() {
				var instance = this;

				return A.Node.create(TPL_CONTENT_CONTAINER);
			},

			_onActiveTabChange: function(event) {
				var instance = this;

				var oldTab = event.prevVal;
				var newTab = event.newVal;

				if (newTab) {
					newTab.set('active', true);
				}

				if (newTab != oldTab) {
					if (oldTab) {
						oldTab.set('active', false);
					}
				}
			},

			_renderContentSections: function() {
				var instance = this;

				instance._renderSection('list');
				instance._renderSection('content');
			},

			_renderSection: function(section) {
				var instance = this;

				instance.get(section + 'Node');
			},

			_renderTabs: function() {
				var instance = this;

				var contentNode = instance.get(CONTENT_NODE);
				var listNode = instance.get('listNode');

				var tabs = listNode.get('children');
				var tabContent = contentNode.get('children');

				var items = instance.get('items');

				var tabContentBoxClass = '.' + CSS_TAB_CONTENT;

				tabs.each(
					function(node, i, nodeList) {
						var config = {
							boundingBox: node,
							contentBox: node.one(tabContentBoxClass),
							contentNode: tabContent.item(i)
						};

						items.splice(i, 0, config);
					}
				);

				var length = items.length;

				for (var i = 0; i < items.length; i++) {
					instance.addTab(items[i]);
				}

				if (!instance.get('activeTab')) {
					instance.selectTab(0);
				}
			}
		}
	}
);

A.TabView = TabView;

}, '@VERSION@' ,{requires:['aui-component','aui-state-interaction'], skinnable:true});
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


AUI.add('aui-tabs', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-tabs-base','aui-tabs-menu-plugin']});

