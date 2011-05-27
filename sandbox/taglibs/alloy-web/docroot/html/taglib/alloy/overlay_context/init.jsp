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
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:overlay-context:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.util.HashMap align = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-context:align"), "{ node: null, points: [ TL, BL ] }"));
java.lang.Object overlaycontextBodyContent = (java.lang.Object)request.getAttribute("alloy:overlay-context:overlaycontextBodyContent");
boolean cancellableHide = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:cancellableHide")), true);
java.lang.Object centered = (java.lang.Object)request.getAttribute("alloy:overlay-context:centered");
java.lang.Object constrain = (java.lang.Object)request.getAttribute("alloy:overlay-context:constrain");
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:cssClass"));
java.lang.Object currentNode = (java.lang.Object)request.getAttribute("alloy:overlay-context:currentNode");
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:disabled")), false);
java.lang.Object fillHeight = (java.lang.Object)request.getAttribute("alloy:overlay-context:fillHeight");
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:focused")), false);
java.lang.Object footerContent = (java.lang.Object)request.getAttribute("alloy:overlay-context:footerContent");
java.lang.Object headerContent = (java.lang.Object)request.getAttribute("alloy:overlay-context:headerContent");
java.lang.Object height = (java.lang.Object)request.getAttribute("alloy:overlay-context:height");
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:hideClass"), "aui-helper-hidden");
java.lang.Number hideDelay = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-context:hideDelay")), 0);
java.lang.String hideOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:hideOn"), "mouseout");
boolean hideOnDocumentClick = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:hideOnDocumentClick")), true);
java.lang.String overlaycontextId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:overlaycontextId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:initialized")), false);
java.lang.String locale = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:locale"), "en");
boolean preventOverlap = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:preventOverlap")), false);
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:overlay-context:render");
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:rendered")), false);
boolean shim = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:shim")), false);
java.lang.Number showDelay = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-context:showDelay")), 0);
java.lang.String showOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-context:showOn"), "mouseover");
java.util.HashMap strings = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-context:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-context:tabIndex")), 0);
java.lang.Object trigger = (java.lang.Object)request.getAttribute("alloy:overlay-context:trigger");
boolean useARIA = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:useARIA")), true);
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-context:visible")), false);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:overlay-context:width");
java.lang.Number x = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-context:x")), 0);
java.util.ArrayList xy = _toArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-context:xy"), "[0,0]"));
java.lang.Number y = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-context:y")), 0);
java.lang.Number zIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-context:zIndex")), 0);
java.lang.Object afterAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterAlignChange");
java.lang.Object afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterBodyContentChange");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterBoundingBoxChange");
java.lang.Object afterCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCancellableHideChange");
java.lang.Object afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCenteredChange");
java.lang.Object afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterConstrainChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterContentBoxChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCssClassChange");
java.lang.Object afterCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCurrentNodeChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterDisabledChange");
java.lang.Object afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterFillHeightChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterFocusedChange");
java.lang.Object afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterFooterContentChange");
java.lang.Object afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHeaderContentChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHeightChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideClassChange");
java.lang.Object afterHideDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideDelayChange");
java.lang.Object afterHideOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideOnChange");
java.lang.Object afterHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideOnDocumentClickChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterInitializedChange");
java.lang.Object afterLocaleChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterLocaleChange");
java.lang.Object afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterPreventOverlapChange");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterRenderChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterRenderedChange");
java.lang.Object afterShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterShimChange");
java.lang.Object afterShowDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterShowDelayChange");
java.lang.Object afterShowOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterShowOnChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterSrcNodeChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterTabIndexChange");
java.lang.Object afterTriggerChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterTriggerChange");
java.lang.Object afterUseARIAChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterUseARIAChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterWidthChange");
java.lang.Object afterXChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterXChange");
java.lang.Object afterXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterXyChange");
java.lang.Object afterYChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterYChange");
java.lang.Object afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterZIndexChange");
java.lang.Object onAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onAlignChange");
java.lang.Object onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onBodyContentChange");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onBoundingBoxChange");
java.lang.Object onCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCancellableHideChange");
java.lang.Object onCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCenteredChange");
java.lang.Object onConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onConstrainChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onContentBoxChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCssClassChange");
java.lang.Object onCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCurrentNodeChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-context:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onDisabledChange");
java.lang.Object onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onFillHeightChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onFocusedChange");
java.lang.Object onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onFooterContentChange");
java.lang.Object onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHeaderContentChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHeightChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideClassChange");
java.lang.Object onHideDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideDelayChange");
java.lang.Object onHideOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideOnChange");
java.lang.Object onHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideOnDocumentClickChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:overlay-context:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onInitializedChange");
java.lang.Object onLocaleChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onLocaleChange");
java.lang.Object onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onPreventOverlapChange");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onRenderChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onRenderedChange");
java.lang.Object onShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onShimChange");
java.lang.Object onShowDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onShowDelayChange");
java.lang.Object onShowOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onShowOnChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onSrcNodeChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onTabIndexChange");
java.lang.Object onTriggerChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onTriggerChange");
java.lang.Object onUseARIAChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onUseARIAChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-context:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:overlay-context:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onWidthChange");
java.lang.Object onXChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onXChange");
java.lang.Object onXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onXyChange");
java.lang.Object onYChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onYChange");
java.lang.Object onZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onZIndexChange");

_updateOptions(_options, "align", align);
_updateOptions(_options, "overlaycontextBodyContent", overlaycontextBodyContent);
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
_updateOptions(_options, "overlaycontextId", overlaycontextId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "locale", locale);
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
_updateOptions(_options, "useARIA", useARIA);
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
_updateOptions(_options, "afterLocaleChange", afterLocaleChange);
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
_updateOptions(_options, "afterUseARIAChange", afterUseARIAChange);
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
_updateOptions(_options, "onLocaleChange", onLocaleChange);
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
_updateOptions(_options, "onUseARIAChange", onUseARIAChange);
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
private static final String _NAMESPACE = "alloy:overlay-context:";
%>