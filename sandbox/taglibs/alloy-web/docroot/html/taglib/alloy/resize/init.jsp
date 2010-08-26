<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:resize:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _activeHandle = (java.lang.Object)request.getAttribute("alloy:resize:activeHandle");
java.lang.Object _activeHandleEl = (java.lang.Object)request.getAttribute("alloy:resize:activeHandleEl");
java.lang.Boolean _autoHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:autoHide"), false);
java.lang.Object _constrain = (java.lang.Object)request.getAttribute("alloy:resize:constrain");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:destroyed"), false);
java.lang.Object _handles = (java.lang.Object)request.getAttribute("alloy:resize:handles");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:initialized"), false);
java.lang.Number _maxHeight = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:resize:maxHeight"), 0);
java.lang.Number _maxWidth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:resize:maxWidth"), 0);
java.lang.Number _minHeight = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:resize:minHeight"), 15);
java.lang.Number _minWidth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:resize:minWidth"), 15);
java.lang.Object _node = (java.lang.Object)request.getAttribute("alloy:resize:node");
java.lang.Boolean _preserveRatio = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:preserveRatio"), false);
java.lang.Boolean _proxy = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:proxy"), false);
java.lang.Object _proxyEl = (java.lang.Object)request.getAttribute("alloy:resize:proxyEl");
java.lang.Boolean _resizing = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:resizing"), false);
java.lang.Object _tickX = (java.lang.Object)request.getAttribute("alloy:resize:tickX");
java.lang.Object _tickY = (java.lang.Object)request.getAttribute("alloy:resize:tickY");
java.lang.Boolean _wrap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:wrap"), false);
java.lang.Object _wrapTypes = (java.lang.Object)request.getAttribute("alloy:resize:wrapTypes");
java.lang.Object _wrapper = (java.lang.Object)request.getAttribute("alloy:resize:wrapper");
java.lang.Object _afterActiveHandleChange = (java.lang.Object)request.getAttribute("alloy:resize:afterActiveHandleChange");
java.lang.Object _afterActiveHandleElChange = (java.lang.Object)request.getAttribute("alloy:resize:afterActiveHandleElChange");
java.lang.Object _afterAutoHideChange = (java.lang.Object)request.getAttribute("alloy:resize:afterAutoHideChange");
java.lang.Object _afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:resize:afterConstrainChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:resize:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:resize:afterDestroyedChange");
java.lang.Object _afterHandlesChange = (java.lang.Object)request.getAttribute("alloy:resize:afterHandlesChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:resize:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:resize:afterInitializedChange");
java.lang.Object _afterMaxHeightChange = (java.lang.Object)request.getAttribute("alloy:resize:afterMaxHeightChange");
java.lang.Object _afterMaxWidthChange = (java.lang.Object)request.getAttribute("alloy:resize:afterMaxWidthChange");
java.lang.Object _afterMinHeightChange = (java.lang.Object)request.getAttribute("alloy:resize:afterMinHeightChange");
java.lang.Object _afterMinWidthChange = (java.lang.Object)request.getAttribute("alloy:resize:afterMinWidthChange");
java.lang.Object _afterNodeChange = (java.lang.Object)request.getAttribute("alloy:resize:afterNodeChange");
java.lang.Object _afterPreserveRatioChange = (java.lang.Object)request.getAttribute("alloy:resize:afterPreserveRatioChange");
java.lang.Object _afterProxyChange = (java.lang.Object)request.getAttribute("alloy:resize:afterProxyChange");
java.lang.Object _afterProxyElChange = (java.lang.Object)request.getAttribute("alloy:resize:afterProxyElChange");
java.lang.Object _afterAlign = (java.lang.Object)request.getAttribute("alloy:resize:afterAlign");
java.lang.Object _afterEnd = (java.lang.Object)request.getAttribute("alloy:resize:afterEnd");
java.lang.Object _afterMouseUp = (java.lang.Object)request.getAttribute("alloy:resize:afterMouseUp");
java.lang.Object _afterResize = (java.lang.Object)request.getAttribute("alloy:resize:afterResize");
java.lang.Object _afterStart = (java.lang.Object)request.getAttribute("alloy:resize:afterStart");
java.lang.Object _afterResizingChange = (java.lang.Object)request.getAttribute("alloy:resize:afterResizingChange");
java.lang.Object _afterTickXChange = (java.lang.Object)request.getAttribute("alloy:resize:afterTickXChange");
java.lang.Object _afterTickYChange = (java.lang.Object)request.getAttribute("alloy:resize:afterTickYChange");
java.lang.Object _afterWrapChange = (java.lang.Object)request.getAttribute("alloy:resize:afterWrapChange");
java.lang.Object _afterWrapTypesChange = (java.lang.Object)request.getAttribute("alloy:resize:afterWrapTypesChange");
java.lang.Object _afterWrapperChange = (java.lang.Object)request.getAttribute("alloy:resize:afterWrapperChange");
java.lang.Object _onActiveHandleChange = (java.lang.Object)request.getAttribute("alloy:resize:onActiveHandleChange");
java.lang.Object _onActiveHandleElChange = (java.lang.Object)request.getAttribute("alloy:resize:onActiveHandleElChange");
java.lang.Object _onAutoHideChange = (java.lang.Object)request.getAttribute("alloy:resize:onAutoHideChange");
java.lang.Object _onConstrainChange = (java.lang.Object)request.getAttribute("alloy:resize:onConstrainChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:resize:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:resize:onDestroyedChange");
java.lang.Object _onHandlesChange = (java.lang.Object)request.getAttribute("alloy:resize:onHandlesChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:resize:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:resize:onInitializedChange");
java.lang.Object _onMaxHeightChange = (java.lang.Object)request.getAttribute("alloy:resize:onMaxHeightChange");
java.lang.Object _onMaxWidthChange = (java.lang.Object)request.getAttribute("alloy:resize:onMaxWidthChange");
java.lang.Object _onMinHeightChange = (java.lang.Object)request.getAttribute("alloy:resize:onMinHeightChange");
java.lang.Object _onMinWidthChange = (java.lang.Object)request.getAttribute("alloy:resize:onMinWidthChange");
java.lang.Object _onNodeChange = (java.lang.Object)request.getAttribute("alloy:resize:onNodeChange");
java.lang.Object _onPreserveRatioChange = (java.lang.Object)request.getAttribute("alloy:resize:onPreserveRatioChange");
java.lang.Object _onProxyChange = (java.lang.Object)request.getAttribute("alloy:resize:onProxyChange");
java.lang.Object _onProxyElChange = (java.lang.Object)request.getAttribute("alloy:resize:onProxyElChange");
java.lang.Object _onAlign = (java.lang.Object)request.getAttribute("alloy:resize:onAlign");
java.lang.Object _onEnd = (java.lang.Object)request.getAttribute("alloy:resize:onEnd");
java.lang.Object _onMouseUp = (java.lang.Object)request.getAttribute("alloy:resize:onMouseUp");
java.lang.Object _onResize = (java.lang.Object)request.getAttribute("alloy:resize:onResize");
java.lang.Object _onStart = (java.lang.Object)request.getAttribute("alloy:resize:onStart");
java.lang.Object _onResizingChange = (java.lang.Object)request.getAttribute("alloy:resize:onResizingChange");
java.lang.Object _onTickXChange = (java.lang.Object)request.getAttribute("alloy:resize:onTickXChange");
java.lang.Object _onTickYChange = (java.lang.Object)request.getAttribute("alloy:resize:onTickYChange");
java.lang.Object _onWrapChange = (java.lang.Object)request.getAttribute("alloy:resize:onWrapChange");
java.lang.Object _onWrapTypesChange = (java.lang.Object)request.getAttribute("alloy:resize:onWrapTypesChange");
java.lang.Object _onWrapperChange = (java.lang.Object)request.getAttribute("alloy:resize:onWrapperChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:resize:activeHandle") != null) {
	scopedAttributes.put("activeHandle", _activeHandle);
}

