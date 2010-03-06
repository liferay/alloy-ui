/**
 * The IOPlugin Utility - When plugged to a Node or Widget loads the content
 * of a URI and set as its content, parsing the <code>script</code> tags if
 * present on the code.
 *
 * @module aui-io-plugin
 */

var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	StdMod = A.WidgetStdMod,

	TYPE_NODE = 'Node',
	TYPE_WIDGET = 'Widget',

	EMPTY = '',
	FAILURE = 'failure',
	FAILURE_MESSAGE = 'failureMessage',
	HOST = 'host',
	ICON = 'icon',
	IO = 'io',
	IO_PLUGIN = 'IOPlugin',
	LOADING = 'loading',
	LOADING_MASK = 'loadingMask',
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

/**
 * A base class for IOPlugin, providing:
 * <ul>
 *    <li>Loads the content of a URI as content of a Node or Widget</li>
 *    <li>Use <a href="ParseContent.html">ParseContent</a> to parse the JavaScript tags from the content and evaluate them</li>
 * </ul>
 *
 * Quick Example:<br/>
 * 
 * <pre><code>A.one('#content').plug(A.Plugin.IO, { uri: 'assets/content.html', method: 'GET' });</code></pre>
 *
 * Check the list of <a href="IOPlugin.html#configattributes">Configuration Attributes</a> available for
 * IOPlugin.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class A.Plugin.IO
 * @constructor
 * @extends IORequest
 */
function IOPlugin(config) {
	IOPlugin.superclass.constructor.apply(this, arguments);
}

A.mix(IOPlugin, {
	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property A.Plugin.IO.NAME
	 * @type String
	 * @static
	 */
	NAME: IO_PLUGIN,

	/**
	 * Static property provides a string to identify the namespace.
	 *
	 * @property A.Plugin.IO.NS
	 * @type String
	 * @static
	 */
	NS: IO,

	/**
	 * Static property used to define the default attribute
	 * configuration for the A.Plugin.IO.
	 *
	 * @property A.Plugin.IO.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {
		/**
		 * Plug IO in any object we want, the setContent will use the node to
         * set the content.
		 *
		 * @attribute node
		 * @default null
		 * @type Node | String
		 */
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
						var section = instance.get(SECTION);

						// if there is no node for the SECTION, forces creation
						if (!host.getStdModNode(section)) {
							host.setStdModContent(section, EMPTY);
						}

						value = host.getStdModNode(section);
					}
				}

				return A.one(value);
			},
			validator: isNode
		},

		/**
		 * Message to be set on the content when the transaction fails.
		 *
		 * @attribute failureMessage
		 * @default 'Failed to retrieve content'
		 * @type String
		 */
		failureMessage: {
			value: 'Failed to retrieve content',
			validator: isString
		},

		/**
		 * Options passed to the <a href="LoadingMask.html">LoadingMask</a>.
		 *
		 * @attribute loadingMask
		 * @default {}
		 * @type Object
		 */
		loadingMask: {
			value: {}
		},

		/**
		 * If true the <a href="ParseContent.html">ParseContent</a> plugin
         * will be plugged to the <a href="A.Plugin.IO.html#config_node">node</a>.
		 *
		 * @attribute parseContent
		 * @default true
		 * @type boolean
		 */
		parseContent: {
			value: true,
			validator: isBoolean
		},

		/**
		 * Show the <a href="LoadingMask.html">LoadingMask</a> covering the <a
         * href="A.Plugin.IO.html#config_node">node</a> while loading.
		 *
		 * @attribute showLoading
		 * @default true
		 * @type boolean
		 */
		showLoading: {
			value: true,
			validator: isBoolean
		},

		/**
		 * Section where the content will be set in case you are plugging it
         * on a instace of <a href="WidgetStdMod.html">WidgetStdMod</a>.
		 *
		 * @attribute section
		 * @default StdMod.BODY
		 * @type String
		 */
		section: {
			value: StdMod.BODY,
			validator: function(val) {
				return (!val || val == StdMod.BODY || val == StdMod.HEADER || val == StdMod.FOOTER);
			}
		},

		/**
		 * Type of the <code>instance</code> we are pluggin the A.Plugin.IO.
         * Could be a Node, or a Widget.
		 *
		 * @attribute type
		 * @default 'Node'
		 * @readOnly
		 * @type String
		 */
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

		/**
		 * Where to insert the content, AFTER, BEFORE or REPLACE.
		 *
		 * @attribute where
		 * @default StdMod.REPLACE
		 * @type String
		 */
		where: {
			value: StdMod.REPLACE,
			validator: function(val) {
				return (!val || val == StdMod.AFTER || val == StdMod.BEFORE || val == StdMod.REPLACE);
			}
		}
	}
});

