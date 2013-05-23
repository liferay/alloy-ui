/**
 * The Component Utility
 *
 * @module aui-component
 */

var Lang = A.Lang,
	AArray = A.Array,

	concat = function(arr, arr2) {
		return (arr || []).concat(arr2 || []);
	},

	_NAME = 'component',

	_INSTANCES = {},
	_STR_BLANK = ' ',
	_CONSTRUCTOR_OBJECT = A.config.win.Object.prototype.constructor,

	ClassNameManager = A.ClassNameManager,

	_getClassName = ClassNameManager.getClassName,
	_getWidgetClassName = A.Widget.getClassName,

	getClassName = A.getClassName,

	CSS_HIDE = getClassName('hide');

/**
 * A base class for Component, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 * </ul>
 *
 * @class A.Component
 * @extends A.Widget
 * @uses A.WidgetCssClass, A.WidgetToggle
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var Component = A.Base.create(_NAME, A.Widget,
    [
        A.WidgetCssClass,
        A.WidgetToggle
    ],
	{
		initializer: function(config) {
			var instance = this;

			instance._originalConfig = config;

			instance._setRender(config);

			_INSTANCES[instance.get('id')] = instance;
		},

		/**
		 * Clone the current Component.
		 *
		 * @method clone
		 * @param {Object} config
		 * @return {Widget} Cloned instance.
		 */
		clone: function(config) {
			var instance = this;

			config = config || {};

			config.id = config.id || A.guid();

			A.mix(config, instance._originalConfig);

			return new instance.constructor(config);
		},

		/**
		 * Set the visibility on the UI.
		 *
		 * @method _uiSetVisible
		 * @param value
		 * @protected
		 */
		_uiSetVisible: function(value) {
			var instance = this;

			var superUISetVisible = Component.superclass._uiSetVisible;

			if (superUISetVisible) {
				superUISetVisible.apply(instance, arguments);
			}

			var hideClass = instance.get('hideClass');

			if (hideClass !== false) {
				var boundingBox = instance.get('boundingBox');

				boundingBox.toggleClass(hideClass || CSS_HIDE, !value);
			}
		},

		/**
		 * Applies standard class names to the boundingBox and contentBox
		 *
		 * @method _renderBoxClassNames
		 * @protected
		 */
		_renderBoxClassNames : function() {
			var instance = this;

			var boundingBoxNode = instance.get('boundingBox')._node;
			var contentBoxNode = instance.get('contentBox')._node;

			var boundingBoxNodeClassName = boundingBoxNode.className;
			var contentBoxNodeClassName = contentBoxNode.className;

			var boundingBoxBuffer = (boundingBoxNodeClassName) ? boundingBoxNodeClassName.split(_STR_BLANK) : [];
			var contentBoxBuffer = (contentBoxNodeClassName) ? contentBoxNodeClassName.split(_STR_BLANK) : [];

			var classes = instance._getClasses();

			var classLength = classes.length;

			var auiClassesLength = classLength - 4;

			var classItem;
			var classItemName;

			boundingBoxBuffer.push(_getWidgetClassName());

			for (var i = classLength - 3; i >= 0; i--) {
				classItem = classes[i];

				classItemName = String(classItem.NAME).toLowerCase();

				boundingBoxBuffer.push(classItem.CSS_PREFIX || _getClassName(classItemName));

				if (i <= auiClassesLength) {
					classItemName = classItemName;

					contentBoxBuffer.push(getClassName(classItemName, 'content'));
				}
			}

			contentBoxBuffer.push(instance.getClassName('content'));

			if (boundingBoxNode === contentBoxNode) {
				contentBoxNodeClassName = AArray.dedupe(contentBoxBuffer.concat(boundingBoxBuffer)).join(_STR_BLANK);
			}
			else {
				boundingBoxNode.className = AArray.dedupe(boundingBoxBuffer).join(_STR_BLANK);

				contentBoxNodeClassName = AArray.dedupe(contentBoxBuffer).join(_STR_BLANK);
			}

			contentBoxNode.className = contentBoxNodeClassName;
		},

		/**
		 * Renders the Component based upon a passed in interaction.
		 *
		 * @method _renderInteraction
		 * @protected
		 */
		_renderInteraction: function(event, parentNode) {
			var instance = this;

			instance.render(parentNode);

			var renderHandles = instance._renderHandles;

			for (var i = renderHandles.length - 1; i >= 0; i--) {
				var handle = renderHandles.pop();

				handle.detach();
			}
		},

		/**
		 * Set the interaction and render behavior based upon an object
		 * (intercepts the default rendering behavior).
		 *
		 * @method _setRender
		 * @protected
		 */
		_setRender: function(config) {
			var instance = this;

			var render = config && config.render;

			if (render && render.constructor === _CONSTRUCTOR_OBJECT) {
				var eventType = render.eventType || 'mousemove';
				var parentNode = render.parentNode;
				var selector = render.selector || parentNode;

				if (selector) {
					instance._renderHandles = [];

					var renderHandles = instance._renderHandles;

					if (!Lang.isArray(eventType)) {
						eventType = [eventType];
					}

					var renderInteraction = A.rbind(instance._renderInteraction, instance, parentNode);

					var interactionNode = A.one(selector);

					for (var i = eventType.length - 1; i >= 0; i--) {
						renderHandles[i] = interactionNode.once(eventType[i], renderInteraction);
					}

					delete config.render;
				}
			}
		}
	},
	{
		/**
		 * Static property used to define the default attribute
		 * configuration for the Component.
		 *
		 * @property Component.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			* Boolean indicating if use of the WAI-ARIA Roles and States should be
			* enabled for the Widget.
			*
			* @attribute useARIA
			* @default false
			* @type Boolean
			* @writeOnce
			*/
			useARIA: {
				writeOnce: true,
				value: false,
				validator: Lang.isBoolean
			},

			/**
			 * CSS class added to hide the <code>boundingBox</code> when
			 * <a href="Component.html#config_visible">visible</a> is set to
			 * <code>false</code>.
			 *
			 * @attribute hideClass
			 * @default 'aui-hide'
			 * @type String
			 */
			hideClass: {
				value: CSS_HIDE
			},

			/**
			 * If <code>true</code> the render phase will be autimatically invoked
			 * preventing the <code>.render()</code> manual call.
			 *
			 * @attribute render
			 * @default false
			 * @type Boolean | Node
			 */
			render: {
				value: false,
				writeOnce: true
			}
		}
	}
);

