AUI.add('aui-datatable-edit', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,
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
	CSS_CELLEDITOR_LABEL = AgetClassName(CELLEDITOR, LABEL),
	CSS_CELLEDITOR_OPTION = AgetClassName(CELLEDITOR, OPTION),
	CSS_CELLEDITOR_WRAPPER = AgetClassName(CELLEDITOR, WRAPPER),
	CSS_DATATABLE_EDITABLE = AgetClassName(DATATABLE, EDITABLE),
	CSS_ICON = AgetClassName(ICON),
	CSS_ICON_GRIP_DOTTED_VERTICAL = AgetClassName(ICON, GRIP, DOTTED, VERTICAL),

	TPL_BR = '<br/>';

/**
 * An extension for A.DataTable to support Cell Editing:
 *
 * Check the list of <a href="CellEditorSupport.html#configattributes">Configuration Attributes</a> available for
 * CellEditorSupport.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class CellEditorSupport
 * @constructor
 * @extends Base
 */
var CellEditorSupport = function() {};

CellEditorSupport.NAME = 'dataTableCellEditorSupport';

CellEditorSupport.EDITOR_ZINDEX = 9999;

CellEditorSupport.ATTRS = {
	editEvent: {
		setter: '_setEditEvent',
		validator: isString,
		value: CLICK
	}
};

A.mix(CellEditorSupport.prototype, {
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

	getEditor: function(record, column) {
		var instance = this,
			columnEditor = column.editor,
			recordEditor = record.get(EDITOR);

		if (columnEditor === false || recordEditor === false) {
			return null;
		}

		return recordEditor || columnEditor;
	},

	_afterCellEditorSupportRender: function() {
		var instance = this;

		instance._syncModelsReadOnlyUI();

		instance.body.after(A.bind(instance._syncModelsReadOnlyUI, instance), instance.body, RENDER);
	},

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

	_onEditorVisibleChange: function(event) {
		var instance = this,
			editor = event.currentTarget;

		if (event.newVal) {
			editor._syncFocus();
		}
	},

	_syncModelReadOnlyUI: function(model) {
		var instance = this,
			row = instance.getRow(model);

		row.toggleClass(instance.CLASS_NAMES_CELL_EDITOR_SUPPORT[READ_ONLY], model.get(READ_ONLY) === true);
	},

	_syncModelsReadOnlyUI: function() {
		var instance = this;

		instance.get(DATA).each(function(model) {
			instance._syncModelReadOnlyUI(model);
		});
	},

	// Deprecated methods

	// Use getEditor
	getCellEditor: function() {
		return this.getEditor.apply(this, arguments);
	},

	getRecordColumnValue: function(record, column) {
		return record.get(column.key);
	}
});

A.DataTable.CellEditorSupport = CellEditorSupport;

A.Base.mix(A.DataTable, [ CellEditorSupport ]);

/**
 * Abstract class BaseCellEditor.
 *
 * Check the list of <a href="BaseCellEditor.html#configattributes">Configuration Attributes</a> available for
 * BaseCellEditor.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class BaseCellEditor
 * @abstract
 * @extends A.Overlay
 */
var BaseCellEditor = A.Component.create({
	NAME: BASE_CELL_EDITOR,

	ATTRS: {
		editable: {
			value: false,
			validator: isBoolean
		},

		elementName: {
			value: VALUE,
			validator: isString
		},

		footerContent: {
			value: _EMPTY_STR
		},

		hideOnSave: {
			value: true,
			validator: isBoolean
		},

		inputFormatter: {
			value: function(val) {

				if (isString(val)) {
					val = val.replace(REGEX_NL, TPL_BR);
				}

				return val;
			}
		},

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

		showToolbar: {
			value: true,
			validator: isBoolean
		},

		strings: {
			value: {
				edit: 'Edit',
				save: 'Save',
				cancel: 'Cancel'
			}
		},

		tabIndex: {
			value: 1
		},

		toolbar: {
			setter: '_setToolbar',
			validator: isObject,
			value: null
		},

		unescapeValue: {
			value: true,
			validator: isBoolean
		},

		validator: {
			setter: '_setValidator',
			validator: isObject,
			value: null
		},

		value: {
			value: _EMPTY_STR
		},

		visible: {
			value: false
		}
	},

	EXTENDS: A.Overlay,

	UI_ATTRS: [ EDITABLE, SHOW_TOOLBAR, VALUE ],

	prototype: {
		CONTENT_TEMPLATE: '<form></form>',
		ELEMENT_TEMPLATE: null,

		elements: null,
		validator: null,

		_hDocMouseDownEv: null,

		initializer: function(config) {
			var instance = this;

			instance._initEvents();
		},

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

		bindUI: function() {
			var instance = this;

			instance.get(BOUNDING_BOX).on(KEY, A.bind(instance._onEscKey, instance), 'down:27');
		},

		formatValue: function(formatter, val) {
			var instance = this;

			if (isFunction(formatter)) {
				val = formatter.call(instance, val);
			}

			return val;
		},

		getValue: function() {
			var instance = this;

			return instance.formatValue(
				instance.get(INPUT_FORMATTER),
				instance.getElementsValue()
			);
		},

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

		_afterRender: function() {
			var instance = this;

			instance._handleInitValidatorEvent();
			instance._handleInitToolbarEvent();
		},

		_defCancelFn: function(event) {
			var instance = this;

			instance.hide();
		},

		_defInitValidatorFn: function(event) {
			var instance = this;

			instance.validator = new A.FormValidator(
				instance.get(VALIDATOR)
			);
		},

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

		_defSaveFn: function(event) {
			var instance = this;

			if (instance.get(HIDE_ON_SAVE)) {
				instance.hide();
			}
		},

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

		_handleCancelEvent: function() {
			var instance = this;

			instance.fire(CANCEL);
		},

		_handleEditEvent: function() {
			var instance = this;

			instance.fire(EDIT);
		},

		_handleInitEditEvent: function() {
			var instance = this;

			if (instance.get(RENDERED)) {
				this.fire(INIT_EDIT);
			}
		},

		_handleInitValidatorEvent: function() {
			var instance = this;

			if (instance.get(RENDERED)) {
				this.fire(INIT_VALIDATOR);
			}
		},

		_handleInitToolbarEvent: function() {
			var instance = this;

			if (instance.get(RENDERED) && instance.get(SHOW_TOOLBAR)) {
				this.fire(INIT_TOOLBAR);
			}
		},

		_handleSaveEvent: function() {
			var instance = this;

			if (!instance.validator.hasErrors()) {
				instance.fire(SAVE, {
					newVal: instance.getValue(),
					prevVal: instance.get(VALUE)
				});
			}
		},

		_onDocMouseDownExt: function(event) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			if (!boundingBox.contains(event.target)) {
				instance.set(VISIBLE, false);
			}
		},

		_onEscKey: function(event) {
			var instance = this;

			instance.hide();
		},

		_onSubmit: function(event) {
			var instance = this;
			var validator = event.validator;

			instance._handleSaveEvent();

			if (validator) {
				validator.formEvent.halt();
			}
		},

		_setToolbar: function(val) {
			var instance = this;
			var strings = instance.getStrings();

			return A.merge(
				{
					activeState: false,
					children: [
						{
							label: strings[SAVE],
							icon: DISK,
							type: SUBMIT
						},
						{
							handler: A.bind(instance._handleCancelEvent, instance),
							label: strings[CANCEL]
						}
					]
				},
				val
			);
		},

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

		/*
		 * NOTE FOR DEVELOPERS:
		 *
		 * Yoy *may* want to replace the methods from this section on your implementation.
		 */

		getElementsValue: function() {
			var instance = this;
			var elements = instance.elements;

			if (elements) {
				return elements.get(VALUE);
			}

			return _EMPTY_STR;
		},

		renderUI: function() {
			var instance = this;

			if (instance.ELEMENT_TEMPLATE) {
				instance.elements = A.Node.create(instance.ELEMENT_TEMPLATE);

				instance._syncElementsName();

				instance.setStdModContent(WidgetStdMod.BODY, instance.elements);
			}
		},

		_defInitEditFn: function(event) {
		},

		_syncElementsFocus: function() {
			var instance = this;

			instance.elements.selectText();
		},

		_syncElementsName: function() {
			var instance = this;

			instance.elements.setAttribute(
				NAME,
				instance.get(ELEMENT_NAME)
			);
		},

		_syncFocus: function() {
			var instance = this;

			A.later(0, instance, instance._syncElementsFocus);
		},

		_uiSetEditable: function(val) {
			var instance = this;
			var toolbar = instance.toolbar;

			if (instance.get(RENDERED) && toolbar) {
				if (val) {
					toolbar.add(
						{
							handler: A.bind(instance._handleEditEvent, instance),
							icon: PENCIL,
							label: instance.getString(EDIT)
						},
						1
					);
				}
				else {
					toolbar.remove(1);
				}
			}
		},

		_uiSetValue: function(val) {
			var instance = this;
			var elements = instance.elements;

			if (elements) {
				elements.val(
					instance.formatValue(instance.get(OUTPUT_FORMATTER), val)
				);
			}
		}

		/*
		 * End of replaceable methods.
		 */
	}
});

