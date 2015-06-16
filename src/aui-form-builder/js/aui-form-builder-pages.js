/**
 * The Form Builder Pages Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-pages
 */

var CSS_FORM_BUILDER_ADD_PAGE = A.getClassName('form', 'builder', 'pages', 'add', 'page'),
    CSS_FORM_BUILDER_PAGE_CONTROLS = A.getClassName('form', 'builder', 'page', 'controls'),
    CSS_FORM_BUILDER_PAGES_CONTENT = A.getClassName('form', 'builder', 'pages', 'content'),
    CSS_FORM_BUILDER_PAGINATION = A.getClassName('form', 'builder', 'pagination'),
    CSS_FORM_BUILDER_REMOVE_PAGE = A.getClassName('form', 'builder', 'pages', 'remove', 'page'),
    CSS_PAGE_HEADER = A.getClassName('form', 'builder', 'page', 'header'),
    CSS_PAGE_HEADER_DESCRIPTION = A.getClassName('form', 'builder', 'page', 'header', 'description'),
    CSS_PAGE_HEADER_DESCRIPTION_HIDE_BORDER = A.getClassName('form', 'builder', 'page', 'header', 'description', 'hide',
        'border'),
CSS_PAGE_HEADER_TITLE = A.getClassName('form', 'builder', 'page', 'header', 'title'),
CSS_PAGE_HEADER_TITLE_HIDE_BORDER = A.getClassName('form', 'builder', 'page', 'header', 'title', 'hide', 'border');

