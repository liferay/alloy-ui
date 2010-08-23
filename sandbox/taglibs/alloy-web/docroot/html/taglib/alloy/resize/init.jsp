<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:scopedAttributes");

String uniqueId = StringPool.BLANK;
String srcNode = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean((java.io.Serializable)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId));
}

java.lang.String _activeHandle = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:activeHandle"));
java.lang.String _activeHandleEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:activeHandleEl"));
java.lang.Boolean _autoHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:autoHide"));
java.lang.String _constrain = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:constrain"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:destroyed"));
java.lang.String _handles = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:handles"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:initialized"));
java.lang.Number _maxHeight = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:resize:maxHeight"));
java.lang.Number _maxWidth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:resize:maxWidth"));
java.lang.Number _minHeight = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:resize:minHeight"));
java.lang.Number _minWidth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:resize:minWidth"));
java.lang.String _node = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:node"));
java.lang.Boolean _preserveRatio = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:preserveRatio"));
java.lang.Boolean _proxy = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:proxy"));
java.lang.String _proxyEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:proxyEl"));
java.lang.Boolean _resizing = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:resizing"));
java.lang.String _tickX = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:tickX"));
java.lang.String _tickY = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:tickY"));
java.lang.Boolean _wrap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:resize:wrap"));
java.lang.String _wrapTypes = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:wrapTypes"));
java.lang.String _wrapper = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:wrapper"));
java.lang.String _afterActiveHandleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterActiveHandleChange"));
java.lang.String _afterActiveHandleElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterActiveHandleElChange"));
java.lang.String _afterAutoHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterAutoHideChange"));
java.lang.String _afterConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterConstrainChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterDestroyedChange"));
java.lang.String _afterHandlesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterHandlesChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterInitializedChange"));
java.lang.String _afterMaxHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterMaxHeightChange"));
java.lang.String _afterMaxWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterMaxWidthChange"));
java.lang.String _afterMinHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterMinHeightChange"));
java.lang.String _afterMinWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterMinWidthChange"));
java.lang.String _afterNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterNodeChange"));
java.lang.String _afterPreserveRatioChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterPreserveRatioChange"));
java.lang.String _afterProxyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterProxyChange"));
java.lang.String _afterProxyElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterProxyElChange"));
java.lang.String _afterAlign = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterAlign"));
java.lang.String _afterEnd = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterEnd"));
java.lang.String _afterMouseUp = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterMouseUp"));
java.lang.String _afterResize = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterResize"));
java.lang.String _afterStart = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterStart"));
java.lang.String _afterResizingChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterResizingChange"));
java.lang.String _afterTickXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterTickXChange"));
java.lang.String _afterTickYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterTickYChange"));
java.lang.String _afterWrapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterWrapChange"));
java.lang.String _afterWrapTypesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterWrapTypesChange"));
java.lang.String _afterWrapperChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:afterWrapperChange"));
java.lang.String _onActiveHandleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onActiveHandleChange"));
java.lang.String _onActiveHandleElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onActiveHandleElChange"));
java.lang.String _onAutoHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onAutoHideChange"));
java.lang.String _onConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onConstrainChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onDestroyedChange"));
java.lang.String _onHandlesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onHandlesChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onInitializedChange"));
java.lang.String _onMaxHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onMaxHeightChange"));
java.lang.String _onMaxWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onMaxWidthChange"));
java.lang.String _onMinHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onMinHeightChange"));
java.lang.String _onMinWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onMinWidthChange"));
java.lang.String _onNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onNodeChange"));
java.lang.String _onPreserveRatioChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onPreserveRatioChange"));
java.lang.String _onProxyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onProxyChange"));
java.lang.String _onProxyElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onProxyElChange"));
java.lang.String _onAlign = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onAlign"));
java.lang.String _onEnd = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onEnd"));
java.lang.String _onMouseUp = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onMouseUp"));
java.lang.String _onResize = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onResize"));
java.lang.String _onStart = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onStart"));
java.lang.String _onResizingChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onResizingChange"));
java.lang.String _onTickXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onTickXChange"));
java.lang.String _onTickYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onTickYChange"));
java.lang.String _onWrapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onWrapChange"));
java.lang.String _onWrapTypesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onWrapTypesChange"));
java.lang.String _onWrapperChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:onWrapperChange"));
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