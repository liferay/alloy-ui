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
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:toolbar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:toolbar:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:toolbar:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.Object activeDescendant = (java.lang.Object)request.getAttribute("alloy:toolbar:activeDescendant");
boolean activeState = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:activeState")), false);
java.util.ArrayList children = _toArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:children")));
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:toolbar:cssClass"));
java.lang.Object defaultChildType = (java.lang.Object)request.getAttribute("alloy:toolbar:defaultChildType");
boolean defaultState = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:defaultState")), false);
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:disabled")), false);
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:focused")), false);
java.lang.Object height = (java.lang.Object)request.getAttribute("alloy:toolbar:height");
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:toolbar:hideClass"), "yui3-aui-helper-hidden");
boolean hoverState = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:hoverState")), false);
java.lang.String toolbarId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:toolbar:toolbarId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:initialized")), false);
java.lang.String locale = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:toolbar:locale"), "en");
boolean multiple = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:multiple")), false);
java.lang.String orientation = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:toolbar:orientation"), "horizontal");
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:toolbar:render");
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:rendered")), false);
java.lang.Object selection = (java.lang.Object)request.getAttribute("alloy:toolbar:selection");
java.util.HashMap strings = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:toolbar:tabIndex")), 0);
boolean useARIA = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:useARIA")), true);
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:toolbar:visible")), true);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:toolbar:width");
java.lang.Object afterActiveDescendantChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterActiveDescendantChange");
java.lang.Object afterActiveStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterActiveStateChange");
java.lang.Object afterAddChild = (java.lang.Object)request.getAttribute("alloy:toolbar:afterAddChild");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterBoundingBoxChange");
java.lang.Object afterChildrenChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterChildrenChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterContentBoxChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterCssClassChange");
java.lang.Object afterDefaultChildTypeChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDefaultChildTypeChange");
java.lang.Object afterDefaultStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDefaultStateChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDisabledChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterFocusedChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterHeightChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterHideClassChange");
java.lang.Object afterHoverStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterHoverStateChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:toolbar:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterInitializedChange");
java.lang.Object afterLocaleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterLocaleChange");
java.lang.Object afterMultipleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterMultipleChange");
java.lang.Object afterOrientationChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterOrientationChange");
java.lang.Object afterRemoveChild = (java.lang.Object)request.getAttribute("alloy:toolbar:afterRemoveChild");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterRenderChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterRenderedChange");
java.lang.Object afterSelectionChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterSelectionChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterSrcNodeChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterTabIndexChange");
java.lang.Object afterUseARIAChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterUseARIAChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:toolbar:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:toolbar:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterWidthChange");
java.lang.Object onActiveDescendantChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onActiveDescendantChange");
java.lang.Object onActiveStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onActiveStateChange");
java.lang.Object onAddChild = (java.lang.Object)request.getAttribute("alloy:toolbar:onAddChild");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onBoundingBoxChange");
java.lang.Object onChildrenChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onChildrenChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onContentBoxChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onCssClassChange");
java.lang.Object onDefaultChildTypeChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onDefaultChildTypeChange");
java.lang.Object onDefaultStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onDefaultStateChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:toolbar:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onDisabledChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onFocusedChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onHeightChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onHideClassChange");
java.lang.Object onHoverStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onHoverStateChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:toolbar:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onInitializedChange");
java.lang.Object onLocaleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onLocaleChange");
java.lang.Object onMultipleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onMultipleChange");
java.lang.Object onOrientationChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onOrientationChange");
java.lang.Object onRemoveChild = (java.lang.Object)request.getAttribute("alloy:toolbar:onRemoveChild");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onRenderChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onRenderedChange");
java.lang.Object onSelectionChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onSelectionChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onSrcNodeChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onTabIndexChange");
java.lang.Object onUseARIAChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onUseARIAChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:toolbar:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:toolbar:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onWidthChange");