A.extend(IOPlugin, A.IORequest, {
	/**
	 * Construction logic executed during A.Plugin.IO instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function() {
		var instance = this;

		instance.bindUI();
	},

	/**
	 * Bind the events on the A.Plugin.IO UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		var instance = this;

		instance.on('activeChange', instance._onActiveChange);

		instance.on(SUCCESS, instance._successHandler);
		instance.on(FAILURE, instance._failureHandler);

		if ((instance.get(TYPE) == TYPE_WIDGET) && instance.get(SHOW_LOADING)) {
			var host = instance.get(HOST);

			host.after('heightChange', instance._syncLoadingMaskUI, instance);
			host.after('widthChange', instance._syncLoadingMaskUI, instance);
		}
	},

	/**
	 * Fires after the init phase of the A.Plugin.IO.
	 *
	 * @method _afterInit
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterInit: function() {
		var instance = this;

		// bind all child events before invoke the autoStart
		instance._bindPlugins();

		// autoStart invoked
		IOPlugin.superclass._afterInit.apply(this, arguments);
	},

	/**
	 * Bind the plugins on the <code>instance</code>.
	 *
	 * @method _bindPlugins
	 * @protected
	 */
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

	/**
	 * Invoke the <a href="OverlayMask.html#method_hide">OverlayMask hide</a> method.
	 *
	 * @method hideLoading
	 */
	hideLoading: function() {
		var instance = this;

		var node = instance.get(NODE);

		if (node.loadingmask) {
			node.loadingmask.hide();
		}
	},

	/**
	 * Set the content of the <a href="A.Plugin.IO.html#config_node">node</a>.
	 *
	 * @method setContent
	 */
	setContent: function(content) {
		var instance = this;
		var node = instance.get(NODE);

		if (instance.overlayMaskBoundingBox) {
			instance.overlayMaskBoundingBox.remove();
		}

		instance._getContentSetterByType().apply(instance, [content]);
	},

	/**
	 * Invoke the <a href="OverlayMask.html#method_show">OverlayMask show</a> method.
	 *
	 * @method showLoading
	 */
	showLoading: function() {
		var instance = this;
		var node = instance.get(NODE);

		if (node.loadingmask) {
			if (instance.overlayMaskBoundingBox) {
				node.append(instance.overlayMaskBoundingBox);
			}
		}
		else {
			node.plug(
				A.LoadingMask,
				instance.get(LOADING_MASK)
			);

			instance.overlayMaskBoundingBox = node.loadingmask.overlayMask.get('boundingBox');
		}

		node.loadingmask.show();
	},

	/**
	 * Get the appropriated <a
     * href="A.Plugin.IO.html#method_setContent">setContent</a> function
     * implementation for each <a href="A.Plugin.IO.html#config_type">type</a>.
	 *
	 * @method _getContentSetterByType
	 * @protected
	 * @return {function}
	 */
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

	/**
	 * Sync the loading mask UI.
	 *
	 * @method _syncLoadingMaskUI
	 * @protected
	 */
	_syncLoadingMaskUI: function() {
		var instance = this;

		instance.get(NODE).loadingmask.refreshMask();
	},

	/**
	 * Internal success callback for the IO transaction.
	 *
	 * @method _successHandler
	 * @param {EventFavade} event
	 * @param {String} id Id of the IO transaction.
	 * @param {Object} obj XHR transaction Object.
	 * @protected
	 */
	_successHandler: function(event, id, xhr) {
		var instance = this;

		instance.setContent(
			xhr.responseText
		);
	},

	/**
	 * Internal failure callback for the IO transaction.
	 *
	 * @method _failureHandler
	 * @param {EventFavade} event
	 * @param {String} id Id of the IO transaction.
	 * @param {Object} obj XHR transaction Object.
	 * @protected
	 */
	_failureHandler: function(event, id, xhr) {
		var instance = this;

		instance.setContent(
			instance.get(FAILURE_MESSAGE)
		);
	},

	/**
	 * Fires after the value of the
	 * <a href="A.Plugin.IO.html#config_active">active</a> attribute change.
	 *
	 * @method _onActiveChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_onActiveChange: function(event) {
		var instance = this;

		var showLoading = instance.get(SHOW_LOADING);

		if (event.newVal) {
			if (showLoading) {
				instance.showLoading();
			}
		}
		else {
			if (showLoading) {
				instance.hideLoading();
			}
		}
	}
});

A.namespace('Plugin').IO = IOPlugin;