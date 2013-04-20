AUI.add('aui-ace-autocomplete-base', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	Do = A.Do,
	ADOM = A.DOM,

	EXEC = 'exec',
	FILL_MODE = 'fillMode',
	HOST = 'host',
	INSERT_TEXT = 'insertText',
	PROCESSOR = 'processor',

	FILL_MODE_INSERT = 1,
	FILL_MODE_OVERWRITE = 0,

	STATUS_ERROR = -1,
	STATUS_SUCCESS = 0,

	NAME = 'ace-autocomplete-base';

var Base = function(){};

Base.prototype = {
	initializer: function() {
		var instance = this;

		instance._editorCommands = [];

		A.after(instance._bindUIACBase, instance, 'renderUI');

		var processor = instance.get(PROCESSOR);

		if (processor && !processor.get(HOST)) {
			processor.set(HOST, instance);
		}

		instance._onResultsErrorFn = A.bind('_onResultsError', instance);
		instance._onResultsSuccessFn = A.bind('_onResultsSuccess', instance);
	},

	_addSuggestion: function(content) {
		var instance = this;

		instance._lockEditor = true;

		var editor = instance._getEditor();

		var data = instance.get(PROCESSOR).getSuggestion(instance._matchParams.match, content);

		if (instance.get(FILL_MODE) === Base.FILL_MODE_OVERWRITE) {
			var matchParams = instance._matchParams;

			var startRow = matchParams.row;

			var startColumn = matchParams.column - matchParams.match.content.length;

			var cursorPosition = editor.getCursorPosition();

			var Range = require('ace/range').Range;

			var overwriteRange = new Range(startRow, startColumn, cursorPosition.row, cursorPosition.column);

			editor.getSession().replace(overwriteRange, data);
		}
		else {
			editor.insert(data);
		}

		editor.focus();

		instance._lockEditor = false;

		instance.fire('addSuggestion', data);

		return new Do.Halt(null);
	},

	_bindUIACBase: function() {
		var instance = this;

		instance.publish(
			'cursorChange',
			{
				defaultFn: instance._defaultCursorChangeFn
			}
		);

		var editor = instance._getEditor();

		instance._onChangeFn = A.bind('_onEditorChange', instance);

		editor.on('change',	instance._onChangeFn);

		editor.commands.addCommand(
			{
				name: 'showAutoComplete',
				bindKey: A.merge(
					instance.get('showListKey'),
					{
						sender: 'editor|cli'
					}
				),
				exec: function(env, args, request) {
					var cursorPosition = editor.getCursorPosition();

					instance._processAutoComplete(cursorPosition.row, cursorPosition.column);
				}
			}
		);

		instance._onEditorChangeCursorFn = A.bind('_onEditorChangeCursor', instance);

		editor.getSelection().on('changeCursor', instance._onEditorChangeCursorFn);

		instance.on('destroy', instance._destroyUIACBase, instance);
	},

	_defaultCursorChangeFn: function(event) {
		var instance = this;

		var editor = instance._getEditor();

		var cursorPosition = editor.getCursorPosition();

		var row = cursorPosition.row;
		var column = cursorPosition.column;

		var matchParams = instance._matchParams;

		if (row !== matchParams.row || column < matchParams.match.start) {
			instance.fire('cursorOut');
		}
	},

	_destroyUIACBase: function() {
		var instance = this;

		var editor = instance._getEditor();

		editor.commands.removeCommand('showAutoComplete');

		editor.removeListener('change', instance._onChangeFn);

		editor.getSelection().removeListener('changeCursor', instance._onEditorChangeCursorFn);

		instance._removeAutoCompleteCommands();
	},

	_getEditor: function() {
		var instance = this;

		return instance.get(HOST).getEditor();
	},

	_filterResults: function(content, results) {
		var instance = this;

		var filters = instance.get('filters');

		for (var i = 0, length = filters.length; i < length; ++i) {
			results = filters[i].call(instance, content, results.concat());

			if (!results.length) {
				break;
			}
		}

		var sorters = instance.get('sorters');

		for (i = 0, length = sorters.length; i < length; ++i) {
			results = sorters[i].call(instance, content, results.concat());

			if (!results.length) {
				break;
			}
		}

		return results;
	},

	_handleEnter: function(text) {
		var instance = this;

		if (text === '\n' || text === '\t') {
			var selectedEntry = instance._getSelectedEntry();

			return instance._addSuggestion(selectedEntry);
		}
	},

	_onEditorChange: function(event) {
		var instance = this;

		var data = event.data;

		var dataAction = data.action;

		if (!instance._lockEditor && (dataAction === INSERT_TEXT || dataAction === 'removeText')) {
			var dataRange = data.range;

			var column = dataRange.start.column;
			var endRow = dataRange.end.row;
			var startRow = dataRange.start.row;

			if (dataAction === INSERT_TEXT && startRow === endRow) {
				instance._processAutoComplete(startRow, column + 1);
			}

			instance.fire(
				dataAction,
				{
					column: column,
					dataRange: dataRange,
					endRow: endRow,
					startRow: startRow
				}
			);
		}
	},

	_onEditorChangeCursor: function(event) {
		var instance = this;

		instance.fire('cursorChange', instance._getEditor().getCursorPosition());
	},

	_onResultsError: function(error) {
		var instance = this;

		instance.fire('resultsError', error);
	},

	_onResultsSuccess: function(results) {
		var instance = this;

		instance.set('results', results);
	},

	_overwriteCommands: function() {
		var instance = this;

		var editor = instance._getEditor();

		var commands = editor.commands.commands;

		instance._editorCommands.push(
			Do.before(instance._handleEnter, editor, 'onTextInput', instance),
			Do.before(instance._handleKey, commands['golinedown'], EXEC, instance, 40),
			Do.before(instance._handleKey, commands['golineup'], EXEC, instance, 38),
			Do.before(instance._handleKey, commands['gotoend'], EXEC, instance, 35),
			Do.before(instance._handleKey, commands['gotolineend'], EXEC, instance, 35),
			Do.before(instance._handleKey, commands['gotolinestart'], EXEC, instance, 36),
			Do.before(instance._handleKey, commands['gotopagedown'], EXEC, instance, 34),
			Do.before(instance._handleKey, commands['gotopageup'], EXEC, instance, 33),
			Do.before(instance._handleKey, commands['gotostart'], EXEC, instance, 36)
		);
	},

	_phraseMatch: function (content, results, caseSensitive) {
		if (!content) {
			return results;
		}

		return AArray.filter(
			results,
			function (item) {
				var result = true;

				if (item === content) {
					result = false;
				}
				else {
					if (!caseSensitive) {
						item = item.toLowerCase();

						content = content.toLowerCase();
					}

					if (item.indexOf(content) === -1) {
						result = false;
					}
				}

				return result;
			}
		);
	},

	_processAutoComplete: function(row, column) {
		var instance = this;

		var col = column;

		var editor = instance._getEditor();

		var line = editor.getSession().getLine(row);

		line = line.substring(0, column);

		var processor = instance.get(PROCESSOR);

		var match = processor.getMatch(line);

		var coords;

		if (Lang.isObject(match)) {
			coords = editor.renderer.textToScreenCoordinates(row, column);

			coords.pageX += ADOM.docScrollX();
			coords.pageY += ADOM.docScrollY();

			instance._matchParams = {
				column: column,
				match: match,
				row: row
			};

			processor.getResults(match, instance._onResultsSuccessFn, instance._onResultsErrorFn);
		}

		instance.fire(
			'match',
			{
				column: column,
				coords: coords,
				line: line,
				match: match,
				row: row
			}
		);
	},

	_removeAutoCompleteCommands: function() {
		var instance = this;

		(new A.EventHandle(instance._editorCommands)).detach();

		instance._editorCommands.length = 0;
	},

	_sortAscLength: function (content, results, caseSensitive) {
		return results.sort(
			function(item1, item2) {
				var result = 0;

				if (!caseSensitive) {
					item1 = item1.toLowerCase();

					item2 = item2.toLowerCase();
				}

				var index1 = item1.indexOf(content);

				var index2 = item2.indexOf(content);

				if (index1 === 0 && index2 === 0) {
					result = item1.localeCompare(item2);
				}
				else if (index1 === 0) {
					result = -1;
				}
				else if (index2 === 0) {
					result = 1;
				}
				else {
					result = item1.localeCompare(item2);
				}

				return result;
			}
		);
	},

	_validateFillMode: function(value) {
		return (value === Base.FILL_MODE_OVERWRITE || value === Base.FILL_MODE_INSERT);
	}
};

Base.FILL_MODE_INSERT = FILL_MODE_INSERT;
Base.FILL_MODE_OVERWRITE = FILL_MODE_OVERWRITE;

Base.NAME = NAME;

Base.NS = NAME;

Base.ATTRS = {
	fillMode: {
		validator: '_validateFillMode',
		value: Base.FILL_MODE_OVERWRITE
	},

	filters: {
		valueFn: function() {
			var instance = this;

			return [
				instance._phraseMatch
			];
		}
	},

	processor: {
		validator: function(value) {
			return Lang.isObject(value) || Lang.isFunction(value);
		}
	},

	showListKey: {
		validator: Lang.isObject,
		value: {
			mac: 'Alt-Space',
			win: 'Ctrl-Space'
		}
	},

	sorters: {
		valueFn: function() {
			var instance = this;

			return [
				instance._sortAscLength
			];
		}
	}
};

A.AceEditor.AutoCompleteBase = Base;

}, '@VERSION@' ,{requires:['aui-ace-editor']});
AUI.add('aui-ace-autocomplete-list', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	ANode = A.Node,
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

	TPL_FRAGMENT = '<div></div>',

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

			var visible = instance.get(VISIBLE);

			var hasResults = instance._autoCompleteResultsList.hasChildNodes();

			if (event.match) {
				if (hasResults) {
					if (!visible) {
						var coords = event.coords;

						instance.set('xy', [coords.pageX + PADDING_HORIZ, coords.pageY + PADDING_VERT]);

						instance.show();
					}
				}
				else if (visible) {
					instance.hide();
				}
			}
			else if (visible) {
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

			var tmpNode = ANode.create(TPL_FRAGMENT);

			AArray.each(
				results,
				function(item, index) {
					tmpNode.appendChild(
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

			autoCompleteResultsList.setHTML(tmpNode.getHTML());

			var firstEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER);

			if (firstEntry) {
				firstEntry.addClass(SELECTED);
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
AUI.add('aui-ace-autocomplete-plugin', function(A) {
var Plugin = A.Plugin;

function ACListPlugin(config) {
	if (!config.render && config.render !== false) {
		config.render = true;
	}

	ACListPlugin.superclass.constructor.apply(this, arguments);
}

A.extend(ACListPlugin, A.AceEditor.AutoCompleteList, {}, {
	CSS_PREFIX: 'aui-ace-autocomplete',
	NAME      : 'aui-ace-autocomplete-plugin',
	NS        : 'aui-ace-autocomplete-plugin'
});

Plugin.AceAutoComplete = ACListPlugin;
Plugin.AceAutoCompleteList = ACListPlugin;

}, '@VERSION@' ,{requires:['plugin','aui-ace-autocomplete-list']});
AUI.add('aui-ace-autocomplete-templateprocessor', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	AObject = A.Object,
	Base = A.AceEditor.AutoCompleteBase,

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	TOKEN_PUNCTUATOR_DOT = 1,
	TOKEN_UNRECOGNIZED = -1,
	TOKEN_VARIABLE = 0,

	DOT = '.',
	HOST = 'host',
	STR_EMPTY = '',

	NAME = 'aui-ace-autocomplete-templateprocessor';

var TemplateProcessor = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		directives: {
			validator: Lang.isArray
		},

		host: {
			validator: Lang.isObject
		},

		variables: {
			validator: Lang.isObject
		}
	},

	EXTENDS: A.Base,

	prototype: {
		getResults: function(match, callbackSuccess, callbackError) {
			var instance = this;

			var type = match.type;

			if (type === MATCH_DIRECTIVES) {
				var matchDirectives = instance.get('directives');

				var content = match.content.toLowerCase();

				if (content.length) {
					var host = instance.get(HOST);

					matchDirectives = host._filterResults(content, matchDirectives);
				}

				callbackSuccess(matchDirectives);
			}
			else if (type === MATCH_VARIABLES) {
				var matches = instance._getVariableMatches(match.content);

				callbackSuccess(matches);
			}
		},

		getSuggestion: function(match, selectedSuggestion) {
			var instance = this;

			var result = selectedSuggestion || STR_EMPTY;

			if (selectedSuggestion) {
				var fillMode = instance.get(HOST).get('fillMode');

				var type = match.type;

				var variables;

				var lastEntry;

				if (fillMode === Base.FILL_MODE_INSERT) {
					if (type === MATCH_DIRECTIVES) {
						if (match.content && selectedSuggestion.indexOf(match.content) === 0) {
							result = selectedSuggestion.substring(match.content.length);
						}
					}
					else if (type === MATCH_VARIABLES) {
						variables = match.content.split(DOT);

						lastEntry = variables[variables.length - 1];

						if (lastEntry && selectedSuggestion.indexOf(lastEntry) === 0) {
							result = selectedSuggestion.substring(lastEntry.length);
						}
					}
				}
				else if (type === MATCH_VARIABLES) {
					variables = match.content.split(DOT);

					variables[variables.length - 1] = selectedSuggestion;

					result = variables.join(DOT);
				}
			}

			return result;
		},

		_isLastToken: function(index, tokens) {
			return index === tokens.length - 1;
		},

		_getTokenType: function(token) {
			var tokenType = TOKEN_UNRECOGNIZED;

			if (Lang.isString(token)) {
				if (token.length) {
					tokenType = TOKEN_VARIABLE;
				}
				else {
					tokenType = TOKEN_PUNCTUATOR_DOT;
				}
			}

			return tokenType;
		},

		_getVariableMatches: function(content) {
			var instance = this;

			var results = [];

			var data = instance.get('variables');

			var resultsData = {};

			var curVariableData = data.variables;

			var lastEntry;

			if (content) {
				var tokens = content.split(DOT);

				lastEntry = tokens[tokens.length - 1];

				for (var i = 0; i < tokens.length; i++) {
					var token = tokens[i];

					var tokenType = instance._getTokenType(token);

					if (tokenType === TOKEN_PUNCTUATOR_DOT) {
						if (i === 0) {
							curVariableData = {};
						}
						else {
							resultsData = curVariableData;
						}
					}
					else if (tokenType === TOKEN_VARIABLE) {
						var isLastToken = instance._isLastToken(i, tokens);

						if (isLastToken) {
							resultsData = curVariableData;

							break;
						}

						var leftPartheseIndex = token.indexOf('(');

						if (leftPartheseIndex !== -1) {
							token = token.substring(0, leftPartheseIndex);
						}

						var variableData = curVariableData[token];

						if (variableData) {
							var variableType;

							if (i === 0) {
								variableType = variableData.type;
							}
							else {
								variableType = variableData.returnType;
							}

							curVariableData = data.types[variableType] || {};
						}
						else if (isLastToken) {
							resultsData = curVariableData;

							break;
						}
						else {
							resultsData = {};

							break;
						}
					}
				}
			}
			else {
				resultsData = data.variables;
			}

			results = AObject.keys(resultsData);

			var matches = results.sort();

			if (lastEntry) {
				var host = instance.get(HOST);

				matches = host._filterResults(lastEntry, matches);
			}

			if (matches.length) {
				matches = AArray.map(
					matches,
					function(item, index) {
						var data = resultsData[item];

						if (data.type === 'Method') {
							var args = AArray.map(
								data.argumentTypes,
								function(item, index) {
									var parts = item.split('.');

									return parts[parts.length - 1];
								}
							);

							return item + '(' + args.join(', ') + ')';
						}
						else {
							return item;
						}
					}
				);
			}

			return matches;
		},

		_setRegexValue: function(value) {
			var result = A.AttributeCore.INVALID_VALUE;

			if (Lang.isString(value)) {
				result = new RegExp(value);
			}
			else if (value instanceof RegExp) {
				result = value;
			}

			return result;
		}
	}
});

A.AceEditor.TemplateProcessor = TemplateProcessor;

}, '@VERSION@' ,{requires:['aui-ace-autocomplete-base']});
AUI.add('aui-ace-autocomplete-freemarker', function(A) {
var Lang = A.Lang,

	Base = A.AceEditor.AutoCompleteBase,

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	NAME = 'aui-ace-autocomplete-freemarker';

var Freemarker = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		directives: {
			validator: Lang.isArray,
			value: [
				'assign',
				'attempt',
				'break',
				'case',
				'compress',
				'default',
				'else',
				'elseif',
				'escape',
				'fallback',
				'flush',
				'ftl',
				'function',
				'global',
				'if',
				'import',
				'include',
				'list',
				'local',
				'lt',
				'macro',
				'nested',
				'noescape',
				'nt',
				'recover',
				'recurse',
				'return',
				'rt',
				'setting',
				'stop',
				'switch',
				't',
				'visit'
			]
		},

		directivesMatcher: {
			setter: '_setRegexValue',
			value: /<#[\w]*[^<#]*$/
		},

		host: {
			validator: Lang.isObject
		},

		variables: {
			validator: Lang.isObject
		},

		variablesMatcher: {
			setter: '_setRegexValue',
			value: /\${[\w., ()"]*(?:[^$]|\\\$)*$/
		}
	},

	EXTENDS: A.AceEditor.TemplateProcessor,

	prototype: {
		getMatch: function(content) {
			var instance = this;

			var match;

			var matchIndex;

			if ((matchIndex = content.lastIndexOf('<')) >= 0) {
				content = content.substring(matchIndex);

				if (instance.get('directivesMatcher').test(content)) {
					match = {
						content: content.substring(2),
						start: matchIndex,
						type: MATCH_DIRECTIVES
					};
				}
			}
			else if ((matchIndex = content.lastIndexOf('$')) >= 0) {
				content = content.substring(matchIndex);

				if (instance.get('variablesMatcher').test(content)) {
					match = {
						content: content.substring(2),
						start: matchIndex,
						type: MATCH_VARIABLES
					};
				}
			}

			return match;
		}
	}
});

A.AceEditor.AutoCompleteFreemarker = Freemarker;

}, '@VERSION@' ,{requires:['aui-ace-autocomplete-templateprocessor']});
AUI.add('aui-ace-autocomplete-velocity', function(A) {
var Lang = A.Lang,

	Base = A.AceEditor.AutoCompleteBase,

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	NAME = 'aui-ace-autocomplete-velocity';

var Velocity = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		directives: {
			validator: Lang.isArray,
			value: [
				'else',
				'elseif',
				'foreach',
				'if',
				'include',
				'macro',
				'parse',
				'set',
				'stop'
			]
		},

		directivesMatcher: {
			setter: '_setRegexValue',
			value: /#[\w]*[^#]*$/
		},

		host: {
			validator: Lang.isObject
		},

		variables: {
			validator: Lang.isObject
		},

		variablesMatcher: {
			setter: '_setRegexValue',
			value: /\$[\w., ()"]*(?:[^$]|\\\$)*$/
		}
	},

	EXTENDS: A.AceEditor.TemplateProcessor,

	prototype: {
		getMatch: function(content) {
			var instance = this;

			var match;

			var matchIndex;

			if ((matchIndex = content.lastIndexOf('#')) >= 0) {
				content = content.substring(matchIndex);

				if (instance.get('directivesMatcher').test(content)) {
					match = {
						content: content.substring(1),
						start: matchIndex,
						type: MATCH_DIRECTIVES
					};
				}
			}
			else if ((matchIndex = content.lastIndexOf('$')) >= 0) {
				content = content.substring(matchIndex);

				if (instance.get('variablesMatcher').test(content)) {
					match = {
						content: content.substring(1),
						start: matchIndex,
						type: MATCH_VARIABLES
					};
				}
			}

			return match;
		}
	}
});

A.AceEditor.AutoCompleteVelocity = Velocity;

}, '@VERSION@' ,{requires:['aui-ace-autocomplete-templateprocessor']});


AUI.add('aui-ace-autocomplete', function(A){}, '@VERSION@' ,{use:['aui-ace-autocomplete-base','aui-ace-autocomplete-list','aui-ace-autocomplete-plugin']});

