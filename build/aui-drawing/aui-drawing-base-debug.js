AUI.add('aui-drawing-base', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isFunction = Lang.isFunction,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isUndefined = Lang.isUndefined,

	DOC = A.config.doc,

	ColorUtil = A.ColorUtil,
	Util,
	UA = A.UA,

	EMPTY_FN = Lang.emptyFn,

	MAP_ATTRS_AVAILABLE = {
		blur: 0,
		'clip-rect': '0 0 1e9 1e9',
		cursor: 'default',
		cx: 0,
		cy: 0,
		fill: '#fff',
		'fill-opacity': 1,
		font: '10px "Arial"',
		'font-family': '"Arial"',
		'font-size': '10',
		'font-style': 'normal',
		'font-weight': 400,
		gradient: 0,
		height: 0,
		href: 'http://alloy.liferay.com/',
		opacity: 1,
		path: 'M0,0',
		r: 0,
		rotation: 0,
		rx: 0,
		ry: 0,
		scale: '1 1',
		src: '',
		stroke: '#000',
		'stroke-dasharray': '',
		'stroke-linecap': 'butt',
		'stroke-linejoin': 'butt',
		'stroke-miterlimit': 0,
		'stroke-opacity': 1,
		'stroke-width': 1,
		target: '_blank',
		'text-anchor': 'middle',
		title: 'AlloyUI',
		translation: '0 0',
		width: 0,
		x: 0,
		y: 0
	},

	MAP_COMMAND_SVG_QUADRATIC = {
		Q: 1,
		T: 1
	},

	MAP_ELEMENTS = {
		circle: 1,
		ellipse: 1,
		image: 1,
		path: 1,
		rect: 1,
		text: 1
	},

	MAP_TYPES_IMAGE_TEXT = {
		image:1,
		text: 1
	},

	MAP_TYPES_CIRCLE_ELLIPSE = {
		circle: 1,
		ellipse: 1
	},

	MATH = Math,
	MATH_MAX = MATH.max,
	MATH_MIN = MATH.min,
	MATH_POW = MATH.pow,

	NAME = 'drawing',

	REGEX_GRADIENT_VALUES = /^([^:]*):?([\d\.]*)/,

	REGEX_ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,

	REGEX_PATH_COMMAND = /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
	REGEX_PATH_TO_STRING = /,?([achlmqrstvxz]),?/gi,
	REGEX_PATH_VALUES = /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,

	REGEX_RADIAL_GRADIENT = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,

	REGEX_SEPARATOR = /[, ]+/,
	REGEX_SEPARATOR_GRADIENT = /\s*\-\s*/,

	STR_EMPTY = '',
	STR_FILL = 'fill',

	STR_MS_PROG_ID_PREFIX = ' progid:DXImageTransform.Microsoft',

	STR_SPACE = ' ',

	TO_LOWER_CASE = String.prototype.toLowerCase,
	TO_UPPER_CASE = String.prototype.toUpperCase;

var Drawing = A.Component.create(
	{
		ATTRS: {
			height: {
				value: 342
			},
			width: {
				value: 512
			},
			x: {
				value: null
			},
			y: {
				value: null
			}
		},

		UI_ATTRS: ['x', 'y'],

		create: function(config) {
			var args = arguments;
			var firstArg = args[0];

			if (isArray(firstArg)) {
				args = args[0];

				config = Util.getConfig(args);

				var paper = new Drawing(config).render();

				var set = paper.createSet();
				var element;

				for (var i = 0, length = args.length; i < length; i++) {
					element = args[i] || {};

					if (MAP_ELEMENTS.hasOwnProperty(element.type)) {
						set.push(
							paper[element.type]().attr(element)
						);
					}
				}

				return paper;
			}
			else if (isObject(firstArg) && !(firstArg.nodeName || firstArg instanceof A.Node)) {
				config = firstArg;
			}
			else {
				config = Util.getConfig(args);
			}

			return new Drawing(config).render();
		},
		NAME: NAME,
		prototype: {
			CONTENT_TEMPLATE: null,

			renderUI: function() {
				var instance = this;

				instance.customAttributes = {};

				Drawing.Impl.createCanvas.call(instance);
			},

			circle: function(x, y, r) {
				var instance = this;

				return Drawing.Impl.createCircle.call(instance, x || 0, y || 0, r || 0);
			},

			clear: function() {
				var instance = this;

				return Drawing.Impl.clear.call(instance);
			},

			createSet: function(itemsArray) {
				var instance = this;

				if (arguments.length > 1) {
					itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length);
				}

				return new Set(itemsArray);
			},

			ellipse: function(x, y, rx, ry) {
				var instance = this;

				return Drawing.Impl.createEllipse.call(instance, x || 0, y || 0, rx || 0, ry || 0);
			},

			image: function(src, x, y, w, h) {
				var instance = this;

				return Drawing.Impl.createImage.call(instance, src || 'about:blank', x || 0, y || 0, w || 0, h || 0);
			},

			path: function(pathString) {
				var instance = this;

				if (isString(pathString)) {
					pathString = Lang.sub.apply(A, arguments);
				}
				else if (!isUndefined(pathString) && !isArray(pathString)) {
					pathString += STR_EMPTY;
				}

				return Drawing.Impl.createPath.call(instance, pathString);
			},

			rect: function(x, y, w, h, r) {
				var instance = this;

				return Drawing.Impl.createRectangle.call(instance, x || 0, y || 0, w || 0, h || 0, r || 0);
			},

			remove: function() {
				var instance = this;

				return Drawing.Impl.remove.call(instance);
			},

			safari: EMPTY_FN,

			text: function(x, y, text) {
				var instance = this;

				return Drawing.Impl.createText.call(instance, x || 0, y || 0, text || STR_EMPTY);
			},

			_uiSetX: function(value) {
				var instance = this;

				instance.get('boundingBox').setXY([value, instance.get('y')]);
			},

			_uiSetY: function(value) {
				var instance = this;

				instance.get('boundingBox').setXY([instance.get('x'), value]);
			}
		}
	}
);