_updateOptions(_options, "activeDescendant", activeDescendant);
_updateOptions(_options, "activeState", activeState);
_updateOptions(_options, "boundingBox", boundingBox);
_updateOptions(_options, "children", children);
_updateOptions(_options, "contentBox", contentBox);
_updateOptions(_options, "cssClass", cssClass);
_updateOptions(_options, "defaultChildType", defaultChildType);
_updateOptions(_options, "defaultState", defaultState);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "disabled", disabled);
_updateOptions(_options, "focused", focused);
_updateOptions(_options, "height", height);
_updateOptions(_options, "hideClass", hideClass);
_updateOptions(_options, "hoverState", hoverState);
_updateOptions(_options, "toolbarId", toolbarId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "locale", locale);
_updateOptions(_options, "multiple", multiple);
_updateOptions(_options, "orientation", orientation);
_updateOptions(_options, "render", render);
_updateOptions(_options, "rendered", rendered);
_updateOptions(_options, "selection", selection);
_updateOptions(_options, "srcNode", srcNode);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "tabIndex", tabIndex);
_updateOptions(_options, "useARIA", useARIA);
_updateOptions(_options, "visible", visible);
_updateOptions(_options, "width", width);
_updateOptions(_options, "afterActiveDescendantChange", afterActiveDescendantChange);
_updateOptions(_options, "afterActiveStateChange", afterActiveStateChange);
_updateOptions(_options, "afterAddChild", afterAddChild);
_updateOptions(_options, "afterBoundingBoxChange", afterBoundingBoxChange);
_updateOptions(_options, "afterChildrenChange", afterChildrenChange);
_updateOptions(_options, "afterContentBoxChange", afterContentBoxChange);
_updateOptions(_options, "afterCssClassChange", afterCssClassChange);
_updateOptions(_options, "afterDefaultChildTypeChange", afterDefaultChildTypeChange);
_updateOptions(_options, "afterDefaultStateChange", afterDefaultStateChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterDisabledChange", afterDisabledChange);
_updateOptions(_options, "afterFocusedChange", afterFocusedChange);
_updateOptions(_options, "afterHeightChange", afterHeightChange);
_updateOptions(_options, "afterHideClassChange", afterHideClassChange);
_updateOptions(_options, "afterHoverStateChange", afterHoverStateChange);
_updateOptions(_options, "afterIdChange", afterIdChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterLocaleChange", afterLocaleChange);
_updateOptions(_options, "afterMultipleChange", afterMultipleChange);
_updateOptions(_options, "afterOrientationChange", afterOrientationChange);
_updateOptions(_options, "afterRemoveChild", afterRemoveChild);
_updateOptions(_options, "afterRenderChange", afterRenderChange);
_updateOptions(_options, "afterRenderedChange", afterRenderedChange);
_updateOptions(_options, "afterSelectionChange", afterSelectionChange);
_updateOptions(_options, "afterSrcNodeChange", afterSrcNodeChange);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTabIndexChange", afterTabIndexChange);
_updateOptions(_options, "afterUseARIAChange", afterUseARIAChange);
_updateOptions(_options, "afterVisibleChange", afterVisibleChange);
_updateOptions(_options, "afterContentUpdate", afterContentUpdate);
_updateOptions(_options, "afterRender", afterRender);
_updateOptions(_options, "afterWidthChange", afterWidthChange);
_updateOptions(_options, "onActiveDescendantChange", onActiveDescendantChange);
_updateOptions(_options, "onActiveStateChange", onActiveStateChange);
_updateOptions(_options, "onAddChild", onAddChild);
_updateOptions(_options, "onBoundingBoxChange", onBoundingBoxChange);
_updateOptions(_options, "onChildrenChange", onChildrenChange);
_updateOptions(_options, "onContentBoxChange", onContentBoxChange);
_updateOptions(_options, "onCssClassChange", onCssClassChange);
_updateOptions(_options, "onDefaultChildTypeChange", onDefaultChildTypeChange);
_updateOptions(_options, "onDefaultStateChange", onDefaultStateChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onDisabledChange", onDisabledChange);
_updateOptions(_options, "onFocusedChange", onFocusedChange);
_updateOptions(_options, "onHeightChange", onHeightChange);
_updateOptions(_options, "onHideClassChange", onHideClassChange);
_updateOptions(_options, "onHoverStateChange", onHoverStateChange);
_updateOptions(_options, "onIdChange", onIdChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onLocaleChange", onLocaleChange);
_updateOptions(_options, "onMultipleChange", onMultipleChange);
_updateOptions(_options, "onOrientationChange", onOrientationChange);
_updateOptions(_options, "onRemoveChild", onRemoveChild);
_updateOptions(_options, "onRenderChange", onRenderChange);
_updateOptions(_options, "onRenderedChange", onRenderedChange);
_updateOptions(_options, "onSelectionChange", onSelectionChange);
_updateOptions(_options, "onSrcNodeChange", onSrcNodeChange);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTabIndexChange", onTabIndexChange);
_updateOptions(_options, "onUseARIAChange", onUseARIAChange);
_updateOptions(_options, "onVisibleChange", onVisibleChange);
_updateOptions(_options, "onContentUpdate", onContentUpdate);
_updateOptions(_options, "onRender", onRender);
_updateOptions(_options, "onWidthChange", onWidthChange);
%>

<%@ include file="init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "alloy:toolbar:";
%>