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
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:panel:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:panel:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:panel:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.Object panelBodyContent = (java.lang.Object)request.getAttribute("alloy:panel:panelBodyContent");
boolean collapsed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:panel:collapsed")), false);
boolean collapsible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:panel:collapsible")), false);
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:panel:cssClass"));
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:panel:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:panel:disabled")), false);
java.lang.Object fillHeight = (java.lang.Object)request.getAttribute("alloy:panel:fillHeight");
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:panel:focused")), false);
java.lang.Object footerContent = (java.lang.Object)request.getAttribute("alloy:panel:footerContent");
java.lang.Object headerContent = (java.lang.Object)request.getAttribute("alloy:panel:headerContent");
java.lang.Object height = (java.lang.Object)request.getAttribute("alloy:panel:height");
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:panel:hideClass"), "aui-helper-hidden");
java.util.ArrayList icons = _toArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:icons"), "[]"));
java.lang.String panelId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:panel:panelId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:panel:initialized")), false);
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:panel:render");
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:panel:rendered")), false);
java.util.HashMap strings = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:panel:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:panel:tabIndex")), 0);
java.lang.Object title = (java.lang.Object)request.getAttribute("alloy:panel:title");
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:panel:visible")), true);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:panel:width");
java.lang.Object afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:panel:afterBodyContentChange");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:panel:afterBoundingBoxChange");
java.lang.Object afterCollapsedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterCollapsedChange");
java.lang.Object afterCollapsibleChange = (java.lang.Object)request.getAttribute("alloy:panel:afterCollapsibleChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:panel:afterContentBoxChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:panel:afterCssClassChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:panel:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:panel:afterDisabledChange");
java.lang.Object afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:panel:afterFillHeightChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterFocusedChange");
java.lang.Object afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:panel:afterFooterContentChange");
java.lang.Object afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:panel:afterHeaderContentChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:panel:afterHeightChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:panel:afterHideClassChange");
java.lang.Object afterIconsChange = (java.lang.Object)request.getAttribute("alloy:panel:afterIconsChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:panel:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:panel:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterInitializedChange");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:panel:afterRenderChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:panel:afterRenderedChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:panel:afterSrcNodeChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:panel:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:panel:afterTabIndexChange");
java.lang.Object afterTitleChange = (java.lang.Object)request.getAttribute("alloy:panel:afterTitleChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:panel:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:panel:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:panel:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:panel:afterWidthChange");
java.lang.Object onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:panel:onBodyContentChange");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:panel:onBoundingBoxChange");
java.lang.Object onCollapsedChange = (java.lang.Object)request.getAttribute("alloy:panel:onCollapsedChange");
java.lang.Object onCollapsibleChange = (java.lang.Object)request.getAttribute("alloy:panel:onCollapsibleChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:panel:onContentBoxChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:panel:onCssClassChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:panel:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:panel:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:panel:onDisabledChange");
java.lang.Object onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:panel:onFillHeightChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:panel:onFocusedChange");
java.lang.Object onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:panel:onFooterContentChange");
java.lang.Object onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:panel:onHeaderContentChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:panel:onHeightChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:panel:onHideClassChange");
java.lang.Object onIconsChange = (java.lang.Object)request.getAttribute("alloy:panel:onIconsChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:panel:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:panel:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:panel:onInitializedChange");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:panel:onRenderChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:panel:onRenderedChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:panel:onSrcNodeChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:panel:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:panel:onTabIndexChange");
java.lang.Object onTitleChange = (java.lang.Object)request.getAttribute("alloy:panel:onTitleChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:panel:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:panel:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:panel:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:panel:onWidthChange");

