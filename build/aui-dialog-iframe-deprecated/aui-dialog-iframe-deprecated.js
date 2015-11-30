YUI.add('aui-dialog-iframe-deprecated', function (A, NAME) {

var Lang = A.Lang,
    isFunction = Lang.isFunction,

    getClassName = A.getClassName,

    IFRAME = 'iframe',
    BIND_LOAD_HANDLER = 'bindLoadHandler',
    BODY_CONTENT = 'bodyContent',
    CLOSE_ON_ESCAPE = 'closeOnEscape',
    CONTENT_WINDOW = 'contentWindow',
    DETACH = 'detach',
    DOCUMENT = 'document',
    DOCUMENT_ELEMENT = 'documentElement',
    GUTTER = 'gutter',
    HOST = 'host',
    IFRAME_CSS_CLASS = 'iframeCssClass',
    IFRAME_ID = 'iframeId',
    KEY = 'key',
    LOAD = 'load',
    OFFSET_HEIGHT = 'offsetHeight',
    OFFSET_WIDTH = 'offsetWidth',
    PADDING_BOTTOM = 'paddingBottom',
    PADDING_LEFT = 'paddingLeft',
    PADDING_RIGHT = 'paddingRight',
    PADDING_TOP = 'paddingTop',
    RENDER_UI = 'renderUI',
    RENDERED = 'rendered',
    SRC = 'src',
    UNLOAD = 'unload',
    URI = 'uri',
    URI_CHANGE = 'uriChange',
    VISIBLE_CHANGE = 'visibleChange',

    CSS_IFRAME_BD = getClassName('dialog', IFRAME, 'bd'),
    CSS_IFRAME_NODE = getClassName('dialog', IFRAME, 'node'),
    CSS_IFRAME_ROOT_NODE = getClassName('dialog', IFRAME, 'root', 'node'),

    BUFFER_CSS_CLASS = [CSS_IFRAME_NODE],

    TPL_IFRAME = '<iframe class="{cssClass}" frameborder="0" id="{id}" name="{id}" src="{uri}"></iframe>',

    UI = A.Widget.UI_SRC,
    UI_SRC = {
        src: UI
    };

var DialogIframePlugin = A.Component.create({
    ATTRS: {
        bindLoadHandler: {
            validator: isFunction,
            value: function() {
                var instance = this;

                instance.node.on('load', A.bind(instance.fire, instance, 'load'));
            }
        },

        closeOnEscape: {
            validator: Lang.isBoolean,
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

        uri: {}
    },

    EXTENDS: A.Plugin.Base,
    NAME: IFRAME,
    NS: IFRAME,
    prototype: {
        initializer: function() {
            var instance = this;

            instance._host = instance.get(HOST);

            instance._eventHandles = [];

            instance.publish(
                LOAD, {
                    defaultFn: instance._defaultLoadIframeFn
                }
            );

            if (instance._host.get(RENDERED)) {
                instance._initializeIframe();
            }
            else {
                instance.afterHostMethod(
                    RENDER_UI,
                    A.debounce(instance._afterRenderUI, 50, instance),
                    instance
                );
            }

            instance.afterHostMethod(
                '_uiSetVisible',
                A.bind(instance._afterHostUISetVisible, instance),
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

            instance.after(CLOSE_ON_ESCAPE + 'Change', instance._uiSetCloseOnEscape, instance);
        },

        destructor: function() {
            var instance = this;

            instance._bodyNode.loadingmask.destroy();

            instance._detachEventHandles();

            instance._host.set(BODY_CONTENT, instance._previousBodyContent);

            instance.node.remove(true);
        },

        _afterHostUISetVisible: function(val) {
            var instance = this;

            if (val) {
                instance._host._fillHeight();
            }
        },

        _afterRenderUI: function() {
            var instance = this;

            instance._initializeIframe();
        },

        _afterUriChange: function(event) {
            var instance = this;

            if (event.src !== UI) {
                instance._uiSetUri(event.newVal, event.prevVal);
            }
        },

        _bindEvents: function() {
            var instance = this;

            instance.afterHostEvent(VISIBLE_CHANGE, instance._afterDialogVisibleChange);

            instance.after(URI_CHANGE, instance._afterUriChange);

            instance.node.on(LOAD, A.bind(instance._onLoadIframe, instance));

            var bindLoadHandler = instance.get(BIND_LOAD_HANDLER);

            bindLoadHandler.call(instance);
        },

        _detachEventHandles: function() {
            var instance = this;

            var eventHandles = instance._eventHandles;

            A.Array.invoke(eventHandles, DETACH);

            if (instance._eventCloseOnEscapeHandle) {
                instance._eventCloseOnEscapeHandle.detach();
            }

            eventHandles.length = 0;
        },

        _defaultLoadIframeFn: function() {
            var instance = this;

            var node = instance.node;

            try {
                var iframeWindow = node.get(CONTENT_WINDOW);

                iframeWindow.once(UNLOAD, instance._detachEventHandles, instance);

                var iframeDoc = iframeWindow.get(DOCUMENT);

                iframeDoc.get(DOCUMENT_ELEMENT).addClass(CSS_IFRAME_ROOT_NODE);

                instance.set(URI, iframeDoc.get('location.href'), UI_SRC);

                instance._uiSetCloseOnEscape();
            }
            catch (e) {}

            instance._bodyNode.loadingmask.hide();

            instance._host._syncUIPosAlign();
        },

        _gutterValueFn: function() {
            return function() {
                var instance = this,
                    bodyNode = instance._host.bodyNode;

                return {
                    bottom: bodyNode.getStyle(PADDING_BOTTOM),
                    left: bodyNode.getStyle(PADDING_LEFT),
                    right: bodyNode.getStyle(PADDING_RIGHT),
                    top: bodyNode.getStyle(PADDING_TOP)
                };
            };
        },

        _initializeIframe: function() {
            var instance = this;

            instance._plugIframe();

            instance._bindEvents();

            var bodyNode = instance._bodyNode;

            bodyNode.plug(A.LoadingMask);

            var loadingMask = bodyNode.loadingmask;

            loadingMask.overlayMask.after(VISIBLE_CHANGE, instance._afterMaskVisibleChange, instance);

            loadingMask.show();
        },

        _onLoadIframe: function() {
            var instance = this;

            instance._setIframeContentGutter();

            instance._setNodeDimensions();
        },

        _plugIframe: function() {
            var instance = this;

            var iframeTpl = Lang.sub(
                TPL_IFRAME, {
                    cssClass: instance.get(IFRAME_CSS_CLASS),
                    id: instance.get(IFRAME_ID),
                    uri: instance.get(URI)
                }
            );

            var bodyNode = instance._host.bodyNode;

            var node = A.Node.create(iframeTpl);

            instance._host.set(BODY_CONTENT, node);

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
                gutter = instance.get(GUTTER),
                iframeWindow = instance.node.get(CONTENT_WINDOW),
                iframeDoc = iframeWindow.get(DOCUMENT);

            iframeDoc.get(DOCUMENT_ELEMENT).setStyles({
                paddingBottom: gutter.bottom,
                paddingLeft: gutter.left,
                paddingRight: gutter.right,
                paddingTop: gutter.top
            });

            bodyNode.setStyles({
                height: bodyNode.get(OFFSET_HEIGHT),
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
                    height: bodyNode.get(OFFSET_HEIGHT),
                    width: bodyNode.get(OFFSET_WIDTH)
                });
            }
        },

        _uiSetCloseOnEscape: function() {
            var instance = this;

            if (instance.get(CLOSE_ON_ESCAPE)) {
                if (!instance._eventCloseOnEscapeHandle) {
                    try {
                        var iframeWindow = instance.node.get(CONTENT_WINDOW);

                        var iframeDoc = iframeWindow.get(DOCUMENT);

                        instance._eventCloseOnEscapeHandle = A.on(
                            KEY,
                            function() {
                                instance._host.hide();
                            }, [iframeDoc],
                            'down:27'
                        );
                    }
                    catch (exception) {}
                }
            }
            else if (instance._eventCloseOnEscapeHandle) {
                instance._eventCloseOnEscapeHandle.detach();

                instance._eventCloseOnEscapeHandle = null;
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

            instance.node.attr(SRC, newVal);
        }
    }
});

A.Plugin.DialogIframe = DialogIframePlugin;


}, '3.0.1', {
    "requires": [
        "plugin",
        "array-invoke",
        "aui-base-deprecated",
        "aui-loading-mask-deprecated"
    ],
    "skinnable": true
});
