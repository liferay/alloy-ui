<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:dialog:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:dialog:scopedAttributes");

java.lang.String _dialogBodyContent = (java.lang.String)request.getAttribute("alloy:dialog:dialogBodyContent");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:dialog:boundingBox");
java.lang.String _buttons = (java.lang.String)request.getAttribute("alloy:dialog:buttons");
java.lang.Boolean _close = (java.lang.Boolean)request.getAttribute("alloy:dialog:close");
java.lang.Boolean _collapsed = (java.lang.Boolean)request.getAttribute("alloy:dialog:collapsed");
java.lang.Boolean _collapsible = (java.lang.Boolean)request.getAttribute("alloy:dialog:collapsible");
java.lang.Object _constrain2view = (java.lang.Object)request.getAttribute("alloy:dialog:constrain2view");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:dialog:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:dialog:cssClass");
java.lang.Boolean _destroyOnClose = (java.lang.Boolean)request.getAttribute("alloy:dialog:destroyOnClose");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:dialog:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:dialog:disabled");
java.lang.String _dragInstance = (java.lang.String)request.getAttribute("alloy:dialog:dragInstance");
java.lang.Boolean _draggable = (java.lang.Boolean)request.getAttribute("alloy:dialog:draggable");
java.lang.String _fillHeight = (java.lang.String)request.getAttribute("alloy:dialog:fillHeight");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:dialog:focused");
java.lang.String _footerContent = (java.lang.String)request.getAttribute("alloy:dialog:footerContent");
java.lang.String _headerContent = (java.lang.String)request.getAttribute("alloy:dialog:headerContent");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:dialog:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:dialog:hideClass");
java.lang.String _icons = (java.lang.String)request.getAttribute("alloy:dialog:icons");
java.lang.String _dialogId = (java.lang.String)request.getAttribute("alloy:dialog:dialogId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:dialog:initialized");
java.lang.Boolean _modal = (java.lang.Boolean)request.getAttribute("alloy:dialog:modal");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:dialog:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:dialog:rendered");
java.lang.Boolean _resizable = (java.lang.Boolean)request.getAttribute("alloy:dialog:resizable");
java.lang.String _resizableInstance = (java.lang.String)request.getAttribute("alloy:dialog:resizableInstance");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:dialog:srcNode");
java.lang.Boolean _stack = (java.lang.Boolean)request.getAttribute("alloy:dialog:stack");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:dialog:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:dialog:tabIndex");
java.lang.String _title = (java.lang.String)request.getAttribute("alloy:dialog:title");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:dialog:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:dialog:width");
java.lang.String _afterBodyContentChange = (java.lang.String)request.getAttribute("alloy:dialog:afterBodyContentChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:dialog:afterBoundingBoxChange");
java.lang.String _afterButtonsChange = (java.lang.String)request.getAttribute("alloy:dialog:afterButtonsChange");
java.lang.String _afterCloseChange = (java.lang.String)request.getAttribute("alloy:dialog:afterCloseChange");
java.lang.String _afterCollapsedChange = (java.lang.String)request.getAttribute("alloy:dialog:afterCollapsedChange");
java.lang.String _afterCollapsibleChange = (java.lang.String)request.getAttribute("alloy:dialog:afterCollapsibleChange");
java.lang.String _afterConstrain2viewChange = (java.lang.String)request.getAttribute("alloy:dialog:afterConstrain2viewChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:dialog:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:dialog:afterCssClassChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:dialog:afterDestroy");
java.lang.String _afterDestroyOnCloseChange = (java.lang.String)request.getAttribute("alloy:dialog:afterDestroyOnCloseChange");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:dialog:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:dialog:afterDisabledChange");
java.lang.String _afterDragInstanceChange = (java.lang.String)request.getAttribute("alloy:dialog:afterDragInstanceChange");
java.lang.String _afterDraggableChange = (java.lang.String)request.getAttribute("alloy:dialog:afterDraggableChange");
java.lang.String _afterFillHeightChange = (java.lang.String)request.getAttribute("alloy:dialog:afterFillHeightChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:dialog:afterFocusedChange");
java.lang.String _afterFooterContentChange = (java.lang.String)request.getAttribute("alloy:dialog:afterFooterContentChange");
java.lang.String _afterHeaderContentChange = (java.lang.String)request.getAttribute("alloy:dialog:afterHeaderContentChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:dialog:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:dialog:afterHideClassChange");
java.lang.String _afterIconsChange = (java.lang.String)request.getAttribute("alloy:dialog:afterIconsChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:dialog:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:dialog:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:dialog:afterInitializedChange");
java.lang.String _afterModalChange = (java.lang.String)request.getAttribute("alloy:dialog:afterModalChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:dialog:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:dialog:afterRenderedChange");
java.lang.String _afterResizableChange = (java.lang.String)request.getAttribute("alloy:dialog:afterResizableChange");
java.lang.String _afterResizableInstanceChange = (java.lang.String)request.getAttribute("alloy:dialog:afterResizableInstanceChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:dialog:afterSrcNodeChange");
java.lang.String _afterStackChange = (java.lang.String)request.getAttribute("alloy:dialog:afterStackChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:dialog:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:dialog:afterTabIndexChange");
java.lang.String _afterTitleChange = (java.lang.String)request.getAttribute("alloy:dialog:afterTitleChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:dialog:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:dialog:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:dialog:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:dialog:afterWidthChange");
java.lang.String _onBodyContentChange = (java.lang.String)request.getAttribute("alloy:dialog:onBodyContentChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:dialog:onBoundingBoxChange");
java.lang.String _onButtonsChange = (java.lang.String)request.getAttribute("alloy:dialog:onButtonsChange");
java.lang.String _onCloseChange = (java.lang.String)request.getAttribute("alloy:dialog:onCloseChange");
java.lang.String _onCollapsedChange = (java.lang.String)request.getAttribute("alloy:dialog:onCollapsedChange");
java.lang.String _onCollapsibleChange = (java.lang.String)request.getAttribute("alloy:dialog:onCollapsibleChange");
java.lang.String _onConstrain2viewChange = (java.lang.String)request.getAttribute("alloy:dialog:onConstrain2viewChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:dialog:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:dialog:onCssClassChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:dialog:onDestroy");
java.lang.String _onDestroyOnCloseChange = (java.lang.String)request.getAttribute("alloy:dialog:onDestroyOnCloseChange");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:dialog:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:dialog:onDisabledChange");
java.lang.String _onDragInstanceChange = (java.lang.String)request.getAttribute("alloy:dialog:onDragInstanceChange");
java.lang.String _onDraggableChange = (java.lang.String)request.getAttribute("alloy:dialog:onDraggableChange");
java.lang.String _onFillHeightChange = (java.lang.String)request.getAttribute("alloy:dialog:onFillHeightChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:dialog:onFocusedChange");
java.lang.String _onFooterContentChange = (java.lang.String)request.getAttribute("alloy:dialog:onFooterContentChange");
java.lang.String _onHeaderContentChange = (java.lang.String)request.getAttribute("alloy:dialog:onHeaderContentChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:dialog:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:dialog:onHideClassChange");
java.lang.String _onIconsChange = (java.lang.String)request.getAttribute("alloy:dialog:onIconsChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:dialog:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:dialog:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:dialog:onInitializedChange");
java.lang.String _onModalChange = (java.lang.String)request.getAttribute("alloy:dialog:onModalChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:dialog:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:dialog:onRenderedChange");
java.lang.String _onResizableChange = (java.lang.String)request.getAttribute("alloy:dialog:onResizableChange");
java.lang.String _onResizableInstanceChange = (java.lang.String)request.getAttribute("alloy:dialog:onResizableInstanceChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:dialog:onSrcNodeChange");
java.lang.String _onStackChange = (java.lang.String)request.getAttribute("alloy:dialog:onStackChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:dialog:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:dialog:onTabIndexChange");
java.lang.String _onTitleChange = (java.lang.String)request.getAttribute("alloy:dialog:onTitleChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:dialog:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:dialog:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:dialog:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:dialog:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_dialogBodyContent != null) {
	scopedAttributes.put("dialogBodyContent", _dialogBodyContent);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_buttons != null) {
	scopedAttributes.put("buttons", _buttons);
}

