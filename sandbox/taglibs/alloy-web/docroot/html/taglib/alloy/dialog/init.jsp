<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:dialog:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:dialog:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:dialog:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.String _dialogBodyContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:dialogBodyContent"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:boundingBox"));
java.lang.Object _buttons = (java.lang.Object)request.getAttribute("alloy:dialog:buttons");
java.lang.Boolean _close = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:close"), true);
java.lang.Boolean _collapsed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:collapsed"), false);
java.lang.Boolean _collapsible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:collapsible"), false);
java.lang.Object _constrain2view = (java.lang.Object)request.getAttribute("alloy:dialog:constrain2view");
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:cssClass"));
java.lang.Boolean _destroyOnClose = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:destroyOnClose"), false);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:disabled"), false);
java.lang.String _dragInstance = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:dragInstance"));
java.lang.Boolean _draggable = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:draggable"), true);
java.lang.String _fillHeight = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:fillHeight"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:focused"), false);
java.lang.String _footerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:footerContent"));
java.lang.String _headerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:headerContent"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:hideClass"), "aui-helper-hidden");
java.lang.Object _icons = (java.lang.Object)request.getAttribute("alloy:dialog:icons");
java.lang.String _dialogId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:dialogId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:initialized"), false);
java.lang.Boolean _modal = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:modal"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:rendered"), false);
java.lang.Boolean _resizable = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:resizable"), true);
java.lang.String _resizableInstance = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:resizableInstance"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:srcNode"));
java.lang.Boolean _stack = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:stack"), true);
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:dialog:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:dialog:tabIndex"), 0);
java.lang.String _title = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:title"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:visible"), true);
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:width"));
java.lang.String _afterBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterBodyContentChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterBoundingBoxChange"));
java.lang.String _afterButtonsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterButtonsChange"));
java.lang.String _afterCloseChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterCloseChange"));
java.lang.String _afterCollapsedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterCollapsedChange"));
java.lang.String _afterCollapsibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterCollapsibleChange"));
java.lang.String _afterConstrain2viewChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterConstrain2viewChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterCssClassChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterDestroy"));
java.lang.String _afterDestroyOnCloseChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterDestroyOnCloseChange"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterDisabledChange"));
java.lang.String _afterDragInstanceChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterDragInstanceChange"));
java.lang.String _afterDraggableChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterDraggableChange"));
java.lang.String _afterFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterFillHeightChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterFocusedChange"));
java.lang.String _afterFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterFooterContentChange"));
java.lang.String _afterHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterHeaderContentChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterHideClassChange"));
java.lang.String _afterIconsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterIconsChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterInitializedChange"));
java.lang.String _afterModalChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterModalChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterRenderedChange"));
java.lang.String _afterResizableChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterResizableChange"));
java.lang.String _afterResizableInstanceChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterResizableInstanceChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterSrcNodeChange"));
java.lang.String _afterStackChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterStackChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterTabIndexChange"));
java.lang.String _afterTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterTitleChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:afterWidthChange"));
java.lang.String _onBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onBodyContentChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onBoundingBoxChange"));
java.lang.String _onButtonsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onButtonsChange"));
java.lang.String _onCloseChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onCloseChange"));
java.lang.String _onCollapsedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onCollapsedChange"));
java.lang.String _onCollapsibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onCollapsibleChange"));
java.lang.String _onConstrain2viewChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onConstrain2viewChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onCssClassChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onDestroy"));
java.lang.String _onDestroyOnCloseChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onDestroyOnCloseChange"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onDisabledChange"));
java.lang.String _onDragInstanceChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onDragInstanceChange"));
java.lang.String _onDraggableChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onDraggableChange"));
java.lang.String _onFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onFillHeightChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onFocusedChange"));
java.lang.String _onFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onFooterContentChange"));
java.lang.String _onHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onHeaderContentChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onHideClassChange"));
java.lang.String _onIconsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onIconsChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onInitializedChange"));
java.lang.String _onModalChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onModalChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onRenderedChange"));
java.lang.String _onResizableChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onResizableChange"));
java.lang.String _onResizableInstanceChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onResizableInstanceChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onSrcNodeChange"));
java.lang.String _onStackChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onStackChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onTabIndexChange"));
java.lang.String _onTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onTitleChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:dialog:onWidthChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:dialog:dialogBodyContent") != null) {
	scopedAttributes.put("dialogBodyContent", _dialogBodyContent);
}

