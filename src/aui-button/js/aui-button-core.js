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

    getClassName = A.getClassName,

    CLASS_NAMES = {
        BUTTON: getClassName('btn'),
        BUTTON_DEFAULT: getClassName('btn', 'default'),
        BUTTON_GROUP: getClassName('btn', 'group'),
        DISABLED: getClassName('disabled'),
        LABEL: getClassName('label'),
        PRIMARY: getClassName('btn', 'primary'),
        SELECTED: getClassName('active'),
        TOGGLE: getClassName('togglebtn')
    };

/**
 * A base class for `ButtonExt`.
 *
 * @class A.ButtonExt
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
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
 * @type {Object}
 * @static
 */
ButtonExt.ATTRS = {

    /**
     * CSS class to be automatically added to the `boundingBox`.
     *
     * @attribute cssClass
     * @type String
     */
    cssClass: {
        validator: isString,
        value: CLASS_NAMES.BUTTON_DEFAULT
    },

    /**
     * Defines the HTML type attribute of element e.g. `<input type="button">`.
     *
     * @attribute domType
     * @type {String}
     * @writeOnce
     */
    domType: {
        writeOnce: true,
        validator: function(val) {
            return val.toLowerCase() === 'button' || val.toLowerCase() === 'submit';
        }
    },

    /**
     * Contains a CSS class of the icon to use. A list of icons can be found
     * [here](http://liferay.github.io/alloy-bootstrap/base-css.html#icons).
     *
     * @attribute icon
     * @type {String}
     */
    icon: {},

    /**
     * Defines markup template for icon, passed in as a node e.g.
     * `Y.Node.create('<span></span>')`.
     *
     * @attribute iconElement
     * @default 'A.Node.create("<span></span>")'
     */
    iconElement: {
        valueFn: function() {
            var instance = this;
            return A.Node.create(instance.ICON_TEMPLATE);
        }
    },

    /**
     * Sets position of icon.
     *
     * @attribute iconAlign
     * @default 'left'
     * @type {String}
     */
    iconAlign: {
        validator: isString,
        value: 'left'
    }
};

/**
 * Defines how attribute values are to be parsed from markup contained in
 * `ButtonExt`.
 *
 * @property HTML_PARSER
 * @type {Object}
 * @static
 */
ButtonExt.HTML_PARSER = {
    iconElement: 'span'
};

/**
 * Updates the HTML markup specified as the `template` argument with the
 * passed `type`.
 *
 * @method getTypedButtonTemplate
 * @param {String} template
 * @param {String} type
 * @return {String} The parsed template containing the DOM `type`, e.g.
 *     `<button {type} />` generates `<button type="button" />`.
 * @static
 */
ButtonExt.getTypedButtonTemplate = function(template, type) {
    return Lang.sub(template, {
        type: type ? ' type="' + type + '"' : ''
    });
};

