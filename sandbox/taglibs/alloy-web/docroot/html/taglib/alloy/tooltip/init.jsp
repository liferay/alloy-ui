<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tooltip:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tooltip:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	if ((String)request.getAttribute("alloy:tooltip:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:tooltip:align");
java.lang.Object _anim = (java.lang.Object)request.getAttribute("alloy:tooltip:anim");
java.lang.String _arrow = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:arrow"));
java.lang.String _tooltipBodyContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:tooltipBodyContent"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:boundingBox"));
java.lang.Boolean _cancellableHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:cancellableHide"));
java.lang.String _centered = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:centered"));
java.lang.String _constrain = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:constrain"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:cssClass"));
java.lang.String _currentNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:currentNode"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:disabled"));
java.lang.String _fillHeight = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:fillHeight"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:focused"));
java.lang.String _footerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:footerContent"));
java.lang.String _headerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:headerContent"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:hideClass"));
java.lang.Number _hideDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tooltip:hideDelay"));
java.lang.String _hideOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:hideOn"));
java.lang.Boolean _hideOnDocumentClick = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:hideOnDocumentClick"));
java.lang.String _tooltipId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:tooltipId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:initialized"));
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:preventOverlap"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:render"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:rendered"));
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:shim"));
java.lang.Boolean _showArrow = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:showArrow"));
java.lang.Number _showDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tooltip:showDelay"));
java.lang.String _showOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:showOn"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:srcNode"));
java.lang.Boolean _stack = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:stack"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:tooltip:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tooltip:tabIndex"));
java.lang.Boolean _title = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:title"));
java.lang.String _trigger = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:trigger"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tooltip:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:width"));
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tooltip:x"));
java.lang.String _xy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:xy"));
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tooltip:y"));
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tooltip:zIndex"));
java.lang.String _afterAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterAlignChange"));
java.lang.String _afterAnimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterAnimChange"));
java.lang.String _afterArrowChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterArrowChange"));
java.lang.String _afterBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterBodyContentChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterBoundingBoxChange"));
java.lang.String _afterCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterCancellableHideChange"));
java.lang.String _afterCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterCenteredChange"));
java.lang.String _afterConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterConstrainChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterCssClassChange"));
java.lang.String _afterCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterCurrentNodeChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterDisabledChange"));
java.lang.String _afterFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterFillHeightChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterFocusedChange"));
java.lang.String _afterFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterFooterContentChange"));
java.lang.String _afterHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterHeaderContentChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterHideClassChange"));
java.lang.String _afterHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterHideDelayChange"));
java.lang.String _afterHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterHideOnChange"));
java.lang.String _afterHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterHideOnDocumentClickChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterInitializedChange"));
java.lang.String _afterPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterPreventOverlapChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterRenderedChange"));
java.lang.String _afterShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterShimChange"));
java.lang.String _afterShowArrowChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterShowArrowChange"));
java.lang.String _afterShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterShowDelayChange"));
java.lang.String _afterShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterShowOnChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterSrcNodeChange"));
java.lang.String _afterStackChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterStackChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterTabIndexChange"));
java.lang.String _afterTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterTitleChange"));
java.lang.String _afterTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterTriggerChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterWidthChange"));
java.lang.String _afterXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterXChange"));
java.lang.String _afterXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterXyChange"));
java.lang.String _afterYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterYChange"));
java.lang.String _afterZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:afterZIndexChange"));
java.lang.String _onAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onAlignChange"));
java.lang.String _onAnimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onAnimChange"));
java.lang.String _onArrowChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onArrowChange"));
java.lang.String _onBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onBodyContentChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onBoundingBoxChange"));
java.lang.String _onCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onCancellableHideChange"));
java.lang.String _onCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onCenteredChange"));
java.lang.String _onConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onConstrainChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onCssClassChange"));
java.lang.String _onCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onCurrentNodeChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onDisabledChange"));
java.lang.String _onFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onFillHeightChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onFocusedChange"));
java.lang.String _onFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onFooterContentChange"));
java.lang.String _onHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onHeaderContentChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onHideClassChange"));
java.lang.String _onHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onHideDelayChange"));
java.lang.String _onHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onHideOnChange"));
java.lang.String _onHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onHideOnDocumentClickChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onInitializedChange"));
java.lang.String _onPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onPreventOverlapChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onRenderedChange"));
java.lang.String _onShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onShimChange"));
java.lang.String _onShowArrowChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onShowArrowChange"));
java.lang.String _onShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onShowDelayChange"));
java.lang.String _onShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onShowOnChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onSrcNodeChange"));
java.lang.String _onStackChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onStackChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onTabIndexChange"));
java.lang.String _onTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onTitleChange"));
java.lang.String _onTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onTriggerChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onWidthChange"));
java.lang.String _onXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onXChange"));
java.lang.String _onXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onXyChange"));
java.lang.String _onYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onYChange"));
java.lang.String _onZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:onZIndexChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:tooltip:align") != null) {
	scopedAttributes.put("align", _align);
}

if (request.getAttribute("alloy:tooltip:anim") != null) {
	scopedAttributes.put("anim", _anim);
}

