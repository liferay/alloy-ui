<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:resize:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:resize:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:resize:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.String _activeHandle = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:activeHandle"));
java.lang.Object _activeHandleEl = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:activeHandleEl"));
java.lang.Boolean _autoHide = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:resize:autoHide"), false);
java.lang.Object _constrain = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:constrain"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:resize:destroyed"), false);
java.lang.Object _handles = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:handles"), all);
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:resize:initialized"), false);
java.lang.Number _maxHeight = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:resize:maxHeight")), 2147483647);
java.lang.Number _maxWidth = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:resize:maxWidth")), 2147483647);
java.lang.Number _minHeight = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:resize:minHeight")), 15);
java.lang.Number _minWidth = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:resize:minWidth")), 15);
java.lang.Object _node = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:node"));
java.lang.Boolean _preserveRatio = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:resize:preserveRatio"), false);
java.lang.Boolean _proxy = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:resize:proxy"), false);
java.lang.String _proxyEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:proxyEl"));
java.lang.Boolean _resizing = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:resize:resizing"), false);
java.lang.Object _tickX = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:tickX"), false);
java.lang.Object _tickY = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:tickY"), false);
java.lang.Boolean _wrap = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:resize:wrap"), false);
java.lang.Object _wrapTypes = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:wrapTypes"), /canvas|textarea|input|select|button|img/i);
java.lang.String _wrapper = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:wrapper"), "div");
java.lang.Object _afterActiveHandleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterActiveHandleChange"));
java.lang.Object _afterActiveHandleElChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterActiveHandleElChange"));
java.lang.Object _afterAutoHideChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterAutoHideChange"));
java.lang.Object _afterConstrainChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterConstrainChange"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterDestroyedChange"));
java.lang.Object _afterHandlesChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterHandlesChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterInitializedChange"));
java.lang.Object _afterMaxHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterMaxHeightChange"));
java.lang.Object _afterMaxWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterMaxWidthChange"));
java.lang.Object _afterMinHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterMinHeightChange"));
java.lang.Object _afterMinWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterMinWidthChange"));
java.lang.Object _afterNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterNodeChange"));
java.lang.Object _afterPreserveRatioChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterPreserveRatioChange"));
java.lang.Object _afterProxyChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterProxyChange"));
java.lang.Object _afterProxyElChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterProxyElChange"));
java.lang.Object _afterAlign = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterAlign"));
java.lang.Object _afterEnd = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterEnd"));
java.lang.Object _afterMouseUp = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterMouseUp"));
java.lang.Object _afterResize = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterResize"));
java.lang.Object _afterStart = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterStart"));
java.lang.Object _afterResizingChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterResizingChange"));
java.lang.Object _afterTickXChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterTickXChange"));
java.lang.Object _afterTickYChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterTickYChange"));
java.lang.Object _afterWrapChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterWrapChange"));
java.lang.Object _afterWrapTypesChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterWrapTypesChange"));
java.lang.Object _afterWrapperChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:afterWrapperChange"));
java.lang.Object _onActiveHandleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onActiveHandleChange"));
java.lang.Object _onActiveHandleElChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onActiveHandleElChange"));
java.lang.Object _onAutoHideChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onAutoHideChange"));
java.lang.Object _onConstrainChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onConstrainChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onDestroyedChange"));
java.lang.Object _onHandlesChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onHandlesChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onInitializedChange"));
java.lang.Object _onMaxHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onMaxHeightChange"));
java.lang.Object _onMaxWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onMaxWidthChange"));
java.lang.Object _onMinHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onMinHeightChange"));
java.lang.Object _onMinWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onMinWidthChange"));
java.lang.Object _onNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onNodeChange"));
java.lang.Object _onPreserveRatioChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onPreserveRatioChange"));
java.lang.Object _onProxyChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onProxyChange"));
java.lang.Object _onProxyElChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onProxyElChange"));
java.lang.Object _onAlign = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onAlign"));
java.lang.Object _onEnd = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onEnd"));
java.lang.Object _onMouseUp = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onMouseUp"));
java.lang.Object _onResize = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onResize"));
java.lang.Object _onStart = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onStart"));
java.lang.Object _onResizingChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onResizingChange"));
java.lang.Object _onTickXChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onTickXChange"));
java.lang.Object _onTickYChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onTickYChange"));
java.lang.Object _onWrapChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onWrapChange"));
java.lang.Object _onWrapTypesChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onWrapTypesChange"));
java.lang.Object _onWrapperChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:resize:onWrapperChange"));

String uniqueId = StringPool.BLANK;

