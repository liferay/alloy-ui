<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:button-item:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:button-item:scopedAttributes");

java.lang.Boolean _activeState = (java.lang.Boolean)request.getAttribute("alloy:button-item:activeState");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:button-item:boundingBox");
java.lang.Object _classNames = (java.lang.Object)request.getAttribute("alloy:button-item:classNames");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:button-item:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:button-item:cssClass");
java.lang.Boolean _defaultState = (java.lang.Boolean)request.getAttribute("alloy:button-item:defaultState");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:button-item:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:button-item:disabled");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:button-item:focused");
java.lang.String _handler = (java.lang.String)request.getAttribute("alloy:button-item:handler");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:button-item:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:button-item:hideClass");
java.lang.Boolean _hoverState = (java.lang.Boolean)request.getAttribute("alloy:button-item:hoverState");
java.lang.String _icon = (java.lang.String)request.getAttribute("alloy:button-item:icon");
java.lang.String _iconNode = (java.lang.String)request.getAttribute("alloy:button-item:iconNode");
java.lang.String _buttonitemId = (java.lang.String)request.getAttribute("alloy:button-item:buttonitemId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:button-item:initialized");
java.lang.String _label = (java.lang.String)request.getAttribute("alloy:button-item:label");
java.lang.String _labelNode = (java.lang.String)request.getAttribute("alloy:button-item:labelNode");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:button-item:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:button-item:rendered");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:button-item:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:button-item:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:button-item:tabIndex");
java.lang.String _title = (java.lang.String)request.getAttribute("alloy:button-item:title");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:button-item:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:button-item:width");
java.lang.String _afterActiveStateChange = (java.lang.String)request.getAttribute("alloy:button-item:afterActiveStateChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:button-item:afterBoundingBoxChange");
java.lang.String _afterClassNamesChange = (java.lang.String)request.getAttribute("alloy:button-item:afterClassNamesChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:button-item:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:button-item:afterCssClassChange");
java.lang.String _afterDefaultStateChange = (java.lang.String)request.getAttribute("alloy:button-item:afterDefaultStateChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:button-item:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:button-item:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:button-item:afterDisabledChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:button-item:afterFocusedChange");
java.lang.String _afterHandlerChange = (java.lang.String)request.getAttribute("alloy:button-item:afterHandlerChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:button-item:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:button-item:afterHideClassChange");
java.lang.String _afterHoverStateChange = (java.lang.String)request.getAttribute("alloy:button-item:afterHoverStateChange");
java.lang.String _afterIconChange = (java.lang.String)request.getAttribute("alloy:button-item:afterIconChange");
java.lang.String _afterIconNodeChange = (java.lang.String)request.getAttribute("alloy:button-item:afterIconNodeChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:button-item:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:button-item:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:button-item:afterInitializedChange");
java.lang.String _afterLabelChange = (java.lang.String)request.getAttribute("alloy:button-item:afterLabelChange");
java.lang.String _afterLabelNodeChange = (java.lang.String)request.getAttribute("alloy:button-item:afterLabelNodeChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:button-item:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:button-item:afterRenderedChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:button-item:afterSrcNodeChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:button-item:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:button-item:afterTabIndexChange");
java.lang.String _afterTitleChange = (java.lang.String)request.getAttribute("alloy:button-item:afterTitleChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:button-item:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:button-item:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:button-item:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:button-item:afterWidthChange");
java.lang.String _onActiveStateChange = (java.lang.String)request.getAttribute("alloy:button-item:onActiveStateChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:button-item:onBoundingBoxChange");
java.lang.String _onClassNamesChange = (java.lang.String)request.getAttribute("alloy:button-item:onClassNamesChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:button-item:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:button-item:onCssClassChange");
java.lang.String _onDefaultStateChange = (java.lang.String)request.getAttribute("alloy:button-item:onDefaultStateChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:button-item:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:button-item:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:button-item:onDisabledChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:button-item:onFocusedChange");
java.lang.String _onHandlerChange = (java.lang.String)request.getAttribute("alloy:button-item:onHandlerChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:button-item:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:button-item:onHideClassChange");
java.lang.String _onHoverStateChange = (java.lang.String)request.getAttribute("alloy:button-item:onHoverStateChange");
java.lang.String _onIconChange = (java.lang.String)request.getAttribute("alloy:button-item:onIconChange");
java.lang.String _onIconNodeChange = (java.lang.String)request.getAttribute("alloy:button-item:onIconNodeChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:button-item:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:button-item:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:button-item:onInitializedChange");
java.lang.String _onLabelChange = (java.lang.String)request.getAttribute("alloy:button-item:onLabelChange");
java.lang.String _onLabelNodeChange = (java.lang.String)request.getAttribute("alloy:button-item:onLabelNodeChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:button-item:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:button-item:onRenderedChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:button-item:onSrcNodeChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:button-item:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:button-item:onTabIndexChange");
java.lang.String _onTitleChange = (java.lang.String)request.getAttribute("alloy:button-item:onTitleChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:button-item:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:button-item:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:button-item:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:button-item:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_activeState != null) {
	scopedAttributes.put("activeState", _activeState);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_classNames != null) {
	scopedAttributes.put("classNames", _classNames);
}

if (_contentBox != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (_cssClass != null) {
	scopedAttributes.put("cssClass", _cssClass);
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

if (_handler != null) {
	scopedAttributes.put("handler", _handler);
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

if (_icon != null) {
	scopedAttributes.put("icon", _icon);
}

if (_iconNode != null) {
	scopedAttributes.put("iconNode", _iconNode);
}

if (_buttonitemId != null) {
	scopedAttributes.put("buttonitemId", _buttonitemId);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_label != null) {
	scopedAttributes.put("label", _label);
}

if (_labelNode != null) {
	scopedAttributes.put("labelNode", _labelNode);
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

if (_title != null) {
	scopedAttributes.put("title", _title);
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

if (_afterClassNamesChange != null) {
	scopedAttributes.put("afterClassNamesChange", _afterClassNamesChange);
}

if (_afterContentBoxChange != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (_afterCssClassChange != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
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

if (_afterHandlerChange != null) {
	scopedAttributes.put("afterHandlerChange", _afterHandlerChange);
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

if (_afterIconChange != null) {
	scopedAttributes.put("afterIconChange", _afterIconChange);
}

if (_afterIconNodeChange != null) {
	scopedAttributes.put("afterIconNodeChange", _afterIconNodeChange);
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

if (_afterLabelChange != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (_afterLabelNodeChange != null) {
	scopedAttributes.put("afterLabelNodeChange", _afterLabelNodeChange);
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

if (_afterTitleChange != null) {
	scopedAttributes.put("afterTitleChange", _afterTitleChange);
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

if (_onClassNamesChange != null) {
	scopedAttributes.put("onClassNamesChange", _onClassNamesChange);
}

if (_onContentBoxChange != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (_onCssClassChange != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
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

if (_onHandlerChange != null) {
	scopedAttributes.put("onHandlerChange", _onHandlerChange);
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

if (_onIconChange != null) {
	scopedAttributes.put("onIconChange", _onIconChange);
}

if (_onIconNodeChange != null) {
	scopedAttributes.put("onIconNodeChange", _onIconNodeChange);
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

if (_onLabelChange != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (_onLabelNodeChange != null) {
	scopedAttributes.put("onLabelNodeChange", _onLabelNodeChange);
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

if (_onTitleChange != null) {
	scopedAttributes.put("onTitleChange", _onTitleChange);
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