<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-mask:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-mask:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	if ((String)request.getAttribute("alloy:overlay-mask:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:overlay-mask:align");
java.lang.String _alignPoints = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:alignPoints"));
java.lang.String _background = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:background"));
java.lang.String _overlaymaskBodyContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:overlaymaskBodyContent"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:boundingBox"));
java.lang.String _centered = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:centered"));
java.lang.String _constrain = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:constrain"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:cssClass"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:disabled"));
java.lang.String _fillHeight = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:fillHeight"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:focused"));
java.lang.String _footerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:footerContent"));
java.lang.String _headerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:headerContent"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:hideClass"));
java.lang.String _overlaymaskId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:overlaymaskId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:initialized"));
java.lang.Number _opacity = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:opacity"));
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:preventOverlap"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:render"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:rendered"));
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:shim"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:overlay-mask:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:tabIndex"));
java.lang.String _target = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:target"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:width"));
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:x"));
java.lang.String _xy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:xy"));
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:y"));
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:zIndex"));
java.lang.String _afterAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterAlignChange"));
java.lang.String _afterAlignPointsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterAlignPointsChange"));
java.lang.String _afterBackgroundChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterBackgroundChange"));
java.lang.String _afterBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterBodyContentChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterBoundingBoxChange"));
java.lang.String _afterCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterCenteredChange"));
java.lang.String _afterConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterConstrainChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterCssClassChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterDisabledChange"));
java.lang.String _afterFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterFillHeightChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterFocusedChange"));
java.lang.String _afterFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterFooterContentChange"));
java.lang.String _afterHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterHeaderContentChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterHideClassChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterInitializedChange"));
java.lang.String _afterOpacityChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterOpacityChange"));
java.lang.String _afterPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterPreventOverlapChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterRenderedChange"));
java.lang.String _afterShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterShimChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterSrcNodeChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterTabIndexChange"));
java.lang.String _afterTargetChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterTargetChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterWidthChange"));
java.lang.String _afterXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterXChange"));
java.lang.String _afterXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterXyChange"));
java.lang.String _afterYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterYChange"));
java.lang.String _afterZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:afterZIndexChange"));
java.lang.String _onAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onAlignChange"));
java.lang.String _onAlignPointsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onAlignPointsChange"));
java.lang.String _onBackgroundChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onBackgroundChange"));
java.lang.String _onBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onBodyContentChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onBoundingBoxChange"));
java.lang.String _onCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onCenteredChange"));
java.lang.String _onConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onConstrainChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onCssClassChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onDisabledChange"));
java.lang.String _onFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onFillHeightChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onFocusedChange"));
java.lang.String _onFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onFooterContentChange"));
java.lang.String _onHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onHeaderContentChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onHideClassChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onInitializedChange"));
java.lang.String _onOpacityChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onOpacityChange"));
java.lang.String _onPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onPreventOverlapChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onRenderedChange"));
java.lang.String _onShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onShimChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onSrcNodeChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onTabIndexChange"));
java.lang.String _onTargetChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onTargetChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onWidthChange"));
java.lang.String _onXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onXChange"));
java.lang.String _onXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onXyChange"));
java.lang.String _onYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onYChange"));
java.lang.String _onZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:onZIndexChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:overlay-mask:align") != null) {
	scopedAttributes.put("align", _align);
}

if (request.getAttribute("alloy:overlay-mask:alignPoints") != null) {
	scopedAttributes.put("alignPoints", _alignPoints);
}

if (request.getAttribute("alloy:overlay-mask:background") != null) {
	scopedAttributes.put("background", _background);
}

if (request.getAttribute("alloy:overlay-mask:overlaymaskBodyContent") != null) {
	scopedAttributes.put("overlaymaskBodyContent", _overlaymaskBodyContent);
}

if (request.getAttribute("alloy:overlay-mask:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:overlay-mask:centered") != null) {
	scopedAttributes.put("centered", _centered);
}

