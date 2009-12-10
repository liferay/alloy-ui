AUI.add('io-plugin', function(A) {

var L = A.Lang,
	isBoolean = L.isBoolean,
	isFunction = L.isFunction,
	isObject = L.isObject,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	StdMod = A.WidgetStdMod,

	TYPE_NODE = 'Node',
	TYPE_WIDGET = 'Widget',

	AUTO_LOAD = 'autoLoad',
	CFG = 'cfg',
	COMPLETE = 'complete',
	CONTENT_NODE = 'contentNode',
	FAILURE = 'failure',
	FAILURE_MESSAGE = 'failureMessage',
	HOST = 'host',
	ICON = 'icon',
	IO = 'io',
	LOADING = 'loading',
	LOADING_EL = 'loadingEl',
	PARSE_CONTENT = 'parseContent',
	POST = 'post',
	QUEUE = 'queue',
	SECTION = 'section',
	SHOW_LOADING = 'showLoading',
	START = 'start',
	SUCCESS = 'success',
	TYPE = 'type',
	URI = 'uri',
	WHERE = 'where',

	getCN = A.ClassNameManager.getClassName,

	CSS_ICON_LOADING = getCN(ICON, LOADING);

function IOPlugin(config) {
	IOPlugin.superclass.constructor.apply(this, arguments);
}

A.mix(IOPlugin, {
	NAME: IO,

	NS: IO,

	ATTRS: {
		autoLoad: {
			value: true,
			validator: isBoolean
		},

		cfg: {
			value: {},
			setter: function(value) {
				var instance = this;
				var data = value.data;

				// ignoring user callbacks for io cfg, user should pass callbacks on IOPlugin instance instead
				delete value.on;

				if (isObject(data)) {
					value.data = A.toQueryString(data);
				}

				return A.merge(
					// default cfg
					{
						method: POST,
						on: {
							complete: function(id, o) {
								instance._fire(COMPLETE, id, o);
							},
							failure: function(id, o) {
								instance._fire(FAILURE, id, o);
							},
							start: function(id, o) {
								instance._fire(START, id, o);
							},
							success: function(id, o) {
								instance._fire(SUCCESS, id, o);
							}
						}
					},
					// user cfg
					value
				);
			},
			validator: isObject
		},

		// contentNode give us the possibility of plug IO in any object we want,
		// the setContent will use the contentNode to set the content
		contentNode: {
			value: null,
			setter: function(value) {
				var instance = this;

				if (!value) {
					var host = instance.get(HOST);
					var type = instance.get(TYPE);

					if (type == TYPE_NODE) {
						value = host;
					}
					else if (type == TYPE_WIDGET) {
						value = host.getStdModNode(
							instance.get(SECTION)
						);
					}
				}

				return A.one(value);
			},
			validator: isNode
		},

		failureMessage: {
			value: 'Failed to retrieve content',
			validator: isString
		},

		loading: {
			value: false,
			validator: isBoolean
		},

		loadingEl: {
			value: '<div class="' + CSS_ICON_LOADING + '"></div>',
			setter: function(v) {
				var node = v;

				if (isString(v)) {
					node = A.Node.create(v);
				}

				return A.one(node);
			}
		},

		parseContent: {
			value: true,
			validator: isBoolean
		},

		showLoading: {
			value: true,
			validator: isBoolean
		},

		section: {
			value: StdMod.BODY,
			validator: function(val) {
				return (!val || val == StdMod.BODY || val == StdMod.HEADER || val == StdMod.FOOTER);
			}
		},

		type: {
			readOnly: true,
			valueFn: function() {
				var instance = this;
				// NOTE: default type
				var type = TYPE_NODE;

				if (instance.get(HOST) instanceof A.Widget) {
					type = TYPE_WIDGET;
				}

				return type;
			},
			validator: isString
		},

		uri: {
			validator: isString
		},

		where: {
			value: StdMod.REPLACE,
			validator: function(val) {
				return (!val || val == StdMod.AFTER || val == StdMod.BEFORE || val == StdMod.REPLACE);
			}
		}
	}
});

A.extend(IOPlugin, A.Plugin.Base, {
	_io: null,

	/*
	* Lifecycle
	*/
	initializer: function() {
		var instance = this;

		IOPlugin.superclass.initializer.apply(this, arguments);

		instance.bindUI();

		if (instance.get(AUTO_LOAD)) {
			instance.start();
		}
	},

	bindUI: function() {
		var instance = this;

		instance.publish(COMPLETE, { defaultFn: instance._complete });
		instance.publish(SUCCESS, { defaultFn: instance._success });
		instance.publish(FAILURE, { defaultFn: instance._failure });
		instance.publish(START, { defaultFn: instance._start });

		instance.on('loadingChange', instance._onLoadingChange);

		instance._bindPlugins();
	},

	destructor: function() {
		var instance = this;

		instance.stop();

		instance._io = null;
	},

	_bindPlugins: function() {
		var instance = this;
		var contentNode = instance.get(CONTENT_NODE);

		if (contentNode && instance.get(PARSE_CONTENT)) {
			contentNode.plug(A.Plugin.ParseContent);

			// if its on a Widget dont allow close before the ParseContent finish the queue
			if (instance.get(TYPE) == TYPE_WIDGET) {
				var host = instance.get(HOST);
				var queue = contentNode.ParseContent.get(QUEUE);

				if (queue) {
					// dont close the overlay while queue is running
					host.on('close', function(event) {
						if (queue.isRunning()) {
							event.halt();
						}
					});

					// stop the queue after the dialog is closed, just in case.
					host.after('close', function(event) {
						queue.stop();
					});
				}
			}
		}
	},

	/*
	* Methods
	*/
	isActive: function() {
		return this._io;
	},

	setContent: function(content) {
		var instance = this;

		instance._getContentSetterByType().apply(instance, [content]);
	},

	showLoading: function() {
		var instance = this;

		instance.setContent(
			instance.get(LOADING_EL)
		);
	},

	start: function() {
		var instance = this;
		var cfg = instance.get(CFG);
		var uri = instance.get(URI);

		instance.stop();

		instance._io = A.io(uri, cfg);

		return instance;
	},

	stop: function() {
		var instance = this;

		if (instance._io) {
			instance._io.abort();
		}

		return instance;
	},

	_getContentSetterByType: function() {
		var instance = this;

		var setters = {
			// NOTE: default setter, see 'type' attribute definition
			Node: function(content) {
				var instance = this;
				// when this.get(HOST) is a Node instance the CONTENT_NODE is the host
				var contentNode = instance.get(CONTENT_NODE);

				contentNode.setContent.apply(contentNode, [content]);
			},

			// Widget forces set the content on the SECTION node using setStdModContent method
			Widget: function(content) {
				var instance = this;
				var host = instance.get(HOST);

				host.setStdModContent.apply(host, [
					instance.get(SECTION),
					content,
					instance.get(WHERE)
				]);
			}
		};

		return setters[this.get(TYPE)];
	},

	_fire: function(eventType, id, o) {
		var instance = this;

		instance.fire(eventType, {
			io: {
				id: id,
				xhr: o
			}
		});
	},

	/*
	* IO callbacks
	*/
	_start: function(event) {
		this.set(LOADING, true);
	},

	_success: function(event) {
		var instance = this;

		instance.setContent(
			event.io.xhr.responseText
		);
	},

	_complete: function(event) {
		var instance = this;

		instance.set(LOADING, false);

		instance._io = null;
	},

	_failure: function(event) {
		var instance = this;

		instance.setContent(
			instance.get(FAILURE_MESSAGE)
		);
	},

	/*
	* Listeners
	*/
	_onLoadingChange: function(event) {
		var instance = this;

		if (event.newVal) {
			if (instance.get(SHOW_LOADING)) {
				instance.showLoading();
			}
		}
	}
});

A.namespace('Plugin').IO = IOPlugin;

}, '@VERSION' , { requires: [ 'aui-base', 'component-overlay', 'parse-content', 'io', 'plugin' ] });