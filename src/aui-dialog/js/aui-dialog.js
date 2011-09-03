/**
 * The Dialog Utility - The Dialog component is an extension of Panel that is
 * meant to emulate the behavior of an dialog window using a floating,
 * draggable HTML element.
 *
 * @module aui-dialog
 */

var L = A.Lang,
	isBoolean = L.isBoolean,
	isArray = L.isArray,
	isObject = L.isObject,

	WidgetStdMod = A.WidgetStdMod,

	toNumber = function(val) {
		return parseInt(val, 10) || 0;
	},

	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTONS = 'buttons',
	CLOSE = 'close',
	CLOSETHICK = 'closethick',
	CONSTRAIN_TO_VIEWPORT = 'constrain2view',
	DD = 'dd',
	DEFAULT = 'default',
	DESTROY_ON_CLOSE = 'destroyOnClose',
	DIALOG = 'dialog',
	DOT = '.',
	DRAGGABLE = 'draggable',
	DRAG_CONFIG = 'dragConfig',
	DRAG_INSTANCE = 'dragInstance',
	FOOTER_CONTENT = 'footerContent',
	HD = 'hd',
	HEIGHT = 'height',
	ICON = 'icon',
	ICONS = 'icons',
	IO = 'io',
	LOADING = 'loading',
	MODAL = 'modal',
	PROXY = 'proxy',
	RESIZABLE = 'resizable',
	RESIZABLE_CONFIG = 'resizableConfig',
	RESIZABLE_INSTANCE = 'resizableInstance',
	STACK = 'stack',
	USE_ARIA = 'useARIA',
	VIEWPORT_REGION = 'viewportRegion',
	WIDTH = 'width',

	EV_RESIZE = 'resize:resize',
	EV_RESIZE_END = 'resize:end',

	getCN = A.getClassName,

	CSS_DIALOG = getCN(DIALOG),
	CSS_DIALOG_HD = getCN(DIALOG, HD),
	CSS_ICON_LOADING = getCN(ICON, LOADING),
	CSS_PREFIX = getCN(DD),

	NODE_BLANK_TEXT = document.createTextNode('');

/**
 * <p><img src="assets/images/aui-dialog/main.png"/></p>
 *
 * A base class for Dialog, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Emulate the behavior of an dialog window using a floating, draggable HTML element</li>
 *    <li>Interface for easily gathering information from the user without leaving the underlying page context</li>
 *    <li>Using the <a href="IOPlugin.html">IOPlugin</a>, supports the submission of form data either through an XMLHttpRequest, through a normal form submission, or through a fully script-based response</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.Dialog({
 *  bodyContent: 'Dialog body',
 *  centered: true,
 *  constrain2view: true,
 *  destroyOnClose: true,
 *  draggable: true,
 *  height: 250,
 *  resizable: false,
 *  stack: true,
 *  title: 'Dialog title',
 *  width: 500
 *  }).render();
 * </code></pre>
 *
 * Check the list of <a href="Dialog.html#configattributes">Configuration Attributes</a> available for
 * Dialog.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class Dialog
 * @constructor
 * @extends Panel
 * @uses WidgetPosition
 * @uses WidgetStack
 * @uses WidgetPositionAlign
 * @uses WidgetPositionConstrain
 */
var Dialog = function(config) {
	if (!A.DialogMask) {
		A.DialogMask = new A.OverlayMask().render();
	}
};

