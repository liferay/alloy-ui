var Lang = A.Lang,

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	EMPTY_STR = '',
	HEIGHT = 'height',
	WIDTH = 'width',

	NAME = 'ace-editor';

var AceEditor = A.Component.create(
	{
		NAME: NAME,

		EXTENDS: A.Widget,

		ATTRS: {

			height: {
				value: 400
			},

			highlightActiveLine: {
				lazyAdd: false,
				getter: '_getHighlightActiveLine',
				setter: '_setHighlightActiveLine',
				value: true
			},

			mode: {
				lazyAdd: false,
				getter: '_getMode',
				setter: '_setMode',
				value: EMPTY_STR
			},

			readOnly: {
				lazyAdd: false,
				getter: '_getReadOnly',
				setter: '_setReadOnly',
				value: false
			},

			showPrintMargin: {
				lazyAdd: false,
				getter: '_getShowPrintMargin',
				setter: '_setShowPrintMargin',
				value: true
			},

			tabSize: {
				lazyAdd: false,
				getter: '_getTabSize',
				setter: '_setTabSize',
				value: 4
			},

			useSoftTabs: {
				lazyAdd: false,
				getter: '_getUseSoftTabs',
				setter: '_setUseSoftTabs',
				value: true
			},

			useWrapMode: {
				lazyAdd: false,
				getter: '_getUseWrapMode',
				setter: '_setUseWrapMode',
				value: true
			},

			value: {
				lazyAdd: false,
				getter: '_getValue',
				setter: '_setValue',
				value: EMPTY_STR,
			},

			width: {
				value: 800
			}

		},

		UI_ATTRS: [HEIGHT, WIDTH],

		prototype: {

			getEditor: function() {
				var instance = this;

				if (!instance.editor) {
					var boundingBox = instance.get(BOUNDING_BOX);

			        instance.editor = ace.edit(boundingBox.getDOM());
				}

				return instance.editor;
			},

			getSelection: function() {
				var instance = this;

				return instance.getSession().doc.getTextRange(instance.getEditor().getSelectionRange())
			},

			getSession: function() {
				var instance = this;

				return instance.getEditor().getSession();
			},

			gotoLine: function(line) {
				var instance = this;

				instance.getEditor().gotoLine(line);
			},

			insert: function(text) {
				var instance = this;

				instance.getEditor().insert(text);
			},

			_getHighlightActiveLine: function() {
				var instance = this;

				return instance.getEditor().getHighlightActiveLine();
			},

			_getMode: function() {
				var instance = this;

				return instance.getSession().getMode();
			},

			_getReadOnly: function() {
				var instance = this;

				return instance.getEditor().getReadOnly();
			},

			_getShowPrintMargin: function() {
				var instance = this;

				return instance.getEditor().getShowPrintMargin();
			},

			_getTabSize: function() {
				var instance = this;

				return instance.getSession().getTabSize();
			},

			_getUseSoftTabs: function() {
				var instance = this;

				return instance.getSession().getUseSoftTabs();
			},

			_getUseWrapMode: function() {
				var instance = this;

				return instance.getSession().getUseWrapMode();
			},

			_getValue: function() {
				var instance = this;

				return instance.getSession().getValue();
			},

			_setHighlightActiveLine: function(value) {
				var instance = this;

				instance.getEditor().setHighlightActiveLine(value);
			},

			_setMode: function(value) {
				var instance = this;

				if (value) {
					var Mode = require('ace/mode/' + value).Mode;

					if (Mode !== undefined) {
						instance.getSession().setMode(new Mode());
					}
					else {
						throw new Error('The mode \'' + value + '\' is not available.');
					}
				}
			},

			_setReadOnly: function(value) {
				var instance = this;

				instance.getEditor().setReadOnly(value)
			},

			_setShowPrintMargin: function(value) {
				var instance = this;

				instance.getEditor().setShowPrintMargin(value);
			},

			_setTabSize: function(value) {
				var instance = this;

				instance.getSession().setTabSize(value);
			},

			_setUseSoftTabs: function(value) {
				var instance = this;

				instance.getSession().setUseSoftTabs(value);
			},

			_setUseWrapMode: function(value) {
				var instance = this;

				instance.getSession().setUseWrapMode(value);
			},

			_setValue: function(value) {
				var instance = this;

				instance.getSession().setValue(value);
			},

			_uiSetHeight: function() {
				var instance = this;

				A.AceEditor.superclass._uiSetHeight.apply(instance, arguments);

				instance.getEditor().resize();
			},

			_uiSetWidth: function() {
				var instance = this;

				A.AceEditor.superclass._uiSetWidth.apply(instance, arguments);

				instance.getEditor().resize();
			}
		}
	}
);

A.AceEditor = AceEditor;