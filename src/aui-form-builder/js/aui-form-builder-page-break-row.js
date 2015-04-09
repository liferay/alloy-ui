/**
 * The Form Builder Page Break Row Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-page-break-row
 */

var CSS_PAGE_BREAK_ROW = A.getClassName('form', 'builder', 'page', 'break', 'row'),
    CSS_PAGE_BREAK_ROW_CONTAINER_ROW =
        A.getClassName('form', 'builder', 'page', 'break', 'row', 'container', 'row'),
    CSS_PAGE_BREAK_TITLE = A.getClassName('form', 'builder', 'page', 'break', 'title'),
    CSS_PAGE_BREAK_TITLE_EDIT_ICON =
        A.getClassName('form', 'builder', 'page', 'break', 'title', 'edit', 'icon'),
    CSS_PAGE_BREAK_TITLE_HIDE_BORDER =
        A.getClassName('form', 'builder', 'page', 'break', 'title', 'hide', 'border'),

    SOURCE_UI = 'ui',

    TPL_PAGE_BREAK_ROW = '<div class="' + CSS_PAGE_BREAK_ROW + ' form-inline">' +
        '<label class="' + CSS_PAGE_BREAK_TITLE_EDIT_ICON +
        '"><span class="glyphicon glyphicon-pencil"></span></label>' +
        '<input tabindex="1" class="' + CSS_PAGE_BREAK_TITLE + ' ' +
        CSS_PAGE_BREAK_TITLE_HIDE_BORDER + ' form-control" type="text"></input> ' +
        '</div>';

/**
 * A base class for Form Builder Page Break Row.
 *
 * @class A.FormBuilderPageBreakRow
 * @extends A.LayoutRow
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderPageBreakRow = A.Base.create(
    'form-builder-page-break-row',
    A.LayoutRow,
    [], {

        /**
         * Constructor for the `A.FormBuilderPageBreakRow`. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var inputNode,
                node = this.get('node');

            inputNode = node.one('.' + CSS_PAGE_BREAK_TITLE);
            this._defaultTitleValue = 'Untitled Page';

            this._uiSetTitle(this.get('title'));

            this.after('indexChange', this._afterIndexChange);
            this.after('quantityChange', this._afterQuantityChange);
            this.after('titleChange', this._afterTitleChange);

            node.addClass(CSS_PAGE_BREAK_ROW_CONTAINER_ROW);

            inputNode.on('mouseover', A.bind(this._onMouseOver, this));
            node.one('.' + CSS_PAGE_BREAK_TITLE_EDIT_ICON).on('click',
                A.bind(this._onTitleEditIconClick, this));

            inputNode.on('mouseout', A.bind(this._onMouseOut, this));

            node.one('.' + CSS_PAGE_BREAK_TITLE).on('valuechange',
                A.bind(this._onInputValueChange, this));

            node.one('.' + CSS_PAGE_BREAK_TITLE).on('blur', this._onInputBlur, this);
            node.one('.' + CSS_PAGE_BREAK_TITLE).on('focus', this._onInputFocus, this);
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
         * Fired after the `title` attribute is set.
         *
         * @method _afterTitleChange
         * @protected
         */
        _afterTitleChange: function(event) {
            if (event.src !== SOURCE_UI) {
                this._uiSetTitle(this.get('title'));
            }
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
                this._contentNode = A.Node.create(TPL_PAGE_BREAK_ROW);
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
         * Hide input's border of title.
         *
         * @method _hideTitleBorder
         * @protected
         */
        _hideTitleBorder: function() {
            var inputNode = this._getContentNode().one('.' + CSS_PAGE_BREAK_TITLE);

            inputNode.addClass(CSS_PAGE_BREAK_TITLE_HIDE_BORDER);
        },

        /**
         * Fire when `blur` the title item.
         *
         * @method _onInputBlur
         * @protected
         */
        _onInputBlur: function() {
            this._focused = false;
            this._hideTitleBorder();
            this._uiSetTitle(this.get('title'));
        },

        /**
         * Fire when `focus` the title item.
         *
         * @method _onInputFocus
         * @protected
         */
        _onInputFocus: function() {
            this._focused = true;
            this._showTitleBorder();
        },

        /**
         * Fired on input value change.
         *
         * @method _onInputValueChange
         * @protected
         */
        _onInputValueChange: function(event) {
            this.set('title', event.newVal, {
                src: SOURCE_UI
            });
        },

        /**
         * Fire when `mouseout` the title item.
         *
         * @method _onMouseOut
         * @protected
         */
        _onMouseOut: function() {
            if (!this._focused) {
                this._hideTitleBorder();
            }
        },

        /**
         * Fire when `mouseover` the title item.
         *
         * @method _onMouseOver
         * @protected
         */
        _onMouseOver: function() {
            this._showTitleBorder();
        },

        /**
         * Fire when `click` the edit icon item.
         *
         * @method _onTitleEditIconClick
         * @protected
         */
        _onTitleEditIconClick: function() {
            this._getContentNode().one('.' + CSS_PAGE_BREAK_TITLE).focus();
        },

        /**
         * Shows input's border from title.
         *
         * @method _showTitleBorder
         * @protected
         */
        _showTitleBorder: function() {
            var inputNode = this._getContentNode().one('.' + CSS_PAGE_BREAK_TITLE);

            inputNode.removeClass(CSS_PAGE_BREAK_TITLE_HIDE_BORDER);
        },

        /**
         * Updates the ui according to the value of the `index` attribute.
         *
         * @method _uiSetIndex
         * @protected
         */
        _uiSetIndex: function() {
            this._uiSetTitle(this.get('title'));
        },

        /**
         * Updates the ui according to the value of the `quantity` attribute.
         *
         * @method _uiSetQuantity
         * @protected
         */
        _uiSetQuantity: function() {
            this._uiSetTitle(this.get('title'));
        },

        /**
         * Updates the ui according to the value of the `title` attribute.
         *
         * @method _uiSetTitle
         * @param {String} title
         * @protected
         */
        _uiSetTitle: function(title) {
            var inputNode = this._getContentNode().one('.' + CSS_PAGE_BREAK_TITLE);

            if (!title.trim()) {
                inputNode.set('value', this._defaultTitleValue +
                    ' ' + this.get('index') + '/' + this.get('quantity'));
            }
            else {
                this.get('node').one('.' + CSS_PAGE_BREAK_TITLE).set('value', title);
            }
        }
    }, {
        /**
         * Static property used to define the default attribute configuration
         * for the `A.FormBuilderPageBreakRow`.
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
            },

            /**
             * The title of this Page Break.
             *
             * @attribute title
             * @default ''
             * @type {String}
             */
            title: {
                value: ''
            }
        }
    }
);
