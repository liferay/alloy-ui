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
 * A base class for ButtonExt.
 *
 * @class ButtonExt
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var ButtonExt = function(config) {
    var instance = this;

    instance._setEarlyButtonDomType(config.domType);
};

/**
 * Static property used to define the default attribute
 * configuration for the ButtonExt.
 *
 * @property ButtonExt.ATTRS
 * @type Object
 * @static
 */
ButtonExt.ATTRS = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute icon
     */
    domType: {
        writeOnce: true,
        validator: function(val) {
            return val.toLowerCase() === BUTTON || val.toLowerCase() === SUBMIT;
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute icon
     */
    icon: {
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute iconElement
     */
    iconElement: {
        valueFn: function() {
            var instance = this;
            return A.Node.create(instance.ICON_TEMPLATE);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property ButtonExt.HTML_PARSER
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
     * Construction logic executed during ButtonExt instantiation. Lifecycle.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method syncButtonExtUI
     */
    syncButtonExtUI: function() {
        var instance = this;

        instance._uiSetIcon(instance.get(ICON));
        instance._uiSetPrimary(instance.get(PRIMARY));
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property ButtonCore.CLASS_NAMES
 * @static
 */
ButtonCore.CLASS_NAMES = CLASS_NAMES;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @method _uiSetLabel
 */
ButtonCore.prototype._uiSetLabel = (function(original) {
    return function (label) {
        var instance = this,
            node = instance.getNode();

        if (label !== '' || node.one('.' + ButtonCore.CLASS_NAMES.LABEL)) {
            return original.apply(instance, arguments);
        }
    };
}(ButtonCore.prototype._uiSetLabel));

var Button = A.Button;

/**
 * Static property provides a string to identify the class.
 *
 * @property Button.NAME
 * @type String
 * @static
 */
Button.NAME = BTN;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property Button.CSS_PREFIX
 * @type String
 * @static
 */
Button.CSS_PREFIX = CLASS_NAMES.BUTTON;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property Button.CLASS_NAMES
 * @type String
 * @static
 */
Button.CLASS_NAMES = CLASS_NAMES;

/**
 * A base class for Button.
 *
 * @class A.Button
 * @extends Button
 * @uses ButtonExt, A.WidgetCssClass, A.WidgetToggle
 * @constructor
 */
A.Button = A.Base.create(Button.NAME, Button, [ButtonExt, A.WidgetCssClass, A.WidgetToggle], {}, {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property Button.CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: CLASS_NAMES.BUTTON,

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method hasWidgetLazyConstructorData
     * @param node
     */
    hasWidgetLazyConstructorData: function(node) {
        return node.getData(WIDGET_CONSTRUCTOR) !== undefined;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setWidgetLazyConstructorNodeData
     * @param node
     * @param config
     */
    setWidgetLazyConstructorNodeData: function(node, config) {
        node.setData(WIDGET_CONSTRUCTOR, config);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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

/**
 * Static property provides a string to identify the class.
 *
 * @property ToggleButton.NAME
 * @type String
 * @static
 */
ToggleButton.NAME = TOGGLEBTN;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property ToggleButton.CSS_PREFIX
 * @default defaultName
 * @type typeName
 * @static
 */
ToggleButton.CSS_PREFIX = CLASS_NAMES.TOGGLE;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property ToggleButton.CLASS_NAMES
 * @default defaultName
 * @type typeName
 * @static
 */
ToggleButton.CLASS_NAMES = CLASS_NAMES;

/**
 * A base class for ToggleButton.
 *
 * @class A.ToggleButton
 * @uses ButtonExt, A.WidgetCssClass
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.ToggleButton = A.Base.create(ToggleButton.NAME, ToggleButton, [ButtonExt, A.WidgetCssClass], {}, {});

var ButtonGroup = A.ButtonGroup;

/**
 * Static property provides a string to identify the class.
 *
 * @property ButtonGroup.NAME
 * @type String
 * @static
 */
ButtonGroup.NAME = BTNGROUP;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property ButtonGroup.CSS_PREFIX
 * @default defaultName
 * @type typeName
 * @static
 */
ButtonGroup.CSS_PREFIX = CLASS_NAMES.BUTTON_GROUP;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property ButtonGroup.CLASS_NAMES
 * @default defaultName
 * @type typeName
 * @static
 */
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * Render the ButtonGroup component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this;

        instance.getButtons().each(function(button) {
            if (!button.button &&
                !A.instanceOf(A.Widget.getByNode(button), A.Button)) {

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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method select
     * @param items
     */
    select: function(items) {
        var instance = this;

        return instance.toggleSelect(items, true);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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

            instance._handleClick({ target: item });
        });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method unselect
     * @param items
     */
    unselect: function(items) {
        var instance = this;

        return instance.toggleSelect(items, false);
    }
}, true);