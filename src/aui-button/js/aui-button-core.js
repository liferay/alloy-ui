/**
 * The Button Component
 *
 * @module aui-button
 */

var Lang = A.Lang,
    isArray = Lang.isArray,
    isNumber = Lang.isNumber,
    isString = Lang.isString,
    isUndefined = Lang.isUndefined,

    ACTIVE = 'active',
    BOUNDING_BOX = 'boundingBox',
    BTN = 'btn',
    BTNGROUP = 'btngroup',
    BUTTON = 'button',
    CLASS_NAME = 'className',
    DISABLED = 'disabled',
    GROUP = 'group',
    I = 'i',
    ICON = 'icon',
    ICON_ALIGN = 'iconAlign',
    ICON_ELEMENT = 'iconElement',
    LABEL = 'label',
    LEFT = 'left',
    PRIMARY = 'primary',
    RIGHT = 'right',
    SUBMIT = 'submit',
    SYNC_UI = 'syncUI',
    TOGGLEBTN = 'togglebtn',
    CHECKBOX = 'checkbox',
    TYPE = 'type',
    WIDGET_CONSTRUCTOR = 'widgetConstructor',

    getClassName = A.getClassName,

    CLASS_NAMES = {
        BUTTON: getClassName(BTN),
        BUTTON_GROUP: getClassName(BTN, GROUP),
        DISABLED: getClassName(DISABLED),
        LABEL: getClassName(LABEL),
        PRIMARY: getClassName(BTN, PRIMARY),
        SELECTED: getClassName(ACTIVE),
        TOGGLE: getClassName(TOGGLEBTN)
    };

/**
 * A base class for `ButtonExt`.
 *
 * @class A.ButtonExt
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var ButtonExt = function(config) {
    var instance = this;

    instance._setEarlyButtonDomType(config.domType);
};

/**
 * Defines the default attribute configuration for the `ButtonExt`.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
ButtonExt.ATTRS = {

    /**
     * Define HTML type attribute of element i.e.
     * `<input type="button">`.
     *
     * @attribute domType
     * @writeOnce
     */
    domType: {
        writeOnce: true,
        validator: function(val) {
            return val.toLowerCase() === BUTTON || val.toLowerCase() === SUBMIT;
        }
    },

    /**
     * String containing CSS class of icon to use. A list of icons
     * can be found [here](http://liferay.github.io/alloy-bootstrap/base-css.html#icons).
     *
     * @attribute icon
     * @type String
     */
    icon: {},

    /**
     * Define markup template for icon, passed in as
     * a node e.g. `Y.Node.create('<i></i>')`.
     *
     * @attribute iconElement
     * @default 'A.Node.create("<i></i>")'
     */
    iconElement: {
        valueFn: function() {
            var instance = this;
            return A.Node.create(instance.ICON_TEMPLATE);
        }
    },

    /**
     * String that sets position of icon.
     *
     * @attribute iconAlign
     * @default 'left'
     * @type String
     */
    iconAlign: {
        value: LEFT,
        validator: isString
    },

    /**
     * Set button style to primary.
     *
     * @attribute primary
     * @default false
     * @type Boolean
     */
    primary: {
        value: false
    }
};

/**
 * Defines how attribute values are to be parsed from markup contained in
 * `ButtonExt`.
 *
 * @property HTML_PARSER
 * @type Object
 * @static
 */
ButtonExt.HTML_PARSER = {
    iconElement: I
};

/**
 * Get typed buttons template.
 *
 * @method getTypedButtonTemplate
 * @param template
 * @param type
 * @static
 */
ButtonExt.getTypedButtonTemplate = function(template, type) {
    return Lang.sub(template, {
        type: type ? ' type="' + type + '"' : ''
    });
};

