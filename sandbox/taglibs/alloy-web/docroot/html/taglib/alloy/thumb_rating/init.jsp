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
--%>

<%@ include file="/html/taglib/init-taglib.jsp" %>

<%
java.lang.String NAMESPACE = "alloy:thumb-rating:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:thumb-rating:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:thumb-rating:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:thumb-rating:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
boolean canReset = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:thumb-rating:canReset")), true);
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:cssClass"));
java.lang.Number defaultSelected = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:thumb-rating:defaultSelected")), 0);
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:thumb-rating:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:thumb-rating:disabled")), false);
java.lang.Object elements = (java.lang.Object)request.getAttribute("alloy:thumb-rating:elements");
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:thumb-rating:focused")), false);
java.lang.Object height = (java.lang.Object)request.getAttribute("alloy:thumb-rating:height");
java.lang.Object hiddenInput = (java.lang.Object)request.getAttribute("alloy:thumb-rating:hiddenInput");
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:hideClass"), "aui-helper-hidden");
java.lang.String thumbratingId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:thumbratingId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:thumb-rating:initialized")), false);
java.lang.String inputName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:inputName"));
java.lang.String label = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:label"));
java.lang.String labelNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:labelNode"));
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:thumb-rating:render");
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:thumb-rating:rendered")), false);
java.lang.Number selectedIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:thumb-rating:selectedIndex")), -1);
boolean showTitle = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:thumb-rating:showTitle")), true);
java.lang.Number size = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:thumb-rating:size")), 2);
java.util.HashMap strings = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:thumb-rating:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:thumb-rating:tabIndex")), 0);
java.lang.String title = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:title"));
java.lang.String thumbratingValue = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:thumbratingValue"));
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:thumb-rating:visible")), true);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:thumb-rating:width");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterBoundingBoxChange");
java.lang.Object afterCanResetChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterCanResetChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterContentBoxChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterCssClassChange");
java.lang.Object afterDefaultSelectedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterDefaultSelectedChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterDisabledChange");
java.lang.Object afterElementsChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterElementsChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterFocusedChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterHeightChange");
java.lang.Object afterHiddenInputChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterHiddenInputChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterHideClassChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterInitializedChange");
java.lang.Object afterInputNameChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterInputNameChange");
java.lang.Object afterItemClick = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterItemClick");
java.lang.Object afterItemOut = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterItemOut");
java.lang.Object afterItemSelect = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterItemSelect");
java.lang.Object afterLabelChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterLabelChange");
java.lang.Object afterLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterLabelNodeChange");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterRenderChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterRenderedChange");
java.lang.Object afterSelectedIndexChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterSelectedIndexChange");
java.lang.Object afterShowTitleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterShowTitleChange");
java.lang.Object afterSizeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterSizeChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterSrcNodeChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterTabIndexChange");
java.lang.Object afterTitleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterTitleChange");
java.lang.Object afterValueChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterValueChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterWidthChange");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onBoundingBoxChange");
java.lang.Object onCanResetChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onCanResetChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onContentBoxChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onCssClassChange");
java.lang.Object onDefaultSelectedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onDefaultSelectedChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onDisabledChange");
java.lang.Object onElementsChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onElementsChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onFocusedChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onHeightChange");
java.lang.Object onHiddenInputChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onHiddenInputChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onHideClassChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onInitializedChange");
java.lang.Object onInputNameChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onInputNameChange");
java.lang.Object onItemClick = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onItemClick");
java.lang.Object onItemOut = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onItemOut");
java.lang.Object onItemSelect = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onItemSelect");
java.lang.Object onLabelChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onLabelChange");
java.lang.Object onLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onLabelNodeChange");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onRenderChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onRenderedChange");
java.lang.Object onSelectedIndexChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onSelectedIndexChange");
java.lang.Object onShowTitleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onShowTitleChange");
java.lang.Object onSizeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onSizeChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onSrcNodeChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onTabIndexChange");
java.lang.Object onTitleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onTitleChange");
java.lang.Object onValueChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onValueChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onWidthChange");

