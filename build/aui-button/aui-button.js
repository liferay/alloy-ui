AUI.add('aui-button', function(A) {
var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'button',

	ICON = 'icon',
	STATE = 'state',

	CSS_BUTTON = getClassName(NAME),
	CSS_BUTTON_ICON = getClassName(NAME, 'icon'),
	CSS_BUTTON_LABEL = getClassName(NAME, 'label'),

	CSS_BUTTON_ICON_LABEL = getClassName(NAME, 'icon', 'label'),

	CSS_ICON = getClassName(ICON),

	TPL_BUTTON = '<button></button>',
	TPL_ICON = '<span class="' + [CSS_BUTTON_ICON, CSS_ICON].join(' ') + '"></span>',
	TPL_LABEL = '<span class="' + CSS_BUTTON_LABEL + '"></span>';

var Button = function(config) {
	if (Lang.isString(config)) {
		config = {
			icon: config
		};
	}

	Button.superclass.constructor.call(this, config);
};

Button.NAME = NAME;

Button.ATTRS = {
	activeState: {
		value: false
	},

	classNames: {},

	defaultState: {},

	handler: {
		lazyAdd: false,
		value: null,
		setter: function(value) {
			var instance = this;

			var fn = value;
			var context = instance;
			var args = instance;
			var type = 'click';

			if (Lang.isObject(fn)) {
				var handlerConfig = fn;

				fn = handlerConfig.fn || fn;
				context = handlerConfig.context || context;
				type = handlerConfig.type || type;
			}

			if (Lang.isFunction(fn)) {
				instance.on(type, A.rbind(fn, context, args, handlerConfig.args));
			}

			return value;
		}
	},

	hoverState: {},

	icon: {
		value: ''
	},

	id: {
		valueFn: function() {
			return A.guid();
		}
	},

	label: {
		value: ''
	}
};

A.extend(
	Button,
	A.Component,
	{
		BOUNDING_TEMPLATE: TPL_BUTTON,
		CONTENT_TEMPLATE: null,
		renderUI: function() {
			var instance = this;

			instance._renderStates();
		},

		bindUI: function() {
			var instance = this;

			instance.after('iconChange', instance._afterIconChange);
			instance.after('labelChange', instance._afterLabelChange);
		},

		syncUI: function() {
			var instance = this;

			var icon = instance.get('icon');
			var label = instance.get('label');

			if (icon) {
				instance._uiSetIcon(icon)
			}

			if (label) {
				instance._uiSetLabel(label);
			}

		},

		_afterIconChange: function(event) {
			var instance = this;

			instance._uiSetIcon(event.newVal, event.prevVal);
		},

		_afterLabelChange: function(event) {
			var instance = this;

			instance._uiSetLabel(event.newVal);
		},

		_getIconNode: function() {
			var instance = this;

			return instance._iconNode || instance._renderIcon();
		},

		_getLabelNode: function() {
			var instance = this;

			return instance._labelNode || instance._renderLabel();
		},

		_renderIcon: function() {
			var instance = this;

			var iconNode = A.Node.create(TPL_ICON);

			instance._iconNode = iconNode;

			instance.get('boundingBox').appendChild(iconNode);

			return iconNode;
		},

		_renderLabel: function() {
			var instance = this;

			var labelNode = A.Node.create(TPL_LABEL);

			instance._labelNode = labelNode;

			instance.get('boundingBox').appendChild(labelNode);

			return labelNode;
		},

		_getState: function(key, parent) {
			var instance = this;

			var value = instance.get(key);

			var state = value;

			if (parent) {
				value = parent.get(key);

				if (!Lang.isUndefined(value)) {
					state = value;
				}
			}

			return state;
		},

		_renderStates: function(event) {
			var instance = this;

			var parent = instance.get('parent');

			var activeState = instance._getState('activeState', parent);
			var classNames = instance._getState('classNames', parent);
			var defaultState = instance._getState('defaultState', parent);
			var hoverState = instance._getState('hoverState', parent);

			instance.plug(
				A.StateInteractionPlugin,
				{
					activeState: activeState,
					classNames: classNames,
					defaultState: defaultState,
					hoverState: hoverState
				}
			);
		},

		_uiSetIcon: function(newVal, prevVal) {
			var instance = this;

			var iconNode = instance._getIconNode();

			var action = 'show';

			if (!newVal) {
				action = 'hide';
			}

			newVal = getClassName(ICON, newVal);

			if (prevVal) {
				prevVal = getClassName(ICON, prevVal);
			}

			iconNode.replaceClass(prevVal, newVal);

			var hasIconAndLabel = (newVal && instance.get('label'));

			iconNode[action]();

			instance.get('boundingBox').toggleClass(CSS_BUTTON_ICON_LABEL, hasIconAndLabel);
		},

		_uiSetLabel: function(newVal) {
			var instance = this;

			var labelNode = instance._getLabelNode();

			var action = 'show';

			if (!newVal) {
				action = 'hide';
			}

			labelNode.text(newVal);

			labelNode[action]();

			var hasIconAndLabel = (newVal && instance.get('icon'));

			instance.get('boundingBox').toggleClass(CSS_BUTTON_ICON_LABEL, hasIconAndLabel);
		}
	}
);

A.Button = A.Base.build(NAME, Button, [A.WidgetChild], { dynamic: false });

}, '@VERSION@' ,{requires:['aui-base','aui-state-interaction','widget-child'], skinnable:true});
