<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-base:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-base:scopedAttributes");

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:overlay-base:align");
java.lang.String _overlaybaseBodyContent = (java.lang.String)request.getAttribute("alloy:overlay-base:overlaybaseBodyContent");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:overlay-base:boundingBox");
java.lang.String _centered = (java.lang.String)request.getAttribute("alloy:overlay-base:centered");
java.lang.String _constrain = (java.lang.String)request.getAttribute("alloy:overlay-base:constrain");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:overlay-base:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:overlay-base:cssClass");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:overlay-base:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:overlay-base:disabled");
java.lang.String _fillHeight = (java.lang.String)request.getAttribute("alloy:overlay-base:fillHeight");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:overlay-base:focused");
java.lang.String _footerContent = (java.lang.String)request.getAttribute("alloy:overlay-base:footerContent");
java.lang.String _headerContent = (java.lang.String)request.getAttribute("alloy:overlay-base:headerContent");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:overlay-base:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:overlay-base:hideClass");
java.lang.String _overlaybaseId = (java.lang.String)request.getAttribute("alloy:overlay-base:overlaybaseId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:overlay-base:initialized");
java.lang.Boolean _preventOverlap = (java.lang.Boolean)request.getAttribute("alloy:overlay-base:preventOverlap");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:overlay-base:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:overlay-base:rendered");
java.lang.Boolean _shim = (java.lang.Boolean)request.getAttribute("alloy:overlay-base:shim");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:overlay-base:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:overlay-base:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:overlay-base:tabIndex");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:overlay-base:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:overlay-base:width");
java.lang.Number _x = (java.lang.Number)request.getAttribute("alloy:overlay-base:x");
java.lang.String _xy = (java.lang.String)request.getAttribute("alloy:overlay-base:xy");
java.lang.Number _y = (java.lang.Number)request.getAttribute("alloy:overlay-base:y");
java.lang.Number _zIndex = (java.lang.Number)request.getAttribute("alloy:overlay-base:zIndex");
java.lang.String _afterAlignChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterAlignChange");
java.lang.String _afterBodyContentChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterBodyContentChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterBoundingBoxChange");
java.lang.String _afterCenteredChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterCenteredChange");
java.lang.String _afterConstrainChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterConstrainChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterCssClassChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:overlay-base:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterDisabledChange");
java.lang.String _afterFillHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterFillHeightChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterFocusedChange");
java.lang.String _afterFooterContentChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterFooterContentChange");
java.lang.String _afterHeaderContentChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterHeaderContentChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterHideClassChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:overlay-base:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterInitializedChange");
java.lang.String _afterPreventOverlapChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterPreventOverlapChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterRenderedChange");
java.lang.String _afterShimChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterShimChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterSrcNodeChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterTabIndexChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:overlay-base:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:overlay-base:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterWidthChange");
java.lang.String _afterXChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterXChange");
java.lang.String _afterXyChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterXyChange");
java.lang.String _afterYChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterYChange");
java.lang.String _afterZIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-base:afterZIndexChange");
java.lang.String _onAlignChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onAlignChange");
java.lang.String _onBodyContentChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onBodyContentChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onBoundingBoxChange");
java.lang.String _onCenteredChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onCenteredChange");
java.lang.String _onConstrainChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onConstrainChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onCssClassChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:overlay-base:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onDisabledChange");
java.lang.String _onFillHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onFillHeightChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onFocusedChange");
java.lang.String _onFooterContentChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onFooterContentChange");
java.lang.String _onHeaderContentChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onHeaderContentChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onHideClassChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:overlay-base:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onInitializedChange");
java.lang.String _onPreventOverlapChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onPreventOverlapChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onRenderedChange");
java.lang.String _onShimChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onShimChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onSrcNodeChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onTabIndexChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:overlay-base:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:overlay-base:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onWidthChange");
java.lang.String _onXChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onXChange");
java.lang.String _onXyChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onXyChange");
java.lang.String _onYChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onYChange");
java.lang.String _onZIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-base:onZIndexChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_align != null) {
	scopedAttributes.put("align", _align);
}

