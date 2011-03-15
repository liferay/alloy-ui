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
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tooltip:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tooltip:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:tooltip:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.util.HashMap align = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tooltip:align"), "{ node: null, points: [ BL, TR ] }"));
java.util.HashMap anim = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tooltip:anim"), "{ show: false }"));
java.lang.String arrow = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:arrow"));
java.lang.Object tooltipBodyContent = (java.lang.Object)request.getAttribute("alloy:tooltip:tooltipBodyContent");
boolean cancellableHide = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:cancellableHide")), true);
java.lang.Object centered = (java.lang.Object)request.getAttribute("alloy:tooltip:centered");
java.lang.Object constrain = (java.lang.Object)request.getAttribute("alloy:tooltip:constrain");
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:cssClass"));
java.lang.Object currentNode = (java.lang.Object)request.getAttribute("alloy:tooltip:currentNode");
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:disabled")), false);
java.lang.Object fillHeight = (java.lang.Object)request.getAttribute("alloy:tooltip:fillHeight");
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:focused")), false);
java.lang.Object footerContent = (java.lang.Object)request.getAttribute("alloy:tooltip:footerContent");
java.lang.Object headerContent = (java.lang.Object)request.getAttribute("alloy:tooltip:headerContent");
java.lang.Object height = (java.lang.Object)request.getAttribute("alloy:tooltip:height");
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:hideClass"), "aui-helper-hidden");
java.lang.Number hideDelay = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tooltip:hideDelay")), 500);
java.lang.String hideOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:hideOn"), "mouseout");
boolean hideOnDocumentClick = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:hideOnDocumentClick")), true);
java.lang.String tooltipId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:tooltipId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:initialized")), false);
boolean preventOverlap = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:preventOverlap")), false);
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:tooltip:render");
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:rendered")), false);
boolean shim = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:shim")), false);
boolean showArrow = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:showArrow")), true);
java.lang.Number showDelay = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tooltip:showDelay")), 0);
java.lang.String showOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tooltip:showOn"), "mouseover");
boolean stack = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:stack")), true);
java.util.HashMap strings = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tooltip:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tooltip:tabIndex")), 0);
boolean title = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:title")), false);
java.lang.Object trigger = (java.lang.Object)request.getAttribute("alloy:tooltip:trigger");
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tooltip:visible")), false);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:tooltip:width");
java.lang.Number x = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tooltip:x")), 0);
java.util.ArrayList xy = _toArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tooltip:xy"), "[0,0]"));
java.lang.Number y = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tooltip:y")), 0);
java.lang.Number zIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tooltip:zIndex")), 0);
java.lang.Object afterAlignChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterAlignChange");
java.lang.Object afterAnimChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterAnimChange");
java.lang.Object afterArrowChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterArrowChange");
java.lang.Object afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterBodyContentChange");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterBoundingBoxChange");
java.lang.Object afterCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterCancellableHideChange");
java.lang.Object afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterCenteredChange");
java.lang.Object afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterConstrainChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterContentBoxChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterCssClassChange");
java.lang.Object afterCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterCurrentNodeChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:tooltip:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterDisabledChange");
java.lang.Object afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterFillHeightChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterFocusedChange");
java.lang.Object afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterFooterContentChange");
java.lang.Object afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterHeaderContentChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterHeightChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterHideClassChange");
java.lang.Object afterHideDelayChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterHideDelayChange");
java.lang.Object afterHideOnChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterHideOnChange");
java.lang.Object afterHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterHideOnDocumentClickChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:tooltip:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterInitializedChange");
java.lang.Object afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterPreventOverlapChange");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterRenderChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterRenderedChange");
java.lang.Object afterShimChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterShimChange");
java.lang.Object afterShowArrowChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterShowArrowChange");
java.lang.Object afterShowDelayChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterShowDelayChange");
java.lang.Object afterShowOnChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterShowOnChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterSrcNodeChange");
java.lang.Object afterStackChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterStackChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterTabIndexChange");
java.lang.Object afterTitleChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterTitleChange");
java.lang.Object afterTriggerChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterTriggerChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:tooltip:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:tooltip:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterWidthChange");
java.lang.Object afterXChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterXChange");
java.lang.Object afterXyChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterXyChange");
java.lang.Object afterYChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterYChange");
java.lang.Object afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:tooltip:afterZIndexChange");
java.lang.Object onAlignChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onAlignChange");
java.lang.Object onAnimChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onAnimChange");
java.lang.Object onArrowChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onArrowChange");
java.lang.Object onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onBodyContentChange");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onBoundingBoxChange");
java.lang.Object onCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onCancellableHideChange");
java.lang.Object onCenteredChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onCenteredChange");
java.lang.Object onConstrainChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onConstrainChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onContentBoxChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onCssClassChange");
java.lang.Object onCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onCurrentNodeChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:tooltip:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onDisabledChange");
java.lang.Object onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onFillHeightChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onFocusedChange");
java.lang.Object onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onFooterContentChange");
java.lang.Object onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onHeaderContentChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onHeightChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onHideClassChange");
java.lang.Object onHideDelayChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onHideDelayChange");
java.lang.Object onHideOnChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onHideOnChange");
java.lang.Object onHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onHideOnDocumentClickChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:tooltip:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onInitializedChange");
java.lang.Object onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onPreventOverlapChange");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onRenderChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onRenderedChange");
java.lang.Object onShimChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onShimChange");
java.lang.Object onShowArrowChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onShowArrowChange");
java.lang.Object onShowDelayChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onShowDelayChange");
java.lang.Object onShowOnChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onShowOnChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onSrcNodeChange");
java.lang.Object onStackChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onStackChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onTabIndexChange");
java.lang.Object onTitleChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onTitleChange");
java.lang.Object onTriggerChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onTriggerChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:tooltip:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:tooltip:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onWidthChange");
java.lang.Object onXChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onXChange");
java.lang.Object onXyChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onXyChange");
java.lang.Object onYChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onYChange");
java.lang.Object onZIndexChange = (java.lang.Object)request.getAttribute("alloy:tooltip:onZIndexChange");

