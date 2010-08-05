<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:scopedAttributes");

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:overlay-context:align");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:overlay-context:boundingBox");
java.lang.Boolean _cancellableHide = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:cancellableHide");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:overlay-context:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:overlay-context:cssClass");
java.lang.String _currentNode = (java.lang.String)request.getAttribute("alloy:overlay-context:currentNode");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:disabled");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:focused");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:overlay-context:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:overlay-context:hideClass");
java.lang.Number _hideDelay = (java.lang.Number)request.getAttribute("alloy:overlay-context:hideDelay");
java.lang.String _hideOn = (java.lang.String)request.getAttribute("alloy:overlay-context:hideOn");
java.lang.Boolean _hideOnDocumentClick = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:hideOnDocumentClick");
java.lang.String _overlaycontextId = (java.lang.String)request.getAttribute("alloy:overlay-context:overlaycontextId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:initialized");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:rendered");
java.lang.Number _showDelay = (java.lang.Number)request.getAttribute("alloy:overlay-context:showDelay");
java.lang.String _showOn = (java.lang.String)request.getAttribute("alloy:overlay-context:showOn");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:overlay-context:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:overlay-context:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:overlay-context:tabIndex");
java.lang.String _trigger = (java.lang.String)request.getAttribute("alloy:overlay-context:trigger");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:overlay-context:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:overlay-context:width");
java.lang.String _afterAlignChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterAlignChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterBoundingBoxChange");
java.lang.String _afterCancellableHideChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterCancellableHideChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterCssClassChange");
java.lang.String _afterCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterCurrentNodeChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:overlay-context:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterDisabledChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterFocusedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHideClassChange");
java.lang.String _afterHideDelayChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHideDelayChange");
java.lang.String _afterHideOnChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHideOnChange");
java.lang.String _afterHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterHideOnDocumentClickChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:overlay-context:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterInitializedChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:afterRenderedChange");
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
java.lang.String _onAlignChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onAlignChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onBoundingBoxChange");
java.lang.String _onCancellableHideChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onCancellableHideChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onCssClassChange");
java.lang.String _onCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onCurrentNodeChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:overlay-context:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onDisabledChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onFocusedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHideClassChange");
java.lang.String _onHideDelayChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHideDelayChange");
java.lang.String _onHideOnChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHideOnChange");
java.lang.String _onHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onHideOnDocumentClickChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:overlay-context:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onInitializedChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:overlay-context:onRenderedChange");
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
%>

<%@ include file="init-ext.jsp" %>

<%
if (_align != null) {
	scopedAttributes.put("align", _align);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_cancellableHide != null) {
	scopedAttributes.put("cancellableHide", _cancellableHide);
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

if (_focused != null) {
	scopedAttributes.put("focused", _focused);
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

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
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

if (_afterAlignChange != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (_afterCancellableHideChange != null) {
	scopedAttributes.put("afterCancellableHideChange", _afterCancellableHideChange);
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

if (_afterFocusedChange != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
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

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
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

if (_onAlignChange != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (_onCancellableHideChange != null) {
	scopedAttributes.put("onCancellableHideChange", _onCancellableHideChange);
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

if (_onFocusedChange != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
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

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
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

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>