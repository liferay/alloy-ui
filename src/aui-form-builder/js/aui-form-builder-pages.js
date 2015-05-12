/**
 * The Form Builder Pages Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-pages
 */

var CSS_FORM_BUILDER_ADD_PAGE =
        A.getClassName('form', 'builder', 'pages', 'add', 'page'),
    CSS_FORM_BUILDER_PAGES_CONTENT =
        A.getClassName('form', 'builder', 'pages', 'content'),
    CSS_FORM_BUILDER_REMOVE_PAGE =
        A.getClassName('form', 'builder', 'pages', 'remove', 'page'),
    CSS_FORM_BUILDER_PAGINATION = A.getClassName('form', 'builder', 'pagination'),
    CSS_PAGE_HEADER = A.getClassName('form', 'builder', 'page', 'header'),
    CSS_PAGE_HEADER_ICON = A.getClassName('form', 'builder', 'page', 'header', 'icon'),
    CSS_PAGE_HEADER_TITLE = A.getClassName('form', 'builder', 'page', 'header', 'title'),
    CSS_PAGE_HEADER_TITLE_HIDE_BORDER =
        A.getClassName('form', 'builder', 'page', 'header', 'title', 'hide', 'border');

/**
 * A base class for Form Builder Pages Builder.
 *
 * @class A.FormBuilderPages
 * @uses A.FormBuilderBuilder
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderPages = A.Base.create('form-builder-pages', A.Widget, [], {

    TPL_PAGES: '<div class="' + CSS_FORM_BUILDER_PAGES_CONTENT + '">' +
        '<div class="' + CSS_FORM_BUILDER_PAGINATION + '"></div>' +
        '<div class="' + CSS_FORM_BUILDER_ADD_PAGE + ' glyphicon glyphicon-plus"></div>' +
        '<div class="' + CSS_FORM_BUILDER_REMOVE_PAGE + ' glyphicon glyphicon-trash"></div>' +
        '</div>',
    TPL_PAGE_HEADER: '<div class="' + CSS_PAGE_HEADER + ' form-inline">' +
        '<label class="' + CSS_PAGE_HEADER_ICON +
        '"><span class="glyphicon glyphicon-pencil"></span></label>' +
        '<input tabindex="1" class="' + CSS_PAGE_HEADER_TITLE + ' ' +
        CSS_PAGE_HEADER_TITLE_HIDE_BORDER + ' form-control" type="text"></input> ' +
        '</div>',


    /**
     * Constructor for the `A.FormBuilderPages`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.get('contentBox').append(this.TPL_PAGES);
        this.get('pageHeader').append(this.TPL_PAGE_HEADER);

        this._defaultTitleValue = 'Untitled Page';
    },

    /**
     * Renders the `A.FormBuilderPages` UI. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        this._uiSetActiveIndexPage(this.get('activeIndex'));
        this._getPagination().render();
    },

    /**
     * Bind the events for the `A.FormBuilderPages` UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var content = this.get('contentBox'),
            pageHeader = this.get('pageHeader');

        content.one('.' + CSS_FORM_BUILDER_ADD_PAGE).on('click', A.bind(this._onAddPageClick, this));
        content.one('.' + CSS_FORM_BUILDER_REMOVE_PAGE).on('click', A.bind(this._onRemovePageClick, this));
        this.after('pagesQuantityChange', A.bind(this._afterPagesQuantityChange, this));
        this.after('activeIndexPageChange', A.bind(this._afterActiveIndexPageChange, this));
        pageHeader.one('.' + CSS_PAGE_HEADER_TITLE).on('valuechange', A.bind(this._onInputValueChange, this));
    },

    /**
     * Fires after `activeIndexPage` changes.
     *
     * @method _afterActiveIndexPageChange
     * @protected
     */
    _afterActiveIndexPageChange: function() {
        this._uiSetActiveIndexPage(this.get('activeIndexPage'));
    },

    /**
     * 
     *
     * @method _afterPagesQuantityChange
     * @protected
     */
    _afterPagesQuantityChange: function() {
        this._uiSetPagesQuantity(this.get('pagesQuantity'));
    },

    /**
     * Creates pagination.
     *
     * @method _createPagination
     * @return {Node}
     * @protected
     */
    _createPagination: function() {
        var pagination = new A.Pagination({
            boundingBox: '.' + CSS_FORM_BUILDER_PAGINATION,
            page: this.get('activeIndexPage'),
            total: this.get('pagesQuantity')
        });

        pagination.on('pageChange', A.bind(this._onCurrentPageChange, this));

        return pagination;
    },

    /**
     * Returns the pagination instance.
     *
     * @method _getPagination
     * @return {A.Pagination}
     * @protected
     */
    _getPagination: function() {
        if (!this._pagination) {
            this._pagination = this._createPagination();
        }

        return this._pagination;
    },

    /**
     * Fired on add button clicked.
     *
     * @method _onAddPageClick
     * @protected
     */
    _onAddPageClick: function() {
        var quantity = this.get('pagesQuantity');

        this.set('pagesQuantity', quantity + 1);

        this.fire(
            'add', {
                quantity: quantity
            }
        );
    },

    /**
     * Fired on current page change.
     *
     * @method _onCurrentPageChange
     * @protected
     */
    _onCurrentPageChange: function(event) {
        this.get('contentBox').one('.' + CSS_PAGE_HEADER_TITLE);
        this.set('activeIndexPage', event.newVal - 1);
    },

    /**
     * Fired on input value change.
     *
     * @method _onInputValueChange
     * @protected
     */
    _onInputValueChange: function(event) {
        var newTitles = this.get('titles');

        newTitles[this.get('activeIndexPage')] = event.newVal;
        this.set('title', newTitles);
    },

    /**
     * Fired on remove button clicked.
     *
     * @method _onRemovePageClick
     * @protected
     */
    _onRemovePageClick: function() {
        var activeIndex = this.get('activeIndexPage');

        this._getPagination().prev();
        this.set('pagesQuantity', this.get('pagesQuantity') - 1);

        this.fire(
            'remove', {
                removedIndex: activeIndex
            }
        );
    },

    /**
     * Updates the ui according to the value of the `pagesQuantity` attribute.
     *
     * @method _uiSetPagesQuantity
     * @protected
     */
    _uiSetPagesQuantity: function(total) {
        var pagination = this._getPagination();

        pagination.set('total', total);

        this._uiSetActiveIndexPage(this.get('activeIndexPage'));
    },

    /**
     * Updates the ui according to the value of the `title` attribute.
     *
     * @method _uiSetTitle
     * @param {String} title
     * @protected
     */
    _uiSetActiveIndexPage: function(activeIndex) {
        var title = this.get('titles')[activeIndex],
            inputNode = this.get('pageHeader').one('.' + CSS_PAGE_HEADER_TITLE);

        if (!title || !title.trim()) {
            inputNode.set('value', this._defaultTitleValue + ' (' +
                this.get('activeIndexPage') + ' of ' + this.get('pagesQuantity') + ')');
        }
        else {
            inputNode.set('value', title);
        }
    }
}, {
    ATTRS: {
        /**
         * Index of the current active page.
         *
         * @attribute activeIndexPage
         * @default 1
         * @type {Number}
         */
        activeIndexPage: {
            value: 1
        },

        /**
         * 
         *
         * @attribute pageHeader
         * @default 0
         * @type {Node}
         * @writeOnce
         */
        pageHeader: {
            setter: A.one,
            writeOnce: true
        },

        /**
         * Total of pages.
         *
         * @attribute pagesQuantity
         * @default 0
         * @type {Number}
         */
        pagesQuantity: {
            value: 0
        },

        /**
         * List of all pages titles.
         *
         * @attribute titles
         * @default []
         * @type {Array}
         * @writeOnce
         */
        titles: {
            value: []
        }
    }
});
