var Lang = A.Lang,

    StdMod = A.WidgetStdMod,

    OWNER_DOCUMENT = 'ownerDocument',

    getClassName = A.getClassName,

    _SPACE = ' ',

    BOUNDING_BOX = 'boundingBox',
    BR = 'br',
    CLICK = 'click',
    DRAGGABLE = 'draggable',
    MODAL = 'modal',
    MOUSEMOVE = 'mousemove',
    RESIZABLE = 'resizable',

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

        instance.after({
            'resize:end': A.bind(instance._fillHeight, instance),
            'resize:resize': A.bind(instance._fillHeight, instance)
        });
    },

    _addBubbleTargets: function(config) {
        var instance = this;

        if (!Lang.isObject(config)) {
            config = {};
        }
        return A.mix(config, { bubbleTargets: instance });
    },

    _getStdModTemplate : function(section) {
        return A.Node.create(A.Modal.TEMPLATES[section], this._stdModNode.get(OWNER_DOCUMENT));
    },

    _onUserInitInteraction: function() {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX),
            draggable = instance.get(DRAGGABLE),
            resizable = instance.get(RESIZABLE);

        if (draggable) {
            boundingBox.plug(A.Plugin.Drag, instance._addBubbleTargets(draggable));
        }

        if (resizable) {
            boundingBox.plug(A.Plugin.Resize, instance._addBubbleTargets(resizable));
        }
    }
}, {
    CSS_PREFIX: getClassName(MODAL),

    ATTRS: {
        draggable: {
            value: false,
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