YUI.add('aui-sortable-layout', function (A, NAME) {

/**
 * The SortableLayout Utility
 *
 * @module aui-sortable-layout
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isFunction = Lang.isFunction,
    isObject = Lang.isObject,
    isString = Lang.isString,
    isValue = Lang.isValue,

    toInt = Lang.toInt,

    ceil = Math.ceil,

    DDM = A.DD.DDM,

    // caching these values for performance
    PLACEHOLDER_MARGIN_BOTTOM = 0,
    PLACEHOLDER_MARGIN_TOP = 0,
    PLACEHOLDER_TARGET_MARGIN_BOTTOM = 0,
    PLACEHOLDER_TARGET_MARGIN_TOP = 0,

    concat = function() {
        return Array.prototype.slice.call(arguments).join(' ');
    },

    nodeListSetter = function(val) {
        return A.Lang.isNodeList(val) ? val : A.all(val);
    },

    getNumStyle = function(elem, styleName) {
        return toInt(elem.getStyle(styleName));
    },

    getCN = A.getClassName,

    CSS_DRAG_INDICATOR = getCN('sortable-layout', 'drag', 'indicator'),
    CSS_DRAG_INDICATOR_ICON = getCN('sortable-layout', 'drag', 'indicator', 'icon'),
    CSS_DRAG_INDICATOR_ICON_LEFT = getCN('sortable-layout', 'drag', 'indicator', 'icon', 'left'),
    CSS_DRAG_INDICATOR_ICON_RIGHT = getCN('sortable-layout', 'drag', 'indicator', 'icon', 'right'),
    CSS_DRAG_TARGET_INDICATOR = getCN('sortable-layout', 'drag', 'target', 'indicator'),
    CSS_ICON = getCN('icon'),
    CSS_ICON_CIRCLE_TRIANGLE_L = getCN('icon', 'circle', 'triangle', 'l'),
    CSS_ICON_CIRCLE_TRIANGLE_R = getCN('icon', 'circle', 'triangle', 'r'),

    TPL_PLACEHOLDER = '<div class="' + CSS_DRAG_INDICATOR + '">' +
        '<div class="' + concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_LEFT, CSS_ICON,
            CSS_ICON_CIRCLE_TRIANGLE_R) + '"></div>' +
        '<div class="' + concat(CSS_DRAG_INDICATOR_ICON, CSS_DRAG_INDICATOR_ICON_RIGHT, CSS_ICON,
            CSS_ICON_CIRCLE_TRIANGLE_L) + '"></div>' +
        '<div>';

/**
 * A base class for SortableLayout, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - DragDrop utility for drag lists, portal layouts (portlets)
 *
 * Check the [live demo](http://alloyui.com/examples/sortable-layout/).
 *
 * @class A.SortableLayout
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var SortableLayout = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'sortable-layout',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.SortableLayout`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Configuration object for delegate.
         *
         * @attribute delegateConfig
         * @default null
         * @type Object
         */
        delegateConfig: {
            value: null,
            setter: function(val) {
                var instance = this;

                var config = A.merge({
                        bubbleTargets: instance,
                        dragConfig: {},
                        nodes: instance.get('dragNodes'),
                        target: true
                    },
                    val
                );

                A.mix(config.dragConfig, {
                    groups: instance.get('groups'),
                    startCentered: true
                });

                return config;
            },
            validator: isObject
        },

        /**
         * Proxy drag node used instead of dragging the original node.
         *
         * @attribute proxyNode
         */
        proxyNode: {
            setter: function(val) {
                return isString(val) ? A.Node.create(val) : val;
            }
        },

        /**
         * The CSS class name used to define which nodes are draggable.
         *
         * @attribute dragNodes
         * @type String
         */
        dragNodes: {
            validator: isString
        },

        /**
         * The container which serves to host dropped elements.
         *
         * @attribute dropContainer
         * @type Function
         */
        dropContainer: {
            value: function(dropNode) {
                return dropNode;
            },
            validator: isFunction
        },

        /**
         * The CSS class name used to define which nodes serve as container to
         * be dropped.
         *
         * @attribute dropNodes
         */
        dropNodes: {
            setter: '_setDropNodes'
        },

        /**
         * List of elements to add this sortable layout into.
         *
         * @attribute groups
         * @type Array
         */
        groups: {
            value: ['sortable-layout']
        },

        /**
         * Specifies if the start should be delayed.
         *
         * @attribute lazyStart
         * @default false
         * @type Boolean
         */
        lazyStart: {
            value: false,
            validator: isBoolean
        },

        /**
         * Simulates the position of the dragged element.
         *
         * @attribute placeholder
         */
        placeholder: {
            value: TPL_PLACEHOLDER,
            setter: function(val) {
                var placeholder = isString(val) ? A.Node.create(val) : val;

                if (!placeholder.inDoc()) {
                    A.getBody().prepend(
                        placeholder.hide()
                    );
                }

                PLACEHOLDER_MARGIN_BOTTOM = getNumStyle(placeholder, 'marginBottom');
                PLACEHOLDER_MARGIN_TOP = getNumStyle(placeholder, 'marginTop');

                placeholder.addClass(CSS_DRAG_TARGET_INDICATOR);

                PLACEHOLDER_TARGET_MARGIN_BOTTOM = getNumStyle(placeholder, 'marginBottom');
                PLACEHOLDER_TARGET_MARGIN_TOP = getNumStyle(placeholder, 'marginTop');

                return placeholder;
            }
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
                var instance = this;

                var defaults = {
                    moveOnEnd: false,
                    positionProxy: false
                };

                // if proxyNode is set remove the border from the default proxy
                if (instance.get('proxyNode')) {
                    defaults.borderStyle = null;
                }

                return A.merge(defaults, val || {});
            }
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
         * Construction logic executed during `A.SortableLayout` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.bindUI();
        },

        /**
         * Bind the events on the `A.SortableLayout` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            // publishing placeholderAlign event
            instance.publish('placeholderAlign', {
                defaultFn: instance._defPlaceholderAlign,
                queuable: false,
                emitFacade: true,
                bubbles: true
            });

            instance._bindDDEvents();
            instance._bindDropZones();
        },

        /**
         * Checks if the `Node` isn't a drop node. If not, creates a new Drop
         * instance and adds to drop target group.
         *
         * @method addDropNode
         * @param node
         * @param config
         */
        addDropNode: function(node, config) {
            var instance = this;

            node = A.one(node);

            if (!DDM.getDrop(node)) {
                instance.addDropTarget(
                    // Do not use DropPlugin to create the DropZones on
                    // this component, the ".drop" namespace is used to check
                    // for the DD.Delegate target nodes
                    new A.DD.Drop(
                        A.merge({
                                bubbleTargets: instance,
                                groups: instance.get('groups'),
                                node: node
                            },
                            config
                        )
                    )
                );
            }
        },

        /**
         * Adds a Drop instance to a group.
         *
         * @method addDropTarget
         * @param drop
         */
        addDropTarget: function(drop) {
            var instance = this;

            drop.addToGroup(
                instance.get('groups')
            );
        },

        /**
         * Sync placeholder size and set its X and Y positions.
         *
         * @method alignPlaceholder
         * @param region
         * @param isTarget
         */
        alignPlaceholder: function(region, isTarget) {
            var instance = this;
            var placeholder = instance.get('placeholder');

            if (!instance.lazyEvents) {
                placeholder.show();
            }

            // sync placeholder size
            instance._syncPlaceholderSize();

            placeholder.setXY(
                instance.getPlaceholderXY(region, isTarget)
            );
        },

        /**
         * Calculates drag's X and Y directions.
         *
         * @method calculateDirections
         * @param drag
         */
        calculateDirections: function(drag) {
            var instance = this;
            var lastY = instance.lastY;
            var lastX = instance.lastX;

            var x = drag.lastXY[0];
            var y = drag.lastXY[1];

            // if the x change
            if (x !== lastX) {
                // set the drag direction
                instance.XDirection = (x < lastX) ? 'left' : 'right';
            }

            // if the y change
            if (y !== lastY) {
                // set the drag direction
                instance.YDirection = (y < lastY) ? 'up' : 'down';
            }

            instance.lastX = x;
            instance.lastY = y;
        },

        /**
         * Calculates quadrant position.
         *
         * @method calculateQuadrant
         * @param drag
         * @param drop
         * @return {Number}
         */
        calculateQuadrant: function(drag, drop) {
            var instance = this;
            var quadrant = 1;
            var region = drop.get('node').get('region');
            var mouseXY = drag.mouseXY;
            var mouseX = mouseXY[0];
            var mouseY = mouseXY[1];

            var top = region.top;
            var left = region.left;

            // (region.bottom - top) finds the height of the region
            var vCenter = top + (region.bottom - top) / 2;
            // (region.right - left) finds the width of the region
            var hCenter = left + (region.right - left) / 2;

            if (mouseY < vCenter) {
                quadrant = (mouseX > hCenter) ? 1 : 2;
            }
            else {
                quadrant = (mouseX < hCenter) ? 3 : 4;
            }

            instance.quadrant = quadrant;

            return quadrant;
        },

        /**
         * Gets placeholder X and Y positions.
         *
         * @method getPlaceholderXY
         * @param region
         * @param isTarget
         * @return {Array}
         */
        getPlaceholderXY: function(region, isTarget) {
            var instance = this;
            var placeholder = instance.get('placeholder');
            var marginBottom = PLACEHOLDER_MARGIN_BOTTOM;
            var marginTop = PLACEHOLDER_MARGIN_TOP;

            if (isTarget) {
                // update the margin values in case of the target placeholder
                // has a different margin
                marginBottom = PLACEHOLDER_TARGET_MARGIN_BOTTOM;
                marginTop = PLACEHOLDER_TARGET_MARGIN_TOP;
            }

            // update the className of the placeholder when interact with target
            // (drag/drop) elements
            placeholder.toggleClass(CSS_DRAG_TARGET_INDICATOR, isTarget);

            var regionBottom = ceil(region.bottom);
            var regionLeft = ceil(region.left);
            var regionTop = ceil(region.top);

            var x = regionLeft;

            // 1 and 2 quadrants are the top quadrants, so align to the
            // region.top when quadrant < 3
            var y = (instance.quadrant < 3) ?
                (regionTop - (placeholder.get('offsetHeight') + marginBottom)) : (regionBottom + marginTop);

            return [x, y];
        },

        /**
         * Removes a Drop instance from group.
         *
         * @method removeDropTarget
         * @param drop
         */
        removeDropTarget: function(drop) {
            var instance = this;

            drop.removeFromGroup(
                instance.get('groups')
            );
        },

        /**
         * Checks if active drag and active drop satisfies the align condition.
         *
         * @method _alignCondition
         * @protected
         * @return {Boolean}
         */
        _alignCondition: function() {
            var instance = this;
            var activeDrag = DDM.activeDrag;
            var activeDrop = instance.activeDrop;

            if (activeDrag && activeDrop) {
                var dragNode = activeDrag.get('node');
                var dropNode = activeDrop.get('node');

                return !dragNode.contains(dropNode);
            }

            return true;
        },

        /**
         * Creates `DD.Delegate` instance, plugs it to the `DDProxy`, and binds
         * Drag and Drop events.
         *
         * @method _bindDDEvents
         * @protected
         */
        _bindDDEvents: function() {
            var instance = this;
            var delegateConfig = instance.get('delegateConfig');
            var proxy = instance.get('proxy');

            // creating DD.Delegate instance
            instance.delegate = new A.DD.Delegate(delegateConfig);

            // plugging the DDProxy
            instance.delegate.dd.plug(A.Plugin.DDProxy, proxy);

            instance.on('drag:end', A.bind(instance._onDragEnd, instance));
            instance.on('drag:enter', A.bind(instance._onDragEnter, instance));
            instance.on('drag:exit', A.bind(instance._onDragExit, instance));
            instance.on('drag:over', A.bind(instance._onDragOver, instance));
            instance.on('drag:start', A.bind(instance._onDragStart, instance));
            instance.after('drag:start', A.bind(instance._afterDragStart, instance));

            instance.on('quadrantEnter', instance._syncPlaceholderUI);
            instance.on('quadrantExit', instance._syncPlaceholderUI);
        },

        /**
         * Bind drop zones.
         *
         * @method _bindDropZones
         * @protected
         */
        _bindDropZones: function() {
            var instance = this;
            var dropNodes = instance.get('dropNodes');

            if (dropNodes) {
                dropNodes.each(function(node) {
                    instance.addDropNode(node);
                });
            }
        },

        /**
         * Defines `placeholder` alignment.
         *
         * @method _defPlaceholderAlign
         * @param event
         * @protected
         */
        _defPlaceholderAlign: function() {
            var instance = this;
            var activeDrop = instance.activeDrop;
            var placeholder = instance.get('placeholder');

            if (activeDrop && placeholder) {
                var node = activeDrop.get('node');
                // DD.Delegate use the Drop Plugin on its "target" items. Using
                // Drop Plugin a "node.drop" namespace is created. Using the
                // .drop namespace to detect when the node is also a "target"
                // DD.Delegate node
                var isTarget = !! node.drop;

                instance.lastAlignDrop = activeDrop;

                instance.alignPlaceholder(
                    activeDrop.get('node').get('region'),
                    isTarget
                );
            }
        },

        /**
         * Gets a collection formed by `drag`, `drop`, `quadrant`, `XDirection`,
         * and `YDirection` instances.
         *
         * @method _evOutput
         * @protected
         * @return {Object}
         */
        _evOutput: function() {
            var instance = this;

            return {
                drag: DDM.activeDrag,
                drop: instance.activeDrop,
                quadrant: instance.quadrant,
                XDirection: instance.XDirection,
                YDirection: instance.YDirection
            };
        },

        /**
         * Fire quadrant events and updates "last" informations.
         *
         * @method _fireQuadrantEvents
         * @protected
         */
        _fireQuadrantEvents: function() {
            var instance = this;
            var evOutput = instance._evOutput();
            var lastQuadrant = instance.lastQuadrant;
            var quadrant = instance.quadrant;

            if (quadrant !== lastQuadrant) {
                // only trigger exit if it has previously entered in any quadrant
                if (lastQuadrant) {
                    // merging event with the "last" information
                    instance.fire(
                        'quadrantExit',
                        A.merge({
                                lastDrag: instance.lastDrag,
                                lastDrop: instance.lastDrop,
                                lastQuadrant: instance.lastQuadrant,
                                lastXDirection: instance.lastXDirection,
                                lastYDirection: instance.lastYDirection
                            },
                            evOutput
                        )
                    );
                }

                // firing EV_QUADRANT_ENTER event
                instance.fire('quadrantEnter', evOutput);
            }

            // firing EV_QUADRANT_OVER, align event fires like the drag over
            // without bubbling for performance reasons
            instance.fire('quadrantOver', evOutput);

            // updating "last" information
            instance.lastDrag = DDM.activeDrag;
            instance.lastDrop = instance.activeDrop;
            instance.lastQuadrant = quadrant;
            instance.lastXDirection = instance.XDirection;
            instance.lastYDirection = instance.YDirection;
        },

        /**
         * Gets node from the currently active draggable object.
         *
         * @method _getAppendNode
         * @protected
         * @return {Node}
         */
        _getAppendNode: function() {
            return DDM.activeDrag.get('node');
        },

        /**
         * Sets the position of drag/drop nodes.
         *
         * @method _positionNode
         * @param event
         * @protected
         */
        _positionNode: function() {
            var instance = this;
            var activeDrop = instance.lastAlignDrop || instance.activeDrop;

            if (activeDrop) {
                var dragNode = instance._getAppendNode();
                var dropNode = activeDrop.get('node');

                // detects if the activeDrop is a dd target (portlet) or a drop
                // area only (column) DD.Delegate use the Drop Plugin on its
                // "target" items. Using Drop Plugin a "node.drop" namespace is
                // created. Using the .drop namespace to detect when the node is
                // also a "target" DD.Delegate node
                var isTarget = isValue(dropNode.drop);
                var topQuadrants = (instance.quadrant < 3);

                if (instance._alignCondition()) {
                    if (isTarget) {
                        dropNode[topQuadrants ? 'placeBefore' : 'placeAfter'](dragNode);
                    }
                    // interacting with the columns (drop areas only)
                    else {
                        // find the dropContainer of the dropNode, the default
                        // DROP_CONTAINER function returns the dropNode
                        var dropContainer = instance.get('dropContainer').apply(instance, [dropNode]);

                        dropContainer[topQuadrants ? 'prepend' : 'append'](dragNode);
                    }
                }
            }
        },

        /**
         * Sync `placeholder` attribute in the UI.
         *
         * @method _syncPlaceholderUI
         * @param event
         * @protected
         */
        _syncPlaceholderUI: function(event) {
            var instance = this;

            if (instance._alignCondition()) {
                // firing placeholderAlign event
                instance.fire('placeholderAlign', {
                    drop: instance.activeDrop,
                    originalEvent: event
                });
            }
        },

        /**
         * Sync `placeholder` node size.
         *
         * @method _syncPlaceholderSize
         * @protected
         */
        _syncPlaceholderSize: function() {
            var instance = this;
            var node = instance.activeDrop.get('node');

            var placeholder = instance.get('placeholder');

            if (placeholder) {
                placeholder.set(
                    'offsetWidth',
                    node.get('offsetWidth')
                );
            }
        },

        /**
         * Sync `proxyNode` attribute in the UI.
         *
         * @method _syncProxyNodeUI
         * @param event
         * @protected
         */
        _syncProxyNodeUI: function() {
            var instance = this;
            var dragNode = DDM.activeDrag.get('dragNode');
            var proxyNode = instance.get('proxyNode');

            if (proxyNode && !proxyNode.compareTo(dragNode)) {
                dragNode.append(proxyNode);

                instance._syncProxyNodeSize();
            }
        },

        /**
         * Sync `proxyNode` height and width.
         *
         * @method _syncProxyNodeSize
         * @protected
         */
        _syncProxyNodeSize: function() {
            var instance = this;
            var node = DDM.activeDrag.get('node');
            var proxyNode = instance.get('proxyNode');

            if (node && proxyNode) {
                proxyNode.set(
                    'offsetHeight',
                    node.get('offsetHeight')
                );

                proxyNode.set(
                    'offsetWidth',
                    node.get('offsetWidth')
                );
            }
        },

        /**
         * Triggers after drag event starts.
         *
         * @method _afterDragStart
         * @param event
         * @protected
         */
        _afterDragStart: function(event) {
            var instance = this;

            if (instance.get('proxy')) {
                instance._syncProxyNodeUI(event);
            }
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
            var placeholder = instance.get('placeholder');
            var proxyNode = instance.get('proxyNode');

            if (!instance.lazyEvents) {
                instance._positionNode(event);
            }

            if (proxyNode) {
                proxyNode.remove();
            }

            if (placeholder) {
                placeholder.hide();
            }

            // reset the last information
            instance.lastQuadrant = null;
            instance.lastXDirection = null;
            instance.lastYDirection = null;
        },

        /**
         * Triggers when the dragged object first interacts with another
         * targettable drag and drop object.
         *
         * @method _onDragEnter
         * @param event
         * @protected
         */
        _onDragEnter: function(event) {
            var instance = this;

            instance.activeDrop = DDM.activeDrop;

            // check if lazyEvents is true and if there is a lastActiveDrop the
            // checking for lastActiveDrop prevents fire the _syncPlaceholderUI
            // when quadrant* events fires
            if (instance.lazyEvents && instance.lastActiveDrop) {
                instance.lazyEvents = false;

                instance._syncPlaceholderUI(event);
            }

            // lastActiveDrop is always updated by the drag exit, but if there
            // is no lastActiveDrop update it on drag enter update it
            if (!instance.lastActiveDrop) {
                instance.lastActiveDrop = DDM.activeDrop;
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

            instance._syncPlaceholderUI(event);

            instance.activeDrop = DDM.activeDrop;

            instance.lastActiveDrop = DDM.activeDrop;
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
            var drag = event.drag;

            // prevent drag over bubbling, filtering the top most element
            if (instance.activeDrop === DDM.activeDrop) {
                instance.calculateDirections(drag);

                instance.calculateQuadrant(drag, instance.activeDrop);

                instance._fireQuadrantEvents();
            }
        },

        /**
         * Triggers when the drag event starts.
         *
         * @method _onDragStart
         * @param event
         * @protected
         */
        _onDragStart: function() {
            var instance = this;

            if (instance.get('lazyStart')) {
                instance.lazyEvents = true;
            }

            instance.lastActiveDrop = null;

            instance.activeDrop = DDM.activeDrop;
        },

        /**
         * Sets group of drop nodes.
         *
         * @method _setDropNodes
         * @param val
         * @protected
         * @return {NodeList}
         */
        _setDropNodes: function(val) {
            var instance = this;

            if (isFunction(val)) {
                val = val.call(instance);
            }

            return nodeListSetter(val);
        }
    }
});

A.SortableLayout = SortableLayout;


}, '3.0.1', {
    "requires": [
        "dd-delegate",
        "dd-drag",
        "dd-drop",
        "dd-proxy",
        "aui-node",
        "aui-component"
    ],
    "skinnable": true
});
