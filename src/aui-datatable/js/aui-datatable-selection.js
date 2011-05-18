// TODO - add support for row/column selection

var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isString = Lang.isString,

	AgetClassName = A.getClassName,

	_toInitialCap = A.cached(function(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }),

	CELL = 'cell',
	CELL_KEYDOWN = 'cellKeydown',
	COLUMNSET = 'columnset',
	COLUMNSET_CHANGE = 'columnsetChange',
	DATATABLE = 'datatable',
	DOWN = 'down',
	EDITOR = 'editor',
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
	SELECT = 'select',
	SELECTED = 'selected',
	TAB = 'tab',
	TABINDEX = 'tabindex',
	UP = 'up',

	CSS_DATATABLE_CELL_SELECTED = AgetClassName(DATATABLE, CELL, SELECTED);

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

		// TODO - should we expose key event as well?
		instance.afterHostEvent(CELL_KEYDOWN, instance._afterKeyEvent);
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
		// TODO
	},

	select: function(node) {
		var instance = this;

		instance.selectCell(node);
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
		// TODO
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
		// TODO
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
		// TODO
	},

	unselectAllCells: function() {
		var instance = this;

		A.each(instance.selectedCellHash, A.bind(instance.unselectCell, instance));
	},

	unselectAllColumns: function() {
		// TODO
	},

	unselectAllRows: function() {
		// TODO
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

		instance.selectCell(event.cell);
	},

	_navigate: function(event) {
		var instance = this;

		instance._updateNavKeyInfo(event);

		instance._handleSelectEvent(event);
	},

	_onEscKey: function(event) {
		var instance = this;
		var editor = event.column.get(EDITOR);

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