_updateOptions(_options, "boundingBox", boundingBox);
_updateOptions(_options, "canReset", canReset);
_updateOptions(_options, "contentBox", contentBox);
_updateOptions(_options, "cssClass", cssClass);
_updateOptions(_options, "defaultSelected", defaultSelected);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "disabled", disabled);
_updateOptions(_options, "elements", elements);
_updateOptions(_options, "focused", focused);
_updateOptions(_options, "height", height);
_updateOptions(_options, "hiddenInput", hiddenInput);
_updateOptions(_options, "hideClass", hideClass);
_updateOptions(_options, "thumbratingId", thumbratingId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "inputName", inputName);
_updateOptions(_options, "label", label);
_updateOptions(_options, "labelNode", labelNode);
_updateOptions(_options, "render", render);
_updateOptions(_options, "rendered", rendered);
_updateOptions(_options, "selectedIndex", selectedIndex);
_updateOptions(_options, "showTitle", showTitle);
_updateOptions(_options, "size", size);
_updateOptions(_options, "srcNode", srcNode);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "tabIndex", tabIndex);
_updateOptions(_options, "title", title);
_updateOptions(_options, "thumbratingValue", thumbratingValue);
_updateOptions(_options, "visible", visible);
_updateOptions(_options, "width", width);
_updateOptions(_options, "afterBoundingBoxChange", afterBoundingBoxChange);
_updateOptions(_options, "afterCanResetChange", afterCanResetChange);
_updateOptions(_options, "afterContentBoxChange", afterContentBoxChange);
_updateOptions(_options, "afterCssClassChange", afterCssClassChange);
_updateOptions(_options, "afterDefaultSelectedChange", afterDefaultSelectedChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterDisabledChange", afterDisabledChange);
_updateOptions(_options, "afterElementsChange", afterElementsChange);
_updateOptions(_options, "afterFocusedChange", afterFocusedChange);
_updateOptions(_options, "afterHeightChange", afterHeightChange);
_updateOptions(_options, "afterHiddenInputChange", afterHiddenInputChange);
_updateOptions(_options, "afterHideClassChange", afterHideClassChange);
_updateOptions(_options, "afterIdChange", afterIdChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterInputNameChange", afterInputNameChange);
_updateOptions(_options, "afterItemClick", afterItemClick);
_updateOptions(_options, "afterItemOut", afterItemOut);
_updateOptions(_options, "afterItemSelect", afterItemSelect);
_updateOptions(_options, "afterLabelChange", afterLabelChange);
_updateOptions(_options, "afterLabelNodeChange", afterLabelNodeChange);
_updateOptions(_options, "afterRenderChange", afterRenderChange);
_updateOptions(_options, "afterRenderedChange", afterRenderedChange);
_updateOptions(_options, "afterSelectedIndexChange", afterSelectedIndexChange);
_updateOptions(_options, "afterShowTitleChange", afterShowTitleChange);
_updateOptions(_options, "afterSizeChange", afterSizeChange);
_updateOptions(_options, "afterSrcNodeChange", afterSrcNodeChange);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTabIndexChange", afterTabIndexChange);
_updateOptions(_options, "afterTitleChange", afterTitleChange);
_updateOptions(_options, "afterValueChange", afterValueChange);
_updateOptions(_options, "afterVisibleChange", afterVisibleChange);
_updateOptions(_options, "afterContentUpdate", afterContentUpdate);
_updateOptions(_options, "afterRender", afterRender);
_updateOptions(_options, "afterWidthChange", afterWidthChange);
_updateOptions(_options, "onBoundingBoxChange", onBoundingBoxChange);
_updateOptions(_options, "onCanResetChange", onCanResetChange);
_updateOptions(_options, "onContentBoxChange", onContentBoxChange);
_updateOptions(_options, "onCssClassChange", onCssClassChange);
_updateOptions(_options, "onDefaultSelectedChange", onDefaultSelectedChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onDisabledChange", onDisabledChange);
_updateOptions(_options, "onElementsChange", onElementsChange);
_updateOptions(_options, "onFocusedChange", onFocusedChange);
_updateOptions(_options, "onHeightChange", onHeightChange);
_updateOptions(_options, "onHiddenInputChange", onHiddenInputChange);
_updateOptions(_options, "onHideClassChange", onHideClassChange);
_updateOptions(_options, "onIdChange", onIdChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onInputNameChange", onInputNameChange);
_updateOptions(_options, "onItemClick", onItemClick);
_updateOptions(_options, "onItemOut", onItemOut);
_updateOptions(_options, "onItemSelect", onItemSelect);
_updateOptions(_options, "onLabelChange", onLabelChange);
_updateOptions(_options, "onLabelNodeChange", onLabelNodeChange);
_updateOptions(_options, "onRenderChange", onRenderChange);
_updateOptions(_options, "onRenderedChange", onRenderedChange);
_updateOptions(_options, "onSelectedIndexChange", onSelectedIndexChange);
_updateOptions(_options, "onShowTitleChange", onShowTitleChange);
_updateOptions(_options, "onSizeChange", onSizeChange);
_updateOptions(_options, "onSrcNodeChange", onSrcNodeChange);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTabIndexChange", onTabIndexChange);
_updateOptions(_options, "onTitleChange", onTitleChange);
_updateOptions(_options, "onValueChange", onValueChange);
_updateOptions(_options, "onVisibleChange", onVisibleChange);
_updateOptions(_options, "onContentUpdate", onContentUpdate);
_updateOptions(_options, "onRender", onRender);
_updateOptions(_options, "onWidthChange", onWidthChange);
%>

<%@ include file="init-ext.jsp" %>