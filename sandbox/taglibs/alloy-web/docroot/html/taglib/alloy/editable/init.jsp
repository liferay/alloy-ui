<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:editable:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:editable:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	if ((String)request.getAttribute("alloy:editable:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:boundingBox"));
java.lang.String _cancelButton = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:cancelButton"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:contentBox"));
java.lang.String _contentText = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:contentText"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:cssClass"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:disabled"));
java.lang.String _eventType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:eventType"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:focused"));
java.lang.String _formatInput = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:formatInput"));
java.lang.String _formatOutput = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:formatOutput"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:hideClass"));
java.lang.String _icons = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:icons"));
java.lang.String _editableId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:editableId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:initialized"));
java.lang.String _inputType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:inputType"));
java.lang.String _node = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:node"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:render"));
java.lang.String _renderTo = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:renderTo"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:rendered"));
java.lang.String _saveButton = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:saveButton"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:editable:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:editable:tabIndex"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:width"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterBoundingBoxChange"));
java.lang.String _afterCancel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterCancel"));
java.lang.String _afterCancelButtonChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterCancelButtonChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterContentBoxChange"));
java.lang.String _afterContentTextChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterContentTextChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterCssClassChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterDisabledChange"));
java.lang.String _afterEventTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterEventTypeChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterFocusedChange"));
java.lang.String _afterFormatInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterFormatInputChange"));
java.lang.String _afterFormatOutputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterFormatOutputChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterHideClassChange"));
java.lang.String _afterIconsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterIconsChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterInitializedChange"));
java.lang.String _afterInputTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterInputTypeChange"));
java.lang.String _afterNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterNodeChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterRenderChange"));
java.lang.String _afterRenderToChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterRenderToChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterRenderedChange"));
java.lang.String _afterSave = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterSave"));
java.lang.String _afterSaveButtonChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterSaveButtonChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterSrcNodeChange"));
java.lang.String _afterStartEditing = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterStartEditing"));
java.lang.String _afterStopEditing = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterStopEditing"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterTabIndexChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:afterWidthChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onBoundingBoxChange"));
java.lang.String _onCancel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onCancel"));
java.lang.String _onCancelButtonChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onCancelButtonChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onContentBoxChange"));
java.lang.String _onContentTextChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onContentTextChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onCssClassChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onDisabledChange"));
java.lang.String _onEventTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onEventTypeChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onFocusedChange"));
java.lang.String _onFormatInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onFormatInputChange"));
java.lang.String _onFormatOutputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onFormatOutputChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onHideClassChange"));
java.lang.String _onIconsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onIconsChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onInitializedChange"));
java.lang.String _onInputTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onInputTypeChange"));
java.lang.String _onNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onNodeChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onRenderChange"));
java.lang.String _onRenderToChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onRenderToChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onRenderedChange"));
java.lang.String _onSave = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onSave"));
java.lang.String _onSaveButtonChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onSaveButtonChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onSrcNodeChange"));
java.lang.String _onStartEditing = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onStartEditing"));
java.lang.String _onStopEditing = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onStopEditing"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onTabIndexChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:onWidthChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:editable:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:editable:cancelButton") != null) {
	scopedAttributes.put("cancelButton", _cancelButton);
}

if (request.getAttribute("alloy:editable:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:editable:contentText") != null) {
	scopedAttributes.put("contentText", _contentText);
}

if (request.getAttribute("alloy:editable:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:editable:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:editable:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:editable:eventType") != null) {
	scopedAttributes.put("eventType", _eventType);
}

if (request.getAttribute("alloy:editable:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:editable:formatInput") != null) {
	scopedAttributes.put("formatInput", _formatInput);
}

if (request.getAttribute("alloy:editable:formatOutput") != null) {
	scopedAttributes.put("formatOutput", _formatOutput);
}

if (request.getAttribute("alloy:editable:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:editable:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:editable:icons") != null) {
	scopedAttributes.put("icons", _icons);
}

if (request.getAttribute("alloy:editable:editableId") != null) {
	scopedAttributes.put("editableId", _editableId);
}

if (request.getAttribute("alloy:editable:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:editable:inputType") != null) {
	scopedAttributes.put("inputType", _inputType);
}

if (request.getAttribute("alloy:editable:node") != null) {
	scopedAttributes.put("node", _node);
}

if (request.getAttribute("alloy:editable:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:editable:renderTo") != null) {
	scopedAttributes.put("renderTo", _renderTo);
}

if (request.getAttribute("alloy:editable:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:editable:saveButton") != null) {
	scopedAttributes.put("saveButton", _saveButton);
}

if (request.getAttribute("alloy:editable:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:editable:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:editable:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:editable:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:editable:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:editable:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:editable:afterCancel") != null) {
	scopedAttributes.put("afterCancel", _afterCancel);
}

