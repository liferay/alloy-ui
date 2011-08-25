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
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:progress-bar:customAttributes");

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
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:cssClass"));
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:progress-bar:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:progress-bar:disabled")), false);
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:progress-bar:focused")), false);
int height = GetterUtil.getInteger(String.valueOf(request.getAttribute("alloy:progress-bar:height")), 25);
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:hideClass"), "aui-helper-hidden");
java.lang.String progressbarId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:progressbarId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:progress-bar:initialized")), false);
java.lang.String label = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:label"));
java.lang.String locale = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:locale"), "en");
int max = GetterUtil.getInteger(String.valueOf(request.getAttribute("alloy:progress-bar:max")), 100);
int min = GetterUtil.getInteger(String.valueOf(request.getAttribute("alloy:progress-bar:min")), 0);
java.lang.String orientation = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:orientation"), "horizontal");
java.lang.Number ratio = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:progress-bar:ratio")), 0);
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:progress-bar:render");
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:progress-bar:rendered")), false);
java.lang.String statusNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:statusNode"));
java.lang.Number step = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:progress-bar:step")), 0);
java.util.HashMap strings = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:progress-bar:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:progress-bar:tabIndex")), 0);
java.lang.String textNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:textNode"));
boolean useARIA = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:progress-bar:useARIA")), true);
int progressbarValue = GetterUtil.getInteger(String.valueOf(request.getAttribute("alloy:progress-bar:progressbarValue")), 0);
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:progress-bar:visible")), true);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:progress-bar:width");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterBoundingBoxChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterContentBoxChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterCssClassChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterDisabledChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterFocusedChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterHeightChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterHideClassChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterInitializedChange");
java.lang.Object afterLabelChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterLabelChange");
java.lang.Object afterLocaleChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterLocaleChange");
java.lang.Object afterMaxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterMaxChange");
java.lang.Object afterMinChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterMinChange");
java.lang.Object afterOrientationChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterOrientationChange");
java.lang.Object afterRatioChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRatioChange");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRenderChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRenderedChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterSrcNodeChange");
java.lang.Object afterStatusNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterStatusNodeChange");
java.lang.Object afterStepChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterStepChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterTabIndexChange");
java.lang.Object afterTextNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterTextNodeChange");
java.lang.Object afterUseARIAChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterUseARIAChange");
java.lang.Object afterValueChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterValueChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterWidthChange");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onBoundingBoxChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onContentBoxChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onCssClassChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:progress-bar:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onDisabledChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onFocusedChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onHeightChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onHideClassChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:progress-bar:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onInitializedChange");
java.lang.Object onLabelChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onLabelChange");
java.lang.Object onLocaleChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onLocaleChange");
java.lang.Object onMaxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onMaxChange");
java.lang.Object onMinChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onMinChange");
java.lang.Object onOrientationChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onOrientationChange");
java.lang.Object onRatioChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRatioChange");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRenderChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRenderedChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onSrcNodeChange");
java.lang.Object onStatusNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onStatusNodeChange");
java.lang.Object onStepChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onStepChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onTabIndexChange");
java.lang.Object onTextNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onTextNodeChange");
java.lang.Object onUseARIAChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onUseARIAChange");
java.lang.Object onValueChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onValueChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:progress-bar:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onWidthChange");