Util = {
	getConfig: function(args) {
		var config = {};
		var firstArg = args[0];
		var firstConfigArg = 'boundingBox';

		var indexHeight = 2;
		var indexWidth = 1;
		var indexY = -1;

		if (isNumber(firstArg)) {
			firstConfigArg = 'x';
			indexHeight = 3;
			indexWidth = 2;
			indexY = 1;
		}

		config[firstConfigArg] = firstArg;

		config.height = args[indexHeight];
		config.width = args[indexWidth];
		config.y = args[indexY];

		return config;
	},

	translate: function(x, y) {
		if (x == null) {
			return {
				x: this._.tx,
				y: this._.ty,
				toString: Util.XYToString
			};
		}

		this._.tx += +x;
		this._.ty += +y;

		switch (this.type) {
			case 'circle':
			case 'ellipse':
				this.attr(
					{
						cx: +x + this.attrs.cx,
						cy: +y + this.attrs.cy
					}
				);
			break;

			case 'rect':
			case 'image':
			case 'text':
				this.attr(
					{
						x: +x + this.attrs.x,
						y: +y + this.attrs.y
					}
				);
			break;

			case 'path':
				var path = Util.pathToRelative(this.attrs.path);

				path[0][1] += +x;
				path[0][2] += +y;

				this.attr(
					{
						path: path
					}
				);
			break;
		}

		return this;
	}
};

Drawing.getColor = function(value) {
	var start = Drawing.getColor.start = Drawing.getColor.start || {
		h: 0,
		s: 1,
		b: value || 0.75
	};

	var rgb = ColorUtil.hsb2rgb(start.h, start.s, start.b);

	start.h += 0.075;

	if (start.h > 1) {
		start.h = 0;
		start.s -= 0.2;

		if (start.s <= 0) {
			Drawing.getColor.start = {
				h: 0,
				s: 1,
				b: start.b
			}
		}
	}

	return rgb.hex;
};

Drawing.getColor.reset = function() {
	delete Drawing.start;
};

Util.tear = function(el, drawing) {
	el == drawing.top && (drawing.top = el.prev);

	el == drawing.bottom && (drawing.bottom = el.next);

	el.next && (el.next.prev = el.prev);

	el.prev && (el.prev.next = el.next);
};

Util.toFront = function(el, drawing) {
	if (drawing.top === el) {
		return;
	}

	Util.tear(el, drawing);

	el.next = null;

	el.prev = drawing.top;

	drawing.top.next = el;

	drawing.top = el;
};

Util.toBack = function(el, drawing) {
	if (drawing.bottom === el) {
		return;
	}

	Util.tear(el, drawing);

	el.next = drawing.bottom;

	el.prev = null;

	drawing.bottom.prev = el;

	drawing.bottom = el;
};

Util.insertAfter = function(el, el2, drawing) {
	Util.tear(el, drawing);

	el2 == drawing.top && (drawing.top = el);

	el2.next && (el2.next.prev = el);

	el.next = el2.next;

	el.prev = el2;

	el2.next = el;
};

Util.insertBefore = function(el, el2, drawing) {
	Util.tear(el, drawing);

	el2 == drawing.bottom && (drawing.bottom = el);

	el2.prev && (el2.prev.next = el);

	el.prev = el2.prev;

	el2.prev = el;

	el.next = el2;
};

var Element = function(node, drawing) {
	var instance = this;

	instance.createElement.apply(instance, arguments);
};

Util.removed = function(methodname) {
	return function() {
		throw new Error('AlloyUI: you are calling to method "' + methodname + '" of removed object');
	};
};

Util._path2string = function() {
	return this.join(',').replace(REGEX_PATH_TO_STRING, '$1');
};

Util.parsePathString = A.cached(
	function(pathString) {
		if (!pathString) {
			return null;
		}

		var paramCounts = {
			a: 7,
			c: 6,
			h: 1,
			l: 2,
			m: 2,
			q: 4,
			s: 4,
			t: 2,
			v: 1,
			z: 0
		};

		var data = [];

		if (isArray(pathString) && isArray(pathString[0])) { // rough assumption
			data = pathClone(pathString);
		}

		if (!data.length) {
			String(pathString).replace(REGEX_PATH_COMMAND, function(a, b, c) {
				var params = [];
				var name = TO_LOWER_CASE.call(b);

				c.replace(
					REGEX_PATH_VALUES,
					function(a, b) {
						b && params.push(+b);
					}
				);

				if (name == 'm' && params.length > 2) {
					data.push([b].concat(params.splice(0, 2)));
					name = 'l';
					b = b == 'm' ? 'l' : 'L';
				}

				while (params.length >= paramCounts[name]) {
					data.push([b].concat(params.splice(0, paramCounts[name])));

					if (!paramCounts[name]) {
						break;
					}
				}
			});
		}

		data.toString = Util._path2string;

		return data;
	}
);

