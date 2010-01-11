AUI.add('resize', function(A) {

/*
* Resize
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
	POSITION = 'position',
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

	EV_RESIZE = 'resize:resize'
	EV_RESIZE_END = 'resize:end'
	EV_MOUSE_DOWN = 'resize:mouseDown'
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
	CSS_RESIZE_WRAPPER = getCN(RESIZE, WRAPPER),

	CSS_ICON_DIAGONAL = concat(CSS_ICON, CSS_ICON_GRIPSMALL_DIAGONAL_BR),
	CSS_ICON_HORIZONTAL = concat(CSS_ICON, CSS_ICON_GRIP_DOTTED_HORIZONTAL),
	CSS_ICON_VERTICAL = concat(CSS_ICON, CSS_ICON_GRIP_DOTTED_VERTICAL),

	TPL_HANDLE = '<div class="'+concat(CSS_RESIZE_HANDLE, CSS_RESIZE_HANDLE_PLACEHOLDER)+'">' +
					'<div class="'+concat(CSS_RESIZE_HANDLE_INNER, CSS_RESIZE_HANDLE_INNER_PLACEHOLDER)+'"></div>' +
				 '</div>',

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
			setter: function(val) {
				return A.one(val);
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
		instance._setHandlesUI(
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
		instance.on('drag:end', instance._handleResizeEndEvent);
		instance.on('drag:mouseDown', instance._handleMouseDownEvent);
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

		instance.publish(EV_RESIZE_START, {
            defaultFn: this._defResizeStartFn,
            queuable: false,
            emitFacade: true,
            bubbles: true,
            prefix: RESIZE
        });

		instance.publish(EV_RESIZE, {
            defaultFn: this._defResizeFn,
            queuable: false,
            emitFacade: true,
            bubbles: true,
            prefix: RESIZE
        });

		instance.publish(EV_RESIZE_END, {
            defaultFn: this._defResizeEndFn,
            queuable: false,
            emitFacade: true,
            bubbles: true,
            prefix: RESIZE
        });

		instance.publish(EV_MOUSE_DOWN, {
            defaultFn: this._defMouseDownFn,
            queuable: false,
            emitFacade: true,
            bubbles: true,
            prefix: RESIZE
        });
	},

	_renderHandles: function() {
		var instance = this;
		var wrapper = instance.get(WRAPPER);

		instance.eachHandle(function(handle) {
			var handleEl = handleAttrName(handle);

			wrapper.append(
				instance.get(handleEl)
			);
		});
	},

	/*
	* Methods
	*/
	eachHandle: function(fn) {
		var instance = this;

		A.each(
			instance.get(HANDLES),
			function(node, i) {
				fn.apply(instance, arguments);
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

	_calculateInfo: function() {
		var instance = this;
		var activeHandle = instance.get(ACTIVE_HANDLE);

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

		rules[activeHandle](dx, dy);
	},

	_calculateMinMaxSize: function() {
		var instance = this;
		var info = instance.info;

		var maxHeight = instance.get(MAX_HEIGHT);
		var maxWidth = instance.get(MAX_WIDTH);
		var minHeight = instance.get(MIN_HEIGHT);
		var minWidth = instance.get(MIN_WIDTH);

		if (info.height > maxHeight) {
			info.height = maxHeight;
		}

		if (info.width > maxWidth) {
			info.width = maxWidth;
		}

		if (info.height < minHeight) {
			info.height = minHeight;
		}

		if (info.width < minWidth) {
			info.width = minWidth;
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

	_updateInfo: function(event) {
		var instance = this;

		instance.info = instance._getInfo(
			instance.get(WRAPPER),
			event
		);
	},

	_updateOriginalInfo: function(event) {
		var instance = this;

		instance.originalInfo = instance._getInfo(
			instance.get(WRAPPER),
			event
		);
	},

	_getInfo: function(node, event) {
		var instance = this;
		var wrapper = instance.get(WRAPPER);
		var drag = event.dragEvent.target;

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
			height: num( node.getStyle(HEIGHT) ),
			width: num( node.getStyle(WIDTH) ),
			offsetHeight: node.get(OFFSET_HEIGHT),
			offsetWidth: node.get(OFFSET_WIDTH),
			lastXY: drag.lastXY
		};
	},

	_setupHandleDD: function(handle, node) {
		var instance = this;

		var dd = new A.DD.Drag(
			{
				bubbles: instance,
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

		if (wrapper != node) {
			node.setStyles(size);
		}

		// prevent webkit textarea resize
		if (A.UA.webkit) {
			node.setStyle(RESIZE, NONE);
		}
	},

	/*
	* Setters
	*/
	_setHandlesUI: function(val) {
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
	_defResizeFn: function(event) {
		var instance = this;

		instance._updateInfo(event);

		instance._calculateInfo();

		instance._calculateMinMaxSize();
	},

	_defResizeEndFn: function(event) {
		var instance = this;

		instance.set(RESIZING, false);
		instance.set(ACTIVE_HANDLE, null);
		instance.set(ACTIVE_HANDLE_EL, null);
	},

	_defMouseDownFn: function(event) {
		var instance = this;

		instance.set(RESIZING, true);
	},

	_defResizeStartFn: function(event) {
		var instance = this;

		instance._updateOriginalInfo(event);
		instance._updateInfo(event);
	},

	/*
	* Listeners
	*/
	_afterResize: function(event) {
		var instance = this;

		instance._syncUI();
	},

	_handleResizeEvent: function(event) {
		this.fire(EV_RESIZE, { dragEvent: event, info: this.info });
	},

	_handleResizeEndEvent: function(event) {
		this.fire(EV_RESIZE_END, { dragEvent: event, info: this.info });
	},

	_handleMouseDownEvent: function(event) {
		this.fire(EV_MOUSE_DOWN, { dragEvent: event, info: this.info });
	},

	_handleResizeStartEvent: function(event) {
		this.fire(EV_RESIZE_START, { dragEvent: event, info: this.info });
	},

	_onWrapperMouseEnter: function(event) {
		var instance = this;

		if (instance.get(AUTO_HIDE)) {
			instance._setHandlesUI(false);
		}
	},

	_onWrapperMouseLeave: function(event) {
		var instance = this;

		if (instance.get(AUTO_HIDE)) {
			instance._setHandlesUI(true);
		}
	},

	_onHandleMouseOver: function(event) {
		var instance = this;
		var data = event.currentTarget.dd.get(DATA);

		if (!instance.get(RESIZING)) {
			instance.set(ACTIVE_HANDLE, data.handle);
			instance.set(ACTIVE_HANDLE_EL, data.node);

			data.node.addClass(CSS_RESIZE_HANDLE_ACTIVE);
		}
	},

	_onHandleMouseOut: function(event) {
		var instance = this;

		if (!instance.get(RESIZING)) {
			event.currentTarget.removeClass(CSS_RESIZE_HANDLE_ACTIVE);
		}
	}
});

A.Resize = Resize;

}, '@VERSION', { requires: [ 'aui-base', 'substitute' ] });