YUI.add('aui-color-picker-base', function (A, NAME) {

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
    _DEFAULT_COLUMNS = 10,
    _INVALID_COLOR_INDEX = -1,

    CSS_NO_COLOR = getClassName('color-picker-nocolor'),
    CSS_NO_COLOR_ICON = getClassName('color-picker-nocolor-icon'),
    CSS_TRIGGER = getClassName('color-picker-trigger'),
    CSS_HSV_TRIGGER = getClassName('hsv-trigger'),
    CSS_ACTIONS_CONTAINER = getClassName('actions-container');

/**
 * A base class for `ColorPickerBase`.
 *
 * @class A.ColorPickerBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

function ColorPickerBase() {}

ColorPickerBase.prototype = {
    TPL_ACTIONS: '<div class="row ' + CSS_ACTIONS_CONTAINER + '"></div>',

    TPL_HSV_TRIGGER: '<div class="col col-lg-6 col-md-6 col-sm-6 ' + CSS_HSV_TRIGGER + '">{more}</div>',

    TPL_NO_COLOR: '<div class="col-xs-6 ' + CSS_NO_COLOR + '">' +
        '<a href class="btn-link"><span class="' + CSS_NO_COLOR_ICON +
        ' glyphicon glyphicon-remove-circle"></span>{none}</a>' + '</div>',

    _currentTrigger: null,
    _eventHandles: null,
    _hsvPaletteModal: null,

    /**
     * Construction logic executed during `ColorPickerBase` instantiation.
     * Lifecycle.
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
     * Destructor lifecycle implementation for the `ColorPickerBase` class.
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
     * Resets the `ColorPickerBase` to it's default state.
     *
     * @method reset
     */
    reset: function() {
        var instance = this;

        instance.set('color', '', {
            src: AWidget.UI_SRC
        });

        if (instance._colorPalette) {
            instance._colorPalette.set('selected', _INVALID_COLOR_INDEX, {
                src: AWidget.UI_SRC
            });
        }

        if (instance._recentColorsPalette) {
            instance._recentColorsPalette.set('selected', _INVALID_COLOR_INDEX, {
                src: AWidget.UI_SRC
            });
        }
    },

    /**
     * Binds events to the `HSVPalette`.
     *
     * @method _bindHSVPalette
     * @protected
     */
    _bindHSVPalette: function() {
        var instance = this,
            renderHSVPalette;

        renderHSVPalette = instance.get('renderHSVPalette');

        if (renderHSVPalette) {
            instance._eventHandles.push(
                instance._hsvTrigger.on('click', instance._onHSVTriggerClick, instance)
            );

            instance._recentColorsPalette.on('selectedChange', instance._onRecentColorPaletteSelectChange, instance);
        }
    },

    /**
     * Binds the click event to the NoColor node.
     *
     * @method _bindNoColor
     * @protected
     */
    _bindNoColor: function() {
        var instance = this;

        instance._eventHandles.push(
            instance._noColorNode.on('click', instance._onNoColorClick, instance)
        );
    },

    /**
     * Binds base events to the `ColorPickerBase` instance.
     *
     * @method _bindUICPBase
     * @protected
     */
    _bindUICPBase: function() {
        var instance = this;

        instance._bindNoColor();
        instance._bindHSVPalette();

        instance.on('colorChange', instance._onColorChange, instance);
        instance.on('visibleChange', instance._onVisibleChange, instance);
    },

    /**
     * Provides the default value for the `recentColors` attribute.
     *
     * @method _defaultValueRecentColors
     * @return {Object}
     * @protected
     */
    _defaultValueRecentColors: function() {
        var instance = this,
            defaultColor,
            itemValue;

        defaultColor = instance.get('defaultColor');

        itemValue = {
            name: instance.get('strings').noColor,
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
     * Returns the current `trigger`.
     *
     * @method _getCurrentTrigger
     * @return {Node}
     * @protected
     */
    _getCurrentTrigger: function() {
        var instance = this;

        return instance._currentTrigger;
    },

    /**
     * Returns the default value of passed attribute.
     *
     * @method _getDefaultAttributeValue
     * @param {String} attributeName
     * @return {*} The default value of an attribute
     * @protected
     */
    _getDefaultAttributeValue: function(attributeName) {
        var instance = this,
            attributeValue,
            color;

        color = instance.get('color');

        attributeValue = instance.get(attributeName);

        if (color) {
            A.mix(
                attributeValue, {
                    selected: color
                }
            );
        }

        return attributeValue;
    },

    /**
     * Returns an empty spot from the `recentColors` palette.
     *
     * @method _findRecentColorEmptySpot
     * @param {Array} items
     * @return {Number} Index of the empty spot
     * @protected
     */
    _findRecentColorEmptySpot: function(items) {
        var instance = this,
            defaultColor,
            result;

        defaultColor = instance.get('defaultColor');

        result = _INVALID_COLOR_INDEX;

        if (!items) {
            items = instance._recentColorsPalette.get('items');
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
     * Returns the `HSVAPaletteModal` instance.
     *
     * @method _getHSVPalette
     * @return {Object} HSV palette modal
     * @protected
     */
    _getHSVPalette: function() {
        var instance = this,
            contentBox,
            strings,
            zIndex;

        if (!instance._hsvPaletteModal) {
            contentBox = instance.get('contentBox');

            strings = instance.get('strings');

            zIndex = instance.get('zIndex') || 0;

            zIndex += 2;

            instance._hsvPaletteModal = new A.HSVAPaletteModal({
                centered: true,
                hsv: instance.get('hsvPalette'),
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
                            cssClass: 'btn-primary',
                            on: {
                                click: function() {
                                    instance._onHSVPaletteOK();
                                }
                            }
                        }
                    ]
                },
                zIndex: zIndex
            }).render();
        }

        return instance._hsvPaletteModal;
    },

    /**
     * Fires the select event and hides popover.
     *
     * @method _onColorChange
     * @param {EventFacade} event
     * @protected
     */
    _onColorChange: function(event) {
        var instance = this;

        if (event.src !== 'sourceRecentColor' && event.src !== AWidget.UI_SRC) {
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
     * Sets the newly selected color from color palette.
     *
     * @method _onColorPaletteSelectChange
     * @param {EventFacade} event
     * @protected
     */
    _onColorPaletteSelectChange: function(event) {
        var instance = this,
            color,
            item;

        if (event.src !== AWidget.UI_SRC) {
            if (instance.get('renderHSVPalette')) {
                instance._recentColorsPalette.set('selected', _INVALID_COLOR_INDEX, {
                    src: AWidget.UI_SRC
                });
            }

            if (event.newVal === _INVALID_COLOR_INDEX) {
                instance.set('color', '', {
                    trigger: instance._currentTrigger
                });
            }
            else {
                item = instance._colorPalette.get('items')[event.newVal];

                color = Lang.isObject(item) ? item.name : item;

                instance.set('color', color, {
                    trigger: instance._currentTrigger
                });
            }
        }
    },

    /**
     * Selects the custom color from the `HSVAPaletteModal`.
     *
     * @method _onHSVPaletteOK
     * @param {EventFacade} event
     * @protected
     */
    _onHSVPaletteOK: function() {
        var instance = this,
            color,
            emptySpotIndex,
            recentColors;

        color = '#' + instance._hsvPaletteModal.get('selected');

        recentColors = instance._recentColorsPalette.get('items');

        instance._colorPalette.set('selected', _INVALID_COLOR_INDEX, {
            src: AWidget.UI_SRC
        });

        if (Lang.isNumber(instance._recentColorIndex)) {
            recentColors[instance._recentColorIndex] = color;

            instance._recentColorsPalette.set('selected', instance._recentColorIndex, {
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

            instance._recentColorsPalette.set('selected', emptySpotIndex, {
                src: AWidget.UI_SRC
            });
        }

        instance._recentColorsPalette.set('items', recentColors);

        instance.set('color', color, {
            src: 'sourceRecentColor',
            trigger: instance._currentTrigger
        });

        instance._hsvPaletteModal.hide();
    },

    /**
     * Opens `HSVAPaletteModal`.
     *
     * @method _onHSVTriggerClick
     * @protected
     */
    _onHSVTriggerClick: function() {
        var instance = this,
            hsvPalette;

        instance._recentColorIndex = null;

        hsvPalette = instance._getHSVPalette();

        hsvPalette.set('selected', 'FF0000');

        if (instance._clickOutsideHandle) {
            instance._clickOutsideHandle.detach();
        }

        hsvPalette.show();
    },

    /**
     * Removes color from the current `trigger`.
     *
     * @method _onNoColorClick
     * @param {EventFacade} event
     * @protected
     */
    _onNoColorClick: function(event) {
        var instance = this;

        event.halt();

        instance.set('color', '', {
            trigger: instance._currentTrigger
        });
    },

    /**
     * Sets the newly selected color from `recentColors`.
     *
     * @method _onRecentColorPaletteSelectChange
     * @param {EventFacade} event
     * @protected
     */
    _onRecentColorPaletteSelectChange: function(event) {
        var instance = this,
            color,
            item;

        if (event.src !== AWidget.UI_SRC) {
            instance._colorPalette.set('selected', _INVALID_COLOR_INDEX, {
                src: AWidget.UI_SRC
            });

            if (event.newVal === _INVALID_COLOR_INDEX) {
                instance.set('color', '', {
                    trigger: instance._currentTrigger
                });
            }
            else {
                item = instance._recentColorsPalette.get('items')[event.newVal];

                color = Lang.isObject(item) ? item.name : item;

                instance.set('color', color, {
                    trigger: instance._currentTrigger
                });
            }
        }
    },

    /**
     * Sets the selected color from the `recentColors` palette.
     *
     * @method _onRecentColorClick
     * @param {EventFacade} event
     * @protected
     */
    _onRecentColorClick: function(event) {
        var instance = this,
            color,
            hsvPalette,
            node;

        node = event.item;

        color = node.getAttribute('data-value');

        instance._recentColorIndex = Lang.toInt(node.getAttribute('data-index'));

        if (color === '#FFF') {
            event.preventDefault();

            hsvPalette = instance._getHSVPalette();

            hsvPalette.set('selected', 'FF0000');

            if (instance._clickOutsideHandle) {
                instance._clickOutsideHandle.detach();
            }

            hsvPalette.show();
        }
    },

    /**
     * Displays or hides the color picker after `trigger` interaction.
     *
     * @method _onTriggerInteraction
     * @param {EventFacade} event
     * @protected
     */
    _onTriggerInteraction: function(event) {
        var instance = this,
            target;

        target = event.currentTarget;

        if (target === instance._currentTrigger) {
            instance.set('visible', !instance.get('visible'));
        }
        else {
            instance.set('align.node', target);

            instance.set('visible', true);

            instance._currentTrigger = target;

            instance.get('contentBox').one('.palette-item-inner').focus();
        }
    },

    /**
     * Syncs clickoutside event and refocuses `trigger` on modal hide.
     *
     * @method _onVisibleChange
     * @param {EventFacade} event
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

            A.later(0, instance, function() {
                instance._clickOutsideHandle = instance.get('boundingBox').once('clickoutside', instance.hide,
                    instance);
            }, instance);
        }
    },

    /**
     * Renders and appends actions container to the body.
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
     * Creates new instance of the `ColorPalette` component with `defaultColor`
     * options.
     *
     * @method _renderColorPalette
     * @protected
     */
    _renderColorPalette: function() {
        var instance = this,
            body,
            colorPaletteOptions;

        body = instance.getStdModNode(A.WidgetStdMod.BODY);

        colorPaletteOptions = instance._getDefaultAttributeValue('colorPalette');

        instance._colorPalette = new A.ColorPalette(colorPaletteOptions).render(body);

        instance._colorPalette.on('selectedChange', instance._onColorPaletteSelectChange, instance);

    },

    /**
     * Renders `trigger` for the `HSVPalette` and appends it to the actions
     * container.
     *
     * @method _renderHSVTrigger
     * @protected
     */
    _renderHSVTrigger: function() {
        var instance = this,
            strings;

        strings = instance.get('strings');

        instance._hsvTrigger = instance._actionsContainer.appendChild(
            Lang.sub(
                instance.TPL_HSV_TRIGGER, {
                    more: strings.more
                }
            )
        );
    },

    /**
     * Renders the no color node and appends it to the actions container.
     *
     * @method _renderNoColor
     * @protected
     */
    _renderNoColor: function() {
        var instance = this;

        instance._noColorNode = instance._actionsContainer.appendChild(
            Lang.sub(
                instance.TPL_NO_COLOR, {
                    none: instance.get('strings').none
                }
            )
        );
    },

    /**
     * Renders the `recentColors` palette.
     *
     * @method _renderRecentColors
     * @protected
     */
    _renderRecentColors: function() {
        var instance = this,
            body,
            recentColors,
            recentColorsPalette;

        recentColors = instance._getDefaultAttributeValue('recentColors');

        body = instance.getStdModNode(A.WidgetStdMod.BODY);

        recentColorsPalette = new A.ColorPalette(recentColors);

        recentColorsPalette.render(body);

        recentColorsPalette.on(['select', 'unselect'], instance._onRecentColorClick, instance);

        instance._recentColorsPalette = recentColorsPalette;
    },

    /**
     * Renders the elements for the color palette popover.
     *
     * @method _rendererUICPBase
     * @protected
     */
    _rendererUICPBase: function() {
        var instance = this,
            renderColorPalette,
            renderHSVPalette;

        renderColorPalette = instance.get('renderColorPalette');

        if (renderColorPalette) {
            instance._renderColorPalette();
        }

        renderHSVPalette = instance.get('renderHSVPalette');

        instance._renderActionsContainer();

        if (renderHSVPalette) {
            instance._renderHSVTrigger();

            instance._renderRecentColors();
        }

        instance._renderNoColor();

        instance._bindUICPBase();
    },

    /**
     * Overwrites the default setter for `trigger` in `WidgetTrigger` class
     * which invokes `A.one`, but we need to support multiple triggers.
     *
     * @method _setTrigger
     * @param {Node | String} value
     * @return {Node | String}
     * @protected
     */

    _setTrigger: function(value) {
        return value;
    },

    /**
     * Validates the value of the `trigger` attribute.
     *
     * @method _validateTrigger
     * @param {Node | String} value
     * @return {Boolean} The result of the validation
     * @protected
     */
    _validateTrigger: function(value) {
        return (value instanceof A.Node || value instanceof A.NodeList || Lang.isString(value));
    },

    /**
     * Set the `trigger` UI.
     *
     * @method _uiSetTrigger
     * @param {Node | String} value
     * @protected
     */
    _uiSetTrigger: function() {
        var instance = this,
            trigger,
            triggerEvent;

        trigger = instance.get('trigger');
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
    }
};

/**
 * Static property used to define the default attribute
 * configuration for the `ColorPickerBase`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
ColorPickerBase.ATTRS = {

    /**
     * The content of body.
     *
     * @attribute bodyContent
     * @default ''
     * @type {String}
     */
    bodyContent: {
        value: ''
    },

    /**
     * Currently selected color.
     *
     * @attribute color
     * @type {String}
     */
    color: {
        validator: Lang.isString
    },

    /**
     * Default colors available to the color palette.
     *
     * @attribute colorPalette
     * @type {Object}
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
     * Current `trigger` node.
     *
     * @attribute currentTrigger
     * @type {Node}
     * @readOnly
     */
    currentTrigger: {
        getter: '_getCurrentTrigger',
        readOnly: true
    },

    /**
     * Provides the default color used for the `recentColors` palette.
     *
     * @attribute defaultColor
     * @default '#FFF'
     * @type {String}
     */
    defaultColor: {
        validator: Lang.isString,
        value: '#FFF'
    },

    /**
     * `HSVPalette` used for selecting custom colors not present in
     * `defualtColors`.
     *
     * @attribute hsvPalette
     * @type {Object}
     */
    hsvPalette: {
        validator: Lang.isObject,
        value: {
            alpha: false
        }
    },

    /**
     * Colors that have been selected recently from the `HSVPalette`.
     *
     * @attribute recentColors
     * @type {Object}
     */
    recentColors: {
        validator: Lang.isObject,
        valueFn: '_defaultValueRecentColors'
    },

    /**
     * Determines if the color palette is rendered on load.
     *
     * @attribute renderColorPalette
     * @default true
     * @type {Boolean}
     */
    renderColorPalette: {
        validator: Lang.isBoolean,
        value: true
    },

    /**
     * Determines if the `HSVPalette` is rendered on load.
     *
     * @attribute renderHSVPalette
     * @default true
     * @type {Boolean}
     * @writeOnce
     */
    renderHSVPalette: {
        validator: Lang.isBoolean,
        value: true,
        writeOnce: true
    },

    /**
     * Collection of strings used to label elements of the UI.
     *
     * @attribute strings
     * @type {Object}
     */
    strings: {
        value: {
            cancel: 'Cancel',
            more: 'More colors...',
            noColor: 'No color',
            none: 'None',
            ok: 'OK'
        }
    },

    /**
     * Trigger node that opens the color palette.
     *
     * @attribute trigger
     * @type {Node | String}
     */
    trigger: {
        setter: '_setTrigger',
        validator: '_validateTrigger',
        value: '.' + CSS_TRIGGER
    },

    /**
     * Trigger event that fires on `trigger` click.
     *
     * @attribute triggerEvent
     * @default 'click'
     * @type {String}
     */
    triggerEvent: {
        validator: Lang.isString,
        value: 'click'
    }
};

/**
 * Static property provides a string to identify the CSS prefix.
 *
 * @property CSS_PREFIX
 * @type {String}
 * @static
 */
ColorPickerBase.CSS_PREFIX = getClassName('color-picker-inline');

/**
 * Static property provides a string to identify the class.
 *
 * @property NAME
 * @type {String}
 * @static
 */
ColorPickerBase.NAME = 'color-picker-inline';

A.ColorPickerBase = ColorPickerBase;


}, '3.0.1', {"requires": ["aui-color-palette", "aui-hsva-palette-modal", "event-outside"], "skinnable": true});
