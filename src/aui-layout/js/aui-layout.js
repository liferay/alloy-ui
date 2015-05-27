/**
 * The Layout Component
 *
 * @module aui-layout
 */

var CSS_LAYOUT_NODE = A.getClassName('layout', 'node'),

    MAXIMUM_COLS_PER_ROW = 12,

    RESPONSIVENESS_BREAKPOINT = 992,

    SELECTOR_COL = '.col',
    SELECTOR_LAYOUT_COL_CONTENT = '.layout-col-content',
    SELECTOR_LAYOUT_ROW_CONTAINER_ROW = '.layout-row-container-row',
    SELECTOR_ROW = '.row';

/**
 * A base class for Layout.
 *
 * @class A.Layout
 * @extends Base
 * @param {Object} config Object literal specifying layout configuration
 *     properties.
 * @constructor
 */
A.Layout = A.Base.create('layout', A.Base, [], {

    /**
     * Determines if progressive enhancement mode will be used.
     *
     * @property _useProgressiveEnhancement
     * @type {Boolean}
     * @protected
     */
    _useProgressiveEnhancement: false,

    /**
     * Construction logic executed during Layout instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function(config) {

        if (!config || !config.rows) {
            this._useProgressiveEnhancement = true;
        }

        this._eventHandles = [
            this.after('rowsChange', A.bind(this._afterRowsChange, this)),
            this.after('layout-row:colsChange', A.bind(this._afterLayoutColsChange, this)),
            this.after('layout-col:valueChange', A.bind(this._afterLayoutValueChange, this)),
            A.on('windowresize', A.bind(this._afterLayoutWindowResize, this))
        ];

        A.Array.invoke(this.get('rows'), 'addTarget', this);

        this._uiSetRows(this.get('rows'));
    },

    /**
     * Destructor implementation for the `A.Layout` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._eventHandles)).detach();
        this.get('node').remove();
    },

    /**
     * Adds a new row with specified number of cols to the current layout.
     *
     * @method addRowWithSpecifiedColNumber
     * @param {Number} numberOfCols Number of cols to create the row with.
     */
    addRowWithSpecifiedColNumber: function(numberOfCols) {
        var cols = [],
            i,
            row,
            rows = this.get('rows').concat();

        numberOfCols = numberOfCols || 1;

        for (i = 0; i < numberOfCols; i++) {
            cols.push(new A.LayoutCol({ size: MAXIMUM_COLS_PER_ROW / numberOfCols }));
        }

        row = new A.LayoutRow({ cols: cols });

        rows.splice(rows.length, 0, row);

        this.set('rows', rows);
    },

    /**
     * Adds a new row to the current layout.
     *
     * @method addRow
     * @param {Number} index Position to insert the new row.
     * @param {Node} row A brand new row.
     */
    addRow: function(index, row) {
        var rows = this.get('rows').concat();

        if (A.Lang.isUndefined(index)) {
            index = rows.length;
        }

        if (!row) {
            row = new A.LayoutRow();
        }

        rows.splice(index, 0, row);

        this.set('rows', rows);
    },

    /**
     * Renders the layout rows and columns into the given container.
     *
     * @method draw
     * @param {Node} container The container to draw the layout on.
     */
    draw: function(container) {
        var layoutNode = container.one('.' + CSS_LAYOUT_NODE),
            node = this.get('node');

        if (this._useProgressiveEnhancement && layoutNode) {
            this._set('node', layoutNode);
            this._setProgressiveEnhancementLayout(container);
        }
        else {
            container.setHTML(node);
        }

        this._handleResponsive(A.config.win.innerWidth);
    },

    /**
     * Moves a row to a different position.
     *
     * @method moveRow
     * @param {Number} index The new position of the row.
     * @param {Node} row Row to change the position.
     */
    moveRow: function(index, row) {
        this.removeRow(row);
        this.addRow(index, row);
    },

    /**
     * Normalize all cols' height for each row.
     *
     * @method normalizeColsHeight
     * @param {NodeList} rows Rows to normalize cols' height.
     */
    normalizeColsHeight: function(rows) {
        var instance = this,
            colClientHeight,
            cols,
            highestCol = 0;

        rows.each(function(row) {
            cols = row.all(SELECTOR_COL);

            if (instance.get('isColumnMode')) {
                if (row.getData('layout-row').get('equalHeight')) {
                    A.Array.invoke(cols, 'setStyle', 'height', 'auto');
                    cols.each(function(col) {
                        colClientHeight = col.get('clientHeight');

                        if (colClientHeight > highestCol) {
                            highestCol = colClientHeight;
                        }
                    });

                    A.Array.invoke(cols, 'setStyle', 'height', highestCol + 'px');
                    highestCol = 0;
                }
            }
            else {
                A.Array.invoke(cols, 'setStyle', 'height', 'auto');
            }
        });
    },

    /**
     * Removes a row from this layout.
     *
     * @method removeRow
     * @param {Number | A.LayoutRow} row Row index or row to be removed from this layout
     */
    removeRow: function(row) {
        if (A.Lang.isNumber(row)) {
            this._removeRowByIndex(row);
        }
        else if (A.instanceOf(row, A.LayoutRow)) {
            this._removeRowByReference(row);
        }
    },

    /**
     * Fires after `layout-row:colsChange` event.
     *
     * @method _afterLayoutColsChange
     * @protected
     */
    _afterLayoutColsChange: function(event) {
        var row = event.target;
        this.normalizeColsHeight(new A.NodeList(row.get('node').one(SELECTOR_ROW)));
    },

    /**
     * Fires after cols' valueChange event.
     *
     * @method _afterLayoutValueChange
     * @protected
     */
    _afterLayoutValueChange: function(event) {
        var col = event.target,
            targets;

        targets = A.Array.filter(col.getTargets(), function(target) {
            if (target.name === 'layout-row') {
                return target;
            }
        });

        this.normalizeColsHeight(new A.NodeList(targets[0].get('node').one(SELECTOR_ROW)));
    },

    /**
     * Fires after rows changes.
     *
     * @method _afterRowsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterRowsChange: function(event) {
        A.Array.invoke(event.prevVal, 'removeTarget', this);
        A.Array.invoke(event.newVal, 'addTarget', this);

        this._uiSetRows(this.get('rows'));
    },

    /**
     * Fires after window's resize.
     *
     * @method _afterLayoutWindowResize
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutWindowResize: function(event) {
        var viewportSize = event.target.get('innerWidth');
        this._handleResponsive(viewportSize);
    },


    /**
     * Create LayoutCol objects to use with progressive enhancement
     *
     * @method _createLayoutCols
     * @param {Array} cols
     * @protected
     */
    _createLayoutCols: function(cols) {
        var bootstrapClassRegex = /col-\w+-\d+/,
            colClass,
            colSizeRegex = /\d$/,
            layoutCols = [];

        cols.each(function(col) {
            colClass = col.get('className').match(bootstrapClassRegex)[0];

            layoutCols.push(new A.LayoutCol(
                {
                    size: A.Number.parse(colClass.match(colSizeRegex)[0]),
                    value: { content: col.one(SELECTOR_LAYOUT_COL_CONTENT).getHTML() }
                }
            ));
        });

        return layoutCols;
    },

    /**
     * Calculates column mode.
     *
     * @method _handleResponsive
     * @param {Number} viewportSize
     * @protected
     */
    _handleResponsive: function(viewportSize) {
        var enableColumnMode = viewportSize >= RESPONSIVENESS_BREAKPOINT;

        if (this.get('isColumnMode') !== enableColumnMode) {
            this._set('isColumnMode', enableColumnMode);

            this.normalizeColsHeight(this.get('node').all(SELECTOR_ROW));
        }
    },

    /**
     * Removes a row from this layout by it's index.
     *
     * @method _removeRowByIndex
     * @param {Number} index Row index to be removed from this layout
     * @protected
     */
    _removeRowByIndex: function(index) {
        var rows = this.get('rows').concat();

        rows.splice(index, 1);
        this.set('rows', rows);
    },

    /**
     * Removes a row from this layout by it's reference.
     *
     * @method _removeRowByReference
     * @param {A.LayoutRow} row Column to be removed from this layout
     * @protected
     */
    _removeRowByReference: function(row) {
        var index,
            rows = this.get('rows').concat();

        index = A.Array.indexOf(rows, row);

        if (index >= 0) {
            this._removeRowByIndex(index);
        }
    },

    /**
     * Builds layout through progressive enhancement
     *
     * @method _setProgressiveEnhancementLayout
     * @param {Node} container Node to append the layout
     * @protected
     */
    _setProgressiveEnhancementLayout: function(container) {
        var instance = this,
            layoutCols = [],
            layoutRow,
            layoutRows = [],
            rows = container.all(SELECTOR_ROW);

        rows.each(function(row) {
            layoutCols = instance._createLayoutCols(row.all(SELECTOR_COL));

            layoutRow = new A.LayoutRow(
                {
                    cols: layoutCols,
                    node: row.ancestor(SELECTOR_LAYOUT_ROW_CONTAINER_ROW)
                }
            );

            layoutCols = [];

            layoutRows.push(layoutRow);
        });

        this.set('rows', layoutRows);
    },

    /**
     * Sets the `row` attribute.
     *
     * @method _setRows
     * @param {Array} val
     * @protected
     */
    _setRows: function(val) {
        var i,
            newVal = [],
            row;

        for (i = 0; i < val.length; i++) {
            row = val[i];
            if (!A.instanceOf(row, A.LayoutRow)) {
                row = new A.LayoutRow(row);
            }

            newVal.push(row);
        }

        return newVal;
    },

    /**
     * Updates the UI according to the value of the `rows` attribute.
     *
     * @method _uiSetRows
     * @param {Array} rows
     * @protected
     */
    _uiSetRows: function(rows) {
        var node = this.get('node');

        node.empty();
        A.each(rows, function(row) {
            node.append(row.get('node'));
        });
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the Layout.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Determines if columns should collapse.
         *
         * @property isColumnMode
         * @type {Boolean}
         * @protected
         */
        isColumnMode: {
            readOnly: true,
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * The node where this column will be rendered.
         *
         * @attribute node
         * @type Node
         */
        node: {
            validator: A.Lang.isNode,
            valueFn: function() {
                return A.Node.create('<div class="' + CSS_LAYOUT_NODE + '"></div>');
            },
            writeOnce: 'initOnly'
        },

        /**
         * Rows to be appended into container node
         *
         * @attribute rows
         * @type {Array}
         */
        rows: {
            setter: '_setRows',
            validator: A.Lang.isArray,
            value: []
        }
    }
});
