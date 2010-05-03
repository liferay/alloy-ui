/**
 * The ButtonItem Utility
 *
 * @module aui-button-item
 */

var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'buttonitem',

	ICON = 'icon',
	LABEL = 'label',
	ONLY = 'only',
	STATE = 'state',

	CSS_BUTTON = getClassName(NAME),
	CSS_BUTTON_ICON = getClassName(NAME, ICON),
	CSS_BUTTON_LABEL = getClassName(NAME, LABEL),

	CSS_BUTTON_ICON_LABEL = getClassName(NAME, ICON, LABEL),
	CSS_BUTTON_ICON_ONLY = getClassName(NAME, ICON, ONLY),
	CSS_BUTTON_LABEL_ONLY = getClassName(NAME, LABEL, ONLY),

	CSS_ICON = getClassName(ICON),

	TPL_BUTTON = '<button type="button"></button>',
	TPL_ICON = '<span class="' + [CSS_BUTTON_ICON, CSS_ICON].join(' ') + '"></span>',
	TPL_LABEL = '<span class="' + CSS_BUTTON_LABEL + '"></span>';

	/**
	 * A base class for ButtonItem, providing:
	 * <ul>
	 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
	 *    <li>An optional icon or label</li>
	 *    <li>Managed user interaction states (default, active, hover)</li>
	 *    <li>Keyboard accessible</li>
	 * </ul>
	 *
	 * Quick Example:<br/>
	 * 
	 * <pre><code>var instance = new A.ButtonItem({
	 *	icon: 'gear',
	 * label: 'Configuration'
	 * }).render();
	 * </code></pre>
	 *
	 * Check the list of <a href="ButtonItem.html#configattributes">Configuration Attributes</a> available for
	 * ButtonItem.
	 *
	 * @param config {Object} Object literal specifying widget configuration properties.
	 *
	 * @class ButtonItem
	 * @constructor
	 * @extends Component
	 * @uses WidgetChild
	 */

var ButtonItem = function(config) {
	if (Lang.isString(config)) {
		config = {
			icon: config
		};
	}

	ButtonItem.superclass.constructor.call(this, config);
};

/**
 * Static property provides a string to identify the class.
 *
 * @property ButtonItem.NAME
 * @type String
 * @static
 */

ButtonItem.NAME = NAME;

/**
 * Static property used to define the default attribute
 * configuration for the ButtonItem.
 *
 * @property ButtonItem.ATTRS
 * @type Object
 * @static
 */

ButtonItem.ATTRS = {
	/**
	 * Whether to track the active state of the button.
	 * 
	 * @attribute activeState
	 * @default false
	 * @type Boolean
	 */
	activeState: {
		value: false
	},

	/**
	 * An object map of the CSS class names to use for the different interaction states.
	 * 
	 * @attribute classNames
	 * @type Object
	 */
	classNames: {},

	/**
	 * Whether to apply the default interaction state to the button
	 * 
	 * @attribute defaultState
	 * @default true
	 * @type Boolean
	 */
	defaultState: {},

	/**
	 * An event callback to handle when a user interacts with the button.
	 * This can either be a function that will be attached on click, or 
	 * an object map that accepts the following keys:
	 * <code>{fn: // The function to execute
	 * context: // The context to execute the function in
	 * type: // The type of event to listen for (defaults to "click")
	 * }</code>
	 * 
	 * @attribute handler
	 * @default false
	 * @type Function | Object
	 */
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

	/**
	 * Whether to track the hover interaction state of the button.
	 * 
	 * @attribute hoverState
	 * @default true
	 * @type Boolean
	 */
	hoverState: {},

	/**
	 * The icon to use inside of the button. Possible values are: 
	 * 
	 * @attribute icon
	 * @type String
	 */
	icon: {
		value: ''
	},

	/**
	 * An id that can be used to identify a button.
	 * 
	 * @attribute hoverState
	 * @type Boolean
	 */
	id: {
		valueFn: function() {
			return A.guid();
		}
	},

	/**
	 * Text to use inside of the button.
	 * 
	 * @attribute label
	 * @type String
	 */
	label: {
		value: ''
	},

	/**
	 * Text to use as the title attribute of the button.
	 * 
	 * @attribute title
	 * @type String
	 */
	title: {
		setter: '_setTitle',
		value: false
	}
};

