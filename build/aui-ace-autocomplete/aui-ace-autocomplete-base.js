AUI.add('aui-ace-autocomplete-base', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	Do = A.Do,
	ADOM = A.DOM,

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

			coords.pageX += ADOM.docScrollX();
			coords.pageY += ADOM.docScrollY();

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