if (_overlaybaseBodyContent != null) {
	scopedAttributes.put("overlaybaseBodyContent", _overlaybaseBodyContent);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_centered != null) {
	scopedAttributes.put("centered", _centered);
}

if (_constrain != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (_contentBox != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (_cssClass != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_disabled != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (_fillHeight != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (_focused != null) {
	scopedAttributes.put("focused", _focused);
}

if (_footerContent != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (_headerContent != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (_height != null) {
	scopedAttributes.put("height", _height);
}

if (_hideClass != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (_overlaybaseId != null) {
	scopedAttributes.put("overlaybaseId", _overlaybaseId);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_preventOverlap != null) {
	scopedAttributes.put("preventOverlap", _preventOverlap);
}

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (_shim != null) {
	scopedAttributes.put("shim", _shim);
}

if (_srcNode != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (_strings != null) {
	scopedAttributes.put("strings", _strings);
}

if (_tabIndex != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (_visible != null) {
	scopedAttributes.put("visible", _visible);
}

if (_width != null) {
	scopedAttributes.put("width", _width);
}

if (_x != null) {
	scopedAttributes.put("x", _x);
}

if (_xy != null) {
	scopedAttributes.put("xy", _xy);
}

if (_y != null) {
	scopedAttributes.put("y", _y);
}

if (_zIndex != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (_afterAlignChange != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (_afterBodyContentChange != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (_afterCenteredChange != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (_afterConstrainChange != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (_afterContentBoxChange != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (_afterCssClassChange != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterDisabledChange != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (_afterFillHeightChange != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (_afterFocusedChange != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (_afterFooterContentChange != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (_afterHeaderContentChange != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (_afterHeightChange != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (_afterHideClassChange != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (_afterIdChange != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterPreventOverlapChange != null) {
	scopedAttributes.put("afterPreventOverlapChange", _afterPreventOverlapChange);
}

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (_afterShimChange != null) {
	scopedAttributes.put("afterShimChange", _afterShimChange);
}

if (_afterSrcNodeChange != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (_afterStringsChange != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (_afterTabIndexChange != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (_afterVisibleChange != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (_afterContentUpdate != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (_afterRender != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (_afterWidthChange != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (_afterXChange != null) {
	scopedAttributes.put("afterXChange", _afterXChange);
}

if (_afterXyChange != null) {
	scopedAttributes.put("afterXyChange", _afterXyChange);
}

if (_afterYChange != null) {
	scopedAttributes.put("afterYChange", _afterYChange);
}

if (_afterZIndexChange != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (_onAlignChange != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (_onBodyContentChange != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (_onCenteredChange != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (_onConstrainChange != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (_onContentBoxChange != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (_onCssClassChange != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onDisabledChange != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (_onFillHeightChange != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (_onFocusedChange != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (_onFooterContentChange != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (_onHeaderContentChange != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (_onHeightChange != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (_onHideClassChange != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (_onIdChange != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onPreventOverlapChange != null) {
	scopedAttributes.put("onPreventOverlapChange", _onPreventOverlapChange);
}

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (_onShimChange != null) {
	scopedAttributes.put("onShimChange", _onShimChange);
}

if (_onSrcNodeChange != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (_onStringsChange != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (_onTabIndexChange != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (_onVisibleChange != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (_onContentUpdate != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (_onRender != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (_onWidthChange != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (_onXChange != null) {
	scopedAttributes.put("onXChange", _onXChange);
}

if (_onXyChange != null) {
	scopedAttributes.put("onXyChange", _onXyChange);
}

if (_onYChange != null) {
	scopedAttributes.put("onYChange", _onYChange);
}

if (_onZIndexChange != null) {
	scopedAttributes.put("onZIndexChange", _onZIndexChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>