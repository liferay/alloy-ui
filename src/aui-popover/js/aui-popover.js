var Lang = A.Lang,

    StdMod = A.WidgetStdMod,

    OWNER_DOCUMENT = 'ownerDocument',

    getClassName = A.getClassName,

    _SPACE = ' ',

    ARROW = 'arrow',
    BLOCK = 'block',
    BOTTOM = 'bottom',
    BOUNDING_BOX = 'boundingBox',
    CONTENT = 'content',
    CONTENT_BOX = 'contentBox',
    DISPLAY = 'display',
    LEFT = 'left',
    NONE = 'none',
    POPOVER = 'popover',
    POSITION = 'position',
    POSITION_CHANGE = 'positionChange',
    RIGHT = 'right',
    TOP = 'top',

    CSS_ARROW = getClassName(ARROW),
    CSS_POPOVER_BD = getClassName('popover-content'),
    CSS_POPOVER_FT = getClassName('popover-footer'),
    CSS_POPOVER_HD = getClassName('popover-title');

A.Popover = A.Base.create(POPOVER, A.Widget, [
    A.WidgetPosition,
    A.WidgetStdMod,
    A.WidgetAutohide,
    A.WidgetModality,
    A.WidgetPositionAlign,
    A.WidgetPositionConstrain,
    A.WidgetStack
], {
    initializer: function() {
        var instance = this;

        instance.after(POSITION_CHANGE, instance._afterPositionChange);

        A.after(instance._afterUiSetVisible, instance, '_uiSetVisible');
        A.after(instance._afterRenderBoxClassNames, instance, '_renderBoxClassNames');
    },

    renderUI: function() {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        boundingBox.append(A.Popover.TEMPLATES.arrow);

        instance._uiSetPosition(instance.get(POSITION));
    },

    _afterPositionChange: function(event) {
        var instance = this;

        instance._uiSetPosition(event.newVal, event.prevVal);
    },

    _afterRenderBoxClassNames: function(event) {
        var instance = this,
            contentBox = instance.get(CONTENT_BOX);

        contentBox.removeClass(instance.getClassName(CONTENT));
    },

    _afterUiSetVisible: function(val) {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        boundingBox.setStyle(DISPLAY, val ? BLOCK : NONE);
    },

    _getStdModTemplate : function(section) {
        return A.Node.create(A.Popover.TEMPLATES[section], this._stdModNode.get(OWNER_DOCUMENT));
    },

    _uiSetPosition: function(val, prevVal) {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        if (prevVal) {
            boundingBox.removeClass(getClassName(prevVal));
        }
        boundingBox.addClass(getClassName(val));
    }
}, {
    CSS_PREFIX: getClassName(POPOVER),

    ATTRS: {
        position: {
            validator: function(val) {
                return val === BOTTOM || val === TOP || val === LEFT || val === RIGHT;
            },
            value: BOTTOM
        }
    },

    TEMPLATES: {
        header : '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.HEADER] + _SPACE + CSS_POPOVER_HD + '"></div>',
        body : '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.BODY] + _SPACE + CSS_POPOVER_BD + '"></div>',
        footer : '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.FOOTER] + _SPACE + CSS_POPOVER_FT + '"></div>',
        arrow : '<div class="' + CSS_ARROW + '"></div>'
    }
});