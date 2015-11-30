YUI.add('aui-datatable-selection', function (A, NAME) {

/**
 * The Datatable Component
 *
 * @module aui-datatable
 * @submodule aui-datatable-selection
 */

var Lang = A.Lang,
    isArray = Lang.isArray,
    isString = Lang.isString,
    isObject = Lang.isObject,

    clamp = function(value, min, max) {
        return Math.min(Math.max(value, min), max);
    };

/**
 * A base class for DataTableSelection.
 *
 * @class A.DataTableSelection
 * @param {Object} config Object literal specifying widget configuration
 * properties.
 * @constructor
 */
var DataTableSelection = function() {};

/**
 * Static property used to define the default attribute
 * configuration for the `A.DataTableSelection`.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
DataTableSelection.ATTRS = {

    /**
     * Defines the active cell of the `A.DataTableSelection`.
     *
     * @attribute activeCell
     * @type Node
     */
    activeCell: {
        getter: '_getActiveCell'
    },

    /**
     * Defines and stores the active cell coordinates, `[row, cell]`, of the
     * `A.DataTableSelection`.
     *
     * @attribute activeCoord
     * @default [-1, -1]
     * @type Array
     */
    activeCoord: {
        value: [-1, -1]
    },

    /**
     * Defines the active row of the `A.DataTableSelection`.
     *
     * @attribute activeRow
     * @type Node
     */
    activeRow: {
        getter: '_getActiveRow'
    },

    /**
     * Defines the selected cells and rows of the `A.DataTableSelection`.
     *
     * @attribute selection
     * @type Object
     */
    selection: {
        setter: '_setSelection'
    },

    /**
     * Defines and stores the `tabIndex` of the `activeCell`.
     *
     * @attribute tabIndex
     * @default 0
     * @type Number
     */
    tabIndex: {
        value: 0
    }
};

A.mix(DataTableSelection.prototype, {
    _capturing: false,
    _selectionEnd: null,
    _selectionSeed: null,
    _selectionStart: null,

    /**
     * Construction logic executed during `A.DataTableSelection` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this,
            boundingBox = instance.get('boundingBox');

        instance.CLASS_NAMES_SELECTION = {
            cell: instance.getClassName('cell'),
            selection: instance.getClassName('selection')
        };

        instance._bindSelectionUI();

        boundingBox.addClass(instance.CLASS_NAMES_SELECTION.selection);

    },

    /**
     * Destructor lifecycle implementation for the `A.DataTableSelection` class.
     * Detaches `_selectionKeyHandler` event listener.
     *
     * @method destroy
     * @protected
     */
    destroy: function() {
        var instance = this;

        instance._selectionKeyHandler.detach();
    },

    /**
     * Return the selected cells and within the coordinates `coords`.
     *
     * @method captureSelection
     * @param {Object} coords Cell coordinates.
     * @return {Object} Selected cells and rows.
     */
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

    /**
     * Gets the active column based off the `activeCell` attribute.
     *
     * @method getActiveColumn
     * @return {Object} Active column.
     */
    getActiveColumn: function() {
        var instance = this;

        return instance.getColumn(instance.get('activeCell'));
    },

    /**
     * Gets the active record based odd the `activeRow` attribute.
     *
     * @method getActiveRecord
     * @return {Object} Active record.
     */
    getActiveRecord: function() {
        var instance = this;

        return instance.getRecord(instance.get('activeRow'));
    },

    /**
     * Gets the cell coordinates of the passed `seed`.
     *
     * @method getCoord
     * @param {Node} seed
     * @return {Array} Cell coordinates.
     */
    getCoord: function(seed) {
        var instance = this,
            cell = instance.getCell(seed),
            tbody = instance.body.tbodyNode,
            rowIndexOffset = tbody.get('firstChild.rowIndex');

        return [cell.get('parentNode.rowIndex') - rowIndexOffset, cell.get('cellIndex')];
    },

    /**
     * Focus the active cell on datatable sorting.
     *
     * @method _afterActiveCoordChange
     * @param {EventFacade} event
     * @protected
     */
    _afterActiveCoordChange: function(event) {
        var instance = this,
            activeCell = instance.getCell(event.newVal);

        if (activeCell) {
            activeCell.setAttribute('tabindex', 0).focus();
        }
    },

    /**
     * Bind the selection UI.
     *
     * @method _bindSelectionUI
     * @protected
     */
    _bindSelectionUI: function() {
        var instance = this,
            classNames = instance.CLASS_NAMES_SELECTION;

        instance._selectionKeyHandler = A.getDoc().on(
            'key', A.bind(instance._onSelectionKey, instance), 'down:enter,37,38,39,40');

        instance.after('activeCoordChange', instance._afterActiveCoordChange);
        instance.delegate('mouseup', A.bind(instance._onSelectionMouseUp, instance), '.' + classNames.cell);
        instance.delegate('mousedown', A.bind(instance._onSelectionMouseDown, instance), '.' + classNames.cell);
        instance.delegate('mouseenter', A.bind(instance._onSelectionMouseEnter, instance), '.' + classNames.cell);
    },

    /**
     * Return the active cell.
     *
     * @method _getActiveCell
     * @protected
     */
    _getActiveCell: function() {
        var instance = this,
            activeCoord = instance.get('activeCoord'),
            activeRowIndex = activeCoord[0],
            activeCellIndex = activeCoord[1];

        if (activeRowIndex > -1 && activeCellIndex > -1) {
            return instance.getCell([activeRowIndex, activeCellIndex]);
        }

        return null;
    },

    /**
     * Return the active row.
     *
     * @method _getActiveRow
     * @protected
     */
    _getActiveRow: function() {
        var instance = this,
            activeCoord = instance.get('activeCoord'),
            activeRowIndex = activeCoord[0];

        if (activeRowIndex > -1) {
            return instance.getRow(activeRowIndex);
        }

        return null;
    },

    /**
     * Fires on `mousedown` event.
     *
     * @method _onSelectionMouseDown
     * @param {EventFacade} event
     * @protected
     */
    _onSelectionMouseDown: function(event) {
        var instance = this,
            seed = event.currentTarget,
            boundingBox = instance.get('boundingBox'),
            coords = instance.getCoord(seed);

        boundingBox.unselectable();

        instance._capturing = true;
        instance._selectionSeed = seed;
        instance._selectionStart = instance._selectionEnd = instance.getCoord(seed);

        instance.set('activeCoord', coords);
    },

    /**
     * Fires on `mouseenter` event.
     *
     * @method _onSelectionMouseEnter
     * @param {EventFacade} event
     * @protected
     */
    _onSelectionMouseEnter: function(event) {
        var instance = this,
            seed = event.currentTarget;

        if (!instance._capturing) {
            return;
        }

        instance._selectionSeed = seed;
        instance._selectionEnd = instance.getCoord(seed);

        instance.set('selection', {
            start: instance._selectionStart,
            end: instance._selectionEnd
        });
    },

    /**
     * Fires on `mouseup` event.
     *
     * @method _onSelectionMouseUp
     * @param {EventFacade} event
     * @protected
     */
    _onSelectionMouseUp: function() {
        var instance = this,
            boundingBox = instance.get('boundingBox');

        if (instance.get('focused')) {
            instance._selectionEnd = instance.getCoord(instance._selectionSeed);

            instance.set('selection', {
                start: instance._selectionStart,
                end: instance._selectionEnd
            });
        }

        boundingBox.selectable();

        instance._capturing = false;
    },

    /**
     * Fires on `key` event with the listened selection keys.
     *
     * @method _onSelectionKey
     * @param {EventFacade} event
     * @protected
     */
    _onSelectionKey: function(event) {
        var instance = this,
            body = instance.body,
            tbody = body.tbodyNode,
            keyCode = event.keyCode,
            activeCell = instance.get('activeCell'),
            activeCoord,
            imax = tbody.get('children').size(),
            jmax = body.get('columns').length,
            i,
            j;

        if (activeCell && instance.get('focused')) {
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

            i = clamp(i, 0, imax - 1);
            j = clamp(j, 0, jmax - 1);

            instance.set('activeCoord', [i, j]);

            instance.set('selection', [i, j]);

            event.preventDefault();
        }
    },

    /**
     * Parse selection coordinates range.
     *
     * @method _parseRange
     * @param {Array} val
     * @return {Array} coords
     * @protected
     */
    _parseRange: function(val) {
        var c1 = val[0],
            c2 = val[1],
            coords = [],
            i,
            j;

        for (i = Math.min(c1[0], c2[0]); i <= Math.max(c1[0], c2[0]); i++) {
            for (j = Math.min(c1[1], c2[1]); j <= Math.max(c1[1], c2[1]); j++) {
                coords.push([i, j]);
            }
        }

        return coords;
    },

    /**
     * Set selection.
     *
     * @method _setSelection
     * @param val
     * @return {Object} Selected cells and rows.
     * @protected
     */
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

A.Base.mix(A.DataTable, [DataTableSelection]);

/**
 * Calculate and return the column based on the passed `seed`.
 *
 * @method getColumn
 * @param {Node} seed
 * @return {Object} Column.
 */
A.DataTable.prototype.getColumn = (function(original) {
    return function(seed) {
        var cell;

        if (A.instanceOf(seed, A.Node)) {
            cell = this.getCell(seed);

            seed = cell && (cell.get('className').match(
                new RegExp(this.getClassName('col', '(\\w+)'))) || [])[1];
        }

        return original.call(this, seed);
    };
}(A.DataTable.prototype.getColumn));

/**
 * Return the row based on the passed `seed`.
 *
 * Add support to get a row by seed on DataTable getRow
 * See http://yuilibrary.com/projects/yui3/ticket/2532605
 *
 * @method getRow
 * @param {Node} seed
 * @return {Object} Row.
 */
A.DataTable.prototype.getRow = (function(original) {
    return function(seed) {
        var instance = this,
            tbody = instance.body.tbodyNode,
            row;

        if (A.instanceOf(seed, A.Node)) {
            row = seed.ancestor(function(node) {
                return node.get('parentNode').compareTo(tbody);
            }, true);

            return row;
        }
        else {
            return original.call(this, seed);
        }
    };
}(A.DataTable.prototype.getRow));

/**
 * DataTable columns configuration breaks on n-depth cloning complex objects
 * See http://yuilibrary.com/projects/yui3/ticket/2532597
 *
 * @method _setColumns
 * @protected
 */
A.DataTable.prototype._setColumns = function(val) {
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
                }
                else if (isObject(val, true) && val.constructor === copy.constructor) {
                    i = arrayIndex(val, known);

                    copy[key] = i === -1 ? copyObj(val) : knownCopies[i];
                }
                else {
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
        }
        else {
            keys[name] = 1;
        }

        return name;
    }

    function process(cols, parent) {
        var columns = [],
            i, len, col, yuid;

        for (i = 0, len = cols.length; i < len; ++i) {
            columns[i] = // chained assignment
            col = isString(cols[i]) ? {
                key: cols[i]
            } : copyObj(cols[i]);

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
            }
            else {
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


}, '3.0.1', {"requires": ["aui-datatable-core"], "skinnable": true});