ButtonExt.prototype = {
    TEMPLATE: '<button{type}></button>',
    ICON_TEMPLATE: '<span></span>',

    /**
     * Construction logic executed during `ButtonExt` instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.after(instance.syncButtonExtUI, instance, 'syncUI');
        instance.after({
            iconChange: instance._afterIconChange,
            iconAlignChange: instance._afterIconAlignChange
        });
    },

    /**
     * Updates icon CSS class.
     *
     * @method syncButtonExtUI
     */
    syncButtonExtUI: function() {
        var instance = this;

        instance._uiSetIcon(instance.get('icon'));

        instance._setButtonRole();
    },

    /**
     * Fires after `icon` attribute change.
     *
     * @method _afterIconChange
     * @param {EventFacade} event
     * @protected
     */
    _afterIconChange: function(event) {
        var instance = this;

        instance._uiSetIcon(event.newVal);
    },

    /**
     * Fires after `iconAlign` attribute change.
     *
     * @method _afterIconAlignChange
     * @param {EventFacade} event
     * @protected
     */
    _afterIconAlignChange: function(event) {
        var instance = this;

        instance._uiSetIconAlign(event.newVal);
    },

    /**
     * Sets the role attribute on the bounding box to 'button';
     *
     * @method setButtonRole
     */
    _setButtonRole: function() {
        var instance = this;
        var boundingBox = instance.get('boundingBox');

        boundingBox.setAttribute('role', 'button');
    },

    /**
     * Sets button type on bounding box template before constructor is invoked.
     * The type is set before widget creates the bounding box node.
     *
     * @method _setEarlyButtonDomType
     * @param {String} type
     * @protected
     */
    _setEarlyButtonDomType: function(type) {
        var instance = this;

        instance.BOUNDING_TEMPLATE = A.ButtonExt.getTypedButtonTemplate(
            ButtonExt.prototype.TEMPLATE, type);
    },

    /**
     * Adds class name for button icon.
     *
     * @method _uiSetIcon
     * @param {String} val
     * @protected
     */
    _uiSetIcon: function(val) {
        var instance = this;

        if (!val) {
            return;
        }
        var iconElement = instance.get('iconElement');
        iconElement.set('className', val);
        instance._uiSetIconAlign(instance.get('iconAlign'));
    },

    /**
     * Adds alignment for button icon.
     *
     * @method _uiSetIconAlign
     * @param {String} val
     * @protected
     */
    _uiSetIconAlign: function(val) {
        // Y.Button labelHTML feature assumes any HTML inside the button is the
        // label and the icon HTML is contained on its value. To workaround this
        // issue on icon alignment fetchs the reference from DOM, if not
        // available uses the one created by HTML_PARSER
        var iconElement = this.getNode().one(A.ButtonExt.HTML_PARSER.iconElement);
        if (!iconElement) {
            iconElement = this.get('iconElement');
        }

        A.Button.syncIconUI(this.get('boundingBox'), iconElement, val);
    }
};

A.ButtonExt = ButtonExt;

/**
 * A base class for ButtonCore.
 *
 * @class A.ButtonCore
 * @constructor
 */

/**
 * Contains CSS class names to use for `ButtonCore`.
 *
 * @property CLASS_NAMES
 * @static
 */
A.ButtonCore.CLASS_NAMES = CLASS_NAMES;

var Button = A.Button;

Button.NAME = 'btn';

Button.CSS_PREFIX = CLASS_NAMES.BUTTON;

Button.CLASS_NAMES = CLASS_NAMES;

/**
 * A base class for Button.
 *
 * @class A.Button
 * @extends Button
 * @uses A.ButtonExt, A.WidgetCssClass, A.WidgetToggle
 * @constructor
 * @include http://alloyui.com/examples/button/basic-markup.html
 * @include http://alloyui.com/examples/button/basic.js
 */
A.Button = A.Base.create(Button.NAME, Button, [ButtonExt, A.WidgetCssClass, A.WidgetToggle], {}, {

    /**
     * Returns an object literal containing widget constructor data specified in
     * the node.
     *
     * @method getWidgetLazyConstructorFromNodeData
     * @param {Node} node
     * @return {Object} The configuration object for the widget.
     */
    getWidgetLazyConstructorFromNodeData: function(node) {
        var config = node.getData('widgetConstructor') || {};

        config.boundingBox = node;
        config.render = true;
        return config;
    },

    /**
     * Returns a boolean, true if node has widget constructor data.
     *
     * @method hasWidgetLazyConstructorData
     * @param {Node} node
     * @return {Boolean} Whether the node has a cached widget constructor data.
     */
    hasWidgetLazyConstructorData: function(node) {
        return node.getData('widgetConstructor') !== undefined;
    },

    /**
     * Updates node's widget constructor data attribute with config.
     *
     * @method setWidgetLazyConstructorNodeData
     * @param {Node} node
     * @param {Object} config
     */
    setWidgetLazyConstructorNodeData: function(node, config) {
        node.setData('widgetConstructor', config);
    },

    /**
     * Updates icon alignment in button.
     *
     * @method syncIconUI
     * @param {Node} buttonElement The button element.
     * @param {Node} iconElement The icon element to be aligned.
     * @param {String} iconAlign The align position, e.g right or left.
     */
    syncIconUI: function(buttonElement, iconElement, iconAlign) {
        var textNode = A.config.doc.createTextNode(' '),
            insertPos = 0;

        if (iconAlign === 'right') {
            insertPos = null;
        }

        buttonElement.insert(textNode, insertPos);
        buttonElement.insert(iconElement, insertPos);
    }
});

