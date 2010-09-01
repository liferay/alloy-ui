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

java.lang.String _cancelButton = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:cancelButton"));
java.lang.String _contentText = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:contentText"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:cssClass"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:editable:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:editable:disabled"), false);
java.lang.String _eventType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:eventType"), "click");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:editable:focused"), false);
java.lang.Object _formatInput = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:formatInput"));
java.lang.Object _formatOutput = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:formatOutput"));
java.lang.Object _height = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:hideClass"), "aui-helper-hidden");
java.util.ArrayList _icons = JSONFactoryUtil.getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:icons")));
java.lang.String _editableId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:editableId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:editable:initialized"), false);
java.lang.String _inputType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:inputType"), "text");
java.lang.Object _node = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:node"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:editable:render"), false);
java.lang.String _renderTo = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:renderTo"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:editable:rendered"), false);
java.lang.String _saveButton = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:saveButton"));
java.util.HashMap _strings = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:strings")));
java.lang.Number _tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:editable:tabIndex")), 0);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:editable:visible"), true);
java.lang.Object _width = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:width"));
java.lang.Object _afterBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterBoundingBoxChange"));
java.lang.Object _afterCancel = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterCancel"));
java.lang.Object _afterCancelButtonChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterCancelButtonChange"));
java.lang.Object _afterContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterContentBoxChange"));
java.lang.Object _afterContentTextChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterContentTextChange"));
java.lang.Object _afterCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterCssClassChange"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterDestroyedChange"));
java.lang.Object _afterDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterDisabledChange"));
java.lang.Object _afterEventTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterEventTypeChange"));
java.lang.Object _afterFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterFocusedChange"));
java.lang.Object _afterFormatInputChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterFormatInputChange"));
java.lang.Object _afterFormatOutputChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterFormatOutputChange"));
java.lang.Object _afterHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterHeightChange"));
java.lang.Object _afterHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterHideClassChange"));
java.lang.Object _afterIconsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterIconsChange"));
java.lang.Object _afterIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterIdChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterInitializedChange"));
java.lang.Object _afterInputTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterInputTypeChange"));
java.lang.Object _afterNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterNodeChange"));
java.lang.Object _afterRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterRenderChange"));
java.lang.Object _afterRenderToChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterRenderToChange"));
java.lang.Object _afterRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterRenderedChange"));
java.lang.Object _afterSave = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterSave"));
java.lang.Object _afterSaveButtonChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterSaveButtonChange"));
java.lang.Object _afterSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterSrcNodeChange"));
java.lang.Object _afterStartEditing = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterStartEditing"));
java.lang.Object _afterStopEditing = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterStopEditing"));
java.lang.Object _afterStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterStringsChange"));
java.lang.Object _afterTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterTabIndexChange"));
java.lang.Object _afterVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterVisibleChange"));
java.lang.Object _afterContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterContentUpdate"));
java.lang.Object _afterRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterRender"));
java.lang.Object _afterWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:afterWidthChange"));
java.lang.Object _onBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onBoundingBoxChange"));
java.lang.Object _onCancel = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onCancel"));
java.lang.Object _onCancelButtonChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onCancelButtonChange"));
java.lang.Object _onContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onContentBoxChange"));
java.lang.Object _onContentTextChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onContentTextChange"));
java.lang.Object _onCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onCssClassChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onDestroyedChange"));
java.lang.Object _onDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onDisabledChange"));
java.lang.Object _onEventTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onEventTypeChange"));
java.lang.Object _onFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onFocusedChange"));
java.lang.Object _onFormatInputChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onFormatInputChange"));
java.lang.Object _onFormatOutputChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onFormatOutputChange"));
java.lang.Object _onHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onHeightChange"));
java.lang.Object _onHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onHideClassChange"));
java.lang.Object _onIconsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onIconsChange"));
java.lang.Object _onIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onIdChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onInitializedChange"));
java.lang.Object _onInputTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onInputTypeChange"));
java.lang.Object _onNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onNodeChange"));
java.lang.Object _onRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onRenderChange"));
java.lang.Object _onRenderToChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onRenderToChange"));
java.lang.Object _onRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onRenderedChange"));
java.lang.Object _onSave = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onSave"));
java.lang.Object _onSaveButtonChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onSaveButtonChange"));
java.lang.Object _onSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onSrcNodeChange"));
java.lang.Object _onStartEditing = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onStartEditing"));
java.lang.Object _onStopEditing = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onStopEditing"));
java.lang.Object _onStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onStringsChange"));
java.lang.Object _onTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onTabIndexChange"));
java.lang.Object _onVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onVisibleChange"));
java.lang.Object _onContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onContentUpdate"));
java.lang.Object _onRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onRender"));
java.lang.Object _onWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:onWidthChange"));

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