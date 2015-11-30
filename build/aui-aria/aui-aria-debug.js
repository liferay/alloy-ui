YUI.add('aui-aria', function (A, NAME) {

/**
 * The Aria Component.
 *
 * @module aui-aria
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isFunction = Lang.isFunction,
    isObject = Lang.isObject,
    isString = Lang.isString,
    STR_REGEX = /([^a-z])/ig,

    _toAriaRole = A.cached(function(str) {
        return str.replace(STR_REGEX, function() {
            return '';
        }).toLowerCase();
    });

/**
 * A base class for Aria.
 *
 * @class A.Plugin.Aria
 * @extends Plugin.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var Aria = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'aria',

    /**
     * Static property provides a string to identify the namespace.
     *
     * @property NS
     * @type String
     * @static
     */
    NS: 'aria',

    /**
     * Static property used to define the default attribute configuration for
     * the `A.Aria`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The ARIA attributes collection.
         *
         * @attribute attributes
         * @default {}
         * @type Object
         */
        attributes: {
            value: {},
            validator: isObject
        },

        /**
         * The ARIA attribute value format.
         *
         * @attribute attributeValueFormat
         * @type Function
         */
        attributeValueFormat: {
            value: function(val) {
                return val;
            },
            validator: isFunction
        },

        /**
         * Node container for the ARIA attribute.
         *
         * @attribute attributeNode
         * @writeOnce
         */
        attributeNode: {
            writeOnce: true,
            setter: A.one,
            valueFn: function() {
                return this.get('host').get('boundingBox');
            }
        },

        /**
         * The ARIA role name.
         *
         * @attribute roleName
         * @type String
         */
        roleName: {
            valueFn: function() {
                var instance = this;
                var host = instance.get('host');
                var roleName = _toAriaRole(host.constructor.NAME || '');

                return (instance.isValidRole(roleName) ? roleName : '');
            },
            validator: isString
        },

        /**
         * Node container for the ARIA role.
         *
         * @attribute roleNode
         * @writeOnce
         */
        roleNode: {
            writeOnce: true,
            setter: A.one,
            valueFn: function() {
                return this.get('host').get('boundingBox');
            }
        },

        /**
         * Checks if the attribute is valid with W3C rules.
         *
         * @attribute validateW3C
         * @default true
         * @type Boolean
         */
        validateW3C: {
            value: true,
            validator: isBoolean
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Plugin.Base,

    prototype: {

        /**
         * Construction logic executed during Aria instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.publish('aria:processAttribute', {
                defaultFn: instance._defProcessFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'aria'
            });

            instance._uiSetRoleName(
                instance.get('roleName')
            );

            instance.after('roleNameChange', instance._afterRoleNameChange);

            instance._bindHostAttributes();
        },

        /**
         * Checks if the ARIA attribute is valid.
         *
         * @method isValidAttribute
         * @param attrName
         * @return {Boolean}
         */
        isValidAttribute: function(attrName) {
            var instance = this;

            return (instance.get('validateW3C') ? A.Plugin.Aria.W3C_ATTRIBUTES[attrName] : true);
        },

        /**
         * Checks if the ARIA role is valid.
         *
         * @method isValidRole
         * @param roleName
         * @return {Boolean}
         */
        isValidRole: function(roleName) {
            var instance = this;

            return (instance.get('validateW3C') ? A.Plugin.Aria.W3C_ROLES[roleName] : true);
        },

        /**
         * Set a single ARIA attribute.
         *
         * @method setAttribute
         * @param attrName
         * @param attrValue
         * @param node
         * @return {Boolean}
         */
        setAttribute: function(attrName, attrValue, node) {
            var instance = this;

            if (instance.isValidAttribute(attrName)) {
                (node || instance.get('attributeNode')).set('aria-' + attrName, attrValue);

                return true;
            }

            return false;
        },

        /**
         * Set a list of ARIA attributes.
         *
         * @method setAttributes
         * @param attributes
         */
        setAttributes: function(attributes) {
            var instance = this;

            A.Array.each(attributes, function(attribute) {
                instance.setAttribute(attribute.name, attribute.value, attribute.node);
            });
        },

        /**
         * Set a single ARIA role.
         *
         * @method setRole
         * @param roleName
         * @param node
         * @return {Boolean}
         */
        setRole: function(roleName, node) {
            var instance = this;

            if (instance.isValidRole(roleName)) {
                (node || instance.get('roleNode')).set('role', roleName);

                return true;
            }

            return false;
        },

        /**
         * Set a list of ARIA roles.
         *
         * @method setRoles
         * @param roles
         */
        setRoles: function(roles) {
            var instance = this;

            A.Array.each(roles, function(role) {
                instance.setRole(role.name, role.node);
            });
        },

        /**
         * Fires after a host attribute change.
         *
         * @method _afterHostAttributeChange
         * @param event
         * @protected
         */
        _afterHostAttributeChange: function(event) {
            var instance = this;

            instance._handleProcessAttribute(event);
        },

        /**
         * Triggers after `roleName` attribute change.
         *
         * @method _afterRoleNameChange
         * @param event
         * @protected
         */
        _afterRoleNameChange: function(event) {
            var instance = this;

            instance._uiSetRoleName(event.newVal);
        },

        /**
         * Bind the list of host attributes.
         *
         * @method _bindHostAttributes
         * @protected
         */
        _bindHostAttributes: function() {
            var instance = this;
            var attributes = instance.get('attributes');

            A.each(attributes, function(aria, attrName) {
                var ariaAttr = instance._getAriaAttribute(aria, attrName);

                instance._handleProcessAttribute({
                    aria: ariaAttr
                });

                instance.afterHostEvent(attrName + 'Change', function(event) {
                    event.aria = ariaAttr;
                    instance._afterHostAttributeChange(event);
                });
            });
        },

        /**
         * Calls the `_setAttribute` method.
         *
         * @method _defProcessFn
         * @param event
         * @protected
         */
        _defProcessFn: function(event) {
            var instance = this;

            instance._setAttribute(event.aria);
        },

        /**
         * Get the ARIA attribute.
         *
         * @method _getAriaAttribute
         * @param aria
         * @param attrName
         * @protected
         * @return {Object}
         */
        _getAriaAttribute: function(aria, attrName) {
            var instance = this;
            var attributeValueFormat = instance.get('attributeValueFormat');
            var prepared = {};

            if (isString(aria)) {
                prepared = A.merge(prepared, {
                    ariaName: aria,
                    attrName: attrName,
                    format: attributeValueFormat,
                    node: null
                });
            }
            else if (isObject(aria)) {
                prepared = A.mix(aria, {
                    ariaName: '',
                    attrName: attrName,
                    format: attributeValueFormat,
                    node: null
                });
            }

            return prepared;
        },

        /**
         * Fires ARIA process attribute event handle.
         *
         * @method _handleProcessAttribute
         * @param event
         * @protected
         */
        _handleProcessAttribute: function(event) {
            var instance = this;

            instance.fire('aria:processAttribute', {
                aria: event.aria
            });
        },

        /**
         * Set the attribute in the DOM.
         *
         * @method _setAttribute
         * @param ariaAttr
         * @protected
         */
        _setAttribute: function(ariaAttr) {
            var instance = this;
            var host = instance.get('host');
            var attrValue = host.get(ariaAttr.attrName);
            var attrNode = ariaAttr.node;

            if (isFunction(attrNode)) {
                attrNode = attrNode.apply(instance, [ariaAttr]);
            }

            instance.setAttribute(
                ariaAttr.ariaName,
                ariaAttr.format.apply(instance, [attrValue, ariaAttr]),
                attrNode
            );
        },

        /**
         * Set the `roleName` attribute on the UI.
         *
         * @method _uiSetRoleName
         * @param val
         * @protected
         */
        _uiSetRoleName: function(val) {
            var instance = this;

            instance.setRole(val);
        }
    }
});

A.Plugin.Aria = Aria;
/**
 * Static property used to define [W3C's Roles Model](http://www.w3.org/TR/wai-
 * aria/roles).
 *
 * @property W3C_ROLES
 * @type Object
 * @static
 */
A.Plugin.Aria.W3C_ROLES = {
    'alert': 1,
    'alertdialog': 1,
    'application': 1,
    'article': 1,
    'banner': 1,
    'button': 1,
    'checkbox': 1,
    'columnheader': 1,
    'combobox': 1,
    'command': 1,
    'complementary': 1,
    'composite': 1,
    'contentinfo': 1,
    'definition': 1,
    'dialog': 1,
    'directory': 1,
    'document': 1,
    'form': 1,
    'grid': 1,
    'gridcell': 1,
    'group': 1,
    'heading': 1,
    'img': 1,
    'input': 1,
    'landmark': 1,
    'link': 1,
    'list': 1,
    'listbox': 1,
    'listitem': 1,
    'log': 1,
    'main': 1,
    'marquee': 1,
    'math': 1,
    'menu': 1,
    'menubar': 1,
    'menuitem': 1,
    'menuitemcheckbox': 1,
    'menuitemradio': 1,
    'navigation': 1,
    'note': 1,
    'option': 1,
    'presentation': 1,
    'progressbar': 1,
    'radio': 1,
    'radiogroup': 1,
    'range': 1,
    'region': 1,
    'roletype': 1,
    'row': 1,
    'rowheader': 1,
    'scrollbar': 1,
    'search': 1,
    'section': 1,
    'sectionhead': 1,
    'select': 1,
    'separator': 1,
    'slider': 1,
    'spinbutton': 1,
    'status': 1,
    'structure': 1,
    'tab': 1,
    'tablist': 1,
    'tabpanel': 1,
    'textbox': 1,
    'timer': 1,
    'toolbar': 1,
    'tooltip': 1,
    'tree': 1,
    'treegrid': 1,
    'treeitem': 1,
    'widget': 1,
    'window': 1
};
/**
 * Static property used to define [W3C's Supported States and
 * Properties](http://www.w3.org/TR/wai-aria/states_and_properties).
 *
 * @property W3C_ATTRIBUTES
 * @type Object
 * @static
 */
A.Plugin.Aria.W3C_ATTRIBUTES = {
    'activedescendant': 1,
    'atomic': 1,
    'autocomplete': 1,
    'busy': 1,
    'checked': 1,
    'controls': 1,
    'describedby': 1,
    'disabled': 1,
    'dropeffect': 1,
    'expanded': 1,
    'flowto': 1,
    'grabbed': 1,
    'haspopup': 1,
    'hidden': 1,
    'invalid': 1,
    'label': 1,
    'labelledby': 1,
    'level': 1,
    'live': 1,
    'multiline': 1,
    'multiselectable': 1,
    'orientation': 1,
    'owns': 1,
    'posinset': 1,
    'pressed': 1,
    'readonly': 1,
    'relevant': 1,
    'required': 1,
    'selected': 1,
    'setsize': 1,
    'sort': 1,
    'valuemax': 1,
    'valuemin': 1,
    'valuenow': 1,
    'valuetext': 1
};


}, '3.0.1', {"requires": ["plugin", "aui-component"]});