/**
 * A base class for Form Builder Pages Builder.
 *
 * @class A.FormBuilderPages
 * @extends A.Widget
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderPages = A.Base.create('form-builder-pages', A.Widget, [], {

    TPL_PAGE_HEADER: '<div class="' + CSS_PAGE_HEADER + ' form-inline">' +
        '<input placeholder="{untitledPage}" tabindex="1" class="' + CSS_PAGE_HEADER_TITLE + ' ' +
        CSS_PAGE_HEADER_TITLE_HIDE_BORDER + ' form-control" type="text" />' +
        '<input placeholder="{aditionalInfo}" tabindex="2" class="' + CSS_PAGE_HEADER_DESCRIPTION +
        ' ' +
        CSS_PAGE_HEADER_DESCRIPTION_HIDE_BORDER + ' form-control" type="text" />' +
        '</div>',

    TPL_PAGES: '<div class="' + CSS_FORM_BUILDER_PAGES_CONTENT + '">' +
        '<div class="' + CSS_FORM_BUILDER_PAGINATION + '"></div>' +
        '<div class="' + CSS_FORM_BUILDER_PAGE_CONTROLS + '">' +
        '<a href="javascript:;" class="' + CSS_FORM_BUILDER_REMOVE_PAGE + ' glyphicon glyphicon-trash"></a>' +
        '<a href="javascript:;" class="' + CSS_FORM_BUILDER_ADD_PAGE + ' glyphicon glyphicon-plus"></a>' +
        '</div></div>',

    /**
     * Renders the `A.FormBuilderPages` UI. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var headerTemplate;

        headerTemplate = A.Lang.sub(this.TPL_PAGE_HEADER, {
            aditionalInfo: this.get('strings').aditionalInfo
        });

        this.get('contentBox').append(this.TPL_PAGES);
        this.get('pageHeader').append(headerTemplate);

        this._getPagination().render();

        this._uiSetActivePageNumber(this.get('activePageNumber'));
    },

    /**
     * Bind the events for the `A.FormBuilderPages` UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var contentBox = this.get('contentBox'),
            pageHeader = this.get('pageHeader');

        contentBox.one('.' + CSS_FORM_BUILDER_ADD_PAGE).on('click', A.bind(this._onAddPageClick, this));
        contentBox.one('.' + CSS_FORM_BUILDER_REMOVE_PAGE).on('click', A.bind(this._onRemovePageClick, this));

        pageHeader.one('.' + CSS_PAGE_HEADER_DESCRIPTION).on('valuechange', A.bind(this._onDescriptionInputValueChange,
            this));
        pageHeader.one('.' + CSS_PAGE_HEADER_TITLE).on('valuechange', A.bind(this._onTitleInputValueChange, this));

        this.after({
            activePageNumberChange: this._afterActivePageNumberChange,
            pagesQuantityChange: this._afterPagesQuantityChange
        });
    },

    /**
     * Create a new page on Form Field.
     *
     * @method _addPage
     * @protected
     */
    _addPage: function() {
        var quantity = this.get('pagesQuantity');

        this.set('pagesQuantity', quantity + 1);

        this.fire(
            'add', {
                quantity: quantity
            }
        );

        this._pagination.set('page', this.get('pagesQuantity'));

        if (quantity === 0) {
            this.fire(
                'updatePageContent', {
                    newVal: 1
                }
            );
        }
    },

    /**
     * Fired after the `activePageNumber` attribute changes.
     *
     * @method _afterActivePageNumberChange
     * @protected
     */
    _afterActivePageNumberChange: function(event) {
        this._uiSetActivePageNumber(event.newVal);
    },

    /**
     * Fired after the `pagesQuantity` attribute changes.
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
        return new A.Pagination({
            boundingBox: '.' + CSS_FORM_BUILDER_PAGINATION,
            on: {
                pageChange: A.bind(this._onCurrentPageChange, this)
            },
            page: this.get('activePageNumber'),
            strings: {
                prev: '&#xAB;',
                next: '&#xBB;'
            },
            total: this.get('pagesQuantity')
        });
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
        this._addPage();
    },

    /**
     * Fired on current page change.
     *
     * @method _onCurrentPageChange
     * @protected
     */
    _onCurrentPageChange: function(event) {
        this.set('activePageNumber', event.newVal);
    },

    /**
     * Fired on input value change.
     *
     * @method _onTitleInputValueChange
     * @protected
     */
    _onDescriptionInputValueChange: function(event) {
        var descriptions = this.get('descriptions');

        descriptions[this.get('activePageNumber') - 1] = event.newVal.trim();
    },

    /**
     * Fired on remove button clicked.
     *
     * @method _onRemovePageClick
     * @protected
     */
    _onRemovePageClick: function() {
        var activePageNumber = this.get('activePageNumber'),
            page = Math.max(1, activePageNumber - 1);

        this._getPagination().prev();
        this.set('pagesQuantity', this.get('pagesQuantity') - 1);

        this.fire(
            'remove', {
                removedIndex: activePageNumber - 1
            }
        );

        this._pagination.set('page', page);

        // We need to improve aui-pagination. This should be done
        // automatically after the 'page' attribute is set.
        this._pagination.getItem(page).addClass('active');

        if (!this.get('pagesQuantity')) {
            this._addPage();
        }
    },

    /**
     * Fired on input value change.
     *
     * @method _onTitleInputValueChange
     * @protected
     */
    _onTitleInputValueChange: function(event) {
        var titles = this.get('titles');

        titles[this.get('activePageNumber') - 1] = event.newVal.trim();
    },

    /**
     * Updates the ui according to the value of the `activePageNumber` attribute.
     *
     * @method _uiSetActivePageNumber
     * @param {Number} activePageNumber
     * @protected
     */
    _uiSetActivePageNumber: function(activePageNumber) {
        var description = this.get('descriptions')[activePageNumber - 1],
            title = this.get('titles')[activePageNumber - 1],
            pageHeader = this.get('pageHeader'),
            descriptionNode = pageHeader.one('.' + CSS_PAGE_HEADER_DESCRIPTION),
            titleNode = pageHeader.one('.' + CSS_PAGE_HEADER_TITLE),
            untitledPageTemplate;

        if (!title) {
            untitledPageTemplate = A.Lang.sub(this.get('strings').untitledPage, {
                activePageNumber: activePageNumber,
                pagesQuantity: this.get('pagesQuantity')
            });
            titleNode.attr('placeholder', untitledPageTemplate);
        }

        titleNode.set('value', title || '');
        descriptionNode.set('value', description || '');
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

        pagination.set('page', this.get('activePageNumber'));
        this._pagination.getItem(this.get('activePageNumber')).addClass('active');
        this._uiSetActivePageNumber(this.get('activePageNumber'));
    }
}, {
    ATTRS: {
        /**
         * Index of the current active page.
         *
         * @attribute activePageNumber
         * @default 1
         * @type {Number}
         */
        activePageNumber: {
            value: 1
        },

        /**
         * List of all pages descriptions.
         *
         * @attribute descriptions
         * @default []
         * @type {Array}
         * @writeOnce
         */
        descriptions: {
            value: []
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
            value: 1
        },

        /**
         * Collection of strings used to label elements of the UI. To Untitled Page text,
         * the string used should follow this have placeholder to Active Page Number and
         * Pages Quantity, e.g. `Untitled Page ({activePageNumber} of {pagesQuantity})`.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                aditionalInfo: 'An aditional info about this page',
                untitledPage: 'Untitled Page ({activePageNumber} of {pagesQuantity})'
            },
            writeOnce: true
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