Util.findDotsAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
	var t1 = 1 - t;
	var x = MATH_POW(t1, 3) * p1x + MATH_POW(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + MATH_POW(t, 3) * p2x;
	var y = MATH_POW(t1, 3) * p1y + MATH_POW(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + MATH_POW(t, 3) * p2y;

	var mx = p1x + 2 * t * (c1x - p1x) + t * t * (c2x - 2 * c1x + p1x);
	var my = p1y + 2 * t * (c1y - p1y) + t * t * (c2y - 2 * c1y + p1y);
	var nx = c1x + 2 * t * (c2x - c1x) + t * t * (p2x - 2 * c2x + c1x);
	var ny = c1y + 2 * t * (c2y - c1y) + t * t * (p2y - 2 * c2y + c1y);

	var ax = (1 - t) * p1x + t * c1x;
	var ay = (1 - t) * p1y + t * c1y;
	var cx = (1 - t) * c2x + t * p2x;
	var cy = (1 - t) * c2y + t * p2y;

	var alpha = (90 - MATH.atan((mx - nx) / (my - ny)) * 180 / MATH.PI);

	if (mx > nx || my < ny) {
		alpha += 180;
	}

	return {
		x: x,
		y: y,
		m: {
			x: mx,
			y: my
		},
		n: {
			x: nx,
			y: ny
		},
		start: {
			x: ax,
			y: ay
		},
		end: {
			x: cx,
			y: cy
		},
		alpha: alpha
	};
};

Util.pathDimensions = A.cached(
	function(path) {
		if (!path) {
			return {x: 0, y: 0, width: 0, height: 0};
		}

		path = Util.path2curve(path);

		var x = 0;
		var y = 0;
		var X = [];
		var Y = [];
		var p;

		for (var i = 0, length = path.length; i < length; i++) {
			p = path[i];

			if (p[0] == "M") {
				x = p[1];
				y = p[2];
				X.push(x);
				Y.push(y);
			}
			else {
				var dim = Util.curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);

				X = X.concat(dim.min.x, dim.max.x);
				Y = Y.concat(dim.min.y, dim.max.y);
				x = p[5];
				y = p[6];
			}
		}
		var xmin = MATH_MIN.apply(0, X);
		var ymin = MATH_MIN.apply(0, Y);

		return {
			x: xmin,
			y: ymin,
			width: MATH_MAX.apply(0, X) - xmin,
			height: MATH_MAX.apply(0, Y) - ymin
		};
	}
);

Util.pathClone = function(pathArray) {
	var res = [];

	if (!isArray(pathArray) || !isArray(pathArray && pathArray[0])) { // rough assumption
		pathArray = Util.parsePathString(pathArray);
	}

	for (var i = 0, length = pathArray.length; i < length; i++) {
		res[i] = [];

		for (var j = 0, jLength = pathArray[i].length; j < jLength; j++) {
			res[i][j] = pathArray[i][j];
		}
	}

	res.toString = Util._path2string;

	return res;
};

Util._pathToRelative = A.cached(
	function(pathArray) {
		if (!isArray(pathArray) || !isArray(pathArray && pathArray[0])) { // rough assumption
			pathArray = Util.parsePathString(pathArray);
		}

		var res = [];
		var x = 0;
		var y = 0;
		var mx = 0;
		var my = 0;
		var start = 0;

		if (pathArray[0][0] == 'M') {
			x = pathArray[0][1];
			y = pathArray[0][2];
			mx = x;
			my = y;
			start++;

			res.push(['M', x, y]);
		}

		for (var i = start, length = pathArray.length; i < length; i++) {
			var r = res[i] = [];
			var pa = pathArray[i];

			if (pa[0] != TO_LOWER_CASE.call(pa[0])) {
				r[0] = TO_LOWER_CASE.call(pa[0]);

				switch (r[0]) {
					case 'a':
						r[1] = pa[1];
						r[2] = pa[2];
						r[3] = pa[3];
						r[4] = pa[4];
						r[5] = pa[5];
						r[6] = +(pa[6] - x).toFixed(3);
						r[7] = +(pa[7] - y).toFixed(3);
					break;

					case 'v':
						r[1] = +(pa[1] - y).toFixed(3);
					break;

					case 'm':
						mx = pa[1];
						my = pa[2];
					default:
						for (var j = 1, jLength = pa.length; j < jLength; j++) {
							r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
						}
				}
			}
			else {
				r = res[i] = [];

				if (pa[0] == 'm') {
					mx = pa[1] + x;
					my = pa[2] + y;
				}

				for (var k = 0, kLength = pa.length; k < kLength; k++) {
					res[i][k] = pa[k];
				}
			}

			var len = res[i].length;

			switch (res[i][0]) {
				case 'z':
					x = mx;
					y = my;
				break;

				case 'h':
					x += +res[i][len - 1];
				break;

				case 'v':
					y += +res[i][len - 1];
				break;

				default:
					x += +res[i][len - 2];
					y += +res[i][len - 1];
			}
		}

		res.toString = Util._path2string;

		return res;
	}
);

Util.pathToRelative = function(pathArray) {
	return Util.pathClone(Util._pathToRelative(pathArray));
};

