var Lang = A.Lang,
	AArray = A.Array,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,
	LString = Lang.String,

	_toInitialCap = A.cached(function(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }),

	isBaseEditor = function(val) {
		return (val instanceof A.BaseCellEditor);
	},

	WidgetStdMod = A.WidgetStdMod,
	AgetClassName = A.getClassName,

	BASE_CELL_EDITOR = 'baseCellEditor',
	BOUNDING_BOX = 'boundingBox',
	CALENDAR = 'calendar',
	CANCEL = 'cancel',
	CELL = 'cell',
	CELLEDITOR = 'celleditor',
	CHECKBOX_CELL_EDITOR = 'checkboxCellEditor',
	CHECKED = 'checked',
	CLICK = 'click',
	COLUMNSET = 'columnset',
	CONTENT_BOX = 'contentBox',
	DATA = 'data',
	DATATABLE = 'datatable',
	DATE_CELL_EDITOR = 'dateCellEditor',
	DISK = 'disk',
	DROP_DOWN_CELL_EDITOR = 'dropDownCellEditor',
	EDITABLE = 'editable',
	EDITOR = 'editor',
	EDIT_EVENT = 'editEvent',
	ELEMENT = 'element',
	ELEMENT_NAME = 'elementName',
	FIELD = 'field',
	HIDE_ON_SAVE = 'hideOnSave',
	ID = 'id',
	INIT_TOOLBAR = 'initToolbar',
	INIT_VALIDATOR = 'initValidator',
	INPUT_FORMATTER = 'inputFormatter',
	KEY = 'key',
	LABEL = 'label',
	MOUSEDOWN = 'mousedown',
	MULTIPLE = 'multiple',
	NAME = 'name',
	OPTION = 'option',
	OPTIONS = 'options',
	OPTIONS_CELL_EDITOR = 'optionsCellEditor',
	OUTPUT_FORMATTER = 'outputFormatter',
	RADIO_CELL_EDITOR = 'radioCellEditor',
	RECORDS = 'records',
	RECORDSET = 'recordset',
	RENDERED = 'rendered',
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
	VISIBLE = 'visible',
	WRAPPER = 'wrapper',

	_COMMA = ',',
	_EMPTY_STR = '',
	_HASH = '#',
	_NL = '\n',

	REGEX_BR = /<br\s*\/?>/gi,
	REGEX_NL = /[\r\n]/g,

	CSS_CELLEDITOR_ELEMENT = AgetClassName(CELLEDITOR, ELEMENT),
	CSS_CELLEDITOR_LABEL = AgetClassName(CELLEDITOR, LABEL),
	CSS_CELLEDITOR_OPTION = AgetClassName(CELLEDITOR, OPTION),
	CSS_CELLEDITOR_WRAPPER = AgetClassName(CELLEDITOR, WRAPPER),
	CSS_DATATABLE_EDITABLE = AgetClassName(DATATABLE, EDITABLE),

	TPL_BR = '<br/>';

