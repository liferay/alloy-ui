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

    FILL_MODE_INSERT = 1,
    FILL_MODE_OVERWRITE = 0,

    Base = function() {};

/**
 * A base class for AutoCompleteBase.
 *
 * @class A.AceEditor.AutoCompleteBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
Base.prototype = {

    /**
     * Construction logic executed during AutoCompleteBase instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this,
            processor;

        instance._editorCommands = [];

        A.after(instance._bindUIACBase, instance, 'renderUI');

        processor = instance.get('processor');

        if (processor && !processor.get('host')) {
            processor.set('host', instance);
        }

        instance._onResultsErrorFn = A.bind('_onResultsError', instance);
        instance._onResultsSuccessFn = A.bind('_onResultsSuccess', instance);
    },

    /**
     * Inserts the provided suggestion as a string to the editor. The added text
     * can overwrite the match or to be inserted depending on the `fillMode`
     * attribute.
     *
     * @method _addSuggestion
     * @param {String} content
     * @protected
     * @return {Do.Halt} Instance of Do.Halt to stop function execution
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

        data = instance.get('processor').getSuggestion(instance._matchParams.match, content);

        if (instance.get('fillMode') === Base.FILL_MODE_OVERWRITE) {
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

        instance.fire('addSuggestion', data);

        return new Do.Halt(null);
    },

    /**
     * Binds editor events.
     *
     * @method _bindUIACBase
     * @protected
     */
    _bindUIACBase: function() {
        var instance = this,
            editor;

        instance.publish(
            'cursorChange', {
                defaultFn: instance._defaultCursorChangeFn
            }
        );

        editor = instance._getEditor();

        instance._onChangeFn = A.bind('_onEditorChange', instance);

        editor.on('change', instance._onChangeFn);

        editor.commands.addCommand({
            name: 'showAutoComplete',
            bindKey: A.merge(
                instance.get('showListKey'), {
                    sender: 'editor|cli'
                }
            ),
            exec: function() {
                var cursorPosition = editor.getCursorPosition();

                instance._processAutoComplete(cursorPosition.row, cursorPosition.column);
            }
        });

        instance._onEditorChangeCursorFn = A.bind('_onEditorChangeCursor', instance);

        editor.getSelection().on('changeCursor', instance._onEditorChangeCursorFn);

        instance.on('destroy', instance._destroyUIACBase, instance);
    },

    /**
     * Checks if the cursor is out of the row/column on the latest match. If so,
     * fires an `cursorOut` event.
     *
     * @method _defaultCursorChangeFn
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _defaultCursorChangeFn: function() {
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
            instance.fire('cursorOut');
        }
    },

    /**
     * Removes the listeners to editor commands.
     *
     * @method _destroyUIACBase
     * @protected
     */
    _destroyUIACBase: function() {
        var instance = this,
            editor;

        editor = instance._getEditor();

        editor.commands.removeCommand('showAutoComplete');

        editor.removeListener('change', instance._onChangeFn);

        editor.getSelection().removeListener('changeCursor', instance._onEditorChangeCursorFn);

        instance._removeAutoCompleteCommands();
    },

    /**
     * Returns the editor instance.
     *
     * @method _getEditor
     * @protected
     * @return {Object} Editor instance
     */
    _getEditor: function() {
        var instance = this;

        return instance.get('host').getEditor();
    },

    /**
     * Filters and sorts the found suggestions using the existing chain of
     * `filters` and `sorters`.
     *
     * @method _filterResults
     * @param {String} content
     * @param {Array} results
     * @protected
     * @return {Array} The filtered results
     */
    _filterResults: function(content, results) {
        var instance = this,
            filters,
            i,
            length,
            sorters;

        filters = instance.get('filters');

        for (i = 0, length = filters.length; i < length; ++i) {
            results = filters[i].call(instance, content, results.concat());

            if (!results.length) {
                break;
            }
        }

        sorters = instance.get('sorters');

        for (i = 0, length = sorters.length; i < length; ++i) {
            results = sorters[i].call(instance, content, results.concat());

            if (!results.length) {
                break;
            }
        }

        return results;
    },

    /**
     * Checks for new line or tab character and adds a suggestion to the editor
     * if so.
     *
     * @method _handleEnter
     * @param {String} text
     * @protected
     * @return {Do.Halt} If text is new line or tab character, returns an
     *     instance of Do.Halt to stop function execution
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
     * Handles editor change event. If editor is not locked and data action is
     * insert or remove text, process auto complete.
     *
     * @method _onEditorChange
     * @param {CustomEvent} event The fired event
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

        if (!instance._lockEditor && (dataAction === 'insertText' || dataAction === 'removeText')) {
            dataRange = data.range;

            column = dataRange.start.column;
            endRow = dataRange.end.row;
            startRow = dataRange.start.row;

            if (dataAction === 'insertText' && startRow === endRow) {
                instance._processAutoComplete(startRow, column + 1);
            }

            instance.fire(
                dataAction, {
                    column: column,
                    dataRange: dataRange,
                    endRow: endRow,
                    startRow: startRow
                }
            );
        }
    },

    /**
     * Fires cursor change event providing the current position as event
     * payload.
     *
     * @method _onEditorChangeCursor
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _onEditorChangeCursor: function() {
        var instance = this;

        instance.fire('cursorChange', instance._getEditor().getCursorPosition());
    },

    /**
     * Fires an `resultsError` event containing the error.
     *
     * @method _onResultsError
     * @param error
     * @protected
     */
    _onResultsError: function(error) {
        var instance = this;

        instance.fire('resultsError', error);
    },

    /**
     * Updates `results` attribute with the provided results.
     *
     * @method _onResultsSuccess
     * @param {Array} results
     * @protected
     */
    _onResultsSuccess: function(results) {
        var instance = this;

        instance.set('results', results);
    },

    /**
     * Overwrites the following editor commands:
     * onTextInput,
     * golinedown
     * golineup
     * gotoend
     * gotolineend
     * gotolinestart
     * gotopagedown
     * gotopageup
     * gotostart
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
            Do.before(instance._handleEnter, editor, 'onTextInput', instance),
            Do.before(instance._handleKey, commands.golinedown, 'exec', instance, 40),
            Do.before(instance._handleKey, commands.golineup, 'exec', instance, 38),
            Do.before(instance._handleKey, commands.gotoend, 'exec', instance, 35),
            Do.before(instance._handleKey, commands.gotolineend, 'exec', instance, 35),
            Do.before(instance._handleKey, commands.gotolinestart, 'exec', instance, 36),
            Do.before(instance._handleKey, commands.gotopagedown, 'exec', instance, 34),
            Do.before(instance._handleKey, commands.gotopageup, 'exec', instance, 33),
            Do.before(instance._handleKey, commands.gotostart, 'exec', instance, 36)
        );
    },

    /**
     * Checks for phrase match.
     *
     * @method _phraseMatch
     * @param {String} content The content to be checked for phrase match
     * @param {Array} results The results to be filtered
     * @param {Boolean} caseSensitive Should the check be case sensitive or not
     * @protected
     * @return {Array} The filtered results
     */
    _phraseMatch: function(content, results, caseSensitive) {
        if (!content) {
            return results;
        }

        return AArray.filter(
            results,
            function(item) {
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
     * Invokes the loaded content processor and checks for match. If found,
     * provides the match together with information about current row and column
     * and invokes processor's `getResults` function in order to retrieve
     * results. At the end, fires and `match` event with the following
     * properties: column - the current column coords - the page coordinates of
     * the match line - the current line match - the current match row - the
     * current row
     *
     * @method _processAutoComplete
     * @param {Number} row The row on which match happened
     * @param {Number} column The column on which match happened
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

        processor = instance.get('processor');

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
            'match', {
                column: column,
                coords: coords,
                line: line,
                match: match,
                row: row
            }
        );
    },

    /**
     * Detaches the previously attached editor commands.
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
     * Sorts the results in ascending order, taking in consideration the length
     * of the content.
     *
     * @method _sortAscLength
     * @param {String} content The text content
     * @param {Array} results The results to be filtered
     * @param {Boolean} caseSensitive Should we filter these results
     *     alphabetically
     * @protected
     * @return {Array} The sorted results
     */
    _sortAscLength: function(content, results, caseSensitive) {
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
     * Validates the value of `fillMode` attribute.
     *
     * @method _validateFillMode
     * @param value
     * @protected
     * @return {Boolean} True if mode is 'overwrite' - value '0' or 'insert' -
     *     value '1'
     */
    _validateFillMode: function(value) {
        return (value === Base.FILL_MODE_OVERWRITE || value === Base.FILL_MODE_INSERT);
    }
};

/**
 * Exposes a constant for insert fill mode. See `fillMode` for more information.
 *
 * @property FILL_MODE_INSERT
 * @static
 */
Base.FILL_MODE_INSERT = FILL_MODE_INSERT;

/**
 * Exposes a constant for overwrite fill mode. See `fillMode` for more
 * information.
 *
 * @property FILL_MODE_OVERWRITE
 * @static
 */
Base.FILL_MODE_OVERWRITE = FILL_MODE_OVERWRITE;

/**
 * Static property which provides a string to identify the class.
 *
 * @property NAME
 * @type String
 * @static
 */
Base.NAME = 'ace-autocomplete-base';

/**
 * Static property which provides a string to identify the namespace.
 *
 * @property NS
 * @type String
 * @static
 */
Base.NS = 'ace-autocomplete-base';

/**
 * Static property used to define the default attribute
 * configuration for AutoCompleteBase.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
Base.ATTRS = {

    /**
     * The mode in which the AutoComplete should operate. Can be one of these:
     * INSERT - value '0' or OVERWRITE - value '1'. In case of INSERT mode, when
     * Editor adds a suggestion, it will be added next to the matched
     * expression. In case of OVERWRITE mode, the suggestion will overwrite the
     * matched expression.
     *
     * @attribute fillMode
     * @default 1 - OVERWRITE mode
     * @type Number
     */
    fillMode: {
        validator: '_validateFillMode',
        value: Base.FILL_MODE_OVERWRITE
    },

    /**
     * Provides an array of filter functions which will filter the results. By
     * default there is one function which provides phrase match filtering.
     *
     * @attribute filters
     * @default Array with one function which provides phrase match filtering
     * @type Array
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
     * The default processor which will be used to process matches.
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
     * The keyboard combination which should be used to show the list with found
     * results.
     *
     * @attribute showListKey
     * @default 'Alt-Space' for Mac, 'Ctrl-Space' for PC
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
     * Provides an array of sorter functions which will sort the results. By
     * default there is one function which sorts the results in ascending order.
     *
     * @attribute sorters
     * @default Array with one function which sorts results in ascending order
     * @type Array
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
