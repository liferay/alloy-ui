var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,
	isNull = Lang.isNull,
	isFunction = Lang.isFunction,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'databrowser',
	SEARCH_VIEW = 'searchView',
	TREE_VIEW = 'treeView'

	ALERT = 'alert',
	ICON = 'icon',
	IMAGE = 'image',
	INPUT = 'input',
	LOADING = 'loading',
	RENDERED = 'rendered',
	SEARCH = 'search',
	TEXT = 'text',
	TREE = 'tree',

	ICON_FOLDER = 'folder-open', 
	ICON_DEFAULT = 'search',
	ICON_ERROR = ALERT,
	ICON_LOADING = LOADING,

	isResultItem = function(node) {
		return node.hasClass(CSS_RESULTS_ITEM);
	},

	isTreeView = function(v) {
		return ( v instanceof A.TreeView );
	},

	isTreeNodeItem = function(node) {
		return node.hasClass(CSS_TREE_NODE);
	},

	CSS_RESULTS_ITEM = getClassName(NAME, 'results', 'item'),
	CSS_SEARCH = getClassName(NAME, SEARCH),
	CSS_SEARCH_LIST = getClassName(NAME, SEARCH, 'list'),
	CSS_SEARCH_LIST_ITEM = getClassName(NAME, SEARCH, 'list', 'item'),
	CSS_TREE = getClassName(NAME, TREE),
	CSS_TREE_NODE = getClassName(NAME, TREE, 'node'),

	KEY_ENTER = 13,

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',

	TPL_SEARCH = '<div class="' + CSS_SEARCH + '"></div>',
	TPL_SEARCH_LIST = '<ul class="' + CSS_SEARCH_LIST + '"></ul>',
	TPL_SEARCH_LIST_ITEM = '<li class="' + CSS_RESULTS_ITEM + ' ' + CSS_SEARCH_LIST_ITEM + '-{1}">{0}</li>',
	TPL_SEARCH_LIST_ITEM_IMAGE = '<img src="{2}" title="{1}" alt="" /><div>{0}</div>',
	TPL_SEARCH_LIST_ITEM_ICON = '<span class="{2}" title="{1}"></span><div>{0}</div>',
	TPL_SEARCH_LIST_ITEM_TEXT = '<div title="{1}">{0}</div>',
	TPL_TREE = '<div class="' + CSS_TREE + '"></div>';

