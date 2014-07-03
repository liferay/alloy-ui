AUI.add('aui-dialog', function(A) {
/**
 * The Dialog Utility - The Dialog component is an extension of Panel that is
 * meant to emulate the behavior of an dialog window using a floating,
 * draggable HTML element.
 *
 * @module aui-dialog
 */

var Lang = A.Lang,
	AObject = A.Object,
	isBoolean = Lang.isBoolean,
	isArray = Lang.isArray,
	isObject = Lang.isObject,

	toInt = Lang.toInt,

	WidgetStdMod = A.WidgetStdMod,

	DOC = A.config.doc,

	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTONS = 'buttons',
	CLICK_OUTSIDE = 'clickoutside',
	CLOSE = 'close',
	CLOSETHICK = 'closethick',
	CONSTRAIN_TO_VIEWPORT = 'constrain2view',
	DATA_TABINDEX = 'data-tabindex',
	DD = 'dd',
	DESTROY_ON_CLOSE = 'destroyOnClose',
	DIALOG = 'dialog',
	DOT = '.',
	DRAG_CONFIG = 'dragConfig',
	DRAG_GUTTER = 5,
	DRAG_INSTANCE = 'dragInstance',
	DRAGGABLE = 'draggable',
	FOCUS_OUTSIDE = 'focusoutside',
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
	TAB_INDEX = 'tabIndex',
	USE_ARIA = 'useARIA',
	VIEWPORT_REGION = 'viewportRegion',
	VISIBLE = 'visible',
	WIDTH = 'width',
	Z_INDEX = 'zIndex',

	EV_RESIZE = 'resize:resize',
	EV_RESIZE_END = 'resize:end',

	getCN = A.getClassName,

	CSS_DIALOG = getCN(DIALOG),
	CSS_DIALOG_HD = getCN(DIALOG, HD),

	NODE_BLANK_TEXT = DOC.createTextNode('');

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
		A.DialogMask = new A.OverlayMask(
			{
				visible: true
			}
		).render();
	}
};

A.mix(
	Dialog,
	{
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
				validator: isArray,
				value: []
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
				validator: isBoolean,
				value: false
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
				validator: isBoolean,
				value: false
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
							handles: [DOT + CSS_DIALOG_HD],
							node: instance.get(BOUNDING_BOX)
						},
						val || {}
					);
				},
				validator: isObject,
				value: {},
				writeOnce: true
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
			 * @attribute focusOn
			 * @type array
			 *
			 * @description An array of objects corresponding to the nodes and events that will trigger a re-focus back on the widget.
			 * The implementer can supply an array of objects, with each object having the following properties:
			 * <p>eventName: (string, required): The eventName to listen to.</p>
			 * <p>node: (Y.Node, optional): The Y.Node that will fire the event (defaults to the boundingBox of the widget)</p>
			 * <p>By default, this attribute consists of two objects which will cause the widget to re-focus if anything
			 * outside the widget is clicked on or focussed upon.</p>
			 */
			focusOn: {
				validator: A.Lang.isArray,
				valueFn: function() {
					return [
						{
							// node: this.get(BOUNDING_BOX),
							eventName: CLICK_OUTSIDE
						},
						{
							//node: this.get(BOUNDING_BOX),
							eventName: FOCUS_OUTSIDE
						}
					];
				}
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
				validator: isBoolean,
				value: false
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
							after: {
								end: A.bind(instance._syncResizableDimentions, instance),
								resize: A.bind(instance._syncResizableDimentions, instance)
							},
							bubbleTargets: instance,
							constrain2view: true,
							handles: 'r,br,b',
							minHeight: 100,
							minWidth: 200,
							node: instance.get(BOUNDING_BOX),
							proxy: true
						},
						val || {}
					);
				},
				validator: isObject,
				value: {},
				writeOnce: true
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
			 * If <code>true</code> give stacking habilities to the Dialog.
			 *
			 * @attribute stack
			 * @default true
			 * @type boolean
			 */
			stack: {
				setter: function(v) {
					return this._setStack(v);
				},
				validator: isBoolean,
				value: true
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
		},

		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property Dialog.NAME
		 * @type String
		 * @static
		 */
		NAME: DIALOG
	}
);

