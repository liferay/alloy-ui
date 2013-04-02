var Lang = A.Lang,

    StdMod = A.WidgetStdMod,

    OWNER_DOCUMENT = 'ownerDocument',

    getClassName = A.getClassName,

    _DOT = '.',
    _EMPTY = '',
    _SPACE = ' ',

    BR = 'br',
    CLICK = 'click',
    DRAGGABLE = 'draggable',
    HEIGHT = 'height',
    MODAL = 'modal',
    MOUSEMOVE = 'mousemove',
    RESIZABLE = 'resizable',
    WIDTH = 'width',
    FILL_HEIGHT = 'fillHeight',
    HEIGHT_CHANGE = 'heightChange',

    CSS_MODAL_BD = getClassName('modal-body'),
    CSS_MODAL_FT = getClassName('modal-footer'),
    CSS_MODAL_HD = getClassName('modal-header');

A.Modal = A.Base.create(MODAL, A.Widget, [
    A.WidgetPosition,
    A.WidgetStdMod,
    A.WidgetAutohide,
    A.WidgetToolbars,
    A.WidgetModality,
    A.WidgetPositionAlign,
    A.WidgetPositionConstrain,
    A.WidgetStack
], {
    initializer: function() {
        var instance = this;

        instance.once([CLICK, MOUSEMOVE], instance._onUserInitInteraction);
        instance.after('resize:end', A.bind(instance._syncResizeDimensions, instance));
        instance.after(HEIGHT_CHANGE, instance._afterHeightChange);
    },

    _addBubbleTargets: function(config) {
        var instance = this;

        if (!Lang.isObject(config)) {
            config = {};
        }
        return A.mix(config, { bubbleTargets: instance });
    },

    _afterHeightChange: function(event) {
        var instance = this;

        instance._fillMaxHeight(event.newVal);
    },

    _fillMaxHeight: function(height) {
        var instance = this,
            fillHeight = instance.get(FILL_HEIGHT),
            node = instance.getStdModNode(fillHeight, true);

        if (node) {
            node.setStyle('max-height', height);
        }
    },

    _getStdModTemplate : function(section) {
        return A.Node.create(A.Modal.TEMPLATES[section], this._stdModNode.get(OWNER_DOCUMENT));
    },

    _beforeResizeCorrectDimensions: function(event) {
        var instance = this;

        if (instance.resize.proxy) {
            return new A.Do.Prevent();
        }
    },

    _onUserInitInteraction: function() {
        var instance = this,
            draggable = instance.get(DRAGGABLE),
            resizable = instance.get(RESIZABLE);

        if (draggable) {
            instance.plug(A.Plugin.Drag, instance._addBubbleTargets(draggable));
        }

        if (resizable) {
            instance.plug(A.Plugin.Resize, instance._addBubbleTargets(resizable));
            A.before(instance._beforeResizeCorrectDimensions, instance.resize, '_correctDimensions', instance);
        }
    },

    _syncResizeDimensions: function(event) {
        var instance = this,
            resize = event.info;

        instance.set(WIDTH, resize.offsetWidth);
        instance.set(HEIGHT, resize.offsetHeight);
    }
}, {
    CSS_PREFIX: getClassName(MODAL),

    ATTRS: {
        // Temporary fix for widget-stdmod bug when bodyContent initializes empty.
        // this._currFillNode is never updated if _uiSetFillHeight is not called.
        bodyContent: {
            value: _EMPTY
        },

        draggable: {
            value: {
                handles: [_DOT+CSS_MODAL_HD],
                plugins: [
                    { fn: A.Plugin.DDConstrained }
                ]
            },
            writeOnce: true
        },

        resizable: {
            value: {
                handles: BR
            },
            writeOnce: true
        },

        toolbars: {
            valueFn: function() {
                var instance = this;

                return {
                    header: [
                        {
                            cssClass: 'aui-close',
                            label: "\u00D7",
                            after: {
                                click: function() { instance.hide(); }
                            },
                            render: true
                        }
                    ]
                };
            }
        }
    },

    TEMPLATES: {
        header : '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.HEADER] + _SPACE + CSS_MODAL_HD + '"></div>',
        body : '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.BODY] + _SPACE + CSS_MODAL_BD + '"></div>',
        footer : '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.FOOTER] + _SPACE + CSS_MODAL_FT + '"></div>'
    }
});