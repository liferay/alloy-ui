Alloy.add('rating', function(AUI) {

var L = AUI.Lang,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	A = 'a',
	BLANK = '',
	CAN_RESET = 'canReset',
	CONTENT_BOX = 'contentBox',
	DEFAULT_SELECTED = 'defaultSelected',
	DESTROY = 'destroy',
	DISABLED = 'disabled',
	ELEMENT = 'element',
	HOVER = 'hover',
	INPUT = 'input',
	INPUT_NAME = 'inputName',
	OFF = 'off',
	ON = 'on',
	RATING = 'rating',
	SELECTED_INDEX = 'selectedIndex',
	SIZE = 'size',
	SHOW_TITLE = 'showTitle',

	getCN = AUI.ClassNameManager.getClassName,

	C_CLEAR_FIX = 'aui-helper-clearfix',
	C_RATING_DISABLED = getCN(RATING, DISABLED),
	C_RATING_EL = getCN(RATING, ELEMENT),
	C_RATING_EL_HOVER  = getCN(RATING, ELEMENT, HOVER),
	C_RATING_EL_OFF = getCN(RATING, ELEMENT, OFF),
	C_RATING_EL_ON = getCN(RATING, ELEMENT, ON);

function Rating() {
	Rating.superclass.constructor.apply(this, arguments);
}

AUI.mix(Rating, {
	NAME: 'Rating',

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

		disabled: {
			value: false,
			validator: isBoolean
		},

		elements: {
			writeOnce: true,
			readOnly: true,
			validator: function(v) {
				return (v instanceof AUI.NodeList);
			}
		},

		hiddenInput: {
			validator: function(v) {
				return (v instanceof AUI.Node);
			}
		},

		inputName: {
			value: BLANK,
			validator: isString
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

AUI.extend(Rating, AUI.Widget, {
	/*
	* Lifecycle
	*/
	initializer: function(){
		var instance = this;

		instance.inputElementsData = {};

		instance.after('disabledChange', this._afterSetDisabled);

		instance.render();
	},

	renderUI: function () {
		var instance = this;

		instance._parseInputElements();
		instance._initElements();
	},

	bindUI: function () {
		var instance = this;

		instance._delegateElements();
	},

	syncUI: function(){
		var instance = this;

		instance._syncElements();
	},

	unbindUI: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.detachAll();
	},

	destructor: function(){
		var instance = this;
		var	boundingBox = instance.get(BOUNDING_BOX);

		instance.unbindUI();

		boundingBox.remove();
	},

	/*
	* Methods
	*/
	clearSelection: function() {
		var instance = this;

		instance.get('elements').each(function(node) {
			node.removeClass(C_RATING_EL_ON);
			node.removeClass(C_RATING_EL_HOVER);
		});
	},

	select: function(index) {
		var instance = this;
		var oldIndex = instance.get(SELECTED_INDEX);
		var canReset = instance.get(CAN_RESET);

		// clear selection when the first element is clicked
		if (canReset && (oldIndex == 0) && (oldIndex == index)) {
			index = -1;
		}

		instance.set(SELECTED_INDEX, index);

		var selectedIndex = instance.get(SELECTED_INDEX);
		var	data = instance._getInputData(selectedIndex);
		var title = ('title' in data) ? data.title : BLANK;
		var value = ('value' in data) ? data.value : selectedIndex;

		instance.fillTo(selectedIndex);

		instance.set('title', title);
		instance.set('value', value);

		var hiddenInput = instance.get('hiddenInput');

		hiddenInput.setAttribute('title', title);
		hiddenInput.setAttribute('value', value);

		instance.fire('select');
	},

	fillTo: function(index, className) {
		var instance = this;

		instance.clearSelection();

		if (index >= 0) {
			instance.get('elements').some(function(node, i) {
				node.addClass(className || C_RATING_EL_ON);

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
		var hiddenInput = AUI.Node.create('<input type="hidden" />');

		if (size > 0) {
			inputName = inputName || inputs.item(0).getAttribute('name');

			instance.set('size', size);

			inputs.each(function(node, index) {
				instance.inputElementsData[index] = {
					value: node.getAttribute('value') || index,
					title: node.getAttribute('title')
				};
			});

			inputs.remove();
		}

		hiddenInput.setAttribute('name', inputName);

		boundingBox.appendChild(hiddenInput);

		instance.set('hiddenInput', hiddenInput);
	},

	_initElements: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var ratingElement = AUI.Node.create('<a href="javascript:void(0);"></a>');

		contentBox.addClass(C_CLEAR_FIX);
		ratingElement.addClass(C_RATING_EL);
		ratingElement.addClass(C_RATING_EL_OFF);

		for (var i = 0, size = this.get(SIZE); i < size; i++) {
			var	data = instance._getInputData(i);
			var element = ratingElement.cloneNode();

			if (instance.get(SHOW_TITLE) && data && data.title) {
				element.setAttribute('title', data.title);
			}

			contentBox.appendChild(element);
		}

		instance.set('elements', contentBox.queryAll(A));
	},

	_syncElements: function(){
		var instance = this;
		var selectedIndex = instance.get(DEFAULT_SELECTED) - 1;

		instance.set(SELECTED_INDEX, selectedIndex);

		instance.select();
	},

	_delegateElements: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.delegate('click', AUI.bind(instance._onElementClick, this), A);
		boundingBox.delegate('mouseover', AUI.bind(instance._onElementMouseOver, this), A);
		boundingBox.delegate('mouseout', AUI.bind(instance._onElementMouseOut, this), A);
	},

	_getInputData: function(index) {
		var instance = this;

		return instance.inputElementsData[index] || {};
	},

	/*
	* Delegated events
	*/
	_onElementClick: function(event) {
		var instance = this;
		var	elements = instance.get('elements');
		var index = elements.indexOf(event.target);

		instance.select(index);

		instance.fire('click');
	},

	_onElementMouseOver: function(event) {
		var instance = this;
		var	elements = instance.get('elements');

		var value = elements.indexOf(event.target);

		instance.fillTo(value, C_RATING_EL_HOVER);

		instance.fire('mouseover');
	},

	_onElementMouseOut: function(event) {
		var instance = this;
		var selectedIndex = instance.get(SELECTED_INDEX);

		instance.fillTo(selectedIndex);

		instance.fire('mouseout');
	},

	/*
	* Attribute Listeners
	*/
	_afterSetDisabled: function(event) {
		var instance = this;
		var	contentBox = instance.get(CONTENT_BOX);

		if (event.newVal == true) {
			contentBox.addClass(C_RATING_DISABLED);

			instance.unbindUI();
		}
		else {
			contentBox.removeClass(C_RATING_DISABLED);

			instance.bindUI();
		}
	}
});

AUI.Rating = Rating;

}, '@VERSION' , { requires: [ 'widget' ] });
