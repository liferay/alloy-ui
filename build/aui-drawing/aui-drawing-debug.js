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
AUI.add('aui-drawing-vml', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isNumber = Lang.isNumber,
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

	setDefaultUnit = function(value) {
		return isNumber(value) ? value + 'px' : value;
	},

	DEFAULT_VML_COORD_SIZE = 1e3 + STR_SPACE + 1e3,

	DRAWING_PROTOTYPE = Drawing.prototype,
	ELEMENT_PROTOTYPE = Element.prototype,

	MAP_ATTRS_AVAILABLE = Drawing.MAP_ATTRS_AVAILABLE,

	MAP_PATH_LIKE = {
		path: 1,
		rect: 1
	},

	MAP_COMMAND_VML = {
		M: 'm',
		L: 'l',
		C: 'c',
		Z: 'x',
		m: 't',
		l: 'r',
		c: 'v',
		z: 'x'
	},

	MAP_KEYWORDS_VML_STROKE_DASH_ARRAY = {
		'-': 'shortdash',
		'.': 'shortdot',
		'-.': 'shortdashdot',
		'-..': 'shortdashdotdot',
		'. ': 'dot',
		'- ': 'dash',
		'--': 'longdash',
		'- .': 'dashdot',
		'--.': 'longdashdot',
		'--..': 'longdashdotdot'
	},

	MAP_TYPES_CIRCLE_ELLIPSE = Drawing.MAP_TYPES_CIRCLE_ELLIPSE,

	MATH = Math,
	MATH_POW = MATH.pow,
	MATH_ROUND = MATH.round,

	STR_MS_PROG_ID_PREFIX = Drawing.STR_MS_PROG_ID_PREFIX,

	REGEX_ISURL = Drawing.REGEX_ISURL,
	REGEX_RADIAL_GRADIENT = Drawing.REGEX_RADIAL_GRADIENT,
	REGEX_SEPARATOR = Drawing.REGEX_SEPARATOR,
	REGEX_SEPARATOR_GRADIENT = Drawing.REGEX_SEPARATOR_GRADIENT,

	REGEX_VML_BITES = /([clmz]),?([^clmz]*)/gi,
	REGEX_VML_VAL = /-?[^,\s-]+/g,
	REGEX_VML_BLUR = / progid:\S+Blur\([^\)]+\)/g,

	STR_EMPTY = Drawing.STR_EMPTY,
	STR_FILL = Drawing.STR_FILL,
	STR_SPACE = Drawing.STR_SPACE,

	TEXT_LEADING = 1.2,

	TPL_RECTANGLE = 'M{0},{1}l{2},0,0,{3},{4},0z',

	TPL_RECTANGLE_ROUNDED_CORNER = 'M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z',
	TPL_CSS_TEXT_DEFAULT = 'position: absolute; left: -9999em; top: -9999em; padding: 0; margin: 0; line-height: 1; display: inline;',
	TPL_CSS_TEXT_CANVAS = 'display: inline-block; position: relative; clip: rect(0 {1} {0} 0); overflow: hidden; height: {0}; width: {1};',
	TPL_CSS_TEXT_ELEMENT = 'position: absolute; left: 0; top: 0; height: {0}; width: {1};',

	TO_LOWER_CASE = String.prototype.toLowerCase,
	TO_UPPER_CASE = String.prototype.toUpperCase,

	ZOOM = 10;

DOC.createStyleSheet().addRule('.rvml', 'behavior:url(#default#VML)');

try {
	if (!DOC.namespaces.rvml) {
		DOC.namespaces.add('rvml', 'urn:schemas-microsoft-com:vml');
	}

	Util.CREATE_ELEMENT = function(tagName) {
		return DOC.createElement('<rvml:' + tagName + ' class="rvml">');
	};
} catch (e) {
	Util.CREATE_ELEMENT = function(tagName) {
		return DOC.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
	};
}

Util.path2vml = function(path) {
	var total =  /[ahqstv]/ig;
	var command = Util.pathToAbsolute;
	var res;

	if (String(path).match(total)) {
		command = Util.path2curve;
	}

	total = /[clmz]/g;

	if (command == Util.pathToAbsolute && !String(path).match(total)) {
		res = String(path).replace(
			REGEX_VML_BITES,
			function(all, command, args) {
				var vals = [];
				var isMove = TO_LOWER_CASE.call(command) == 'm';
				var res = MAP_COMMAND_VML[command];

				args.replace(
					REGEX_VML_VAL,
					function(value) {
						if (isMove && vals.length == 2) {
							res += vals + MAP_COMMAND_VML[command == 'm' ? 'l' : 'L'];
							vals = [];
						}
						vals.push(MATH_ROUND(value * ZOOM));
					}
				);

				return res + vals;
			}
		);

		return res;
	}

	var pa = command(path);
	var p;
	var r;

	res = [];

	for (var i = 0, length = pa.length; i < length; i++) {
		p = pa[i];
		r = TO_LOWER_CASE.call(pa[i][0]);

		if (r == 'z') {
			r = 'x';
		}

		for (var j = 1, pLength = p.length; j < pLength; j++) {
			r += MATH_ROUND(p[j] * ZOOM) + (j != pLength - 1 ? ',' : STR_EMPTY);
		}

		res.push(r);
	}

	return res.join(STR_SPACE);
};

Util.rectPath = function(x, y, w, h, r) {
	if (r) {
		return Lang.sub(
			TPL_RECTANGLE_ROUNDED_CORNER,
			[
				x + r,
				y,
				w - r * 2,
				r,
				-r,
				h - r * 2,
				r * 2 - w,
				r * 2 - h
			]
		);
	}
	else {
		return Lang.sub(
			TPL_RECTANGLE,
			[
				x,
				y,
				w,
				h,
				-w
			]
		);
	}
};

