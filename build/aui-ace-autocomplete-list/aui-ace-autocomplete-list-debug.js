YUI.add('aui-ace-autocomplete-list', function (A, NAME) {

/**
 * The ACE Editor AutoCompleteList Overlay
 *
 * @module aui-ace-editor
 * @submodule aui-ace-autocomplete-list
 */

var Lang = A.Lang,
    AArray = A.Array,
    ANode = A.Node,
    Do = A.Do,

    getCN = A.getClassName,

    CLASS_ENTRY = getCN('ace-autocomplete', 'entry'),
    CLASS_ENTRY_CONTAINER = getCN('ace-autocomplete', 'entry', 'container'),
    CLASS_ENTRY_CONTAINER_HIGHLIGHTED = getCN('ace-autocomplete', 'entry', 'container', 'highlighted'),
    CLASS_ENTRY_EMPTY = getCN('ace-autocomplete', 'entry', 'empty'),
    CLASS_ENTRY_LOADING = getCN('ace-autocomplete', 'entry', 'loading'),
    CLASS_RESULTS_LIST = getCN('ace-autocomplete', 'results'),

    SELECTOR_ENTRY_CONTAINER = '.' + CLASS_ENTRY_CONTAINER,
    SELECTOR_ENTRY_CONTAINER_SELECTED = SELECTOR_ENTRY_CONTAINER + '.' + 'selected',
    SELECTOR_SELECTED_ENTRY = SELECTOR_ENTRY_CONTAINER_SELECTED + ' ' + '.' + CLASS_ENTRY,

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
     * @class A.AceEditor.AutoCompleteList
     * @extends Overlay
     * @uses A.AceEditor.AutoCompleteBase, A.WidgetAutohide
     * @param {Object} config Object literal specifying widget configuration
     *     properties.
     * @constructor
     */
    AutoCompleteList = A.Base.create('ace-autocomplete-list', A.Overlay, [
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

        /**
         * Render the AutoCompleteList component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this,
                autoCompleteResultsList;

            autoCompleteResultsList = instance.get('listNode');

            if (!autoCompleteResultsList) {
                autoCompleteResultsList = instance._createListNode();
            }

            autoCompleteResultsList.delegate(
                'click', instance._handleResultListClick, SELECTOR_ENTRY_CONTAINER, instance);

            autoCompleteResultsList.delegate(
                'mouseenter', instance._onMouseEnter, SELECTOR_ENTRY_CONTAINER, instance);

            autoCompleteResultsList.delegate('mouseleave', instance._onMouseLeave, SELECTOR_ENTRY_CONTAINER);

            instance._autoCompleteResultsList = autoCompleteResultsList;
        },

        /**
         *  Creates the main wrapper for the list of suggestions.
         *
         * @method _createListNode
         * @protected
         * @return {Node} The created node
         */
        _createListNode: function() {
            var instance = this,
                listNode;

            listNode = A.Node.create(instance.TPL_LIST);

            instance.get('contentBox').append(listNode);

            return listNode;
        },

        /**
         * Returns the number of entries which could be fit to the current list
         * viewport (page).
         *
         * @method _getEntriesPerPage
         * @protected
         * @return {Number} The number of calculated entries per page
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

                entryHeight = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER).get('offsetHeight');

                containerHeight = autoCompleteResultsList.get('offsetHeight');

                entriesPerPage = Math.floor(containerHeight / entryHeight);

                instance._entriesPerPage = entriesPerPage;
            }

            return entriesPerPage;
        },

        /**
         * Returns the currently selected entry.
         *
         * @method _getSelectedEntry
         * @protected
         * @return {String} The text of the currently selected entry
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
         * Handles the arrows and executes different actions depending on the
         * pressed arrow. For example, pressing key down will scroll the list
         * bottom.
         *
         * @method _handleArrows
         * @param {Number} keyCode The code of the currently pressed arrow
         * @protected
         * @return {Do.Halt} Instance of Do.Halt in order to stop further
         *     function execution
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
                action = 'previous';
            }
            else if (keyCode === KEY_DONW) {
                action = 'next';
            }

            if (action) {
                autoCompleteResultsList = instance._autoCompleteResultsList;

                selectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER_SELECTED);

                if (selectedEntry) {
                    entry = selectedEntry[action](SELECTOR_ENTRY_CONTAINER);

                    if (entry) {
                        selectedEntry.removeClass('selected');

                        entry.addClass('selected');

                        resultsListNodeRegion = autoCompleteResultsList.get('region');

                        entryRegion = entry.get('region');

                        if (action === 'previous') {
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
                            else if (entryRegion.top + entryRegion.height < resultsListNodeRegion.top) {
                                entry.scrollIntoView(true);
                            }
                        }
                    }
                }

                return new Do.Halt(null);
            }
        },

        /**
         * Handles key pressing and executes different actions depending on key
         * code.
         *
         * @method _handleKey
         * @param {CustomEvent} event The fired event
         * @param {Object} obj An internal object of ACE Editor
         * @param {Number} keyCode The code of currently pressed key
         * @protected
         * @return {Do.Halt} If valid code found, returns an instance of Do.Halt
         *     in order to stop further function execution
         */
        _handleKey: function(event, obj, keyCode) {
            var instance = this,
                result;

            if (instance.get('visible')) {
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
         * Handles scrolling page up or down.
         *
         * @method _handlePageUpDown
         * @param {Number} keyCode The code of currently pressed key. Could be
         *     one of: KEY_PAGE_DOWN = 34, KEY_PAGE_UP = 33,
         * @protected
         * @return {Do.Halt} Returns an instance of Do.Halt in order to stop
         *     further function execution
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

            selectedEntryIndex = Lang.toInt(selectedEntry.attr('data-index'));

            sudoClass = '';

            scrollTop = false;

            if (keyCode === KEY_PAGE_UP) {
                nextSelectedEntryIndex = selectedEntryIndex - entriesPerPage;

                scrollTop = true;
            }
            else if (keyCode === KEY_PAGE_DOWN) {
                nextSelectedEntryIndex = selectedEntryIndex + entriesPerPage;

                sudoClass = ':last-child';
            }

            nextSelectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER + '[' + 'data-index' + '="' +
                nextSelectedEntryIndex + '"]');

            if (!nextSelectedEntry) {
                nextSelectedEntry = autoCompleteResultsList.one(SELECTOR_ENTRY_CONTAINER + sudoClass);
            }

            if (selectedEntry !== nextSelectedEntry) {
                selectedEntry.removeClass('selected');

                nextSelectedEntry.addClass('selected');

                nextSelectedEntry.scrollIntoView(scrollTop);
            }

            return new Do.Halt(null);
        },

        /**
         * Handles click on results and adds a suggestion to the editor.
         *
         * @method _handleResultListClick
         * @param {CustomEvent} event The fired event
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
                selectedEntry.removeClass('selected');

                entryNode.addClass('selected');
            }

            content = entryNode.text();

            instance._addSuggestion(content);

            instance.fire(
                'entrySelected', {
                    content: content
                }
            );
        },

        /**
         * Handles moving of the page to its first or last position.
         *
         * @method _handleStartEnd
         * @param {Number} keyCode The code of currently pressed key. Could be
         *     one of: KEY_END = 35 KEY_START = 36
         * @protected
         * @return {Do.Halt} Returns an instance of Do.Halt in order to stop
         *     further function execution
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
                selectedEntry.removeClass('selected');

                item.addClass('selected');

                item.scrollIntoView(scrollTop);
            }

            return new Do.Halt(null);
        },

        /**
         * Prevents the execution of `cursorChange` defaultFn if the list is not
         * currently visible.
         *
         * @method _onCursorChange
         * @param {CustomEvent} event The fired event
         * @protected
         */
        _onCursorChange: function(event) {
            var instance = this;

            if (!instance.get('visible')) {
                event.preventDefault();
            }
        },

        /**
         * Hides the list when text is being inserted and start row is different
         * than the end row.
         *
         * @method _onInsertText
         * @param {CustomEvent} event The fired event
         * @protected
         */
        _onInsertText: function(event) {
            var instance = this;

            if (event.startRow !== event.endRow && instance.get('visible')) {
                instance.hide();
            }
        },

        /**
         * Shows and moves the list on the proper position in case of match and
         * available results or hides the list otherwise.
         *
         * @method _onMatch
         * @param {CustomEvent} event The fired event
         * @protected
         */
        _onMatch: function(event) {
            var instance = this,
                coords,
                hasResults,
                visible;

            visible = instance.get('visible');

            hasResults = instance._autoCompleteResultsList.hasChildNodes();

            if (event.match) {
                if (hasResults) {
                    if (!visible) {
                        coords = event.coords;

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

        /**
         * Highlights the current entry in case of mouse enter event.
         *
         * @method _onMouseEnter
         * @param {CustomEvent} event The fired event
         * @protected
         */
        _onMouseEnter: function(event) {
            event.currentTarget.addClass(CLASS_ENTRY_CONTAINER_HIGHLIGHTED);
        },

        /**
         * Removes the highlighting from the current entry in case of mouse
         * leave event.
         *
         * @method _onMouseLeave
         * @param {CustomEvent} event The fired event
         * @protected
         */
        _onMouseLeave: function(event) {
            event.currentTarget.removeClass(CLASS_ENTRY_CONTAINER_HIGHLIGHTED);
        },

        /**
         * On removing text, hides the list, if visible.
         *
         * @method _onRemoveText
         * @param {CustomEvent} event The fired event
         * @protected
         */
        _onRemoveText: function() {
            var instance = this;

            if (instance.get('visible')) {
                instance.hide();
            }
        },

        /**
         * Handles `resultsChange` event. Removes the current list of entries,
         * populates the new ones and selects the first entry.
         *
         * @method _onResultsChange
         * @param {CustomEvent} event The fired event
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
                            entryTemplate, {
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
                firstEntry.addClass('selected');
            }
        },

        /**
         * Displays a loading message in the list.
         *
         * @method _onShowLoadingMessage
         * @param {CustomEvent} event The fired event
         * @protected
         */
        _onShowLoadingMessage: function() {
            var instance = this,
                autoCompleteResultsList;

            autoCompleteResultsList = instance._autoCompleteResultsList;

            autoCompleteResultsList.empty();

            autoCompleteResultsList.appendChild(
                Lang.sub(
                    instance.TPL_LOADING, {
                        label: instance.get('loadingMessage')
                    }
                )
            );

            if (!instance.get('visible')) {
                instance.show();
            }
        },

        /**
         * Overwrites editor commands before show or restores the original
         * behavior when hiding.
         *
         * @method _onVisibleChange
         * @param {CustomEvent} event The fired event
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
         * Sets and empty array as results.
         *
         * @method _setEmptyResults
         * @protected
         */
        _setEmptyResults: function() {
            var instance = this;

            instance.set('results', []);
        },

        TPL_ENTRY: '<li class="' + CLASS_ENTRY_CONTAINER + '" data-index="{index}">' + '<span class="' +
            CLASS_ENTRY + '">{value}</span>' + '</li>',

        TPL_LIST: '<ul class="' + CLASS_RESULTS_LIST + '"/>',

        TPL_LOADING: '<li class="' + CLASS_ENTRY_CONTAINER + '">' + '<span class="glyphicon glyphicon-loading ' +
            CLASS_ENTRY_LOADING + '">{label}</span>' + '</li>',

        TPL_RESULTS_EMPTY: '<li class="' + CLASS_ENTRY_CONTAINER + '">' + '<span class="' + CLASS_ENTRY_EMPTY +
            '">{label}</span>' + '</li>'
    }, {

        /**
         * Static property which provides a string to identify the class.
         *
         * @property NAME
         * @type String
         * @static
         */
        NAME: 'ace-autocomplete-list',

        /**
         * Static property provides a string to identify the namespace.
         *
         * @property NS
         * @type String
         * @static
         */
        NS: 'ace-autocomplete-list',

        /**
         * Static property used to define the default attribute
         * configuration for the AutoCompleteList.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * The Editor in which the current instance is plugged.
             *
             * @attribute host
             * @type Object
             */
            host: {
                validator: Lang.isObject
            },

            /**
             * A Node in which results will be shown.
             *
             * @attribute listNode
             * @default null
             * @type Node
             */
            listNode: {
                value: null
            },

            /**
             * A string, representing the loading message.
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
             * Contains the current set of results in the list.
             *
             * @attribute results
             * @type Array
             */
            results: {
                validator: Lang.isArray
            },

            /**
             * Provides the currently selected entry.
             *
             * @attribute selectedEntry
             */
            selectedEntry: {
                getter: '_getSelectedEntry'
            },

            /**
             * Collection of strings used to label elements of the UI.
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
         * The prefix of all CSS Classes.
         *
         * @property CSS_PREFIX
         * @type String
         * @static
         */
        CSS_PREFIX: 'ace-autocomplete',

        /**
         * Object hash, defining how attribute values are to be parsed from
         * markup contained in the widget's content box.
         *
         * @property HTML_PARSER
         * @static
         */
        HTML_PARSER: {
            listNode: '.' + CLASS_RESULTS_LIST
        }
    });

A.AceEditor.AutoCompleteList = AutoCompleteList;
A.AceEditor.AutoComplete = AutoCompleteList;


}, '3.0.1', {"requires": ["aui-ace-autocomplete-base", "overlay", "widget-autohide"], "skinnable": true});
