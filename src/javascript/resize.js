AUI.add('resize', function(A) {

/*
* Resize
* TODO: Containment with proxy enabled and fix containment handles locking.
*		To fix the Containment #2528540 need to be fixed.
*/
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
	CLASS_NAME = 'className',
	CONSTRAIN2NODE = 'constrain2node',
	CONSTRAIN2REGION = 'constrain2region',
	CONSTRAIN2VIEW = 'constrain2view',
	DATA = 'data',
	DIAGONAL = 'diagonal',
	DOTTED = 'dotted',
	DRAGGING = 'dragging',
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
	STATIC = 'static',
	TICK_X = 'tickX',
	TICK_Y = 'tickY',
	TOP = 'top',
	VERTICAL = 'vertical',
	WIDTH = 'width',
	WRAP = 'wrap',
	WRAPPER = 'wrapper',
	WRAP_TYPES = 'wrapTypes',

	EV_MOUSE_UP = 'resize:mouseUp'
	EV_RESIZE = 'resize:resize'
	EV_RESIZE_END = 'resize:end'
	EV_RESIZE_START = 'resize:start'

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

function Resize(config) {
	Resize.superclass.constructor.apply(this, arguments);
}

A.mix(Resize, {
	NAME: RESIZE,

	ATTRS: {
		activeHandle: {
			value: null,
			validator: isString
		},

		activeHandleEl: {
			value: null,
			validator: isNode
		},

		autoHide: {
			value: false,
			validator: isBoolean
		},

		constrain2node: {
			value: null
		},

		constrain2region: {
			value: null
		},

		constrain2view: {
			value: false
		},

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

		minHeight: {
			value: 15,
			validator: isNumber
		},

		minWidth: {
			value: 15,
			validator: isNumber
		},

		maxHeight: {
			value: Infinity,
			validator: isNumber
		},

		maxWidth: {
			value: Infinity,
			validator: isNumber
		},

		node: {
			setter: nodeSetter
		},

		preserveRatio: {
			value: false,
			validator: isBoolean
		},

		proxy: {
			value: false,
			validator: isBoolean
		},

		proxyEl: {
			setter: nodeSetter,
			valueFn: function() {
				return A.Node.create(TPL_PROXY_EL);
			}
		},

		resizing: {
			value: false,
			validator: isBoolean
		},

		tickX: {
			value: false
		},

		tickY: {
			value: false
		},

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

		wrapTypes: {
			readOnly: true,
			value: /canvas|textarea|input|select|button|img/i
		},

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
	}
});

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

A.extend(Resize, A.Base, {
	CSS_INNER_HANDLE_MAP: {
		r: CSS_ICON_VERTICAL,
		l: CSS_ICON_VERTICAL,
		t: CSS_ICON_HORIZONTAL,
		b: CSS_ICON_HORIZONTAL,
		br: CSS_ICON_DIAGONAL
	},

	info: {},

	originalInfo: {},

	/*
	* Lifecycle
	*/
	initializer: function() {
		var instance = this;

		instance.renderer();
	},

	renderUI: function() {
		var instance = this;

		instance._renderHandles();
		instance._renderProxy();
	},

	bindUI: function() {
		var instance = this;

		instance._createEvents();
		instance._bindResize();
		instance._bindDD();
		instance._bindHandle();
	},

	syncUI: function() {
		var instance = this;

		// hide handles if AUTO_HIDE is true
		instance._setHideHandlesUI(
			instance.get(AUTO_HIDE)
		);
	},

    renderer: function() {
        this.renderUI();
        this.bindUI();
        this.syncUI();
    },

	_bindDD: function() {
		var instance = this;

		instance.on('drag:drag', instance._handleResizeEvent);
		instance.on('drag:dropmiss', instance._handleMouseUpEvent);
		instance.on('drag:end', instance._handleResizeEndEvent);
		instance.on('drag:start', instance._handleResizeStartEvent);
	},

	_bindResize: function() {
		var instance = this;

		instance.after(EV_RESIZE, instance._afterResize);
	},

	_bindHandle: function() {
		var instance = this;
		var wrapper = instance.get(WRAPPER);

		wrapper.on('mouseenter', A.bind(instance._onWrapperMouseEnter, instance));
		wrapper.on('mouseleave', A.bind(instance._onWrapperMouseLeave, instance));
		wrapper.delegate('mouseenter', A.bind(instance._onHandleMouseOver, instance), DOT+CSS_RESIZE_HANDLE);
		wrapper.delegate('mouseleave', A.bind(instance._onHandleMouseOut, instance), DOT+CSS_RESIZE_HANDLE);
	},

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

		// publishing events
		publish(
			EV_RESIZE_START,
			this._defResizeStartFn
		);

		publish(
			EV_RESIZE,
			this._defResizeFn
		);

		publish(
			EV_RESIZE_END,
			this._defResizeEndFn
		);

		publish(
			EV_MOUSE_UP,
			this._defMouseUpFn
		);
	},

	_renderHandles: function() {
		var instance = this;
		var wrapper = instance.get(WRAPPER);

		instance.eachHandle(function(handleEl) {
			wrapper.append(handleEl);
		});
	},

	_renderProxy: function() {
		var instance = this;
		var proxyEl = instance.get(PROXY_EL);

		instance.get(WRAPPER).get(PARENT_NODE).append(
			proxyEl.hide()
		);
	},

	/*
	* Methods
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
	},

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
			info.width = oWidth*hRatio()
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
	},

	_copyStyles: function(nodeFrom, nodeTo) {
		var instance = this;
		var position = nodeFrom.getStyle(POSITION).toLowerCase();

		// resizable wrapper should be positioned
		if (position == STATIC) {
			position = RELATIVE;
		}

		nodeTo.setStyle(
			POSITION, position
		);

		nodeTo.set(
			OFFSET_HEIGHT,
			nodeFrom.get(OFFSET_HEIGHT)
		);

		nodeTo.set(
			OFFSET_WIDTH,
			nodeFrom.get(OFFSET_WIDTH)
		);
	},

	// extract handle name from a string
	// using A.cached to memoize the function for performance
	_extractHandleName: A.cached(
		function(node) {
			var className = node.get(CLASS_NAME);

			var match = className.match(
				new RegExp(
					getCN(RESIZE, HANDLE, '(\\w{1,2})')
				)
			);

			return match ? match[1] : null;
		}
	),

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

		return {
			left: left,
			top: top,
			offsetLeft: offsetLeft,
			offsetTop: offsetTop,
			height: node.get(OFFSET_HEIGHT),
			width: node.get(OFFSET_WIDTH),
			lastXY: lastXY,
			nodeX: nodeXY[0],
			nodeY: nodeXY[1]
		};
	},

	_recalculateXY: function() {
		var instance = this;
		var info = instance.info;
		var originalInfo = instance.originalInfo;

		info.nodeX = originalInfo.nodeX + (info.left - originalInfo.left);
		info.nodeY = originalInfo.nodeY + (info.top - originalInfo.top);
	},

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

	_setupHandleDD: function(handle, node) {
		var instance = this;

		var dd = new A.DD.Drag(
			{
				bubbles: instance,
				clickPixelThresh: 0,
				clickTimeThresh: 0,
				data: {
					handle: handle,
					node: node
				},
				node: node,
				useShim: A.UA.ie,
				move: false
			}
		);

		dd.plug(
			A.Plugin.DDConstrained,
			{
				constrain2node: instance.get(CONSTRAIN2NODE),
				constrain2region: instance.get(CONSTRAIN2REGION),
				constrain2view: instance.get(CONSTRAIN2VIEW),
				stickX: (handle == R || handle == L),
				stickY: (handle == T || handle == B),
				tickX: instance.get(TICK_X),
				tickY: instance.get(TICK_Y)
			}
		);
	},

	_syncUI: function() {
		var instance = this;
		var info = instance.info;
		var wrapper = instance.get(WRAPPER);
		var node = instance.get(NODE);

		var size = {
			height: info.height + PX,
			width: info.width + PX
		};

		var dimension = {
			top: info.top + PX,
			left: info.left + PX
		};

		wrapper.setStyles(size);
		wrapper.setStyles(dimension);

		// if wrapper is different from node
		if (!wrapper.compareTo(node)) {
			node.setStyles(size);
		}

		// prevent webkit textarea resize
		if (A.UA.webkit) {
			node.setStyle(RESIZE, NONE);
		}
	},

	_syncProxyUI: function() {
		var instance = this;
		var info = instance.info;
		var proxyEl = instance.get(PROXY_EL);

		proxyEl.show().setStyles({
			height: info.height + PX,
			width: info.width + PX
		});

		proxyEl.setXY([ info.nodeX, info.nodeY ]);
	},

	_updateInfo: function(event) {
		var instance = this;

		instance.info = instance._getInfo(
			instance.get(WRAPPER),
			event
		);
	},

	/*
	* Setters
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

	/*
	* Events
	*/
	_defMouseUpFn: function(event) {
		var instance = this;

		instance.set(RESIZING, false);
	},

	_defResizeFn: function(event) {
		var instance = this;

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
	},

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

	/*
	* Listeners
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

	_handleMouseUpEvent: function(event) {
		this.fire(EV_MOUSE_UP, { dragEvent: event, info: this.info });
	},

	_handleResizeEvent: function(event) {
		this.fire(EV_RESIZE, { dragEvent: event, info: this.info });
	},

	_handleResizeEndEvent: function(event) {
		this.fire(EV_RESIZE_END, { dragEvent: event, info: this.info });
	},

	_handleResizeStartEvent: function(event) {
		this.fire(EV_RESIZE_START, { dragEvent: event, info: this.info });
	},

	_onWrapperMouseEnter: function(event) {
		var instance = this;

		if (instance.get(AUTO_HIDE)) {
			instance._setHideHandlesUI(false);
		}
	},

	_onWrapperMouseLeave: function(event) {
		var instance = this;

		if (instance.get(AUTO_HIDE)) {
			instance._setHideHandlesUI(true);
		}
	},

	_onHandleMouseOver: function(event) {
		var instance = this;
		var node = event.currentTarget;
		var handle = instance._extractHandleName(node)

		if (!instance.get(RESIZING)) {
			instance.set(ACTIVE_HANDLE, handle);
			instance.set(ACTIVE_HANDLE_EL, node);

			instance._setActiveHandlesUI(true);
		}
	},

	_onHandleMouseOut: function(event) {
		var instance = this;

		if (!instance.get(RESIZING)) {
			instance._setActiveHandlesUI(false);
		}
	}
});

A.Resize = Resize;

}, '@VERSION', { requires: [ 'aui-base', 'substitute' ] });