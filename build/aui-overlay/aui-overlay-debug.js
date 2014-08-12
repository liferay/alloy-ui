AUI.add('aui-overlay-base', function(A) {
/**
 * Provides a basic Overlay widget, with Standard Module content support. The Overlay widget
 * provides Page XY positioning support, alignment and centering support along with basic
 * stackable support (z-index and shimming).
 *
 * @module aui-overlay
 * @submodule aui-overlay-base
 */

/**
 * A basic Overlay Widget, which can be positioned based on Page XY co-ordinates and is stackable (z-index support).
 * It also provides alignment and centering support and uses a standard module format for it's content, with header,
 * body and footer section support.
 *
 * @class OverlayBase
 * @constructor
 * @extends Component
 * @uses WidgetStdMod
 * @uses WidgetPosition
 * @uses WidgetStack
 * @uses WidgetPositionAlign
 * @uses WidgetPositionConstrain
 * @param {Object} object The user configuration for the instance.
 */
A.OverlayBase = A.Component.create(
	{
		NAME: 'overlay',
		ATTRS: {
			hideClass: {
				value: false
			}
		},
		AUGMENTS: [A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign, A.WidgetPositionConstrain, A.WidgetStdMod]
	}
);

}, '@VERSION@' ,{requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']});
AUI.add('aui-overlay-context', function(A) {
/**
 * The OverlayContext Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-context
 */

var L = A.Lang,
	isString = L.isString,
	isNumber = L.isNumber,
	isObject = L.isObject,
	isBoolean = L.isBoolean,

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	ALIGN = 'align',
	BL = 'bl',
	BOUNDING_BOX = 'boundingBox',
	CANCELLABLE_HIDE = 'cancellableHide',
	OVERLAY_CONTEXT = 'overlaycontext',
	CURRENT_NODE = 'currentNode',
	FOCUSED = 'focused',
	HIDE = 'hide',
	HIDE_DELAY = 'hideDelay',
	HIDE_ON = 'hideOn',
	HIDE_ON_DOCUMENT_CLICK = 'hideOnDocumentClick',
	MOUSEDOWN = 'mousedown',
	SHOW = 'show',
	SHOW_DELAY = 'showDelay',
	SHOW_ON = 'showOn',
	TL = 'tl',
	TRIGGER = 'trigger',
	USE_ARIA = 'useARIA',
	VISIBLE = 'visible';

/**
 * <p><img src="assets/images/aui-overlay-context/main.png"/></p>
 *
 * A base class for OverlayContext, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Able to display an <a href="Overlay.html">Overlay</a> at a specified corner of an element <a href="OverlayContext.html#config_trigger">trigger</a></li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.OverlayContext({
 *  boundingBox: '#OverlayBoundingBox',
 *  hideOn: 'mouseleave',
 *  showOn: 'mouseenter',
 *	trigger: '.menu-trigger'
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="OverlayContext.html#configattributes">Configuration Attributes</a> available for
 * OverlayContext.
 *
 * @class OverlayContext
 * @constructor
 * @extends OverlayBase
 * @param config {Object} Object literal specifying widget configuration properties.
 */
var OverlayContext = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property OverlayContext.NAME
		 * @type String
		 * @static
		 */
		NAME: OVERLAY_CONTEXT,

		/**
		 * Static property used to define the default attribute
		 * configuration for the OverlayContext.
		 *
		 * @property OverlayContext.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Inherited from <a href="Overlay.html#config_align">Overlay</a>.
			 *
			 * @attribute align
			 * @default { node: null, points: [ TL, BL ] }
			 * @type Object
			 */
			align: {
	            value: { node: null, points: [ TL, BL ] }
	        },

			/**
			 * Cancel auto hide delay if the user interact with the Overlay
	         * (focus, click, mouseover)
			 *
			 * @attribute cancellableHide
			 * @default true
			 * @type boolean
			 */
			cancellableHide: {
				value: true,
				validator: isBoolean
			},

			/**
			 * OverlayContext allow multiple elements to be the
	         * <a href="OverlayContext.html#config_trigger">trigger</a>, the
	         * currentNode stores the current active one.
			 *
			 * @attribute currentNode
			 * @default First item of the
	         * <a href="OverlayContext.html#config_trigger">trigger</a> NodeList.
			 * @type Node
			 */
			currentNode: {
				valueFn: function() {
					// define default currentNode as the first item from trigger
					return this.get(TRIGGER).item(0);
				}
			},

			delay: {
				value: null,
				validator: isObject
			},

			/**
			 * The event which is responsible to hide the OverlayContext.
			 *
			 * @attribute hideOn
			 * @default mouseout
			 * @type String
			 */
			hideOn: {
				lazyAdd: false,
				value: 'mouseout',
				setter: function(v) {
					return this._setHideOn(v);
				}
			},

			/**
			 * If true the instance is registered on the
	         * <a href="OverlayContextManager.html">OverlayContextManager</a> static
	         * class and will be hide when the user click on document.
			 *
			 * @attribute hideOnDocumentClick
			 * @default true
			 * @type boolean
			 */
			hideOnDocumentClick: {
				lazyAdd: false,
				setter: function(v) {
					return this._setHideOnDocumentClick(v);
				},
				value: true,
				validator: isBoolean
			},

			/**
			 * Number of milliseconds after the hide method is invoked to hide the
	         * OverlayContext.
			 *
			 * @attribute hideDelay
			 * @default 0
			 * @type Number
			 */
			hideDelay: {
				lazyAdd: false,
				setter: '_setHideDelay',
				value: 0,
				validator: isNumber
			},

			/**
			 * The event which is responsible to show the OverlayContext.
			 *
			 * @attribute showOn
			 * @default mouseover
			 * @type String
			 */
			showOn: {
				lazyAdd: false,
				value: 'mouseover',
				setter: function(v) {
					return this._setShowOn(v);
				}
			},

			/**
			 * Number of milliseconds after the show method is invoked to show the
	         * OverlayContext.
			 *
			 * @attribute showDelay
			 * @default 0
			 * @type Number
			 */
			showDelay: {
				lazyAdd: false,
				setter: '_setShowDelay',
				value: 0,
				validator: isNumber
			},

			/**
			 * Node, NodeList or Selector which will be used as trigger elements
	         * to show or hide the OverlayContext.
			 *
			 * @attribute trigger
			 * @default null
			 * @type {Node | NodeList | String}
			 */
			trigger: {
				lazyAdd: false,
				setter: function(v) {
					if (isNodeList(v)) {
						return v;
					}
					else if (isString(v)) {
						return A.all(v);
					}

					return new A.NodeList([v]);
				}
			},

			/**
			 * True if Overlay should use ARIA plugin
			 *
			 * @attribute useARIA
			 * @default true
			 * @type Boolean
			 */
			useARIA: {
				value: true
			},

			/**
			 * If true the OverlayContext is visible by default after the render phase.
	         * Inherited from <a href="Overlay.html">Overlay</a>.
			 *
			 * @attribute visible
			 * @default false
			 * @type boolean
			 */
			visible: {
				value: false
			}
		},

		EXTENDS: A.OverlayBase,

		constructor: function(config) {
			var instance = this;

			instance._showCallback = null;
			instance._hideCallback = null;

			OverlayContext.superclass.constructor.apply(this, arguments);
		},

		prototype: {
			/**
			 * Construction logic executed during OverlayContext instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			initializer: function() {
				var instance = this;

				var trigger = instance.get(TRIGGER);

				if (trigger && trigger.size()) {
					instance.set('align.node', trigger.item(0));
				}
			},

			/**
			 * Bind the events on the OverlayContext UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function(){
				var instance = this;
				var boundingBox = instance.get(BOUNDING_BOX);

				boundingBox.on(MOUSEDOWN, instance._stopTriggerEventPropagation);

				instance.before('triggerChange', instance._beforeTriggerChange);
				instance.before('showOnChange', instance._beforeShowOnChange);
				instance.before('hideOnChange', instance._beforeHideOnChange);

				instance.after('triggerChange', instance._afterTriggerChange);
				instance.after('showOnChange', instance._afterShowOnChange);
				instance.after('hideOnChange', instance._afterHideOnChange);

				boundingBox.on('click', A.bind(instance._cancelAutoHide, instance));
				boundingBox.on('mouseenter', A.bind(instance._cancelAutoHide, instance));
				boundingBox.on('mouseleave', A.bind(instance._invokeHideTaskOnInteraction, instance));
				instance.after('focusedChange', A.bind(instance._invokeHideTaskOnInteraction, instance));

				instance.on('visibleChange', instance._onVisibleChangeOverlayContext);
			},

			/**
			 * Hides the OverlayContext.
			 *
			 * @method hide
			 */
			hide: function() {
				var instance = this;

				instance.clearIntervals();

				instance.fire('hide');

				OverlayContext.superclass.hide.apply(instance, arguments);
			},

			/**
			 * Shows the OverlayContext.
			 *
			 * @method hide
			 */
			show: function(event) {
				var instance = this;

				instance.clearIntervals();

				instance.updateCurrentNode(event);

				instance.fire('show');

				OverlayContext.superclass.show.apply(instance, arguments);

				instance.refreshAlign();
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
							trigger: {
								ariaName: 'controls',
								format: function(value) {
									var id = instance.get(BOUNDING_BOX).generateID();

									return id;
								},
								node: function() {
									return instance.get(TRIGGER);
								}
							},
							visible: {
								ariaName: 'hidden',
								format: function(value) {
									return !value;
								}
							}
						},
						roleName: 'dialog'
					});
				}
			},

			/**
			 * Toggles visibility of the OverlayContext.
			 *
			 * @method toggle
			 * @param {EventFacade} event
			 */
			toggle: function(event) {
				var instance = this;

				if (instance.get(VISIBLE)) {
					instance._hideTask(event);
				}
				else {
					instance._showTask(event);
				}
			},

			/**
			 * Clear the intervals to show or hide the OverlayContext. See
		     * <a href="OverlayContext.html#config_hideDelay">hideDelay</a> and
		     * <a href="OverlayContext.html#config_showDelay">showDelay</a>.
			 *
			 * @method clearIntervals
			 */
			clearIntervals: function() {
				this._hideTask.cancel();
				this._showTask.cancel();
			},

			/**
			 * Refreshes the alignment of the OverlayContext with the
		     * <a href="OverlayContext.html#config_currentNode">currentNode</a>. See
		     * also <a href="OverlayContext.html#config_align">align</a>.
			 *
			 * @method refreshAlign
			 */
			refreshAlign: function() {
				var instance = this;
				var align = instance.get(ALIGN);
				var currentNode = instance.get(CURRENT_NODE);

				if (currentNode) {
					instance._uiSetAlign(currentNode, align.points);
				}
			},

			/**
			 * Update the
		     * <a href="OverlayContext.html#config_currentNode">currentNode</a> with the
		     * <a href="OverlayContext.html#config_align">align</a> node or the
		     * event.currentTarget and in last case with the first item of the
		     * <a href="OverlayContext.html#config_trigger">trigger</a>.
			 *
			 * @method updateCurrentNode
			 * @param {EventFacade} event
			 */
			updateCurrentNode: function(event) {
				var instance = this;
				var align = instance.get(ALIGN);
				var trigger = instance.get(TRIGGER);
				var currentTarget = null;

				if (event) {
					currentTarget = event.currentTarget;
				}

				var node = currentTarget || trigger.item(0) || align.node;

				if (node) {
					instance.set(CURRENT_NODE, node);
				}
			},

			/**
			 * Handles the logic for the
		     * <a href="OverlayContext.html#method_toggle">toggle</a>.
			 *
			 * @method _toggle
			 * @param {EventFacade} event
			 * @protected
			 */
			_toggle: function(event) {
				var instance = this;

				if (instance.get('disabled')) {
					return;
				}

				var currentTarget = event.currentTarget;

				// check if the target is different and simulate a .hide() before toggle
				if (instance._lastTarget != currentTarget) {
					instance.hide();
				}

				instance.toggle(event);

				event.stopPropagation();

				instance._lastTarget = currentTarget;
			},

			/**
			 * Fires after the <a href="OverlayContext.html#config_showOn">showOn</a>
		     * attribute change.
			 *
			 * @method _afterShowOnChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterShowOnChange: function(event) {
				var instance = this;
				var wasToggle = event.prevVal == instance.get(HIDE_ON);

				if (wasToggle) {
					var trigger = instance.get(TRIGGER);

					// if wasToggle remove the toggle callback
					trigger.detach(event.prevVal, instance._hideCallback);
					// and re attach the hide event
					instance._setHideOn( instance.get(HIDE_ON) );
				}
			},

			/**
			 * Fires after the <a href="OverlayContext.html#config_hideOn">hideOn</a>
		     * attribute change.
			 *
			 * @method _afterHideOnChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterHideOnChange: function(event) {
				var instance = this;
				var wasToggle = event.prevVal == instance.get(SHOW_ON);

				if (wasToggle) {
					var trigger = instance.get(TRIGGER);

					// if wasToggle remove the toggle callback
					trigger.detach(event.prevVal, instance._showCallback);
					// and re attach the show event
					instance._setShowOn( instance.get(SHOW_ON) );
				}
			},

			/**
			 * Fires after the <a href="OverlayContext.html#config_trigger">trigger</a>
		     * attribute change.
			 *
			 * @method _afterTriggerChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterTriggerChange: function(event) {
				var instance = this;

				instance._setShowOn( instance.get(SHOW_ON) );
				instance._setHideOn( instance.get(HIDE_ON) );
			},

			/**
			 * Fires before the <a href="OverlayContext.html#config_showOn">showOn</a>
		     * attribute change.
			 *
			 * @method _beforeShowOnChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_beforeShowOnChange: function(event) {
				var instance = this;
				var trigger = instance.get(TRIGGER);

				// detach the old callback
				trigger.detach(event.prevVal, instance._showCallback);
			},

			/**
			 * Fires before the <a href="OverlayContext.html#config_hideOn">hideOn</a>
		     * attribute change.
			 *
			 * @method _beforeHideOnChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_beforeHideOnChange: function(event) {
				var instance = this;
				var trigger = instance.get(TRIGGER);

				// detach the old callback
				trigger.detach(event.prevVal, instance._hideCallback);
			},

			/**
			 * Fires before the <a href="OverlayContext.html#config_trigger">trigger</a>
		     * attribute change.
			 *
			 * @method _beforeTriggerChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_beforeTriggerChange: function(event) {
				var instance = this;
				var trigger = instance.get(TRIGGER);
				var showOn = instance.get(SHOW_ON);
				var hideOn = instance.get(HIDE_ON);

				trigger.detach(showOn, instance._showCallback);
				trigger.detach(hideOn, instance._hideCallback);
				trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);
			},

			/**
			 * Cancel hide event if the user does some interaction with the
		     * OverlayContext (focus, click or mouseover).
			 *
			 * @method _cancelAutoHide
			 * @param {EventFacade} event
			 * @protected
			 */
			_cancelAutoHide: function(event) {
				var instance = this;

				if (instance.get(CANCELLABLE_HIDE)) {
					instance.clearIntervals();
				}

				event.stopPropagation();
			},

			/**
			 * Invoke the hide event when the OverlayContext looses the focus.
			 *
			 * @method _invokeHideTaskOnInteraction
			 * @param {EventFacade} event
			 * @protected
			 */
			_invokeHideTaskOnInteraction: function(event) {
				var instance = this;
				var cancellableHide = instance.get(CANCELLABLE_HIDE);
				var focused = instance.get(FOCUSED);

				if (!focused && !cancellableHide) {
					instance._hideTask();
				}
			},

			/**
			 * Fires when the <a href="OverlayContext.html#config_visible">visible</a>
		     * attribute changes.
			 *
			 * @method _onVisibleChangeOverlayContext
			 * @param {EventFacade} event
			 * @protected
			 */
			_onVisibleChangeOverlayContext: function(event) {
				var instance = this;

				if (event.newVal && instance.get('disabled')) {
					event.preventDefault();
				}
			},

			/**
			 * Helper method to invoke event.stopPropagation().
			 *
			 * @method _stopTriggerEventPropagation
			 * @param {EventFacade} event
			 * @protected
			 */
			_stopTriggerEventPropagation: function(event) {
				event.stopPropagation();
			},

			/**
			 * Setter for the
		     * <a href="OverlayContext.html#config_hideDelay">hideDelay</a>
		     * attribute.
			 *
			 * @method _setHideDelay
			 * @param {number} val
			 * @protected
			 * @return {number}
			 */
			_setHideDelay: function(val) {
				var instance = this;

				instance._hideTask = A.debounce(instance.hide, val, instance);

				return val;
			},

			/**
			 * Setter for the <a href="OverlayContext.html#config_hideOn">hideOn</a>
		     * attribute.
			 *
			 * @method _setHideOn
			 * @param {String} eventType Event type
			 * @protected
			 * @return {String}
			 */
			_setHideOn: function(eventType) {
				var instance = this;
				var trigger = instance.get(TRIGGER);
				var toggle = eventType == instance.get(SHOW_ON);

				if (toggle) {
					instance._hideCallback = A.bind(instance._toggle, instance);

					// only one attached event is enough for toggle
					trigger.detach(eventType, instance._showCallback);
				}
				else {
					var delay = instance.get(HIDE_DELAY);

					instance._hideCallback = function(event) {
						instance._hideTask(event);

						event.stopPropagation();
					};
				}

				trigger.on(eventType, instance._hideCallback);

				return eventType;
			},

			/**
			 * Setter for the
		     * <a href="OverlayContext.html#config_hideOnDocumentClick">hideOnDocumentClick</a>
		     * attribute.
			 *
			 * @method _setHideOn
			 * @param {boolean} value
			 * @protected
			 * @return {boolean}
			 */
			_setHideOnDocumentClick: function(value) {
				var instance = this;

				if (value) {
					A.OverlayContextManager.register(instance);
				}
				else {
					A.OverlayContextManager.remove(instance);
				}

				return value;
			},

			/**
			 * Setter for the
		     * <a href="OverlayContext.html#config_showDelay">showDelay</a>
		     * attribute.
			 *
			 * @method _setShowDelay
			 * @param {number} val
			 * @protected
			 * @return {number}
			 */
			_setShowDelay: function(val) {
				var instance = this;

				instance._showTask = A.debounce(instance.show, val, instance);

				return val;
			},

			/**
			 * Setter for the <a href="OverlayContext.html#config_showOn">showOn</a>
		     * attribute.
			 *
			 * @method _setShowOn
			 * @param {String} eventType Event type
			 * @protected
			 * @return {String}
			 */
			_setShowOn: function(eventType) {
				var instance = this;
				var trigger = instance.get(TRIGGER);
				var toggle = eventType == instance.get(HIDE_ON);

				if (toggle) {
					instance._showCallback = A.bind(instance._toggle, instance);

					// only one attached event is enough for toggle
					trigger.detach(eventType, instance._hideCallback);
				}
				else {
					var delay = instance.get(SHOW_DELAY);

					instance._showCallback = function(event) {
						instance._showTask(event);

						event.stopPropagation();
					};
				}

				if (eventType != MOUSEDOWN) {
					trigger.on(MOUSEDOWN, instance._stopTriggerEventPropagation);
				}
				else {
					trigger.detach(MOUSEDOWN, instance._stopTriggerEventPropagation);
				}

				trigger.on(eventType, instance._showCallback);

				return eventType;
			}
		}
	}
);

