/**
 * The Modal Component
 *
 * @module aui-modal
 */

var Lang = A.Lang,
	UA = A.UA,

	StdMod = A.WidgetStdMod,

	OWNER_DOCUMENT = 'ownerDocument',

	getClassName = A.getClassName,

	_DOT = '.',
	_EMPTY = '',
	_SPACE = ' ',

	BR = 'br',
	CLICK = 'click',
	DESTROY_ON_HIDE = 'destroyOnHide',
	DRAGGABLE = 'draggable',
	DRAGGABLE_CHANGE = 'draggableChange',
	FILL_HEIGHT = 'fillHeight',
	HEIGHT = 'height',
	MODAL = 'modal',
	MOUSEMOVE = 'mousemove',
	RESIZABLE = 'resizable',
	RESIZABLE_CHANGE = 'resizableChange',
	VISIBLE_CHANGE = 'visibleChange',
	WIDTH = 'width',

	CSS_MODAL_BD = getClassName('modal-body'),
	CSS_MODAL_FT = getClassName('modal-footer'),
	CSS_MODAL_HD = getClassName('modal-header');

/**
 * A base class for Modal.
 *
 * Check the [live demo](http://alloyui.com/examples/modal/).
 *
 * @class A.Modal
 * @extends A.Widget
 * @uses A.WidgetPosition, A.WidgetStdMod, A.WidgetAutohide, A.WidgetToolbars,
 * A.WidgetModality, A.WidgetPositionAlign, A.WidgetPositionConstrain, A.WidgetStack
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.Modal = A.Base.create(MODAL, A.Widget, [
	A.WidgetCssClass,
	A.WidgetPosition,
	A.WidgetStdMod,
	A.WidgetToggle,
	A.WidgetAutohide,
	A.WidgetToolbars,
	A.WidgetModality,
	A.WidgetPositionAlign,
	A.WidgetPositionConstrain,
	A.WidgetStack
], {

	/**
	 * Construction logic executed during Modal instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function() {
		var instance = this;

		var eventHandles = [
			A.after(instance._afterFillHeight, instance, FILL_HEIGHT),
			instance.after('resize:end', A.bind(instance._syncResizeDimensions, instance)),
			instance.after(DRAGGABLE_CHANGE, instance._afterDraggableChange),
			instance.after(RESIZABLE_CHANGE, instance._afterResizableChange),
			instance.after(VISIBLE_CHANGE, instance._afterVisibleChange)
		];

		instance._applyPlugin(instance._onUserInitInteraction);

		instance._eventHandles = eventHandles;
	},

	/**
	 * Destructor lifecycle implementation for the Modal class. Lifecycle.
	 *
	 * @method destructor
	 * @protected
	 */
	destructor: function() {
		var instance = this;

		(new A.EventHandle(instance._eventHandles)).detach();

		if (instance._userInteractionHandle) {
			instance._userInteractionHandle.detach();
		}
	},

	/**
	 * Add <code>bubbleTargets</code> to config object.
	 *
	 * @method _addBubbleTargets
	 * @param config
	 * @protected
	 */
	_addBubbleTargets: function(config) {
		var instance = this;

		if (!Lang.isObject(config)) {
			config = {};
		}
		return A.mix(config, { bubbleTargets: instance });
	},

	/**
	 * Fire after <code>maxHeight</code> CSS property changes.
	 *
	 * @method _afterFillHeight
	 * @param event
	 * @protected
	 */
	_afterFillHeight: function(event) {
		var instance = this;

		instance._fillMaxHeight(instance.get(HEIGHT));
	},

	/**
	 * Fire after drag changes.
	 *
	 * @method _afterDraggableChange
	 * @param event
	 * @protected
	 */
	_afterDraggableChange: function(event) {
		var instance = this;

		if (event.newVal) {
			instance._applyPlugin(instance._plugDrag);
		} else {
			instance.unplug(A.Plugin.Drag);
		}
	},

	/**
	 * Fire after resize changes.
	 *
	 * @method _afterResizableChange
	 * @param event
	 * @protected
	 */
	_afterResizableChange: function(event) {
		var instance = this;

		if (event.newVal) {
			instance._applyPlugin(instance._plugResize);
		} else {
			instance.unplug(A.Plugin.Resize);
		}
	},

	/**
	 * Fire after visibility changes.
	 *
	 * @method _afterVisibleChange
	 * @param event
	 * @protected
	 */
	_afterVisibleChange: function(event) {
		var instance = this;

		if (!event.newVal && instance.get(DESTROY_ON_HIDE)) {
			instance.destroy();
		}
	},

	/**
	 * Applies a plugin to the modal instance.
	 *
	 * @method _applyPlugin
	 * @param pluginFn
	 * @protected
	 */
	_applyPlugin: function(pluginFn) {
		var instance = this;

		if (UA.touchEnabled) {
			pluginFn.call(instance);
		}
		else if (!instance._userInteractionHandle) {
			instance._userInteractionHandle = instance.once([CLICK, MOUSEMOVE], instance._onUserInitInteraction, instance);
		}
	},

	/**
	 * Set <code>maxHeight</code> CSS property.
	 *
	 * @method _fillMaxHeight
	 * @param height
	 * @protected
	 */
	_fillMaxHeight: function(height) {
		var instance = this,
			fillHeight = instance.get(FILL_HEIGHT),
			node = instance.getStdModNode(fillHeight, true);

		if (node) {
			node.setStyle('maxHeight', height);
		}
	},

	/**
	 * Create node using predefined templates.
	 *
	 * @method _getStdModTemplate
	 * @param section
	 * @protected
	 */
	_getStdModTemplate : function(section) {
		return A.Node.create(A.Modal.TEMPLATES[section], this._stdModNode.get(OWNER_DOCUMENT));
	},

	/**
	 * Fire before resizing to the correct dimensions.
	 *
	 * @method _beforeResizeCorrectDimensions
	 * @param event
	 * @protected
	 */
	_beforeResizeCorrectDimensions: function(event) {
		var instance = this;

		if (instance.resize.proxy) {
			return new A.Do.Prevent();
		}
	},

	/**
	 * Plug draggable/resizable if enable.
	 *
	 * @method _onUserInitInteraction
	 * @protected
	 */
	_onUserInitInteraction: function() {
		var instance = this,
			draggable = instance.get(DRAGGABLE),
			resizable = instance.get(RESIZABLE);

		instance._userInteractionHandle = null;

		if (draggable) {
			instance._plugDrag();
		}

		if (resizable) {
			instance._plugResize();
		}
	},

	/**
	 * Plug the drag Plugin
	 *
	 * @method _plugDrag
	 * @protected
	 */
	_plugDrag: function() {
		var instance = this,
			draggable = instance.get(DRAGGABLE);

		instance.plug(A.Plugin.Drag, instance._addBubbleTargets(draggable));
	},

	/**
	 * Plug the resize Plugin
	 *
	 * @method _plugResize
	 * @protected
	 */
	_plugResize: function() {
		var instance = this,
			resizable = instance.get(RESIZABLE);

		instance.plug(A.Plugin.Resize, instance._addBubbleTargets(resizable));

		A.before(instance._beforeResizeCorrectDimensions, instance.resize, '_correctDimensions', instance);
	},

	/**
	 * Sync width/height dimensions on resize.
	 *
	 * @method _syncResizeDimensions
	 * @param event
	 * @protected
	 */
	_syncResizeDimensions: function(event) {
		var instance = this,
			resize = event.info;

		instance.set(WIDTH, resize.offsetWidth);
		instance.set(HEIGHT, resize.offsetHeight);
	}
}, {

	/**
	 * Static property provides a string to identify the CSS prefix.
	 *
	 * @property Modal.CSS_PREFIX
	 * @type String
	 * @static
	 */
	CSS_PREFIX: getClassName(MODAL),

	/**
	 * Static property used to define the default attribute
	 * configuration for the Modal.
	 *
	 * @property Modal.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * Determine the content of Modal's body section.
		 *
		 * Temporary fix for widget-stdmod bug when bodyContent initializes empty.
		 * this._currFillNode is never updated if _uiSetFillHeight is not called.
		 *
		 * @attribute bodyContent
		 * @default ''
		 * @type String
		 */
		bodyContent: {
			value: _EMPTY
		},

		/**
		 * Determine if Modal should be destroyed when hidden.
		 *
		 * @attribute destroyOnHide
		 * @default false
		 * @type Boolean
		 */
		destroyOnHide: {
			validator: Lang.isBoolean,
			value: false
		},

		/**
		 * Determine if Modal should be draggable or not.
		 *
		 * @attribute draggable
		 * @type Object
		 * @writeOnce
		 */
		draggable: {
			value: {
				handles: [_DOT+CSS_MODAL_HD],
				plugins: [
					{ fn: A.Plugin.DDConstrained }
				]
			}
		},

		/**
		 * Determine if Modal should be resizable or not.
		 *
		 * @attribute resizable
		 * @type Object
		 * @writeOnce
		 */
		resizable: {
			value: {
				handles: BR
			}
		},

		/**
		 * Determine the content of Modal's header section.
		 *
		 * @attribute toolbars
		 * @type Function
		 */
		toolbars: {
			valueFn: function() {
				var instance = this;

				return {
					header: [
						{
							cssClass: 'close',
							label: "\u00D7",
							after: {
								click: function() { instance.hide(); }
							},
							render: true
						}
					]
				};
			}
		}
	},

	/**
	 * Static property provides a set of reusable templates.
	 *
	 * @property Modal.TEMPLATES
	 * @type Object
	 * @static
	 */
	TEMPLATES: {
		header: '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.HEADER] + _SPACE + CSS_MODAL_HD + '"></div>',
		body: '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.BODY] + _SPACE + CSS_MODAL_BD + '"></div>',
		footer: '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.FOOTER] + _SPACE + CSS_MODAL_FT + '"></div>'
	}
});