var DataBrowser = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			autoLoad: {
				value: true
			},
			currentView: {
				value: SEARCH
			},
			dataSource: {
				value: null,
				getter: function() {
					var instance = this;

					var dataSource = [];

					if (instance.get(RENDERED)) {
						var searchView = instance.get(SEARCH_VIEW);

						if (searchView) {
							dataSource[SEARCH] = searchView.dataSource;
						}

						var treeView = instance.get(TREE_VIEW);

						if (treeView) {
							dataSource[TREE] = treeView.dataSource;
						}
					}

					return dataSource;
				}
			},
			displayName: {
				value: false
			},
			rootLabel: {
				value: ''
			},
			searchView: {
				value: null
			},
			treeView: {
				value: null
			}
		},

		prototype: {
			initializer: function() {
				var instance = this;

				instance._createDataSource();

				var searchView = instance.get(SEARCH_VIEW),
					treeView = instance.get(TREE_VIEW),
					currentView = instance.get('currentView');

				if (!treeView && currentView == TREE) {
					instance.set('currentView', SEARCH);
				}
				else if (!searchView && currentView == SEARCH) {
					instance.set('currentView', TREE);
				}
			},

			bindUI: function() {
				var instance = this;

				var searchView = instance.get(SEARCH_VIEW),
					treeView = instance.get(TREE_VIEW);

				if (searchView) {
					var buttonSearch = instance.buttonSearch,
						inputNode = instance.inputNode;

					searchView.dataSource.on('request', A.bind(buttonSearch.set, buttonSearch, ICON, ICON_LOADING));

					inputNode.on('focus', instance._onTextboxFocus, instance);
					inputNode.on('keydown', instance._onTextboxKeyDown, instance);

					if (treeView) {
						var buttonTree = instance.buttonTree;

						treeView.dataSource.on('request', A.bind(buttonTree.set, buttonTree, ICON, ICON_LOADING));
					}
				}

				instance.publish('dataError');
				instance.publish('dataRequest');
				instance.publish('dataReturn');
				instance.publish('textboxFocus');
				instance.publish('textboxKey');
				instance.publish('itemSelected');
				instance.publish('itemError');
			},

			renderUI: function() {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);

				if (instance.get(SEARCH_VIEW)) {
					instance._renderInput();

					var searchViewEl = A.Node.create(TPL_SEARCH);

					searchViewEl.hide();

					contentBox.append(searchViewEl);

					instance._searchViewEl = searchViewEl;
				}

				var treeView = instance.get(TREE_VIEW);

				if (treeView) {
					var dataSource = treeView.dataSource;

					var treeViewEl = A.Node.create(TPL_TREE);

					treeViewEl.hide();

					contentBox.append(treeViewEl);

					treeView = new A.TreeView(
						{
							boundingBox: treeViewEl
						}
					).render();

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
					instance._treeViewEl = treeViewEl;
				}

				contentBox.delegate(
					'click',
					function(event) {
						var node = event.currentTarget;

						if (isResultItem(node)) {
							var data = null;

							if (isTreeNodeItem(node)) {
								node = A.Widget.getByNode(node);

								if (node) {
									data = node._originalConfig;
								}
							}
							else {
								data = node.getData(NAME);
							}

							if (data) {
								instance.fire(
									'itemSelected',
									{
										node: node,
										item: data
									}
								);
							}
							else {
								instance.fire('itemError', event);
							}
						}
					},
					'.' + CSS_RESULTS_ITEM
				);
			},

			syncUI: function() {
				var instance = this;

				var searchView = instance.get(SEARCH_VIEW),
					treeView = instance.get(TREE_VIEW),
					currentView = instance.get('currentView'),
					autoLoad = instance.get('autoLoad');

				if (autoLoad) {
					if (currentView == SEARCH) {
						if (searchView) {
							instance._generateQuery();
						}
					}
					else if (currentView == TREE) {
						if (treeView) {
							instance._loadTreeView();
						}
					}
				}

				instance._syncResultViews();
				instance._toggleView();
			},

			doBeforeLoadData: function(event) {
				return true;
			},

			handleResponse: function(event) {
				var instance = this;

				var currentView = instance.get('currentView');

				var iconClass = null;

				if (event.error) {
					iconClass = ICON_ERROR;
				}

				if (currentView == SEARCH) {
					var button = instance.buttonSearch;

					if (!event.error) {
						iconClass = ICON_DEFAULT;
					}
					else {
						instance._query = null;
					}

					button.set(ICON, iconClass);
				}
				else if (currentView == TREE) {
					var button = instance.buttonTree;

					if (button) {
						if (!event.error) {
							iconClass = ICON_FOLDER;
						}

						button.set(ICON, iconClass);
					}
				}
			},

			generateRequest: function(query) {
				var instance = this;

				return {
					request: query,
					callback: {
						success: A.bind(
							function(event) {
								var instance = this;

								instance._populateSearchView(event);
							},
							instance
						),
						failure: A.bind(
							function(event) {
								var instance = this;

								instance._handleResponse(event);
							},
							instance
						)
					}
				};
			},

			_createDataSource: function() {
				var instance = this;

				var views = [instance.get(SEARCH_VIEW), instance.get(TREE_VIEW)];

				for (var i = 0; i < views.length; i++) {
					if (views[i]) {
						var dataSource = views[i].dataSource,
							data = dataSource;

						var dataSourceType = views[i].dataSourceType,
							schema = views[i].schema,
							schemaType = views[i].schemaType;

						if (!(dataSource instanceof A.DataSource.Local)) {
							if (!dataSourceType) {
								dataSourceType = 'Local';

								if (isFunction(data)) {
									dataSourceType = 'Function';
								}
								else if (isString(data)) {
									dataSourceType = 'IO';
								}
							}

							dataSource = new A.DataSource[dataSourceType](
								{
									source: data
								}
							);
						}

						dataSource.on('error', instance.handleResponse, instance);
						dataSource.after('response', instance.handleResponse, instance);

						dataSourceType = dataSource.name;

						if (dataSourceType == 'dataSourceLocal') {
							instance.set('applyLocalFilter', true);
						}

						views[i].dataSource = dataSource;
						views[i].dataSourceType = dataSourceType;

						if (schema) {
							if (schema.fn) {
								views[i].dataSource.plug(schema);
							}
							else {
								var schemaTypes = {
									array: A.Plugin.DataSourceArraySchema,
									json: A.Plugin.DataSourceJSONSchema,
									text: A.Plugin.DataSourceTextSchema,
									xml: A.Plugin.DataSourceXMLSchema
								};

								schemaType = (schemaType ? schemaType.toLowerCase() : 'array');

								views[i].dataSource.plug(
									{
										fn: schemaTypes[schemaType],
										cfg: {
											schema: schema
										}
									}
								);
							}
						}

						views[i].schema = schema;
					}
				}
			},

			_expandNode: function(node, dataSource) {
				var instance = this;

				if (node && !node.hasChildNodes()) {
					var request = {
						cfg: (!isTreeView(node) ? node._originalConfig : null),
						callback: {
							success: A.bind(
								function(event) {
									var instance = this;

									instance._populateTreeView(
										A.mix(
											event,
											{
												node: node
											}
										)
									);
								},
								instance
							),
							failure: A.bind(
								function(event) {
									var instance = this;

									instance._handleResponse(event);
								},
								instance
							)
						}
					};

					instance.fire('dataRequest', null, request);

					dataSource.sendRequest(request);
				}
			},

			_generateQuery: function(event) {
				var instance = this;

				var currentView = instance.get('currentView');

				var input = instance.inputNode,
					query = instance._query;

				var value = input.get('value');

				if (currentView == TREE && (value != '' && query == value)) {
					instance.set('currentView', SEARCH);

					instance._toggleView();
				}
				else {
					this._sendQuery(value);
				}
			},

			_loadTreeView: function() {
				var instance = this;

				var treeView = instance.get(TREE_VIEW);

				instance._expandNode(instance._treeView, treeView.dataSource);
			},

			_onTextboxFocus: function(event) {
				var instance = this;

				if (!instance.get('focused')) {
					instance.focus();

					instance._initInputValue = instance.inputNode.get('value');

					instance.fire('textboxFocus');
				}
			},

			_onTextboxKeyDown: function(event) {
				var instance = this;

				var keyCode = event.keyCode;

				switch (keyCode) {
					case KEY_ENTER:
						instance._generateQuery(event);
					break;

					default:
						instance.fire('textboxKey', keyCode);
					break;
				}

				instance._keyCode = keyCode;
			},

			_populateSearchView: function(event) {
				var instance = this;

				var response = event.response;

				var ok = instance.doBeforeLoadData(event);

				if (ok && !event.error) {
					instance.set('currentView', SEARCH);

					instance.fire('dataReturn', event);

					var searchView = instance.get(SEARCH_VIEW),
						displayName = instance.get('displayName');

					var allResults = response.results,
						folderKey = searchView.folderKey;

					var sorted = [];

					if (folderKey) {
						var found = [],
							unsorted = [];
	
						var index = 0;
	
						for (var i = 0; i < allResults.length; i++) {
							var name = allResults[i][folderKey];
	
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
							)
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

					instance._searchViewEl.html('');

					for (var i = 0; i < sorted.length; i++) {
						var ul = A.Node.create(TPL_SEARCH_LIST);

						for (var j = 0; j < sorted[i].data.length; j++) {
							var data = sorted[i].data[j];

							var tpl = null,
								icon = null,
								type = null;

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

						if (folderKey) {
							new A.Panel(
								{
									collapsible: true,
									collapsed: (instance._searchViewEl.html() != ''),
									headerContent: sorted[i].name,
									bodyContent: ul
								}
							).render(instance._searchViewEl);
						}
						else {
							instance._searchViewEl.append(ul);
						}
					}

					this._toggleView();
				}
			},

			_populateTreeView: function(event) {
				var instance = this;

				var response = event.response,
					node = event.node;

				var ok = instance.doBeforeLoadData(event);

				if (ok && !event.error && node != null) {
					instance.set('currentView', TREE);

					instance.fire('dataReturn', event);

					var allResults = response.results;

					if (allResults.length > 0) {
						function addLeafClass(results) {
							for (var i in results) {
								if (results[i].children || (results[i].leaf != undefined && !results[i].leaf)) {
									addLeafClass(results[i].children);
								}
								else {
									results[i].cssClass = (results[i].cssClass ? ' ' : '') + CSS_RESULTS_ITEM;
								}
							}
						}

						addLeafClass(allResults);

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
							A.each(allResults, function(options) {
								var tempNode = node.createNode.apply(instance, [options]);

								node.appendChild(tempNode);
							});
						}
					}

					this._toggleView();
				}
				else {
					instance.fire('dataError', event);
				}
			},

			_renderInput: function() {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX),
					input = instance.get('input'),
					treeView = instance.get(TREE_VIEW);

				var comboConfig = {
					field: {
						labelText: false
					},
					icons: [
						{
							icon: ICON_DEFAULT,
							handler: {
								fn: instance._generateQuery,
								context: instance
							}
						}
					]
				};

				if (treeView) {
					comboConfig.icons.push(
						{
							icon: ICON_FOLDER,
							handler: {
								fn: function() {
									var instance = this;
	
									instance.set('currentView', TREE);
	
									instance._loadTreeView();
									instance._toggleView();
								},
								context: instance
							}
						}
					);
				}

				var inputReference = null,
					inputParent = null;

				if (input) {
					input = A.one(input);

					comboConfig.field.node = input;

					inputReference = input.next();
					inputParent = input.get('parentNode');
				}

				var comboBox = new A.Combobox(comboConfig).render(contentBox);

				if (inputParent) {
					var comboBoundingBox = comboBox.get('boundingBox');

					inputParent.insertBefore(comboBoundingBox, inputReference);
				}

				instance.comboBox = comboBox;
				instance.inputNode = comboBox.get('node');
				instance.buttonSearch = comboBox.icons.item(0);

				if (treeView) {
					instance.buttonTree = comboBox.icons.item(1);
				}

				instance.set('uniqueName', A.stamp(instance.inputNode));
			},

			_sendQuery: function(query) {
				var instance = this;

				var searchView = instance.get(SEARCH_VIEW),
					dataSource = searchView.dataSource;

				query = encodeURIComponent(query);

				var request = instance.generateRequest(query);

				instance.fire('dataRequest', query, request);

				dataSource.sendRequest(request);

				instance._query = query;
			},

			_syncResultViews: function() {
				var instance = this;

				var height = instance.get('height');

				if (height) {
					var boundingBox = instance.get(BOUNDING_BOX);
	
					var searchViewEl = instance._searchViewEl,
						treeViewEl = instance._treeViewEl,
						comboBox = instance.comboBox;

					var comboBoxOffset = 0;

					if (comboBox) {
						var comboBoxEl = comboBox.get(BOUNDING_BOX);

						comboBoxOffset += (
							parseFloat(comboBoxEl.getComputedStyle('marginTop')) +
							parseFloat(comboBoxEl.getComputedStyle('borderTopWidth')) +
							comboBoxEl.getDOM().offsetHeight +
							parseFloat(comboBoxEl.getComputedStyle('borderBottomWidth')) +
							parseFloat(comboBoxEl.getComputedStyle('marginBottom'))
						);
					}

					var scrollHeight = parseInt(instance.get('height')) - comboBoxOffset;
	
					if (searchViewEl) {
						var padding = (
								parseFloat(searchViewEl.getComputedStyle('borderTopWidth')) +
								parseFloat(searchViewEl.getComputedStyle('paddingTop')) +
								parseFloat(searchViewEl.getComputedStyle('paddingBottom')) +
								parseFloat(searchViewEl.getComputedStyle('borderBottomWidth'))
							);

						searchViewEl.setStyle('height', (scrollHeight - padding) + 'px');
					}

					if (treeViewEl) {
						var padding = (
								parseFloat(treeViewEl.getComputedStyle('borderTopWidth')) +
								parseFloat(treeViewEl.getComputedStyle('paddingTop')) +
								parseFloat(treeViewEl.getComputedStyle('paddingBottom')) +
								parseFloat(treeViewEl.getComputedStyle('borderBottomWidth'))
							);

						treeViewEl.setStyle('height', (scrollHeight - padding) + 'px');
					}
				}
			},

			_toggleView: function() {
				var instance = this;

				var currentView = instance.get('currentView');

				var searchViewEl = instance._searchViewEl,
					treeViewEl = instance._treeViewEl;

				if (currentView == SEARCH) {
					if (treeViewEl) {
						treeViewEl.hide();
					}

					if (searchViewEl) {
						searchViewEl.show();
					}
				}
				else if (currentView == TREE) {
					if (searchViewEl) {
						searchViewEl.hide();
					}

					if (treeViewEl) {
						treeViewEl.show();
					}
				}
			}
		}
	}
);

A.DataBrowser = DataBrowser;