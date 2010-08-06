<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:panel:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:panel:scopedAttributes");

java.lang.String _panelBodyContent = (java.lang.String)request.getAttribute("alloy:panel:panelBodyContent");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:panel:boundingBox");
java.lang.Boolean _collapsed = (java.lang.Boolean)request.getAttribute("alloy:panel:collapsed");
java.lang.Boolean _collapsible = (java.lang.Boolean)request.getAttribute("alloy:panel:collapsible");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:panel:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:panel:cssClass");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:panel:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:panel:disabled");
java.lang.String _fillHeight = (java.lang.String)request.getAttribute("alloy:panel:fillHeight");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:panel:focused");
java.lang.String _footerContent = (java.lang.String)request.getAttribute("alloy:panel:footerContent");
java.lang.String _headerContent = (java.lang.String)request.getAttribute("alloy:panel:headerContent");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:panel:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:panel:hideClass");
java.lang.String _icons = (java.lang.String)request.getAttribute("alloy:panel:icons");
java.lang.String _panelId = (java.lang.String)request.getAttribute("alloy:panel:panelId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:panel:initialized");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:panel:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:panel:rendered");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:panel:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:panel:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:panel:tabIndex");
java.lang.String _title = (java.lang.String)request.getAttribute("alloy:panel:title");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:panel:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:panel:width");
java.lang.String _afterBodyContentChange = (java.lang.String)request.getAttribute("alloy:panel:afterBodyContentChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:panel:afterBoundingBoxChange");
java.lang.String _afterCollapsedChange = (java.lang.String)request.getAttribute("alloy:panel:afterCollapsedChange");
java.lang.String _afterCollapsibleChange = (java.lang.String)request.getAttribute("alloy:panel:afterCollapsibleChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:panel:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:panel:afterCssClassChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:panel:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:panel:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:panel:afterDisabledChange");
java.lang.String _afterFillHeightChange = (java.lang.String)request.getAttribute("alloy:panel:afterFillHeightChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:panel:afterFocusedChange");
java.lang.String _afterFooterContentChange = (java.lang.String)request.getAttribute("alloy:panel:afterFooterContentChange");
java.lang.String _afterHeaderContentChange = (java.lang.String)request.getAttribute("alloy:panel:afterHeaderContentChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:panel:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:panel:afterHideClassChange");
java.lang.String _afterIconsChange = (java.lang.String)request.getAttribute("alloy:panel:afterIconsChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:panel:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:panel:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:panel:afterInitializedChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:panel:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:panel:afterRenderedChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:panel:afterSrcNodeChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:panel:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:panel:afterTabIndexChange");
java.lang.String _afterTitleChange = (java.lang.String)request.getAttribute("alloy:panel:afterTitleChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:panel:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:panel:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:panel:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:panel:afterWidthChange");
java.lang.String _onBodyContentChange = (java.lang.String)request.getAttribute("alloy:panel:onBodyContentChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:panel:onBoundingBoxChange");
java.lang.String _onCollapsedChange = (java.lang.String)request.getAttribute("alloy:panel:onCollapsedChange");
java.lang.String _onCollapsibleChange = (java.lang.String)request.getAttribute("alloy:panel:onCollapsibleChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:panel:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:panel:onCssClassChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:panel:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:panel:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:panel:onDisabledChange");
java.lang.String _onFillHeightChange = (java.lang.String)request.getAttribute("alloy:panel:onFillHeightChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:panel:onFocusedChange");
java.lang.String _onFooterContentChange = (java.lang.String)request.getAttribute("alloy:panel:onFooterContentChange");
java.lang.String _onHeaderContentChange = (java.lang.String)request.getAttribute("alloy:panel:onHeaderContentChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:panel:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:panel:onHideClassChange");
java.lang.String _onIconsChange = (java.lang.String)request.getAttribute("alloy:panel:onIconsChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:panel:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:panel:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:panel:onInitializedChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:panel:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:panel:onRenderedChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:panel:onSrcNodeChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:panel:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:panel:onTabIndexChange");
java.lang.String _onTitleChange = (java.lang.String)request.getAttribute("alloy:panel:onTitleChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:panel:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:panel:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:panel:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:panel:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_panelBodyContent != null) {
	scopedAttributes.put("panelBodyContent", _panelBodyContent);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_collapsed != null) {
	scopedAttributes.put("collapsed", _collapsed);
}

if (_collapsible != null) {
	scopedAttributes.put("collapsible", _collapsible);
}

if (_contentBox != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (_cssClass != null) {
	scopedAttributes.put("cssClass", _cssClass);
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

if (_icons != null) {
	scopedAttributes.put("icons", _icons);
}

if (_panelId != null) {
	scopedAttributes.put("panelId", _panelId);
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

if (_afterBodyContentChange != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (_afterCollapsedChange != null) {
	scopedAttributes.put("afterCollapsedChange", _afterCollapsedChange);
}

if (_afterCollapsibleChange != null) {
	scopedAttributes.put("afterCollapsibleChange", _afterCollapsibleChange);
}

if (_afterContentBoxChange != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (_afterCssClassChange != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
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

if (_afterIconsChange != null) {
	scopedAttributes.put("afterIconsChange", _afterIconsChange);
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

if (_onBodyContentChange != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (_onCollapsedChange != null) {
	scopedAttributes.put("onCollapsedChange", _onCollapsedChange);
}

if (_onCollapsibleChange != null) {
	scopedAttributes.put("onCollapsibleChange", _onCollapsibleChange);
}

if (_onContentBoxChange != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (_onCssClassChange != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
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

if (_onIconsChange != null) {
	scopedAttributes.put("onIconsChange", _onIconsChange);
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