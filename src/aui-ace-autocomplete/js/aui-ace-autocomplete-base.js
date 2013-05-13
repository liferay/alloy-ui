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
