AUI.add('aui-autocomplete', function(A) {
/**
 * The AutoComplete Utility
 *
 * @module aui-autocomplete
 */

var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,
	isNull = Lang.isNull,

	getClassName = A.ClassNameManager.getClassName,

	BINDUI = 'bindUI',
	CONTENT = 'content',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	ITEM = 'item',
	LIST = 'list',
	NAME = 'autocomplete',
	RENDERUI = 'renderUI',
	RESET = 'reset',
	RESULTS = 'results',
	SELECTED = 'selected',

	CSS_HIGLIGHT = getClassName(NAME, SELECTED),
	CSS_HIDDEN = getClassName(HELPER, HIDDEN),
	CSS_LIST_ITEM = getClassName(NAME, LIST, ITEM),
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

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox';

/**
 * <p><img src="assets/images/aui-autocomplete/main.png"/></p>
 *
 * A base class for AutoComplete, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Presenting users choices based on their input</li>
 *    <li>Separating selected items</li>
 *    <li>Keyboard interaction for selecting items</li>
 * </ul>
 *
 * Quick Example:<br/>
 * 
 * <pre><code>var instance = new A.AutoComplete({
 *	dataSource: [['AL', 'Alabama', 'The Heart of Dixie'],
 * 	['AK', 'Alaska', 'The Land of the Midnight Sun'],
 *	['AZ', 'Arizona', 'The Grand Canyon State']],
 *	schema: {
 *		resultFields: ['key', 'name', 'description']
 *	},
 *	matchKey: 'name',
 *	delimChar: ',',
 *	typeAhead: true,
 *	contentBox: '#myAutoComplete'
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="AutoComplete.html#configattributes">Configuration Attributes</a> available for
 * AutoComplete.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class AutoComplete
 * @constructor
 * @extends Component
 */

var AutoCompleteView = function() {
	var instance = this;

	instance.on(RENDERUI, instance._renderUIAutoCompleteView, instance);
	instance.on(BINDUI, instance._bindUIAutoCompleteView, instance);
};

AutoCompleteView.ATTRS = {
	/**
	 * Always show the results container, instead of only showing when the 
	 * user is requesting them.
	 * 
	 * @attribute alwaysShowContainer
	 * @default false
	 * @type Boolean
	 */
	alwaysShowContainer: {
		value: false
	},

	/**
	 * If set to true, the <a href="AutoComplete.html#method_filterResults">filterResults</a> 
	 * method will be run on the response from the data source.
	 *
	 * @attribute applyLocalFilter
	 * @default true
	 * @type Boolean
	 */
	applyLocalFilter: {
		value: null
	},

	/**
	 * Automatically highlight the first item in the list when the results are
	 * made visible.
	 * 
	 * @attribute autoHighlight
	 * @default true
	 * @type Boolean
	 */
	autoHighlight: {
		value: true
	},

	/**
	 * The maximum number of results to display.
	 *
	 * 
	 * @attribute maxResultsDisplayed
	 * @default 10
	 * @type Number
	 */
	maxResultsDisplayed: {
		value: 10
	}
};

AutoCompleteView.prototype = {
	/**
	 * Create the DOM structure for the AutoCompleteView. Lifecycle.
	 *
	 * @method _renderUIAutoCompleteView
	 * @protected
	 */
	_renderUIAutoCompleteView: function() {
		var instance = this;

		instance._renderOverlay();
	},

	/**
	 * Bind the events on the AutoCompleteView UI. Lifecycle.
	 *
	 * @method _bindUIAutoCompleteView
	 * @protected
	 */
	_bindUIAutoCompleteView: function() {
		var instance = this;

		var overlayBoundingBox = instance.overlay.get(BOUNDING_BOX);

		overlayBoundingBox.on('click', instance._onContainerClick, instance);
		overlayBoundingBox.on('mouseout', instance._onContainerMouseout, instance);
		overlayBoundingBox.on('mouseover', instance._onContainerMouseover, instance);
		overlayBoundingBox.on('scroll', instance._onContainerScroll, instance);

		instance.on('textboxBlur', instance._onTextboxBlurView, instance);
		instance.on('textboxKeyDown', instance._onTextboxKeyDownView, instance);
		instance.on('textboxKeyPress', instance._onTextboxKeyPressView, instance);
		instance.on('textboxKeyUp', instance._onTextboxKeyUpView, instance);

		instance.on('handleResponse', instance._populateView, instance);
		instance.on('invalidQueryLength', instance._onInvalidQueryLengthView, instance);
		instance.on('sendQueryDisabled', instance._onSendQueryDisabledView, instance);

		instance.overlay.after('visibleChange', instance._realignContainer, instance);

		instance._queryTask = new A.DelayedTask(instance.sendQuery, instance);

		if (instance.get('dataSourceType') == 'dataSourceLocal') {
			instance.set('applyLocalFilter', true);
		}
	},

	/**
	 * An overridable method that is executed before the result container is shown.
	 * The method can return false to prevent the container from being shown.
	 *
	 * @method doBeforeExpandContainer
	 * @param {String} query The query that was submitted to the data source
	 * @param {Object} allResults The parsed results
	 * @return {Boolean}
	 */
	doBeforeExpandContainer: function() {
		return true;
	},

	/**
	 * Executed by the data source as a mechanism to do simple client-side
	 * filtering of the results.
	 *
	 * @method filterResults
	 * @param {EventFacade} event
	 * @return {Object} Filtered response object
	 */
	filterResults: function(event) {
		var instance = this;

		var callback = event.callback;
		var query = event.request;
		var response = event.response;

		if (callback && callback.argument && callback.argument.query) {
			query = callback.argument.query;
		}

		if (query) {
			var allResults = response.results;
			var filteredResults = [];
			var matchFound = false;
			var matchKey = instance.get('matchKey');
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

	/**
	 * Sends a query request to the data source object.
	 *
	 * @method sendQuery
	 * @param {String} query Query string
	 */
	sendQuery: function(query) {
		var instance = this;

		instance.set('focused', null);

		var newQuery = query;

		if (instance.get('delimChar')) {
			query = instance.inputNode.get('value') + query;
		}

		instance._sendQuery(newQuery);
	},

	/**
	 * If there is a currently selected item, the right arrow key will select
	 * that item and jump to the end of the input element, otherwise the container is closed.
	 *
	 * @method _jumpSelection
	 * @protected
	 */
	_jumpSelection: function() {
		var instance = this;

		if (instance._elCurListItem) {
			instance._selectItem(instance._elCurListItem);
		}
		else {
			instance._toggleContainer(false);
		}
	},

	/**
	 * Triggered by the up and down arrow keys, changes the currently selected list element item, and scrolls the
	 * container if necessary.
	 *
	 * @method _moveSelection
	 * @param {Number} keyCode The numeric code of the key pressed
	 * @protected
	 */
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

	/**
	 * Handles when a user clicks on the container.
	 *
	 * @method _onContainerClick
	 * @param {EventFacade} event
	 * @protected
	 */
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
				tagName = target.get('nodeName').toLowerCase();
			}
		}
	},

	/**
	 * Handles when a user mouses out of the container.
	 *
	 * @method _onContainerMouseout
	 * @param {EventFacade} event
	 * @protected
	 */
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

	/**
	 * Handles when a user mouses over the container.
	 *
	 * @method _onContainerMouseover
	 * @param {EventFacade} event
	 * @protected
	 */
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

	/**
	 * Handles the container scroll events.
	 *
	 * @method _onContainerScroll
	 * @param {EventFacade} event
	 * @protected
	 */
	_onContainerScroll: function(event) {
		var instance = this;

		instance._focus();
	},

	_onInvalidQueryLengthView: function() {
		var instance = this;

		instance._queryTask.cancel();

		instance._toggleContainer(false);
	},

	_onSendQueryDisabledView: function() {
		var instance = this;

		instance._toggleContainer(false);
	},

	_onTextboxBlurView: function() {
		var instance = this;

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

		instance._toggleContainer(false);
	},

	_onTextboxKeyDownView: function(event) {
		var instance = this;

		var keyCode = event.keyCode;

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
	},

	_onTextboxKeyPressView: function(event) {
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
	},

	_onTextboxKeyUpView: function(event) {
		var instance = this;

		var input = instance.inputNode;
		var value = input.get('value');

		instance._queryTask.delay(instance.get('queryDelay'), null, null, [value]);
	},

	/**
	 * Populates the container with list items of the query results.
	 *
	 * @method _populateView
	 * @param {EventFacade} event
	 * @protected
	 */
	_populateView: function(event) {
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

		var handle = instance._filterResultsHandle;

		if (instance.get('applyLocalFilter')) {
			instance.filterResults(event);
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
									resultMatch = result[0];
								}
								else {
									resultMatch = result[matchKey];
								}
								
								
								node._resultMatch = resultMatch;

								node._resultData = result;
								node.html(instance.formatResult(result, currentQuery, resultMatch));

								node.removeClass(CSS_HIDDEN);
							}
							else {
								node.addClass(CSS_HIDDEN);
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

	/**
	 * Realigns the container to the input element.
	 *
	 * @method _realignContainer
	 * @param {EventFacade} event
	 * @protected
	 */
	_realignContainer: function(event) {
		var instance = this;

		var overlayAlign = instance._overlayAlign;

		if (event.newVal) {
			instance.overlay._uiSetAlign(overlayAlign.node, overlayAlign.points);
		}
	},

	/**
	 * Pre-populates the container with the 
	 * <a href="Autocomplete.html#config_maxResultsDisplayed">maxResultsDisplayed</a>
	 * number of list items.
	 *
	 * @method _renderListElements
	 * @protected
	 */
	_renderListElements: function() {
		var instance = this;

		var maxResultsDisplayed = instance.get('maxResultsDisplayed');

		var resultList = instance.resultList;

		var listItems = [];

		while (maxResultsDisplayed--) {
			listItems[maxResultsDisplayed] = '<li class="' + CSS_HIDDEN + ' ' + CSS_LIST_ITEM + '" data-listItemIndex="' + maxResultsDisplayed + '"></li>';
		}

		resultList.html(listItems.join(''));
	},

	/**
	 * Handles the creation of the overlay where the result list will be displayed.
	 *
	 * @method _renderOverlay
	 * @protected
	 */
	_renderOverlay: function() {
		var instance = this;

		var overlayAlign = instance._overlayAlign;

		overlayAlign.node = instance.inputNode;

		var overlay = new A.OverlayBase(
			{
				align: overlayAlign,
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
		instance.resultList = contentBox.one('ul');

		instance.resultList.addClass(CSS_RESULTS_LIST);

		instance._renderListElements();
	},

	/**
	 * Selects a list item from the query results.
	 *
	 * @method _selectItem
	 * @param {Node} elListItem The list item to select
	 * @protected
	 */
	_selectItem: function(elListItem) {
		var instance = this;

		instance._itemSelected = true;

		instance._updateValue(elListItem);

		instance._pastSelections = instance.inputNode.get('value');

		instance._clearInterval();

		instance.fire('itemSelect', elListItem, elListItem._resultData);

		instance._toggleContainer(false);
	},
	
	/**
	 * Checks to see if the value typed by the user matches any of the
	 * query results.
	 *
	 * @method _textMatchesOption
	 * @protected
	 */
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

	/**
	 * Toggles the display of the results container.
	 *
	 * @method _toggleContainer
	 * @param {Boolean} show Flag to force the showing or hiding of the container
	 * @protected
	 */
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

	/**
	 * Toggles the highlighting of a list item, and removes the highlighting from the previous item
	 *
	 * @method _toggleHighlight
	 * @param {Node} elNewListItem The item to be highlighted
	 * @param {String} action Whether we are moving to or from an item. Valid values are "to" or "from".
	 * @protected
	 */
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

	/**
	 * Updates the input element with the selected query result. If
	 * <a href="Autocomplete.html#config_delimChar">delimChar</a> has been set,
	 * then the value gets appended with the delimiter.
	 *
	 * @method _updateValue
	 * @param {Node} elListItem The selected list item
	 * @protected
	 */
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

			input.selectText(end, end);

			instance._elCurListItem = elListItem;
		}
	},

	_displayedItems: 0,
	_elCurListItem: null,
	_itemSelected: false,
	_overContainer: false
};

A.AutoComplete = A.Base.build(NAME, A.Component, [A.DataSourceControl, A.InputTextControl, AutoCompleteView]);

}, '@VERSION@' ,{requires:['aui-base','aui-datasource-control-base','aui-input-text-control','aui-overlay-base'], skinnable:true});
