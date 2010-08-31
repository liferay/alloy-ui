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