if (_close != null) {
	scopedAttributes.put("close", _close);
}

if (_collapsed != null) {
	scopedAttributes.put("collapsed", _collapsed);
}

if (_collapsible != null) {
	scopedAttributes.put("collapsible", _collapsible);
}

if (_constrain2view != null) {
	scopedAttributes.put("constrain2view", _constrain2view);
}

if (_contentBox != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (_cssClass != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (_destroyOnClose != null) {
	scopedAttributes.put("destroyOnClose", _destroyOnClose);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_disabled != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (_dragInstance != null) {
	scopedAttributes.put("dragInstance", _dragInstance);
}

if (_draggable != null) {
	scopedAttributes.put("draggable", _draggable);
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

if (_dialogId != null) {
	scopedAttributes.put("dialogId", _dialogId);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_modal != null) {
	scopedAttributes.put("modal", _modal);
}

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (_resizable != null) {
	scopedAttributes.put("resizable", _resizable);
}

if (_resizableInstance != null) {
	scopedAttributes.put("resizableInstance", _resizableInstance);
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

if (_afterButtonsChange != null) {
	scopedAttributes.put("afterButtonsChange", _afterButtonsChange);
}

if (_afterCloseChange != null) {
	scopedAttributes.put("afterCloseChange", _afterCloseChange);
}

if (_afterCollapsedChange != null) {
	scopedAttributes.put("afterCollapsedChange", _afterCollapsedChange);
}

if (_afterCollapsibleChange != null) {
	scopedAttributes.put("afterCollapsibleChange", _afterCollapsibleChange);
}

if (_afterConstrain2viewChange != null) {
	scopedAttributes.put("afterConstrain2viewChange", _afterConstrain2viewChange);
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

if (_afterDestroyOnCloseChange != null) {
	scopedAttributes.put("afterDestroyOnCloseChange", _afterDestroyOnCloseChange);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterDisabledChange != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (_afterDragInstanceChange != null) {
	scopedAttributes.put("afterDragInstanceChange", _afterDragInstanceChange);
}

if (_afterDraggableChange != null) {
	scopedAttributes.put("afterDraggableChange", _afterDraggableChange);
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

if (_afterModalChange != null) {
	scopedAttributes.put("afterModalChange", _afterModalChange);
}

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (_afterResizableChange != null) {
	scopedAttributes.put("afterResizableChange", _afterResizableChange);
}

if (_afterResizableInstanceChange != null) {
	scopedAttributes.put("afterResizableInstanceChange", _afterResizableInstanceChange);
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

if (_onButtonsChange != null) {
	scopedAttributes.put("onButtonsChange", _onButtonsChange);
}

if (_onCloseChange != null) {
	scopedAttributes.put("onCloseChange", _onCloseChange);
}

if (_onCollapsedChange != null) {
	scopedAttributes.put("onCollapsedChange", _onCollapsedChange);
}

if (_onCollapsibleChange != null) {
	scopedAttributes.put("onCollapsibleChange", _onCollapsibleChange);
}

if (_onConstrain2viewChange != null) {
	scopedAttributes.put("onConstrain2viewChange", _onConstrain2viewChange);
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

if (_onDestroyOnCloseChange != null) {
	scopedAttributes.put("onDestroyOnCloseChange", _onDestroyOnCloseChange);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onDisabledChange != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (_onDragInstanceChange != null) {
	scopedAttributes.put("onDragInstanceChange", _onDragInstanceChange);
}

if (_onDraggableChange != null) {
	scopedAttributes.put("onDraggableChange", _onDraggableChange);
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

if (_onModalChange != null) {
	scopedAttributes.put("onModalChange", _onModalChange);
}

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (_onResizableChange != null) {
	scopedAttributes.put("onResizableChange", _onResizableChange);
}

if (_onResizableInstanceChange != null) {
	scopedAttributes.put("onResizableInstanceChange", _onResizableInstanceChange);
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