AUI.add('aui-rating', function(A) {
/**
 * The Rating Utility - The Star Rating creates a non-obstrusive star rating
 * control, could be based on a set of radio input boxes.
 *
 * @module aui-rating
 */

var L = A.Lang,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CAN_RESET = 'canReset',
	CLEARFIX = 'clearfix',
	CONTENT_BOX = 'contentBox',
	DEFAULT_SELECTED = 'defaultSelected',
	DESTROY = 'destroy',
	DISABLED = 'disabled',
	DOT = '.',
	ELEMENT = 'element',
	ELEMENTS = 'elements',
	EMPTY_STR = '',
	HELPER = 'helper',
	HOVER = 'hover',
	ID = 'id',
	INNER_HTML = 'innerHTML',
	INPUT = 'input',
	INPUT_NAME = 'inputName',
	LABEL = 'label',
	LABEL_ELEMENT = 'labelElement',
	NAME = 'name',
	NODE_NAME = 'nodeName',
	OFF = 'off',
	ON = 'on',
	RATING = 'rating',
	SELECTED_INDEX = 'selectedIndex',
	SHOW_TITLE = 'showTitle',
	SIZE = 'size',
	TITLE = 'title',
	VALUE = 'value',

	EV_RATING_ITEM_CLICK = 'itemClick',
	EV_RATING_ITEM_SELECT = 'itemSelect',
	EV_RATING_ITEM_OUT = 'itemOut',
	EV_RATING_ITEM_OVER = 'itemOver',

	getCN = A.ClassNameManager.getClassName,

	CSS_CLEAR_FIX = getCN(HELPER, CLEARFIX),
	CSS_RATING_LABEL_EL = getCN(RATING, LABEL, ELEMENT),
	CSS_RATING_EL = getCN(RATING, ELEMENT),
	CSS_RATING_EL_HOVER  = getCN(RATING, ELEMENT, HOVER),
	CSS_RATING_EL_OFF = getCN(RATING, ELEMENT, OFF),
	CSS_RATING_EL_ON = getCN(RATING, ELEMENT, ON);

/**
 * <p><img src="assets/images/aui-rating/main.png"/></p>
 *
 * A base class for Rating, providing:
 * <ul>
 *    <li>A non-obstrusive star rating control</li>
 *    <li>Could be based on a set of radio input boxes</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.Rating({
 *   boundingBox: '#rating',
 *   defaultSelected: 3,
 *   disabled: false,
 *   label: 'Label'
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="Rating.html#configattributes">Configuration Attributes</a> available for
 * Rating.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class Rating
 * @constructor
 * @extends Component
 */
function Rating() {
	Rating.superclass.constructor.apply(this, arguments);
}

A.mix(Rating, {
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
		 * Whether the Rating is disabled or not. Disabled Ratings don't allow
         * hover or click, just display selected stars.
		 *
		 * @attribute disabled
		 * @default false
		 * @type boolean
		 */
		disabled: {
			value: false,
			validator: isBoolean
		},

		/**
		 * If <code>true</code> could be reseted (i.e., have no values
         * selected).
		 *
		 * @attribute canReset
		 * @default true
		 * @type boolean
		 */
		canReset: {
			value: true,
			validator: isBoolean
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
			writeOnce: true,
			readOnly: true,
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
		 * Reference for the element which will contain the
         * <a href="Rating.html#config_label">label</a>.
		 *
		 * @attribute labelElement
		 * @type Node
		 */
		labelElement: {
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
			value: BLANK,
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
			value: BLANK,
			validator: isString
		},

		render: {
			value: true
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
	}
});

A.extend(Rating, A.Component, {
	/**
	 * Construction logic executed during Rating instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function(){
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
	renderUI: function () {
		var instance = this;

		instance._parseInputElements();
		instance._renderElements();
	},

	/**
	 * Bind the events on the Rating UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function () {
		var instance = this;

		instance._createEvents();

		instance.on('click', instance._handleClickEvent);
		instance.on('mouseover', instance._handleMouseOverEvent);
		instance.on('mouseout', instance._handleMouseOutEvent);
	},

	/**
	 * Sync the Rating UI. Lifecycle.
	 *
	 * @method syncUI
	 * @protected
	 */
	syncUI: function(){
		var instance = this;

		instance._syncElements();
		instance._syncLabelUI();
	},

	/**
	 * Descructor lifecycle implementation for the Rating class.
	 * Purges events attached to the node (and all child nodes).
	 *
	 * @method destructor
	 * @protected
	 */
	destructor: function(){
		var instance = this;
		var	boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.detachAll();
		boundingBox.remove();
	},

	/**
	 * Clear all selected starts to the default state.
	 *
	 * @method clearSelection
	 */
	clearSelection: function() {
		var instance = this;

		instance.get(ELEMENTS).each(function(node) {
			node.removeClass(CSS_RATING_EL_ON);
			node.removeClass(CSS_RATING_EL_HOVER);
		});
	},

	/**
	 * Selects the <code>index</code> Rating element.
	 *
	 * @method select
	 * @param {Number} index Index to be selected
	 */
	select: function(index) {
		var instance = this;
		var oldIndex = instance.get(SELECTED_INDEX);
		var canReset = instance.get(CAN_RESET);

		// clear selection when the selected element is clicked
		if (canReset && (oldIndex == index)) {
			index = -1;
		}

		instance.set(SELECTED_INDEX, index);

		var selectedIndex = instance.get(SELECTED_INDEX);
		var	data = instance._getInputData(selectedIndex);

		var title = (TITLE in data) ? data.title : BLANK;
		var value = (VALUE in data) ? data.value : selectedIndex;

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
		var instance = this;

		instance.clearSelection();

		if (index >= 0) {
			instance.get(ELEMENTS).some(function(node, i) {
				node.addClass(className || CSS_RATING_EL_ON);

				// stop loop when return true
				return (i == Math.floor(index));
			});
		}
	},

	/**
	 * Finds the index of the <code>elem</code>.
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
		var instance = this;
		var domTarget = event.domEvent.target;

		// checks if the widget is not disabled and if the dom event is firing with a item as target
		// do not fire custom events for other elements into the boundingBox
		return !instance.get(DISABLED) && domTarget.hasClass(CSS_RATING_EL);
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
		 * Handles the itemClick event.
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
		 * Handles the itemSelect event.
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
		 * Handles the itemOver event.
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
		 * Handles the itemOut event.
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
	 * Fires the itemClick event.
	 *
	 * @method _defRatingItemClickFn
	 * @param {EventFacade} event itemClick event facade
	 * @protected
	 */
	_defRatingItemClickFn: function(event) {
		var instance = this;
		var domEvent = event.domEvent;

		instance.fire(EV_RATING_ITEM_SELECT, {
			delegateEvent: event,
			domEvent: domEvent,
			ratingItem: domEvent.target
		});
	},

	/**
	 * Fires the itemSelect event.
	 *
	 * @method _defRatingItemSelectFn
	 * @param {EventFacade} event itemSelect event facade
	 * @protected
	 */
	_defRatingItemSelectFn: function(event) {
		var instance = this;
		var domTarget = event.domEvent.target;

		instance.select(
			instance.indexOf(domTarget)
		);
	},

	/**
	 * Fires the itemOut event.
	 *
	 * @method _defRatingItemOutFn
	 * @param {EventFacade} event itemOut event facade
	 * @protected
	 */
	_defRatingItemOutFn: function(event) {
		var instance = this;

		instance.fillTo(
			instance.get(SELECTED_INDEX)
		);
	},

	/**
	 * Fires the itemOver event.
	 *
	 * @method _defRatingItemOverFn
	 * @param {EventFacade} event itemOver event facade
	 * @protected
	 */
	_defRatingItemOverFn: function(event) {
		var instance = this;
		var index = instance.indexOf(event.domEvent.target);

		instance.fillTo(index, CSS_RATING_EL_HOVER);
	},

	/**
	 * Parse the HTML radio elements from the markup to be Rating elements.
	 *
	 * @method _parseInputElements
	 * @protected
	 */
	_parseInputElements: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);
		var inputs = boundingBox.queryAll(INPUT);
		var size = inputs.size();
		var inputName = instance.get(INPUT_NAME);
		var hiddenInput = A.Node.create('<input type="hidden" />');

		if (size > 0) {
			inputName = inputName || inputs.item(0).getAttribute(NAME);

			instance.set(SIZE, size);

			var labels = boundingBox.all('label');

			inputs.each(function(node, index) {
				var id = node.get(ID);
				var label = EMPTY_STR;

				if (id) {
					// for a11y parse the <label> elments information
					// checking if the node has a <label>
					var labelEl = labels.filter('[for="'+id+'"]');

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

			labels.remove();
			inputs.remove();
		}

		if (inputName) {
			hiddenInput.setAttribute(NAME, inputName);

			boundingBox.appendChild(hiddenInput);
		}

		instance.set('hiddenInput', hiddenInput);
	},

	/**
	 * Render the Rating elements.
	 *
	 * @method _renderElements
	 * @protected
	 */
	_renderElements: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var disabled = instance.get(DISABLED);

		var ratingElement = null;
		if (disabled){
			ratingElement = A.Node.create('<span></span>');
		}
		else {
			ratingElement = A.Node.create('<a href="javascript:;"></a>');

		}

		var labelElement = A.Node.create('<div></div>');

		contentBox.addClass(CSS_CLEAR_FIX);
		ratingElement.addClass(CSS_RATING_EL);
		labelElement.addClass(CSS_RATING_LABEL_EL);

		contentBox.append(labelElement);

		// creating rating elements
		for (var i = 0, size = this.get(SIZE); i < size; i++) {
			var	data = instance._getInputData(i);
			var element = ratingElement.cloneNode();

			var content = data.content;

			// try to use the pulled title data from the dom, otherwise use the TITLE attr, in the last case use the content
			var title = data.title || instance.get(TITLE) || content;

			// setting the content
			if (content || title) {
				// if there is no content use the title as content
				element.html(content || title);
			}

			// setting the title
			if (title && instance.get(SHOW_TITLE)) {
				element.setAttribute(TITLE, title);
			}

			contentBox.appendChild(element);
		}

		instance.set(LABEL_ELEMENT, labelElement);
		instance.set(ELEMENTS, contentBox.queryAll(DOT+CSS_RATING_EL));
	},

	/**
	 * Sync the Rating elements.
	 *
	 * @method _syncElements
	 * @protected
	 */
	_syncElements: function() {
		var instance = this;
		var selectedIndex = instance.get(DEFAULT_SELECTED) - 1;

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
		var instance = this;
		var labelText = instance.get(LABEL);

		instance.get(LABEL_ELEMENT).html(labelText);
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
	 * Fires the click event.
	 *
	 * @method _handleClickEvent
	 * @param {EventFacade} event click event facade
	 * @protected
	 */
	_handleClickEvent: function(event) {
		var instance = this;
		var domTarget = event.domEvent.target;

		if (instance._canFireCustomEvent(event)) {
			instance.fire(EV_RATING_ITEM_CLICK, {
				delegateEvent: event,
				domEvent: event.domEvent
			});
		}
	},

	/**
	 * Fires the mouseOut event.
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
	 * Fires the mouseOver event.
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
	 * Fires after the value of the
	 * <a href="Rating.html#config_label">label</a> attribute change.
	 *
	 * @method _afterSetLabel
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterSetLabel: function(event) {
		this._syncLabelUI();
	}
});


/*
* ThumbRating
*/
var DOWN = 'down',
	THUMB = 'thumb',
	THUMB_RATING = 'ThumbRating',
	UP = 'up',

	CSS_RATING_THUMB_DOWN = getCN(RATING, THUMB, DOWN),
	CSS_RATING_THUMB_UP = getCN(RATING, THUMB, UP);

/**
 * <p><img src="assets/images/aui-rating/thumb-rating.png"/></p>
 *
 * A base class for ThumbRating, providing:
 * <ul>
 *    <li>A non-obstrusive star rating control using Thumb up and Thumb down icons</li>
 *    <li>Could be based on a set of radio input boxes</li>
 * </ul>
 *
 * Quick Example:<br/>
 * 
 * <pre><code>var instance = new A.ThumbRating({
 *   boundingBox: '#rating',
 *   defaultSelected: 3,
 *   disabled: false,
 *   label: 'Label'
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="ThumbRating.html#configattributes">Configuration Attributes</a> available for
 * ThumbRating.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class ThumbRating
 * @constructor
 * @extends Rating
 */
function ThumbRating(config) {
	ThumbRating.superclass.constructor.apply(this, arguments);
}

A.mix(ThumbRating, {
	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property ThumbRating.NAME
	 * @type String
	 * @static
	 */
	NAME: THUMB_RATING,

	/**
	 * Static property used to define the default attribute
	 * configuration for the ThumbRating.
	 *
	 * @property ThumbRating.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {
		/**
		 * The size on ThumbRating is always 2 (i.e., thumb up and thumb down).
		 *
		 * @attribute size
		 * @default 2
		 * @readOnly
		 * @type Number
		 */
		size: {
			value: 2,
			readOnly: true
		}
	}
});

A.extend(ThumbRating, Rating, {
	/**
	 * Create the DOM structure for the ThumbRating. Lifecycle.
	 *
	 * @method renderUI
	 * @protected
	 */
	renderUI: function() {
		var instance = this;

		ThumbRating.superclass.renderUI.apply(this, arguments);

		var elements = instance.get(ELEMENTS);

		elements.addClass(CSS_RATING_EL_OFF);
		elements.item(0).addClass(CSS_RATING_THUMB_UP);
		elements.item(1).addClass(CSS_RATING_THUMB_DOWN);
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
		this.clearSelection();

		if (index >= 0) {
			this.get(ELEMENTS).item(index).addClass(className || CSS_RATING_EL_ON);
		}
	},

	/**
	 * Empty method, no logic needed on this method on ThumbRating.
	 *
	 * @method _syncElements
	 * @protected
	 */
	_syncElements: function() {}
});

A.Rating = Rating;
A.StarRating = Rating;
A.ThumbRating = ThumbRating;

}, '@VERSION@' ,{requires:['aui-base'], skinnable:true});
