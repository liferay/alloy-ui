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

	getColNode: function(cell) {
		var instance = this;
		var columnset = instance.get(COLUMNSET);
		var index = columnset.getColumnIndex(columnset.getColumnByCell(cell));

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

	getColumnByCell: function(cell) {
		var instance = this;
		var dataHeaderId = cell.getAttribute(HEADERS).split(_SPACE).pop() || cell.get(ID);

		return instance.getColumn(dataHeaderId);
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