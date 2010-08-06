<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:scopedAttributes");

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:overlay-context:align");
java.lang.String _overlaycontextBodyContent = (java.lang.String)request.getAttribute("alloy:overlay-context:overlaycontextBodyContent");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:overlay-context:boundingBox");
java.lang.Boolean _cancellableHide = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:cancellableHide");
java.lang.String _centered = (java.lang.String)request.getAttribute("alloy:overlay-context:centered");
java.lang.String _constrain = (java.lang.String)request.getAttribute("alloy:overlay-context:constrain");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:overlay-context:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:overlay-context:cssClass");
java.lang.String _currentNode = (java.lang.String)request.getAttribute("alloy:overlay-context:currentNode");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:disabled");
java.lang.String _fillHeight = (java.lang.String)request.getAttribute("alloy:overlay-context:fillHeight");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:focused");
java.lang.String _footerContent = (java.lang.String)request.getAttribute("alloy:overlay-context:footerContent");
java.lang.String _headerContent = (java.lang.String)request.getAttribute("alloy:overlay-context:headerContent");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:overlay-context:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:overlay-context:hideClass");
java.lang.Number _hideDelay = (java.lang.Number)request.getAttribute("alloy:overlay-context:hideDelay");
java.lang.String _hideOn = (java.lang.String)request.getAttribute("alloy:overlay-context:hideOn");
java.lang.Boolean _hideOnDocumentClick = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:hideOnDocumentClick");
java.lang.String _overlaycontextId = (java.lang.String)request.getAttribute("alloy:overlay-context:overlaycontextId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:initialized");
java.lang.Boolean _preventOverlap = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:preventOverlap");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:rendered");
java.lang.Boolean _shim = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:shim");
java.lang.Number _showDelay = (java.lang.Number)request.getAttribute("alloy:overlay-context:showDelay");
java.lang.String _showOn = (java.lang.String)request.getAttribute("alloy:overlay-context:showOn");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:overlay-context:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:overlay-context:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:overlay-context:tabIndex");
java.lang.String _trigger = (java.lang.String)request.getAttribute("alloy:overlay-context:trigger");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:overlay-context:width");
java.lang.Number _x = (java.lang.Number)request.getAttribute("alloy:overlay-context:x");
java.lang.String _xy = (java.lang.String)request.getAttribute("alloy:overlay-context:xy");
java.lang.Number _y = (java.lang.Number)request.getAttribute("alloy:overlay-context:y");
java.lang.Number _zIndex = (java.lang.Number)request.getAttribute("alloy:overlay-context:zIndex");
java.lang.String _afterAlignChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterAlignChange");
java.lang.String _afterBodyContentChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterBodyContentChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterBoundingBoxChange");
java.lang.String _afterCancellableHideChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterCancellableHideChange");
java.lang.String _afterCenteredChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterCenteredChange");
java.lang.String _afterConstrainChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterConstrainChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterCssClassChange");
java.lang.String _afterCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterCurrentNodeChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:overlay-context:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterDisabledChange");
java.lang.String _afterFillHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterFillHeightChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterFocusedChange");
java.lang.String _afterFooterContentChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterFooterContentChange");
java.lang.String _afterHeaderContentChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHeaderContentChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHideClassChange");
java.lang.String _afterHideDelayChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHideDelayChange");
java.lang.String _afterHideOnChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHideOnChange");
java.lang.String _afterHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHideOnDocumentClickChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:overlay-context:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterInitializedChange");
java.lang.String _afterPreventOverlapChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterPreventOverlapChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterRenderedChange");
java.lang.String _afterShimChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterShimChange");
java.lang.String _afterShowDelayChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterShowDelayChange");
java.lang.String _afterShowOnChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterShowOnChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterSrcNodeChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterTabIndexChange");
java.lang.String _afterTriggerChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterTriggerChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:overlay-context:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:overlay-context:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterWidthChange");
java.lang.String _afterXChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterXChange");
java.lang.String _afterXyChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterXyChange");
java.lang.String _afterYChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterYChange");
java.lang.String _afterZIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterZIndexChange");
java.lang.String _onAlignChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onAlignChange");
java.lang.String _onBodyContentChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onBodyContentChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onBoundingBoxChange");
java.lang.String _onCancellableHideChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onCancellableHideChange");
java.lang.String _onCenteredChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onCenteredChange");
java.lang.String _onConstrainChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onConstrainChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onCssClassChange");
java.lang.String _onCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onCurrentNodeChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:overlay-context:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onDisabledChange");
java.lang.String _onFillHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onFillHeightChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onFocusedChange");
java.lang.String _onFooterContentChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onFooterContentChange");
java.lang.String _onHeaderContentChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHeaderContentChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHideClassChange");
java.lang.String _onHideDelayChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHideDelayChange");
java.lang.String _onHideOnChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHideOnChange");
java.lang.String _onHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHideOnDocumentClickChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:overlay-context:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onInitializedChange");
java.lang.String _onPreventOverlapChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onPreventOverlapChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onRenderedChange");
java.lang.String _onShimChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onShimChange");
java.lang.String _onShowDelayChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onShowDelayChange");
java.lang.String _onShowOnChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onShowOnChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onSrcNodeChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onTabIndexChange");
java.lang.String _onTriggerChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onTriggerChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:overlay-context:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:overlay-context:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onWidthChange");
java.lang.String _onXChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onXChange");
java.lang.String _onXyChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onXyChange");
java.lang.String _onYChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onYChange");
java.lang.String _onZIndexChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onZIndexChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_align != null) {
	scopedAttributes.put("align", _align);
}

