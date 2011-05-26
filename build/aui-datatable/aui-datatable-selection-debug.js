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
	DATATABLE = 'datatable',
	DOWN = 'down',
	ESC = 'esc',
	FOCUSED = 'focused',
	HOST = 'host',
	ID = 'id',
	KEYDOWN = 'keydown',
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
	TR = 'tr',
	UP = 'up',

	CSS_DATATABLE_CELL_SELECTED = AgetClassName(DATATABLE, CELL, SELECTED),
	CSS_DATATABLE_ROW_SELECTED = AgetClassName(DATATABLE, ROW, SELECTED);

var DataTableSelection = A.Base.create("dataTableSelection", A.Plugin.Base, [], {
	activeColumnIndex: -1,
	activeRecordIndex: -1,
	handlerKeyDown: null,
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

		instance.afterHostEvent(instance.get(MOUSE_EVENT), instance._afterMouseEvent);
		instance.afterHostEvent(COLUMNSET_CHANGE, instance._afterHostColumnsetChange);
		instance.afterHostEvent(RECORDSET_CHANGE, instance._afterHostRecordsetChange);
		instance.handlerKeyDown = A.getDoc().on(KEYDOWN, A.bind(instance._afterKeyEvent, instance));
	},

	destroy: function() {
		var instance = this;
		var handlerKeyDown = instance.handlerKeyDown;

		if (handlerKeyDown) {
			handlerKeyDown.detach();
		}
	},

	getActiveColumn: function() {
		var instance = this;
		var host = instance.get(HOST);

		return host.get(COLUMNSET).getColumn(instance.activeColumnIndex);
	},

	getActiveRecord: function() {
		var instance = this;
		var host = instance.get(HOST);

		return host.get(RECORDSET).getRecord(instance.activeRecordIndex);
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
		var host = instance.get(HOST);
		var columnset = host.get(COLUMNSET);
		var recordset = host.get(RECORDSET);
		var column = columnset.getColumnByCell(cell);
		var record = recordset.getRecordByRow(row || cell.ancestor(TR));

		instance.activeColumnIndex = columnset.getColumnIndex(column);
		instance.activeRecordIndex = recordset.getRecordIndex(record);

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
		var host = instance.get(HOST);
		var column = instance.getActiveColumn();
		var record = instance.getActiveRecord();

		if (!host.get(FOCUSED) || !column || !record) {
			// Don't process keys if the wigdet is not focused or column or record is undefined.
			return;
		}

		if (host.events) {
			// Update event with the new payload information for the next "cell" calculated by the "events" module.
			host.events.updateEventPayload(
				host.getCellNode(record, column),
				event
			);
		}

		if (event.isNavKey()) {
			if (event.isKey(ESC)) {
				instance._onEscKey(event);
			}
			else if (event.isKey(RETURN)) {
				instance._onReturnKey(event);
			}
			else {
				instance._navigate(event);
			}

			event.halt();
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

		if (host.events) {
			var newColumn = columnset.getColumn(columnIndex);
			var newRecord = recordset.getRecord(recordIndex);

			// Update event with the new payload information for the next "cell" calculated by the "events" module.
			host.events.updateEventPayload(
				host.getCellNode(newRecord, newColumn),
				event
			);
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
