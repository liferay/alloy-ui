AUI.add('aui-datatable-highlight', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,

	ACTIVE = 'active',
	ACTIVE_BORDER_WIDTH = 'activeBorderWidth',
	ACTIVE_CELL = 'activeCell',
	ACTIVE_ROW = 'activeRow',
	ACTIVE_ROW_CHANGE = 'activeRowChange',
	BORDER = 'border',
	CELL = 'cell',
	CELLS = 'cells',
	CHILDREN = 'children',
	HIGHLIGHT = 'highlight',
	HIGHLIGHT_RANGE = 'highlightRange',
	HOST = 'host',
	OVERLAY = 'overlay',
	OVERLAY_ACTIVE_NODE = 'overlayActiveNode',
	OVERLAY_NODE = 'overlayNode',
	RANGE_BORDER_WIDTH = 'rangeBorderWidth',
	REGION = 'region',
	ROWS = 'rows',
	SELECTION_CHANGE = 'selectionChange',
	TYPE = 'type',

	_SPACE = ' ',

	_setCSSClockwiseRule = function(val) {
		var instance = this,
			i = 0,
			len;

		if (isString(val)) {
			val = Lang.trim(val).replace(/\s+/g, ' ').split(_SPACE);
		}
		else if (!isArray(val)) {
			val = A.Array(val);
		}

		for (len = 4 - val.length; i < len; i++) {
			val.push(val[i]);
		}

		return A.Array.map(val, parseFloat);
	};

var DataTableHighlight = A.Base.create(
	'datatable-highlight',
	A.Plugin.Base, [],
	{
		CLASS_NAMES: null,

		TPL_FRAME: '<div class="{overlay}">' +
						'<div class="{border}"></div>' +
						'<div class="{border}"></div>' +
						'<div class="{border}"></div>' +
						'<div class="{border}"></div>' +
					'</div>',

		_nodes: null,

		initializer: function() {
			var instance = this,
				host = instance.get(HOST);

			instance.CLASS_NAMES = {
				active: host.getClassName(ACTIVE),
				border: host.getClassName(HIGHLIGHT, BORDER),
				highlight: host.getClassName(HIGHLIGHT),
				overlay: host.getClassName(HIGHLIGHT, OVERLAY),
				overlayActive: host.getClassName(HIGHLIGHT, OVERLAY, ACTIVE)
			};

			instance.afterHostEvent(ACTIVE_ROW_CHANGE, instance._afterActiveRowChange);
			instance.afterHostEvent(SELECTION_CHANGE, instance._afterSelectionChange);
		},

		clear: function() {
			var instance = this,
				host = instance.get(HOST),
				activeCell = host.get(ACTIVE_CELL);

			if (activeCell) {
				activeCell.removeClass(instance.CLASS_NAMES.active);
			}

			instance._clearBorders();
			instance._clearHighlights();
		},

		getActiveRegion: function() {
			var instance = this,
				host = instance.get(HOST),
				type = instance.get(TYPE),
				region = null,
				activeNode;

			if (type === ROWS) {
				activeNode = host.get(ACTIVE_ROW);
			}
			else {
				activeNode = host.get(ACTIVE_CELL);
			}

			if (activeNode) {
				region = activeNode.get(REGION);
			}

			return region;
		},

		getSelectionRegion: function() {
			var instance = this,
				nodes = instance._nodes,
				r1 = nodes[0].get(REGION),
				r2 = nodes[nodes.length-1].get(REGION);

			return {
				0: r1.top,
				1: r1.left,
				bottom: r2.bottom,
				height: r2.bottom - r1.top,
				left: r1.left,
				right: r2.right,
				top: r1.top,
				width: r2.right - r1.left
			};
		},

		_afterActiveRowChange: function(event) {
			var instance = this,
				activeBorderWidth = instance.get(ACTIVE_BORDER_WIDTH),
				overlayActiveNode = instance.get(OVERLAY_ACTIVE_NODE),
				classNames = instance.CLASS_NAMES;

			if (!instance.get(TYPE)) {
				return;
			}

			instance.clear();

			if (event.prevVal) {
				event.prevVal.removeClass(classNames.active);
			}

			if (event.newVal) {
				instance._alignBorder(
					overlayActiveNode, instance.getActiveRegion(),
					activeBorderWidth);

				event.newVal.addClass(classNames.active);
			}
		},

		_afterSelectionChange: function(event) {
			var instance = this,
				nodes,
				highlightRange = instance.get(HIGHLIGHT_RANGE),
				overlayNode = instance.get(OVERLAY_NODE),
				rangeBorderWidth = instance.get(RANGE_BORDER_WIDTH);

			if (!instance.get(TYPE)) {
				return;
			}

			instance._clearHighlights();

			nodes = instance._collectNodes(event.newVal);

			if (highlightRange && nodes && (nodes.length > 1)) {
				instance._alignBorder(
					overlayNode, instance.getSelectionRegion(), rangeBorderWidth);

				A.Array.each(nodes, function(node) {
					node.addClass(instance.CLASS_NAMES.highlight);
				});
			}
		},

		_alignBorder: function(overlayNode, region, borderWidth) {
			var instance = this,
				host = instance.get(HOST);

			host._tableNode.appendChild(overlayNode);

			if (region) {
				var borders = overlayNode.get(CHILDREN),
					t = borders.item(0),
					r = borders.item(1),
					b = borders.item(2),
					l = borders.item(3);

				overlayNode.setXY([region.left, region.top]);

				t.sizeTo(region.width, borderWidth[0]);
				l.sizeTo(borderWidth[3], region.height - borderWidth[2]);
				b.sizeTo(region.width, borderWidth[2]);
				r.sizeTo(borderWidth[1], region.height - borderWidth[2]);

				t.setXY([region.left, region.top]);
				l.setXY([region.left, region.top]);
				b.setXY([region.left, region.bottom - borderWidth[2]]);
				r.setXY([region.right - borderWidth[1], region.top]);
			}
		},

		_collectNodes: function(selection) {
			var instance = this,
				type = instance.get(TYPE);

			if (!type || !selection) {
				return null;
			}

			return (instance._nodes = selection[type]);
		},

		_clearBorders: function() {
			var instance = this;

			instance.get(OVERLAY_NODE).remove();
			instance.get(OVERLAY_ACTIVE_NODE).remove();
		},

		_clearHighlights: function() {
			var instance = this;

			A.Array.each(instance._nodes, function(node) {
				node.removeClass(instance.CLASS_NAMES.highlight);
			});
		},

		_validateType: function (val) {
			return (val === CELLS || val === ROWS || val === null);
		}
	},
	{
		NS: HIGHLIGHT,

		NAME: 'datatable-highlight',

		ATTRS: {
			activeBorderWidth: {
				setter: _setCSSClockwiseRule,
				value: 2
			},

			overlayActiveNode: {
				setter: function(val) {
					var instance = this,
						classNames = instance.CLASS_NAMES;

					if (!val) {
						val = A.Node.create(Lang.sub(instance.TPL_FRAME, classNames));

						val.addClass(classNames.overlayActive);
					}

					return val;
				},
				value: null
			},

			overlayNode: {
				setter: function(val) {
					var instance = this;

					if (!val) {
						val = A.Node.create(Lang.sub(instance.TPL_FRAME, instance.CLASS_NAMES));
					}

					return val;
				},
				value: null
			},

			highlightRange: {
				validator: isBoolean,
				value: true
			},

			rangeBorderWidth: {
				setter: _setCSSClockwiseRule,
				value: 1
			},

			type: {
				validator: '_validateType',
				value: CELLS
			}
		}
	}
);

A.namespace('Plugin').DataTableHighlight = DataTableHighlight;

}, '@VERSION@' ,{skinnable:true, requires:['aui-datatable-selection']});
