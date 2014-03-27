AUI.add('aui-diagram-builder-connector', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isString = Lang.isString,

	AArray = A.Array,

	// The first Bernstein basis polynomials (n=3), http://en.wikipedia.org/wiki/B%C3%A9zier_curve
	// The t in the function for a linear Bézier curve can be thought of as describing how far B(t) is from P0 to P1.
	// For example when t=0.25, B(t) is one quarter of the way from point P0 to P1. As t varies from 0 to 1, B(t) describes a straight line from P0 to P1.
	B1 = function(t) { return (t*t*t); },
	B2 = function(t) { return (3*t*t*(1-t)); },
	B3 = function(t) { return (3*t*(1-t)*(1-t)); },
	B4 = function(t) { return ((1-t)*(1-t)*(1-t)); },

	// Find a Cubic Bezier point based on the control points. Consider the first two control points as the start and end point respectively.
	getCubicBezier = function(t, startPos, endPos, cp1, cp2) {
		var x = startPos[0] * B1(t) + cp1[0] * B2(t) + cp2[0] * B3(t) + endPos[0] * B4(t);
		var y = startPos[1] * B1(t) + cp1[1] * B2(t) + cp2[1] * B3(t) + endPos[1] * B4(t);
		return [x, y];
	},

	isGraphic = function(val) {
		return A.instanceOf(val, A.Graphic);
	},

	toDegrees = function(angleRadians) {
	  return angleRadians * 180 / Math.PI;
	},

	sign = function(x) {
		return x === 0 ? 0 : (x < 0 ? -1 : 1);
	},

	ARROW_POINTS = 'arrowPoints',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CLICK = 'click',
	COLOR = 'color',
	CONNECTOR = 'connector',
	DIAGRAM_NODE = 'diagramNode',
	FILL = 'fill',
	GRAPHIC = 'graphic',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	LAZY_DRAW = 'lazyDraw',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	NODE_NAME = 'nodeName',
	P1 = 'p1',
	P2 = 'p2',
	PATH = 'path',
	REGION = 'region',
	SELECTED = 'selected',
	SHAPE = 'shape',
	SHAPE_ARROW = 'shapeArrow',
	SHAPE_ARROW_HOVER = 'shapeArrowHover',
	SHAPE_ARROW_SELECTED = 'shapeArrowSelected',
	SHAPE_HOVER = 'shapeHover',
	SHAPE_SELECTED = 'shapeSelected',
	SHOW_NAME = 'showName',
	STROKE = 'stroke',
	VISIBLE = 'visible',

	CSS_HELPER_HIDDEN = A.getClassName(HELPER, HIDDEN);

A.PolygonUtil = {
	ARROW_POINTS: [
		[ -12, -6 ],
		[ -8, 0 ],
		[ -12, 6 ],
		[ 6, 0 ]
	],

	drawArrow: function(shape, x1, y1, x2, y2, arrowPoints) {
		var instance = this;

		var angle = Math.atan2(y2-y1, x2-x1);

		shape.moveTo(x2, y2);

		// Slide the arrow position along the line in 5px in polar coordinates
		x2 = x2 - 5*Math.cos(angle);
		y2 = y2 - 5*Math.sin(angle);

		instance.drawPolygon(
			shape,
			instance.translatePoints(instance.rotatePoints(arrowPoints || instance.ARROW_POINTS, angle), x2, y2)
		);
	},

	drawPolygon: function(shape, points) {
		var instance = this;

		shape.moveTo(points[0][0], points[0][1]);

		AArray.each(points, function(p, i) {
			if (i > 0) {
				shape.lineTo(points[i][0], points[i][1]);
			}
		});

		shape.lineTo(points[0][0], points[0][1]);
	},

	translatePoints: function(points, x, y) {
		var instance = this;
		var xy = [];

		AArray.each(points, function(p, i) {
			xy.push([ points[i][0] + x, points[i][1] + y ]);
		});

		return xy;
	},

	rotatePoints: function(points, angle) {
		var instance = this;
		var xy = [];

		AArray.each(points, function(p, i) {
			xy.push(instance.rotatePoint(angle, points[i][0], points[i][1]));
		});

		return xy;
	},

	rotatePoint: function(angle, x, y) {
		return [
			(x * Math.cos(angle)) - (y * Math.sin(angle)),
			(x * Math.sin(angle)) + (y * Math.cos(angle))
		];
	}
};

A.Connector = A.Base.create('line', A.Base, [], {
	SERIALIZABLE_ATTRS: [COLOR, LAZY_DRAW, NAME, SHAPE_SELECTED, SHAPE_HOVER, /*SHAPE,*/ P1, P2],

	shape: null,
	shapeArrow: null,

	initializer: function(config) {
		var instance = this;
		var lazyDraw = instance.get(LAZY_DRAW);

		instance.after({
			nameChange: instance._afterNameChange,
			p1Change: instance.draw,
			p2Change: instance.draw,
			selectedChange: instance._afterSelectedChange,
			showNameChange: instance._afterShowNameChange,
			visibleChange: instance._afterVisibleChange
		});

		instance._initShapes();

		if (!lazyDraw) {
			instance.draw();
		}

		instance._uiSetVisible(instance.get(VISIBLE));
		instance._uiSetName(instance.get(NAME));
		instance._uiSetSelected(instance.get(SELECTED), !lazyDraw);
		instance._uiSetShowName(instance.get(SHOW_NAME));
	},

	destructor: function() {
		var instance = this;

		instance.shape.destroy();
		instance.shapeArrow.destroy();
		instance.get(NODE_NAME).remove();
	},

	draw: function() {
		var instance = this;
		var shape = instance.shape;
		var shapeArrow = instance.shapeArrow;

		var p1 = instance.get(P1),
			p2 = instance.get(P2),
			c1 = instance.toCoordinate(p1),
			c2 = instance.toCoordinate(p2),
			x1 = c1[0],
			y1 = c1[1],
			x2 = c2[0],
			y2 = c2[1],
			dx = Math.max(Math.abs(x1 - x2) / 2, 10),
			dy = Math.max(Math.abs(y1 - y2) / 2, 10),

			curveArgs = null,
			nQuadrantSections = 8,
			angle = toDegrees(Math.atan2(y2-y1, x2-x1)),
			pseudoQuadrant = Math.round(Math.abs(angle)/(360/nQuadrantSections));

		if (sign(angle) < 0) {
			curveArgs = [
				[x1+dx, y1, x2-dx, y2, x2, y2], //3,6
				[x1+dx, y1, x2, y1-dy, x2, y2], //3,5
				[x1, y1-dy, x2, y1-dy, x2, y2], //0,5
				[x1-dx, y1, x2, y1-dy, x2, y2], //2,5
				[x1-dx, y1, x2+dx, y2, x2, y2] //2,7
			];
		}
		else {
			curveArgs = [
				[x1+dx, y1, x2-dx, y2, x2, y2], //3,6
				[x1+dx, y1, x2, y1+dy, x2, y2], //3,4
				[x1, y1+dy, x2, y1+dy, x2, y2], //1,4
				[x1-dx, y1, x2, y1+dy, x2, y2], //2,4
				[x1-dx, y1, x2+dx, y2, x2, y2] //2,7
			];
		}

		var cp = curveArgs[pseudoQuadrant];

		shape.clear();
		shape.moveTo(x1, y1);
		shape.curveTo.apply(shape, cp);
		shape.end();

		// Extract the angle from a segment of the current Cubic Bezier curve to rotate the arrow.
		// The segment should be an extremities for better angle extraction, on this particular case t = [0 to 0.025].
		var xy1 = getCubicBezier(0, [x1, y1], [x2, y2], [cp[0], cp[1]], [cp[2], cp[3]]),
			xy2 = getCubicBezier(0.075, [x1, y1], [x2, y2], [cp[0], cp[1]], [cp[2], cp[3]]),
			centerXY = getCubicBezier(0.5, [x1, y1], [x2, y2], [cp[0], cp[1]], [cp[2], cp[3]]);

		shapeArrow.clear();
		A.PolygonUtil.drawArrow(shapeArrow, xy2[0], xy2[1], xy1[0], xy1[1], instance.get(ARROW_POINTS));
		shapeArrow.end();

		if (instance.get(SHOW_NAME)) {
			instance.get(NODE_NAME).center(instance.toXY(centerXY));
		}

		return instance;
	},

	getProperties: function() {
		var instance = this;
		var propertyModel = instance.getPropertyModel();

		AArray.each(propertyModel, function(property) {
			property.value = instance.get(property.attributeName);
		});

		return propertyModel;
	},

	getPropertyModel: function() {
		var instance = this;
		var strings = instance.getStrings();

		return [
			{
				attributeName: NAME,
				editor: new A.TextCellEditor({
					validator: {
						rules: {
							value: {
								required: true
							}
						}
					}
				}),
				name: strings[NAME]
			}
		];
	},

	getStrings: function() {
		return A.Connector.STRINGS;
	},

	hide: function() {
		var instance = this;

		instance.set(VISIBLE, false);

		return instance;
	},

	show: function() {
		var instance = this;

		instance.set(VISIBLE, true);

		return instance;
	},

	toCoordinate: function(coord) {
		var instance = this;

		return instance._offsetXY(coord, -1);
	},

	toJSON: function() {
		var instance = this;
		var output = {};

		AArray.each(instance.SERIALIZABLE_ATTRS, function(attributeName) {
			output[attributeName] = instance.get(attributeName);
		});

		return output;
	},

	toXY: function(coord) {
		var instance = this;

		return instance._offsetXY(coord, 1);
	},

	_afterNameChange: function(event) {
	    var instance = this;

		instance._uiSetName(event.newVal);

		instance.draw();
	},

	_afterSelectedChange: function(event) {
		var instance = this;

		instance._uiSetSelected(event.newVal);
	},

	_afterShowNameChange: function(event) {
		var instance = this;

		instance._uiSetShowName(event.newVal);
	},

	_afterVisibleChange: function(event) {
	    var instance = this;

		instance._uiSetVisible(event.newVal);
	},

	_initShapes: function() {
		var instance = this;

		var shape = instance.shape = instance.get(GRAPHIC).addShape(
			instance.get(SHAPE)
		);

		var shapeArrow = instance.shapeArrow = instance.get(GRAPHIC).addShape(
			instance.get(SHAPE_ARROW)
		);

		shape.on(CLICK, A.bind(instance._onShapeClick, instance));
		shape.on(MOUSEENTER, A.bind(instance._onShapeMouseEnter, instance));
		shape.on(MOUSELEAVE, A.bind(instance._onShapeMouseLeave, instance));
		shapeArrow.on(CLICK, A.bind(instance._onShapeClick, instance));
		instance.get(NODE_NAME).on(CLICK, A.bind(instance._onShapeClick, instance));
	},

	_offsetXY: function(xy, sign) {
		var instance = this;
		var offsetXY = instance.get(GRAPHIC).getXY();

		return [ xy[0] + offsetXY[0]*sign, xy[1] + offsetXY[1]*sign ];
	},

	_onShapeClick: function(event) {
		var instance = this;
		var builder = instance.get(BUILDER);
		var selected = instance.get(SELECTED);

		if (builder) {
			if (event.hasModifier()) {
				builder.closeEditProperties();
			}
			else {
				builder.unselectConnectors();

				if (selected) {
					builder.closeEditProperties();
				}
				else {
					builder.editConnector(instance);
				}
			}
		}

		instance.set(SELECTED, !selected);

		event.halt();
	},

	_onShapeMouseEnter: function(event) {
		var instance = this;

		if (!instance.get(SELECTED)) {
			var shapeHover = instance.get(SHAPE_HOVER);
			var shapeArrowHover = instance.get(SHAPE_ARROW_HOVER);

			if (shapeHover) {
				instance._updateShape(instance.shape, shapeHover);
			}

			if (shapeArrowHover) {
				instance._updateShape(instance.shapeArrow, shapeArrowHover);
			}
		}
	},

	_onShapeMouseLeave: function(event) {
		var instance = this;

		if (!instance.get(SELECTED)) {
			instance._updateShape(instance.shape, instance.get(SHAPE));
			instance._updateShape(instance.shapeArrow, instance.get(SHAPE_ARROW));
		}
	},

	_setNodeName: function(val) {
		var instance = this;

		if (!A.instanceOf(val, A.Node)) {
			val = new A.Template(val).render();
			instance.get(BUILDER).canvas.append(val.unselectable());
		}

		return val;
	},

	_setShape: function(val) {
		var instance = this;

		return A.merge(
			{
				type: PATH,
				stroke: {
					color: instance.get(COLOR),
					weight: 2,
					opacity: 1
				}
			},
			val
		);
	},

	_setShapeArrow: function(val) {
		var instance = this;

		return A.merge(
			{
				type: PATH,
				fill: {
					color: instance.get(COLOR),
					opacity: 1
				},
				stroke: {
					color: instance.get(COLOR),
					weight: 2,
					opacity: 1
				}
			},
			val
		);
	},

	_uiSetName: function(val) {
		var instance = this;

		instance.get(NODE_NAME).html(val);
	},

	_uiSetSelected: function(val, draw) {
		var instance = this;

		instance._updateShape(instance.shape, val ? instance.get(SHAPE_SELECTED) : instance.get(SHAPE), draw);
		instance._updateShape(instance.shapeArrow, val ? instance.get(SHAPE_ARROW_SELECTED) : instance.get(SHAPE_ARROW), draw);
	},

	_uiSetShowName: function(val) {
		var instance = this;

		instance.get(NODE_NAME).toggleClass(CSS_HELPER_HIDDEN, !val);
	},

	_uiSetVisible: function(val) {
		var instance = this;

		instance.shape.set(VISIBLE, val);
		instance.shapeArrow.set(VISIBLE, val);
		instance._uiSetShowName(val && instance.get(SHOW_NAME));
	},

	_updateShape: function(shape, cShape, draw) {
		var instance = this;

		if (cShape.hasOwnProperty(FILL)) {
			shape.set(FILL, cShape[FILL]);
		}

		if (cShape.hasOwnProperty(STROKE)) {
			shape.set(STROKE, cShape[STROKE]);
		}

		if (draw !== false) {
			instance.draw();
		}
	}
},{
	ATTRS: {
		arrowPoints: {
			value: A.PolygonUtil.ARROW_POINTS
		},

		builder: {
		},

		color: {
			value: '#27aae1',
			validator: isString
		},

		graphic: {
			validator: isGraphic
		},

		lazyDraw: {
			value: false,
			validator: isBoolean
		},

		name: {
			valueFn: function() {
				var instance = this;

				return CONNECTOR + (++A.Env._uidx);
			},
			validator: isString
		},

		nodeName: {
			setter: '_setNodeName',
			value: [ '<span class="{$ans}diagram-builder-connector-name"></span>' ],
			writeOnce: true
		},

		p1: {
			value: [0, 0],
			validator: isArray
		},

		p2: {
			value: [0, 0],
			validator: isArray
		},

		selected: {
			value: false,
			validator: isBoolean
		},

		shape: {
			value: null,
			setter: '_setShape'
		},

		shapeArrow: {
			value: null,
			setter: '_setShapeArrow'
		},

		shapeArrowHover: {
			value: {
				fill: {
					color: '#ffd700'
				},
				stroke: {
					color: '#ffd700',
					weight: 5,
					opacity: 0.8
				}
			}
		},

		shapeArrowSelected: {
			value: {
				fill: {
					color: '#ff6600'
				},
				stroke: {
					color: '#ff6600',
					weight: 5,
					opacity: 0.8
				}
			}
		},

		shapeHover: {
			value: {
				stroke: {
					color: '#ffd700',
					weight: 5,
					opacity: 0.8
				}
			}
		},

		shapeSelected: {
			value: {
				stroke: {
					color: '#ff6600',
					weight: 5,
					opacity: 0.8
				}
			}
		},

		showName: {
			validator: isBoolean,
			value: true
		},

		transition: {
			value: {},
			validator: isObject
		},

		visible: {
			validator: isBoolean,
			value: true
		}
	},

	STRINGS: {
		name: 'Name'
	}
});

}, '@VERSION@' ,{requires:['aui-base','aui-template','arraylist-add','arraylist-filter','json','graphics','dd'], skinnable:true});
