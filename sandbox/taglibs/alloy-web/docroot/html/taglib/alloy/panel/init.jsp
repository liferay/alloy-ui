<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:panel:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:panel:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:panel:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _panelBodyContent = (java.lang.Object)request.getAttribute("alloy:panel:panelBodyContent");
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:panel:boundingBox");
java.lang.Boolean _collapsed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:panel:collapsed"), false);
java.lang.Boolean _collapsible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:panel:collapsible"), false);
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:panel:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:panel:cssClass");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:panel:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:panel:disabled"), false);
java.lang.Object _fillHeight = (java.lang.Object)request.getAttribute("alloy:panel:fillHeight");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:panel:focused"), false);
java.lang.Object _footerContent = (java.lang.Object)request.getAttribute("alloy:panel:footerContent");
java.lang.Object _headerContent = (java.lang.Object)request.getAttribute("alloy:panel:headerContent");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:panel:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:panel:hideClass");
java.lang.Object _icons = (java.lang.Object)request.getAttribute("alloy:panel:icons");
java.lang.Object _panelId = (java.lang.Object)request.getAttribute("alloy:panel:panelId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:panel:initialized"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:panel:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:panel:rendered"), false);
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:panel:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:panel:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:panel:tabIndex"), 0);
java.lang.Object _title = (java.lang.Object)request.getAttribute("alloy:panel:title");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:panel:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:panel:width");
java.lang.Object _afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:panel:afterBodyContentChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:panel:afterBoundingBoxChange");
java.lang.Object _afterCollapsedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterCollapsedChange");
java.lang.Object _afterCollapsibleChange = (java.lang.Object)request.getAttribute("alloy:panel:afterCollapsibleChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:panel:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:panel:afterCssClassChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:panel:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:panel:afterDisabledChange");
java.lang.Object _afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:panel:afterFillHeightChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterFocusedChange");
java.lang.Object _afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:panel:afterFooterContentChange");
java.lang.Object _afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:panel:afterHeaderContentChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:panel:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:panel:afterHideClassChange");
java.lang.Object _afterIconsChange = (java.lang.Object)request.getAttribute("alloy:panel:afterIconsChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:panel:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:panel:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterInitializedChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:panel:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterRenderedChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:panel:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:panel:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:panel:afterTabIndexChange");
java.lang.Object _afterTitleChange = (java.lang.Object)request.getAttribute("alloy:panel:afterTitleChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:panel:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:panel:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:panel:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:panel:afterWidthChange");
java.lang.Object _onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:panel:onBodyContentChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:panel:onBoundingBoxChange");
java.lang.Object _onCollapsedChange = (java.lang.Object)request.getAttribute("alloy:panel:onCollapsedChange");
java.lang.Object _onCollapsibleChange = (java.lang.Object)request.getAttribute("alloy:panel:onCollapsibleChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:panel:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:panel:onCssClassChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:panel:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:panel:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:panel:onDisabledChange");
java.lang.Object _onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:panel:onFillHeightChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:panel:onFocusedChange");
java.lang.Object _onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:panel:onFooterContentChange");
java.lang.Object _onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:panel:onHeaderContentChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:panel:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:panel:onHideClassChange");
java.lang.Object _onIconsChange = (java.lang.Object)request.getAttribute("alloy:panel:onIconsChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:panel:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:panel:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:panel:onInitializedChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:panel:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:panel:onRenderedChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:panel:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:panel:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:panel:onTabIndexChange");
java.lang.Object _onTitleChange = (java.lang.Object)request.getAttribute("alloy:panel:onTitleChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:panel:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:panel:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:panel:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:panel:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:panel:panelBodyContent") != null) {
	scopedAttributes.put("panelBodyContent", _panelBodyContent);
}

if (request.getAttribute("alloy:panel:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:panel:collapsed") != null) {
	scopedAttributes.put("collapsed", _collapsed);
}

if (request.getAttribute("alloy:panel:collapsible") != null) {
	scopedAttributes.put("collapsible", _collapsible);
}

if (request.getAttribute("alloy:panel:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:panel:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:panel:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:panel:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:panel:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:panel:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:panel:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:panel:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:panel:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:panel:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:panel:icons") != null) {
	scopedAttributes.put("icons", _icons);
}

if (request.getAttribute("alloy:panel:panelId") != null) {
	scopedAttributes.put("panelId", _panelId);
}

if (request.getAttribute("alloy:panel:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:panel:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:panel:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:panel:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:panel:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:panel:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:panel:title") != null) {
	scopedAttributes.put("title", _title);
}

if (request.getAttribute("alloy:panel:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:panel:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:panel:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:panel:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:panel:afterCollapsedChange") != null) {
	scopedAttributes.put("afterCollapsedChange", _afterCollapsedChange);
}

if (request.getAttribute("alloy:panel:afterCollapsibleChange") != null) {
	scopedAttributes.put("afterCollapsibleChange", _afterCollapsibleChange);
}

if (request.getAttribute("alloy:panel:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:panel:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:panel:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:panel:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:panel:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:panel:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:panel:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:panel:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:panel:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:panel:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:panel:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:panel:afterIconsChange") != null) {
	scopedAttributes.put("afterIconsChange", _afterIconsChange);
}

if (request.getAttribute("alloy:panel:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:panel:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:panel:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:panel:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:panel:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:panel:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:panel:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:panel:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:panel:afterTitleChange") != null) {
	scopedAttributes.put("afterTitleChange", _afterTitleChange);
}

if (request.getAttribute("alloy:panel:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:panel:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:panel:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:panel:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:panel:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:panel:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:panel:onCollapsedChange") != null) {
	scopedAttributes.put("onCollapsedChange", _onCollapsedChange);
}

if (request.getAttribute("alloy:panel:onCollapsibleChange") != null) {
	scopedAttributes.put("onCollapsibleChange", _onCollapsibleChange);
}

if (request.getAttribute("alloy:panel:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:panel:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:panel:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:panel:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:panel:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:panel:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:panel:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:panel:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:panel:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:panel:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:panel:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:panel:onIconsChange") != null) {
	scopedAttributes.put("onIconsChange", _onIconsChange);
}

if (request.getAttribute("alloy:panel:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:panel:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:panel:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:panel:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:panel:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:panel:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:panel:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:panel:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:panel:onTitleChange") != null) {
	scopedAttributes.put("onTitleChange", _onTitleChange);
}

if (request.getAttribute("alloy:panel:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:panel:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:panel:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:panel:onWidthChange") != null) {
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