<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:scopedAttributes");

java.lang.String _activeHandle = (java.lang.String)request.getAttribute("alloy:resize:activeHandle");
java.lang.String _activeHandleEl = (java.lang.String)request.getAttribute("alloy:resize:activeHandleEl");
java.lang.Boolean _autoHide = (java.lang.Boolean)request.getAttribute("alloy:resize:autoHide");
java.lang.String _constrain = (java.lang.String)request.getAttribute("alloy:resize:constrain");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:resize:destroyed");
java.lang.String _handles = (java.lang.String)request.getAttribute("alloy:resize:handles");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:resize:initialized");
java.lang.Number _maxHeight = (java.lang.Number)request.getAttribute("alloy:resize:maxHeight");
java.lang.Number _maxWidth = (java.lang.Number)request.getAttribute("alloy:resize:maxWidth");
java.lang.Number _minHeight = (java.lang.Number)request.getAttribute("alloy:resize:minHeight");
java.lang.Number _minWidth = (java.lang.Number)request.getAttribute("alloy:resize:minWidth");
java.lang.String _node = (java.lang.String)request.getAttribute("alloy:resize:node");
java.lang.Boolean _preserveRatio = (java.lang.Boolean)request.getAttribute("alloy:resize:preserveRatio");
java.lang.Boolean _proxy = (java.lang.Boolean)request.getAttribute("alloy:resize:proxy");
java.lang.String _proxyEl = (java.lang.String)request.getAttribute("alloy:resize:proxyEl");
java.lang.Boolean _resizing = (java.lang.Boolean)request.getAttribute("alloy:resize:resizing");
java.lang.String _tickX = (java.lang.String)request.getAttribute("alloy:resize:tickX");
java.lang.String _tickY = (java.lang.String)request.getAttribute("alloy:resize:tickY");
java.lang.Boolean _wrap = (java.lang.Boolean)request.getAttribute("alloy:resize:wrap");
java.lang.String _wrapTypes = (java.lang.String)request.getAttribute("alloy:resize:wrapTypes");
java.lang.String _wrapper = (java.lang.String)request.getAttribute("alloy:resize:wrapper");
java.lang.String _afterActiveHandleChange = (java.lang.String)request.getAttribute("alloy:resize:afterActiveHandleChange");
java.lang.String _afterActiveHandleElChange = (java.lang.String)request.getAttribute("alloy:resize:afterActiveHandleElChange");
java.lang.String _afterAutoHideChange = (java.lang.String)request.getAttribute("alloy:resize:afterAutoHideChange");
java.lang.String _afterConstrainChange = (java.lang.String)request.getAttribute("alloy:resize:afterConstrainChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:resize:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:resize:afterDestroyedChange");
java.lang.String _afterHandlesChange = (java.lang.String)request.getAttribute("alloy:resize:afterHandlesChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:resize:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:resize:afterInitializedChange");
java.lang.String _afterMaxHeightChange = (java.lang.String)request.getAttribute("alloy:resize:afterMaxHeightChange");
java.lang.String _afterMaxWidthChange = (java.lang.String)request.getAttribute("alloy:resize:afterMaxWidthChange");
java.lang.String _afterMinHeightChange = (java.lang.String)request.getAttribute("alloy:resize:afterMinHeightChange");
java.lang.String _afterMinWidthChange = (java.lang.String)request.getAttribute("alloy:resize:afterMinWidthChange");
java.lang.String _afterNodeChange = (java.lang.String)request.getAttribute("alloy:resize:afterNodeChange");
java.lang.String _afterPreserveRatioChange = (java.lang.String)request.getAttribute("alloy:resize:afterPreserveRatioChange");
java.lang.String _afterProxyChange = (java.lang.String)request.getAttribute("alloy:resize:afterProxyChange");
java.lang.String _afterProxyElChange = (java.lang.String)request.getAttribute("alloy:resize:afterProxyElChange");
java.lang.String _afterEnd = (java.lang.String)request.getAttribute("alloy:resize:afterEnd");
java.lang.String _afterMouseUp = (java.lang.String)request.getAttribute("alloy:resize:afterMouseUp");
java.lang.String _afterResize = (java.lang.String)request.getAttribute("alloy:resize:afterResize");
java.lang.String _afterStart = (java.lang.String)request.getAttribute("alloy:resize:afterStart");
java.lang.String _afterResizingChange = (java.lang.String)request.getAttribute("alloy:resize:afterResizingChange");
java.lang.String _afterTickXChange = (java.lang.String)request.getAttribute("alloy:resize:afterTickXChange");
java.lang.String _afterTickYChange = (java.lang.String)request.getAttribute("alloy:resize:afterTickYChange");
java.lang.String _afterWrapChange = (java.lang.String)request.getAttribute("alloy:resize:afterWrapChange");
java.lang.String _afterWrapTypesChange = (java.lang.String)request.getAttribute("alloy:resize:afterWrapTypesChange");
java.lang.String _afterWrapperChange = (java.lang.String)request.getAttribute("alloy:resize:afterWrapperChange");
java.lang.String _onActiveHandleChange = (java.lang.String)request.getAttribute("alloy:resize:onActiveHandleChange");
java.lang.String _onActiveHandleElChange = (java.lang.String)request.getAttribute("alloy:resize:onActiveHandleElChange");
java.lang.String _onAutoHideChange = (java.lang.String)request.getAttribute("alloy:resize:onAutoHideChange");
java.lang.String _onConstrainChange = (java.lang.String)request.getAttribute("alloy:resize:onConstrainChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:resize:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:resize:onDestroyedChange");
java.lang.String _onHandlesChange = (java.lang.String)request.getAttribute("alloy:resize:onHandlesChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:resize:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:resize:onInitializedChange");
java.lang.String _onMaxHeightChange = (java.lang.String)request.getAttribute("alloy:resize:onMaxHeightChange");
java.lang.String _onMaxWidthChange = (java.lang.String)request.getAttribute("alloy:resize:onMaxWidthChange");
java.lang.String _onMinHeightChange = (java.lang.String)request.getAttribute("alloy:resize:onMinHeightChange");
java.lang.String _onMinWidthChange = (java.lang.String)request.getAttribute("alloy:resize:onMinWidthChange");
java.lang.String _onNodeChange = (java.lang.String)request.getAttribute("alloy:resize:onNodeChange");
java.lang.String _onPreserveRatioChange = (java.lang.String)request.getAttribute("alloy:resize:onPreserveRatioChange");
java.lang.String _onProxyChange = (java.lang.String)request.getAttribute("alloy:resize:onProxyChange");
java.lang.String _onProxyElChange = (java.lang.String)request.getAttribute("alloy:resize:onProxyElChange");
java.lang.String _onEnd = (java.lang.String)request.getAttribute("alloy:resize:onEnd");
java.lang.String _onMouseUp = (java.lang.String)request.getAttribute("alloy:resize:onMouseUp");
java.lang.String _onResize = (java.lang.String)request.getAttribute("alloy:resize:onResize");
java.lang.String _onStart = (java.lang.String)request.getAttribute("alloy:resize:onStart");
java.lang.String _onResizingChange = (java.lang.String)request.getAttribute("alloy:resize:onResizingChange");
java.lang.String _onTickXChange = (java.lang.String)request.getAttribute("alloy:resize:onTickXChange");
java.lang.String _onTickYChange = (java.lang.String)request.getAttribute("alloy:resize:onTickYChange");
java.lang.String _onWrapChange = (java.lang.String)request.getAttribute("alloy:resize:onWrapChange");
java.lang.String _onWrapTypesChange = (java.lang.String)request.getAttribute("alloy:resize:onWrapTypesChange");
java.lang.String _onWrapperChange = (java.lang.String)request.getAttribute("alloy:resize:onWrapperChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_activeHandle != null) {
	scopedAttributes.put("activeHandle", _activeHandle);
}