Util._pathToAbsolute = A.cached(
	function(pathArray) {
		if (!isArray(pathArray) || !isArray(pathArray && pathArray[0])) { // rough assumption
			pathArray = Util.parsePathString(pathArray);
		}

		var res = [];
		var x = 0;
		var y = 0;
		var mx = 0;
		var my = 0;
		var start = 0;

		if (pathArray[0][0] == 'M') {
			x = +pathArray[0][1];
			y = +pathArray[0][2];
			mx = x;
			my = y;
			start++;

			res[0] = ['M', x, y];
		}

		for (var i = start, length = pathArray.length; i < length; i++) {
			var r = res[i] = [];
			var pa = pathArray[i];

			if (pa[0] != TO_UPPER_CASE.call(pa[0])) {
				r[0] = TO_UPPER_CASE.call(pa[0]);

				switch (r[0]) {
					case 'A':
						r[1] = pa[1];
						r[2] = pa[2];
						r[3] = pa[3];
						r[4] = pa[4];
						r[5] = pa[5];
						r[6] = +(pa[6] + x);
						r[7] = +(pa[7] + y);
					break;

					case 'V':
						r[1] = +pa[1] + y;
					break;

					case 'H':
						r[1] = +pa[1] + x;
					break;

					case 'M':
						mx = +pa[1] + x;
						my = +pa[2] + y;
					default:
						for (var j = 1, jLength = pa.length; j < jLength; j++) {
							r[j] = +pa[j] + ((j % 2) ? x : y);
						}
				}
			}
			else {
				for (var k = 0, kLength = pa.length; k < kLength; k++) {
					res[i][k] = pa[k];
				}
			}

			switch (r[0]) {
				case 'Z':
					x = mx;
					y = my;
				break;

				case 'H':
					x = r[1];
				break;

				case 'V':
					y = r[1];
				break;

				case 'M':
					mx = res[i][res[i].length - 2];
					my = res[i][res[i].length - 1];
				default:
					x = res[i][res[i].length - 2];
					y = res[i][res[i].length - 1];
			}
		}

		res.toString = Util._path2string;

		return res;
	}
);

Util.pathToAbsolute = function(pathArray) {
	return Util.pathClone(Util._pathToAbsolute(pathArray));
};

Util.lineToCubicCurve = function(x1, y1, x2, y2) {
	return [x1, y1, x2, y2, x2, y2];
};

Util.quadraticToCubicCurve = function(x1, y1, ax, ay, x2, y2) {
	var _13 = 1 / 3;
	var _23 = 2 / 3;

	return [
			_13 * x1 + _23 * ax,
			_13 * y1 + _23 * ay,
			_13 * x2 + _23 * ax,
			_13 * y2 + _23 * ay,
			x2,
			y2
		];
};

Util.arcToCubicCurve = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	// for more information of where this math came from visit:
	// http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
	var PI = MATH.PI;
	var _120 = PI * 120 / 180;
	var rad = PI / 180 * (+angle || 0);
	var res = [];
	var xy;
	var rotate = A.cached(
		function(x, y, rad) {
			var X = x * MATH.cos(rad) - y * MATH.sin(rad),
				Y = x * MATH.sin(rad) + y * MATH.cos(rad);
			return {x: X, y: Y};
		}
	);

	if (!recursive) {
		xy = rotate(x1, y1, -rad);
		x1 = xy.x;
		y1 = xy.y;
		xy = rotate(x2, y2, -rad);
		x2 = xy.x;
		y2 = xy.y;

		var cos = MATH.cos(PI / 180 * angle);
		var sin = MATH.sin(PI / 180 * angle);
		var x = (x1 - x2) / 2;
		var y = (y1 - y2) / 2;

		var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);

		if (h > 1) {
			h = MATH.sqrt(h);
			rx = h * rx;
			ry = h * ry;
		}

		var rx2 = rx * rx;
		var ry2 = ry * ry;
		var k = (large_arc_flag == sweep_flag ? -1 : 1) *
				MATH.sqrt(MATH.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
		var cx = k * rx * y / ry + (x1 + x2) / 2;
		var cy = k * -ry * x / rx + (y1 + y2) / 2;
		var f1 = MATH.asin(((y1 - cy) / ry).toFixed(7));
		var f2 = MATH.asin(((y2 - cy) / ry).toFixed(7));

		f1 = x1 < cx ? PI - f1 : f1;
		f2 = x2 < cx ? PI - f2 : f2;
		f1 < 0 && (f1 = PI * 2 + f1);
		f2 < 0 && (f2 = PI * 2 + f2);

		if (sweep_flag && f1 > f2) {
			f1 = f1 - PI * 2;
		}

		if (!sweep_flag && f2 > f1) {
			f2 = f2 - PI * 2;
		}
	}
	else {
		f1 = recursive[0];
		f2 = recursive[1];
		cx = recursive[2];
		cy = recursive[3];
	}

	var df = f2 - f1;

	if (MATH.abs(df) > _120) {
		var f2old = f2;
		var x2old = x2;
		var y2old = y2;

		f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
		x2 = cx + rx * MATH.cos(f2);
		y2 = cy + ry * MATH.sin(f2);

		res = Util.arcToCubicCurve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
	}

	df = f2 - f1;

	var c1 = MATH.cos(f1);
	var s1 = MATH.sin(f1);
	var c2 = MATH.cos(f2);
	var s2 = MATH.sin(f2);
	var t = MATH.tan(df / 4);

	var hx = 4 / 3 * rx * t;
	var hy = 4 / 3 * ry * t;

	var m1 = [x1, y1];
	var m2 = [x1 + hx * s1, y1 - hy * c1];

	var m3 = [x2 + hx * s2, y2 - hy * c2];
	var m4 = [x2, y2];

	m2[0] = 2 * m1[0] - m2[0];
	m2[1] = 2 * m1[1] - m2[1];

	if (recursive) {
		return [m2, m3, m4].concat(res);
	}
	else {
		res = [m2, m3, m4].concat(res).join().split(',');

		var newres = [];

		for (var i = 0, length = res.length; i < length; i++) {
			newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
		}

		return newres;
	}
};

