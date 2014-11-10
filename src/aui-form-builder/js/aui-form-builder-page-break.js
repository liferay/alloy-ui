/**
 * The Form Builder Page Break Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-page-break
 */

var CSS_PAGE_BREAK = A.getClassName('form', 'builder', 'page', 'break'),
    CSS_PAGE_BREAK_INDEX = A.getClassName('form', 'builder', 'page', 'break', 'index'),
    CSS_PAGE_BREAK_QUANTITY = A.getClassName('form', 'builder', 'page', 'break', 'quantity'),

    TPL_PAGE_BREAK = '<div class="' + CSS_PAGE_BREAK + '">' +
        '<p>Page <span class="' + CSS_PAGE_BREAK_INDEX +
        '"></span>/<span class="' + CSS_PAGE_BREAK_QUANTITY + '"></span></p></div>';

/**
 * A base class for Form Builder Page Break.
 *
 * @class A.FormBuilderPageBreak
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderPageBreak = A.Base.create(
    'form-builder-page-break',
    A.Base,
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
         * Updates the ui according to the value of the `index` attribute.
         *
         * @method _uiSetIndex
         * @param {String} index
         * @protected
         */
        _uiSetIndex: function(index) {
            this.get('content').one('.' + CSS_PAGE_BREAK_INDEX).set('text', index);
        },

        /**
         * Updates the ui according to the value of the `quantity` attribute.
         *
         * @method _uiSetQuantity
         * @param {String} quantity
         * @protected
         */
        _uiSetQuantity: function(quantity) {
            this.get('content').one('.' + CSS_PAGE_BREAK_QUANTITY).set('text', quantity);
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
             * Node containing the contents of this page break.
             *
             * @attribute content
             * @type Node
             */
            content: {
                validator: function(val) {
                    return A.instanceOf(val, A.Node);
                },
                valueFn: function() {
                    return A.Node.create(TPL_PAGE_BREAK);
                },
                writeOnce: 'initOnly'
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
             * Total of page breaks.
             *
             * @attribute quantity
             * @type Number
             */
            quantity: {
                validator: A.Lang.isNumber
            }
        }
    }
);
