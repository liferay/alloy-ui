/**
 * The Pagination widget provides a set of controls to navigate through paged data.
 *
 * @module aui-pagination
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isFunction = Lang.isFunction,
    isNumber = Lang.isNumber,

    ACTIVE = 'active',
    BOUNDING_BOX = 'boundingBox',
    CHANGE_REQUEST = 'changeRequest',
    CIRCULAR = 'circular',
    CLICK = 'click',
    CONTENT_BOX = 'contentBox',
    CONTROL = 'control',
    DISABLED = 'disabled',
    FORMATTER = 'formatter',
    ITEMS = 'items',
    LI = 'li',
    NEXT = 'next',
    OFFSET = 'offset',
    PAGE = 'page',
    PAGINATION = 'pagination',
    PREV = 'prev',
    TOTAL = 'total',

    getCN = A.getClassName,

    CSS_ACTIVE = getCN(ACTIVE),
    CSS_DISABLED = getCN(DISABLED),
    CSS_PAGINATION_CONTROL = getCN(PAGINATION, CONTROL);

/**
 * A base class for Pagination, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Set of controls to navigate through paged data</li>
 * </ul>
 *
 * Check the [live demo](http://alloyui.com/examples/pagination/).
 *
 * @class A.Pagination
 * @extends A.Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var Pagination = A.Component.create(
    {
        /**
         * Static property provides a string to identify the class.
         *
         * @property Pagination.NAME
         * @type String
         * @static
         */
        NAME: PAGINATION,

        /**
         * Static property used to define the default attribute
         * configuration for the Pagination.
         *
         * @property Pagination.ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * When enabled this property allows the navigation to go back to
             * the beggining when it reaches the last page, the opposite behavior
             * is also true. Incremental page navigation could happen clicking the
             * control arrows or invoking <code>.next()</code> and
             * <code>.prev()</code> methods.
             *
             * @attribute circular
             * @default true
             * @type Boolean
             */
            circular: {
                validator: isBoolean,
                value: true
            },

            /**
             * A formatter function to format each pagination item.
             *
             * @attribute formatter
             * @type Function
             */
            formatter: {
                validator: isFunction,
                valueFn: '_formatterValueFn'
            },

            /**
             * Holds the page items as a NodeList. The list could be queried
             * from the DOM trough Widget HTML_PARSER or generated if
             * <a href="Pagination.html#config_total">total</a> is specified.
             *
             * @attribute items
             * @default undefined
             * @type NodeList
             */
            items: {
            },

            /**
             * Initial page offset.
             *
             * @attribute offset
             * @default 1
             * @type Number
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
             * @type Number
             */
            page: {
                setter: '_setInt',
                value: 0
            },

            /**
             * Total number of page links available. If set, the new
             * <a href="Pagination.html#config_items">items</a> node list will
             * be rendered.
             *
             * @attribute total
             * @default 0
             * @type Number
             */
            total: {
                setter: '_setInt',
                value: 0
            },

            /**
             * Text used on Pagination.
             *
             * @attribute strings
             * @type Object
             */
            strings: {
                value: {
                    next: 'Next',
                    prev: 'Prev'
                }
            }
        },

        /**
         * Object hash, defining how attribute values are to be parsed from
         * markup contained in the widget's content box.
         *
         * @property Pagination.HTML_PARSER
         * @type Object
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
         * Static property used to define the attributes
         * for the bindUI lifecycle phase.
         *
         * @property Pagination.BIND_UI_ATTRS
         * @type Array
         * @static
         */
        BIND_UI_ATTRS: [OFFSET, TOTAL],

        /**
         * Static property used to define the UI attributes.
         *
         * @property Pagination.UI_ATTRS
         * @type Array
         * @static
         */
        UI_ATTRS: [PAGE],

        prototype: {
            CONTENT_TEMPLATE: '<ul></ul>',
            ITEM_TEMPLATE: '<li class="{cssClass}"><a href="#">{content}</a></li>',
            TOTAL_CONTROLS: 2,

            items: null,
            lastState: null,

            /**
             * Sync the Pagination UI. Lifecycle.
             *
             * @method syncUI
             * @protected
             */
            syncUI: function() {
                var instance = this,
                    page = instance.get(PAGE);

                if (page > 0) {
                    instance._dispatchRequest({page:page});
                }
            },

            /**
             * Bind the events on the Pagination UI. Lifecycle.
             *
             * @method bindUI
             * @protected
             */
            bindUI: function() {
                var instance = this,
                    boundingBox = instance.get(BOUNDING_BOX);

                instance.on('pageChange', instance._onPageChange);
                instance.publish(CHANGE_REQUEST, {
                    defaultFn: instance._defChangeRequest
                });
                boundingBox.delegate(CLICK, instance._onClickItem, LI, instance);
            },

            /**
             * Render the Pagination component instance. Lifecycle.
             *
             * @method renderUI
             * @protected
             */
            renderUI: function() {
                var instance = this;

                instance._renderItemsUI(instance.get(TOTAL));
            },

            /**
             * Retrieve the item node from the passesed item index parameter.
             * If passed item is a node instead of the index returns itself.
             *
             * @method getItem
             * @param {Node | Number} i Index or Node reference.
             * @return {Node}
             */
            getItem: function(i) {
                var instance = this;

                if (isNumber(i)) {
                    var items = instance.get(ITEMS);
                    if (items) {
                        i = items.item(i);
                    }
                }

                return i;
            },

            /**
             * Retrieve page number inclusing offset e.g., if offset
             * is 100 and active page is 5, this method returns 105.
             *
             * @method getOffsetPageNumber
             * @return {Number}
             */
            getOffsetPageNumber: function() {
                var instance = this;

                return instance.get(OFFSET) + instance.get(PAGE);
            },

            /**
             * Retrieve total number of pages including offset e.g., if offset
             * is 100 and total 10, this method returns 110.
             *
             * @method getOffsetTotalPages
             * @return {Number}
             */
            getOffsetTotalPages: function() {
                var instance = this;

                return instance.get(OFFSET) + instance.get(TOTAL);
            },

            /**
             * Retrieve total number of dom items representing the links,
             * including the arrow control items. Do not include the offset.
             *
             * @method getTotalItems
             * @return {Number}
             */
            getTotalItems: function() {
                var instance = this;

                return instance.get(TOTAL) + instance.TOTAL_CONTROLS;
            },

            /**
             * Navigate to the next page.
             *
             * @method next
             */
            next: function() {
                var instance = this,
                    total = instance.get(TOTAL);

                if (total === 0) {
                    return;
                }

                var page = instance.get(PAGE);

                instance._dispatchRequest({
                    page: (instance.get(CIRCULAR) && (page === total)) ?
                            1 :
                            Math.min(total, ++page)
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
                    total = instance.get(TOTAL);

                if (total === 0) {
                    return;
                }

                var page = instance.get(PAGE);

                instance._dispatchRequest({
                    page: (instance.get(CIRCULAR) && (page === 1)) ?
                            total :
                            Math.max(1, --page)
                });

                return instance;
            },

            /**
             * Set the new pagination state. The state is a payload object
             * containing the page number, e.g. <code>{page:1}</code>.
             *
             * @method setState
             * @param state
             */
            setState: function(state) {
                var instance = this;

                instance.set(PAGE, state.page);
                instance.lastState = state;
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _countItemsInDoc
             * @protected
             */
            _countItemsInDoc: function() {
                var instance = this,
                    srcNode = instance.get('srcNode');

                return Math.max(0, instance._queryItemsIfNotSet(srcNode).size() - instance.TOTAL_CONTROLS);
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _defChangeRequest
             * @param event
             * @protected
             */
            _defChangeRequest: function(event) {
                var instance = this;

                instance.setState(event.state);
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _dispatchRequest
             * @param state
             * @protected
             */
            _dispatchRequest: function(state) {
                var instance = this;

                instance.fire(CHANGE_REQUEST, {
                    lastState: instance.lastState,
                    state: state
                });
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _formatterValueFn
             * @protected
             */
            _formatterValueFn: function() {
                return function(index) {
                    var instance = this;

                    return Lang.sub(
                        instance.ITEM_TEMPLATE,
                        {
                            content: index,
                            cssClass: ''
                        }
                    );
                };
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _queryItemsIfNotSet
             * @param srcNode
             * @protected
             */
            _queryItemsIfNotSet: function(srcNode) {
                var instance = this;

                if (!instance.items) {
                    instance.items = srcNode.all(LI);
                }
                return instance.items;
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _onClickItem
             * @param event
             * @protected
             */
            _onClickItem: function(event) {
                var instance = this,
                    item = event.currentTarget;

                event.preventDefault();

                if (item.hasClass(CSS_DISABLED) || item.hasClass(CSS_ACTIVE)) {
                    return;
                }

                var items = instance.get(ITEMS),
                    index = items.indexOf(item),
                    lastIndex = items.size() - 1;

                switch(index) {
                    case 0:
                        instance.prev();
                        break;
                    case lastIndex:
                        instance.next();
                        break;
                    default:
                        instance._dispatchRequest({page:index});
                        break;
                }
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _onPageChange
             * @param event
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
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _renderItemsUI
             * @param total
             * @protected
             */
            _renderItemsUI: function(total) {
                var instance = this,
                    tpl = instance.ITEM_TEMPLATE,
                    formatter = instance.get(FORMATTER),
                    offset = instance.get(OFFSET),
                    i,
                    buffer = '';

                buffer += Lang.sub(tpl, {
                    content: instance.getString(PREV),
                    cssClass: CSS_PAGINATION_CONTROL
                });

                for (i = offset; i <= (offset + total - 1); i++) {
                    buffer += formatter.apply(instance, [i]);
                }

                buffer += Lang.sub(tpl, {
                    content: instance.getString(NEXT),
                    cssClass: CSS_PAGINATION_CONTROL
                });

                var items = A.NodeList.create(buffer);
                instance.set(ITEMS, items);
                instance.get(CONTENT_BOX).setContent(items);
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _setInt
             * @param val
             * @protected
             */
            _setInt: function(val) {
                return Lang.toInt(val);
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _syncNavigationUI
             * @protected
             */
            _syncNavigationUI: function() {
                var instance = this,
                    items = instance.get(ITEMS);

                items.first().toggleClass(
                    CSS_DISABLED, instance.get(PAGE) === 1);

                items.last().toggleClass(
                    CSS_DISABLED, instance.get(PAGE) === instance.get(TOTAL));
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _uiSetOffset
             * @param val
             * @protected
             */
            _uiSetOffset: function(val) {
                var instance = this;

                instance._renderItemsUI(instance.get(TOTAL));
            },

            /**
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _uiSetPage
             * @param val
             * @protected
             */
            _uiSetPage: function(val) {
                var instance = this;

                if (!instance.get(CIRCULAR)) {
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
             * TODO. Wanna help? Please send a Pull Request.
             *
             * @method _uiSetTotal
             * @param val
             * @protected
             */
            _uiSetTotal: function(val) {
                var instance = this;

                instance._renderItemsUI(val);
            }
        }
    }
);

A.Pagination = Pagination;