if (request.getAttribute("alloy:dialog:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:dialog:buttons") != null) {
	scopedAttributes.put("buttons", _buttons);
}

if (request.getAttribute("alloy:dialog:close") != null) {
	scopedAttributes.put("close", _close);
}

if (request.getAttribute("alloy:dialog:collapsed") != null) {
	scopedAttributes.put("collapsed", _collapsed);
}

if (request.getAttribute("alloy:dialog:collapsible") != null) {
	scopedAttributes.put("collapsible", _collapsible);
}

if (request.getAttribute("alloy:dialog:constrain2view") != null) {
	scopedAttributes.put("constrain2view", _constrain2view);
}

if (request.getAttribute("alloy:dialog:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:dialog:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:dialog:destroyOnClose") != null) {
	scopedAttributes.put("destroyOnClose", _destroyOnClose);
}

if (request.getAttribute("alloy:dialog:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:dialog:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:dialog:dragInstance") != null) {
	scopedAttributes.put("dragInstance", _dragInstance);
}

if (request.getAttribute("alloy:dialog:draggable") != null) {
	scopedAttributes.put("draggable", _draggable);
}

if (request.getAttribute("alloy:dialog:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:dialog:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:dialog:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:dialog:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:dialog:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:dialog:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:dialog:icons") != null) {
	scopedAttributes.put("icons", _icons);
}

if (request.getAttribute("alloy:dialog:dialogId") != null) {
	scopedAttributes.put("dialogId", _dialogId);
}

if (request.getAttribute("alloy:dialog:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:dialog:modal") != null) {
	scopedAttributes.put("modal", _modal);
}

if (request.getAttribute("alloy:dialog:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:dialog:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:dialog:resizable") != null) {
	scopedAttributes.put("resizable", _resizable);
}

if (request.getAttribute("alloy:dialog:resizableInstance") != null) {
	scopedAttributes.put("resizableInstance", _resizableInstance);
}

if (request.getAttribute("alloy:dialog:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:dialog:stack") != null) {
	scopedAttributes.put("stack", _stack);
}

if (request.getAttribute("alloy:dialog:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:dialog:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:dialog:title") != null) {
	scopedAttributes.put("title", _title);
}

if (request.getAttribute("alloy:dialog:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:dialog:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:dialog:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:dialog:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:dialog:afterButtonsChange") != null) {
	scopedAttributes.put("afterButtonsChange", _afterButtonsChange);
}

if (request.getAttribute("alloy:dialog:afterCloseChange") != null) {
	scopedAttributes.put("afterCloseChange", _afterCloseChange);
}

if (request.getAttribute("alloy:dialog:afterCollapsedChange") != null) {
	scopedAttributes.put("afterCollapsedChange", _afterCollapsedChange);
}

if (request.getAttribute("alloy:dialog:afterCollapsibleChange") != null) {
	scopedAttributes.put("afterCollapsibleChange", _afterCollapsibleChange);
}

if (request.getAttribute("alloy:dialog:afterConstrain2viewChange") != null) {
	scopedAttributes.put("afterConstrain2viewChange", _afterConstrain2viewChange);
}

if (request.getAttribute("alloy:dialog:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:dialog:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:dialog:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:dialog:afterDestroyOnCloseChange") != null) {
	scopedAttributes.put("afterDestroyOnCloseChange", _afterDestroyOnCloseChange);
}

if (request.getAttribute("alloy:dialog:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:dialog:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:dialog:afterDragInstanceChange") != null) {
	scopedAttributes.put("afterDragInstanceChange", _afterDragInstanceChange);
}

