AUI.add('aui-datasource-control-base', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	BINDUI = 'bindUI',
	RENDERUI = 'renderUI',
	SYNCUI = 'syncUI';

var DataSourceControl = function() {};

DataSourceControl.ATTRS = {
	/**
	 * The data source that results will be read from. This can either be
	 * an existing <a href="DataSource.html">DataSource</a> object, or it can be a
	 * value that would be passed to <a href="DataSource.html">DataSource</a>.
	 * 
	 * @attribute dataSource
	 * @default null
	 * @type Object | String | Function | Array
	 */
	dataSource: {
		value: null,
		setter: function(val) {
			var instance = this;

			var dataSource = val;

			if (val) {
				var data = dataSource;

				var dataSourceType = instance.get('dataSourceType');

				if (!(dataSource instanceof A.DataSource.Local)) {
					if (!dataSourceType) {
						dataSourceType = 'Local';

						if (isFunction(data)) {
							dataSourceType = 'Function';
						}
						else if (isString(data)) {
							dataSourceType = 'IO';
						}
					}

					dataSource = new A.DataSource[dataSourceType](
						{
							source: data
						}
					);
				}

				dataSourceType = dataSource.name;

				var schema = instance._schema;

				if (schema) {
					dataSource.plug(schema);
				}

				instance.set('dataSourceType', dataSourceType);
			}

			return dataSource;
		}
	},

	/**
	 * The type of the data source passed into <a href="AutoComplete.html#config_dataSource">dataSource</a>.
	 * This can be used to explicitly declare what kind of <a href="DataSource.html">DataSource</a> object will
	 * be created.
	 * 
	 * @attribute dataSourceType
	 * @default null
	 * @type String
	 */
	dataSourceType: {
		value: null
	},

	/**
	 * A valid configuration object for any of <a href="module_datasource.html">DataSource</a> schema plugins.
	 *
	 * @attribute schema
	 * @default null
	 * @type Object
	 */
	schema: {
		value: null,
		lazyAdd: false,
		setter: function(val) {
			var instance = this;

			var dataSource = instance.get('dataSource');
			var schema = instance._schema;

			if (dataSource && schema) {
				dataSource.unplug(schema);

				schema = null;
				instance._schema = null;
			}

			if (val) {
				if (val.fn) {
					schema = val;
					val = val.cfg.schema;
				}
				else {
					var schemaType = instance.get('schemaType');

					var schemaTypes = {
						array: A.Plugin.DataSourceArraySchema,
						json: A.Plugin.DataSourceJSONSchema,
						text: A.Plugin.DataSourceTextSchema,
						xml: A.Plugin.DataSourceXMLSchema
					};

					schemaType = schemaType.toLowerCase() || 'array';

					schema = {
						fn: schemaTypes[schemaType],
						cfg: {
							schema: val
						}
					};
				}
			}

			if (dataSource && schema) {
				dataSource.plug(schema);
			}

			instance._schema = schema;

			return val;
		}
	},

	/**
	 * A valid type of <a href="module_datasource.html">DataSource</a> schema plugin, such as array, json, xml, etc.
	 *
	 * @attribute schemaType
	 * @default array
	 * @type String
	 */
	schemaType: {
		value: '',
		lazyAdd: false,
		validator: isString
	}
};

DataSourceControl.prototype = {
	initializer: function() {
		var instance = this;

		instance.publish(RENDERUI);
		instance.publish(BINDUI);
		instance.publish(SYNCUI);
	},
	
	renderUI: function() {
		var instance = this;

		instance.fire(RENDERUI);
	},

	bindUI: function() {
		var instance = this;

		/**
		 * Handles the dataError event. Fired when there is an error accessing the data.
		 *
		 * @event dataError
		 * @param {Event.Facade} event The dataError event.
		 */
		instance.publish('dataError');

		/**
		 * Handles the dataRequest event. Fired when ever a query is sent to the data source.
		 *
		 * @event dataRequest
		 * @param {Event.Facade} event The dataRequest event.
		 */
		instance.publish('dataRequest');

		/**
		 * Handles the dataReturn event. Fired when data successfully comes back from the data request.
		 *
		 * @event dataReturn
		 * @param {Event.Facade} event The dataReturn event.
		 */
		instance.publish('dataReturn');

		instance.fire(BINDUI);
	},

	syncUI: function() {
		var instance = this;

		instance.fire(SYNCUI);
	}
}

A.DataSourceControl = DataSourceControl;

}, '@VERSION@' ,{requires:['aui-base','datasource','dataschema']});
AUI.add('aui-input-text-control', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	KeyMap = A.Event.KeyMap,

	ALERT = 'alert',
	BINDUI = 'bindUI',
	CONTENT = 'content',
	ICON = 'icon',
	LIST = 'list',
	LOADING = 'loading',
	RENDERUI = 'renderUI',

	ICON_DEFAULT = 'circle-triangle-b',
	ICON_ERROR = ALERT,
	ICON_LOADING = LOADING,

	BACKSPACE = 'BACKSPACE',
	TAB = 'TAB',
	ALT = 'ALT',
	WIN_IME = 'WIN_IME',

	OVERLAY_ALIGN = {
		node: null,
		points: ['tl', 'bl']
	},

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox';

var InputTextControl = function() {
	var instance = this;

	instance.on(RENDERUI, instance._renderUIInputTextControl, instance);
	instance.on(BINDUI, instance._bindUIInputTextControl, instance);
};

/**
 * Static property used to define the default attribute
 * configuration for the AutoComplete.
 *
 * @property AutoComplete.ATTRS
 * @type Object
 * @static
 */

InputTextControl.ATTRS = {
	/**
	 * To use a button
	 * 
	 * @attribute button
	 * @default true
	 * @type Boolean
	 * @deprecated
	 */
	button: {
		value: true
	},

	/**
	 * The character used to indicate the beginning or ending of a new value. Most commonly used
	 * is a ",".
	 * 
	 * @attribute delimChar
	 * @default null
	 * @type String
	 */
	delimChar: {
		value: null,
		setter: function(value) {
			if (isString(value) && (value.length > 0)) {
				value = [value];
			}
			else if (!isArray(value)) {
				value = A.Attribute.INVALID_VALUE;
			}

			return value;
		}
	},

	/**
	 * If <a href="AutoComplete.html#config_typeAhead">typeAhead</a> is true, this
	 * will clear a selection when the overlay closes unless a user explicitly selects an item.
	 * 
	 * @attribute forceSelection
	 * @default false
	 * @type Boolean
	 */
	forceSelection: {
		value: false
	},

	iconButton: {
		value: ICON_DEFAULT
	},

	/**
	 * The input field which will recieve the users input.
	 *
	 * @attribute input
	 * @default null
	 * @type String | Node
	 */
	input: {
		value: null
	},

	/**
	 * The key or numeric index in the schema to match the result against.
	 *
	 * @attribute matchKey
	 * @default 0
	 * @type String | Number
	 */
	matchKey: {
		value: 0
	},

	/**
	 * The minimum number of characters required to query the data source.
	 *
	 * @attribute minQueryLength
	 * @default 1
	 * @type Number
	 */
	minQueryLength: {
		value: 1
	},

	/**
	 * The amount of time in seconds to delay before submitting the query.
	 *
	 * @attribute queryDelay
	 * @default 0.2
	 * @type Number
	 */
	queryDelay: {
		value: 0.2,
		getter: function(value) {
			return value * 1000;
		}
	},

	/**
	 * When IME usage is detected or interval detection is explicitly enabled,
	 * AutoComplete will detect the input value at the given interval and send a
	 * query if the value has changed.
	 *
	 * @attribute queryInterval
	 * @default 0.5
	 * @type Number
	 */
	queryInterval: {
		value: 0.5,
		getter: function(value) {
			return value * 1000;
		}
	},

	/**
	 * When <a href="AutoComplete.html#config_applyLocalFilter">applyLocalFilter</a> is true,
	 * setting this to true will match only results with the same case.
	 * 
	 * @attribute queryMatchCase
	 * @default false
	 * @type Boolean
	 */
	queryMatchCase: {
		value: false
	},

	/**
	 * When <a href="AutoComplete.html#config_applyLocalFilter">applyLocalFilter</a> is true,
	 * setting this to true will match results which contain the query anywhere in the text,
	 * instead of just matching just items that start with the query.
	 * 
	 * @attribute queryMatchContains
	 * @default false
	 * @type Boolean
	 */
	queryMatchContains: {
		value: false
	},

	/**
	 * For IO DataSources, AutoComplete will automatically insert a "?" between the server URI and 
	 * the encoded query string. To prevent this behavior, you can
	 * set this value to false. If you need to customize this even further, you
	 * can override the <a href="AutoComplete.html#method_generateRequest">generateRequest</a> method.
	 *
	 * @attribute queryQuestionMark
	 * @default true
	 * @type Boolean
	 */
	queryQuestionMark: {
		value: true
	},

	/**
	 * Whether or not the input field should be updated with selections.
	 *
	 * @attribute suppressInputUpdate
	 * @default false
	 * @type Boolean
	 */
	suppressInputUpdate: {
		value: false
	},

	/**
	 * If <a href="AutoComplete.html#config_autoHighlight">autoHighlight</a> is enabled, whether or not the 
	 * input field should be automatically updated with the first result as the user types, 
	 * automatically selecting the portion of the text the user has not typed yet.
	 *
	 * @attribute typeAhead
	 * @default false
	 * @type Boolean
	 */
	typeAhead: {
		value: false
	},

	/**
	 * If <a href="AutoComplete.html#config_typeAhead">typeAhead</a> is true, number of seconds 
	 * to delay before updating the input. In order to prevent certain race conditions, this value must
	 * always be greater than the <a href="AutoComplete.html#config_queryDelay">queryDelay</a>.
	 *
	 * @attribute typeAheadDelay
	 * @default 0.2
	 * @type Number
	 */
	typeAheadDelay: {
		value: 0.2,
		getter: function(value) {
			return value * 1000;
		}
	},

	/**
	 * The unique ID of the input element.
	 *
	 * @attribute uniqueName
	 * @default null
	 * @type String
	 */
	uniqueName: {
		value: null
	}
};

InputTextControl.prototype = {
	/**
	 * Construction logic executed during AutoComplete instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function(config) {
		var instance = this;

		instance._overlayAlign = A.mix({}, OVERLAY_ALIGN);
	},

	/**
	 * Create the DOM structure for the InputTextControl. Lifecycle.
	 *
	 * @method _renderUIInputTextControl
	 * @protected
	 */
	_renderUIInputTextControl: function() {
		var instance = this;

		instance._renderInput();
	},

	/**
	 * Bind the events on the InputTextControl UI. Lifecycle.
	 *
	 * @method _bindUIInputTextControl
	 * @protected
	 */
	_bindUIInputTextControl: function() {
		var instance = this;

		instance._bindDataSource();

		var button = instance.button;
		var inputNode = instance.inputNode;

		inputNode.on('blur', instance._onTextboxBlur, instance);
		inputNode.on('focus', instance._onTextboxFocus, instance);
		inputNode.on('keydown', instance._onTextboxKeyDown, instance);
		inputNode.on('keypress', instance._onTextboxKeyPress, instance);
		inputNode.on('keyup', instance._onTextboxKeyUp, instance);

		instance.publish('handleResponse');

		instance.publish('textboxKeyDown');

		instance.publish('textboxKeyPress');

		instance.publish('textboxKeyUp');

		instance.publish('invalidQueryLength');

		instance.publish('sendQueryDisabled');

		/**
		 * Handles the containerCollapse event. Fired when the container is hidden.
		 *
		 * @event containerCollapse
		 * @param {Event.Facade} event The containerCollapse event.
		 */
		instance.publish('containerCollapse');

		/**
		 * Handles the containerExpand event. Fired when the container is shown.
		 *
		 * @event containerExpand
		 * @param {Event.Facade} event The containerExpand event.
		 */
		instance.publish('containerExpand');

		/**
		 * Handles the containerPopulate event. Fired when the container is populated.
		 *
		 * @event containerPopulate
		 * @param {Event.Facade} event The containerPopulate event.
		 */
		instance.publish('containerPopulate');

		/**
		 * Handles the itemArrowFrom event. Fired when the user navigates via the keyboard away from
		 * a selected item.
		 *
		 * @event itemArrowFrom
		 * @param {Event.Facade} event The itemArrowFrom event.
		 */
		instance.publish('itemArrowFrom');

		/**
		 * Handles the itemArrowTo event. Fired when the user navigates via the keyboard to a selected item.
		 *
		 * @event itemArrowTo
		 * @param {Event.Facade} event The itemArrowTo event.
		 */
		instance.publish('itemArrowTo');

		/**
		 * Handles the itemMouseOut event. Fired when the user mouses away from an item.
		 *
		 * @event itemMouseOut
		 * @param {Event.Facade} event The itemMouseOut event.
		 */
		instance.publish('itemMouseOut');

		/**
		 * Handles the itemMouseOver event. Fired when the user mouses over an item.
		 *
		 * @event itemMouseOver
		 * @param {Event.Facade} event The itemMouseOver event.
		 */
		instance.publish('itemMouseOver');

		/**
		 * Handles the itemSelect event. Fired when an item in the list is selected.
		 *
		 * @event itemSelect
		 * @param {Event.Facade} event The itemSelect event.
		 */
		instance.publish('itemSelect');

		/**
		 * Handles the selectionEnforce event. Fired if <a href="Autocomplete.html#config_forceSelection">forceSelection</a>
		 * is enabled and the users input element has been cleared because it did not match one of the results.
		 *
		 * @event selectionEnforce
		 * @param {Event.Facade} event The selectionEnforce event.
		 */
		instance.publish('selectionEnforce');

		/**
		 * Handles the textboxBlur event. Fired when the user leaves the input element.
		 *
		 * @event textboxBlur
		 * @param {Event.Facade} event The textboxBlur event.
		 */
		instance.publish('textboxBlur');

		/**
		 * Handles the textboxChange event. Fired when the value in the input element is changed.
		 *
		 * @event textboxChange
		 * @param {Event.Facade} event The textboxChange event.
		 */
		instance.publish('textboxChange');

		/**
		 * Handles the textboxFocus event. Fired when user moves focus to the input element.
		 *
		 * @event textboxFocus
		 * @param {Event.Facade} event The textboxFocus event.
		 */
		instance.publish('textboxFocus');

		/**
		 * Handles the textboxKey event. Fired when the input element receives key input.
		 *
		 * @event textboxKey
		 * @param {Event.Facade} event The textboxKey event.
		 */
		instance.publish('textboxKey');

		/**
		 * Handles the typeAhead event. Fired when the input element has been pre-filled by the type-ahead feature.
		 *
		 * @event typeAhead
		 * @param {Event.Facade} event The typeAhead event.
		 */
		instance.publish('typeAhead');

		/**
		 * Handles the unmatchedItemSelect event. Fired when a user selects something that does
		 * not match any of the displayed results.
		 *
		 * @event unmatchedItemSelect
		 * @param {Event.Facade} event The unmatchedItemSelect event.
		 */
		instance.publish('unmatchedItemSelect');
	},

	/**
	 * Sync the AutoComplete UI. Lifecycle.
	 *
	 * @method syncUI
	 * @protected
	 */
	syncUI: function() {
		var instance = this;

		instance.inputNode.setAttribute('autocomplete', 'off');
	},

	/**
	 * An overridable method that is executed before the result overlay is loaded with results.
	 *
	 * @method doBeforeLoadData
	 * @param {EventFacade} event
	 * @return {Boolean}
	 */
	doBeforeLoadData: function(event) {
		return true;
	},

	/**
	 * An overridable method for formatting the result of the query before it's displayed in the overlay.
	 *
	 * @method formatResult
	 * @param {Object} result The result data object
	 * @param {String} request The current query string
	 * @param {String} resultMatch The string from the results that matches the query
	 * @return {String}
	 */
	formatResult: function(result, request, resultMatch) {
		return resultMatch || '';
	},

	/**
	 * An overridable method that creates an object to be passed to the sendRequest
	 * method of the data source object. Useful to overwrite if you wish to create
	 * a custom request object before it's sent.
	 *
	 * @method generateRequest
	 * @param {String} query The string currently being entered
	 * @return {Object}
	 */
	generateRequest: function(query) {
		return {
			request: query
		};
	},

	/**
	 * Handles the response for the display of the results. This is a callback method
	 * that is fired by the sendRequest method so that results are ready to be accessed.
	 *
	 * @method handleResponse
	 * @param {EventFacade} event
	 */
	handleResponse: function(event) {
		var instance = this;

		instance.fire('handleResponse', event);

		var iconClass = instance.get('iconButton') || ICON_DEFAULT;

		if (event.error) {
			iconClass = ICON_ERROR;
		}

		instance.button.set(ICON, iconClass);
	},

	_bindDataSource: function() {
		var instance = this;

		var button = instance.button;
		var dataSource = instance.get('dataSource');
		var dataSourceType = instance.get('dataSourceType');

		dataSource.on('request', A.bind(button.set, button, ICON, ICON_LOADING));
		dataSource.on('error', instance.handleResponse, instance);
		dataSource.after('response', instance.handleResponse, instance);
	},

	/**
	 * Clears the query interval
	 *
	 * @method _clearInterval
	 * @private
	 */
	_clearInterval: function() {
		var instance = this;

		if (instance._queryIntervalId) {
			clearInterval(instance._queryIntervalId);

			instance._queryIntervalId = null;
		}
	},

	/**
	 * When <a href="Autocomplete.html#config_forceSelection">forceSelection</a> is true and
	 * the user tries to leave the input element without selecting an item from the results,
	 * the user selection is cleared.
	 *
	 * @method _clearSelection
	 * @protected
	 */
	_clearSelection: function() {
		var instance = this;

		var delimChar = instance.get('delimChar');
		var extraction = {
			previous: '',
			query: instance.inputNode.get('value')
		};

		if (delimChar) {
			extraction = instance._extractQuery(instance.inputNode.get('value'));
		}

		instance.fire('selectionEnforce', extraction.query);
	},

	/**
	 * Enables query interval detection for IME support.
	 *
	 * @method _enableIntervalDetection
	 * @protected
	 */
	_enableIntervalDetection: function() {
		var instance = this;

		var queryInterval = instance.get('queryInterval');

		if (!instance._queryIntervalId && queryInterval) {
			instance._queryInterval = setInterval(A.bind(instance._onInterval, instance), queryInterval);
		}
	},

	/**
	 * Extracts the right most query from the delimited string in the input.
	 *
	 * @method _extractQuery
	 * @param {String} query String to parse
	 * @protected
	 * @return {String}
	 */
	_extractQuery: function(query) {
		var instance = this;

		var delimChar = instance.get('delimChar');
		var delimIndex = -1;
		var i = delimChar.length - 1;

		var newIndex, queryStart, previous;

		for (; i >= 0; i--) {
			newIndex = query.lastIndexOf(delimChar[i]);

			if (newIndex > delimIndex) {
				delimIndex = newIndex;
			}
		}

		if (delimChar[i] == ' ') {
			for (var j = delimChar.length - 1; j >= 0; j--){
				if (query[delimIndex - 1] == delimChar[j]) {
					delimIndex--;

					break;
				}
			}
		}

		if (delimIndex > -1) {
			queryStart = delimIndex + 1;

			while (query.charAt(queryStart) == ' ') {
				queryStart += 1;
			}

			previous = query.substring(0, queryStart);

			query = query.substring(queryStart);
		}
		else {
			previous = '';
		}

		return {
			previous: previous,
			query: query
		};
	},

	/**
	 * Focuses the input element.
	 *
	 * @method _focus
	 * @protected
	 */
	_focus: function() {
		var instance = this;

		setTimeout(
			function() {
				instance.inputNode.focus();
			},
			1
		);
	},

	/**
	 * Called when the user mouses down on the button element in the combobox.
	 *
	 * @method _onButtonMouseDown
	 * @param {EventFacade} event
	 * @protected
	 */
	_onButtonMouseDown: function(event) {
		var instance = this;

		event.halt();

		instance._focus();

		instance._sendQuery(instance.inputNode.get('value') + '*');
	},

	/**
	 * Enables the query to be triggered based on detecting text input via intervals instead of via
	 * key events.
	 *
	 * @method _onInterval
	 * @protected
	 */
	_onInterval: function() {
		var instance = this;

		var curValue = instance.inputNode.get('value');
		var lastValue = instance._lastValue;

		if (curValue != lastValue) {
			instance._lastValue = curValue;

			instance._sendQuery(curValue);
		}
	},

	/**
	 * Handles the input element losing focus.
	 *
	 * @method _onTextboxBlur
	 * @param {EventFacade} event
	 * @protected
	 */
	_onTextboxBlur: function(event) {
		var instance = this;

		if (!instance._overContainer || KeyMap.isKey(instance._keyCode, TAB)) {
			instance.fire('textboxBlur');
		}
		else {
			instance._focus();
		}
	},

	/**
	 * Handles the input element gaining focus.
	 *
	 * @method _onTextboxFocus
	 * @param {EventFacade} event
	 * @protected
	 */
	_onTextboxFocus: function(event) {
		var instance = this;

		if (!instance.get('focused')) {
			instance.inputNode.setAttribute('autocomplete', 'off');
			instance.focus();
			instance._initInputValue = instance.inputNode.get('value');

			instance.fire('textboxFocus');
		}
	},

	/**
	 * Handles the keydown events on the input element for functional keys.
	 *
	 * @method _onTextboxKeyDown
	 * @param {EventFacade} event
	 * @protected
	 */
	_onTextboxKeyDown: function(event) {
		var instance = this;

		var keyCode = event.keyCode;

		if (instance._typeAheadDelayId != -1) {
			clearTimeout(instance._typeAheadDelayId);
		}

		instance.fire('textboxKeyDown', event);

		if (event.isKey(ALT)) {
			instance._enableIntervalDetection();
		}

		instance._keyCode = keyCode;
	},

	/**
	 * Handles the key press events of the input element.
	 *
	 * @method _onTextboxKeyPress
	 * @param {EventFacade} event
	 * @protected
	 */
	_onTextboxKeyPress: function(event) {
		var instance = this;

		instance.fire('textboxKeyPress', event);

		if (event.isKey(WIN_IME)) {
			instance._enableIntervalDetection();
		}
	},

	/**
	 * Handles the keyup events of the input element.
	 *
	 * @method _onTextboxKeyUp
	 * @param {EventFacade} event
	 * @protected
	 */
	_onTextboxKeyUp: function(event) {
		var instance = this;

		if (event.isSpecialKey() && !event.isKey(BACKSPACE)) {
			return;
		}

		instance.fire('textboxKeyUp', event);
	},

	/**
	 * Handles the rendering of the input element.
	 *
	 * @method _renderInput
	 * @protected
	 */
	_renderInput: function() {
		var instance = this;

		var contentBox = instance.get(CONTENT_BOX);
		var input = instance.get('input');
		var iconButton = instance.get('iconButton') || ICON_DEFAULT;

		var comboConfig = {
			field: {
				labelText: false
			},
			icons: [
				{
					icon: iconButton,
					id: 'trigger',
					handler: {
						fn: instance._onButtonMouseDown,
						context: instance
					}
				}
			]
		};

		var inputReference = null;
		var inputParent = null;

		if (input) {
			input = A.one(input);

			comboConfig.field.node = input;

			inputReference = input.next();
			inputParent = input.get('parentNode');
		}

		var comboBox = new A.Combobox(comboConfig).render(contentBox);

		if (inputParent) {
			var comboBoundingBox = comboBox.get('boundingBox');

			inputParent.insertBefore(comboBoundingBox, inputReference);
		}

		instance.inputNode = comboBox.get('node');
		instance.button = comboBox.icons.item('trigger');
		instance.comboBox = comboBox;

		instance.set('uniqueName', A.stamp(instance.inputNode));
	},

	/**
	 * Makes a query request to the data source.
	 *
	 * @method _sendQuery
	 * @param {String} query The query string
	 * @protected
	 */
	_sendQuery: function(query) {
		var instance = this;

		if (instance.get('disabled')) {
			instance.fire('sendQueryDisabled', query);

			return;
		}

		var delimChar = instance.get('delimChar');
		var minQueryLength = instance.get('minQueryLength');

		if (delimChar) {
			var extraction = instance._extractQuery(query);

			query = extraction.query;

			instance._pastSelections = extraction.previous;
		}

		if ((query && (query.length < minQueryLength)) || (!query && minQueryLength > 0)) {
			instance.fire('invalidQueryLength', query);

			return;
		}

		query = encodeURIComponent(query);

		var dataSource = instance.get('dataSource');

		var request = instance.generateRequest(query);

		instance.fire('dataRequest', request);

		dataSource.sendRequest(request);
	},

	/**
	 * Updates in the input element with the first result as the user types,
	 * selecting the text the user has not typed yet.
	 *
	 * @method _typeAhead
	 * @param {Node} elListItem The selected list item
	 * @param {String} query The query string
	 * @protected
	 */
	_typeAhead: function(elListItem, query) {
		var instance = this;

		if (!instance.get('typeAhead') || KeyMap.isKey(instance._keyCode, BACKSPACE)) {
			return;
		}

		var inputEl = A.Node.getDOMNode(instance.inputNode);

		if (inputEl.setSelectionRange || inputEl.createTextRange) {
			instance._typeAheadDelayId = setTimeout(
				function() {
					var value = inputEl.value;

					var start = value.length;

					instance._updateValue(elListItem);

					var end = inputEl.value.length;

					instance.inputNode.selectText(start, end);

					var prefill = inputEl.value.substr(start, end);

					instance.fire('typeAhead', query, prefill);
				},
				instance.get('typeAheadDelay')
			);
		}
	},

	_currentQuery: null,
	_initInputValue: null,
	_keyCode: null,
	_lastValue: null,
	_pastSelections: '',
	_typeAheadDelayId: -1
};

A.InputTextControl = InputTextControl;

}, '@VERSION@' ,{requires:['aui-base','aui-datasource-control-base','aui-form-combobox']});


AUI.add('aui-datasource-control', function(A){}, '@VERSION@' ,{use:['aui-datasource-control-base','aui-input-text-control'], skinnable:true});

