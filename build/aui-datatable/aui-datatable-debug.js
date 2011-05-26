AUI.add('aui-datatable-base', function(A) {
// DataTable component is beta, over-writing buggy logic on it before they get fixed on YUI

var Lang = A.Lang,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	CHILD_NODES = 'childNodes',
	COLUMNSET = 'columnset',
	DATA = 'data',
	HEADERS = 'headers',
	ID = 'id',

	_HASH = '#',
	_SPACE = ' ';

A.DataTable.Base = A.Base.create('datatable', A.DataTable.Base, [], {
	initializer: function() {
		var instance = this;

		instance.after('render', instance._afterRender);
		instance.after('recordsetChange', instance._afterRecordsetChangeExt);
	},

	getCellNode: function(record, column) {
		var instance = this;

		return instance.getRowNode(record).get(CHILD_NODES).item(column.keyIndex);
	},

	getColumnByCell: function(cell) {
		var instance = this;
		var dataHeaderId = cell.getAttribute(HEADERS).split(_SPACE).pop() || cell.get(ID);

		return instance.get(COLUMNSET).getColumn(dataHeaderId);
	},

	getColNode: function(cell) {
		var instance = this;
		var index = instance.get(COLUMNSET).getColumnIndex(instance.getColumnByCell(cell));

		return instance._colgroupNode.get(CHILD_NODES).item(index);
	},

	getRowNode: function(record) {
		return A.one(_HASH+record.get(ID));
	},

	_afterRender: function() {
		var instance = this;

		instance._bindPluginsEvents();
		instance._fixPluginsUI();
	},

	_afterRecordsetChangeExt: function(event) {
		var instance = this;

		instance._fixPluginsUI();
	},

	_bindPluginsEvents: function() {
		var instance = this;
		var sort = instance.sort;

		if (sort) {
			sort.after('lastSortedByChange', A.bind(instance._fixPluginsUI, instance));
		}
	},

	_fixPluginsUI: function() {
		var instance = this;
		var sort = instance.sort;
		var scroll = instance.scroll;

		if (sort && scroll) {
			scroll.syncUI();

			// Workaround: Invoke _syncWidths twice from DataTableScroll, otherwise it's misscalculating the paddings for the sortable columns.
			// TODO: Fix this on DataTable DataTableScroll
			scroll._syncWidths();
		}
	}
}, {});

A.Columnset = A.Base.create('columnset', A.Columnset, [], {
	getColumn: function(i) {
		var instance = this;

		if (isString(i)) {
			return this.idHash[i];
		}
		else if (isNumber(i)) {
			return instance.keys[i];
		}

		return null;
	},

	getColumnIndex: function(column) {
		return column.keyIndex;
	},

	getLength: function() {
		var instance = this;

		return instance.keys.length;
	},

	_setDefinitions: function(val) {
		return val;
	}
}, {});

A.Recordset = A.Base.create('recordset', A.Recordset, [], {
	getRecordByRow: function(row) {
		var instance = this;

		return instance.getRecord(row.get(ID));
	},

	getRecordIndex: function(record) {
		var instance = this;

		return A.Array.indexOf(instance._items, record);
	},

	updateRecordDataByKey: function(record, key, value) {
		var instance = this;
		var data = record.get(DATA);

		if (data) {
			data[key] = value;
			record.set(DATA, data);
		}

		instance.update(record, instance.getRecordIndex(record));
	}
}, {});

}, '@VERSION@' ,{requires:['aui-base','datatable','plugin']});
AUI.add('aui-datatable-events', function(A) {
// TODO - optimize code

var Lang = A.Lang,
	isArray = Lang.isArray,
	isObject = Lang.isObject,
	isValue = Lang.isValue,

	Aeach = A.Array.each,
	getObjectKeys = A.Object.keys,
	getObjectValues = A.Object.values,
	selectorTest = A.Selector.test,
	YgetClassName = A.ClassNameManager.getClassName,

	_toInitialCap = A.cached(function(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }),

	_getEvtType = A.cached(function(tagName, eventType) {
		return tagName + _toInitialCap(eventType.toLowerCase());
	}),

	BOUNDING_BOX = 'boundingBox',
	CELL = 'cell',
	CELL_SELECTOR = 'cellSelector',
	CLICK = 'click',
	COLUMN = 'column',
	DBLCLICK = 'dblclick',
	EVENTS = 'events',
	HEADER = 'header',
	HOST = 'host',
	IN_HEAD = 'inHead',
	KEYDOWN = 'keydown',
	KEYUP = 'keyup',
	LINER = 'liner',
	MOUSEDOWN = 'mousedown',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	MOUSEUP = 'mouseup',
	RECORDSET = 'recordset',
	ROW = 'row',
	TABLE = 'table',
	TAGS = 'tags',
	TAG_NAME = 'tagName',
	TBODY = 'tbody',
	THEAD = 'thead',
	TR = 'tr',
    DATATABLE = 'datatable',

	_COMMA = ',',
	_DOT = '.',

	CSS_DATATABLE_LINER = YgetClassName(DATATABLE, LINER);

var DataTableEvents = A.Base.create("dataTableEvents", A.Plugin.Base, [], {
	_bubbling: false,
	_handler: null,
	_tagsFilter: null,

     initializer: function(config) {
		var instance = this;
		var tags = instance.get(TAGS);

		instance._tagsFilter = getObjectKeys(tags).join(_COMMA);

		instance._initEvents();
    },

	destructor: function() {
		var instance = this;
		var handler = instance._handler;

		if (handler) {
			handler.detach();
		}
	},

	getEvtPayload: function(node, originalEvent) {
		var instance = this;
		var host = instance.get(HOST);
		var thead  = host._theadNode;

		var inHead = node.getData(IN_HEAD);
		var liner = node.getData(LINER);
		var row = node.getData(ROW);

		if (!isValue(inHead)) {
			inHead = thead.contains(node);
			node.setData(IN_HEAD, inHead);
		}

		if (!isValue(liner)) {
			liner = node.one(_DOT+CSS_DATATABLE_LINER);
			node.setData(LINER, liner);
		}

		if (!isValue(row)) {
			row = node.ancestor(TR);
			node.setData(ROW, row);
		}

		return {
			cell: node,
			column: host.getColumnByCell(node),
			inHead: inHead,
			liner: liner,
			originalEvent: originalEvent,
			row: row,
			record: host.get(RECORDSET).getRecordByRow(row)
		};
	},

	_filterBubble: function(target) {
		var instance = this;
		var host = instance.get(HOST);
		var container = host._tableNode.getDOM();

		var nodes = [];

		while (target) {
			var isContainer = (target === container);

			if (selectorTest(target, instance._tagsFilter, (isContainer ? null : container))) {
				nodes.push(target);
			}

			if (isContainer) {
				break;
			}

			target = target.parentNode;
		}

		// Adding respective col node to the nodes array in such a way
		// that the bubble order is: (td|th), tr, col, (tbody|thead) and table.
		if (nodes.length) {
			var column = host.getColNode(A.one(nodes[0]));

			if (column) {
				nodes.splice(2, 0, column.getDOM());
			}
		}

		return nodes;
	},

	_handleEvents: function(event) {
		var i, length;
		var instance = this;
		var host = instance.get(HOST);
		var tags = instance.get(TAGS);
		var currentTarget = event.currentTarget;

		var nodes = instance._filterBubble(currentTarget.getDOM());

		var payload = instance.getEvtPayload(currentTarget, event);

		instance._bubbling = true;

		for (i = 0, length = nodes.length; (i < length) && instance._bubbling; i++) {
			var node = A.one(nodes[i]);
			var propertyName = tags[node.get(TAG_NAME).toLowerCase()];

			payload.node = node;
			payload.property = propertyName;

			host.fire(
				_getEvtType(propertyName, event.type),
				payload
			);
		}
	},

	_initEvents: function() {
		var instance = this;
		var host = instance.get(HOST);
		var tags = instance.get(TAGS);
		var events = instance.get(EVENTS);

		var publish = {};

		Aeach(getObjectValues(tags), function(propertyName) {
			Aeach(events, function(eventType) {
				var newEventType = _getEvtType(propertyName, eventType);

				publish[newEventType] = {
					stoppedFn: A.bind(instance._stopBubble, instance)
				};
			});
		});

		host.publish(publish);

		instance._handler = host.get(BOUNDING_BOX).delegate(events, A.bind(instance._handleEvents, instance), instance.get(CELL_SELECTOR));
	},

	_stopBubble: function() {
		var instance = this;

		instance._bubbling = false;
	}
},
{
    NS: "events",

    NAME: "dataTableEvents",

    ATTRS: {
		cellSelector: {
			value: 'td,th',
			writeOnce: true
		},

		events: {
			validator: isArray,
            value: [ CLICK, DBLCLICK, KEYDOWN, KEYUP, MOUSEDOWN, MOUSEENTER, MOUSELEAVE, MOUSEUP ]
        },

		tags: {
			validator: isObject,
			value: {
				col: COLUMN,
				table: TABLE,
				thead: THEAD,
				tbody: TBODY,
				tr: ROW,
				th: HEADER,
				td: CELL
			},
			writeOnce: true
		}
    }
});

A.namespace("Plugin").DataTableEvents = DataTableEvents;

}, '@VERSION@' ,{requires:['aui-datatable-base']});
AUI.add('aui-datatable-edit', function(A) {
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

	ADD = 'add',
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
	DELETE = 'delete',
	DELETE_SELECTED_OPTIONS = 'deleteSelectedOptions',
	DISK = 'disk',
	DROP_DOWN_CELL_EDITOR = 'dropDownCellEditor',
	EDIT = 'edit',
	EDITABLE = 'editable',
	EDITOR = 'editor',
	EDIT_EVENT = 'editEvent',
	ELEMENT = 'element',
	ELEMENT_NAME = 'elementName',
	FIELD = 'field',
	HIDE = 'hide',
	HIDE_ON_SAVE = 'hideOnSave',
	ID = 'id',
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
	OPTION = 'option',
	OPTIONS = 'options',
	OPTIONS_CELL_EDITOR = 'optionsCellEditor',
	OUTPUT_FORMATTER = 'outputFormatter',
	PENCIL = 'pencil',
	RADIO_CELL_EDITOR = 'radioCellEditor',
	RECORDS = 'records',
	RECORDSET = 'recordset',
	RENDERED = 'rendered',
	RETURN = 'return',
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
	_DOT = '.',
	_EMPTY_STR = '',
	_HASH = '#',
	_NL = '\n',
	_SPACE = ' ',

	REGEX_BR = /<br\s*\/?>/gi,
	REGEX_NL = /[\r\n]/g,

	CSS_CELLEDITOR_EDIT = AgetClassName(CELLEDITOR, EDIT),
	CSS_CELLEDITOR_EDIT_ADD_OPTION = AgetClassName(CELLEDITOR, EDIT, ADD, OPTION),
	CSS_CELLEDITOR_EDIT_DELETE_OPTION = AgetClassName(CELLEDITOR, EDIT, DELETE, OPTION),
	CSS_CELLEDITOR_EDIT_HIDE_OPTION = AgetClassName(CELLEDITOR, EDIT, HIDE, OPTION),
	CSS_CELLEDITOR_EDIT_INPUT_NAME = AgetClassName(CELLEDITOR, EDIT, INPUT, NAME),
	CSS_CELLEDITOR_EDIT_INPUT_VALUE = AgetClassName(CELLEDITOR, EDIT, INPUT, VALUE),
	CSS_CELLEDITOR_EDIT_LINK = AgetClassName(CELLEDITOR, EDIT, LINK),
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

		_defInitEditFn: function(event) {
		},

		_syncElementsName: function() {
			var instance = this;

			instance.elements.setAttribute(
				NAME,
				instance.get(ELEMENT_NAME)
			);
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

				A.later(30, elements, elements.selectText);
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
				deleteSelectedOptions: 'Delete selected option(s)?',
				edit: 'Edit options',
				save: 'Save',
				stopEditing: 'Stop editing'
			}
		}
	},

	EXTENDS: A.BaseCellEditor,

	UI_ATTRS: [OPTIONS],

	prototype: {
		EDIT_TEMPLATE: '<div class="' + CSS_CELLEDITOR_EDIT + '">' +
							'<a class="' + [ CSS_CELLEDITOR_EDIT_LINK, CSS_CELLEDITOR_EDIT_DELETE_OPTION ].join(_SPACE) + '" href="javascript:void(0);">{deleteSelectedOptions}</a>' +
							'<input class="' + CSS_CELLEDITOR_EDIT_INPUT_NAME + '" size="7" placeholder="Name" title="Name" type="text" /> ' +
							'<input class="' + CSS_CELLEDITOR_EDIT_INPUT_VALUE + '" size="7" placeholder="Value" title="Value" type="text" /> ' +
							'<a class="' + [ CSS_CELLEDITOR_EDIT_LINK, CSS_CELLEDITOR_EDIT_ADD_OPTION ].join(_SPACE) + '" href="javascript:void(0);">{add}</a> ' +
							'<a class="' + [ CSS_CELLEDITOR_EDIT_LINK, CSS_CELLEDITOR_EDIT_HIDE_OPTION ].join(_SPACE) + '" href="javascript:void(0);">{stopEditing}</a>' +
						'</div>',

		editContainer: null,
		editInputName: null,
		editInputValue: null,
		options: null,

		initializer: function() {
			var instance = this;

			instance.on(EDIT, instance._onEditEvent);
			instance.after(INIT_TOOLBAR, instance._afterInitToolbar);
		},

		addCurrentOption: function() {
			var instance = this;
			var options = instance.get(OPTIONS);
			var option = instance.getCurrentOptionValue();

			if (option) {
				options[option.name] = option.value;

				instance.set(OPTIONS, options);

				instance._uiSetValue(
					instance.get(VALUE)
				);

				instance.clearCurrentOption();
			}
			else {
				instance.editInputValue.selectText();
			}
		},

		clearCurrentOption: function() {
			var instance = this;

			if (instance.editContainer) {
				instance.editInputValue.val(_EMPTY_STR);
				instance.editInputName.val(_EMPTY_STR).selectText();
			}
		},

		deleteSelectedOptions: function() {
			var instance = this;
			var options = instance.get(OPTIONS);

			instance._getSelectedOptions().each(function(node) {
				var value = node.val();

				if (options.hasOwnProperty(value)) {
					delete options[value];
				}
			});

			instance.set(OPTIONS, options);

			instance._uiSetValue(
				instance.get(VALUE)
			);

			instance.clearCurrentOption();
		},

		getCurrentOptionValue: function() {
			var instance = this;

			if (instance.editContainer) {
				var optionName = instance.editInputName.val();
				var optionValue = instance.editInputValue.val();

				if (optionName && optionValue) {
					return {
						name: optionName,
						value: optionValue
					};
				}
			}

			return null;
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

		_defInitEditFn: function(event) {
			var instance = this;

			var editContainer = A.Node.create(
				Lang.sub(
					instance.EDIT_TEMPLATE,
					instance.getStrings()
				)
			);

			instance.setStdModContent(
				WidgetStdMod.BODY,
				editContainer.hide(),
				WidgetStdMod.AFTER
			);

			editContainer.delegate('click', A.bind(instance._onEditLinkClickEvent, instance), _DOT+CSS_CELLEDITOR_EDIT_LINK);
			editContainer.delegate('keydown', A.bind(instance._onEditKeyEvent, instance), INPUT);

			instance.editContainer = editContainer;
			instance.editInputName = editContainer.one(_DOT+CSS_CELLEDITOR_EDIT_INPUT_NAME);
			instance.editInputValue = editContainer.one(_DOT+CSS_CELLEDITOR_EDIT_INPUT_VALUE);
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

			instance.clearCurrentOption();
		},

		_onEditLinkClickEvent: function(event) {
			var instance = this;
			var currentTarget = event.currentTarget;

			if (currentTarget.test(_DOT+CSS_CELLEDITOR_EDIT_ADD_OPTION)) {
				instance.addCurrentOption();
			}
			else if (currentTarget.test(_DOT+CSS_CELLEDITOR_EDIT_HIDE_OPTION)) {
				instance.toggleEdit();
			}
			else if (currentTarget.test(_DOT+CSS_CELLEDITOR_EDIT_DELETE_OPTION)) {
				var confirmation = instance.getString(DELETE_SELECTED_OPTIONS);

				if (confirm(confirmation)) {
					instance.deleteSelectedOptions();
				}
			}

			event.halt();
		},

		_onEditKeyEvent: function(event) {
			var instance = this;

			if (event.isKey(RETURN)) {
				instance.addCurrentOption();

				event.halt();
			}
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

}, '@VERSION@' ,{requires:['aui-calendar','aui-datatable-events','aui-toolbar','aui-form-validator','overlay'], skinnable:true});
AUI.add('aui-datatable-selection', function(A) {
// TODO - add support for row/column selection

var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isString = Lang.isString,

	AgetClassName = A.getClassName,

	_toInitialCap = A.cached(function(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }),

	CELL = 'cell',
	COLUMNSET = 'columnset',
	COLUMNSET_CHANGE = 'columnsetChange',
	COLUMN_KEYDOWN = 'columnKeydown',
	DATATABLE = 'datatable',
	DOWN = 'down',
	ESC = 'esc',
	HOST = 'host',
	ID = 'id',
	LEFT = 'left',
	MOUSEDOWN = 'mousedown',
	MOUSE_EVENT = 'mouseEvent',
	MULTIPLE = 'multiple',
	RECORDSET = 'recordset',
	RECORDSET_CHANGE = 'recordsetChange',
	RETURN = 'return',
	RIGHT = 'right',
	ROW = 'row',
	SELECT = 'select',
	SELECTED = 'selected',
	SELECT_ROW = 'selectRow',
	TAB = 'tab',
	TABINDEX = 'tabindex',
	UP = 'up',

	CSS_DATATABLE_CELL_SELECTED = AgetClassName(DATATABLE, CELL, SELECTED),
	CSS_DATATABLE_ROW_SELECTED = AgetClassName(DATATABLE, ROW, SELECTED);

var DataTableSelection = A.Base.create("dataTableSelection", A.Plugin.Base, [], {
	selectedCellHash: null,
	selectedColumnHash: null,
	selectedRowHash: null,

	initializer: function() {
		var instance = this;

		instance.selectedCellHash = {};
		instance.selectedColumnHash = {};
		instance.selectedRowHash = {};

		instance.publish({
			select: {
				defaultFn: instance._defSelectFn
			}
		});

		instance.afterHostEvent(COLUMN_KEYDOWN, instance._afterKeyEvent);
		instance.afterHostEvent(instance.get(MOUSE_EVENT), instance._afterMouseEvent);
		instance.afterHostEvent(COLUMNSET_CHANGE, instance._afterHostColumnsetChange);
		instance.afterHostEvent(RECORDSET_CHANGE, instance._afterHostRecordsetChange);
	},

	isCellSelected: function(cell) {
		var instance = this;

		return instance.selectedCellHash[cell.get(ID)];
	},

	isColumnSelected: function(column) {
		// TODO
	},

	isRowSelected: function(row) {
		var instance = this;

		return instance.selectedRowHash[row.get(ID)];
	},

	select: function(cell, row) {
		var instance = this;

		if (cell) {
			instance.selectCell(cell);
		}

		if (instance.get(SELECT_ROW) && row) {
			instance.selectRow(row);
		}
	},

	selectCell: function(cell) {
		var instance = this;

		if (!instance.get(MULTIPLE)) {
			instance.unselectAllCells();
		}

		instance.selectedCellHash[cell.get(ID)] = cell;

		cell.setAttribute(TABINDEX, 0).focus();

		cell.addClass(CSS_DATATABLE_CELL_SELECTED);
	},

	selectColumn: function(row) {
		// TODO
	},

	selectRow: function(row) {
		var instance = this;

		if (!instance.get(MULTIPLE)) {
			instance.unselectAllRows();
		}

		instance.selectedRowHash[row.get(ID)] = row;

		row.addClass(CSS_DATATABLE_ROW_SELECTED);
	},

	toggleCell: function(cell, forceAdd) {
		var instance = this;

		if (forceAdd || !instance.isCellSelected(cell)) {
			instance.selectCell(cell);
		}
		else {
			instance.unselectCell(cell);
		}
	},

	toggleColumn: function(column, forceAdd) {
		// TODO
	},

	toggleRow: function(row, forceAdd) {
		var instance = this;

		if (forceAdd || !instance.isRowSelected(row)) {
			instance.selectRow(row);
		}
		else {
			instance.unselectRow(row);
		}
	},

	unselectCell: function(cell) {
		var instance = this;

		delete instance.selectedCellHash[cell.get(ID)];

		cell.removeAttribute(TABINDEX);

		cell.removeClass(CSS_DATATABLE_CELL_SELECTED);
	},

	unselectColumn: function(column) {
		// TODO
	},

	unselectRow: function(row) {
		var instance = this;

		delete instance.selectedRowHash[row.get(ID)];

		row.removeClass(CSS_DATATABLE_ROW_SELECTED);
	},

	unselectAllCells: function() {
		var instance = this;

		A.each(instance.selectedCellHash, A.bind(instance.unselectCell, instance));
	},

	unselectAllColumns: function() {
		// TODO
	},

	unselectAllRows: function() {
		var instance = this;

		A.each(instance.selectedRowHash, A.bind(instance.unselectRow, instance));
	},

	_afterHostColumnsetChange: function(event) {
		var instance = this;

		instance._cleanUp();
	},

	_afterHostRecordsetChange: function(event) {
		var instance = this;

		instance._cleanUp();
	},

	_afterMouseEvent: function(event) {
		var instance = this;

		instance._handleSelectEvent(event);
	},

	_afterKeyEvent: function(event) {
		var instance = this;
		var originalEvent = event.originalEvent;

		if (originalEvent.isNavKey()) {
			if (originalEvent.isKey(ESC)) {
				instance._onEscKey(event);
			}
			else if (originalEvent.isKey(RETURN)) {
				instance._onReturnKey(event);
			}
			else {
				instance._navigate(event);
			}

			originalEvent.halt();
		}
	},

	_cleanUp: function() {
		var instance = this;

		instance.selectedCellHash = {};
		instance.selectedColumnHash = {};
		instance.selectedRowHash = {};
	},

	_defSelectFn: function(event) {
		var instance = this;

		instance.select(event.cell, event.row);
	},

	_navigate: function(event) {
		var instance = this;

		instance._updateNavKeyInfo(event);

		instance._handleSelectEvent(event);
	},

	_onEscKey: function(event) {
		var instance = this;
		var host = instance.get(HOST);
		var editor = host.getCellEditor(event.record, event.column);

		if (editor) {
			editor.hide();
		}
	},

	_onReturnKey: function(event) {
		var instance = this;
		var host = instance.get(HOST);

		host._editCell(event);
	},

	_handleSelectEvent: function(event) {
		var instance = this;

		instance.fire(SELECT, {
			cell: event.cell,
			column: event.column,
			inHead: event.inHead,
			liner: event.liner,
			originalEvent: event.originalEvent,
			row: event.row,
			record: event.record
		});
	},

	_updateNavKeyInfo: function(event) {
		var instance = this;
		var host = instance.get(HOST);
		var originalEvent = event.originalEvent;

		var columnset = host.get(COLUMNSET);
		var columnIndex = event.column.keyIndex;

		var recordset = host.get(RECORDSET);
		var recordIndex = recordset.getRecordIndex(event.record);

		var ctrlKey = originalEvent.ctrlKey || originalEvent.metaKey;
		var shiftKey = originalEvent.shiftKey;

		if (originalEvent.isKey(LEFT) ||
			(shiftKey && originalEvent.isKey(TAB))) {

			if (ctrlKey) {
				columnIndex = 0;
			}
			else {
				columnIndex--;
			}
		}
		else if (originalEvent.isKey(RIGHT) ||
				(!shiftKey && originalEvent.isKey(TAB))) {

			if (ctrlKey) {
				columnIndex = columnset.getLength() - 1;
			}
			else {
				columnIndex++;
			}
		}
		else if (originalEvent.isKey(DOWN)) {
			if (ctrlKey) {
				recordIndex = recordset.getLength() - 1;
			}
			else {
				recordIndex++;
			}
		}
		else if (originalEvent.isKey(UP)) {
			if (ctrlKey) {
				recordIndex = 0;
			}
			else {
				recordIndex--;
			}
		}

		// Fixing indexes range
		columnIndex = Math.max(Math.min(columnIndex, columnset.getLength() - 1), 0);
		recordIndex = Math.max(Math.min(recordIndex, recordset.getLength() - 1), 0);

		var column = columnset.getColumn(columnIndex);
		var record = recordset.getRecord(recordIndex);
		var cell = host.getCellNode(record, column);

		if (host.events) {
			// Update event with the new payload information for the next "cell" calculated by the "events" module.
			A.mix(event, host.events.getEvtPayload(cell, event), true);
		}
	},

	_setMouseEvent: function(val) {
		return CELL + _toInitialCap(val);
	}
},
{
    NS: "selection",

    NAME: "dataTableSelection",

    ATTRS: {
		selectRow: {
			value: false,
			validator: isBoolean
		},

		multiple: {
			value: false,
			validator: isBoolean
		},

		mouseEvent: {
			setter: '_setMouseEvent',
			value: MOUSEDOWN,
			validator: isString
		}
    }
});

A.namespace("Plugin").DataTableSelection = DataTableSelection;

}, '@VERSION@' ,{requires:['aui-datatable-base'], skinnable:true});


AUI.add('aui-datatable', function(A){}, '@VERSION@' ,{use:['aui-datatable-base','aui-datatable-events','aui-datatable-edit','aui-datatable-selection'], skinnable:false});