if (request.getAttribute("alloy:overlay-mask:constrain") != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (request.getAttribute("alloy:overlay-mask:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:overlay-mask:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:overlay-mask:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:overlay-mask:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:overlay-mask:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:overlay-mask:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:overlay-mask:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:overlay-mask:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:overlay-mask:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:overlay-mask:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:overlay-mask:overlaymaskId") != null) {
	scopedAttributes.put("overlaymaskId", _overlaymaskId);
}

if (request.getAttribute("alloy:overlay-mask:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:overlay-mask:opacity") != null) {
	scopedAttributes.put("opacity", _opacity);
}

if (request.getAttribute("alloy:overlay-mask:preventOverlap") != null) {
	scopedAttributes.put("preventOverlap", _preventOverlap);
}

if (request.getAttribute("alloy:overlay-mask:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:overlay-mask:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:overlay-mask:shim") != null) {
	scopedAttributes.put("shim", _shim);
}

if (request.getAttribute("alloy:overlay-mask:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:overlay-mask:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:overlay-mask:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:overlay-mask:target") != null) {
	scopedAttributes.put("target", _target);
}

if (request.getAttribute("alloy:overlay-mask:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:overlay-mask:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:overlay-mask:x") != null) {
	scopedAttributes.put("x", _x);
}

if (request.getAttribute("alloy:overlay-mask:xy") != null) {
	scopedAttributes.put("xy", _xy);
}

if (request.getAttribute("alloy:overlay-mask:y") != null) {
	scopedAttributes.put("y", _y);
}

if (request.getAttribute("alloy:overlay-mask:zIndex") != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (request.getAttribute("alloy:overlay-mask:afterAlignChange") != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (request.getAttribute("alloy:overlay-mask:afterAlignPointsChange") != null) {
	scopedAttributes.put("afterAlignPointsChange", _afterAlignPointsChange);
}

if (request.getAttribute("alloy:overlay-mask:afterBackgroundChange") != null) {
	scopedAttributes.put("afterBackgroundChange", _afterBackgroundChange);
}

if (request.getAttribute("alloy:overlay-mask:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:overlay-mask:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:overlay-mask:afterCenteredChange") != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (request.getAttribute("alloy:overlay-mask:afterConstrainChange") != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (request.getAttribute("alloy:overlay-mask:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:overlay-mask:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:overlay-mask:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:overlay-mask:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:overlay-mask:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:overlay-mask:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:overlay-mask:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:overlay-mask:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:overlay-mask:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:overlay-mask:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:overlay-mask:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:overlay-mask:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:overlay-mask:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:overlay-mask:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:overlay-mask:afterOpacityChange") != null) {
	scopedAttributes.put("afterOpacityChange", _afterOpacityChange);
}

if (request.getAttribute("alloy:overlay-mask:afterPreventOverlapChange") != null) {
	scopedAttributes.put("afterPreventOverlapChange", _afterPreventOverlapChange);
}

if (request.getAttribute("alloy:overlay-mask:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:overlay-mask:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:overlay-mask:afterShimChange") != null) {
	scopedAttributes.put("afterShimChange", _afterShimChange);
}

if (request.getAttribute("alloy:overlay-mask:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:overlay-mask:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:overlay-mask:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:overlay-mask:afterTargetChange") != null) {
	scopedAttributes.put("afterTargetChange", _afterTargetChange);
}

if (request.getAttribute("alloy:overlay-mask:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:overlay-mask:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:overlay-mask:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:overlay-mask:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:overlay-mask:afterXChange") != null) {
	scopedAttributes.put("afterXChange", _afterXChange);
}

if (request.getAttribute("alloy:overlay-mask:afterXyChange") != null) {
	scopedAttributes.put("afterXyChange", _afterXyChange);
}

if (request.getAttribute("alloy:overlay-mask:afterYChange") != null) {
	scopedAttributes.put("afterYChange", _afterYChange);
}

if (request.getAttribute("alloy:overlay-mask:afterZIndexChange") != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (request.getAttribute("alloy:overlay-mask:onAlignChange") != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (request.getAttribute("alloy:overlay-mask:onAlignPointsChange") != null) {
	scopedAttributes.put("onAlignPointsChange", _onAlignPointsChange);
}

if (request.getAttribute("alloy:overlay-mask:onBackgroundChange") != null) {
	scopedAttributes.put("onBackgroundChange", _onBackgroundChange);
}

if (request.getAttribute("alloy:overlay-mask:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:overlay-mask:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:overlay-mask:onCenteredChange") != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (request.getAttribute("alloy:overlay-mask:onConstrainChange") != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (request.getAttribute("alloy:overlay-mask:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:overlay-mask:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:overlay-mask:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:overlay-mask:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:overlay-mask:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:overlay-mask:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:overlay-mask:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:overlay-mask:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:overlay-mask:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:overlay-mask:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:overlay-mask:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:overlay-mask:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:overlay-mask:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:overlay-mask:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:overlay-mask:onOpacityChange") != null) {
	scopedAttributes.put("onOpacityChange", _onOpacityChange);
}

if (request.getAttribute("alloy:overlay-mask:onPreventOverlapChange") != null) {
	scopedAttributes.put("onPreventOverlapChange", _onPreventOverlapChange);
}

if (request.getAttribute("alloy:overlay-mask:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:overlay-mask:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:overlay-mask:onShimChange") != null) {
	scopedAttributes.put("onShimChange", _onShimChange);
}

if (request.getAttribute("alloy:overlay-mask:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:overlay-mask:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:overlay-mask:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:overlay-mask:onTargetChange") != null) {
	scopedAttributes.put("onTargetChange", _onTargetChange);
}

if (request.getAttribute("alloy:overlay-mask:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:overlay-mask:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:overlay-mask:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:overlay-mask:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (request.getAttribute("alloy:overlay-mask:onXChange") != null) {
	scopedAttributes.put("onXChange", _onXChange);
}

if (request.getAttribute("alloy:overlay-mask:onXyChange") != null) {
	scopedAttributes.put("onXyChange", _onXyChange);
}

if (request.getAttribute("alloy:overlay-mask:onYChange") != null) {
	scopedAttributes.put("onYChange", _onYChange);
}

if (request.getAttribute("alloy:overlay-mask:onZIndexChange") != null) {
	scopedAttributes.put("onZIndexChange", _onZIndexChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>