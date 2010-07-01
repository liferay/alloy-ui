/**
 * The Resize Utility allows you to make an HTML element resizable.
 *
 * @module aui-resize
 */

// TODO: Containment with proxy enabled and fix containment handles locking.
// To fix the Containment #2528540 need to be fixed.
var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,

	trim = L.trim,
	indexOf = A.Array.indexOf,

	DOT = '.',
	COMMA = ',',
	SPACE = ' ',

	ABSOLUTE = 'absolute',
	ACTIVE = 'active',
	ACTIVE_HANDLE = 'activeHandle',
	ACTIVE_HANDLE_EL = 'activeHandleEl',
	ALL = 'all',
	AUTO = 'auto',
	AUTO_HIDE = 'autoHide',
	BOTTOM = 'bottom',
	CLASS_NAME = 'className',
	CONSTRAIN2NODE = 'constrain2node',
	CONSTRAIN2REGION = 'constrain2region',
	CONSTRAIN2VIEW = 'constrain2view',
	CURSOR = 'cursor',
	DATA = 'data',
	DIAGONAL = 'diagonal',
	DOTTED = 'dotted',
	DRAGGING = 'dragging',
	DRAG_CURSOR = 'dragCursor',
	FIXED = 'fixed',
	GRIP = 'grip',
	GRIPSMALL = 'gripsmall',
	HANDLE = 'handle',
	HANDLES = 'handles',
	HEIGHT = 'height',
	HIDDEN = 'hidden',
	HORIZONTAL = 'horizontal',
	ICON = 'icon',
	INNER = 'inner',
	LEFT = 'left',
	MARGIN = 'margin',
	MAX_HEIGHT = 'maxHeight',
	MAX_WIDTH = 'maxWidth',
	MIN_HEIGHT = 'minHeight',
	MIN_WIDTH = 'minWidth',
	NODE = 'node',
	NODE_NAME = 'nodeName',
	NONE = 'none',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_LEFT = 'offsetLeft',
	OFFSET_TOP = 'offsetTop',
	OFFSET_WIDTH = 'offsetWidth',
	PARENT_NODE = 'parentNode',
	POSITION = 'position',
	PRESEVE_RATIO = 'preserveRatio',
	PROXY = 'proxy',
	PROXY_EL = 'proxyEl',
	PX = 'px',
	RELATIVE = 'relative',
	RESIZE = 'resize',
	RESIZING = 'resizing',
	RIGHT = 'right',
	STATIC = 'static',
	TICK_X = 'tickX',
	TICK_Y = 'tickY',
	TOP = 'top',
	VERTICAL = 'vertical',
	WIDTH = 'width',
	WRAP = 'wrap',
	WRAPPER = 'wrapper',
	WRAP_TYPES = 'wrapTypes',

	EV_MOUSE_UP = 'resize:mouseUp',
	EV_RESIZE = 'resize:resize',
	EV_RESIZE_END = 'resize:end',
	EV_RESIZE_START = 'resize:start',

	T = 't',
	TR = 'tr',
	R = 'r',
	BR = 'br',
	B = 'b',
	BL = 'bl',
	L = 'l',
	TL = 'tl',

	num = function(n) {
		return parseFloat(n);
	},

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	handleAttrName = function(handle) {
		return HANDLE + handle.toUpperCase();
	},

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	nodeSetter = function(val) {
		return A.one(val);
	},

	toInitialCap = A.cached(
		function(str) {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		}
	),

	getCN = A.ClassNameManager.getClassName,

	CSS_ICON = getCN(ICON),
	CSS_ICON_GRIPSMALL_DIAGONAL_BR = getCN(ICON, GRIPSMALL, DIAGONAL, BR),
	CSS_ICON_GRIP_DOTTED_HORIZONTAL = getCN(ICON, GRIP, DOTTED, HORIZONTAL),
	CSS_ICON_GRIP_DOTTED_VERTICAL = getCN(ICON, GRIP, DOTTED, VERTICAL),
	CSS_RESIZE = getCN(RESIZE),
	CSS_RESIZE_HANDLE = getCN(RESIZE, HANDLE),
	CSS_RESIZE_HANDLE_ACTIVE = getCN(RESIZE, HANDLE, ACTIVE),
	CSS_RESIZE_HANDLE_INNER = getCN(RESIZE, HANDLE, INNER),
	CSS_RESIZE_HANDLE_INNER_PLACEHOLDER = getCN(RESIZE, HANDLE, INNER, '{handle}'),
	CSS_RESIZE_HANDLE_PLACEHOLDER = getCN(RESIZE, HANDLE, '{handle}'),
	CSS_RESIZE_HIDDEN_HANDLES = getCN(RESIZE, HIDDEN, HANDLES),
	CSS_RESIZE_PROXY = getCN(RESIZE, PROXY),
	CSS_RESIZE_WRAPPER = getCN(RESIZE, WRAPPER),

	CSS_ICON_DIAGONAL = concat(CSS_ICON, CSS_ICON_GRIPSMALL_DIAGONAL_BR),
	CSS_ICON_HORIZONTAL = concat(CSS_ICON, CSS_ICON_GRIP_DOTTED_HORIZONTAL),
	CSS_ICON_VERTICAL = concat(CSS_ICON, CSS_ICON_GRIP_DOTTED_VERTICAL),

	TPL_HANDLE = '<div class="'+concat(CSS_RESIZE_HANDLE, CSS_RESIZE_HANDLE_PLACEHOLDER)+'">' +
					'<div class="'+concat(CSS_RESIZE_HANDLE_INNER, CSS_RESIZE_HANDLE_INNER_PLACEHOLDER)+'"></div>' +
				 '</div>',

	TPL_PROXY_EL = '<div class="' + CSS_RESIZE_PROXY + '"></div>',

	TPL_WRAP_EL = '<div class="' + CSS_RESIZE_WRAPPER + '"></div>',

	ALL_HANDLES = [ T, TR, R, BR, B, BL, L, TL ];

