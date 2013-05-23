/**
 * The ACE Editor Component
 *
 * @module aui-ace-editor
 * @submodule aui-ace-autocomplete-list
 */

var Lang = A.Lang,
    AArray = A.Array,
    ANode = A.Node,
    Do = A.Do,

    getCN = A.getClassName,

    ATTR_DATA_INDEX = 'data-index',

    _DOT = '.',
    _EMPTY_STRING = '',
    _NAME = 'ace-autocomplete-list',
    _SPACE = ' ',

    ADD_SUGGESTION = 'addSuggestion',
    CLICK = 'click',
    CONTAINER = 'container',
    CONTENT_BOX = 'contentBox',
    CURSOR_CHANGE = 'cursorChange',
    CURSOR_OUT = 'cursorOut',
    EMPTY = 'empty',
    ENTRY = 'entry',
    ENTRY_SELECTED = 'entrySelected',
    HIGHLIGHTED = 'highlighted',
    INSERT_TEXT = 'insertText',
    LIST = 'list',
    LIST_NODE = 'listNode',
    LOADING = 'loading',
    LOADING_MESSAGE = 'loadingMessage',
    MATCH = 'match',
    MOUSEENTER = 'mouseenter',
    MOUSELEAVE = 'mouseleave',
    NEXT = 'next',
    OFFSET_HEIGHT = 'offsetHeight',
    PREVIOUS = 'previous',
    REGION = 'region',
    REMOVE_TEXT = 'removeText',
    RESULTS = 'results',
    RESULTS = 'results',
    RESULTS_CHANGE = 'resultsChange',
    RESULTS_ERROR = 'resultsError',
    SELECTED = 'selected',
    SHOW_LOADING_MESSAGE = 'showLoadingMessage',
    VISIBLE = 'visible',
    VISIBLE_CHANGE = 'visibleChange',
    XY = 'xy',

    CSS_PREFIX = 'ace-autocomplete',

    CLASS_ENTRY = getCN(CSS_PREFIX, ENTRY),
    CLASS_ENTRY_CONTAINER = getCN(CSS_PREFIX, ENTRY, CONTAINER),
    CLASS_ENTRY_CONTAINER_HIGHLIGHTED = getCN(CSS_PREFIX, ENTRY, CONTAINER, HIGHLIGHTED),
    CLASS_ENTRY_EMPTY = getCN(CSS_PREFIX, ENTRY, EMPTY),
    CLASS_ENTRY_LOADING = getCN(CSS_PREFIX, ENTRY, LOADING),
    CLASS_LOADING = getCN(CSS_PREFIX, ENTRY, LOADING),
    CLASS_RESULTS_LIST = getCN(CSS_PREFIX, RESULTS),

    SELECTOR_ENTRY_CONTAINER = _DOT + CLASS_ENTRY_CONTAINER,
    SELECTOR_ENTRY_CONTAINER_SELECTED = SELECTOR_ENTRY_CONTAINER + _DOT + SELECTED,
    SELECTOR_SELECTED_ENTRY = SELECTOR_ENTRY_CONTAINER_SELECTED + _SPACE + _DOT + CLASS_ENTRY,

    TPL_FRAGMENT = '<div></div>',

    KEY_DONW = 40,
    KEY_END = 35,
    KEY_PAGE_DOWN = 34,
    KEY_PAGE_UP = 33,
    KEY_START = 36,
    KEY_UP = 38,

    PADDING_HORIZ = 5,
    PADDING_VERT = 20,

