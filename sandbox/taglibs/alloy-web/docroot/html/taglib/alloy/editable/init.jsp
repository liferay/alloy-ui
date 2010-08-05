<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:editable:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:editable:scopedAttributes");

java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:editable:boundingBox");
java.lang.String _cancelButton = (java.lang.String)request.getAttribute("alloy:editable:cancelButton");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:editable:contentBox");
java.lang.String _contentText = (java.lang.String)request.getAttribute("alloy:editable:contentText");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:editable:cssClass");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:editable:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:editable:disabled");
java.lang.String _eventType = (java.lang.String)request.getAttribute("alloy:editable:eventType");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:editable:focused");
java.lang.String _formatInput = (java.lang.String)request.getAttribute("alloy:editable:formatInput");
java.lang.String _formatOutput = (java.lang.String)request.getAttribute("alloy:editable:formatOutput");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:editable:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:editable:hideClass");
java.lang.String _icons = (java.lang.String)request.getAttribute("alloy:editable:icons");
java.lang.String _editableId = (java.lang.String)request.getAttribute("alloy:editable:editableId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:editable:initialized");
java.lang.String _inputType = (java.lang.String)request.getAttribute("alloy:editable:inputType");
java.lang.String _node = (java.lang.String)request.getAttribute("alloy:editable:node");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:editable:render");
java.lang.String _renderTo = (java.lang.String)request.getAttribute("alloy:editable:renderTo");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:editable:rendered");
java.lang.String _saveButton = (java.lang.String)request.getAttribute("alloy:editable:saveButton");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:editable:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:editable:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:editable:tabIndex");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:editable:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:editable:width");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:editable:afterBoundingBoxChange");
java.lang.String _afterCancel = (java.lang.String)request.getAttribute("alloy:editable:afterCancel");
java.lang.String _afterCancelButtonChange = (java.lang.String)request.getAttribute("alloy:editable:afterCancelButtonChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:editable:afterContentBoxChange");
java.lang.String _afterContentTextChange = (java.lang.String)request.getAttribute("alloy:editable:afterContentTextChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:editable:afterCssClassChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:editable:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:editable:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:editable:afterDisabledChange");
java.lang.String _afterEventTypeChange = (java.lang.String)request.getAttribute("alloy:editable:afterEventTypeChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:editable:afterFocusedChange");
java.lang.String _afterFormatInputChange = (java.lang.String)request.getAttribute("alloy:editable:afterFormatInputChange");
java.lang.String _afterFormatOutputChange = (java.lang.String)request.getAttribute("alloy:editable:afterFormatOutputChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:editable:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:editable:afterHideClassChange");
java.lang.String _afterIconsChange = (java.lang.String)request.getAttribute("alloy:editable:afterIconsChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:editable:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:editable:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:editable:afterInitializedChange");
java.lang.String _afterInputTypeChange = (java.lang.String)request.getAttribute("alloy:editable:afterInputTypeChange");
java.lang.String _afterNodeChange = (java.lang.String)request.getAttribute("alloy:editable:afterNodeChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:editable:afterRenderChange");
java.lang.String _afterRenderToChange = (java.lang.String)request.getAttribute("alloy:editable:afterRenderToChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:editable:afterRenderedChange");
java.lang.String _afterSave = (java.lang.String)request.getAttribute("alloy:editable:afterSave");
java.lang.String _afterSaveButtonChange = (java.lang.String)request.getAttribute("alloy:editable:afterSaveButtonChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:editable:afterSrcNodeChange");
java.lang.String _afterStartEditing = (java.lang.String)request.getAttribute("alloy:editable:afterStartEditing");
java.lang.String _afterStopEditing = (java.lang.String)request.getAttribute("alloy:editable:afterStopEditing");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:editable:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:editable:afterTabIndexChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:editable:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:editable:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:editable:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:editable:afterWidthChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:editable:onBoundingBoxChange");
java.lang.String _onCancel = (java.lang.String)request.getAttribute("alloy:editable:onCancel");
java.lang.String _onCancelButtonChange = (java.lang.String)request.getAttribute("alloy:editable:onCancelButtonChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:editable:onContentBoxChange");
java.lang.String _onContentTextChange = (java.lang.String)request.getAttribute("alloy:editable:onContentTextChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:editable:onCssClassChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:editable:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:editable:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:editable:onDisabledChange");
java.lang.String _onEventTypeChange = (java.lang.String)request.getAttribute("alloy:editable:onEventTypeChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:editable:onFocusedChange");
java.lang.String _onFormatInputChange = (java.lang.String)request.getAttribute("alloy:editable:onFormatInputChange");
java.lang.String _onFormatOutputChange = (java.lang.String)request.getAttribute("alloy:editable:onFormatOutputChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:editable:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:editable:onHideClassChange");
java.lang.String _onIconsChange = (java.lang.String)request.getAttribute("alloy:editable:onIconsChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:editable:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:editable:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:editable:onInitializedChange");
java.lang.String _onInputTypeChange = (java.lang.String)request.getAttribute("alloy:editable:onInputTypeChange");
java.lang.String _onNodeChange = (java.lang.String)request.getAttribute("alloy:editable:onNodeChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:editable:onRenderChange");
java.lang.String _onRenderToChange = (java.lang.String)request.getAttribute("alloy:editable:onRenderToChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:editable:onRenderedChange");
java.lang.String _onSave = (java.lang.String)request.getAttribute("alloy:editable:onSave");
java.lang.String _onSaveButtonChange = (java.lang.String)request.getAttribute("alloy:editable:onSaveButtonChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:editable:onSrcNodeChange");
java.lang.String _onStartEditing = (java.lang.String)request.getAttribute("alloy:editable:onStartEditing");
java.lang.String _onStopEditing = (java.lang.String)request.getAttribute("alloy:editable:onStopEditing");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:editable:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:editable:onTabIndexChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:editable:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:editable:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:editable:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:editable:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_cancelButton != null) {
	scopedAttributes.put("cancelButton", _cancelButton);
}