Dialog.prototype = {
	_uiHandlesModal: null,

	/**
	 * Construction logic executed during Dialog instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function(config) {
		var instance = this;

		var buttons = instance.get(BUTTONS);
		var close = instance.get(CLOSE);
		var icons = instance.get(ICONS);

		if (buttons && buttons.length && !instance.get(FOOTER_CONTENT)) {
			instance.set(FOOTER_CONTENT, NODE_BLANK_TEXT);
		}

		if (close) {
			var closeId = A.guid();

			var closeConfig = {
				handler: {
					context: instance,
					fn: instance.close
				},
				icon: CLOSETHICK,
				id: closeId,
				title: instance.get('strings').close
			};

			if (icons) {
				icons.push(closeConfig);
			}

			instance.set(ICONS, icons);

			instance._closeId = closeId;
		}

		instance.publish(
			'close',
			{
				defaultFn: instance._close
			}
		);

		instance.addTarget(A.DialogManager);

		instance.after('constrain2viewChange', instance._afterConstrain2viewChange);
		instance.after('drag:start', instance._afterDragStart);
		instance.after('draggableChange', instance._afterDraggableChange);
		instance.after('dragInstanceChange', instance._afterDragInstanceChange);
		instance.after('render', instance._afterRenderer);
		instance.after('resizableChange', instance._afterResizableChange);
		instance.after('resizableInstanceChange', instance._afterResizableInstanceChange);
	},

	/**
	 * Bind the events on the Dialog UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		var instance = this;

		if (instance.get(MODAL)) {
			instance.after('focusOnChange', instance._afterFocusOnChange());
		}

		instance._bindLazyComponents();
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
			instance.plug(
				A.Plugin.Aria,
				{
					attributes: {
						visible: {
							ariaName: 'hidden',
							format: function(value) {
								return !value;
							}
						}
					}
				}
			);
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

		A.Event.purgeElement(instance.get(BOUNDING_BOX), true);

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

		var viewportLeft = viewportRegion.left + toInt(offsetLeft);
		var viewportTop = viewportRegion.top + toInt(offsetTop);

		instance.move([viewportLeft, viewportTop]);
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

		var prevVal = event.prevVal;

		if (prevVal) {
			prevVal.destroy();
		}
	},

	/**
	 * Handles the drag start event
	 * If "constrain2view" property is set to false this function will constrain the dialog to a region
	 * in order to prevent moving it to unreachable position
	 *
	 * @method _afterDragStart
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterDragStart: function(event) {
		var instance = this;

		var constrain2view = instance.get(CONSTRAIN_TO_VIEWPORT);

		if (!constrain2view) {
			var dragInstance = instance.get(DRAG_INSTANCE);

			var dragNode = dragInstance.get('dragNode');

			var dragNodeRegion = dragNode.get('region');
			var viewportRegion = dragNode.get('viewportRegion');

			var defaultOffset = [0, 0];

			var deltaXY = dragInstance.deltaXY || defaultOffset;
			var mouseXY = dragInstance.mouseXY || defaultOffset;

			dragInstance.plug(
				A.Plugin.DDConstrained,
				{
					constrain: {
						bottom: viewportRegion.bottom + (dragNodeRegion.height - deltaXY[1]) - DRAG_GUTTER,
						left: viewportRegion.left - deltaXY[0] + DRAG_GUTTER,
						right: viewportRegion.right + (dragNodeRegion.right - mouseXY[0]) + DRAG_GUTTER,
						top: viewportRegion.top - deltaXY[1] + DRAG_GUTTER
					}
				}
			);
		}
	},

	/**
	 * Default function called when focusOn Attribute is changed. Remove existing listeners and create new listeners.
	 *
	 * @method _afterFocusOnChange
	 */
	_afterFocusOnChange : function(event) {
		var instance = this;

		instance._detachUIHandlesModal();

		if (instance.get(VISIBLE)) {
			instance._attachUIHandlesModal();
		}
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

		var prevVal = event.prevVal;

		if (prevVal) {
			prevVal.destroy();
		}
	},

	/**
	 * Attaches UI Listeners for "clickoutside" and "focusoutside" on the widget. When these events occur, and the widget is modal, focus is shifted back onto the widget.
	 *
	 * @method _attachUIHandlesModal
	 */
	_attachUIHandlesModal: function() {
		var instance = this;

		var boundingBox = instance.get(BOUNDING_BOX);
		var focusOn = instance.get('focusOn');
		var maskNode = instance.get('maskNode');

		var focus = A.bind(instance._focus, instance);

		var uiHandles = [];

		for (var i = 0; i < focusOn.length; i++) {
			var ev = focusOn[i].eventName;
			var keyCode = focusOn[i].keyCode;
			var node = focusOn[i].node;

			//no keycode or node defined
			if (!node && !keyCode && ev) {
				uiHandles.push(boundingBox.on(ev, focus));
			}

			//node defined, no keycode (not a keypress)
			else if (node && !keyCode && ev) {
				uiHandles.push(node.on(ev, focus));
			}

			//node defined, keycode defined, event defined (its a key press)
			else if (node && keyCode && ev) {
				uiHandles.push(node.on(ev, focus, keyCode));
			}

			else {
				A.log('focusOn ATTR Error: The event with name "' + ev + '" could not be attached.');
			}
		}

		instance._uiHandlesModal = uiHandles;
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
	},

	/**
	 * Detaches all UI Listeners that were set in _attachUIHandlesModal from the widget.
	 *
	 * @method _detachUIHandlesModal
	 */
	_detachUIHandlesModal: function() {
		var instance = this;

		A.each(
			instance._uiHandlesModal,
			function(h) {
				h.detach();
			}
		);

		instance._uiHandlesModal = null;
	},

	/**
	 * Provides mouse and tab focus to the widget's bounding box.
	 *
	 * @method _focus
	 */
	_focus: function(event) {
		var instance = this;

		var boundingBox = instance.get(BOUNDING_BOX);

		var oldTI = boundingBox.get('tabIndex');

		boundingBox.set('tabIndex', oldTI >= 0 ? oldTI : 0);

		instance.focus();
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

		var icons = instance.icons;

		if (!instance.get(USE_ARIA)) {
			return;
		}

		instance.aria.setRole('dialog', instance.get(BOUNDING_BOX));

		if (icons) {
			var closeThick = icons.item(instance._closeId) || null;

			if (closeThick) {
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

		var info = event.info;
		var type = event.type;

		if ((type === EV_RESIZE_END) ||
			((type === EV_RESIZE) && !event.currentTarget.get(PROXY))) {
				instance.set(HEIGHT, info.offsetHeight);
				instance.set(WIDTH, info.offsetWidth);
		}
	},

	/**
	 * Set A.Plugin.DDConstrained constrain2view property to false or true
	 * depending on the value of constrain2view attribute.
	 *
	 * @param {A.DD.Drag} dragInstance
	 * @protected
	 */
	_updateDDConstrain2view: function(dragInstance) {
		var instance = this;

		dragInstance.plug(
			A.Plugin.DDConstrained,
			{
				constrain2view: instance.get(CONSTRAIN_TO_VIEWPORT)
			}
		);
	}
};

A.Dialog = A.Component.create(
	{
		AUGMENTS: [Dialog, A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain],
		EXTENDS: A.Panel,
		NAME: DIALOG
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

var DialogManager = new A.OverlayManager(
	{
		zIndexBase: 1000
	}
);

var MODALS = {};

DialogManager._MODALS = MODALS;

DialogManager.after(
	['dialog:destroy', 'dialog:modalChange', 'dialog:render', 'dialog:visibleChange'],
	function(event) {
		var dialog = event.target;

		if (dialog) {
			var id = dialog.get('id');

			if (event.type !== 'dialog:destroy' && dialog.get('visible') && dialog.get('modal')) {
				MODALS[id] = true;

				A.DialogMask.show();

				DialogManager._blockIFrameFocus();
			}
			else {
				delete MODALS[id];

				if (AObject.isEmpty(MODALS)) {
					A.DialogMask.hide();

					DialogManager._unblockIFrameFocus();
				}
			}
		}
	}
);

A.mix(
	DialogManager,
	{
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
			return DialogManager.findByChild(child).close();
		},

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
			var dialog = DialogManager.findByChild(child);

			if (dialog && dialog.io) {
				dialog.io.start();
			}
		},

		/**
		 * Blocks iframes on the page from getting focused by setting their
		 * tabIndex attribute to -1. The previous value of tabIndex is saved
		 * so it can be restored later.
		 *
		 * @method _blockIFrameFocus
		 * @protected
		 */
		_blockIFrameFocus: function() {
			A.all('iframe').each(
				function() {
					if (this.ancestor(DOT + CSS_DIALOG) === null) {
						if (!this.hasAttribute(DATA_TABINDEX)) {
							this.setAttribute(DATA_TABINDEX, this.get(TAB_INDEX));
						}

						this.set(TAB_INDEX, -1);
					}
				}
			);
		},

		/**
		 * Unblocks focus for the iframes on the page by restoring their original
		 * tabIndex attributes (see the _blockIFrameFocus method).
		 *
		 * @method _unblockIFrameFocus
		 * @protected
		 */
		_unblockIFrameFocus: function() {
			A.all('iframe').each(
				function() {
					if (this.hasAttribute(DATA_TABINDEX)) {
						this.set(TAB_INDEX, this.getAttribute(DATA_TABINDEX));
					}
				}
			);
		}
	}
);

A.DialogManager = DialogManager;

/**
 * A base class for DialogMask - Controls the <a
 * href="Dialog.html#config_modal">modal</a> attribute.
 *
 * @class DialogMask
 * @constructor
 * @extends OverlayMask
 * @static
 */

}, '@VERSION@' ,{requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true});
