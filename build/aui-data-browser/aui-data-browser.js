AUI.add('aui-data-browser', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,
	isNull = Lang.isNull,
	isFunction = Lang.isFunction,

	getClassName = A.getClassName,

	NAME = 'databrowser',

	BINDUI = 'bindUI',
	ICON = 'icon',
	ICON_SEARCH = 'search',
	ICON_SUBMIT = 'circle-triangle-r',
	ICON_TREE = 'folder-open',
	IMAGE = 'image',
	RENDERUI = 'renderUI',
	SEARCH = 'search',
	TEXT = 'text',
	TREE = 'tree',

	SEARCHBROWSER = NAME + '-' + SEARCH + 'control',
	TREEBROWSER = NAME + '-' + TREE + 'control',

	addLeafClass = function(results) {
		for (var i in results) {
			if (results[i].children || (results[i].leaf != undefined && !results[i].leaf)) {
				addLeafClass(results[i].children);
			}
			else {
				results[i].cssClass = (results[i].cssClass ? ' ' : '') + CSS_RESULTS_ITEM;
			}
		}
	},

	isResultItem = function(node) {
		return node.hasClass(CSS_RESULTS_ITEM);
	},

	isTreeView = function(v) {
		return ( v instanceof A.TreeView );
	},

	CSS_RESULTS_ITEM = getClassName(NAME, 'results', 'item'),
	CSS_SEARCH = getClassName(NAME, SEARCH),
	CSS_SEARCH_LIST = getClassName(NAME, SEARCH, 'list'),
	CSS_SEARCH_LIST_ITEM = getClassName(NAME, SEARCH, 'list', 'item'),
	CSS_SEARCH_VIEW_ONLY = getClassName(NAME, SEARCH, 'view', 'only'),
	CSS_TREE = getClassName(NAME, TREE),
	CSS_TREE_NODE_LEAF = getClassName(TREE, 'node', 'leaf'),
	CSS_TREE_VIEW_ONLY = getClassName(NAME, TREE, 'view', 'only'),

	TPL_SEARCH = '<div class="' + CSS_SEARCH + '"></div>',
	TPL_SEARCH_LIST = '<ul class="' + CSS_SEARCH_LIST + '"></ul>',
	TPL_SEARCH_LIST_ITEM = '<li class="' + CSS_RESULTS_ITEM + ' ' + CSS_SEARCH_LIST_ITEM + '-{1}">{0}</li>',
	TPL_SEARCH_LIST_ITEM_IMAGE = '<img src="{2}" title="{1}" alt="" /><div>{0}</div>',
	TPL_SEARCH_LIST_ITEM_ICON = '<span class="{2}" title="{1}"></span><div>{0}</div>',
	TPL_SEARCH_LIST_ITEM_TEXT = '<div title="{1}">{0}</div>',
	TPL_TREE = '<div class="' + CSS_TREE + '"></div>';

var SearchBrowserView = function() {
	var instance = this;

	A.after(instance._renderUISearchBrowserView, instance, RENDERUI);
	A.after(instance._bindUISearchBrowserView, instance, BINDUI);
};

SearchBrowserView.ATTRS = {
	displayName: {
		value: false
	},
	matchKey: {
		value: ''
	}
};

SearchBrowserView.prototype = {
	/**
	 * Create the DOM structure for the SearchBrowserView. Lifecycle.
	 *
	 * @method _renderUISearchBrowserView
	 * @protected
	 */
	_renderUISearchBrowserView: function() {
		var instance = this;

		var viewNode = A.Node.create(TPL_SEARCH);

		instance.get('contentBox').append(viewNode);

		instance._viewNode = viewNode;
	},

	/**
	 * Bind the events on the SearchBrowserView UI. Lifecycle.
	 *
	 * @method _bindUISearchBrowserView
	 * @protected
	 */
	_bindUISearchBrowserView: function() {
		var instance = this;

		instance.on('handleResponse', instance._populateResultView, instance);
	},

	hideView: function() {
		var instance = this;

		instance._viewNode.hide();
	},

	showView: function() {
		var instance = this;

		instance._viewNode.show();
	},

	_populateResultView: function(event) {
		var instance = this;

		var response = event.response;

		var ok = instance.doBeforeLoadData(event);

		if (ok && !event.error) {
			instance.fire('dataReturn', event);

			var allResults = response.results;
			var displayName = instance.get('displayName');
			var matchKey = instance.get('matchKey');
			var sorted = [];

			if (matchKey) {
				var found = [];
				var unsorted = [];
				var index = 0;

				for (var i = 0; i < allResults.length; i++) {
					var name = allResults[i][matchKey];

					if (name != null) {
						if (found[name] != null) {
							sorted[found[name]].data.push(allResults[i]);
						}
						else {
							found[name] = index;

							sorted[index] = {
								name: name,
								data: [allResults[i]]
							};

							index++;
						}
					}
					else {
						unsorted.push(allResults[i]);
					}
				}

				sorted.sort(
					function(a, b) {
						return (a.data.length == b.data.length ? 0 : (a.data.length > b.data.length ? -1 : 1));
					}
				);

				if (unsorted.length > 0) {
					sorted.push(
						{
							name: '',
							data: unsorted
						}
					);
				}
			}
			else {
				sorted.push(
					{
						name: '',
						data: allResults
					}
				);
			}

			instance._viewNode.html('');

			for (var i = 0; i < sorted.length; i++) {
				var ul = A.Node.create(TPL_SEARCH_LIST);

				for (var j = 0; j < sorted[i].data.length; j++) {
					var data = sorted[i].data[j];

					var tpl;
					var icon;
					var type;

					if (data.imageUri) {
						tpl = TPL_SEARCH_LIST_ITEM_IMAGE;
						icon = data.imageUri;
						type = IMAGE;
					}
					else if (data.iconCss) {
						tpl = TPL_SEARCH_LIST_ITEM_ICON;
						icon =  data.iconCss;
						type = ICON;
					}
					else {
						tpl = TPL_SEARCH_LIST_ITEM_TEXT;
						type = TEXT;
					}

					tpl = Lang.sub(TPL_SEARCH_LIST_ITEM, [Lang.sub(tpl, [(displayName ? data.name : ''), data.title || '', icon || '']), type]);

					var item = A.Node.create(tpl);

					item.setData(NAME, data);

					ul.append(item);
				}

				if (matchKey) {
					new A.Panel(
						{
							collapsible: true,
							collapsed: (instance._viewNode.html() != ''),
							headerContent: sorted[i].name,
							bodyContent: ul
						}
					).render(instance._viewNode);
				}
				else {
					instance._viewNode.append(ul);
				}
			}
		}
	},

	_uiSetHeight: function(val) {
		var instance = this;

		var height = parseInt(val);
		var viewNode = instance._viewNode;

		if (height) {
			var padding = viewNode.getBorderWidth('tb') + viewNode.getPadding('tb');

			viewNode.setStyle('height', (height - padding));
		}
		else {
			viewNode.setStyle('height', '');
		}
	}
};

var SearchBrowser = A.Component.build(SEARCHBROWSER, A.Component, [A.DataSourceControl, A.InputTextControl, SearchBrowserView]);

var TreeBrowserView = function() {
	var instance = this;

	A.after(instance._renderUITreeBrowserView, instance, RENDERUI);
	A.after(instance._bindUITreeBrowserView, instance, BINDUI);
};

TreeBrowserView.ATTRS = {
	rootLabel: {
		value: ''
	}
};

TreeBrowserView.prototype = {
	/**
	 * Create the DOM structure for the TreeBrowserView. Lifecycle.
	 *
	 * @method _renderUITreeBrowserView
	 * @protected
	 */
	_renderUITreeBrowserView: function() {
		var instance = this;

		var contentBox = instance.get('contentBox');
		var dataSource = instance.get('dataSource');
		var viewNode = A.Node.create(TPL_TREE);

		contentBox.append(viewNode);

		var treeView = new A.TreeView().render(viewNode);

		treeView.on(
			'expand',
			function(event) {
				var instance = this;

				var node = event.tree.node;

				instance._expandNode(node, dataSource);
			},
			instance
		);

		instance._treeView = treeView;
		instance._viewNode = viewNode;
	},

	/**
	 * Bind the events on the TreeBrowserView UI. Lifecycle.
	 *
	 * @method _bindUITreeBrowserView
	 * @protected
	 */
	_bindUITreeBrowserView: function() {
		var instance = this;

		instance._expandNode(instance._treeView, instance.get('dataSource'));
	},

	doBeforeLoadData: function(event) {
		return true;
	},

	hideView: function() {
		var instance = this;

		instance._viewNode.hide();
	},

	showView: function() {
		var instance = this;

		instance._viewNode.show();
	},

	_expandNode: function(node, dataSource) {
		var instance = this;

		if (node && !node.hasChildNodes()) {
			var request = {
				cfg: (!isTreeView(node) ? node._originalConfig : null),
				callback: {
					success: function(event) {
						instance._populateResultView(
							A.mix(
								event,
								{
									node: node
								}
							)
						);
					}
				}
			};

			instance.fire('dataRequest', { request: request });

			dataSource.sendRequest(request);
		}
	},

	_populateResultView: function(event) {
		var instance = this;

		var response = event.response;
		var node = event.node;

		var ok = instance.doBeforeLoadData(event);

		if (ok && !event.error && node) {
			instance.fire('dataReturn', event);

			var allResults = response.results;

			if (allResults.length > 0) {
				var rootLabel = instance.get('rootLabel');

				if (rootLabel && isTreeView(node)) {
					var rootNode = new A.TreeNode(
						{
							label: rootLabel,
							children: allResults
						}
					);

					node.appendChild(rootNode);
				}
				else {
					A.each(
						allResults,
						function(options) {
							var tempNode = node.createNode.apply(instance, [options]);
	
							node.appendChild(tempNode);
						}
					);
				}
			}
		}
		else {
			instance.fire('dataError', event);
		}
	},

	_uiSetHeight: function(val) {
		var instance = this;

		var height = parseInt(val);
		var viewNode = instance._viewNode;

		if (height) {
			var padding = viewNode.getBorderWidth('tb') + viewNode.getPadding('tb');

			viewNode.setStyle('height', (height - padding));
		}
		else {
			viewNode.setStyle('height', '');
		}
	}
};

var TreeBrowser = A.Component.build(TREEBROWSER, A.Component, [A.DataSourceControl, TreeBrowserView]);

var DataBrowser = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			currentView: {
				value: SEARCH
			},
			searchView: {
				value: null
			},
			treeView: {
				value: null
			}
		},

		prototype: {
			renderUI: function() {
				var instance = this;

				var contentBox = instance.get('contentBox');
				var searchView = instance.get('searchView');
				var treeView = instance.get('treeView');

				if (searchView) {
					var searchBrowser = new SearchBrowser(
						A.mix(
							{
								iconButton: ICON_SUBMIT
							},
							searchView
						)
					).render(contentBox);

					instance._searchBrowser = searchBrowser;
				}
				else {
					contentBox.addClass(CSS_TREE_VIEW_ONLY)
				}

				if (treeView) {
					var treeBrowser = new TreeBrowser(
						treeView
					).render(contentBox);

					instance._treeBrowser = treeBrowser;
				}
				else {
					contentBox.addClass(CSS_SEARCH_VIEW_ONLY)
				}

				if (searchView && treeView) {
					var comboBox = instance._searchBrowser.comboBox;

					var toolbar = new A.Toolbar(
						{
							children: [
								{
									icon: ICON_SEARCH,
									handler: {
										fn: function() {
											var instance = this;

											instance.set('currentView', SEARCH);
											instance._updateViews();
										},
										context: instance
									}
								},
								{
									icon: ICON_TREE,
									handler: {
										fn: function() {
											var instance = this;

											instance.set('currentView', TREE);
											instance._updateViews();
										},
										context: instance
									}
								}
							]
						}
					).render(comboBox.get('boundingBox'));
				}
			},

			bindUI: function() {
				var instance = this;

				instance.get('contentBox').delegate(
					'click',
					function(event) {
						var node = event.currentTarget;
						var data;

						if (isResultItem(node)) {
							data = node.getData(NAME);
						}
						else {
							node = A.Widget.getByNode(node);

							if (node) {
								data = node._originalConfig;
							}
						}

						if (data) {
							instance.fire(
								'itemSelected',
								{
									item: data,
									node: node
								}
							);
						}
						else {
							instance.fire('itemError', event);
						}
					},
					'.' + CSS_RESULTS_ITEM + ', .' + CSS_TREE_NODE_LEAF
				);
			},

			syncUI: function() {
				var instance = this;

				instance._updateViews();
				instance._syncDimensions();
			},

			_syncDimensions: function() {
				var instance = this;

				var height = instance.get('height');

				if (height) {
					var boundingBox = instance.get('boundingBox');
					var searchBrowser = instance._searchBrowser;
					var treeBrowser = instance._treeBrowser;

					var paddingOffset = 0;

					if (searchBrowser) {
						var comboBox = searchBrowser.comboBox;

						if (comboBox) {
							var comboBoxEl = comboBox.get('boundingBox');

							paddingOffset += comboBoxEl.getBorderWidth('tb') + comboBoxEl.getMargin('tb') + comboBoxEl.get('offsetHeight');
						}
					}

					var scrollHeight = parseInt(instance.get('height'), 10) - paddingOffset;

					if (searchBrowser) {
						searchBrowser.set('height', scrollHeight);
					}

					if (treeBrowser) {
						treeBrowser.set('height', scrollHeight);
					}
				}
			},

			_updateViews: function() {
				var instance = this;

				var currentView = instance.get('currentView');
				var searchBrowser = instance._searchBrowser;
				var treeBrowser = instance._treeBrowser;

				if (searchBrowser && treeBrowser) {
					if (currentView == SEARCH) {
						treeBrowser.hideView();
						searchBrowser.showView();
					}
					else if (currentView == TREE) {
						searchBrowser.hideView();
						treeBrowser.showView();
					}
				}
			}
		}	
	}
);

A.DataBrowser = DataBrowser;

}, '@VERSION@' ,{requires:['aui-base','aui-datasource-control-base','aui-input-text-control','aui-tree','aui-panel'], skinnable:true});
