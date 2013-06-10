var Lang = A.Lang,
	isFunction = Lang.isFunction,

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
				validator: isFunction,
				value: function() {
					var instance = this;

					instance.node.on('load', A.bind(instance.fire, instance, 'load'));
				}
			},

			closeOnEscape: {
				value: true
			},

			gutter: {
				setter: '_setGutter',
				valueFn: '_gutterValueFn'
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

				instance.afterHostMethod(
					'_fillHeight',
					A.bind(instance._setNodeDimensions, instance),
					instance
				);

				instance.afterHostMethod(
					'_uiSetWidth',
					A.bind(instance._setNodeDimensions, instance),
					instance
				);
			},

			destructor: function() {
				var instance = this;

				instance._detachEventHandles();

				instance._host.set('bodyContent', instance._previousBodyContent);

				instance.node.remove(true);
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

				if (event.src !== UI) {
					instance._uiSetUri(event.newVal, event.prevVal);
				}
			},

			_bindEvents: function() {
				var instance = this;

				instance.afterHostEvent('visibleChange', instance._afterDialogVisibleChange);

				instance.after('uriChange', instance._afterUriChange);

				instance.node.on('load', A.bind(instance._onLoadIframe, instance));

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
									instance._host.hide();
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

            _gutterValueFn: function() {
                return function() {
                    var instance = this,
                        bodyNode = instance._host.bodyNode;

                    return {
                        bottom: bodyNode.getStyle('paddingBottom'),
                        left: bodyNode.getStyle('paddingLeft'),
                        right: bodyNode.getStyle('paddingRight'),
                        top: bodyNode.getStyle('paddingTop')
                    };
                };
            },

			_onLoadIframe: function() {
				var instance = this;

				instance._setIframeContentGutter();

				instance._setNodeDimensions();
			},

			_plugIframe: function() {
				var instance = this;

				var iframeTpl = Lang.sub(
					TPL_IFRAME,
					{
						cssClass: instance.get('iframeCssClass'),
						id: instance.get('iframeId'),
						uri: instance.get('uri')
					}
				);

				var bodyNode = instance._host.bodyNode;

				var node = A.Node.create(iframeTpl);

				instance._host.set('bodyContent', node);

				bodyNode.addClass(CSS_IFRAME_BD);

				instance._bodyNode = bodyNode;
				instance.node = node;
			},

            _setGutter: function(val) {
                var instance = this;

                if (isFunction(val)) {
                    val = val.call(instance);
                }

                return val;
            },

			_setIframeContentGutter: function() {
				var instance = this,
					bodyNode = instance._host.bodyNode,
					gutter = instance.get('gutter'),
					iframeWindow = instance.node.get('contentWindow'),
					iframeDoc = iframeWindow.get('document');

				iframeDoc.get('documentElement').setStyles({
					paddingBottom: gutter.bottom,
					paddingLeft: gutter.left,
					paddingRight: gutter.right,
					paddingTop: gutter.top
				});

				bodyNode.setStyles({
					height: bodyNode.get('offsetHeight'),
					padding: '0'
				});
			},

			_setIframeCssClass: function(value) {
				BUFFER_CSS_CLASS[1] = value;

				return BUFFER_CSS_CLASS.join(' ');
			},

			_setNodeDimensions: function() {
				var instance = this,
					bodyNode = instance._host.bodyNode,
					node = instance.node;

				if (bodyNode && node) {
					node.setStyles({
						height: bodyNode.get('offsetHeight'),
						width: bodyNode.get('offsetWidth')
					});
				}
			},

			_uiSetUri: function(newVal, prevVal) {
				var instance = this;

				var loadingMask = instance._bodyNode.loadingmask;

				var oldUrl = prevVal.split('#');
				var newUrl = newVal.split('#');

				if (newUrl[0] !== oldUrl[0] && loadingMask) {
					loadingMask.show();
				}

				instance.node.attr('src', newVal);
			}
		}
	}
);

A.Plugin.DialogIframe = DialogIframePlugin;