/**
 * The Form Field Grid Component
 *
 * @module aui-form-field-grid
 */

var CSS_FIELD_GRID = A.getClassName('form', 'field', 'grid'),
    CSS_FIELD_GRID_COLUMNS = A.getClassName('form', 'field', 'grid', 'columns'),
    CSS_FIELD_GRID_ROW = A.getClassName('form', 'field', 'grid', 'row'),
    CSS_FIELD_GRID_TABLE = A.getClassName('form', 'field', 'grid', 'table'),

    TPL_FIELD_GRID_CELL = '<td></td>',
    TPL_FIELD_GRID_COLUMN =  '<th>{value}</th>',
    TPL_FIELD_GRID_ROW = '<tr class="' + CSS_FIELD_GRID_ROW + '"><th>{value}</th></tr>';

/**
 * A base class for Form Field Grid.
 *
 * @class A.FormFieldGrid
 * @extends A.FormField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldGrid = A.Base.create('form-field-grid', A.FormField, [], {
    TPL_FIELD_CONTENT: '<table class="' + CSS_FIELD_GRID_TABLE + '">' +
        '<tr class="' + CSS_FIELD_GRID_COLUMNS + '"></tr>' +
        '</table>',

    /**
     * Constructor for the `A.FormFieldGrid`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            columnsChange: this._afterColumnsChange,
            rowsChange: this._afterRowsChange
        });
    },

    /**
     * Create the DOM structure for the `A.FormFieldGrid`. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var content = this.get('content');

        A.FormFieldGrid.superclass.renderUI.call(this);

        content.addClass(CSS_FIELD_GRID);

        this._uiSetColumns(this.get('columns'));
        this._uiSetRows(this.get('rows'));
    },

    /**
     * Fired after the `rows` attribute is set.
     *
     * @method _afterRowsChange
     * @protected
     */
    _afterRowsChange: function() {
        this._uiSetRows(this.get('rows'));
    },

    /**
     * Fired after the `columns` attribute is set.
     *
     * @method _afterColumnsChange
     * @protected
     */
    _afterColumnsChange: function() {
        this._uiSetColumns(this.get('columns'));
        this._uiSetRows(this.get('rows'));
    },

    /**
     * Updates the ui according to the value of the `columns` attribute.
     *
     * @method _uiSetColumns
     * @param {Array} columns
     * @protected
     */
    _uiSetColumns: function(columns) {
        var columnNode = this.get('content').one('.' + CSS_FIELD_GRID_COLUMNS);

        columnNode.empty();
        columnNode.append(A.Lang.sub(TPL_FIELD_GRID_COLUMN, {
            value: ''
        }));

        A.Array.each(columns, function(column) {
            columnNode.append(A.Lang.sub(TPL_FIELD_GRID_COLUMN, {
                value: column
            }));
        });
    },

    /**
     * Updates the ui according to the value of the `rows` attribute.
     *
     * @method _uiSetRows
     * @param {Array} rows
     * @protected
     */
    _uiSetRows: function(rows) {
        var columns = this.get('columns'),
            content = this.get('content'),
            rowNode,
            tableContainer = content.one('.' + CSS_FIELD_GRID_TABLE);

        content.all('.' + CSS_FIELD_GRID_ROW).remove(true);

        A.Array.each(rows, function(row) {
            rowNode = A.Node.create(A.Lang.sub(TPL_FIELD_GRID_ROW, {
                value: row
            }));

            A.Array.each(columns, function() {
                rowNode.appendChild(A.Lang.sub(TPL_FIELD_GRID_CELL));
            });
            tableContainer.appendChild(rowNode);
        });
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormFieldGrid`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The columns that can be chosen.
         *
         * @attribute columns
         * @default []
         * @type String
         */
        columns: {
            validator: A.Lang.isArray,
            value: []
        },

        /**
         * Flag indicating if this field is required.
         *
         * @attribute required
         * @default false
         * @type Boolean
         */
        required: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * The rows that can be chosen.
         *
         * @attribute rows
         * @default []
         * @type String
         */
        rows: {
            validator: A.Lang.isArray,
            value: []
        }
    }
});