/**
* Static property used to define the map to store Component instances by id.
*
* @property Component._INSTANCES
* @type Object
* @static
*/
Component._INSTANCES = _INSTANCES;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @method getById
 * @param id
 */
Component.getById = function(id) {
	return _INSTANCES[id];
};

var DEFAULT_UI_ATTRS = A.Widget.prototype._UI_ATTRS;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @method _applyCssPrefix
 * @param component
 * @protected
 */
Component._applyCssPrefix = function(component) {
	if (component && component.NAME && !('CSS_PREFIX' in component)) {
		component.CSS_PREFIX = A.getClassName(String(component.NAME).toLowerCase());
	}

	return component;
};

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @method create
 * @param config
 */
Component.create = function(config) {
	config = config || {};

	var extendsClass = config.EXTENDS || A.Component;

	var component = config.constructor;

	if (!A.Object.owns(config, 'constructor')){
		component = function(){
			component.superclass.constructor.apply(this, arguments);
		};
	}

	var configProto = config.prototype;

	if (configProto) {
		if (config.UI_ATTRS || config.BIND_UI_ATTRS || config.SYNC_UI_ATTRS) {
			var BIND_UI_ATTRS = concat(config.BIND_UI_ATTRS, config.UI_ATTRS);
			var SYNC_UI_ATTRS = concat(config.SYNC_UI_ATTRS, config.UI_ATTRS);

			var extendsProto = extendsClass.prototype;
			var extendsUIAttrs = (extendsProto && extendsProto._UI_ATTRS) || DEFAULT_UI_ATTRS;

			BIND_UI_ATTRS = concat(extendsUIAttrs.BIND, BIND_UI_ATTRS);
			SYNC_UI_ATTRS = concat(extendsUIAttrs.SYNC, SYNC_UI_ATTRS);

			var configProtoUIAttrs = configProto._UI_ATTRS;

			if (!configProtoUIAttrs) {
				configProtoUIAttrs = configProto._UI_ATTRS = {};
			}

			if (BIND_UI_ATTRS.length) {
				configProtoUIAttrs.BIND = BIND_UI_ATTRS;
			}

			if (SYNC_UI_ATTRS.length) {
				configProtoUIAttrs.SYNC = SYNC_UI_ATTRS;
			}
		}
	}

	var augmentsClasses = config.AUGMENTS;

	if (augmentsClasses && !Lang.isArray(augmentsClasses)) {
		augmentsClasses = [augmentsClasses];
	}

	A.mix(component, config);

	delete component.prototype;

	A.extend(component, extendsClass, configProto);

	if (augmentsClasses) {
		component = A.Base.build(config.NAME, component, augmentsClasses, { dynamic: false });
	}

	Component._applyCssPrefix(component);

	return component;
};

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property Component.CSS_PREFIX
 * @type String
 * @static
 */
Component.CSS_PREFIX = getClassName('component');

var Base = A.Base;

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @method build
 */
Component.build = function() {
	var component = Base.build.apply(Base, arguments);

	Component._applyCssPrefix(component);

	return component;
};

A.Component = Component;