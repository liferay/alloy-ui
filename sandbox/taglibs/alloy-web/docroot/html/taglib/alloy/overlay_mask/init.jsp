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
java.lang.String NAMESPACE = "alloy:overlay-mask:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-mask:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-mask:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:overlay-mask:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.util.HashMap align = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-mask:align")));
java.util.ArrayList alignPoints = _getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-mask:alignPoints"), "[ 'tl', 'tl' ]"));
java.lang.String background = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:background"));
java.lang.Object overlaymaskBodyContent = (java.lang.Object)request.getAttribute("alloy:overlay-mask:overlaymaskBodyContent");
java.lang.Object centered = (java.lang.Object)request.getAttribute("alloy:overlay-mask:centered");
java.lang.Object constrain = (java.lang.Object)request.getAttribute("alloy:overlay-mask:constrain");
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:cssClass"));
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-mask:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-mask:disabled")), false);
java.lang.Object fillHeight = (java.lang.Object)request.getAttribute("alloy:overlay-mask:fillHeight");
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-mask:focused")), false);
java.lang.Object footerContent = (java.lang.Object)request.getAttribute("alloy:overlay-mask:footerContent");
java.lang.Object headerContent = (java.lang.Object)request.getAttribute("alloy:overlay-mask:headerContent");
java.lang.Object height = (java.lang.Object)request.getAttribute("alloy:overlay-mask:height");
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:hideClass"), "aui-helper-hidden");
java.lang.String overlaymaskId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:overlaymaskId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-mask:initialized")), false);
java.lang.Number opacity = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-mask:opacity")), 0.5);
boolean preventOverlap = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-mask:preventOverlap")), false);
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:overlay-mask:render");
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-mask:rendered")), false);
boolean shim = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-mask:shim")), false);
java.util.HashMap strings = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-mask:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-mask:tabIndex")), 0);
java.lang.String target = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-mask:target"), "document");
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:overlay-mask:visible")), false);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:overlay-mask:width");
java.lang.Number x = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-mask:x")), 0);
java.util.ArrayList xy = _getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-mask:xy"), "[0,0]"));
java.lang.Number y = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-mask:y")), 0);
java.lang.Number zIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-mask:zIndex")), 1000);
java.lang.Object afterAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterAlignChange");
java.lang.Object afterAlignPointsChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterAlignPointsChange");
java.lang.Object afterBackgroundChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterBackgroundChange");
java.lang.Object afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterBodyContentChange");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterBoundingBoxChange");
java.lang.Object afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterCenteredChange");
java.lang.Object afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterConstrainChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterContentBoxChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterCssClassChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterDisabledChange");
java.lang.Object afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterFillHeightChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterFocusedChange");
java.lang.Object afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterFooterContentChange");
java.lang.Object afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterHeaderContentChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterHeightChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterHideClassChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterInitializedChange");
java.lang.Object afterOpacityChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterOpacityChange");
java.lang.Object afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterPreventOverlapChange");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterRenderChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterRenderedChange");
java.lang.Object afterShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterShimChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterSrcNodeChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterTabIndexChange");
java.lang.Object afterTargetChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterTargetChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterWidthChange");
java.lang.Object afterXChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterXChange");
java.lang.Object afterXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterXyChange");
java.lang.Object afterYChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterYChange");
java.lang.Object afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterZIndexChange");
java.lang.Object onAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onAlignChange");
java.lang.Object onAlignPointsChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onAlignPointsChange");
java.lang.Object onBackgroundChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onBackgroundChange");
java.lang.Object onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onBodyContentChange");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onBoundingBoxChange");
java.lang.Object onCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onCenteredChange");
java.lang.Object onConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onConstrainChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onContentBoxChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onCssClassChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onDisabledChange");
java.lang.Object onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onFillHeightChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onFocusedChange");
java.lang.Object onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onFooterContentChange");
java.lang.Object onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onHeaderContentChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onHeightChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onHideClassChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onInitializedChange");
java.lang.Object onOpacityChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onOpacityChange");
java.lang.Object onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onPreventOverlapChange");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onRenderChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onRenderedChange");
java.lang.Object onShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onShimChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onSrcNodeChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onTabIndexChange");
java.lang.Object onTargetChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onTargetChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onWidthChange");
java.lang.Object onXChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onXChange");
java.lang.Object onXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onXyChange");
java.lang.Object onYChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onYChange");
java.lang.Object onZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onZIndexChange");

