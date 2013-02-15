AUI.add('aui-ace-autocomplete-freemarker', function(A) {
/*global A, AUI*/
var Lang = A.Lang,
	AArray = A.Array,
	Do = A.Do,

	NAME = 'ace-autocomplete-freemarker',

	DIRECTIVES = [
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
	];

var Freemarker = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		list: {
			readOnly: true,
			getter: function() {
				var instance = this;

				return instance._list;
			}
		},

		regex: {
			value: /<#[\w.]*$/
		},

		uiConfig: {
			value: {
				buttons: null,
				render: true,
				visible: false,
				width: 250,
				zIndex: 10000
			}
		}
	},

	EXTENDS: A.Plugin.Base,

	prototype: {
		initializer: function(config) {
			var instance = this;

			instance._editorCommands = [];

			instance._tstree = new A.TernarySearchTree();

			instance.afterHostEvent(
				'render',
				function() {
					instance._renderUI();

					instance._bindUI();
				}
			);
		},

		destructor: function() {
			var instance = this;

			instance._removeAutoCompleteCommands();
		},

		_renderUI: function() {
			var instance = this;

			var uiConfig = instance.get('uiConfig');

			var list = new A.AceEditor.AutoCompleteList(uiConfig);

			list.on(
				'visibleChange',
				function(event) {
					if (event.newVal) {
						instance._overwriteCommands();
					}
					else {
						instance._removeAutoCompleteCommands();
					}
				}
			);

			list.on('entrySelected', instance._insertWord, instance);

			instance._list = list;
		},

		_bindUI: function() {
			var instance = this;

			var editor = instance._getEditor();

			editor.on('change',	A.bind(instance._onEditorChange, instance));

			editor.getSelection().on('changeCursor', A.bind(instance._onCursorChange, instance));
		},

		_getEditor: function() {
			var instance = this;

			return instance.get('host').getEditor();
		},

		_insertWord: function() {
			var instance = this;

			var editor = instance._getEditor();

			var selectedEntryText = instance._list.get('selectedEntry');

			if (instance._enteringParams.word) {
				selectedEntryText = selectedEntryText.substring(instance._enteringParams.word.length);
			}

			editor.insert(selectedEntryText);

			instance._list.hide();

			editor.focus();

			return new Do.Halt(null);
		},

		_handleEnter: function(text) {
			var instance = this;

			if (text === '\n' || text === '\t') {
				return instance._insertWord();
			}
		},

		_handleKey: function(event, obj, keyCode) {
			var instance = this;

			var result;

			if (instance._list.get('visible')) {
				result = instance._list.handleKey(keyCode);
			}

			return result;
		},

		_onEditorChange: function(event) {
			var instance = this;

			var data = event.data;

			if (data.action === 'insertText') {
				var dataRange = data.range;

				var column = dataRange.start.column;
				var endRow = dataRange.end.row;
				var startRow = dataRange.start.row;

				if (startRow === endRow) {
					instance._processAutoComplete(startRow, column + 1);
				}
				else if (instance._list.get('visible')) {
					instance._list.hide();
				}
			}
			else if (data.action === 'removeText') {
				if (instance._list.get('visible')) {
					instance._list.hide();
				}
			}
		},

		_onCursorChange: function(event) {
			var instance = this;

			var editor = instance._getEditor();

			var panel = instance._list;

			if (panel.get('visible')) {
				var cursorPosition = editor.getCursorPosition();

				var row = cursorPosition.row;
				var column = cursorPosition.column;

				var enteringParams = instance._enteringParams;

				if (row !== enteringParams.row || column < enteringParams.lastBracketIndex) {
					panel.hide();
				}
				else {
					var line = editor.getSession().getLine(row);

					var subline = line.substring(enteringParams.lastBracketIndex, column);

					if (!instance.get('regex').test(subline)) {
						panel.hide();
					}
				}
			}
		},

		_overwriteCommands: function() {
			var instance = this;

			var editor = instance._getEditor();

			var commands = editor.commands.commands;

			instance._editorCommands.push(
				Do.before(instance._handleEnter, editor, 'onTextInput', this),
				Do.before(instance._handleKey, commands['golinedown'], 'exec', this, 40),
				Do.before(instance._handleKey, commands['golineup'], 'exec', this, 38),
				Do.before(instance._handleKey, commands['gotoend'], 'exec', this, 35),
				Do.before(instance._handleKey, commands['gotolineend'], 'exec', this, 35),
				Do.before(instance._handleKey, commands['gotolinestart'], 'exec', this, 36),
				Do.before(instance._handleKey, commands['gotopagedown'], 'exec', this, 34),
				Do.before(instance._handleKey, commands['gotopageup'], 'exec', this, 33),
				Do.before(instance._handleKey, commands['gotostart'], 'exec', this, 36)
			);
		},

		_processAutoComplete: function(row, column) {
			var instance = this;

			var col = column;

			var editor = instance._getEditor();

			var line = editor.getSession().getLine(row);

			var subline = line.substring(0, column);

			var lastBracketIndex = subline.lastIndexOf('<');

			var panel = instance._list;

			if (lastBracketIndex >= 0) {
				subline = subline.substring(lastBracketIndex);

				if (instance.get('regex').test(subline)) {
					var coords = editor.renderer.textToScreenCoordinates(row, column);

					var word = subline.substring(2);

					instance._enteringParams = {
						column: column,
						lastBracketIndex: lastBracketIndex,
						row: row,
						word: word
					};

					var matchDirectives = DIRECTIVES;

					if (word.length) {
						matchDirectives = instance._tstree.prefixSearch(word);
					}

					instance._list.set('results', matchDirectives);

					panel.set('xy', [coords.pageX + 5, coords.pageY + 20]);

					if (!panel.get('visible')) {
						panel.show();
					}
				}
			}
			else if(panel.get('visible')) {
				panel.hide();
			}
		},

		_removeAutoCompleteCommands: function() {
			var instance = this;

			AArray.invoke(instance._editorCommands, 'detach');
		}
	}
});

