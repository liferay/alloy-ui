<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tooltip:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tooltip:scopedAttributes");

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:tooltip:align");
java.lang.Object _anim = (java.lang.Object)request.getAttribute("alloy:tooltip:anim");
java.lang.String _arrow = (java.lang.String)request.getAttribute("alloy:tooltip:arrow");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:tooltip:boundingBox");
java.lang.Boolean _cancellableHide = (java.lang.Boolean)request.getAttribute("alloy:tooltip:cancellableHide");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:tooltip:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:tooltip:cssClass");
java.lang.String _currentNode = (java.lang.String)request.getAttribute("alloy:tooltip:currentNode");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:tooltip:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:tooltip:disabled");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:tooltip:focused");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:tooltip:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:tooltip:hideClass");
java.lang.Number _hideDelay = (java.lang.Number)request.getAttribute("alloy:tooltip:hideDelay");
java.lang.String _hideOn = (java.lang.String)request.getAttribute("alloy:tooltip:hideOn");
java.lang.Boolean _hideOnDocumentClick = (java.lang.Boolean)request.getAttribute("alloy:tooltip:hideOnDocumentClick");
java.lang.String _tooltipId = (java.lang.String)request.getAttribute("alloy:tooltip:tooltipId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:tooltip:initialized");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:tooltip:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:tooltip:rendered");
java.lang.Boolean _showArrow = (java.lang.Boolean)request.getAttribute("alloy:tooltip:showArrow");
java.lang.Number _showDelay = (java.lang.Number)request.getAttribute("alloy:tooltip:showDelay");
java.lang.String _showOn = (java.lang.String)request.getAttribute("alloy:tooltip:showOn");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:tooltip:srcNode");
java.lang.Boolean _stack = (java.lang.Boolean)request.getAttribute("alloy:tooltip:stack");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:tooltip:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:tooltip:tabIndex");
java.lang.Boolean _title = (java.lang.Boolean)request.getAttribute("alloy:tooltip:title");
java.lang.String _trigger = (java.lang.String)request.getAttribute("alloy:tooltip:trigger");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:tooltip:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:tooltip:width");
java.lang.String _afterAlignChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterAlignChange");
java.lang.String _afterAnimChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterAnimChange");
java.lang.String _afterArrowChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterArrowChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterBoundingBoxChange");
java.lang.String _afterCancellableHideChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterCancellableHideChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterCssClassChange");
java.lang.String _afterCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterCurrentNodeChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:tooltip:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterDisabledChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterFocusedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterHideClassChange");
java.lang.String _afterHideDelayChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterHideDelayChange");
java.lang.String _afterHideOnChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterHideOnChange");
java.lang.String _afterHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterHideOnDocumentClickChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:tooltip:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterInitializedChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterRenderedChange");
java.lang.String _afterShowArrowChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterShowArrowChange");
java.lang.String _afterShowDelayChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterShowDelayChange");
java.lang.String _afterShowOnChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterShowOnChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterSrcNodeChange");
java.lang.String _afterStackChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterStackChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterTabIndexChange");
java.lang.String _afterTitleChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterTitleChange");
java.lang.String _afterTriggerChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterTriggerChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:tooltip:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:tooltip:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:tooltip:afterWidthChange");
java.lang.String _onAlignChange = (java.lang.String)request.getAttribute("alloy:tooltip:onAlignChange");
java.lang.String _onAnimChange = (java.lang.String)request.getAttribute("alloy:tooltip:onAnimChange");
java.lang.String _onArrowChange = (java.lang.String)request.getAttribute("alloy:tooltip:onArrowChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:tooltip:onBoundingBoxChange");
java.lang.String _onCancellableHideChange = (java.lang.String)request.getAttribute("alloy:tooltip:onCancellableHideChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:tooltip:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:tooltip:onCssClassChange");
java.lang.String _onCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:tooltip:onCurrentNodeChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:tooltip:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:tooltip:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:tooltip:onDisabledChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:tooltip:onFocusedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:tooltip:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:tooltip:onHideClassChange");
java.lang.String _onHideDelayChange = (java.lang.String)request.getAttribute("alloy:tooltip:onHideDelayChange");
java.lang.String _onHideOnChange = (java.lang.String)request.getAttribute("alloy:tooltip:onHideOnChange");
java.lang.String _onHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:tooltip:onHideOnDocumentClickChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:tooltip:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:tooltip:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:tooltip:onInitializedChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:tooltip:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:tooltip:onRenderedChange");
java.lang.String _onShowArrowChange = (java.lang.String)request.getAttribute("alloy:tooltip:onShowArrowChange");
java.lang.String _onShowDelayChange = (java.lang.String)request.getAttribute("alloy:tooltip:onShowDelayChange");
java.lang.String _onShowOnChange = (java.lang.String)request.getAttribute("alloy:tooltip:onShowOnChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:tooltip:onSrcNodeChange");
java.lang.String _onStackChange = (java.lang.String)request.getAttribute("alloy:tooltip:onStackChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:tooltip:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:tooltip:onTabIndexChange");
java.lang.String _onTitleChange = (java.lang.String)request.getAttribute("alloy:tooltip:onTitleChange");
java.lang.String _onTriggerChange = (java.lang.String)request.getAttribute("alloy:tooltip:onTriggerChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:tooltip:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:tooltip:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:tooltip:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:tooltip:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_align != null) {
	scopedAttributes.put("align", _align);
}

if (_anim != null) {
	scopedAttributes.put("anim", _anim);
}

if (_arrow != null) {
	scopedAttributes.put("arrow", _arrow);
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

if (_tooltipId != null) {
	scopedAttributes.put("tooltipId", _tooltipId);
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

if (_showArrow != null) {
	scopedAttributes.put("showArrow", _showArrow);
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

if (_stack != null) {
	scopedAttributes.put("stack", _stack);
}

if (_strings != null) {
	scopedAttributes.put("strings", _strings);
}

if (_tabIndex != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (_title != null) {
	scopedAttributes.put("title", _title);
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

if (_afterAnimChange != null) {
	scopedAttributes.put("afterAnimChange", _afterAnimChange);
}

if (_afterArrowChange != null) {
	scopedAttributes.put("afterArrowChange", _afterArrowChange);
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

if (_afterShowArrowChange != null) {
	scopedAttributes.put("afterShowArrowChange", _afterShowArrowChange);
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

if (_afterStackChange != null) {
	scopedAttributes.put("afterStackChange", _afterStackChange);
}

if (_afterStringsChange != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (_afterTabIndexChange != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (_afterTitleChange != null) {
	scopedAttributes.put("afterTitleChange", _afterTitleChange);
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

if (_onAnimChange != null) {
	scopedAttributes.put("onAnimChange", _onAnimChange);
}

if (_onArrowChange != null) {
	scopedAttributes.put("onArrowChange", _onArrowChange);
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

if (_onShowArrowChange != null) {
	scopedAttributes.put("onShowArrowChange", _onShowArrowChange);
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

if (_onStackChange != null) {
	scopedAttributes.put("onStackChange", _onStackChange);
}

if (_onStringsChange != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (_onTabIndexChange != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (_onTitleChange != null) {
	scopedAttributes.put("onTitleChange", _onTitleChange);
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