A.mix(
	Dialog,
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property Dialog.NAME
		 * @type String
		 * @static
		 */
		NAME: DIALOG,

		/**
		 * Static property used to define the default attribute
		 * configuration for the Dialog.
		 *
		 * @property Dialog.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * See <a href="WidgetStdMod.html#config_bodyContent">WidgetStdMod bodyContent</a>.
			 *
			 * @attribute bodyContent
			 * @default HTMLTextNode
			 * @type Node | String
			 */
			bodyContent: {
				value: NODE_BLANK_TEXT
			},

			/**
			 * <p>Array of object literals, each containing a set of properties
             * defining a button to be appended into the Dialog's footer. Each
             * button object in the buttons array can have two properties:</p>
			 *
			 * <dl>
			 *    <dt>text:</dt>
			 *    <dd>
			 *        The text that will display on the face of the button. The text can include
			 *        HTML, as long as it is compliant with HTML Button specifications.
			 *    </dd>
			 *    <dt>handler:</dt>
			 *    <dd>
			 *        A reference to a function that should fire when the button is clicked.
	         *        (In this case scope of this function is always its Dialog instance.)
			 *    </dd>
			 * </dl>
			 *
			 * @attribute buttons
			 * @default []
			 * @type Array
			 */
			buttons: {
				value: [],
				validator: isArray
			},

			/**
			 * If <code>true</code> the close icon will be displayed on the
             * Dialog header.
			 *
			 * @attribute close
			 * @default true
			 * @type boolean
			 */
			close: {
				value: true
			},

			/**
	         * Will attempt to constrain the dialog to the boundaries of the
	         * viewport region.
	         *
	         * @attribute constrain2view
	         * @type Object
	         */
			constrain2view: {
				setter: '_setConstrain2view',
				value: false,
				validator: isBoolean
			},

			/**
			 * Invoke the <a href="Dialog.html#method_destroy">destroy</a>
             * method when the dialog is closed (i.e., remove the Dialog
             * <code>boundingBox</code> from the body, purge events etc).
			 *
			 * @attribute destroyOnClose
			 * @default false
			 * @type boolean
			 */
			destroyOnClose: {
				value: false,
				validator: isBoolean
			},

			/**
			 * Boolean specifying if the Panel should be draggable.
			 *
			 * @attribute draggable
			 * @default true
			 * @type boolean
			 */
			draggable: {
				value: true
			},

			/**
			 * Drag configuration.
			 *
			 * @attribute dragConfig
			 * @type {}
			 */
			dragConfig: {
				setter: function(val) {
					var instance = this;

					return A.merge(
						{
							bubbleTargets: instance,
							node: instance.get(BOUNDING_BOX),
							handles: [ DOT + CSS_DIALOG_HD ]
						},
						val || {}
					);
				},
				writeOnce: true,
				value: {},
				validator: isObject
			},

			/**
			 * Stores the Drag instance for the <code>A.DD.Drag</code> used by
             * this Dialog.
			 *
			 * @attribute dragInstance
			 * @default null
			 * @type A.DD.Drag
			 */
			dragInstance: {
				setter: '_setDragInstance',
				value: null
			},

			/**
			 * True if the Panel should be displayed in a modal fashion,
             * automatically creating a transparent mask over the document that
             * will not be removed until the Dialog is dismissed. Uses
             * <a href="OverlayMask.html">OverlayMask</a>.
			 *
			 * @attribute modal
			 * @default false
			 * @type boolean
			 */
			modal: {
				lazyAdd: false,
				setter: '_setModal',
				validator: isBoolean,
				value: false
			},

			/**
			 * Resize configuration.
			 *
			 * @attribute resizableConfig
			 * @type {}
			 */
			resizableConfig: {
				setter: function(val) {
					var instance = this;

					return A.merge(
						{
							bubbleTargets: instance,
							handles: 'r,br,b',
							minHeight: 100,
							minWidth: 200,
							constrain2view: true,
							node: instance.get(BOUNDING_BOX),
							proxy: true,
							after: {
								end: A.bind(instance._syncResizableDimentions, instance),
								resize: A.bind(instance._syncResizableDimentions, instance)
							}
						},
						val || {}
					);
				},
				writeOnce: true,
				value: {},
				validator: isObject
			},

			/**
			 * Stores the Resize instance for the <code>A.Resize</code> used by
             * this Dialog.
			 *
			 * @attribute resizableInstance
			 * @default null
			 * @type A.DD.Drag
			 */
			resizableInstance: {
				setter: '_setResizableInstance',
				value: null
			},

			/**
			 * Boolean specifying if the Panel should be resizable.
			 *
			 * @attribute resizable
			 * @default true
			 * @type boolean
			 */
			resizable: {
				value: true
			},

			/**
			 * If <code>true</code> give stacking habilities to the Dialog.
			 *
			 * @attribute stack
			 * @default true
			 * @type boolean
			 */
			stack: {
				value: true,
				setter: function(v) {
					return this._setStack(v);
				},
				validator: isBoolean
			},

			/**
			 * @attribute strings
			 * @description Collection of strings used to label elements of the Dialog's UI.
			 * @default null
			 * @type Object
			 */
			strings: {
				value: {
					close: 'Close dialog'
				}
			}
		}
	}
);