A.AceEditor.AutoCompleteFreemarker = Freemarker;
/*global A, AUI*/
var Lang = A.Lang,
	AArray = A.Array,
	Do = A.Do,

	getCN = A.getClassName,

	NAME = 'ace-autocomplete-list',

	CONTAINER = 'container',
	EMPTY = 'empty',
	EMPTY_STRING = '',
	ENTRY = 'entry',
	LIST = 'list',
	RESULTS = 'results',

	CLASS_ENTRY = getCN(NAME, ENTRY),
	CLASS_ENTRY_CONTAINER = getCN(NAME, ENTRY, CONTAINER),
	CLASS_ENTRY_EMPTY = getCN(NAME, ENTRY, EMPTY),
	CLASS_RESULTS_LIST = getCN(NAME, RESULTS),

	DOT = '.',
	OFFSET_HEIGHT = 'offsetHeight',
	REGION = 'region',
	SELECTED = 'selected',

	KEY_DONW = 40,
	KEY_END = 35,
	KEY_PAGE_DOWN = 34,
	KEY_PAGE_UP = 33,
	KEY_START = 36,
	KEY_UP = 38,

	ATTR_DATA_INDEX = 'data-index',

	SELECTOR_ENTRY_CONTAINER = DOT + CLASS_ENTRY_CONTAINER,
	SELECTOR_ENTRY_CONTAINER_SELECTED = SELECTOR_ENTRY_CONTAINER + DOT + SELECTED,
	SELECTOR_SELECTED_ENTRY = SELECTOR_ENTRY_CONTAINER_SELECTED + DOT + CLASS_ENTRY;

var AutoCompleteList = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		emptyMessage: {
			value: 'No suggestions'
		},

		listNode: {
			value: null
		},

		results: {
			validator: Lang.isArray
		},

		selectedEntry: {
			getter: '_getSelectedEntry'
		}
	},

	HTML_PARSER: {
		listNode: DOT + CLASS_RESULTS_LIST
	},

	EXTENDS: A.Panel,

	prototype: {
		initializer: function(config) {

		},

		bindUI: function() {
			var instance = this;

			instance.on('resultsChange', instance._onResultsChange, instance);
		},

		handleKey: function(keyCode) {
			var instance = this;

			if (keyCode === KEY_UP || keyCode === KEY_DONW) {
				return instance._handleArrows(keyCode);
			}
			else if (keyCode === KEY_PAGE_UP || keyCode === KEY_PAGE_DOWN) {
				return instance._handlePageUpDown(keyCode);
			}
			else if (keyCode === KEY_END || keyCode === KEY_START) {
				return instance._handleStartEnd(keyCode);
			}
		},

		renderUI: function() {
			var instance = this;

			var autoCompleteResultsList = instance.get('listNode');

			if (!autoCompleteResultsList) {
				autoCompleteResultsList = instance._createListNode();
			}

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

			var selectedEntry = instance._autoCompleteResultsList.one(SELECTOR_SELECTED_ENTRY);

			if (selectedEntry) {
				entryText = selectedEntry.text();
			}

			return entryText;
		},

		_handleArrows: function(keyCode) {
			var instance = this;

			var action;

			if (keyCode === KEY_UP) {
				action = 'previous';
			}
			else if (keyCode === KEY_DONW) {
				action = 'next';
			}

			if (action) {
				var autoCompleteResultsList = instance._autoCompleteResultsList;

				var selectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

				if(selectedEntry) {
					var entry = selectedEntry[action](CLASS_ENTRY_CONTAINER);

					if (entry) {
						selectedEntry.removeClass(SELECTED);

						entry.addClass(SELECTED);

						var resultsListNodeRegion = autoCompleteResultsList.get(REGION);

						var entryRegion = entry.get(REGION);

						if (action === 'previous') {
							if (entryRegion.top < resultsListNodeRegion.top) {
								entry.scrollIntoView(true);
							}
						}
						else {
							if (entryRegion.top + entryRegion.height > resultsListNodeRegion.bottom) {
								entry.scrollIntoView();
							}
						}
					}
				}

				return new Do.Halt(null);
			}
		},

		_handlePageUpDown: function(keyCode) {
			var instance = this;

			var autoCompleteResultsList = instance._autoCompleteResultsList;

			var entriesPerPage = instance._getEntriesPerPage();

			var selectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

			var selectedEntryIndex = parseInt(selectedEntry.attr(ATTR_DATA_INDEX), 0);

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

			instance.fire('entrySelected', entryNode);
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
			}
			else {
				autoCompleteResultsList.appendChild(
					instance.TPL_RESULTS_EMPTY,
					Lang.sub(
						{
							label: instance.get('emptyMessage')
						}
					)
				);
			}
		},

		TPL_ENTRY:
			'<li class="' + CLASS_ENTRY_CONTAINER + '" data-index="{index}">' +
				'<span class="' + CLASS_ENTRY + '">{value}</span>' +
			'</li>',

		TPL_LIST: '<ul class="' + CLASS_RESULTS_LIST + '"/>',

		TPL_RESULTS_EMPTY:
			'<li class="' + CLASS_ENTRY_CONTAINER + '">' +
				'<span class="' + CLASS_ENTRY_EMPTY + '">{label}</span>' +
			'</li>'
	}
});

A.AceEditor.AutoCompleteList = AutoCompleteList;

}, '@VERSION@' ,{requires:['aui-ace-editor','aui-search-ternary-search-tree','panel','plugin'], skinnable:true});
