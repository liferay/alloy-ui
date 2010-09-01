<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:editable:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:editable:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:editable:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:editable:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:editable:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Object _cancelButton = (java.lang.Object)request.getAttribute("alloy:editable:cancelButton");
java.lang.Object _contentText = (java.lang.Object)request.getAttribute("alloy:editable:contentText");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:editable:cssClass");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:disabled"), false);
java.lang.Object _eventType = (java.lang.Object)request.getAttribute("alloy:editable:eventType");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:focused"), false);
java.lang.Object _formatInput = (java.lang.Object)request.getAttribute("alloy:editable:formatInput");
java.lang.Object _formatOutput = (java.lang.Object)request.getAttribute("alloy:editable:formatOutput");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:editable:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:editable:hideClass");
java.lang.Object _icons = (java.lang.Object)request.getAttribute("alloy:editable:icons");
java.lang.Object _editableId = (java.lang.Object)request.getAttribute("alloy:editable:editableId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:initialized"), false);
java.lang.Object _inputType = (java.lang.Object)request.getAttribute("alloy:editable:inputType");
java.lang.Object _node = (java.lang.Object)request.getAttribute("alloy:editable:node");
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:render"), false);
java.lang.Object _renderTo = (java.lang.Object)request.getAttribute("alloy:editable:renderTo");
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:rendered"), false);
java.lang.Object _saveButton = (java.lang.Object)request.getAttribute("alloy:editable:saveButton");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:editable:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:editable:tabIndex"), 0);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:editable:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:editable:width");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:editable:afterBoundingBoxChange");
java.lang.Object _afterCancel = (java.lang.Object)request.getAttribute("alloy:editable:afterCancel");
java.lang.Object _afterCancelButtonChange = (java.lang.Object)request.getAttribute("alloy:editable:afterCancelButtonChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:editable:afterContentBoxChange");
java.lang.Object _afterContentTextChange = (java.lang.Object)request.getAttribute("alloy:editable:afterContentTextChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:editable:afterCssClassChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:editable:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:editable:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:editable:afterDisabledChange");
java.lang.Object _afterEventTypeChange = (java.lang.Object)request.getAttribute("alloy:editable:afterEventTypeChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:editable:afterFocusedChange");
java.lang.Object _afterFormatInputChange = (java.lang.Object)request.getAttribute("alloy:editable:afterFormatInputChange");
java.lang.Object _afterFormatOutputChange = (java.lang.Object)request.getAttribute("alloy:editable:afterFormatOutputChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:editable:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:editable:afterHideClassChange");
java.lang.Object _afterIconsChange = (java.lang.Object)request.getAttribute("alloy:editable:afterIconsChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:editable:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:editable:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:editable:afterInitializedChange");
java.lang.Object _afterInputTypeChange = (java.lang.Object)request.getAttribute("alloy:editable:afterInputTypeChange");
java.lang.Object _afterNodeChange = (java.lang.Object)request.getAttribute("alloy:editable:afterNodeChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:editable:afterRenderChange");
java.lang.Object _afterRenderToChange = (java.lang.Object)request.getAttribute("alloy:editable:afterRenderToChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:editable:afterRenderedChange");
java.lang.Object _afterSave = (java.lang.Object)request.getAttribute("alloy:editable:afterSave");
java.lang.Object _afterSaveButtonChange = (java.lang.Object)request.getAttribute("alloy:editable:afterSaveButtonChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:editable:afterSrcNodeChange");
java.lang.Object _afterStartEditing = (java.lang.Object)request.getAttribute("alloy:editable:afterStartEditing");
java.lang.Object _afterStopEditing = (java.lang.Object)request.getAttribute("alloy:editable:afterStopEditing");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:editable:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:editable:afterTabIndexChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:editable:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:editable:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:editable:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:editable:afterWidthChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:editable:onBoundingBoxChange");
java.lang.Object _onCancel = (java.lang.Object)request.getAttribute("alloy:editable:onCancel");
java.lang.Object _onCancelButtonChange = (java.lang.Object)request.getAttribute("alloy:editable:onCancelButtonChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:editable:onContentBoxChange");
java.lang.Object _onContentTextChange = (java.lang.Object)request.getAttribute("alloy:editable:onContentTextChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:editable:onCssClassChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:editable:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:editable:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:editable:onDisabledChange");
java.lang.Object _onEventTypeChange = (java.lang.Object)request.getAttribute("alloy:editable:onEventTypeChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:editable:onFocusedChange");
java.lang.Object _onFormatInputChange = (java.lang.Object)request.getAttribute("alloy:editable:onFormatInputChange");
java.lang.Object _onFormatOutputChange = (java.lang.Object)request.getAttribute("alloy:editable:onFormatOutputChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:editable:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:editable:onHideClassChange");
java.lang.Object _onIconsChange = (java.lang.Object)request.getAttribute("alloy:editable:onIconsChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:editable:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:editable:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:editable:onInitializedChange");
java.lang.Object _onInputTypeChange = (java.lang.Object)request.getAttribute("alloy:editable:onInputTypeChange");
java.lang.Object _onNodeChange = (java.lang.Object)request.getAttribute("alloy:editable:onNodeChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:editable:onRenderChange");
java.lang.Object _onRenderToChange = (java.lang.Object)request.getAttribute("alloy:editable:onRenderToChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:editable:onRenderedChange");
java.lang.Object _onSave = (java.lang.Object)request.getAttribute("alloy:editable:onSave");
java.lang.Object _onSaveButtonChange = (java.lang.Object)request.getAttribute("alloy:editable:onSaveButtonChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:editable:onSrcNodeChange");
java.lang.Object _onStartEditing = (java.lang.Object)request.getAttribute("alloy:editable:onStartEditing");
java.lang.Object _onStopEditing = (java.lang.Object)request.getAttribute("alloy:editable:onStopEditing");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:editable:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:editable:onTabIndexChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:editable:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:editable:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:editable:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:editable:onWidthChange");

