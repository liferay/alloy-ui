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

	ANCHOR = 'a',
	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CAN_RESET = 'canReset',
	CLEARFIX = 'clearfix',
	CONTENT_BOX = 'contentBox',
	DEFAULT_SELECTED = 'defaultSelected',
	DESTROY = 'destroy',
	DISABLED = 'disabled',
	ELEMENT = 'element',
	ELEMENTS = 'elements',
	HELPER = 'helper',
	HOVER = 'hover',
	INNER_HTML = 'innerHTML',
	INPUT = 'input',
	INPUT_NAME = 'inputName',
	LABEL = 'label',
	LABEL_ELEMENT = 'labelElement',
	MESSAGES = 'messages',
	NAME = 'name',
	OFF = 'off',
	ON = 'on',
	RATING = 'rating',
	SELECTED_INDEX = 'selectedIndex',
	SHOW_TITLE = 'showTitle',
	SIZE = 'size',
	SPAN = 'span'
	TITLE = 'title',
	THUMBS = 'thumbs',
	VALUE = 'value',

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
	NAME: 'Rating',

	ATTRS: {
		disabled: {
			value: false,
			validator: isBoolean
		},
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

		messages: {
			averageRatingElementText: {
				value: 'The average rating is {0} stars out of {1}',
				validator: isString
			},
			ratedElementText: {
				value: 'You have rated this {0} stars out of {1}',
				validator: isString
			},
			ratingElementText: {
				value: 'Rate this {0} stars out of {1}',
				validator: isString
			},
			thumbsUpText: {
				value: 'Rate this as good',
				validator: isString
			},
			thumbedUpText: {
				value: 'You have rated this as good',
				validator: isString
			},
			thumbsDownText: {
				value: 'Rate this as bad',
				validator: isString
			},
			thumbedDownText: {
				value: 'You have rated this as bad',
				validator: isString
			}
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

		thumbs: {
			value: false,
			validator: isBoolean
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
		instance._delegateElements();
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

		instance.fire('select');
	},

	fillTo: function(index, className) {
		var instance = this;
		instance.clearSelection();

		if (index >= 0) {
			instance.get(ELEMENTS).some(function(node, i) {
				node.addClass(className || CSS_RATING_EL_ON);
				return (index == i);
			});
		}
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
		var disabled = instance.get(DISABLED);
		var contentBox = instance.get(CONTENT_BOX);
		var defaultSelected = instance.get(DEFAULT_SELECTED);
		var thumbs = instance.get(THUMBS);
		var labelElement = A.Node.create('<div></div>');
		var ratingElement = null;

		if (!disabled) {
			ratingElement = A.Node.create('<a href="javascript:void(0);"></a>');
		}
		else {
			ratingElement = A.Node.create('<span></span>');
		}

		contentBox.addClass(CSS_CLEAR_FIX);
		ratingElement.addClass(CSS_RATING_EL);
		ratingElement.addClass(CSS_RATING_EL_OFF);
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

			if (!disabled) {
				if (!thumbs){
					if (defaultSelected != 0 && ((defaultSelected - 1) == i)) {
						element.html(A.substitute(instance.get(MESSAGES).ratedElementText, [defaultSelected, instance.get(SIZE)]));
					}
					else {
						element.html(A.substitute(instance.get(MESSAGES).ratingElementText, [i + 1, instance.get(SIZE)]));
					}
				}
				else {
					if (i == 0) {
						element.html(instance.get(MESSAGES).thumbsUpText);
					}
					else if (i == 1) {
						element.html(instance.get(MESSAGES).thumbsDownText);
					}

					if (defaultSelected == 1) {
						if (i == 0) {
							element.html(instance.get(MESSAGES).thumbedUpText);
						}
					}
					else if (defaultSelected == -1) {
						if (i==1){
							element.html(instance.get(MESSAGES).thumbedDownText);
						}
					}
				}
			}
			else {
				if (i == 0) {
					element.html(A.substitute(instance.get(MESSAGES).averageRatingElementText, [defaultSelected, instance.get(SIZE)]));
				}
			}

			contentBox.appendChild(element);
		}

		instance.set(LABEL_ELEMENT, labelElement);
		instance.set(ELEMENTS, contentBox.queryAll(ANCHOR + ',' + SPAN));
	},

	_syncElements: function(){
		var instance = this;
		var labelText = instance.get(LABEL);
		var selectedIndex = instance.get(DEFAULT_SELECTED) - 1;

		instance.set(SELECTED_INDEX, selectedIndex);

		instance.get(LABEL_ELEMENT).html(labelText);

		instance.select();
	},

	_delegateElements: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.delegate('click', A.bind(instance._delegateMethod, this), ANCHOR);
		boundingBox.delegate('mouseover', A.bind(instance._delegateMethod, this), ANCHOR);
		boundingBox.delegate('mouseout', A.bind(instance._delegateMethod, this), ANCHOR);
	},

	_getInputData: function(index) {
		var instance = this;

		return instance.inputElementsData[index] || {};
	},

	/*
	* Delegated events
	*/
	_delegateMethod: function(event){
		var instance = this;
		var type = event.type;
		var defaultSelected = instance.get(DEFAULT_SELECTED);
		var disabled = instance.get(DISABLED);
		var	elements = instance.get(ELEMENTS);
		var selectedIndex = instance.get(SELECTED_INDEX);
		var index = elements.indexOf(event.target);
		var thumbs = instance.get(THUMBS);
		var disabled = instance.get(DISABLED);

		var on = {
			click: function() {
				instance.select(index);
				if (!disabled) {
					if (!thumbs){
						elements.item(index).html(A.substitute(instance.get(MESSAGES).ratedElementText, [index + 1, instance.get(SIZE)]));
					}
					else {
						if (index == 0) {
							elements.item(index).html(instance.get(MESSAGES).thumbedUpText);

						}
						else if (index == 1) {
							elements.item(index).html(instance.get(MESSAGES).thumbedDownText);
						}
					}
				}
			},
			mouseover: function() {
				instance.fillTo(index, CSS_RATING_EL_HOVER);
			},
			mouseout: function() {
				instance.fillTo(selectedIndex);
			}
		};

		if (type) {
			if (!disabled) {
				on[type]();
			}
			// trigger user callback even when disabled
			instance.fire(type);
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
		},
		thumbs: {
			value: true,
			validator: isBoolean
		}
	}
});

A.extend(ThumbRating, Rating, {
	renderUI: function() {
		ThumbRating.superclass.renderUI.apply(this, arguments);

		var elements = this.get(ELEMENTS);
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

}, '0.1a' , { requires: [ 'aui-base', 'rating-css' ] });