if (request.getAttribute("alloy:tooltip:arrow") != null) {
	scopedAttributes.put("arrow", _arrow);
}

if (request.getAttribute("alloy:tooltip:tooltipBodyContent") != null) {
	scopedAttributes.put("tooltipBodyContent", _tooltipBodyContent);
}

if (request.getAttribute("alloy:tooltip:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:tooltip:cancellableHide") != null) {
	scopedAttributes.put("cancellableHide", _cancellableHide);
}

if (request.getAttribute("alloy:tooltip:centered") != null) {
	scopedAttributes.put("centered", _centered);
}

if (request.getAttribute("alloy:tooltip:constrain") != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (request.getAttribute("alloy:tooltip:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:tooltip:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:tooltip:currentNode") != null) {
	scopedAttributes.put("currentNode", _currentNode);
}

if (request.getAttribute("alloy:tooltip:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:tooltip:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:tooltip:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:tooltip:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:tooltip:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:tooltip:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:tooltip:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:tooltip:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:tooltip:hideDelay") != null) {
	scopedAttributes.put("hideDelay", _hideDelay);
}

if (request.getAttribute("alloy:tooltip:hideOn") != null) {
	scopedAttributes.put("hideOn", _hideOn);
}

if (request.getAttribute("alloy:tooltip:hideOnDocumentClick") != null) {
	scopedAttributes.put("hideOnDocumentClick", _hideOnDocumentClick);
}

if (request.getAttribute("alloy:tooltip:tooltipId") != null) {
	scopedAttributes.put("tooltipId", _tooltipId);
}

if (request.getAttribute("alloy:tooltip:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:tooltip:preventOverlap") != null) {
	scopedAttributes.put("preventOverlap", _preventOverlap);
}

if (request.getAttribute("alloy:tooltip:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:tooltip:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:tooltip:shim") != null) {
	scopedAttributes.put("shim", _shim);
}

if (request.getAttribute("alloy:tooltip:showArrow") != null) {
	scopedAttributes.put("showArrow", _showArrow);
}

if (request.getAttribute("alloy:tooltip:showDelay") != null) {
	scopedAttributes.put("showDelay", _showDelay);
}

if (request.getAttribute("alloy:tooltip:showOn") != null) {
	scopedAttributes.put("showOn", _showOn);
}

if (request.getAttribute("alloy:tooltip:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:tooltip:stack") != null) {
	scopedAttributes.put("stack", _stack);
}

if (request.getAttribute("alloy:tooltip:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:tooltip:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:tooltip:title") != null) {
	scopedAttributes.put("title", _title);
}

if (request.getAttribute("alloy:tooltip:trigger") != null) {
	scopedAttributes.put("trigger", _trigger);
}

if (request.getAttribute("alloy:tooltip:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:tooltip:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:tooltip:x") != null) {
	scopedAttributes.put("x", _x);
}

if (request.getAttribute("alloy:tooltip:xy") != null) {
	scopedAttributes.put("xy", _xy);
}

if (request.getAttribute("alloy:tooltip:y") != null) {
	scopedAttributes.put("y", _y);
}

if (request.getAttribute("alloy:tooltip:zIndex") != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (request.getAttribute("alloy:tooltip:afterAlignChange") != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (request.getAttribute("alloy:tooltip:afterAnimChange") != null) {
	scopedAttributes.put("afterAnimChange", _afterAnimChange);
}

if (request.getAttribute("alloy:tooltip:afterArrowChange") != null) {
	scopedAttributes.put("afterArrowChange", _afterArrowChange);
}

if (request.getAttribute("alloy:tooltip:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:tooltip:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:tooltip:afterCancellableHideChange") != null) {
	scopedAttributes.put("afterCancellableHideChange", _afterCancellableHideChange);
}

if (request.getAttribute("alloy:tooltip:afterCenteredChange") != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (request.getAttribute("alloy:tooltip:afterConstrainChange") != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (request.getAttribute("alloy:tooltip:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:tooltip:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:tooltip:afterCurrentNodeChange") != null) {
	scopedAttributes.put("afterCurrentNodeChange", _afterCurrentNodeChange);
}

if (request.getAttribute("alloy:tooltip:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:tooltip:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:tooltip:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:tooltip:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:tooltip:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:tooltip:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:tooltip:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:tooltip:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:tooltip:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:tooltip:afterHideDelayChange") != null) {
	scopedAttributes.put("afterHideDelayChange", _afterHideDelayChange);
}

if (request.getAttribute("alloy:tooltip:afterHideOnChange") != null) {
	scopedAttributes.put("afterHideOnChange", _afterHideOnChange);
}

if (request.getAttribute("alloy:tooltip:afterHideOnDocumentClickChange") != null) {
	scopedAttributes.put("afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:tooltip:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:tooltip:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:tooltip:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:tooltip:afterPreventOverlapChange") != null) {
	scopedAttributes.put("afterPreventOverlapChange", _afterPreventOverlapChange);
}

if (request.getAttribute("alloy:tooltip:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:tooltip:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:tooltip:afterShimChange") != null) {
	scopedAttributes.put("afterShimChange", _afterShimChange);
}

if (request.getAttribute("alloy:tooltip:afterShowArrowChange") != null) {
	scopedAttributes.put("afterShowArrowChange", _afterShowArrowChange);
}

if (request.getAttribute("alloy:tooltip:afterShowDelayChange") != null) {
	scopedAttributes.put("afterShowDelayChange", _afterShowDelayChange);
}

if (request.getAttribute("alloy:tooltip:afterShowOnChange") != null) {
	scopedAttributes.put("afterShowOnChange", _afterShowOnChange);
}

if (request.getAttribute("alloy:tooltip:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:tooltip:afterStackChange") != null) {
	scopedAttributes.put("afterStackChange", _afterStackChange);
}

if (request.getAttribute("alloy:tooltip:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:tooltip:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:tooltip:afterTitleChange") != null) {
	scopedAttributes.put("afterTitleChange", _afterTitleChange);
}

if (request.getAttribute("alloy:tooltip:afterTriggerChange") != null) {
	scopedAttributes.put("afterTriggerChange", _afterTriggerChange);
}

if (request.getAttribute("alloy:tooltip:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:tooltip:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:tooltip:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:tooltip:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:tooltip:afterXChange") != null) {
	scopedAttributes.put("afterXChange", _afterXChange);
}

if (request.getAttribute("alloy:tooltip:afterXyChange") != null) {
	scopedAttributes.put("afterXyChange", _afterXyChange);
}

if (request.getAttribute("alloy:tooltip:afterYChange") != null) {
	scopedAttributes.put("afterYChange", _afterYChange);
}

if (request.getAttribute("alloy:tooltip:afterZIndexChange") != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (request.getAttribute("alloy:tooltip:onAlignChange") != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (request.getAttribute("alloy:tooltip:onAnimChange") != null) {
	scopedAttributes.put("onAnimChange", _onAnimChange);
}

if (request.getAttribute("alloy:tooltip:onArrowChange") != null) {
	scopedAttributes.put("onArrowChange", _onArrowChange);
}

if (request.getAttribute("alloy:tooltip:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:tooltip:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:tooltip:onCancellableHideChange") != null) {
	scopedAttributes.put("onCancellableHideChange", _onCancellableHideChange);
}

if (request.getAttribute("alloy:tooltip:onCenteredChange") != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (request.getAttribute("alloy:tooltip:onConstrainChange") != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (request.getAttribute("alloy:tooltip:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:tooltip:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:tooltip:onCurrentNodeChange") != null) {
	scopedAttributes.put("onCurrentNodeChange", _onCurrentNodeChange);
}

if (request.getAttribute("alloy:tooltip:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:tooltip:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:tooltip:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:tooltip:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:tooltip:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:tooltip:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:tooltip:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:tooltip:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:tooltip:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:tooltip:onHideDelayChange") != null) {
	scopedAttributes.put("onHideDelayChange", _onHideDelayChange);
}

if (request.getAttribute("alloy:tooltip:onHideOnChange") != null) {
	scopedAttributes.put("onHideOnChange", _onHideOnChange);
}

if (request.getAttribute("alloy:tooltip:onHideOnDocumentClickChange") != null) {
	scopedAttributes.put("onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:tooltip:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:tooltip:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:tooltip:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:tooltip:onPreventOverlapChange") != null) {
	scopedAttributes.put("onPreventOverlapChange", _onPreventOverlapChange);
}

if (request.getAttribute("alloy:tooltip:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:tooltip:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:tooltip:onShimChange") != null) {
	scopedAttributes.put("onShimChange", _onShimChange);
}

if (request.getAttribute("alloy:tooltip:onShowArrowChange") != null) {
	scopedAttributes.put("onShowArrowChange", _onShowArrowChange);
}

if (request.getAttribute("alloy:tooltip:onShowDelayChange") != null) {
	scopedAttributes.put("onShowDelayChange", _onShowDelayChange);
}

if (request.getAttribute("alloy:tooltip:onShowOnChange") != null) {
	scopedAttributes.put("onShowOnChange", _onShowOnChange);
}

if (request.getAttribute("alloy:tooltip:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:tooltip:onStackChange") != null) {
	scopedAttributes.put("onStackChange", _onStackChange);
}

if (request.getAttribute("alloy:tooltip:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:tooltip:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:tooltip:onTitleChange") != null) {
	scopedAttributes.put("onTitleChange", _onTitleChange);
}

if (request.getAttribute("alloy:tooltip:onTriggerChange") != null) {
	scopedAttributes.put("onTriggerChange", _onTriggerChange);
}

if (request.getAttribute("alloy:tooltip:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:tooltip:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:tooltip:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:tooltip:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (request.getAttribute("alloy:tooltip:onXChange") != null) {
	scopedAttributes.put("onXChange", _onXChange);
}

if (request.getAttribute("alloy:tooltip:onXyChange") != null) {
	scopedAttributes.put("onXyChange", _onXyChange);
}

if (request.getAttribute("alloy:tooltip:onYChange") != null) {
	scopedAttributes.put("onYChange", _onYChange);
}

if (request.getAttribute("alloy:tooltip:onZIndexChange") != null) {
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