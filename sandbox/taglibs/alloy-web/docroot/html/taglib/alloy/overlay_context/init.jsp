<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:overlay-context:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:overlay-context:align");
java.lang.Object _overlaycontextBodyContent = (java.lang.Object)request.getAttribute("alloy:overlay-context:overlaycontextBodyContent");
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:overlay-context:boundingBox");
java.lang.Boolean _cancellableHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:cancellableHide"), true);
java.lang.Object _centered = (java.lang.Object)request.getAttribute("alloy:overlay-context:centered");
java.lang.Object _constrain = (java.lang.Object)request.getAttribute("alloy:overlay-context:constrain");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:overlay-context:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:overlay-context:cssClass");
java.lang.Object _currentNode = (java.lang.Object)request.getAttribute("alloy:overlay-context:currentNode");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:disabled"), false);
java.lang.Object _fillHeight = (java.lang.Object)request.getAttribute("alloy:overlay-context:fillHeight");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:focused"), false);
java.lang.Object _footerContent = (java.lang.Object)request.getAttribute("alloy:overlay-context:footerContent");
java.lang.Object _headerContent = (java.lang.Object)request.getAttribute("alloy:overlay-context:headerContent");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:overlay-context:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:overlay-context:hideClass");
java.lang.Number _hideDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:hideDelay"), 0);
java.lang.Object _hideOn = (java.lang.Object)request.getAttribute("alloy:overlay-context:hideOn");
java.lang.Boolean _hideOnDocumentClick = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:hideOnDocumentClick"), true);
java.lang.Object _overlaycontextId = (java.lang.Object)request.getAttribute("alloy:overlay-context:overlaycontextId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:initialized"), false);
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:preventOverlap"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:rendered"), false);
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:shim"), false);
java.lang.Number _showDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:showDelay"), 0);
java.lang.Object _showOn = (java.lang.Object)request.getAttribute("alloy:overlay-context:showOn");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:overlay-context:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:overlay-context:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:tabIndex"), 0);
java.lang.Object _trigger = (java.lang.Object)request.getAttribute("alloy:overlay-context:trigger");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:visible"), false);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:overlay-context:width");
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:x"), 0);
java.lang.Object _xy = (java.lang.Object)request.getAttribute("alloy:overlay-context:xy");
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:y"), 0);
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:zIndex"), 0);
java.lang.Object _afterAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterAlignChange");
java.lang.Object _afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterBodyContentChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterBoundingBoxChange");
java.lang.Object _afterCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCancellableHideChange");
java.lang.Object _afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCenteredChange");
java.lang.Object _afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterConstrainChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCssClassChange");
java.lang.Object _afterCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCurrentNodeChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterDisabledChange");
java.lang.Object _afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterFillHeightChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterFocusedChange");
java.lang.Object _afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterFooterContentChange");
java.lang.Object _afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHeaderContentChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideClassChange");
java.lang.Object _afterHideDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideDelayChange");
java.lang.Object _afterHideOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideOnChange");
java.lang.Object _afterHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideOnDocumentClickChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterInitializedChange");
java.lang.Object _afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterPreventOverlapChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterRenderedChange");
java.lang.Object _afterShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterShimChange");
java.lang.Object _afterShowDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterShowDelayChange");
java.lang.Object _afterShowOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterShowOnChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterTabIndexChange");
java.lang.Object _afterTriggerChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterTriggerChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterWidthChange");
java.lang.Object _afterXChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterXChange");
java.lang.Object _afterXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterXyChange");
java.lang.Object _afterYChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterYChange");
java.lang.Object _afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterZIndexChange");
java.lang.Object _onAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onAlignChange");
java.lang.Object _onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onBodyContentChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onBoundingBoxChange");
java.lang.Object _onCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCancellableHideChange");
java.lang.Object _onCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCenteredChange");
java.lang.Object _onConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onConstrainChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCssClassChange");
java.lang.Object _onCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCurrentNodeChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-context:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onDisabledChange");
java.lang.Object _onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onFillHeightChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onFocusedChange");
java.lang.Object _onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onFooterContentChange");
java.lang.Object _onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHeaderContentChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideClassChange");
java.lang.Object _onHideDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideDelayChange");
java.lang.Object _onHideOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideOnChange");
java.lang.Object _onHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideOnDocumentClickChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:overlay-context:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onInitializedChange");
java.lang.Object _onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onPreventOverlapChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onRenderedChange");
java.lang.Object _onShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onShimChange");
java.lang.Object _onShowDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onShowDelayChange");
java.lang.Object _onShowOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onShowOnChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onTabIndexChange");
java.lang.Object _onTriggerChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onTriggerChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-context:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:overlay-context:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onWidthChange");
java.lang.Object _onXChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onXChange");
java.lang.Object _onXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onXyChange");
java.lang.Object _onYChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onYChange");
java.lang.Object _onZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onZIndexChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:overlay-context:align") != null) {
	scopedAttributes.put("align", _align);
}