A.BaseCellEditor = BaseCellEditor;

/**
 * Abstract class BaseOptionsCellEditor for options attribute support.
 *
 * Check the list of <a href="BaseOptionsCellEditor.html#configattributes">Configuration Attributes</a> available for
 * BaseCellEditor.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class BaseOptionsCellEditor
 * @abstract
 * @extends A.BaseCellEditor
 */
var BaseOptionsCellEditor = A.Component.create({
	NAME: OPTIONS_CELL_EDITOR,

	ATTRS: {
		inputFormatter: {
			value: null
		},

		options: {
			setter: '_setOptions',
			value: {},
			validator: isObject
		},

		outputFormatter: {
			value: null
		},

		selectedAttrName: {
			value: SELECTED,
			validator: isString
		},

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

	EXTENDS: A.BaseCellEditor,

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

		initializer: function() {
			var instance = this;

			instance.on(EDIT, instance._onEditEvent);
			instance.on(SAVE, instance._onSave);
			instance.after(INIT_TOOLBAR, instance._afterInitToolbar);
		},

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

		removeOption: function(optionRow) {
			optionRow.remove();
		},

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

		toggleEdit: function() {
			var instance = this;

			instance.editContainer.toggle();
		},

		// TODO - rewrite this method
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

		_onEditEvent: function(event) {
			var instance = this;

			instance._handleInitEditEvent();

			instance.toggleEdit();

			instance._syncEditOptionsUI();
		},

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

		_onSave: function(event) {
			var instance = this;

			instance.saveOptions();
		},

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

		_syncEditOptionsUI: function() {
			var instance = this;

			instance.editContainer.setContent(instance._createEditBuffer());
		},

		_uiSetOptions: function(val) {
			var instance = this;

			instance._uiSetValue(instance.get(VALUE));
			instance._createOptions(val);
			instance._syncElementsName();
		},

		_uiSetValue: function(val) {
			var instance = this;
			var options = instance.options;

			if (options && options.size()) {
				options.set(instance.get(SELECTED_ATTR_NAME), false);

				if (val) {
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
 * Check the list of <a href="TextCellEditor.html#configattributes">Configuration Attributes</a> available for
 * TextCellEditor.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TextCellEditor
 * @constructor
 * @extends A.BaseCellEditor
 */
var TextCellEditor = A.Component.create({
	NAME: TEXT_CELL_EDITOR,

	EXTENDS: A.BaseCellEditor,

	prototype: {
		ELEMENT_TEMPLATE: '<input autocomplete="off" class="' + CSS_CELLEDITOR_ELEMENT + '" type="text" />'
	}
});

A.TextCellEditor = TextCellEditor;

/**
 * TextAreaCellEditor class.
 *
 * Check the list of <a href="TextAreaCellEditor.html#configattributes">Configuration Attributes</a> available for
 * TextAreaCellEditor.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class TextAreaCellEditor
 * @constructor
 * @extends A.TextAreaCellEditor
 */
var TextAreaCellEditor = A.Component.create({
	NAME: TEXT_AREA_CELL_EDITOR,

	EXTENDS: A.BaseCellEditor,

	prototype: {
		ELEMENT_TEMPLATE: '<textarea class="' + CSS_CELLEDITOR_ELEMENT + '"></textarea>'
	}
});

A.TextAreaCellEditor = TextAreaCellEditor;

/**
 * DropDownCellEditor class.
 *
 * Check the list of <a href="DropDownCellEditor.html#configattributes">Configuration Attributes</a> available for
 * DropDownCellEditor.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class DropDownCellEditor
 * @constructor
 * @extends A.DropDownCellEditor
 */
var DropDownCellEditor = A.Component.create({
	NAME: DROP_DOWN_CELL_EDITOR,

	ATTRS: {
		multiple: {
			value: false,
			validator: isBoolean
		}
	},

	EXTENDS: A.BaseOptionsCellEditor,

	UI_ATTRS: [MULTIPLE],

	prototype: {
		ELEMENT_TEMPLATE: '<select class="' + CSS_CELLEDITOR_ELEMENT + '"></select>',
		OPTION_TEMPLATE: '<option value="{value}">{label}</option>',

		getElementsValue: function() {
			var instance = this;

			if (instance.get(MULTIPLE)) {
				return instance._getSelectedOptions().get(VALUE);
			}

			return instance.elements.get(VALUE);
		},

		_syncElementsFocus: function() {
			var instance = this;

			instance.elements.focus();
		},

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
 * Check the list of <a href="DropDownCellEditor.html#configattributes">Configuration Attributes</a> available for
 * CheckboxCellEditor.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class CheckboxCellEditor
 * @constructor
 * @extends A.CheckboxCellEditor
 */
var CheckboxCellEditor = A.Component.create({
	NAME: CHECKBOX_CELL_EDITOR,

	ATTRS: {
		selectedAttrName: {
			value: CHECKED
		}
	},

	EXTENDS: A.BaseOptionsCellEditor,

	prototype: {
		ELEMENT_TEMPLATE: '<div class="' + CSS_CELLEDITOR_ELEMENT + '"></div>',
		OPTION_TEMPLATE: '<input class="' + CSS_CELLEDITOR_OPTION + '" id="{id}" name="{name}" type="checkbox" value="{value}"/>',
		OPTION_WRAPPER: '<label class="' + CSS_CELLEDITOR_WRAPPER + '" for="{id}"><span class="' + CSS_CELLEDITOR_LABEL + '">{label}</span></label>',

		getElementsValue: function() {
			var instance = this;

			return instance._getSelectedOptions().get(VALUE);
		},

		_syncElementsFocus: function() {
			var instance = this;
			var options = instance.options;

			if (options && options.size()) {
				options.item(0).focus();
			}
		},

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
 * Check the list of <a href="RadioCellEditor.html#configattributes">Configuration Attributes</a> available for
 * RadioCellEditor.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class RadioCellEditor
 * @constructor
 * @extends A.RadioCellEditor
 */
var RadioCellEditor = A.Component.create({
	NAME: RADIO_CELL_EDITOR,

	EXTENDS: A.CheckboxCellEditor,

	prototype: {
		OPTION_TEMPLATE: '<input class="aui-field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',

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
 * Check the list of <a href="DateCellEditor.html#configattributes">Configuration Attributes</a> available for
 * DateCellEditor.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class DateCellEditor
 * @constructor
 * @extends A.DateCellEditor
 */
var DateCellEditor = A.Component.create({
	NAME: DATE_CELL_EDITOR,

	EXTENDS: A.BaseCellEditor,

	ATTRS: {
		bodyContent: {
			value: _EMPTY_STR
		},

		calendar: {
			setter: '_setCalendar',
			validator: isObject,
			value: null
		},

		dateFormat: {
			value: '%D',
			validator: isString
		},

		inputFormatter: {
			value: function(val) {
				var instance = this,
					values = [];

				AArray.each(val, function (date, index) {
					values.push(instance.formatDate(date).toString());
				});

				return values;
			}
		},

		outputFormatter: {
			value: function(val) {
				var instance = this,
					values = [];

				AArray.each(val, function (date, index) {
					values.push(DataType.Date.parse(date));
				});

				return values;
			}
		}
	},

	prototype: {
		ELEMENT_TEMPLATE: '<input class="' + CSS_CELLEDITOR_ELEMENT + '" type="hidden" />',

		initializer: function() {
			var instance = this;

			instance.after('calendar:dateClick', A.bind(instance._afterDateSelect, instance));
		},

		getElementsValue: function() {
			var instance = this;

			return instance.calendar.get('selectedDates');
		},

		formatDate: function (date) {
			var instance = this,
				mask = instance.get('dateFormat'),
				locale = instance.get('locale');

			return DataType.Date.format(date, { format: mask, locale: locale });
		},

		_afterDateSelect: function(event) {
			var instance = this,
				selectedDates = instance.calendar.get('selectedDates');

			instance.elements.val(AArray.invoke(selectedDates, 'getTime').join(_COMMA));
		},

		_afterRender: function() {
			var instance = this;

			A.DateCellEditor.superclass._afterRender.apply(instance, arguments);

			instance.calendar = new A.Calendar(
				instance.get(CALENDAR)
			)
			.render(instance.bodyNode);
		},

		_setCalendar: function(val) {
			var instance = this;

			return A.merge(
				{
					bubbleTargets: instance
				},
				val
			);
		},

		_uiSetValue: function(val) {
			var instance = this,
				calendar = instance.calendar,
				formatedValue;

			if (calendar) {

				if (!isArray(val)) {
					val = [val];
				}

				formatedValue = instance.formatValue(instance.get(OUTPUT_FORMATTER), val)

				calendar._clearSelection(); // Should be a public method
				calendar.set('date', formatedValue[0]);
				calendar.selectDates(formatedValue);
			}
		}
	}
});

A.DateCellEditor = DateCellEditor;

}, '@VERSION@' ,{skinnable:true, requires:['datatable-base','calendar','aui-datatype','aui-toolbar','aui-form-validator','overlay','sortable']});
AUI.add('aui-datatable-selection', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,
	isObject = Lang.isObject,

	CLASS_NAMES_SELECTION = 'CLASS_NAMES_SELECTION',

	ACTIVE_CELL = 'activeCell',
	ACTIVE_CELL_CHANGE = 'activeCellChange',
	ACTIVE_ROW = 'activeRow',
	BOUNDING_BOX = 'boundingBox',
	CELL = 'cell',
	CELL_INDEX = 'cellIndex',
	CHILDREN = 'children',
	FOCUSED = 'focused',
	KEY = 'key',
	MOUSEDOWN = 'mousedown',
	MOUSEENTER = 'mouseenter',
	MOUSEUP = 'mouseup',
	RENDER = 'render',
	SELECTION = 'selection',
	TABINDEX = 'tabindex',

	_DOT = '.',

	clamp = function(value, min, max) {
		return Math.min(Math.max(value, min), max);
	};

var DataTableSelection = function () {};

DataTableSelection.ATTRS = {
	activeCell: {
		setter: 'getCell'
	},

	activeRow: {
		setter: 'getRow'
	},

	selection: {
		setter: '_setSelection'
	},

	tabIndex: {
		value: 0
	}
};

A.mix(DataTableSelection.prototype, {
	_capturing: false,
	_selectionEnd: null,
	_selectionSeed: null,
	_selectionStart: null,

	initializer: function() {
		var instance = this,
			boundingBox = instance.get(BOUNDING_BOX);

		instance[CLASS_NAMES_SELECTION] = {
			cell: instance.getClassName(CELL),
			selection: instance.getClassName(SELECTION)
		};

		instance._bindSelectionUI();

		boundingBox.addClass(instance[CLASS_NAMES_SELECTION].selection);

	},

	destroy: function() {
		var instance = this;

		instance._selectionKeyHandler.detach();
	},

	captureSelection: function(coords) {
		var instance = this,
			cells = [],
			cols = [],
			records = [],
			rows = [],
			i;

		for (i = 0; i < coords.length; i++) {
			var c = coords[i],
				cell = instance.getCell(c);

			rows.push(c[0]);
			cells.push(cell);
			cols.push(instance.getColumn(cell));
		}

		rows = A.Array.unique(rows);
		cols = A.Array.unique(cols);

		for (i = 0; i < rows.length; i++) {
			rows[i] = instance.getRow(rows[i]);
			records[i] = instance.getRecord(rows[i]);
		}

		return {
			cells: cells,
			cols: cols,
			coords: coords,
			records: records,
			rows: rows
		};
	},

	getActiveColumn: function() {
		var instance = this;

		return instance.getColumn(instance.get(ACTIVE_CELL));
	},

	getActiveRecord: function() {
		var instance = this;

		return instance.getRecord(instance.get(ACTIVE_CELL));
	},

	getCoord: function(seed) {
		var instance = this,
			cell = instance.getCell(seed),
			tbody = instance.body.tbodyNode,
			rowIndexOffset = tbody.get('firstChild.rowIndex');

		return [ cell.get('parentNode.rowIndex') - rowIndexOffset, cell.get(CELL_INDEX) ];
	},

	_afterActiveCellChange: function(event) {
		var instance = this,
			activeCell = event.newVal;

		instance.set(ACTIVE_ROW, activeCell);

		if (activeCell) {
			activeCell.setAttribute(TABINDEX, 0).focus();
		}
	},

	_afterRender: function(event) {
		var instance = this;

		instance.set(ACTIVE_ROW, instance.get(ACTIVE_CELL));
	},

	_bindSelectionUI: function() {
		var instance = this,
			classNames = instance[CLASS_NAMES_SELECTION];

		instance._selectionKeyHandler = A.getDoc().on(KEY, A.bind(instance._onSelectionKey, instance), 'down:enter,37,38,39,40');

		instance.after(RENDER, instance._afterRender);
		instance.after(ACTIVE_CELL_CHANGE, instance._afterActiveCellChange);
		instance.delegate(MOUSEUP, A.bind(instance._onSelectionMouseUp, instance), _DOT+classNames.cell);
		instance.delegate(MOUSEDOWN, A.bind(instance._onSelectionMouseDown, instance), _DOT+classNames.cell);
		instance.delegate(MOUSEENTER, A.bind(instance._onSelectionMouseEnter, instance), _DOT+classNames.cell);
	},

	_onSelectionMouseDown: function(event) {
		var instance = this,
			seed = event.currentTarget,
			boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.unselectable();

		instance._capturing = true;
		instance._selectionSeed = seed;
		instance._selectionStart = instance._selectionEnd = instance.getCoord(seed);

		instance.set(ACTIVE_CELL, seed);
	},

	_onSelectionMouseEnter: function(event) {
		var instance = this,
			seed = event.currentTarget;

		if (!instance._capturing) {
			return;
		}

		instance._selectionSeed = seed;
		instance._selectionEnd = instance.getCoord(seed);

		instance.set(SELECTION, {
			start: instance._selectionStart,
			end: instance._selectionEnd
		});
	},

	_onSelectionMouseUp: function(event) {
		var instance = this,
			boundingBox = instance.get(BOUNDING_BOX);

		if (instance.get(FOCUSED)) {
			instance._selectionEnd = instance.getCoord(instance._selectionSeed);

			instance.set(SELECTION, {
				start: instance._selectionStart,
				end: instance._selectionEnd
			});
		}

		boundingBox.selectable();

		instance._capturing = false;
	},

	_onSelectionKey: function(event) {
		var instance = this,
			body = instance.body,
			tbody = body.tbodyNode,
			keyCode = event.keyCode,
			activeCell = instance.get(ACTIVE_CELL),
			activeCoord,
			imax = tbody.get(CHILDREN).size(),
			jmax = body.get('columns').length,
			i,
			j;

		if (activeCell && instance.get(FOCUSED)) {
			activeCoord = instance.getCoord(activeCell);

			i = activeCoord[0];
			j = activeCoord[1];

			if (keyCode === 37) {
				j--;
			}
			else if (keyCode === 38) {
				i--;
			}
			else if (keyCode === 39) {
				j++;
			}
			else if (keyCode === 40) {
				i++;
			}

			i = clamp(i, 0, imax-1);
			j = clamp(j, 0, jmax-1);

			instance.set(ACTIVE_CELL, [i, j]);

			instance.set(SELECTION, [i, j]);

			event.preventDefault();
		}
	},

	_parseRange: function(val) {
		var c1 = val[0],
			c2 = val[1],
			coords = [],
			i,
			j;

		for (i = Math.min(c1[0], c2[0]); i <= Math.max(c1[0], c2[0]); i++) {
			for (j = Math.min(c1[1], c2[1]); j <= Math.max(c1[1], c2[1]); j++) {
				coords.push([i,j]);
			}
		}

		return coords;
	},

	_setSelection: function(val) {
		var instance = this;

		if (isArray(val)) {
			if (!isArray(val[0])) {
				val = [val];
			}
		}
		else if (isObject(val)) {
			val = instance._parseRange([val.start, val.end]);
		}
		else if (A.instanceOf(val, A.Node)) {
			val = [instance.getCoord(val)];
		}

		return instance.captureSelection(val);
	}
});

A.DataTable.Selection = DataTableSelection;

A.Base.mix(A.DataTable, [ DataTableSelection ]);

A.DataTable.prototype.getColumn = (function (original) {
	return function (seed) {
		var cell;

		if (A.instanceOf(seed, A.Node)) {
			cell = this.getCell(seed);

			seed = cell && (cell.get('className').match(
				new RegExp(this.getClassName('col', '(\\w+)'))) || [])[1];
		}

		return original.call(this, seed);
	};
}(A.DataTable.prototype.getColumn));

// Add support to get a row by seed on DataTable getRow
// See http://yuilibrary.com/projects/yui3/ticket/2532605

A.DataTable.prototype.getRow = (function (original) {
	return function (seed) {
		var instance = this,
			tbody = instance.body.tbodyNode,
			row;

		if (A.instanceOf(seed, A.Node)) {
			row = seed.ancestor(function (node) {
				return node.get('parentNode').compareTo(tbody);
			}, true);

			return row;
		}
		else {
			return original.call(this, seed);
		}
	};
}(A.DataTable.prototype.getRow));

// DataTable columns configuration breaks on n-depth cloning complex objects
// See http://yuilibrary.com/projects/yui3/ticket/2532597

A.DataTable.prototype._setColumns = function (val) {
	var keys = {},
		known = [],
		knownCopies = [],
		arrayIndex = A.Array.indexOf,
		isArray = A.Lang.isArray;

	function copyObj(o) {
		var copy = {},
			key, val, i;

		known.push(o);
		knownCopies.push(copy);

		for (key in o) {
			if (o.hasOwnProperty(key)) {
				val = o[key];

				if (isArray(val)) {
					copy[key] = val.slice();
				// Patch is right here, the second condition
				} else if (isObject(val, true) && val.constructor === copy.constructor) {
					i = arrayIndex(val, known);

					copy[key] = i === -1 ? copyObj(val) : knownCopies[i];
				} else {
					copy[key] = o[key];
				}
			}
		}

		return copy;
	}

	function genId(name) {
		// Sanitize the name for use in generated CSS classes.
		// TODO: is there more to do for other uses of _id?
		name = name.replace(/\s+/, '-');

		if (keys[name]) {
			name += (keys[name]++);
		} else {
			keys[name] = 1;
		}

		return name;
	}

	function process(cols, parent) {
		var columns = [],
			i, len, col, yuid;

		for (i = 0, len = cols.length; i < len; ++i) {
			columns[i] = // chained assignment
			col = isString(cols[i]) ? { key: cols[i] } : copyObj(cols[i]);

			yuid = A.stamp(col);

			// For backward compatibility
			if (!col.id) {
				// Implementers can shoot themselves in the foot by setting
				// this config property to a non-unique value
				col.id = yuid;
			}
			if (col.field) {
				// Field is now known as "name" to avoid confusion with data
				// fields or schema.resultFields
				col.name = col.field;
			}

			if (parent) {
				col._parent = parent;
			} else {
				delete col._parent;
			}

			// Unique id based on the column's configured name or key,
			// falling back to the yuid.  Duplicates will have a counter
			// added to the end.
			col._id = genId(col.name || col.key || col.id);

			if (isArray(col.children)) {
				col.children = process(col.children, col);
			}
		}

		return columns;
	}

	return val && process(val);
};

}, '@VERSION@' ,{skinnable:true, requires:['datatable-base']});
AUI.add('aui-datatable-highlight', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,

	ACTIVE = 'active',
	ACTIVE_BORDER_WIDTH = 'activeBorderWidth',
	ACTIVE_CELL = 'activeCell',
	ACTIVE_ROW = 'activeRow',
	ACTIVE_ROW_CHANGE = 'activeRowChange',
	BORDER = 'border',
	CELL = 'cell',
	CELLS = 'cells',
	CHILDREN = 'children',
	HIGHLIGHT = 'highlight',
	HIGHLIGHT_RANGE = 'highlightRange',
	HOST = 'host',
	OVERLAY = 'overlay',
	OVERLAY_ACTIVE_NODE = 'overlayActiveNode',
	OVERLAY_NODE = 'overlayNode',
	RANGE_BORDER_WIDTH = 'rangeBorderWidth',
	REGION = 'region',
	ROWS = 'rows',
	SELECTION_CHANGE = 'selectionChange',
	TYPE = 'type',

	_SPACE = ' ',

	_setCSSClockwiseRule = function(val) {
		var instance = this,
			i = 0,
			len;

		if (isString(val)) {
			val = Lang.trim(val).replace(/\s+/g, ' ').split(_SPACE);
		}
		else if (!isArray(val)) {
			val = A.Array(val);
		}

		for (len = 4 - val.length; i < len; i++) {
			val.push(val[i]);
		}

		return A.Array.map(val, parseFloat);
	};

var DataTableHighlight = A.Base.create(
	'datatable-highlight',
	A.Plugin.Base, [],
	{
		CLASS_NAMES: null,

		TPL_FRAME: '<div class="{overlay}">' +
						'<div class="{border}"></div>' +
						'<div class="{border}"></div>' +
						'<div class="{border}"></div>' +
						'<div class="{border}"></div>' +
					'</div>',

		_nodes: null,

		initializer: function() {
			var instance = this,
				host = instance.get(HOST);

			instance.CLASS_NAMES = {
				active: host.getClassName(ACTIVE),
				border: host.getClassName(HIGHLIGHT, BORDER),
				highlight: host.getClassName(HIGHLIGHT),
				overlay: host.getClassName(HIGHLIGHT, OVERLAY),
				overlayActive: host.getClassName(HIGHLIGHT, OVERLAY, ACTIVE)
			};

			instance.afterHostEvent(ACTIVE_ROW_CHANGE, instance._afterActiveRowChange);
			instance.afterHostEvent(SELECTION_CHANGE, instance._afterSelectionChange);
		},

		clear: function() {
			var instance = this,
				host = instance.get(HOST),
				activeCell = host.get(ACTIVE_CELL);

			if (activeCell) {
				activeCell.removeClass(instance.CLASS_NAMES.active);
			}

			instance._clearBorders();
			instance._clearHighlights();
		},

		getActiveRegion: function() {
			var instance = this,
				host = instance.get(HOST),
				type = instance.get(TYPE),
				region = null,
				activeNode;

			if (type === ROWS) {
				activeNode = host.get(ACTIVE_ROW);
			}
			else {
				activeNode = host.get(ACTIVE_CELL);
			}

			if (activeNode) {
				region = activeNode.get(REGION);
			}

			return region;
		},

		getSelectionRegion: function() {
			var instance = this,
				nodes = instance._nodes,
				r1 = nodes[0].get(REGION),
				r2 = nodes[nodes.length-1].get(REGION);

			return {
				0: r1.top,
				1: r1.left,
				bottom: r2.bottom,
				height: r2.bottom - r1.top,
				left: r1.left,
				right: r2.right,
				top: r1.top,
				width: r2.right - r1.left
			};
		},

		_afterActiveRowChange: function(event) {
			var instance = this,
				activeBorderWidth = instance.get(ACTIVE_BORDER_WIDTH),
				overlayActiveNode = instance.get(OVERLAY_ACTIVE_NODE),
				classNames = instance.CLASS_NAMES;

			if (!instance.get(TYPE)) {
				return;
			}

			instance.clear();

			if (event.prevVal) {
				event.prevVal.removeClass(classNames.active);
			}

			if (event.newVal) {
				instance._alignBorder(
					overlayActiveNode, instance.getActiveRegion(),
					activeBorderWidth);

				event.newVal.addClass(classNames.active);
			}
		},

		_afterSelectionChange: function(event) {
			var instance = this,
				nodes,
				highlightRange = instance.get(HIGHLIGHT_RANGE),
				overlayNode = instance.get(OVERLAY_NODE),
				rangeBorderWidth = instance.get(RANGE_BORDER_WIDTH);

			if (!instance.get(TYPE)) {
				return;
			}

			instance._clearHighlights();

			nodes = instance._collectNodes(event.newVal);

			if (highlightRange && nodes && (nodes.length > 1)) {
				instance._alignBorder(
					overlayNode, instance.getSelectionRegion(), rangeBorderWidth);

				A.Array.each(nodes, function(node) {
					node.addClass(instance.CLASS_NAMES.highlight);
				});
			}
		},

		_alignBorder: function(overlayNode, region, borderWidth) {
			var instance = this,
				host = instance.get(HOST);

			host._tableNode.appendChild(overlayNode);

			if (region) {
				var borders = overlayNode.get(CHILDREN),
					t = borders.item(0),
					r = borders.item(1),
					b = borders.item(2),
					l = borders.item(3);

				overlayNode.setXY([region.left, region.top]);

				t.sizeTo(region.width, borderWidth[0]);
				l.sizeTo(borderWidth[3], region.height - borderWidth[2]);
				b.sizeTo(region.width, borderWidth[2]);
				r.sizeTo(borderWidth[1], region.height - borderWidth[2]);

				t.setXY([region.left, region.top]);
				l.setXY([region.left, region.top]);
				b.setXY([region.left, region.bottom - borderWidth[2]]);
				r.setXY([region.right - borderWidth[1], region.top]);
			}
		},

		_collectNodes: function(selection) {
			var instance = this,
				type = instance.get(TYPE);

			if (!type || !selection) {
				return null;
			}

			return (instance._nodes = selection[type]);
		},

		_clearBorders: function() {
			var instance = this;

			instance.get(OVERLAY_NODE).remove();
			instance.get(OVERLAY_ACTIVE_NODE).remove();
		},

		_clearHighlights: function() {
			var instance = this;

			A.Array.each(instance._nodes, function(node) {
				node.removeClass(instance.CLASS_NAMES.highlight);
			});
		},

		_validateType: function (val) {
			return (val === CELLS || val === ROWS || val === null);
		}
	},
	{
		NS: HIGHLIGHT,

		NAME: 'datatable-highlight',

		ATTRS: {
			activeBorderWidth: {
				setter: _setCSSClockwiseRule,
				value: 2
			},

			overlayActiveNode: {
				setter: function(val) {
					var instance = this,
						classNames = instance.CLASS_NAMES;

					if (!val) {
						val = A.Node.create(Lang.sub(instance.TPL_FRAME, classNames));

						val.addClass(classNames.overlayActive);
					}

					return val;
				},
				value: null
			},

			overlayNode: {
				setter: function(val) {
					var instance = this;

					if (!val) {
						val = A.Node.create(Lang.sub(instance.TPL_FRAME, instance.CLASS_NAMES));
					}

					return val;
				},
				value: null
			},

			highlightRange: {
				validator: isBoolean,
				value: true
			},

			rangeBorderWidth: {
				setter: _setCSSClockwiseRule,
				value: 1
			},

			type: {
				validator: '_validateType',
				value: CELLS
			}
		}
	}
);

A.namespace('Plugin').DataTableHighlight = DataTableHighlight;

}, '@VERSION@' ,{skinnable:true, requires:['aui-datatable-selection']});


AUI.add('aui-datatable', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-datatable-edit','aui-datatable-selection','aui-datatable-highlight']});