Dialog.prototype = {
	/**
	 * Construction logic executed during Dialog instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function(config) {
		var instance = this;
		var icons = instance.get(ICONS);
		var close = instance.get(CLOSE);
		var buttons = instance.get(BUTTONS);

		if (buttons && buttons.length && !instance.get(FOOTER_CONTENT)) {
			instance.set(FOOTER_CONTENT, NODE_BLANK_TEXT);
		}

		if (close) {
			var closeConfig = {
				icon: CLOSETHICK,
				id: CLOSETHICK,
				handler: {
					fn: instance.close,
					context: instance
				},
				title: instance.get('strings').close
			};

			if (icons) {
				icons.push(closeConfig);
			}

			instance.set(ICONS, icons);
		}

		instance.publish(
			'close',
			{
				defaultFn: instance._close
			}
		);

		instance.after('constrain2viewChange', instance._afterConstrain2viewChange, instance);
		instance.after('draggableChange', instance._afterDraggableChange, instance);
		instance.after('dragInstanceChange', instance._afterDragInstanceChange, instance);
		instance.after('render', instance._afterRenderer);
		instance.after('resizableChange', instance._afterResizableChange, instance);
		instance.after('resizableInstanceChange', instance._afterResizableInstanceChange, instance);
	},

	/**
	 * Bind the events on the Dialog UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		var instance = this;

		instance._bindLazyComponents();

		instance.on('visibleChange', instance._afterSetVisible);
	},

	/**
     * Refreshes the rendered UI, based on Widget State
     *
     * @method syncUI
     * @protected
     *
     */
	syncUI: function() {
		var instance = this;

		if (instance.get(USE_ARIA)) {
			instance.plug(A.Plugin.Aria, {
				attributes: {
					visible: {
						ariaName: 'hidden',
						format: function(value) {
							return !value;
						}
					}
				}
			});
		}
	},

	/**
	 * Descructor lifecycle implementation for the Dialog class.
	 * Purges events attached to the node (and all child nodes).
	 *
	 * @method destructor
	 * @protected
	 */
	destructor: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		A.Event.purgeElement(boundingBox, true);
		A.DialogManager.remove(instance);
	},

    /**
     * Aligns the Dialog to the viewport.
     *
     * @method alignToViewport
     * @param int offsetLeft An offset number to be added to the left coordinate value.
     * @param int offsetTop An offset number to be added to the top coordinate value.
     */
	alignToViewport: function(offsetLeft, offsetTop) {
		var instance = this;
		var viewportRegion = A.getDoc().get(VIEWPORT_REGION);

		instance.move([ viewportRegion.left + toNumber(offsetLeft), viewportRegion.top + toNumber(offsetTop) ]);
	},

	/**
	 * Bind a <code>mouseenter</code> listener to the <code>boundingBox</code>
     * to invoke the
     * <a href="Dialog.html#config__initLazyComponents">_initLazyComponents</a>.
     * Performance reasons.
	 *
	 * @method _bindLazyComponents
	 * @private
	 */
	_bindLazyComponents: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.on('mouseenter', A.bind(instance._initLazyComponents, instance));
	},

	/**
	 * Fires the close event to close the Dialog.
	 *
	 * @method close
	 */
	close: function() {
		var instance = this;

		instance.fire('close');
	},

	/**
	 * Fires after the render phase. Invoke
     * <a href="Dialog.html#method__initButtons">_initButtons</a>.
	 *
	 * @method _afterRenderer
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterRenderer: function(event) {
		var instance = this;

		instance._initButtons();

		// forcing lazyAdd:true attrs call the setter
		instance.get(STACK);
		instance.get(IO);
	},

	/**
	 * Handles the close event logic.
	 *
	 * @method _handleEvent
	 * @param {EventFacade} event close event facade
	 * @protected
	 */
	_close: function() {
		var instance = this;

		if (instance.get(DESTROY_ON_CLOSE)) {
			instance.destroy();
		}
		else {
			instance.hide();
		}

		if (instance.get(MODAL)) {
			A.DialogMask.hide();
		}
	},

	/**
	 * Render the buttons on the footer of the Dialog.
	 *
	 * @method _initButtons
	 * @protected
	 */
	_initButtons: function() {
		var instance = this;

		var buttons = instance.get(BUTTONS);

		if (buttons.length) {
			var footerButtons = new A.Toolbar(
				{
					children: buttons
				}
			);

			footerButtons._DEFAULT_CONTEXT = instance;

			footerButtons.render(instance.footerNode);

			instance.fire('contentUpdate');

			instance.buttons = footerButtons;
		}
	},

	/**
	 * Forces <code>lazyAdd:true</code> attributtes invoke the setter methods.
	 *
	 * @method _initLazyComponents
	 * @private
	 */
	_initLazyComponents: function() {
		var instance = this;

		// forcing lazyAdd:true attrs call the setter
		instance.get(DRAG_INSTANCE);
		instance.get(RESIZABLE_INSTANCE);
	},

	/**
	 * Set default ARIA roles and attributes.
	 * @method _setDefaultARIAValues
	 * @protected
	 */
	_setDefaultARIAValues: function() {
		var instance = this;

		if (!instance.get(USE_ARIA)) {
			return;
		}

		instance.aria.setRole('dialog', instance.get(BOUNDING_BOX));

		if (instance.icons) {
			var closeThick = instance.icons.item(CLOSETHICK);

			if (closeThick){
				instance.aria.setAttribute('controls', instance.get('id'), closeThick.get(BOUNDING_BOX));
			}
		}
	},

	/**
	 * Setter for the <a href="Dialog.html#config_draggable">draggable</a> attribute.
	 *
	 * @method _setDragInstance
	 * @param {boolean} value
	 * @protected
	 * @return {boolean}
	 */
	_setDragInstance: function(val) {
		var instance = this;

		if (instance.get(DRAGGABLE)) {
			val = new A.DD.Drag(
				instance.get(DRAG_CONFIG)
			);

			instance._updateDDConstrain2view(val);
		}

		return val;
	},

	/**
	 * Setter for the <a href="Dialog.html#config_modal">modal</a> attribute.
	 *
	 * @method _setModal
	 * @param {boolean} value
	 * @protected
	 * @return {boolean}
	 */
	_setModal: function(value) {
		var instance = this;

		if (value) {
			A.DialogMask.show();
		}
		else {
			A.DialogMask.hide();
		}

		return value;
	},

	/**
	 * Setter for the <a href="Dialog.html#config_resizable">resizable</a> attribute.
	 *
	 * @method _setResizableInstance
	 * @param {boolean} value
	 * @protected
	 * @return {boolean}
	 */
	_setResizableInstance: function(val) {
		var instance = this;

		if (instance.get(RESIZABLE)) {
			val = new A.Resize(
				instance.get(RESIZABLE_CONFIG)
			);
		}

		return val;
	},

	/**
	 * Setter for the <a href="Dialog.html#config_stack">stack</a>
     * attribute.
	 *
	 * @method _setStack
	 * @param {boolean} value
	 * @protected
	 * @return {boolean}
	 */
	_setStack: function(value) {
		var instance = this;

		if (value) {
			A.DialogManager.register(instance);
		}
		else {
			A.DialogManager.remove(instance);
		}

		return value;
	},

	/**
	 * Sync dialog dimentions based on resizable end and resize events.
	 *
	 * @method _syncResizableDimentions
	 * @param {EventFacade} Resizable event
	 * @protected
	 */
	_syncResizableDimentions: function(event) {
		var instance = this;

		var type = event.type;
		var info = event.info;

		if ((type === EV_RESIZE_END) ||
			((type === EV_RESIZE) && !event.currentTarget.get(PROXY))) {
				instance.set(HEIGHT, info.offsetHeight);
				instance.set(WIDTH, info.offsetWidth);
		}
	},

	/**
	 * Plug and Unplug A.Plugin.DDConstrained to the dragInstance depending on
	 * the value of constrain2view attribute.
	 *
	 * @param {A.DD.Drag} dragInstance
	 * @protected
	 */
	_updateDDConstrain2view: function(dragInstance) {
		var instance = this;
		var constrain2view = instance.get(CONSTRAIN_TO_VIEWPORT);

		if (constrain2view) {
			dragInstance.plug(
				A.Plugin.DDConstrained,
				{
					constrain2view: constrain2view
				}
			);
		}
		else {
			dragInstance.unplug(A.Plugin.DDConstrained);
		}
	},

	/**
	 * Fires after the value of the
     * <a href="Overlay.html#config_constrain2view">constrain2view</a> attribute change.
	 *
	 * @method _afterConstrain2viewChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterConstrain2viewChange: function(event) {
		var instance = this;

		instance._updateDDConstrain2view(
			instance.get(DRAG_INSTANCE)
		);
	},

	/**
	 * Fires after the value of the
     * <a href="Overlay.html#config_draggable">draggable</a> attribute change.
	 *
	 * @method _afterDraggableChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterDraggableChange: function(event) {
		var instance = this;

		instance.set(DRAG_INSTANCE, null);
	},

	/**
	 * Fires after the value of the
     * <a href="Overlay.html#config_dragInstance">dragInstance</a> attribute change.
	 *
	 * @method _afterDragInstanceChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterDragInstanceChange: function(event) {
		var instance = this;

		if (event.prevVal) {
			event.prevVal.destroy();
		}
	},

	/**
	 * Fires after the value of the
	 * <a href="Overlay.html#config_resizable">resizable</a> attribute change.
	 *
	 * @method _afterResizableChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterResizableChange: function(event) {
		var instance = this;

		instance.set(RESIZABLE_INSTANCE, null);
	},

	/**
	 * Fires after the value of the
	 * <a href="Overlay.html#config_resizableInstance">resizableInstance</a> attribute change.
	 *
	 * @method _afterResizableInstanceChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterResizableInstanceChange: function(event) {
		var instance = this;

		if (event.prevVal) {
			event.prevVal.destroy();
		}
	},

	/**
	 * Fires after the value of the
     * <a href="Overlay.html#config_visible">visible</a> attribute change.
	 *
	 * @method _afterSetVisible
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterSetVisible: function(event) {
		var instance = this;

		if (instance.get(MODAL)) {
			if (event.newVal) {
				A.DialogMask.show();
			}
			else {
				A.DialogMask.hide();
			}
		}
	},

	_uiHandles: []
};

A.Dialog = A.Component.create(
	{
		NAME: DIALOG,
		EXTENDS: A.Panel,
		AUGMENTS: [Dialog, A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain]
	}
);

/**
 * A base class for DialogManager:
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class DialogManager
 * @constructor
 * @extends OverlayManager
 * @static
 */
