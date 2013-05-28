/**
 * The Color Picker Component
 *
 * @module aui-color-picker
 * @submodule aui-hsv-palette-modal
 */

var AArray = A.Array,
    AWidget = A.Widget,
    Lang = A.Lang,

    getClassName = A.getClassName,

    CSS_HSV_PALETTE_MODAL = getClassName('hsv-palette-modal'),

    NAME = 'hsv-palette-modal',

    EMPTY = '',

/**
 * A base class for HSVAPaletteModal.
 *
 * @class A.HSVAPaletteModal
 * @extends A.Modal
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
HSVAPaletteModal = A.Base.create(NAME, A.Modal, [A.WidgetCssClass, A.WidgetToggle], {

    /**
     * Construction logic executed during HSVAPaletteModal instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.after('render', instance._renderHSVAPalette, instance);

        instance.on('selectedChange', instance._onSelectionChange, instance);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getSelected
     * @protected
     */
    _getSelected: function() {
        var instance = this;

        return instance._hsvPalette.get('selected');
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onSelectionChange
     * @param event
     * @protected
     */
    _onSelectionChange: function(event) {
        var instance = this;

        if (event.src !== AWidget.UI_SRC) {
            instance._hsvPalette.set('selected', event.newVal);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderHSVAPalette
     * @protected
     */
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

    /**
     * Static property used to define the default attribute
     * configuration for the HSVAPaletteModal.
     *
     * @property HSVAPaletteModal.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute hsv
         * @type Object
         */
        hsv: {
            validator: Lang.isObject,
            value: {
                alpha: false
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute selected
         * @default ''
         * @type String
         */
        selected: {
            getter: '_getSelected',
            validator: Lang.isString,
            value: EMPTY
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property HSVAPaletteModal.CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: getClassName(NAME),

    /**
     * Static property provides a string to identify the class.
     *
     * @property HSVAPaletteModal.NAME
     * @type String
     * @static
     */
    NAME: NAME,

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property HSVAPaletteModal.NS
     * @type String
     * @static
     */
    NS: NAME
});

A.HSVAPaletteModal = HSVAPaletteModal;