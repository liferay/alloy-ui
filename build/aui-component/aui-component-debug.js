AUI.add('aui-component', function(A) {
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

	ClassNameManager = A.ClassNameManager,

	_getClassName = ClassNameManager.getClassName,
	_getWidgetClassName = A.Widget.getClassName,

	getClassName = A.getClassName,

	NAME = 'component',

	CSS_HELPER_HIDDEN = getClassName('helper', 'hidden'),
	CONSTRUCTOR_OBJECT = A.config.win.Object.prototype.constructor,
	STR_BLANK = ' ';

/**
 * A base class for Component, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li></li>
 * </ul>
 *
 * Check the list of <a href="Component.html#configattributes">Configuration Attributes</a> available for
 * Component.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class Component
 * @constructor
 * @extends Widget
 */
var Component = function(config) {
	var instance = this;

	instance._originalConfig = config;

	instance._setRender(config);

	Component.superclass.constructor.apply(this, arguments);

	INSTANCES[instance.get('id')] = instance;
};

var INSTANCES = Component._INSTANCES = {};

/**
 * Static property provides a string to identify the class.
 *
 * @property Component.NAME
 * @type String
 * @static
 */
Component.NAME = 'component';

/**
 * Static property used to define the default attribute
 * configuration for the Component.
 *
 * @property Component.ATTRS
 * @type Object
 * @static
 */
Component.ATTRS = {
	/**
	* Boolean indicating if use of the WAI-ARIA Roles and States should be
	* enabled for the Widget.
	*
	* @attribute useARIA
	* @readOnly
	* @writeOnce
	* @default true
	* @type boolean
	*/
	useARIA: {
		writeOnce: true,
		value: false,
		validator: Lang.isBoolean
	},

	/**
	 * CSS class to be automatically added to the <code>boundingBox</code>.
	 *
	 * @attribute cssClass
	 * @default null
	 * @type String
	 */
	cssClass: {
		lazyAdd: false,
		value: null
	},

	/**
	 * css class added to hide the <code>boundingBox</code> when
	 * <a href="Component.html#config_visible">visible</a> is set to
	 * <code>false</code>.
	 *
	 * @attribute hideClass
	 * @default 'aui-helper-hidden'
	 * @type String
	 */
	hideClass: {
		value: CSS_HELPER_HIDDEN
	},

	/**
	 * If <code>true</code> the render phase will be autimatically invoked
	 * preventing the <code>.render()</code> manual call.
	 *
	 * @attribute render
	 * @default false
	 * @type boolean | Node
	 */
	render: {
		value: false,
		writeOnce: true
	}
};

A.extend(
	Component,
	A.Widget,
	{
		/**
		 * Construction logic executed during Component instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function(config) {
			var instance = this;

			if (config && config.cssClass) {
				instance._uiSetCssClass(config.cssClass);
			}

			instance.after('cssClassChange', instance._afterCssClassChange);
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
		 * Toggle the visibility of the Panel toggling the value of the
		 * <a href="Widget.html#config_visible">visible</a> attribute.
		 *
		 * @method toggle
		 * @param visible Force the visibility of the component to this state.
		 */
		toggle: function(visible) {
			var instance = this;

			if (!Lang.isBoolean(visible)) {
				visible = !instance.get('visible');
			}

			return instance.set('visible', visible);
		},

		_uiSetVisible: function(value) {
			var instance = this;

			var superUISetVisible = Component.superclass._uiSetVisible;

			if (superUISetVisible) {
				superUISetVisible.apply(instance, arguments);
			}

			var hideClass = instance.get('hideClass');

			if (hideClass !== false) {
				var boundingBox = instance.get('boundingBox');

				boundingBox.toggleClass(hideClass || CSS_HELPER_HIDDEN, !value);
			}
		},

		/**
		 * Fires after the value of the
		 * <a href="Component.html#config_cssClass">cssClass</a> attribute change.
		 *
		 * @method _afterCssClassChange
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterCssClassChange: function(event) {
			var instance = this;

			instance._uiSetCssClass(event.newVal, event.prevVal);
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

			var boundingBoxBuffer = (boundingBoxNodeClassName) ? boundingBoxNodeClassName.split(STR_BLANK) : [];
			var contentBoxBuffer = (contentBoxNodeClassName) ? contentBoxNodeClassName.split(STR_BLANK) : [];

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
				contentBoxNodeClassName = AArray.dedupe(contentBoxBuffer.concat(boundingBoxBuffer)).join(STR_BLANK);
			}
			else {
				boundingBoxNode.className = AArray.dedupe(boundingBoxBuffer).join(STR_BLANK);

				contentBoxNodeClassName = AArray.dedupe(contentBoxBuffer).join(STR_BLANK);
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

			if (render && render.constructor == CONSTRUCTOR_OBJECT) {
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
		},

		/**
		 * Applies the CSS classes to the <code>boundingBox</code> and
		 * <code>contentBox</code>.
		 *
		 * @method _uiSetCssClass
		 * @protected
		 * @param {String} newVal
		 * @param {String} prevVal
		 */
		_uiSetCssClass: function(newVal, prevVal) {
			var instance = this;

			var prevValContent = prevVal + '-content';

			var newValContent = newVal + '-content';

			var boundingBox = instance.get('boundingBox');
			var contentBox = instance.get('contentBox');

			boundingBox.replaceClass(prevVal, newVal);
			contentBox.replaceClass(prevValContent, newValContent);
		}
	}
);

Component.getById = function(id) {
	return INSTANCES[id];
};

var COMP_PROTO = Component.prototype;

var DEFAULT_UI_ATTRS = A.Widget.prototype._UI_ATTRS;

Component._applyCssPrefix = function(component) {
	if (component && component.NAME && !('CSS_PREFIX' in component)) {
		component.CSS_PREFIX = A.getClassName(String(component.NAME).toLowerCase());
	}

	return component;
};

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

Component.CSS_PREFIX = getClassName('component');

var Base = A.Base;

Component.build = function() {
	var component = Base.build.apply(Base, arguments);

	Component._applyCssPrefix(component);

	return component;
};

A.Component = Component;

}, '@VERSION@' ,{skinnable:false, requires:['aui-classnamemanager','base-build','widget']});
