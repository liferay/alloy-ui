var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isString = Lang.isString,

	AArray = A.Array,

	isGraphic = function(val) {
		return (val instanceof A.Graphic);
	},

	ANCHOR = 'anchor',
	ARROW_POINTS = 'arrowPoints',
	BUILDER = 'builder',
	CLICK = 'click',
	COLOR = 'color',
	CONNECTOR = 'connector',
	DIAGRAM_NODE = 'diagramNode',
	FILL = 'fill',
	GRAPHIC = 'graphic',
	LAZY_DRAW = 'lazyDraw',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	P1 = 'p1',
	P2 = 'p2',
	PATH = 'path',
	SELECTED = 'selected',
	SHAPE = 'shape',
	SHAPE_HOVER = 'shapeHover',
	SHAPE_SELECTED = 'shapeSelected',
	STROKE = 'stroke',
	VISIBLE = 'visible';

A.PolygonUtil = {
	ARROW_POINTS: [
		[ -12, -6 ],
		[ -8, 0 ],
		[ -12, 6 ],
		[ 6, 0 ]
	],

	drawLineArrow: function(shape, x1, y1, x2, y2, arrowPoints) {
		var instance = this;

		shape.moveTo(x1, y1);
		shape.lineTo(x2, y2);

		var angle = Math.atan2(y2-y1, x2-x1);

		// Slide the arrow position along the line in 15px in polar coordinates
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

	initializer: function(config) {
		var instance = this;
		var lazyDraw = instance.get(LAZY_DRAW);

		instance.after({
			p1Change: instance.draw,
			p2Change: instance.draw,
			selectedChange: instance._afterSelectedChange
		});

		instance._initShapes();

		if (!lazyDraw) {
			instance.draw();
		}

		instance._uiSetSelected(instance.get(SELECTED), !lazyDraw);
	},

	destroy: function() {
		var instance = this;

		instance.shape.destroy();
	},

	draw: function() {
		var instance = this;
		var shape = instance.shape;

		var c1 = instance.getCoordinate(instance.get(P1));
		var c2 = instance.getCoordinate(instance.get(P2));

		shape.clear();

		A.PolygonUtil.drawLineArrow(shape, c1[0], c1[1], c2[0], c2[1], instance.get(ARROW_POINTS));

		shape.end();

		return instance;
	},

	getCoordinate: function(p) {
		var instance = this;
		var xy = instance.get(GRAPHIC).getXY();

		return [ p[0] - xy[0], p[1] - xy[1] ];
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
		var anchor = instance.get(ANCHOR);
		var strings = anchor ? anchor.get(DIAGRAM_NODE).getStrings() : {};

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

	hide: function() {
		var instance = this;

		instance.shape.set(VISIBLE, false);

		return instance;
	},

	show: function() {
		var instance = this;

		instance.shape.set(VISIBLE, true);

		return instance;
	},

	toJSON: function() {
		var instance = this;
		var output = {};

		AArray.each(instance.SERIALIZABLE_ATTRS, function(attributeName) {
			output[attributeName] = instance.get(attributeName);
		});

		return output;
	},

	_afterSelectedChange: function(event) {
		var instance = this;

		instance._uiSetSelected(event.newVal);
	},

	_initShapes: function() {
		var instance = this;

		var shape = instance.shape = instance.get(GRAPHIC).addShape(
			instance.get(SHAPE)
		);

		shape.on(CLICK, A.bind(instance._onShapeClick, instance));
		shape.on(MOUSEENTER, A.bind(instance._onShapeMouseEnter, instance));
		shape.on(MOUSELEAVE, A.bind(instance._onShapeMouseLeave, instance));
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
	},

	_onShapeMouseEnter: function(event) {
		var instance = this;

		if (!instance.get(SELECTED)) {
			var shapeHover = instance.get(SHAPE_HOVER);

			if (shapeHover) {
				instance._updateShape(shapeHover);
			}
		}
	},

	_onShapeMouseLeave: function(event) {
		var instance = this;

		if (!instance.get(SELECTED)) {
			instance._updateShape(instance.get(SHAPE));
		}
	},

	_setShape: function(val) {
		var instance = this;

		return A.merge(
			{
				type: PATH,
				stroke: {
					color: instance.get(COLOR),
					weight: 3
				},
				fill: {
					color: instance.get(COLOR)
				}
			},
			val
		);
	},

	_uiSetSelected: function(val, draw) {
		var instance = this;

		instance._updateShape(val ? instance.get(SHAPE_SELECTED) : instance.get(SHAPE), draw);
	},

	_updateShape: function(cShape, draw) {
		var instance = this;
		var shape = instance.shape;

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

		shapeHover: {
			value: {
				fill: {
					color: '#666'
				},
				stroke: {
					color: '#666',
					weight: 5
				}
			}
		},

		shapeSelected: {
			value: {
				fill: {
					color: '#000'
				},
				stroke: {
					color: '#000',
					weight: 5
				}
			}
		},

		transition: {
			value: {},
			validator: isObject
		}
	}
});