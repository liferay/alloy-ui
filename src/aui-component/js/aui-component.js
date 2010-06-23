/**
 * The Component Utility
 *
 * @module aui-component
 */

var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'component',

	CSS_COMPONENT = getClassName(NAME),

	CSS_HELPER_HIDDEN = getClassName('helper', 'hidden'),
	CONSTRUCTOR_OBJECT = Object.prototype.constructor;

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
	 * A Component that will fire the same events as the current Component.
	 *
	 * @attribute owner
	 * @deprecated See <a href="WidgetParent.html">WidgetParent</a>.
	 * @type Widget
	 */
	owner: {
		validator: function(value) {
			var instance = this;

			return value instanceof A.Widget || value === null;
		}
	},

	/**
	 * When set to <code>true</code> the events on this Component are also
     * fired on the <a href="Component.html#config_owner">owner</a> Component.
	 *
	 * @attribute relayEvents
	 * @default true
	 * @type boolean
	 */
	relayEvents: {
		value: true
	},

	/**
	 * If <code>true</code> the render phase will be autimatically invoked
     * preventing the <code>.render()</code> manual call.
	 *
	 * @attribute render
	 * @default false
	 * @type boolean
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

			instance._setOwnerComponent(instance.get('ownerComponent'));
			instance._setRelayEvents(instance.get('relayEvents'));

			instance._setComponentClassNames();

			instance.after('cssClassChange', instance._afterCssClassChange);
			instance.after('destroy', instance._afterComponentDestroy);
			instance.after('ownerChange', instance._afterComponentOwnerChange);
			instance.after('relayEventsChange', instance._afterComponentRelayEventsChange);
			instance.after('visibleChange', instance._afterComponentVisibleChange);
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
		 */
		toggle: function() {
			var instance = this;

			return instance.set('visible', !instance.get('visible'));
		},

		/**
		 * Invoked after the destroy phase. Removes the
         * <code>boundingBox</code> from the DOM.
		 *
		 * @method _afterComponentDestroy
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterComponentDestroy: function(event) {
			var instance = this;

			try {
				instance.get('boundingBox').remove();
			}
			catch (e) {}
		},

		/**
		 * Fires after the value of the
		 * <a href="Component.html#config_owner">owner</a> attribute change.
		 *
		 * @method _afterComponentOwnerChange
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterComponentOwnerChange: function(event) {
			var instance = this;

			instance._setOwnerComponent(event.newVal);
		},

		/**
		 * Fires after the value of the
		 * <a href="Component.html#config_relayEvents">relayEvents</a> attribute change.
		 *
		 * @method _afterComponentRelayEventsChange
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterComponentRelayEventsChange: function(event) {
			var instance = this;

			instance._setRelayEvents(event.newVal);
		},

		/**
		 * Fires after the value of the
		 * <a href="Component.html#config_visible">visible</a> attribute change.
		 *
		 * @method _afterComponentVisibleChange
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterComponentVisibleChange: function(event) {
			var instance = this;

			var hideClass = instance.get('hideClass');

			if (hideClass !== false) {
				var boundingBox = instance.get('boundingBox');

				var action = 'addClass';

				if (event.newVal) {
					action = 'removeClass';
				}

				boundingBox[action](hideClass || CSS_HELPER_HIDDEN);
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
		 * Fires the events onthe
         * <a href="Component.html#config_owner">owner</a>.
		 *
		 * @method _relayEvents
		 * @protected
		 */
		_relayEvents: function() {
			var instance = this;

			Component.superclass.fire.apply(instance, arguments);

			var ownerComponent = instance._ownerComponent;

			if (ownerComponent) {
				ownerComponent.fire.apply(ownerComponent, arguments);
			}
		},

		/**
		 * Set the class names on the Component <code>contentBox</code>.
		 *
		 * @method _setComponentClassNames
		 * @protected
		 */
		_setComponentClassNames: function() {
			var instance = this;

			var classes = instance._getClasses();
			var name;
			var buffer = [];

			for (var i = classes.length - 4; i >= 0; i--) {
				name = classes[i].NAME.toLowerCase();

				buffer.push(getClassName(name, 'content'));
			}

			instance.get('contentBox').addClass(buffer.join(' '));
		},

		/**
		 * Setter for <a href="Component.html#config_relayEvents">relayEvents</a>.
		 *
		 * @method _setRelayEvents
		 * @protected
		 * @param {boolean} relayEvents
		 */
		_setRelayEvents: function(relayEvents) {
			var instance = this;

			if (relayEvents) {
				instance.fire = instance._relayEvents;
			}
			else {
				instance.fire = Component.superclass.fire;
			}
		},

		/**
		 * Setter for
         * <a href="Component.html#property__ownerComponent">_ownerComponent</a>
         * property.
		 *
		 * @method _setOwnerComponent
		 * @private
		 * @param {Widget} ownerComponent
		 */
		_setOwnerComponent: function(ownerComponent) {
			var instance = this;

			instance._ownerComponent = ownerComponent;
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

Component.create = function(config) {
	config = config || {};

	var extendsClass = config.EXTENDS || A.Component;

	var component = config.constructor;

	if (!component || component == CONSTRUCTOR_OBJECT){
		component = function(){
			component.superclass.constructor.apply(this, arguments);
		};
	}

	var configProto = config.prototype;

	if (config.UI_ATTRS) {
		configProto._BIND_UI_ATTRS = COMP_PROTO._BIND_UI_ATTRS.concat(config.UI_ATTRS);
		configProto._SYNC_UI_ATTRS = COMP_PROTO._SYNC_UI_ATTRS.concat(config.UI_ATTRS);
	}

	if (config.BIND_UI_ATTRS) {
		configProto._BIND_UI_ATTRS = COMP_PROTO._BIND_UI_ATTRS.concat(config.BIND_UI_ATTRS);
	}

	if (config.SYNC_UI_ATTRS) {
		configProto._SYNC_UI_ATTRS = COMP_PROTO._SYNC_UI_ATTRS.concat(config.SYNC_UI_ATTRS);
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

	return component;
};

A.Component = Component;