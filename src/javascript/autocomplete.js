AUI.add('autocomplete', function(A) {

var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,
	isNull = Lang.isNull,
	isFunction = Lang.isFunction,

	getClassName = A.ClassNameManager.getClassName,

	ALERT = 'alert',
	CIRCLE = 'circle',
	CONTENT = 'content',
	HELPER = 'helper',
	ICON = 'icon',
	INPUT = 'input',
	ITEM = 'item',
	LIST = 'list',
	LOADING = 'loading',
	NAME = 'autocomplete',
	NO = 'no',
	RESET = 'reset',
	RESULTS = 'results',
	S = 's',
	SELECTED = 'selected',
	TRIANGLE = 'triangle',
	TRIGGER = 'trigger',

	ICON_DEFAULT = 'circle-triangle-b',
	ICON_ERROR = ALERT,
	ICON_LOADING = LOADING,

	CSS_BUTTON_TRIGGER = getClassName(NAME, TRIGGER),
	CSS_HIGLIGHT = getClassName(NAME, SELECTED),
	CSS_ICON_BUTTON_TRIGGER = getClassName(NAME, TRIGGER, ICON),
	CSS_INPUT = getClassName(NAME, INPUT),
	CSS_LIST_ITEM = getClassName(NAME, LIST, ITEM),
	CSS_NO_RESULTS = getClassName(NAME, NO, RESULTS),
	CSS_RESULTS_LIST = getClassName(HELPER, RESET),
	CSS_RESULTS_OVERLAY = getClassName(NAME, RESULTS),
	CSS_RESULTS_OVERLAY_CONTENT = getClassName(NAME, RESULTS, CONTENT),

	KEY_BACKSPACE = 8,
	KEY_TAB = 9,
	KEY_ENTER = 13,
	KEY_SHIFT = 16,
	KEY_CTRL = 17,
	KEY_ALT = 18,
	KEY_CAPS_LOCK = 20,
	KEY_ESC = 27,
	KEY_PAGEUP = 33,
	KEY_END = 35,
	KEY_HOME = 36,
	KEY_UP = 38,
	KEY_DOWN = 40,
	KEY_RIGHT = 39,
	KEY_LEFT = 37,
	KEY_PRINT_SCREEN = 44,
	KEY_INSERT = 44,
	KEY_KOREAN_IME = 229,

	OVERLAY_ALIGN = {
		node: null,
		points: ['tl', 'bl']
	},

	TPL_INPUT = '<input type="text" />',
	TPL_INPUT_WRAPPER = '<span class="aui-ctrl-holder"></span>',

	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox';

	var AutoComplete = function() {
		AutoComplete.superclass.constructor.apply(this, arguments);
	};

	AutoComplete.NAME = NAME;

	AutoComplete.ATTRS = {

		allowBrowserAutocomplete: {
			value: true
		},

		alwaysShowContainer: {
			value: false
		},

		autoHighlight: {
			value: true
		},

		applyLocalFilter: {
			value: null
		},

		button: {
			value: true
		},

		dataSource: {
			value: null
		},

		dataSourceType: {
			value: null
		},

		delimChar: {
			value: null,
			setter: function(value) {
				if (isString(value) && (value.length > 0)) {
					value = [value];
				}
				else if (!isArray(value)) {
					value = A.Attribute.INVALID_VALUE;
				}

				return value;
			}
		},

		forceSelection: {
			value: false
		},

		input: {
			value: null
		},

		matchKey: {
			value: ''
		},

		maxResultsDisplayed: {
			value: 10
		},

		minQueryLength: {
			value: 1
		},

		queryDelay: {
			value: 0.2,
			getter: function(value) {
				return value * 1000;
			}
		},

		queryInterval: {
			value: 0.5,
			getter: function(value) {
				var instance = this;

				return value * 1000;
			}
		},

		queryMatchCase: {
			value: false
		},

		queryMatchContains: {
			value: false
		},

		queryQuestionMark: {
			value: true
		},

		resultTypeList: {
			value: true
		},

		schema: {
			value: null
		},

		schemaType: {
			value: '',
			validator: isString
		},

		suppressInputUpdate: {
			value: false
		},

		typeAhead: {
			value: false
		},

		typeAheadDelay: {
			value: 0.2,
			getter: function(value) {
				return value * 1000;
			}
		},

		uniqueName: {
			value: null
		}
	};

	A.extend(
		AutoComplete,
		A.Widget,
		{
			initializer: function(config) {
				var instance = this;

				instance._createDataSource();
			},

			renderUI: function() {
				var instance = this;

				instance._renderInput();
				instance._renderButton();

				instance._renderOverlay();
			},

			bindUI: function() {
				var instance = this;

				var button = instance.button;
				var inputNode = instance.inputNode;

				instance.dataSource.on('request', A.bind(button.set, button, ICON, ICON_LOADING));

				button.on('click', instance._onButtonMouseDown, instance);

				inputNode.on('blur', instance._onTextboxBlur, instance);
				inputNode.on('focus', instance._onTextboxFocus, instance);
				inputNode.on('keydown', instance._onTextboxKeyDown, instance);
				inputNode.on('keypress', instance._onTextboxKeyPress, instance);
				inputNode.on('keyup', instance._onTextboxKeyUp, instance);

				var overlayBoundingBox = instance.overlay.get(BOUNDING_BOX);

				overlayBoundingBox.on('click', instance._onContainerClick, instance);
				overlayBoundingBox.on('mouseout', instance._onContainerMouseout, instance);
				overlayBoundingBox.on('mouseover', instance._onContainerMouseover, instance);
				overlayBoundingBox.on('scroll', instance._onContainerScroll, instance);

				instance.publish('containerCollapse');
				instance.publish('containerExpand');
				instance.publish('containerPopulate');

				instance.publish('dataError');
				instance.publish('dataRequest');
				instance.publish('dataReturn');

				instance.publish('itemArrowFrom');
				instance.publish('itemArrowTo');
				instance.publish('itemMouseOut');
				instance.publish('itemMouseOver');
				instance.publish('itemSelect');

				instance.publish('selectionEnforce');

				instance.publish('textboxBlur');
				instance.publish('textboxChange');
				instance.publish('textboxFocus');
				instance.publish('textboxKey');

				instance.publish('typeAhead');

				instance.publish('unmatchedItemSelect');

				instance.overlay.on('visibleChange', instance._realignContainer);
			},

			syncUI: function() {
				var instance = this;

				instance.inputNode.setAttribute('autocomplete', 'off');
			},

			doBeforeExpandContainer: function() {
				return true;
			},

			doBeforeLoadData: function(event) {
				return true;
			},

			filterResults: function(event) {
				var instance = this;

				var callback = event.callback;
				var query = event.request;
				var response = event.response;

				if (callback && callback.argument && callback.argument.query) {
					query = callback.argument.query;
				}

				if (query) {
					var dataSource = instance.dataSource;
					var allResults = response.results;
					var filteredResults = [];
					var matchFound = false;
					var matchKey = instance.get('matchKey') || 0;
					var matchCase = instance.get('queryMatchCase');
					var matchContains = instance.get('queryMatchContains');
					var showAll = (query == '*');

					var fields = instance.get('schema.resultFields');

					for (var i = allResults.length - 1; i >= 0; i--){
						var result = allResults[i];

						var strResult = null;

						if (isString(result)) {
							strResult = result;
						}
						else if (isArray(result)) {
							strResult = result[0];
						}
						else if (fields) {
							strResult = result[matchKey || fields[0]];
						}

						if (isString(strResult)) {
							var keyIndex = -1;

							if (matchCase) {
								keyIndex = strResult.indexOf(decodeURIComponent(query));
							}
							else {
								keyIndex = strResult.toLowerCase().indexOf(decodeURIComponent(query).toLowerCase());
							}

							if (
								(showAll) ||
								(!matchContains && (keyIndex === 0)) ||
								(matchContains && (keyIndex > -1)
								)
							) {
								filteredResults.unshift(result);
							}
						}
					}

					response.results = filteredResults;
				}

				return response;
			},

			formatResult: function(result, request, resultMatch) {
				return resultMatch || '';
			},

			generateRequest: function(query) {
				return query;
			},

			handleResponse: function(event) {
				var instance = this;

				instance._populateList(event);

				var iconClass = ICON_DEFAULT;

				if (event.error) {
					iconClass = ICON_ERROR;
				}

				instance.button.set(ICON, iconClass);
			},

			preparseRawResponse: function(event) {
			},

			sendQuery: function(query) {
				var instance = this;

				instance.set('focused', null);

				var newQuery = query;

				if (instance.get('delimChar')) {
					query = instance.inputNode.get('value') + query;
				}

				instance._sendQuery(newQuery);
			},

			_clearInterval: function() {
				var instance = this;

				if (instance._queryIntervalId) {
					clearInterval(instance._queryIntervalId);

					instance._queryIntervalId = null;
				}
			},

			_clearSelection: function() {
				var instance = this;

				var delimChar = instance.get('delimChar');
				var extraction = {
					previous: '',
					query: instance.inputNode.get('value')
				};

				if (delimChar) {
					extraction = instance._extractQuery(instance.inputNode.get('value'));
				}

				instance.fire('selectionEnforce', extraction.query);
			},

			_createDataSource: function() {
				var instance = this;

				var dataSource = instance.get('dataSource');
				var data = dataSource;

				var dataSourceType = instance.get('dataSourceType');

				if (!(dataSource instanceof A.DataSource.Local)) {
					if (!dataSourceType) {
						dataSourceType = 'Local';

						if (isFunction(data)) {
							dataSourceType = 'Function'
						}
						else if (isString(data)) {
							dataSourceType = 'IO'
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

				instance.set('dataSource', dataSource);
				instance.set('dataSource', dataSourceType);

				instance.dataSource = dataSource;

				var schema = instance.get('schema');

				if (schema) {
					if (schema.fn) {
						instance.dataSource.plug(schema);
					}
					else {
						var schemaType = instance.get('schemaType');

						var schemaTypes = {
							array: A.Plugin.DataSourceArraySchema,
							json: A.Plugin.DataSourceJSONSchema,
							text: A.Plugin.DataSourceTextSchema,
							xml: A.Plugin.DataSourceXMLSchema
						};

						schemaType = schemaType.toLowerCase() || 'array';

						instance.dataSource.plug(
							{
								fn: schemaTypes[schemaType],
								cfg: {
									schema: schema
								}
							}
						);
					}
				}

				instance.set('schema', schema);
			},

			_enableIntervalDetection: function() {
				var instance = this;

				var queryInterval = instance.get('queryInterval');

				if (!instance._queryIntervalId && queryInterval) {
					instance._queryInterval = setInterval(A.bind(instance._onInterval, instance), queryInterval);
				}
			},

			_extractQuery: function(query) {
				var instance = this;

				var delimChar = instance.get('delimChar');
				var delimIndex = -1;
				var i = delimChar.length - 1;

				var newIndex, queryStart, previous;

				for (; i >= 0; i--) {
					newIndex = query.lastIndexOf(delimChar[i]);

					if (newIndex > delimIndex) {
						delimIndex = newIndex;
					}
				}

				if (delimChar[i] == ' ') {
					for (var j = delimChar.length - 1; j >= 0; j--){
						if (query[delimIndex - 1] == delimChar[j]) {
							delimIndex--;

							break;
						}
					}
				}

				if (delimIndex > -1) {
					queryStart = delimIndex + 1;

					while (query.charAt(queryStart) == ' ') {
						queryStart += 1;
					}

					previous = query.substring(0, queryStart);

					query = query.substring(queryStart);
				}
				else {
					previous = '';
				}

				return {
					previous: previous,
					query: query
				};
			},

			_focus: function() {
				var instance = this;

				setTimeout(
					function() {
						instance.inputNode.focus();
					},
					0
				);
			},

			_isIgnoreKey: function(keyCode) {
				var instance = this;

				if (
					(keyCode == KEY_TAB) ||
					(keyCode == KEY_ENTER) ||
					(keyCode == KEY_SHIFT) ||
					(keyCode == KEY_CTRL) ||
					(keyCode >= KEY_ALT && keyCode <= KEY_CAPS_LOCK) ||
					(keyCode == KEY_ESC) ||
					(keyCode >= KEY_PAGEUP && keyCode <= KEY_END) ||
					(keyCode >= KEY_HOME && keyCode <= KEY_DOWN) ||
					(keyCode >= KEY_PRINT_SCREEN && keyCode <= KEY_INSERT) ||
					(keyCode == KEY_KOREAN_IME)
				) {
					return true;
				}

				return false;
			},

			_jumpSelection: function() {
				var instance = this;

				if (instance._elCurListItem) {
					instance._selectItem(instance._elCurListItem);
				}
				else {
					instance._toggleContainer(false);
				}
			},

			_moveSelection: function(keyCode) {
				var instance = this;

				if (instance.overlay.get('visible')) {
					var elCurListItem = instance._elCurListItem;
					var curItemIndex = -1;

					if (elCurListItem) {
						curItemIndex = Number(elCurListItem.getAttribute('data-listItemIndex'));
					}

					var newItemIndex = curItemIndex - 1;

					if (keyCode == KEY_DOWN) {
						newItemIndex = curItemIndex + 1;
					}

					if (newItemIndex == -1) {
						newItemIndex = instance._displayedItems - 1;
					}

					if (newItemIndex >= instance._displayedItems) {
						newItemIndex = 0;
					}

					if (newItemIndex < -2) {
						return;
					}

					if (elCurListItem) {
						instance._toggleHighlight(elCurListItem, 'from');

						instance.fire('itemArrowFrom', elCurListItem);
					}

					if (newItemIndex == -1) {
						if (instance.get('delimChar')) {
							instance.inputNode.set('value', instance._pastSelections + instance._currentQuery);
						}
						else {
							instance.inputNode.set('value', instance._currentQuery);
						}

						return;
					}

					if (newItemIndex == -2) {
						instance._toggleContainer(false);

						return;
					}

					var elNewListItem = instance.resultList.get('childNodes').item(newItemIndex);

					var elContent = instance.overlay.get(CONTENT_BOX);

					var contentOverflow = elContent.getStyle('overflow');
					var contentOverflowY = elContent.getStyle('overflowY');

					var scrollOn = (contentOverflow == 'auto') || (contentOverflow == 'scroll') || (contentOverflowY == 'auto') || (contentOverflowY == 'scroll');

					if (scrollOn &&
						(newItemIndex > -1) &&
						(newItemIndex < instance._displayedItems)) {

						var newScrollTop = -1;
						var liTop = elNewListItem.get('offsetTop');
						var liBottom = liTop + elNewListItem.get('offsetHeight');

						var contentHeight = elContent.get('offsetHeight');
						var contentScrollTop = elContent.get('scrollTop');
						var contentBottom = contentHeight + contentScrollTop;

						if (keyCode == KEY_DOWN) {
							if (liBottom > contentBottom) {
								newScrollTop = (liBottom - contentHeight);
							}
							else if (liBottom < contentScrollTop) {
								newScrollTop = liTop;
							}
						}
						else {
							if (liTop < contentHeight) {
								newScrollTop = liTop;
							}
							else if (liTop > contentBottom) {
								newScrollTop = (liBottom - contentHeight);
							}
						}

						if (newScrollTop > -1) {
							elContent.set('scrollTop', newScrollTop);
						}
					}

					instance._toggleHighlight(elNewListItem, 'to');

					instance.fire('itemArrowTo', elNewListItem);

					if (instance.get('typeAhead')) {
						instance._updateValue(elNewListItem);
					}
				}
			},

			_onButtonMouseDown: function(event) {
				var instance = this;

				event.halt();

				instance._focus();

				instance._sendQuery(instance.inputNode.get('value') + '*');

			},

			_onContainerClick: function(event) {
				var instance = this;

				var target = event.target;
				var tagName = target.get('nodeName').toLowerCase();

				event.halt();

				while (target && (tagName != 'table')) {
					switch (tagName) {
						case 'body':
						return;

						case 'li':
							instance._toggleHighlight(target, 'to');
							instance._selectItem(target);
						return;

						default:
						break;
					}

					target = target.get('parentNode');

					if (target) {
						tagName.get('nodeName').toLowerCase();
					}
				}
			},

			_onContainerMouseout: function(event) {
				var instance = this;

				var target = event.target;
				var tagName = target.get('nodeName').toLowerCase();

				while (target && (tagName != 'table')) {
					switch (tagName) {
						case 'body':
						return;

						case 'li':
							instance._toggleHighlight(target, 'from');
							instance.fire('itemMouseOut', target);
						break;

						case 'ul':
							instance._toggleHighlight(instance._elCurListItem, 'to');
						break;

						case 'div':
							if (target.hasClass(CSS_RESULTS_OVERLAY)) {
								instance._overContainer = false;

								return;
							}
						break;

						default:
						break;
					}

					target = target.get('parentNode');

					if (target) {
						tagName = target.get('nodeName').toLowerCase();
					}
				}
			},

			_onContainerMouseover: function(event) {
				var instance = this;

				var target = event.target;
				var tagName = target.get('nodeName').toLowerCase();

				while (target && (tagName != 'table')) {
					switch (tagName) {
						case 'body':
						return;

						case 'li':
							instance._toggleHighlight(target, 'to');
							instance.fire('itemMouseOut', target);
						break;

						case 'div':
							if (target.hasClass(CSS_RESULTS_OVERLAY)) {
								instance._overContainer = true;
								return;
							}
						break;

						default:
						break;
					}

					target = target.get('parentNode');

					if (target) {
						tagName = target.get('nodeName').toLowerCase();
					}
				}
			},

			_onContainerScroll: function(event) {
				var instance = this;

				instance._focus();
			},

			_onInterval: function() {
				var instance = this;

				var curValue = instance.inputNode.get('value');
				var lastValue = instance._lastValue;

				if (curValue != lastValue) {
					instance._lastValue = curValue;

					instance._sendQuery(curValue);
				}
			},

			_onTextboxBlur: function(event) {
				var instance = this;

				if (!instance._overContainer || (instance._keyCode == KEY_TAB)) {
					if (!instance._itemSelected) {
						var elMatchListItem = instance._textMatchesOption();

						var overlayVisible = instance.overlay.get('visible');

						if (!overlayVisible || (overlayVisible && isNull(elMatchListItem))) {
							if (instance.get('forceSelection')) {
								instance._clearSelection();
							}
							else {
								instance.fire('unmatchedItemSelect', instance._currentQuery);
							}
						}
						else {
							if (instance.get('forceSelection')) {
								instance._selectItem(elMatchListItem);
							}
						}
					}

					instance._clearInterval();

					instance.blur();

					if (instance._initInputValue !== instance.inputNode.get('value')) {
						instance.fire('textboxChange');
					}

					instance.fire('textboxBlur');

					instance._toggleContainer(false);
				}
				else {
					instance._focus();
				}
			},

			_onTextboxFocus: function(event) {
				var instance = this;

				if (!instance.get('focused')) {
					instance.inputNode.setAttribute('autocomplete', 'off');
					instance.focus();
					instance._initInputValue = instance.inputNode.get('value');

					instance.fire('textboxFocus');
				}
			},

			_onTextboxKeyDown: function(event) {
				var instance = this;

				var keyCode = event.keyCode;

				if (instance._typeAheadDelayId != -1) {
					clearTimeout(instance._typeAheadDelayId);
				}

				switch (keyCode) {
					case KEY_TAB:
						if (instance._elCurListItem) {
							if (instance.get('delimChar') && instance._keyCode != keyCode) {
								if (instance.overlay.get('visible')) {
									event.halt();
								}
							}

							instance._selectItem(instance._elCurListItem);
						}
						else {
							instance._toggleContainer(false);
						}
					break;

					case KEY_ENTER:
						if (instance._elCurListItem) {
							if (instance._keyCode != keyCode) {
								if (instance.overlay.get('visible')) {
									event.halt();
								}
							}

							instance._selectItem(instance._elCurListItem);
						}
						else {
							instance._toggleContainer(false);
						}
					break;

					case KEY_ESC:
						instance._toggleContainer(false);
					return;

					case KEY_UP:
						if (instance.overlay.get('visible')) {
							event.halt();

							instance._moveSelection(keyCode);
						}
					break;

					case KEY_RIGHT:
						instance._jumpSelection();
					break;

					case KEY_DOWN:
						if (instance.overlay.get('visible')) {
							event.halt();

							instance._moveSelection(keyCode);
						}
					break;

					default:
						instance._itemSelected = false;
						instance._toggleHighlight(instance._elCurListItem, 'from');

						instance.fire('textboxKey', keyCode);
					break;
				}

				if (keyCode == KEY_ALT) {
					instance._enableIntervalDetection();
				}

				instance._keyCode = keyCode;
			},

			_onTextboxKeyPress: function(event) {
				var instance = this;

				var keyCode = event.keyCode;

				switch (keyCode) {
					case KEY_TAB:
						if (instance.overlay.get('visible')) {
							if (instance.get('delimChar')) {
								event.halt();
							}

							if (instance._elCurListItem) {
								instance._selectItem(instance._elCurListItem);
							}
							else {
								instance._toggleContainer(false);
							}
						}
					break;

					case 13:
						if (instance.overlay.get('visible')) {
							event.halt();

							if (instance._elCurListItem) {
								instance._selectItem(instance._elCurListItem);
							}
							else {
								instance._toggleContainer(false);
							}
						}
					break;

					default:
					break;
				}

				if (keyCode == KEY_KOREAN_IME) {
					instance._enableIntervalDetection();
				}
			},

			_onTextboxKeyUp: function(event) {
				var instance = this;

				var input = instance.inputNode;

				var value = input.get('value');
				var keyCode = event.keyCode;

				if (instance._isIgnoreKey(keyCode)) {
					return;
				}

				if (instance._delayId != -1) {
					clearTimeout(instance._delayId);
				}

				instance._delayId = setTimeout(
					function() {
						instance._sendQuery(value);
					},
					instance.get('queryDelay')
				);
			},

			_populateList: function(event) {
				var instance = this;

				if (instance._typeAheadDelayId != -1) {
					clearTimeout(instance._typeAheadDelayId);
				}

				var query = event.request;
				var response = event.response;
				var callback = event.callback;
				var showAll = (query == '*');

				if (callback && callback.argument && callback.argument.query) {
					event.request = query = callback.argument.query;
				}

				var ok = instance.doBeforeLoadData(event);

				if (ok && !event.error) {
					instance.fire('dataReturn', event);

					var focused = instance.get('focused');

					if (showAll || focused || focused === null) {
						var currentQuery = decodeURIComponent(query);

						instance._currentQuery = currentQuery;
						instance._itemSelected = false;

						var allResults = event.response.results;
						var itemsToShow = Math.min(allResults.length, instance.get('maxResultsDisplayed'));
						var fields = instance.get('schema.resultFields');
						var matchKey = instance.get('matchKey');

						if (!matchKey && fields) {
							matchKey = fields[0];
						}
						else {
							matchKey = matchKey || 0;
						}

						if (itemsToShow > 0) {
							var allListItemEls = instance.resultList.get('childNodes');

							allListItemEls.each(
								function(node, i, nodeList) {
									if (i < itemsToShow) {
										var result = allResults[i];

										var resultMatch = '';

										if (isString(result)) {
											resultMatch = result;
										}
										else if (isArray(result)) {
											resultMatch = result[0]
										}
										else {
											resultMatch = result[matchKey];
										}

										node._resultMatch = resultMatch;

										node._resultData = result;
										node.html(instance.formatResult(result, currentQuery, resultMatch));

										node.removeClass('aui-helper-hidden');
									}
									else {
										node.addClass('aui-helper-hidden');
									}
								}
							);

							instance._displayedItems = itemsToShow;

							instance.fire('containerPopulate', query, allResults);

							if (query != '*' && instance.get('autoHighlight')) {
								var elFirstListItem = instance.resultList.get('firstChild');

								instance._toggleHighlight(elFirstListItem, 'to');
								instance.fire('itemArrowTo', elFirstListItem);

								instance._typeAhead(elFirstListItem, query);
							}
							else {
								instance._toggleHighlight(instance._elCurListItem, 'from');
							}

							ok = instance.doBeforeExpandContainer(query, allResults);

							instance._toggleContainer(ok);
						}
						else {
							instance._toggleContainer(false);
						}

						return;
					}

				}
				else {
					instance.fire('dataError', query);
				}
			},

			_renderButton: function() {
				var instance = this;

				var button = new A.ToolItem(ICON_DEFAULT);

				button.get('boundingBox').addClass(CSS_BUTTON_TRIGGER);
				button.get('node').addClass(CSS_ICON_BUTTON_TRIGGER);

				if (instance.get('button') !== false) {
					button.render(instance.inputWrapper);
				}

				instance.button = button;
			},

			_realignContainer: function(event) {
				var instance = this;

				instance._uiSetAlign(OVERLAY_ALIGN.node, OVERLAY_ALIGN.points);
			},

			_renderInput: function() {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);
				var input = instance.get('input');

				if (input) {
					input = A.get(input);
				}
				else {
					input = A.Node.create(TPL_INPUT);

					input.addClass(CSS_INPUT);

					contentBox.appendChild(input);
				}

				var wrapper = A.Node.create(TPL_INPUT_WRAPPER);

				contentBox.insertBefore(wrapper, input);

				wrapper.appendChild(input);

				instance.set('uniqueName', A.stamp(input));

				instance.inputNode = input;
				instance.inputWrapper = wrapper;
			},

			_renderListElements: function() {
				var instance = this;

				var maxResultsDisplayed = instance.get('maxResultsDisplayed');

				var resultList = instance.resultList;

				var listItems = [];

				while (maxResultsDisplayed--) {
					listItems[maxResultsDisplayed] = '<li class="aui-helper-hidden ' + CSS_LIST_ITEM + '" data-listItemIndex="' + maxResultsDisplayed + '"></li>';
				}

				resultList.html(listItems.join(''));
			},

			_renderOverlay: function() {
				var instance = this;

				OVERLAY_ALIGN.node = instance.inputNode;

				var overlay = new A.Overlay(
					{
						align: OVERLAY_ALIGN,
						bodyContent: '<ul></ul>',
						visible: false,
						width: instance.inputNode.get('offsetWidth')
					}
				);

				var contentBox = overlay.get(CONTENT_BOX);

				overlay.get(BOUNDING_BOX).addClass(CSS_RESULTS_OVERLAY);

				contentBox.addClass(CSS_RESULTS_OVERLAY_CONTENT);

				overlay.render(document.body);

				overlay.addTarget(instance);

				instance.overlay = overlay;
				instance.resultList = contentBox.query('ul');

				instance.resultList.addClass(CSS_RESULTS_LIST);

				instance._renderListElements();
			},

			_selectItem: function(elListItem) {
				var instance = this;

				instance._itemSelected = true;

				instance._updateValue(elListItem);

				instance._pastSelections = instance.inputNode.get('value');

				instance._clearInterval();

				instance.fire('itemSelect', elListItem, elListItem._resultData);

				instance._toggleContainer(false);
			},

			_selectText: function(el, start, end) {
				var instance = this;

				var rawEl = A.Node.getDOMNode(el);
				var value = el.get('value');

				if (rawEl.setSelectionRange) {
					rawEl.setSelectionRange(start, end);
				}
				else if (rawEl.createTextRange) {
					var range = rawEl.createTextRange();

					range.moveStart('character', start);
					range.moveEnd('character', end - value.length);

					range.select();
				}
				else {
					rawEl.select();
				}
			},

			_sendQuery: function(query) {
				var instance = this;

				if (instance.get('disabled')) {
					instance._toggleContainer(false);

					return;
				}

				var delimChar = instance.get('delimChar');
				var minQueryLength = instance.get('minQueryLength');

				if (delimChar) {
					var extraction = instance._extractQuery(query);

					query = extraction.query;

					instance._pastSelections = extraction.previous;
				}

				if ((query && (query.length < minQueryLength)) || (!query && minQueryLength > 0)) {
					if (instance._delayId != -1) {
						clearTimeout(instance._delayId);
					}

					instance._toggleContainer(false);

					return;
				}

				query = encodeURIComponent(query);

				instance._delayId = -1;

				if (instance.get('applyLocalFilter')) {
					instance.dataSource.on('response', instance.filterResults, instance);
				}

				var request = instance.generateRequest(query);

				instance.fire('dataRequest', query, request);

				instance.dataSource.sendRequest(request);
			},

			_textMatchesOption: function() {
				var instance = this;

				var elMatch = null;
				var displayedItems = instance._displayedItems;
				var listItems = instance.resultList.get('childNodes');

				for (var i=0; i < displayedItems.length; i++) {
					var elListItem = listItems.item(i);

					var match = ('' + elListItem._resultMatch).toLowerCase();

					if (match == instance._currentQuery.toLowerCase()) {
						elMatch = elListItem;

						break;
					}
				}

				return elMatch;
			},

			_toggleContainer: function(show) {
				var instance = this;

				var overlay = instance.overlay;

				if (instance.get('alwaysShowContainer') && overlay.get('visible')) {
					return;
				}

				if (!show) {
					instance._toggleHighlight(instance._elCurListItem, 'from');

					instance._displayedItems = 0;
					instance._currentQuery = null;
				}

				if (show) {
					overlay.show();
					instance.fire('containerExpand');
				}
				else {
					overlay.hide();
					instance.fire('containerCollapse');
				}
			},

			_toggleHighlight: function(elNewListItem, action) {
				var instance = this;

				if (elNewListItem) {
					if (instance._elCurListItem) {
						instance._elCurListItem.removeClass(CSS_HIGLIGHT);
						instance._elCurListItem = null;
					}

					if (action == 'to') {
						elNewListItem.addClass(CSS_HIGLIGHT);

						instance._elCurListItem = elNewListItem;
					}
				}
			},

			_typeAhead: function(elListItem, query) {
				var instance = this;

				if (!instance.get('typeAhead') || instance._keyCode == KEY_BACKSPACE) {
					return;
				}

				var inputEl = A.Node.getDOMNode(instance.inputNode);

				if (inputEl.setSelectionRange || inputEl.createTextRange) {
					instance._typeAheadDelayId = setTimeout(
						function() {
							var value = inputEl.value;

							var start = value.length;

							instance._updateValue(elListItem);

							var end = inputEl.value.length;

							instance._selectText(instance.inputNode, start, end);

							var prefill = inputEl.value.substr(start, end);

							instance.fire('typeAhead', query, prefill);
						},
						instance.get('typeAheadDelay')
					);
				}
			},

			_updateValue: function(elListItem) {
				var instance = this;

				if (!instance.get('suppressInputUpdate')) {
					var input = instance.inputNode;
					var resultMatch = elListItem._resultMatch;

					var delimChar = instance.get('delimChar');

					delimChar = (delimChar && delimChar[0]) || delimChar;

					var newValue = '';

					if (delimChar) {
						newValue = instance._pastSelections;

						newValue += resultMatch + delimChar;

						if (delimChar != ' ') {
							newValue += ' ';
						}
					}
					else {
						newValue = resultMatch;
					}

					input.set('value', newValue);

					if (input.get('type') == 'textarea') {
						input.set('scrollTop', input.get('scrollHeight'));
					}

					var end = newValue.length;

					instance._selectText(input, end, end);

					instance._elCurListItem = elListItem;
				}
			},

			_currentQuery: null,
			_delayId: -1,
			_displayedItems: 0,
			_elCurListItem: null,
			_initInputValue: null,
			_itemSelected: false,
			_keyCode: null,
			_lastValue: null,
			_overContainer: false,
			_pastSelections: '',
			_typeAheadDelayId: -1
		}
	);

	A.AutoComplete = AutoComplete;

}, '@VERSION' , { requires: [ 'datasource', 'dataschema', 'overlay', 'tool' ] });