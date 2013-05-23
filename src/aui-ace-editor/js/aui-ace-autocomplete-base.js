/**
 * The ACE Editor Component
 *
 * @module aui-ace-editor
 * @submodule aui-ace-autocomplete-base
 */

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

    _NAME = 'ace-autocomplete-base',

    ADD_SUGGESTION = 'addSuggestion',
    CHANGE = 'change',
    CHANGE_CURSOR = 'changeCursor',
    CURSOR_CHANGE = 'cursorChange',
    CURSOR_OUT = 'cursorOut',
    DESTROY = 'destroy',
    FILTERS = 'filters',
    GOLINEDOWN = 'golinedown',
    GOLINEUP = 'golineup',
    GOTOEND = 'gotoend',
    GOTOLINEEND = 'gotolineend',
    GOTOLINESTART = 'gotolinestart',
    GOTOPAGEDOWN = 'gotopagedown',
    GOTOPAGEUP = 'gotopageup',
    GOTOSTART = 'gotostart',
    MATCH = 'match',
    ON_TEXT_INPUT = 'onTextInput',
    REMOVE_TEXT = 'removeText',
    RENDER_UI = 'renderUI',
    RESULTS = 'results',
    RESULTS_ERROR = 'resultsError',
    SHOW_AUTO_COMPLETE = 'showAutoComplete',
    SHOW_LIST_KEY = 'showListKey',
    SORTERS = 'sorters',

Base = function(){};

