AUI.add('io-plugin', function(A) {

var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	StdMod = A.WidgetStdMod,

	TYPE_NODE = 'Node',
	TYPE_WIDGET = 'Widget',

	FAILURE = 'failure',
	FAILURE_MESSAGE = 'failureMessage',
	HOST = 'host',
	ICON = 'icon',
	IO = 'io',
	IO_PLUGIN = 'IOPlugin',
	LOADING = 'loading',
	LOADING_EL = 'loadingEl',
	NODE = 'node',
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
		// node give us the possibility of plug IO in any object we want,
		// the setContent will use the node to set the content
		node: {
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
	initializer: function() {
		var instance = this;

		instance.bindUI();
	},

	bindUI: function() {
		var instance = this;

		instance.on('activeChange', instance._onActiveChange);

		instance.on(SUCCESS, instance._successHandler);
		instance.on(FAILURE, instance._failureHandler);
	},

	_afterInit: function() {
		var instance = this;

		// bind all child events before invoke the autoStart
		instance._bindPlugins();

		// autoStart invoked
		IOPlugin.superclass._afterInit.apply(this, arguments);
	},

	_bindPlugins: function() {
		var instance = this;
		var node = instance.get(NODE);

		if (node && instance.get(PARSE_CONTENT)) {
			node.plug(A.Plugin.ParseContent);

			// if its on a Widget dont allow close before the ParseContent finish the queue
			if (instance.get(TYPE) == TYPE_WIDGET) {
				var host = instance.get(HOST);
				var queue = node.ParseContent.get(QUEUE);

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
				// when this.get(HOST) is a Node instance the NODE is the host
				var node = instance.get(NODE);

				node.setContent.apply(node, [content]);
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

}, '@VERSION' , { requires: [ 'component-overlay', 'parse-content', 'io-request' ] });