Impl = Drawing.Impl = {
	addGradientFill: function(obj, gradient) {
		obj.attrs = obj.attrs || {};

		var attrs = obj.attrs;
		var fill;
		var type = 'linear';
		var fxfy = '.5 .5';
		var angle;

		obj.attrs.gradient = gradient;

		gradient = String(gradient).replace(REGEX_RADIAL_GRADIENT, function(all, fx, fy) {
			type = 'radial';

			if (fx && fy) {
				fx = parseFloat(fx);
				fy = parseFloat(fy);

				if (MATH_POW(fx - 0.5, 2) + MATH_POW(fy - 0.5, 2) > 0.25) {
					fy = MATH.sqrt(0.25 - MATH_POW(fx - 0.5, 2)) * ((fy > 0.5) * 2 - 1) + 0.5;
				}

				fxfy = fx + STR_SPACE + fy;
			}

			return STR_EMPTY;
		});

		gradient = gradient.split(REGEX_SEPARATOR_GRADIENT);

		if (type == 'linear') {
			angle = gradient.shift();

			angle = -parseFloat(angle);

			if (isNaN(angle)) {
				return null;
			}
		}

		var dots = Util.parseDots(gradient);

		if (!dots) {
			return null;
		}

		obj = obj.shape || obj.node;

		fill = obj.getElementsByTagName(STR_FILL)[0] || Util.CREATE_ELEMENT(STR_FILL);

		if (!fill.parentNode) {
			obj.appendChild(fill);
		}

		if (dots.length) {
			fill.on = true;
			fill.method = 'none';

			fill.color = dots[0].color;
			fill.color2 = dots[dots.length - 1].color;

			var colors = [];

			for (var i = 0, length = dots.length; i < length; i++) {
				if (dots[i].offset) {
					colors.push(dots[i].offset + STR_SPACE + dots[i].color);
				}
			}

			if (fill.colors) {
				fill.colors.value = colors.length ? colors.join() : '0% ' + fill.color;
			}

			if (type == 'radial') {
				fill.type = 'gradientradial';
				fill.focus = '100%';
				fill.focussize = fxfy;
				fill.focusposition = fxfy;
			}
			else {
				fill.type = 'gradient';
				fill.angle = (270 - angle) % 360;
			}
		}

		return 1;
	},

	clear: function() {
		var instance = this;

		instance.canvas.innerHTML = STR_EMPTY;

		instance.span = DOC.createElement('span');

		instance.span.style.cssText = TPL_CSS_TEXT_DEFAULT;

		instance.canvas.appendChild(instance.span);

		instance.bottom = instance.top = null;
	},

	createCanvas: function() {
		var instance = this;

		var contentBox = instance.get('contentBox');

		var x = instance.get('x');
		var y = instance.get('y');
		var width = setDefaultUnit(instance.get('width'));
		var height = setDefaultUnit(instance.get('height'));

		var canvas = DOC.createElement('div');

		instance.set('width', 1e3);
		instance.set('height', 1e3);

		instance.coordsize = ZOOM * 1e3 + STR_SPACE + ZOOM * 1e3;
		instance.coordorigin = '0 0';

		var span = DOC.createElement('span');
		span.style.cssText = TPL_CSS_TEXT_DEFAULT;

		canvas.appendChild(span);

		instance.span = span;
		instance.canvas = canvas;

		var canvasStyle = canvas.style;

		canvas.style.cssText = Lang.sub(TPL_CSS_TEXT_CANVAS, [height, width]);

		contentBox.prepend(canvas);
	},

	createCircle: function(x, y, r) {
		var instance = this;

		var group = Util.CREATE_ELEMENT('group');
		var oval = Util.CREATE_ELEMENT('oval');
		var ovalStyle = oval.style;

		group.style.cssText = Lang.sub(TPL_CSS_TEXT_ELEMENT, [setDefaultUnit(instance.get('height')), setDefaultUnit(instance.get('width'))]);
		group.coordsize = DEFAULT_VML_COORD_SIZE;
		group.coordorigin = instance.coordorigin;
		group.appendChild(oval);

		var circle = new Element(oval, group, instance);

		circle.type = 'circle';

		Impl.setFillAndStroke(
			circle,
			{
				stroke: '#000',
				fill: 'none'
			}
		);

		circle.attrs.cx = x;
		circle.attrs.cy = y;
		circle.attrs.r = r;

		circle.setBox(
			{
				x: x - r,
				y: y - r,
				width: r * 2,
				height: r * 2
			}
		);

		instance.canvas.appendChild(group);

		return circle;
	},

	createEllipse: function(x, y, rx, ry) {
		var instance = this;

		var group = Util.CREATE_ELEMENT('group');
		var oval = Util.CREATE_ELEMENT('oval');

		group.style.cssText = Lang.sub(TPL_CSS_TEXT_ELEMENT, [setDefaultUnit(instance.get('height')), setDefaultUnit(instance.get('width'))]);
		group.coordsize = DEFAULT_VML_COORD_SIZE;
		group.coordorigin = instance.coordorigin;
		group.appendChild(oval);

		var ellipse = new Element(oval, group, instance);

		ellipse.type = 'ellipse';

		Impl.setFillAndStroke(
			ellipse,
			{
				stroke: '#000'
			}
		);

		ellipse.attrs.cx = x;
		ellipse.attrs.cy = y;
		ellipse.attrs.rx = rx;
		ellipse.attrs.ry = ry;

		ellipse.setBox(
			{
				x: x - rx,
				y: y - ry,
				width: rx * 2,
				height: ry * 2
			}
		);

		instance.canvas.appendChild(group);

		return ellipse;
	},

	createImage: function(src, x, y, w, h) {
		var instance = this;

		var group = Util.CREATE_ELEMENT('group');
		var oval = Util.CREATE_ELEMENT('image');
		var ovalStyle = oval.style;

		group.style.cssText = Lang.sub(TPL_CSS_TEXT_ELEMENT, [setDefaultUnit(instance.get('height')), setDefaultUnit(instance.get('width'))]);
		group.coordsize = DEFAULT_VML_COORD_SIZE;
		group.coordorigin = instance.coordorigin;

		oval.src = src;

		group.appendChild(oval);

		var ellipse = new Element(oval, group, instance);

		ellipse.type = 'image';
		ellipse.attrs.src = src;
		ellipse.attrs.x = x;
		ellipse.attrs.y = y;
		ellipse.attrs.w = w;
		ellipse.attrs.h = h;

		ellipse.setBox(
			{
				x: x,
				y: y,
				width: w,
				height: h
			}
		);

		instance.canvas.appendChild(group);

		return ellipse;
	},

	createPath: function(pathString) {
		var instance = this;

		var group = Util.CREATE_ELEMENT('group');

		group.style.cssText = Lang.sub(TPL_CSS_TEXT_ELEMENT, [setDefaultUnit(instance.get('height')), setDefaultUnit(instance.get('width'))]);
		group.coordsize = instance.coordsize;
		group.coordorigin = instance.coordorigin;

		var el = Util.CREATE_ELEMENT('shape');
		var shapeStyle = el.style;

		shapeStyle.width = instance.get('width') + 'px';
		shapeStyle.height = instance.get('height') + 'px';

		el.coordsize = DEFAULT_VML_COORD_SIZE;
		el.coordorigin = instance.coordorigin;

		group.appendChild(el);

		var path = new Element(el, group, instance);

		var attr = {
			fill: 'none',
			stroke: '#000'
		};

		if (pathString) {
			attr.path = pathString;
		}

		path.isAbsolute = true;
		path.type = 'path';
		path.path = [];
		path.Path = STR_EMPTY;

		Impl.setFillAndStroke(path, attr);

		instance.canvas.appendChild(group);

		return path;
	},

	createRectangle: function(x, y, w, h, r) {
		var instance = this;

		var path = Util.rectPath(x, y, w, h, r);
		var rect = instance.path(path);
		var attrs = rect.attrs;

		rect.X = attrs.x = x;
		rect.Y = attrs.y = y;
		rect.W = attrs.width = w;
		rect.H = attrs.height = h;

		attrs.r = r;
		attrs.path = path;

		rect.type = 'rect';

		return rect;
	},

	createText: function(x, y, text) {
		var instance = this;

		var group = Util.CREATE_ELEMENT('group');
		var el = Util.CREATE_ELEMENT('shape');
		var shapeStyle = el.style;
		var path = Util.CREATE_ELEMENT('path');
		var ps = path.style;
		var textpath = Util.CREATE_ELEMENT('textpath');

		var width = setDefaultUnit(instance.get('width'));
		var height = setDefaultUnit(instance.get('height'));

		group.style.cssText = Lang.sub(TPL_CSS_TEXT_ELEMENT, [height, width]);
		group.coordsize = DEFAULT_VML_COORD_SIZE;
		group.coordorigin = instance.coordorigin;

		path.v = Lang.sub(
			'm{0},{1}l{2},{1}',
			[
				MATH_ROUND(x * 10),
				MATH_ROUND(y * 10),
				MATH_ROUND(x * 10) + 1
			]
		);

		path.textpathok = true;

		shapeStyle.width = width;
		shapeStyle.height = height;

		textpath.string = String(text);
		textpath.on = true;

		el.appendChild(textpath);
		el.appendChild(path);

		group.appendChild(el);

		var textElement = new Element(textpath, group, instance);

		textElement.shape = el;
		textElement.textpath = path;
		textElement.type = 'text';
		textElement.attrs.text = text;
		textElement.attrs.x = x;
		textElement.attrs.y = y;
		textElement.attrs.w = 1;
		textElement.attrs.h = 1;

		Impl.setFillAndStroke(
			textElement,
			{
				font: MAP_ATTRS_AVAILABLE.font,
				stroke: 'none',
				fill: '#000'
			}
		);

		textElement.setBox();

		instance.canvas.appendChild(group);

		return textElement;
	},

	remove: function() {
		var instance = this;

		instance.canvas.parentNode.removeChild(instance.canvas);

		for (var i in instance) {
			if (DRAWING_PROTOTYPE.hasOwnProperty(i)) {
				instance[i] = Util.removed(i);
			}
		}

		return true;
	},

	setFillAndStroke: function(obj, params) {
		obj.attrs = obj.attrs || {};

		var node = obj.node;
		var a = obj.attrs;

		var nodeStyle = node.style;
		var xy;

		var newpath = (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.r != a.r) && obj.type == 'rect';

		var res = obj;

		for (var par in params) {
			if (params.hasOwnProperty(par)) {
				a[par] = params[par];
			}
		}

		if (newpath) {
			a.path = Util.rectPath(a.x, a.y, a.width, a.height, a.r);
			obj.X = a.x;
			obj.Y = a.y;
			obj.W = a.width;
			obj.H = a.height;
		}

		if (params.href) {
			node.href = params.href;
		}

		if (params.title) {
			node.title = params.title;
		}

		if (params.target) {
			node.target = params.target;
		}

		if (params.cursor) {
			nodeStyle.cursor = params.cursor;
		}

		if ('blur' in params) {
			obj.blur(params.blur);
		}

		if (params.path && obj.type == 'path' || newpath) {
			node.path = Util.path2vml(a.path);
		}

		if (params.rotation != null) {
			obj.rotate(params.rotation, true);
		}

		if (params.translation) {
			xy = String(params.translation).split(REGEX_SEPARATOR);

			Util.translate.call(obj, xy[0], xy[1]);

			if (obj._.rt.cx != null) {
				obj._.rt.cx +=+ xy[0];
				obj._.rt.cy +=+ xy[1];

				obj.setBox(obj.attrs, xy[0], xy[1]);
			}
		}

		if (params.scale) {
			xy = String(params.scale).split(REGEX_SEPARATOR);
			obj.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1, +xy[2] || null, +xy[3] || null);
		}

		if ('clip-rect' in params) {
			var rect = String(params['clip-rect']).split(REGEX_SEPARATOR);

			if (rect.length == 4) {
				rect[2] = +rect[2] + (+rect[0]);
				rect[3] = +rect[3] + (+rect[1]);

				var div = node.clipRect || DOC.createElement('div');
				var dstyle = div.style;
				var group = node.parentNode;

				dstyle.clip = Lang.sub('rect({1}px {2}px {3}px {0}px)', rect);

				if (!node.clipRect) {
					dstyle.position = 'absolute';
					dstyle.top = 0;
					dstyle.left = 0;

					dstyle.width = obj.paper.get('width') + 'px';
					dstyle.height = obj.paper.get('height') + 'px';

					group.parentNode.insertBefore(div, group);

					div.appendChild(group);
					node.clipRect = div;
				}
			}

			if (!params['clip-rect'] && node.clipRect) {
				node.clipRect.style.clip = STR_EMPTY;
			}
		}

		if (obj.type == 'image' && params.src) {
			node.src = params.src;
		}

		if (obj.type == 'image' && params.opacity) {
			node.filterOpacity = STR_MS_PROG_ID_PREFIX + '.Alpha(opacity=' + (params.opacity * 100) + ')';

			nodeStyle.filter = (node.filterMatrix || STR_EMPTY) + (node.filterOpacity || STR_EMPTY);
		}

		if (params.font) {
			nodeStyle.font = params.font;
		}

		if (params['font-family']) {
			nodeStyle.fontFamily = '"' + params['font-family'].split(',')[0].replace(/^['"]+|['"]+$/g, STR_EMPTY) + '"';
		}

		if (params['font-size']) {
			nodeStyle.fontSize = params['font-size'];
		}

		if (params['font-weight']) {
			nodeStyle.fontWeight = params['font-weight'];
		}

		if (params['font-style']) {
			nodeStyle.fontStyle = params['font-style'];
		}

		if (params.opacity != null ||
			params['stroke-width'] != null ||
			params.fill != null ||
			params.stroke != null ||
			params['stroke-width'] != null ||
			params['stroke-opacity'] != null ||
			params['fill-opacity'] != null ||
			params['stroke-dasharray'] != null ||
			params['stroke-miterlimit'] != null ||
			params['stroke-linejoin'] != null ||
			params['stroke-linecap'] != null) {

			node = obj.shape || node;

			var fill = (node.getElementsByTagName(STR_FILL) && node.getElementsByTagName(STR_FILL)[0]);
			var newfill = false;
			var opacity;

			if (!fill) {
				newfill = fill = Util.CREATE_ELEMENT(STR_FILL);
			}

			if ('fill-opacity' in params || 'opacity' in params) {
				opacity = ((+a['fill-opacity'] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+ColorUtil.getRGB(params.fill).o + 1 || 2) - 1);

				if (opacity < 0) {
					opacity = 0;
				}
				else if (opacity > 1) {
					opacity = 1;
				}

				fill.opacity = opacity;
			}

			if (params.fill) {
				fill.on = true;
			}

			if (fill.on == null || params.fill == 'none') {
				fill.on = false;
			}

			if (fill.on && params.fill) {
				var isURL = params.fill.match(REGEX_ISURL);

				if (isURL) {
					fill.src = isURL[1];
					fill.type = 'tile';
				}
				else {
					var fillColor = ColorUtil.getRGB(params.fill);

					fill.color = fillColor.hex;
					fill.src = STR_EMPTY;
					fill.type = 'solid';

					if (
						fillColor.error &&
						(res.type in MAP_TYPES_CIRCLE_ELLIPSE || String(params.fill).charAt(0) != 'r') &&
						Impl.addGradientFill(res, params.fill)
					) {
						a.fill = 'none';
						a.gradient = params.fill;
					}
				}
			}

			if (newfill) {
				node.appendChild(fill);
			}

			var stroke = (node.getElementsByTagName('stroke') && node.getElementsByTagName('stroke')[0]);
			var newstroke = false;

			if (!stroke) {
				newstroke = stroke = Util.CREATE_ELEMENT('stroke');
			}

			if ((params.stroke && params.stroke != 'none') ||
				params['stroke-width'] ||
				params['stroke-opacity'] != null ||
				params['stroke-dasharray'] ||
				params['stroke-miterlimit'] ||
				params['stroke-linejoin'] ||
				params['stroke-linecap']) {

				stroke.on = true;
			}

			if (params.stroke == 'none' || stroke.on == null || params.stroke == 0 || params['stroke-width'] == 0) {
				stroke.on = false;
			}

			var strokeColor = ColorUtil.getRGB(params.stroke);

			if (stroke.on && params.stroke) {
				stroke.color = strokeColor.hex;
			}

			opacity = ((+a['stroke-opacity'] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);

			var width = (parseFloat(params['stroke-width']) || 1) * 0.75;

			if (opacity < 0) {
				opacity = 0;
			}
			else if (opacity > 1) {
				opacity = 1;
			}

			if (params['stroke-width'] == null) {
				width = a['stroke-width'];
			}

			if (params['stroke-width']) {
				stroke.weight = width;
			}

			if (width && width < 1 && (opacity *= width)) {
				stroke.weight = 1;
			}

			stroke.opacity = opacity;

			if (params['stroke-linejoin']) {
				stroke.joinstyle = params['stroke-linejoin'] || 'miter';
			}

			stroke.miterlimit = params['stroke-miterlimit'] || 8;

			var paramStrokeLinecap = params['stroke-linecap'];

			if (paramStrokeLinecap) {
				stroke.endcap = 'round';

				if (paramStrokeLinecap == 'butt') {
					 stroke.endcap = 'flat';
				}
				else if (paramStrokeLinecap == 'square') {
					stroke.endcap = paramStrokeLinecap;
				}
			}

			var paramStrokeDashArray = params['stroke-dasharray'];

			if (paramStrokeDashArray) {
				stroke.dashstyle = STR_EMPTY;

				if (MAP_KEYWORDS_VML_STROKE_DASH_ARRAY.hasOwnProperty(paramStrokeDashArray)) {
					stroke.dashstyle = MAP_KEYWORDS_VML_STROKE_DASH_ARRAY[params['stroke-dasharray']];
				}
			}

			if (newstroke) {
				node.appendChild(stroke);
			}
		}

		if (res.type == 'text') {
			nodeStyle = res.paper.span.style;

			if (a.font) {
				nodeStyle.font = a.font;
			}

			if (a['font-family']) {
				nodeStyle.fontFamily = a['font-family'];
			}

			if (a['font-size']) {
				nodeStyle.fontSize = a['font-size'];
			}

			if (a['font-weight']) {
				nodeStyle.fontWeight = a['font-weight'];
			}

			if (a['font-style']) {
				nodeStyle.fontStyle = a['font-style'];
			}

			if (res.node.string) {
				res.paper.span.innerHTML = String(res.node.string).replace(/</g, '&#60;').replace(/&/g, '&#38;').replace(/\n/g, '<br>');
			}

			res.W = a.w = res.paper.span.offsetWidth;
			res.H = a.h = res.paper.span.offsetHeight;
			res.X = a.x;
			res.Y = a.y + MATH_ROUND(res.H / 2);

			// text-anchor emulation
			switch (a['text-anchor']) {
				case 'start':
					res.node.style['v-text-align'] = 'left';
					res.bbx = MATH_ROUND(res.W / 2);
				break;

				case 'end':
					res.node.style['v-text-align'] = 'right';
					res.bbx = -MATH_ROUND(res.W / 2);
				break;

				default:
					res.node.style['v-text-align'] = 'center';
				break;
			}
		}
	}
};

ELEMENT_PROTOTYPE.createElement = function(node, group, drawing) {
	var instance = this;

	instance[0] = node;
	instance.id = A.guid();

	instance.node = node;

	instance.X = 0;
	instance.Y = 0;

	instance.attrs = {};
	instance.Group = group;
	instance.paper = drawing;

	instance._ = {
		tx: 0,
		ty: 0,
		rt: {
			deg: 0
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
	if (this.removed) {
		return this;
	}

	if (deg == null) {
		if (this._.rt.cx) {
			return [
				this._.rt.deg,
				this._.rt.cx,
				this._.rt.cy
			].join(STR_SPACE);
		}

		return this._.rt.deg;
	}

	deg = String(deg).split(REGEX_SEPARATOR);

	if (deg.length - 1) {
		cx = parseFloat(deg[1]);
		cy = parseFloat(deg[2]);
	}

	deg = parseFloat(deg[0]);

	if (cx != null) {
		this._.rt.deg = deg;
	}
	else {
		this._.rt.deg += deg;
	}

	if (cy == null) {
		cx = null;
	}

	this._.rt.cx = cx;
	this._.rt.cy = cy;

	this.setBox(this.attrs, cx, cy);

	this.Group.style.rotation = this._.rt.deg;

	// gradient fix for rotation. TODO
	// var fill = (this.shape || this.node).getElementsByTagName(STR_FILL);
	// fill = fill[0] || {};
	// var b = ((360 - this._.rt.deg) - 270) % 360;
	// !R.is(fill.angle, "undefined") && (fill.angle = b);

	return this;
};

ELEMENT_PROTOTYPE.setBox = function(params, cx, cy) {
	if (this.removed) {
		return this;
	}

	var gs = this.Group.style;
	var os = (this.shape && this.shape.style) || this.node.style;

	params = params || {};

	for (var i in params) {
		if (params.hasOwnProperty(i)) {
			this.attrs[i] = params[i];
		}
	}

	cx = cx || this._.rt.cx;
	cy = cy || this._.rt.cy;

	var attr = this.attrs;
	var x;
	var y;
	var w;
	var h;

	switch (this.type) {
		case 'circle':
			x = attr.cx - attr.r;
			y = attr.cy - attr.r;
			w = h = attr.r * 2;
		break;

		case 'ellipse':
			x = attr.cx - attr.rx;
			y = attr.cy - attr.ry;
			w = attr.rx * 2;
			h = attr.ry * 2;
		break;

		case 'image':
			x = +attr.x;
			y = +attr.y;
			w = attr.width || 0;
			h = attr.height || 0;
		break;

		case 'text':
			this.textpath.v = [
				'm', MATH_ROUND(attr.x),
				', ',
				MATH_ROUND(attr.y - 2),
				'l',
				MATH_ROUND(attr.x) + 1,
				', ',
				MATH_ROUND(attr.y - 2)
			].join(STR_EMPTY);

			x = attr.x - MATH_ROUND(this.W / 2);
			y = attr.y - this.H / 2;
			w = this.W;
			h = this.H;

		break;

		case 'rect':
		case 'path':
			if (!this.attrs.path) {
				x = 0;
				y = 0;
				w = this.paper.get('width');
				h = this.paper.get('height');
			}
			else {
				var dim = Util.pathDimensions(this.attrs.path);

				x = dim.x;
				y = dim.y;
				w = dim.width;
				h = dim.height;
			}
		break;

		default:
			x = 0;
			y = 0;
			w = this.paper.get('width');
			h = this.paper.get('height');
		break;
	}

	cx = (cx == null) ? x + w / 2 : cx;
	cy = (cy == null) ? y + h / 2 : cy;

	var paperWidth = this.paper.get('width');
	var paperHeight = this.paper.get('height');

	var left = cx - paperWidth / 2;
	var top = cy - paperHeight / 2;
	var t;

	if (gs.left != (t = left + 'px')) {
		gs.left = t;
	}

	if (gs.top != (t = top + 'px')) {
		gs.top = t;
	}

	this.X = MAP_PATH_LIKE.hasOwnProperty(this.type) ? -left : x;
	this.Y = MAP_PATH_LIKE.hasOwnProperty(this.type) ? -top : y;

	this.W = w;
	this.H = h;

	if (MAP_PATH_LIKE.hasOwnProperty(this.type)) {
		if (os.left != (t = -left * ZOOM + 'px')) {
			os.left = t;
		}

		if (os.top != (t = -top * ZOOM + 'px')) {
			os.top = t;
		}
	}
	else if (this.type == 'text') {
		if (os.left != (t = -left + 'px')) {
			os.left = t;
		}

		if (os.top != (t = -top + 'px')) {
			os.top = t;
		}
	}
	else {
		if (gs.width != (t = paperWidth + 'px')) {
			gs.width = t;
		}

		if (gs.height != (t = paperHeight + 'px')) {
			gs.height = t;
		}

		if (os.left != (t = x - left + 'px')) {
			os.left = t;
		}

		if (os.top != (t = y - top + 'px')) {
			os.top = t;
		}

		if (os.width != (t = w + 'px')) {
			os.width = t;
		}

		if (os.height != (t = h + 'px')) {
			os.height = t;
		}
	}
};

ELEMENT_PROTOTYPE.hide = function() {
	if (!this.removed) {
		this.Group.style.display = 'none';
	}

	return this;
};

ELEMENT_PROTOTYPE.show = function() {
	if (!this.removed) {
		this.Group.style.display = 'block';
	}

	return this;
};

ELEMENT_PROTOTYPE.getRegion = function() {
	if (this.removed) {
		return this;
	}

	if (MAP_PATH_LIKE.hasOwnProperty(this.type)) {
		return Util.pathDimensions(this.attrs.path);
	}

	return {
		x: this.X + (this.bbx || 0),
		y: this.Y,
		width: this.W,
		height: this.H
	};
};

ELEMENT_PROTOTYPE.remove = function() {
	if (this.removed) {
		return;
	}

	Util.tear(this, this.paper);

	this.node.parentNode.removeChild(this.node);

	this.Group.parentNode.removeChild(this.Group);

	if (this.shape) {
		this.shape.parentNode.removeChild(this.shape);
	}

	for (var i in this) {
		delete this[i];
	}

	this.removed = true;
};

ELEMENT_PROTOTYPE.attr = function(name, value) {
	var instance = this;

	if (instance.removed) {
		return instance;
	}

	var i;

	if (name == null) {
		var res = {};

		for (i in instance.attrs) {
			if (instance.attrs.hasOwnProperty(i)) {
				res[i] = instance.attrs[i];
			}
		}

		if (instance._.rt.deg) {
			res.rotation = instance.rotate();
		}

		if (instance._.sx != 1 || instance._.sy != 1) {
			res.scale = instance.scale();
		}

		if (res.gradient && res.fill == 'none') {
			res.fill = res.gradient;

			delete res.gradient;
		}

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

	if (instance.attrs && value == null && isArray(name)) {
		var length;
		var values = {};

		for (i = 0, length = name.length; i < length; i++) {
			values[name[i]] = instance.attr(name[i]);
		}

		return values;
	}

	var params = Util.applyAttributes(instance, name, value);

	if (params) {
		if (params.text && instance.type == 'text') {
			instance.node.string = params.text;
		}

		Impl.setFillAndStroke(instance, params);

		if (
			params.gradient &&
			((MAP_TYPES_CIRCLE_ELLIPSE).hasOwnProperty(instance.type) || String(params.gradient).charAt(0) != 'r')
		) {
			Impl.addGradientFill(instance, params.gradient);
		}

		if (!MAP_PATH_LIKE.hasOwnProperty(instance.type) || instance._.rt.deg) {
			instance.setBox(instance.attrs);
		}
	}

	return instance;
};

ELEMENT_PROTOTYPE.toFront = function() {
	if (!this.removed) {
		this.Group.parentNode.appendChild(this.Group);
	}

	if (this.paper.top != this) {
		Util.toFront(this, this.paper);
	}

	return this;
};

ELEMENT_PROTOTYPE.toBack = function() {
	if (this.removed) {
		return this;
	}

	if (this.Group.parentNode.firstChild != this.Group) {
		this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
		Util.toBack(this, this.paper);
	}

	return this;
};

ELEMENT_PROTOTYPE.insertAfter = function(element) {
	if (this.removed) {
		return this;
	}

	if (element instanceof Drawing.Set) {
		element = element.item(element.size());
	}

	if (element.Group.nextSibling) {
		element.Group.parentNode.insertBefore(this.Group, element.Group.nextSibling);
	}
	else {
		element.Group.parentNode.appendChild(this.Group);
	}

	Util.insertAfter(this, element, this.paper);

	return this;
};

ELEMENT_PROTOTYPE.insertBefore = function(element) {
	if (this.removed) {
		return this;
	}

	if (element instanceof Drawing.Set) {
		element = element.item(0);
	}

	element.Group.parentNode.insertBefore(this.Group, element.Group);

	Util.insertBefore(this, element, this.paper);

	return this;
};

ELEMENT_PROTOTYPE.blur = function(size) {
	var s = this.node.runtimeStyle;
	var f = s.filter;

	f = f.replace(REGEX_VML_BLUR, STR_EMPTY);

	if (+size !== 0) {
		this.attrs.blur = size;

		s.filter = f + STR_SPACE + STR_MS_PROG_ID_PREFIX + '.Blur(pixelradius=' + (+size || 1.5) + ')';
		s.margin = Lang.sub('-{0}px 0 0 -{0}px', [MATH_ROUND(+size || 1.5)]);
	}
	else {
		s.filter = f;
		s.margin = 0;

		delete this.attrs.blur;
	}
};

// We need to not sync the width and height of the boundingBox
DRAWING_PROTOTYPE._SYNC_UI_ATTRS = DRAWING_PROTOTYPE._SYNC_UI_ATTRS.join(',').replace(/,(height|width)/g, '').split(',');

DRAWING_PROTOTYPE._uiSetWidth = function(value) {
	var instance = this;

	Drawing.superclass._uiSetWidth.apply(instance, arguments);

	var canvasStyle = instance.canvas.style;

	var height = instance.get('height');

	if (isNumber(value)) {
		value += 'px';
	}

	if (isNumber(height)) {
		height += 'px';
	}

	canvasStyle.width = value;
	canvasStyle.clip = 'rect(0 ' + value + ' ' + height + ' 0)';
};

DRAWING_PROTOTYPE._uiSetHeight = function(value) {
	var instance = this;

	Drawing.superclass._uiSetHeight.apply(instance, arguments);

	var canvasStyle = instance.canvas.style;

	var width = instance.get('width');

	if (isNumber(value)) {
		value += 'px';
	}

	if (isNumber(width)) {
		width += 'px';
	}

	canvasStyle.height = value;
	canvasStyle.clip = 'rect(0 ' + width  + ' ' + value + ' 0)';
};

}, '@VERSION@' ,{requires:['aui-drawing-base'], condition: {name: 'aui-drawing-vml', trigger: 'aui-drawing-base',test: function(A){return A.UA.vml;}}});
AUI.add('aui-drawing-animate', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	ColorUtil = A.ColorUtil,

	Drawing = A.Drawing,
	Element = Drawing.Element,
	Set = Drawing.Set,
	Util = Drawing.Util,

	ELEMENT_PROTOTYPE = Element.prototype,

	MAP_ATTRS_AVAILABLE = Drawing.MAP_ATTRS_AVAILABLE,

	MATH = Math,
	MATH_ABS = MATH.abs,
	MATH_MAX = MATH.max,
	MATH_MIN = MATH.min,
	MATH_POW = MATH.pow,
	MATH_ROUND = MATH.round,

	REGEX_ANIMATE_KEYFRAMES = /^(from|to|\d+%)$/,
	REGEX_BEZIER = /^cubic-bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
	REGEX_SEPARATOR = Drawing.REGEX_SEPARATOR,

	STR_EMPTY = Drawing.STR_EMPTY,
	STR_SPACE = Drawing.STR_SPACE,

	STR_NUMBER = 'number',

	MAP_ATTRS_AVAILABLE_ANIM = {
		along: 'along',
		blur: STR_NUMBER,
		'clip-rect': 'csv',
		cx: STR_NUMBER,
		cy: STR_NUMBER,
		fill: 'color',
		'fill-opacity': STR_NUMBER,
		'font-size': STR_NUMBER,
		height: STR_NUMBER,
		opacity: STR_NUMBER,
		path: 'path',
		r: STR_NUMBER,
		rotation: 'csv',
		rx: STR_NUMBER,
		ry: STR_NUMBER,
		scale: 'csv',
		stroke: 'color',
		'stroke-opacity': STR_NUMBER,
		'stroke-width': STR_NUMBER,
		translation: 'csv',
		width: STR_NUMBER,
		x: STR_NUMBER,
		y: STR_NUMBER
	};

var Animation = Drawing.Animation = {};

Animation.easing_formulas = {
	linear: function(n) {
		return n;
	},

	'<': function(n) {
		return MATH_POW(n, 3);
	},

	'>': function(n) {
		return MATH_POW(n - 1, 3) + 1;
	},

	'<>': function(n) {
		n = n * 2;

		if (n < 1) {
			return MATH_POW(n, 3) / 2;
		}

		n -= 2;

		return (MATH_POW(n, 3) + 2) / 2;
	},

	backIn: function(n) {
		var s = 1.70158;

		return n * n * ((s + 1) * n - s);
	},

	backOut: function(n) {
		n = n - 1;

		var s = 1.70158;

		return n * n * ((s + 1) * n + s) + 1;
	},

	elastic: function(n) {
		if (n == 0 || n == 1) {
			return n;
		}

		var p = 0.3;
		var s = p / 4;

		return MATH_POW(2, -10 * n) * MATH.sin((n - s) * (2 * MATH.PI) / p) + 1;
	},

	bounce: function(n) {
		var s = 7.5625;
		var p = 2.75;
		var l;

		if (n < (1 / p)) {
			l = s * n * n;
		}
		else {
			if (n < (2 / p)) {
				n -= (1.5 / p);
				l = s * n * n + 0.75;
			}
			else {
				if (n < (2.5 / p)) {
					n -= (2.25 / p);
					l = s * n * n + 0.9375;
				}
				else {
					n -= (2.625 / p);
					l = s * n * n + 0.984375;
				}
			}
		}

		return l;
	}
};

var animationElements = [];

Animation.elements = animationElements;

Animation.animation = function() {
	var Now = +new Date;

	for (var l = 0; l < animationElements.length; l++) {
		if (l != 'length' && animationElements.hasOwnProperty(l)) {
			var e = animationElements[l];

			if (e.stop || e.el.removed) {
				continue;
			}

			var time = Now - e.start;
			var ms = e.ms;
			var easing = e.easing;
			var from = e.from;
			var diff = e.diff;
			var to = e.to;
			var t = e.t;
			var that = e.el;
			var set = {};
			var now;

			if (time < ms) {
				var pos = easing(time / ms);

				for (var attr in from) {
					if (from.hasOwnProperty(attr)) {
						switch (MAP_ATTRS_AVAILABLE_ANIM[attr]) {
							case 'along':
								now = pos * ms * diff[attr];
								to.back && (now = to.len - now);

								var point = getPointAtLength(to[attr], now);

								that.translate(diff.sx - diff.x || 0, diff.sy - diff.y || 0);

								diff.x = point.x;
								diff.y = point.y;

								that.translate(point.x - diff.sx, point.y - diff.sy);

								to.rot && that.rotate(diff.r + point.alpha, point.x, point.y);

							break;

							case STR_NUMBER:
								now = +from[attr] + pos * ms * diff[attr];
							break;

							case 'color':
								now = 'rgb(' + [
									upto255(MATH_ROUND(from[attr].r + pos * ms * diff[attr].r)),
									upto255(MATH_ROUND(from[attr].g + pos * ms * diff[attr].g)),
									upto255(MATH_ROUND(from[attr].b + pos * ms * diff[attr].b))
								].join(',') + ')';

							break;

							case 'path':
								now = [];

								for (var i = 0, length = from[attr].length; i < length; i++) {
									now[i] = [from[attr][i][0]];

									for (var j = 1, jLength = from[attr][i].length; j < jLength; j++) {
										now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
									}

									now[i] = now[i].join(STR_SPACE);
								}

								now = now.join(STR_SPACE);
							break;

							case 'csv':
								switch (attr) {
									case 'translation':
										var x = pos * ms * diff[attr][0] - t.x;
										var y = pos * ms * diff[attr][1] - t.y;

										t.x += x;
										t.y += y;

										now = x + STR_SPACE + y;
									break;

									case 'rotation':
										now = +from[attr][0] + pos * ms * diff[attr][0];

										from[attr][1] && (now += ',' + from[attr][1] + ',' + from[attr][2]);
									break;

									case 'scale':
										now = [
											+from[attr][0] + pos * ms * diff[attr][0],
											+from[attr][1] + pos * ms * diff[attr][1],
											(2 in to[attr] ? to[attr][2] : STR_EMPTY),
											(3 in to[attr] ? to[attr][3] : STR_EMPTY)
										].join(STR_SPACE);
									break;

									case 'clip-rect':
										now = [];
										i = 4;

										while (i--) {
											now[i] = +from[attr][i] + pos * ms * diff[attr][i];
										}

									break;
								}

							break;

							default:
								var from2 = [].concat(from[attr]);
								var now = [];

								i = that.paper.customAttributes[attr].length;

								while (i--) {
									now[i] = +from[i] + pos * ms * diff[attr][i];
								}
							break;
						}

						set[attr] = now;
					}
				}

				that.attr(set);
				that._run && that._run.call(that);
			}
			else {
				if (to.along) {
					point = getPointAtLength(to.along, to.len * !to.back);
					that.translate(diff.sx - (diff.x || 0) + point.x - diff.sx, diff.sy - (diff.y || 0) + point.y - diff.sy);
					to.rot && that.rotate(diff.r + point.alpha, point.x, point.y);
				}

				if (t.x || t.y) {
					that.translate(-t.x, -t.y);
				}

				if (to.scale) {
					to.scale += STR_EMPTY;
				}

				that.attr(to);

				animationElements.splice(l--, 1);
			}
		}
	}

	if (A.UA.svg && that && that.paper) {
		that.paper.safari();
	}

	if (animationElements.length) {
		setTimeout(Animation.animation);
	}
};

var sortByKey = function (a, b) {
    return a.key - b.key;
};

var keyframesRun = function(attr, element, time, prev, prevCallback) {
	var diff = time - prev;

	element.timeouts.push(
		setTimeout(
			function() {
				if (isFunction(prevCallback)) {
					prevCallback.call(element);
				}

				element.animate(attr, diff, attr.easing);
			},
			prev
		)
	);
};

var upto255 = function(color) {
	return MATH_MAX(MATH_MIN(color, 255), 0);
};

function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
	var cx = 3 * p1x;
	var bx = 3 * (p2x - p1x) - cx;
	var ax = 1 - cx - bx;
	var cy = 3 * p1y;
	var by = 3 * (p2y - p1y) - cy;
	var ay = 1 - cy - by;

	function sampleCurveX(t) {
		return ((ax * t + bx) * t + cx) * t;
	}

	function solve(x, epsilon) {
		var t = solveCurveX(x, epsilon);

		return ((ay * t + by) * t + cy) * t;
	}

	function solveCurveX(x, epsilon) {
		var t0, t1, t2, x2, d2, i;

		for(t2 = x, i = 0; i < 8; i++) {
			x2 = sampleCurveX(t2) - x;

			if (MATH_ABS(x2) < epsilon) {
				return t2;
			}

			d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;

			if (MATH_ABS(d2) < 1e-6) {
				break;
			}

			t2 = t2 - x2 / d2;
		}

		t0 = 0;
		t1 = 1;
		t2 = x;

		if (t2 < t0) {
			return t0;
		}

		if (t2 > t1) {
			return t1;
		}

		while (t0 < t1) {
			x2 = sampleCurveX(t2);

			if (MATH_ABS(x2 - x) < epsilon) {
				return t2;
			}

			if (x > x2) {
				t0 = t2;
			}
			else {
				t1 = t2;
			}

			t2 = (t1 - t0) / 2 + t0;
		}

		return t2;
	}

	return solve(t, 1 / (200 * duration));
}

ELEMENT_PROTOTYPE.animateWith = function(element, params, ms, easing, callback) {
	for (var i = 0, length = animationElements.length; i < length; i++) {
		if (animationElements[i].el.id == element.id) {
			params.start = animationElements[i].start;
		}
	}

	return this.animate(params, ms, easing, callback);
};

Animation.along = function(isBack) {
	return function(path, ms, rotate, callback) {
		var params = {back: isBack};

		isFunction(rotate) ? (callback = rotate) : (params.rot = rotate);

		path && path.constructor == Element && (path = path.attrs.path);
		path && (params.along = path);

		return this.animate(params, ms, callback);
	};
}

ELEMENT_PROTOTYPE.animateAlong = Animation.along();

ELEMENT_PROTOTYPE.animateAlongBack = Animation.along(1);

ELEMENT_PROTOTYPE.onAnimation = function(f) {
	var instance = this;

	instance._run = f || 0;

	return instance;
};

ELEMENT_PROTOTYPE.animate = function(params, ms, easing, callback) {
	var instance = this;

	instance.timeouts = instance.timeouts || [];

	if (isFunction(easing) || !easing) {
		callback = easing || null;
	}

	if (instance.removed) {
		callback && callback.call(instance);

		return instance;
	}

	var from = {};
	var to = {};
	var diff = {};
	var canAnimate = false;

	var customAttributes = instance.paper.customAttributes;

	for (var attr in params) {
		if (params.hasOwnProperty(attr)) {
			if (MAP_ATTRS_AVAILABLE_ANIM.hasOwnProperty(attr) || customAttributes.hasOwnProperty(attr)) {
				canAnimate = true;
				from[attr] = instance.attr(attr);

				if (from[attr] == null) {
					from[attr] = MAP_ATTRS_AVAILABLE[attr];
				}

				to[attr] = params[attr];

				switch (MAP_ATTRS_AVAILABLE_ANIM[attr]) {
					case 'along':
						var len = getTotalLength(params[attr]);
						var point = getPointAtLength(params[attr], len * !!params.back);
						var bb = instance.getRegion();

						diff[attr] = len / ms;
						diff.tx = bb.x;
						diff.ty = bb.y;
						diff.sx = point.x;
						diff.sy = point.y;
						to.rot = params.rot;
						to.back = params.back;
						to.len = len;

						if (params.rot) {
							diff.r = parseFloat(instance.rotate()) || 0;
						}

					break;

					case STR_NUMBER:
						diff[attr] = (to[attr] - from[attr]) / ms;

					break;

					case 'color':
						from[attr] = ColorUtil.getRGB(from[attr]);

						var toColour = ColorUtil.getRGB(to[attr]);

						diff[attr] = {
							r: (toColour.r - from[attr].r) / ms,
							g: (toColour.g - from[attr].g) / ms,
							b: (toColour.b - from[attr].b) / ms
						};

					break;

					case 'path':
						var pathes = Util.path2curve(from[attr], to[attr]);

						from[attr] = pathes[0];

						var toPath = pathes[1];

						diff[attr] = [];

						for (var i = 0, length = from[attr].length; i < length; i++) {
							diff[attr][i] = [0];

							for (var j = 1, jLength = from[attr][i].length; j < jLength; j++) {
								diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
							}
						}

					break;

					case 'csv':
						var values = String(params[attr]).split(REGEX_SEPARATOR);
						var from2 = String(from[attr]).split(REGEX_SEPARATOR);

						switch (attr) {
							case 'translation':
								from[attr] = [0, 0];

								diff[attr] = [
									values[0] / ms,
									values[1] / ms
								];
							break;

							case 'rotation':
								from[attr] = (from2[1] == values[1] && from2[2] == values[2]) ? from2 : [0, values[1], values[2]];
								diff[attr] = [
									(values[0] - from[attr][0]) / ms,
									0,
									0
								];
							break;

							case 'scale':
								params[attr] = values;
								from[attr] = String(from[attr]).split(REGEX_SEPARATOR);

								diff[attr] = [
									(values[0] - from[attr][0]) / ms,
									(values[1] - from[attr][1]) / ms,
									0,
									0
								];
							break;

							case 'clip-rect':
								from[attr] = String(from[attr]).split(REGEX_SEPARATOR);
								diff[attr] = [];
								i = 4;

								while (i--) {
									diff[attr][i] = (values[i] - from[attr][i]) / ms;
								}

							break;
						}

						to[attr] = values;

					break;

					default:
						values = [].concat(params[attr]);
						from2 = [].concat(from[attr])
						diff[attr] = [];

						i = customAttributes[attr].length;

						while (i--) {
							diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
						}

					break;
				}
			}
		}
	}

	if (!canAnimate) {
		var attrs = [];
		var lastcall;

		for (var key in params) {
			if (params.hasOwnProperty(key) && REGEX_ANIMATE_KEYFRAMES.test(key)) {
				attr = {
					value: params[key]
				};

				if (key == 'from') {
					key = 0;
				}
				else if (key == 'to') {
					key = 100;
				}

				attr.key = parseInt(key, 10);
				attrs.push(attr);
			}
		}

		attrs.sort(sortByKey);

		if (attrs[0].key) {
			attrs.unshift(
				{
					key: 0,
					value: instance.attrs
				}
			);
		}

		var prevAttr;
		var attrLength = attrs.length;

		for (var i = 0; i < attrLength; i++) {
			attr = attrs[i];
			prevAttr = attrs[i - 1];

			keyframesRun(
				attr.value,
				instance, ms / 100 * attr.key,
				ms / 100 * (prevAttr && prevAttr.key || 0),
				prevAttr && prevAttr.value.callback
			);
		}

		lastcall = attrs[attrLength - 1].value.callback;

		if (lastcall) {
			instance.timeouts.push(
				setTimeout(
					function() {
						lastcall.call(instance);
					},
					ms
				)
			);
		}
	}
	else {
		var easingFormula = Animation.easing_formulas[easing];

		if (!easingFormula) {
			easingFormula = String(easingFormula).match(REGEX_BEZIER);

			if (easingFormula && easingFormula.length == 5) {
				var curve = easingFormula;

				easingFormula = function(t) {
					return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
				};
			}
			else {
				easingFormula = function(t) {
					return t;
				};
			}
		}

		animationElements.push(
			{
				start: params.start || +new Date,
				ms: ms,
				easing: easingFormula,
				from: from,
				diff: diff,
				to: to,
				el: instance,
				t: {
					x: 0,
					y: 0
				}
			}
		);

		if (isFunction(callback)) {
			instance._ac = setTimeout(
				function() {
					callback.call(instance);
				},
				ms
			);
		}

		if (animationElements.length == 1) {
			setTimeout(Animation.animation);
		}
	}

	return instance;
};

ELEMENT_PROTOTYPE.stop = function() {
	var instance = this;

	for (var i = 0; i < animationElements.length; i++) {
		if (animationElements[i].el.id == instance.id) {
			animationElements.splice(i--, 1);
		}
	}

	instance.timeouts = [];

	clearTimeout(instance._ac);

	delete instance._ac;

	return instance;
};

ELEMENT_PROTOTYPE.translate = function(x, y) {
	return this.attr(
		{
			translation: x + ' ' + y
		}
	);
};

Set.addMethod(['animateAlong', 'animateAlongBack', 'animateWith', 'onAnimation', 'stop', 'translate']);

Set.prototype.animate = function(params, ms, easing, callback) {
	var instance = this;

	if (isFunction(easing) || !easing) {
		callback = easing || null;
	}

	var items = instance._items;
	var length = items.length;
	var i = length;
	var item;
	var currentItem;
	var collector;

	if (callback) {
		collector = function() {
			if (!--length) {
				callback.call(instance);
			}
		};
	}

	easing = isString(easing) ? easing : collector;

	item = items[--i].animate(params, ms, easing, collector);

	while(i--) {
		currentItem = items[i];
		if (currentItem && !currentItem.removed) {
			currentItem.animateWith(item, params, ms, easing, collector);
		}
	}

	return instance;
};

}, '@VERSION@' ,{requires:['aui-drawing-base']});
AUI.add('aui-drawing-drag', function(A) {
var Lang = A.Lang,

	DOC = A.config.doc,

	Drawing = A.Drawing,
	Element = Drawing.Element,

	ELEMENT_PROTOTYPE = Element.prototype,

	MAP_EVENT_CONFIG = {
		standAlone: true
	},

	MAP_EVENT_GESTURES = {
		mousedown: 'gesturemovestart',
		mousemove: 'gesturemove',
		mouseup: 'gesturemoveend'
	},

	SUPPORTS_TOUCH = 'createTouch' in DOC;

var Drag = Drawing.Drag = {
	drags: []
};

Element._getEventType = function(eventType) {
	return MAP_EVENT_GESTURES[eventType] || eventType;
};

Element._getEventConfig = function(eventType, originalType) {
	return MAP_EVENT_GESTURES[originalType] ? MAP_EVENT_CONFIG : null;
};

Drag.dragMove = function(e) {
	var x = e.clientX;
	var y = e.clientY;
	var dragi;
	var drags = Drag.drags;
	var j = drags.length;

	while (j--) {
		dragi = drags[j];

		if (SUPPORTS_TOUCH) {
			var i = e.touches.length;
			var touch;

			while (i--) {
				touch = e.touches[i];

				if (touch.identifier == dragi.el._drag.id) {
					x = touch.clientX;
					y = touch.clientY;

					(e.originalEvent ? e.originalEvent : e).preventDefault();

					break;
				}
			}
		}
		else {
			e.preventDefault();
		}

		if (dragi.move) {
			dragi.move.call(dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y);
		}
	}
};

Drag.dragUp = function() {
	Drag._dragMoveHandle.detach();
	Drag._dragUpHandle.detach();

	var drags = Drag.drags;
	var i = drags.length;
	var dragi;

	while (i--) {
		dragi = drags[i];
		dragi.el._drag = {};

		if (dragi.end) {
			dragi.end.call(dragi.el);
		}
	}

	Drag.drags = [];
};

ELEMENT_PROTOTYPE.drag = function(onmove, onstart, onend) {
	var instance = this;

	instance._drag = {};

	instance.on(
		'mousedown',
		function(e) {
			var element = this;

			(e.originalEvent || e).preventDefault();

			element._drag.x = e.clientX;
			element._drag.y = e.clientY;
			element._drag.id = e.identifier;

			if (onstart) {
				onstart.call(element, e.clientX, e.clientY);
			}

			if (!Drag.drags.length) {
				var realMoveEventName = Element._getEventType('mousemove');
				var realUpEventName = Element._getEventType('mouseup');

				Drag._dragMoveHandle = A.on(realMoveEventName, Drag.dragMove, DOC, Element._getEventConfig(realMoveEventName, 'mousemove'));
				Drag._dragUpHandle = A.on(realUpEventName, Drag.dragUp, DOC, Element._getEventConfig(realUpEventName, 'mouseup'));
			}

			Drag.drags.push(
				{
					el: this,
					move: onmove,
					end: onend
				}
			);
		}
	);

	return instance;
};

ELEMENT_PROTOTYPE.undrag = function(onmove, onstart, onend) {
	var instance = this;

	var drags = Drag.drags;

	var i = drags.length;

	while (i--) {
		drags[i].el == instance && (drags[i].move == onmove && drags[i].end == onend) && drags.splice(i, 1);

		if (!drags.length) {
			Drag._dragMoveHandle.detach();
			Drag._dragUpHandle.detach();
		}
	}
};

Drawing.Set.addMethod(['drag', 'undrag']);

}, '@VERSION@' ,{requires:['aui-drawing-base','event-gestures']});
AUI.add('aui-drawing-fonts', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,

	Drawing = A.Drawing,

	DRAWING_PROTOTYPE = Drawing.prototype,

	GLYPH_FN_REPLACE = function(command) {
		return GLYPH_MAP_COMMAND[command] || 'M';
	},

	GLYPH_MAP_COMMAND = {
		l: 'L',
		c: 'C',
		x: 'z',
		t: 'm',
		r: 'l',
		v: 'c'
	},

	MAP_FONT_WEIGHT = {
		bold: 700,
		bolder: 800,
		lighter: 300,
		normal: 400
	},

	MATH = Math,
	MATH_MAX = MATH.max,
	MATH_MIN = MATH.min,

	REGEX_GLYPH_COMMANDS = /[mlcxtrv]/g,
	REGEX_SEPARATOR = Drawing.REGEX_SEPARATOR,

	STR_EMPTY = Drawing.STR_EMPTY;

Drawing.registerFont = function(font) {
	if (!font.face) {
		return font;
	}

	this.fonts = this.fonts || {};

	var fontCollection = this.fonts;

	var fontcopy = {
		w: font.w,
		face: {},
		glyphs: {}
	};

	var family = font.face['font-family'];
	var fontFace = font.face;
	var fontCopyFace = fontcopy.face;

	for (var prop in fontFace) {
		if (fontFace.hasOwnProperty(prop)) {
			fontCopyFace[prop] = fontFace[prop];
		}
	}

	if (fontCollection[family]) {
		fontCollection[family].push(fontcopy);
	}
	else {
		fontCollection[family] = [fontcopy];
	}

	if (!font.svg) {
		fontCopyFace['units-per-em'] = parseInt(fontFace['units-per-em'], 10);

		for (var glyph in font.glyphs) {
			if (font.glyphs.hasOwnProperty(glyph)) {
				var path = font.glyphs[glyph];

				var d = path.d;

				if (d) {
					d = d.replace(REGEX_GLYPH_COMMANDS, GLYPH_FN_REPLACE);

					d = 'M' + d + 'z';
				}

				fontcopy.glyphs[glyph] = {
					w: path.w,
					k: {},
					d: d
				};

				if (path.k) {
					for (var k in path.k) {
						if (path.hasOwnProperty(k)) {
							fontcopy.glyphs[glyph].k[k] = path.k[k];
						}
					}
				}
			}
		}
	}

	return font;
};

DRAWING_PROTOTYPE.getFont = function(family, weight, style, stretch) {
	var instance = this;

	stretch = stretch || 'normal';
	style = style || 'normal';

	weight = +weight || MAP_FONT_WEIGHT[weight] || 400;

	if (!Drawing.fonts) {
		return;
	}

	var fontCollection = Drawing.fonts;

	var font = fontCollection[family];

	if (!font) {
		var name = new RegExp('(^|\\s)' + family.replace(/[^\w\d\s+!~.:_-]/g, STR_EMPTY) + '(\\s|$)', 'i');

		for (var fontName in fontCollection) {
			if (fontCollection.hasOwnProperty(fontName)) {
				if (name.test(fontName)) {
					font = fontCollection[fontName];

					break;
				}
			}
		}
	}

	var thefont;

	if (font) {
		var fontFace;
		for (var i = 0, length = font.length; i < length; i++) {
			thefont = font[i];
			fontFace = thefont.face;

			if (
				fontFace['font-weight'] == weight &&
				(fontFace['font-style'] == style || !fontFace['font-style']) &&
				fontFace['font-stretch'] == stretch
			) {
				break;
			}
		}
	}

	return thefont;
};

DRAWING_PROTOTYPE.print = function(x, y, string, font, size, origin, letterSpacing) {
	var instance = this;

	origin = origin || 'middle'; // baseline|middle
	letterSpacing = MATH_MAX(MATH_MIN(letterSpacing || 0, 1), -1);

	var out = instance.createSet();
	var letters = String(string).split(STR_EMPTY);
	var shift = 0;
	var path = STR_EMPTY;
	var scale;

	isString(font) && (font = instance.getFont(font));

	if (font) {
		scale = (size || 16) / font.face['units-per-em'];

		var bb = font.face.bbox.split(REGEX_SEPARATOR);
		var top = +bb[0];
		var height = +bb[1] + (origin == 'baseline' ? bb[3] - bb[1] + (+font.face.descent) : (bb[3] - bb[1]) / 2);

		for (var i = 0, length = letters.length; i < length; i++) {
			var prev = i && font.glyphs[letters[i - 1]] || {};
			var curr = font.glyphs[letters[i]];

			shift += i ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letterSpacing) : 0;

			curr && curr.d && out.push(
				instance.path(curr.d).attr(
					{
						fill: '#000',
						stroke: 'none',
						translation: [shift, 0]
					}
				)
			);
		}

		out.scale(scale, scale, top, height).translate(x - top, y - height);
	}

	return out;
};

}, '@VERSION@' ,{requires:['aui-drawing-base']});
AUI.add('aui-drawing-safari', function(A) {
A.Drawing.prototype.safari = function() {
	var instance = this;

	var rect = instance.rect(-99, -99, instance.get('width') + 99, instance.get('height') + 99).attr(
		{
			stroke: 'none'
		}
	);

	setTimeout(
		function() {
			rect.remove();
		},
		0
	);
};

}, '@VERSION@' ,{requires:['aui-drawing-base'], condition: {name: 'aui-drawing-safari', trigger: 'aui-drawing-base',test: function(A){var UA = A.UA; return UA.safari && (UA.version.major < 4 || (UA.iphone || UA.ipad));}}});


AUI.add('aui-drawing', function(A){}, '@VERSION@' ,{skinnable:false, use:['aui-drawing-base', 'aui-drawing-animate', 'aui-drawing-drag', 'aui-drawing-fonts']});

