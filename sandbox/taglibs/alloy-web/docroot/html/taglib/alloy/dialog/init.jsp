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

java.lang.Object _dialogBodyContent = (java.lang.Object)request.getAttribute("alloy:dialog:dialogBodyContent");
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:dialog:boundingBox");
java.lang.Object _buttons = (java.lang.Object)request.getAttribute("alloy:dialog:buttons");
java.lang.Boolean _close = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:close"), true);
java.lang.Boolean _collapsed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:collapsed"), false);
java.lang.Boolean _collapsible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:collapsible"), false);
java.lang.Object _constrain2view = (java.lang.Object)request.getAttribute("alloy:dialog:constrain2view");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:dialog:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:dialog:cssClass");
java.lang.Boolean _destroyOnClose = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:destroyOnClose"), false);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:disabled"), false);
java.lang.Object _dragInstance = (java.lang.Object)request.getAttribute("alloy:dialog:dragInstance");
java.lang.Boolean _draggable = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:draggable"), true);
java.lang.Object _fillHeight = (java.lang.Object)request.getAttribute("alloy:dialog:fillHeight");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:focused"), false);
java.lang.Object _footerContent = (java.lang.Object)request.getAttribute("alloy:dialog:footerContent");
java.lang.Object _headerContent = (java.lang.Object)request.getAttribute("alloy:dialog:headerContent");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:dialog:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:dialog:hideClass");
java.lang.Object _icons = (java.lang.Object)request.getAttribute("alloy:dialog:icons");
java.lang.Object _dialogId = (java.lang.Object)request.getAttribute("alloy:dialog:dialogId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:initialized"), false);
java.lang.Boolean _modal = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:modal"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:rendered"), false);
java.lang.Boolean _resizable = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:resizable"), true);
java.lang.Object _resizableInstance = (java.lang.Object)request.getAttribute("alloy:dialog:resizableInstance");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:dialog:srcNode");
java.lang.Boolean _stack = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:stack"), true);
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:dialog:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:dialog:tabIndex"), 0);
java.lang.Object _title = (java.lang.Object)request.getAttribute("alloy:dialog:title");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:dialog:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:dialog:width");
java.lang.Object _afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterBodyContentChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterBoundingBoxChange");
java.lang.Object _afterButtonsChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterButtonsChange");
java.lang.Object _afterCloseChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterCloseChange");
java.lang.Object _afterCollapsedChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterCollapsedChange");
java.lang.Object _afterCollapsibleChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterCollapsibleChange");
java.lang.Object _afterConstrain2viewChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterConstrain2viewChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterCssClassChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:dialog:afterDestroy");
java.lang.Object _afterDestroyOnCloseChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterDestroyOnCloseChange");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterDisabledChange");
java.lang.Object _afterDragInstanceChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterDragInstanceChange");
java.lang.Object _afterDraggableChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterDraggableChange");
java.lang.Object _afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterFillHeightChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterFocusedChange");
java.lang.Object _afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterFooterContentChange");
java.lang.Object _afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterHeaderContentChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterHideClassChange");
java.lang.Object _afterIconsChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterIconsChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:dialog:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterInitializedChange");
java.lang.Object _afterModalChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterModalChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterRenderedChange");
java.lang.Object _afterResizableChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterResizableChange");
java.lang.Object _afterResizableInstanceChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterResizableInstanceChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterSrcNodeChange");
java.lang.Object _afterStackChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterStackChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterTabIndexChange");
java.lang.Object _afterTitleChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterTitleChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:dialog:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:dialog:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:dialog:afterWidthChange");
java.lang.Object _onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:dialog:onBodyContentChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:dialog:onBoundingBoxChange");
java.lang.Object _onButtonsChange = (java.lang.Object)request.getAttribute("alloy:dialog:onButtonsChange");
java.lang.Object _onCloseChange = (java.lang.Object)request.getAttribute("alloy:dialog:onCloseChange");
java.lang.Object _onCollapsedChange = (java.lang.Object)request.getAttribute("alloy:dialog:onCollapsedChange");
java.lang.Object _onCollapsibleChange = (java.lang.Object)request.getAttribute("alloy:dialog:onCollapsibleChange");
java.lang.Object _onConstrain2viewChange = (java.lang.Object)request.getAttribute("alloy:dialog:onConstrain2viewChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:dialog:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:dialog:onCssClassChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:dialog:onDestroy");
java.lang.Object _onDestroyOnCloseChange = (java.lang.Object)request.getAttribute("alloy:dialog:onDestroyOnCloseChange");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:dialog:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:dialog:onDisabledChange");
java.lang.Object _onDragInstanceChange = (java.lang.Object)request.getAttribute("alloy:dialog:onDragInstanceChange");
java.lang.Object _onDraggableChange = (java.lang.Object)request.getAttribute("alloy:dialog:onDraggableChange");
java.lang.Object _onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:dialog:onFillHeightChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:dialog:onFocusedChange");
java.lang.Object _onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:dialog:onFooterContentChange");
java.lang.Object _onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:dialog:onHeaderContentChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:dialog:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:dialog:onHideClassChange");
java.lang.Object _onIconsChange = (java.lang.Object)request.getAttribute("alloy:dialog:onIconsChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:dialog:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:dialog:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:dialog:onInitializedChange");
java.lang.Object _onModalChange = (java.lang.Object)request.getAttribute("alloy:dialog:onModalChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:dialog:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:dialog:onRenderedChange");
java.lang.Object _onResizableChange = (java.lang.Object)request.getAttribute("alloy:dialog:onResizableChange");
java.lang.Object _onResizableInstanceChange = (java.lang.Object)request.getAttribute("alloy:dialog:onResizableInstanceChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:dialog:onSrcNodeChange");
java.lang.Object _onStackChange = (java.lang.Object)request.getAttribute("alloy:dialog:onStackChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:dialog:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:dialog:onTabIndexChange");
java.lang.Object _onTitleChange = (java.lang.Object)request.getAttribute("alloy:dialog:onTitleChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:dialog:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:dialog:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:dialog:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:dialog:onWidthChange");
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