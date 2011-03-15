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
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:color-picker:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:color-picker:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:color-picker:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.util.HashMap align = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:color-picker:align"), "{ node: null, points: [ TL, BL ] }"));
java.lang.Object colorpickerBodyContent = (java.lang.Object)request.getAttribute("alloy:color-picker:colorpickerBodyContent");
boolean cancellableHide = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:cancellableHide")), true);
java.lang.Object centered = (java.lang.Object)request.getAttribute("alloy:color-picker:centered");
java.lang.Object constrain = (java.lang.Object)request.getAttribute("alloy:color-picker:constrain");
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:cssClass"));
java.lang.Object currentNode = (java.lang.Object)request.getAttribute("alloy:color-picker:currentNode");
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:disabled")), false);
java.lang.Object fillHeight = (java.lang.Object)request.getAttribute("alloy:color-picker:fillHeight");
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:focused")), false);
java.lang.Object footerContent = (java.lang.Object)request.getAttribute("alloy:color-picker:footerContent");
java.lang.Object headerContent = (java.lang.Object)request.getAttribute("alloy:color-picker:headerContent");
java.lang.Object height = (java.lang.Object)request.getAttribute("alloy:color-picker:height");
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:hideClass"), "aui-helper-hidden");
java.lang.Number hideDelay = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:color-picker:hideDelay")), 0);
java.lang.String hideOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:hideOn"), "mouseout");
boolean hideOnDocumentClick = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:hideOnDocumentClick")), true);
java.lang.String colorpickerId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:colorpickerId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:initialized")), false);
boolean preventOverlap = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:preventOverlap")), false);
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:color-picker:render");
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:rendered")), false);
boolean shim = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:shim")), false);
java.lang.Number showDelay = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:color-picker:showDelay")), 0);
java.lang.String showOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:color-picker:showOn"), "mouseover");
java.util.HashMap strings = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:color-picker:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:color-picker:tabIndex")), 0);
java.lang.Object trigger = (java.lang.Object)request.getAttribute("alloy:color-picker:trigger");
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:color-picker:visible")), false);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:color-picker:width");
java.lang.Number x = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:color-picker:x")), 0);
java.util.ArrayList xy = _toArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:color-picker:xy"), "[0,0]"));
java.lang.Number y = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:color-picker:y")), 0);
java.lang.Number zIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:color-picker:zIndex")), 0);
java.lang.Object afterAlignChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterAlignChange");
java.lang.Object afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterBodyContentChange");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterBoundingBoxChange");
java.lang.Object afterCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterCancellableHideChange");
java.lang.Object afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterCenteredChange");
java.lang.Object afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterConstrainChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterContentBoxChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterCssClassChange");
java.lang.Object afterCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterCurrentNodeChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:color-picker:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterDisabledChange");
java.lang.Object afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterFillHeightChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterFocusedChange");
java.lang.Object afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterFooterContentChange");
java.lang.Object afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHeaderContentChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHeightChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHideClassChange");
java.lang.Object afterHideDelayChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHideDelayChange");
java.lang.Object afterHideOnChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHideOnChange");
java.lang.Object afterHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHideOnDocumentClickChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:color-picker:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterInitializedChange");
java.lang.Object afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterPreventOverlapChange");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterRenderChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterRenderedChange");
java.lang.Object afterShimChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterShimChange");
java.lang.Object afterShowDelayChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterShowDelayChange");
java.lang.Object afterShowOnChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterShowOnChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterSrcNodeChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterTabIndexChange");
java.lang.Object afterTriggerChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterTriggerChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:color-picker:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:color-picker:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterWidthChange");
java.lang.Object afterXChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterXChange");
java.lang.Object afterXyChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterXyChange");
java.lang.Object afterYChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterYChange");
java.lang.Object afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterZIndexChange");
java.lang.Object onAlignChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onAlignChange");
java.lang.Object onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onBodyContentChange");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onBoundingBoxChange");
java.lang.Object onCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onCancellableHideChange");
java.lang.Object onCenteredChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onCenteredChange");
java.lang.Object onConstrainChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onConstrainChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onContentBoxChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onCssClassChange");
java.lang.Object onCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onCurrentNodeChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:color-picker:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onDisabledChange");
java.lang.Object onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onFillHeightChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onFocusedChange");
java.lang.Object onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onFooterContentChange");
java.lang.Object onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHeaderContentChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHeightChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHideClassChange");
java.lang.Object onHideDelayChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHideDelayChange");
java.lang.Object onHideOnChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHideOnChange");
java.lang.Object onHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHideOnDocumentClickChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:color-picker:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onInitializedChange");
java.lang.Object onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onPreventOverlapChange");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onRenderChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onRenderedChange");
java.lang.Object onShimChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onShimChange");
java.lang.Object onShowDelayChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onShowDelayChange");
java.lang.Object onShowOnChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onShowOnChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onSrcNodeChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onTabIndexChange");
java.lang.Object onTriggerChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onTriggerChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:color-picker:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:color-picker:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onWidthChange");
java.lang.Object onXChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onXChange");
java.lang.Object onXyChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onXyChange");
java.lang.Object onYChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onYChange");
java.lang.Object onZIndexChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onZIndexChange");

