AUI.add('aui-ace-autocomplete-list', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	Do = A.Do,

	getCN = A.getClassName,

	ATTR_DATA_INDEX = 'data-index',

	NAME = 'ace-autocomplete-list',

	CONTAINER = 'container',
	DOT = '.',
	EMPTY = 'empty',
	EMPTY_STRING = '',
	ENTRY = 'entry',
	HIGHLIGHTED = 'highlighted',
	LIST = 'list',
	LOADING = 'loading',
	OFFSET_HEIGHT = 'offsetHeight',
	PREVIOUS = 'previous',
	REGION = 'region',
	RESULTS = 'results',
	SELECTED = 'selected',
	SPACE = ' ',
	VISIBLE = 'visible',

	CSS_PREFIX = 'ace-autocomplete',

	CLASS_ENTRY = getCN(CSS_PREFIX, ENTRY),
	CLASS_ENTRY_CONTAINER = getCN(CSS_PREFIX, ENTRY, CONTAINER),
	CLASS_ENTRY_CONTAINER_HIGHLIGHTED = getCN(CSS_PREFIX, ENTRY, CONTAINER, HIGHLIGHTED),
	CLASS_ENTRY_EMPTY = getCN(CSS_PREFIX, ENTRY, EMPTY),
	CLASS_ENTRY_LOADING = getCN(CSS_PREFIX, ENTRY, LOADING),
	CLASS_LOADING = getCN(CSS_PREFIX, ENTRY, LOADING),
	CLASS_RESULTS_LIST = getCN(CSS_PREFIX, RESULTS),

	SELECTOR_ENTRY_CONTAINER = DOT + CLASS_ENTRY_CONTAINER,
	SELECTOR_ENTRY_CONTAINER_SELECTED = SELECTOR_ENTRY_CONTAINER + DOT + SELECTED,
	SELECTOR_SELECTED_ENTRY = SELECTOR_ENTRY_CONTAINER_SELECTED + SPACE + DOT + CLASS_ENTRY,

	KEY_DONW = 40,
	KEY_END = 35,
	KEY_PAGE_DOWN = 34,
	KEY_PAGE_UP = 33,
	KEY_START = 36,
	KEY_UP = 38,

	PADDING_HORIZ = 5,
	PADDING_VERT = 20;

var AutoCompleteList = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		emptyMessage: {
			validator: Lang.isString,
			value: 'No suggestions'
		},

		host: {
			validator: Lang.isObject
		},

		listNode: {
			value: null
		},

		loadingMessage: {
			validator: Lang.isString,
			value: 'Loading'
		},

		results: {
			validator: Lang.isArray
		},

		selectedEntry: {
			getter: '_getSelectedEntry'
		}
	},

	AUGMENTS: [A.AceEditor.AutoCompleteBase,A.WidgetAutohide],

	CSS_PREFIX: CSS_PREFIX,

	EXTENDS: A.OverlayBase,

	HTML_PARSER: {
		listNode: DOT + CLASS_RESULTS_LIST
	},

	prototype: {
		bindUI: function() {
			var instance = this;

			instance.on('addSuggestion', instance.hide, instance);
			instance.on('cursorChange', instance._onCursorChange, instance);
			instance.on('cursorOut', instance.hide, instance);
			instance.on('insertText', instance._onInsertText, instance);
			instance.on('match', instance._onMatch, instance);
			instance.on('removeText', instance._onRemoveText, instance);
			instance.on('resultsChange', instance._onResultsChange, instance);
			instance.on('resultsError', instance._setEmptyResults, instance);
			instance.on('showLoadingMessage', instance._onShowLoadingMessage, instance);
			instance.on('visibleChange', instance._onVisibleChange, instance);
		},

		renderUI: function() {
			var instance = this;

			var autoCompleteResultsList = instance.get('listNode');

			if (!autoCompleteResultsList) {
				autoCompleteResultsList = instance._createListNode();
			}

			autoCompleteResultsList.delegate('click', instance._handleResultListClick, SELECTOR_ENTRY_CONTAINER, instance);
			autoCompleteResultsList.delegate('mouseenter', instance._onMouseEnter, SELECTOR_ENTRY_CONTAINER, instance);
			autoCompleteResultsList.delegate('mouseleave', instance._onMouseLeave, SELECTOR_ENTRY_CONTAINER);

			instance._autoCompleteResultsList = autoCompleteResultsList;
		},

		_createListNode: function () {
			var instance = this;

			var listNode = A.Node.create(instance.TPL_LIST);

			instance.get('contentBox').append(listNode);
	 
			return listNode;
		},

		_getEntriesPerPage: function() {
			var instance = this;

			var entriesPerPage = instance._entriesPerPage;

			if (!entriesPerPage) {
				var autoCompleteResultsList = instance._autoCompleteResultsList;

				var entryHeight = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER).get(OFFSET_HEIGHT);

				var containerHeight = autoCompleteResultsList.get(OFFSET_HEIGHT);

				entriesPerPage = Math.floor(containerHeight / entryHeight);

				instance._entriesPerPage = entriesPerPage;
			}

			return entriesPerPage;
		},

		_getSelectedEntry: function() {
			var instance = this;

			var entryText;

			var selectedEntryNode = instance._autoCompleteResultsList.one(SELECTOR_SELECTED_ENTRY);

			if (selectedEntryNode) {
				entryText = selectedEntryNode.text();
			}

			return entryText;
		},

		_handleArrows: function(keyCode) {
			var instance = this;

			var action;

			if (keyCode === KEY_UP) {
				action = PREVIOUS;
			}
			else if (keyCode === KEY_DONW) {
				action = 'next';
			}

			if (action) {
				var autoCompleteResultsList = instance._autoCompleteResultsList;

				var selectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

				if (selectedEntry) {
					var entry = selectedEntry[action](SELECTOR_ENTRY_CONTAINER);

					if (entry) {
						selectedEntry.removeClass(SELECTED);

						entry.addClass(SELECTED);

						var resultsListNodeRegion = autoCompleteResultsList.get(REGION);

						var entryRegion = entry.get(REGION);

						if (action === PREVIOUS) {
							if (entryRegion.top < resultsListNodeRegion.top) {
								entry.scrollIntoView(true);
							}
							else if (entryRegion.top > resultsListNodeRegion.bottom) {
								entry.scrollIntoView();
							}
						}
						else {
							if (entryRegion.top + entryRegion.height > resultsListNodeRegion.bottom) {
								entry.scrollIntoView();
							}
							else if(entryRegion.top + entryRegion.height < resultsListNodeRegion.top) {
								entry.scrollIntoView(true);
							}
						}
					}
				}

				return new Do.Halt(null);
			}
		},

		_handleKey: function(event, obj, keyCode) {
			var instance = this;

			var result;

			if (instance.get(VISIBLE)) {
				if (keyCode === KEY_UP || keyCode === KEY_DONW) {
					result = instance._handleArrows(keyCode);
				}
				else if (keyCode === KEY_PAGE_UP || keyCode === KEY_PAGE_DOWN) {
					result = instance._handlePageUpDown(keyCode);
				}
				else if (keyCode === KEY_END || keyCode === KEY_START) {
					result = instance._handleStartEnd(keyCode);
				}
			}

			return result;
		},

		_handlePageUpDown: function(keyCode) {
			var instance = this;

			var autoCompleteResultsList = instance._autoCompleteResultsList;

			var entriesPerPage = instance._getEntriesPerPage();

			var selectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

			var selectedEntryIndex = Lang.toInt(selectedEntry.attr(ATTR_DATA_INDEX));

			var nextSelectedEntryIndex;

			var sudoClass = EMPTY_STRING;

			var scrollTop = false;

			if (keyCode === KEY_PAGE_UP) {
				nextSelectedEntryIndex = selectedEntryIndex - entriesPerPage;

				scrollTop = true;
			}
			else if (keyCode === KEY_PAGE_DOWN) {
				nextSelectedEntryIndex = selectedEntryIndex + entriesPerPage;

				sudoClass = ':last-child';
			}

			var nextSelectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER + '[' + ATTR_DATA_INDEX + '="' + nextSelectedEntryIndex + '"]');

			if (!nextSelectedEntry) {
				nextSelectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER + sudoClass);
			}
			
			if (selectedEntry !== nextSelectedEntry) {
				selectedEntry.removeClass(SELECTED);

				nextSelectedEntry.addClass(SELECTED);

				nextSelectedEntry.scrollIntoView(scrollTop);
			}

			return new Do.Halt(null);
		},

		_handleResultListClick: function(event) {
			var instance = this;

			var entryNode = event.currentTarget;

			var selectedEntry = instance._autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

			if (entryNode !== selectedEntry) {
				selectedEntry.removeClass(SELECTED);

				entryNode.addClass(SELECTED);
			}

			var content = entryNode.text();

			instance._addSuggestion(content);

			instance.fire(
				'entrySelected',
				{
					content: content
				}
			);
		},

		_handleStartEnd: function(keyCode) {
			var instance = this;

			var item;

			var scrollTop = false;

			var autoCompleteResultsList = instance._autoCompleteResultsList;

			if (keyCode === KEY_END) {
				item = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER + ':last-child');
			}
			else if (keyCode === KEY_START) {
				item = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER);

				scrollTop = true;
			}

			var selectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

			if (item !== selectedEntry) {
				selectedEntry.removeClass(SELECTED);

				item.addClass(SELECTED);

				item.scrollIntoView(scrollTop);
			}

			return new Do.Halt(null);
		},

		_onCursorChange: function(event) {
			var instance = this;

			if (!instance.get(VISIBLE)) {
				event.preventDefault();
			}
		},

		_onInsertText: function(event) {
			var instance = this;

			if (event.startRow !== event.endRow && instance.get(VISIBLE)) {
				instance.hide();
			}
		},

		_onMatch: function(event) {
			var instance = this;

			if (event.match) {
				var coords = event.coords;

				instance.set('xy', [coords.pageX + PADDING_HORIZ, coords.pageY + PADDING_VERT]);
			}
			else if (instance.get(VISIBLE)) {
				instance.hide();
			}
		},

		_onMouseEnter: function(event) {
			event.currentTarget.addClass(CLASS_ENTRY_CONTAINER_HIGHLIGHTED);
		},

		_onMouseLeave: function(event) {
			event.currentTarget.removeClass(CLASS_ENTRY_CONTAINER_HIGHLIGHTED);
		},

		_onRemoveText: function(event) {
			var instance = this;

			if (instance.get(VISIBLE)) {
				instance.hide();
			}
		},

		_onResultsChange: function(event) {
			var instance = this;

			var autoCompleteResultsList = instance._autoCompleteResultsList;

			autoCompleteResultsList.empty();

			var results = event.newVal;

			var entryTemplate = instance.TPL_ENTRY;

			AArray.each(
				results,
				function(item, index) {
					autoCompleteResultsList.appendChild(
						Lang.sub(
							entryTemplate,
							{
								index: index,
								value: item
							}
						)
					);
				}
			);

			var firstEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER);

			if (firstEntry) {
				firstEntry.addClass(SELECTED);

				if (!instance.get(VISIBLE)) {
					instance.show();
				}
			}
			else {
				if (instance.get(VISIBLE)) {
					instance.hide();
				}
			}
		},

		_onShowLoadingMessage: function(event) {
			var instance = this;

			var autoCompleteResultsList = instance._autoCompleteResultsList;

			autoCompleteResultsList.empty();

			autoCompleteResultsList.appendChild(
				Lang.sub(
					instance.TPL_LOADING,
					{
						label: instance.get('loadingMessage')
					}
				)
			);

			if (!instance.get(VISIBLE)) {
				instance.show();
			}
		},

		_onVisibleChange: function(event) {
			var instance = this;

			if (event.newVal) {
				instance._overwriteCommands();
			}
			else {
				instance._removeAutoCompleteCommands();
			}
		},

		_setEmptyResults: function() {
			var instance = this;

			instance.set('results', []);
		},

		TPL_ENTRY:
			'<li class="' + CLASS_ENTRY_CONTAINER + '" data-index="{index}">' +
				'<span class="' + CLASS_ENTRY + '">{value}</span>' +
			'</li>',

		TPL_LIST: '<ul class="' + CLASS_RESULTS_LIST + '"/>',

		TPL_LOADING: '<li class="' + CLASS_ENTRY_CONTAINER + '">' +
			'<span class="aui-icon-loading ' + CLASS_ENTRY_LOADING + '">{label}</span>' +
		'</li>',

		TPL_RESULTS_EMPTY:
			'<li class="' + CLASS_ENTRY_CONTAINER + '">' +
				'<span class="' + CLASS_ENTRY_EMPTY + '">{label}</span>' +
			'</li>'
	}
});

A.AceEditor.AutoCompleteList = AutoCompleteList;
A.AceEditor.AutoComplete = AutoCompleteList;

}, '@VERSION@' ,{requires:['aui-overlay-base','widget-autohide','aui-ace-autocomplete-base'], skinnable:true});
