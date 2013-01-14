AUI.add('aui-dialog-iframe', function(A) {
var Lang = A.Lang,
	getClassName = A.getClassName,

	IFRAME = 'iframe',

	CSS_IFRAME_BD = getClassName('dialog', IFRAME, 'bd'),
	CSS_IFRAME_NODE = getClassName('dialog', IFRAME, 'node'),
	CSS_IFRAME_ROOT_NODE = getClassName('dialog', IFRAME, 'root', 'node'),

	BUFFER_CSS_CLASS = [CSS_IFRAME_NODE],

	TPL_IFRAME = '<iframe class="{cssClass}" frameborder="0" id="{id}" name="{id}" src="{uri}"></iframe>',

	UI = A.Widget.UI_SRC,
	UI_SRC = {
		src: UI
	};

var DialogIframePlugin = A.Component.create(
	{
		ATTRS: {
			bindLoadHandler: {
				validator: Lang.isFunction,
				value: function() {
					var instance = this;

					instance.node.on('load', A.bind(instance.fire, instance, 'load'));
				}
			},

			closeOnEscape: {
				value: true
			},

			iframeCssClass: {
				value: '',
				setter: '_setIframeCssClass'
			},

			iframeId: {
				valueFn: function() {
					var instance = this;

					return instance.get('id') || A.guid();
				}
			},

			uri: {
			}
		},

		EXTENDS: A.Plugin.Base,
		NAME: IFRAME,
		NS: IFRAME,
		prototype: {
			initializer: function(config) {
				var instance = this;

				instance._host = instance.get('host');

				instance._eventHandles = [];

				instance.publish(
					'load',
					{
						defaultFn: instance._defaultLoadIframeFn
					}
				);

				instance.afterHostMethod(
					'renderUI',
					A.debounce(instance._afterRenderUI, 50, instance),
					instance
				);
			},

			destructor: function() {
				var instance = this;

				instance._detachEventHandles();

				instance._host.set('bodyContent', instance._previousBodyContent);

				instance.node.remove(true);
			},

			_afterDialogVisibleChange: function(event) {
				var instance = this;

				instance._uiSetMonitor(event.newVal);
			},

			_afterMaskVisibleChange: function(event) {
				var instance = this;

				instance._uiSetMonitor(!event.newVal);
			},

			_afterRenderUI: function() {
				var instance = this;

				instance._plugIframe();

				instance._bindEvents();

				var bodyNode = instance._bodyNode;

				bodyNode.plug(A.LoadingMask);

				var loadingMask = bodyNode.loadingmask;

				loadingMask.overlayMask.after('visibleChange', instance._afterMaskVisibleChange, instance);

				loadingMask.show();
			},

			_afterUriChange: function(event) {
				var instance = this;

				if (event.src != UI) {
					instance._uiSetUri(event.newVal, event.prevVal);
				}
			},

			_bindEvents: function() {
				var instance = this;

				instance.afterHostEvent('heightChange', instance._updateIframeSize, instance);
				instance.afterHostEvent('widthChange', instance._updateIframeSize, instance);

				instance.afterHostEvent('visibleChange', instance._afterDialogVisibleChange);

				instance.after('uriChange', instance._afterUriChange);

				var bindLoadHandler = instance.get('bindLoadHandler');

				bindLoadHandler.call(instance);
			},

			_detachEventHandles: function() {
				var instance = this;

				var eventHandles = instance._eventHandles;

				A.Array.invoke(eventHandles, 'detach');

				eventHandles.length = 0;
			},

			_defaultLoadIframeFn: function(event) {
				var instance = this;

				var node = instance.node;

				try {
					var iframeWindow = node.get('contentWindow');

					iframeWindow.once('unload', instance._detachEventHandles, instance);

					var iframeDoc = iframeWindow.get('document');

					iframeDoc.get('documentElement').addClass(CSS_IFRAME_ROOT_NODE);

					instance.set('uri', iframeDoc.get('location.href'), UI_SRC);

					if (instance.get('closeOnEscape')) {
						instance._eventHandles.push(
							A.on(
								'key',
								function(event) {
									instance._host.close();
								},
								[iframeDoc],
								'down:27'
							)
						);
					}
				}
				catch (e) {
				}

				instance._bodyNode.loadingmask.hide();

				instance._host._syncUIPosAlign();
			},

			_plugIframe: function() {
				var instance = this;

				instance._previousBodyContent = instance._host.get('bodyContent');

				var iframeTpl = Lang.sub(
					TPL_IFRAME,
					{
						cssClass: instance.get('iframeCssClass'),
						id: instance.get('iframeId'),
						uri: instance.get('uri')
					}
				);

				var node = A.Node.create(iframeTpl);

				node.plug(A.Plugin.ResizeIframe);

				node.resizeiframe.addTarget(instance);

				instance._host.set('bodyContent', node);

				var bodyNode = instance._host.bodyNode;

				bodyNode.addClass(CSS_IFRAME_BD);

				instance._bodyNode = bodyNode;
				instance.node = node;
			},

			_setIframeCssClass: function(value) {
				BUFFER_CSS_CLASS[1] = value;

				return BUFFER_CSS_CLASS.join(' ');
			},

			_uiSetMonitor: function(value) {
				var instance = this;

				var resizeIframe = instance.node.resizeiframe;

				if (value) {
					resizeIframe.restartMonitor();
				}
				else {
					resizeIframe.pauseMonitor();
				}
			},

			_uiSetUri: function(newVal, prevVal) {
				var instance = this;

				var loadingMask = instance._bodyNode.loadingmask;

				var oldUrl = prevVal.split('#');
				var newUrl = newVal.split('#');

				if (newUrl[0] != oldUrl[0] && loadingMask) {
					loadingMask.show();
				}

				instance.node.attr('src', newVal);
			},

			_updateIframeSize: function(event) {
				var instance = this;

				var bodyNode = instance._bodyNode;
				var node = instance.node;

				var updateIframeSizeUI = instance._updateIframeSizeUI;

				if (!updateIframeSizeUI) {
					updateIframeSizeUI = function() {
						var bodyHeight = bodyNode.getStyle('height');

						node.resizeiframe.set('height', bodyHeight);

						bodyNode.loadingmask.refreshMask();
					};

					instance._updateIframeSizeUI = updateIframeSizeUI;
				}

				A.setTimeout(updateIframeSizeUI, 50);
			}
		}
	}
);

A.Plugin.DialogIframe = DialogIframePlugin;

}, '@VERSION@' ,{skinnable:true, requires:['aui-base','aui-loading-mask','aui-resize-iframe','plugin']});