/**
 * An extension for A.DataTable.Base to support Cell Editing:
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

CellEditorSupport.ATTRS = {
	editEvent: {
		setter: '_setEditEvent',
		validator: isString,
		value: CLICK
	}
};

A.mix(CellEditorSupport.prototype, {
	activeColumnIndex: -1,
	activeRecordIndex: -1,

	initializer: function() {
		var instance = this;

		instance.after({
			render: instance._afterRenderEditor
		});

		instance.on(instance.get(EDIT_EVENT), instance._onCellEdit);

		instance.after(instance._afterUiSetRecordset, instance, '_uiSetRecordset');
	},

	getActiveColumn: function() {
		var instance = this;

		return instance.get(COLUMNSET).getColumn(instance.activeColumnIndex);
	},

	getActiveRecord: function() {
		var instance = this;

		return instance.get(RECORDSET).getRecord(instance.activeRecordIndex);
	},

	getCellEditor: function(record, column) {
		var instance = this;
		var columnEditor = column.get(EDITOR);
		var recordEditor = record.get(DATA).editor;

		if (columnEditor === false) {
			return null;
		}

		return recordEditor || columnEditor;
	},

	getRecordColumnValue: function(record, column) {
		return record.getValue(column.get(FIELD));
	},

	syncEditableColumnsUI: function() {
		var instance = this;
		var columnset = instance.get(COLUMNSET);
		var recordset = instance.get(RECORDSET);

		A.each(columnset.idHash, function(column) {
			var editor = column.get(EDITOR);

			if (isBaseEditor(editor)) {
				A.all('[headers='+column.get(ID)+']').addClass(CSS_DATATABLE_EDITABLE);
			}
		});

		A.each(recordset.get(RECORDS), function(record) {
			var editor = record.get(DATA).editor;

			if (isBaseEditor(editor)) {
				A.all(_HASH + record.get("id") + '>td').each(function(td, index) {
					var column = columnset.getColumn(index);

					if (column.get(EDITOR) !== false) {
						td.addClass(CSS_DATATABLE_EDITABLE);
					}
				});
			}
		});
	},

	_afterUiSetRecordset: function(event) {
		var instance = this;

		instance.syncEditableColumnsUI();
	},

	_afterRenderEditor: function(event) {
		var instance = this;

		if (!instance.events) {
			instance.plug(A.Plugin.DataTableEvents);
		}
	},

	_editCell: function(event) {
		var instance = this;
		var columnset = instance.get(COLUMNSET);
		var recordset = instance.get(RECORDSET);
		var column = event.column;
		var record = event.record;

		instance.activeColumnIndex = columnset.getColumnIndex(column);
		instance.activeRecordIndex = recordset.getRecordIndex(record);

		var alignNode = event.alignNode || event.cell;
		var editor = instance.getCellEditor(record, column);

		if (isBaseEditor(editor)) {
			if (!editor.get(RENDERED)) {
				editor.on({
					visibleChange: A.bind(instance._onEditorVisibleChange, instance),
					save: A.bind(instance._onEditorSave, instance)
				});

				editor.render();
			}

			editor.set(
				VALUE,
				instance.getRecordColumnValue(record, column)
			);

			editor.show().move(alignNode.getXY());
		}
	},

	_onCellEdit: function(event) {
		var instance = this;

		instance._editCell(event);
	},

	_onEditorVisibleChange: function(event) {
		var instance = this;
		var selection = instance.selection;

		if (selection) {
			var activeRecord = instance.getActiveRecord();
			var activeColumn = instance.getActiveColumn();
			var cell = instance.getCellNode(activeRecord, activeColumn);
			var row = instance.getRowNode(activeRecord);

			selection.select(cell, row);
		}
	},

	_onEditorSave: function(event) {
		var instance = this;
		var editor = event.currentTarget;
		var recordset = instance.get(RECORDSET);

		editor.set(VALUE, event.newVal);

		recordset.updateRecordDataByKey(
			instance.getActiveRecord(),
			instance.getActiveColumn().get(KEY),
			event.newVal
		);

		instance.set(RECORDSET, recordset);
	},

	_setEditEvent: function(val) {
		return CELL + _toInitialCap(val);
	}
});

A.DataTable.CellEditorSupport = CellEditorSupport;

// Augment A.DataTable.Base with A.DataTable.CellEditorSupport
A.DataTable.Base = A.Base.create('dataTable', A.DataTable.Base, [A.DataTable.CellEditorSupport]);

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

	UI_ATTRS: [ SHOW_TOOLBAR, VALUE ],

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

			instance.toolbar = new A.Toolbar(
				instance.get(TOOLBAR)
			)
			.render(instance.footerNode);
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

			instance.set(
				VISIBLE,
				boundingBox.contains(event.target)
			);
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

		_syncElementsName: function() {
			var instance = this;

			instance.elements.setAttribute(
				NAME,
				instance.get(ELEMENT_NAME)
			);
		},

		_uiSetValue: function(val) {
			var instance = this;
			var elements = instance.elements;

			if (elements) {
				elements.val(
					instance.formatValue(instance.get(OUTPUT_FORMATTER), val)
				);

				A.later(100, elements, elements.selectText);
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
		}
	},

	EXTENDS: A.BaseCellEditor,

	UI_ATTRS: [OPTIONS],

	prototype: {
		options: null,

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
					optionsBuffer.push(A.substitute(optionTpl, values));
				}

				if (optionWrapperTpl) {
					wrappersBuffer.push(A.substitute(optionWrapperTpl, values));
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

		_uiSetOptions: function(val) {
			var instance = this;

			instance._createOptions(val);
			instance._syncElementsName();
		},

		_uiSetValue: function(val) {
			var instance = this;
			var options = instance.options;

			if (options && options.size()) {
				options.set(instance.get(SELECTED_ATTR_NAME), false);

				AArray.each(AArray(val), function(value) {
					options.filter('[value="' + value + '"]').set(instance.get(SELECTED_ATTR_NAME), true);
				});
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
		ELEMENT_TEMPLATE: '<input class="' + CSS_CELLEDITOR_ELEMENT + '" type="text" />'
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
		OPTION_TEMPLATE: '<input class="yui3-aui-field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',

		getElementsValue: function() {
			var instance = this;

			return instance._getSelectedOptions().get(VALUE)[0];
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
		}
	},

	prototype: {
		ELEMENT_TEMPLATE: '<input class="' + CSS_CELLEDITOR_ELEMENT + '" type="hidden" />',

		initializer: function() {
			var instance = this;

			instance.on('calendar:select', A.bind(instance._onDateSelect, instance));
		},

		getElementsValue: function() {
			var instance = this;

			return instance.calendar.getFormattedSelectedDates().join(_COMMA);
		},

		_afterRender: function() {
			var instance = this;

			A.DateCellEditor.superclass._afterRender.apply(instance, arguments);

			instance.calendar = new A.Calendar(
				instance.get(CALENDAR)
			)
			.render(instance.bodyNode);
		},

		_onDateSelect: function(event) {
			var instance = this;

			instance.elements.val(
				event.date.formatted.join(_COMMA)
			);
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
			var instance = this;
			var calendar = instance.calendar;

			if (calendar) {
				if (val && isString(val)) {
					val = val.split(_COMMA);
				}

				instance.calendar.set('dates', val);
			}
		}
	}
});

A.DateCellEditor = DateCellEditor;