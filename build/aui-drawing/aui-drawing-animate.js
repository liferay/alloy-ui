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