boolean useJavaScript = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useJavaScript"), true);
boolean useMarkup = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useMarkup"), true);

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	String prefix = StringPool.POUND.concat(uniqueId);

	if (!hasBoundingBox) {
		_boundingBox = prefix.concat("BoundingBox");

		options.put("boundingBox", _boundingBox);
	}

	if (!hasSrcNode && !hasContentBox) {
		_srcNode = prefix.concat("SrcNode");

		options.put("srcNode", _srcNode);
	}

	if (!hasSrcNode && hasContentBox) {
		_contentBox = prefix.concat("ContentBox");

		options.put("contentBox", _contentBox);
	}
}

_updateOptions(options, "activeHandle", _activeHandle);
_updateOptions(options, "activeHandleEl", _activeHandleEl);
_updateOptions(options, "autoHide", _autoHide);
_updateOptions(options, "constrain", _constrain);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "handles", _handles);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "maxHeight", _maxHeight);
_updateOptions(options, "maxWidth", _maxWidth);
_updateOptions(options, "minHeight", _minHeight);
_updateOptions(options, "minWidth", _minWidth);
_updateOptions(options, "node", _node);
_updateOptions(options, "preserveRatio", _preserveRatio);
_updateOptions(options, "proxy", _proxy);
_updateOptions(options, "proxyEl", _proxyEl);
_updateOptions(options, "resizing", _resizing);
_updateOptions(options, "tickX", _tickX);
_updateOptions(options, "tickY", _tickY);
_updateOptions(options, "wrap", _wrap);
_updateOptions(options, "wrapTypes", _wrapTypes);
_updateOptions(options, "wrapper", _wrapper);
_updateOptions(options, "afterActiveHandleChange", _afterActiveHandleChange);
_updateOptions(options, "afterActiveHandleElChange", _afterActiveHandleElChange);
_updateOptions(options, "afterAutoHideChange", _afterAutoHideChange);
_updateOptions(options, "afterConstrainChange", _afterConstrainChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterHandlesChange", _afterHandlesChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterMaxHeightChange", _afterMaxHeightChange);
_updateOptions(options, "afterMaxWidthChange", _afterMaxWidthChange);
_updateOptions(options, "afterMinHeightChange", _afterMinHeightChange);
_updateOptions(options, "afterMinWidthChange", _afterMinWidthChange);
_updateOptions(options, "afterNodeChange", _afterNodeChange);
_updateOptions(options, "afterPreserveRatioChange", _afterPreserveRatioChange);
_updateOptions(options, "afterProxyChange", _afterProxyChange);
_updateOptions(options, "afterProxyElChange", _afterProxyElChange);
_updateOptions(options, "afterAlign", _afterAlign);
_updateOptions(options, "afterEnd", _afterEnd);
_updateOptions(options, "afterMouseUp", _afterMouseUp);
_updateOptions(options, "afterResize", _afterResize);
_updateOptions(options, "afterStart", _afterStart);
_updateOptions(options, "afterResizingChange", _afterResizingChange);
_updateOptions(options, "afterTickXChange", _afterTickXChange);
_updateOptions(options, "afterTickYChange", _afterTickYChange);
_updateOptions(options, "afterWrapChange", _afterWrapChange);
_updateOptions(options, "afterWrapTypesChange", _afterWrapTypesChange);
_updateOptions(options, "afterWrapperChange", _afterWrapperChange);
_updateOptions(options, "onActiveHandleChange", _onActiveHandleChange);
_updateOptions(options, "onActiveHandleElChange", _onActiveHandleElChange);
_updateOptions(options, "onAutoHideChange", _onAutoHideChange);
_updateOptions(options, "onConstrainChange", _onConstrainChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onHandlesChange", _onHandlesChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onMaxHeightChange", _onMaxHeightChange);
_updateOptions(options, "onMaxWidthChange", _onMaxWidthChange);
_updateOptions(options, "onMinHeightChange", _onMinHeightChange);
_updateOptions(options, "onMinWidthChange", _onMinWidthChange);
_updateOptions(options, "onNodeChange", _onNodeChange);
_updateOptions(options, "onPreserveRatioChange", _onPreserveRatioChange);
_updateOptions(options, "onProxyChange", _onProxyChange);
_updateOptions(options, "onProxyElChange", _onProxyElChange);
_updateOptions(options, "onAlign", _onAlign);
_updateOptions(options, "onEnd", _onEnd);
_updateOptions(options, "onMouseUp", _onMouseUp);
_updateOptions(options, "onResize", _onResize);
_updateOptions(options, "onStart", _onStart);
_updateOptions(options, "onResizingChange", _onResizingChange);
_updateOptions(options, "onTickXChange", _onTickXChange);
_updateOptions(options, "onTickYChange", _onTickYChange);
_updateOptions(options, "onWrapChange", _onWrapChange);
_updateOptions(options, "onWrapTypesChange", _onWrapTypesChange);
_updateOptions(options, "onWrapperChange", _onWrapperChange);
%>

<%@ include file="init-ext.jsp" %>