/**
 * The Datatable Component
 *
 * @module aui-datatable
 * @submodule aui-datatable-edit
 */

var Lang = A.Lang,
	AArray = A.Array,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isValue = Lang.isValue,
	LString = Lang.String,
	DataType = A.DataType,

	isBaseEditor = function(val) {
		return (val instanceof A.BaseCellEditor);
	},

	WidgetStdMod = A.WidgetStdMod,
	AgetClassName = A.getClassName,

	ACTIVE_CELL = 'activeCell',
	ADD = 'add',
	ADD_OPTION = 'addOption',
	BASE_CELL_EDITOR = 'baseCellEditor',
	BOUNDING_BOX = 'boundingBox',
	CALENDAR = 'calendar',
	CANCEL = 'cancel',
	CELL = 'cell',
	CELLEDITOR = 'celleditor',
	CHECKBOX_CELL_EDITOR = 'checkboxCellEditor',
	CHECKED = 'checked',
	CLICK = 'click',
	CONTENT_BOX = 'contentBox',
	DATA = 'data',
	DATATABLE = 'datatable',
	DATE_CELL_EDITOR = 'dateCellEditor',
	DD = 'dd',
	DELETE = 'delete',
	DISK = 'disk',
	DOTTED = 'dotted',
	DROP_DOWN_CELL_EDITOR = 'dropDownCellEditor',
	EDIT = 'edit',
	EDIT_EVENT = 'editEvent',
	EDIT_OPTIONS = 'editOptions',
	EDITABLE = 'editable',
	EDITOR = 'editor',
	ELEMENT = 'element',
	ELEMENT_NAME = 'elementName',
	GRIP = 'grip',
	HANDLE = 'handle',
	HIDE = 'hide',
	HIDE_ON_SAVE = 'hideOnSave',
	ICON = 'icon',
	INIT_EDIT = 'initEdit',
	INIT_TOOLBAR = 'initToolbar',
	INIT_VALIDATOR = 'initValidator',
	INPUT = 'input',
	INPUT_FORMATTER = 'inputFormatter',
	KEY = 'key',
	LABEL = 'label',
	LINK = 'link',
	MOUSEDOWN = 'mousedown',
	MULTIPLE = 'multiple',
	NAME = 'name',
	ONLY = 'only',
	OPTION = 'option',
	OPTIONS = 'options',
	OPTIONS_CELL_EDITOR = 'optionsCellEditor',
	OUTPUT_FORMATTER = 'outputFormatter',
	PENCIL = 'pencil',
	RADIO_CELL_EDITOR = 'radioCellEditor',
	READ = 'read',
	READ_ONLY = 'readOnly',
	REMOVE = 'remove',
	RENDER = 'render',
	RENDERED = 'rendered',
	RETURN = 'return',
	ROW = 'row',
	SAVE = 'save',
	SELECTED = 'selected',
	SELECTED_ATTR_NAME = 'selectedAttrName',
	SHOW_TOOLBAR = 'showToolbar',
	SUBMIT = 'submit',
	TEXT_AREA_CELL_EDITOR = 'textAreaCellEditor',
	TEXT_CELL_EDITOR = 'textCellEditor',
	TOOLBAR = 'toolbar',
	UNESCAPE_VALUE = 'unescapeValue',
	VALIDATOR = 'validator',
	VALUE = 'value',
	VERTICAL = 'vertical',
	VISIBLE = 'visible',
	WRAPPER = 'wrapper',
	Z_INDEX = 'zIndex',

	_COMMA = ',',
	_DOT = '.',
	_EMPTY_STR = '',
	_NL = '\n',
	_SPACE = ' ',

	REGEX_BR = /<br\s*\/?>/gi,
	REGEX_NL = /[\r\n]/g,

	CSS_CELLEDITOR_EDIT = AgetClassName(CELLEDITOR, EDIT),
	CSS_CELLEDITOR_EDIT_ADD_OPTION = AgetClassName(CELLEDITOR, EDIT, ADD, OPTION),
	CSS_CELLEDITOR_EDIT_DD_HANDLE = AgetClassName(CELLEDITOR, EDIT, DD, HANDLE),
	CSS_CELLEDITOR_EDIT_DELETE_OPTION = AgetClassName(CELLEDITOR, EDIT, DELETE, OPTION),
	CSS_CELLEDITOR_EDIT_HIDE_OPTION = AgetClassName(CELLEDITOR, EDIT, HIDE, OPTION),
	CSS_CELLEDITOR_EDIT_INPUT_NAME = AgetClassName(CELLEDITOR, EDIT, INPUT, NAME),
	CSS_CELLEDITOR_EDIT_INPUT_VALUE = AgetClassName(CELLEDITOR, EDIT, INPUT, VALUE),
	CSS_CELLEDITOR_EDIT_LABEL = AgetClassName(CELLEDITOR, EDIT, LABEL),
	CSS_CELLEDITOR_EDIT_LINK = AgetClassName(CELLEDITOR, EDIT, LINK),
	CSS_CELLEDITOR_EDIT_OPTION_ROW = AgetClassName(CELLEDITOR, EDIT, OPTION, ROW),
	CSS_CELLEDITOR_ELEMENT = AgetClassName(CELLEDITOR, ELEMENT),
	CSS_CELLEDITOR_OPTION = AgetClassName(CELLEDITOR, OPTION),
	CSS_DATATABLE_EDITABLE = AgetClassName(DATATABLE, EDITABLE),
	CSS_ICON = AgetClassName(ICON),
	CSS_ICON_GRIP_DOTTED_VERTICAL = AgetClassName(ICON, GRIP, DOTTED, VERTICAL),

	TPL_BR = '<br/>';