_updateOptions(_options, "panelBodyContent", panelBodyContent);
_updateOptions(_options, "boundingBox", boundingBox);
_updateOptions(_options, "collapsed", collapsed);
_updateOptions(_options, "collapsible", collapsible);
_updateOptions(_options, "contentBox", contentBox);
_updateOptions(_options, "cssClass", cssClass);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "disabled", disabled);
_updateOptions(_options, "fillHeight", fillHeight);
_updateOptions(_options, "focused", focused);
_updateOptions(_options, "footerContent", footerContent);
_updateOptions(_options, "headerContent", headerContent);
_updateOptions(_options, "height", height);
_updateOptions(_options, "hideClass", hideClass);
_updateOptions(_options, "icons", icons);
_updateOptions(_options, "panelId", panelId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "render", render);
_updateOptions(_options, "rendered", rendered);
_updateOptions(_options, "srcNode", srcNode);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "tabIndex", tabIndex);
_updateOptions(_options, "title", title);
_updateOptions(_options, "visible", visible);
_updateOptions(_options, "width", width);
_updateOptions(_options, "afterBodyContentChange", afterBodyContentChange);
_updateOptions(_options, "afterBoundingBoxChange", afterBoundingBoxChange);
_updateOptions(_options, "afterCollapsedChange", afterCollapsedChange);
_updateOptions(_options, "afterCollapsibleChange", afterCollapsibleChange);
_updateOptions(_options, "afterContentBoxChange", afterContentBoxChange);
_updateOptions(_options, "afterCssClassChange", afterCssClassChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterDisabledChange", afterDisabledChange);
_updateOptions(_options, "afterFillHeightChange", afterFillHeightChange);
_updateOptions(_options, "afterFocusedChange", afterFocusedChange);
_updateOptions(_options, "afterFooterContentChange", afterFooterContentChange);
_updateOptions(_options, "afterHeaderContentChange", afterHeaderContentChange);
_updateOptions(_options, "afterHeightChange", afterHeightChange);
_updateOptions(_options, "afterHideClassChange", afterHideClassChange);
_updateOptions(_options, "afterIconsChange", afterIconsChange);
_updateOptions(_options, "afterIdChange", afterIdChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterRenderChange", afterRenderChange);
_updateOptions(_options, "afterRenderedChange", afterRenderedChange);
_updateOptions(_options, "afterSrcNodeChange", afterSrcNodeChange);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTabIndexChange", afterTabIndexChange);
_updateOptions(_options, "afterTitleChange", afterTitleChange);
_updateOptions(_options, "afterVisibleChange", afterVisibleChange);
_updateOptions(_options, "afterContentUpdate", afterContentUpdate);
_updateOptions(_options, "afterRender", afterRender);
_updateOptions(_options, "afterWidthChange", afterWidthChange);
_updateOptions(_options, "onBodyContentChange", onBodyContentChange);
_updateOptions(_options, "onBoundingBoxChange", onBoundingBoxChange);
_updateOptions(_options, "onCollapsedChange", onCollapsedChange);
_updateOptions(_options, "onCollapsibleChange", onCollapsibleChange);
_updateOptions(_options, "onContentBoxChange", onContentBoxChange);
_updateOptions(_options, "onCssClassChange", onCssClassChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onDisabledChange", onDisabledChange);
_updateOptions(_options, "onFillHeightChange", onFillHeightChange);
_updateOptions(_options, "onFocusedChange", onFocusedChange);
_updateOptions(_options, "onFooterContentChange", onFooterContentChange);
_updateOptions(_options, "onHeaderContentChange", onHeaderContentChange);
_updateOptions(_options, "onHeightChange", onHeightChange);
_updateOptions(_options, "onHideClassChange", onHideClassChange);
_updateOptions(_options, "onIconsChange", onIconsChange);
_updateOptions(_options, "onIdChange", onIdChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onRenderChange", onRenderChange);
_updateOptions(_options, "onRenderedChange", onRenderedChange);
_updateOptions(_options, "onSrcNodeChange", onSrcNodeChange);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTabIndexChange", onTabIndexChange);
_updateOptions(_options, "onTitleChange", onTitleChange);
_updateOptions(_options, "onVisibleChange", onVisibleChange);
_updateOptions(_options, "onContentUpdate", onContentUpdate);
_updateOptions(_options, "onRender", onRender);
_updateOptions(_options, "onWidthChange", onWidthChange);
%>

<%@ include file="init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "alloy:panel:";
%>