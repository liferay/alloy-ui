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
java.lang.String _overlaycontextBodyContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:overlaycontextBodyContent"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:boundingBox"));
java.lang.Boolean _cancellableHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:cancellableHide"));
java.lang.String _centered = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:centered"));
java.lang.String _constrain = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:constrain"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:cssClass"));
java.lang.String _currentNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:currentNode"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:disabled"));
java.lang.String _fillHeight = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:fillHeight"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:focused"));
java.lang.String _footerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:footerContent"));
java.lang.String _headerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:headerContent"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:hideClass"));
java.lang.Number _hideDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:hideDelay"));
java.lang.String _hideOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:hideOn"));
java.lang.Boolean _hideOnDocumentClick = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:hideOnDocumentClick"));
java.lang.String _overlaycontextId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:overlaycontextId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:initialized"));
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:preventOverlap"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:render"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:rendered"));
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:shim"));
java.lang.Number _showDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:showDelay"));
java.lang.String _showOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:showOn"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:overlay-context:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:tabIndex"));
java.lang.String _trigger = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:trigger"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:width"));
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:x"));
java.lang.String _xy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:xy"));
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:y"));
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:zIndex"));
java.lang.String _afterAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterAlignChange"));
java.lang.String _afterBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterBodyContentChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterBoundingBoxChange"));
java.lang.String _afterCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterCancellableHideChange"));
java.lang.String _afterCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterCenteredChange"));
java.lang.String _afterConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterConstrainChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterCssClassChange"));
java.lang.String _afterCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterCurrentNodeChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterDisabledChange"));
java.lang.String _afterFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterFillHeightChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterFocusedChange"));
java.lang.String _afterFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterFooterContentChange"));
java.lang.String _afterHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterHeaderContentChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterHideClassChange"));
java.lang.String _afterHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterHideDelayChange"));
java.lang.String _afterHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterHideOnChange"));
java.lang.String _afterHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterHideOnDocumentClickChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterInitializedChange"));
java.lang.String _afterPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterPreventOverlapChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterRenderedChange"));
java.lang.String _afterShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterShimChange"));
java.lang.String _afterShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterShowDelayChange"));
java.lang.String _afterShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterShowOnChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterSrcNodeChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterTabIndexChange"));
java.lang.String _afterTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterTriggerChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterWidthChange"));
java.lang.String _afterXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterXChange"));
java.lang.String _afterXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterXyChange"));
java.lang.String _afterYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterYChange"));
java.lang.String _afterZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:afterZIndexChange"));
java.lang.String _onAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onAlignChange"));
java.lang.String _onBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onBodyContentChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onBoundingBoxChange"));
java.lang.String _onCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onCancellableHideChange"));
java.lang.String _onCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onCenteredChange"));
java.lang.String _onConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onConstrainChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onCssClassChange"));
java.lang.String _onCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onCurrentNodeChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onDisabledChange"));
java.lang.String _onFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onFillHeightChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onFocusedChange"));
java.lang.String _onFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onFooterContentChange"));
java.lang.String _onHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onHeaderContentChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onHideClassChange"));
java.lang.String _onHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onHideDelayChange"));
java.lang.String _onHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onHideOnChange"));
java.lang.String _onHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onHideOnDocumentClickChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onInitializedChange"));
java.lang.String _onPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onPreventOverlapChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onRenderedChange"));
java.lang.String _onShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onShimChange"));
java.lang.String _onShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onShowDelayChange"));
java.lang.String _onShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onShowOnChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onSrcNodeChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onTabIndexChange"));
java.lang.String _onTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onTriggerChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onWidthChange"));
java.lang.String _onXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onXChange"));
java.lang.String _onXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onXyChange"));
java.lang.String _onYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onYChange"));
java.lang.String _onZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:onZIndexChange"));
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