AUI().add(
	'resize',
	function(A) {
		var Lang = A.Lang,
			isBoolean = Lang.isBoolean,
			isNumber = Lang.isNumber,
			isString = Lang.isString,
			isArray = Lang.isArray,

			UA = A.UA,
			IS_IE = UA.ie,

			getClassName = A.ClassNameManager.getClassName,

			NAME = 'resize',

			STR_BLANK = ' ',
			STR_HANDLE = 'handle',
			STR_ACTIVE = 'active',
			STR_INNER = 'inner',
			STR_T = 't',
			STR_R = 'r',
			STR_B = 'b',
			STR_L = 'l',
			STR_TR = 'tr',
			STR_TL = 'tl',
			STR_BR = 'br',
			STR_BL = 'bl',

			CSS_RESIZE = getClassName(NAME),
			CSS_TEXTAREA = getClassName(NAME, 'textarea'),
			CSS_DRAG = getClassName('dd'),
			CSS_HOVER = getClassName(NAME, 'hover'),
			CSS_PROXY = getClassName(NAME, 'proxy'),
			CSS_WRAP = getClassName(NAME, 'wrap'),
			CSS_KNOB = getClassName(NAME, 'knob'),
			CSS_HIDDEN = getClassName(NAME, 'hidden'),
			CSS_STATUS = getClassName(NAME, 'status'),
			CSS_GHOST = getClassName(NAME, 'ghost'),
			CSS_RESIZING = getClassName(NAME, 'resizing'),

			CSS_ICON = getClassName('icon'),
			CSS_GRIP_HORIZONTAL = getClassName('icon-grip-solid-horizontal'),
			CSS_GRIP_VERTICAL = getClassName('icon-grip-solid-vertical'),
			CSS_GRIP_DIAGONAL_TR = getClassName('icon-grip-diagonal-tr'),
			CSS_GRIP_DIAGONAL_TL = getClassName('icon-grip-diagonal-tl'),
			CSS_GRIP_DIAGONAL_BR = getClassName('icon-grip-diagonal-br'),
			CSS_GRIP_DIAGONAL_BL = getClassName('icon-grip-diagonal-bl'),

			CSS_HANDLE = getClassName(NAME, STR_HANDLE),
			CSS_HANDLE_ACTIVE = getClassName(NAME, STR_HANDLE, STR_ACTIVE),

			CSS_HANDLES_MAP = {
				t: getClassName(NAME, STR_HANDLE, STR_T),
				r: getClassName(NAME, STR_HANDLE, STR_R),
				b: getClassName(NAME, STR_HANDLE, STR_B),
				l: getClassName(NAME, STR_HANDLE, STR_L),
				tr: getClassName(NAME, STR_HANDLE, STR_TR),
				tl: getClassName(NAME, STR_HANDLE, STR_TL),
				br: getClassName(NAME, STR_HANDLE, STR_BR),
				bl: getClassName(NAME, STR_HANDLE, STR_BL)
			},

			CSS_HANDLES_INNER_MAP = {
				t: [getClassName(NAME, STR_INNER, STR_T), CSS_ICON, CSS_GRIP_HORIZONTAL].join(STR_BLANK),
				r: [getClassName(NAME, STR_INNER, STR_R), CSS_ICON, CSS_GRIP_VERTICAL].join(STR_BLANK),
				b: [getClassName(NAME, STR_INNER, STR_B), CSS_ICON, CSS_GRIP_HORIZONTAL].join(STR_BLANK),
				l: [getClassName(NAME, STR_INNER, STR_L), CSS_ICON, CSS_GRIP_VERTICAL].join(STR_BLANK),
				tr: [getClassName(NAME, STR_INNER, STR_TR), CSS_ICON, CSS_GRIP_DIAGONAL_TR].join(STR_BLANK),
				tl: [getClassName(NAME, STR_INNER, STR_TL), CSS_ICON, CSS_GRIP_DIAGONAL_TL].join(STR_BLANK),
				br: [getClassName(NAME, STR_INNER, STR_BR), CSS_ICON, CSS_GRIP_DIAGONAL_BR].join(STR_BLANK),
				bl: [getClassName(NAME, STR_INNER, STR_BL), CSS_ICON, CSS_GRIP_DIAGONAL_BL].join(STR_BLANK)
			},

			CSS_HANDLES_ACTIVE_MAP = {
				t: getClassName(NAME, STR_HANDLE, STR_T, STR_ACTIVE),
				r: getClassName(NAME, STR_HANDLE, STR_R, STR_ACTIVE),
				b: getClassName(NAME, STR_HANDLE, STR_B, STR_ACTIVE),
				l: getClassName(NAME, STR_HANDLE, STR_L, STR_ACTIVE),
				tr: getClassName(NAME, STR_HANDLE, STR_TR, STR_ACTIVE),
				tl: getClassName(NAME, STR_HANDLE, STR_TL, STR_ACTIVE),
				br: getClassName(NAME, STR_HANDLE, STR_BR, STR_ACTIVE),
				bl: getClassName(NAME, STR_HANDLE, STR_BL, STR_ACTIVE)
			};

		var Resize = function() {
			Resize.superclass.constructor.apply(this, arguments);
		};

		Resize.NAME = NAME;

		Resize.ATTRS = {
			active: {
				value: false
			},

			dd: {
				value: null
			},

			node: {
				setter: function(value) {
					var instance = this;

					var node = A.get(value);

					if (!node) {
						A.error('Resize: Invalid Node Given: ' + value);
					}
					else {
						node = node.item(0);
					}

					return node;
				}
			},

			lock: {
				value: false,
				setter: function(value) {
					var instance = this;

					var dd = instance.get('dd');

					if (dd) {
						dd.set('lock', value);
					}

					return value;
				},
				validator: isBoolean
			},

			positioned: {
				value: false
			},

			wrap: {
				value: null
			},
			useShim: {
				value: false
			},

			size: {
				value: true
			},

			setSize: {
				value: true,
				validator: isBoolean
			},

			handles: {
				value: ['r', 'b', 'br'],
				validator: function(value) {
					var instance = this;

					if (isString(value) && value.toLowerCase() == 'all') {
						value = ['t', 'b', 'r', 'l', 'bl', 'br', 'tl', 'tr'];
					}

					if (!isArray(value)) {
						value = value.replace(/, /g, ',');
						value = value.split(',');
					}

					return value;
				}
			},

			width: {
				value: 0,
				setter: function(value) {
					var instance = this;

					if (isNumber(value)) {
						if (value > 0) {
							var node = instance.get('node');

							if (instance.get('setSize')) {
								node.setStyle('width', value + 'px');
							}

							node.set('width', value);

							instance._cache.width = value;
						}
					}
					else {
						value = A.Attribute.INVALID_VALUE;
					}

					return value;
				}
			},

			height: {
				value: 0,
				setter: function(value) {
					var instance = this;

					if (isNumber(value)) {
						if (value > 0) {
							var node = instance.get('node');

							if (instance.get('setSize')) {
								node.setStyle('height', value + 'px');
							}

							node.set('height', value);
							instance._cache.height = value;
						}
					}
					else {
						value = A.Attribute.INVALID_VALUE;
					}

					return value;
				}
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
				value: 10000,
				validator: isNumber
			},

			maxWidth: {
				value: 10000,
				validator: isNumber
			},

			minY: {
				value: false
			},

			minX: {
				value: false
			},

			maxX: {
				value: false
			},

			maxY: {
				value: false
			},

			proxy: {
				value: false,
				validator: isBoolean
			},

			ratio: {
				value: false,
				validator: isBoolean
			},

			ghost: {
				value: false,
				validator: isBoolean
			},

			draggable: {
				value: false,
				validator: isBoolean,
				valueFn: function(dd) {
					var instance = this;

					if (dd && instance.get('wrap')) {
						instance._setupDragDrop();
					}
					else if (instance.get('dd')) {
						instance.get('wrap').removeClass(CSS_DRAG);

						instance.get('dd').unreg();
					}
				}
			},

			hover: {
				value: false,
				validator: isBoolean
			},

			hiddenHandles: {
				value: false,
				validator: isBoolean
			},

			knobHandles: {
				value: false,
				validator: isBoolean
			},

			xTicks: {
				value: false
			},

			yTicks: {
				value: false
			},

			status: {
				value: true,
				validator: isBoolean
			},

			autoRatio: {
				value: false,
				validator: isBoolean
			}
		};

		Resize._instances = {};

		Resize.getResizeById = function(id) {
			return Resize._instances[id] || false;
		};

		A.extend(
			Resize,
			A.Base,
			{
				initializer: function() {
					var instance = this;

					instance._createCache();
					instance._createWrap();
					instance._createProxy();
					instance._createHandles();
				},

				destructor: function() {
					var instance = this;

					var handles = instance._handles;

					for (var i in handles) {
						var handle = handles[i];

						A.Event.purgeElement(handle);
						handle.remove();
					}

					if (instance._proxy) {
						instance._proxy.remove();
					}

					if (instance._status) {
						instance._status.remove();
					}

					if (instance.dd) {
						instance.dd.destroy();

						instance._wrap.removeClass(CSS_DRAG);
					}

					var node = instance.get('node');

					if (!instance._wrap.compareTo(node)) {
						node.setStyles(
							{
								position: '',
								top: '',
								left: ''
							}
						);

						instance._wrap.get('parentNode').replaceChild(node, instance._wrap);
					}

					node.removeClass(CSS_RESIZE);

					delete Resize._instances[instance.get('id')];

					for (var i in instance) {
						instance[i] = null;

						delete instance[i];
					}
				},

				toString: function() {
					var instance = this;

					if (instance.get) {
						return 'Resize (#' + instance.get('id') + ')';
					}

					return 'Resize utility';
				},

				_createCache: function() {
					var instance = this;

					this._cache = {
						xy: [],
						height: 0,
						width: 0,
						top: 0,
						left: 0,
						offsetHeight: 0,
						offsetWidth: 0,
						start: {
							height: 0,
							width: 0,
							top: 0,
							left: 0
						}
					};
				},

				_createProxy: function() {
					var instance = this;

					if (instance.get('proxy')) {
						var proxy = A.Node.create('<div></div>');

						proxy.set('className', CSS_PROXY);

						var node = instance.get('node');
						var elHeight = node.get('clientHeight');
						var elWidth = node.get('clientWidth');

						proxy.setStyle('height', elHeight + 'px');
						proxy.setStyle('width', elWidth + 'px');

						instance._wrap.get('parentNode').appendChild(proxy);

						instance._proxy = proxy;
					}
				},

				_createWrap: function() {
					var instance = this;

					var node = instance.get('node');
					var tagName = node.get('tagName').toLowerCase();
					var wrap = node;

					if (instance.get('wrap') == false) {
						if (/img|textarea|input|iframe|select/.test(tagName)) {
							instance.set('wrap', true);
						}
					}

					if (instance.get('wrap') == true) {
						wrap = A.Node.create('<div></div>');

						wrap.set('id', node.get('id') + '_wrap');
						wrap.set('className', CSS_WRAP);

						if (tagName == 'textarea') {
							wrap.addClass(CSS_TEXTAREA);
						}

						wrap.setStyle('width', instance.get('width') + 'px');
						wrap.setStyle('height', instance.get('height') + 'px');
						wrap.setStyle('zIndex', node.getStyle('zIndex'));

						node.setStyle('zIndex', 0);

						var position = node.getStyle('position');
						var top = node.getStyle('top');
						var left = node.getStyle('left');

						wrap.setStyle('position', (position == 'static' ? 'relative' : position));
						wrap.setStyle('top', top);
						wrap.setStyle('left', left);

						if (position == 'absolute') {
							node.setStyle('position', 'relative');
							node.setStyle('top', 0);
							node.setStyle('left', 0);
						}

						var parentNode = node.get('parentNode');

						parentNode.replaceChild(wrap, node);

						wrap.appendChild(node);
					}
					else if (wrap.getStyle('position') == 'absolute') {
						instance.set('positioned', true);
					}

					if (instance.get('draggable')) {
						instance._setupDragDrop();
					}

					if (instance.get('hover')) {
						wrap.addClass(CSS_HOVER);
					}

					if (instance.get('knobHandles')) {
						wrap.addClass(CSS_KNOB);
					}

					if (instance.get('hiddenHandles')) {
						wrap.addClass(CSS_HIDDEN);
					}

					wrap.addClass(CSS_RESIZE);

					instance._wrap = wrap;
				},

				_setupDragDrop: function() {
					var instance = this;

					instance._wrap.addClass(CSS_DRAG);

					var dd = new A.DD.Drag(
						{
							node: instance._wrap
						}
					);

					dd.addTarget(instance);

					instance.set('dd', dd);
				},

				_createHandles: function() {
					var instance = this;

					var handlesCache = {};
					var ddsCache = {};

					var handles = instance.get('handles');
					var length = handles.length;

					var useShim = instance.get('useShim');

					for (var i = 0; i < length; i++) {
						var handle = handles[i];

						var handleNode = A.Node.create('<div></div>');

						var handleClassName = CSS_HANDLE + ' ' + CSS_HANDLES_MAP[handle];

						handleNode.set('id', A.guid());
						handleNode.addClass(handleClassName);

						var knobNode = A.Node.create('<div></div>');

						knobNode.addClass(CSS_HANDLES_INNER_MAP[handle]);

						handleNode.appendChild(knobNode);

						handleNode.on('mouseover', instance._handleMouseOver, instance);
						handleNode.on('mouseout', instance._handleMouseOut, instance);

						var dd = new A.DD.Drag(
							{
								node: handleNode,
								useShim: useShim,
								move: false
							}
						);

						dd.plug(
							A.Plugin.DDConstrained,
							{
								stickX: (handle == 'r' || handle == 'l'),
								stickY: (handle == 't' || handle == 'b')
							}
						);

						dd.on('drag:start', A.rbind(instance._handleStartDrag, instance, dd));
						dd.on('drag:mouseDown', A.rbind(instance._handleMouseDown, instance, dd));
						dd.on('drag:drag', A.rbind(instance['_handle_for_' + handle], instance, dd), instance);
						dd.on('drag:end', instance._handleMouseUp, instance);

						handlesCache[handle] = handleNode;
						ddsCache[handle] = dd;

						instance._wrap.appendChild(handleNode);
					}

					instance._status = A.Node.create('<span class="' + CSS_STATUS + '"></span>');

					A.get('body').appendChild(instance._status);

					instance._handles = handlesCache;
					instance._dds = ddsCache;
				},

				_ieSelectFix: function() {
					return false;
				},

				_setAutoRatio: function(dd) {
					var instance = this;

					if (instance.get('autoRatio')) {
						var event = dd && dd._ev_md;

						instance.set('ratio', (event && event.shiftKey));
					}
				},

				_handleMouseDown: function(event, dd) {
					var instance = this;

					if (instance.get('lock')) {
						return false;
					}

					if (instance._wrap.getStyle('position') == 'absolute') {
						instance.set('positioned', true);
					}

					instance._setAutoRatio(dd);

					if (IS_IE) {
						instance._ieSelectBack = document.body.onselectstart;
						document.body.onselectstart = instance._ieSelectFix;
					}
				},

				_handleMouseOver: function(event) {
					var instance = this;

					if (instance.get('lock')) {
						return false;
					}

					instance._wrap.removeClass(CSS_RESIZE);

					if (instance.get('hover')) {
						instance._wrap.removeClass(CSS_HOVER);
					}

					var target = event.target;

					if (!target.hasClass(CSS_HANDLE)) {
						target = target.get('parentNode');
					}

					if (target.hasClass(CSS_HANDLE) && !instance.get(STR_ACTIVE)) {
						target.addClass(CSS_HANDLE_ACTIVE);

						for (var i in instance._handles) {
							if (instance._handles[i].compareTo(target)) {
								target.addClass(CSS_HANDLES_ACTIVE_MAP[i]);

								break;
							}
						}
					}

					instance._wrap.addClass(CSS_RESIZE);
				},

				_handleMouseOut: function(event) {
					var instance = this;

					instance._wrap.removeClass(CSS_RESIZE);

					if (instance.get('hover') && !instance.get(STR_ACTIVE)) {
						instance._wrap.addClass(CSS_HOVER);
					}

					var target = event.target;

					if (!target.hasClass(CSS_HANDLE)) {
						target = target.get('parentNode');
					}

					if (target.hasClass(CSS_HANDLE) && !instance.get(STR_ACTIVE)) {
						target.removeClass(CSS_HANDLE_ACTIVE);

						for (var i in instance._handles) {
							if (instance._handles[i].compareTo(target)) {
								target.removeClass(CSS_HANDLES_ACTIVE_MAP[i]);

								break;
							}
						}
					}

					instance._wrap.addClass(CSS_RESIZE);
				},

				_handleStartDrag: function(event, dd) {
					var instance = this;

					var target = dd.get('dragNode');

					if (target.hasClass(CSS_HANDLE)) {
						if (instance._wrap.getStyle('position') == 'absolute') {
							instance.set('positioned', true);
						}

						var node = instance.get('node');

						instance.set(STR_ACTIVE, true);
						instance._currentDD = dd;

						if (instance._proxy) {
							instance._proxy.setStyles(
								{
									visibility: 'visible',
									zIndex: 1000,
									width: node.get('offsetWidth') + 'px',
									height: node.get('offsetHeight') + 'px'
								}
							);
						}

						for (var i in instance._handles) {
							if (instance._handles[i].compareTo(target)) {
								instance._currentHandle = i;

								var handle = '_handle_for_' + i;

								target.addClass(CSS_HANDLES_ACTIVE_MAP[i]);

								break;
							}
						}

						target.addClass(CSS_HANDLE_ACTIVE);

						if (instance.get('proxy')) {
							var xy = node.getXY();

							instance._proxy.setXY(xy);

							if (instance.get('ghost')) {
								node.addClass(CSS_GHOST);
							}
						}

						instance._wrap.addClass(CSS_RESIZING);

						instance._setCache();

						var cache = instance._cache;

						instance._updateStatus(cache.height, cache.width, cache.top, cache.left);

						instance.fire('startResize');
					}
				},

				_setCache: function() {
					var instance = this;

					var cache = instance._cache;
					var wrap = instance._wrap;
					var node = instance.get('node');

					cache.xy = wrap.getXY();

					wrap.setXY(cache.xy);

					cache.height = node.get('offsetHeight');
					cache.width = node.get('offsetWidth');

					cache.start.height = cache.height;
					cache.start.width = cache.width;
					cache.start.top = cache.xy[1];
					cache.start.left = cache.xy[0];

					instance.set('height', cache.height);
					instance.set('width', cache.width);
				},

				_handleMouseUp: function(event) {
					var instance = this;

					event.stopImmediatePropagation();

					instance.set(STR_ACTIVE, false);

					var handle = '_handle_for_' + instance._currentHandle;
					var cache = instance._cache;

					if (instance._proxy) {
						var proxy = instance._proxy;

						proxy.setStyles(
							{
								visibility: 'hidden',
								zIndex: '-1'
							}
						);

						if (instance.get('setSize')) {
							instance.resize(event, cache.height, cache.width, cache.top, cache.left, true);
						}
						else {
							instance.fire(
								'resize',
								{
									height: cache.height,
									width: cache.width,
									top: cache.top,
									left: cache.left
								}
							);
						}

						if (instance.get('ghost')) {
							instance.get('node').removeClass(CSS_GHOST);
						}
					}

					if (instance.get('hover')) {
						instance._wrap.addClass(CSS_HOVER);
					}

					if (instance._status) {
						instance._status.addClass('aui-helper-hidden');
					}

					if (IS_IE) {
						document.body.onselectstart = instance._ieSelectBack;

						instance._wrap.removeClass(CSS_RESIZE);
					}

					for (var i in instance._handles) {
						instance._handles[i].removeClass(CSS_HANDLES_ACTIVE_MAP[i]);
					}

					if (instance.get('hover') && !instance.get(STR_ACTIVE)) {
						instance._wrap.addClass(CSS_HOVER);
					}

					instance._wrap.removeClass(CSS_RESIZING);

					var currentHandle = instance._handles[instance._currentHandle];

					currentHandle.removeClass(CSS_HANDLE_ACTIVE);

					if (IS_IE) {
						instance._wrap.addClass(CSS_RESIZE);
					}

					instance._resizeEvent = null;
					instance._currentHandle = null;

					instance.fire(
						'endResize',
						{
							height: cache.height,
							width: cache.width,
							top: cache.top,
							left: cache.left
						}
					);
				},

				_setRatio: function(height, width, top, left) {
					var instance = this;

					var originalHeight = height;
					var originalWidth = width;

					if (instance.get('ratio')) {
						var newHeight = instance.get('height');
						var newWidth = instance.get('width');

						var maxHeight = instance.get('maxHeight');
						var maxWidth = instance.get('maxWidth');
						var minHeight = instance.get('minHeight');
						var minWidth = instance.get('minWidth');

						switch(instance._currentHandle) {
							case 'l':
								height = newHeight * (width / newWidth);
								height = Math.min(Math.max(minHeight, height), maxHeight);

								width = newWidth * (height / newHeight);

								top = (instance._cache.start.top - (-((newHeight - height) / 2)));
								left = (instance._cache.start.left - (-((newWidth - width))));

							break;

							case 'r':
								height = newHeight * (width / newWidth);
								height = Math.min(Math.max(minHeight, height), maxHeight);

								width = newWidth * (height / newHeight);

								top = (instance._cache.start.top - (-((newHeight - height) / 2)));
							break;

							case 't':
								height = newHeight * (width / newWidth);
								width = newWidth * (height / newHeight);

								top = (instance._cache.start.top - (-((newHeight - height))));
								left = (instance._cache.start.left - (-((newWidth - width) / 2)));
							break;

							case 'b':
								height = newHeight * (width / newWidth);
								width = newWidth * (height / newHeight);

								left = (instance._cache.start.left - (-((newWidth - width) / 2)));
							break;

							case 'bl':
								height = newHeight * (width / newWidth);
								width = newWidth * (height / newHeight);

								left = (instance._cache.start.left - (-((newWidth - width))));
							break;

							case 'br':
								height = newHeight * (width / newWidth);
								width = newWidth * (height / newHeight);
							break;

							case 'tl':
								height = newHeight * (width / newWidth);
								width = newWidth * (height / newHeight);

								top = (instance._cache.start.top - (-((newHeight - height))));
								left = (instance._cache.start.left - (-((newWidth - width))));
							break;

							case 'tr':
								height = newHeight * (width / newWidth);
								width = newWidth * (height / newHeight);

								top = (instance._cache.start.top - (-((newHeight - height))));
								left = (instance._cache.start.left);
							break;
						}

						var originalHeight = instance._checkHeight(height);
						var originalWidth = instance._checkWidth(width);

						if ((originalHeight != height) || (originalWidth != width)) {
							top = 0;
							left = 0;

							if (originalHeight != height) {
								originalWidth = instance._cache.width;
							}

							if (originalWidth != width) {
								originalHeight = instance._cache.height;
							}
						}
					}

					return [originalHeight, originalWidth, top, left];
				},

				_updateStatus: function(height, width, top, left) {
					var instance = this;

					if (instance._resizeEvent && !Lang.isString(instance._resizeEvent)) {
						height = (height === 0) ? instance._cache.start.height : height;
						width = (width === 0) ? instance._cache.start.width : width;

						var height1 = instance.get('height');
						var width1 = instance.get('width');

						if (isNaN(height1)) {
							height1 = height;
						}

						if (isNaN(width1)) {
							width1 = width;
						}

						var diffHeight = (height - height1);
						var diffWidth = (width - width1);

						instance._cache.offsetHeight = diffHeight;
						instance._cache.offsetWidth = diffWidth;

						if (instance.get('status')) {
							instance._status.removeClass('aui-helper-hidden');

							var statusSize = '<strong>' + parseInt(height, 10) + ' x ' + parseInt(width, 10) + '</strong>';
							var statusDelta = '<em>' + (diffHeight > 0 ? '+' : '') + diffHeight + ' x ' + (diffWidth > 0 ? '+' : '') + diffWidth + '</em>';

							instance._status.html(statusSize + statusDelta);

							instance._status.setXY(instance._resizeEvent.pageX + 12, instance._resizeEvent.pageY + 12);
						}
					}
				},

				reset: function() {
					var instance = this;

					var cacheStart = instance._cache.start;

					instance.resize(null, cacheStart.height, cacheStart.width, cacheStart.top, cacheStart.left, true);

					return instance;
				},

				resize: function(event, height, width, top, left, force, silent) {
					var instance = this;

					if (instance.get('lock')) {
						return false;
					}

					instance._resizeEvent = event;

					var el = instance._wrap;
					var set = true;

					var positioned = instance.get('positioned');

					if (instance._proxy && !force) {
						el = instance._proxy;
					}

					instance._setAutoRatio(instance._currentDD);

					if (positioned == true) {
						if (instance._proxy) {
							top = instance._cache.top - top;
							left = instance._cache.left - left;
						}
					}

					var ratio = instance._setRatio(height, width, top, left);

					height = parseInt(ratio[0], 10);
					width = parseInt(ratio[1], 10);
					top = parseInt(ratio[2], 10);
					left = parseInt(ratio[3], 10);

					if (top == 0) {
						top = el.getY();
					}

					if (left == 0) {
						left = el.getX();
					}

					if (positioned) {
						if (instance._proxy && force) {
							el.setStyles(
								{
									left: instance._proxy.getStyle('left'),
									top: instance._proxy.getStyle('top')
								}
							);
						}
						else {
							if (!instance.get('ratio') && !instance._proxy) {
								top = instance._cache.top + -(top);
								left = instance._cache.left + -(left);
							}

							if (top) {
								var minY = instance.get('minY');
								var maxY = instance.get('maxY');

								if (minY) {
									if (top < minY) {
										top = minY;
									}
								}

								if (maxY) {
									if (top > maxY) {
										top = maxY;
									}
								}
							}

							if (left) {
								var minX = instance.get('minX');
								var maxX = instance.get('maxX');

								if (minX) {
									if (left < minX) {
										left = minX;
									}
								}

								if (maxX) {
									if ((left + width) > maxX) {
										left = maxX - width;
									}
								}
							}
						}
					}

					instance._updateStatus(height, width, top, left);

					if (positioned) {
						if (!(instance._proxy && force)) {
							if (top) {
								el.setY(top);
								instance._cache.top = top;
							}

							if (left) {
								el.setX(left);
								instance._cache.left = left;
							}
						}
					}

					if (height) {
						set = true;

						if (instance._proxy && force) {
							if (!instance.get('setSize')) {
								set = false;
							}
						}

						if (set) {
							el.setStyle('height', height + 'px');
						}

						if ((instance._proxy && force) || !instance._proxy) {
							var node = instance.get('node');

							if (!instance._wrap.compareTo(node)) {
								node.setStyle('height', height + 'px');
							}
						}

						instance._cache.height = height;
					}

					if (width) {
						instance._cache.width = width;

						set = true;

						if (instance._proxy && force) {
							if (!instance.get('setSize')) {
								set = false;
							}
						}

						if (set) {
							el.setStyle('width', width + 'px');
						}

						if ((instance._proxy && force) || !instance._proxy) {
							var node = instance.get('node');

							if (!instance._wrap.compareTo(node)) {
								node.setStyle('width', width + 'px');
							}
						}
					}

					var eventData = {
						height: height,
						width: width,
						top: top,
						left: left
					};

					if (instance._proxy && !force) {
						instance.fire('proxyResize', eventData);
					}
					else {
						instance.fire('resize', eventData);
					}

					return instance;
				},

				_handle_for_br: function(event, dd) {
					var instance = this;

					var newHeight = instance._setHeight(event);
					var newWidth = instance._setWidth(event);

					instance.resize(event, newHeight, newWidth, 0, 0);
				},

				_handle_for_bl: function(event) {
					var instance = this;

					var newHeight = instance._setHeight(event);
					var newWidth = instance._setWidth(event, true);

					var left = (newWidth - instance._cache.width);

					instance.resize(event, newHeight, newWidth, 0, left);
				},

				_handle_for_tl: function(event) {
					var instance = this;

					var newHeight = instance._setHeight(event, true);
					var newWidth = instance._setWidth(event, true);

					var top = (newHeight - instance._cache.height);
					var left = (newWidth - instance._cache.width);

					instance.resize(event, newHeight, newWidth, top, left);
				},

				_handle_for_tr: function(event) {
					var instance = this;

					var newHeight = instance._setHeight(event, true);
					var newWidth = instance._setWidth(event);

					var top = (newHeight - instance._cache.height);

					instance.resize(event, newHeight, newWidth, top, 0);
				},

				_handle_for_r: function(event) {
					var instance = this;

					var newWidth = instance._setWidth(event);

					instance.resize(event, 0, newWidth, 0, 0);
				},

				_handle_for_l: function(event) {
					var instance = this;

					var newWidth = instance._setWidth(event, true);

					var left = (newWidth - instance._cache.width);

					instance.resize(event, 0, newWidth, 0, left);
				},

				_handle_for_b: function(event) {
					var instance = this;

					var newHeight = instance._setHeight(event);

					instance.resize(event, newHeight, 0, 0, 0);
				},

				_handle_for_t: function(event) {
					var instance = this;

					var newHeight = instance._setHeight(event, true);

					var top = (newHeight - instance._cache.height);

					instance.resize(event, newHeight, 0, top, 0);
				},

				_setWidth: function(event, flip) {
					var instance = this;

					var xy = instance._cache.xy[0];
					var width = instance._cache.width;
					var x = event.pageX;
					var newWidth = (x - xy);

					if (flip) {
						newWidth = (xy - x) + instance.get('width');
					}

					newWidth = instance._snapTick(newWidth, instance.get('xTicks'));
					newWidth = instance._checkWidth(newWidth);

					return newWidth;
				},

				_checkWidth: function(width) {
					var instance = this;

					var minWidth = instance.get('minWidth');
					var maxWidth = instance.get('maxWidth');

					if (minWidth) {
						if (width < minWidth) {
							width = minWidth;
						}
					}

					if (maxWidth) {
						if (width > maxWidth) {
							width = maxWidth;
						}
					}

					return width;
				},

				_checkHeight: function(height) {
					var instance = this;

					var minHeight = instance.get('minHeight');
					var maxHeight = instance.get('maxHeight');

					if (minHeight) {
						if (height < minHeight) {
							height = minHeight;
						}
					}

					if (maxHeight) {
						if (height > maxHeight) {
							height = maxHeight;
						}
					}

					return height;
				},

				_setHeight: function(event, flip) {
					var instance = this;

					var xy = instance._cache.xy[1];
					var height = instance._cache.height;
					var y = event.pageY;
					var newHeight = (y - xy);

					if (flip) {
						newHeight = (xy - y) + instance.get('height');
					}

					newHeight = instance._snapTick(newHeight, instance.get('yTicks'));
					newHeight = instance._checkWidth(newHeight);

					return newHeight;
				},

				_snapTick: function(size, pix) {
					var instance = this;

					if (!size || !pix) {
						return size;
					}

					var newSize = size;
					var newX = size % pix;

					if (newX > 0) {
						if (newX > (pix / 2)) {
							newSize = size + (pix - newX);
						}
						else {
							newSize = size - newX;
						}
					}

					return newSize;
				},

				_cache: {},
				_currentDD: null,
				_dds: null,
				_handles: null,
				_ieSelectBack: null,
				_proxy: null
			}
		);

		A.Resize = Resize;
	},
	'@VERSION',
	{
		requires: ['dd'],
		skinnable: false
	}
);

AUI().add(
	'resize-plugin',
	function(A) {
		var ResizePlugin = function(config) {
			config.node = config.host;

			ResizePlugin.superclass.constructor.apply(this, arguments);
		};

		ResizePlugin.NAME = 'resizePlugin';
		ResizePlugin.NS = 'resize';

		A.extend(ResizePlugin, A.Resize);

		A.namespace('Plugin');

		A.Plugin.ResizePlugin = ResizePlugin;
	},
	'@VERSION',
	{
		requires: ['resize'],
		skinnable: false
	}
);