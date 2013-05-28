/**
 * The Color Picker Component
 *
 * @module aui-color-picker
 * @submodule aui-color-picker-base
 */

var AArray = A.Array,
    AWidget = A.Widget,
    Lang = A.Lang,

    getClassName = A.getClassName,

    _NAME = 'color-picker-inline',

    _DATA_INDEX = 'data-index',
    _DATA_VALUE = 'data-value',
    _DEFAULT_COLOR = '#FFF',
    _DEFAULT_COLUMNS = 10,
    _DEFAULT_HSV_COLOR = 'FF0000',
    _DOT = '.',
    _EMPTY = '',
    _INVALID_COLOR_INDEX = -1,
    _POUND = '#',

    BOUNDING_BOX = 'boundingBox',
    CLICK = 'click',
    CLICKOUTSIDE = 'clickoutside',
    COLOR = 'color',
    COLOR_CHANGE = 'colorChange',
    COLOR_PALETTE = 'colorPalette',
    CONTENT_BOX = 'contentBox',
    HSV_PALETTE = 'hsvPalette',
    ITEMS = 'items',
    RC_SRC = 'sourceRecentColor',
    RECENT_COLORS = 'recentColors',
    RENDER_COLOR_PALETTE = 'renderColorPalette',
    RENDER_HSV_PALETTE = 'renderHSVPalette',
    SELECT = 'select',
    SELECTED = 'selected',
    SELECTED_CHANGE = 'selectedChange',
    STRINGS = 'strings',
    TRIGGER = 'trigger',
    UNSELECT = 'unselect',
    VISIBLE = 'visible',
    VISIBLE_CHANGE = 'visibleChange',
    Z_INDEX = 'zIndex',

    CSS_NO_COLOR = getClassName('color-picker-nocolor'),
    CSS_NO_COLOR_ICON = getClassName('color-picker-nocolor-icon'),
    CSS_TRIGGER = getClassName('color-picker-trigger'),
    CSS_HSV_TRIGGER = getClassName('hsv-trigger'),
    CSS_ACTIONS_CONTAINER = getClassName('actions-container');

