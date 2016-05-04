/**
 * The Form Builder Pages Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-page-manager
 */

var CSS_FORM_BUILDER_PAGES_CONTENT =
        A.getClassName('form', 'builder', 'page', 'manager', 'content'),
    CSS_FORM_BUILDER_PAGE_CONTROLS = A.getClassName('form', 'builder', 'page', 'controls'),
    CSS_FORM_BUILDER_PAGE_MANAGER_ADD_PAGE_LAST_POSITION =
        A.getClassName('form', 'builder', 'page', 'manager', 'add', 'last', 'position'),
    CSS_FORM_BUILDER_PAGE_MANAGER_DELETE_PAGE =
        A.getClassName('form', 'builder', 'page', 'manager', 'delete', 'page'),
    CSS_FORM_BUILDER_PAGE_MANAGER_POPOVER = A.getClassName('form', 'builder', 'page', 'manager', 'popover'),
    CSS_FORM_BUILDER_PAGE_MANAGER_SWITCH_MODE =
        A.getClassName('form', 'builder', 'page', 'manager', 'switch', 'mode'),
    CSS_FORM_BUILDER_PAGE_POPOVER_CONTENT =
        A.getClassName('form', 'builder', 'pages', 'popover', 'content'),
    CSS_FORM_BUILDER_PAGINATION = A.getClassName('form', 'builder', 'pagination'),
    CSS_FORM_BUILDER_SWITCH_VIEW = A.getClassName('form', 'builder', 'switch', 'view'),
    CSS_FORM_BUILDER_TABS_CONTENT = A.getClassName('form', 'builder', 'tabs', 'content'),
    CSS_FORM_BUILDER_TABVIEW = A.getClassName('form', 'builder', 'tabview'),
    CSS_PAGE_HEADER = A.getClassName('form', 'builder', 'page', 'header'),
    CSS_PAGE_HEADER_DESCRIPTION =
        A.getClassName('form', 'builder', 'page', 'header', 'description'),
    CSS_PAGE_HEADER_DESCRIPTION_HIDE_BORDER =
        A.getClassName('form', 'builder', 'page', 'header', 'description', 'hide', 'border'),
    CSS_PAGE_HEADER_TITLE = A.getClassName('form', 'builder', 'page', 'header', 'title'),
    CSS_PAGE_HEADER_TITLE_HIDE_BORDER =
        A.getClassName('form', 'builder', 'page', 'header', 'title', 'hide', 'border'),
    CSS_TAB_LABEL = A.getClassName('tab', 'label');

