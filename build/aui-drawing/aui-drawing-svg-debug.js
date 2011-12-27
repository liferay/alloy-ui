AUI.add('aui-drawing-svg', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isUndefined = Lang.isUndefined,

	CONFIG = A.config,
	DOC = CONFIG.doc,

	ColorUtil = A.ColorUtil,

	Drawing = A.Drawing,
	Element = Drawing.Element,
	Impl,
	Util = Drawing.Util,

	DRAWING_PROTOTYPE = Drawing.prototype,
	ELEMENT_PROTOTYPE = Element.prototype,

	MATH = Math,
	MATH_MAX = MATH.max,
	MATH_POW = MATH.pow,

	MAP_ATTRS_AVAILABLE = Drawing.MAP_ATTRS_AVAILABLE,

	MAP_TYPES_IMAGE_TEXT = Drawing.MAP_TYPES_IMAGE_TEXT,
	MAP_TYPES_CIRCLE_ELLIPSE = Drawing.MAP_TYPES_CIRCLE_ELLIPSE,

	REGEX_ISURL = Drawing.REGEX_ISURL,
	REGEX_RADIAL_GRADIENT = Drawing.REGEX_RADIAL_GRADIENT,
	REGEX_SEPARATOR = Drawing.REGEX_SEPARATOR,
	REGEX_SEPARATOR_GRADIENT = Drawing.REGEX_SEPARATOR_GRADIENT,

	STR_CREATED_DESCRIPTION = 'Created with AlloyUI',
	STR_EMPTY = Drawing.STR_EMPTY,
	STR_FILL = Drawing.STR_FILL,
	STR_SPACE = Drawing.STR_SPACE,

	TEXT_LEADING = 1.2,

	TO_LOWER_CASE = String.prototype.toLowerCase,
	TO_UPPER_CASE = String.prototype.toUpperCase;

DRAWING_PROTOTYPE.svgns = 'http://www.w3.org/2000/svg';
DRAWING_PROTOTYPE.xlink = 'http://www.w3.org/1999/xlink';

Util.CREATE_ELEMENT = function(elementType) {
	var el = DOC.createElementNS(DRAWING_PROTOTYPE.svgns, elementType);

	el.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';

	return el;
};

Util.SET_ATTRS = function(el, attr) {
	for (var key in attr) {
		if (attr.hasOwnProperty(key)) {
			el.setAttribute(key, String(attr[key]));
		}
	}

	return el;
};

Util.TUNE_TEXT = function(el, params) {
	if (el.type != 'text' || !(params.hasOwnProperty('text') || params.hasOwnProperty('font') || params.hasOwnProperty('font-size') || params.hasOwnProperty('x') || params.hasOwnProperty('y'))) {
		return;
	}

	var texts;

	var a = el.attrs;
	var node = el.node;
	var fontSize = 10;

	if (node.firstChild) {
		fontSize = parseInt(DOC.defaultView.getComputedStyle(node.firstChild, STR_EMPTY).getPropertyValue('font-size'), 10);
	}

	if (params.hasOwnProperty('text')) {
		a.text = params.text;

		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}

		texts = String(params.text).split('\n');

		for (var i = 0, length = texts.length; i < length; i++) {
			if (texts[i]) {
				var tspan = Util.CREATE_ELEMENT('tspan');

				if (i) {
					Util.SET_ATTRS(
						tspan,
						{
							dy: fontSize * TEXT_LEADING,
							x: a.x
						}
					);
				}

				tspan.appendChild(DOC.createTextNode(texts[i]));
				node.appendChild(tspan);
			}
		}
	}
	else {
		texts = node.getElementsByTagName('tspan');

		for (i = 0, length = texts.length; i < length; i++) {
			if (i) {
				Util.SET_ATTRS(
					texts[i],
					{
						dy: fontSize * TEXT_LEADING,
						x: a.x
					}
				);
			}
		}
	}

	Util.SET_ATTRS(
		node,
		{
			y: a.y
		}
	);

	var bb = el.getRegion();
	var diff = a.y - (bb.y + bb.height / 2);

	if (diff && isFinite(diff)) {
		Util.SET_ATTRS(
			node,
			{
				y: a.y + diff
			}
		);
	}
};

