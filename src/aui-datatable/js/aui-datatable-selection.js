// TODO - add support for row/column selection

var Lang = A.Lang,
	isBoolean = Lang.isBoolean,

	AgetClassName = A.getClassName,

	CELL = 'cell',
	DATATABLE = 'datatable',
	ID = 'id',
	SELECTED = 'selected',
	SELECT_CELL_ON_EDIT = 'selectCellOnEdit',

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

		instance.afterHostMethod('_editCell', instance._editCell);
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

	selectCell: function(cell) {
		var instance = this;

		instance.selectedCellHash[cell.get(ID)] = cell;

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

	_editCell: function(event) {
		var instance = this;

		if (instance.get(SELECT_CELL_ON_EDIT)) {
			instance.selectCell(event.cell);
		}
	}
},
{
    NS: "selection",

    NAME: "dataTableSelection",

    ATTRS: {
		selectCellOnEdit: {
			value: true,
			validator: isBoolean
		}
    }
});

A.namespace("Plugin").DataTableSelection = DataTableSelection;