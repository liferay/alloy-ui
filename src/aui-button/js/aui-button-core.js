var Lang = A.Lang,
    isString = Lang.isString,

    RIGHT = 'right',
    SYNC_UI = 'syncUI',
    CLASS_NAME = 'className',
    ICON_ALIGN = 'iconAlign',
    BOUNDING_BOX = 'boundingBox',
    ICON = 'icon',
    LEFT = 'left',
    WIDGET_CONSTRUCTOR = 'widgetConstructor',
    GROUP = 'group',
    I = 'i',
    TOGGLEBTN = 'togglebtn',
    LABEL = 'label',
    DISABLED = 'disabled',
    BTNGROUP = 'btngroup',
    ACTIVE = 'active',
    ICON_ELEMENT = 'iconElement',
    BTN = 'btn',

    getClassName = A.getClassName,

    CLASS_NAMES = {
        BUTTON: getClassName(BTN),
        BUTTON_GROUP: getClassName(BTN, GROUP),
        DISABLED: getClassName(DISABLED),
        LABEL: getClassName(LABEL),
        SELECTED: getClassName(ACTIVE),
        TOGGLE: getClassName(TOGGLEBTN)
    };

var ButtonExt = function() {
};

ButtonExt.ATTRS = {
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
            iconChange: instance._afterIconChange,
            iconAlignChange: instance._afterIconAlignChange
        });
    },

    syncButtonExtUI: function() {
        var instance = this;

        instance._uiSetIcon(instance.get(ICON));
    },

    _afterIconChange: function(event) {
        var instance = this;

        instance._uiSetIcon(event.newVal);
    },

    _afterIconAlignChange: function(event) {
        var instance = this;

        instance._uiSetIconAlign(event.newVal);
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