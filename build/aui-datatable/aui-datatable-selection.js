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