_updateOptions(_options, "align", align);
_updateOptions(_options, "anim", anim);
_updateOptions(_options, "arrow", arrow);
_updateOptions(_options, "tooltipBodyContent", tooltipBodyContent);
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
_updateOptions(_options, "tooltipId", tooltipId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "preventOverlap", preventOverlap);
_updateOptions(_options, "render", render);
_updateOptions(_options, "rendered", rendered);
_updateOptions(_options, "shim", shim);
_updateOptions(_options, "showArrow", showArrow);
_updateOptions(_options, "showDelay", showDelay);
_updateOptions(_options, "showOn", showOn);
_updateOptions(_options, "srcNode", srcNode);
_updateOptions(_options, "stack", stack);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "tabIndex", tabIndex);
_updateOptions(_options, "title", title);
_updateOptions(_options, "trigger", trigger);
_updateOptions(_options, "visible", visible);
_updateOptions(_options, "width", width);
_updateOptions(_options, "x", x);
_updateOptions(_options, "xy", xy);
_updateOptions(_options, "y", y);
_updateOptions(_options, "zIndex", zIndex);
_updateOptions(_options, "afterAlignChange", afterAlignChange);
_updateOptions(_options, "afterAnimChange", afterAnimChange);
_updateOptions(_options, "afterArrowChange", afterArrowChange);
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
_updateOptions(_options, "afterShowArrowChange", afterShowArrowChange);
_updateOptions(_options, "afterShowDelayChange", afterShowDelayChange);
_updateOptions(_options, "afterShowOnChange", afterShowOnChange);
_updateOptions(_options, "afterSrcNodeChange", afterSrcNodeChange);
_updateOptions(_options, "afterStackChange", afterStackChange);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTabIndexChange", afterTabIndexChange);
_updateOptions(_options, "afterTitleChange", afterTitleChange);
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
_updateOptions(_options, "onAnimChange", onAnimChange);
_updateOptions(_options, "onArrowChange", onArrowChange);
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
_updateOptions(_options, "onShowArrowChange", onShowArrowChange);
_updateOptions(_options, "onShowDelayChange", onShowDelayChange);
_updateOptions(_options, "onShowOnChange", onShowOnChange);
_updateOptions(_options, "onSrcNodeChange", onSrcNodeChange);
_updateOptions(_options, "onStackChange", onStackChange);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTabIndexChange", onTabIndexChange);
_updateOptions(_options, "onTitleChange", onTitleChange);
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
private static final String _NAMESPACE = "alloy:tooltip:";
%>