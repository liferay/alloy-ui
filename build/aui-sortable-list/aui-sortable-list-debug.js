YUI.add('aui-sortable-list', function (A, NAME) {

/**
 * The SortableList Utility
 *
 * @module aui-sortable-list
 */

var L = A.Lang,
    isString = L.isString,
    isFunction = L.isFunction,

    DDM = A.DD.DDM;

/**
 * A base class for SortableList, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - Sortable list utility
 *
 * Check the [live demo](http://alloyui.com/examples/sortable-list/).
 *
 * @class A.SortableList
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var SortableList = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'sortable-list',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.SortableList`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Drag & Drop plugin attached to the widget.
         *
         * @attribute dd
         * @default null
         */
        dd: {
            value: null
        },

        /**
         * Validates the condition for an element to be dropped.
         *
         * @attribute dropCondition
         * @type Function
         */
        dropCondition: {
            value: function() {
                return true;
            },
            setter: function(v) {
                return A.bind(v, this);
            },
            validator: isFunction
        },

        /**
         * The container which serves to host dropped elements.
         *
         * @attribute dropContainer
         * @type Function
         */
        dropContainer: {
            value: function(event) {
                var instance = this;
                var drop = event.drop;
                var dropNode = drop.get('node');
                var dropOn = instance.get('dropOn');

                return dropNode.one(dropOn);
            },
            validator: isFunction
        },

        /**
         * The CSS class name used to define which nodes serve as container to
         * be dropped.
         *
         * @attribute dropOn
         * @type String
         */
        dropOn: {
            validator: isString
        },

        /**
         * Indicates that the element is being dragged.
         *
         * @attribute helper
         * @default null
         */
        helper: {
            value: null
        },

        /**
         * The CSS class name used to define which nodes are draggable.
         *
         * @attribute nodes
         */
        nodes: {
            setter: function(v) {
                return this._setNodes(v);
            }
        },

        /**
         * Simulates the position of the dragged element.
         *
         * @attribute placeholder
         * @default null
         */
        placeholder: {
            value: null
        },

        /**
         * Proxy element to be used when dragging.
         *
         * @attribute proxy
         * @default null
         */
        proxy: {
            value: null,
            setter: function(val) {
                return A.merge({
                        moveOnEnd: false,
                        positionProxy: false
                    },
                    val || {}
                );
            }
        },

        /**
         * Validates the condition for an element to be sorted.
         *
         * @attribute sortCondition
         * @type Function
         */
        sortCondition: {
            value: function() {
                return true;
            },
            setter: function(v) {
                return A.bind(v, this);
            },
            validator: isFunction
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Base,

    prototype: {

        /**
         * Construction logic executed during `A.SortableList` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;
            var nodes = instance.get('nodes');

            // drag & drop listeners
            instance.on('drag:align', instance._onDragAlign);
            instance.on('drag:end', instance._onDragEnd);
            instance.on('drag:exit', instance._onDragExit);
            instance.on('drag:mouseDown', instance._onDragMouseDown);
            instance.on('drag:over', instance._onDragOver);
            instance.on('drag:start', instance._onDragStart);

            instance._createHelper();

            if (nodes) {
                instance.addAll(nodes);
            }
        },

        /**
         * Creates a drag instance from a single node.
         *
         * @method add
         * @param node
         */
        add: function(node) {
            var instance = this;

            instance._createDrag(node);
        },

        /**
         * Creates drag instances from a list of nodes.
         *
         * @method addAll
         * @param nodes
         */
        addAll: function(nodes) {
            var instance = this;

            nodes.each(function(node) {
                instance.add(node);
            });
        },

        /**
         * Creates delayed drag instance.
         *
         * @method _createDrag
         * @param node
         * @protected
         */
        _createDrag: function(node) {
            var instance = this;
            var helper = instance.get('helper');

            if (!DDM.getDrag(node)) {
                var dragOptions = {
                    bubbleTargets: instance,
                    node: node,
                    target: true
                };

                var proxyOptions = instance.get('proxy');

                if (helper) {
                    proxyOptions.borderStyle = null;
                }

                // creating delayed drag instance
                new A.DD.Drag(
                    A.mix(dragOptions, instance.get('dd'))
                ).plug(A.Plugin.DDProxy, proxyOptions);
            }
        },

        /**
         * Generates the `helper` node in the UI.
         *
         * @method _createHelper
         * @protected
         */
        _createHelper: function() {
            var instance = this;
            var helper = instance.get('helper');

            if (helper) {
                // append helper to the body
                A.one('body').append(helper.hide());

                instance.set('helper', helper);
            }
        },

        /**
         * Syncs the `placeholder` position in the UI.
         *
         * @method _updatePlaceholder
         * @param event
         * @param cancelAppend
         * @protected
         */
        _updatePlaceholder: function(event, cancelAppend) {
            var instance = this;
            var drag = event.target;
            var drop = event.drop;
            var dragNode = drag.get('node');
            var dropNode = drop.get('node');
            var dropContainer = instance.get('dropContainer');
            var container;

            if (dropContainer) {
                container = dropContainer.apply(instance, arguments);
            }

            var floating = false;
            var xDirection = instance.XDirection;
            var yDirection = instance.YDirection;

            if (dropNode.getStyle('float') !== 'none') {
                floating = true;
            }

            var placeholder = instance.get('placeholder');

            if (!placeholder) {
                // if no placeholder use the dragNode instead
                placeholder = dragNode;
            }

            if (!placeholder.contains(dropNode)) {
                // check for the user dropCondition
                var dropCondition = instance.get('dropCondition');

                // if there is a container waiting for nodes to be appended it's
                // priority
                if (container && !cancelAppend && dropCondition(event)) {
                    // this checking avoid the parent bubbling drag:over
                    if (!container.contains(placeholder) && !placeholder.contains(container)) {
                        // append placeholder on the found container
                        container.append(placeholder);
                    }
                }
                // otherwise, check if it's floating and the xDirection
                // or if it's not floating and the yDirection
                else {
                    if ((floating && (xDirection === 'left')) || (!floating && (yDirection === 'up'))) {
                        // LEFT or UP directions means to place the placeholder
                        // before
                        dropNode.placeBefore(placeholder);
                    }
                    else {
                        // RIGHT or DOWN directions means to place the
                        // placeholder after
                        dropNode.placeAfter(placeholder);
                    }
                }
            }
        },

        /**
         * Triggers when the drag position aligns.
         *
         * @method _onDragAlign
         * @param event
         * @protected
         */
        _onDragAlign: function(event) {
            var instance = this;
            var lastX = instance.lastX;
            var lastY = instance.lastY;
            var xy = event.target.lastXY;

            var x = xy[0];
            var y = xy[1];

            // if the y change
            if (y !== lastY) {
                // set the drag vertical direction
                instance.YDirection = (y < lastY) ? 'up' : 'down';
            }

            // if the x change
            if (x !== lastX) {
                // set the drag horizontal direction
                instance.XDirection = (x < lastX) ? 'left' : 'right';
            }

            instance.lastX = x;
            instance.lastY = y;
        },

        /**
         * Triggers when the drag event ends.
         *
         * @method _onDragEnd
         * @param event
         * @protected
         */
        _onDragEnd: function(event) {
            var instance = this;
            var drag = event.target;
            var dragNode = drag.get('node');
            var placeholder = instance.get('placeholder');

            if (placeholder) {
                dragNode.show();
                placeholder.hide();

                if (!dragNode.contains(placeholder)) {
                    // position dragNode after the placeholder
                    placeholder.placeAfter(dragNode);
                }
            }
        },

        /**
         * Triggers when the drag event exits.
         *
         * @method _onDragExit
         * @param event
         * @protected
         */
        _onDragExit: function(event) {
            var instance = this;
            var sortCondition = instance.get('sortCondition');

            if (sortCondition(event)) {
                instance._updatePlaceholder(event, true);
            }
        },

        /**
         * Triggers when the drag mouse down.
         *
         * @method _onDragMouseDown
         * @param event
         * @protected
         */
        _onDragMouseDown: function(event) {
            var instance = this;
            var drag = event.target;
            var helper = instance.get('helper');

            if (helper) {
                // update the DRAG_NODE with the new helper
                drag.set('dragNode', helper);
            }
        },

        /**
         * Triggers when the drag eventstarts.
         *
         * @method _onDragStart
         * @param event
         * @protected
         */
        _onDragStart: function(event) {
            var instance = this;
            var drag = event.target;
            var node = drag.get('node');
            var helper = instance.get('helper');
            var placeholder = instance.get('placeholder');

            if (placeholder) {
                // update placeholder height
                placeholder.setStyle(
                    'height',
                    node.get('offsetHeight') + 'px'
                );

                node.hide();
                placeholder.show();
                // position placeholder after the node
                node.placeAfter(placeholder);

                if (helper) {
                    // show helper, we need display block here, yui dd hide it
                    // with display none
                    helper.setStyles({
                        display: 'block',
                        visibility: 'visible'
                    }).show();
                }
            }
        },

        /**
         * Triggers when an element is being dragged over a valid drop target.
         *
         * @method _onDragOver
         * @param event
         * @protected
         */
        _onDragOver: function(event) {
            var instance = this;
            var sortCondition = instance.get('sortCondition');

            if (sortCondition(event)) {
                instance._updatePlaceholder(event);
            }
        },

        /**
         * Sets node based in its type.
         *
         * @method _setNodes
         * @param v
         * @protected
         * @return {NodeList}
         */
        _setNodes: function(v) {
            if (A.Lang.isNodeList(v)) {
                return v;
            }
            else if (isString(v)) {
                return A.all(v);
            }

            return new A.NodeList([v]);
        }
    }
});

A.SortableList = SortableList;


}, '3.0.1', {"requires": ["dd-drag", "dd-drop", "dd-proxy", "aui-node", "aui-component"]});
