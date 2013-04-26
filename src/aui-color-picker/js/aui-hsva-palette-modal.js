/* global A*/

var AArray = A.Array,
    AWidget = A.Widget,
    Lang = A.Lang,

    getClassName = A.getClassName,

    CSS_HSV_PALETTE_MODAL = getClassName('hsv-palette-modal'),

    NAME = 'hsv-palette-modal',

    EMPTY = '',

HSVAPaletteModal = A.Base.create(NAME, A.Modal, [], {
    initializer: function() {
        var instance = this;

        instance.after('render', instance._renderHSVAPalette, instance);

        instance.on('selectedChange', instance._onSelectionChange, instance);
    },

    _getSelected: function() {
        var instance = this;

        return instance._hsvPalette.get('selected');
    },

    _onSelectionChange: function(event) {
        var instance = this;

        if (event.src !== AWidget.UI_SRC) {
            instance._hsvPalette.set('selected', event.newVal);
        }
    },

    _renderHSVAPalette: function() {
        var instance = this,
            body,
            contentBox,
            hsvClass,
            hsvOptions,
            useAlpha;

        contentBox = instance.get('contentBox');

        hsvOptions = instance.get('hsv');

        useAlpha = hsvOptions.alpha;

        hsvClass = A.HSVPalette;

        if (useAlpha) {
            hsvClass = A.HSVAPalette;
        }

        contentBox.addClass(CSS_HSV_PALETTE_MODAL);

        body = instance.getStdModNode(A.WidgetStdMod.BODY);

        instance._hsvPalette = new hsvClass(hsvOptions).render(body);

        if (instance.get('centered')) {
            instance.align();
        }

        instance._hsvPalette.after(
            'selectedChange',
            function(event) {
                instance.set('selected', event.newVal, {
                    src: AWidget.UI_SRC
                });
            }
        );
    }
}, {
    ATTRS: {
        hsv: {
            validator: Lang.isObject,
            value: {
                alpha: false
            }
        },

        selected: {
            getter: '_getSelected',
            validator: Lang.isString,
            value: EMPTY
        }
    },

    CSS_PREFIX: getClassName(NAME),

    NAME: NAME,

    NS: NAME
});

A.HSVAPaletteModal = HSVAPaletteModal;