/**
 * A base class for AutoCompleteList.
 *
 * @class A.AutoCompleteList
 * @extends A.Overlay
 * @uses A.AceEditor.AutoCompleteBase, A.WidgetAutohide
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
AutoCompleteList = A.Base.create(_NAME, A.Overlay, [
    A.AceEditor.AutoCompleteBase,
    A.WidgetAutohide
], {

    /**
     * Bind the events on the AutoCompleteList UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var instance = this;

        instance.on(ADD_SUGGESTION, instance.hide, instance);
        instance.on(CURSOR_CHANGE, instance._onCursorChange, instance);
        instance.on(CURSOR_OUT, instance.hide, instance);
        instance.on(INSERT_TEXT, instance._onInsertText, instance);
        instance.on(MATCH, instance._onMatch, instance);
        instance.on(REMOVE_TEXT, instance._onRemoveText, instance);
        instance.on(RESULTS_CHANGE, instance._onResultsChange, instance);
        instance.on(RESULTS_ERROR, instance._setEmptyResults, instance);
        instance.on(SHOW_LOADING_MESSAGE, instance._onShowLoadingMessage, instance);
        instance.on(VISIBLE_CHANGE, instance._onVisibleChange, instance);
    },

    /**
     * Render the AutoCompleteList component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this,
            autoCompleteResultsList;

        autoCompleteResultsList = instance.get(LIST_NODE);

        if (!autoCompleteResultsList) {
            autoCompleteResultsList = instance._createListNode();
        }

        autoCompleteResultsList.delegate(CLICK, instance._handleResultListClick, SELECTOR_ENTRY_CONTAINER, instance);
        autoCompleteResultsList.delegate(MOUSEENTER, instance._onMouseEnter, SELECTOR_ENTRY_CONTAINER, instance);
        autoCompleteResultsList.delegate(MOUSELEAVE, instance._onMouseLeave, SELECTOR_ENTRY_CONTAINER);

        instance._autoCompleteResultsList = autoCompleteResultsList;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _createListNode
     * @protected
     */
    _createListNode: function () {
        var instance = this,
            listNode;

        listNode = A.Node.create(instance.TPL_LIST);

        instance.get(CONTENT_BOX).append(listNode);

        return listNode;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getEntriesPerPage
     * @protected
     */
    _getEntriesPerPage: function() {
        var instance = this,
            autoCompleteResultsList,
            containerHeight,
            entriesPerPage,
            entryHeight;


        entriesPerPage = instance._entriesPerPage;

        if (!entriesPerPage) {
            autoCompleteResultsList = instance._autoCompleteResultsList;

            entryHeight = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER).get(OFFSET_HEIGHT);

            containerHeight = autoCompleteResultsList.get(OFFSET_HEIGHT);

            entriesPerPage = Math.floor(containerHeight / entryHeight);

            instance._entriesPerPage = entriesPerPage;
        }

        return entriesPerPage;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getSelectedEntry
     * @protected
     */
    _getSelectedEntry: function() {
        var instance = this,
            entryText,
            selectedEntryNode;

        selectedEntryNode = instance._autoCompleteResultsList.one(SELECTOR_SELECTED_ENTRY);

        if (selectedEntryNode) {
            entryText = selectedEntryNode.text();
        }

        return entryText;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _handleArrows
     * @param keyCode
     * @protected
     */
    _handleArrows: function(keyCode) {
        var instance = this,
            action,
            autoCompleteResultsList,
            entry,
            entryRegion,
            resultsListNodeRegion,
            selectedEntry;

        if (keyCode === KEY_UP) {
            action = PREVIOUS;
        }
        else if (keyCode === KEY_DONW) {
            action = NEXT;
        }

        if (action) {
            autoCompleteResultsList = instance._autoCompleteResultsList;

            selectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

            if (selectedEntry) {
                entry = selectedEntry[action](SELECTOR_ENTRY_CONTAINER);

                if (entry) {
                    selectedEntry.removeClass(SELECTED);

                    entry.addClass(SELECTED);

                    resultsListNodeRegion = autoCompleteResultsList.get(REGION);

                    entryRegion = entry.get(REGION);

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

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _handleKey
     * @param event
     * @param obj
     * @param keyCode
     * @protected
     */
    _handleKey: function(event, obj, keyCode) {
        var instance = this,
            result;

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

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _handlePageUpDown
     * @param keyCode
     * @protected
     */
    _handlePageUpDown: function(keyCode) {
        var instance = this,
            autoCompleteResultsList,
            entriesPerPage,
            nextSelectedEntry,
            nextSelectedEntryIndex,
            scrollTop,
            selectedEntry,
            selectedEntryIndex,
            sudoClass;

        autoCompleteResultsList = instance._autoCompleteResultsList;

        entriesPerPage = instance._getEntriesPerPage();

        selectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

        selectedEntryIndex = Lang.toInt(selectedEntry.attr(ATTR_DATA_INDEX));

        sudoClass = _EMPTY_STRING;

        scrollTop = false;

        if (keyCode === KEY_PAGE_UP) {
            nextSelectedEntryIndex = selectedEntryIndex - entriesPerPage;

            scrollTop = true;
        }
        else if (keyCode === KEY_PAGE_DOWN) {
            nextSelectedEntryIndex = selectedEntryIndex + entriesPerPage;

            sudoClass = ':last-child';
        }

        nextSelectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER + '[' + ATTR_DATA_INDEX + '="' + nextSelectedEntryIndex + '"]');

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

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _handleResultListClick
     * @param event
     * @protected
     */
    _handleResultListClick: function(event) {
        var instance = this,
            content,
            entryNode,
            selectedEntry;

        entryNode = event.currentTarget;

        selectedEntry = instance._autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

        if (entryNode !== selectedEntry) {
            selectedEntry.removeClass(SELECTED);

            entryNode.addClass(SELECTED);
        }

        content = entryNode.text();

        instance._addSuggestion(content);

        instance.fire(
            ENTRY_SELECTED,
            {
                content: content
            }
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _handleStartEnd
     * @param keyCode
     * @protected
     */
    _handleStartEnd: function(keyCode) {
        var instance = this,
            autoCompleteResultsList,
            item,
            scrollTop,
            selectedEntry;

        scrollTop = false;

        autoCompleteResultsList = instance._autoCompleteResultsList;

        if (keyCode === KEY_END) {
            item = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER + ':last-child');
        }
        else if (keyCode === KEY_START) {
            item = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER);

            scrollTop = true;
        }

        selectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

        if (item !== selectedEntry) {
            selectedEntry.removeClass(SELECTED);

            item.addClass(SELECTED);

            item.scrollIntoView(scrollTop);
        }

        return new Do.Halt(null);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onCursorChange
     * @param event
     * @protected
     */
    _onCursorChange: function(event) {
        var instance = this;

        if (!instance.get(VISIBLE)) {
            event.preventDefault();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onInsertText
     * @param event
     * @protected
     */
    _onInsertText: function(event) {
        var instance = this;

        if (event.startRow !== event.endRow && instance.get(VISIBLE)) {
            instance.hide();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onMatch
     * @param event
     * @protected
     */
    _onMatch: function(event) {
        var instance = this,
            coords,
            hasResults,
            visible;

        visible = instance.get(VISIBLE);

        hasResults = instance._autoCompleteResultsList.hasChildNodes();

        if (event.match) {
            if (hasResults) {
                if (!visible) {
                    coords = event.coords;

                    instance.set(XY, [coords.pageX + PADDING_HORIZ, coords.pageY + PADDING_VERT]);

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

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onMouseEnter
     * @param event
     * @protected
     */
    _onMouseEnter: function(event) {
        event.currentTarget.addClass(CLASS_ENTRY_CONTAINER_HIGHLIGHTED);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onMouseLeave
     * @param event
     * @protected
     */
    _onMouseLeave: function(event) {
        event.currentTarget.removeClass(CLASS_ENTRY_CONTAINER_HIGHLIGHTED);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onRemoveText
     * @param event
     * @protected
     */
    _onRemoveText: function(event) {
        var instance = this;

        if (instance.get(VISIBLE)) {
            instance.hide();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onResultsChange
     * @param event
     * @protected
     */
    _onResultsChange: function(event) {
        var instance = this,
            autoCompleteResultsList,
            entryTemplate,
            firstEntry,
            results,
            tmpNode;

        autoCompleteResultsList = instance._autoCompleteResultsList;

        autoCompleteResultsList.empty();

        results = event.newVal;

        entryTemplate = instance.TPL_ENTRY;

        tmpNode = ANode.create(TPL_FRAGMENT);

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

        firstEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER);

        if (firstEntry) {
            firstEntry.addClass(SELECTED);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onShowLoadingMessage
     * @param event
     * @protected
     */
    _onShowLoadingMessage: function(event) {
        var instance = this,
            autoCompleteResultsList;

        autoCompleteResultsList = instance._autoCompleteResultsList;

        autoCompleteResultsList.empty();

        autoCompleteResultsList.appendChild(
            Lang.sub(
                instance.TPL_LOADING,
                {
                    label: instance.get(LOADING_MESSAGE)
                }
            )
        );

        if (!instance.get(VISIBLE)) {
            instance.show();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onVisibleChange
     * @param event
     * @protected
     */
    _onVisibleChange: function(event) {
        var instance = this;

        if (event.newVal) {
            instance._overwriteCommands();
        }
        else {
            instance._removeAutoCompleteCommands();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _setEmptyResults
     * @protected
     */
    _setEmptyResults: function() {
        var instance = this;

        instance.set(RESULTS, []);
    },

    TPL_ENTRY:
        '<li class="' + CLASS_ENTRY_CONTAINER + '" data-index="{index}">' +
            '<span class="' + CLASS_ENTRY + '">{value}</span>' +
        '</li>',

    TPL_LIST: '<ul class="' + CLASS_RESULTS_LIST + '"/>',

    TPL_LOADING: '<li class="' + CLASS_ENTRY_CONTAINER + '">' +
        '<span class="icon-loading ' + CLASS_ENTRY_LOADING + '">{label}</span>' +
    '</li>',

    TPL_RESULTS_EMPTY:
        '<li class="' + CLASS_ENTRY_CONTAINER + '">' +
            '<span class="' + CLASS_ENTRY_EMPTY + '">{label}</span>' +
        '</li>'
}, {

    /**
     * Static property provides a string to identify the class.
     *
     * @property AutoCompleteList.NAME
     * @type String
     * @static
     */
    NAME: _NAME,

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property AutoCompleteList.NS
     * @type String
     * @static
     */
    NS: _NAME,

    /**
     * Static property used to define the default attribute
     * configuration for the AutoCompleteList.
     *
     * @property AutoCompleteList.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute host
         * @type Object
         */
        host: {
            validator: Lang.isObject
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute listNode
         * @default null
         */
        listNode: {
            value: null
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute loadingMessage
         * @default 'Loading'
         * @type String
         */
        loadingMessage: {
            validator: Lang.isString,
            value: 'Loading'
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute results
         * @type Array
         */
        results: {
            validator: Lang.isArray
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute selectedEntry
         */
        selectedEntry: {
            getter: '_getSelectedEntry'
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            validator: Lang.isObject,
            value: {
                emptyMessage: 'No suggestions'
            }
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property AutoCompleteList.CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: CSS_PREFIX,

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property AutoCompleteList.HTML_PARSER
     * @static
     */
    HTML_PARSER: {
        listNode: _DOT + CLASS_RESULTS_LIST
    }
});

A.AceEditor.AutoCompleteList = AutoCompleteList;
A.AceEditor.AutoComplete = AutoCompleteList;