A.OverlayContext = OverlayContext;

/**
 * A base class for OverlayContextManager:
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class OverlayContextManager
 * @constructor
 * @extends OverlayManager
 * @static
 */
A.OverlayContextManager = new A.OverlayManager({});

A.on(MOUSEDOWN, function() { A.OverlayContextManager.hideAll(); }, A.getDoc());

}, '@VERSION@' ,{requires:['aui-overlay-manager','aui-delayed-task','aui-aria']});
AUI.add('aui-overlay-context-panel', function(A) {
/**
 * The OverlayContextPanel Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-context-panel
 */

var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,
	isObject = L.isObject,

	ALIGN = 'align',
	ANIM = 'anim',
	ARROW = 'arrow',
	BACKGROUND_COLOR = 'backgroundColor',
	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CLICK = 'click',
	CONTENT_BOX = 'contentBox',
	CONTEXTPANEL = 'overlaycontextpanel',
	DEFAULT = 'default',
	DOT = '.',
	END = 'end',
	HIDDEN = 'hidden',
	INNER = 'inner',
	OPACITY = 'opacity',
	POINTER = 'pointer',
	SHOW_ARROW = 'showArrow',
	STATE = 'state',
	STYLE = 'style',
	VISIBLE = 'visible',

	BC = 'bc',
	BL = 'bl',
	BR = 'br',
	CC = 'cc',
	LB = 'lb',
	LC = 'lc',
	LT = 'lt',
	RB = 'rb',
	RC = 'rc',
	RL = 'rl',

	getCN = A.getClassName,

	CSS_CONTEXTPANEL = getCN(CONTEXTPANEL),
	CSS_CONTEXTPANEL_ARROW = getCN(CONTEXTPANEL, ARROW, BLANK),
	CSS_CONTEXTPANEL_HIDDEN = getCN(CONTEXTPANEL, HIDDEN),
	CSS_CONTEXTPANEL_POINTER = getCN(CONTEXTPANEL, POINTER),
	CSS_CONTEXTPANEL_POINTER_INNER = getCN(CONTEXTPANEL, POINTER, INNER),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_POINTER = '<div class="' + [ CSS_STATE_DEFAULT, CSS_CONTEXTPANEL_POINTER ].join(' ') + '"></div>',
	TPL_POINTER_INNER = '<div class="' + CSS_CONTEXTPANEL_POINTER_INNER + '"></div>';

/**
 * <p><img src="assets/images/aui-overlay-context-panel/main.png"/></p>
 *
 * A base class for OverlayContextPanel, providing:
 * <ul>
 *	<li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *	<li>Customizable arrow</li>
 *	<li>Optional animation when show or hide</li>
 * </ul>
 *
 * Quick Example:<br/>
 * 
 * <pre><code>var instance = new A.OverlayContextPanel({
 *  bodyContent: 'Here s a sample OverlayContextPanel.',
 *  boundingBox: '#overlay-context-panel',
 *  trigger: '#triggerButton',
 *  cancellableHide: true,
 *  hideDelay: 200,
 *  hideOnDocumentClick: false,
 *  anim: true
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="OverlayContextPanel.html#configattributes">Configuration Attributes</a> available for
 * OverlayContextPanel.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class OverlayContextPanel
 * @constructor
 * @extends OverlayContext
 */
var OverlayContextPanel = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property OverlayContextPanel.NAME
		 * @type String
		 * @static
		 */
		NAME: CONTEXTPANEL,

		/**
		 * Static property used to define the default attribute
		 * configuration for the OverlayContextPanel.
		 *
		 * @property OverlayContextPanel.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Enable or disable the animation for hide and show. Used as the
			 * <a href="Anim.html">Anim</a> configuration attributes.
			 *
			 * <pre><code>anim: {
			 *  show: {
			 *  	duration: .9
			 *  },
			 *  hide: {
			 *  	duration: .2
			 *  }
			 * }
			 * </code></pre>
			 * 
			 * @attribute anim
			 * @default { show: false }
			 * @type Object
			 */
			anim: {
				lazyAdd: false,
				value: {
					show: false
				},
				setter: function(v) {
					return this._setAnim(v);
				}
			},

			/**
			 * Position where the arrow will be placed. See
			 * <a href="OverlayContextPanel.html#config_showArrow">showArrow</a>. If it's
			 * not set, it will get the value set on the
			 * <a href="OverlayContext.html#config_align">align</a> point. Here is a
			 * list of valid arrows 'bc', 'bl', 'br', 'cc', 'lb', 'lc', 'lt', 'rb',
			 * 'rc', 'rl'.
			 *
			 * @attribute arrow
			 * @default null
			 * @type String
			 */
			arrow: {
				value: null,
				validator: isString
			},

			/**
			 * See <a href="OverlayContext.html#config_hideOn">hideOn</a>.
			 *
			 * @attribute hideOn
			 * @default click
			 * @type String
			 */
			hideOn: {
				value: CLICK
			},

			/**
			 * See <a href="OverlayContext.html#config_showOn">showOn</a>.
			 *
			 * @attribute showOn
			 * @default click
			 * @type String
			 */
			showOn: {
				value: CLICK
			},

			/**
			 * If true the OverlayContextPanel will show an arrow positioned on the
			 * <a href="OverlayContextPanel.html#config_arrow">arrow</a> point.
			 *
			 * @attribute showArrow
			 * @default true
			 * @type boolean
			 */
			showArrow: {
				lazyAdd: false,
				value: true,
				validator: isBoolean
			},

			/**
			 * Gives stacking habilities to the OverlayContextPanel.
			 *
			 * @attribute stack
			 * @default true
			 * @type boolean
			 */
			stack: {
				lazyAdd: false,
				value: true,
				setter: function(v) {
					return this._setStack(v);
				},
				validator: isBoolean
			}
		},

		EXTENDS: A.OverlayContext,

		prototype: {
			/**
			 * Bind the events on the OverlayContextPanel UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				instance.after('showArrowChange', instance._afterShowArrowChange);

				instance.before('show', instance._beforeShow);

				OverlayContextPanel.superclass.bindUI.apply(instance, arguments);
			},

			/**
			 * Create the DOM structure for the OverlayContextPanel. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				var instance = this;

				instance._renderElements();
			},

			/**
			 * Sync the OverlayContextPanel UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				var instance = this;

				OverlayContextPanel.superclass.syncUI.apply(instance, arguments);

				instance._syncElements();
			},

			/**
			 * Aligns the OverlayContextPanel to the provided node (or viewport) using the
			 * provided points. Inherited from
			 * <a href="Overlay.html#method_align">Overlay</a>.
			 *
			 * @method align
			 * @param {Node | String | null} node A reference (or selector string) for
			 * the Node which with the OverlayContextPanel is to be aligned.
			 * @param {Array[2]} points A two element array, specifying the points on
			 * the OverlayContextPanel and node/viewport which need to be aligned.
			 */
			align: function (node, points) {
				var instance = this;

				OverlayContextPanel.superclass.align.apply(this, arguments);

				instance._syncElements();
			},

			/**
			 * OverlayContextPanel uses a imageless arrow, which involves some CSS technics.
			 * This method is meant to fix the color of the borders of the arrow.
			 *
			 * @method fixPointerColor
			 */
			fixPointerColor: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);
				var pointer = contentBox.one(DOT+CSS_CONTEXTPANEL_POINTER_INNER);

				pointer.removeAttribute(STYLE);

				var bColor = contentBox.getStyle(BACKGROUND_COLOR);
				var border = 'borderBottomColor';

				var right = [
					DOT+CSS_CONTEXTPANEL_ARROW+RB,
						DOT+CSS_CONTEXTPANEL_ARROW+RC,
							DOT+CSS_CONTEXTPANEL_ARROW+RL
				]
				.join(',');

				var bottom = [
					DOT+CSS_CONTEXTPANEL_ARROW+BR,
						DOT+CSS_CONTEXTPANEL_ARROW+BC,
							DOT+CSS_CONTEXTPANEL_ARROW+BL
				]
				.join(',');

				var left = [
					DOT+CSS_CONTEXTPANEL_ARROW+LB,
						DOT+CSS_CONTEXTPANEL_ARROW+LC,
							DOT+CSS_CONTEXTPANEL_ARROW+LT
				]
				.join(',');

				if (contentBox.test(right)) {
					border = 'borderLeftColor';
				}
				else if (contentBox.test(bottom)) {
					border = 'borderTopColor';
				}
				else if (contentBox.test(left)) {
					border = 'borderRightColor';
				}

				pointer.setStyle(border, bColor);
			},

			/**
			 * Normalize the align point value. The align point 'cc' is not a valid
			 * position for the arrow and then it's normalized to the 'bc' point.
			 *
			 * @method getAlignPoint
			 * @return {String}
			 */
			getAlignPoint: function() {
				var instance = this;
				var overlayPoint = instance.get(ALIGN).points[0];

				if (overlayPoint == CC) {
					// CC is not a valid position for the arrow
					overlayPoint = BC;
				}

				return instance.get(ARROW) || overlayPoint;
			},

			/**
			 * Hides the OverlayContextPanel.
			 *
			 * @method hide
			 * @param {EventFacade} event 
			 */
			hide: function(event) {
				var instance = this;

				if(instance._hideAnim) {
					var visible = instance.get(VISIBLE);

					if (visible) {
						instance._hideAnim.once(END, function() {
							OverlayContextPanel.superclass.hide.apply(instance, arguments);
						});

						instance._hideAnim.run();
					}
				}
				else {
					OverlayContextPanel.superclass.hide.apply(instance, arguments);
				}
			},

			/**
			 * Render DOM elements for the OverlayContextPanel.
			 *
			 * @method _renderElements
			 * @protected
			 */
			_renderElements: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);
				var align = instance.get(ALIGN);
				var overlayPoint = align.points[0];

				contentBox.addClass(CSS_STATE_DEFAULT);

				instance._pointerNode = A.Node.create(TPL_POINTER).append(TPL_POINTER_INNER);

				contentBox.append(
					instance._pointerNode
				);
			},

			/**
			 * Sync the UI of the OverlayContextPanel elements.
			 *
			 * @method _syncElements
			 * @protected
			 */
			_syncElements: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);
				var pointerNode = instance._pointerNode;
				var overlayPoint = instance.getAlignPoint();

				if (instance.get(SHOW_ARROW)) {
					pointerNode.removeClass(CSS_CONTEXTPANEL_HIDDEN);
					contentBox.removeClass(CSS_CONTEXTPANEL_ARROW + instance._lastOverlayPoint);
					contentBox.addClass(CSS_CONTEXTPANEL_ARROW + overlayPoint);

					instance.fixPointerColor();
				}
				else {
					pointerNode.addClass(CSS_CONTEXTPANEL_HIDDEN);
				}

				instance._lastOverlayPoint = overlayPoint;
			},

			/**
			 * Setter for the
			 * <a href="OverlayContextPanel.html#config_stack">stack</a> attribute.
			 *
			 * @method _setStack
			 * @param {boolean} value
			 * @protected
			 * @return {boolean}
			 */
			_setStack: function(value) {
				var instance = this;

				if (value) {
					A.OverlayContextPanelManager.register(instance);
				}
				else {
					A.OverlayContextPanelManager.remove(instance);
				}

				return value;
			},

			/**
			 * Setter for the
			 * <a href="OverlayContextPanel.html#config_anim">anim</a> attribute.
			 *
			 * @method _setAnim
			 * @param {Object} value
			 * @protected
			 * @return {Object}
			 */
			_setAnim: function(value) {
				var instance = this;
				var boundingBox = instance.get(BOUNDING_BOX);

				if (value) {
					var defaults = {
						node: boundingBox,
						duration: 0.1
					};

					var showOptions = A.merge(defaults, {
						from: { opacity: 0 },
						to: { opacity: 1 }
					});

					var hideOptions = A.merge(defaults, {
						from: { opacity: 1 },
						to: { opacity: 0 }
					});

					if (isObject(value)) {
						// loading user settings for animation
						showOptions = A.merge(showOptions, value.show);
						hideOptions = A.merge(hideOptions, value.hide);
					}

					instance._showAnim = new A.Anim(showOptions);
					instance._hideAnim = new A.Anim(hideOptions);

					// if anim.show or anim.hide === false, cancel respective animation
					if (isObject(value)) {
						if (value.show === false) {
							instance._showAnim = null;
						}

						if (value.hide === false) {
							instance._hideAnim = null;
						}
					}
				}

				return value;
			},

			/**
			 * Fires before show the OverlayContextPanel.
			 *
			 * @method _beforeShow
			 * @param {EventFacade} event 
			 * @protected
			 */
			_beforeShow: function(event) {
				var instance = this;
				var boundingBox = instance.get(BOUNDING_BOX);
				var visible = instance.get(VISIBLE);

				if(!visible && instance._showAnim) {
					boundingBox.setStyle(OPACITY, 0);

					instance._showAnim.run();
				}
				else {
					boundingBox.setStyle(OPACITY, 1);
				}
			},

			/**
			 * Fires after showArrow attribute changes.
			 *
			 * @method _afterShowArrowChange
			 * @param {EventFacade} event 
			 * @protected
			 */
			_afterShowArrowChange: function() {
				var instance = this;

				instance._syncElements();
			}
		}
	}
);

