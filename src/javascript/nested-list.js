AUI.add('nested-list', function(A) {

var L = A.Lang,
	isString = L.isString,
	isFunction = L.isFunction,

	BLOCK = 'block',
	BODY = 'body',
	DD = 'dd',
	DISPLAY = 'display',
	DOWN = 'down',
	DRAG_NODE = 'dragNode',
	DROP_CONDITION = 'dropCondition',
	DROP_ON = 'dropOn',
	FLOAT = 'float',
	HEIGHT = 'height',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	LEFT = 'left',
	NESTED_LIST = 'nested-list',
	NODE = 'node',
	NODES = 'nodes',
	NONE = 'none',
	OFFSET_HEIGHT = 'offsetHeight',
	PLACEHOLDER = 'placeholder',
	PX = 'px',
	RIGHT = 'right',
	SORT_CONDITION = 'sortCondition',
	UP = 'up',
	VISIBILITY = 'visibility',
	VISIBLE = 'visible',

	DDM = A.DD.DDM,

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	};

function NestedList(config) {
	NestedList.superclass.constructor.apply(this, arguments);
}

A.mix(NestedList, {
	NAME: NESTED_LIST,

	ATTRS: {
		dd: {
			value: null
		},

		dropCondition: {
			value: function() {
				return true;
			},
			setter: function(v) {
				return A.bind(v, this);
			},
			validator: isFunction
		},

		dropOn: {
			validator: isString
		},

		helper: {
			value: null
		},

		nodes: {
			setter: function(v) {
				return this._setNodes(v);
			}
		},

		placeholder: {
			value: null
		},

		sortCondition: {
			value: function() {
				return true;
			},
			setter: function(v) {
				return A.bind(v, this);
			},
			validator: isFunction
		}
	}
});

A.extend(NestedList, A.Base, {
	/*
	* Lifecycle
	*/
	initializer: function() {
		var instance = this;
		var nodes = instance.get(NODES);

		// drag & drop listeners
		instance.on('drag:align', instance._onDragAlign);
		instance.on('drag:exit', instance._onDragExit);
		instance.on('drag:over', instance._onDragOver);
		instance.on('drag:start', instance._onDragStart);
		instance.on('drag:end', instance._onDragEnd);

		instance._createHelper();

		if (nodes) {
			instance.addAll(nodes);
		}
	},

	/*
	* Methods
	*/
	add: function(node) {
		var instance = this;

		instance._createDrag(node);
	},

	addAll: function(nodes) {
		var instance = this;

		nodes.each(function(node) {
			instance.add(node);
		});
	},

	_createDrag: function(node) {
		var instance = this;
		var helper = instance.get(HELPER);

		if (!DDM.getDrag(node)) {
			var dragOptions = {
				node: node,
				bubbles: instance,
				target: true
			};

			var proxyOptions = {
				moveOnEnd: false,
				positionProxy: false
			};

			if (helper) {
				proxyOptions.borderStyle = null;
			}

			// creating delayed drag instance
			var dd = new A.DD.Drag(
				A.mix(dragOptions, instance.get(DD))
			)
			.plug(A.Plugin.DDProxy, proxyOptions);
		}
	},

	_createHelper: function() {
		var instance = this;
		var helper = instance.get(HELPER);

		if (helper) {
			// append helper to the body
			A.get(BODY).append( helper.hide() );

			instance.set(HELPER, helper);
		}
	},

	_updatePlaceholder: function(event, cancelAppend) {
		var instance = this;
		var drag = event.target;
		var drop = event.drop;
		var dragNode = drag.get(NODE);
		var dropNode = drop.get(NODE);
		var dropOn = instance.get(DROP_ON);

		if (dropOn) {
			var container = dropNode.one(dropOn);
		}

		var floating = false;
		var xDirection = instance.XDirection;
		var yDirection = instance.YDirection;

		if (dropNode.getStyle(FLOAT) != NONE) {
			floating = true;
		}

		var placeholder = instance.get(PLACEHOLDER);

		if (!placeholder) {
			// if no placeholder use the dragNode instead
			placeholder = dragNode;
		}

		if (!placeholder.contains(dropNode)) {
			// check for the user dropCondition
			var dropCondition = instance.get(DROP_CONDITION);

			// if there is a container waiting for nodes to be appended it's priority
			if (container && !cancelAppend && dropCondition(event)) {
				// this checking avoid the parent bubbling drag:over
				if (!container.contains(placeholder) &&
					!placeholder.contains(container)) {
						// append placeholder on the found container
						container.append(placeholder);
				}
			}
			// otherwise, check if it's floating and the xDirection
			// or if it's not floating and the yDirection
			else {
				if (floating && (xDirection == LEFT) || !floating && (yDirection == UP)) {
					// LEFT or UP directions means to place the placeholder before
					dropNode.placeBefore(placeholder);
				}
				else {
					// RIGHT or DOWN directions means to place the placeholder after
					dropNode.placeAfter(placeholder);
				}
			}
		}
	},

	/*
	* Listeners
	*/
	_onDragAlign: function(event) {
		var instance = this;
		var lastX = instance.lastX;
		var lastY = instance.lastY;
		var xy = event.target.lastXY;

		var x = xy[0];
		var y = xy[1];

		// if the y change
		if (y != lastY) {
			// set the drag vertical direction
			instance.YDirection = (y < lastY) ? UP : DOWN;
		}

		// if the x change
		if (x != lastX) {
			// set the drag horizontal direction
			instance.XDirection = (x < lastX) ? LEFT : RIGHT;
		}

		instance.lastX = x;
		instance.lastY = y;
	},

	_onDragEnd: function(event) {
		var instance = this;
		var drag = event.target;
		var dragNode = drag.get(NODE);
		var placeholder = instance.get(PLACEHOLDER);

		if (placeholder) {
			dragNode.show();
			placeholder.hide();
			// position dragNode after the placeholder
			placeholder.placeAfter(dragNode);
		}
	},

	_onDragExit: function(event) {
		var instance = this;
		var sortCondition = instance.get(SORT_CONDITION);

		if (sortCondition(event)) {
			instance._updatePlaceholder(event, true);
		}
	},

	_onDragOver: function(event) {
		var instance = this;
		var sortCondition = instance.get(SORT_CONDITION);

		if (sortCondition(event)) {
			instance._updatePlaceholder(event);
		}
	},

	_onDragStart: function(event) {
 		var instance = this;
		var drag = event.target;
		var dragNode = drag.get(NODE);
		var helper = instance.get(HELPER);
		var placeholder = instance.get(PLACEHOLDER);

		if (placeholder) {
			// update placeholder height
			placeholder.setStyle(
				HEIGHT,
				dragNode.get(OFFSET_HEIGHT) + PX
			);

			dragNode.hide();
			placeholder.show();
			// position placeholder after the dragNode
			dragNode.placeAfter(placeholder);
		}

		if (helper) {
			// show helper, we need display block here, yui dd hide it with display none
			helper.setStyles({
				display: BLOCK,
				visibility: VISIBLE
			}).show();

			// update the DRAG_NODE with the new helper
			drag.set(DRAG_NODE, helper);
		}
 	},

	/*
	* Setters
	*/
	_setNodes: function(v) {
		var instance = this;

		if (isNodeList(v)) {
			return v;
		}
		else if (isString(v)) {
			return A.all(v);
		}

		return new A.NodeList([v]);
	}
});

A.NestedList = NestedList;

}, '@VERSION', { requires: [ 'aui-base', 'dd' ] });