Util.findDotAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
	var t1 = 1 - t;

	return {
		x: MATH_POW(t1, 3) * p1x + MATH_POW(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + MATH_POW(t, 3) * p2x,
		y: MATH_POW(t1, 3) * p1y + MATH_POW(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + MATH_POW(t, 3) * p2y
	};
};

Util.curveDim = A.cached(
	function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
		var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x);
		var b = 2 * (c1x - p1x) - 2 * (c2x - c1x);
		var c = p1x - c1x;

		var t1 = (-b + MATH.sqrt(b * b - 4 * a * c)) / 2 / a;
		var t2 = (-b - MATH.sqrt(b * b - 4 * a * c)) / 2 / a;

		var y = [p1y, p2y];
		var x = [p1x, p2x];
		var dot;

		MATH.abs(t1) > 1e12 && (t1 = 0.5);
		MATH.abs(t2) > 1e12 && (t2 = 0.5);

		if (t1 > 0 && t1 < 1) {
			dot = Util.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);

			x.push(dot.x);
			y.push(dot.y);
		}

		if (t2 > 0 && t2 < 1) {
			dot = Util.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);

			x.push(dot.x);
			y.push(dot.y);
		}

		a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
		b = 2 * (c1y - p1y) - 2 * (c2y - c1y);

		c = p1y - c1y;

		t1 = (-b + MATH.sqrt(b * b - 4 * a * c)) / 2 / a;

		t2 = (-b - MATH.sqrt(b * b - 4 * a * c)) / 2 / a;

		MATH.abs(t1) > 1e12 && (t1 = 0.5);
		MATH.abs(t2) > 1e12 && (t2 = 0.5);

		if (t1 > 0 && t1 < 1) {
			dot = Util.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
			x.push(dot.x);
			y.push(dot.y);
		}

		if (t2 > 0 && t2 < 1) {
			dot = Util.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
			x.push(dot.x);
			y.push(dot.y);
		}

		return {
			min: {
				x: MATH_MIN.apply(0, x),
				y: MATH_MIN.apply(0, y)
			},
			max: {
				x: MATH_MAX.apply(0, x),
				y: MATH_MAX.apply(0, y)
			}
		};
	}
);

Util._path2curve = A.cached(
	function(path, path2) {
		var p = Util.pathToAbsolute(path);
		var p2 = path2 && Util.pathToAbsolute(path2);

		var attrs = {
			x: 0,
			y: 0,
			bx: 0,
			by: 0,
			X: 0,
			Y: 0,
			qx: null,
			qy: null
		};

		var attrs2 = {
			x: 0,
			y: 0,
			bx: 0,
			by: 0,
			X: 0,
			Y: 0,
			qx: null,
			qy: null
		};

		var processPath = function(path, d) {
			var nx;
			var ny;

			if (!path) {
				return ['C', d.x, d.y, d.x, d.y, d.x, d.y];
			}

			if (!(path[0] in MAP_COMMAND_SVG_QUADRATIC)) {
				d.qx = d.qy = null
			}

			switch (path[0]) {
				case 'M':
					d.X = path[1];
					d.Y = path[2];
				break;

				case 'A':
					path = ['C'].concat(Util.arcToCubicCurve.apply(0, [d.x, d.y].concat(path.slice(1))));
				break;

				case 'S':
					nx = d.x + (d.x - (d.bx || d.x));
					ny = d.y + (d.y - (d.by || d.y));
					path = ['C', nx, ny].concat(path.slice(1));
				break;

				case 'T':
					d.qx = d.x + (d.x - (d.qx || d.x));
					d.qy = d.y + (d.y - (d.qy || d.y));
					path = ['C'].concat(Util.quadraticToCubicCurve(d.x, d.y, d.qx, d.qy, path[1], path[2]));
				break;

				case 'Q':
					d.qx = path[1];
					d.qy = path[2];
					path = ['C'].concat(Util.quadraticToCubicCurve(d.x, d.y, path[1], path[2], path[3], path[4]));
				break;

				case 'L':
					path = ['C'].concat(Util.lineToCubicCurve(d.x, d.y, path[1], path[2]));
				break;

				case 'H':
					path = ['C'].concat(Util.lineToCubicCurve(d.x, d.y, path[1], d.y));
				break;

				case 'V':
					path = ['C'].concat(Util.lineToCubicCurve(d.x, d.y, d.x, path[1]));
				break;

				case 'Z':
					path = ['C'].concat(Util.lineToCubicCurve(d.x, d.y, d.X, d.Y));
				break;
			}

			return path;
		};

		var fixArc = function(pp, i) {
			if (pp[i].length > 7) {
				pp[i].shift();

				var pi = pp[i];

				while (pi.length) {
					pp.splice(i++, 0, ['C'].concat(pi.splice(0, 6)));
				}

				pp.splice(i, 1);

				length = MATH_MAX(p.length, p2 && p2.length || 0);
			}
		};

		var fixM = function(path1, path2, a1, a2, i) {
			if (path1 && path2 && path1[i][0] == 'M' && path2[i][0] != 'M') {
				path2.splice(i, 0, ['M', a2.x, a2.y]);
				a1.bx = 0;
				a1.by = 0;

				a1.x = path1[i][1];
				a1.y = path1[i][2];

				length = MATH_MAX(p.length, p2 && p2.length || 0);
			}
		};

		for (var i = 0, length = MATH_MAX(p.length, p2 && p2.length || 0); i < length; i++) {
			p[i] = processPath(p[i], attrs);

			fixArc(p, i);

			p2 && (p2[i] = processPath(p2[i], attrs2));
			p2 && fixArc(p2, i);

			fixM(p, p2, attrs, attrs2, i);
			fixM(p2, p, attrs2, attrs, i);

			var seg = p[i];
			var seg2 = p2 && p2[i];
			var seglen = seg.length;
			var seg2len = p2 && seg2.length;

			attrs.x = seg[seglen - 2];
			attrs.y = seg[seglen - 1];

			attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
			attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;

			attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
			attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);

			attrs2.x = p2 && seg2[seg2len - 2];
			attrs2.y = p2 && seg2[seg2len - 1];
		}

		return p2 ? [p, p2] : p;
	}
);

