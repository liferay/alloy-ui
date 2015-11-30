YUI.add('aui-datatable-highlight', function (A, NAME) {

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

    _setCSSClockwiseRule = function(val) {
        var i = 0,
            len;

        if (isString(val)) {
            val = Lang.trim(val).replace(/\s+/g, ' ').split(' ');
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
 * @extends Plugin.Base
 * @param {Object} config Object literal specifying widget configuration
 * properties.
 * @constructor
 */
var DataTableHighlight = A.Base.create(
    'datatable-highlight',
    A.Plugin.Base, [], {
        CLASS_NAMES: null,

        TPL_FRAME: '<div class="{overlay}">' + '<div class="{border}"></div>' +
            '<div class="{border}"></div>' + '<div class="{border}"></div>' +
            '<div class="{border}"></div>' + '</div>',

        _lastActiveRow: null,
        _nodes: null,

        /**
         * Construction logic executed during DataTableHighlight instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this,
                host = instance.get('host');

            instance.CLASS_NAMES = {
                active: host.getClassName('active'),
                border: host.getClassName('highlight', 'border'),
                highlight: host.getClassName('highlight'),
                overlay: host.getClassName('highlight', 'overlay'),
                overlayActive: host.getClassName('highlight', 'overlay', 'active')
            };

            instance.afterHostEvent('activeCoordChange', instance._afterActiveCoordChange);
            instance.afterHostEvent('blur', instance._afterBlur);
            instance.afterHostEvent('dataChange', instance._afterDataChange);
            instance.afterHostEvent('selectionChange', instance._afterSelectionChange);

            A.on('windowresize', A.bind(instance._afterWindowResize, instance));
        },

        /**
         * Removes visual highlights from the active cell.
         *
         * @method clear
         */
        clear: function() {
            var instance = this,
                host = instance.get('host'),
                activeCell = host.get('activeCell');

            if (activeCell) {
                activeCell.removeClass(instance.CLASS_NAMES.active);
            }

            instance._clearBorders();
            instance._clearHighlights();
        },

        /**
         * Gets the active node's region.
         *
         * @method getActiveRegion
         * @return {Object} Active node's region.
         */
        getActiveRegion: function() {
            var instance = this,
                host = instance.get('host'),
                type = instance.get('type'),
                region = null,
                activeNode;

            if (type === 'rows') {
                activeNode = host.get('activeRow');
            }
            else {
                activeNode = host.get('activeCell');
            }

            if (activeNode) {
                region = activeNode.get('region');
            }

            return region;
        },

        /**
         * Gets the selection region.
         *
         * @method getSelectionRegion
         * @return {Object} Selection region.
         */
        getSelectionRegion: function() {
            var instance = this,
                nodes = instance._nodes,
                r1 = nodes[0].get('region'),
                r2 = nodes[nodes.length - 1].get('region');

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
         * Fires after the `activeCoordChange` event. Changes the highlight to
         * a the selected table cell.
         *
         * @method _afterActiveCoordChange
         * @param {EventFacade} event
         * @protected
         */
        _afterActiveCoordChange: function() {
            var instance = this,
                host = instance.get('host'),
                activeBorderWidth = instance.get('activeBorderWidth'),
                overlayActiveNode = instance.get('overlayActiveNode'),
                classNames = instance.CLASS_NAMES,
                activeRow = host.get('activeRow'),
                lastActiveRow = instance._lastActiveRow;

            if (!instance.get('type')) {
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
         * Fires after `blur` event. Clear highlight.
         *
         * @method _afterBlur
         * @param {EventFacade} event
         * @protected
         */
        _afterBlur: function() {
            this.clear();
        },

        /**
         * Fires after `dataChange` event.
         *
         * @method _afterDataChange
         * @param {EventFacade} event
         * @protected
         */
        _afterDataChange: function() {
            this._afterBlur();
        },

        /**
         * Fires after `selectionChange`.
         *
         * @method _afterSelectionChange
         * @param {EventFacade} event
         * @protected
         */
        _afterSelectionChange: function(event) {
            var instance = this,
                nodes,
                highlightRange = instance.get('highlightRange'),
                overlayNode = instance.get('overlayNode'),
                rangeBorderWidth = instance.get('rangeBorderWidth');

            if (!instance.get('type')) {
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
         * Fires after `windowresize`.
         *
         * @method _afterWindowResize
         * @protected
         */
        _afterWindowResize: function() {
            var instance = this,
                activeBorderWidth = instance.get('activeBorderWidth'),
                overlayActiveNode = instance.get('overlayActiveNode'),
                overlayNode = instance.get('overlayNode'),
                rangeBorderWidth = instance.get('rangeBorderWidth');

            if (overlayActiveNode.inDoc()) {
                instance._alignBorder(
                    overlayActiveNode, instance.getActiveRegion(), activeBorderWidth);
            }

            if (overlayNode.inDoc()) {
                instance._alignBorder(
                    overlayNode, instance.getSelectionRegion(), rangeBorderWidth);
            }
        },

        /**
         * Align border.
         *
         * @method _alignBorder
         * @param overlayNode
         * @param region
         * @param borderWidth
         * @protected
         */
        _alignBorder: function(overlayNode, region, borderWidth) {
            var instance = this,
                host = instance.get('host');

            host._tableNode.ancestor().appendChild(overlayNode);

            if (region) {
                var borders = overlayNode.get('children'),
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
         * Collect nodes.
         *
         * @method _collectNodes
         * @param selection
         * @protected
         * @return {null|Boolean}
         */
        _collectNodes: function(selection) {
            var instance = this,
                type = instance.get('type');

            if (!type || !selection) {
                return null;
            }

            return (instance._nodes = selection[type]);
        },

        /**
         * Clear borders.
         *
         * @method _clearBorders
         * @protected
         */
        _clearBorders: function() {
            var instance = this;

            instance.get('overlayNode').remove();
            instance.get('overlayActiveNode').remove();
        },

        /**
         * Clear highlights.
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
         * Type validator.
         *
         * @method _validateType
         * @param {String} val
         * @protected
         * @return {Boolean}
         */
        _validateType: function(val) {
            return (val === 'cells' || val === 'rows' || val === null);
        }
    }, {
        /**
         * Static property provides a string to identify the namespace.
         *
         * @property NS
         * @type String
         * @static
         */
        NS: 'highlight',

        /**
         * Static property provides a string to identify the class.
         *
         * @property NAME
         * @type String
         * @static
         */
        NAME: 'datatable-highlight',

        /**
         * Static property used to define the default attribute
         * configuration for the `A.DataTableHighlight`.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * Defines the border width of the active node.
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
             * Defines the `Node` used to overlay the active node.
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
             * Defines the `Node` used to overlay the node.
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
             * Determines if a range of elements are highlighted.
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
             * Defines the border width of the range selection.
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
             * Defines the type of highlight (cells or rows).
             *
             * @attribute type
             */
            type: {
                validator: '_validateType',
                value: 'cells'
            }
        }
    }
);

A.namespace('Plugin').DataTableHighlight = DataTableHighlight;


}, '3.0.1', {"requires": ["aui-datatable-selection"], "skinnable": true});
