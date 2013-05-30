/**
 * The Rating Utility - The Star Rating creates a non-obstrusive star rating
 * control, could be based on a set of radio input boxes.
 *
 * @module aui-rating
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isNumber = Lang.isNumber,
    isString = Lang.isString,

    isNodeList = function(v) {
        return (v instanceof A.NodeList);
    },

    isNode = function(v) {
        return (v instanceof A.Node);
    },

    ANCHOR = 'a',
    BOUNDING_BOX = 'boundingBox',
    CAN_RESET = 'canReset',
    CONTENT_BOX = 'contentBox',
    DEFAULT_SELECTED = 'defaultSelected',
    DISABLED = 'disabled',
    DOT = '.',
    ELEMENTS = 'elements',
    HREF = 'href',
    ID = 'id',
    INPUT = 'input',
    INPUT_NAME = 'inputName',
    LABEL = 'label',
    LABEL_NODE = 'labelNode',
    NAME = 'name',
    NODE_NAME = 'nodeName',
    RATING = 'rating',
    SELECTED_INDEX = 'selectedIndex',
    SHOW_TITLE = 'showTitle',
    SIZE = 'size',
    STR_EMPTY = '',
    TITLE = 'title',
    VALUE = 'value',

    EV_RATING_ITEM_CLICK = 'itemClick',
    EV_RATING_ITEM_OUT = 'itemOut',
    EV_RATING_ITEM_OVER = 'itemOver',
    EV_RATING_ITEM_SELECT = 'itemSelect',

    getCN = A.getClassName,

    CSS_STAR = getCN('icon', 'star'),
    CSS_STAR_EMPTY = getCN('icon', 'star', 'empty'),
    CSS_RATING_LABEL = getCN(RATING, LABEL),

    TPL_ELEMENT = '<a class="{cssClasses}"></a>',
    TPL_LABEL = '<span class="' + CSS_RATING_LABEL + '"></span>';

/**
 *
 * A base class for Rating, providing:
 * <ul>
 *    <li>A non-obstrusive star rating control</li>
 *    <li>Could be based on a set of radio input boxes</li>
 * </ul>
 *
 * Check the [live demo](http://alloyui.com/examples/rating/).
 *
 * @class A.Rating
 * @extends A.Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var Rating = A.Component.create(
    {
        /**
         * Static property provides a string to identify the class.
         *
         * @property Rating.NAME
         * @type String
         * @static
         */
        NAME: 'rating',

        /**
         * Static property used to define the default attribute
         * configuration for the Rating.
         *
         * @property Rating.ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * Whether the Rating is disabled or not.
             * Disabled Ratings don't allow hover or click,
             * just display selected stars.
             *
             * @attribute disabled
             * @default false
             * @type Boolean
             */
            disabled: {
                value: false,
                validator: isBoolean
            },

            /**
             * If <code>true</code> could be reseted
             * (i.e., have no values selected).
             *
             * @attribute canReset
             * @default true
             * @type Boolean
             */
            canReset: {
                value: true,
                validator: isBoolean
            },

            /**
             * CSS classes applied on Rating.
             *
             * @attribute cssClasses
             * @type Object
             */
            cssClasses: {
                value: {
                    element: CSS_STAR_EMPTY,
                    hover: CSS_STAR,
                    off: CSS_STAR_EMPTY,
                    on: CSS_STAR
                }
            },

            /**
             * The number of selected starts when the Rating render.
             *
             * @attribute defaultSelected
             * @default 0
             * @writeOnce
             * @type Number
             */
            defaultSelected: {
                value: 0,
                writeOnce: true,
                validator: isNumber
            },

            /**
             * <a href="NodeList.html">NodeList</a> of elements used on the
             * Rating. Each element is one Star.
             *
             * @attribute elements
             * @writeOnce
             * @readOnly
             * @type NodeList
             */
            elements: {
                validator: isNodeList
            },

            /**
             * Hidden input to handle the selected value. This hidden input
             * replace the radio elements and keep the same name.
             *
             * @attribute hiddenInput
             * @type Node
             */
            hiddenInput: {
                validator: isNode
            },

            /**
             * Name of the <a
             * href="Rating.html#config_hiddenInput">hiddenInput</a> element. If
             * not specified will use the name of the replaced radio.
             *
             * @attribute inputName
             * @default ''
             * @type String
             */
            inputName: {
                value: STR_EMPTY,
                validator: isString
            },

            /**
             * Label to be displayed with the Rating elements.
             *
             * @attribute label
             * @default ''
             * @type String
             */
            label: {
                value: STR_EMPTY,
                validator: isString
            },

            /**
             * DOM Node to display the text of the StarRating. If not
             * specified try to query using HTML_PARSER an element inside
             * boundingBox which matches <code>aui-rating-label-element</code>.
             *
             * @attribute labelNode
             * @default Generated div element.
             * @type String
             */
            labelNode: {
                valueFn: function() {
                    return A.Node.create(TPL_LABEL);
                },
                validator: isNode
            },

            /**
             * Stores the index of the selected element.
             *
             * @attribute selectedIndex
             * @default -1
             * @type Number
             */
            selectedIndex: {
                value: -1,
                validator: isNumber
            },

            /**
             * If <code>true</code> will extract the value of the
             * <code>title</code> attribute on the radio, and use it on the
             * generated Rating elements.
             *
             * @attribute showTitle
             * @default true
             * @type boolean
             */
            showTitle: {
                value: true,
                validator: isBoolean
            },

            /**
             * Number of Rating elements to be displayed.
             *
             * @attribute size
             * @default 5
             * @type Number
             */
            size: {
                value: 5,
                validator: function(v) {
                    return isNumber(v) && (v > 0);
                }
            },

            /**
             * If set, will be used when there is no DOM <code>title</code> on the
             * radio elements.
             *
             * @attribute title
             * @default null
             * @type String
             */
            title: null,

            /**
             * Stores the value of the current selected Rating element.
             *
             * @attribute value
             * @default null
             * @type String
             */
            value: null
        },

        /**
         * Object hash, defining how attribute values are to be parsed from
         * markup contained in the widget's content box.
         *
         * @property StarRating.HTML_PARSER
         * @type Object
         * @static
         */
        HTML_PARSER: {
            elements: function(srcNode) {
                return srcNode.all('a');
            },

            label: function(srcNode) {
                var labelNode = srcNode.one(DOT + CSS_RATING_LABEL);

                if (labelNode) {
                    return labelNode.html();
                }
            },

            labelNode: DOT + CSS_RATING_LABEL
        },

        prototype: {
            BOUNDING_TEMPLATE: '<span></span>',
            CONTENT_TEMPLATE: '<span></span>',

            /**
             * Construction logic executed during Rating instantiation. Lifecycle.
             *
             * @method initializer
             * @protected
             */
            initializer: function() {
                var instance = this;

                instance.inputElementsData = {};

                instance.after('labelChange', this._afterSetLabel);
            },

            /**
             * Create the DOM structure for the Rating. Lifecycle.
             *
             * @method renderUI
             * @protected
             */
            renderUI: function() {
                var instance = this;

                instance._parseInputElements();
                instance._renderLabel();
                instance._renderElements();
            },

            /**
             * Bind the events on the Rating UI. Lifecycle.
             *
             * @method bindUI
             * @protected
             */
            bindUI: function() {
                var instance = this;

                instance._createEvents();

                instance.on({
                    click: instance._handleClickEvent,
                    mouseover: instance._handleMouseOverEvent,
                    mouseout: instance._handleMouseOutEvent
                });
            },

            /**
             * Sync the Rating UI. Lifecycle.
             *
             * @method syncUI
             * @protected
             */
            syncUI: function() {
                var instance = this;

                instance._syncElements();
                instance._syncLabelUI();
            },

            /**
             * Clear all selected starts to the default state.
             *
             * @method clearSelection
             */
            clearSelection: function() {
                var instance = this,
                    cssClasses = instance.get('cssClasses');

                instance.get(ELEMENTS).each(function(node) {
                    node.removeClass(cssClasses.on);
                    node.removeClass(cssClasses.hover);
                    node.addClass(cssClasses.element);
                });
            },

            /**
             * Select the <code>index</code> Rating element.
             *
             * @method select
             * @param {Number} index Index to be selected
             */
            select: function(index) {
                var instance = this,
                    oldIndex = instance.get(SELECTED_INDEX),
                    canReset = instance.get(CAN_RESET);

                // clear selection when the selected element is clicked
                if (canReset && (oldIndex === index)) {
                    index = -1;
                }

                instance.set(SELECTED_INDEX, index);

                var selectedIndex = instance.get(SELECTED_INDEX),
                    data = instance._getInputData(selectedIndex),
                    title = (TITLE in data) ? data.title : STR_EMPTY,
                    value = (VALUE in data) ? data.value : selectedIndex;

                instance.fillTo(selectedIndex);

                instance.set(TITLE, title);
                instance.set(VALUE, value);

                var hiddenInput = instance.get('hiddenInput');

                hiddenInput.setAttribute(TITLE, title);
                hiddenInput.setAttribute(VALUE, value);
            },

            /**
             * Add the <code>className</code> on the the <code>index</code> element
             * and all the previous Rating elements.
             *
             * @method fillTo
             * @param {Number} index Index to be selected
             * @param {String} className Class name to be applied when fill the Rating elements
             */
            fillTo: function(index, className) {
                var instance = this,
                    cssClasses = instance.get('cssClasses');

                instance.clearSelection();

                if (index >= 0) {
                    instance.get(ELEMENTS).some(function(node, i) {
                        node.addClass(className || cssClasses.on);
                        node.removeClass(cssClasses.element);
                        return (i === Math.floor(index));
                    });
                }
            },

            /**
             * Find the index of the <code>elem</code>.
             *
             * @method indexOf
             * @param {Node} elem Rating element
             * @return {Number}
             */
            indexOf: function(elem) {
                var instance = this;

                return instance.get(ELEMENTS).indexOf(elem);
            },

            /**
             * Check if the Rating element can fire the custom events. Disabled
             * elements won't fire nothing.
             *
             * @method _canFireCustomEvent
             * @param {EventFacade} event
             * @protected
             * @return {Boolean}
             */
            _canFireCustomEvent: function(event) {
                var instance = this,
                    domTarget = event.domEvent.target;

                // checks if the widget is not disabled and if the dom event is firing with a item as target
                // do not fire custom events for other elements into the boundingBox
                return !instance.get(DISABLED) && domTarget.test('a');
            },

            /**
             * Create rating elements based on the <code>size</code>
             * attribute. It's only invoked when the HTML_PARSER does not find
             * nothing.
             *
             * @method _createElements
             * @protected
             * @return {NodeList}
             */
            _createElements: function() {
                var instance = this,
                    cssClasses = instance.get('cssClasses'),
                    size = this.get(SIZE),
                    elements = [];

                for (var i = 0; i < size; i++) {
                    elements.push(
                        Lang.sub(TPL_ELEMENT, {
                            cssClasses: cssClasses.element
                        })
                    );
                }

                return A.NodeList.create(elements.join(STR_EMPTY));
            },

            /**
             * Create the custom events.
             *
             * @method _createEvents
             * @protected
             */
            _createEvents: function() {
                var instance = this;

                // create publish function for kweight optimization
                var publish = function(name, fn) {
                    instance.publish(name, {
                        defaultFn: fn,
                        queuable: false,
                        emitFacade: true,
                        bubbles: true
                    });
                };

                /**
                 * Handle the itemClick event.
                 *
                 * @event itemClick
                 * @preventable _defRatingItemClickFn
                 * @param {Event.Facade} event The itemClick event.
                 * @type {Event.Custom}
                 */
                publish(
                    EV_RATING_ITEM_CLICK,
                    this._defRatingItemClickFn
                );

                /**
                 * Handle the itemSelect event.
                 *
                 * @event itemSelect
                 * @preventable _defRatingItemSelectFn
                 * @param {Event.Facade} event The itemSelect event.
                 * @type {Event.Custom}
                 */
                publish(
                    EV_RATING_ITEM_SELECT,
                    this._defRatingItemSelectFn
                );

                /**
                 * Handle the itemOver event.
                 *
                 * @event itemSelect
                 * @preventable _defRatingItemOverFn
                 * @param {Event.Facade} event The itemOver event.
                 * @type {Event.Custom}
                 */
                publish(
                    EV_RATING_ITEM_OVER,
                    this._defRatingItemOverFn
                );

                /**
                 * Handle the itemOut event.
                 *
                 * @event itemOut
                 * @preventable _defRatingItemOutFn
                 * @param {Event.Facade} event The itemOut event.
                 * @type {Event.Custom}
                 */
                publish(
                    EV_RATING_ITEM_OUT,
                    this._defRatingItemOutFn
                );
            },

            /**
             * Fire the itemClick event.
             *
             * @method _defRatingItemClickFn
             * @param {EventFacade} event itemClick event facade
             * @protected
             */
            _defRatingItemClickFn: function(event) {
                var instance = this,
                    domEvent = event.domEvent;

                instance.fire(EV_RATING_ITEM_SELECT, {
                    delegateEvent: event,
                    domEvent: domEvent,
                    ratingItem: domEvent.target
                });
            },

            /**
             * Fire the itemSelect event.
             *
             * @method _defRatingItemSelectFn
             * @param {EventFacade} event itemSelect event facade
             * @protected
             */
            _defRatingItemSelectFn: function(event) {
                var instance = this,
                    domTarget = event.domEvent.target;

                instance.select(
                    instance.indexOf(domTarget)
                );
            },

            /**
             * Fire the itemOut event.
             *
             * @method _defRatingItemOutFn
             * @param {EventFacade} event itemOut event facade
             * @protected
             */
            _defRatingItemOutFn: function() {
                var instance = this;

                instance.fillTo(instance.get(SELECTED_INDEX));
            },

            /**
             * Fire the itemOver event.
             *
             * @method _defRatingItemOverFn
             * @param {EventFacade} event itemOver event facade
             * @protected
             */
            _defRatingItemOverFn: function(event) {
                var instance = this,
                    cssClasses = instance.get('cssClasses'),
                    index = instance.indexOf(event.domEvent.target);

                instance.fillTo(index, cssClasses.hover);
            },

            /**
             * Parse the HTML radio elements from the markup to be Rating elements.
             *
             * @method _parseInputElements
             * @protected
             */
            _parseInputElements: function() {
                var instance = this,
                    boundingBox = instance.get(BOUNDING_BOX),
                    inputs = boundingBox.all(INPUT),
                    size = inputs.size(),
                    inputName = instance.get(INPUT_NAME),
                    hiddenInput = A.Node.create('<input type="hidden" />');

                if (size > 0) {
                    inputName = inputName || inputs.item(0).getAttribute(NAME);

                    instance.set(SIZE, size);

                    var labels = boundingBox.getElementsByTagName('label');

                    inputs.each(function(node, index) {
                        var id = node.get(ID);
                        var label = STR_EMPTY;

                        if (id) {
                            // for a11y parse the <label> elments information
                            // checking if the node has a <label>
                            var labelEl = labels.filter('[for="' + id + '"]');

                            if (labelEl.size()) {
                                // if there is, extract the content of the label to use as content of the anchors...
                                label = labelEl.item(0).html();
                            }
                        }

                        instance.inputElementsData[index] = {
                            content: label,
                            value: node.getAttribute(VALUE) || index,
                            title: node.getAttribute(TITLE)
                        };
                    });

                    labels.remove(true);
                    inputs.remove(true);
                }

                if (inputName) {
                    hiddenInput.setAttribute(NAME, inputName);
                    boundingBox.appendChild(hiddenInput);
                }

                instance.set('hiddenInput', hiddenInput);
            },

            /**
             * Render the Rating label.
             *
             * @method _renderLabel
             * @protected
             */
            _renderLabel: function() {
                var instance = this;

                instance.get(CONTENT_BOX).setContent(
                    instance.get(LABEL_NODE)
                );
            },

            /**
             * Render the Rating elements.
             *
             * @method _renderElements
             * @protected
             */
            _renderElements: function() {
                var instance = this,
                    contentBox = instance.get(CONTENT_BOX),
                    elements = instance.get(ELEMENTS);

                // if there are no elements in the markup, create them based on the size attribute
                if (!elements || !elements.size()) {
                    elements = instance._createElements();

                    instance.set(ELEMENTS, elements);
                }

                elements.each(
                    function(element, i) {
                        var data = instance._getInputData(i),
                            content = data.content,
                            // try to use the pulled title data from the dom, otherwise use the TITLE attr, in the last case use the content
                            title = data.title || instance.get(TITLE) || content;

                        // setting the title
                        if (title && instance.get(SHOW_TITLE)) {
                            element.setAttribute(TITLE, title);
                        }
                        if (!element.attr(HREF) && (element.get(NODE_NAME).toLowerCase() === ANCHOR)) {
                            element.setAttribute('onclick', 'return false;');
                        }
                    }
                );
                contentBox.append(elements.getDOM());
            },

            /**
             * Sync the Rating elements.
             *
             * @method _syncElements
             * @protected
             */
            _syncElements: function() {
                var instance = this,
                    selectedIndex = instance.get(DEFAULT_SELECTED) - 1;

                instance.set(SELECTED_INDEX, selectedIndex);
                instance.select();
            },

            /**
             * Sync the Rating label UI.
             *
             * @method _syncLabelUI
             * @protected
             */
            _syncLabelUI: function() {
                var instance = this,
                    labelText = instance.get(LABEL);

                instance.get(LABEL_NODE).html(labelText);
            },

            /**
             * Get the <code>index</code> element input data stored on <a
             * href="Rating.html#property_inputElementsData">inputElementsData</a>.
             *
             * @method _getInputData
             * @protected
             */
            _getInputData: function(index) {
                var instance = this;

                return instance.inputElementsData[index] || {};
            },

            /**
             * Fire the click event.
             *
             * @method _handleClickEvent
             * @param {EventFacade} event click event facade
             * @protected
             */
            _handleClickEvent: function(event) {
                var instance = this,
                    domEvent = event.domEvent;

                if (instance._canFireCustomEvent(event)) {
                    instance.fire(EV_RATING_ITEM_CLICK, {
                        delegateEvent: event,
                        domEvent: domEvent
                    });
                }
                else {
                    domEvent.preventDefault();
                }
            },

            /**
             * Fire the mouseOut event.
             *
             * @method _handleMouseOutEvent
             * @param {EventFacade} event mouseOut event facade
             * @protected
             */
            _handleMouseOutEvent: function(event) {
                var instance = this;

                if (instance._canFireCustomEvent(event)) {
                    instance.fire(EV_RATING_ITEM_OUT, {
                        delegateEvent: event,
                        domEvent: event.domEvent
                    });
                }
            },

            /**
             * Fire the mouseOver event.
             *
             * @method _handleMouseOverEvent
             * @param {EventFacade} event mouseOver event facade
             * @protected
             */
            _handleMouseOverEvent: function(event) {
                var instance = this;

                if (instance._canFireCustomEvent(event)) {
                    instance.fire(EV_RATING_ITEM_OVER, {
                        delegateEvent: event,
                        domEvent: event.domEvent
                    });
                }
            },

            /**
             * Fire after the value of the
             * <a href="Rating.html#config_label">label</a> attribute change.
             *
             * @method _afterSetLabel
             * @param {EventFacade} event
             * @protected
             */
            _afterSetLabel: function() {
                this._syncLabelUI();
            }
        }
    }
);

A.Rating = Rating;
A.StarRating = Rating;