/**
 * The Form Builder Page Break Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-page-break
 */

var CSS_PAGE_BREAK = A.getClassName('form', 'builder', 'page', 'break'),
    CSS_PAGE_BREAK_INDEX = A.getClassName('form', 'builder', 'page', 'break', 'index'),
    CSS_PAGE_BREAK_QUANTITY = A.getClassName('form', 'builder', 'page', 'break', 'quantity'),
    CSS_PAGE_BREAK_ROW = A.getClassName('form', 'builder', 'page', 'break', 'row'),

    TPL_PAGE_BREAK = '<div class="' + CSS_PAGE_BREAK + '">' +
        '<p>Page <span class="' + CSS_PAGE_BREAK_INDEX +
        '"></span>/<span class="' + CSS_PAGE_BREAK_QUANTITY + '"></span></p></div>';

/**
 * A base class for Form Builder Page Break.
 *
 * @class A.FormBuilderPageBreak
 * @extends A.LayoutRow
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderPageBreak = A.Base.create(
    'form-builder-page-break',
    A.LayoutRow,
    [], {

        /**
         * Constructor for the `A.FormBuilderPageBreak`. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            this._uiSetIndex(this.get('index'));
            this._uiSetQuantity(this.get('quantity'));

            this.after('indexChange', this._afterIndexChange);
            this.after('quantityChange', this._afterQuantityChange);

            this.get('node').addClass(CSS_PAGE_BREAK_ROW);
        },

        /**
         * Fired after the `index` attribute is set.
         *
         * @method _afterIndexChange
         * @protected
         */
        _afterIndexChange: function() {
            this._uiSetIndex(this.get('index'));
        },

        /**
         * Fired after the `quantity` attribute is set.
         *
         * @method _afterQuantityChange
         * @protected
         */
        _afterQuantityChange: function() {
            this._uiSetQuantity(this.get('quantity'));
        },

        /**
         * Gets the node where this page break's content is rendered.
         *
         * @method _getContentNode
         * @return {Node}
         * @protected
         */
        _getContentNode: function() {
            if (!this._contentNode) {
                this._contentNode = A.Node.create(TPL_PAGE_BREAK);
            }

            return this._contentNode;
        },

        /**
         * Gets the value of the `movable` attribute.
         * @return {Boolean}
         * @protected
         */
        _getMovable: function() {
            return this.get('index') > 1;
        },

        /**
         * Gets the value of the `removable` attribute.
         * @return {Boolean}
         * @protected
         */
        _getRemovable: function() {
            return this.get('index') > 1;
        },

        /**
         * Updates the ui according to the value of the `index` attribute.
         *
         * @method _uiSetIndex
         * @param {String} index
         * @protected
         */
        _uiSetIndex: function(index) {
            this._getContentNode().one('.' + CSS_PAGE_BREAK_INDEX).set('text', index);
        },

        /**
         * Updates the ui according to the value of the `quantity` attribute.
         *
         * @method _uiSetQuantity
         * @param {String} quantity
         * @protected
         */
        _uiSetQuantity: function(quantity) {
            this._getContentNode().one('.' + CSS_PAGE_BREAK_QUANTITY).set('text', quantity);
        }
    }, {
        /**
         * Static property used to define the default attribute configuration
         * for the `A.FormBuilderPageBreak`.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {
            /**
             * Array containing `A.LayoutCol` objects
             *
             * @attribute cols
             * @default []
             * @type {Array}
             */
            cols: {
                valueFn: function() {
                    var col = new A.LayoutCol({
                        movableContent: false,
                        removable: false,
                        size: 12,
                        value: {content: this._getContentNode()}
                    });

                    return [col];
                }
            },

            /**
             * Index of the page break.
             *
             * @attribute index
             * @type Number
             */
            index: {
                validator: A.Lang.isNumber
            },

            /**
             * Number to determine maximum cols on a row.
             *
             * @attribute maximumCols
             * @default 1
             * @type {Number}
             */
            maximumCols: {
                value: 1
            },

            /**
             * Determine if the row can move.
             *
             * @attribute movable
             * @default true
             * @type {Boolean}
             */
            movable: {
                getter: '_getMovable'
            },

            /**
             * Total of page breaks.
             *
             * @attribute quantity
             * @type Number
             */
            quantity: {
                validator: A.Lang.isNumber
            },

            /**
             * Determine if the row can be removed.
             *
             * @attribute removable
             * @default true
             * @type {Boolean}
             */
            removable: {
                getter: '_getRemovable'
            }
        }
    }
);
