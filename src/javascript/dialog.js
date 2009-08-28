AUI.add('dialog', function(A) {

var L = A.Lang,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,
	isArray = L.isArray,
	isObject = L.isObject,

	ADD_CLASS = 'addClass',
	ANCHOR = 'a',
	BLANK = '',
	BODY_CONTENT = 'bodyContent',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTONS = 'buttons',
	CLOSE = 'close',
	CONSTRAIN_TO_VIEWPORT = 'constrain2view',
	CONTAINER = 'container',
	CONTENT_BOX = 'contentBox',
	DD = 'dd',
	DEFAULT = 'default',
	DIALOG = 'dialog',
	DOT = '.',
	DRAGGABLE = 'draggable',
	DRAG_INSTANCE = 'dragInstance',
	FOOTER_CONTENT = 'footerContent',
	GROUP = 'group',
	HD = 'hd',
	HEADER = 'header',
	HEADER_CONTENT = 'headerContent',
	HOVER = 'hover',
	ICON = 'icon',
	INNER_HTML = 'innerHTML',
	IO = 'io',
	LOADING = 'loading',
	POST = 'POST',
	REMOVE_CLASS = 'removeClass',
	STACK = 'stack',
	STATE = 'state',
	TITLE = 'title',
	TOOL = 'tool',
	WIDGET = 'widget',

	getCN = A.ClassNameManager.getClassName,

	CSS_DIALOG_BUTTON = getCN(DIALOG, BUTTON),
	CSS_DIALOG_BUTTON_CONTAINER = getCN(DIALOG, BUTTON, CONTAINER),
	CSS_DIALOG_BUTTON_DEFAULT = getCN(DIALOG, BUTTON, DEFAULT),
	CSS_DIALOG_CLOSE = getCN(DIALOG, CLOSE),
	CSS_DIALOG_TITLE = getCN(DIALOG, TITLE),
	CSS_ICON = getCN(ICON),
	CSS_ICON_CLOSE = getCN(ICON, CLOSE),
	CSS_ICON_LOADING = getCN(ICON, LOADING),
	CSS_PREFIX = getCN(DD),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_STATE_HOVER = getCN(STATE, HOVER),
	CSS_TOOL = getCN(TOOL),
	CSS_WIDGET_HD = getCN(WIDGET, HD),

	TPL_LOADING = '<div class="' + CSS_ICON_LOADING + '"></div>';

function Dialog(config) {
	Dialog.superclass.constructor.apply(this, arguments);
}

A.mix(Dialog, {
	NAME: DIALOG,

	ATTRS: {
		buttons: {
			value: [],
			validator: isArray
		},

		constrain2view: {
			value: true,
			validator: isBoolean
		},

		draggable: {
			lazyAdd: true,
			value: true,
			setter: function(v) {
				return this._setDraggable(v);
			}
		},

		dragInstance: {
			value: null
		},

		group: {
			value: DEFAULT,
			validator: isString
		},

		headerContent: {
			writeOnce: true,
			getter: function() {
				return this.titleContainter;
			}
		},

		io: {
			lazyAdd: true,
			value: null,
			setter: function(v) {
				return this._setIO(v);
			}
		},

		ioCfg: {
			value: null
		},

		stack: {
			lazyAdd: true,
			value: true,
			setter: function(v) {
				return this._setStack(v);
			},
			validator: isBoolean
		},

		title: {
			value: BLANK,
			validator: isString
		}
	}
});

A.extend(Dialog, A.Overlay, {
	/*
	* Lifecycle
	*/
	renderUI: function () {
		var instance = this;

		instance._renderElements();
	},

	bindUI: function () {
		var instance = this;

		instance._bindElements();
	},

	renderer: function() {
		var instance = this;

		Dialog.superclass.renderer.apply(instance, arguments);

		instance._afterRenderer();
	},

	destructor: function() {
		var instance = this;

		if (instance.OverlayManager) {
			instance.OverlayManager.destroy();
		}

		instance.get(BOUNDING_BOX).remove();
	},

	/*
	* Methods
	*/
	_bindElements: function () {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);
		var closeIconContainter = instance.closeIconContainter;

		var closeFn = function(event) {
			var method = { mouseover: ADD_CLASS, mouseout: REMOVE_CLASS }[event.type];
			event.currentTarget[method](CSS_STATE_HOVER);
		};

		closeIconContainter.on('mouseover', closeFn);
		closeIconContainter.on('mouseout', closeFn);

		closeIconContainter.on('click', function(event) {
			instance.hide();
			instance.fire('close');
		});

		boundingBox.on('mousedown', function() {
			if (instance.OverlayManager) {
				instance.OverlayManager.bringToTop();
			}

			instance.fire('focus');
		});

		instance.after('titleChange', this._afterSetTitle);
	},

	_renderElements: function() {
		var instance = this;

		instance.titleContainter = A.Node.create('<div></div>');
		instance.closeIconContainter = A.Node.create('<span></span>');
		instance.closeIcon = A.Node.create('<span></span>');

		var closeIcon = instance.closeIcon;
		var closeIconContainter = instance.closeIconContainter;
		var title = instance.get(TITLE);
		var titleContainter = instance.titleContainter;

		closeIcon.addClass(CSS_ICON);
		closeIcon.addClass(CSS_ICON_CLOSE);
		closeIconContainter.addClass(CSS_DIALOG_CLOSE);
		closeIconContainter.addClass(CSS_STATE_DEFAULT);
		closeIconContainter.addClass(CSS_TOOL);
		titleContainter.addClass(CSS_DIALOG_TITLE);

		instance.titleContainter.html(title);
	},

	_afterRenderer: function() {
		var instance = this;
		var headerNode = instance.headerNode;
		var stack = instance.get(STACK);
		var closeIconContainter = instance.closeIconContainter;

		headerNode.addClass(CSS_STATE_DEFAULT);

		headerNode.append(instance.titleContainter);
		headerNode.append(closeIconContainter);
		closeIconContainter.append(instance.closeIcon);

		instance._initButtons();

		// forcing lazyAdd:true attrs call the setter
		instance.get(DRAGGABLE);
		instance.get(IO);
	},

	_initButtons: function() {
		var instance = this;
		var buttons = instance.get(BUTTONS);
		var container = A.Node.create('<div></div>');
		var nodeModel = A.Node.create('<button></button>');

		container.addClass(CSS_DIALOG_BUTTON_CONTAINER);
		nodeModel.addClass(CSS_DIALOG_BUTTON);

		A.each(buttons, function(button, i) {
			var node = nodeModel.cloneNode();

			if (button.isDefault) {
				node.addClass(CSS_DIALOG_BUTTON_DEFAULT);
			}

			if (button.handler) {
				node.on('click', A.bind(button.handler, instance));
			}

			node.html(button.text || BLANK);

			container.append(node);
		});

		if (buttons.length) {
			instance.set(FOOTER_CONTENT, container);
		}
	},

	_setDraggable: function(value) {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		var destroyDraggable = function() {
			var dragInstance = instance.get(DRAG_INSTANCE);

			if (dragInstance) {
				// TODO - YUI3 has a bug when destroy and recreates
				dragInstance.destroy();
				dragInstance.unplug(A.Plugin.DDConstrained);
			}
		};

		A.DD.DDM.CSS_PREFIX = CSS_PREFIX;

		if (value) {
			var defaults = {
				node: boundingBox,
				handles: [ DOT + CSS_WIDGET_HD ]
			};
			var dragOptions = A.merge(defaults, instance.get(DRAGGABLE) || {});

			// change the drag scope callback to execute using the dialog scope
			if (dragOptions.on) {
				A.each(dragOptions.on, function(fn, eventName) {
					dragOptions.on[eventName] = A.bind(fn, instance);
				});
			}

			destroyDraggable();

			var dragInstance = new A.DD.Drag(dragOptions);

			dragInstance.plug(A.Plugin.DDConstrained, {
				constrain2view: instance.get(CONSTRAIN_TO_VIEWPORT)
			});

			instance.set(DRAG_INSTANCE, dragInstance);
		}
		else {
			destroyDraggable();
		}

		return value;
	},

	_setIO: function(value) {
		var instance = this;

		if (value && !instance.get(BODY_CONTENT)) {
			instance.set(BODY_CONTENT, TPL_LOADING);
		}

		if (value) {
			instance.unplug(A.Plugin.StdModIOPlugin);

			value.uri = value.uri || value.url;

			value.cfg = A.merge({
				method: POST
			},
			value.cfg);

			var data = value.cfg.data;

			if (isObject(data)) {
				value.cfg.data = A.toQueryString(data);
			}

			instance.plug(A.Plugin.StdModIOPlugin, value);

			if (instance.io) {
				instance.io.refresh();
			}
		}
		else {
			instance.unplug(A.Plugin.StdModIOPlugin);
		}

		return value;
	},

	_setStack: function(value) {
		var instance = this;

		if (value) {
			instance.unplug(A.Plugin.OverlayManager);

			instance.plug(A.Plugin.OverlayManager, {
				group: instance.get(GROUP)
			});
		}
		else {
			instance.unplug(A.Plugin.OverlayManager);
		}

		return value;
	},

	/*
	* Attribute Listeners
	*/
	_afterSetTitle: function(event) {
		var instance = this;

		instance.titleContainter.html(event.newVal);
	}
});

A.Dialog = Dialog;

}, '@VERSION', { requires: [ 'aui-base', 'overlay-manager', 'dd-constrain', 'io-stdmod', 'dialog-css' ] });