/**
 * A base class for AutoCompleteBase.
 *
 * @class A.AutoCompleteBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
Base.prototype = {

    /**
     * Construction logic executed during AutoCompleteBase instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this,
            processor;

        instance._editorCommands = [];

        A.after(instance._bindUIACBase, instance, RENDER_UI);

        processor = instance.get(PROCESSOR);

        if (processor && !processor.get(HOST)) {
            processor.set(HOST, instance);
        }

        instance._onResultsErrorFn = A.bind('_onResultsError', instance);
        instance._onResultsSuccessFn = A.bind('_onResultsSuccess', instance);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _addSuggestion
     * @param content
     * @protected
     */
    _addSuggestion: function(content) {
        var instance = this,
            cursorPosition,
            data,
            editor,
            matchParams,
            overwriteRange,
            Range,
            startColumn,
            startRow;

        instance._lockEditor = true;

        editor = instance._getEditor();

        data = instance.get(PROCESSOR).getSuggestion(instance._matchParams.match, content);

        if (instance.get(FILL_MODE) === Base.FILL_MODE_OVERWRITE) {
            matchParams = instance._matchParams;

            startRow = matchParams.row;

            startColumn = matchParams.column - matchParams.match.content.length;

            cursorPosition = editor.getCursorPosition();

            Range = require('ace/range').Range;

            overwriteRange = new Range(startRow, startColumn, cursorPosition.row, cursorPosition.column);

            editor.getSession().replace(overwriteRange, data);
        }
        else {
            editor.insert(data);
        }

        editor.focus();

        instance._lockEditor = false;

        instance.fire(ADD_SUGGESTION, data);

        return new Do.Halt(null);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _bindUIACBase
     * @protected
     */
    _bindUIACBase: function() {
        var instance = this,
            editor;

        instance.publish(
            CURSOR_CHANGE,
            {
                defaultFn: instance._defaultCursorChangeFn
            }
        );

        editor = instance._getEditor();

        instance._onChangeFn = A.bind('_onEditorChange', instance);

        editor.on(CHANGE, instance._onChangeFn);

        editor.commands.addCommand(
            {
                name: SHOW_AUTO_COMPLETE,
                bindKey: A.merge(
                    instance.get(SHOW_LIST_KEY),
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

        editor.getSelection().on(CHANGE_CURSOR, instance._onEditorChangeCursorFn);

        instance.on(DESTROY, instance._destroyUIACBase, instance);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _defaultCursorChangeFn
     * @param event
     * @protected
     */
    _defaultCursorChangeFn: function(event) {
        var instance = this,
            column,
            cursorPosition,
            editor,
            matchParams,
            row;

        editor = instance._getEditor();

        cursorPosition = editor.getCursorPosition();

        row = cursorPosition.row;
        column = cursorPosition.column;

        matchParams = instance._matchParams;

        if (row !== matchParams.row || column < matchParams.match.start) {
            instance.fire(CURSOR_OUT);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _destroyUIACBase
     * @protected
     */
    _destroyUIACBase: function() {
        var instance = this,
            editor;

        editor = instance._getEditor();

        editor.commands.removeCommand(SHOW_AUTO_COMPLETE);

        editor.removeListener(CHANGE, instance._onChangeFn);

        editor.getSelection().removeListener(CHANGE_CURSOR, instance._onEditorChangeCursorFn);

        instance._removeAutoCompleteCommands();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getEditor
     * @protected
     */
    _getEditor: function() {
        var instance = this;

        return instance.get(HOST).getEditor();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _filterResults
     * @param content
     * @param results
     * @protected
     */
    _filterResults: function(content, results) {
        var instance = this,
            filters,
            i,
            length,
            sorters;

        filters = instance.get(FILTERS);

        for (i = 0, length = filters.length; i < length; ++i) {
            results = filters[i].call(instance, content, results.concat());

            if (!results.length) {
                break;
            }
        }

        sorters = instance.get(SORTERS);

        for (i = 0, length = sorters.length; i < length; ++i) {
            results = sorters[i].call(instance, content, results.concat());

            if (!results.length) {
                break;
            }
        }

        return results;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _handleEnter
     * @param text
     * @protected
     */
    _handleEnter: function(text) {
        var instance = this,
            selectedEntry;

        if (text === '\n' || text === '\t') {
            selectedEntry = instance._getSelectedEntry();

            return instance._addSuggestion(selectedEntry);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onEditorChange
     * @param event
     * @protected
     */
    _onEditorChange: function(event) {
        var instance = this,
            column,
            data,
            dataAction,
            dataRange,
            endRow,
            startRow;

            data = event.data;

            dataAction = data.action;

        if (!instance._lockEditor && (dataAction === INSERT_TEXT || dataAction === REMOVE_TEXT)) {
            dataRange = data.range;

            column = dataRange.start.column;
            endRow = dataRange.end.row;
            startRow = dataRange.start.row;

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

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onEditorChangeCursor
     * @param event
     * @protected
     */
    _onEditorChangeCursor: function(event) {
        var instance = this;

        instance.fire(CURSOR_CHANGE, instance._getEditor().getCursorPosition());
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onResultsError
     * @param error
     * @protected
     */
    _onResultsError: function(error) {
        var instance = this;

        instance.fire(RESULTS_ERROR, error);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onResultsSuccess
     * @param results
     * @protected
     */
    _onResultsSuccess: function(results) {
        var instance = this;

        instance.set(RESULTS, results);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _overwriteCommands
     * @protected
     */
    _overwriteCommands: function() {
        var instance = this,
            commands,
            editor;

        editor = instance._getEditor();

        commands = editor.commands.commands;

        instance._editorCommands.push(
            Do.before(instance._handleEnter, editor, ON_TEXT_INPUT, instance),
            Do.before(instance._handleKey, commands[GOLINEDOWN], EXEC, instance, 40),
            Do.before(instance._handleKey, commands[GOLINEUP], EXEC, instance, 38),
            Do.before(instance._handleKey, commands[GOTOEND], EXEC, instance, 35),
            Do.before(instance._handleKey, commands[GOTOLINEEND], EXEC, instance, 35),
            Do.before(instance._handleKey, commands[GOTOLINESTART], EXEC, instance, 36),
            Do.before(instance._handleKey, commands[GOTOPAGEDOWN], EXEC, instance, 34),
            Do.before(instance._handleKey, commands[GOTOPAGEUP], EXEC, instance, 33),
            Do.before(instance._handleKey, commands[GOTOSTART], EXEC, instance, 36)
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _phraseMatch
     * @param content
     * @param results
     * @param caseSensitive
     * @protected
     */
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

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _processAutoComplete
     * @param row
     * @param column
     * @protected
     */
    _processAutoComplete: function(row, column) {
        var instance = this,
            col,
            coords,
            editor,
            line,
            match,
            processor;

        col = column;

        editor = instance._getEditor();

        line = editor.getSession().getLine(row);

        line = line.substring(0, column);

        processor = instance.get(PROCESSOR);

        match = processor.getMatch(line);

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
            MATCH,
            {
                column: column,
                coords: coords,
                line: line,
                match: match,
                row: row
            }
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _removeAutoCompleteCommands
     * @protected
     */
    _removeAutoCompleteCommands: function() {
        var instance = this;

        (new A.EventHandle(instance._editorCommands)).detach();

        instance._editorCommands.length = 0;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _sortAscLength
     * @param content
     * @param results
     * @param caseSensitive
     * @protected
     */
    _sortAscLength: function (content, results, caseSensitive) {
        return results.sort(
            function(item1, item2) {
                var index1,
                    index2,
                    result;

                result = 0;

                if (!caseSensitive) {
                    item1 = item1.toLowerCase();

                    item2 = item2.toLowerCase();
                }

                index1 = item1.indexOf(content);

                index2 = item2.indexOf(content);

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

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _validateFillMode
     * @param value
     * @protected
     */
    _validateFillMode: function(value) {
        return (value === Base.FILL_MODE_OVERWRITE || value === Base.FILL_MODE_INSERT);
    }
};

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property Base.FILL_MODE_INSERT
 * @static
 */
Base.FILL_MODE_INSERT = FILL_MODE_INSERT;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property Base.FILL_MODE_OVERWRITE
 * @static
 */
Base.FILL_MODE_OVERWRITE = FILL_MODE_OVERWRITE;

/**
 * Static property provides a string to identify the class.
 *
 * @property AutoCompleteBase.NAME
 * @type String
 * @static
 */
Base.NAME = _NAME;

/**
 * Static property provides a string to identify the namespace.
 *
 * @property AutoCompleteBase.NS
 * @type String
 * @static
 */
Base.NS = _NAME;

/**
 * Static property used to define the default attribute
 * configuration for the AutoCompleteBase.
 *
 * @property AutoCompleteBase.ATTRS
 * @type Object
 * @static
 */
Base.ATTRS = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute fillMode
     */
    fillMode: {
        validator: '_validateFillMode',
        value: Base.FILL_MODE_OVERWRITE
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute filters
     */
    filters: {
        valueFn: function() {
            var instance = this;

            return [
                instance._phraseMatch
            ];
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute processor
     * @type Object | Function
     */
    processor: {
        validator: function(value) {
            return Lang.isObject(value) || Lang.isFunction(value);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute showListKey
     * @type Object
     */
    showListKey: {
        validator: Lang.isObject,
        value: {
            mac: 'Alt-Space',
            win: 'Ctrl-Space'
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute sorters
     */
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
