var Lang = A.Lang,
    isNumber = Lang.isNumber,
    isString = Lang.isString,

    ACTIVE = 'active',
    BOUNDING_BOX = 'boundingBox',
    BTN = 'btn',
    BTNGROUP = 'btngroup',
    CLASS_NAME = 'className',
    CSS_CLASS = 'cssClass',
    DISABLED = 'disabled',
    GROUP = 'group',
    I = 'i',
    ICON = 'icon',
    ICON_ALIGN = 'iconAlign',
    ICON_ELEMENT = 'iconElement',
    LABEL = 'label',
    LEFT = 'left',
    PRIMARY = 'primary',
    RADIO = 'radio',
    RIGHT = 'right',
    SYNC_UI = 'syncUI',
    TOGGLEBTN = 'togglebtn',
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

var ButtonExt = function() {
};

ButtonExt.ATTRS = {
    cssClass: {
    },

    icon: {
    },

    iconElement: {
        valueFn: function(val) {
            var instance = this;
            return A.Node.create(instance.ICON_TEMPLATE);
        }
    },

    iconAlign: {
        value: LEFT,
        validator: isString
    },

    primary: {
        value: false
    }
};

ButtonExt.HTML_PARSER = {
    iconElement: I
};

ButtonExt.prototype = {
    ICON_TEMPLATE: '<i></i>',
    iconElement: null,

    initializer: function() {
        var instance = this;

        instance.after(instance.syncButtonExtUI, instance, SYNC_UI);
        instance.after({
            cssClassChange: instance._afterCssClassChange,
            iconChange: instance._afterIconChange,
            iconAlignChange: instance._afterIconAlignChange,
            primaryChange: instance._afterPrimaryChange
        });
    },

    syncButtonExtUI: function() {
        var instance = this;

        instance._uiSetIcon(instance.get(ICON));
        instance._uiSetPrimary(instance.get(PRIMARY));
        instance._uiSetCssClass(instance.get(CSS_CLASS));
    },

    _afterCssClassChange: function(event) {
        var instance = this;

        instance._uiSetCssClass(event.newVal, event.prevVal);
    },

    _afterIconChange: function(event) {
        var instance = this;

        instance._uiSetIcon(event.newVal);
    },

    _afterIconAlignChange: function(event) {
        var instance = this;

        instance._uiSetIconAlign(event.newVal);
    },

    _afterPrimaryChange: function(event) {
        var instance = this;

        instance._uiSetPrimary(event.newVal);
    },

    _uiSetCssClass: function(val, prevVal) {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        if (prevVal) {
            boundingBox.removeClass(prevVal);
        }
        boundingBox.addClass(val);
    },

    _uiSetPrimary: function(val) {
        var instance = this;

        instance.get(BOUNDING_BOX).toggleClass(CLASS_NAMES.PRIMARY, val);
    },

    _uiSetIcon: function(val) {
        var instance = this;

        if (!val) {
            return;
        }
        var iconElement = instance.get(ICON_ELEMENT);
        iconElement.set(CLASS_NAME, val);
        instance._uiSetIconAlign(instance.get(ICON_ALIGN));
    },

    _uiSetIconAlign: function(val) {
        var instance = this;

        A.Button.syncIconUI(
            instance.get(BOUNDING_BOX), instance.get(ICON_ELEMENT), val);
    }
};

// ButtonCore
var ButtonCore = A.ButtonCore;
ButtonCore.CLASS_NAMES = CLASS_NAMES;
ButtonCore.prototype._uiSetLabel = (function(original) {
    return function (label) {
        var instance = this,
            node = instance.getNode();

        if (label !== '' || node.one('.' + ButtonCore.CLASS_NAMES.LABEL)) {
            return original.apply(instance, arguments);
        }
    };
}(ButtonCore.prototype._uiSetLabel));

// Button
var Button = A.Button;
Button.NAME = BTN;
Button.CSS_PREFIX = CLASS_NAMES.BUTTON;
Button.CLASS_NAMES = CLASS_NAMES;
A.Button = A.Base.create(Button.NAME, Button, [ButtonExt], {}, {
    CSS_PREFIX: CLASS_NAMES.BUTTON,

    getWidgetLazyConstructorFromNodeData: function(node) {
        var instance = this,
            config = node.getData(WIDGET_CONSTRUCTOR) || {};
        config.boundingBox = node;
        config.render = true;
        return config;
    },

    hasWidgetLazyConstructorData: function(node) {
        return node.getData(WIDGET_CONSTRUCTOR) !== undefined;
    },

    setWidgetLazyConstructorNodeData: function(node, config) {
        node.setData(WIDGET_CONSTRUCTOR, config);
    },

    syncIconUI: function(buttonElement, iconElement, iconAlign) {
        var instance = this,
            textNode = A.config.doc.createTextNode(' '),
            insertPos = 0;

        if (iconAlign === RIGHT) {
            insertPos = null;
        }

        buttonElement.insert(textNode, insertPos);
        buttonElement.insert(iconElement, insertPos);
    }
});

// ToggleButton
var ToggleButton = A.ToggleButton;
ToggleButton.NAME = TOGGLEBTN;
ToggleButton.CSS_PREFIX = CLASS_NAMES.TOGGLE;
ToggleButton.CLASS_NAMES = CLASS_NAMES;
A.ToggleButton = A.Base.create(ToggleButton.NAME, ToggleButton, [ButtonExt], {}, {});

// ButtonGroup
var ButtonGroup = A.ButtonGroup;
ButtonGroup.NAME = BTNGROUP;
ButtonGroup.CSS_PREFIX = CLASS_NAMES.BUTTON_GROUP;
ButtonGroup.CLASS_NAMES = CLASS_NAMES;
ButtonGroup.prototype.CONTENT_TEMPLATE = null; // Bootstrap button group depends on buttons to be a direct children, force one-box widget.
ButtonGroup.prototype.renderUI = (function(original) {
    return function() {
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
    };
}(ButtonGroup.prototype.renderUI));
ButtonGroup.prototype.item = function(index) {
    var instance = this,
        buttons = instance.getButtons(),
        node = buttons.item(index),
        button = A.Widget.getByNode(node);

    return A.instanceOf(button, Button) ? button : node;
};
ButtonGroup.prototype.select = function(items) {
    var instance = this;

    return instance.toggle(items, true);
};
ButtonGroup.prototype.toggle = function(items, state) {
    var instance = this,
        buttons = instance.getButtons(),
        selectedClass = ButtonGroup.CLASS_NAMES.SELECTED;

    items = A.Array(items);

    A.Array.each(items, function(item) {
        var node = instance.item(item);

        if (A.instanceOf(node, A.Button)) {
            node = node.get(BOUNDING_BOX);
        }

        if (instance.get(TYPE) === RADIO) {
            buttons.removeClass(selectedClass);
        }

        node.toggleClass(selectedClass, state);
    });
};
ButtonGroup.prototype.unselect = function(items) {
    var instance = this;

    return instance.toggle(items, false);
};