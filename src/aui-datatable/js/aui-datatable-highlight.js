/**
 * The Datatable Component
 *
 * @module aui-datatable
 * @submodule aui-datatable-highlight
 */

var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,

	ACTIVE = 'active',
	ACTIVE_BORDER_WIDTH = 'activeBorderWidth',
	ACTIVE_CELL = 'activeCell',
	ACTIVE_COORD_CHANGE = 'activeCoordChange',
	ACTIVE_ROW = 'activeRow',
	BORDER = 'border',
	CELLS = 'cells',
	CHILDREN = 'children',
	DATA_CHANGE = 'dataChange',
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

/**
 * A base class for DataTableHighlight.
 *
 * @class A.DataTableHighlight
 * @extends A.Plugin.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
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

		_lastActiveRow: null,
		_nodes: null,

		/**
		 * Construction logic executed during DataTableHighlight instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
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

			instance.afterHostEvent(ACTIVE_COORD_CHANGE, instance._afterActiveCoordChange);
			instance.afterHostEvent(SELECTION_CHANGE, instance._afterSelectionChange);
			instance.afterHostEvent(DATA_CHANGE, instance._afterDataChange);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method clear
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getActiveRegion
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getSelectionRegion
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterActiveCoordChange
		 * @param event
		 * @protected
		 */
		_afterActiveCoordChange: function(event) {
			var instance = this,
				host = instance.get(HOST),
				activeBorderWidth = instance.get(ACTIVE_BORDER_WIDTH),
				overlayActiveNode = instance.get(OVERLAY_ACTIVE_NODE),
				classNames = instance.CLASS_NAMES,
				activeRow = host.get(ACTIVE_ROW),
				lastActiveRow = instance._lastActiveRow;

			if (!instance.get(TYPE)) {
				return;
			}

			instance.clear();

			if (lastActiveRow) {
				lastActiveRow.removeClass(classNames.active);
			}

			if (activeRow) {
				instance._alignBorder(
					overlayActiveNode, instance.getActiveRegion(),
					activeBorderWidth);

				activeRow.addClass(classNames.active);
			}

			instance._lastActiveRow = activeRow;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterDataChange
		 * @param event
		 * @protected
		 */
		_afterDataChange: function(event) {
			var instance = this;

			instance.clear();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterSelectionChange
		 * @param event
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _alignBorder
		 * @param overlayNode, region, borderWidth
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _collectNodes
		 * @param selection
		 * @protected
		 */
		_collectNodes: function(selection) {
			var instance = this,
				type = instance.get(TYPE);

			if (!type || !selection) {
				return null;
			}

			return (instance._nodes = selection[type]);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _clearBorders
		 * @protected
		 */
		_clearBorders: function() {
			var instance = this;

			instance.get(OVERLAY_NODE).remove();
			instance.get(OVERLAY_ACTIVE_NODE).remove();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _clearHighlights
		 * @protected
		 */
		_clearHighlights: function() {
			var instance = this;

			A.Array.each(instance._nodes, function(node) {
				if (node) {
					node.removeClass(instance.CLASS_NAMES.highlight);
				}
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _validateType
		 * @param val
		 * @protected
		 */
		_validateType: function (val) {
			return (val === CELLS || val === ROWS || val === null);
		}
	},
	{
		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @property DataTableHighlight.NS
		 * @type String
		 * @static
		 */
		NS: HIGHLIGHT,

		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property DataTableHighlight.NAME
		 * @type String
		 * @static
		 */
		NAME: 'datatable-highlight',

		/**
		 * Static property used to define the default attribute
		 * configuration for the DataTableHighlight.
		 *
		 * @property DataTableHighlight.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute activeBorderWidth
			 * @default 2
			 * @type Number
			 */
			activeBorderWidth: {
				setter: _setCSSClockwiseRule,
				value: 2
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute overlayActiveNode
			 * @default null
			 */
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

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute overlayNode
			 * @default null
			 */
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

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute highlightRange
			 * @default true
			 * @type Boolean
			 */
			highlightRange: {
				validator: isBoolean,
				value: true
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute rangeBorderWidth
			 * @default 1
			 * @type Number
			 */
			rangeBorderWidth: {
				setter: _setCSSClockwiseRule,
				value: 1
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute type
			 */
			type: {
				validator: '_validateType',
				value: CELLS
			}
		}
	}
);

A.namespace('Plugin').DataTableHighlight = DataTableHighlight;