Util.path2curve = function(path1, path2) {
	return Util.pathClone(Util._path2curve(path1, path2));
};

Util.parseDots = A.cached(
	function(gradient) {
		var dots = [];

		for (var i = 0, length = gradient.length; i < length; i++) {
			var dot = {};
			var par = gradient[i].match(REGEX_GRADIENT_VALUES);

			dot.color = ColorUtil.getRGB(par[1]);

			if (dot.color.error) {
				return null;
			}

			dot.color = dot.color.hex;

			par[2] && (dot.offset = par[2] + '%');

			dots.push(dot);
		}

		for (i = 1, length = dots.length - 1; i < length; i++) {
			if (!dots[i].offset) {
				var start = parseFloat(dots[i - 1].offset || 0);
				var end = 0;

				for (var j = i + 1; j < length; j++) {
					if (dots[j].offset) {
						end = dots[j].offset;
						break;
					}
				}

				if (!end) {
					end = 100;
					j = length;
				}

				end = parseFloat(end);

				var d = (end - start) / (j - i + 1);

				for (; i < j; i++) {
					start += d;
					dots[i].offset = start + '%';
				}

			}
		}

		return dots;
	}
);

Util.XYToString = function() {
	return this.x + STR_SPACE + this.y;
};

Util.getPointAtSegmentLength = A.cached(
	function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
		var len = 0;
		var old;

		for (var i = 0; i < 1.01; i+=.01) {
			var dot = Util.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, i);

			i && (len += MATH_POW(MATH_POW(old.x - dot.x, 2) + MATH_POW(old.y - dot.y, 2), 0.5));

			if (len >= length) {
				return dot;
			}

			old = dot;
		}
	}
);

var curvesLengths = {};

Util.getPointAtSegmentLength = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
	var len = 0;
	var precision = 100;
	var name = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y].join();
	var cache = curvesLengths[name];
	var old;
	var dot;

	if (!cache) {
		cache = {
			data: []
		};

		curvesLengths[name] = cache;
	}

	if (cache.timer) {
		clearTimeout(cache.timer);
	}

	cache.timer = setTimeout(
		function() {
			delete curvesLengths[name];
		},
		2000
	);

	if (length != null) {
		var total = getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);

		precision = ~~total * 10;
	}

	for (var i = 0; i < precision + 1; i++) {
		if (cache.data[length] > i) {
			dot = cache.data[i * precision];
		}
		else {
			dot = Util.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, i / precision);
			cache.data[i] = dot;
		}

		if (i) {
			len += MATH_POW(MATH_POW(old.x - dot.x, 2) + MATH_POW(old.y - dot.y, 2), 0.5);
		}

		if (length != null && len >= length) {
			return dot;
		}

		if (length == null) {
			return len;
		}
	}
};

Util.getLengthFactory = function(istotal, subpath) {
	return function(path, length, onlystart) {
		path = Util.path2curve(path);

		var x;
		var y;
		var p;
		var l;
		var sp = '';
		var subpaths = {};
		var point;
		var len = 0;

		for (var i = 0, length = path.length; i < length; i++) {
			p = path[i];

			if (p[0] == 'M') {
				x = +p[1];
				y = +p[2];
			}
			else {
				l = Util.getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);

				if (len + l > length) {
					if (subpath && !subpaths.start) {
						point = Util.getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
						sp += [
							'C',
							point.start.x,
							point.start.y,
							point.m.x,
							point.m.y,
							point.x,
							point.y
						];

						if (onlystart) {
							return sp;
						}

						subpaths.start = sp;

						sp = [
							'M',
							point.x,
							point.y + 'C',
							point.n.x,
							point.n.y,
							point.end.x,
							point.end.y,
							p[5],
							p[6]
						].join();

						len += l;
						x = +p[5];
						y = +p[6];

						continue;
					}

					if (!istotal && !subpath) {
						point = Util.getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
						return {
							x: point.x,
							y: point.y,
							alpha: point.alpha
						};
					}
				}

				len += l;
				x = +p[5];
				y = +p[6];
			}

			sp += p;
		}

		subpaths.end = sp;
		point = istotal ? len : subpath ? subpaths : Util.findDotsAtSegment(x, y, p[1], p[2], p[3], p[4], p[5], p[6], 1);

		point.alpha && (point = {
			x: point.x,
			y: point.y,
			alpha: point.alpha
		});

		return point;
	};
};

Util.getTotalLength = Util.getLengthFactory(1);
Util.getPointAtLength = Util.getLengthFactory();
Util.getSubpathsAtLength = Util.getLengthFactory(0, 1);

Util.applyAttributes = function(element, name, value) {
	var params;

	if (value != null) {
		params = {};

		params[name] = value;
	}
	else if (name != null && isObject(name)) {
		params = name;
	}

	var customAttributes = element.paper.customAttributes;

	for (var key in customAttributes) {
		if (
			customAttributes.hasOwnProperty(key) &&
			params.hasOwnProperty(key) &&
			isFunction(customAttributes[key])
		) {
			var subParams = customAttributes[key].apply(element, [].concat(params[key]));

			element.attrs[key] = params[key];

			for (var subKey in subParams) {
				if (subParams.hasOwnProperty(subKey)) {
					params[subKey] = subParams[subKey];
				}
			}
		}
	}

	return params;
};