if (_contentBox != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (_contentText != null) {
	scopedAttributes.put("contentText", _contentText);
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

if (_eventType != null) {
	scopedAttributes.put("eventType", _eventType);
}

if (_focused != null) {
	scopedAttributes.put("focused", _focused);
}

if (_formatInput != null) {
	scopedAttributes.put("formatInput", _formatInput);
}

if (_formatOutput != null) {
	scopedAttributes.put("formatOutput", _formatOutput);
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

if (_editableId != null) {
	scopedAttributes.put("editableId", _editableId);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_inputType != null) {
	scopedAttributes.put("inputType", _inputType);
}

if (_node != null) {
	scopedAttributes.put("node", _node);
}

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_renderTo != null) {
	scopedAttributes.put("renderTo", _renderTo);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (_saveButton != null) {
	scopedAttributes.put("saveButton", _saveButton);
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

if (_visible != null) {
	scopedAttributes.put("visible", _visible);
}

if (_width != null) {
	scopedAttributes.put("width", _width);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (_afterCancel != null) {
	scopedAttributes.put("afterCancel", _afterCancel);
}

if (_afterCancelButtonChange != null) {
	scopedAttributes.put("afterCancelButtonChange", _afterCancelButtonChange);
}

if (_afterContentBoxChange != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (_afterContentTextChange != null) {
	scopedAttributes.put("afterContentTextChange", _afterContentTextChange);
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

if (_afterEventTypeChange != null) {
	scopedAttributes.put("afterEventTypeChange", _afterEventTypeChange);
}

if (_afterFocusedChange != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (_afterFormatInputChange != null) {
	scopedAttributes.put("afterFormatInputChange", _afterFormatInputChange);
}

if (_afterFormatOutputChange != null) {
	scopedAttributes.put("afterFormatOutputChange", _afterFormatOutputChange);
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

if (_afterInputTypeChange != null) {
	scopedAttributes.put("afterInputTypeChange", _afterInputTypeChange);
}

if (_afterNodeChange != null) {
	scopedAttributes.put("afterNodeChange", _afterNodeChange);
}

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderToChange != null) {
	scopedAttributes.put("afterRenderToChange", _afterRenderToChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (_afterSave != null) {
	scopedAttributes.put("afterSave", _afterSave);
}

if (_afterSaveButtonChange != null) {
	scopedAttributes.put("afterSaveButtonChange", _afterSaveButtonChange);
}

if (_afterSrcNodeChange != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (_afterStartEditing != null) {
	scopedAttributes.put("afterStartEditing", _afterStartEditing);
}

if (_afterStopEditing != null) {
	scopedAttributes.put("afterStopEditing", _afterStopEditing);
}

if (_afterStringsChange != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (_afterTabIndexChange != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
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

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (_onCancel != null) {
	scopedAttributes.put("onCancel", _onCancel);
}

if (_onCancelButtonChange != null) {
	scopedAttributes.put("onCancelButtonChange", _onCancelButtonChange);
}

if (_onContentBoxChange != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (_onContentTextChange != null) {
	scopedAttributes.put("onContentTextChange", _onContentTextChange);
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

if (_onEventTypeChange != null) {
	scopedAttributes.put("onEventTypeChange", _onEventTypeChange);
}

if (_onFocusedChange != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (_onFormatInputChange != null) {
	scopedAttributes.put("onFormatInputChange", _onFormatInputChange);
}

if (_onFormatOutputChange != null) {
	scopedAttributes.put("onFormatOutputChange", _onFormatOutputChange);
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

if (_onInputTypeChange != null) {
	scopedAttributes.put("onInputTypeChange", _onInputTypeChange);
}

if (_onNodeChange != null) {
	scopedAttributes.put("onNodeChange", _onNodeChange);
}

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderToChange != null) {
	scopedAttributes.put("onRenderToChange", _onRenderToChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (_onSave != null) {
	scopedAttributes.put("onSave", _onSave);
}

if (_onSaveButtonChange != null) {
	scopedAttributes.put("onSaveButtonChange", _onSaveButtonChange);
}

if (_onSrcNodeChange != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (_onStartEditing != null) {
	scopedAttributes.put("onStartEditing", _onStartEditing);
}

if (_onStopEditing != null) {
	scopedAttributes.put("onStopEditing", _onStopEditing);
}

if (_onStringsChange != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (_onTabIndexChange != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
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