if (_activeHandleEl != null) {
	scopedAttributes.put("activeHandleEl", _activeHandleEl);
}

if (_autoHide != null) {
	scopedAttributes.put("autoHide", _autoHide);
}

if (_constrain != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_handles != null) {
	scopedAttributes.put("handles", _handles);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_maxHeight != null) {
	scopedAttributes.put("maxHeight", _maxHeight);
}

if (_maxWidth != null) {
	scopedAttributes.put("maxWidth", _maxWidth);
}

if (_minHeight != null) {
	scopedAttributes.put("minHeight", _minHeight);
}

if (_minWidth != null) {
	scopedAttributes.put("minWidth", _minWidth);
}

if (_node != null) {
	scopedAttributes.put("node", _node);
}

if (_preserveRatio != null) {
	scopedAttributes.put("preserveRatio", _preserveRatio);
}

if (_proxy != null) {
	scopedAttributes.put("proxy", _proxy);
}

if (_proxyEl != null) {
	scopedAttributes.put("proxyEl", _proxyEl);
}

if (_resizing != null) {
	scopedAttributes.put("resizing", _resizing);
}

if (_tickX != null) {
	scopedAttributes.put("tickX", _tickX);
}

if (_tickY != null) {
	scopedAttributes.put("tickY", _tickY);
}

if (_wrap != null) {
	scopedAttributes.put("wrap", _wrap);
}

if (_wrapTypes != null) {
	scopedAttributes.put("wrapTypes", _wrapTypes);
}

if (_wrapper != null) {
	scopedAttributes.put("wrapper", _wrapper);
}

if (_afterActiveHandleChange != null) {
	scopedAttributes.put("afterActiveHandleChange", _afterActiveHandleChange);
}

if (_afterActiveHandleElChange != null) {
	scopedAttributes.put("afterActiveHandleElChange", _afterActiveHandleElChange);
}

