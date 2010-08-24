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

java.lang.Boolean _activeState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:activeState"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:boundingBox"));
java.lang.Object _classNames = (java.lang.Object)request.getAttribute("alloy:button-item:classNames");
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:cssClass"));
java.lang.Boolean _defaultState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:defaultState"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:disabled"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:focused"));
java.lang.String _handler = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:handler"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:hideClass"));
java.lang.Boolean _hoverState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:hoverState"));
java.lang.String _icon = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:icon"));
java.lang.String _iconNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:iconNode"));
java.lang.String _buttonitemId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:buttonitemId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:initialized"));
java.lang.String _label = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:label"));
java.lang.String _labelNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:labelNode"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:render"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:rendered"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:button-item:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:button-item:tabIndex"));
java.lang.String _title = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:title"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:width"));
java.lang.String _afterActiveStateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterActiveStateChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterBoundingBoxChange"));
java.lang.String _afterClassNamesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterClassNamesChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterCssClassChange"));
java.lang.String _afterDefaultStateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterDefaultStateChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterDisabledChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterFocusedChange"));
java.lang.String _afterHandlerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterHandlerChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterHideClassChange"));
java.lang.String _afterHoverStateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterHoverStateChange"));
java.lang.String _afterIconChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterIconChange"));
java.lang.String _afterIconNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterIconNodeChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterInitializedChange"));
java.lang.String _afterLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterLabelChange"));
java.lang.String _afterLabelNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterLabelNodeChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterRenderedChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterSrcNodeChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterTabIndexChange"));
java.lang.String _afterTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterTitleChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:afterWidthChange"));
java.lang.String _onActiveStateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onActiveStateChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onBoundingBoxChange"));
java.lang.String _onClassNamesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onClassNamesChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onCssClassChange"));
java.lang.String _onDefaultStateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onDefaultStateChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onDisabledChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onFocusedChange"));
java.lang.String _onHandlerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onHandlerChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onHideClassChange"));
java.lang.String _onHoverStateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onHoverStateChange"));
java.lang.String _onIconChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onIconChange"));
java.lang.String _onIconNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onIconNodeChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onInitializedChange"));
java.lang.String _onLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onLabelChange"));
java.lang.String _onLabelNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onLabelNodeChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onRenderedChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onSrcNodeChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onTabIndexChange"));
java.lang.String _onTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onTitleChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:button-item:onWidthChange"));
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