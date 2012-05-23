var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isString = Lang.isString,
	isObject = Lang.isObject,

	CLASS_NAMES_SELECTION = 'CLASS_NAMES_SELECTION',

	ACTIVE_CELL = 'activeCell',
	BOUNDING_BOX = 'boundingBox',
	CELL = 'cell',
	CELL_INDEX = 'cellIndex',
	CONTAINER = 'container',
	FOCUSED = 'focused',
	KEY = 'key',
	MOUSEDOWN = 'mousedown',
	MOUSEENTER = 'mouseenter',
	MOUSEUP = 'mouseup',
	SELECTED = 'selected',
	SELECTION = 'selection',
	CHILDREN = 'children',

	_DOT = '.',

	clamp = function(value, min, max) {
		return Math.min(Math.max(value, min), max);
	};

var DataTableSelection = function () {};

DataTableSelection.ATTRS = {
	activeCell: {
		setter: 'getCell'
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

		instance._keyHandler.detach();
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
			rows[i] = instance.getRow(i);
			records[i] = instance.getRecord(i);
		}

		return {
			cells: cells,
			cols: cols,
			coords: coords,
			records: records,
			rows: rows
		};
	},

	getCoord: function(seed) {
		var instance = this,
			cell = instance.getCell(seed),
			tbody = instance.body.get(CONTAINER),
			rowIndexOffset = tbody.get('firstChild.rowIndex');

		return [ cell.get('parentNode.rowIndex') - rowIndexOffset, cell.get(CELL_INDEX) ];
	},

	_bindSelectionUI: function() {
		var instance = this,
			classNames = instance[CLASS_NAMES_SELECTION];

		instance._keyHandler = A.getDoc().on(KEY, A.bind(instance._onSelectionKey, instance), 'down:37,38,39,40');

		instance.delegate(MOUSEDOWN, A.bind(instance._onSelectionMouseDown, instance), _DOT+classNames.cell);
		instance.delegate(MOUSEENTER, A.bind(instance._onSelectionMouseEnter, instance), _DOT+classNames.cell);
		instance.delegate(MOUSEUP, A.bind(instance._onSelectionMouseUp, instance), _DOT+classNames.cell);
	},

	_onSelectionMouseDown: function(event) {
		var instance = this,
			seed = event.currentTarget,
			boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.unselectable();

		instance._capturing = true;

		instance._selectionStart = instance._selectionEnd = instance.getCoord(seed);

		instance.set(ACTIVE_CELL, seed);
	},

	_onSelectionMouseEnter: function(event) {
		var instance = this;

		if (!instance._capturing) {
			return;
		}

		instance._selectionEnd = instance.getCoord(event.currentTarget);

		instance.set(SELECTION, {
			start: instance._selectionStart,
			end: instance._selectionEnd
		});
	},

	_onSelectionMouseUp: function(event) {
		var instance = this;
			boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.selectable();

		instance._selectionEnd = instance.getCoord(event.currentTarget);

		instance.set(SELECTION, {
			start: instance._selectionStart,
			end: instance._selectionEnd
		});

		instance._capturing = false;
	},

	_onSelectionKey: function(event) {
		var instance = this,
			body = instance.body,
			tbody = body.get(CONTAINER),
			keyCode = event.keyCode,
			activeCell = instance.get(ACTIVE_CELL),
			activeCoord,
			imax = tbody.get(CHILDREN).size(),
			jmax = body.columns.length,
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

			instance.set(ACTIVE_CELL, instance.getCell([i, j]));

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