A.extend(
	ButtonItem,
	A.Component,
	{
		BOUNDING_TEMPLATE: TPL_BUTTON,
		CONTENT_TEMPLATE: null,

		/**
		 * Create the DOM structure for the ButtonItem. Lifecycle.
		 *
		 * @method renderUI
		 * @protected
		 */
		renderUI: function() {
			var instance = this;

			instance._renderStates();
		},

		/**
		 * Bind the events on the ButtonItem UI. Lifecycle.
		 *
		 * @method bindUI
		 * @protected
		 */
		bindUI: function() {
			var instance = this;

			instance.after('iconChange', instance._afterIconChange);
			instance.after('labelChange', instance._afterLabelChange);
			instance.after('titleChange', instance._afterTitleChange);
		},

		/**
		 * Sync the ButtonItem UI. Lifecycle.
		 *
		 * @method syncUI
		 * @protected
		 */
		syncUI: function() {
			var instance = this;

			var icon = instance.get('icon');
			var label = instance.get('label');
			var title = instance.get('title');

			if (icon) {
				instance._uiSetIcon(icon)
			}

			if (label) {
				instance._uiSetLabel(label);
			}

			if (title) {
				instance._uiSetTitle(title);
			}
		},

		/**
		 * Fires after the value of the
		 * <a href="ButtonItem.html#config_icon">icon</a> attribute change.
		 *
		 * @method 
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterIconChange: function(event) {
			var instance = this;

			instance._uiSetIcon(event.newVal, event.prevVal);
		},

		/**
		 * Fires after the value of the
		 * <a href="ButtonItem.html#config_label">label</a> attribute change.
		 *
		 * @method 
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterLabelChange: function(event) {
			var instance = this;

			instance._uiSetLabel(event.newVal);
		},

		/**
		 * Fires after the value of the
		 * <a href="ButtonItem.html#config_title">title</a> attribute change.
		 *
		 * @method 
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterTitleChange: function(event) {
			var instance = this;

			instance._uiSetTitle(event.newVal);
		},

		/**
		 * Get's a reference to the private icon node, or if not created,
		 * renders its and returns it.
		 *
		 * @method _getIconNode
		 * @protected
		 * @return {Node}
		 */
		_getIconNode: function() {
			var instance = this;

			return instance._iconNode || instance._renderIcon();
		},

		/**
		 * Get's a reference to the private label node, or if not created,
		 * renders its and returns it.
		 *
		 * @method _getLabelNode
		 * @protected
		 * @return {Node}
		 */
		_getLabelNode: function() {
			var instance = this;

			return instance._labelNode || instance._renderLabel();
		},

		/**
		 * Renders the underlying markup for the <a href="ButtonItem.html#config_icon">icon</a>.
		 *
		 * @method _renderIcon
		 * @protected
		 * @return {Node}
		 */
		_renderIcon: function() {
			var instance = this;

			var iconNode = A.Node.create(TPL_ICON);

			instance._iconNode = iconNode;

			instance.get('boundingBox').appendChild(iconNode);

			return iconNode;
		},

		/**
		 * Renders the underlying markup for the <a href="ButtonItem.html#config_label">label</a>.
		 *
		 * @method _renderLabel
		 * @protected
		 * @return {Node}
		 */
		_renderLabel: function() {
			var instance = this;

			var labelNode = A.Node.create(TPL_LABEL);

			instance._labelNode = labelNode;

			instance.get('boundingBox').appendChild(labelNode);

			return labelNode;
		},

		/**
		 * Retrieves the state value from either the current instance, or if defined, the
		 * parent widget.
		 *
		 * @method _getState
		 * @param {String} key The state name to retrieve
		 * @param {Object} parent The parent widget to attempt to retrieve the state from
		 * @protected
		 * @return {Object}
		 */
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

		/**
		 * Attaches state interaction management to the widget.
		 *
		 * @method _renderStates
		 * @param {EventFacade} event
		 * @protected
		 */
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

		/**
		 * Setter for the title attribute
		 *
		 * @method _setTitle
		 * @protected
		 */
		_setTitle: function(value) {
			var instance = this;

			if (value === null) {
				value = instance.get('label');
			}
			else if (value === false) {
				value = '';
			}

			return String(value);
		},

		/**
		 * Syncs the boundingBox class names to reflect whether the children only have icons or labels or both.
		 *
		 * @method _syncChildrenStates
		 * @protected
		 */
		_syncChildrenStates: function() {
			var instance = this;

			var icon = instance.get('icon');
			var label = instance.get('label');

			var hasIconAndLabel = (icon && label);
			var hasLabelOnly = (!icon && label);
			var hasIconOnly = (icon && !label);

			var boundingBox = instance.get('boundingBox');

			boundingBox.toggleClass(CSS_BUTTON_ICON_LABEL, hasIconAndLabel);
			boundingBox.toggleClass(CSS_BUTTON_ICON_ONLY, hasIconOnly);
			boundingBox.toggleClass(CSS_BUTTON_LABEL_ONLY, hasLabelOnly);
		},

		/**
		 * Updates the UI for the icon in response to the <a href="ButtonItem.html#event_iconChange">iconChange</a> event.
		 *
		 * @method _uiSetIcon
		 * @param {String} newVal The new value
		 * @param {String} prevVal The previous value
		 * @protected
		 */
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

			iconNode[action]();

			instance._syncChildrenStates();
		},

		/**
		 * Updates the UI for the label in response to the <a href="ButtonItem.html#event_labelChange">labelChange</a> event.
		 *
		 * @method _uiSetLabel
		 * @param {String} newVal The new value
		 * @protected
		 */
		_uiSetLabel: function(newVal) {
			var instance = this;

			var labelNode = instance._getLabelNode();

			var action = 'show';

			if (!newVal) {
				action = 'hide';
			}

			labelNode.text(newVal);

			labelNode[action]();

			instance._syncChildrenStates();
		},

		/**
		 * Updates the UI for the title in response to the <a href="ButtonItem.html#event_titleChange">titleChange</a> event.
		 *
		 * @method _uiSetTitle
		 * @param {String} newVal The new value
		 * @protected
		 */
		_uiSetTitle: function(newVal) {
			var instance = this;

			var boundingBox = instance.get('boundingBox');

			boundingBox.setAttribute('title', newVal);
		}
	}
);

A.ButtonItem = A.Base.build(NAME, ButtonItem, [A.WidgetChild], { dynamic: false });