/**
 * An extension for A.DataTable to support Cell Editing.
 *
 * @class A.CellEditorSupport
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var CellEditorSupport = function() {};

/**
 * Static property provides a string to identify the class.
 *
 * @property CellEditorSupport.NAME
 * @type String
 * @static
 */
CellEditorSupport.NAME = 'dataTableCellEditorSupport';

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property CellEditorSupport.EDITOR_ZINDEX
 * @default 9999
 * @type Number
 * @static
 */
CellEditorSupport.EDITOR_ZINDEX = 9999;

/**
 * Static property used to define the default attribute
 * configuration for the CellEditorSupport.
 *
 * @property CellEditorSupport.ATTRS
 * @type Object
 * @static
 */
CellEditorSupport.ATTRS = {

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @attribute editEvent
	 * @default 'click'
	 * @type String
	 */
	editEvent: {
		setter: '_setEditEvent',
		validator: isString,
		value: CLICK
	}
};

A.mix(CellEditorSupport.prototype, {

	/**
	 * Construction logic executed during CellEditorSupport instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function() {
		var instance = this,
			editEvent = instance.get(EDIT_EVENT);

		instance.CLASS_NAMES_CELL_EDITOR_SUPPORT = {
			cell: instance.getClassName(CELL),
			readOnly: instance.getClassName(READ, ONLY)
		};

		instance.after(RENDER, instance._afterCellEditorSupportRender);

		instance.delegate(editEvent, instance._onEditCell, _DOT+instance.CLASS_NAMES_CELL_EDITOR_SUPPORT.cell, instance);
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method getEditor
	 * @param record, column
	 */
	getEditor: function(record, column) {
		var instance = this,
			columnEditor = column.editor,
			recordEditor = record.get(EDITOR);

		if (columnEditor === false || recordEditor === false) {
			return null;
		}

		return recordEditor || columnEditor;
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _afterCellEditorSupportRender
	 * @protected
	 */
	_afterCellEditorSupportRender: function() {
		var instance = this;

		instance._syncModelsReadOnlyUI();

		instance.body.after(A.bind(instance._syncModelsReadOnlyUI, instance), instance.body, RENDER);
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _onEditCell
	 * @param event
	 * @protected
	 */
	_onEditCell: function(event) {
		var instance = this,
			activeCell = instance.get(ACTIVE_CELL),
			alignNode = event.alignNode || activeCell,
			column = instance.getColumn(alignNode),
			record = instance.getRecord(alignNode),
			editor = instance.getEditor(record, column);

		if (isBaseEditor(editor) && !record.get(READ_ONLY)) {
			if (!editor.get(RENDERED)) {
				editor.on({
					visibleChange: A.bind(instance._onEditorVisibleChange, instance),
					save: A.bind(instance._onEditorSave, instance)
				});

				editor.set(Z_INDEX, CellEditorSupport.EDITOR_ZINDEX);
				editor.render();
			}

			editor.set(VALUE, record.get(column.key));

			editor.show().move(alignNode.getXY());
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _onEditorSave
	 * @param event
	 * @protected
	 */
	_onEditorSave: function(event) {
		var instance = this,
			editor = event.currentTarget,
			column = instance.getActiveColumn(),
			record = instance.getActiveRecord();

		editor.set(VALUE, event.newVal);

		// TODO: Memorize the activeCell coordinates to set the focus on it instead
		instance.set(ACTIVE_CELL, instance.get(ACTIVE_CELL));

		record.set(column.key, event.newVal);

		// TODO: Sync highlight frames UI instead?
		if (instance.highlight) {
			instance.highlight.clear();
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _onEditorVisibleChange
	 * @param event
	 * @protected
	 */
	_onEditorVisibleChange: function(event) {
		var instance = this,
			editor = event.currentTarget;

		if (event.newVal) {
			editor._syncFocus();
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _syncModelReadOnlyUI
	 * @param model
	 * @protected
	 */
	_syncModelReadOnlyUI: function(model) {
		var instance = this,
			row = instance.getRow(model);

		row.toggleClass(instance.CLASS_NAMES_CELL_EDITOR_SUPPORT[READ_ONLY], model.get(READ_ONLY) === true);
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _syncModelsReadOnlyUI
	 * @protected
	 */
	_syncModelsReadOnlyUI: function() {
		var instance = this;

		instance.get(DATA).each(function(model) {
			instance._syncModelReadOnlyUI(model);
		});
	},

	// Deprecated methods
	// Use getEditor

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method getCellEditor
	 */
	getCellEditor: function() {
		return this.getEditor.apply(this, arguments);
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method getRecordColumnValue
	 * @param record, column
	 */
	getRecordColumnValue: function(record, column) {
		return record.get(column.key);
	}
});

A.DataTable.CellEditorSupport = CellEditorSupport;

A.Base.mix(A.DataTable, [ CellEditorSupport ]);

/**
 * Abstract class BaseCellEditor.
 *
 * @class A.BaseCellEditor
 * @extends A.Overlay
 * @param config {Object} Object literal specifying widget configuration properties.
 * @abstract
 */
var BaseCellEditor = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property BaseCellEditor.NAME
	 * @type String
	 * @static
	 */
	NAME: BASE_CELL_EDITOR,

	/**
	 * Static property used to define the default attribute
	 * configuration for the BaseCellEditor.
	 *
	 * @property BaseCellEditor.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute editable
		 * @default false
		 * @type Boolean
		 */
		editable: {
			value: false,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute elementName
		 * @default 'value'
		 * @type String
		 */
		elementName: {
			value: VALUE,
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute footerContent
		 * @default ''
		 * @type String
		 */
		footerContent: {
			value: _EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute hideOnSave
		 * @default true
		 * @type Boolean
		 */
		hideOnSave: {
			value: true,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute inputFormatter
		 * @type Function
		 */
		inputFormatter: {
			value: function(val) {
				if (isString(val)) {
					val = val.replace(REGEX_NL, TPL_BR);
				}

				return val;
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute outputFormatter
		 * @type Function
		 */
		outputFormatter: {
			value: function(val) {
				var instance = this;

				if (isString(val)) {
					if (instance.get(UNESCAPE_VALUE)) {
						val = LString.unescapeEntities(val);
					}

					val = val.replace(REGEX_BR, _NL);
				}

				return val;
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute showToolbar
		 * @default true
		 * @type Boolean
		 */
		showToolbar: {
			value: true,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute strings
		 * @type Object
		 */
		strings: {
			value: {
				edit: 'Edit',
				save: 'Save',
				cancel: 'Cancel'
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute tabIndex
		 * @default 1
		 * @type Number
		 */
		tabIndex: {
			value: 1
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute toolbar
		 * @default null
		 * @type Object
		 */
		toolbar: {
			setter: '_setToolbar',
			validator: isObject,
			value: null
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute unescapeValue
		 * @default true
		 * @type Boolean
		 */
		unescapeValue: {
			value: true,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute validator
		 * @default null
		 * @type Object
		 */
		validator: {
			setter: '_setValidator',
			validator: isObject,
			value: null
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute value
		 * @default ''
		 * @type String
		 */
		value: {
			value: _EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute visible
		 * @default false
		 * @type Boolean
		 */
		visible: {
			value: false
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property BaseCellEditor.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.Overlay,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property BaseCellEditor.UI_ATTRS
	 * @type Array
	 * @static
	 */
	UI_ATTRS: [ EDITABLE, SHOW_TOOLBAR, VALUE ],

	prototype: {
		CONTENT_TEMPLATE: '<form></form>',
		ELEMENT_TEMPLATE: null,

		elements: null,
		validator: null,

		_hDocMouseDownEv: null,

		/**
		 * Construction logic executed during BaseCellEditor instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function(config) {
			var instance = this;

			instance._initEvents();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request. Lifecycle.
		 *
		 * @method destructor
		 * @protected
		 */
		destructor: function() {
			var instance = this;
			var hDocMouseDown = instance._hDocMouseDownEv;
			var toolbar = instance.toolbar;
			var validator = instance.validator;

			if (hDocMouseDown) {
				hDocMouseDown.detach();
			}

			if (toolbar) {
				toolbar.destroy();
			}

			if (validator) {
				validator.destroy();
			}
		},

		/**
		 * Bind the events on the BaseCellEditor UI. Lifecycle.
		 *
		 * @method bindUI
		 * @protected
		 */
		bindUI: function() {
			var instance = this;

			instance.get(BOUNDING_BOX).on(KEY, A.bind(instance._onEscKey, instance), 'down:27');
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method formatValue
		 * @param formatter, val
		 */
		formatValue: function(formatter, val) {
			var instance = this;

			if (isFunction(formatter)) {
				val = formatter.call(instance, val);
			}

			return val;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getValue
		 */
		getValue: function() {
			var instance = this;

			return instance.formatValue(
				instance.get(INPUT_FORMATTER),
				instance.getElementsValue()
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _initEvents
		 * @protected
		 */
		_initEvents: function() {
			var instance = this;

			instance.publish({
				cancel: {
					defaultFn: instance._defCancelFn
				},

				initEdit: {
					defaultFn: instance._defInitEditFn,
					fireOnce: true
				},

				initValidator: {
					defaultFn: instance._defInitValidatorFn,
					fireOnce: true
				},

				initToolbar: {
					defaultFn: instance._defInitToolbarFn,
					fireOnce: true
				},

				save: {
					defaultFn: instance._defSaveFn
				}
			});

			instance.after({
				render: instance._afterRender,
				visibleChange: A.debounce(instance._debounceVisibleChange, 350, instance)
			});

			instance.on({
				'form-validator:submit': A.bind(instance._onSubmit, instance)
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterRender
		 * @protected
		 */
		_afterRender: function() {
			var instance = this;

			instance._handleInitValidatorEvent();
			instance._handleInitToolbarEvent();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defCancelFn
		 * @param event
		 * @protected
		 */
		_defCancelFn: function(event) {
			var instance = this;

			instance.hide();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defInitValidatorFn
		 * @param event
		 * @protected
		 */
		_defInitValidatorFn: function(event) {
			var instance = this;

			instance.validator = new A.FormValidator(
				instance.get(VALIDATOR)
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defInitToolbarFn
		 * @param event
		 * @protected
		 */
		_defInitToolbarFn: function(event) {
			var instance = this;
			var editable = instance.get(EDITABLE);

			instance.toolbar = new A.Toolbar(
				instance.get(TOOLBAR)
			)
			.render(instance.footerNode);

			if (editable) {
				instance._uiSetEditable(editable);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defSaveFn
		 * @param event
		 * @protected
		 */
		_defSaveFn: function(event) {
			var instance = this;

			if (instance.get(HIDE_ON_SAVE)) {
				instance.hide();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _debounceVisibleChange
		 * @param event
		 * @protected
		 */
		_debounceVisibleChange: function(event) {
			var instance = this;
			var hDocMouseDown = instance._hDocMouseDownEv;

			if (event.newVal) {
				if (!hDocMouseDown) {
					instance._hDocMouseDownEv = A.getDoc().on(MOUSEDOWN, A.bind(instance._onDocMouseDownExt, instance));
				}
			}
			else if (hDocMouseDown) {
				hDocMouseDown.detach();
				instance._hDocMouseDownEv = null;
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleCancelEvent
		 * @protected
		 */
		_handleCancelEvent: function() {
			var instance = this;

			instance.fire(CANCEL);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleEditEvent
		 * @protected
		 */
		_handleEditEvent: function() {
			var instance = this;

			instance.fire(EDIT);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleInitEditEvent
		 * @protected
		 */
		_handleInitEditEvent: function() {
			var instance = this;

			if (instance.get(RENDERED)) {
				this.fire(INIT_EDIT);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleInitValidatorEvent
		 * @protected
		 */
		_handleInitValidatorEvent: function() {
			var instance = this;

			if (instance.get(RENDERED)) {
				this.fire(INIT_VALIDATOR);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleInitToolbarEvent
		 * @protected
		 */
		_handleInitToolbarEvent: function() {
			var instance = this;

			if (instance.get(RENDERED) && instance.get(SHOW_TOOLBAR)) {
				this.fire(INIT_TOOLBAR);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleSaveEvent
		 * @protected
		 */
		_handleSaveEvent: function() {
			var instance = this;

			if (!instance.validator.hasErrors()) {
				instance.fire(SAVE, {
					newVal: instance.getValue(),
					prevVal: instance.get(VALUE)
				});
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onDocMouseDownExt
		 * @param event
		 * @protected
		 */
		_onDocMouseDownExt: function(event) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			if (!boundingBox.contains(event.target)) {
				instance.set(VISIBLE, false);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onEscKey
		 * @param event
		 * @protected
		 */
		_onEscKey: function(event) {
			var instance = this;

			instance.hide();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onSubmit
		 * @param event
		 * @protected
		 */
		_onSubmit: function(event) {
			var instance = this;
			var validator = event.validator;

			if (validator) {
				validator.formEvent.halt();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setToolbar
		 * @param val
		 * @protected
		 */
		_setToolbar: function(val) {
			var instance = this;
			var strings = instance.getStrings();

			return A.merge(
				{
					activeState: false,
					children: [
						[
							{
								on: {
									click: A.bind(instance._handleSaveEvent, instance)
								},
								label: strings[SAVE],
								icon: 'icon-ok-sign'
							},
							{
								on: {
									click: A.bind(instance._handleCancelEvent, instance)
								},
								label: strings[CANCEL]
							}
						]
					]
				},
				val
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setValidator
		 * @param val
		 * @protected
		 */
		_setValidator: function(val) {
			var instance = this;

			return A.merge(
				{
					boundingBox: instance.get(CONTENT_BOX),
					bubbleTargets: instance
				},
				val
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetShowToolbar
		 * @param val
		 * @protected
		 */
		_uiSetShowToolbar: function(val) {
			var instance = this;
			var footerNode = instance.footerNode;

			if (val) {
				footerNode.show();
			}
			else {
				footerNode.hide();
			}

			instance._handleInitToolbarEvent();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * NOTE FOR DEVELOPERS: Yoy *may* want to replace the methods from
		 * this section on your implementation.
		 *
		 * @method getElementsValue
		 */
		getElementsValue: function() {
			var instance = this;
			var elements = instance.elements;

			if (elements) {
				return elements.get(VALUE);
			}

			return _EMPTY_STR;
		},

		/**
		 * Render the BaseCellEditor component instance. Lifecycle.
		 *
		 * @method renderUI
		 * @protected
		 */
		renderUI: function() {
			var instance = this;

			if (instance.ELEMENT_TEMPLATE) {
				instance.elements = A.Node.create(instance.ELEMENT_TEMPLATE);

				instance._syncElementsName();

				instance.setStdModContent(WidgetStdMod.BODY, instance.elements);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defInitEditFn
		 * @param event
		 * @protected
		 */
		_defInitEditFn: function(event) {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _syncElementsFocus
		 * @protected
		 */
		_syncElementsFocus: function() {
			var instance = this;

			instance.elements.selectText();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _syncElementsName
		 * @protected
		 */
		_syncElementsName: function() {
			var instance = this;

			instance.elements.setAttribute(
				NAME,
				instance.get(ELEMENT_NAME)
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _syncFocus
		 * @protected
		 */
		_syncFocus: function() {
			var instance = this;

			A.later(0, instance, instance._syncElementsFocus);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetEditable
		 * @param val
		 * @protected
		 */
		_uiSetEditable: function(val) {
			var instance = this;
			var toolbar = instance.toolbar;

			if (instance.get(RENDERED) && toolbar) {
				if (val) {
					toolbar.add(
						[
							{
								icon: 'icon-edit',
								label: instance.getString(EDIT),
								on: {
									click: A.bind(instance._handleEditEvent, instance)
								}
							}
						],
						1
					);
				}
				else {
					toolbar.remove(1);
				}
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetValue
		 * @param val
		 * @protected
		 */
		_uiSetValue: function(val) {
			var instance = this;
			var elements = instance.elements;

			if (elements) {
				elements.val(
					instance.formatValue(instance.get(OUTPUT_FORMATTER), val)
				);
			}
		}
	}
});

A.BaseCellEditor = BaseCellEditor;

/**
 * Abstract class BaseOptionsCellEditor for options attribute support.
 *
 * @class A.BaseOptionsCellEditor
 * @extends A.BaseCellEditor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @abstract
 */
var BaseOptionsCellEditor = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property BaseOptionsCellEditor.NAME
	 * @type String
	 * @static
	 */
	NAME: OPTIONS_CELL_EDITOR,

	/**
	 * Static property used to define the default attribute
	 * configuration for the BaseOptionsCellEditor.
	 *
	 * @property BaseOptionsCellEditor.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute inputFormatter
		 * @default null
		 */
		inputFormatter: {
			value: null
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute options
		 * @default {}
		 * @type Object
		 */
		options: {
			setter: '_setOptions',
			value: {},
			validator: isObject
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute outputFormatter
		 * @default null
		 */
		outputFormatter: {
			value: null
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute selectedAttrName
		 * @default 'selected'
		 * @type String
		 */
		selectedAttrName: {
			value: SELECTED,
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute strings
		 * @type Object
		 */
		strings: {
			value: {
				add: 'Add',
				cancel: 'Cancel',
				addOption: 'Add option',
				edit: 'Edit options',
				editOptions: 'Edit option(s)',
				name: 'Name',
				remove: 'Remove',
				save: 'Save',
				stopEditing: 'Stop editing',
				value: 'Value'
			}
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property BaseOptionsCellEditor.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.BaseCellEditor,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property BaseOptionsCellEditor.UI_ATTRS
	 * @type Array
	 * @static
	 */
	UI_ATTRS: [OPTIONS],

	prototype: {
		EDIT_TEMPLATE: '<div class="' + CSS_CELLEDITOR_EDIT + '"></div>',

		EDIT_OPTION_ROW_TEMPLATE: '<div class="' + CSS_CELLEDITOR_EDIT_OPTION_ROW + '">' +
									'<span class="' + [ CSS_CELLEDITOR_EDIT_DD_HANDLE, CSS_ICON, CSS_ICON_GRIP_DOTTED_VERTICAL ].join(_SPACE) + '"></span>' +
									'<input class="' + CSS_CELLEDITOR_EDIT_INPUT_NAME + '" size="7" placeholder="{titleName}" title="{titleName}" type="text" value="{valueName}" /> ' +
									'<input class="' + CSS_CELLEDITOR_EDIT_INPUT_VALUE + '" size="7" placeholder="{titleValue}" title="{titleValue}" type="text" value="{valueValue}" /> ' +
									'<a class="' + [ CSS_CELLEDITOR_EDIT_LINK, CSS_CELLEDITOR_EDIT_DELETE_OPTION ].join(_SPACE) + '" href="javascript:void(0);">{remove}</a> ' +
								'</div>',

		EDIT_ADD_LINK_TEMPLATE: '<a class="' + [ CSS_CELLEDITOR_EDIT_LINK, CSS_CELLEDITOR_EDIT_ADD_OPTION ].join(_SPACE) + '" href="javascript:void(0);">{addOption}</a> ',
		EDIT_LABEL_TEMPLATE: '<div class="' + CSS_CELLEDITOR_EDIT_LABEL + '">{editOptions}</div>',

		editContainer: null,
		editSortable: null,
		options: null,

		/**
		 * Construction logic executed during BaseOptionsCellEditor instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this;

			instance.on(EDIT, instance._onEditEvent);
			instance.on(SAVE, instance._onSave);
			instance.after(INIT_TOOLBAR, instance._afterInitToolbar);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method addNewOption
		 * @param name, value
		 */
		addNewOption: function(name, value) {
			var instance = this;
			var addOptionLink = instance.editContainer.one(_DOT+CSS_CELLEDITOR_EDIT_ADD_OPTION);

			var newRow = A.Node.create(
				instance._createEditOption(
					name || _EMPTY_STR,
					value || _EMPTY_STR
				)
			);

			addOptionLink.placeBefore(newRow);
			newRow.one(INPUT).focus();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method removeOption
		 * @param optionRow
		 */
		removeOption: function(optionRow) {
			optionRow.remove();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method saveOptions
		 */
		saveOptions: function() {
			var instance = this;
			var editContainer = instance.editContainer;

			if (editContainer) {
				var names = editContainer.all(_DOT+CSS_CELLEDITOR_EDIT_INPUT_NAME);
				var values = editContainer.all(_DOT+CSS_CELLEDITOR_EDIT_INPUT_VALUE);
				var options = {};

				names.each(function(inputName, index) {
					var name = inputName.val();
					var value = values.item(index).val();

					if (name && value) {
						options[value] = name;
					}
				});

				instance.set(OPTIONS, options);

				instance._uiSetValue(
					instance.get(VALUE)
				);

				instance.toggleEdit();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method toggleEdit
		 */
		toggleEdit: function() {
			var instance = this;

			instance.editContainer.toggle();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 * TODO. Rewrite this method.
		 *
		 * @method _createOptions
		 * @param val
		 * @protected
		 */
		_createOptions: function(val) {
			var instance = this;
			var elements = instance.elements;
			var optionsBuffer = [];
			var wrappersBuffer = [];
			var optionTpl = instance.OPTION_TEMPLATE;
			var optionWrapperTpl = instance.OPTION_WRAPPER;

			A.each(val, function(oLabel, oValue) {
				var values = {
					id: A.guid(),
					label: oLabel,
					name: oValue,
					value: oValue
				};

				if (optionTpl) {
					optionsBuffer.push(Lang.sub(optionTpl, values));
				}

				if (optionWrapperTpl) {
					wrappersBuffer.push(Lang.sub(optionWrapperTpl, values));
				}
			});

			var options = A.NodeList.create(optionsBuffer.join(_EMPTY_STR));
			var wrappers = A.NodeList.create(wrappersBuffer.join(_EMPTY_STR));

			if (wrappers.size()) {
				wrappers.each(function(wrapper, i) {
					wrapper.prepend(options.item(i));
				});

				elements.setContent(wrappers);
			}
			else {
				elements.setContent(options);
			}

			instance.options = options;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _createEditBuffer
		 * @protected
		 */
		_createEditBuffer: function() {
			var instance = this;
			var strings = instance.getStrings();
			var buffer = [];

			buffer.push(
				Lang.sub(instance.EDIT_LABEL_TEMPLATE, {
					editOptions: strings[EDIT_OPTIONS]
				})
			);

			A.each(instance.get(OPTIONS), function(name, value) {
				buffer.push(instance._createEditOption(name, value));
			});

			buffer.push(
				Lang.sub(instance.EDIT_ADD_LINK_TEMPLATE, {
					addOption: strings[ADD_OPTION]
				})
			);

			return buffer.join(_EMPTY_STR);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _createEditOption
		 * @param name, value
		 * @protected
		 */
		_createEditOption: function(name, value) {
			var instance = this;
			var strings = instance.getStrings();

			return Lang.sub(
				instance.EDIT_OPTION_ROW_TEMPLATE,
				{
					remove: strings[REMOVE],
					titleName: strings[NAME],
					titleValue: strings[VALUE],
					valueName: name,
					valueValue: value
				}
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defInitEditFn
		 * @param event
		 * @protected
		 */
		_defInitEditFn: function(event) {
			var instance = this;
			var editContainer = A.Node.create(instance.EDIT_TEMPLATE);

			editContainer.delegate('click', A.bind(instance._onEditLinkClickEvent, instance), _DOT+CSS_CELLEDITOR_EDIT_LINK);
			editContainer.delegate('keydown', A.bind(instance._onEditKeyEvent, instance), INPUT);

			instance.editContainer = editContainer;

			instance.setStdModContent(
				WidgetStdMod.BODY,
				editContainer.hide(),
				WidgetStdMod.AFTER
			);

			instance.editSortable = new A.Sortable({
				container: editContainer,
				handles: [ _DOT+CSS_CELLEDITOR_EDIT_DD_HANDLE ],
				nodes: _DOT+CSS_CELLEDITOR_EDIT_OPTION_ROW,
				opacity: '.3'
			})
			.delegate.dd.plug(A.Plugin.DDConstrained, {
				constrain: editContainer,
				stickY: true
			});

			instance._syncEditOptionsUI();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _getSelectedOptions
		 * @protected
		 */
		_getSelectedOptions: function() {
			var instance = this;
			var options = [];

			instance.options.each(function(option) {
				if (option.get(instance.get(SELECTED_ATTR_NAME))) {
					options.push(option);
				}
			});

			return A.all(options);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onEditEvent
		 * @param event
		 * @protected
		 */
		_onEditEvent: function(event) {
			var instance = this;

			instance._handleInitEditEvent();

			instance.toggleEdit();

			instance._syncEditOptionsUI();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onEditLinkClickEvent
		 * @param event
		 * @protected
		 */
		_onEditLinkClickEvent: function(event) {
			var instance = this;
			var currentTarget = event.currentTarget;

			if (currentTarget.test(_DOT+CSS_CELLEDITOR_EDIT_ADD_OPTION)) {
				instance.addNewOption();
			}
			else if (currentTarget.test(_DOT+CSS_CELLEDITOR_EDIT_HIDE_OPTION)) {
				instance.toggleEdit();
			}
			else if (currentTarget.test(_DOT+CSS_CELLEDITOR_EDIT_DELETE_OPTION)) {
				instance.removeOption(
					currentTarget.ancestor(_DOT+CSS_CELLEDITOR_EDIT_OPTION_ROW)
				);
			}

			event.halt();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onEditKeyEvent
		 * @param event
		 * @protected
		 */
		_onEditKeyEvent: function(event) {
			var instance = this;
			var currentTarget = event.currentTarget;

			if (event.isKey(RETURN)) {
				var nextInput = currentTarget.next(INPUT);

				if (nextInput) {
					nextInput.selectText();
				}
				else {
					instance.addNewOption();
				}

				event.halt();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onSave
		 * @param event
		 * @protected
		 */
		_onSave: function(event) {
			var instance = this;

			instance.saveOptions();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setOptions
		 * @param val
		 * @protected
		 */
		_setOptions: function(val) {
			var options = {};

			if (isArray(val)) {
				AArray.each(val, function(value) {
					options[value] = value;
				});
			}
			else if (isObject(val)) {
				options = val;
			}

			return options;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _syncEditOptionsUI
		 * @protected
		 */
		_syncEditOptionsUI: function() {
			var instance = this;

			instance.editContainer.setContent(instance._createEditBuffer());
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetOptions
		 * @param val
		 * @protected
		 */
		_uiSetOptions: function(val) {
			var instance = this;

			instance._createOptions(val);
			instance._uiSetValue(instance.get(VALUE));
			instance._syncElementsName();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetValue
		 * @param val
		 * @protected
		 */
		_uiSetValue: function(val) {
			var instance = this;
			var options = instance.options;

			if (options && options.size()) {
				options.set(instance.get(SELECTED_ATTR_NAME), false);

				if (isValue(val)) {
					if (!isArray(val)) {
						val = String(val).split(_COMMA);
					}

					AArray.each(val, function(value) {
						options.filter('[value="' + Lang.trim(value) + '"]').set(instance.get(SELECTED_ATTR_NAME), true);
					});
				}
			}

			return val;
		}
	}
});

A.BaseOptionsCellEditor = BaseOptionsCellEditor;

/**
 * TextCellEditor class.
 *
 * @class A.TextCellEditor
 * @extends A.BaseCellEditor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var TextCellEditor = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property TextCellEditor.NAME
	 * @type String
	 * @static
	 */
	NAME: TEXT_CELL_EDITOR,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property TextCellEditor.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.BaseCellEditor,

	prototype: {
		ELEMENT_TEMPLATE: '<input autocomplete="off" class="' + CSS_CELLEDITOR_ELEMENT + '" type="text" />'
	}
});

A.TextCellEditor = TextCellEditor;

/**
 * TextAreaCellEditor class.
 *
 * @class A.TextAreaCellEditor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var TextAreaCellEditor = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property TextAreaCellEditor.NAME
	 * @type String
	 * @static
	 */
	NAME: TEXT_AREA_CELL_EDITOR,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property TextAreaCellEditor.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.BaseCellEditor,

	prototype: {
		ELEMENT_TEMPLATE: '<textarea class="' + CSS_CELLEDITOR_ELEMENT + '"></textarea>'
	}
});

A.TextAreaCellEditor = TextAreaCellEditor;

/**
 * DropDownCellEditor class.
 *
 * @class A.DropDownCellEditor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var DropDownCellEditor = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DropDownCellEditor.NAME
	 * @type String
	 * @static
	 */
	NAME: DROP_DOWN_CELL_EDITOR,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DropDownCellEditor.
	 *
	 * @property DropDownCellEditor.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute multiple
		 * @default false
		 * @type Boolean
		 */
		multiple: {
			value: false,
			validator: isBoolean
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property DropDownCellEditor.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.BaseOptionsCellEditor,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property DropDownCellEditor.UI_ATTRS
	 * @type Array
	 * @static
	 */
	UI_ATTRS: [MULTIPLE],

	prototype: {
		ELEMENT_TEMPLATE: '<select class="' + CSS_CELLEDITOR_ELEMENT + '"></select>',
		OPTION_TEMPLATE: '<option value="{value}">{label}</option>',

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getElementsValue
		 */
		getElementsValue: function() {
			var instance = this;

			if (instance.get(MULTIPLE)) {
				return instance._getSelectedOptions().get(VALUE);
			}

			return instance.elements.get(VALUE);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _syncElementsFocus
		 * @protected
		 */
		_syncElementsFocus: function() {
			var instance = this;

			instance.elements.focus();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetMultiple
		 * @param val
		 * @protected
		 */
		_uiSetMultiple: function(val) {
			var instance = this;
			var elements = instance.elements;

			if (val) {
				elements.setAttribute(MULTIPLE, MULTIPLE);
			}
			else {
				elements.removeAttribute(MULTIPLE);
			}
		}
	}
});

A.DropDownCellEditor = DropDownCellEditor;

/**
 * CheckboxCellEditor class.
 *
 * @class A.CheckboxCellEditor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var CheckboxCellEditor = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property CheckboxCellEditor.NAME
	 * @type String
	 * @static
	 */
	NAME: CHECKBOX_CELL_EDITOR,

	/**
	 * Static property used to define the default attribute
	 * configuration for the CheckboxCellEditor.
	 *
	 * @property CheckboxCellEditor.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute selectedAttrName
		 * @default 'checked'
		 * @type String
		 */
		selectedAttrName: {
			value: CHECKED
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property CheckboxCellEditor.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.BaseOptionsCellEditor,

	prototype: {
		ELEMENT_TEMPLATE: '<div class="' + CSS_CELLEDITOR_ELEMENT + '"></div>',
		OPTION_TEMPLATE: '<input class="' + CSS_CELLEDITOR_OPTION + '" id="{id}" name="{name}" type="checkbox" value="{value}"/>',
		OPTION_WRAPPER: '<label class="checkbox" for="{id}"> {label}</label>',

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getElementsValue
		 */
		getElementsValue: function() {
			var instance = this;

			return instance._getSelectedOptions().get(VALUE);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _syncElementsFocus
		 * @protected
		 */
		_syncElementsFocus: function() {
			var instance = this;
			var options = instance.options;

			if (options && options.size()) {
				options.item(0).focus();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _syncElementsName
		 * @protected
		 */
		_syncElementsName: function() {
			var instance = this;
			var options = instance.options;

			if (options) {
				options.setAttribute(NAME, instance.get(ELEMENT_NAME));
			}
		}
	}
});

A.CheckboxCellEditor = CheckboxCellEditor;

/**
 * RadioCellEditor class.
 *
 * @class A.RadioCellEditor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var RadioCellEditor = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property RadioCellEditor.NAME
	 * @type String
	 * @static
	 */
	NAME: RADIO_CELL_EDITOR,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property RadioCellEditor.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.CheckboxCellEditor,

	prototype: {
		OPTION_TEMPLATE: '<input class="field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',
		OPTION_WRAPPER: '<label class="radio" for="{id}"> {label}</label>',

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getElementsValue
		 */
		getElementsValue: function() {
			var instance = this;

			return instance._getSelectedOptions().get(VALUE)[0];
		}
	}
});

A.RadioCellEditor = RadioCellEditor;

/**
 * DateCellEditor class.
 *
 * @class A.DateCellEditor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var DateCellEditor = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DateCellEditor.NAME
	 * @type String
	 * @static
	 */
	NAME: DATE_CELL_EDITOR,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property DateCellEditor.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.BaseCellEditor,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DateCellEditor.
	 *
	 * @property DateCellEditor.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute bodyContent
		 * @default ''
		 * @type String
		 */
		bodyContent: {
			value: _EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute calendar
		 * @default null
		 * @type Object
		 */
		calendar: {
			setter: '_setCalendar',
			validator: isObject,
			value: null
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute dateFormat
		 * @default '%D'
		 * @type String
		 */
		dateFormat: {
			value: '%D',
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute inputFormatter
		 * @type Function
		 */
		inputFormatter: {
			value: function(val) {
				var instance = this,
					values = [];

				AArray.each(val, function(date, index) {
					values.push(instance.formatDate(date).toString());
				});

				return values;
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute outputFormatter
		 * @type Function
		 */
		outputFormatter: {
			value: function(val) {
				var instance = this,
					values = [];

				AArray.each(val, function(date, index) {
					values.push(DataType.Date.parse(date));
				});

				return values;
			}
		}
	},

	prototype: {
		ELEMENT_TEMPLATE: '<input class="' + CSS_CELLEDITOR_ELEMENT + '" type="hidden" />',

		/**
		 * Construction logic executed during DateCellEditor instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this;

			instance.after('calendar:dateClick', A.bind(instance._afterDateSelect, instance));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getElementsValue
		 */
		getElementsValue: function() {
			var instance = this;

			return instance.calendar.get('selectedDates');
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method formatDate
		 * @param date
		 */
		formatDate: function(date) {
			var instance = this,
				mask = instance.get('dateFormat'),
				locale = instance.get('locale');

			return DataType.Date.format(date, { format: mask, locale: locale });
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterDateSelect
		 * @param event
		 * @protected
		 */
		_afterDateSelect: function(event) {
			var instance = this,
				selectedDates = instance.calendar.get('selectedDates');

			instance.elements.val(AArray.invoke(selectedDates, 'getTime').join(_COMMA));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterRender
		 * @protected
		 */
		_afterRender: function() {
			var instance = this;

			A.DateCellEditor.superclass._afterRender.apply(instance, arguments);

			instance.calendar = new A.Calendar(
				instance.get(CALENDAR)
			)
			.render(instance.bodyNode);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setCalendar
		 * @param val
		 * @protected
		 */
		_setCalendar: function(val) {
			var instance = this;

			return A.merge(
				{
					bubbleTargets: instance
				},
				val
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetValue
		 * @param val
		 * @protected
		 */
		_uiSetValue: function(val) {
			var instance = this,
				calendar = instance.calendar,
				formatedValue;

			if (calendar) {
				if (!isArray(val)) {
					val = [val];
				}

				formatedValue = instance.formatValue(instance.get(OUTPUT_FORMATTER), val);

				calendar._clearSelection();
				calendar.set('date', formatedValue[0]);
				calendar.selectDates(formatedValue);
			}
		}
	}
});

A.DateCellEditor = DateCellEditor;