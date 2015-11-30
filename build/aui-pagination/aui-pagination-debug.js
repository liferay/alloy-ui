YUI.add('aui-pagination', function (A, NAME) {

/**
 * The Pagination widget provides a set of controls to navigate through paged
 * data.
 *
 * @module aui-pagination
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isFunction = Lang.isFunction,
    isNumber = Lang.isNumber,

    getCN = A.getClassName,

    CSS_ACTIVE = getCN('active'),
    CSS_DISABLED = getCN('disabled'),
    CSS_PAGINATION_CONTROL = getCN('pagination', 'control');

/**
 * A base class for Pagination, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - Set of controls to navigate through paged data
 *
 * Check the [live demo](http://alloyui.com/examples/pagination/).
 *
 * @class A.Pagination
 * @extends A.Component
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/pagination/basic-markup.html
 * @include http://alloyui.com/examples/pagination/basic.js
 */
var Pagination = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'pagination',

    /**
     * Static property used to define the default attribute configuration for
     * the `A.Pagination`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * When enabled this property allows the navigation to go back to the
         * beggining when it reaches the last page, the opposite behavior is
         * also true. Incremental page navigation could happen clicking the
         * control arrows or invoking `.next()` and `.prev()` methods.
         *
         * @attribute circular
         * @default true
         * @type {Boolean}
         */
        circular: {
            validator: isBoolean,
            value: true
        },

        /**
         * A formatter function to format each pagination item.
         *
         * @attribute formatter
         * @type {Function}
         */
        formatter: {
            validator: isFunction,
            valueFn: '_formatterValueFn'
        },

        /**
         * Holds the page items as a `NodeList`. The list could be queried from
         * the DOM trough Widget `HTML_PARSER` or generated if
         * [total](A.Pagination.html#attr_total) is specified.
         *
         * @attribute items
         * @default undefined
         * @type {NodeList}
         */
        items: {},

        /**
         * Initial page offset.
         *
         * @attribute offset
         * @default 1
         * @type {Number}
         */
        offset: {
            setter: '_setInt',
            value: 1
        },

        /**
         * Page to display on initial paint.
         *
         * @attribute page
         * @default 0
         * @type {Number}
         */
        page: {
            setter: '_setInt',
            value: 0
        },

        /**
         * Total number of page links available. If set, the new
         * [items](A.Pagination.html#attr_items) node list will be rendered.
         *
         * @attribute total
         * @default 0
         * @type {Number}
         */
        total: {
            setter: '_setInt',
            value: 0
        },

        /**
         * Determines if pagination controls (Next and Prev) are rendered.
         *
         * @attribute page
         * @default true
         * @type {boolean}
         */
        showControls: {
            validator: isBoolean,
            value: true
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                next: 'Next',
                prev: 'Prev'
            }
        }
    },

    /**
     * Object hash, defining how attribute values are to be parsed from markup
     * contained in the widget's content box.
     *
     * @property HTML_PARSER
     * @type {Object}
     * @static
     */
    HTML_PARSER: {
        items: function(srcNode) {
            return this._queryItemsIfNotSet(srcNode);
        },
        total: function() {
            return this._countItemsInDoc();
        }
    },

    /**
     * Static property used to define the attributes for the bindUI lifecycle
     * phase.
     *
     * @property BIND_UI_ATTRS
     * @type {Array}
     * @static
     */
    BIND_UI_ATTRS: ['offset', 'page', 'showControls', 'total'],

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type {Array}
     * @static
     */
    UI_ATTRS: ['page'],

    prototype: {
        CONTENT_TEMPLATE: '<ul class="pagination"></ul>',
        ITEM_TEMPLATE: '<li class="{cssClass}"><a href="#">{content}</a></li>',
        TOTAL_CONTROLS: 2,

        items: null,
        lastState: null,

        /**
         * Sync the `A.Pagination` UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this,
                page = instance.get('page');

            if (page > 0) {
                instance._dispatchRequest({
                    page: page
                });
            }
        },

        /**
         * Bind the events on the `A.Pagination` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this,
                boundingBox = instance.get('boundingBox');

            instance.on('pageChange', instance._onPageChange);
            instance.publish('changeRequest', {
                defaultFn: instance._defChangeRequest
            });
            boundingBox.delegate('click', instance._onClickItem, 'li', instance);
        },

        /**
         * Render the `A.Pagination` component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance._renderItemsUI(instance.get('total'));
        },

        /**
         * Retrieve the item node from the passesed item index parameter.
         * If passed item is a node instead of the index returns itself.
         *
         * @method getItem
         * @param {Node|Number} i Index or Node reference.
         * @return {Node} pagination item
         */
        getItem: function(i) {
            var instance = this;

            if (isNumber(i)) {
                var items = instance.get('items');
                if (items) {
                    i = items.item(i);
                }
            }

            return i;
        },

        /**
         * Retrieve page number including offset e.g., if offset is 100 and
         * active page is 5, this method returns 105.
         *
         * @method getOffsetPageNumber
         * @return {Number} current page number plus offset
         */
        getOffsetPageNumber: function() {
            var instance = this;

            return instance.get('offset') + instance.get('page');
        },

        /**
         * Retrieve total number of pages including offset e.g., if offset is
         * 100 and total 10, this method returns 110.
         *
         * @method getOffsetTotalPages
         * @return {Number} total page number plus offset
         */
        getOffsetTotalPages: function() {
            var instance = this;

            return instance.get('offset') + instance.get('total');
        },

        /**
         * Retrieve total number of dom items representing the links, including
         * the arrow control items. Do not include the offset.
         *
         * @method getTotalItems
         * @return {Number} number of pagination items
         */
        getTotalItems: function() {
            var instance = this;

            return instance.get('total') + instance.TOTAL_CONTROLS;
        },

        /**
         * Navigate to the next page.
         *
         * @method next
         */
        next: function() {
            var instance = this,
                total = instance.get('total');

            if (total === 0) {
                return;
            }

            var page = instance.get('page');

            instance._dispatchRequest({
                page: (instance.get('circular') && (page === total)) ? 1 : Math.min(total, ++page)
            });

            return instance;
        },

        /**
         * Navigate to the previous page.
         *
         * @method prev
         */
        prev: function() {
            var instance = this,
                total = instance.get('total');

            if (total === 0) {
                return;
            }

            var page = instance.get('page');

            instance._dispatchRequest({
                page: (instance.get('circular') && (page === 1)) ? total : Math.max(1, --page)
            });

            return instance;
        },

        /**
         * Set the new pagination state. The state is a payload object
         * containing the page number, e.g. `{page:1}`.
         *
         * @method setState
         * @param {Object} state
         */
        setState: function(state) {
            var instance = this,
                page = state.page;

            instance.set('page', page);

            instance.lastState = state;
        },

        /**
         * Returns number of items in doc.
         *
         * @method _countItemsInDoc
         * @protected
         * @return {Number} amount of items in doc
         */
        _countItemsInDoc: function() {
            var instance = this,
                srcNode = instance.get('srcNode');

            return Math.max(0, instance._queryItemsIfNotSet(srcNode).size() - instance.TOTAL_CONTROLS);
        },

        /**
         * Default `changeRequest` function, sets new state of pagination.
         *
         * @method _defChangeRequest
         * @param {EventFacade} event
         * @protected
         */
        _defChangeRequest: function(event) {
            var instance = this;

            instance.setState(event.state);
        },

        /**
         * Fires `changeRequest` event.
         *
         * @method _dispatchRequest
         * @param {Object} state
         * @protected
         */
        _dispatchRequest: function(state) {
            var instance = this;

            instance.fire('changeRequest', {
                lastState: instance.lastState,
                state: state
            });
        },

        /**
         * Formatter function that formats each pagination item.
         *
         * @method _formatterValueFn
         * @protected
         * @return {String} item template
         */
        _formatterValueFn: function() {
            return function(index) {
                var instance = this;

                return Lang.sub(
                    instance.ITEM_TEMPLATE, {
                        content: index,
                        cssClass: ''
                    }
                );
            };
        },

        /**
         * Returns all child list items of `srcNode`.
         *
         * @method _queryItemsIfNotSet
         * @param {Node} srcNode
         * @protected
         * @return {NodeList} list items
         */
        _queryItemsIfNotSet: function(srcNode) {
            var instance = this;

            if (!instance.items) {
                instance.items = srcNode.all('li');
            }
            return instance.items;
        },

        /**
         * `onClick` handler for pagination items.
         *
         * @method _onClickItem
         * @param {EventFacade} event
         * @protected
         */
        _onClickItem: function(event) {
            var instance = this,
                item = event.currentTarget;

            event.preventDefault();

            if (item.hasClass(CSS_DISABLED) || item.hasClass(CSS_ACTIVE)) {
                return;
            }

            var items = instance.get('items'),
                index = items.indexOf(item),
                lastIndex = items.size() - 1;

            switch (index) {
                case 0:
                    instance.prev();
                    break;
                case lastIndex:
                    instance.next();
                    break;
                default:
                    instance._dispatchRequest({
                        page: index
                    });
                    break;
            }
        },

        /**
         * Removes active class from previously selected item on page change.
         *
         * @method _onPageChange
         * @param {EventFacade} event
         * @protected
         */
        _onPageChange: function(event) {
            var instance = this;

            if (event.prevVal !== event.newVal) {
                var item = instance.getItem(event.prevVal);
                if (item) {
                    item.removeClass(CSS_ACTIVE);
                }
            }
        },

        /**
         * Renders pagination items UI.
         *
         * @method _renderItemsUI
         * @param {Number} total
         * @protected
         */
        _renderItemsUI: function(total) {
            var instance = this,
                tpl = instance.ITEM_TEMPLATE,
                formatter = instance.get('formatter'),
                offset = instance.get('offset'),
                i,
                buffer = '';

            buffer += Lang.sub(tpl, {
                content: instance.getString('prev'),
                cssClass: CSS_PAGINATION_CONTROL
            });

            for (i = offset; i <= (offset + total - 1); i++) {
                buffer += formatter.apply(instance, [i]);
            }

            buffer += Lang.sub(tpl, {
                content: instance.getString('next'),
                cssClass: CSS_PAGINATION_CONTROL
            });

            var items = A.NodeList.create(buffer);
            instance.set('items', items);
            instance.get('contentBox').setContent(items);

            // When show controls is false, remove the first and last items from
            // the DOM in order to hide the controls, but keep the references
            // inside items NodeList in order to handle the items index the same
            // way when they are visible.
            if (!instance.get('showControls')) {
                items.first().remove();
                items.last().remove();
            }
        },

        /**
         * Setter for `offset`, `page`, and `total` attributes.
         *
         * @method _setInt
         * @param {Number} val
         * @protected
         */
        _setInt: function(val) {
            return Lang.toInt(val);
        },

        /**
         * Enables and disables next and prev items.
         *
         * @method _syncNavigationUI
         * @protected
         */
        _syncNavigationUI: function() {
            var instance = this,
                items = instance.get('items');

            items.first().toggleClass(
                CSS_DISABLED, instance.get('page') === 1);

            items.last().toggleClass(
                CSS_DISABLED, instance.get('page') === instance.get('total'));
        },

        /**
         * Renders items UI based off current `total`.
         *
         * @method _uiSetOffset
         * @param {Number} val
         * @protected
         */
        _uiSetOffset: function() {
            var instance = this;

            instance._renderItemsUI(instance.get('total'));
        },

        /**
         * Sets current page and syncs navigation UI.
         *
         * @method _uiSetPage
         * @param {Number} val
         * @protected
         */
        _uiSetPage: function(val) {
            var instance = this;

            if (!instance.get('circular')) {
                instance._syncNavigationUI();
            }

            // Do not activate first and last items, they are used for controls.
            if (val === 0 || val === instance.getTotalItems()) {
                return;
            }

            var item = instance.getItem(val);

            if (item) {
                item.addClass(CSS_ACTIVE);
            }
        },

        /**
         * Setter for `showControls` attribute.
         *
         * @method _uiSetShowControls
         * @param {Boolean} val
         * @protected
         */
        _uiSetShowControls: function() {
            var instance = this;

            instance._renderItemsUI(instance.get('total'));
        },

        /**
         * Setter for `total` attribute, renders pagination items UI.
         *
         * @method _uiSetTotal
         * @param {Number} val
         * @protected
         */
        _uiSetTotal: function(val) {
            var instance = this;

            instance._renderItemsUI(val);
        }
    }
});

A.Pagination = Pagination;


}, '3.0.1', {"requires": ["node-event-delegate", "aui-node", "aui-component", "widget-htmlparser"], "skinnable": true});