Element.prototype = {
	attr: EMPTY_FN,
	blur: EMPTY_FN,
	clone: function() {
		if (this.removed) {
			return null;
		}

		var attr = this.attr();

		delete attr.scale;
		delete attr.translation;
		return this.paper[this.type]().attr(attr);
	},
	createElement: EMPTY_FN,
	detach: function(type, fn) {
		var instance = this;

		A.detach(Element._getEventType(type), fn, (instance.shape || instance.node || DOC));

		return instance;
	},

	getRegion: EMPTY_FN,

	getPointAtLength: function(length) {
		if (this.type != 'path') {
			return;
		}

		return Util.getPointAtLength(this.attrs.path, length);
	},
	getSubpath: function(from, to) {
		if (this.type != 'path') {
			return;
		}

		if (MATH.abs(this.getTotalLength() - to) < '1e-6') {
			return Util.getSubpathsAtLength(this.attrs.path, from).end;
		}

		var a = Util.getSubpathsAtLength(this.attrs.path, to, 1);

		return from ? Util.getSubpathsAtLength(a, from).end : a;
	},
	getTotalLength: function() {
		if (this.type != 'path') {
			return;
		}

		if (this.node.getTotalLength) {
			return this.node.getTotalLength();
		}

		return Util.getTotalLength(this.attrs.path);
	},
	hide: EMPTY_FN,
	hover: function(overFn, outFn) {
		return this.on('mouseover', overFn).on('mouseout', outFn);
	},
	insertAfter: EMPTY_FN,
	insertBefore: EMPTY_FN,
	on: function(type, fn, context) {
		var instance = this;

		var realType = Element._getEventType(type);

		A.on(realType, A.bind(fn, context || instance), instance.shape || instance.node || DOC, Element._getEventConfig(realType, type));

		return instance;
	},
	remove: EMPTY_FN,
	resetScale: function() {
		if (this.removed) {
			return this;
		}

		this._.sx = 1;
		this._.sy = 1;
		this.attrs.scale = '1 1';
	},
	rotate: EMPTY_FN,
	scale: function(x, y, cx, cy) {
		if (this.removed) {
			return this;
		}

		if (x == null && y == null) {
			return {
				x: this._.sx,
				y: this._.sy,
				toString: Util.XYToString
			};
		}

		y = y || x;

		!+y && (y = x);

		var dx;
		var dy;
		var dcx;
		var dcy;
		var a = this.attrs;

		if (x != 0) {
			var bb = this.getRegion();
			var rcx = bb.x + bb.width / 2;
			var rcy = bb.y + bb.height / 2;
			var kx = MATH.abs(x / this._.sx);
			var ky = MATH.abs(y / this._.sy);

			cx = (+cx || cx == 0) ? cx : rcx;
			cy = (+cy || cy == 0) ? cy : rcy;

			var posx = ~~(this._.sx > 0);
			var posy = ~~(this._.sy > 0);
			var dirx = ~~(x / MATH.abs(x));
			var diry = ~~(y / MATH.abs(y));
			var dkx = kx * dirx;
			var dky = ky * diry;
			var s = this.node.style;

			var ncx = cx + MATH.abs(rcx - cx) * dkx * (rcx > cx == posx ? 1 : -1);
			var ncy = cy + MATH.abs(rcy - cy) * dky * (rcy > cy == posy ? 1 : -1);
			var fr = (x * dirx > y * diry ? ky : kx);

			switch (this.type) {
				case 'rect':
				case 'image':
					var neww = a.width * kx;
					var newh = a.height * ky;

					this.attr({
						height: newh,
						r: a.r * fr,
						width: neww,
						x: ncx - neww / 2,
						y: ncy - newh / 2
					});
				break;

				case 'circle':
				case 'ellipse':
					this.attr({
						rx: a.rx * dirx * kx,
						ry: a.ry * diry * ky,
						r: a.r * MATH_MIN(dirx * kx, diry * ky),
						cx: ncx,
						cy: ncy
					});
				break;

				case 'text':
					this.attr({
						x: ncx,
						y: ncy
					});
				break;

				case 'path':
					var path = Util.pathToRelative(a.path);
					var skip = true;
					var fx = posx ? dkx : kx;
					var fy = posy ? dky : ky;

					for (var i = 0, length = path.length; i < length; i++) {
						var p = path[i];
						var P0 = TO_UPPER_CASE.call(p[0]);

						if (P0 == 'M' && skip) {
							continue;
						}
						else {
							skip = false;
						}

						if (P0 == 'A') {
							p[path[i].length - 2] *= fx;
							p[path[i].length - 1] *= fy;
							p[1] *= kx;
							p[2] *= ky;
							p[5] = +(dirx + diry ? !!+p[5] : !+p[5]);
						}
						else if (P0 == 'H') {
							for (var j = 1, jLength = p.length; j < jLength; j++) {
								p[j] *= fx;
							}
						}
						else if (P0 == 'V') {
							for (j = 1, jLength = p.length; j < jLength; j++) {
								p[j] *= fy;
							}
						 }
						else {
							for (j = 1, jLength = p.length; j < jLength; j++) {
								p[j] *= (j % 2) ? fx : fy;
							}
						}
					}

					var dim2 = Util.pathDimensions(path);

					dx = ncx - dim2.x - dim2.width / 2;
					dy = ncy - dim2.y - dim2.height / 2;

					path[0][1] += dx;
					path[0][2] += dy;

					this.attr({path: path});
				break;
			}

			if (this.type in MAP_TYPES_IMAGE_TEXT && (dirx != 1 || diry != 1)) {
				if (this.transformations) {
					this.transformations[2] = 'scale('.concat(dirx, ',', diry, ')');
					this.node.setAttribute('transform', this.transformations.join(STR_SPACE));

					dx = (dirx == -1) ? -a.x - (neww || 0) : a.x;
					dy = (diry == -1) ? -a.y - (newh || 0) : a.y;

					this.attr(
						{
							x: dx,
							y: dy
						}
					);

					a.fx = dirx - 1;
					a.fy = diry - 1;
				}
				else {
					this.node.filterMatrix = STR_MS_PROG_ID_PREFIX + '.Matrix(M11='.concat(dirx,
						', M12=0, M21=0, M22=', diry,
						', Dx=0, Dy=0, sizingmethod="auto expand", filtertype="bilinear")');

					s.filter = (this.node.filterMatrix || STR_EMPTY) + (this.node.filterOpacity || STR_EMPTY);
				}
			}
			else {
				if (this.transformations) {
					this.transformations[2] = STR_EMPTY;
					this.node.setAttribute('transform', this.transformations.join(STR_SPACE));

					a.fx = 0;
					a.fy = 0;
				}
				else {
					this.node.filterMatrix = STR_EMPTY;

					s.filter = (this.node.filterMatrix || STR_EMPTY) + (this.node.filterOpacity || STR_EMPTY);
				}
			}

			a.scale = [x, y, cx, cy].join(STR_SPACE);

			this._.sx = x;
			this._.sy = y;
		}

		return this;
	},
	show: EMPTY_FN,
	toBack: EMPTY_FN,
	toFront: EMPTY_FN,
	toString: function() {
		return '"' + TO_UPPER_CASE.call(this.type) + '": AlloyUI Drawing Element';
	},
	translate: EMPTY_FN,
	unhover: function(overFn, outFn) {
		return this.detach('mouseover', overFn).detach('mouseout', outFn);
	}
};

