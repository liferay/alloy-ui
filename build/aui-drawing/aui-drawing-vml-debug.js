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
