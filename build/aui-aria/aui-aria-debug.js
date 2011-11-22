AUI.add('aui-aria', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,

	ATTRIBUTE_VALUE_FORMAT = 'attributeValueFormat',
	ATTRIBUTES = 'attributes',
	ARIA = 'aria',
	ARIA_PREFIX = 'aria-',
	ATTRIBUTE_NODE = 'attributeNode',
	BOUNDING_BOX = 'boundingBox',
	HOST = 'host',
	ROLE = 'role',
	ROLE_NAME = 'roleName',
	ROLE_NODE = 'roleNode',
	VALIDATE_W3C = 'validateW3C',
	CHANGE_PREFIX = 'Change',

	EMPTY_STR = '',
	STR_REGEX = /([^a-z])/ig,

	EV_PROCESS_ATTRIBUTE = 'aria:processAttribute',

	_toAriaRole = A.cached(
		function(str) {
			return str.replace(STR_REGEX, function() {
				return EMPTY_STR;
			})
			.toLowerCase();
		}
	);

var Aria = A.Component.create({
	NAME: ARIA,

	NS: ARIA,

	ATTRS: {
		attributes: {
			value: {},
			validator: isObject
		},

		attributeValueFormat: {
			value: function(val) {
				return val;
			},
			validator: isFunction
		},

		attributeNode: {
			writeOnce: true,
			setter: A.one,
			valueFn: function() {
				return this.get(HOST).get(BOUNDING_BOX);
			}
		},

		roleName: {
			valueFn: function() {
				var instance = this;
				var host = instance.get(HOST);
				var roleName = _toAriaRole(host.constructor.NAME || EMPTY_STR);

				return (instance.isValidRole(roleName) ? roleName : EMPTY_STR);
			},
			validator: isString
		},

		roleNode: {
			writeOnce: true,
			setter: A.one,
			valueFn: function() {
				return this.get(HOST).get(BOUNDING_BOX);
			}
		},

		validateW3C: {
			value: true,
			validator: isBoolean
		}
	},

	EXTENDS: A.Plugin.Base,

	prototype: {
		initializer: function() {
			var instance = this;

			instance.publish(EV_PROCESS_ATTRIBUTE, {
	            defaultFn: instance._defProcessFn,
	            queuable: false,
	            emitFacade: true,
	            bubbles: true,
	            prefix: ARIA
	        });

			instance._uiSetRoleName(
				instance.get(ROLE_NAME)
			);

			instance.after('roleNameChange', instance._afterRoleNameChange);

			instance._bindHostAttributes();
		},

		isValidAttribute: function(attrName) {
			var instance = this;

			return (instance.get(VALIDATE_W3C) ? A.Plugin.Aria.W3C_ATTRIBUTES[attrName] : true);
		},

		isValidRole: function(roleName) {
			var instance = this;

			return (instance.get(VALIDATE_W3C) ? A.Plugin.Aria.W3C_ROLES[roleName] : true);
		},

		setAttribute: function(attrName, attrValue, node) {
			var instance = this;

			if (instance.isValidAttribute(attrName)) {
				(node || instance.get(ATTRIBUTE_NODE)).set(ARIA_PREFIX+attrName, attrValue);

				return true;
			}

			return false;
		},

		setAttributes: function(attributes) {
			var instance = this;

			A.Array.each(attributes, function(attribute, index, attributes) {
				instance.setAttribute(attribute.name, attribute.value, attribute.node);
			});
		},

		setRole: function(roleName, node) {
			var instance = this;

			if (instance.isValidRole(roleName)) {
				(node || instance.get(ROLE_NODE)).set(ROLE, roleName);

				return true;
			}

			return false;
		},

		setRoles: function(roles) {
			var instance = this;

			A.Array.each(roles, function(role, index, roles) {
				instance.setRole(role.name, role.node);
			});
		},

		_afterHostAttributeChange: function(event) {
			var instance = this;

			instance._handleProcessAttribute(event);
		},

		_afterRoleNameChange: function(event) {
			var instance = this;

			instance._uiSetRoleName(event.newVal);
		},

		_bindHostAttributes: function() {
			var instance = this;
			var attributes = instance.get(ATTRIBUTES);

			A.each(attributes, function(aria, attrName) {
				var ariaAttr = instance._getAriaAttribute(aria, attrName);

				instance._handleProcessAttribute({ aria: ariaAttr });

				instance.afterHostEvent(attrName+CHANGE_PREFIX, function(event) {
					event.aria = ariaAttr;
					instance._afterHostAttributeChange(event);
				});
			});
		},

		_defProcessFn: function(event) {
			var instance = this;

			instance._setAttribute(event.aria);
		},

		_getAriaAttribute: function(aria, attrName) {
			var instance = this;
			var attributeValueFormat = instance.get(ATTRIBUTE_VALUE_FORMAT);
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
					ariaName: EMPTY_STR,
					attrName: attrName,
					format: attributeValueFormat,
					node: null
				});
			}

			return prepared;
		},

		_handleProcessAttribute: function(event) {
			var instance = this;

			instance.fire(EV_PROCESS_ATTRIBUTE, { aria: event.aria });
		},

		_setAttribute: function(ariaAttr) {
			var instance = this;
			var host = instance.get(HOST);
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

		_uiSetRoleName: function(val) {
			var instance = this;

			instance.setRole(val);
		}
	}
});

A.Plugin.Aria = Aria;
/*
* W3C - The Roles Model
* http://www.w3.org/TR/wai-aria/roles
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
/*
* W3C - Supported States and Properties
* http://www.w3.org/TR/wai-aria/states_and_properties
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

}, '@VERSION@' ,{requires:['aui-base','plugin'], skinnable:false});
