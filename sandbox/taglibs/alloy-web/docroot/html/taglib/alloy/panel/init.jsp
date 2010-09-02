<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:panel:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:panel:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:panel:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:panel:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:panel:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Object _panelBodyContent = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:panelBodyContent"));
java.lang.Boolean _collapsed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:panel:collapsed"), false);
java.lang.Boolean _collapsible = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:panel:collapsible"), false);
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:panel:cssClass"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:panel:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:panel:disabled"), false);
java.lang.Object _fillHeight = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:fillHeight"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:panel:focused"), false);
java.lang.Object _footerContent = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:footerContent"));
java.lang.Object _headerContent = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:headerContent"));
java.lang.Object _height = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:panel:hideClass"), "aui-helper-hidden");
java.util.ArrayList _icons = JSONFactoryUtil.getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:icons"), "[]"));
java.lang.String _panelId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:panel:panelId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:panel:initialized"), false);
java.lang.Object _render = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:panel:rendered"), false);
java.util.HashMap _strings = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:strings")));
java.lang.Number _tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:panel:tabIndex")), 0);
java.lang.Object _title = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:title"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:panel:visible"), true);
java.lang.Object _width = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:width"));
java.lang.Object _afterBodyContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterBodyContentChange"));
java.lang.Object _afterBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterBoundingBoxChange"));
java.lang.Object _afterCollapsedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterCollapsedChange"));
java.lang.Object _afterCollapsibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterCollapsibleChange"));
java.lang.Object _afterContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterContentBoxChange"));
java.lang.Object _afterCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterCssClassChange"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterDestroyedChange"));
java.lang.Object _afterDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterDisabledChange"));
java.lang.Object _afterFillHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterFillHeightChange"));
java.lang.Object _afterFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterFocusedChange"));
java.lang.Object _afterFooterContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterFooterContentChange"));
java.lang.Object _afterHeaderContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterHeaderContentChange"));
java.lang.Object _afterHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterHeightChange"));
java.lang.Object _afterHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterHideClassChange"));
java.lang.Object _afterIconsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterIconsChange"));
java.lang.Object _afterIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterIdChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterInitializedChange"));
java.lang.Object _afterRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterRenderChange"));
java.lang.Object _afterRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterRenderedChange"));
java.lang.Object _afterSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterSrcNodeChange"));
java.lang.Object _afterStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterStringsChange"));
java.lang.Object _afterTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterTabIndexChange"));
java.lang.Object _afterTitleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterTitleChange"));
java.lang.Object _afterVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterVisibleChange"));
java.lang.Object _afterContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterContentUpdate"));
java.lang.Object _afterRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterRender"));
java.lang.Object _afterWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:afterWidthChange"));
java.lang.Object _onBodyContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onBodyContentChange"));
java.lang.Object _onBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onBoundingBoxChange"));
java.lang.Object _onCollapsedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onCollapsedChange"));
java.lang.Object _onCollapsibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onCollapsibleChange"));
java.lang.Object _onContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onContentBoxChange"));
java.lang.Object _onCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onCssClassChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onDestroyedChange"));
java.lang.Object _onDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onDisabledChange"));
java.lang.Object _onFillHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onFillHeightChange"));
java.lang.Object _onFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onFocusedChange"));
java.lang.Object _onFooterContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onFooterContentChange"));
java.lang.Object _onHeaderContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onHeaderContentChange"));
java.lang.Object _onHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onHeightChange"));
java.lang.Object _onHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onHideClassChange"));
java.lang.Object _onIconsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onIconsChange"));
java.lang.Object _onIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onIdChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onInitializedChange"));
java.lang.Object _onRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onRenderChange"));
java.lang.Object _onRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onRenderedChange"));
java.lang.Object _onSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onSrcNodeChange"));
java.lang.Object _onStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onStringsChange"));
java.lang.Object _onTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onTabIndexChange"));
java.lang.Object _onTitleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onTitleChange"));
java.lang.Object _onVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onVisibleChange"));
java.lang.Object _onContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onContentUpdate"));
java.lang.Object _onRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onRender"));
java.lang.Object _onWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:onWidthChange"));

String uniqueId = StringPool.BLANK;

