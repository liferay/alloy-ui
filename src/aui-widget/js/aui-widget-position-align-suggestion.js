var getClassName = A.getClassName;

/**
 * Widget extension, which can be used to suggest alignment points based on
 * position attribute to base Widget class, through the
 * [Base.build](Base.html#method_build) method. It also tries to find
 * the best position in case the widget doesn't fit it's constrainment node.
 *
 * @class A.WidgetPositionAlignSuggestion
 * @param {Object} The user configuration object
 */

function PositionAlignSuggestion() {}

/**
 * Static property used to define the default attribute
 * configuration.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
PositionAlignSuggestion.ATTRS = {
    /**
     * Determine the position of the tooltip.
     *
     * @attribute position
     * @default top
     * @type {String}
     */
    position: {
        getter: '_getPosition',
        validator: '_validatePosition',
        value: 'top'
    }
};

A.mix(PositionAlignSuggestion.prototype, {
    /**
     * Property defining the align points based on the suggested `position`.
     *
     * @property POSITION_ALIGN_SUGGESTION
     * @type {}
     */
    POSITION_ALIGN_SUGGESTION: {
        bottom: [A.WidgetPositionAlign.TC, A.WidgetPositionAlign.BC],
        left: [A.WidgetPositionAlign.RC, A.WidgetPositionAlign.LC],
        right: [A.WidgetPositionAlign.LC, A.WidgetPositionAlign.RC],
        top: [A.WidgetPositionAlign.BC, A.WidgetPositionAlign.TC]
    },

    _hasAlignmentPoints: false,

    _lastPosition: null,

    /**
     * Construction logic executed during WidgetPositionAlignSuggestion
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function(config) {
        var instance = this;

        if (config && config.align && config.align.points) {
            instance._hasAlignmentPoints = true;
            instance._setPositionAccordingPoints();
        }

        A.on(instance._onUISetAlignPAS, instance, '_uiSetAlign');

        A.after(instance._afterRenderUIPAS, instance, 'renderUI');

        instance.after('positionChange', instance._afterPositionChangePAS);
    },

    /**
     * Suggest alignment for the node based on the `position` suggestion.
     *
     * @method suggestAlignment
     * @attribute alignNode
     */
    suggestAlignment: function(alignNode) {
        var instance = this,
            align;

        align = instance.get('align') || {};

        if (alignNode) {
            align.node = alignNode;
        }

        if (!instance._hasAlignmentPoints) {
            align.points = instance._getAlignPointsSuggestion(
                instance.get('position'));
        }

        instance.set('align', align);
    },

    /**
     * Fire after `boundingBox` position changes.
     *
     * @method _afterPositionChangePAS
     * @param event
     * @protected
     */
    _afterPositionChangePAS: function(event) {
        var instance = this;

        instance._uiSetPosition(event.newVal, event.prevVal);
    },

    /**
     * Fire after `renderUI` method.
     *
     * @method _afterRenderUIPAS
     * @param event
     * @protected
     */
    _afterRenderUIPAS: function() {
        var instance = this;

        instance._uiSetPosition(instance.get('position'));
    },

    /**
     * Returns true if the widget can fit inside it's constrainment node.
     *
     * @method _canWidgetAlignToNode
     * @param node
     * @param position
     * @protected
     */
    _canWidgetAlignToNode: function(node, position) {
        var instance = this,
            constrainedXY,
            points = instance._getAlignPointsSuggestion(position),
            xy = instance._getAlignedXY(node, points);

        constrainedXY = instance.getConstrainedXY(xy);

        return (constrainedXY[0] === xy[0] && constrainedXY[1] === xy[1]);
    },

    /**
     * Finds the position in which the widget fits without having to have its
     * coordinates changed due to its constrainment node.
     *
     * @method _findBestPosition
     * @param node
     * @protected
     */
    _findBestPosition: function(node) {
        var instance = this,
            position = instance.get('position'),
            testPositions = [position, 'top', 'bottom', 'right', 'left'],
            trigger = A.one(node);

        if (trigger && !trigger.inViewportRegion()) {
            return instance._findBestPositionOutsideViewport(trigger);
        } else {
            testPositions = A.Array.dedupe(testPositions);

            A.Array.some(testPositions, function(testPosition) {
                if (instance._canWidgetAlignToNode(trigger, testPosition)) {
                    position = testPosition;
                    return true;
                }
            });
        }

        return position;
    },

    /**
     * Finds the better widget's position when its anchor is outside
     * the view port.
     *
     * @method _findBestPositionOutsideViewport
     * @param node
     * @protected
     */
    _findBestPositionOutsideViewport: function(node) {
        var instance = this,
            nodeRegion = instance._getRegion(node),
            region = instance._getRegion();

        if (nodeRegion.top < region.top) {
            return 'bottom';
        }
        else if (nodeRegion.bottom > region.bottom) {
            return 'top';
        }
        else if (nodeRegion.right > region.right) {
            return 'left';
        }
        else if (nodeRegion.left < region.left) {
            return 'right';
        }
    },

    /**
     * Guess alignment points for the `position`.
     *
     * @method _getAlignPointsSuggestion
     * @attribute position
     * @protected
     */
    _getAlignPointsSuggestion: function(position) {
        return this.POSITION_ALIGN_SUGGESTION[position];
    },

    /**
     * Set the `position` attribute.
     *
     * @method _getPosition
     * @param {Number} val
     * @protected
     */
    _getPosition: function(val) {
        if (A.Lang.isFunction(val)) {
            val = val.call(this);
        }

        return val;
    },

    /**
     * Fire before `_uiSetAlign` method.
     *
     * @method _onUISetAlignPAS
     * @param node
     * @protected
     */
    _onUISetAlignPAS: function(node) {
        var instance = this,
            position;

        if (!instance.get('constrain')) {
            return;
        }

        position = instance._findBestPosition(node);

        instance._syncPositionUI(
            position, instance._lastPosition || instance.get('position'));

        instance._lastPosition = position;

        return new A.Do.AlterArgs(
            null, [node, instance._getAlignPointsSuggestion(position)]);
    },

    /**
     * Sets the position according to the align points initially defined.
     *
     * @method _setPositionAccordingPoints
     * @protected
     */
    _setPositionAccordingPoints: function() {
        var instance = this,
            points = instance.get('align').points;

        A.Object.some(instance.POSITION_ALIGN_SUGGESTION, function(value, key) {
            if (points[0] === value[0] && points[1] === value[1]) {
                instance.set('position', key);
                return true;
            }
        });
    },

    /**
     * Sync the `boundingBox` position CSS classes.
     *
     * @method _syncPositionUI
     * @param val
     * @param prevVal
     * @protected
     */
    _syncPositionUI: function(val, prevVal) {
        var instance = this,
            boundingBox = instance.get('boundingBox');

        if (prevVal) {
            boundingBox.removeClass(getClassName(prevVal));
        }
        boundingBox.addClass(getClassName(val));
    },

    /**
     * Set the `boundingBox` position on the UI.
     *
     * @method _uiSetPosition
     * @param val
     * @param prevVal
     * @protected
     */
    _uiSetPosition: function(val, prevVal) {
        var instance = this;

        instance._syncPositionUI(val, prevVal);

        instance.suggestAlignment();
    },

    /**
     * Validates the value of `position` attribute.
     *
     * @method _validatePosition
     * @param value
     * @protected
     * @return {Boolean} True only if value is 'bottom', 'top', 'left'
     *     or 'right'.
     */
    _validatePosition: function(val) {
        if (A.Lang.isFunction(val)) {
            val = val.call(this);
        }

        return (val === 'bottom' || val === 'top' || val === 'left' || val === 'right');
    }
});

A.WidgetPositionAlignSuggestion = PositionAlignSuggestion;