/**
 * A base class for Form Builder Pages Builder.
 *
 * @class A.FormBuilderPages
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderPageManager = A.Base.create('form-builder-page-manager', A.Base, [], {

    TPL_PAGE_HEADER: '<div class="' + CSS_PAGE_HEADER + ' form-inline">' +
        '<input placeholder="{untitledPage}" class="' + CSS_PAGE_HEADER_TITLE + ' ' +
        CSS_PAGE_HEADER_TITLE_HIDE_BORDER + ' form-control" type="text" />' +
        '<input placeholder="{aditionalInfo}" class="' + CSS_PAGE_HEADER_DESCRIPTION +
        ' ' +
        CSS_PAGE_HEADER_DESCRIPTION_HIDE_BORDER + ' form-control" type="text" />' +
        '</div>',

    TPL_PAGES: '<div class="' + CSS_FORM_BUILDER_PAGES_CONTENT + '">' +
        '<div class="' + CSS_FORM_BUILDER_PAGINATION + '"></div>' +
        '<div class="' + CSS_FORM_BUILDER_PAGE_CONTROLS + '">' +
        '<a href="javascript:;" class="' + CSS_FORM_BUILDER_SWITCH_VIEW + ' glyphicon glyphicon-th"></a>' +
        '</div></div>',

    TPL_POPOVER_CONTENT: '<ul class="' + CSS_FORM_BUILDER_PAGE_POPOVER_CONTENT + '">' +
        '<li class="' + CSS_FORM_BUILDER_PAGE_MANAGER_ADD_PAGE_LAST_POSITION + '">{addPageLastPosition}</li>' +
        '<li class="' + CSS_FORM_BUILDER_PAGE_MANAGER_DELETE_PAGE + '">{deleteCurrentPage}</li>' +
        '<li class="' + CSS_FORM_BUILDER_PAGE_MANAGER_SWITCH_MODE + '">{switchMode}</li>' +
        '</ul>',

    TPL_TABS: '<div class="' + CSS_FORM_BUILDER_TABS_CONTENT + '">' +
        '<div class="' + CSS_FORM_BUILDER_TABVIEW + '"></div>' +
        '</div>',

    /**
     * Construction logic executed during the `A.FormBuilderPages`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var paginationContainer = this.get('paginationContainer'),
            tabviewContainer = this.get('tabviewContainer'),
            pageHeader = this.get('pageHeader');

        paginationContainer.append(this.TPL_PAGES);
        tabviewContainer.append(this.TPL_TABS);

        pageHeader.append(A.Lang.sub(this.TPL_PAGE_HEADER, {
            aditionalInfo: this.get('strings').aditionalInfo
        }));

        this._renderTopPagination();
        this._renderFooterPagination();

        this._eventHandles = [
            pageHeader.one('.' + CSS_PAGE_HEADER_DESCRIPTION).on('valuechange',
                A.bind(this._onDescriptionInputValueChange, this)
            ),
            pageHeader.one('.' + CSS_PAGE_HEADER_TITLE).on('valuechange',
                A.bind(this._onTitleInputValueChange, this)
            )
        ];

        this.after({
            activePageNumberChange: this._afterActivePageNumberChange,
            pagesQuantityChange: this._afterPagesQuantityChange,
            modeChange: this._afterModeChange
        });

        this._uiSetActivePageNumber(this.get('activePageNumber'));
        this._uiSetMode(this.get('mode'));
    },

    /**
     * Destructor lifecycle implementation for the `A.FormBuilderPages` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var pagination = this._pagination,
            popover = this._popover,
            tabview = this._tabview;

        if (pagination) {
            pagination.destroy();
        }

        if (tabview) {
            tabview.destroy();
        }

        if (popover) {
            popover.destroy();
        }

        (new A.EventHandle(this._eventHandles)).detach();
    },

    /**
     * Disable PaginationVeiw and TabView.
     *
     * @method disablePaginations
     */
    disablePaginations: function() {
        this._disableTabView();
        this._disablePaginationView();
    },

    /**
     * Enable PaginationVeiw and TabView.
     *
     * @method enablePaginations
     */
    enablePaginations: function() {
        this._enableTabView();
        this._enablePaginationView();
    },

    /**
     * Create a new page on Form Builder.
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
     * Create a new tab on Form Builder.
     *
     * @method _addTab
     * @protected
     */
    _addTab: function() {
        var nextIndex = this.get('pagesQuantity'),
            tabview = this._getTabView(),
            title;

        title = this._createUntitledPageLabel(nextIndex, nextIndex);
    
        tabview.add({ label: nextIndex + '.' + title });
        tabview.selectChild(nextIndex - 1);

        this._updateTabViewContent();
    },

    /**
     * Fired after the `activePageNumber` attribute changes.
     *
     * @method _afterActivePageNumberChange
     * @param {EventFacade} event
     * @protected
     */
    _afterActivePageNumberChange: function(event) {
        this._uiSetActivePageNumber(event.newVal);
    },

    /**
     * Fired after the `mode` attribute changes.
     *
     * @method _afterModeChange
     * @protected
     */
    _afterModeChange: function() {
        this._uiSetMode(this.get('mode'));
    },

    /**
     * Fired after the `pagesQuantity` attribute changes.
     *
     * @method _afterPagesQuantityChange
     * @protected
     */
    _afterPagesQuantityChange: function() {
        this._uiSetPagesQuantity(this.get('pagesQuantity'));
        this._syncPopoverContent();
    },

    /**
     * Fired after the `selection` attribute from the tabview changes.
     *
     * @method _afterTabViewSelectionChange
     * @protected
     */
    _afterTabViewSelectionChange: function() {
        var index,
            pagination = this._getPagination(),
            tabview = this._getTabView();

        index = tabview.getTabs().indexOf(tabview.getActiveTab());

        if (index > -1) {
            pagination.set('page', index + 1);
            this.set('activePageNumber', index + 1);
        }
        
    },

    /**
     * Creates pagination.
     *
     * @method _createPagination
     * @return {A.Pagination}
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
     * Creates popover.
     *
     * @method _createPopover
     * @return {A.Popover}
     * @protected
     */
    _createPopover: function() {
        var popoverContent,
            paginationMenu = this.get('paginationContainer').one('.' + CSS_FORM_BUILDER_SWITCH_VIEW),
            popover;

        popoverContent = A.Lang.sub(this.TPL_POPOVER_CONTENT, {
            addPageLastPosition: this.get('strings').addPageLastPosition,
            addPageNextPosition: this.get('strings').addPageNextPosition,
            deleteCurrentPage: this._getDeleteButtonString(),
            switchMode: this.get('strings').switchMode
        });

        popover = new A.Popover({
            align: {
                node: paginationMenu
            },
            bodyContent: popoverContent,
            constrain: true,
            cssClass: CSS_FORM_BUILDER_PAGE_MANAGER_POPOVER,
            position: 'top',
            visible: false,
            zIndex: 50
        }).render();

        paginationMenu.after('click', popover.toggle, popover);
        paginationMenu.after('clickoutside', popover.hide, popover);

        popover.get('boundingBox').one('.' + CSS_FORM_BUILDER_PAGE_MANAGER_ADD_PAGE_LAST_POSITION).on('click',
            A.bind(this._onAddLastPageClick, this)
        );
        popover.get('boundingBox').one('.' + CSS_FORM_BUILDER_PAGE_MANAGER_DELETE_PAGE).on('click',
            A.bind(this._onRemovePageClick, this)
        );
        popover.get('boundingBox').one('.' + CSS_FORM_BUILDER_PAGE_MANAGER_SWITCH_MODE).on('click',
            A.bind(this._onSwitchViewClick, this)
        );

        return popover;
    },

    /**
     * Creates tab view.
     *
     * @method _createTabView
     * @return {A.TabView}
     * @protected
     */
    _createTabView: function() {
        var tabview;

        tabview = new A.TabView({
            boundingBox: '.' + CSS_FORM_BUILDER_TABVIEW
        });

        tabview.get('contentBox').toggleView();
        tabview.after('selectionChange', A.bind(this._afterTabViewSelectionChange, this));

        return tabview;
    },

    /**
     * Returns an untitled page string based on strings attribute.
     *
     * @method _createUntitledPageLabel
     * @param {Number} activePageNumber
     * @param {Number} pagesQuantity
     * @return {String}
     * @protected
     */
    _createUntitledPageLabel: function(activePageNumber, pagesQuantity) {
        var title;

        title = A.Lang.sub(this.get('strings').untitledPage, {
            activePageNumber: activePageNumber,
            pagesQuantity: pagesQuantity
        });

        return title;
    },

    /**
     * Disable Pagination items.
     *
     * @method _disablePaginationView
     * @protected
     */
    _disablePaginationView: function() {
        this._getPagination().get('items').addClass('disabled');
    },

    /**
     * Disable TabView items.
     *
     * @method _disableTabView
     * @protected
     */
    _disableTabView: function() {
        var tabView = this._getTabView();

        A.each(this._getTabView().getTabs(), function(tab, index) {
            tabView.disableTab(index);
        });
    },

    /**
     * Enable Pagination items.
     *
     * @method _enablePaginationView
     * @protected
     */
    _enablePaginationView: function() {
        this._getPagination().get('items').removeClass('disabled');
    },

    /**
     * Enable TabView items.
     *
     * @method _enablePaginationView
     * @protected
     */
    _enableTabView: function() {
        var tabView = this._getTabView();

        A.each(this._getTabView().getTabs(), function(tab, index) {
            tabView.enableTab(index);
        });
    },

    /**
     * Returns the delete button string according to the page quantity.
     *
     * @method _getDeleteButtonLabel
     * @return {String}
     * @protected
     */
    _getDeleteButtonString: function() {
        var deleteButtonString;

        if (this.get('pagesQuantity') > 1) {
            deleteButtonString = this.get('strings').deleteCurrentPage;
        }
        else {
            deleteButtonString = this.get('strings').resetPage;
        }

        return deleteButtonString;
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

        if (!this._popover) {
            this._popover = this._createPopover();
        }

        return this._pagination;
    },

    /**
     * Returns the popover instance.
     *
     * @method _getPopover
     * @return {A.Popover}
     * @protected
     */
    _getPopover: function() {
        return this._popover;
    },

    /**
     * Returns the tab view instance.
     *
     * @method _getTabView
     * @return {A.TabView}
     * @protected
     */
    _getTabView: function() {
        var index,
            pages = this.get('pagesQuantity'),
            title,
            titles = this.get('titles');

        if (!this._tabview) {
            this._tabview = this._createTabView();

            for (index = 0; index < pages; index++) {
                title = titles[index];

                if (!title) {
                    title = this._createUntitledPageLabel((index + 1), pages);
                }

                this._tabview.add({ label: (index + 1) + '.' + title });
            }

            this._tabview.selectChild(this.get('activePageNumber') - 1);
        }

        return this._tabview;
    },

    /**
     * Fired on `Add new page after last` element clicked.
     *
     * @method _onAddLastPageClick
     * @protected
     */
    _onAddLastPageClick: function() {
        this._addPage();
        this._addTab();
        this._getPopover().hide();
    },

    /**
     * Fired on current page change.
     *
     * @method _onCurrentPageChange
     * @protected
     */
    _onCurrentPageChange: function(event) {
        this._getPopover().hide();
        this.set('activePageNumber', event.newVal);
    },

    /**
     * Fired on description input value change.
     *
     * @method _onDescriptionInputValueChange
     * @param {EventFacade} event
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
            page = Math.max(1, activePageNumber - 1),
            titles = this.get('titles');

        this._getPagination().prev();
        this._getPopover().hide();

        this.set('pagesQuantity', this.get('pagesQuantity') - 1);

        this.fire(
            'remove', {
                removedIndex: activePageNumber - 1
            }
        );

        // We need to improve aui-pagination. This should be done
        // automatically after the 'page' attribute is set.
        this._pagination.getItem(page).addClass('active');

        titles.splice(activePageNumber - 1, 1);
        this.set('titles', titles);

        this._removeTab(activePageNumber - 1);

        if (!this.get('pagesQuantity')) {
            this._addPage();
            this._addTab();
        }
    },

    /**
     * Fired on switch view button clicked.
     *
     * @method _onSwitchViewClick
     * @protected
     */
    _onSwitchViewClick: function() {
        this._getPopover().hide();

        if (this.get('mode') === 'pagination') {
            this.set('mode', 'tabs');
        }
        else {
            this.set('mode', 'pagination');
        }
    },

    /**
     * Fired on title input value change.
     *
     * @method _onTitleInputValueChange
     * @param {EventFacade} event
     * @protected
     */
    _onTitleInputValueChange: function(event) {
        var activePageNumber = this.get('activePageNumber'),
            activeTab = this._getTabView().getActiveTab(),
            pagesQuantity = this.get('pagesQuantity'),
            title = event.newVal.trim(),
            titles = this.get('titles');

        titles[activePageNumber - 1] = title;

        if (!title) {
            title = this._createUntitledPageLabel(activePageNumber, pagesQuantity);
        }

        activeTab.one('.' + CSS_TAB_LABEL).set('text', activePageNumber + '.' + title);
        this.set('titles', titles);
    },

    /**
     * Remove a tab from Form Builder.
     *
     * @method _removeTab
     * @param {Number} index
     * @protected
     */
    _removeTab: function(index) {
        var tabview = this._getTabView();

        if (index > 0) {
            tabview.selectChild(index - 1);
        }

        tabview.remove(index);
        this._updateTabViewContent();
    },

    /**
     * Render default footer pagination
     *
     * @method _renderFooterPagination
     * @protected
     */
    _renderFooterPagination: function() {
        this._getPagination().render();
    },

    /**
     * Render default top pagination
     *
     * @method _renderTopPagination
     * @protected
     */
    _renderTopPagination: function() {
        this._getTabView().render();
    },

    /**
     * Updates the popover content ui.
     *
     * @method _syncPopoverContent
     * @protected
     */
    _syncPopoverContent: function() {
        var deletePageButton = this._getPopover().get('boundingBox').one('.' + CSS_FORM_BUILDER_PAGE_MANAGER_DELETE_PAGE);

        deletePageButton.text(this._getDeleteButtonString());
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
            pagesQuantity = this.get('pagesQuantity'),
            titleNode = pageHeader.one('.' + CSS_PAGE_HEADER_TITLE),
            untitledPageTemplate;

        if (!title) {
            untitledPageTemplate = this._createUntitledPageLabel(activePageNumber, pagesQuantity);
            titleNode.attr('placeholder', untitledPageTemplate);
        }

        titleNode.set('value', title || '');
        descriptionNode.set('value', description || '');
    },

    /**
     * Switch the pages mode view.
     *
     * @method _uiSetMode
     * @param {String} type
     * @protected
     */
     _uiSetMode: function(type) {
        var activePageNumber = this.get('activePageNumber'),
            pagination = this._getPagination(),
            tabview = this._getTabView();

        if (type === 'tabs') {
            pagination.get('contentBox').hide();
            tabview.get('contentBox').show();
            tabview.selectChild(activePageNumber - 1);
        }
        else {
            pagination.get('contentBox').show();
            tabview.get('contentBox').hide();
            pagination.set('page', activePageNumber);
        }
    },

    /**
     * Updates the ui according to the value of the `pagesQuantity` attribute.
     *
     * @method _uiSetPagesQuantity
     * @param {Number} total
     * @protected
     */
    _uiSetPagesQuantity: function(total) {
        var activePageNumber = this.get('activePageNumber'),
            pagination = this._getPagination();

        pagination.set('total', total);

        pagination.set('page', activePageNumber);
        pagination.getItem(activePageNumber).addClass('active');
        this._uiSetActivePageNumber(activePageNumber);
    },

    /**
     * Update all tabs title based on titles attribute.
     *
     * @method _updateTabViewContent
     * @protected
     */
    _updateTabViewContent: function() {
        var index,
            pages = this.get('pagesQuantity'),
            tabs = this._getTabView().get('contentBox').all('.tab-content'),
            title,
            titles = this.get('titles');

        for (index = 0; index < pages; index++) {
            title = titles[index];

            if (!title) {
                title = this._createUntitledPageLabel(index + 1, pages);
            }

            tabs.item(index).set('text', (index + 1) + '.' + title);
        }
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
         * The mode of the pages visualization. Could be pagination or tabs.
         *
         * @attribute mode
         * @default 'pagination'
         * @type {String}
         */
        mode: {
            validator: function(value) {
                return (value === 'pagination' || value === 'tabs');
            },
            value: 'pagination'
        },

        /**
         * Container for the page's header.
         *
         * @attribute pageHeader
         * @default null
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
         * Container for the paginator.
         *
         * @attribute paginationContainer
         * @default null
         * @type {Node}
         * @writeOnce
         */
        paginationContainer: {
            setter: A.one,
            writeOnce: true
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
                addPageLastPosition: 'Add new page',
                aditionalInfo: 'An aditional info about this page',
                deleteCurrentPage: 'Delete current page',
                resetPage: 'Reset page',
                switchMode: 'Switch pagination mode',
                untitledPage: 'Untitled page ({activePageNumber} of {pagesQuantity})'
            },
            writeOnce: true
        },

        /**
         * Container for the tab view.
         *
         * @attribute tabviewContainer
         * @default null
         * @type {Node}
         * @writeOnce
         */
        tabviewContainer: {
            setter: A.one,
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