String uniqueId = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean(String.valueOf(dynamicAttributes.get("useMarkup")));

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

_updateOptions(options, "boundingBox", _boundingBox);
_updateOptions(options, "cancelButton", _cancelButton);
_updateOptions(options, "contentBox", _contentBox);
_updateOptions(options, "contentText", _contentText);
_updateOptions(options, "cssClass", _cssClass);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "disabled", _disabled);
_updateOptions(options, "eventType", _eventType);
_updateOptions(options, "focused", _focused);
_updateOptions(options, "formatInput", _formatInput);
_updateOptions(options, "formatOutput", _formatOutput);
_updateOptions(options, "height", _height);
_updateOptions(options, "hideClass", _hideClass);
_updateOptions(options, "icons", _icons);
_updateOptions(options, "editableId", _editableId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "inputType", _inputType);
_updateOptions(options, "node", _node);
_updateOptions(options, "render", _render);
_updateOptions(options, "renderTo", _renderTo);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "saveButton", _saveButton);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "afterBoundingBoxChange", _afterBoundingBoxChange);
_updateOptions(options, "afterCancel", _afterCancel);
_updateOptions(options, "afterCancelButtonChange", _afterCancelButtonChange);
_updateOptions(options, "afterContentBoxChange", _afterContentBoxChange);
_updateOptions(options, "afterContentTextChange", _afterContentTextChange);
_updateOptions(options, "afterCssClassChange", _afterCssClassChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDisabledChange", _afterDisabledChange);
_updateOptions(options, "afterEventTypeChange", _afterEventTypeChange);
_updateOptions(options, "afterFocusedChange", _afterFocusedChange);
_updateOptions(options, "afterFormatInputChange", _afterFormatInputChange);
_updateOptions(options, "afterFormatOutputChange", _afterFormatOutputChange);
_updateOptions(options, "afterHeightChange", _afterHeightChange);
_updateOptions(options, "afterHideClassChange", _afterHideClassChange);
_updateOptions(options, "afterIconsChange", _afterIconsChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterInputTypeChange", _afterInputTypeChange);
_updateOptions(options, "afterNodeChange", _afterNodeChange);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderToChange", _afterRenderToChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterSave", _afterSave);
_updateOptions(options, "afterSaveButtonChange", _afterSaveButtonChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStartEditing", _afterStartEditing);
_updateOptions(options, "afterStopEditing", _afterStopEditing);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
_updateOptions(options, "afterVisibleChange", _afterVisibleChange);
_updateOptions(options, "afterContentUpdate", _afterContentUpdate);
_updateOptions(options, "afterRender", _afterRender);
_updateOptions(options, "afterWidthChange", _afterWidthChange);
_updateOptions(options, "onBoundingBoxChange", _onBoundingBoxChange);
_updateOptions(options, "onCancel", _onCancel);
_updateOptions(options, "onCancelButtonChange", _onCancelButtonChange);
_updateOptions(options, "onContentBoxChange", _onContentBoxChange);
_updateOptions(options, "onContentTextChange", _onContentTextChange);
_updateOptions(options, "onCssClassChange", _onCssClassChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDisabledChange", _onDisabledChange);
_updateOptions(options, "onEventTypeChange", _onEventTypeChange);
_updateOptions(options, "onFocusedChange", _onFocusedChange);
_updateOptions(options, "onFormatInputChange", _onFormatInputChange);
_updateOptions(options, "onFormatOutputChange", _onFormatOutputChange);
_updateOptions(options, "onHeightChange", _onHeightChange);
_updateOptions(options, "onHideClassChange", _onHideClassChange);
_updateOptions(options, "onIconsChange", _onIconsChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onInputTypeChange", _onInputTypeChange);
_updateOptions(options, "onNodeChange", _onNodeChange);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderToChange", _onRenderToChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onSave", _onSave);
_updateOptions(options, "onSaveButtonChange", _onSaveButtonChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStartEditing", _onStartEditing);
_updateOptions(options, "onStopEditing", _onStopEditing);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
_updateOptions(options, "onVisibleChange", _onVisibleChange);
_updateOptions(options, "onContentUpdate", _onContentUpdate);
_updateOptions(options, "onRender", _onRender);
_updateOptions(options, "onWidthChange", _onWidthChange);
%>

<%@ include file="init-ext.jsp" %>