if (request.getAttribute("alloy:dialog:afterDraggableChange") != null) {
	scopedAttributes.put("afterDraggableChange", _afterDraggableChange);
}

if (request.getAttribute("alloy:dialog:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:dialog:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:dialog:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:dialog:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:dialog:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:dialog:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:dialog:afterIconsChange") != null) {
	scopedAttributes.put("afterIconsChange", _afterIconsChange);
}

if (request.getAttribute("alloy:dialog:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:dialog:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:dialog:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:dialog:afterModalChange") != null) {
	scopedAttributes.put("afterModalChange", _afterModalChange);
}

if (request.getAttribute("alloy:dialog:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:dialog:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:dialog:afterResizableChange") != null) {
	scopedAttributes.put("afterResizableChange", _afterResizableChange);
}

if (request.getAttribute("alloy:dialog:afterResizableInstanceChange") != null) {
	scopedAttributes.put("afterResizableInstanceChange", _afterResizableInstanceChange);
}

if (request.getAttribute("alloy:dialog:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:dialog:afterStackChange") != null) {
	scopedAttributes.put("afterStackChange", _afterStackChange);
}

if (request.getAttribute("alloy:dialog:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:dialog:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:dialog:afterTitleChange") != null) {
	scopedAttributes.put("afterTitleChange", _afterTitleChange);
}

if (request.getAttribute("alloy:dialog:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:dialog:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:dialog:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:dialog:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:dialog:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:dialog:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:dialog:onButtonsChange") != null) {
	scopedAttributes.put("onButtonsChange", _onButtonsChange);
}

if (request.getAttribute("alloy:dialog:onCloseChange") != null) {
	scopedAttributes.put("onCloseChange", _onCloseChange);
}

if (request.getAttribute("alloy:dialog:onCollapsedChange") != null) {
	scopedAttributes.put("onCollapsedChange", _onCollapsedChange);
}

if (request.getAttribute("alloy:dialog:onCollapsibleChange") != null) {
	scopedAttributes.put("onCollapsibleChange", _onCollapsibleChange);
}

if (request.getAttribute("alloy:dialog:onConstrain2viewChange") != null) {
	scopedAttributes.put("onConstrain2viewChange", _onConstrain2viewChange);
}

if (request.getAttribute("alloy:dialog:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:dialog:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:dialog:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:dialog:onDestroyOnCloseChange") != null) {
	scopedAttributes.put("onDestroyOnCloseChange", _onDestroyOnCloseChange);
}

if (request.getAttribute("alloy:dialog:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:dialog:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:dialog:onDragInstanceChange") != null) {
	scopedAttributes.put("onDragInstanceChange", _onDragInstanceChange);
}

if (request.getAttribute("alloy:dialog:onDraggableChange") != null) {
	scopedAttributes.put("onDraggableChange", _onDraggableChange);
}

if (request.getAttribute("alloy:dialog:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:dialog:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:dialog:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:dialog:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:dialog:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:dialog:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:dialog:onIconsChange") != null) {
	scopedAttributes.put("onIconsChange", _onIconsChange);
}

if (request.getAttribute("alloy:dialog:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:dialog:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:dialog:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:dialog:onModalChange") != null) {
	scopedAttributes.put("onModalChange", _onModalChange);
}

if (request.getAttribute("alloy:dialog:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:dialog:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:dialog:onResizableChange") != null) {
	scopedAttributes.put("onResizableChange", _onResizableChange);
}

if (request.getAttribute("alloy:dialog:onResizableInstanceChange") != null) {
	scopedAttributes.put("onResizableInstanceChange", _onResizableInstanceChange);
}

if (request.getAttribute("alloy:dialog:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:dialog:onStackChange") != null) {
	scopedAttributes.put("onStackChange", _onStackChange);
}

if (request.getAttribute("alloy:dialog:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:dialog:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:dialog:onTitleChange") != null) {
	scopedAttributes.put("onTitleChange", _onTitleChange);
}

if (request.getAttribute("alloy:dialog:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:dialog:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:dialog:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:dialog:onWidthChange") != null) {
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