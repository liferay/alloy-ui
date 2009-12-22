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

	CONTENT_NODE = 'contentNode',
	FAILURE = 'failure',
	FAILURE_MESSAGE = 'failureMessage',
	HOST = 'host',
	ICON = 'icon',
	IO = 'io',
	IO_PLUGIN = 'IOPlugin',
	LOADING = 'loading',
	LOADING_EL = 'loadingEl',
	PARSE_CONTENT = 'parseContent',
	QUEUE = 'queue',
	SECTION = 'section',
	SHOW_LOADING = 'showLoading',
	SUCCESS = 'success',
	TYPE = 'type',
	WHERE = 'where',

	getCN = A.ClassNameManager.getClassName,

	CSS_ICON_LOADING = getCN(ICON, LOADING);

function IOPlugin(config) {
	IOPlugin.superclass.constructor.apply(this, arguments);
}

A.mix(IOPlugin, {
	NAME: IO_PLUGIN,

	NS: IO,

	ATTRS: {
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

		where: {
			value: StdMod.REPLACE,
			validator: function(val) {
				return (!val || val == StdMod.AFTER || val == StdMod.BEFORE || val == StdMod.REPLACE);
			}
		}
	}
});

A.extend(IOPlugin, A.IORequest, {
	/*
	* Lifecycle
	*/
	bindUI: function() {
		var instance = this;

		IOPlugin.superclass.bindUI.apply(this, arguments);

		instance.after(SUCCESS, instance._successHandler);
		instance.after(FAILURE, instance._failureHandler);

		instance.on('activeChange', instance._onActiveChange);

		instance._bindPlugins();
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

	/*
	* IO callbacks
	*/
	_successHandler: function(event, id, xhr) {
		var instance = this;

		instance.setContent(
			xhr.responseText
		);
	},

	_failureHandler: function(event, id, xhr) {
		var instance = this;

		instance.setContent(
			instance.get(FAILURE_MESSAGE)
		);
	},

	/*
	* Listeners
	*/
	_onActiveChange: function(event) {
		var instance = this;

		if (event.newVal) {
			if (instance.get(SHOW_LOADING)) {
				instance.showLoading();
			}
		}
	}
});

A.namespace('Plugin').IO = IOPlugin;

}, '@VERSION' , { requires: [ 'aui-base', 'component-overlay', 'parse-content', 'io-request', 'plugin' ] });