if (request.getAttribute("alloy:editable:afterCancelButtonChange") != null) {
	scopedAttributes.put("afterCancelButtonChange", _afterCancelButtonChange);
}

if (request.getAttribute("alloy:editable:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:editable:afterContentTextChange") != null) {
	scopedAttributes.put("afterContentTextChange", _afterContentTextChange);
}

if (request.getAttribute("alloy:editable:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:editable:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:editable:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:editable:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:editable:afterEventTypeChange") != null) {
	scopedAttributes.put("afterEventTypeChange", _afterEventTypeChange);
}

if (request.getAttribute("alloy:editable:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:editable:afterFormatInputChange") != null) {
	scopedAttributes.put("afterFormatInputChange", _afterFormatInputChange);
}

if (request.getAttribute("alloy:editable:afterFormatOutputChange") != null) {
	scopedAttributes.put("afterFormatOutputChange", _afterFormatOutputChange);
}

if (request.getAttribute("alloy:editable:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:editable:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:editable:afterIconsChange") != null) {
	scopedAttributes.put("afterIconsChange", _afterIconsChange);
}

if (request.getAttribute("alloy:editable:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:editable:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:editable:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:editable:afterInputTypeChange") != null) {
	scopedAttributes.put("afterInputTypeChange", _afterInputTypeChange);
}

if (request.getAttribute("alloy:editable:afterNodeChange") != null) {
	scopedAttributes.put("afterNodeChange", _afterNodeChange);
}

if (request.getAttribute("alloy:editable:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:editable:afterRenderToChange") != null) {
	scopedAttributes.put("afterRenderToChange", _afterRenderToChange);
}

if (request.getAttribute("alloy:editable:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:editable:afterSave") != null) {
	scopedAttributes.put("afterSave", _afterSave);
}

if (request.getAttribute("alloy:editable:afterSaveButtonChange") != null) {
	scopedAttributes.put("afterSaveButtonChange", _afterSaveButtonChange);
}

if (request.getAttribute("alloy:editable:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:editable:afterStartEditing") != null) {
	scopedAttributes.put("afterStartEditing", _afterStartEditing);
}

if (request.getAttribute("alloy:editable:afterStopEditing") != null) {
	scopedAttributes.put("afterStopEditing", _afterStopEditing);
}

if (request.getAttribute("alloy:editable:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:editable:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:editable:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:editable:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:editable:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:editable:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:editable:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:editable:onCancel") != null) {
	scopedAttributes.put("onCancel", _onCancel);
}

if (request.getAttribute("alloy:editable:onCancelButtonChange") != null) {
	scopedAttributes.put("onCancelButtonChange", _onCancelButtonChange);
}

if (request.getAttribute("alloy:editable:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:editable:onContentTextChange") != null) {
	scopedAttributes.put("onContentTextChange", _onContentTextChange);
}

if (request.getAttribute("alloy:editable:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:editable:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:editable:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:editable:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:editable:onEventTypeChange") != null) {
	scopedAttributes.put("onEventTypeChange", _onEventTypeChange);
}

if (request.getAttribute("alloy:editable:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:editable:onFormatInputChange") != null) {
	scopedAttributes.put("onFormatInputChange", _onFormatInputChange);
}

if (request.getAttribute("alloy:editable:onFormatOutputChange") != null) {
	scopedAttributes.put("onFormatOutputChange", _onFormatOutputChange);
}

if (request.getAttribute("alloy:editable:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:editable:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:editable:onIconsChange") != null) {
	scopedAttributes.put("onIconsChange", _onIconsChange);
}

if (request.getAttribute("alloy:editable:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:editable:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:editable:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:editable:onInputTypeChange") != null) {
	scopedAttributes.put("onInputTypeChange", _onInputTypeChange);
}

if (request.getAttribute("alloy:editable:onNodeChange") != null) {
	scopedAttributes.put("onNodeChange", _onNodeChange);
}

if (request.getAttribute("alloy:editable:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:editable:onRenderToChange") != null) {
	scopedAttributes.put("onRenderToChange", _onRenderToChange);
}

if (request.getAttribute("alloy:editable:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:editable:onSave") != null) {
	scopedAttributes.put("onSave", _onSave);
}

if (request.getAttribute("alloy:editable:onSaveButtonChange") != null) {
	scopedAttributes.put("onSaveButtonChange", _onSaveButtonChange);
}

if (request.getAttribute("alloy:editable:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:editable:onStartEditing") != null) {
	scopedAttributes.put("onStartEditing", _onStartEditing);
}

if (request.getAttribute("alloy:editable:onStopEditing") != null) {
	scopedAttributes.put("onStopEditing", _onStopEditing);
}

if (request.getAttribute("alloy:editable:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:editable:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:editable:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:editable:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:editable:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:editable:onWidthChange") != null) {
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