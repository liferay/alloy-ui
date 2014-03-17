/**
 * The ACE Editor Component
 *
 * @module aui-ace-editor
 */

var ACE_EDITOR_BASE_PATH = A.config.base + 'aui-ace-editor/ace';

ace.config.set('modePath', ACE_EDITOR_BASE_PATH);
ace.config.set('themePath', ACE_EDITOR_BASE_PATH);
ace.config.set('workerPath', ACE_EDITOR_BASE_PATH);
ace.config.set('packaged', true);

/**
 * A base class for ACE Editor.
 *
 * Check the [live demo](http://alloyui.com/examples/ace-editor/).
 *
 * @class A.AceEditor
 * @extends Widget
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/ace-editor/basic-markup.html
 * @include http://alloyui.com/examples/ace-editor/basic.js
 */
var AceEditor = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'ace-editor',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.Widget,

    /**
     * Static property used to define the default attribute
     * configuration for the ACE Editor.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The height of ACE Editor.
         *
         * @attribute height
         * @default 400
         * @type Number
         */
        height: {
            value: 400
        },

        /**
         * Determine if the active line of code
         * will be highlighted or not.
         *
         * @attribute highlightActiveLine
         * @default true
         * @type Boolean
         */
        highlightActiveLine: {
            lazyAdd: false,
            getter: '_getHighlightActiveLine',
            setter: '_setHighlightActiveLine',
            value: true
        },

        /**
         * Correspond to the language being typed.
         *
         * @attribute mode
         * @default ''
         * @type String
         */
        mode: {
            lazyAdd: false,
            getter: '_getMode',
            setter: '_setMode',
            value: ''
        },

        /**
         * Determine if the code will be
         * editable or not.
         *
         * @attribute readOnly
         * @default false
         * @type Boolean
         */
        readOnly: {
            lazyAdd: false,
            getter: '_getReadOnly',
            setter: '_setReadOnly',
            value: false
        },

        /**
         * Determine if print margin will
         * be visible or not.
         *
         * @attribute showPrintMargin
         * @default true
         * @type Boolean
         */
        showPrintMargin: {
            lazyAdd: false,
            getter: '_getShowPrintMargin',
            setter: '_setShowPrintMargin',
            value: true
        },

        /**
         * The indentation size of tab key.
         *
         * @attribute tabSize
         * @default 4
         * @type Number
         */
        tabSize: {
            lazyAdd: false,
            getter: '_getTabSize',
            setter: '_setTabSize',
            value: 4
        },

        /**
         * Determine if the tab key will act as
         * space characters or tab characters.
         *
         * @attribute useSoftTabs
         * @default true
         * @type Boolean
         */
        useSoftTabs: {
            lazyAdd: false,
            getter: '_getUseSoftTabs',
            setter: '_setUseSoftTabs',
            value: true
        },

        /**
         * Determine if the line will break
         * when it reaches the end of the line.
         *
         * @attribute useWrapMode
         * @default true
         * @type Boolean
         */
        useWrapMode: {
            lazyAdd: false,
            getter: '_getUseWrapMode',
            setter: '_setUseWrapMode',
            value: true
        },

        /**
         * Some predefined value on the editor.
         *
         * @attribute value
         * @default ''
         * @type String
         */
        value: {
            lazyAdd: false,
            getter: '_getValue',
            setter: '_setValue',
            value: ''
        },

        /**
         * The width of ACE Editor.
         *
         * @attribute width
         * @default 800
         * @type Number
         */
        width: {
            value: 800
        }

    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['height', 'width'],

    prototype: {

        /**
         * Get editor.
         *
         * @method getEditor
         */
        getEditor: function() {
            var instance = this;

            if (!instance.editor) {
                var boundingBox = instance.get('boundingBox');

                instance.editor = ace.edit(boundingBox.getDOM());
            }

            return instance.editor;
        },

        /**
         * Get a text selection.
         *
         * @method getSelection
         */
        getSelection: function() {
            var instance = this;

            return instance.getSession().doc.getTextRange(instance.getEditor().getSelectionRange());
        },

        /**
         * Get session.
         *
         * @method getSession
         */
        getSession: function() {
            var instance = this;

            return instance.getEditor().getSession();
        },

        /**
         * Go to a specific line of code.
         *
         * @method gotoLine
         * @param line
         */
        gotoLine: function(line) {
            var instance = this;

            instance.getEditor().gotoLine(line);
        },

        /**
         * Insert content into the editor.
         *
         * @method insert
         * @param text
         */
        insert: function(text) {
            var instance = this;

            instance.getEditor().insert(text);
        },

        /**
         * Get the `highlightActiveLine` attribute.
         *
         * @method _getHighlightActiveLine
         * @protected
         */
        _getHighlightActiveLine: function() {
            var instance = this;

            return instance.getEditor().getHighlightActiveLine();
        },

        /**
         * Get the `mode` attribute.
         *
         * @method _getMode
         * @protected
         */
        _getMode: function() {
            var instance = this;

            return instance.getSession().getMode();
        },

        /**
         * Get the `readOnly` attribute.
         *
         * @method _getReadOnly
         * @protected
         */
        _getReadOnly: function() {
            var instance = this;

            return instance.getEditor().getReadOnly();
        },

        /**
         * Get the `showPrintMargin` attribute.
         *
         * @method _getShowPrintMargin
         * @protected
         */
        _getShowPrintMargin: function() {
            var instance = this;

            return instance.getEditor().getShowPrintMargin();
        },

        /**
         * Get the `tabSize` attribute.
         *
         * @method _getTabSize
         * @protected
         */
        _getTabSize: function() {
            var instance = this;

            return instance.getSession().getTabSize();
        },

        /**
         * Get the `useSoftTabs` attribute.
         *
         * @method _getUseSoftTabs
         * @protected
         */
        _getUseSoftTabs: function() {
            var instance = this;

            return instance.getSession().getUseSoftTabs();
        },

        /**
         * Get the `useWrapMode` attribute.
         *
         * @method _getUseWrapMode
         * @protected
         */
        _getUseWrapMode: function() {
            var instance = this;

            return instance.getSession().getUseWrapMode();
        },

        /**
         * Get the `value` attribute.
         *
         * @method _getValue
         * @protected
         */
        _getValue: function() {
            var instance = this;

            return instance.getSession().getValue();
        },

        /**
         * Set the `highlightActiveLine` attribute.
         *
         * @method _setHighlightActiveLine
         * @param value
         * @protected
         */
        _setHighlightActiveLine: function(value) {
            var instance = this;

            instance.getEditor().setHighlightActiveLine(value);
        },

        /**
         * Set the `mode` attribute.
         *
         * @method _setMode
         * @param value
         * @protected
         */
        _setMode: function(value) {
            var instance = this;

            if (value) {
                instance.getSession().setMode('ace/mode/' + value);
            }
        },

        /**
         * Set the `readOnly` attribute.
         *
         * @method _setReadOnly
         * @param value
         * @protected
         */
        _setReadOnly: function(value) {
            var instance = this;

            instance.getEditor().setReadOnly(value);
        },

        /**
         * Set the `showPrintMargin` attribute.
         *
         * @method _setShowPrintMargin
         * @param value
         * @protected
         */
        _setShowPrintMargin: function(value) {
            var instance = this;

            instance.getEditor().setShowPrintMargin(value);
        },

        /**
         * Set the `tabSize` attribute.
         *
         * @method _setTabSize
         * @param value
         * @protected
         */
        _setTabSize: function(value) {
            var instance = this;

            instance.getSession().setTabSize(value);
        },

        /**
         * Set the `useSoftTabs` attribute.
         *
         * @method _setUseSoftTabs
         * @param value
         * @protected
         */
        _setUseSoftTabs: function(value) {
            var instance = this;

            instance.getSession().setUseSoftTabs(value);
        },

        /**
         * Set the `useWrapMode` attribute.
         *
         * @method _setUseWrapMode
         * @param value
         * @protected
         */
        _setUseWrapMode: function(value) {
            var instance = this;

            instance.getSession().setUseWrapMode(value);
        },

        /**
         * Set the `value` attribute.
         *
         * @method _setValue
         * @param value
         * @protected
         */
        _setValue: function(value) {
            var instance = this;

            instance.getSession().setValue(value);
        },

        /**
         * Set the `height` attribute on the UI.
         *
         * @method _uiSetHeight
         * @protected
         */
        _uiSetHeight: function() {
            var instance = this;

            A.AceEditor.superclass._uiSetHeight.apply(instance, arguments);

            instance.getEditor().resize();
        },

        /**
         * Set the `width` attribute on the UI.
         *
         * @method _uiSetWidth
         * @protected
         */
        _uiSetWidth: function() {
            var instance = this;

            A.AceEditor.superclass._uiSetWidth.apply(instance, arguments);

            instance.getEditor().resize();
        }
    }
});

A.AceEditor = AceEditor;