ButtonExt.prototype = {
    TEMPLATE: '<button{type}></button>',
    ICON_TEMPLATE: '<i></i>',
    iconElement: null,

    /**
     * Construction logic executed during `ButtonExt` instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.after(instance.syncButtonExtUI, instance, SYNC_UI);
        instance.after({
            iconChange: instance._afterIconChange,
            iconAlignChange: instance._afterIconAlignChange,
            primaryChange: instance._afterPrimaryChange
        });
    },

    /**
     * Update icon image, icon alignment, and primary button style.
     *
     * @method syncButtonExtUI
     */
    syncButtonExtUI: function() {
        var instance = this;

        instance._uiSetIcon(instance.get(ICON));
        instance._uiSetPrimary(instance.get(PRIMARY));
    },

    /**
     * Fire after `icon` attribute change.
     *
     * @method _afterIconChange
     * @param event
     * @protected
     */
    _afterIconChange: function(event) {
        var instance = this;

        instance._uiSetIcon(event.newVal);
    },

    /**
     * Fire after `iconAlign` attribute change.
     *
     * @method _afterIconAlignChange
     * @param event
     * @protected
     */
    _afterIconAlignChange: function(event) {
        var instance = this;

        instance._uiSetIconAlign(event.newVal);
    },

    /**
     * Fire after `primary` attribute change.
     *
     * @method _afterPrimaryChange
     * @param event
     * @protected
     */
    _afterPrimaryChange: function(event) {
        var instance = this;

        instance._uiSetPrimary(event.newVal);
    },

    /**
     * Set button type on bounding box template before constructor is invoked.
     * The type should be set before widget creates the bounding box node.
     *
     * @method _setEarlyButtonDomType
     * @param type
     * @protected
     */
    _setEarlyButtonDomType: function(type) {
        var instance = this;

        instance.BOUNDING_TEMPLATE = A.ButtonExt.getTypedButtonTemplate(
            ButtonExt.prototype.TEMPLATE, type);
    },

    /**
     * Add primary button class.
     *
     * @method _uiSetPrimary
     * @param val
     * @protected
     */
    _uiSetPrimary: function(val) {
        var instance = this;

        instance.get(BOUNDING_BOX).toggleClass(CLASS_NAMES.PRIMARY, val);
    },

    /**
     * Add class name for button icon.
     *
     * @method _uiSetIcon
     * @param val
     * @protected
     */
    _uiSetIcon: function(val) {
        var instance = this;

        if (!val) {
            return;
        }
        var iconElement = instance.get(ICON_ELEMENT);
        iconElement.set(CLASS_NAME, val);
        instance._uiSetIconAlign(instance.get(ICON_ALIGN));
    },

    /**
     * Add alignment for button icon.
     *
     * @method _uiSetIconAlign
     * @param val
     * @protected
     */
    _uiSetIconAlign: function(val) {
        var instance = this;

        A.Button.syncIconUI(
            instance.get(BOUNDING_BOX), instance.get(ICON_ELEMENT), val);
    }
};

A.ButtonExt = ButtonExt;

/**
 * A base class for ButtonCore.
 *
 * @class A.ButtonCore
 * @constructor
 */
var ButtonCore = A.ButtonCore;

/**
 * Contains CSS class names to use for `ButtonCore`.
 *
 * @property CLASS_NAMES
 * @static
 */
ButtonCore.CLASS_NAMES = CLASS_NAMES;

/**
 * Set the button text (either as text or sets the `value` attribute).
 *
 * @method _uiSetLabel
 * @protected
 */
ButtonCore.prototype._uiSetLabel = (function(original) {
    return function(label) {
        var instance = this,
            node = instance.getNode();

        if (label !== '' || node.one('.' + ButtonCore.CLASS_NAMES.LABEL)) {
            return original.apply(instance, arguments);
        }
    };
}(ButtonCore.prototype._uiSetLabel));

var Button = A.Button;

Button.NAME = BTN;

Button.CSS_PREFIX = CLASS_NAMES.BUTTON;

Button.CLASS_NAMES = CLASS_NAMES;

/**
 * A base class for Button.
 *
 * @class A.Button
 * @extends Button
 * @uses A.ButtonExt, A.WidgetCssClass, A.WidgetToggle
 * @constructor
 */