_updateOptions(_options, "align", align);
_updateOptions(_options, "alignPoints", alignPoints);
_updateOptions(_options, "background", background);
_updateOptions(_options, "overlaymaskBodyContent", overlaymaskBodyContent);
_updateOptions(_options, "boundingBox", boundingBox);
_updateOptions(_options, "centered", centered);
_updateOptions(_options, "constrain", constrain);
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
_updateOptions(_options, "overlaymaskId", overlaymaskId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "opacity", opacity);
_updateOptions(_options, "preventOverlap", preventOverlap);
_updateOptions(_options, "render", render);
_updateOptions(_options, "rendered", rendered);
_updateOptions(_options, "shim", shim);
_updateOptions(_options, "srcNode", srcNode);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "tabIndex", tabIndex);
_updateOptions(_options, "target", target);
_updateOptions(_options, "visible", visible);
_updateOptions(_options, "width", width);
_updateOptions(_options, "x", x);
_updateOptions(_options, "xy", xy);
_updateOptions(_options, "y", y);
_updateOptions(_options, "zIndex", zIndex);
_updateOptions(_options, "afterAlignChange", afterAlignChange);
_updateOptions(_options, "afterAlignPointsChange", afterAlignPointsChange);
_updateOptions(_options, "afterBackgroundChange", afterBackgroundChange);
_updateOptions(_options, "afterBodyContentChange", afterBodyContentChange);
_updateOptions(_options, "afterBoundingBoxChange", afterBoundingBoxChange);
_updateOptions(_options, "afterCenteredChange", afterCenteredChange);
_updateOptions(_options, "afterConstrainChange", afterConstrainChange);
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
_updateOptions(_options, "afterIdChange", afterIdChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterOpacityChange", afterOpacityChange);
_updateOptions(_options, "afterPreventOverlapChange", afterPreventOverlapChange);
_updateOptions(_options, "afterRenderChange", afterRenderChange);
_updateOptions(_options, "afterRenderedChange", afterRenderedChange);
_updateOptions(_options, "afterShimChange", afterShimChange);
_updateOptions(_options, "afterSrcNodeChange", afterSrcNodeChange);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTabIndexChange", afterTabIndexChange);
_updateOptions(_options, "afterTargetChange", afterTargetChange);
_updateOptions(_options, "afterVisibleChange", afterVisibleChange);
_updateOptions(_options, "afterContentUpdate", afterContentUpdate);
_updateOptions(_options, "afterRender", afterRender);
_updateOptions(_options, "afterWidthChange", afterWidthChange);
_updateOptions(_options, "afterXChange", afterXChange);
_updateOptions(_options, "afterXyChange", afterXyChange);
_updateOptions(_options, "afterYChange", afterYChange);
_updateOptions(_options, "afterZIndexChange", afterZIndexChange);
_updateOptions(_options, "onAlignChange", onAlignChange);
_updateOptions(_options, "onAlignPointsChange", onAlignPointsChange);
_updateOptions(_options, "onBackgroundChange", onBackgroundChange);
_updateOptions(_options, "onBodyContentChange", onBodyContentChange);
_updateOptions(_options, "onBoundingBoxChange", onBoundingBoxChange);
_updateOptions(_options, "onCenteredChange", onCenteredChange);
_updateOptions(_options, "onConstrainChange", onConstrainChange);
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
_updateOptions(_options, "onIdChange", onIdChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onOpacityChange", onOpacityChange);
_updateOptions(_options, "onPreventOverlapChange", onPreventOverlapChange);
_updateOptions(_options, "onRenderChange", onRenderChange);
_updateOptions(_options, "onRenderedChange", onRenderedChange);
_updateOptions(_options, "onShimChange", onShimChange);
_updateOptions(_options, "onSrcNodeChange", onSrcNodeChange);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTabIndexChange", onTabIndexChange);
_updateOptions(_options, "onTargetChange", onTargetChange);
_updateOptions(_options, "onVisibleChange", onVisibleChange);
_updateOptions(_options, "onContentUpdate", onContentUpdate);
_updateOptions(_options, "onRender", onRender);
_updateOptions(_options, "onWidthChange", onWidthChange);
_updateOptions(_options, "onXChange", onXChange);
_updateOptions(_options, "onXyChange", onXyChange);
_updateOptions(_options, "onYChange", onYChange);
_updateOptions(_options, "onZIndexChange", onZIndexChange);
%>

<%@ include file="init-ext.jsp" %>