Element._getEventConfig = EMPTY_FN;

Element._getEventType = function(eventType) {
	return eventType;
};

Drawing.Element = Element;

var Set = A.Component.create(
	{
		NAME: 'set',

		EXTENDS: A.ArrayList,
		prototype: {
			pop: function() {
				var instance = this;

				return instance._items.pop();
			},
			push: function() {
				var instance = this;

				var items = instance._items;
				var args = arguments;
				var length = args.length;
				var item;

				for (var i = 0; i < length; i++) {
					item = args[i];

					if (item && item instanceof Element || item instanceof Set) {
						items[items.length] = args[i];
					}
				}

				return instance;
			},

			clone: function() {
				var instance = this;

				var setList = new Set();

				setList._items = instance._items;

				return setList;
			},

			invoke: function(methodName) {
				var instance = this;

				var args = Array.prototype.slice.call(arguments, 1);
				var item;
				var items = instance._items;

				for (var i = 0, length = items.length; i < length; i++) {
					item = items[i];

					if (methodName in item) {
						item[methodName].apply(items[i], args);
					}
				}

				return instance;
			}
		}
	}
);

Drawing.Set = Set;

Set.addMethod = function(method) {
	return A.ArrayList.addMethod(Drawing.Set.prototype, method);
};

var setListMethods = A.Object.keys(Element.prototype);

Set.addMethod(setListMethods);

Set.prototype.getRegion = Set.prototype.getBBox =  function() {
	var instance = this;

	var x = [];
	var y = [];
	var w = [];
	var h = [];

	var items = instance._items;

	for (var i = items.length; i--;) {
		var box = items[i].getRegion();

		x.push(box.x);
		y.push(box.y);

		w.push(box.x + box.width);
		h.push(box.y + box.height);
	}

	x = MATH_MIN.apply(0, x);
	y = MATH_MIN.apply(0, y);

	return {
		x: x,
		y: y,
		width: MATH_MAX.apply(0, w) - x,
		height: MATH_MAX.apply(0, h) - y
	};
};

Set.prototype.attr = function(name, value) {
	var instance = this;

	var items = instance._items;

	if (name && isArray(name) && isObject(name[0])) {
		for (var i = 0, length = name.length; i < length; i++) {
			items[i].attr(name[i]);
		}
	}
	else {
		for (var i = 0, length = items.length; i < length; i++) {
			items[i].attr(name, value);
		}
	}

	return instance;
};

Set.prototype.toString = function() {
	return this._items.join(',');
};

// Expose shared object/common constants
Drawing.REGEX_ISURL = REGEX_ISURL;
Drawing.REGEX_SEPARATOR = REGEX_SEPARATOR;
Drawing.REGEX_SEPARATOR_GRADIENT = REGEX_SEPARATOR_GRADIENT;
Drawing.REGEX_RADIAL_GRADIENT = REGEX_RADIAL_GRADIENT;

Drawing.MAP_ATTRS_AVAILABLE = MAP_ATTRS_AVAILABLE;
Drawing.MAP_TYPES_IMAGE_TEXT = MAP_TYPES_IMAGE_TEXT;
Drawing.MAP_TYPES_CIRCLE_ELLIPSE = MAP_TYPES_CIRCLE_ELLIPSE;

Drawing.STR_EMPTY = STR_EMPTY;
Drawing.STR_FILL = STR_FILL;
Drawing.STR_SPACE = STR_SPACE;
Drawing.STR_MS_PROG_ID_PREFIX = STR_MS_PROG_ID_PREFIX;

Drawing.Util = Util;
Drawing.Element = Element;

A.Drawing = Drawing;

}, '@VERSION@' ,{requires:['aui-base','aui-color-util','substitute']});
