AUI.add('aui-diagram-builder-connector', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

	AArray = A.Array,

	isAnchor = function(val) {
		return (val instanceof A.Anchor);
	},

	isArrayList = function(val) {
		return (val instanceof A.ArrayList);
	},

	isDiagramNode = function(val) {
		return (val instanceof A.DiagramNode);
	},

	isGraphic = function(val) {
		return (val instanceof A.Graphic);
	},

	ANCHOR = 'anchor',
	ARROW_POINTS = 'arrowPoints',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CLICK = 'click',
	COLOR = 'color',
	CONNECTOR = 'connector',
	DATA_ANCHOR = 'dataAnchor',
	DESCRIPTION = 'description',
	DIAGRAM = 'diagram',
	DIAGRAM_NODE = 'diagramNode',
	FILL = 'fill',
	GRAPHIC = 'graphic',
	ID = 'id',
	LAZY_DRAW = 'lazyDraw',
	MAX = 'max',
	MAX_SOURCES = 'maxSources',
	MAX_TARGETS = 'maxTargets',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	NODE = 'node',
	P1 = 'p1',
	P2 = 'p2',
	PATH = 'path',
	SELECTED = 'selected',
	SHAPE = 'shape',
	SHAPE_HOVER = 'shapeHover',
	SHAPE_SELECTED = 'shapeSelected',
	SOURCES = 'sources',
	STROKE = 'stroke',
	TARGETS = 'targets',
	WRAPPER = 'wrapper',

	_DOT = '.',
	_EMPTY_STR = '',
	_HASH = '#',

	AgetClassName = A.getClassName,

	CSS_DB_ANCHOR_NODE_MAX_TARGETS = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, MAX, TARGETS),
	CSS_DB_ANCHOR_NODE_MAX_SOURCES = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, MAX, SOURCES),
	CSS_DB_ANCHOR_NODE_WRAPPER = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, WRAPPER),
	CSS_DB_ANCHOR_NODE = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE);

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

		var angle = Math.atan2(y2-y1, x2-x1), centerX = (x2+x1)/2, centerY = (y2+y1)/2;

		instance.drawPolygon(
			shape,
			instance.translatePoints(instance.rotatePoints(arrowPoints || instance.ARROW_POINTS, angle), centerX, centerY)
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

		instance.get(GRAPHIC).removeShape(instance.shape);
	},

	draw: function() {
		var instance = this;
		var shape = instance.shape;

		var c1 = instance.getCoordinate(instance.get(P1));
		var c2 = instance.getCoordinate(instance.get(P2));

		shape.clear();

		A.PolygonUtil.drawLineArrow(shape, c1[0], c1[1], c2[0], c2[1], instance.get(ARROW_POINTS));

		shape.end();
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
				attributeName: DESCRIPTION,
				editor: new A.TextAreaCellEditor(),
				name: strings[DESCRIPTION]
			},
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

	_afterSelectedChange: function(event) {
		var instance = this;

		instance._uiSetSelected(event.newVal);
	},

	_initShapes: function() {
		var instance = this;

		var shape = instance.shape = instance.get(GRAPHIC).getShape(
			instance.get(SHAPE)
		);

		shape.on(CLICK, A.bind(instance._onShapeClick, instance));
		shape.on(MOUSEENTER, A.bind(instance._onShapeMouseEnter, instance));
		shape.on(MOUSELEAVE, A.bind(instance._onShapeMouseLeave, instance));
	},

	_onShapeClick: function(event) {
		var instance = this;
		var anchor = instance.get(ANCHOR);
		var selected = instance.get(SELECTED);

		if (anchor) {
			var builder = anchor.getBuilder();

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
			instance._updateShape(instance.get(SHAPE_HOVER));
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
					weight: 2
				},
				fill: {
					color: instance.get(COLOR)
				}
			},
			val
		);
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
	},

	_uiSetSelected: function(val, draw) {
		var instance = this;

		instance._updateShape(val ? instance.get(SHAPE_SELECTED) : instance.get(SHAPE), draw);
	}
},{
	ATTRS: {
		anchor: {
		},

		color: {
			value: '#666',
			validator: isString
		},

		description: {
			value: _EMPTY_STR,
			validator: isString
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

		graphic: {
			validator: isGraphic
		},

		shapeHover: {
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

		selected: {
			value: false,
			validator: isBoolean
		},

		shape: {
			value: null,
			setter: '_setShape'
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

		arrowPoints: {
			value: A.PolygonUtil.ARROW_POINTS
		},

		p1: {
			value: [0, 0],
			validator: isArray
		},

		p2: {
			value: [0, 0],
			validator: isArray
		}
	}
});

A.Anchor = A.Base.create('anchor', A.Base, [], {
	ANCHOR_WRAPPER_TEMPLATE: '<div class="' + CSS_DB_ANCHOR_NODE_WRAPPER + '"></div>',
	NODE_TEMPLATE: '<div class="' + CSS_DB_ANCHOR_NODE + '"></div>',

	connectors: null,

	initializer: function() {
		var instance = this;

		instance.connectors = {};

		instance._renderNode();

		instance.connectTargets();

		instance.after({
			sourcesChange: instance._afterSourcesChange,
			targetsChange: instance._afterTargetsChange
		});

		instance._uiSetMaxTargets(
			instance.get(MAX_TARGETS)
		);
	},

	addSource: function(source) {
		var instance = this;

		if (instance.get(SOURCES).size() < instance.get(MAX_SOURCES)) {
			instance.set(
				SOURCES,
				instance.get(SOURCES).remove(source).add(source)
			);
		}

		return instance;
	},

	addTarget: function(target) {
		var instance = this;

		if (instance.get(TARGETS).size() < instance.get(MAX_TARGETS)) {
			instance.set(
				TARGETS,
				instance.get(TARGETS).remove(target).add(target)
			);
		}

		return instance;
	},

	alignConnectors: function() {
		var instance = this;

		instance.get(TARGETS).each(function(target) {
			var tConnector = instance.getConnector(target);

			if (tConnector) {
				tConnector.set(P1, instance.getCenterXY());
				tConnector.set(P2, target.getCenterXY());
			}
		});

		instance.get(SOURCES).each(function(source) {
			var sConnector = source.getConnector(instance);

			if (sConnector) {
				sConnector.set(P1, source.getCenterXY());
				sConnector.set(P2, instance.getCenterXY());
			}
		});

		return instance;
	},

	destroy: function() {
		var instance = this;

		instance.disconnectTargets();
		instance.disconnectSources();

		instance.get(NODE).remove();
	},

	connect: function(target, connector) {
		var instance = this;

		if (isDiagramNode(target)) {
			target = target.findAvailableAnchor();
		}

		instance.addTarget(target);
		target.addSource(instance);

		if (!instance.isConnected(target)) {
			var c = A.merge(target.get(CONNECTOR), connector);

			c.anchor = instance;
			c.p1 = instance.getCenterXY();
			c.p2 = target.getCenterXY();

			instance.connectors[target.get(ID)] = new A.Connector(c);
		}

		setTimeout(function() {
			target.get(DIAGRAM_NODE).syncDropTargets();
		}, 50);

		return instance;
	},

	connectTargets: function() {
		var instance = this;

		instance.get(TARGETS).each(A.bind(instance.connect, instance));

		return instance;
	},

	disconnect: function(target) {
		var instance = this;

		instance.getConnector(target).destroy();
		instance.removeTarget(target);
		target.removeSource(instance);

		setTimeout(function() {
			target.get(DIAGRAM_NODE).syncDropTargets();
		}, 50);
	},

	disconnectTargets: function() {
		var instance = this;

		instance.get(TARGETS).each(function(target) {
			instance.disconnect(target);
		});

		return instance;
	},

	disconnectSources: function() {
		var instance = this;

		instance.get(SOURCES).each(function(source) {
			source.disconnect(instance);
		});

		return instance;
	},

	findConnectorTarget: function(connector) {
		var instance = this;
		var target = null;

		A.some(instance.connectors, function(c, targetId) {
			if (c === connector) {
				target = A.Anchor.getAnchorByNode(_HASH+targetId);
				return true;
			}
		});

		return target;
	},

	getBuilder: function() {
		var instance = this;

		return instance.get(DIAGRAM_NODE).get(BUILDER);
	},

	getCenterXY: function() {
		var instance = this;

		return instance.get(NODE).getCenterXY();
	},

	getConnector: function(target) {
		var instance = this;

		return instance.connectors[target.get(ID)];
	},

	hasConnection: function() {
		var instance = this;

		return ((instance.get(TARGETS).size() > 0) || (instance.get(SOURCES).size() > 0));
	},

	isConnected: function(target) {
		var instance = this;

		return instance.connectors.hasOwnProperty(target.get(ID));
	},

	removeSource: function(source) {
		var instance = this;

		instance.set(
			SOURCES,
			instance.get(SOURCES).remove(source)
		);

		return instance;
	},

	removeTarget: function(target) {
		var instance = this;

		instance.set(
			TARGETS,
			instance.get(TARGETS).remove(target)
		);

		delete instance.connectors[target.get(ID)];
		return instance;
	},

	_afterSourcesChange: function(event) {
		var instance = this;

		instance._uiSetSources(event.newVal);
	},

	_afterTargetsChange: function(event) {
		var instance = this;

		// TODO - event.prevVal is always equal to event.newVal, review this
        // logic below, references between anchors needs to be cleaned up otherwise
        // will store the wrong relationship between nodes.

		event.prevVal.each(function(anchor) {
			anchor.removeSource(instance);
		});

		event.newVal.each(function(anchor) {
			anchor.addSource(instance);
		});

		instance._uiSetTargets(event.newVal);
	},

	_renderNode: function() {
		var instance = this;
		var diagramNode = instance.get(DIAGRAM_NODE);
		var container = diagramNode.get(BOUNDING_BOX);

		instance.wrapper = container.one(_DOT+CSS_DB_ANCHOR_NODE_WRAPPER) ||
							A.Node.create(instance.ANCHOR_WRAPPER_TEMPLATE);

		instance.wrapper.appendTo(container).appendChild(instance.get(NODE));
	},

	_setConnector: function(val) {
		var instance = this;

		return A.merge(
			{
				graphic: instance.getBuilder().get(GRAPHIC)
			},
			val
		);
	},

	_setSources: function(val) {
		var instance = this;

		return instance._setAnchors(val);
	},

	_setTargets: function(val) {
		var instance = this;

		val = instance._setAnchors(val, true);

		val.each(function(anchor) {
			anchor.addSource(instance);
		});

		return val;
	},

	_setAnchors: function(val, target) {
		var instance = this;

		if (!isArrayList(val)) {
			var targets = [];

			A.Array.some(val, function(target, index) {
				if (index >= instance.get(target ? MAX_TARGETS : MAX_SOURCES)) {
					return true;
				}

				targets.push( isAnchor(target) ? target : new A.Anchor(target) );
			});

			val = new A.ArrayList(targets);
		}

		return val;
	},

	_setMaxSources: function(val) {
		var instance = this;

		instance._uiSetMaxSources(
			instance.get(MAX_SOURCES)
		);

		return val;
	},

	_setMaxTargets: function(val) {
		var instance = this;

		instance._uiSetMaxTargets(
			instance.get(MAX_TARGETS)
		);

		return val;
	},

	_setNode: function(val) {
		var instance = this;
		var id = instance.get(ID);

		return A.one(val).set(ID, id).setData(DATA_ANCHOR, instance);
	},

	_uiSetSources: function(val) {
		var instance = this;

		instance._uiSetMaxSources(
			instance.get(MAX_SOURCES)
		);
	},

	_uiSetMaxSources: function(val) {
		var instance = this;
		var node = instance.get(NODE);

		node.toggleClass(CSS_DB_ANCHOR_NODE_MAX_SOURCES, (instance.get(SOURCES).size() === val));
	},

	_uiSetMaxTargets: function(val) {
		var instance = this;
		var node = instance.get(NODE);

		node.toggleClass(CSS_DB_ANCHOR_NODE_MAX_TARGETS, (instance.get(TARGETS).size() === val));
	},

	_uiSetTargets: function(val) {
		var instance = this;

		instance._uiSetMaxTargets(
			instance.get(MAX_TARGETS)
		);
	}
},{
	ATTRS: {
		diagramNode: {
		},

		connector: {
			setter: '_setConnector',
			value: {},
			validator: isObject
		},

		id: {
			readOnly: true,
			valueFn: function() {
				return A.guid();
			}
		},

		maxSources: {
			setter: '_setMaxSources',
			value: 1,
			validator: isNumber
		},

		maxTargets: {
			setter: '_setMaxTargets',
			value: 1,
			validator: isNumber
		},

		node: {
			setter: '_setNode',
			valueFn: function() {
				var instance = this;

				return A.Node.create(instance.NODE_TEMPLATE);
			}
		},

		sources: {
			value: [],
			setter: '_setSources',
			validator: function(val) {
				return isArray(val) || isArrayList(val);
			}
		},

		targets: {
			value: [],
			setter: '_setTargets',
			validator: function(val) {
				return isArray(val) || isArrayList(val);
			}
		}
	},

	getAnchorByNode: function(node) {
		return isAnchor(node) ? node : A.one(node).getData(DATA_ANCHOR);
	}
});

}, '@VERSION@' ,{requires:['aui-base','arraylist-add','arraylist-filter','json','graphics','dd'], skinnable:true});
