<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:toolbar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:toolbar:scopedAttributes");

java.lang.Boolean _activeState = (java.lang.Boolean)request.getAttribute("alloy:toolbar:activeState");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:toolbar:boundingBox");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:toolbar:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:toolbar:cssClass");
java.lang.String _defaultChildType = (java.lang.String)request.getAttribute("alloy:toolbar:defaultChildType");
java.lang.Boolean _defaultState = (java.lang.Boolean)request.getAttribute("alloy:toolbar:defaultState");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:toolbar:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:toolbar:disabled");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:toolbar:focused");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:toolbar:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:toolbar:hideClass");
java.lang.Boolean _hoverState = (java.lang.Boolean)request.getAttribute("alloy:toolbar:hoverState");
java.lang.String _toolbarId = (java.lang.String)request.getAttribute("alloy:toolbar:toolbarId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:toolbar:initialized");
java.lang.String _orientation = (java.lang.String)request.getAttribute("alloy:toolbar:orientation");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:toolbar:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:toolbar:rendered");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:toolbar:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:toolbar:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:toolbar:tabIndex");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:toolbar:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:toolbar:width");
java.lang.String _afterActiveStateChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterActiveStateChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterBoundingBoxChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterCssClassChange");
java.lang.String _afterDefaultChildTypeChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterDefaultChildTypeChange");
java.lang.String _afterDefaultStateChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterDefaultStateChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:toolbar:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterDisabledChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterFocusedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterHideClassChange");
java.lang.String _afterHoverStateChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterHoverStateChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:toolbar:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterInitializedChange");
java.lang.String _afterOrientationChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterOrientationChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterRenderedChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterSrcNodeChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterTabIndexChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:toolbar:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:toolbar:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:toolbar:afterWidthChange");
java.lang.String _onActiveStateChange = (java.lang.String)request.getAttribute("alloy:toolbar:onActiveStateChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:toolbar:onBoundingBoxChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:toolbar:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:toolbar:onCssClassChange");
java.lang.String _onDefaultChildTypeChange = (java.lang.String)request.getAttribute("alloy:toolbar:onDefaultChildTypeChange");
java.lang.String _onDefaultStateChange = (java.lang.String)request.getAttribute("alloy:toolbar:onDefaultStateChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:toolbar:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:toolbar:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:toolbar:onDisabledChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:toolbar:onFocusedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:toolbar:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:toolbar:onHideClassChange");
java.lang.String _onHoverStateChange = (java.lang.String)request.getAttribute("alloy:toolbar:onHoverStateChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:toolbar:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:toolbar:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:toolbar:onInitializedChange");
java.lang.String _onOrientationChange = (java.lang.String)request.getAttribute("alloy:toolbar:onOrientationChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:toolbar:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:toolbar:onRenderedChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:toolbar:onSrcNodeChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:toolbar:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:toolbar:onTabIndexChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:toolbar:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:toolbar:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:toolbar:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:toolbar:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_activeState != null) {
	scopedAttributes.put("activeState", _activeState);
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

if (_defaultChildType != null) {
	scopedAttributes.put("defaultChildType", _defaultChildType);
}

if (_defaultState != null) {
	scopedAttributes.put("defaultState", _defaultState);
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

if (_hoverState != null) {
	scopedAttributes.put("hoverState", _hoverState);
}

if (_toolbarId != null) {
	scopedAttributes.put("toolbarId", _toolbarId);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_orientation != null) {
	scopedAttributes.put("orientation", _orientation);
}

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
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

if (_afterActiveStateChange != null) {
	scopedAttributes.put("afterActiveStateChange", _afterActiveStateChange);
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

if (_afterDefaultChildTypeChange != null) {
	scopedAttributes.put("afterDefaultChildTypeChange", _afterDefaultChildTypeChange);
}

if (_afterDefaultStateChange != null) {
	scopedAttributes.put("afterDefaultStateChange", _afterDefaultStateChange);
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

if (_afterHoverStateChange != null) {
	scopedAttributes.put("afterHoverStateChange", _afterHoverStateChange);
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

if (_afterOrientationChange != null) {
	scopedAttributes.put("afterOrientationChange", _afterOrientationChange);
}

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
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

if (_onActiveStateChange != null) {
	scopedAttributes.put("onActiveStateChange", _onActiveStateChange);
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

if (_onDefaultChildTypeChange != null) {
	scopedAttributes.put("onDefaultChildTypeChange", _onDefaultChildTypeChange);
}

if (_onDefaultStateChange != null) {
	scopedAttributes.put("onDefaultStateChange", _onDefaultStateChange);
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

if (_onHoverStateChange != null) {
	scopedAttributes.put("onHoverStateChange", _onHoverStateChange);
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

if (_onOrientationChange != null) {
	scopedAttributes.put("onOrientationChange", _onOrientationChange);
}

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
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

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>