/**
 * A base class for ColorPickerBase.
 *
 * @class A.ColorPickerBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
function ColorPickerBase(config) {}

ColorPickerBase.prototype = {
    TPL_HEADER_CONTENT: '<h3>{header}</h3>',

    TPL_ACTIONS: '<div class="row-fluid ' + CSS_ACTIONS_CONTAINER + '"></div',

    TPL_HSV_TRIGGER: '<div class="span6 ' + CSS_HSV_TRIGGER + '">{more}</div>',

    TPL_NO_COLOR:   '<div class="span6 ' + CSS_NO_COLOR + '">' +
                        '<a href class="btn-link"><i class="' + CSS_NO_COLOR_ICON + ' icon-remove-circle"></i>{none}</a>' +
                    '</div>',

    _currentTrigger: null,
    _eventHandles: null,
    _hsvPaletteModal: null,

    /**
     * Construction logic executed during ColorPickerBase instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance._eventHandles = [];

        A.after(instance._rendererUICPBase, instance, 'renderer');
    },

    /**
     * TODO. Wanna help? Please send a Pull Request. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var instance = this;

        if (instance._recentColorsPalette) {
            instance._recentColorsPalette.destroy();
        }

        if (instance._colorPalette) {
            instance._colorPalette.destroy();
        }

        (new A.EventHandle(instance._eventHandles)).detach();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method reset
     */
    reset: function() {
        var instance = this;

        instance.set(COLOR, _EMPTY, {
            src: AWidget.UI_SRC
        });

        if (instance._colorPalette) {
            instance._colorPalette.set(SELECTED, _INVALID_COLOR_INDEX, {
                src: AWidget.UI_SRC
            });
        }

        if (instance._recentColorsPalette) {
            instance._recentColorsPalette.set(SELECTED, _INVALID_COLOR_INDEX, {
                src: AWidget.UI_SRC
            });
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _bindTrigger
     * @protected
     */
    _bindTrigger: function() {
        var instance = this,
            trigger,
            triggerEvent;

        trigger = instance.get(TRIGGER);
        triggerEvent = instance.get('triggerEvent');

        if (Lang.isString(trigger)) {
            instance._eventHandles.push(
                A.getBody().delegate(triggerEvent, instance._onTriggerInteraction, trigger, instance)
            );
        }
        else {
            instance._eventHandles.push(
                trigger.on(triggerEvent, instance._onTriggerInteraction, instance)
            );
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _bindHSVPalette
     * @protected
     */
    _bindHSVPalette: function() {
        var instance = this,
            renderHSVPalette;

        renderHSVPalette = instance.get(RENDER_HSV_PALETTE);

        if (renderHSVPalette) {
            instance._eventHandles.push(
                instance._hsvTrigger.on(CLICK, instance._onHSVTriggerClick, instance)
            );

            instance._recentColorsPalette.on(SELECTED_CHANGE, instance._onRecentColorPaletteSelectChange, instance);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _bindNoColor
     * @protected
     */
    _bindNoColor: function() {
        var instance = this;

        instance._eventHandles.push(
            instance._noColorNode.on(CLICK, instance._onNoColorClick, instance)
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _bindUICPBase
     * @protected
     */
    _bindUICPBase: function() {
        var instance = this;

        instance._bindNoColor();
        instance._bindHSVPalette();
        instance._bindTrigger();

        instance.on(COLOR_CHANGE, instance._onColorChange, instance);
        instance.on(VISIBLE_CHANGE, instance._onVisibleChange, instance);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _defaultValueRecentColors
     * @protected
     */
    _defaultValueRecentColors: function() {
        var instance = this,
            defaultColor,
            itemValue;

        defaultColor = instance.get('defaultColor');

        itemValue = {
            name: instance.get(STRINGS).noColor,
            value: defaultColor
        };

        return {
            columns: _DEFAULT_COLUMNS,
            items: [
                itemValue,
                itemValue,
                itemValue,
                itemValue,
                itemValue,
                itemValue,
                itemValue,
                itemValue,
                itemValue,
                itemValue
            ]
        };
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getCurrentTrigger
     * @protected
     */
    _getCurrentTrigger: function() {
        var instance = this;

        return instance._currentTrigger;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getDefaultAttributeValue
     * @param attributeName
     * @protected
     */
    _getDefaultAttributeValue: function(attributeName) {
        var instance = this,
            attributeValue,
            color;

        color = instance.get(COLOR);

        attributeValue = instance.get(attributeName);

        if (color) {
            A.mix(
                attributeValue,
                {
                    selected: color
                }
            );
        }

        return attributeValue;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _findRecentColorEmptySpot
     * @param items
     * @protected
     */
    _findRecentColorEmptySpot: function(items) {
        var instance = this,
            defaultColor,
            result;

        defaultColor = instance.get('defaultColor');

        result = _INVALID_COLOR_INDEX;

        if (!items) {
            items = instance._recentColorsPalette.get(ITEMS);
        }

        AArray.some(
            items,
            function(item, index) {
                var emptySlot = (item.value === defaultColor);

                if (emptySlot) {
                    result = index;
                }

                return emptySlot;
            }
        );

        return result;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getHSVPalette
     * @protected
     */
    _getHSVPalette: function() {
        var instance = this,
            contentBox,
            strings,
            zIndex;

        if (!instance._hsvPaletteModal) {
            contentBox = instance.get(CONTENT_BOX);

            strings = instance.get(STRINGS);

            zIndex = instance.get(Z_INDEX) || 0;

            zIndex += 2;

            instance._hsvPaletteModal = new A.HSVAPaletteModal(
                {
                    centered: true,
                    headerContent: Lang.sub(
                        instance.TPL_HEADER_CONTENT,
                        {
                            header: strings.header
                        }
                    ),
                    hsv: instance.get(HSV_PALETTE),
                    modal: true,
                    resizable: false,
                    toolbars: {
                        footer: [
                            {
                                label: strings.cancel,
                                on: {
                                    click: function() {
                                        instance._hsvPaletteModal.hide();
                                    }
                                }
                            },
                            {
                                label: strings.ok,
                                on: {
                                    click: function() {
                                        instance._onHSVPaletteOK();
                                    }
                                },
                                primary: true
                            }
                        ]
                    },
                    zIndex: zIndex
                }
            ).render();
        }

        return instance._hsvPaletteModal;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onColorChange
     * @param event
     * @protected
     */
    _onColorChange: function(event) {
        var instance = this;

        if (event.src !== RC_SRC && event.src !== AWidget.UI_SRC) {
            instance.hide();
        }

        if (event.src !== AWidget.UI_SRC) {
            instance.fire('select', {
                color: event.newVal,
                trigger: event.trigger
            });
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onColorPaletteSelectChange
     * @param event
     * @protected
     */
    _onColorPaletteSelectChange: function(event) {
        var instance = this,
            color,
            item,
            selectedIndex;

        if (event.src !== AWidget.UI_SRC) {
            if (instance.get(RENDER_HSV_PALETTE)) {
                instance._recentColorsPalette.set(SELECTED, _INVALID_COLOR_INDEX, {
                    src: AWidget.UI_SRC
                });
            }

            if (event.newVal === _INVALID_COLOR_INDEX) {
                instance.set(COLOR, _EMPTY, {
                    trigger: instance._currentTrigger
                });
            }
            else {
                item = instance._colorPalette.get(ITEMS)[event.newVal];

                color = Lang.isObject(item) ? item.name : item;

                instance.set(COLOR, color, {
                    trigger: instance._currentTrigger
                });
            }
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onHSVPaletteOK
     * @param event
     * @protected
     */
    _onHSVPaletteOK: function(event) {
        var instance = this,
            color,
            emptySpotIndex,
            recentColor,
            recentColors;

        color = _POUND + instance._hsvPaletteModal.get(SELECTED);

        recentColors = instance._recentColorsPalette.get(ITEMS);

        instance._colorPalette.set(SELECTED, _INVALID_COLOR_INDEX, {
            src: AWidget.UI_SRC
        });

        if (Lang.isNumber(instance._recentColorIndex)) {
            recentColors[instance._recentColorIndex] = color;

            instance._recentColorsPalette.set(SELECTED, instance._recentColorIndex, {
                src: AWidget.UI_SRC
            });
        }
        else {
            emptySpotIndex = instance._findRecentColorEmptySpot(recentColors);

            if (emptySpotIndex > _INVALID_COLOR_INDEX) {
                recentColors[emptySpotIndex] = color;
            }
            else {
                recentColors.push(color);
            }

            instance._recentColorsPalette.set(SELECTED, emptySpotIndex, {
                src: AWidget.UI_SRC
            });
        }

        instance._recentColorsPalette.set(ITEMS, recentColors);

        instance.set(COLOR, color, {
            src: RC_SRC,
            trigger: instance._currentTrigger
        });

        instance._hsvPaletteModal.hide();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onHSVTriggerClick
     * @protected
     */
    _onHSVTriggerClick: function() {
        var instance = this,
            hsvPalette;

        instance._recentColorIndex = null;

        hsvPalette = instance._getHSVPalette();

        hsvPalette.set(SELECTED, _DEFAULT_HSV_COLOR);

        if (instance._clickOutsideHandle) {
            instance._clickOutsideHandle.detach();
        }

        hsvPalette.show();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onNoColorClick
     * @param event
     * @protected
     */
    _onNoColorClick: function(event) {
        var instance = this;

        event.halt();

        instance.set(COLOR, _EMPTY, {
            trigger: instance._currentTrigger
        });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onRecentColorPaletteSelectChange
     * @param event
     * @protected
     */
    _onRecentColorPaletteSelectChange: function(event) {
        var instance = this,
            color,
            item;

        if (event.src !== AWidget.UI_SRC) {
            instance._colorPalette.set(SELECTED, _INVALID_COLOR_INDEX, {
                src: AWidget.UI_SRC
            });

            if (event.newVal === _INVALID_COLOR_INDEX) {
                instance.set(COLOR, _EMPTY,{
                    trigger: instance._currentTrigger
                });
            }
            else {
                item = instance._recentColorsPalette.get(ITEMS)[event.newVal];

                color = Lang.isObject(item) ? item.name : item;

                instance.set(COLOR, color, {
                    trigger: instance._currentTrigger
                });
            }
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onRecentColorClick
     * @param event
     * @protected
     */
    _onRecentColorClick: function(event) {
        var instance = this,
            color,
            hsvPalette,
            index,
            node;

        node = event.item;

        color = node.getAttribute(_DATA_VALUE);

        instance._recentColorIndex = Lang.toInt(node.getAttribute(_DATA_INDEX));

        if (color === _DEFAULT_COLOR) {
            event.preventDefault();

            hsvPalette = instance._getHSVPalette();

            hsvPalette.set(SELECTED, _DEFAULT_HSV_COLOR);

            if (instance._clickOutsideHandle) {
                instance._clickOutsideHandle.detach();
            }

            hsvPalette.show();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onTriggerInteraction
     * @param event
     * @protected
     */
    _onTriggerInteraction: function(event) {
        var instance = this,
            target;

        target = event.currentTarget;

        if (target === instance._currentTrigger) {
            instance.set(VISIBLE, !instance.get(VISIBLE));
        }
        else {
            instance.set('align.node', target);

            instance.set(VISIBLE, true);

            instance._currentTrigger = target;

            instance.get(CONTENT_BOX).one('.palette-item-inner').focus();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onVisibleChange
     * @param event
     * @protected
     */
    _onVisibleChange: function(event) {
        var instance = this;

        if (instance._clickOutsideHandle) {
            instance._clickOutsideHandle.detach();
        }

        if (!event.newVal) {
            if (instance._currentTrigger) {
                instance._currentTrigger.focus();
            }
        }
        else {
            instance.reset();

            A.later(0, instance, function(event) {
                instance._clickOutsideHandle = instance.get(BOUNDING_BOX).once(CLICKOUTSIDE, instance.hide, instance);
            }, instance);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderActionsContainer
     * @protected
     */
    _renderActionsContainer: function() {
        var instance = this,
            body;

        body = instance.getStdModNode(A.WidgetStdMod.BODY);

        instance._actionsContainer = body.appendChild(instance.TPL_ACTIONS);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderColorPalette
     * @protected
     */
    _renderColorPalette: function() {
        var instance = this,
            body,
            color,
            colorPaletteOptions;

        body = instance.getStdModNode(A.WidgetStdMod.BODY);

        colorPaletteOptions = instance._getDefaultAttributeValue(COLOR_PALETTE);

        instance._colorPalette = new A.ColorPalette(colorPaletteOptions).render(body);

        instance._colorPalette.on(SELECTED_CHANGE, instance._onColorPaletteSelectChange, instance);

    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderHSVTrigger
     * @protected
     */
    _renderHSVTrigger: function() {
        var instance = this,
            body,
            strings;

        strings = instance.get(STRINGS);

        instance._hsvTrigger = instance._actionsContainer.appendChild(
            Lang.sub(
                instance.TPL_HSV_TRIGGER,
                {
                    more: strings.more
                }
            )
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderNoColor
     * @protected
     */
    _renderNoColor: function() {
        var instance = this;

        instance._noColorNode = instance._actionsContainer.appendChild(
            Lang.sub(
                instance.TPL_NO_COLOR,
                {
                    none: instance.get('strings').none
                }
            )
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _renderRecentColors
     * @protected
     */
    _renderRecentColors: function() {
        var instance = this,
            body,
            color,
            recentColors,
            recentColorsPalette;

        recentColors = instance._getDefaultAttributeValue(RECENT_COLORS);

        body = instance.getStdModNode(A.WidgetStdMod.BODY);

        recentColorsPalette = new A.ColorPalette(recentColors);

        recentColorsPalette.render(body);

        recentColorsPalette.on([SELECT, UNSELECT], instance._onRecentColorClick, instance);

        instance._recentColorsPalette = recentColorsPalette;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _rendererUICPBase
     * @protected
     */
    _rendererUICPBase: function() {
        var instance = this,
            renderColorPalette,
            renderHSVPalette;

        renderColorPalette = instance.get(RENDER_COLOR_PALETTE);

        if (renderColorPalette) {
            instance._renderColorPalette();
        }

        renderHSVPalette = instance.get(RENDER_HSV_PALETTE);

        instance._renderActionsContainer();

        if (renderHSVPalette) {
            instance._renderHSVTrigger();

            instance._renderRecentColors();
        }

        instance._renderNoColor();

        instance._bindUICPBase();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _validateTrigger
     * @param value
     * @protected
     */
    _validateTrigger: function(value) {
        var instance = this;

        return (value instanceof A.Node || value instanceof A.NodeList || Lang.isString(value));
    }
};

/**
 * Static property used to define the default attribute
 * configuration for the ColorPickerBase.
 *
 * @property ColorPickerBase.ATTRS
 * @type Object
 * @static
 */
ColorPickerBase.ATTRS = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute bodyContent
     * @default ''
     * @type String
     */
    bodyContent: {
        value: _EMPTY
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute color
     * @type String
     */
    color: {
        validator: Lang.isString
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute colorPalette
     * @type Object
     */
    colorPalette: {
        validator: Lang.isObject,
        value: {
            columns: _DEFAULT_COLUMNS,
            items: [
                '#000000',
                '#434343',
                '#666666',
                '#999999',
                '#b7b7b7',
                '#cccccc',
                '#d9d9d9',
                '#efefef',
                '#f3f3f3',
                '#ffffff',
                '#980000',
                '#FF0000',
                '#FF9900',
                '#FFFF00',
                '#00FF00',
                '#00FFFF',
                '#4A86E8',
                '#0000FF',
                '#9900FF',
                '#FF00FF',
                '#E6B8AF',
                '#F4CCCC',
                '#FCE5CD',
                '#FFF2CC',
                '#D9EAD3',
                '#D0E0E3',
                '#C9DAF8',
                '#CFE2F3',
                '#D9D2E9',
                '#EAD1DC',
                '#DD7E6B',
                '#EA9999',
                '#F9CB9C',
                '#FFE599',
                '#B6D7A8',
                '#A2C4C9',
                '#A4C2F4',
                '#9FC5E8',
                '#B4A7D6',
                '#D5A6BD',
                '#CC4125',
                '#E06666',
                '#F6B26B',
                '#FFD966',
                '#93C47D',
                '#76A5AF',
                '#6D9EEB',
                '#6FA8DC',
                '#8E7CC3',
                '#C27BA0',
                '#A61C00',
                '#CC0000',
                '#E69138',
                '#F1C232',
                '#6AA84F',
                '#45818E',
                '#3C78D8',
                '#3D85C6',
                '#674EA7',
                '#A64D79',
                '#85200C',
                '#990000',
                '#B45F06',
                '#BF9000',
                '#38761D',
                '#134F5C',
                '#1155CC',
                '#0B5394',
                '#351C75',
                '#741B47',
                '#5B0F00',
                '#660000',
                '#783F04',
                '#7F6000',
                '#274E13',
                '#0C343D',
                '#1C4587',
                '#073763',
                '#20124D',
                '#4C1130'
            ]
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute currentTrigger
     * @readOnly
     */
    currentTrigger: {
        getter: '_getCurrentTrigger',
        readOnly: true
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute defaultColor
     * @default '#FFF'
     * @type String
     */
    defaultColor: {
        validator: Lang.isString,
        value: _DEFAULT_COLOR
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute hsvPalette
     * @type Object
     */
    hsvPalette: {
        validator: Lang.isObject,
        value: {
            alpha: false
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute recentColors
     * @type Object
     */
    recentColors: {
        validator: Lang.isObject,
        valueFn: '_defaultValueRecentColors'
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute renderColorPalette
     * @default true
     * @type Boolean
     */
    renderColorPalette: {
        validator: Lang.isBoolean,
        value: true
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute renderHSVPalette
     * @default true
     * @type Boolean
     * @writeOnce
     */
    renderHSVPalette: {
        validator: Lang.isBoolean,
        value: true,
        writeOnce: true
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute strings
     * @type Object
     */
    strings: {
        value: {
            cancel: 'Cancel',
            header: 'Choose custom color',
            more: 'More colors...',
            noColor: 'No color',
            none: 'None',
            ok: 'OK'
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute trigger
     */
    trigger: {
        validator: '_validateTrigger',
        value: _DOT + CSS_TRIGGER
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute triggerEvent
     * @default 'click'
     * @type String
     */
    triggerEvent: {
        validator: Lang.isString,
        value: CLICK
    }
};

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property ColorPickerBase.CSS_PREFIX
 * @type String
 * @static
 */
ColorPickerBase.CSS_PREFIX = getClassName(_NAME);

/**
 * Static property provides a string to identify the class.
 *
 * @property ColorPickerBase.NAME
 * @type String
 * @static
 */
ColorPickerBase.NAME = _NAME;

A.ColorPickerBase = ColorPickerBase;