_updateOptions(_options, "boundingBox", boundingBox);
_updateOptions(_options, "contentBox", contentBox);
_updateOptions(_options, "cssClass", cssClass);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "disabled", disabled);
_updateOptions(_options, "focused", focused);
_updateOptions(_options, "height", height);
_updateOptions(_options, "hideClass", hideClass);
_updateOptions(_options, "progressbarId", progressbarId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "label", label);
_updateOptions(_options, "locale", locale);
_updateOptions(_options, "max", max);
_updateOptions(_options, "min", min);
_updateOptions(_options, "orientation", orientation);
_updateOptions(_options, "ratio", ratio);
_updateOptions(_options, "render", render);
_updateOptions(_options, "rendered", rendered);
_updateOptions(_options, "srcNode", srcNode);
_updateOptions(_options, "statusNode", statusNode);
_updateOptions(_options, "step", step);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "tabIndex", tabIndex);
_updateOptions(_options, "textNode", textNode);
_updateOptions(_options, "useARIA", useARIA);
_updateOptions(_options, "progressbarValue", progressbarValue);
_updateOptions(_options, "visible", visible);
_updateOptions(_options, "width", width);
_updateOptions(_options, "afterBoundingBoxChange", afterBoundingBoxChange);
_updateOptions(_options, "afterContentBoxChange", afterContentBoxChange);
_updateOptions(_options, "afterCssClassChange", afterCssClassChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterDisabledChange", afterDisabledChange);
_updateOptions(_options, "afterFocusedChange", afterFocusedChange);
_updateOptions(_options, "afterHeightChange", afterHeightChange);
_updateOptions(_options, "afterHideClassChange", afterHideClassChange);
_updateOptions(_options, "afterIdChange", afterIdChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterLabelChange", afterLabelChange);
_updateOptions(_options, "afterLocaleChange", afterLocaleChange);
_updateOptions(_options, "afterMaxChange", afterMaxChange);
_updateOptions(_options, "afterMinChange", afterMinChange);
_updateOptions(_options, "afterOrientationChange", afterOrientationChange);
_updateOptions(_options, "afterRatioChange", afterRatioChange);
_updateOptions(_options, "afterRenderChange", afterRenderChange);
_updateOptions(_options, "afterRenderedChange", afterRenderedChange);
_updateOptions(_options, "afterSrcNodeChange", afterSrcNodeChange);
_updateOptions(_options, "afterStatusNodeChange", afterStatusNodeChange);
_updateOptions(_options, "afterStepChange", afterStepChange);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTabIndexChange", afterTabIndexChange);
_updateOptions(_options, "afterTextNodeChange", afterTextNodeChange);
_updateOptions(_options, "afterUseARIAChange", afterUseARIAChange);
_updateOptions(_options, "afterValueChange", afterValueChange);
_updateOptions(_options, "afterVisibleChange", afterVisibleChange);
_updateOptions(_options, "afterContentUpdate", afterContentUpdate);
_updateOptions(_options, "afterRender", afterRender);
_updateOptions(_options, "afterWidthChange", afterWidthChange);
_updateOptions(_options, "onBoundingBoxChange", onBoundingBoxChange);
_updateOptions(_options, "onContentBoxChange", onContentBoxChange);
_updateOptions(_options, "onCssClassChange", onCssClassChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onDisabledChange", onDisabledChange);
_updateOptions(_options, "onFocusedChange", onFocusedChange);
_updateOptions(_options, "onHeightChange", onHeightChange);
_updateOptions(_options, "onHideClassChange", onHideClassChange);
_updateOptions(_options, "onIdChange", onIdChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onLabelChange", onLabelChange);
_updateOptions(_options, "onLocaleChange", onLocaleChange);
_updateOptions(_options, "onMaxChange", onMaxChange);
_updateOptions(_options, "onMinChange", onMinChange);
_updateOptions(_options, "onOrientationChange", onOrientationChange);
_updateOptions(_options, "onRatioChange", onRatioChange);
_updateOptions(_options, "onRenderChange", onRenderChange);
_updateOptions(_options, "onRenderedChange", onRenderedChange);
_updateOptions(_options, "onSrcNodeChange", onSrcNodeChange);
_updateOptions(_options, "onStatusNodeChange", onStatusNodeChange);
_updateOptions(_options, "onStepChange", onStepChange);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTabIndexChange", onTabIndexChange);
_updateOptions(_options, "onTextNodeChange", onTextNodeChange);
_updateOptions(_options, "onUseARIAChange", onUseARIAChange);
_updateOptions(_options, "onValueChange", onValueChange);
_updateOptions(_options, "onVisibleChange", onVisibleChange);
_updateOptions(_options, "onContentUpdate", onContentUpdate);
_updateOptions(_options, "onRender", onRender);
_updateOptions(_options, "onWidthChange", onWidthChange);
%>

<%@ include file="/html/taglib/alloy/progress_bar/init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "alloy:progress-bar:";
%>