A.DialogManager = new A.OverlayManager(
	{
		zIndexBase: 1000
	}
);

A.mix(
	A.DialogManager,
	{
		/**
		 * Find the <a href="Widget.html">Widget</a> instance based on a child
         * element.
		 *
		 * @method findByChild
		 * @for DialogManager
		 * @param {Node | String} child Child node of the Dialog.
		 * @return {Widget}
		 */
		findByChild: function(child) {
			return A.Widget.getByNode(
				A.one(child).ancestor(DOT + CSS_DIALOG, true)
			);
		},

		/**
		 * <p>Invoke the <a href="Dialog.html#method_close">close</a> method from
         * the Dialog which contains the <code>child</code> element.</p>
		 *
		 * Example:
		 *
		 * <pre><code>A.DialogManager.closeByChild('#dialogContent1');</code></pre>
		 *
		 * @method closeByChild
		 * @for DialogManager
		 * @param {Node | String} child Child node of the Dialog.
		 * @return {Dialog}
		 */
		closeByChild: function(child) {
			return A.DialogManager.findByChild(child).close();
		},

		/**
		 * <p>Invoke the <a href="IOPlugin.html#method_start">start</a> method
         * from the <a href="IOPlugin.html">IOPlugin</a> plugged on this Dialog
         * instance. If there is no IOPlugin plugged it does nothing.</p>
         *
		 * Example:
		 *
		 * <pre><code>A.DialogManager.refreshByChild('#dialogContent1');</code></pre>
		 *
		 * @method refreshByChild
		 * @for DialogManager
		 * @param {Node | String} child Child node of the Dialog.
		 */
		refreshByChild: function(child) {
			var dialog = A.DialogManager.findByChild(child);

			if (dialog && dialog.io) {
				dialog.io.start();
			}
		}
	}
);

/**
 * A base class for DialogMask - Controls the <a
 * href="Dialog.html#config_modal">modal</a> attribute.
 *
 * @class DialogMask
 * @constructor
 * @extends OverlayMask
 * @static
 */