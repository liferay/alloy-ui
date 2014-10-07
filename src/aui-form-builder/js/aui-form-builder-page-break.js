/**
 * The Form Builder Page Break Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-page-break
 */

var CSS_PAGE_BREAK = A.getClassName('form', 'builder', 'page', 'break'),
    CSS_PAGE_BREAK_LABEL = A.getClassName('form', 'builder', 'page', 'break', 'label'),

    TPL_PAGE_BREAK = '<div class="' + CSS_PAGE_BREAK + '">' +
        '<div class="' + CSS_PAGE_BREAK_LABEL + '"></div></div>';

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
            this._uiSetLabel(this.get('label'));

            this.after('labelChange', this._afterLabelChange);
        },

        /**
         * Fired after the `label` attribute is set.
         *
         * @method _afterLabelChange
         * @protected
         */
        _afterLabelChange: function() {
            this._uiSetLabel(this.get('label'));
        },

        /**
         * Updates the ui according to the value of the `label` attribute.
         *
         * @method _uiSetLabel
         * @param {String} label
         * @protected
         */
        _uiSetLabel: function(label) {
            this.get('content').one('.' + CSS_PAGE_BREAK_LABEL).set('text', label);
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
             * The text that will be shown on this page break.
             *
             * @attribute label
             * @default ''
             * @type String
             */
            label: {
                validator: A.Lang.isString,
                value: ''
            }
        }
    }
);
