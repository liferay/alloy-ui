var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

	YArray = A.Array,

	isAnchor = function(val) {
		return (val instanceof A.Anchor);
	},

	isArrayList = function(val) {
		return (val instanceof A.ArrayList);
	},

	ANCHOR = 'anchor',
	ARROW_POINTS = 'arrowPoints',
	BODY = 'body',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	COLOR = 'color',
	CONNECTOR = 'connector',
	DATA_ANCHOR = 'dataAnchor',
	DIAGRAM = 'diagram',
	DIAGRAM_NODE = 'diagramNode',
	HEIGHT = 'height',
	ID = 'id',
	LAZY_DRAW = 'lazyDraw',
	MAX_SOURCES = 'maxSources',
	MAX_TARGETS = 'maxTargets',
	NODE = 'node',
	P1 = 'p1',
	P2 = 'p2',
	PATH = 'path',
	SHAPE = 'shape',
	SOURCES = 'sources',
	TARGETS = 'targets',
	VIEWPORT = 'viewport',
	WIDTH = 'width',
	WRAPPER = 'wrapper',

	_DOT = '.',

	AgetClassName = A.getClassName,

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

		YArray.each(points, function(p, i) {
			if (i > 0) {
				shape.lineTo(points[i][0], points[i][1]);
			}
		});

		shape.lineTo(points[0][0], points[0][1]);
		shape.end();
	},

	translatePoints: function(points, x, y) {
		var instance = this;
		var xy = [];

		YArray.each(points, function(p, i) {
			xy.push([ points[i][0] + x, points[i][1] + y ]);
		});

		return xy;
	},

	rotatePoints: function(points, angle) {
		var instance = this;
		var xy = [];

		YArray.each(points, function(p, i) {
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
	graphics: null,
	shape: null,

	initializer: function(config) {
		var instance = this;

		instance.after({
			p1Change: instance.draw,
			p2Change: instance.draw
		});

		instance._initGraphics();
		instance._initShapes();

		if (!instance.get(LAZY_DRAW)) {
			instance.draw();
		}
	},

	destroy: function() {
		var instance = this;

		instance.graphics.destroy();
	},

	draw: function() {
		var instance = this;
		var shape = instance.shape;

		var c1 = instance.getCoordinate(instance.get(P1));
		var c2 = instance.getCoordinate(instance.get(P2));

		shape.clear();

		A.PolygonUtil.drawLineArrow(shape, c1[0], c1[1], c2[0], c2[1], instance.get(ARROW_POINTS));
	},

	getCoordinate: function(p) {
		var instance = this;
		var xy = instance.get(VIEWPORT).getXY();

		return [ p[0] - xy[0], p[1] - xy[1] ];
	},

	_initGraphics: function() {
		var instance = this;

		var graphics = new A.Graphic({
			width: instance.get(WIDTH),
			height: instance.get(HEIGHT),
			render: instance.get(VIEWPORT)
		});

		instance.graphics = graphics;
	},

	_initShapes: function() {
		var instance = this;

		instance.shape = instance.graphics.getShape(
			instance.get(SHAPE)
		);
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
	}
},{
	ATTRS: {
		color: {
			value: '#666',
			validator: isString
		},

		lazyDraw: {
			value: false,
			validator: isBoolean
		},

		viewport: {
			setter: A.one,
			value: BODY
		},

		shape: {
			value: null,
			setter: '_setShape'
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
			targetsChange: instance._afterTargetsChange
		});
	},

	addSource: function(source) {
		var instance = this;

		return instance.updateSources(
			instance.get(SOURCES).remove(source).add(source)
		);
	},

	addTarget: function(target) {
		var instance = this;

		return instance.updateTargets(
			instance.get(TARGETS).remove(target).add(target)
		);
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

	connect: function(target) {
		var instance = this;

		instance.addTarget(target);

		if (!instance.isConnected(target)) {
			var tConnector = target.get(CONNECTOR);

			tConnector.p1 = instance.getCenterXY();
			tConnector.p2 = target.getCenterXY();

			instance.connectors[target.get(ID)] = new A.Connector(tConnector);
		}

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

	getCenterXY: function() {
		var instance = this;

		return instance.get(NODE).getCenterXY();
	},

	getConnector: function(target) {
		var instance = this;

		return instance.connectors[target.get(ID)];
	},

	isConnected: function(target) {
		var instance = this;

		return instance.connectors.hasOwnProperty(target.get(ID));
	},

	updateSources: function(sources) {
		var instance = this;

		instance.set(SOURCES, sources);

		return instance;
	},

	updateTargets: function(targets) {
		var instance = this;

		instance.set(TARGETS, targets);

		return instance;
	},

	removeSource: function(source) {
		var instance = this;

		return instance.updateSources(
			instance.get(SOURCES).remove(source)
		);
	},

	removeTarget: function(target) {
		var instance = this;

		return instance.updateTargets(
			instance.get(TARGETS).remove(target)
		);
	},

	_afterActiveChange: function(event) {
		var instance = this;

		instance._uiSetActive(event.newVal);
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
				viewport: instance.get(VIEWPORT)
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

		val = instance._setAnchors(val);

		val.each(function(anchor) {
			anchor.addSource(instance);
		});

		return val;
	},

	_setAnchors: function(val) {
		var instance = this;

		if (!isArrayList(val)) {
			var targets = [];

			A.Array.each(val, function(target) {
				if (isString(target)) {
					// TODO - need this?
					target = A.Anchor.getAnchorByNode(target);
				}

				targets.push( isAnchor(target) ? target : new A.Anchor(target) );
			});

			val = new A.ArrayList(targets);
		}

		return val;
	},

	_setNode: function(val) {
		var instance = this;
		var id = instance.get(ID);

		return A.one(val).set(ID, id).setData(DATA_ANCHOR, instance);
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
			value: Infinity,
			validator: isNumber
		},

		maxTargets: {
			value: Infinity,
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
		},

		viewport: {
			setter: A.one,
			value: BODY
		}
	},

	getAnchorByNode: function(node) {
		return A.one(node).getData(DATA_ANCHOR);
	}
});