_updateOptions(_options, "align", align);
_updateOptions(_options, "colorpickerBodyContent", colorpickerBodyContent);
_updateOptions(_options, "boundingBox", boundingBox);
_updateOptions(_options, "cancellableHide", cancellableHide);
_updateOptions(_options, "centered", centered);
_updateOptions(_options, "constrain", constrain);
_updateOptions(_options, "contentBox", contentBox);
_updateOptions(_options, "cssClass", cssClass);
_updateOptions(_options, "currentNode", currentNode);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "disabled", disabled);
_updateOptions(_options, "fillHeight", fillHeight);
_updateOptions(_options, "focused", focused);
_updateOptions(_options, "footerContent", footerContent);
_updateOptions(_options, "headerContent", headerContent);
_updateOptions(_options, "height", height);
_updateOptions(_options, "hideClass", hideClass);
_updateOptions(_options, "hideDelay", hideDelay);
_updateOptions(_options, "hideOn", hideOn);
_updateOptions(_options, "hideOnDocumentClick", hideOnDocumentClick);
_updateOptions(_options, "colorpickerId", colorpickerId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "preventOverlap", preventOverlap);
_updateOptions(_options, "render", render);
_updateOptions(_options, "rendered", rendered);
_updateOptions(_options, "shim", shim);
_updateOptions(_options, "showDelay", showDelay);
_updateOptions(_options, "showOn", showOn);
_updateOptions(_options, "srcNode", srcNode);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "tabIndex", tabIndex);
_updateOptions(_options, "trigger", trigger);
_updateOptions(_options, "visible", visible);
_updateOptions(_options, "width", width);
_updateOptions(_options, "x", x);
_updateOptions(_options, "xy", xy);
_updateOptions(_options, "y", y);
_updateOptions(_options, "zIndex", zIndex);
_updateOptions(_options, "afterAlignChange", afterAlignChange);
_updateOptions(_options, "afterBodyContentChange", afterBodyContentChange);
_updateOptions(_options, "afterBoundingBoxChange", afterBoundingBoxChange);
_updateOptions(_options, "afterCancellableHideChange", afterCancellableHideChange);
_updateOptions(_options, "afterCenteredChange", afterCenteredChange);
_updateOptions(_options, "afterConstrainChange", afterConstrainChange);
_updateOptions(_options, "afterContentBoxChange", afterContentBoxChange);
_updateOptions(_options, "afterCssClassChange", afterCssClassChange);
_updateOptions(_options, "afterCurrentNodeChange", afterCurrentNodeChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterDisabledChange", afterDisabledChange);
_updateOptions(_options, "afterFillHeightChange", afterFillHeightChange);
_updateOptions(_options, "afterFocusedChange", afterFocusedChange);
_updateOptions(_options, "afterFooterContentChange", afterFooterContentChange);
_updateOptions(_options, "afterHeaderContentChange", afterHeaderContentChange);
_updateOptions(_options, "afterHeightChange", afterHeightChange);
_updateOptions(_options, "afterHideClassChange", afterHideClassChange);
_updateOptions(_options, "afterHideDelayChange", afterHideDelayChange);
_updateOptions(_options, "afterHideOnChange", afterHideOnChange);
_updateOptions(_options, "afterHideOnDocumentClickChange", afterHideOnDocumentClickChange);
_updateOptions(_options, "afterIdChange", afterIdChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterPreventOverlapChange", afterPreventOverlapChange);
_updateOptions(_options, "afterRenderChange", afterRenderChange);
_updateOptions(_options, "afterRenderedChange", afterRenderedChange);
_updateOptions(_options, "afterShimChange", afterShimChange);
_updateOptions(_options, "afterShowDelayChange", afterShowDelayChange);
_updateOptions(_options, "afterShowOnChange", afterShowOnChange);
_updateOptions(_options, "afterSrcNodeChange", afterSrcNodeChange);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTabIndexChange", afterTabIndexChange);
_updateOptions(_options, "afterTriggerChange", afterTriggerChange);
_updateOptions(_options, "afterVisibleChange", afterVisibleChange);
_updateOptions(_options, "afterContentUpdate", afterContentUpdate);
_updateOptions(_options, "afterRender", afterRender);
_updateOptions(_options, "afterWidthChange", afterWidthChange);
_updateOptions(_options, "afterXChange", afterXChange);
_updateOptions(_options, "afterXyChange", afterXyChange);
_updateOptions(_options, "afterYChange", afterYChange);
_updateOptions(_options, "afterZIndexChange", afterZIndexChange);
_updateOptions(_options, "onAlignChange", onAlignChange);
_updateOptions(_options, "onBodyContentChange", onBodyContentChange);
_updateOptions(_options, "onBoundingBoxChange", onBoundingBoxChange);
_updateOptions(_options, "onCancellableHideChange", onCancellableHideChange);
_updateOptions(_options, "onCenteredChange", onCenteredChange);
_updateOptions(_options, "onConstrainChange", onConstrainChange);
_updateOptions(_options, "onContentBoxChange", onContentBoxChange);
_updateOptions(_options, "onCssClassChange", onCssClassChange);
_updateOptions(_options, "onCurrentNodeChange", onCurrentNodeChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onDisabledChange", onDisabledChange);
_updateOptions(_options, "onFillHeightChange", onFillHeightChange);
_updateOptions(_options, "onFocusedChange", onFocusedChange);
_updateOptions(_options, "onFooterContentChange", onFooterContentChange);
_updateOptions(_options, "onHeaderContentChange", onHeaderContentChange);
_updateOptions(_options, "onHeightChange", onHeightChange);
_updateOptions(_options, "onHideClassChange", onHideClassChange);
_updateOptions(_options, "onHideDelayChange", onHideDelayChange);
_updateOptions(_options, "onHideOnChange", onHideOnChange);
_updateOptions(_options, "onHideOnDocumentClickChange", onHideOnDocumentClickChange);
_updateOptions(_options, "onIdChange", onIdChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onPreventOverlapChange", onPreventOverlapChange);
_updateOptions(_options, "onRenderChange", onRenderChange);
_updateOptions(_options, "onRenderedChange", onRenderedChange);
_updateOptions(_options, "onShimChange", onShimChange);
_updateOptions(_options, "onShowDelayChange", onShowDelayChange);
_updateOptions(_options, "onShowOnChange", onShowOnChange);
_updateOptions(_options, "onSrcNodeChange", onSrcNodeChange);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTabIndexChange", onTabIndexChange);
_updateOptions(_options, "onTriggerChange", onTriggerChange);
_updateOptions(_options, "onVisibleChange", onVisibleChange);
_updateOptions(_options, "onContentUpdate", onContentUpdate);
_updateOptions(_options, "onRender", onRender);
_updateOptions(_options, "onWidthChange", onWidthChange);
_updateOptions(_options, "onXChange", onXChange);
_updateOptions(_options, "onXyChange", onXyChange);
_updateOptions(_options, "onYChange", onYChange);
_updateOptions(_options, "onZIndexChange", onZIndexChange);
%>

<%@ include file="init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "alloy:color-picker:";
%>