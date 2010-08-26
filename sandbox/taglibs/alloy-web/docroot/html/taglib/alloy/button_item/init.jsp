<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:button-item:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:button-item:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:button-item:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Boolean _activeState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:activeState"), false);
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:button-item:boundingBox");
java.lang.Object _classNames = (java.lang.Object)request.getAttribute("alloy:button-item:classNames");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:button-item:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:button-item:cssClass");
java.lang.Boolean _defaultState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:defaultState"), true);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:focused"), false);
java.lang.Object _handler = (java.lang.Object)request.getAttribute("alloy:button-item:handler");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:button-item:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:button-item:hideClass");
java.lang.Boolean _hoverState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:hoverState"), true);
java.lang.Object _icon = (java.lang.Object)request.getAttribute("alloy:button-item:icon");
java.lang.Object _iconNode = (java.lang.Object)request.getAttribute("alloy:button-item:iconNode");
java.lang.Object _buttonitemId = (java.lang.Object)request.getAttribute("alloy:button-item:buttonitemId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:initialized"), false);
java.lang.Object _label = (java.lang.Object)request.getAttribute("alloy:button-item:label");
java.lang.Object _labelNode = (java.lang.Object)request.getAttribute("alloy:button-item:labelNode");
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:rendered"), false);
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:button-item:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:button-item:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:button-item:tabIndex"), 0);
java.lang.Object _title = (java.lang.Object)request.getAttribute("alloy:button-item:title");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:button-item:width");
java.lang.Object _afterActiveStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterActiveStateChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterBoundingBoxChange");
java.lang.Object _afterClassNamesChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterClassNamesChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterCssClassChange");
java.lang.Object _afterDefaultStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterDefaultStateChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:button-item:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterDisabledChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterFocusedChange");
java.lang.Object _afterHandlerChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterHandlerChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterHideClassChange");
java.lang.Object _afterHoverStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterHoverStateChange");
java.lang.Object _afterIconChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterIconChange");
java.lang.Object _afterIconNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterIconNodeChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:button-item:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterInitializedChange");
java.lang.Object _afterLabelChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterLabelChange");
java.lang.Object _afterLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterLabelNodeChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterRenderedChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterTabIndexChange");
java.lang.Object _afterTitleChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterTitleChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:button-item:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:button-item:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterWidthChange");
java.lang.Object _onActiveStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:onActiveStateChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:button-item:onBoundingBoxChange");
java.lang.Object _onClassNamesChange = (java.lang.Object)request.getAttribute("alloy:button-item:onClassNamesChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:button-item:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:button-item:onCssClassChange");
java.lang.Object _onDefaultStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:onDefaultStateChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:button-item:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:button-item:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:button-item:onDisabledChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:button-item:onFocusedChange");
java.lang.Object _onHandlerChange = (java.lang.Object)request.getAttribute("alloy:button-item:onHandlerChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:button-item:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:button-item:onHideClassChange");
java.lang.Object _onHoverStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:onHoverStateChange");
java.lang.Object _onIconChange = (java.lang.Object)request.getAttribute("alloy:button-item:onIconChange");
java.lang.Object _onIconNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:onIconNodeChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:button-item:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:button-item:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:button-item:onInitializedChange");
java.lang.Object _onLabelChange = (java.lang.Object)request.getAttribute("alloy:button-item:onLabelChange");
java.lang.Object _onLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:onLabelNodeChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:button-item:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:button-item:onRenderedChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:button-item:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:button-item:onTabIndexChange");
java.lang.Object _onTitleChange = (java.lang.Object)request.getAttribute("alloy:button-item:onTitleChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:button-item:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:button-item:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:button-item:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:button-item:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:button-item:activeState") != null) {
	scopedAttributes.put("activeState", _activeState);
}

if (request.getAttribute("alloy:button-item:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:button-item:classNames") != null) {
	scopedAttributes.put("classNames", _classNames);
}

if (request.getAttribute("alloy:button-item:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:button-item:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:button-item:defaultState") != null) {
	scopedAttributes.put("defaultState", _defaultState);
}

if (request.getAttribute("alloy:button-item:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:button-item:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:button-item:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:button-item:handler") != null) {
	scopedAttributes.put("handler", _handler);
}

if (request.getAttribute("alloy:button-item:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:button-item:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:button-item:hoverState") != null) {
	scopedAttributes.put("hoverState", _hoverState);
}

if (request.getAttribute("alloy:button-item:icon") != null) {
	scopedAttributes.put("icon", _icon);
}

