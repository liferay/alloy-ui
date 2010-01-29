AUI.add('rating', function(A) {

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
	HELPER = 'helper',
	HOVER = 'hover',
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

function Rating() {
	Rating.superclass.constructor.apply(this, arguments);
}

A.mix(Rating, {
	NAME: 'rating',

	ATTRS: {
		canReset: {
			value: true,
			validator: isBoolean
		},

		defaultSelected: {
			value: 0,
			writeOnce: true,
			validator: isNumber
		},

		elements: {
			writeOnce: true,
			readOnly: true,
			validator: isNodeList
		},

		hiddenInput: {
			validator: isNode
		},

		labelElement: {
			validator: isNode
		},

		inputName: {
			value: BLANK,
			validator: isString
		},

		label: {
			value: BLANK,
			validator: isString
		},

		render: {
			value: true
		},

		selectedIndex: {
			value: -1,
			validator: isNumber
		},

		showTitle: {
			value: true,
			validator: isBoolean
		},

		size: {
			value: 5,
			validator: function(v) {
				return isNumber(v) && (v > 0);
			}
		},

		title: null,

		value: null
	}
});

A.extend(Rating, A.Component, {
	/*
	* Lifecycle
	*/
	initializer: function(){
		var instance = this;

		instance.inputElementsData = {};

		instance.after('labelChange', this._afterSetLabel);
	},

	renderUI: function () {
		var instance = this;

		instance._parseInputElements();
		instance._renderElements();
	},

	bindUI: function () {
		var instance = this;

		instance._createEvents();

		instance.on('click', instance._handleClickEvent);
		instance.on('mouseover', instance._handleMouseOverEvent);
		instance.on('mouseout', instance._handleMouseOutEvent);
	},

	syncUI: function(){
		var instance = this;

		instance._syncElements();
	},

	destructor: function(){
		var instance = this;
		var	boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.detachAll();
		boundingBox.remove();
	},

	/*
	* Methods
	*/
	clearSelection: function() {
		var instance = this;

		instance.get(ELEMENTS).each(function(node) {
			node.removeClass(CSS_RATING_EL_ON);
			node.removeClass(CSS_RATING_EL_HOVER);
		});
	},

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

	fillTo: function(index, className) {
		var instance = this;

		instance.clearSelection();

		if (index >= 0) {
			instance.get(ELEMENTS).some(function(node, i) {
				node.addClass(className || CSS_RATING_EL_ON);

				// stop loop when return true
				return (i == index);
			});
		}
	},

	indexOf: function(elem) {
		var instance = this;

		return instance.get(ELEMENTS).indexOf(elem);
	},

	_canFireCustomEvent: function(event) {
		var instance = this;
		var domTarget = event.domEvent.target;

		// checks if the widget is not disabled and if the dom event is firing with a item as target
		// do not fire custom events for other elements into the boundingBox
		return !instance.get(DISABLED) && domTarget.hasClass(CSS_RATING_EL);
	},

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

		// publishing events
		publish(
			EV_RATING_ITEM_CLICK,
			this._defRatingItemClickFn
		);

		publish(
			EV_RATING_ITEM_SELECT,
			this._defRatingItemSelectFn
		);

		publish(
			EV_RATING_ITEM_OVER,
			this._defRatingItemOverFn
		);

		publish(
			EV_RATING_ITEM_OUT,
			this._defRatingItemOutFn
		);
	},

	_defRatingItemClickFn: function(event) {
		var instance = this;
		var domEvent = event.domEvent;

		instance.fire(EV_RATING_ITEM_SELECT, {
			delegateEvent: event,
			domEvent: domEvent,
			ratingItem: domEvent.target
		});
	},

	_defRatingItemSelectFn: function(event) {
		var instance = this;
		var domTarget = event.domEvent.target;

		instance.select(
			instance.indexOf(domTarget)
		);
	},

	_defRatingItemOutFn: function(event) {
		var instance = this;

		instance.fillTo(
			instance.get(SELECTED_INDEX)
		);
	},

	_defRatingItemOverFn: function(event) {
		var instance = this;
		var index = instance.indexOf(event.domEvent.target);

		instance.fillTo(index, CSS_RATING_EL_HOVER);
	},

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

			inputs.each(function(node, index) {
				instance.inputElementsData[index] = {
					value: node.getAttribute(VALUE) || index,
					title: node.getAttribute(TITLE)
				};
			});

			inputs.remove();
		}

		hiddenInput.setAttribute(NAME, inputName);

		boundingBox.appendChild(hiddenInput);

		instance.set('hiddenInput', hiddenInput);
	},

	_renderElements: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var ratingElement = A.Node.create('<a href="javascript:;"></a>');
		var labelElement = A.Node.create('<div></div>');

		contentBox.addClass(CSS_CLEAR_FIX);
		ratingElement.addClass(CSS_RATING_EL);
		labelElement.addClass(CSS_RATING_LABEL_EL);

		contentBox.append(labelElement);

		// creating rating elements
		for (var i = 0, size = this.get(SIZE); i < size; i++) {
			var	data = instance._getInputData(i);
			var title = data.title;
			var element = ratingElement.cloneNode();

			if (!title) {
				title = instance.get(TITLE);
			}

			if (instance.get(SHOW_TITLE) && title) {
				element.setAttribute(TITLE, title);
			}

			contentBox.appendChild(element);
		}

		instance.set(LABEL_ELEMENT, labelElement);
		instance.set(ELEMENTS, contentBox.queryAll(DOT+CSS_RATING_EL));
	},

	_syncElements: function(){
		var instance = this;
		var labelText = instance.get(LABEL);
		var selectedIndex = instance.get(DEFAULT_SELECTED) - 1;

		instance.set(SELECTED_INDEX, selectedIndex);

		instance.get(LABEL_ELEMENT).html(labelText);

		instance.select();
	},

	_getInputData: function(index) {
		var instance = this;

		return instance.inputElementsData[index] || {};
	},

	/*
	* Delegated events
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

	_handleMouseOutEvent: function(event) {
		var instance = this;

		if (instance._canFireCustomEvent(event)) {
			instance.fire(EV_RATING_ITEM_OUT, {
				delegateEvent: event,
				domEvent: event.domEvent
			});
		}
	},

	_handleMouseOverEvent: function(event) {
		var instance = this;

		if (instance._canFireCustomEvent(event)) {
			instance.fire(EV_RATING_ITEM_OVER, {
				delegateEvent: event,
				domEvent: event.domEvent
			});
		}
	},

	/*
	* Attribute Listeners
	*/
	_afterSetLabel: function(event) {
		this.syncUI();
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

function ThumbRating(config) {
	ThumbRating.superclass.constructor.apply(this, arguments);
}

A.mix(ThumbRating, {
	NAME: THUMB_RATING,

	ATTRS: {
		size: {
			value: 2,
			readOnly: true
		}
	}
});

A.extend(ThumbRating, Rating, {
	renderUI: function() {
		var instance = this;

		ThumbRating.superclass.renderUI.apply(this, arguments);

		var elements = instance.get(ELEMENTS);

		elements.addClass(CSS_RATING_EL_OFF);
		elements.item(0).addClass(CSS_RATING_THUMB_UP);
		elements.item(1).addClass(CSS_RATING_THUMB_DOWN);
	},

	fillTo: function(index, className) {
		this.clearSelection();

		if (index >= 0) {
			this.get(ELEMENTS).item(index).addClass(className || CSS_RATING_EL_ON);
		}
	},

	_syncElements: function(){
		var instance = this;
		var labelText = instance.get(LABEL);

		instance.get(LABEL_ELEMENT).html(labelText);
	}
});

A.Rating = Rating;
A.StarRating = Rating;
A.ThumbRating = ThumbRating;

}, '@VERSION' , { requires: [ 'aui-base', 'rating-css' ] });