A.Button = A.Base.create(Button.NAME, Button, [ButtonExt, A.WidgetCssClass, A.WidgetToggle], {}, {

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: CLASS_NAMES.BUTTON,

    /**
     * Return an object literal containing widget constructor data specified in the node.
     *
     * @method getWidgetLazyConstructorFromNodeData
     * @param node
     */
    getWidgetLazyConstructorFromNodeData: function(node) {
        var config = node.getData(WIDGET_CONSTRUCTOR) || {};

        config.boundingBox = node;
        config.render = true;
        return config;
    },

    /**
     * Return a boolean, true if node has widget constructor data.
     *
     * @method hasWidgetLazyConstructorData
     * @param node
     */
    hasWidgetLazyConstructorData: function(node) {
        return node.getData(WIDGET_CONSTRUCTOR) !== undefined;
    },

    /**
     * Update node's widget constructor data attribute with config.
     *
     * @method setWidgetLazyConstructorNodeData
     * @param node
     * @param config
     */
    setWidgetLazyConstructorNodeData: function(node, config) {
        node.setData(WIDGET_CONSTRUCTOR, config);
    },

    /**
     * Update icon alignment in button.
     *
     * @method syncIconUI
     * @param buttonElement
     * @param iconElement
     * @param iconAlign
     */
    syncIconUI: function(buttonElement, iconElement, iconAlign) {
        var textNode = A.config.doc.createTextNode(' '),
            insertPos = 0;

        if (iconAlign === RIGHT) {
            insertPos = null;
        }

        buttonElement.insert(textNode, insertPos);
        buttonElement.insert(iconElement, insertPos);
    }
});

var ToggleButton = A.ToggleButton;

ToggleButton.NAME = TOGGLEBTN;

ToggleButton.CSS_PREFIX = CLASS_NAMES.TOGGLE;

ToggleButton.CLASS_NAMES = CLASS_NAMES;

/**
 * A base class for ToggleButton.
 *
 * @class A.ToggleButton
 * @uses A.ButtonExt, A.WidgetCssClass
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.ToggleButton = A.Base.create(ToggleButton.NAME, ToggleButton, [ButtonExt, A.WidgetCssClass], {}, {});

var ButtonGroup = A.ButtonGroup;

ButtonGroup.NAME = BTNGROUP;

ButtonGroup.CSS_PREFIX = CLASS_NAMES.BUTTON_GROUP;

ButtonGroup.CLASS_NAMES = CLASS_NAMES;

/**
 * A base class for ButtonGroup.
 *
 * @class A.ButtonGroup
 * @constructor
 */
A.mix(ButtonGroup.prototype, {

    // Bootstrap button group depends on buttons to be a direct children,
    // force one-box widget.
    CONTENT_TEMPLATE: null,

    /**
     * Return `item` or `node` of specified `index`.
     *
     * @method item
     * @param index
     */
    item: function(index) {
        var instance = this,
            node = instance.getButtons().item(index),
            item = A.Widget.getByNode(node);

        if (A.instanceOf(item, Button)) {
            return item;
        }

        return node;
    },

    /**
     * Renders the `ButtonGroup` component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this;

        instance.getButtons().each(function(button) {
            if (!button.button && !A.instanceOf(A.Widget.getByNode(button), A.Button)) {

                if (A.Button.hasWidgetLazyConstructorData(button)) {
                    new A.Button(A.Button.getWidgetLazyConstructorFromNodeData(button));
                    A.Button.setWidgetLazyConstructorNodeData(button, null);
                }
                else {
                    button.plug(A.Plugin.Button);
                }
            }
        });
    },

    /**
     * Select items by adding the active class name.
     *
     * @method select
     * @param items
     */
    select: function(items) {
        var instance = this;

        return instance.toggleSelect(items, true);
    },

    /**
     * Toggle selection by adding or removing the active class name.
     *
     * @method toggleSelect
     * @param items
     * @param forceSelection
     */
    toggleSelect: function(items, forceSelection) {
        var instance = this,
            type = instance.get(TYPE),
            buttons = instance.getButtons();

        if (isUndefined(items)) {
            items = buttons.getDOMNodes();
        }
        if (!isArray(items)) {
            items = A.Array(items);
        }

        A.Array.each(items, function(item) {
            if (isNumber(item)) {
                item = buttons.item(item);
            }
            // Make sure the passed dom nodes are instance of Node
            item = A.one(item);

            if (type === CHECKBOX) {
                // If item is already selected...
                if (item.hasClass(A.ButtonGroup.CLASS_NAMES.SELECTED)) {
                    if (forceSelection === true) {
                        // Prevent click
                        return;
                    }
                }
                // If item is not selected yet...
                else if (forceSelection === false) {
                    // Prevent click
                    return;
                }
            }

            instance._handleClick({
                target: item
            });
        });
    },

    /**
     * Select items by adding the active class name.
     *
     * @method unselect
     * @param items
     */
    unselect: function(items) {
        var instance = this;

        return instance.toggleSelect(items, false);
    }
}, true);