boolean useJavaScript = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useJavaScript"), true);
boolean useMarkup = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useMarkup"), true);

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	String prefix = StringPool.POUND.concat(uniqueId);

	if (!hasBoundingBox) {
		_boundingBox = prefix.concat("BoundingBox");

		options.put("boundingBox", _boundingBox);
	}

	if (!hasSrcNode && !hasContentBox) {
		_srcNode = prefix.concat("SrcNode");

		options.put("srcNode", _srcNode);
	}

	if (!hasSrcNode && hasContentBox) {
		_contentBox = prefix.concat("ContentBox");

		options.put("contentBox", _contentBox);
	}
}

_updateOptions(options, "panelBodyContent", _panelBodyContent);
_updateOptions(options, "boundingBox", _boundingBox);
_updateOptions(options, "collapsed", _collapsed);
_updateOptions(options, "collapsible", _collapsible);
_updateOptions(options, "contentBox", _contentBox);
_updateOptions(options, "cssClass", _cssClass);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "disabled", _disabled);
_updateOptions(options, "fillHeight", _fillHeight);
_updateOptions(options, "focused", _focused);
_updateOptions(options, "footerContent", _footerContent);
_updateOptions(options, "headerContent", _headerContent);
_updateOptions(options, "height", _height);
_updateOptions(options, "hideClass", _hideClass);
_updateOptions(options, "icons", _icons);
_updateOptions(options, "panelId", _panelId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "render", _render);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "title", _title);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "afterBodyContentChange", _afterBodyContentChange);
_updateOptions(options, "afterBoundingBoxChange", _afterBoundingBoxChange);
_updateOptions(options, "afterCollapsedChange", _afterCollapsedChange);
_updateOptions(options, "afterCollapsibleChange", _afterCollapsibleChange);
_updateOptions(options, "afterContentBoxChange", _afterContentBoxChange);
_updateOptions(options, "afterCssClassChange", _afterCssClassChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDisabledChange", _afterDisabledChange);
_updateOptions(options, "afterFillHeightChange", _afterFillHeightChange);
_updateOptions(options, "afterFocusedChange", _afterFocusedChange);
_updateOptions(options, "afterFooterContentChange", _afterFooterContentChange);
_updateOptions(options, "afterHeaderContentChange", _afterHeaderContentChange);
_updateOptions(options, "afterHeightChange", _afterHeightChange);
_updateOptions(options, "afterHideClassChange", _afterHideClassChange);
_updateOptions(options, "afterIconsChange", _afterIconsChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
_updateOptions(options, "afterTitleChange", _afterTitleChange);
_updateOptions(options, "afterVisibleChange", _afterVisibleChange);
_updateOptions(options, "afterContentUpdate", _afterContentUpdate);
_updateOptions(options, "afterRender", _afterRender);
_updateOptions(options, "afterWidthChange", _afterWidthChange);
_updateOptions(options, "onBodyContentChange", _onBodyContentChange);
_updateOptions(options, "onBoundingBoxChange", _onBoundingBoxChange);
_updateOptions(options, "onCollapsedChange", _onCollapsedChange);
_updateOptions(options, "onCollapsibleChange", _onCollapsibleChange);
_updateOptions(options, "onContentBoxChange", _onContentBoxChange);
_updateOptions(options, "onCssClassChange", _onCssClassChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDisabledChange", _onDisabledChange);
_updateOptions(options, "onFillHeightChange", _onFillHeightChange);
_updateOptions(options, "onFocusedChange", _onFocusedChange);
_updateOptions(options, "onFooterContentChange", _onFooterContentChange);
_updateOptions(options, "onHeaderContentChange", _onHeaderContentChange);
_updateOptions(options, "onHeightChange", _onHeightChange);
_updateOptions(options, "onHideClassChange", _onHideClassChange);
_updateOptions(options, "onIconsChange", _onIconsChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
_updateOptions(options, "onTitleChange", _onTitleChange);
_updateOptions(options, "onVisibleChange", _onVisibleChange);
_updateOptions(options, "onContentUpdate", _onContentUpdate);
_updateOptions(options, "onRender", _onRender);
_updateOptions(options, "onWidthChange", _onWidthChange);
%>

<%@ include file="init-ext.jsp" %>