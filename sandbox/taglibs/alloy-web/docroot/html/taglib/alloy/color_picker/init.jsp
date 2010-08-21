<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:color-picker:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:color-picker:scopedAttributes");

String uniqueId = StringPool.BLANK;
String srcNode = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean((java.io.Serializable)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId));
}

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:color-picker:align");
java.lang.String _colorpickerBodyContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:colorpickerBodyContent"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:boundingBox"));
java.lang.Boolean _cancellableHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:cancellableHide"));
java.lang.String _centered = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:centered"));
java.lang.String _constrain = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:constrain"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:cssClass"));
java.lang.String _currentNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:currentNode"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:disabled"));
java.lang.String _fillHeight = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:fillHeight"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:focused"));
java.lang.String _footerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:footerContent"));
java.lang.String _headerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:headerContent"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:hideClass"));
java.lang.Number _hideDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:hideDelay"));
java.lang.String _hideOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:hideOn"));
java.lang.Boolean _hideOnDocumentClick = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:hideOnDocumentClick"));
java.lang.String _colorpickerId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:colorpickerId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:initialized"));
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:preventOverlap"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:render"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:rendered"));
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:shim"));
java.lang.Number _showDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:showDelay"));
java.lang.String _showOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:showOn"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:color-picker:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:tabIndex"));
java.lang.String _trigger = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:trigger"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:width"));
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:x"));
java.lang.String _xy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:xy"));
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:y"));
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:zIndex"));
java.lang.String _afterAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterAlignChange"));
java.lang.String _afterBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterBodyContentChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterBoundingBoxChange"));
java.lang.String _afterCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterCancellableHideChange"));
java.lang.String _afterCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterCenteredChange"));
java.lang.String _afterConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterConstrainChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterCssClassChange"));
java.lang.String _afterCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterCurrentNodeChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterDisabledChange"));
java.lang.String _afterFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterFillHeightChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterFocusedChange"));
java.lang.String _afterFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterFooterContentChange"));
java.lang.String _afterHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterHeaderContentChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterHideClassChange"));
java.lang.String _afterHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterHideDelayChange"));
java.lang.String _afterHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterHideOnChange"));
java.lang.String _afterHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterHideOnDocumentClickChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterInitializedChange"));
java.lang.String _afterPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterPreventOverlapChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterRenderedChange"));
java.lang.String _afterShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterShimChange"));
java.lang.String _afterShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterShowDelayChange"));
java.lang.String _afterShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterShowOnChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterSrcNodeChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterTabIndexChange"));
java.lang.String _afterTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterTriggerChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterWidthChange"));
java.lang.String _afterXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterXChange"));
java.lang.String _afterXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterXyChange"));
java.lang.String _afterYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterYChange"));
java.lang.String _afterZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:afterZIndexChange"));
java.lang.String _onAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onAlignChange"));
java.lang.String _onBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onBodyContentChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onBoundingBoxChange"));
java.lang.String _onCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onCancellableHideChange"));
java.lang.String _onCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onCenteredChange"));
java.lang.String _onConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onConstrainChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onCssClassChange"));
java.lang.String _onCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onCurrentNodeChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onDisabledChange"));
java.lang.String _onFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onFillHeightChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onFocusedChange"));
java.lang.String _onFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onFooterContentChange"));
java.lang.String _onHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onHeaderContentChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onHideClassChange"));
java.lang.String _onHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onHideDelayChange"));
java.lang.String _onHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onHideOnChange"));
java.lang.String _onHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onHideOnDocumentClickChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onInitializedChange"));
java.lang.String _onPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onPreventOverlapChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onRenderedChange"));
java.lang.String _onShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onShimChange"));
java.lang.String _onShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onShowDelayChange"));
java.lang.String _onShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onShowOnChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onSrcNodeChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onTabIndexChange"));
java.lang.String _onTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onTriggerChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onWidthChange"));
java.lang.String _onXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onXChange"));
java.lang.String _onXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onXyChange"));
java.lang.String _onYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onYChange"));
java.lang.String _onZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:onZIndexChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:color-picker:align") != null) {
	scopedAttributes.put("align", _align);
}

