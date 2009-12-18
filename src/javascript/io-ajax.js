AUI().add(
	'io-ajax',
	function(A) {
		var Lang = A.Lang,

			getClassName = A.ClassNameManager.getClassName,

			NAME = 'ajax';

		var Ajax = function() {
			Ajax.superclass.constructor.apply(this, arguments);
		};

		Ajax.NAME = NAME;

		Ajax.ATTRS = {
			autoLoad: {
				value: true
			},
			uri: {
				value: null,
				getter: function(value) {
					var instance = this;

					var cache = instance.get('cache');

					if (!cache) {
						value += (value.indexOf('?') == -1) ? '?' : '&';

						var timestamp = (+ new Date);

						if (value.indexOf('_AUI_t=') > -1) {
							value = value.replace(/(_AUI_t=)\d+/, '$1' + timestamp);
						}
						else {
							value += '_AUI_t=' + timestamp;
						}
					}

					return value;
				},
				setter: AUI.defaults.io.uriFormatter,
				validator: Lang.isString
			},
			method: {
				value: AUI.defaults.io.method,
				setter: function(value) {
					var instance = this;

					if (instance._originalConfig) {
						instance._originalConfig.method = value;
					}
				}
			},
			dataType: {
				value: null,
				setter: function(value) {
					return value && value.toLowerCase();
				}
			},
			responseData: {
				value: null,
				setter: function(value) {
					var instance = this;

					var dataType = instance.get('dataType');

					try {
						if (value && value.responseText) {
							var xhr = value;

							if (dataType == 'xml' ||
								xhr.getResponseHeader('content-type').indexOf('xml') > -1) {

								value = xhr.responseXML;

								dataType = 'xml';
							}
							else {
								value = xhr.responseText;
							}
						}

						if (AUI.defaults.io.dataFormatter) {
							value = AUI.defaults.io.dataFormatter(value);
						}

						if (dataType == 'json') {
							value = A.JSON.parse(value);
						}
					}
					catch (e) {
						throw new Error('Parser error: dataType: "' + dataType + '" is not correctly parsing');

						value = A.Attribute.INVALID_VALUE;
					}

					return value;
				}
			},
			cache: {
				value: true,
				validator: function(value) {
					var instance = this;

					return Lang.isBoolean(value) && instance.get('method').toLowerCase() == 'get';
				}
			}
		};

		A.extend(
			Ajax,
			A.Base,
			{
				initializer: function(config) {
					var instance = this;

					instance._createEvents();

					config = A.mix(
						{
							method: instance.get('method'),
							on: {
								complete: A.bind(instance._handleComplete, instance),
								end: A.bind(instance.fire, instance, 'end'),
								failure: A.bind(instance.fire, instance, 'failure'),
								start: A.bind(instance.fire, instance, 'start'),
								success: A.bind(instance._handleSuccess, instance)
							}
						},
						config
					);

					instance._originalConfig = config;

					if (instance.get('autoLoad')) {
						instance.start();
					}
				},

				destructor: function() {
					var instance = this;

					instance.stop();

					instance.transaction = null;
					instance.xhr = null;
				},

				start: function(config) {
					var instance = this;

					instance.xhr = null;

					var originalConfig = instance._originalConfig;

					A.mix(originalConfig, config, true);

					if (config) {
						instance.setAttrs(originalConfig);
					}

					instance.fire('initialize', originalConfig);
				},

				stop: function() {
					var instance = this;

					if (instance.transaction) {
						instance.transaction.abort();
					}
				},

				_createEvents: function() {
					var instance = this;

					instance.publish('complete');
					instance.publish('end');
					instance.publish('failure');

					instance.publish(
						'initialize',
						{
							defaultFn: instance._defInitializeHandler
						}
					);

					instance.publish(
						'start',
						{
							preventedFn: instance._preventConnection
						}
					);

					instance.publish(
						'success',
						{
							defaultFn: instance._defSuccessHandler
						}
					);
				},

				_defInitializeHandler: function(event) {
					var instance = this;

					var uri = instance.get('uri');

					var config = event.details[0];

					instance.transaction = A.io(uri, config);
				},

				_handleComplete: function(id, obj) {
					var instance = this;

					instance.xhr = obj;

					instance.fire('complete', id, obj);
				},

				_handleSuccess: function(id, obj) {
					var instance = this;

					instance.set('responseData', obj);

					instance.fire('success', id, obj);
				},

				_preventConnection: function() {
					var instance = this;

					if (instance.transaction) {
						instance.transaction.abort();
					}
				}
			}
		);

		A.namespace('Plugin').IOAjax = Ajax;

		A.io.ajax = function(config) {
			return new A.Plugin.IOAjax(config);
		};
	},
	'@VERSION',
	{
		requires: ['base', 'io', 'json']
	}
);