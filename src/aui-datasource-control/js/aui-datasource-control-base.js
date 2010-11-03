var Lang = A.Lang,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	BINDUI = 'bindUI',
	JSON = 'json',
	RENDERUI = 'renderUI',
	SYNCUI = 'syncUI',
	XML = 'xml';

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

				if (dataSourceType == 'dataSourceIO') {
					dataSource.on(
						'request',
						function(event) {
							var instance = this;

							var uriFormatter = instance.get('uriFormatter');

							if (isFunction(uriFormatter)) {
								var source = uriFormatter.call(instance, instance.get('requestData'));

								if (source) {
									dataSource.set('source', source);
								}
							}
						},
						instance
					);

					dataSource.on(
						'data',
						function(event) {
							var instance = this;

							if (!event.error) {
								instance.set('responseData', event.data);
							}
						},
						instance
					);
				}

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

	requestData: {
		value: null
	},

	responseData: {
		value: null,
		setter: function(val) {
			var instance = this;

			return this._setResponseData(val);
		}
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
				if (!val.fn) {
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
				else {
					schema = val;
					val = val.cfg.schema;
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
		validator: isString
	},

	uriFormatter: {
		value: null
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
	},

	_setResponseData: function(xhr) {
		var instance = this;

		var data = null;

		if (xhr) {
			var schemaType = instance.get('schemaType');
			var contentType = xhr.getResponseHeader('content-type');

			if ((schemaType == XML) || (!schemaType && contentType.indexOf(XML) >= 0)) {

				data = xhr.responseXML;

				if (data.documentElement.tagName == 'parsererror') {
					throw PARSE_ERROR;
				}
			}
			else {
				data = xhr.responseText;
			}

			if (data === '') {
				data = null;
			}

			if (schemaType == JSON) {
				try {
					data = A.JSON.parse(data);
				}
				catch(e) {

				}
			}
			else {
				var selector = instance.get('selector');

				if (data && selector) {
					var tempRoot;

					if (data.documentElement) {
						tempRoot = A.one(data);
					}
					else {
						tempRoot = A.Node.create(data);
					}

					data = tempRoot.all(selector);
				}
			}
		}

		return data;
	}
}

A.DataSourceControl = DataSourceControl;