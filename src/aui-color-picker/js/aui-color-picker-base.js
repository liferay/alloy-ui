/* global A*/

var AArray = A.Array,
    AWidget = A.Widget,
    Lang = A.Lang,

    getClassName = A.getClassName,

    _DEFAULT_COLUMNS = 10,
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
    DATA_INDEX = 'data-index',
    DATA_VALUE = 'data-value',
    DEFAULT_COLOR = '#FFF',
    DEFAULT_HSV_COLOR = 'FF0000',
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

    CSS_NO_COLOR = getClassName('color-picker-nocolor'),
    CSS_NO_COLOR_ICON = getClassName('color-picker-nocolor-icon'),
    CSS_TRIGGER = getClassName('color-picker-trigger'),
    CSS_HSV_TRIGGER = getClassName('hsv-trigger'),
    CSS_ACTIONS_CONTAINER = getClassName('actions-container'),

    NAME = 'color-picker-inline';

function ColorPickerBase(config) {}

ColorPickerBase.prototype = {
    TPL_HEADER_CONTENT: '<h3>{header}</h3>',

    TPL_ACTIONS:
        '<div class="aui-row-fluid ' + CSS_ACTIONS_CONTAINER + '"></div',

    TPL_HSV_TRIGGER:
        '<div class="aui-span6 ' + CSS_HSV_TRIGGER + '">{more}</div>',

    TPL_NO_COLOR:
        '<div class="aui-span6 ' + CSS_NO_COLOR + '">' +
            '<a href class="aui-btn-link"><i class="' + CSS_NO_COLOR_ICON + ' aui-icon-remove-circle"></i>{none}</a>' +
        '</div>',

    initializer: function() {
        var instance = this;

        instance._eventHandles = [];

        A.after(instance._rendererUICPBase, instance, 'renderer');
    },

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

    _bindTrigger: function() {
        var instance = this,
            trigger;

        trigger = instance.get(TRIGGER);

        if (Lang.isString(trigger)) {
            instance._eventHandles.push(
                A.getBody().delegate(CLICK, instance._onTriggerClick, trigger, instance)
            );
        }
        else {
            instance._eventHandles.push(
                trigger.on(CLICK, instance._onTriggerClick, trigger, instance)
            );
        }
    },

    _bindUICPBase: function() {
        var instance = this,
            renderHSVPalette;

        renderHSVPalette = instance.get(RENDER_HSV_PALETTE);

        if (renderHSVPalette) {
            instance._eventHandles.push(
                instance._hsvTrigger.on(CLICK, instance._onHSVTriggerClick, instance)
            );

            instance._recentColorsPalette.on(SELECTED_CHANGE, instance._onRecentColorPaletteSelectChange, instance);
        }

        instance.on(COLOR_CHANGE, instance._onColorChange, instance);

        instance.on(VISIBLE_CHANGE, instance._onVisibleChange, instance);

        instance._eventHandles.push(
            instance._noColorNode.on(CLICK, instance._onNoColorClick, instance)
        );

        instance._bindTrigger();
    },

    _cleanup: function() {
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

    _defaultValueRecentColors: function() {
        var instance = this,
            defaultColor;

        defaultColor = {
            name: instance.get(STRINGS).noColor,
            value: DEFAULT_COLOR
        };

        return {
            columns: _DEFAULT_COLUMNS,
            items: [
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor
            ]
        };
    },

    _getCurrentTrigger: function() {
        var instance = this;

        return instance._currentTrigger;
    },

    _getDefaultOptions: function(optionsName) {
        var instance = this,
            color,
            options;

        options = instance.get(optionsName);

        color = instance.get(COLOR);

        if (color) {
            A.mix(
                options,
                {
                    selected: color
                }
            );
        }

        return options;
    },

    _findRecentColorEmptySpot: function(items) {
        var instance = this,
            result = _INVALID_COLOR_INDEX;

        items = items || instance._recentColorsPalette.get(ITEMS);

        AArray.some(
            items,
            function(item, index) {
                var emptySlot = (item.value === DEFAULT_COLOR);

                if (emptySlot) {
                    result = index;
                }

                return emptySlot;
            }
        );

        return result;
    },

    _getHSVPalette: function() {
        var instance = this,
            contentBox,
            strings;

        if (!instance._hsvPaletteModal) {
            contentBox = instance.get(CONTENT_BOX);

            strings = instance.get(STRINGS);

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
                    resizable: false
                }
            ).render();

            instance._hsvPaletteModal.addToolbar([
                {
                    label: strings.cancel,
                    on: {
                        click: A.bind(instance._hsvPaletteModal.hide, instance._hsvPaletteModal)
                    }
                },
                {
                    label: strings.ok,
                    on: {
                        click: A.bind(instance._onHSVPaletteOK, instance)
                    },
                    primary: true
                }
            ]);
        }

        return instance._hsvPaletteModal;
    },

    _onColorChange: function(event) {
        var instance = this;

        if (event.src !== RC_SRC && event.src !== AWidget.UI_SRC) {
            instance.hide();
        }

        if (event.src !== AWidget.UI_SRC) {
            instance.fire('selectColor', {
                color: event.newVal,
                trigger: event.trigger
            });
        }
    },

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

    _onHSVTriggerClick: function() {
        var instance = this,
            hsvPalette;

        instance._recentColorIndex = null;

        hsvPalette = instance._getHSVPalette();

        hsvPalette.set(SELECTED, DEFAULT_HSV_COLOR);

        if (instance._clickOutsideHandle) {
            instance._clickOutsideHandle.detach();
        }

        hsvPalette.show();
    },

    _onNoColorClick: function(event) {
        var instance = this;

        event.halt();

        instance.set(COLOR, _EMPTY, {
            trigger: instance._currentTrigger
        });
    },

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

    _onRecentColorClick: function(event) {
        var instance = this,
            color,
            hsvPalette,
            index,
            node;

        node = event.item;

        color = node.getAttribute(DATA_VALUE);

        instance._recentColorIndex = Lang.toInt(node.getAttribute(DATA_INDEX));

        if (color === DEFAULT_COLOR) {
            event.preventDefault();

            hsvPalette = instance._getHSVPalette();

            hsvPalette.set(SELECTED, DEFAULT_HSV_COLOR);

            if (instance._clickOutsideHandle) {
                instance._clickOutsideHandle.detach();
            }

            hsvPalette.show();
        }
    },

    _onTriggerClick: function(event) {
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

            instance.get(CONTENT_BOX).one('.aui-palette-item-inner').focus();
        }
    },

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
            instance._cleanup();

            A.later(0, instance, function(event) {
                instance._clickOutsideHandle = instance.get(BOUNDING_BOX).once(CLICKOUTSIDE, instance.hide, instance);
            }, instance);
        }
    },

    _renderActionsContainer: function() {
        var instance = this,
            body;

        body = instance.getStdModNode(A.WidgetStdMod.BODY);

        instance._actionsContainer = body.appendChild(instance.TPL_ACTIONS);
    },

    _renderColorPalette: function() {
        var instance = this,
            body,
            color,
            colorPaletteOptions;

        body = instance.getStdModNode(A.WidgetStdMod.BODY);

        colorPaletteOptions = instance._getDefaultOptions(COLOR_PALETTE);

        instance._colorPalette = new A.ColorPalette(colorPaletteOptions).render(body);

        instance._colorPalette.on(SELECTED_CHANGE, instance._onColorPaletteSelectChange, instance);

    },

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

    _renderRecentColors: function() {
        var instance = this,
            body,
            color,
            recentColors,
            recentColorsPalette;

        recentColors = instance._getDefaultOptions(RECENT_COLORS);

        body = instance.getStdModNode(A.WidgetStdMod.BODY);

        recentColorsPalette = new A.ColorPalette(recentColors).render(body);

        recentColorsPalette.on([SELECT, UNSELECT], instance._onRecentColorClick, instance);

        instance._recentColorsPalette = recentColorsPalette;
    },

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

    _validateTrigger: function(value) {
        var instance = this;

        return (value instanceof A.Node || value instanceof A.NodeList || Lang.isString(value));
    }
};

ColorPickerBase.ATTRS = {
    bodyContent: {
        value: _EMPTY
    },

    color: {
        validator: Lang.isString
    },

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

    currentTrigger: {
        getter: '_getCurrentTrigger',
        readOnly: true
    },

    hsvPalette: {
        validator: Lang.isObject,
        value: {
            alpha: false
        }
    },

    recentColors: {
        validator: Lang.isObject,
        valueFn: '_defaultValueRecentColors'
    },

    renderColorPalette: {
        validator: Lang.isBoolean,
        value: true
    },

    renderHSVPalette: {
        validator: Lang.isBoolean,
        value: true
    },

    strings: {
        value: {
            cancel: 'Cancel',
            header: 'Choose custom color',
            more: 'More colors...',
            noColor: 'No color',
            none: 'None',
            ok: 'Ok'
        }
    },

    trigger: {
        validator: '_validateTrigger',
        value: _DOT + CSS_TRIGGER
    }
};

ColorPickerBase.CSS_PREFIX = getClassName(NAME);

ColorPickerBase.NAME = NAME;

ColorPickerBase.NS = NAME;

A.ColorPickerBase = ColorPickerBase;