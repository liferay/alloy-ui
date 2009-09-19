AUI().add(
	'color-picker',
	function(A) {
		var Lang = A.Lang,
			isArray = Lang.isArray,
			isObject = Lang.isObject,

			NAME = 'colorpicker',

			getClassName = A.ClassNameManager.getClassName,

			WidgetStdMod = A.WidgetStdMod,

			CSS_CANVAS = getClassName(NAME, 'canvas'),
			CSS_HUE_CANVAS = getClassName(NAME, 'hue-canvas'),
			CSS_CONTAINER = getClassName(NAME, 'container'),
			CSS_CONTROLS_CONTAINER = getClassName(NAME, 'controls'),

			CSS_CONTROL_HOLDER = getClassName('ctrl-holder'),
			CSS_CONTROL_INPUT = getClassName('input-text'),

			CSS_CONTROL_B = [CSS_CONTROL_INPUT, getClassName(NAME, 'blue')].join(' '),
			CSS_CONTROL_G = [CSS_CONTROL_INPUT, getClassName(NAME, 'green')].join(' '),
			CSS_CONTROL_R = [CSS_CONTROL_INPUT, getClassName(NAME, 'red')].join(' '),
			CSS_CONTROL_HEX = [CSS_CONTROL_INPUT, getClassName(NAME, 'hex')].join(' '),

			CSS_SWATCH_CONTAINER = getClassName(NAME, 'swatch'),
			CSS_SWATCH_CURRENT = getClassName(NAME, 'swatch-current'),
			CSS_SWATCH_ORIGINAL = getClassName(NAME, 'swatch-original'),
			CSS_THUMB_CANVAS = getClassName(NAME, 'thumb'),
			CSS_THUMB_CANVAS_IMAGE = getClassName(NAME, 'thumb-image'),
			CSS_HUE_THUMB = getClassName(NAME, 'hue-thumb'),
			CSS_HUE_THUMB_IMAGE = getClassName(NAME, 'hue-thumb-image'),
			CSS_TRIGGER= getClassName(NAME, 'trigger'),
			CSS_TRIGGER_IMAGE = getClassName(NAME, 'trigger-image'),
			CSS_HELPER_CLEARFIX = getClassName('helper', 'clearfix'),
			CSS_STATE_DEFAULT = getClassName('state-default'),
			CSS_HEADER = getClassName(NAME, 'hd'),

			CSS_ICON_CLOSE = getClassName('widget', 'close'),

			CSS_PICKER_HEADER = [CSS_HEADER, CSS_STATE_DEFAULT, CSS_HELPER_CLEARFIX].join(' '),

			TPL_HEADER = '<div class="'+ CSS_PICKER_HEADER +'"></div>',
			TPL_CANVAS = '<div class="' + CSS_CANVAS + '"></div>',
			TPL_CONTAINER = '<div class="' + CSS_CONTAINER + '"></div>',
			TPL_CONTROLS_CONTAINER = '<div class="' + CSS_CONTROLS_CONTAINER + '"></div>',
			TPL_CONTROL = '<span class="' + CSS_CONTROL_HOLDER + '"><label for="{id}">{string}</label><input class="{cssClass}" id="{id}" size="{size}" type="text" /></span>',
			TPL_HUE_CANVAS = '<div class="' + CSS_HUE_CANVAS + '"></div>',
			TPL_SWATCH_CONTAINER = '<div class="' + CSS_SWATCH_CONTAINER + '"></div>',
			TPL_SWATCH_CURRENT = '<div class="' + CSS_SWATCH_CURRENT + '"></div>',
			TPL_SWATCH_ORIGINAL = '<div class="' + CSS_SWATCH_ORIGINAL + '"></div>',
			TPL_THUMB_CANVAS = '<div class="' + CSS_THUMB_CANVAS + '"><img class="' + CSS_THUMB_CANVAS_IMAGE + '" src="{thumbImage}" /></div>',
			TPL_THUMB_HUE = '<div class="' + CSS_HUE_THUMB + '"><img class="' + CSS_HUE_THUMB_IMAGE + '" src="{thumbImage}" /></div>';

		var Color = {
			real2dec: function(number) {
				var instance = this;

				return Math.min(255, Math.round(number * 256));
			},

			hsv2rgb: function(hue, saturation, value) {
				var instance = this;

				if (isArray(hue)) {
					return instance.hsv2rgb.apply(instance, hue);
				}
				else if (isObject(hue)) {
					saturation = hue.saturation;
					value = hue.value;
					hue = hue.hue;
				}

				hue = instance.constrainTo(hue, 0, 360, 0);
				value = instance.constrainTo(value, 0, 1, 0);
				saturation = instance.constrainTo(saturation, 0, 1, 0);

				var red,
					green,
					blue,
					i = Math.floor((hue / 60) % 6),
					f = (hue / 60) - i,
					p = value * (1 - saturation),
					q = value * (1 - f * saturation),
					t = value * (1 - (1 - f) * saturation);

				switch (i) {
					case 0:
						red = value;
						green = t;
						blue = p;
					break;
					case 1:
						red = q;
						green = value;
						blue = p;
					break;
					case 2:
						red = p;
						green = value;
						blue = t;
					break;
					case 3:
						red = p;
						green = q;
						blue = value;
					break;
					case 4:
						red = t;
						green = p;
						blue = value;
					break;
					case 5:
						red = value;
						green = p;
						blue = q;
					break;
				}

				var real2dec = instance.real2dec;

				return {
					red: real2dec(red),
					green: real2dec(green),
					blue: real2dec(blue)
				};
			},

			rgb2hex: function(red, green, blue) {
				var instance = this;

				if (isArray(red)) {
					return instance.rgb2hex.apply(instance, red);
				}
				else if (isObject(red)) {
					green = red.green;
					blue = red.blue;
					red = red.red;
				}

				var dec2hex = instance.dec2hex;

				return dec2hex(red) + dec2hex(green) + dec2hex(blue);
			},

			dec2hex: function(number) {
				var instance = this;

				number = parseInt(number, 10)|0;
				number = Color.constrainTo(number, 0, 255, 0);

				return ('0' + number.toString(16)).slice(-2).toUpperCase();
			},

			hex2dec: function(string) {
				var instance = this;

				return parseInt(string, 16);
			},

			hex2rgb: function(string) {
				var instance = this;

				var hex2dec = instance.hex2dec;

				var red = string.slice(0, 2);
				var green = string.slice(2, 4);
				var blue = string.slice(4, 6);

				return {
					red: hex2dec(red),
					green: hex2dec(green),
					blue: hex2dec(blue)
				};
			},

			rgb2hsv: function(red, blue, green) {
				var instance = this;

				if (isArray(red)) {
					return instance.rgb2hsv.apply(instance, red);
				}
				else if (isObject(red)) {
					green = red.green;
					blue = red.blue;
					red = red.red;
				}

				red /= 255;
				green /= 255;
				blue /= 255;

				var hue,
					saturation,
					min = Math.min(Math.min(red, green), blue),
					max = Math.max(Math.max(red, green), blue),
					delta = max - min;

				switch (max) {
					case min:
						hue = 0;
					break;
					case red:
						hue = 60 * (green - blue) / delta;
						if (green < blue) {
							hue += 360;
						}
					break;
					case green:
						hue = (60 * (blue - red) / delta) + 120;
					break;
					case blue:
						hue = (60 * (red - green) / delta) + 240;
					break;
				}

				saturation = (max === 0) ? 0 : 1- (min / max);

				return {
					hue: Math.round(hue),
					saturation: saturation,
					value: max
				};
			},

			constrainTo: function(number, start, end, defaultNumber) {
				var instance = this;

				if (number < start || number > end) {
					number = defaultNumber;
				}

				return number;
			}
		};

		var ColorPicker = function(config) {
			ColorPicker.superclass.constructor.apply(this, arguments);
		};

		ColorPicker.NAME = 'colorpicker';

		ColorPicker.ATTRS = {
			hex: {
				value: 'FFFFFF',
				getter: function() {
					var instance = this;

					var rgb = instance.get('rgb');

					return Color.rgb2hex(rgb);
				},
				setter: function(value) {
					var instance = this;

					var length = value.length;

					if (length == 3) {
						var chars = value.split('');

						for (var i = 0; i < chars.length; i++) {
							chars[i] += chars[i];
						}

						value = chars.join('');
					}

					if ((/[A-Fa-f0-9]{6}/).test(value)) {
						var rgb = Color.hex2rgb(value);

						instance.set('rgb', rgb);
					}
					else {
						value = A.Attribute.INVALID_ATTRIBUTE;
					}

					return value;
				}
			},

			hideOn: {
				value: 'click'
			},

			hsv: {
				getter: function(value) {
					var instance = this;

					var rgb = instance.get('rgb');

					return Color.rgb2hsv(rgb);
				},
				setter: function(value) {
					var instance = this;

					if (isArray(value)) {
						var current = instance.get('hsv');

						var rgb = Color.hsv2rgb(value);

						instance.set('rgb', rgb);

						current = {
							hue: value[0],
							saturation: value[1],
							value: [2]
						};
					}
					else if (!isObject(value)) {
						value = A.Attribute.INVALID_ATTRIBUTE;
					}

					return value;
				},
				value: {
					hue: 0,
					saturation: 0,
					value: 0
				}
			},

			images: {
				value: {
					HUE_THUMB: AUI.defaults.paths.images + 'color_picker/color_indic.png',
					PICKER_THUMB: AUI.defaults.paths.images + 'color_picker/select.png'
				}
			},

			showOn: {
				value: 'click'
			},

			pickersize: {
				value: 180
			},

			rgb: {
				value: {
					blue: 255,
					green: 255,
					red: 255
				},

				setter: function(value) {
					var instance = this;

					if (isArray(value)) {
						var current = instance.get('rgb');

						current = {
							blue: value[2],
							green: value[1],
							red: [0]
						};

						value = current;
					}
					else if (!isObject(value)) {
						value = A.Attribute.INVALID_ATTRIBUTE;
					}

					value.red = Color.constrainTo(value.red, 0, 255, 255);
					value.green = Color.constrainTo(value.green, 0, 255, 255);
					value.blue = Color.constrainTo(value.blue, 0, 255, 255);

					return value;
				}
			},

			strings: {
				value: {
					R: 'R',
					G: 'G',
					B: 'B',
					H: 'H',
					S: 'S',
					V: 'V',
					HEX: '#',
					DEG: '\u00B0',
					PERCENT: '%'
				}
			},

			trigger: {
				lazyAdd: true,
				getter: function(value) {
					var instance = this;

					if (!value) {
						instance._toolItemTrigger = new A.ToolItem(
							{
								icon: 'pencil'
							}
						);

						value = instance._toolItemTrigger.get('boundingBox');

						instance.set('trigger', value);
					}

					return value;
				}
			}
		};

		A.extend(
			ColorPicker,
			A.ContextOverlay,
			{
				renderUI: function() {
					var instance = this;

					var toolTrigger = instance._toolItemTrigger;

					if (toolTrigger && !toolTrigger.get('rendered')) {
						toolTrigger.render(instance.get('boundingBox').get('parentNode'));
					}

					instance._renderContainer();
					instance._renderSliders();
					instance._renderControls();
					instance._renderCloseButton();
				},

				bindUI: function() {
					var instance = this;

					instance._createEvents();

					instance._colorCanvas.on('mousedown', instance._onCanvasMouseDown, instance);

					instance._colorPicker.on('drag:start', instance._onThumbDragStart, instance);

					instance._colorPicker.after('drag:drag', instance._afterThumbDrag, instance);
					instance._hueSlider.after('valueChange', instance._afterValueChange, instance);

					instance._formFieldR.on('blur', A.rbind(instance._updateColor, instance, 'rgb.red'));
					instance._formFieldG.on('blur', A.rbind(instance._updateColor, instance, 'rgb.green'));
					instance._formFieldB.on('blur', A.rbind(instance._updateColor, instance, 'rgb.blue'));

					instance._formFieldHex.on('blur', A.rbind(instance._updateColor, instance, 'hex'));

					instance.after('hexChange', instance._updateRGB);
					instance.after('rgbChange', instance._updateRGB);

					instance._colorSwatchOriginal.on('click', instance._restoreRGB, instance);

					instance.after('visibleChange', instance._afterVisibleChangeCP);

					instance._containerCloseCP.on('click', instance.hide, instance);
				},

				syncUI: function() {
					var instance = this;

					instance._updatePickerOffset();

					var rgb = instance.get('rgb');

					instance._formFieldR.set('value', rgb.red);
					instance._formFieldG.set('value', rgb.green);
					instance._formFieldB.set('value', rgb.blue);

					instance._formFieldHex.set('value', instance.get('hex'));

					instance._updateOriginalRGB();
				},

				_afterThumbDrag: function(event) {
					var instance = this;

					var value = instance._translateOffset(event.pageX, event.pageY);

					if (!instance._preventDragEvent) {
						instance.fire(
							'colorChange',
							{
								ddEvent: event
							}
						);
					}

					instance._canvasThumbXY = value;
				},

				_afterValueChange: function(event) {
					var instance = this;

					if (event.src != 'controls') {
						instance.fire(
							'colorChange',
							{
								slideEvent: event
							}
						);
					}
				},

				_afterVisibleChangeCP: function(event) {
					var instance = this;

					if (event.newVal) {
						instance._hueSlider.syncUI();
					}

					instance._updateOriginalRGB();
				},

				_convertOffsetToValue: function(x, y) {
					var instance = this;

					if (isArray(x)) {
						return instance._convertOffsetToValue.apply(instance, x);
					}

					var size = instance.get('pickersize');

					x = Math.round(((x * size / 100)));
					y = Math.round((size - (y * size / 100)));

					return [x, y];
				},

				_convertValueToOffset: function(x, y) {
					var instance = this;

					if (isArray(x)) {
						return instance._convertValueToOffset.apply(instance, x);
					}

					x = Math.round(x + instance._offsetXY[0]);
					y = Math.round(y + instance._offsetXY[1]);

					return [x, y];
				},

				_createEvents: function() {
					var instance = this;

					instance.publish(
						'colorChange',
						{
							defaultFn: instance._onColorChange
						}
					);
				},

				_getHuePicker: function() {
					var instance = this;

					var size = instance._getPickerSize();
					var hue = (size - instance._hueSlider.get('value')) / size;

					hue = Math.round(hue * 360);

					return (hue === 360) ? 0 : hue;
				},

				_getPickerSize: function() {
					var instance = this;

					if (!instance._pickerSize) {
						var colorCanvas = instance._colorCanvas;
						var pickerSize = colorCanvas.get('offsetWidth');

						if (!pickerSize) {
							pickerSize = colorCanvas.getComputedStyle('width');
						}

						pickerSize = parseInt(pickerSize, 10);

						var width = instance._pickerThumb.get('offsetWidth');

						pickerSize -= width;

						instance._pickerSize = pickerSize;
					}

					return instance._pickerSize;
				},

				_getSaturationPicker: function() {
					var instance = this;

					return instance._canvasThumbXY[0] / instance._getPickerSize();
				},

				_getThumbOffset: function() {
					var instance = this;

					if (!instance._thumbOffset) {
						var pickerThumb = instance._pickerThumb;

						var height = pickerThumb.get('offsetHeight');
						var width = pickerThumb.get('offsetWidth');

						instance._thumbOffset = [Math.floor(width / 2), Math.floor(height / 2)];
					}

					return instance._thumbOffset;
				},

				_getValuePicker: function() {
					var instance = this;

					var size = instance._getPickerSize();

					return ((size - instance._canvasThumbXY[1])) / size;
				},

				_onCanvasMouseDown: function(event) {
					var instance = this;

					instance._setDragStart(event.pageX, event.pageY);

					event.halt();

					instance.fire(
						'colorChange',
						{
							ddEvent: event
						}
					);
				},

				_onColorChange: function(event) {
					var instance = this;

					var hue = instance._getHuePicker();

					var saturation = instance._getSaturationPicker();
					var value = instance._getValuePicker();

					var rgb = Color.hsv2rgb(hue, saturation, value);

					if (event.src != 'controls') {
						instance.set('rgb', rgb);
					}

					instance._updateControls();

					if (!event.ddEvent) {
						if (!event.slideEvent) {
							instance._updateHue();
							instance._updatePickerThumb();

							hue = instance._getHuePicker();
						}

						var canvasRGB = Color.hsv2rgb(hue, 1, 1);

						instance._updateCanvas(canvasRGB);
					}

					instance._updateColorSwatch();
				},

				_onThumbDragStart: function(event) {
					var instance = this;

					instance._updatePickerOffset();
				},

				_renderCloseButton: function() {
					var instance = this;

					instance._containerCloseCP = new A.ToolItem('close');

					instance._containerCloseCP.render(instance.headerContentNode);

					instance._containerCloseCP.get('boundingBox').addClass(CSS_ICON_CLOSE);
				},

				_renderContainer: function() {
					var instance = this;

					if (!instance._pickerContainer) {
						var bodyContent = A.Node.create(TPL_CONTAINER);

						instance.headerContentNode = A.Node.create(TPL_HEADER);

						instance.setStdModContent(WidgetStdMod.HEADER, instance.headerContentNode);
						instance.setStdModContent(WidgetStdMod.BODY, bodyContent);

						instance.get('contentBox').appendChild(instance.headerContentNode);
						instance.get('contentBox').appendChild(bodyContent);

						instance._pickerContainer = bodyContent;
					}
				},

				_renderControls: function() {
					var instance = this;

					instance._colorSwatch = A.Node.create(TPL_SWATCH_CONTAINER);
					instance._colorSwatchCurrent = A.Node.create(TPL_SWATCH_CURRENT);
					instance._colorSwatchOriginal = A.Node.create(TPL_SWATCH_ORIGINAL);

					instance._colorSwatch.appendChild(instance._colorSwatchCurrent);
					instance._colorSwatch.appendChild(instance._colorSwatchOriginal);

					instance._pickerContainer.appendChild(instance._colorSwatch);

					var formFieldControls = A.Node.create(TPL_CONTROLS_CONTAINER);

					var strings = instance.get('strings');

					var formFieldRTPL = A.substitute(
						TPL_CONTROL,
						{
							cssClass: CSS_CONTROL_R,
							id: A.guid(),
							size: 3,
							string: strings.R
						}
					);

					var formFieldGTPL = A.substitute(
						TPL_CONTROL,
						{
							cssClass: CSS_CONTROL_G,
							id: A.guid(),
							size: 3,
							string: strings.G
						}
					);

					var formFieldBTPL = A.substitute(
						TPL_CONTROL,
						{
							cssClass: CSS_CONTROL_B,
							id: A.guid(),
							size: 3,
							string: strings.B
						}
					);

					var formFieldHexTPL = A.substitute(
						TPL_CONTROL,
						{
							cssClass: CSS_CONTROL_HEX,
							id: A.guid(),
							size: 6,
							string: strings.HEX
						}
					);

					var formFieldR = A.Node.create(formFieldRTPL);
					var formFieldG = A.Node.create(formFieldGTPL);
					var formFieldB = A.Node.create(formFieldBTPL);
					var formFieldHex = A.Node.create(formFieldHexTPL);

					instance._formFieldR = formFieldR.one('input');
					instance._formFieldG = formFieldG.one('input');
					instance._formFieldB = formFieldB.one('input');
					instance._formFieldHex = formFieldHex.one('input');

					formFieldControls.appendChild(formFieldR);
					formFieldControls.appendChild(formFieldG);
					formFieldControls.appendChild(formFieldB);
					formFieldControls.appendChild(formFieldHex);

					instance._pickerContainer.appendChild(formFieldControls);
				},

				_renderSliders: function() {
					var instance = this;

					var thumbCanvas = A.substitute(
						TPL_THUMB_CANVAS,
						{
							thumbImage: instance.get('images.PICKER_THUMB')
						}
					);

					var thumbHue = A.substitute(
						TPL_THUMB_HUE,
						{
							thumbImage: instance.get('images.HUE_THUMB')
						}
					);

					instance._colorCanvas = A.Node.create(TPL_CANVAS);
					instance._pickerThumb = A.Node.create(thumbCanvas);

					instance._hueCanvas = A.Node.create(TPL_HUE_CANVAS);
					instance._hueThumb = A.Node.create(thumbHue);

					var hueThumbImage = instance._hueThumb.get('firstChild');

					instance._colorCanvas.appendChild(instance._pickerThumb);
					instance._hueCanvas.appendChild(instance._hueThumb);

					instance._pickerContainer.appendChild(instance._colorCanvas);

					var size = instance.get('pickersize');

					instance._colorPicker = new A.DD.Drag(
						{
							node: instance._pickerThumb
						}
					)
					.plug(
						A.Plugin.DDConstrained,
						{
							constrain2node: instance._colorCanvas
						}
					);

					instance._hueSlider = new A.Slider(
						{
							railSize: instance._hueCanvas.getComputedStyle('height'),
							axis: 'y',
							rail: instance._hueCanvas,
							min: 0,
							max: size,
							thumb: instance._hueThumb,
							thumbImage: hueThumbImage
						}
					);

					instance._hueSlider.render(instance._pickerContainer);
				},

				_restoreRGB: function(event) {
					var instance = this;

					instance.set('rgb', instance._oldRGB);
					instance._updateHue();
					instance._updatePickerThumb();
					instance._updateColorSwatch();

					instance.fire('colorChange');
				},

				_setDragStart: function(x, y) {
					var instance = this;

					if (isArray(x)) {
						return instance._setDragStart.apply(instance, x);
					}

					var dd = instance._colorPicker;

					dd._dragThreshMet = true;
					dd._fixIEMouseDown();

					A.DD.DDM.activeDrag = dd;

					var xy = dd.get('dragNode').getXY();

					var thumbOffset = instance._getThumbOffset();

					xy[0] += thumbOffset[0];
					xy[1] += thumbOffset[1];

					dd._setStartPosition(xy);
					dd.set('activeHandle', dd.get('dragNode'));

					dd.start();
					dd._alignNode([x, y]);
				},

				_translateOffset: function(x, y) {
					var instance = this;

					var offsetXY = instance._offsetXY;
					var offset = [];

					offset[0] = Math.round(x - offsetXY[0]);
					offset[1] = Math.round(y - offsetXY[1]);

					return offset;
				},

				_updateCanvas: function(rgb) {
					var instance = this;

					rgb = rgb || instance.get('rgb');

					instance._colorCanvas.setStyle('backgroundColor', 'rgb(' + [rgb.red, rgb.green, rgb.blue].join(',') + ')');
				},

				_updateColor: function(event, color) {
					var instance = this;

					instance.set(color, event.target.get('value'));
				},

				_updateColorSwatch: function(rgb) {
					var instance = this;

					rgb = rgb || instance.get('rgb');

					instance._colorSwatchCurrent.setStyle('backgroundColor', 'rgb(' + [rgb.red, rgb.green, rgb.blue].join(',') + ')');
				},

				_updateControls: function() {
					var instance = this;

					var rgb = instance.get('rgb');

					instance._formFieldR.set('value', rgb.red);
					instance._formFieldG.set('value', rgb.green);
					instance._formFieldB.set('value', rgb.blue);

					instance._formFieldHex.set('value', instance.get('hex'));
				},

				_updateHue: function() {
					var instance = this;

					var size = instance._getPickerSize();
					var hue = instance.get('hsv.hue');

					hue = size - Math.round(hue / 360 * size);

					if (hue === size) {
						hue = 0;
					}

					instance._hueSlider.set(
						'value',
						 hue,
						{
							src: 'controls'
						}
					);
				},

				_updateOriginalColorSwatch: function(rgb) {
					var instance = this;

					rgb = rgb || instance.get('rgb');

					instance._colorSwatchOriginal.setStyle('backgroundColor', 'rgb(' + [rgb.red, rgb.green, rgb.blue].join(',') + ')');
				},

				_updateOriginalRGB: function() {
					var instance = this;

					instance._oldRGB = instance.get('rgb');
					instance._updateOriginalColorSwatch(instance._oldRGB);
				},

				_updatePickerOffset: function() {
					var instance = this;

					instance._offsetXY = instance._colorCanvas.getXY();
				},

				_updatePickerThumb: function() {
					var instance = this;

					instance._updatePickerOffset();

					var hsv = instance.get('hsv');

					var size = instance.get('pickersize');

					var saturation = hsv.saturation = Math.round(hsv.saturation * 100);
					var value = hsv.value = Math.round(hsv.value * 100);

					var xy = instance._convertOffsetToValue(saturation, value);

					xy = instance._convertValueToOffset(xy);

					instance._canvasThumbXY = xy;

					var dd = instance._colorPicker;

					instance._preventDragEvent = true;

					dd._setStartPosition(dd.get('dragNode').getXY());
		            dd._alignNode(xy, true);

					instance._preventDragEvent = false;
				},

				_updateRGB: function(event) {
					var instance = this;

					if (event.subAttrName || event.attrName == 'hex') {
						instance.fire(
							'colorChange',
							{
								src: 'controls'
							}
						);
					}
				},

				_canvasThumbXY: [0, 0],
				_offsetXY: [0, 0]
			}
		);

		A.ColorPicker = ColorPicker;
	},
	'@VERSION',
	{
		requires: ['context-overlay','dd', 'slider', 'substitute', 'tool-item'],
		use: []
	}
);