if (request.getAttribute("alloy:resize:activeHandleEl") != null) {
	scopedAttributes.put("activeHandleEl", _activeHandleEl);
}

if (request.getAttribute("alloy:resize:autoHide") != null) {
	scopedAttributes.put("autoHide", _autoHide);
}

if (request.getAttribute("alloy:resize:constrain") != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (request.getAttribute("alloy:resize:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:resize:handles") != null) {
	scopedAttributes.put("handles", _handles);
}

if (request.getAttribute("alloy:resize:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:resize:maxHeight") != null) {
	scopedAttributes.put("maxHeight", _maxHeight);
}

if (request.getAttribute("alloy:resize:maxWidth") != null) {
	scopedAttributes.put("maxWidth", _maxWidth);
}

if (request.getAttribute("alloy:resize:minHeight") != null) {
	scopedAttributes.put("minHeight", _minHeight);
}

if (request.getAttribute("alloy:resize:minWidth") != null) {
	scopedAttributes.put("minWidth", _minWidth);
}

if (request.getAttribute("alloy:resize:node") != null) {
	scopedAttributes.put("node", _node);
}

if (request.getAttribute("alloy:resize:preserveRatio") != null) {
	scopedAttributes.put("preserveRatio", _preserveRatio);
}

if (request.getAttribute("alloy:resize:proxy") != null) {
	scopedAttributes.put("proxy", _proxy);
}

if (request.getAttribute("alloy:resize:proxyEl") != null) {
	scopedAttributes.put("proxyEl", _proxyEl);
}

if (request.getAttribute("alloy:resize:resizing") != null) {
	scopedAttributes.put("resizing", _resizing);
}

if (request.getAttribute("alloy:resize:tickX") != null) {
	scopedAttributes.put("tickX", _tickX);
}

if (request.getAttribute("alloy:resize:tickY") != null) {
	scopedAttributes.put("tickY", _tickY);
}

if (request.getAttribute("alloy:resize:wrap") != null) {
	scopedAttributes.put("wrap", _wrap);
}

if (request.getAttribute("alloy:resize:wrapTypes") != null) {
	scopedAttributes.put("wrapTypes", _wrapTypes);
}

if (request.getAttribute("alloy:resize:wrapper") != null) {
	scopedAttributes.put("wrapper", _wrapper);
}

if (request.getAttribute("alloy:resize:afterActiveHandleChange") != null) {
	scopedAttributes.put("afterActiveHandleChange", _afterActiveHandleChange);
}

if (request.getAttribute("alloy:resize:afterActiveHandleElChange") != null) {
	scopedAttributes.put("afterActiveHandleElChange", _afterActiveHandleElChange);
}

if (request.getAttribute("alloy:resize:afterAutoHideChange") != null) {
	scopedAttributes.put("afterAutoHideChange", _afterAutoHideChange);
}

if (request.getAttribute("alloy:resize:afterConstrainChange") != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (request.getAttribute("alloy:resize:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:resize:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:resize:afterHandlesChange") != null) {
	scopedAttributes.put("afterHandlesChange", _afterHandlesChange);
}

if (request.getAttribute("alloy:resize:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:resize:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:resize:afterMaxHeightChange") != null) {
	scopedAttributes.put("afterMaxHeightChange", _afterMaxHeightChange);
}

if (request.getAttribute("alloy:resize:afterMaxWidthChange") != null) {
	scopedAttributes.put("afterMaxWidthChange", _afterMaxWidthChange);
}

if (request.getAttribute("alloy:resize:afterMinHeightChange") != null) {
	scopedAttributes.put("afterMinHeightChange", _afterMinHeightChange);
}

if (request.getAttribute("alloy:resize:afterMinWidthChange") != null) {
	scopedAttributes.put("afterMinWidthChange", _afterMinWidthChange);
}

if (request.getAttribute("alloy:resize:afterNodeChange") != null) {
	scopedAttributes.put("afterNodeChange", _afterNodeChange);
}

if (request.getAttribute("alloy:resize:afterPreserveRatioChange") != null) {
	scopedAttributes.put("afterPreserveRatioChange", _afterPreserveRatioChange);
}

if (request.getAttribute("alloy:resize:afterProxyChange") != null) {
	scopedAttributes.put("afterProxyChange", _afterProxyChange);
}

if (request.getAttribute("alloy:resize:afterProxyElChange") != null) {
	scopedAttributes.put("afterProxyElChange", _afterProxyElChange);
}

if (request.getAttribute("alloy:resize:afterAlign") != null) {
	scopedAttributes.put("afterAlign", _afterAlign);
}

if (request.getAttribute("alloy:resize:afterEnd") != null) {
	scopedAttributes.put("afterEnd", _afterEnd);
}

if (request.getAttribute("alloy:resize:afterMouseUp") != null) {
	scopedAttributes.put("afterMouseUp", _afterMouseUp);
}

if (request.getAttribute("alloy:resize:afterResize") != null) {
	scopedAttributes.put("afterResize", _afterResize);
}

if (request.getAttribute("alloy:resize:afterStart") != null) {
	scopedAttributes.put("afterStart", _afterStart);
}

if (request.getAttribute("alloy:resize:afterResizingChange") != null) {
	scopedAttributes.put("afterResizingChange", _afterResizingChange);
}

if (request.getAttribute("alloy:resize:afterTickXChange") != null) {
	scopedAttributes.put("afterTickXChange", _afterTickXChange);
}

if (request.getAttribute("alloy:resize:afterTickYChange") != null) {
	scopedAttributes.put("afterTickYChange", _afterTickYChange);
}

if (request.getAttribute("alloy:resize:afterWrapChange") != null) {
	scopedAttributes.put("afterWrapChange", _afterWrapChange);
}

if (request.getAttribute("alloy:resize:afterWrapTypesChange") != null) {
	scopedAttributes.put("afterWrapTypesChange", _afterWrapTypesChange);
}

if (request.getAttribute("alloy:resize:afterWrapperChange") != null) {
	scopedAttributes.put("afterWrapperChange", _afterWrapperChange);
}

if (request.getAttribute("alloy:resize:onActiveHandleChange") != null) {
	scopedAttributes.put("onActiveHandleChange", _onActiveHandleChange);
}

if (request.getAttribute("alloy:resize:onActiveHandleElChange") != null) {
	scopedAttributes.put("onActiveHandleElChange", _onActiveHandleElChange);
}

if (request.getAttribute("alloy:resize:onAutoHideChange") != null) {
	scopedAttributes.put("onAutoHideChange", _onAutoHideChange);
}

if (request.getAttribute("alloy:resize:onConstrainChange") != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (request.getAttribute("alloy:resize:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:resize:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:resize:onHandlesChange") != null) {
	scopedAttributes.put("onHandlesChange", _onHandlesChange);
}

if (request.getAttribute("alloy:resize:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:resize:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:resize:onMaxHeightChange") != null) {
	scopedAttributes.put("onMaxHeightChange", _onMaxHeightChange);
}

if (request.getAttribute("alloy:resize:onMaxWidthChange") != null) {
	scopedAttributes.put("onMaxWidthChange", _onMaxWidthChange);
}

if (request.getAttribute("alloy:resize:onMinHeightChange") != null) {
	scopedAttributes.put("onMinHeightChange", _onMinHeightChange);
}

if (request.getAttribute("alloy:resize:onMinWidthChange") != null) {
	scopedAttributes.put("onMinWidthChange", _onMinWidthChange);
}

if (request.getAttribute("alloy:resize:onNodeChange") != null) {
	scopedAttributes.put("onNodeChange", _onNodeChange);
}

if (request.getAttribute("alloy:resize:onPreserveRatioChange") != null) {
	scopedAttributes.put("onPreserveRatioChange", _onPreserveRatioChange);
}

if (request.getAttribute("alloy:resize:onProxyChange") != null) {
	scopedAttributes.put("onProxyChange", _onProxyChange);
}

if (request.getAttribute("alloy:resize:onProxyElChange") != null) {
	scopedAttributes.put("onProxyElChange", _onProxyElChange);
}

if (request.getAttribute("alloy:resize:onAlign") != null) {
	scopedAttributes.put("onAlign", _onAlign);
}

if (request.getAttribute("alloy:resize:onEnd") != null) {
	scopedAttributes.put("onEnd", _onEnd);
}

if (request.getAttribute("alloy:resize:onMouseUp") != null) {
	scopedAttributes.put("onMouseUp", _onMouseUp);
}

if (request.getAttribute("alloy:resize:onResize") != null) {
	scopedAttributes.put("onResize", _onResize);
}

if (request.getAttribute("alloy:resize:onStart") != null) {
	scopedAttributes.put("onStart", _onStart);
}

if (request.getAttribute("alloy:resize:onResizingChange") != null) {
	scopedAttributes.put("onResizingChange", _onResizingChange);
}

if (request.getAttribute("alloy:resize:onTickXChange") != null) {
	scopedAttributes.put("onTickXChange", _onTickXChange);
}

if (request.getAttribute("alloy:resize:onTickYChange") != null) {
	scopedAttributes.put("onTickYChange", _onTickYChange);
}

if (request.getAttribute("alloy:resize:onWrapChange") != null) {
	scopedAttributes.put("onWrapChange", _onWrapChange);
}

if (request.getAttribute("alloy:resize:onWrapTypesChange") != null) {
	scopedAttributes.put("onWrapTypesChange", _onWrapTypesChange);
}

if (request.getAttribute("alloy:resize:onWrapperChange") != null) {
	scopedAttributes.put("onWrapperChange", _onWrapperChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>