if (request.getAttribute("alloy:button-item:iconNode") != null) {
	scopedAttributes.put("iconNode", _iconNode);
}

if (request.getAttribute("alloy:button-item:buttonitemId") != null) {
	scopedAttributes.put("buttonitemId", _buttonitemId);
}

if (request.getAttribute("alloy:button-item:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:button-item:label") != null) {
	scopedAttributes.put("label", _label);
}

if (request.getAttribute("alloy:button-item:labelNode") != null) {
	scopedAttributes.put("labelNode", _labelNode);
}

if (request.getAttribute("alloy:button-item:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:button-item:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:button-item:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:button-item:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:button-item:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:button-item:title") != null) {
	scopedAttributes.put("title", _title);
}

if (request.getAttribute("alloy:button-item:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:button-item:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:button-item:afterActiveStateChange") != null) {
	scopedAttributes.put("afterActiveStateChange", _afterActiveStateChange);
}

if (request.getAttribute("alloy:button-item:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:button-item:afterClassNamesChange") != null) {
	scopedAttributes.put("afterClassNamesChange", _afterClassNamesChange);
}

if (request.getAttribute("alloy:button-item:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:button-item:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:button-item:afterDefaultStateChange") != null) {
	scopedAttributes.put("afterDefaultStateChange", _afterDefaultStateChange);
}

if (request.getAttribute("alloy:button-item:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:button-item:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:button-item:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:button-item:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:button-item:afterHandlerChange") != null) {
	scopedAttributes.put("afterHandlerChange", _afterHandlerChange);
}

if (request.getAttribute("alloy:button-item:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:button-item:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:button-item:afterHoverStateChange") != null) {
	scopedAttributes.put("afterHoverStateChange", _afterHoverStateChange);
}

if (request.getAttribute("alloy:button-item:afterIconChange") != null) {
	scopedAttributes.put("afterIconChange", _afterIconChange);
}

if (request.getAttribute("alloy:button-item:afterIconNodeChange") != null) {
	scopedAttributes.put("afterIconNodeChange", _afterIconNodeChange);
}

if (request.getAttribute("alloy:button-item:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:button-item:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:button-item:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:button-item:afterLabelChange") != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (request.getAttribute("alloy:button-item:afterLabelNodeChange") != null) {
	scopedAttributes.put("afterLabelNodeChange", _afterLabelNodeChange);
}

if (request.getAttribute("alloy:button-item:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:button-item:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:button-item:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:button-item:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:button-item:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:button-item:afterTitleChange") != null) {
	scopedAttributes.put("afterTitleChange", _afterTitleChange);
}

if (request.getAttribute("alloy:button-item:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:button-item:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:button-item:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:button-item:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:button-item:onActiveStateChange") != null) {
	scopedAttributes.put("onActiveStateChange", _onActiveStateChange);
}

if (request.getAttribute("alloy:button-item:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:button-item:onClassNamesChange") != null) {
	scopedAttributes.put("onClassNamesChange", _onClassNamesChange);
}

if (request.getAttribute("alloy:button-item:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:button-item:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:button-item:onDefaultStateChange") != null) {
	scopedAttributes.put("onDefaultStateChange", _onDefaultStateChange);
}

if (request.getAttribute("alloy:button-item:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:button-item:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:button-item:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:button-item:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:button-item:onHandlerChange") != null) {
	scopedAttributes.put("onHandlerChange", _onHandlerChange);
}

if (request.getAttribute("alloy:button-item:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:button-item:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:button-item:onHoverStateChange") != null) {
	scopedAttributes.put("onHoverStateChange", _onHoverStateChange);
}

if (request.getAttribute("alloy:button-item:onIconChange") != null) {
	scopedAttributes.put("onIconChange", _onIconChange);
}

if (request.getAttribute("alloy:button-item:onIconNodeChange") != null) {
	scopedAttributes.put("onIconNodeChange", _onIconNodeChange);
}

if (request.getAttribute("alloy:button-item:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:button-item:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:button-item:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:button-item:onLabelChange") != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (request.getAttribute("alloy:button-item:onLabelNodeChange") != null) {
	scopedAttributes.put("onLabelNodeChange", _onLabelNodeChange);
}

if (request.getAttribute("alloy:button-item:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:button-item:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:button-item:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:button-item:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:button-item:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:button-item:onTitleChange") != null) {
	scopedAttributes.put("onTitleChange", _onTitleChange);
}

if (request.getAttribute("alloy:button-item:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:button-item:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:button-item:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:button-item:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>