if (_overlaycontextBodyContent != null) {
	scopedAttributes.put("overlaycontextBodyContent", _overlaycontextBodyContent);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_cancellableHide != null) {
	scopedAttributes.put("cancellableHide", _cancellableHide);
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

if (_currentNode != null) {
	scopedAttributes.put("currentNode", _currentNode);
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

if (_hideDelay != null) {
	scopedAttributes.put("hideDelay", _hideDelay);
}

if (_hideOn != null) {
	scopedAttributes.put("hideOn", _hideOn);
}

if (_hideOnDocumentClick != null) {
	scopedAttributes.put("hideOnDocumentClick", _hideOnDocumentClick);
}

if (_overlaycontextId != null) {
	scopedAttributes.put("overlaycontextId", _overlaycontextId);
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

if (_showDelay != null) {
	scopedAttributes.put("showDelay", _showDelay);
}

if (_showOn != null) {
	scopedAttributes.put("showOn", _showOn);
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

if (_trigger != null) {
	scopedAttributes.put("trigger", _trigger);
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

if (_afterCancellableHideChange != null) {
	scopedAttributes.put("afterCancellableHideChange", _afterCancellableHideChange);
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

if (_afterCurrentNodeChange != null) {
	scopedAttributes.put("afterCurrentNodeChange", _afterCurrentNodeChange);
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

if (_afterHideDelayChange != null) {
	scopedAttributes.put("afterHideDelayChange", _afterHideDelayChange);
}

if (_afterHideOnChange != null) {
	scopedAttributes.put("afterHideOnChange", _afterHideOnChange);
}

if (_afterHideOnDocumentClickChange != null) {
	scopedAttributes.put("afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
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

if (_afterShowDelayChange != null) {
	scopedAttributes.put("afterShowDelayChange", _afterShowDelayChange);
}

if (_afterShowOnChange != null) {
	scopedAttributes.put("afterShowOnChange", _afterShowOnChange);
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

if (_afterTriggerChange != null) {
	scopedAttributes.put("afterTriggerChange", _afterTriggerChange);
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

if (_onCancellableHideChange != null) {
	scopedAttributes.put("onCancellableHideChange", _onCancellableHideChange);
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

if (_onCurrentNodeChange != null) {
	scopedAttributes.put("onCurrentNodeChange", _onCurrentNodeChange);
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

if (_onHideDelayChange != null) {
	scopedAttributes.put("onHideDelayChange", _onHideDelayChange);
}

if (_onHideOnChange != null) {
	scopedAttributes.put("onHideOnChange", _onHideOnChange);
}

if (_onHideOnDocumentClickChange != null) {
	scopedAttributes.put("onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
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

if (_onShowDelayChange != null) {
	scopedAttributes.put("onShowDelayChange", _onShowDelayChange);
}

if (_onShowOnChange != null) {
	scopedAttributes.put("onShowOnChange", _onShowOnChange);
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

if (_onTriggerChange != null) {
	scopedAttributes.put("onTriggerChange", _onTriggerChange);
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