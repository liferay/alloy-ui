AUI.add('aui-tabs-base', function(A) {
var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

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

	CSS_TABVIEW_LIST = [getClassName(TABVIEW, 'list'), getClassName('widget', 'hd')].join(' '),
	CSS_TABVIEW_CONTENT = [getClassName(TABVIEW, 'content'), getClassName('widget', 'bd')].join(' '),

	CSS_HIDDEN = getClassName('helper-hidden'),

	TPL_DIV = '<div></div>',
	TPL_SPAN = '<span></span>',
	TPL_UL = '<ul></ul>',

	TPL_LABEL = TPL_SPAN,
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

					var node = A.Node.get(value);

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

					var node = A.Node.get(value);

					if (!node) {
						node = instance._createDefaultContentEl();

						instance.get(CONTENT_BOX).prepend(node);
					}

					node.addClass(CSS_TABVIEW_CONTENT);

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

					var node = A.Node.get(value);

					if (!node) {
						node = instance._createDefaultList();
					}

					instance.get(CONTENT_BOX).prepend(node);

					node.addClass(CSS_TABVIEW_LIST);

					return node;
				}
			},

			contentNode: {
				value: null,
				setter: function(value) {
					var instance = this;

					var node = A.Node.get(value);

					if (!node) {
						node = instance._createDefaultContentContainer();
					}

					instance.get(CONTENT_BOX).appendChild(node);

					node.addClass(CSS_TABVIEW_CONTENT);

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

				tab.set('tabView', instance);
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

}, '@VERSION@' ,{requires:['aui-component','aui-state-interaction']});

AUI.add('aui-tabs-menu-plugin', function(A) {
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

}, '@VERSION@' ,{requires:['aui-component','aui-state-interaction','aui-tabs-base','aui-overlay-context','plugin']});



AUI.add('aui-tabs', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-tabs-base','aui-tabs-menu-plugin']});

