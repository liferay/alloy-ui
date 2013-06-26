var ALIGN = 'align',
    BOTTOM = 'bottom',
    BOUNDING_BOX = 'boundingBox',
    CONSTRAIN = 'constrain',
    LEFT = 'left',
    POSITION = 'position',
    POSITION_CHANGE = 'positionChange',
    RENDERED = 'rendered',
    RIGHT = 'right',
    TOP = 'top',

    getClassName = A.getClassName;

/**
* Widget extension, which can be used to suggest alignment points based on
* position attribute to base Widget class, through the
* <a href="Base.html#method_build">Base.build</a> method. It also tries to find
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
 * @property WidgetPositionAlignSuggestion.ATTRS
 * @type Object
 * @static
 */
PositionAlignSuggestion.ATTRS = {
    /**
     * Determine the position of the tooltip.
     *
     * @attribute position
     * @default bottom
     * @type {String}
     */
    position: {
        validator: function(val) {
            return  val === BOTTOM || val === TOP || val === LEFT ||
                    val === RIGHT;
        },
        value: TOP
    }
};

A.mix(PositionAlignSuggestion.prototype, {
    /**
     * Property defining the align points based on the suggested
     * <code>position</code>.
     *
     * @property POSITION_ALIGN_SUGGESTION
     * @type {}
     */
    POSITION_ALIGN_SUGGESTION: {
        bottom: [ A.WidgetPositionAlign.TC, A.WidgetPositionAlign.BC ],
        left: [ A.WidgetPositionAlign.RC, A.WidgetPositionAlign.LC ],
        right: [ A.WidgetPositionAlign.LC, A.WidgetPositionAlign.RC ],
        top: [ A.WidgetPositionAlign.BC, A.WidgetPositionAlign.TC ]
    },

    _hasAlignmentPoints: false,

    _lastPosition: null,

    /**
     * Construction logic executed during WidgetPositionAlignSuggestion
     * instantiation. Lifecycle.
     *
     * @method initializer
     */
    initializer: function(config) {
        var instance = this;

        if (config && config.align && config.align.points) {
            instance._hasAlignmentPoints = true;
        }

        A.on(instance._onUISetAlignPAS, instance, '_uiSetAlign');

        A.after(instance._afterRenderUIPAS, instance, 'renderUI');

        instance.after(POSITION_CHANGE, instance._afterPositionChangePAS);
    },

    /**
     * Suggest alignment for the node based on the <code>position</code> suggestion.
     *
     * @method suggestAlignment
     * @attribute alignNode
     */
    suggestAlignment: function(alignNode) {
        var instance = this,
            align;

        align = instance.get(ALIGN) || {};

        if (alignNode) {
            align.node = alignNode;
        }

        if (!instance._hasAlignmentPoints) {
            align.points = instance._getAlignPointsSuggestion(
                instance.get(POSITION));
        }

        instance.set(ALIGN, align);
    },

    /**
     * Fire after <code>boundingBox</code> position changes.
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
     * Fire after <code>renderUI</code> method.
     *
     * @method _afterRenderUIPAS
     * @param event
     * @protected
     */
    _afterRenderUIPAS: function() {
        var instance = this;

        instance._uiSetPosition(instance.get(POSITION));
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
            position = instance.get(POSITION),
            testPositions = [position, TOP, BOTTOM, LEFT, RIGHT];

        testPositions = A.Array.dedupe(testPositions);

        A.Array.some(testPositions, function(testPosition) {
            if (instance._canWidgetAlignToNode(node, testPosition)) {
                position = testPosition;

                return true;
            }
        });

        return position;
    },

    /**
     * Guess alignment points for the <code>position</code>.
     *
     * @method _getAlignPointsSuggestion
     * @attribute position
     * @protected
     */
    _getAlignPointsSuggestion: function(position) {
        return this.POSITION_ALIGN_SUGGESTION[position];
    },

    /**
     * Fire before <code>_uiSetAlign</code> method.
     *
     * @method _onUISetAlignPAS
     * @param node
     * @protected
     */
    _onUISetAlignPAS: function(node) {
        var instance = this,
            position;

        if (!instance.get(CONSTRAIN) || !instance.get(RENDERED)) {
            return;
        }

        position = instance._findBestPosition(node);

        instance._syncPositionUI(
            position, instance._lastPosition || instance.get(POSITION));

        instance._lastPosition = position;

        return new A.Do.AlterArgs(
            null, [node, instance._getAlignPointsSuggestion(position)]);
    },

    /**
     * Sync the <code>boundingBox</code> position CSS classes.
     *
     * @method _syncPositionUI
     * @param val
     * @param prevVal
     * @protected
     */
    _syncPositionUI: function (val, prevVal) {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        if (prevVal) {
            boundingBox.removeClass(getClassName(prevVal));
        }
        boundingBox.addClass(getClassName(val));
    },

    /**
     * Set the <code>boundingBox</code> position on the UI.
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
    }
});

A.WidgetPositionAlignSuggestion = PositionAlignSuggestion;