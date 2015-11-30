YUI.add('aui-widget-shortcut', function (A, NAME) {

/**
 * Provides support for making a adding shortcuts to a widget.
 *
 * @module aui-widget-shortcut
 */

var EVENT_SHORTCUT = 'shortcut';

/**
 * Fired when a registered shortcut is activated.
 *
 * @event shortcut
 */

/**
 * Widget extension, which can be used to add shortcut support through the
 * [Base.build](Base.html#method_build) method.
 *
 * @class A.WidgetShortcut
 * @param {Object} The user configuration object
 */
function WidgetShortcut() {}

WidgetShortcut.prototype = {
    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after('shortcutChange', this._afterShortcutChange);

        this._uiSetShortcut(this.get('shortcut'));
    },

    /**
     * Destructor implementation. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        WidgetShortcut.unregisterShortcut(this);
    },

    /**
     * Fired after the `shortcut` attribute is changed.
     *
     * @method _afterShortcutChange
     * @protected
     */
    _afterShortcutChange: function() {
        this._uiSetShortcut(this.get('shortcut'));
    },

    /**
     * Sets the `shortcut` attribute.
     *
     * @method _setShortcut
     * @param {Object} val
     * @protected
     */
    _setShortcut: function(val) {
        if (A.UA.mobile) {
            return false;
        }

        if (val) {
            if (val[A.UA.os]) {
                val = val[A.UA.os];
            }
            else if (val.defaultShortcut) {
                val = val.defaultShortcut;
            }
        }

        return val;
    },

    /*
     * Sets the `shortcut` attribute in the UI.
     *
     * @method _uiSetShortcut
     * @param {Boolean | Object} shortcut
     * @protected
     */
    _uiSetShortcut: function(shortcut) {
        if (shortcut) {
            WidgetShortcut.registerShortcut(this);
        }
        else {
            WidgetShortcut.unregisterShortcut(this);
        }
    }
};

WidgetShortcut.ATTRS = {
    /**
     * Shortcut information for this menu item. Should be an object with the
     * following keys: the text that should be used for the shortcut (using
     * the 'text' key), the list of keys that should be pressed (using the
     * 'keys' key) and flags for each key modifier (the 'altKey', 'ctrKey',
     * 'metaKey' and 'shiftKey' keys). For example:
     * {
     *      keys: ['B'],
     *      metaKey: true,
     *      text: '⌘B'
     * }
     * In case there should be different shortcuts for different operating
     * systems, the `shortcut` object should instead have a key per os with
     * the original shortcut information explainged above. The 'defaultShortcut' key
     * should be used to specify the same shortcut information for the operating
     * systems that weren't specified. An example of this usage:
     * {
     *      macintosh: {
     *          keys: ['B'],
     *          metaKey: true,
     *          text: '⌘B'
     *      },
     *      defaultShortcut: {
     *          ctrlKey: true,
     *          keys: ['B'],
     *          text: 'Ctrl + B'
     *      }
     * }
     *
     * @attribute shortcut
     * @default false
     * @type Boolean | Object
     */
    shortcut: {
        setter: '_setShortcut',
        validator: function(val) {
            return A.Lang.isBoolean(val) || A.Lang.isObject(val);
        },
        value: false
    }
};

/**
 * Starts listening for the item's shortcut.
 *
 * @method registerShortcut
 * @param {Object} item
 * @static
 */
WidgetShortcut.registerShortcut = function(item) {
    WidgetShortcut._shortcutItems.push(item);

    if (!WidgetShortcut._keypressEventHandle) {
        WidgetShortcut._keypressEventHandle = A.one(A.config.doc).after(
            'keydown',
            WidgetShortcut._afterKeypress
        );
    }
};

/**
 * Stops listening for the item's shortcut.
 *
 * @method unregisterShortcut
 * @param {Object} item
 * @static
 */
WidgetShortcut.unregisterShortcut = function(item) {
    var index = A.Array.indexOf(WidgetShortcut._shortcutItems, item);
    if (index !== -1) {
        WidgetShortcut._shortcutItems.splice(index, 1);
    }
};

/**
 * Fired after the `keypress` event.
 *
 * @method _afterKeypress
 * @param {EventFacade} event
 * @protected
 * @static
 */
WidgetShortcut._afterKeypress = function(event) {
    var pressedChar = String.fromCharCode(event.which),
        items = WidgetShortcut._shortcutItems,
        shortcut;

    for (var i = 0; i < items.length; i++) {
        shortcut = items[i].get('shortcut');

        if (shortcut &&
            A.Array.indexOf(shortcut.keys, pressedChar) !== -1 &&
            (!shortcut.altKey || shortcut.altKey && event.altKey) &&
            (!shortcut.ctrlKey || shortcut.ctrlKey && event.ctrlKey) &&
            (!shortcut.metaKey || shortcut.metaKey && event.metaKey) &&
            (!shortcut.shiftKey || shortcut.shiftKey && event.shiftKey)) {

            items[i].fire(EVENT_SHORTCUT);
            event.preventDefault();
        }
    }
};

/**
 * Static property that holds the items that will be checked for the shortcuts that
 * are pressed.
 *
 * @property _shortcutItems
 * @type Array
 * @protected
 * @static
 */
WidgetShortcut._shortcutItems = [];

A.WidgetShortcut = WidgetShortcut;


}, '3.0.1', {"requires": ["base"]});
