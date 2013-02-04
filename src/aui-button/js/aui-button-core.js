var Lang = A.Lang,
    isString = Lang.isString,

    RIGHT = 'right',
    SYNC_UI = 'syncUI',
    CLASS_NAME = 'className',
    ICON_ALIGN = 'iconAlign',
    BOUNDING_BOX = 'boundingBox',
    ICON = 'icon',
    LEFT = 'left',

    getClassName = A.getClassName,

    CLASS_NAMES = {
        BUTTON: getClassName('btn'),
        BUTTON_GROUP: getClassName('btn', 'group'),
        DISABLED: getClassName('disabled'),
        LABEL: getClassName('label'),
        SELECTED: getClassName('active'),
        TOGGLE: getClassName('togglebtn')
    };

var ButtonExt = function() {
};

ButtonExt.ATTRS = {
    icon: {
    },

    iconAlign: {
        value: LEFT,
        validator: isString
    }
};

ButtonExt.prototype = {
    ICON_TEMPLATE: '<i></i>',
    iconElement: null,

    initializer: function() {
        var instance = this;
        instance.after(instance.syncButtonExtUI, instance, SYNC_UI);
    },

    syncButtonExtUI: function() {
        var instance = this;
        instance._uiSetIcon(instance.get(ICON));
    },

    _renderIconElementIfNeeded: function() {
        var instance = this,
            iconElement = instance.iconElement;

        if (!iconElement) {
            iconElement = A.Node.create(instance.ICON_TEMPLATE);
            instance.iconElement = iconElement;
        }
        return iconElement;
    },

    _uiSetIcon: function(val) {
        var instance = this;

        if (!val) {
            return;
        }
        var iconElement = instance._renderIconElementIfNeeded();
        iconElement.set(CLASS_NAME, val);
        instance._uiSetIconAlign(instance.get(ICON_ALIGN));
    },

    _uiSetIconAlign: function(val) {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX),
            iconElement = instance._renderIconElementIfNeeded();

        if (val === LEFT) {
            boundingBox.prepend(iconElement);
        }
        else if (val === RIGHT) {
            boundingBox.append(iconElement);
        }
    }
};

// ButtonCore
A.ButtonCore.CLASS_NAMES = CLASS_NAMES;
A.ButtonCore.prototype._uiSetLabel = (function(original) {
    return function (label) {
        var instance = this,
            node = instance.getNode();

        if (label !== '' || node.one('.' + A.ButtonCore.CLASS_NAMES.LABEL)) {
            return original.apply(instance, arguments);
        }
    };
}(A.ButtonCore.prototype._uiSetLabel));

// Button
A.Button.NAME = 'btn';
A.Button.CSS_PREFIX = CLASS_NAMES.BUTTON;
A.Button.CLASS_NAMES = CLASS_NAMES;
A.Button = A.Component.create({
    NAME: A.Button.NAME,
    EXTENDS: A.Button,
    AUGMENTS: [ButtonExt],
    BIND_UI_ATTRS: ['icon', 'iconAlign'],
    prototype: {}
});

// ToggleButton
A.ToggleButton.NAME = 'togglebtn';
A.ToggleButton.CSS_PREFIX = CLASS_NAMES.TOGGLE;
A.ToggleButton.CLASS_NAMES = CLASS_NAMES;
A.ToggleButton = A.Component.create({
    NAME: A.ToggleButton.NAME,
    EXTENDS: A.ToggleButton,
    AUGMENTS: [ButtonExt],
    BIND_UI_ATTRS: ['icon', 'iconAlign'],
    prototype: {}
});

// ButtonGroup
A.ButtonGroup.NAME = 'btngroup';
A.ButtonGroup.CSS_PREFIX = CLASS_NAMES.BUTTON_GROUP;
A.ButtonGroup.CLASS_NAMES = CLASS_NAMES;
// Bootstrap button group depends on buttons to be a direct children, force one-box widget.
A.ButtonGroup.prototype.CONTENT_TEMPLATE = null;