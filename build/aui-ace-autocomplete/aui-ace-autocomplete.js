AUI.add('aui-ace-autocomplete-base', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	Do = A.Do,

	INSERT_TEXT = 'insertText',
	EXEC = 'exec',
	HOST = 'host',
	PROCESSOR = 'processor',

	STATUS_ERROR = -1,
	STATUS_SUCCESS = 0,

	NAME = 'ace-autocomplete-base';

var Base = function(){};

Base.prototype = {
	initializer: function() {
		var instance = this;

		instance._editorCommands = [];

		A.after(this._bindUIACBase, this, 'renderUI');

		var processor = instance.get(PROCESSOR);

		if (processor && !processor.get(HOST)) {
			processor.set(HOST, instance);
		}
	},

	_addSuggestion: function(content) {
		var instance = this;

		var editor = instance._getEditor();

		var data = instance.get(PROCESSOR).getSuggestion(instance._matchParams.match, content);

		editor.insert(data);

		editor.focus();

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

		editor.on('change',	A.bind(instance._onEditorChange, instance));

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

		editor.getSelection().on('changeCursor', A.bind(instance._onEditorChangeCursor, instance));

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
		else {
			var line = editor.getSession().getLine(row);

			var subline = line.substring(matchParams.match.start, column);

			if (!instance.get(PROCESSOR).getMatch(subline)) {
				instance.fire('match');
			}
		}
	},

	_destroyUIACBase: function() {
		var instance = this;

		instance._removeAutoCompleteCommands();
	},

	_getEditor: function() {
		var instance = this;

		return instance.get('host').getEditor();
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

		if (dataAction === INSERT_TEXT || dataAction === 'removeText') {
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
			Do.before(instance._handleEnter, editor, 'onTextInput', this),
			Do.before(instance._handleKey, commands['golinedown'], EXEC, this, 40),
			Do.before(instance._handleKey, commands['golineup'], EXEC, this, 38),
			Do.before(instance._handleKey, commands['gotoend'], EXEC, this, 35),
			Do.before(instance._handleKey, commands['gotolineend'], EXEC, this, 35),
			Do.before(instance._handleKey, commands['gotolinestart'], EXEC, this, 36),
			Do.before(instance._handleKey, commands['gotopagedown'], EXEC, this, 34),
			Do.before(instance._handleKey, commands['gotopageup'], EXEC, this, 33),
			Do.before(instance._handleKey, commands['gotostart'], EXEC, this, 36)
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

			instance._matchParams = {
				column: column,
				match: match,
				row: row
			};

			processor.getResults(match, A.bind(instance._onResultsSuccess, instance), A.bind(instance._onResultsError, instance));
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

		AArray.invoke(instance._editorCommands, 'detach');

		instance._editorCommands.length = 0;
	}
};

Base.NAME = NAME;

Base.NS = NAME;

Base.ATTRS = {
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
	}
};

A.AceEditor.AutoCompleteBase = Base;

}, '@VERSION@' ,{requires:['aui-ace-editor']});
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

}, '@VERSION@' ,{skinnable:true, requires:['aui-overlay-base','widget-autohide','aui-ace-autocomplete-base']});
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
AUI.add('aui-ace-autocomplete-freemarker', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	AObject = A.Object,

	DIRECTIVES = [
		'flush',
		'recover',
		'fallback',
		'local',
		'break',
		'lt',
		'case',
		'global',
		'if',
		'compress',
		'escape',
		'assign',
		'elseif',
		'noescape',
		'setting',
		'list',
		'else',
		'switch',
		'include',
		'recurse',
		'rt',
		'ftl',
		'macro',
		'stop',
		'nt',
		'visit',
		'attempt',
		'nested',
		'import',
		'default',
		'return',
		't',
		'function'
	],

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	REGEX_DIRECTIVES = /<#[\w.]*>?$/,
	REGEX_VARIABLES = /\$\{[\w., ()"]*\}?$/,

	STATUS_ERROR = -1,
	STATUS_SUCCESS = 0,

	ALL =  'all',
	DOT = '.',
	STR_EMPTY = '',
	STR_RESPONSE_DATA = 'responseData',
	VARIABLES = 'variables',

	NAME = 'aui-ace-autocomplete-freemarker';

var Freemarker = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		host: {
			validator: Lang.isObject
		},

		variables: {
			validator: Lang.isObject
		}
	},

	EXTENDS: A.Base,

	prototype: {
		initializer: function(config) {
			var instance = this;

			instance._tstree = new A.TernarySearchTree();
		},

		getMatch: function(content) {
			var instance = this;

			var match;

			var matchIndex;

			if ((matchIndex = content.lastIndexOf('<')) >= 0) {
				content = content.substring(matchIndex);

				if (REGEX_DIRECTIVES.test(content)) {
					match = {
						content: content.substring(2),
						start: matchIndex,
						type: MATCH_DIRECTIVES
					};
				}
			}
			else if ((matchIndex = content.lastIndexOf('$')) >= 0) {
				content = content.substring(matchIndex);

				if (REGEX_VARIABLES.test(content)) {
					match = {
						content: content.substring(2),
						start: matchIndex,
						type: MATCH_VARIABLES
					};
				}
			}

			return match;
		},

		getResults: function(match, callbackSuccess, callbackError) {
			var instance = this;

			var tstree = instance._tstree;

			var type = match.type;

			if (type === MATCH_DIRECTIVES) {
				var matchDirectives = DIRECTIVES;

				var content = match.content;

				if (content.length) {
					if (instance._lastTSTLoad !== MATCH_DIRECTIVES) {
						instance._addDirectives();
					}

					matchDirectives = tstree.prefixSearch(content);
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
				var type = match.type;

				if (type === MATCH_DIRECTIVES) {
					if (match.content && selectedSuggestion.indexOf(match.content) === 0) {
						result = selectedSuggestion.substring(match.content.length);
					}
				}
				else if (type === MATCH_VARIABLES) {
					var variables = match.content.split(DOT);

					var lastEntry = variables[variables.length - 1];

					if (lastEntry && selectedSuggestion.indexOf(lastEntry) === 0) {
						result = selectedSuggestion.substring(lastEntry.length);
					}
				}
			}

			return result;
		},

		_addData: function(data) {
			var instance = this;

			var tstree = instance._tstree;

			tstree.empty();

			AArray.each(
				data,
				function(item, index) {
					tstree.add(item);
				}
			);
		},

		_addDirectives: function() {
			var instance = this;

			instance._addData(DIRECTIVES);

			instance._lastTSTLoad = MATCH_DIRECTIVES;
		},

		_getVariableMatches: function(content) {
			var instance = this;

			var variables = content.split(DOT);

			var variableCache = instance.get(VARIABLES);

			var lastEntry = variables[variables.length - 1];

			variables.length -= 1;

			var variable;

			if (variables.length > 0) {
				for (var i = 0; i < variables.length; i++) {
					variable = variables[i];

					if (Lang.isObject(variableCache)) {
						variableCache = variableCache[variable];
					}
				}
			}

			var matches = [];

			if (Lang.isObject(variableCache)) {
				AArray.each(
					AObject.keys(variableCache),
					function(item, index) {
						matches.push(item);
					}
				);

				if (lastEntry) {
					var tstree = instance._tstree;

					tstree.empty();

					AArray.each(
						matches,
						function(item, index) {
							tstree.add(item);
						}
					);

					matches = tstree.prefixSearch(lastEntry);

					instance._lastTSTLoad = MATCH_VARIABLES;
				}
			}

			return matches;
		}
	}
});

Freemarker.DIRECTIVES = DIRECTIVES;

A.AceEditor.AutoCompleteFreemarker = Freemarker;

}, '@VERSION@' ,{requires:['aui-ace-autocomplete-base','aui-search-ternary-search-tree']});


AUI.add('aui-ace-autocomplete', function(A){}, '@VERSION@' ,{use:['aui-ace-autocomplete-base','aui-ace-autocomplete-list','aui-ace-autocomplete-plugin']});