A.OverlayContextPanel = OverlayContextPanel;

/**
 * A base class for OverlayContextPanelManager:
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class OverlayContextPanelManager
 * @constructor
 * @extends OverlayManager
 * @static
 */
A.OverlayContextPanelManager = new A.OverlayManager({
	zIndexBase: 1000
});

}, '@VERSION@' ,{requires:['aui-overlay-context','anim'], skinnable:true});
AUI.add('aui-overlay-manager', function(A) {
/**
 * The OverlayManager Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-manager
 */

var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	BOUNDING_BOX = 'boundingBox',
	DEFAULT = 'default',
	HOST = 'host',
	OVERLAY_MANAGER = 'OverlayManager',
	GROUP = 'group',
	Z_INDEX = 'zIndex',
	Z_INDEX_BASE = 'zIndexBase';

	/**
	 * <p><img src="assets/images/aui-overlay-manager/main.png"/></p>
	 *
	 * A base class for OverlayManager, providing:
	 * <ul>
	 *    <li>Grouping overlays</li>
	 *    <li>Show or hide the entire group of registered overlays</li>
	 *    <li>Basic Overlay Stackability (zIndex support)</li>
	 * </ul>
	 *
	 * Quick Example:<br/>
	 *
	 * <pre><code>var groupOverlayManager = new A.OverlayManager();
	 * groupOverlayManager.register([overlay1, overlay2, overlay3]);
     * groupOverlayManager.hideAll();
	 * </code></pre>
	 *
	 * Check the list of <a href="OverlayManager.html#configattributes">Configuration Attributes</a> available for
	 * OverlayManager.
	 *
	 * @param config {Object} Object literal specifying widget configuration properties.
	 *
	 * @class OverlayManager
	 * @constructor
	 * @extends Base
	 */
	var OverlayManager = A.Component.create(
		{
			/**
			 * Static property provides a string to identify the class.
			 *
			 * @property OverlayManager.NAME
			 * @type String
			 * @static
			 */
			NAME: OVERLAY_MANAGER.toLowerCase(),

			/**
			 * Static property used to define the default attribute
			 * configuration for the OverlayManager.
			 *
			 * @property OverlayManager.ATTRS
			 * @type Object
			 * @static
			 */
			ATTRS: {
				/**
				 * The zIndex base to be used on the stacking for all overlays
                 * registered on the OverlayManager.
				 *
				 * @attribute zIndexBase
				 * @default 1000
				 * @type Number
				 */
				zIndexBase: {
					value: 1000,
					validator: isNumber,
					setter: Lang.toInt
				}
			},

			EXTENDS: A.Base,

			prototype: {
				/**
				 * Construction logic executed during OverlayManager instantiation. Lifecycle.
				 *
				 * @method initializer
				 * @protected
				 */
				initializer: function() {
					var instance = this;

					instance._overlays = [];
				},

				/**
				 * Set the passed overlay zIndex to the highest value.
				 *
				 * @method bringToTop
				 * @param {Overlay} overlay Instance of
		         * <a href="Overlay.html">Overlay</a>.
				 */
				bringToTop: function(overlay) {
					var instance = this;

					var overlays = instance._overlays.sort(instance.sortByZIndexDesc);

					var highest = overlays[0];

					if (highest !== overlay) {
						var overlayZ = overlay.get(Z_INDEX);
						var highestZ = highest.get(Z_INDEX);

						overlay.set(Z_INDEX, highestZ + 1);

						overlay.set('focused', true);
					}
				},

				/**
				 * Descructor lifecycle implementation for the OverlayManager class.
				 * Purges events attached to the node (and all child nodes).
				 *
				 * @method destructor
				 * @protected
				 */
				destructor: function() {
					var instance = this;

					instance._overlays = [];
				},

				/**
				 * Register the passed <a href="Overlay.html">Overlay</a> to this
		         * OverlayManager.
				 *
				 * @method register
				 * @param {Overlay} overlay <a href="Overlay.html">Overlay</a> instance to be registered
				 * @return {Array} Registered overlays
				 */
				register: function (overlay) {
					var instance = this;

					var overlays = instance._overlays;

					if (isArray(overlay)) {
						A.Array.each(overlay, function(o) {
							instance.register(o);
						});
					}
					else {
						var zIndexBase = instance.get(Z_INDEX_BASE);
						var registered = instance._registered(overlay);

						if (
							!registered && overlay &&
							((overlay instanceof A.Overlay) ||
							(A.Component && overlay instanceof A.Component))
						) {
							var boundingBox = overlay.get(BOUNDING_BOX);

							overlays.push(overlay);

							var zIndex = overlay.get(Z_INDEX) || 0;
							var newZIndex = overlays.length + zIndex + zIndexBase;

							overlay.set(Z_INDEX, newZIndex);

							overlay.on('focusedChange', instance._onFocusedChange, instance);
							boundingBox.on('mousedown', instance._onMouseDown, instance);
						}
					}

					return overlays;
				},

				/**
				 * Remove the passed <a href="Overlay.html">Overlay</a> from this
		         * OverlayManager.
				 *
				 * @method remove
				 * @param {Overlay} overlay <a href="Overlay.html">Overlay</a> instance to be removed
				 * @return {null}
				 */
				remove: function (overlay) {
					var instance = this;

					var overlays = instance._overlays;

					if (overlays.length) {
						return A.Array.removeItem(overlays, overlay);
					}

					return null;
				},

				/**
				 * Loop through all registered <a href="Overlay.html">Overlay</a> and
		         * execute a callback.
				 *
				 * @method each
				 * @param {function} fn Callback to be executed on the
		         * <a href="Array.html#method_each">Array.each</a>
				 * @return {null}
				 */
				each: function(fn) {
					var instance = this;

					var overlays = instance._overlays;

					A.Array.each(overlays, fn);
				},

				/**
				 * Invoke the <a href="Overlay.html#method_show">show</a> method from
		         * all registered Overlays.
				 *
				 * @method showAll
				 */
				showAll: function() {
					this.each(
						function(overlay) {
							overlay.show();
						}
					);
				},

				/**
				 * Invoke the <a href="Overlay.html#method_hide">hide</a> method from
		         * all registered Overlays.
				 *
				 * @method hideAll
				 */
				hideAll: function() {
					this.each(
						function(overlay) {
							overlay.hide();
						}
					);
				},

				/**
				 * zIndex comparator. Used on Array.sort.
				 *
				 * @method sortByZIndexDesc
				 * @param {Overlay} a Overlay
				 * @param {Overlay} b Overlay
				 * @return {Number}
				 */
				sortByZIndexDesc: function(a, b) {
					if (!a || !b || !a.hasImpl(A.WidgetStack) || !b.hasImpl(A.WidgetStack)) {
						return 0;
					}
					else {
						var aZ = a.get(Z_INDEX);
						var bZ = b.get(Z_INDEX);

						if (aZ > bZ) {
							return -1;
						} else if (aZ < bZ) {
							return 1;
						} else {
							return 0;
						}
					}
				},

				/**
				 * Check if the overlay is registered.
				 *
				 * @method _registered
				 * @param {Overlay} overlay Overlay
				 * @protected
				 * @return {boolean}
				 */
				_registered: function(overlay) {
					var instance = this;

					return A.Array.indexOf(instance._overlays, overlay) != -1;
				},

				/**
				 * Mousedown event handler, used to invoke
		         * <a href="OverlayManager.html#method_bringToTop">bringToTop</a>.
				 *
				 * @method _onMouseDown
				 * @param {EventFacade} event
				 * @protected
				 */
				_onMouseDown: function(event) {
					var instance = this;
					var overlay = A.Widget.getByNode(event.currentTarget || event.target);
					var registered = instance._registered(overlay);

					if (overlay && registered) {
						instance.bringToTop(overlay);
					}
				},

				/**
				 * Fires when the <a href="Widget.html#config_focused">focused</a>
		         * attribute change. Used to invoke
		         * <a href="OverlayManager.html#method_bringToTop">bringToTop</a>.
				 *
				 * @method _onFocusedChange
				 * @param {EventFacade} event
				 * @protected
				 */
				_onFocusedChange: function(event) {
					var instance = this;

					if (event.newVal) {
						var overlay = event.currentTarget || event.target;
						var registered = instance._registered(overlay);

						if (overlay && registered) {
							instance.bringToTop(overlay);
						}
					}
				}
			}
		}
	);

	A.OverlayManager = OverlayManager;

}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','overlay','plugin']});
AUI.add('aui-overlay-mask', function(A) {
/**
 * The OverlayMask Utility
 *
 * @module aui-overlay
 * @submodule aui-overlay-mask
 */

var L = A.Lang,
	isArray = L.isArray,
	isString = L.isString,
	isNumber = L.isNumber,
	isValue = L.isValue,

	CONFIG = A.config,

	UA = A.UA,

	IE6 = (UA.ie && UA.version.major <= 6),

	ABSOLUTE = 'absolute',
	ALIGN_POINTS = 'alignPoints',
	BACKGROUND = 'background',
	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	FIXED = 'fixed',
	HEIGHT = 'height',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OPACITY = 'opacity',
	OVERLAY_MASK = 'overlaymask',
	POSITION = 'position',
	TARGET = 'target',
	WIDTH = 'width';

/**
 * A base class for OverlayMask, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Cross browser mask functionality to cover an element or the entire page</li>
 *    <li>Customizable mask (i.e., background, opacity)</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.OverlayMask().render();</code></pre>
 *
 * Check the list of <a href="OverlayMask.html#configattributes">Configuration Attributes</a> available for
 * OverlayMask.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class OverlayMask
 * @constructor
 * @extends OverlayBase
 */
var OverlayMask = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property OverlayMask.NAME
		 * @type String
		 * @static
		 */
		NAME: OVERLAY_MASK,

		/**
		 * Static property used to define the default attribute
		 * configuration for the OverlayMask.
		 *
		 * @property OverlayMask.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Points to align the <a href="Overlay.html">Overlay</a> used as
	         * mask.
			 *
			 * @attribute alignPoints
			 * @default [ 'tl', 'tl' ]
			 * @type Array
			 */
			alignPoints: {
				value: [ 'tl', 'tl' ],
				validator: isArray
	        },

			/**
			 * Background color of the mask.
			 *
			 * @attribute background
			 * @default null
			 * @type String
			 */
			background: {
				lazyAdd: false,
				value: null,
				validator: isString,
				setter: function(v) {
					if (v) {
						this.get(CONTENT_BOX).setStyle(BACKGROUND, v);
					}

					return v;
				}
			},

			/**
			 * Node where the mask will be positioned and re-dimensioned. The
	         * default is the document, which means that if not specified the mask
	         * takes the full screen.
			 *
			 * @attribute target
			 * @default document
			 * @type Node | String
			 */
			target: {
				cloneDefaultValue: false,
				lazyAdd: false,
				value: CONFIG.doc,
				setter: function(v) {
					var instance = this;

					var target = A.one(v);

					var isDoc = instance._isDoc = target.compareTo(CONFIG.doc);
					var isWin = instance._isWin = target.compareTo(CONFIG.win);

					instance._fullPage = isDoc || isWin;

					return target;
				}
			},

			/**
			 * CSS opacity of the mask.
			 *
			 * @attribute opacity
			 * @default .5
			 * @type Number
			 */
			opacity: {
				value: 0.5,
				validator: isNumber,
				setter: function(v) {
					return this._setOpacity(v);
				}
			},

			/**
			 * Use shim option.
			 *
			 * @attribute shim
			 * @default True on IE.
			 * @type boolean
			 */
			shim: {
				value: A.UA.ie
			},

			/**
			 * If true the Overlay is visible by default after the render phase.
	         * Inherited from <a href="Overlay.html">Overlay</a>.
			 *
			 * @attribute visible
			 * @default false
			 * @type boolean
			 */
			visible: {
				value: false
			},

			/**
			 * zIndex of the OverlayMask.
			 *
			 * @attribute zIndex
			 * @default 1000
			 * @type Number
			 */
			zIndex: {
				value: 1000
			}
		},

		EXTENDS: A.OverlayBase,

		prototype: {
			/**
			 * Bind the events on the OverlayMask UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				OverlayMask.superclass.bindUI.apply(this, arguments);

				instance.after('targetChange', instance._afterTargetChange);
				instance.after('visibleChange', instance._afterVisibleChange);

				// window:resize YUI normalized event is not working, bug?
				A.on('windowresize', A.bind(instance.refreshMask, instance));
			},

			/**
			 * Sync the OverlayMask UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				var instance = this;

				instance.refreshMask();
			},

			/**
			 * Get the size of the
		     * <a href="OverlayMask.html#config_target">target</a>. Used to dimension
		     * the mask node.
			 *
			 * @method getTargetSize
			 * @return {Object} Object containing the { height: height, width: width }.
			 */
			getTargetSize: function() {
				var instance = this;
				var target = instance.get(TARGET);

				var isDoc = instance._isDoc;
				var isWin = instance._isWin;

				var height = target.get(OFFSET_HEIGHT);
				var width = target.get(OFFSET_WIDTH);

				if (IE6) {
					// IE6 doesn't support height/width 100% on doc/win
					if (isWin) {
						width = A.DOM.winWidth();
						height = A.DOM.winHeight();
					}
					else if (isDoc) {
						width = A.DOM.docWidth();
						height = A.DOM.docHeight();
					}
				}
				// good browsers...
				else if (instance._fullPage) {
					height = '100%';
					width = '100%';
				}

				return { height: height, width: width };
			},

			/**
			 * Repaint the OverlayMask UI, respecting the
		     * <a href="OverlayMask.html#config_target">target</a> size and the
		     * <a href="OverlayMask.html#config_alignPoints">alignPoints</a>.
			 *
			 * @method refreshMask
			 */
			refreshMask: function() {
				var instance = this;
				var alignPoints = instance.get(ALIGN_POINTS);
				var target = instance.get(TARGET);
				var boundingBox = instance.get(BOUNDING_BOX);
				var targetSize = instance.getTargetSize();

				var fullPage = instance._fullPage;

				boundingBox.setStyles({
					position: (IE6 || !fullPage) ? ABSOLUTE : FIXED,
					left: 0,
					top: 0
				});

				var height = targetSize.height;
				var width = targetSize.width;

				if (isValue(height)) {
					instance.set(HEIGHT, height);
				}

				if (isValue(width)) {
					instance.set(WIDTH, width);
				}

				// if its not a full mask...
				if ( !fullPage ) {
					// if the target is not document|window align the overlay
					instance.align(target, alignPoints);
				}
			},

			/**
			 * Setter for <a href="Paginator.html#config_opacity">opacity</a>.
			 *
			 * @method _setOpacity
			 * @protected
			 * @param {Number} v
			 * @return {Number}
			 */
			_setOpacity: function(v) {
				var instance = this;

				instance.get(CONTENT_BOX).setStyle(OPACITY, v);

				return v;
			},

			/**
			 * Invoke the <code>OverlayMask.superclass._uiSetVisible</code>. Used to
		     * reset the <code>opacity</code> to work around IE bugs when set opacity
		     * of hidden elements.
			 *
			 * @method _uiSetVisible
			 * @param {boolean} val
			 * @protected
			 */
			_uiSetVisible: function(val) {
				var instance = this;

				OverlayMask.superclass._uiSetVisible.apply(this, arguments);

				if (val) {
					instance._setOpacity(
						instance.get(OPACITY)
					);
				}
			},

			/**
			 * Fires after the value of the
			 * <a href="Paginator.html#config_target">target</a> attribute change.
			 *
			 * @method _afterTargetChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterTargetChange: function(event) {
				var instance = this;

				instance.refreshMask();
			},

			/**
			 * Fires after the value of the
			 * <a href="Paginator.html#config_visible">visible</a> attribute change.
			 *
			 * @method _afterVisibleChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterVisibleChange: function(event) {
				var instance = this;

				instance._uiSetVisible(event.newVal);
			},

			/**
			 * UI Setter for the 
			 * <a href="Paginator.html#config_xy">XY</a> attribute.
			 *
			 * @method _uiSetXY
			 * @param {EventFacade} event
			 * @protected
			 */
			_uiSetXY: function() {
				var instance = this;

				if (!instance._fullPage || IE6) {
					OverlayMask.superclass._uiSetXY.apply(instance, arguments);
				}
			}
		}
	}
);

A.OverlayMask = OverlayMask;

}, '@VERSION@' ,{requires:['aui-base','aui-overlay-base','event-resize'], skinnable:true});


AUI.add('aui-overlay', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask']});

