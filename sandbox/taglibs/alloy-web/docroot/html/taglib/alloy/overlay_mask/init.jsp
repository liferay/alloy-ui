<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-mask:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-mask:scopedAttributes");

java.lang.String _alignPoints = (java.lang.String)request.getAttribute("alloy:overlay-mask:alignPoints");
java.lang.String _background = (java.lang.String)request.getAttribute("alloy:overlay-mask:background");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:overlay-mask:boundingBox");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:overlay-mask:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:overlay-mask:cssClass");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:overlay-mask:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:overlay-mask:disabled");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:overlay-mask:focused");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:overlay-mask:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:overlay-mask:hideClass");
java.lang.String _overlaymaskId = (java.lang.String)request.getAttribute("alloy:overlay-mask:overlaymaskId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:overlay-mask:initialized");
java.lang.Number _opacity = (java.lang.Number)request.getAttribute("alloy:overlay-mask:opacity");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:overlay-mask:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:overlay-mask:rendered");
java.lang.Boolean _shim = (java.lang.Boolean)request.getAttribute("alloy:overlay-mask:shim");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:overlay-mask:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:overlay-mask:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:overlay-mask:tabIndex");
java.lang.String _target = (java.lang.String)request.getAttribute("alloy:overlay-mask:target");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:overlay-mask:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:overlay-mask:width");
java.lang.Number _zIndex = (java.lang.Number)request.getAttribute("alloy:overlay-mask:zIndex");
java.lang.String _afterAlignPointsChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterAlignPointsChange");
java.lang.String _afterBackgroundChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterBackgroundChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterBoundingBoxChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterCssClassChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterDisabledChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterFocusedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterHideClassChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterInitializedChange");
java.lang.String _afterOpacityChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterOpacityChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterRenderedChange");
java.lang.String _afterShimChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterShimChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterSrcNodeChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterTabIndexChange");
java.lang.String _afterTargetChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterTargetChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterWidthChange");
java.lang.String _afterZIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:afterZIndexChange");
java.lang.String _onAlignPointsChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onAlignPointsChange");
java.lang.String _onBackgroundChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onBackgroundChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onBoundingBoxChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onCssClassChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:overlay-mask:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onDisabledChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onFocusedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onHideClassChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:overlay-mask:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onInitializedChange");
java.lang.String _onOpacityChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onOpacityChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onRenderedChange");
java.lang.String _onShimChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onShimChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onSrcNodeChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onTabIndexChange");
java.lang.String _onTargetChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onTargetChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:overlay-mask:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:overlay-mask:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onWidthChange");
java.lang.String _onZIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-mask:onZIndexChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_alignPoints != null) {
	scopedAttributes.put("alignPoints", _alignPoints);
}

if (_background != null) {
	scopedAttributes.put("background", _background);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
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

if (_focused != null) {
	scopedAttributes.put("focused", _focused);
}

if (_height != null) {
	scopedAttributes.put("height", _height);
}

if (_hideClass != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (_overlaymaskId != null) {
	scopedAttributes.put("overlaymaskId", _overlaymaskId);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_opacity != null) {
	scopedAttributes.put("opacity", _opacity);
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

if (_target != null) {
	scopedAttributes.put("target", _target);
}

if (_visible != null) {
	scopedAttributes.put("visible", _visible);
}

if (_width != null) {
	scopedAttributes.put("width", _width);
}

if (_zIndex != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (_afterAlignPointsChange != null) {
	scopedAttributes.put("afterAlignPointsChange", _afterAlignPointsChange);
}

if (_afterBackgroundChange != null) {
	scopedAttributes.put("afterBackgroundChange", _afterBackgroundChange);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
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

if (_afterFocusedChange != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
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

if (_afterOpacityChange != null) {
	scopedAttributes.put("afterOpacityChange", _afterOpacityChange);
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

if (_afterTargetChange != null) {
	scopedAttributes.put("afterTargetChange", _afterTargetChange);
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

if (_afterZIndexChange != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (_onAlignPointsChange != null) {
	scopedAttributes.put("onAlignPointsChange", _onAlignPointsChange);
}

if (_onBackgroundChange != null) {
	scopedAttributes.put("onBackgroundChange", _onBackgroundChange);
}

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
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

if (_onFocusedChange != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
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

if (_onOpacityChange != null) {
	scopedAttributes.put("onOpacityChange", _onOpacityChange);
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

if (_onTargetChange != null) {
	scopedAttributes.put("onTargetChange", _onTargetChange);
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