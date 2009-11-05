AUI.add('dialog', function(A) {

var L = A.Lang,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,
	isArray = L.isArray,
	isObject = L.isObject,

	ADD_CLASS = 'addClass',
	ANCHOR = 'a',
	BD = 'bd',
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
	DESTROY_ON_CLOSE = 'destroyOnClose',
	DIALOG = 'dialog',
	DOT = '.',
	DRAGGABLE = 'draggable',
	DRAG_INSTANCE = 'dragInstance',
	FOOTER_CONTENT = 'footerContent',
	FT = 'ft',
	HD = 'hd',
	HEADER = 'header',
	HEADER_CONTENT = 'headerContent',
	HOVER = 'hover',
	MODAL = 'modal',
	ICON = 'icon',
	INNER_HTML = 'innerHTML',
	IO = 'io',
	LOADING = 'loading',
	POST = 'POST',
	REMOVE_CLASS = 'removeClass',
	SPACE = ' ',
	STACK = 'stack',
	STATE = 'state',
	TITLE = 'title',
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
	CSS_WIDGET_HD = getCN(WIDGET, HD),
	CSS_DIALOG_HD = getCN(DIALOG, HD),
	CSS_DIALOG_BD = getCN(DIALOG, BD),
	CSS_DIALOG_FT = getCN(DIALOG, FT),

	TPL_LOADING = '<div class="' + CSS_ICON_LOADING + '"></div>';

function Dialog(config) {
	Dialog.superclass.constructor.apply(this, arguments);
}

A.mix(Dialog, {
	NAME: DIALOG,

	ATTRS: {
		bodyContent: {
			value: SPACE
		},

		buttons: {
			value: [],
			validator: isArray
		},

		constrain2view: {
			value: true,
			validator: isBoolean
		},

		destroyOnClose: {
			value: false,
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

		headerContent: {
			writeOnce: true,
			getter: function() {
				return this.titleContainter;
			}
		},

		modal: {
			setter: function(v) {
				return this._setModal(v);
			},
			lazyAdd: false,
			value: false,
			validator: isBoolean
		},

		io: {
			lazyAdd: true,
			value: null,
			setter: function(v) {
				return this._setIO(v);
			}
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
			validator: function(v) {
				return isString(v) || isBoolean(v);
			}
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

		instance.get(BOUNDING_BOX).remove();
	},

	/*
	* Methods
	*/
	close: function() {
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

		instance.fire('close');
	},

	_bindElements: function () {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		instance.closeIcon.on(
			'click',
			function(event) {
				instance.close();
			}
		);

		instance.after('titleChange', this._afterSetTitle);
		instance.after('visibleChange', this._afterSetVisible);
	},

	_renderElements: function() {
		var instance = this;

		instance.titleContainter = A.Node.create('<div></div>');

		var closeIcon = new A.ToolItem(CLOSE);

		closeIcon.get('contentBox').addClass(CSS_DIALOG_CLOSE);

		instance.closeIcon = closeIcon;

		var title = instance.get(TITLE);

		if (title !== false) {
			var titleContainter = instance.titleContainter;

			titleContainter.addClass(CSS_DIALOG_TITLE);

			titleContainter.html(title);
		}
	},

	_afterRenderer: function() {
		var instance = this;
		var bodyNode = instance.bodyNode;
		var footerNode = instance.footerNode;
		var headerNode = instance.headerNode;

		var stack = instance.get(STACK);
		var title = instance.get(TITLE);

		headerNode.addClass(CSS_DIALOG_HD);
		headerNode.addClass(CSS_STATE_DEFAULT);

		if (bodyNode) {
			bodyNode.addClass(CSS_DIALOG_BD);
		}

		if (footerNode) {
			footerNode.addClass(CSS_DIALOG_FT);
		}

		if (title === false) {
			headerNode.removeClass(CSS_STATE_DEFAULT);
			headerNode.removeClass(CSS_WIDGET_HD);
			headerNode.removeClass(CSS_DIALOG_HD);
		}

		headerNode.append(instance.titleContainter);

		instance.closeIcon.render(headerNode);

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

			instance.footerNode.addClass(CSS_DIALOG_FT);
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
				handles: [ DOT + CSS_DIALOG_HD ]
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
			value.cfg = value.cfg || {};

			var data = value.cfg.data;

			if (isObject(data)) {
				value.cfg.data = A.toQueryString(data);
			}

			instance.plug(A.Plugin.StdModIOPlugin, value);

			var autoRefresh = ('autoRefresh' in value) ? value.autoRefresh : true;

			if (instance.io && autoRefresh) {
				instance.io.refresh();
			}
		}
		else {
			instance.unplug(A.Plugin.StdModIOPlugin);
		}

		return value;
	},

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

	/*
	* Attribute Listeners
	*/
	_afterSetTitle: function(event) {
		var instance = this;

		if (!isBoolean(event.newVal)) {
			var headerNode = instance.headerNode;

			headerNode.addClass(CSS_WIDGET_HD);
			headerNode.addClass(CSS_DIALOG_HD);
			headerNode.addClass(CSS_STATE_DEFAULT);

			instance.titleContainter.html(event.newVal);
		}
	},

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
	}
});

A.Dialog = Dialog;

A.DialogManager = new A.OverlayManager({
	zIndexBase: 1000
});

A.mix(A.DialogManager, {
	findByChild: function(child) {
		return A.Widget.getByNode(child);
	},

	closeByChild: function(child) {
		return A.DialogManager.findByChild(child).close();
	},

	refreshByChild: function(child, io) {
		var dialog = A.DialogManager.findByChild(child);

		if (dialog && dialog.io) {
			if (io) {
				dialog.set(IO, io);
			}
			else {
				dialog.io.refresh();
			}
		}
	}
});

A.DialogMask = new A.OverlayMask().render();

}, '@VERSION', { requires: [ 'aui-base', 'overlay-manager', 'overlay-mask', 'dd-constrain', 'io-stdmod', 'dialog-css' ] });