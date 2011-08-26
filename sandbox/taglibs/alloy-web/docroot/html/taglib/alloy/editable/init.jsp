<%--
/**
 * Copyright (c) 2000-2011 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

@generated
--%>

<%@ include file="/html/taglib/taglib-init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:editable:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:editable:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:editable:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

if ((scopedAttributes != null) && !scopedAttributes.isEmpty()) {
	_options.putAll(scopedAttributes);
}

if ((dynamicAttributes != null) && !dynamicAttributes.isEmpty()) {
	_options.putAll(dynamicAttributes);
}

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.String cancelButton = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:cancelButton"));
java.lang.String contentText = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:contentText"));
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:cssClass"));
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:editable:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:editable:disabled")), false);
java.lang.String eventType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:eventType"), "click");
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:editable:focused")), false);
java.lang.Object formatInput = (java.lang.Object)request.getAttribute("alloy:editable:formatInput");
java.lang.Object formatOutput = (java.lang.Object)request.getAttribute("alloy:editable:formatOutput");
java.lang.Object height = (java.lang.Object)request.getAttribute("alloy:editable:height");
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:hideClass"), "aui-helper-hidden");
java.util.ArrayList icons = _toArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:icons"), "[]"));
java.lang.String editableId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:editableId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:editable:initialized")), false);
java.lang.String inputType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:inputType"), "text");
java.lang.String locale = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:locale"), "en");
java.lang.Object node = (java.lang.Object)request.getAttribute("alloy:editable:node");
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:editable:render");
java.lang.String renderTo = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:renderTo"));
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:editable:rendered")), false);
java.lang.String saveButton = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:editable:saveButton"));
java.util.HashMap strings = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:editable:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:editable:tabIndex")), 0);
boolean useARIA = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:editable:useARIA")), true);
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:editable:visible")), true);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:editable:width");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:editable:afterBoundingBoxChange");
java.lang.Object afterCancel = (java.lang.Object)request.getAttribute("alloy:editable:afterCancel");
java.lang.Object afterCancelButtonChange = (java.lang.Object)request.getAttribute("alloy:editable:afterCancelButtonChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:editable:afterContentBoxChange");
java.lang.Object afterContentTextChange = (java.lang.Object)request.getAttribute("alloy:editable:afterContentTextChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:editable:afterCssClassChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:editable:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:editable:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:editable:afterDisabledChange");
java.lang.Object afterEventTypeChange = (java.lang.Object)request.getAttribute("alloy:editable:afterEventTypeChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:editable:afterFocusedChange");
java.lang.Object afterFormatInputChange = (java.lang.Object)request.getAttribute("alloy:editable:afterFormatInputChange");
java.lang.Object afterFormatOutputChange = (java.lang.Object)request.getAttribute("alloy:editable:afterFormatOutputChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:editable:afterHeightChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:editable:afterHideClassChange");
java.lang.Object afterIconsChange = (java.lang.Object)request.getAttribute("alloy:editable:afterIconsChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:editable:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:editable:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:editable:afterInitializedChange");
java.lang.Object afterInputTypeChange = (java.lang.Object)request.getAttribute("alloy:editable:afterInputTypeChange");
java.lang.Object afterLocaleChange = (java.lang.Object)request.getAttribute("alloy:editable:afterLocaleChange");
java.lang.Object afterNodeChange = (java.lang.Object)request.getAttribute("alloy:editable:afterNodeChange");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:editable:afterRenderChange");
java.lang.Object afterRenderToChange = (java.lang.Object)request.getAttribute("alloy:editable:afterRenderToChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:editable:afterRenderedChange");
java.lang.Object afterSave = (java.lang.Object)request.getAttribute("alloy:editable:afterSave");
java.lang.Object afterSaveButtonChange = (java.lang.Object)request.getAttribute("alloy:editable:afterSaveButtonChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:editable:afterSrcNodeChange");
java.lang.Object afterStartEditing = (java.lang.Object)request.getAttribute("alloy:editable:afterStartEditing");
java.lang.Object afterStopEditing = (java.lang.Object)request.getAttribute("alloy:editable:afterStopEditing");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:editable:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:editable:afterTabIndexChange");
java.lang.Object afterUseARIAChange = (java.lang.Object)request.getAttribute("alloy:editable:afterUseARIAChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:editable:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:editable:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:editable:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:editable:afterWidthChange");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:editable:onBoundingBoxChange");
java.lang.Object onCancel = (java.lang.Object)request.getAttribute("alloy:editable:onCancel");
java.lang.Object onCancelButtonChange = (java.lang.Object)request.getAttribute("alloy:editable:onCancelButtonChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:editable:onContentBoxChange");
java.lang.Object onContentTextChange = (java.lang.Object)request.getAttribute("alloy:editable:onContentTextChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:editable:onCssClassChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:editable:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:editable:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:editable:onDisabledChange");
java.lang.Object onEventTypeChange = (java.lang.Object)request.getAttribute("alloy:editable:onEventTypeChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:editable:onFocusedChange");
java.lang.Object onFormatInputChange = (java.lang.Object)request.getAttribute("alloy:editable:onFormatInputChange");
java.lang.Object onFormatOutputChange = (java.lang.Object)request.getAttribute("alloy:editable:onFormatOutputChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:editable:onHeightChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:editable:onHideClassChange");
java.lang.Object onIconsChange = (java.lang.Object)request.getAttribute("alloy:editable:onIconsChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:editable:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:editable:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:editable:onInitializedChange");
java.lang.Object onInputTypeChange = (java.lang.Object)request.getAttribute("alloy:editable:onInputTypeChange");
java.lang.Object onLocaleChange = (java.lang.Object)request.getAttribute("alloy:editable:onLocaleChange");
java.lang.Object onNodeChange = (java.lang.Object)request.getAttribute("alloy:editable:onNodeChange");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:editable:onRenderChange");
java.lang.Object onRenderToChange = (java.lang.Object)request.getAttribute("alloy:editable:onRenderToChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:editable:onRenderedChange");
java.lang.Object onSave = (java.lang.Object)request.getAttribute("alloy:editable:onSave");
java.lang.Object onSaveButtonChange = (java.lang.Object)request.getAttribute("alloy:editable:onSaveButtonChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:editable:onSrcNodeChange");
java.lang.Object onStartEditing = (java.lang.Object)request.getAttribute("alloy:editable:onStartEditing");
java.lang.Object onStopEditing = (java.lang.Object)request.getAttribute("alloy:editable:onStopEditing");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:editable:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:editable:onTabIndexChange");
java.lang.Object onUseARIAChange = (java.lang.Object)request.getAttribute("alloy:editable:onUseARIAChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:editable:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:editable:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:editable:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:editable:onWidthChange");

_updateOptions(_options, "boundingBox", boundingBox);
_updateOptions(_options, "cancelButton", cancelButton);
_updateOptions(_options, "contentBox", contentBox);
_updateOptions(_options, "contentText", contentText);
_updateOptions(_options, "cssClass", cssClass);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "disabled", disabled);
_updateOptions(_options, "eventType", eventType);
_updateOptions(_options, "focused", focused);
_updateOptions(_options, "formatInput", formatInput);
_updateOptions(_options, "formatOutput", formatOutput);
_updateOptions(_options, "height", height);
_updateOptions(_options, "hideClass", hideClass);
_updateOptions(_options, "icons", icons);
_updateOptions(_options, "editableId", editableId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "inputType", inputType);
_updateOptions(_options, "locale", locale);
_updateOptions(_options, "node", node);
_updateOptions(_options, "render", render);
_updateOptions(_options, "renderTo", renderTo);
_updateOptions(_options, "rendered", rendered);
_updateOptions(_options, "saveButton", saveButton);
_updateOptions(_options, "srcNode", srcNode);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "tabIndex", tabIndex);
_updateOptions(_options, "useARIA", useARIA);
_updateOptions(_options, "visible", visible);
_updateOptions(_options, "width", width);
_updateOptions(_options, "afterBoundingBoxChange", afterBoundingBoxChange);
_updateOptions(_options, "afterCancel", afterCancel);
_updateOptions(_options, "afterCancelButtonChange", afterCancelButtonChange);
_updateOptions(_options, "afterContentBoxChange", afterContentBoxChange);
_updateOptions(_options, "afterContentTextChange", afterContentTextChange);
_updateOptions(_options, "afterCssClassChange", afterCssClassChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterDisabledChange", afterDisabledChange);
_updateOptions(_options, "afterEventTypeChange", afterEventTypeChange);
_updateOptions(_options, "afterFocusedChange", afterFocusedChange);
_updateOptions(_options, "afterFormatInputChange", afterFormatInputChange);
_updateOptions(_options, "afterFormatOutputChange", afterFormatOutputChange);
_updateOptions(_options, "afterHeightChange", afterHeightChange);
_updateOptions(_options, "afterHideClassChange", afterHideClassChange);
_updateOptions(_options, "afterIconsChange", afterIconsChange);
_updateOptions(_options, "afterIdChange", afterIdChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterInputTypeChange", afterInputTypeChange);
_updateOptions(_options, "afterLocaleChange", afterLocaleChange);
_updateOptions(_options, "afterNodeChange", afterNodeChange);
_updateOptions(_options, "afterRenderChange", afterRenderChange);
_updateOptions(_options, "afterRenderToChange", afterRenderToChange);
_updateOptions(_options, "afterRenderedChange", afterRenderedChange);
_updateOptions(_options, "afterSave", afterSave);
_updateOptions(_options, "afterSaveButtonChange", afterSaveButtonChange);
_updateOptions(_options, "afterSrcNodeChange", afterSrcNodeChange);
_updateOptions(_options, "afterStartEditing", afterStartEditing);
_updateOptions(_options, "afterStopEditing", afterStopEditing);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTabIndexChange", afterTabIndexChange);
_updateOptions(_options, "afterUseARIAChange", afterUseARIAChange);
_updateOptions(_options, "afterVisibleChange", afterVisibleChange);
_updateOptions(_options, "afterContentUpdate", afterContentUpdate);
_updateOptions(_options, "afterRender", afterRender);
_updateOptions(_options, "afterWidthChange", afterWidthChange);
_updateOptions(_options, "onBoundingBoxChange", onBoundingBoxChange);
_updateOptions(_options, "onCancel", onCancel);
_updateOptions(_options, "onCancelButtonChange", onCancelButtonChange);
_updateOptions(_options, "onContentBoxChange", onContentBoxChange);
_updateOptions(_options, "onContentTextChange", onContentTextChange);
_updateOptions(_options, "onCssClassChange", onCssClassChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onDisabledChange", onDisabledChange);
_updateOptions(_options, "onEventTypeChange", onEventTypeChange);
_updateOptions(_options, "onFocusedChange", onFocusedChange);
_updateOptions(_options, "onFormatInputChange", onFormatInputChange);
_updateOptions(_options, "onFormatOutputChange", onFormatOutputChange);
_updateOptions(_options, "onHeightChange", onHeightChange);
_updateOptions(_options, "onHideClassChange", onHideClassChange);
_updateOptions(_options, "onIconsChange", onIconsChange);
_updateOptions(_options, "onIdChange", onIdChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onInputTypeChange", onInputTypeChange);
_updateOptions(_options, "onLocaleChange", onLocaleChange);
_updateOptions(_options, "onNodeChange", onNodeChange);
_updateOptions(_options, "onRenderChange", onRenderChange);
_updateOptions(_options, "onRenderToChange", onRenderToChange);
_updateOptions(_options, "onRenderedChange", onRenderedChange);
_updateOptions(_options, "onSave", onSave);
_updateOptions(_options, "onSaveButtonChange", onSaveButtonChange);
_updateOptions(_options, "onSrcNodeChange", onSrcNodeChange);
_updateOptions(_options, "onStartEditing", onStartEditing);
_updateOptions(_options, "onStopEditing", onStopEditing);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTabIndexChange", onTabIndexChange);
_updateOptions(_options, "onUseARIAChange", onUseARIAChange);
_updateOptions(_options, "onVisibleChange", onVisibleChange);
_updateOptions(_options, "onContentUpdate", onContentUpdate);
_updateOptions(_options, "onRender", onRender);
_updateOptions(_options, "onWidthChange", onWidthChange);
%>

<%@ include file="/html/taglib/alloy/editable/init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "alloy:editable:";
%>