Util.UPDATE_POSITION = function(obj) {
	var bbox = obj.getRegion();

	Util.SET_ATTRS(
		obj.pattern,
		{
			patternTransform: Lang.sub('translate({0},{1})', [bbox.x, bbox.y])
		}
	);
};

Impl = Drawing.Impl = {
	addGradientFill: function(obj, gradient, SVG) {
		var type = 'linear';
		var fx = 0.5;
		var fy = 0.5;
		var objStyle = obj.style;
		var vector;

		gradient = String(gradient).replace(REGEX_RADIAL_GRADIENT, function(all, _fx, _fy) {
			type = 'radial';

			if (_fx && _fy) {
				fx = parseFloat(_fx);
				fy = parseFloat(_fy);

				var dir = ((fy > 0.5) * 2 - 1);

				MATH_POW(fx - 0.5, 2) + MATH_POW(fy - 0.5, 2) > 0.25 &&
					(fy = MATH.sqrt(0.25 - MATH_POW(fx - 0.5, 2)) * dir + 0.5) &&
					fy != 0.5 &&
					(fy = fy.toFixed(5) - 1e-5 * dir);
			}

			return STR_EMPTY;
		});

		gradient = gradient.split(REGEX_SEPARATOR_GRADIENT);

		if (type == 'linear') {
			var angle = gradient.shift();

			angle = -parseFloat(angle);

			if (isNaN(angle)) {
				return null;
			}

			vector = [0, 0, MATH.cos(angle * MATH.PI / 180), MATH.sin(angle * MATH.PI / 180)];

			var max = 1 / (MATH_MAX(MATH.abs(vector[2]), MATH.abs(vector[3])) || 1);

			vector[2] *= max;
			vector[3] *= max;

			if (vector[2] < 0) {
				vector[0] = -vector[2];
				vector[2] = 0;
			}

			if (vector[3] < 0) {
				vector[1] = -vector[3];
				vector[3] = 0;
			}
		}

		var dots = Util.parseDots(gradient);

		if (!dots) {
			return null;
		}

		var id = obj.getAttribute(STR_FILL);

		id = id.match(/^url\(#(.*)\)$/);
		id && SVG.defs.removeChild(DOC.getElementById(id[1]));

		var el = Util.CREATE_ELEMENT(type + 'Gradient');

		el.id = A.guid();

		var elAttrs;

		if (type == 'radial') {
			elAttrs = {
				fx: fx,
				fy: fy
			};
		}
		else {
			elAttrs = {
				x1: vector[0],
				y1: vector[1],
				x2: vector[2],
				y2: vector[3]
			};
		}

		Util.SET_ATTRS(el, elAttrs);

		SVG.defs.appendChild(el);

		for (var i = 0, length = dots.length; i < length; i++) {
			var stop = Util.CREATE_ELEMENT('stop');

			var offset = dots[i].offset;

			if (!offset) {
				if (!i) {
					offset = '0%';
				}
				else {
					offset = '100%';
				}
			}

			Util.SET_ATTRS(
				stop,
				{
					offset: offset,
					'stop-color': dots[i].color || '#fff'
				}
			);

			el.appendChild(stop);
		}

		Util.SET_ATTRS(
			obj,
			{
				fill: 'url(#' + el.id + ')',
				opacity: 1,
				'fill-opacity': 1
			}
		);

		objStyle.fill = STR_EMPTY;
		objStyle.opacity = 1;
		objStyle.fillOpacity = 1;

		return 1;
	},

	clear: function() {
		var instance = this;

		var canvas = instance.canvas;

		while (canvas.firstChild) {
			canvas.removeChild(canvas.firstChild);
		}

		instance.bottom = instance.top = null;

		instance.desc = Util.CREATE_ELEMENT('desc');

		instance.desc.appendChild(DOC.createTextNode(STR_CREATED_DESCRIPTION));

		canvas.appendChild(instance.desc);

		instance.defs = Util.CREATE_ELEMENT('defs');

		canvas.appendChild(instance.defs);
	},

	createCanvas: function() {
		var instance = this;

		var contentBox = instance.get('contentBox');

		var x = instance.get('x');
		var y = instance.get('y');
		var width = instance.get('width');
		var height = instance.get('height');

		var canvas = Util.CREATE_ELEMENT('svg');

		Util.SET_ATTRS(
			canvas,
			{
				xmlns: 'http://www.w3.org/2000/svg',
				version: 1.1,
				width: width,
				height: height
			}
		);

		contentBox.prepend(canvas);

		instance.canvas = canvas;

		instance.clear();
	},

	createCircle: function(x, y, r) {
		var instance = this;

		var el = Util.CREATE_ELEMENT('circle');

		instance.canvas.appendChild(el);

		var circle = new Element(el, instance);

		circle.attrs = {
			cx: x,
			cy: y,
			r: r,
			fill: 'none',
			stroke: '#000'
		};

		circle.type = 'circle';

		Util.SET_ATTRS(el, circle.attrs);

		return circle;
	},

	createEllipse: function(x, y, rx, ry) {
		var instance = this;

		var el = Util.CREATE_ELEMENT('ellipse');

		instance.canvas.appendChild(el);

		var ellipse = new Element(el, instance);

		ellipse.attrs = {
			cx: x,
			cy: y,
			rx: rx,
			ry: ry,
			fill: 'none',
			stroke: '#000'
		};

		ellipse.type = 'ellipse';

		Util.SET_ATTRS(el, ellipse.attrs);

		return ellipse;
	},

	createImage: function(src, x, y, w, h) {
		var instance = this;

		var el = Util.CREATE_ELEMENT('image');

		Util.SET_ATTRS(
			el,
			{
				x: x,
				y: y,
				width: w,
				height: h,
				preserveAspectRatio: 'none'
			}
		);

		el.setAttributeNS(instance.xlink, 'href', src);

		instance.canvas.appendChild(el);

		var image = new Element(el, instance);

		image.attrs = {
			x: x,
			y: y,
			width: w,
			height: h,
			src: src
		};

		image.type = 'image';

		return image;
	},

	createPath: function(pathString) {
		var instance = this;

		var el = Util.CREATE_ELEMENT('path');

		instance.canvas.appendChild(el);

		var path = new Element(el, instance);

		path.type = 'path';

		Impl.setFillAndStroke(
			path,
			{
				fill: 'none',
				stroke: '#000',
				path: pathString
			}
		);

		return path;
	},

	createRectangle: function(x, y, w, h, r) {
		var instance = this;

		var el = Util.CREATE_ELEMENT('rect');

		instance.canvas.appendChild(el);

		var rect = new Element(el, instance);

		rect.attrs = {
			x: x,
			y: y,
			width: w,
			height: h,
			r: r,
			rx: r,
			ry: r,
			fill: 'none',
			stroke: '#000'
		};

		rect.type = 'rect';

		Util.SET_ATTRS(el, rect.attrs);

		return rect;
	},

	createText: function(x, y, text) {
		var instance = this;

		var el = Util.CREATE_ELEMENT('text');

		Util.SET_ATTRS(
			el,
			{
				x: x,
				y: y,
				'text-anchor': 'middle'
			}
		);

		instance.canvas.appendChild(el);

		var textElement = new Element(el, instance);

		textElement.attrs = {
			x: x,
			y: y,
			'text-anchor': 'middle',
			text: text,
			font: MAP_ATTRS_AVAILABLE.font,
			stroke: 'none',
			fill: '#000'
		};

		textElement.type = 'text';

		Impl.setFillAndStroke(textElement, textElement.attrs);

		return textElement;
	},

	setFillAndStroke: function(obj, params) {
		var dasharray = {
			'': [0],
			'none': [0],
			'-': [3, 1],
			'.': [1, 1],
			'-.': [3, 1, 1, 1],
			'-..': [3, 1, 1, 1, 1, 1],
			'. ': [1, 3],
			'- ': [4, 3],
			'--': [8, 3],
			'- .': [4, 3, 1, 3],
			'--.': [8, 3, 1, 3],
			'--..': [8, 3, 1, 3, 1, 3]
		};

		var node = obj.node;
		var attrs = obj.attrs;
		var rot = obj.rotate();

		var addDashes = function(obj, value) {
			value = dasharray[TO_LOWER_CASE.call(value)];

			if (value) {
				var width = obj.attrs['stroke-width'] || '1';

				var butt = {
						round: width,
						square: width,
						butt: 0
					}[obj.attrs['stroke-linecap'] || params['stroke-linecap']] || 0;

				var dashes = [];

				var i = value.length;

				while (i--) {
					dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
				}

				Util.SET_ATTRS(
					node,
					{
						'stroke-dasharray': dashes.join(',')
					}
				);
			}
		};

		if (params.hasOwnProperty('rotation')) {
			rot = params.rotation;
		}

		var rotxy = String(rot).split(REGEX_SEPARATOR);

		if (!(rotxy.length - 1)) {
			rotxy = null;
		}
		else {
			rotxy[1] = +rotxy[1];
			rotxy[2] = +rotxy[2];
		}

		parseFloat(rot) && obj.rotate(0, true);

		for (var att in params) {
			if (params.hasOwnProperty(att)) {
				if (!MAP_ATTRS_AVAILABLE.hasOwnProperty(att)) {
					continue;
				}

				var value = params[att];

				attrs[att] = value;

				switch (att) {
					case 'blur':
						obj.blur(value);
					break;

					case 'rotation':
						obj.rotate(value, true);
					break;

					case 'href':
					case 'title':
					case 'target':
						var pn = node.parentNode;

						if (TO_LOWER_CASE.call(pn.tagName) != 'a') {
							var hl = Util.CREATE_ELEMENT('a');

							pn.insertBefore(hl, node);
							hl.appendChild(node);
							pn = hl;
						}

						pn.setAttributeNS(obj.paper.xlink, att, value);
					break;

					case 'cursor':
						node.style.cursor = value;
					break;

					case 'clip-rect':
						var rect = String(value).split(REGEX_SEPARATOR);

						if (rect.length == 4) {
							obj.clip && obj.clip.parentNode.parentNode.removeChild(obj.clip.parentNode);

							var el = Util.CREATE_ELEMENT('clipPath');
							var rc = Util.CREATE_ELEMENT('rect');

							el.id = A.guid();

							Util.SET_ATTRS(
								rc,
								{
									x: rect[0],
									y: rect[1],
									width: rect[2],
									height: rect[3]
								}
							);

							el.appendChild(rc);

							obj.paper.defs.appendChild(el);

							Util.SET_ATTRS(
								node,
								{
									'clip-path': 'url(#' + el.id + ')'
								}
							);

							obj.clip = rc;
						}

						if (!value) {
							var clip = DOC.getElementById(node.getAttribute('clip-path').replace(/(^url\(#|\)$)/g, STR_EMPTY));
							clip && clip.parentNode.removeChild(clip);

							Util.SET_ATTRS(
								node,
								{
									'clip-path': STR_EMPTY
								}
							);

							delete obj.clip;
						}
					break;

					case 'path':
						if (obj.type == 'path') {
							var d = 'M0,0';

							if (value) {
								d = Util.pathToAbsolute(value);
							}

							Util.SET_ATTRS(
								node,
								{
									d: d
								}
							);
						}
					break;

					case 'width':
						node.setAttribute(att, value);

						if (attrs.fx) {
							att = 'x';
							value = attrs.x;
						}
						else {
							break;
						}

					case 'x':
						if (attrs.fx) {
							value = -attrs.x - (attrs.width || 0);
						}

					case 'rx':
						if (att == 'rx' && obj.type == 'rect') {
							break;
						}

					case 'cx':
						rotxy && (att == 'x' || att == 'cx') && (rotxy[1] += value - attrs[att]);

						node.setAttribute(att, value);

						obj.pattern && Util.UPDATE_POSITION(obj);

					break;

					case 'height':
						node.setAttribute(att, value);

						if (attrs.fy) {
							att = 'y';
							value = attrs.y;
						}
						else {
							break;
						}

					case 'y':
						if (attrs.fy) {
							value = -attrs.y - (attrs.height || 0);
						}

					case 'ry':
						if (att == 'ry' && obj.type == 'rect') {
							break;
						}

					case 'cy':
						rotxy && (att == 'y' || att == 'cy') && (rotxy[2] += value - attrs[att]);

						node.setAttribute(att, value);

						obj.pattern && Util.UPDATE_POSITION(obj);

					break;

					case 'r':
						if (obj.type == 'rect') {
							Util.SET_ATTRS(
								node,
								{
									rx: value,
									ry: value
								}
							);
						}
						else {
							node.setAttribute(att, value);
						}

					break;

					case 'src':
						if (obj.type == 'image') {
							node.setAttributeNS(obj.paper.xlink, 'href', value);
						}

					break;

					case 'stroke-width':
						node.style.strokeWidth = value;
						// Need following line for Firefox
						node.setAttribute(att, value);

						if (attrs['stroke-dasharray']) {
							addDashes(obj, attrs['stroke-dasharray']);
						}

					break;

					case 'stroke-dasharray':
						addDashes(obj, value);

					break;

					case 'translation':
						var xy = String(value).split(REGEX_SEPARATOR);

						xy[0] = +xy[0] || 0;
						xy[1] = +xy[1] || 0;

						if (rotxy) {
							rotxy[1] += xy[0];
							rotxy[2] += xy[1];
						}

						Util.translate.call(obj, xy[0], xy[1]);

					break;

					case 'scale':
						xy = String(value).split(REGEX_SEPARATOR);

						obj.scale(
							+xy[0] || 1,
							+xy[1] || +xy[0] || 1,
							isNaN(parseFloat(xy[2])) ? null : +xy[2],
							isNaN(parseFloat(xy[3])) ? null : +xy[3]
						);

					break;

					case STR_FILL:
						var isURL = String(value).match(REGEX_ISURL);

						if (isURL) {
							el = Util.CREATE_ELEMENT('pattern');

							var ig = Util.CREATE_ELEMENT('image');

							el.id = A.guid();

							Util.SET_ATTRS(
								el,
								{
									x: 0,
									y: 0,
									patternUnits: 'userSpaceOnUse',
									height: 1,
									width: 1
								}
							);

							Util.SET_ATTRS(
								ig,
								{
									x: 0,
									y: 0
								}
							);

							ig.setAttributeNS(obj.paper.xlink, 'href', isURL[1]);

							el.appendChild(ig);

							var img = DOC.createElement('img');

							img.style.cssText = 'position: absolute; left: -9999em; top: -9999em';

							img.onload = function() {
								var attrDimensions = {
									width: this.offsetWidth,
									height: this.offsetHeight
								};

								Util.SET_ATTRS(el, attrDimensions);
								Util.SET_ATTRS(ig, attrDimensions);

								DOC.body.removeChild(this);

								obj.paper.safari();
							};

							DOC.body.appendChild(img);

							img.src = isURL[1];

							obj.paper.defs.appendChild(el);

							node.style.fill = 'url(#' + el.id + ')';

							Util.SET_ATTRS(
								node,
								{
									fill: 'url(#' + el.id + ')'
								}
							);

							obj.pattern = el;

							obj.pattern && Util.UPDATE_POSITION(obj);

							break;
						}

						var color = ColorUtil.getRGB(value);

						if (!color.error) {
							delete params.gradient;
							delete attrs.gradient;

							if (!isUndefined(attrs.opacity) && isUndefined(params.opacity)) {
								Util.SET_ATTRS(
									node,
									{
										opacity: attrs.opacity
									}
								);
							}

							if (!isUndefined(attrs['fill-opacity']) && isUndefined(params['fill-opacity'])) {
								Util.SET_ATTRS(
									node,
									{
										'fill-opacity': attrs['fill-opacity']
									}
								);
							}
						}
						else if ((MAP_TYPES_CIRCLE_ELLIPSE.hasOwnProperty(obj.type) || String(value).charAt(0) != 'r') && Impl.addGradientFill(node, value, obj.paper)) {

							attrs.gradient = value;
							attrs.fill = 'none';

							break;
						}

						if (color.hasOwnProperty('o')) {
							Util.SET_ATTRS(
								node,
								{
									'fill-opacity': color.o > 1 ? color.o / 100 : color.o
								}
							);
						}
					case 'stroke':
						color = ColorUtil.getRGB(value);
						node.setAttribute(att, color.hex);

						if (att == 'stroke' && color.hasOwnProperty('o')) {
							Util.SET_ATTRS(
								node,
								{
									'stroke-opacity': color.o > 1 ? color.o / 100 : color.o
								}
							);
						}

					break;

					case 'gradient':
						if (MAP_TYPES_CIRCLE_ELLIPSE.hasOwnProperty(obj.type) || String(value).charAt(0) != 'r') {
							Impl.addGradientFill(node, value, obj.paper);
						}

					break;

					case 'opacity':
						if (attrs.gradient && !attrs.hasOwnProperty('stroke-opacity')) {
							Util.SET_ATTRS(
								node,
								{
									'stroke-opacity': value > 1 ? value / 100 : value
								}
							);
						}
						// fall through
					case 'fill-opacity':
						if (attrs.gradient) {
							var gradient = DOC.getElementById(node.getAttribute(STR_FILL).replace(/^url\(#|\)$/g, STR_EMPTY));

							if (gradient) {
								var stops = gradient.getElementsByTagName('stop');

								stops[stops.length - 1].setAttribute('stop-opacity', value);
							}

							break;
						}
					default:
						if (att == 'font-size') {
							value = parseInt(value, 10) + 'px';
						}

						var cssrule = att.replace(/(\-.)/g, function(w) {
							return TO_UPPER_CASE.call(w.substring(1));
						});

						node.style[cssrule] = value;

						// Need following line for Firefox
						node.setAttribute(att, value);

					break;
				}
			}
		}

		Util.TUNE_TEXT(obj, params);

		if (rotxy) {
			obj.rotate(rotxy.join(STR_SPACE));
		}
		else {
			parseFloat(rot) && obj.rotate(rot, true);
		}
	},

	remove: function() {
		var instance = this;

		var contentBox = instance.get('contentBox');

		contentBox.removeChild(instance.canvas);

		for (var i in instance) {
			if (DRAWING_PROTOTYPE.hasOwnProperty(i)) {
				instance[i] = Util.removed(i);
			}
		}
	}
};

DRAWING_PROTOTYPE._uiSetWidth = function(value) {
	var instance = this;

	Drawing.superclass._uiSetWidth.apply(instance, arguments);

	instance.canvas.setAttribute('width', value);
};

DRAWING_PROTOTYPE._uiSetHeight = function(value) {
	var instance = this;

	Drawing.superclass._uiSetHeight.apply(instance, arguments);

	instance.canvas.setAttribute('height', value);
};

/*
	------ ELEMENT IMPL
*/

ELEMENT_PROTOTYPE.createElement = function(node, drawing) {
	var instance = this;

	instance[0] = node;
	instance.id = A.guid();

	instance.node = node;

	instance.paper = drawing;
	instance.attrs = instance.attrs || {};
	instance.transformations = []; // rotate, translate, scale

	this._ = {
		tx: 0,
		ty: 0,
		rt: {
			deg: 0,
			cx: 0,
			cy: 0
		},
		sx: 1,
		sy: 1
	};

	if (!drawing.bottom) {
		drawing.bottom = instance;
	}

	instance.prev = drawing.top;

	if (drawing.top) {
		drawing.top.next = instance;
	}

	drawing.top = instance;

	instance.next = null;
};

ELEMENT_PROTOTYPE.rotate = function(deg, cx, cy) {
	var instance = this;

	if (instance.removed) {
		return instance;
	}

	if (deg == null) {
		if (instance._.rt.cx) {
			return [
				instance._.rt.deg,
				instance._.rt.cx,
				instance._.rt.cy
			].join(STR_SPACE);
		}

		return instance._.rt.deg;
	}

	var bbox = instance.getRegion();

	deg = String(deg).split(REGEX_SEPARATOR);

	if (deg.length - 1) {
		cx = parseFloat(deg[1]);
		cy = parseFloat(deg[2]);
	}

	deg = parseFloat(deg[0]);

	if (cx != null) {
		instance._.rt.deg = deg;
	}
	else {
		instance._.rt.deg += deg;
	}

	(cy == null) && (cx = null);

	instance._.rt.cx = cx;
	instance._.rt.cy = cy;

	cx = cx == null ? bbox.x + bbox.width / 2 : cx;
	cy = cy == null ? bbox.y + bbox.height / 2 : cy;

	if (instance._.rt.deg) {
		instance.transformations[0] = Lang.sub('rotate({0} {1} {2})', [instance._.rt.deg, cx, cy]);

		if (instance.clip) {
			Util.SET_ATTRS(
				instance.clip,
				{
					transform: Lang.sub("rotate({0} {1} {2})", [-instance._.rt.deg, cx, cy])
				}
			);
		}
	}
	else {
		instance.transformations[0] = STR_EMPTY;

		if (instance.clip) {
			Util.SET_ATTRS(
				instance.clip,
				{
					transform: STR_EMPTY
				}
			);
		}
	}

	Util.SET_ATTRS(
		instance.node,
		{
			transform: instance.transformations.join(STR_SPACE)
		}
	);

	return instance;
};

ELEMENT_PROTOTYPE.hide = function() {
	var instance = this;

	!instance.removed && (instance.node.style.display = 'none');

	return this;
};

ELEMENT_PROTOTYPE.show = function() {
	var instance = this;

	!instance.removed && (instance.node.style.display = '');

	return instance;
};

ELEMENT_PROTOTYPE.remove = function() {
	var instance = this;

	if (instance.removed) {
		return;
	}

	Util.tear(instance, instance.paper);

	instance.node.parentNode.removeChild(instance.node);

	for (var i in instance) {
		delete instance[i];
	}

	instance.removed = true;
};

ELEMENT_PROTOTYPE.getRegion = function() {
	var instance = this;

	if (instance.removed) {
		return instance;
	}

	if (instance.type == 'path') {
		return Util.pathDimensions(instance.attrs.path);
	}

	var hide = false;

	if (instance.node.style.display == 'none') {
		instance.show();

		hide = true;
	}

	var bbox = {};

	try {
		bbox = instance.node.getBBox();
	} catch(e) {
		// Firefox 3.0.x plays badly here
	} finally {
		bbox = bbox || {};
	}

	if (instance.type == 'text') {
		bbox = {
			x: bbox.x,
			y: Infinity,
			width: 0,
			height: 0
		};

		for (var i = 0, length = instance.node.getNumberOfChars(); i < length; i++) {
			var bb = instance.node.getExtentOfChar(i);

			if (bb.y < bbox.y) {
				bbox.y = bb.y;
			}

			if (bb.y + bb.height - bbox.y > bbox.height) {
				bbox.height = bb.y + bb.height - bbox.y;
			}

			if (bb.x + bb.width - bbox.x > bbox.width) {
				bbox.width = bb.x + bb.width - bbox.x;
			}
		}
	}

	if (hide) {
		instance.hide();
	}

	return bbox;
};

ELEMENT_PROTOTYPE.getBBox = ELEMENT_PROTOTYPE.getRegion;

ELEMENT_PROTOTYPE.attr = function(name, value) {
	var instance = this;

	if (instance.removed) {
		return instance;
	}

	if (name == null) {
		var res = {};

		for (var i in instance.attrs) {
			if (instance.attrs.hasOwnProperty(i)) {
				res[i] = instance.attrs[i];
			}
		}

		instance._.rt.deg && (res.rotation = instance.rotate());

		(instance._.sx != 1 || instance._.sy != 1) && (res.scale = instance.scale());

		res.gradient && res.fill == 'none' && (res.fill = res.gradient) && delete res.gradient;

		return res;
	}

	if (value == null && isString(name)) {
		if (name == 'translation') {
			return Util.translate.call(instance);
		}

		if (name == 'rotation') {
			return instance.rotate();
		}

		if (name == 'scale') {
			return instance.scale();
		}

		if (name == STR_FILL && instance.attrs.fill == 'none' && instance.attrs.gradient) {
			return instance.attrs.gradient;
		}

		return instance.attrs[name];
	}

	if (value == null && isArray(name)) {
		var values = {};

		for (var j = 0, jLength = name.length; j < jLength; j++) {
			values[name[j]] = instance.attr(name[j]);
		}

		return values;
	}

	var params = Util.applyAttributes(instance, name, value);

	Impl.setFillAndStroke(instance, params);

	return instance;
};

ELEMENT_PROTOTYPE.toFront = function() {
	var instance = this;

	if (instance.removed) {
		return instance;
	}

	instance.node.parentNode.appendChild(instance.node);

	var drawing = instance.paper;

	drawing.top != instance && Util.toFront(instance, drawing);

	return instance;
};

ELEMENT_PROTOTYPE.toBack = function() {
	var instance = this;

	if (instance.removed) {
		return instance;
	}

	if (instance.node.parentNode.firstChild != instance.node) {
		instance.node.parentNode.insertBefore(instance.node, instance.node.parentNode.firstChild);

		Util.toBack(instance, instance.paper);
	}

	return instance;
};

ELEMENT_PROTOTYPE.insertAfter = function(element) {
	var instance = this;

	if (instance.removed) {
		return instance;
	}

	var node = element.node || element instanceof Drawing.Set && element.item(element.size()).node;

	if (node.nextSibling) {
		node.parentNode.insertBefore(instance.node, node.nextSibling);
	}
	else {
		node.parentNode.appendChild(instance.node);
	}

	Util.insertAfter(instance, element, instance.paper);

	return instance;
};

ELEMENT_PROTOTYPE.insertBefore = function(element) {
	var instance = this;

	if (instance.removed) {
		return instance;
	}

	var node = element.node || element instanceof Drawing.Set && element.item(0).node;

	node.parentNode.insertBefore(instance.node, node);

	Util.insertBefore(instance, element, instance.paper);

	return instance;
};

ELEMENT_PROTOTYPE.blur = function(size) {
	// Experimental. No Safari support. Use it on your own risk.
	var instance = this;

	if (+size !== 0) {
		var fltr = CREATE_ELEMENT('filter');
		var blur = CREATE_ELEMENT('feGaussianBlur');

		instance.attrs.blur = size;

		fltr.id = A.guid();

		Util.SET_ATTRS(
			blur,
			{
				stdDeviation: +size || 1.5
			}
		);

		fltr.appendChild(blur);

		instance.paper.defs.appendChild(fltr);

		instance._blur = fltr;

		Util.SET_ATTRS(
			instance.node,
			{
				filter: 'url(#' + fltr.id + ')'
			}
		);
	}
	else {
		if (instance._blur) {
			instance._blur.parentNode.removeChild(instance._blur);

			delete instance._blur;
			delete instance.attrs.blur;
		}

		instance.node.removeAttribute('filter');
	}
};

}, '@VERSION@' ,{requires:['aui-drawing-base'], condition: {name: 'aui-drawing-svg', trigger: 'aui-drawing-base',test: function(A){return A.UA.svg;}}});