/**
 * <p><img src="assets/images/aui-resize/main.png"/></p>
 *
 * A base class for Resize, providing:
 * <ul>
 *    <li>Basic Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Applies drag handles to an element to make it resizable</li>
 *    <li>Here is the list of valid resize handles:
 *        <code>[ 't', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl' ]</code>. You can
 *        read this list as top, top-right, right, bottom-right, bottom,
 *        bottom-left, left, top-left.</li>
 *    <li>The drag handles are inserted into the element and positioned
 *        absolute. Some elements, such as a textarea or image, don't support
 *        children. To overcome that, set wrap:true in your config and the
 *        element willbe wrapped for you automatically.</li>
 * </ul>
 *
 * Quick Example:
 *
 * <pre><code>var instance = new A.Resize({
 *  node: '#resize1',
 *  proxy: true,
 *  preserveRatio: true,
 *  wrap: true,
 *  maxHeight: 170,
 *  maxWidth: 400,
 *  handles: 't, tr, r, br, b, bl, l, tl'
 * });
 * </code></pre>
 *
 * Check the list of <a href="Resize.html#configattributes">Configuration Attributes</a> available for
 * Resize.
 *
 * @class Resize
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 * @extends Base
 */
var Resize = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property Resize.NAME
		 * @type String
		 * @static
		 */
		NAME: RESIZE,

		/**
		 * Static property used to define the default attribute
		 * configuration for the Resize.
		 *
		 * @property Resize.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Stores the active handle during the resize.
			 *
			 * @attribute activeHandle
			 * @default null
			 * @private
			 * @type String
			 */
			activeHandle: {
				value: null,
				validator: isString
			},

			/**
			 * Stores the active handle element during the resize.
			 *
			 * @attribute activeHandleEl
			 * @default null
			 * @private
			 * @type Node
			 */
			activeHandleEl: {
				value: null,
				validator: isNode
			},

			/**
	         * False to ensure that the resize handles are always visible, true to
	         * display them only when the user mouses over the resizable borders.
			 *
			 * @attribute autoHide
			 * @default false
			 * @type boolean
			 */
			autoHide: {
				value: false,
				validator: isBoolean
			},

			/**
			 * Constrain the resize to a particular node. Will attempt to
	         * constrain the drag node to the boundaries of this node.
			 *
			 * @attribute constrain2node
			 * @default null
			 * @type String | Node
			 */
			constrain2node: {
				value: null
			},

			/**
			 * Constrain the resize to a particular region. An Object Literal
	         * containing a valid region (top, right, bottom, left) of page
	         * positions to constrain the drag node to.
			 *
			 * @attribute constrain2region
			 * @default null
			 * @type Object
			 */
			constrain2region: {
				value: null
			},

	        /**
	         * Will attempt to constrain the drag node to the boundaries of the
	         * viewport region.
	         *
	         * @attribute constrain2view
	         * @type Object
	         */
			constrain2view: {
				value: false
			},

	        /**
	         * The handles to use (any combination of): 't', 'b', 'r', 'l', 'bl',
	         * 'br', 'tl', 'tr'. Can use a shortcut of All.
	         *
	         * @attribute handles
	         * @default all
	         * @type Array | String
	         */
			handles: {
				setter: function(val) {
					var instance = this;
					var handles = [];

					// handles attr accepts both array or string
					if (isArray(val)) {
						handles = val;
					}
					else if (isString(val)) {
						// if the handles attr passed in is an ALL string...
						if (val.toLowerCase() == ALL) {
							handles = ALL_HANDLES;
						}
						// otherwise, split the string to extract the handles
						else {
							A.each(
								val.split(COMMA),
								function(node, i) {
									var handle = trim(node);

									// if its a valid handle, add it to the handles output
									if (indexOf(ALL_HANDLES, handle) > -1) {
										handles.push(handle);
									}
								}
							);
						}
					}

					return handles;
				},
				value: ALL
			},

	        /**
	         * The minimum height of the element
	         *
	         * @attribute minHeight
	         * @default 15
	         * @type Number
	         */
			minHeight: {
				value: 15,
				validator: isNumber
			},

	        /**
	         * The minimum width of the element
	         *
	         * @attribute minWidth
	         * @default 15
	         * @type Number
	         */
			minWidth: {
				value: 15,
				validator: isNumber
			},

	        /**
	         * The maximum height of the element
	         *
	         * @attribute maxHeight
	         * @default Infinity
	         * @type Number
	         */
			maxHeight: {
				value: Infinity,
				validator: isNumber
			},

	        /**
	         * The maximum width of the element
	         *
	         * @attribute maxWidth
	         * @default Infinity
	         * @type Number
	         */
			maxWidth: {
				value: Infinity,
				validator: isNumber
			},

			/**
	         * The selector or element to resize. Required.
	         *
	         * @attribute node
	         * @type Node
	         */
			node: {
				setter: nodeSetter
			},

			/**
	         * Maintain the element's ratio when resizing.
	         *
	         * @attribute preserveRatio
	         * @default false
	         * @type boolean
	         */
			preserveRatio: {
				value: false,
				validator: isBoolean
			},

			/**
	         * Resize a proxy element instead of the real element.
	         *
	         * @attribute proxy
	         * @default false
	         * @type boolean
	         */
			proxy: {
				value: false,
				validator: isBoolean
			},

			/**
	         * The Resize proxy element.
	         *
	         * @attribute proxyEl
	         * @default Generated using an internal HTML markup
	         * @type String | Node
	         */
			proxyEl: {
				setter: nodeSetter,
				valueFn: function() {
					return A.Node.create(TPL_PROXY_EL);
				}
			},

			/**
	         * True when the element is being Resized.
	         *
	         * @attribute resizing
	         * @default false
	         * @type boolean
	         */
			resizing: {
				value: false,
				validator: isBoolean
			},

	        /**
	         * The number of x ticks to span the resize to.
	         *
	         * @attribute tickX
	         * @default false
	         * @type Number | false
	         */
			tickX: {
				value: false
			},

	        /**
	         * The number of y ticks to span the resize to.
	         *
	         * @attribute tickY
	         * @default false
	         * @type Number | false
	         */
			tickY: {
				value: false
			},

			/**
			 * True to wrap an element with a div if needed (required for textareas
	         * and images, defaults to false) in favor of the handles config option.
	         * The wrapper element type (default div) could be over-riden passing the
	         * <code>wrapper</code> attribute.
			 *
			 * @attribute wrap
			 * @default false
			 * @type boolean
			 */
			wrap: {
				setter: function(val) {
					var instance = this;
					var node = instance.get(NODE);
					var nodeName = node.get(NODE_NAME);
					var typeRegex = instance.get(WRAP_TYPES);

					// if nodeName is listed on WRAP_TYPES force use the wrapper
					if (typeRegex.test(nodeName)) {
						val = true;
					}

					return val;
				},
				value: false,
				validator: isBoolean
			},

			/**
			 * Elements that requires a wrapper by default. Normally are elements
	         * which cannot have children elements.
			 *
			 * @attribute wrapTypes
			 * @default /canvas|textarea|input|select|button|img/i
			 * @readOnly
			 * @type Regex
			 */
			wrapTypes: {
				readOnly: true,
				value: /canvas|textarea|input|select|button|img/i
			},

			/**
			 * Element to wrap the <code>wrapTypes</code>. This element will house
	         * the handles elements.
			 *
			 * @attribute wrapper
			 * @default div
			 * @type String | Node
			 * @writeOnce
			 */
			wrapper: {
				setter: function() {
					var instance = this;
					var node = instance.get(NODE);

					// by deafult the wrapper is always the node
					var wrapper = node;

					// if the node is listed on the wrapTypes or wrap is set to true, create another wrapper
					if (instance.get(WRAP)) {
						wrapper = A.Node.create(TPL_WRAP_EL);

						node.placeBefore(wrapper);

						wrapper.append(node);

						instance._copyStyles(node, wrapper);

						// remove positioning of wrapped node, the WRAPPER take care about positioning
						node.setStyles({
							position: STATIC,
							left: 0,
							top: 0
						});
					}

					return wrapper;
				},
				value: null,
				writeOnce: true
			}
		},

		EXTENDS: A.Base,

		prototype: {
			CSS_INNER_HANDLE_MAP: {
				r: CSS_ICON_VERTICAL,
				l: CSS_ICON_VERTICAL,
				t: CSS_ICON_HORIZONTAL,
				b: CSS_ICON_HORIZONTAL,
				br: CSS_ICON_DIAGONAL
			},

		    /**
		     * Stores the current values for the height, width, top and left. You are
		     * able to manipulate these values on resize in order to change the resize
		     * behavior.
		     *
		     * @property info
		     * @type Object
		     * @protected
		     */
			info: null,

		    /**
		     * Stores the original values for the height, width, top and left, stored
		     * on resize start.
		     *
		     * @property originalInfo
		     * @type Object
		     * @protected
		     */
			originalInfo: null,

		    /**
		     * Construction logic executed during Resize instantiation. Lifecycle.
		     *
		     * @method initializer
		     * @protected
		     */
			initializer: function() {
				var instance = this;

				instance.info = {};

				instance.originalInfo = {};

				instance.get(NODE).addClass(CSS_RESIZE);

				instance.renderer();
			},

		    /**
		     * Create the DOM structure for the Resize. Lifecycle.
		     *
		     * @method renderUI
		     * @protected
		     */
			renderUI: function() {
				var instance = this;

				instance._renderHandles();
				instance._renderProxy();
			},

		    /**
		     * Bind the events on the Resize UI. Lifecycle.
		     *
		     * @method bindUI
		     * @protected
		     */
			bindUI: function() {
				var instance = this;

				instance._createEvents();
				instance._bindResize();
				instance._bindDD();
				instance._bindHandle();
			},

		    /**
		     * Sync the Resize UI.
		     *
		     * @method syncUI
		     * @protected
		     */
			syncUI: function() {
				var instance = this;

				// hide handles if AUTO_HIDE is true
				instance._setHideHandlesUI(
					instance.get(AUTO_HIDE)
				);
			},

		    /**
		     * Descructor lifecycle implementation for the Resize class. Purges events attached
		     * to the node (and all child nodes) and removes the Resize handles.
		     *
		     * @method destructor
		     * @protected
		     */
			destructor: function() {
				var instance = this;
				var node = instance.get(NODE);
				var wrapper = instance.get(WRAPPER);

				// purgeElements on boundingBox
				A.Event.purgeElement(wrapper, true);

				// destroy handles dd and remove them from the dom
				instance.eachHandle(function(handleEl) {
					var dd = handleEl.dd;

					if (dd) {
						dd.destroy();
					}

					// remove handle
					handleEl.remove();
				});

				// unwrap node
				if (instance.get(WRAP)) {
					node.setStyles({
						margin: wrapper.getStyle(MARGIN),
						position: wrapper.getStyle(POSITION)
					});

					wrapper.placeBefore(node);

					wrapper.remove();
				}

				node.removeClass(CSS_RESIZE);
				node.removeClass(CSS_RESIZE_HIDDEN_HANDLES);
			},

		    /**
		     * Creates DOM (or manipulates DOM for progressive enhancement)
		     * This method is invoked by initializer(). It's chained automatically for
		     * subclasses if required.
		     *
		     * @method renderer
		     * @protected
		     */
		    renderer: function() {
		        this.renderUI();
		        this.bindUI();
		        this.syncUI();
		    },

		    /**
		     * Bind the handles DragDrop events to the Resize instance.
		     *
		     * @method _bindDD
		     * @private
		     */
			_bindDD: function() {
				var instance = this;

				instance.on('drag:drag', instance._handleResizeEvent);
				instance.on('drag:dropmiss', instance._handleMouseUpEvent);
				instance.on('drag:end', instance._handleResizeEndEvent);
				instance.on('drag:start', instance._handleResizeStartEvent);
			},

		    /**
		     * Bind the events related to the handles (_onHandleMouseOver, _onHandleMouseOut).
		     *
		     * @method _bindHandle
		     * @private
		     */
			_bindHandle: function() {
				var instance = this;
				var wrapper = instance.get(WRAPPER);

				wrapper.on('mouseenter', A.bind(instance._onWrapperMouseEnter, instance));
				wrapper.on('mouseleave', A.bind(instance._onWrapperMouseLeave, instance));
				wrapper.delegate('mouseenter', A.bind(instance._onHandleMouseOver, instance), DOT+CSS_RESIZE_HANDLE);
				wrapper.delegate('mouseleave', A.bind(instance._onHandleMouseOut, instance), DOT+CSS_RESIZE_HANDLE);
			},

		    /**
		     * Bind the resize events to the Resize.
		     *
		     * @method _bindDD
		     * @private
		     */
			_bindResize: function() {
				var instance = this;

				instance.after(EV_RESIZE, instance._afterResize);
			},

		    /**
		     * Create the custom events used on the Resize.
		     *
		     * @method _createEvents
		     * @private
		     */
			_createEvents: function() {
				var instance = this;

				// create publish function for kweight optimization
				var publish = function(name, fn) {
					instance.publish(name, {
			            defaultFn: fn,
			            queuable: false,
			            emitFacade: true,
			            bubbles: true,
			            prefix: RESIZE
			        });
				};

				/**
				 * Handles the resize start event. Fired when a handle starts to be
		         * dragged.
				 *
		         * @event resize:start
		         * @preventable _defResizeStartFn
		         * @param {Event.Facade} event The resize start event.
		         * @bubbles Resize
		         * @type {Event.Custom}
		         */
				publish(
					EV_RESIZE_START,
					this._defResizeStartFn
				);

				/**
				 * Handles the resize event. Fired on each pixel when the handle is
		         * being dragged.
				 *
		         * @event resize:resize
		         * @preventable _defResizeFn
		         * @param {Event.Facade} event The resize event.
		         * @bubbles Resize
		         * @type {Event.Custom}
		         */
				publish(
					EV_RESIZE,
					this._defResizeFn
				);

				/**
				 * Handles the resize end event. Fired when a handle stop to be
		         * dragged.
				 *
		         * @event resize:end
		         * @preventable _defResizeEndFn
		         * @param {Event.Facade} event The resize end event.
		         * @bubbles Resize
		         * @type {Event.Custom}
		         */
				publish(
					EV_RESIZE_END,
					this._defResizeEndFn
				);

				/**
				 * Handles the resize mouseUp event. Fired when a mouseUp event happens on a
		         * handle.
				 *
		         * @event resize:mouseUp
		         * @preventable _defMouseUpFn
		         * @param {Event.Facade} event The resize mouseUp event.
		         * @bubbles Resize
		         * @type {Event.Custom}
		         */
				publish(
					EV_MOUSE_UP,
					this._defMouseUpFn
				);
			},

		    /**
		      * Responsible for loop each handle element and append to the wrapper.
		      *
		      * @method _renderHandles
		      * @protected
		      */
			_renderHandles: function() {
				var instance = this;
				var wrapper = instance.get(WRAPPER);

				instance.eachHandle(function(handleEl) {
					wrapper.append(handleEl);
				});
			},

		    /**
		      * Render the <a href="Resize.html#config_proxyEl">proxyEl</a> element and
		      * make it sibling of the <a href="Resize.html#config_node">node</a>.
		      *
		      * @method _renderProxy
		      * @protected
		      */
			_renderProxy: function() {
				var instance = this;
				var proxyEl = instance.get(PROXY_EL);

				instance.get(WRAPPER).get(PARENT_NODE).append(
					proxyEl.hide()
				);
			},

		    /**
		     * <p>Loop through each handle which is being used and executes a callback.</p>
		     * <p>Example:</p>
		     * <pre><code>instance.eachHandle(
			 *      function(handleName, index) { ... }
			 *  );</code></pre>
		     *
		     * @method eachHandle
		     * @param {function} fn Callback function to be executed for each handle.
		     */
			eachHandle: function(fn) {
				var instance = this;

				A.each(
					instance.get(HANDLES),
					function(handle, i) {
						var handleEl = instance.get(
							handleAttrName(handle)
						);

						fn.apply(instance, [handleEl, handle, i]);
					}
				);
			},

		    /**
		     * Creates the handle element based on the handle name and initialize the
		     * DragDrop on it.
		     *
		     * @method _buildHandle
		     * @param {String} handle Handle name ('t', 'tr', 'b', ...).
		     * @protected
		     */
			_buildHandle: function(handle) {
				var instance = this;

				// create handle node
				var node = A.Node.create(
					A.substitute(TPL_HANDLE, {
						handle: handle
					})
				);

				// add respective css icon classes on the inner element of this handle
				node.one(DOT+CSS_RESIZE_HANDLE_INNER).addClass(
					instance.CSS_INNER_HANDLE_MAP[handle]
				);

				instance._setupHandleDD(handle, node);

				return node;
			},

		    /**
		     * Update the current values on <a href="Resize.html#property_info">info</a>
		     * to respect the maxHeight and minHeight.
		     *
		     * @method _checkHeight
		     * @protected
		     */
			_checkHeight: function() {
				var instance = this;
				var info = instance.info;
				var originalInfo = instance.originalInfo;
				var handle = instance.get(ACTIVE_HANDLE);
				var maxHeight = instance.get(MAX_HEIGHT);
				var minHeight = instance.get(MIN_HEIGHT);

				// if the handles being dragged could change the top info
				var changeTopHandles = /^(tl|t|tr)$/i.test(handle);

				var isMaxHeight = (info.height > maxHeight);
				var isMinHeight = (info.height < minHeight);

				if (isMaxHeight) {
					info.height = maxHeight;

					if (changeTopHandles) {
						// predicting, based on the original information, the last top valid in case of reach the min/max dimension
						// this calculation avoid browser event leaks when user interact very fast with their mouse
						info.top = originalInfo.top + originalInfo.height - maxHeight;
					}
				}

				if (isMinHeight) {
					info.height = minHeight;

					if (changeTopHandles) {
						// predicting, based on the original information, the last top valid in case of reach the min/max dimension
						// this calculation avoid browser event leaks when user interact very fast with their mouse
						info.top = originalInfo.top + originalInfo.height - minHeight;
					}
				}

				if (instance.get(CONSTRAIN2NODE)) {
					var handleEl = instance.get(ACTIVE_HANDLE_EL);
					var constrain = handleEl.dd.con;
					var region = constrain.getRegion();

					var bottom = info.nodeY + info.height;
					var constrainBottom = region.bottom;

					if (bottom >= constrainBottom) {
						info.height -= bottom - constrainBottom;
					}
				}
			},

		    /**
		     * Update the current values on <a href="Resize.html#property_info">info</a>
		     * calculating the correct ratio for the other values.
		     *
		     * @method _checkRatio
		     * @protected
		     */
			_checkRatio: function() {
				var instance = this;

				var info = instance.info;
				var originalInfo = instance.originalInfo;
				var handle = instance.get(ACTIVE_HANDLE);
				var oWidth = originalInfo.width;
				var oHeight = originalInfo.height;
				var oTop = originalInfo.top;
				var oLeft = originalInfo.left;

				// wRatio/hRatio functions keep the ratio information always synced with the current info information
				// RETURN: percentage how much width/height has changed from the original width/height
				var wRatio = function() {
					return (info.width/oWidth);
				};

				var hRatio = function() {
					return (info.height/oHeight);
				};

				// regex to detect the handles
				var changeHeightHandles = /^(t|b)$/i;
				var changeWidthHandles = /^(bl|br|l|r|tl|tr)$/i;

				// handles which only change the height, need to vary the width first
				// and then check width to constrain to max/min dimensions
				if (changeHeightHandles.test(handle)) {
					info.width = oWidth*hRatio();
					instance._checkWidth();
					info.height = oHeight*wRatio();
				}
				// handles which are able to change the width need to vary the height first
				// and then check height to constrain to max/min dimensions
				else if (changeWidthHandles.test(handle)) {
					info.height = oHeight*wRatio();
					instance._checkHeight();
					info.width = oWidth*hRatio();
				}

				// regex to detect the handles
				var changeTopHandles = /^(tl|t|tr)$/i;
				var changeLeftHandles = /^(tl|l|bl)$/i;

				// fixing the top on handles which are able to change top
				// the idea here is change the top based on how much the height has changed instead of follow the dy
				if (changeTopHandles.test(handle)) {
					info.top = oTop + (oHeight - info.height);
				}

				// fixing the left on handles which are able to change left
				// the idea here is change the left based on how much the width has changed instead of follow the dx
				if (changeLeftHandles.test(handle)) {
					info.left = oLeft + (oWidth - info.width);
				}
			},

			_checkRegion: function() {
				var instance = this;
				var handle = instance.get(ACTIVE_HANDLE_EL);
				var constrain = handle.dd.con;
				var region = constrain.getRegion();
				var info = instance.info;

				var infoRegion = {
					left: info.nodeX,
					top: info.nodeY,
					right: info.nodeX + info.width,
					bottom: info.nodeY + info.height
				};

				return A.DOM.inRegion(null, region, true, infoRegion);
			},

		    /**
		     * Update the current values on <a href="Resize.html#property_info">info</a>
		     * to respect the maxWidth and minWidth.
		     *
		     * @method _checkWidth
		     * @protected
		     */
			_checkWidth: function() {
				var instance = this;
				var info = instance.info;
				var originalInfo = instance.originalInfo;
				var handle = instance.get(ACTIVE_HANDLE);
				var maxWidth = instance.get(MAX_WIDTH);
				var minWidth = instance.get(MIN_WIDTH);

				// if the handles being dragged could change the left info
				var changeLeftHandles = /^(tl|l|bl)$/i.test(handle);

				var isMaxWidth = (info.width > maxWidth);
				var isMinWidth = (info.width < minWidth);

				if (isMaxWidth) {
					info.width = maxWidth;

					if (changeLeftHandles) {
						// predicting, based on the original information, the last left valid in case of reach the min/max dimension
						// this calculation avoid browser event leaks when user interact very fast with their mouse
						info.left = originalInfo.left + originalInfo.width - maxWidth;
					}
				}

				if (isMinWidth) {
					info.width = minWidth;

					if (changeLeftHandles) {
						// predicting, based on the original information, the last left valid in case of reach the min/max dimension
						// this calculation avoid browser event leaks when user interact very fast with their mouse
						info.left = originalInfo.left + originalInfo.width - minWidth;
					}
				}

				if (instance.get(CONSTRAIN2NODE)) {
					var handleEl = instance.get(ACTIVE_HANDLE_EL);
					var constrain = handleEl.dd.con;
					var region = constrain.getRegion();

					var right = info.nodeX + info.width;
					var constrainRight = region.right;

					if (right >= constrainRight) {
						info.width -= right - constrainRight;
					}
				}
			},

		    /**
		     * Copy relevant styles of the <a href="Resize.html#config_node">node</a>
		     * to the <a href="Resize.html#config_wrapper">wrapper</a>.
		     *
		     * @method _copyStyles
		     * @param {Node} node Node from.
		     * @param {Node} wrapper Node to.
		     * @protected
		     */
			_copyStyles: function(node, wrapper) {
				var instance = this;
				var position = node.getStyle(POSITION).toLowerCase();

				// resizable wrapper should be positioned
				if (position == STATIC) {
					position = RELATIVE;
				}

				// copy margin, padding, position styles from the node to wrapper
				var wrapperStyle = {
					position: position
				};

				var nodeStyle = {};

				// store margin(Top,Right,Bottom,Left) from the nodes involved
				// apply margin from node to the wrapper
				A.each([ TOP, RIGHT, BOTTOM, LEFT ], function(dir) {
					var name = MARGIN + toInitialCap(dir);

					nodeStyle[name] = wrapper.getStyle(name);
					wrapperStyle[name] = node.getStyle(name);
				});

				wrapper.setStyles(wrapperStyle);
				node.setStyles(nodeStyle);

				// force remove margin from the internal node
				node.setStyles({ margin: 0 });

				wrapper.set(
					OFFSET_HEIGHT,
					node.get(OFFSET_HEIGHT)
				);

				wrapper.set(
					OFFSET_WIDTH,
					node.get(OFFSET_WIDTH)
				);
			},

			// extract handle name from a string
			// using A.cached to memoize the function for performance
			_extractHandleName: A.cached(
				function(node) {
					var className = node.get(CLASS_NAME);

					var match = className.match(
						new RegExp(
							getCN(RESIZE, HANDLE, '(\\w{1,2})\\b')
						)
					);

					return match ? match[1] : null;
				}
			),

		    /**
		     * <p>Generates metadata to the <a href="Resize.html#property_info">info</a>
		     * and <a href="Resize.html#property_originalInfo">originalInfo</a></p>
		     * <pre><code>left, top, offsetLeft, offsetTop, height, width, lastXY, nodeX, nodeY</code></pre>
		     *
		     * @method _getInfo
		     * @param {Node} node
		     * @param {EventFacade} event
		     * @private
		     */
			_getInfo: function(node, event) {
				var instance = this;
				var wrapper = instance.get(WRAPPER);

				if (event) {
					var lastXY = event.dragEvent.target.lastXY;
				}

				var nodeXY = node.getXY();
				var top = num( node.getStyle(TOP) );
				var left = num( node.getStyle(LEFT) );
				var offsetTop = node.get(OFFSET_TOP);
				var offsetLeft = node.get(OFFSET_LEFT);

				var position = wrapper.getStyle(POSITION);

				// if top|left isNaN, it means that top|left was auto
				// if position == RELATIVE auto means top/left 0
				if (position == RELATIVE) {
					if (isNaN(left)) {
						left = 0;
					}
					if (isNaN(top)) {
						top = 0;
					}
				}

				// if top|left isNaN, it means that top|left was auto
				// if position == ABSOLUTE|FIXED auto means top/left = offsetTop/offsetLeft
				if ((position == ABSOLUTE) || (position == FIXED)) {
					if (isNaN(left)) {
						left = offsetLeft;
					}
					if (isNaN(top)) {
						top = offsetTop;
					}
				}

				var height = node.get(OFFSET_HEIGHT);
				var width = node.get(OFFSET_WIDTH);

				return {
					left: left,
					top: top,
					right: left + width,
					bottom: top + height,
					offsetLeft: offsetLeft,
					offsetTop: offsetTop,
					height: height,
					width: width,
					lastXY: lastXY,
					nodeX: nodeXY[0],
					nodeY: nodeXY[1]
				};
			},

		    /**
		     * Update nodeX and nodeY information on
		     * <a href="Resize.html#property_info">info</a> based on the new top and left.
		     *
		     * @method _recalculateXY
		     * @private
		     */
			_recalculateXY: function() {
				var instance = this;
				var info = instance.info;
				var originalInfo = instance.originalInfo;

				info.nodeX = originalInfo.nodeX + (info.left - originalInfo.left);
				info.nodeY = originalInfo.nodeY + (info.top - originalInfo.top);
			},

		    /**
		     * Basic resize calculations.
		     *
		     * @method _resize
		     * @protected
		     */
			_resize: function() {
				var instance = this;
				var handle = instance.get(ACTIVE_HANDLE);

				var info = instance.info;
				var originalInfo = instance.originalInfo;

				var dx = info.lastXY[0] - originalInfo.lastXY[0];
				var dy = info.lastXY[1] - originalInfo.lastXY[1];

				var rules = {
					t: function() {
						info.top = originalInfo.top + dy;
						info.height = originalInfo.height - dy;
					},
					r: function() {
						info.width = originalInfo.width + dx;
					},
					l: function() {
						info.left = originalInfo.left + dx;
						info.width = originalInfo.width - dx;
					},
					b: function() {
						info.height = originalInfo.height + dy;
					},
					tr: function() {
						this.t();
						this.r();
					},
					br: function() {
						this.b();
						this.r();
					},
					tl: function() {
						this.t();
						this.l();
					},
					bl: function() {
						this.b();
						this.l();
					}
				};

				rules[handle](dx, dy);
			},

		    /**
		     * Initialize the DragDrop on the handle.
		     *
		     * @method _setupHandleDD
		     * @param {String} handle Handle name.
		     * @param {Node} node Node reference which the DragDrop will be created.
		     * @private
		     */
			_setupHandleDD: function(handle, node) {
				var instance = this;

				var dd = new A.DD.Drag(
					{
						bubbleTargets: instance,
						clickPixelThresh: 0,
						clickTimeThresh: 0,
						data: {
							handle: handle,
							node: node
						},
						node: node,
						useShim: true,
						move: false
					}
				);

				dd.plug(
					A.Plugin.DDConstrained,
					{
						constrain2node: instance.get(CONSTRAIN2NODE),
						stickX: (handle == R || handle == L),
						stickY: (handle == T || handle == B),
						tickX: instance.get(TICK_X),
						tickY: instance.get(TICK_Y)
					}
				);
			},

			/**
		     * Sync the Resize UI with internal values from
		     * <a href="Resize.html#property_info">info</a>.
		     *
		     * @method _syncUI
		     * @protected
		     */
			_syncUI: function() {
				var instance = this;
				var info = instance.info;
				var wrapper = instance.get(WRAPPER);
				var node = instance.get(NODE);

				var dimension = {
					top: info.top + PX,
					left: info.left + PX
				};

				wrapper.set(OFFSET_HEIGHT, info.height);
				wrapper.set(OFFSET_WIDTH, info.width);

				wrapper.setStyles(dimension);

				// if wrapper is different from node
				if (!wrapper.compareTo(node)) {
					node.set(OFFSET_HEIGHT, info.height);
					node.set(OFFSET_WIDTH, info.width);
				}

				// prevent webkit textarea resize
				if (A.UA.webkit) {
					node.setStyle(RESIZE, NONE);
				}
			},

			/**
		     * Sync the proxy UI with internal values from
		     * <a href="Resize.html#property_info">info</a>.
		     *
		     * @method _syncProxyUI
		     * @protected
		     */
			_syncProxyUI: function() {
				var instance = this;
				var info = instance.info;
				var activeHandleEl = instance.get(ACTIVE_HANDLE_EL);
				var proxyEl = instance.get(PROXY_EL);

				var cursor = activeHandleEl.getStyle(CURSOR);

				proxyEl.show().setStyles({
					cursor: cursor,
					height: info.height + PX,
					width: info.width + PX
				});

				activeHandleEl.dd.set(DRAG_CURSOR, cursor);

				proxyEl.setXY([ info.nodeX, info.nodeY ]);
			},

			/**
		     * Update <a href="Resize.html#property_info">info</a> values (top, left, offsetTop, offsetTop, height, width, nodeX, nodeY, lastXY).
		     *
		     * @method _updateInfo
		     * @private
		     */
			_updateInfo: function(event) {
				var instance = this;

				instance.info = instance._getInfo(
					instance.get(WRAPPER),
					event
				);
			},

		    /**
		     * Set the active state of the handles.
		     *
		     * @method _setActiveHandlesUI
		     * @param {boolean} val True to activate the handles, false to deactivate.
		     * @protected
		     */
			_setActiveHandlesUI: function(val) {
				var instance = this;
				var activeHandleEl = instance.get(ACTIVE_HANDLE_EL);

				if (activeHandleEl) {
					if (val) {
						// remove CSS_RESIZE_HANDLE_ACTIVE from all handles before addClass on the active
						instance.eachHandle(
							function(handleEl) {
								handleEl.removeClass(CSS_RESIZE_HANDLE_ACTIVE);
							}
						);

						activeHandleEl.addClass(CSS_RESIZE_HANDLE_ACTIVE);
					}
					else {
						activeHandleEl.removeClass(CSS_RESIZE_HANDLE_ACTIVE);
					}
				}
			},

		    /**
		     * Set the visibility of the handles.
		     *
		     * @method _setHideHandlesUI
		     * @param {boolean} val True to hide the handles, false to show.
		     * @protected
		     */
			_setHideHandlesUI: function(val) {
				var instance = this;
				var wrapper = instance.get(WRAPPER);

				if (!instance.get(RESIZING)) {
					if (val) {
						wrapper.addClass(CSS_RESIZE_HIDDEN_HANDLES);
					}
					else {
						wrapper.removeClass(CSS_RESIZE_HIDDEN_HANDLES);
					}
				}
			},

		    /**
		     * Default resize:mouseUp handler
		     *
		     * @method _defMouseUpFn
		     * @param {EventFacade} event The Event object
		     * @protected
		     */
			_defMouseUpFn: function(event) {
				var instance = this;

				instance.set(RESIZING, false);
			},

		    /**
		     * Default resize:resize handler
		     *
		     * @method _defResizeFn
		     * @param {EventFacade} event The Event object
		     * @protected
		     */
			_defResizeFn: function(event) {
				var instance = this;
				var infoBefore = instance.info;

				// update the instance.info values (top, left, offsetTop, offsetTop, height, width, nodeX, nodeY, lastXY)
				instance._updateInfo(event);

				// basic resize calculations
				instance._resize();

				// check the max/min height and locking top when these values are reach
				instance._checkHeight();

				// check the max/min width and locking left when these values are reach
				instance._checkWidth();

				// calculating the ratio, for proportionally resizing
				if (instance.get(PRESEVE_RATIO)) {
					instance._checkRatio();
				}

				// nodeX and nodeY information need to be updated based on the new top/left
				// nodeY/nodeY is used to position the proxyEl
				instance._recalculateXY();

				if (instance.get(CONSTRAIN2NODE)) {
					if (!instance._checkRegion()) {
						instance.info = infoBefore;
					}
				}
			},

		    /**
		     * Default resize:end handler
		     *
		     * @method _defResizeEndFn
		     * @param {EventFacade} event The Event object
		     * @protected
		     */
			_defResizeEndFn: function(event) {
				var instance = this;

				// if proxy is true, hide it on resize end
				if (instance.get(PROXY)) {
					instance._syncProxyUI();

					instance.get(PROXY_EL).hide();
				}

				// syncUI when resize end
				instance._syncUI();

				instance.set(ACTIVE_HANDLE, null);
				instance.set(ACTIVE_HANDLE_EL, null);

				instance._setActiveHandlesUI(false);
			},

		    /**
		     * Default resize:start handler
		     *
		     * @method _defResizeStartFn
		     * @param {EventFacade} event The Event object
		     * @protected
		     */
			_defResizeStartFn: function(event) {
				var instance = this;

				instance.set(RESIZING, true);

				// create an originalInfo information for reference
				instance.originalInfo = instance._getInfo(
					instance.get(WRAPPER),
					event
				);

				instance._updateInfo(event);
			},

		    /**
		     * Fires after resize:resize event.
		     *
		     * @method _afterResize
		     * @param {EventFacade} event resize:resize custom event
		     * @protected
		     */
			_afterResize: function(event) {
				var instance = this;

				// if proxy is true _syncProxyUI instead of _syncUI
				if (instance.get(PROXY)) {
					instance._syncProxyUI();
				}
				else {
					// _syncUI of the wrapper, not using proxy
					instance._syncUI();
				}
			},

		    /**
		     * Fires the resize:mouseUp event.
		     *
		     * @method _handleMouseUpEvent
		     * @param {EventFacade} event resize:mouseUp event facade
		     * @protected
		     */
			_handleMouseUpEvent: function(event) {
				this.fire(EV_MOUSE_UP, { dragEvent: event, info: this.info });
			},

		    /**
		     * Fires the resize:resize event.
		     *
		     * @method _handleResizeEvent
		     * @param {EventFacade} event resize:resize event facade
		     * @protected
		     */
			_handleResizeEvent: function(event) {
				this.fire(EV_RESIZE, { dragEvent: event, info: this.info });
			},

		    /**
		     * Fires the resize:end event.
		     *
		     * @method _handleResizeEndEvent
		     * @param {EventFacade} event resize:end event facade
		     * @protected
		     */
			_handleResizeEndEvent: function(event) {
				this.fire(EV_RESIZE_END, { dragEvent: event, info: this.info });
			},

		    /**
		     * Fires the resize:start event.
		     *
		     * @method _handleResizeStartEvent
		     * @param {EventFacade} event resize:start event facade
		     * @protected
		     */
			_handleResizeStartEvent: function(event) {
				this.fire(EV_RESIZE_START, { dragEvent: event, info: this.info });
			},

			/**
			 * Mouseenter event handler for the <a href="Resize.html#config_wrapper">wrapper</a>.
			 *
			 * @method _onWrapperMouseEnter
		     * @param {EventFacade} event
			 * @protected
			 */
			_onWrapperMouseEnter: function(event) {
				var instance = this;

				if (instance.get(AUTO_HIDE)) {
					instance._setHideHandlesUI(false);
				}
			},

			/**
			 * Mouseleave event handler for the <a href="Resize.html#config_wrapper">wrapper</a>.
			 *
			 * @method _onWrapperMouseLeave
		     * @param {EventFacade} event
			 * @protected
			 */
			_onWrapperMouseLeave: function(event) {
				var instance = this;

				if (instance.get(AUTO_HIDE)) {
					instance._setHideHandlesUI(true);
				}
			},

			/**
			 * Mouseover event handler for the handles.
			 *
			 * @method _onHandleMouseOver
		     * @param {EventFacade} event
			 * @protected
			 */
			_onHandleMouseOver: function(event) {
				var instance = this;
				var node = event.currentTarget;
				var handle = instance._extractHandleName(node);

				if (!instance.get(RESIZING)) {
					instance.set(ACTIVE_HANDLE, handle);
					instance.set(ACTIVE_HANDLE_EL, node);

					instance._setActiveHandlesUI(true);
				}
			},

			/**
			 * Mouseout event handler for the handles.
			 *
			 * @method _onHandleMouseOut
		     * @param {EventFacade} event
			 * @protected
			 */
			_onHandleMouseOut: function(event) {
				var instance = this;

				if (!instance.get(RESIZING)) {
					instance._setActiveHandlesUI(false);
				}
			}
		}
	}
);

A.each(ALL_HANDLES, function(handle, i) {
	// creating ATTRS with the handles elements
	Resize.ATTRS[handleAttrName(handle)] = {
		setter: function() {
			return this._buildHandle(handle);
		},
		value: null,
		writeOnce: true
	};
});

A.Resize = Resize;