if (request.getAttribute("alloy:overlay-context:overlaycontextBodyContent") != null) {
	scopedAttributes.put("overlaycontextBodyContent", _overlaycontextBodyContent);
}

if (request.getAttribute("alloy:overlay-context:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:overlay-context:cancellableHide") != null) {
	scopedAttributes.put("cancellableHide", _cancellableHide);
}

if (request.getAttribute("alloy:overlay-context:centered") != null) {
	scopedAttributes.put("centered", _centered);
}

if (request.getAttribute("alloy:overlay-context:constrain") != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (request.getAttribute("alloy:overlay-context:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:overlay-context:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:overlay-context:currentNode") != null) {
	scopedAttributes.put("currentNode", _currentNode);
}

if (request.getAttribute("alloy:overlay-context:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:overlay-context:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:overlay-context:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:overlay-context:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:overlay-context:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:overlay-context:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:overlay-context:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:overlay-context:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:overlay-context:hideDelay") != null) {
	scopedAttributes.put("hideDelay", _hideDelay);
}

if (request.getAttribute("alloy:overlay-context:hideOn") != null) {
	scopedAttributes.put("hideOn", _hideOn);
}

if (request.getAttribute("alloy:overlay-context:hideOnDocumentClick") != null) {
	scopedAttributes.put("hideOnDocumentClick", _hideOnDocumentClick);
}

if (request.getAttribute("alloy:overlay-context:overlaycontextId") != null) {
	scopedAttributes.put("overlaycontextId", _overlaycontextId);
}

if (request.getAttribute("alloy:overlay-context:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:overlay-context:preventOverlap") != null) {
	scopedAttributes.put("preventOverlap", _preventOverlap);
}

if (request.getAttribute("alloy:overlay-context:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:overlay-context:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:overlay-context:shim") != null) {
	scopedAttributes.put("shim", _shim);
}

if (request.getAttribute("alloy:overlay-context:showDelay") != null) {
	scopedAttributes.put("showDelay", _showDelay);
}

if (request.getAttribute("alloy:overlay-context:showOn") != null) {
	scopedAttributes.put("showOn", _showOn);
}

if (request.getAttribute("alloy:overlay-context:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:overlay-context:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:overlay-context:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:overlay-context:trigger") != null) {
	scopedAttributes.put("trigger", _trigger);
}

if (request.getAttribute("alloy:overlay-context:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:overlay-context:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:overlay-context:x") != null) {
	scopedAttributes.put("x", _x);
}

if (request.getAttribute("alloy:overlay-context:xy") != null) {
	scopedAttributes.put("xy", _xy);
}

if (request.getAttribute("alloy:overlay-context:y") != null) {
	scopedAttributes.put("y", _y);
}

if (request.getAttribute("alloy:overlay-context:zIndex") != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (request.getAttribute("alloy:overlay-context:afterAlignChange") != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (request.getAttribute("alloy:overlay-context:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:overlay-context:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:overlay-context:afterCancellableHideChange") != null) {
	scopedAttributes.put("afterCancellableHideChange", _afterCancellableHideChange);
}

if (request.getAttribute("alloy:overlay-context:afterCenteredChange") != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (request.getAttribute("alloy:overlay-context:afterConstrainChange") != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (request.getAttribute("alloy:overlay-context:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:overlay-context:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:overlay-context:afterCurrentNodeChange") != null) {
	scopedAttributes.put("afterCurrentNodeChange", _afterCurrentNodeChange);
}

if (request.getAttribute("alloy:overlay-context:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:overlay-context:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:overlay-context:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:overlay-context:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:overlay-context:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:overlay-context:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:overlay-context:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:overlay-context:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:overlay-context:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:overlay-context:afterHideDelayChange") != null) {
	scopedAttributes.put("afterHideDelayChange", _afterHideDelayChange);
}

if (request.getAttribute("alloy:overlay-context:afterHideOnChange") != null) {
	scopedAttributes.put("afterHideOnChange", _afterHideOnChange);
}

if (request.getAttribute("alloy:overlay-context:afterHideOnDocumentClickChange") != null) {
	scopedAttributes.put("afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:overlay-context:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:overlay-context:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:overlay-context:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:overlay-context:afterPreventOverlapChange") != null) {
	scopedAttributes.put("afterPreventOverlapChange", _afterPreventOverlapChange);
}

if (request.getAttribute("alloy:overlay-context:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:overlay-context:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:overlay-context:afterShimChange") != null) {
	scopedAttributes.put("afterShimChange", _afterShimChange);
}

if (request.getAttribute("alloy:overlay-context:afterShowDelayChange") != null) {
	scopedAttributes.put("afterShowDelayChange", _afterShowDelayChange);
}

if (request.getAttribute("alloy:overlay-context:afterShowOnChange") != null) {
	scopedAttributes.put("afterShowOnChange", _afterShowOnChange);
}

if (request.getAttribute("alloy:overlay-context:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:overlay-context:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:overlay-context:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:overlay-context:afterTriggerChange") != null) {
	scopedAttributes.put("afterTriggerChange", _afterTriggerChange);
}

if (request.getAttribute("alloy:overlay-context:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:overlay-context:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:overlay-context:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:overlay-context:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:overlay-context:afterXChange") != null) {
	scopedAttributes.put("afterXChange", _afterXChange);
}

if (request.getAttribute("alloy:overlay-context:afterXyChange") != null) {
	scopedAttributes.put("afterXyChange", _afterXyChange);
}

if (request.getAttribute("alloy:overlay-context:afterYChange") != null) {
	scopedAttributes.put("afterYChange", _afterYChange);
}

if (request.getAttribute("alloy:overlay-context:afterZIndexChange") != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (request.getAttribute("alloy:overlay-context:onAlignChange") != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (request.getAttribute("alloy:overlay-context:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:overlay-context:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:overlay-context:onCancellableHideChange") != null) {
	scopedAttributes.put("onCancellableHideChange", _onCancellableHideChange);
}

if (request.getAttribute("alloy:overlay-context:onCenteredChange") != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (request.getAttribute("alloy:overlay-context:onConstrainChange") != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (request.getAttribute("alloy:overlay-context:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:overlay-context:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:overlay-context:onCurrentNodeChange") != null) {
	scopedAttributes.put("onCurrentNodeChange", _onCurrentNodeChange);
}

if (request.getAttribute("alloy:overlay-context:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:overlay-context:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:overlay-context:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:overlay-context:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:overlay-context:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:overlay-context:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:overlay-context:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:overlay-context:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:overlay-context:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:overlay-context:onHideDelayChange") != null) {
	scopedAttributes.put("onHideDelayChange", _onHideDelayChange);
}

if (request.getAttribute("alloy:overlay-context:onHideOnChange") != null) {
	scopedAttributes.put("onHideOnChange", _onHideOnChange);
}

if (request.getAttribute("alloy:overlay-context:onHideOnDocumentClickChange") != null) {
	scopedAttributes.put("onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:overlay-context:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:overlay-context:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:overlay-context:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:overlay-context:onPreventOverlapChange") != null) {
	scopedAttributes.put("onPreventOverlapChange", _onPreventOverlapChange);
}

if (request.getAttribute("alloy:overlay-context:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:overlay-context:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:overlay-context:onShimChange") != null) {
	scopedAttributes.put("onShimChange", _onShimChange);
}

if (request.getAttribute("alloy:overlay-context:onShowDelayChange") != null) {
	scopedAttributes.put("onShowDelayChange", _onShowDelayChange);
}

if (request.getAttribute("alloy:overlay-context:onShowOnChange") != null) {
	scopedAttributes.put("onShowOnChange", _onShowOnChange);
}

if (request.getAttribute("alloy:overlay-context:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:overlay-context:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:overlay-context:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:overlay-context:onTriggerChange") != null) {
	scopedAttributes.put("onTriggerChange", _onTriggerChange);
}

if (request.getAttribute("alloy:overlay-context:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:overlay-context:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:overlay-context:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:overlay-context:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (request.getAttribute("alloy:overlay-context:onXChange") != null) {
	scopedAttributes.put("onXChange", _onXChange);
}

if (request.getAttribute("alloy:overlay-context:onXyChange") != null) {
	scopedAttributes.put("onXyChange", _onXyChange);
}

if (request.getAttribute("alloy:overlay-context:onYChange") != null) {
	scopedAttributes.put("onYChange", _onYChange);
}

if (request.getAttribute("alloy:overlay-context:onZIndexChange") != null) {
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