if (_afterAutoHideChange != null) {
	scopedAttributes.put("afterAutoHideChange", _afterAutoHideChange);
}

if (_afterConstrainChange != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterHandlesChange != null) {
	scopedAttributes.put("afterHandlesChange", _afterHandlesChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterMaxHeightChange != null) {
	scopedAttributes.put("afterMaxHeightChange", _afterMaxHeightChange);
}

if (_afterMaxWidthChange != null) {
	scopedAttributes.put("afterMaxWidthChange", _afterMaxWidthChange);
}

if (_afterMinHeightChange != null) {
	scopedAttributes.put("afterMinHeightChange", _afterMinHeightChange);
}

if (_afterMinWidthChange != null) {
	scopedAttributes.put("afterMinWidthChange", _afterMinWidthChange);
}

if (_afterNodeChange != null) {
	scopedAttributes.put("afterNodeChange", _afterNodeChange);
}

if (_afterPreserveRatioChange != null) {
	scopedAttributes.put("afterPreserveRatioChange", _afterPreserveRatioChange);
}

if (_afterProxyChange != null) {
	scopedAttributes.put("afterProxyChange", _afterProxyChange);
}

if (_afterProxyElChange != null) {
	scopedAttributes.put("afterProxyElChange", _afterProxyElChange);
}

if (_afterEnd != null) {
	scopedAttributes.put("afterEnd", _afterEnd);
}

if (_afterMouseUp != null) {
	scopedAttributes.put("afterMouseUp", _afterMouseUp);
}

if (_afterResize != null) {
	scopedAttributes.put("afterResize", _afterResize);
}

if (_afterStart != null) {
	scopedAttributes.put("afterStart", _afterStart);
}

if (_afterResizingChange != null) {
	scopedAttributes.put("afterResizingChange", _afterResizingChange);
}

if (_afterTickXChange != null) {
	scopedAttributes.put("afterTickXChange", _afterTickXChange);
}

if (_afterTickYChange != null) {
	scopedAttributes.put("afterTickYChange", _afterTickYChange);
}

if (_afterWrapChange != null) {
	scopedAttributes.put("afterWrapChange", _afterWrapChange);
}

if (_afterWrapTypesChange != null) {
	scopedAttributes.put("afterWrapTypesChange", _afterWrapTypesChange);
}

if (_afterWrapperChange != null) {
	scopedAttributes.put("afterWrapperChange", _afterWrapperChange);
}

if (_onActiveHandleChange != null) {
	scopedAttributes.put("onActiveHandleChange", _onActiveHandleChange);
}

if (_onActiveHandleElChange != null) {
	scopedAttributes.put("onActiveHandleElChange", _onActiveHandleElChange);
}

if (_onAutoHideChange != null) {
	scopedAttributes.put("onAutoHideChange", _onAutoHideChange);
}

if (_onConstrainChange != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onHandlesChange != null) {
	scopedAttributes.put("onHandlesChange", _onHandlesChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onMaxHeightChange != null) {
	scopedAttributes.put("onMaxHeightChange", _onMaxHeightChange);
}

if (_onMaxWidthChange != null) {
	scopedAttributes.put("onMaxWidthChange", _onMaxWidthChange);
}

if (_onMinHeightChange != null) {
	scopedAttributes.put("onMinHeightChange", _onMinHeightChange);
}

if (_onMinWidthChange != null) {
	scopedAttributes.put("onMinWidthChange", _onMinWidthChange);
}

if (_onNodeChange != null) {
	scopedAttributes.put("onNodeChange", _onNodeChange);
}

if (_onPreserveRatioChange != null) {
	scopedAttributes.put("onPreserveRatioChange", _onPreserveRatioChange);
}

if (_onProxyChange != null) {
	scopedAttributes.put("onProxyChange", _onProxyChange);
}

if (_onProxyElChange != null) {
	scopedAttributes.put("onProxyElChange", _onProxyElChange);
}

if (_onEnd != null) {
	scopedAttributes.put("onEnd", _onEnd);
}

if (_onMouseUp != null) {
	scopedAttributes.put("onMouseUp", _onMouseUp);
}

if (_onResize != null) {
	scopedAttributes.put("onResize", _onResize);
}

if (_onStart != null) {
	scopedAttributes.put("onStart", _onStart);
}

if (_onResizingChange != null) {
	scopedAttributes.put("onResizingChange", _onResizingChange);
}

if (_onTickXChange != null) {
	scopedAttributes.put("onTickXChange", _onTickXChange);
}

if (_onTickYChange != null) {
	scopedAttributes.put("onTickYChange", _onTickYChange);
}

if (_onWrapChange != null) {
	scopedAttributes.put("onWrapChange", _onWrapChange);
}

if (_onWrapTypesChange != null) {
	scopedAttributes.put("onWrapTypesChange", _onWrapTypesChange);
}

if (_onWrapperChange != null) {
	scopedAttributes.put("onWrapperChange", _onWrapperChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>