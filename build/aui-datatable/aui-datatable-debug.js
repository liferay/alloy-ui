AUI.add('aui-datatable-events', function(A) {
// TODO - optimize code

var Lang = A.Lang,
	isArray = Lang.isArray,
	isObject = Lang.isObject,
	isValue = Lang.isValue,

	Aeach = A.Array.each,
	getObjectKeys = A.Object.keys,
	getObjectValues = A.Object.values,
	selectorTest = A.Selector.test,
	YgetClassName = A.ClassNameManager.getClassName,

	_toInitialCap = A.cached(function(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }),

	_getEvtType = A.cached(function(tagName, eventType) {
		return tagName + _toInitialCap(eventType.toLowerCase());
	}),

	BOUNDING_BOX = 'boundingBox',
	CELL = 'cell',
	CELL_SELECTOR = 'cellSelector',
	CHILD_NODES = 'childNodes',
	CLICK = 'click',
	COLUMN = 'column',
	COLUMNSET = 'columnset',
	COLUMN_INDEX = 'columnIndex',
	EVENTS = 'events',
	HEADER = 'header',
	HEADERS = 'headers',
	HOST = 'host',
	ID = 'id',
	IN_HEAD = 'inHead',
	KEYDOWN = 'keydown',
	KEYUP = 'keyup',
	LINER = 'liner',
	MOUSEDOWN = 'mousedown',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	MOUSEUP = 'mouseup',
	RECORDSET = 'recordset',
	ROW = 'row',
	TABLE = 'table',
	TAGS = 'tags',
	TAG_NAME = 'tagName',
	TBODY = 'tbody',
	TH = 'th',
	THEAD = 'thead',
	TR = 'tr',
    DATATABLE = 'datatable',

	_COMMA = ',',
	_DOT = '.',
	_HASH = '#',
	_SPACE = ' ',

	CSS_DATATABLE_LINER = YgetClassName(DATATABLE, LINER);

var DataTableEvents = A.Base.create("dataTableEvents", A.Plugin.Base, [], {
	_bubbling: false,
	_handler: null,
	_tagsFilter: null,

     initializer: function(config) {
		var instance = this;
		var tags = instance.get(TAGS);

		instance._tagsFilter = getObjectKeys(tags).join(_COMMA);

		instance._initEvents();
    },

	destructor: function() {
		var instance = this;
		var handler = instance._handler;

		if (handler) {
			handler.detach();
		}
	},

	getColumn: function(i) {
		var instance = this;
		var host = instance.get(HOST);

		return host.get(COLUMNSET).idHash[i];
	},

	getColumnByCell: function(cell) {
		var instance = this;
		var dataHeaderId = cell.getAttribute(HEADERS).split(_SPACE).pop() || cell.get(ID);

		return instance.getColumn(dataHeaderId);
	},

	getColumnIndex: function(column) {
		return column.keyIndex;
	},

	getColumnNode: function(column) {
		return column.thNode;
	},

	getColNode: function(cell) {
		var instance = this;
		var host = instance.get(HOST);
		var index = instance.getColumnIndex(instance.getColumnByCell(cell));

		return host._colgroupNode.get(CHILD_NODES).item(index);
	},

	getRecord: function(i) {
		var instance = this;
		var host = instance.get(HOST);

		return host.get(RECORDSET).getRecord(i);
	},

	getRecordByRow: function(row) {
		var instance = this;

		return instance.getRecord(row.get(ID));
	},

	_filterBubble: function(target) {
		var instance = this;
		var host = instance.get(HOST);
		var container = host._tableNode.getDOM();

		var nodes = [];

		while (target) {
			var isContainer = (target === container);

			if (selectorTest(target, instance._tagsFilter, (isContainer ? null : container))) {
				nodes.push(target);
			}

			if (isContainer) {
				break;
			}

			target = target.parentNode;
		}

		// Adding respective col node to the nodes array in such a way
		// that the bubble order is: (td|th), tr, col, (tbody|thead) and table.
		if (nodes.length) {
			var column = instance.getColNode(A.one(nodes[0]));

			if (column) {
				nodes.splice(2, 0, column.getDOM());
			}
		}

		return nodes;
	},

	_handleEvents: function(event) {
		var i, length;
		var instance = this;
		var host = instance.get(HOST);
		var thead  = host._theadNode;
		var tags = instance.get(TAGS);
		var currentTarget = event.currentTarget;
		var eventType = event.type;

		var inHead = currentTarget.getData(IN_HEAD);
		var liner = currentTarget.getData(LINER);
		var row = currentTarget.getData(ROW);

		if (!isValue(inHead)) {
			inHead = thead.contains(currentTarget);
			currentTarget.setData(IN_HEAD, inHead);
		}

		if (!isValue(liner)) {
			liner = currentTarget.one(_DOT+CSS_DATATABLE_LINER);
			currentTarget.setData(LINER, liner);
		}

		if (!isValue(row)) {
			row = currentTarget.ancestor(TR);
			currentTarget.setData(ROW, row);
		}

		var payload = {
			cell: currentTarget,
			column: instance.getColumnByCell(currentTarget),
			inHead: inHead,
			liner: liner,
			originalEvent: event,
			row: row,
			record: instance.getRecordByRow(row)
		};

		var nodes = instance._filterBubble(event.currentTarget.getDOM());

		instance._bubbling = true;

		for (i = 0, length = nodes.length; (i < length) && instance._bubbling; i++) {
			var node = A.one(nodes[i]);
			var propertyName = tags[node.get(TAG_NAME).toLowerCase()];

			payload.node = node;
			payload.property = propertyName;

			host.fire(
				_getEvtType(propertyName, eventType),
				payload
			);
		}
	},

	_initEvents: function() {
		var instance = this;
		var host = instance.get(HOST);
		var tags = instance.get(TAGS);
		var events = instance.get(EVENTS);

		var publish = {};

		Aeach(getObjectValues(tags), function(propertyName) {
			Aeach(events, function(eventType) {
				var newEventType = _getEvtType(propertyName, eventType);

				publish[newEventType] = {
					stoppedFn: A.bind(instance._stopBubble, instance)
				};
			});
		});

		host.publish(publish);

		instance._handler = host.get(BOUNDING_BOX).delegate(events, A.bind(instance._handleEvents, instance), instance.get(CELL_SELECTOR));
	},

	_stopBubble: function() {
		var instance = this;

		instance._bubbling = false;
	}
},
{
    NS: "edit",

    NAME: "dataTableEvents",

    ATTRS: {
		cellSelector: {
			value: 'td,th',
			writeOnce: true
		},

		events: {
			validator: isArray,
            value: [ CLICK, KEYDOWN, KEYUP, MOUSEDOWN, MOUSEENTER, MOUSELEAVE, MOUSEUP ]
        },

		tags: {
			validator: isObject,
			value: {
				col: COLUMN,
				table: TABLE,
				thead: THEAD,
				tbody: TBODY,
				tr: ROW,
				th: HEADER,
				td: CELL
			},
			writeOnce: true
		}
    }
});

A.namespace("Plugin").DataTableEvents = DataTableEvents;

}, '@VERSION@' ,{requires:['aui-base','datatable','plugin']});
AUI.add('aui-datatable-edit', function(A) {


}, '@VERSION@' ,{requires:['aui-base','datatable','plugin'], skinnable:true});


AUI.add('aui-datatable', function(A){}, '@VERSION@' ,{use:['aui-datatable-events','aui-datatable-edit'], skinnable:false});

