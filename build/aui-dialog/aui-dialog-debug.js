AUI.add('aui-dialog', function(A) {
var L = A.Lang,
	isBoolean = L.isBoolean,
	isArray = L.isArray,
	isObject = L.isObject,

	BLANK = '',
	BODY_CONTENT = 'bodyContent',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTONS = 'buttons',
	CLOSE = 'close',
	CONSTRAIN_TO_VIEWPORT = 'constrain2view',
	CONTAINER = 'container',
	DD = 'dd',
	DEFAULT = 'default',
	DESTROY_ON_CLOSE = 'destroyOnClose',
	DIALOG = 'dialog',
	DOT = '.',
	DRAGGABLE = 'draggable',
	DRAG_INSTANCE = 'dragInstance',
	FOOTER_CONTENT = 'footerContent',
	HD = 'hd',
	HEIGHT = 'height',
	ICON = 'icon',
	IO = 'io',
	LOADING = 'loading',
	MODAL = 'modal',
	PROXY = 'proxy',
	RESIZABLE = 'resizable',
	RESIZABLE_INSTANCE = 'resizableInstance',
	STACK = 'stack',
	TOOLS = 'tools',
	WIDTH = 'width',

	EV_RESIZE = 'resize:resize',
	EV_RESIZE_END = 'resize:end',

	getCN = A.ClassNameManager.getClassName,

	CSS_DIALOG_BUTTON = getCN(DIALOG, BUTTON),
	CSS_DIALOG_BUTTON_CONTAINER = getCN(DIALOG, BUTTON, CONTAINER),
	CSS_DIALOG_BUTTON_DEFAULT = getCN(DIALOG, BUTTON, DEFAULT),
	CSS_DIALOG_HD = getCN(DIALOG, HD),
	CSS_ICON_LOADING = getCN(ICON, LOADING),
	CSS_PREFIX = getCN(DD),

	NODE_BLANK_TEXT = document.createTextNode(''),

	TPL_BUTTON = '<button class="' + CSS_DIALOG_BUTTON + '"></button>',
	TPL_BUTTON_CONTAINER = '<div class="' + CSS_DIALOG_BUTTON_CONTAINER + '"></div>';

var Dialog = function(config) {
	if (!A.DialogMask) {
		A.DialogMask = new A.OverlayMask().render();
	}
};

A.mix(
	Dialog,
	{
		NAME: DIALOG,

		ATTRS: {
			bodyContent: {
				value: NODE_BLANK_TEXT
			},

			buttons: {
				value: [],
				validator: isArray
			},

			close: {
				value: true
			},

			constrain2view: {
				value: false,
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

			modal: {
				setter: function(v) {
					return this._setModal(v);
				},
				lazyAdd: false,
				value: false,
				validator: isBoolean
			},

			resizable: {
				setter: function(v) {
					return this._setResizable(v);
				},
				value: true
			},

			resizableInstance: {
				value: null
			},

			stack: {
				lazyAdd: true,
				value: true,
				setter: function(v) {
					return this._setStack(v);
				},
				validator: isBoolean
			}
		}
	}
);

Dialog.prototype = {
	initializer: function(config) {
		var instance = this;
		var tools = instance.get(TOOLS);
		var close = instance.get(CLOSE);
		var buttons = instance.get(BUTTONS);

		if (buttons && buttons.length && !instance.get(FOOTER_CONTENT)) {
			instance.set(FOOTER_CONTENT, NODE_BLANK_TEXT);
		}

		if (close) {
			var closeConfig = {
				icon: CLOSE,
				id: CLOSE,
				handler: {
					fn: instance.close,
					context: instance
				}
			};

			if (tools) {
				tools.push(closeConfig);
			}

			instance.set(TOOLS, tools);
		}

		instance.after('render', instance._afterRenderer);
	},

	bindUI: function() {
		var instance = this;

		instance._bindLazyComponents();

		instance.publish('close', { defaultFn: instance._close });

		instance.on('visibleChange', instance._afterSetVisible);
	},

	destructor: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		A.Event.purgeElement(boundingBox, true);
	},

	_bindLazyComponents: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.on('mouseenter', A.bind(instance._initLazyComponents, instance));
	},

	/*
	* Methods
	*/
	close: function() {
		var instance = this;

		instance.fire('close');
	},

	_afterRenderer: function() {
		var instance = this;

		instance._initButtons();

		// forcing lazyAdd:true attrs call the setter
		instance.get(STACK);
		instance.get(IO);
	},

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

	_initButtons: function() {
		var instance = this;

		var buttons = instance.get(BUTTONS);
		var container = A.Node.create(TPL_BUTTON_CONTAINER);
		var nodeModel = A.Node.create(TPL_BUTTON);

		A.each(
			buttons,
			function(button, i) {
				var node = nodeModel.cloneNode();

				if (button.isDefault) {
					node.addClass(CSS_DIALOG_BUTTON_DEFAULT);
				}

				if (button.handler) {
					node.on('click', button.handler, instance);
				}

				node.html(button.text || BLANK);

				container.append(node);
			}
		);

		if (buttons.length) {
			instance.set(FOOTER_CONTENT, container);
		}
	},

	_initLazyComponents: function() {
		var instance = this;

		// forcing lazyAdd:true attrs call the setter
		if (!instance.get(DRAG_INSTANCE) && instance.get(DRAGGABLE)) {
			instance.get(DRAGGABLE);
		}

		if (!instance.get(RESIZABLE_INSTANCE) && instance.get(RESIZABLE)) {
			instance.get(RESIZABLE);
		}
	},

	_setDraggable: function(value) {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		var destroy = function() {
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

			var dragOptions = A.merge(defaults, value || {});

			// change the drag scope callback to execute using the dialog scope
			if (dragOptions.on) {
				A.each(
					dragOptions.on,
					function(fn, eventName) {
						dragOptions.on[eventName] = A.bind(fn, instance);
					}
				);
			}

			destroy();

			var dragInstance = new A.DD.Drag(dragOptions);

			dragInstance.plug(
				A.Plugin.DDConstrained,
				{
					constrain2view: instance.get(CONSTRAIN_TO_VIEWPORT)
				}
			);

			instance.set(DRAG_INSTANCE, dragInstance);
		}
		else {
			destroy();
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

	_setResizable: function(value) {
		var instance = this;
		var resizableInstance = instance.get(RESIZABLE_INSTANCE);

		var destroy = function() {
			if (resizableInstance) {
				resizableInstance.destroy();
			}
		};

		if (value) {
			var setDimensions = function(event) {
				var type = event.type;
				var info = event.info;

				if ((type == EV_RESIZE_END) ||
					((type == EV_RESIZE) && !event.currentTarget.get(PROXY))) {
						instance.set(HEIGHT, info.height);
						instance.set(WIDTH, info.width);
				}
			};

			destroy();

			var resize = new A.Resize(
				A.merge(
					{
						handles: 'r,br,b',
						minHeight: 100,
						minWidth: 200,
						constrain2view: true,
						node: instance.get(BOUNDING_BOX),
						proxy: true
					},
					value || {}
				)
			);

			resize.after('end', setDimensions);
			resize.after('resize', setDimensions);

			instance.set(RESIZABLE_INSTANCE, resize);

			return value;
		}
		else {
			destroy();
		}
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
};

A.Dialog = A.Base.build(DIALOG, A.Panel, [Dialog, A.WidgetPosition, A.WidgetStack, A.WidgetPositionAlign]);

A.DialogManager = new A.OverlayManager(
	{
		zIndexBase: 1000
	}
);

A.mix(
	A.DialogManager,
	{
		findByChild: function(child) {
			return A.Widget.getByNode(child);
		},

		closeByChild: function(child) {
			return A.DialogManager.findByChild(child).close();
		},

		refreshByChild: function(child) {
			var dialog = A.DialogManager.findByChild(child);

			if (dialog && dialog.io) {
				dialog.io.start();
			}
		}
	}
);

}, '@VERSION@' ,{requires:['aui-panel','dd-constrain','aui-tool-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true});