var ToggleButton = A.ToggleButton;

ToggleButton.NAME = 'togglebtn';

ToggleButton.CSS_PREFIX = CLASS_NAMES.TOGGLE;

ToggleButton.CLASS_NAMES = CLASS_NAMES;

/**
 * A base class for ToggleButton.
 *
 * @class A.ToggleButton
 * @uses A.ButtonExt, A.WidgetCssClass
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.ToggleButton = A.Base.create(ToggleButton.NAME, ToggleButton, [ButtonExt, A.WidgetCssClass], {}, {});

var ButtonGroup = A.ButtonGroup;

ButtonGroup.NAME = 'btngroup';

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
     * Returns the `item` or `node` of specified `index`.
     *
     * @method item
     * @param {Number} index
     * @return {Button | Node} The item as `Button` or `Node` instance.
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
        var instance = this,
            boundingBox = instance.get('boundingBox'),
            type = instance.get('type');

        instance.getButtons().each(function(button) {
            if (!button.button && !A.instanceOf(A.Widget.getByNode(button), A.Button)) {
                // TODO: This shouldn't assume button is always default.
                // A.Plugin.Button doesn't current allow augmentation, therefore
                // it can't add A.ButtonExt extra attributes to it.
                button.addClass(A.ButtonCore.CLASS_NAMES.BUTTON_DEFAULT);
                button.setAttribute('role', 'option');

                if (A.Button.hasWidgetLazyConstructorData(button)) {
                    new A.Button(A.Button.getWidgetLazyConstructorFromNodeData(button));
                    A.Button.setWidgetLazyConstructorNodeData(button, null);
                }
                else {
                    button.plug(A.Plugin.Button);
                }
            }
        });

        boundingBox.setAttrs({
            'aria-multiselectable': (type === 'checkbox') ? true : false,
            role: 'listbox'
        });

        instance.syncAriaSelected(instance.getButtons());

        instance.after('selectionChange', instance._afterSelectionChange);
    },

    /**
     * Selects items by adding the active class name.
     *
     * @method select
     * @param {Array} items
     */
    select: function(items) {
        var instance = this;

        return instance.toggleSelect(items, true);
    },

    /**
     * Updates the 'aria-selected' attribute on all buttons.
     *
     * @method syncAriaSelected
     * @param {Array} buttons
     */
    syncAriaSelected: function(buttons) {
        buttons.each(function(button) {
            var selected = button.hasClass(A.ButtonGroup.CLASS_NAMES.SELECTED);

            button.setAttribute('aria-selected', selected);
        });
    },

    /**
     * Toggles selection by adding or removing the active class name.
     *
     * @method toggleSelect
     * @param {Array} items
     * @param {Boolean} forceSelection Whether selection should be forced.
     */
    toggleSelect: function(items, forceSelection) {
        var instance = this,
            type = instance.get('type'),
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

            if (type === 'checkbox') {
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
     * Selects items by adding the active class name.
     *
     * @method unselect
     * @param {Array} items
     */
    unselect: function(items) {
        var instance = this;

        return instance.toggleSelect(items, false);
    },

    /**
     * Fires after 'selectionChange' event.
     *
     * @method _afterSelectionChange
     * @param {EventFacade} event
     * @protected
     */
    _afterSelectionChange: function(event) {
        var instance = this;

        instance.syncAriaSelected(instance.getButtons());
    }
}, true);
