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


AUI.add('aui-drawing', function(A){}, '@VERSION@' ,{skinnable:false, use:['aui-drawing-base', 'aui-drawing-animate', 'aui-drawing-drag', 'aui-drawing-fonts']});