if (request.getAttribute("alloy:color-picker:colorpickerBodyContent") != null) {
	scopedAttributes.put("colorpickerBodyContent", _colorpickerBodyContent);
}

if (request.getAttribute("alloy:color-picker:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:color-picker:cancellableHide") != null) {
	scopedAttributes.put("cancellableHide", _cancellableHide);
}

if (request.getAttribute("alloy:color-picker:centered") != null) {
	scopedAttributes.put("centered", _centered);
}

if (request.getAttribute("alloy:color-picker:constrain") != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (request.getAttribute("alloy:color-picker:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:color-picker:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:color-picker:currentNode") != null) {
	scopedAttributes.put("currentNode", _currentNode);
}

if (request.getAttribute("alloy:color-picker:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:color-picker:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:color-picker:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:color-picker:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:color-picker:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:color-picker:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:color-picker:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:color-picker:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:color-picker:hideDelay") != null) {
	scopedAttributes.put("hideDelay", _hideDelay);
}

if (request.getAttribute("alloy:color-picker:hideOn") != null) {
	scopedAttributes.put("hideOn", _hideOn);
}

if (request.getAttribute("alloy:color-picker:hideOnDocumentClick") != null) {
	scopedAttributes.put("hideOnDocumentClick", _hideOnDocumentClick);
}

if (request.getAttribute("alloy:color-picker:colorpickerId") != null) {
	scopedAttributes.put("colorpickerId", _colorpickerId);
}

if (request.getAttribute("alloy:color-picker:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:color-picker:preventOverlap") != null) {
	scopedAttributes.put("preventOverlap", _preventOverlap);
}

if (request.getAttribute("alloy:color-picker:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:color-picker:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:color-picker:shim") != null) {
	scopedAttributes.put("shim", _shim);
}

if (request.getAttribute("alloy:color-picker:showDelay") != null) {
	scopedAttributes.put("showDelay", _showDelay);
}

if (request.getAttribute("alloy:color-picker:showOn") != null) {
	scopedAttributes.put("showOn", _showOn);
}

if (request.getAttribute("alloy:color-picker:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:color-picker:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:color-picker:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:color-picker:trigger") != null) {
	scopedAttributes.put("trigger", _trigger);
}

if (request.getAttribute("alloy:color-picker:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:color-picker:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:color-picker:x") != null) {
	scopedAttributes.put("x", _x);
}

if (request.getAttribute("alloy:color-picker:xy") != null) {
	scopedAttributes.put("xy", _xy);
}

if (request.getAttribute("alloy:color-picker:y") != null) {
	scopedAttributes.put("y", _y);
}

if (request.getAttribute("alloy:color-picker:zIndex") != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (request.getAttribute("alloy:color-picker:afterAlignChange") != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (request.getAttribute("alloy:color-picker:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:color-picker:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:color-picker:afterCancellableHideChange") != null) {
	scopedAttributes.put("afterCancellableHideChange", _afterCancellableHideChange);
}

if (request.getAttribute("alloy:color-picker:afterCenteredChange") != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (request.getAttribute("alloy:color-picker:afterConstrainChange") != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (request.getAttribute("alloy:color-picker:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:color-picker:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:color-picker:afterCurrentNodeChange") != null) {
	scopedAttributes.put("afterCurrentNodeChange", _afterCurrentNodeChange);
}

if (request.getAttribute("alloy:color-picker:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:color-picker:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:color-picker:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:color-picker:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:color-picker:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:color-picker:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:color-picker:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:color-picker:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:color-picker:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:color-picker:afterHideDelayChange") != null) {
	scopedAttributes.put("afterHideDelayChange", _afterHideDelayChange);
}

if (request.getAttribute("alloy:color-picker:afterHideOnChange") != null) {
	scopedAttributes.put("afterHideOnChange", _afterHideOnChange);
}

if (request.getAttribute("alloy:color-picker:afterHideOnDocumentClickChange") != null) {
	scopedAttributes.put("afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:color-picker:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:color-picker:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:color-picker:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:color-picker:afterPreventOverlapChange") != null) {
	scopedAttributes.put("afterPreventOverlapChange", _afterPreventOverlapChange);
}

if (request.getAttribute("alloy:color-picker:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:color-picker:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:color-picker:afterShimChange") != null) {
	scopedAttributes.put("afterShimChange", _afterShimChange);
}

if (request.getAttribute("alloy:color-picker:afterShowDelayChange") != null) {
	scopedAttributes.put("afterShowDelayChange", _afterShowDelayChange);
}

if (request.getAttribute("alloy:color-picker:afterShowOnChange") != null) {
	scopedAttributes.put("afterShowOnChange", _afterShowOnChange);
}

if (request.getAttribute("alloy:color-picker:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:color-picker:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:color-picker:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:color-picker:afterTriggerChange") != null) {
	scopedAttributes.put("afterTriggerChange", _afterTriggerChange);
}

if (request.getAttribute("alloy:color-picker:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:color-picker:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:color-picker:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:color-picker:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:color-picker:afterXChange") != null) {
	scopedAttributes.put("afterXChange", _afterXChange);
}

if (request.getAttribute("alloy:color-picker:afterXyChange") != null) {
	scopedAttributes.put("afterXyChange", _afterXyChange);
}

if (request.getAttribute("alloy:color-picker:afterYChange") != null) {
	scopedAttributes.put("afterYChange", _afterYChange);
}

if (request.getAttribute("alloy:color-picker:afterZIndexChange") != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (request.getAttribute("alloy:color-picker:onAlignChange") != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (request.getAttribute("alloy:color-picker:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:color-picker:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:color-picker:onCancellableHideChange") != null) {
	scopedAttributes.put("onCancellableHideChange", _onCancellableHideChange);
}

if (request.getAttribute("alloy:color-picker:onCenteredChange") != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (request.getAttribute("alloy:color-picker:onConstrainChange") != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (request.getAttribute("alloy:color-picker:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:color-picker:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:color-picker:onCurrentNodeChange") != null) {
	scopedAttributes.put("onCurrentNodeChange", _onCurrentNodeChange);
}

if (request.getAttribute("alloy:color-picker:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:color-picker:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:color-picker:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:color-picker:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:color-picker:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:color-picker:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:color-picker:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:color-picker:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:color-picker:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:color-picker:onHideDelayChange") != null) {
	scopedAttributes.put("onHideDelayChange", _onHideDelayChange);
}

if (request.getAttribute("alloy:color-picker:onHideOnChange") != null) {
	scopedAttributes.put("onHideOnChange", _onHideOnChange);
}

if (request.getAttribute("alloy:color-picker:onHideOnDocumentClickChange") != null) {
	scopedAttributes.put("onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:color-picker:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:color-picker:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:color-picker:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:color-picker:onPreventOverlapChange") != null) {
	scopedAttributes.put("onPreventOverlapChange", _onPreventOverlapChange);
}

if (request.getAttribute("alloy:color-picker:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:color-picker:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:color-picker:onShimChange") != null) {
	scopedAttributes.put("onShimChange", _onShimChange);
}

if (request.getAttribute("alloy:color-picker:onShowDelayChange") != null) {
	scopedAttributes.put("onShowDelayChange", _onShowDelayChange);
}

if (request.getAttribute("alloy:color-picker:onShowOnChange") != null) {
	scopedAttributes.put("onShowOnChange", _onShowOnChange);
}

if (request.getAttribute("alloy:color-picker:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:color-picker:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:color-picker:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:color-picker:onTriggerChange") != null) {
	scopedAttributes.put("onTriggerChange", _onTriggerChange);
}

if (request.getAttribute("alloy:color-picker:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:color-picker:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:color-picker:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:color-picker:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (request.getAttribute("alloy:color-picker:onXChange") != null) {
	scopedAttributes.put("onXChange", _onXChange);
}

if (request.getAttribute("alloy:color-picker:onXyChange") != null) {
	scopedAttributes.put("onXyChange", _onXyChange);
}

if (request.getAttribute("alloy:color-picker:onYChange") != null) {
	scopedAttributes.put("onYChange", _onYChange);
}

if (request.getAttribute("alloy:color-picker:onZIndexChange") != null) {
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