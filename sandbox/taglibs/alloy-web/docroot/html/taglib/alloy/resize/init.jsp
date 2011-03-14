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

<%@ include file="/html/taglib/taglib-init.jsp" %>

<%
java.lang.String NAMESPACE = "alloy:resize:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:resize:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:resize:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.String activeHandle = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:activeHandle"));
java.lang.Object activeHandleEl = (java.lang.Object)request.getAttribute("alloy:resize:activeHandleEl");
boolean autoHide = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:resize:autoHide")), false);
java.lang.Object constrain = (java.lang.Object)request.getAttribute("alloy:resize:constrain");
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:resize:destroyed")), false);
java.lang.Object handles = (java.lang.Object)request.getAttribute("alloy:resize:handles");
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:resize:initialized")), false);
java.lang.Number maxHeight = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:resize:maxHeight")), 2147483647);
java.lang.Number maxWidth = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:resize:maxWidth")), 2147483647);
java.lang.Number minHeight = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:resize:minHeight")), 15);
java.lang.Number minWidth = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:resize:minWidth")), 15);
java.lang.Object node = (java.lang.Object)request.getAttribute("alloy:resize:node");
boolean preserveRatio = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:resize:preserveRatio")), false);
boolean proxy = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:resize:proxy")), false);
java.lang.String proxyEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:proxyEl"));
boolean resizing = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:resize:resizing")), false);
java.lang.Object tickX = (java.lang.Object)request.getAttribute("alloy:resize:tickX");
java.lang.Object tickY = (java.lang.Object)request.getAttribute("alloy:resize:tickY");
boolean wrap = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:resize:wrap")), false);
java.lang.Object wrapTypes = (java.lang.Object)request.getAttribute("alloy:resize:wrapTypes");
java.lang.String wrapper = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:resize:wrapper"), "div");
java.lang.Object afterActiveHandleChange = (java.lang.Object)request.getAttribute("alloy:resize:afterActiveHandleChange");
java.lang.Object afterActiveHandleElChange = (java.lang.Object)request.getAttribute("alloy:resize:afterActiveHandleElChange");
java.lang.Object afterAutoHideChange = (java.lang.Object)request.getAttribute("alloy:resize:afterAutoHideChange");
java.lang.Object afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:resize:afterConstrainChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:resize:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:resize:afterDestroyedChange");
java.lang.Object afterHandlesChange = (java.lang.Object)request.getAttribute("alloy:resize:afterHandlesChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:resize:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:resize:afterInitializedChange");
java.lang.Object afterMaxHeightChange = (java.lang.Object)request.getAttribute("alloy:resize:afterMaxHeightChange");
java.lang.Object afterMaxWidthChange = (java.lang.Object)request.getAttribute("alloy:resize:afterMaxWidthChange");
java.lang.Object afterMinHeightChange = (java.lang.Object)request.getAttribute("alloy:resize:afterMinHeightChange");
java.lang.Object afterMinWidthChange = (java.lang.Object)request.getAttribute("alloy:resize:afterMinWidthChange");
java.lang.Object afterNodeChange = (java.lang.Object)request.getAttribute("alloy:resize:afterNodeChange");
java.lang.Object afterPreserveRatioChange = (java.lang.Object)request.getAttribute("alloy:resize:afterPreserveRatioChange");
java.lang.Object afterProxyChange = (java.lang.Object)request.getAttribute("alloy:resize:afterProxyChange");
java.lang.Object afterProxyElChange = (java.lang.Object)request.getAttribute("alloy:resize:afterProxyElChange");
java.lang.Object afterAlign = (java.lang.Object)request.getAttribute("alloy:resize:afterAlign");
java.lang.Object afterEnd = (java.lang.Object)request.getAttribute("alloy:resize:afterEnd");
java.lang.Object afterMouseUp = (java.lang.Object)request.getAttribute("alloy:resize:afterMouseUp");
java.lang.Object afterResize = (java.lang.Object)request.getAttribute("alloy:resize:afterResize");
java.lang.Object afterStart = (java.lang.Object)request.getAttribute("alloy:resize:afterStart");
java.lang.Object afterResizingChange = (java.lang.Object)request.getAttribute("alloy:resize:afterResizingChange");
java.lang.Object afterTickXChange = (java.lang.Object)request.getAttribute("alloy:resize:afterTickXChange");
java.lang.Object afterTickYChange = (java.lang.Object)request.getAttribute("alloy:resize:afterTickYChange");
java.lang.Object afterWrapChange = (java.lang.Object)request.getAttribute("alloy:resize:afterWrapChange");
java.lang.Object afterWrapTypesChange = (java.lang.Object)request.getAttribute("alloy:resize:afterWrapTypesChange");
java.lang.Object afterWrapperChange = (java.lang.Object)request.getAttribute("alloy:resize:afterWrapperChange");
java.lang.Object onActiveHandleChange = (java.lang.Object)request.getAttribute("alloy:resize:onActiveHandleChange");
java.lang.Object onActiveHandleElChange = (java.lang.Object)request.getAttribute("alloy:resize:onActiveHandleElChange");
java.lang.Object onAutoHideChange = (java.lang.Object)request.getAttribute("alloy:resize:onAutoHideChange");
java.lang.Object onConstrainChange = (java.lang.Object)request.getAttribute("alloy:resize:onConstrainChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:resize:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:resize:onDestroyedChange");
java.lang.Object onHandlesChange = (java.lang.Object)request.getAttribute("alloy:resize:onHandlesChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:resize:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:resize:onInitializedChange");
java.lang.Object onMaxHeightChange = (java.lang.Object)request.getAttribute("alloy:resize:onMaxHeightChange");
java.lang.Object onMaxWidthChange = (java.lang.Object)request.getAttribute("alloy:resize:onMaxWidthChange");
java.lang.Object onMinHeightChange = (java.lang.Object)request.getAttribute("alloy:resize:onMinHeightChange");
java.lang.Object onMinWidthChange = (java.lang.Object)request.getAttribute("alloy:resize:onMinWidthChange");
java.lang.Object onNodeChange = (java.lang.Object)request.getAttribute("alloy:resize:onNodeChange");
java.lang.Object onPreserveRatioChange = (java.lang.Object)request.getAttribute("alloy:resize:onPreserveRatioChange");
java.lang.Object onProxyChange = (java.lang.Object)request.getAttribute("alloy:resize:onProxyChange");
java.lang.Object onProxyElChange = (java.lang.Object)request.getAttribute("alloy:resize:onProxyElChange");
java.lang.Object onAlign = (java.lang.Object)request.getAttribute("alloy:resize:onAlign");
java.lang.Object onEnd = (java.lang.Object)request.getAttribute("alloy:resize:onEnd");
java.lang.Object onMouseUp = (java.lang.Object)request.getAttribute("alloy:resize:onMouseUp");
java.lang.Object onResize = (java.lang.Object)request.getAttribute("alloy:resize:onResize");
java.lang.Object onStart = (java.lang.Object)request.getAttribute("alloy:resize:onStart");
java.lang.Object onResizingChange = (java.lang.Object)request.getAttribute("alloy:resize:onResizingChange");
java.lang.Object onTickXChange = (java.lang.Object)request.getAttribute("alloy:resize:onTickXChange");
java.lang.Object onTickYChange = (java.lang.Object)request.getAttribute("alloy:resize:onTickYChange");
java.lang.Object onWrapChange = (java.lang.Object)request.getAttribute("alloy:resize:onWrapChange");
java.lang.Object onWrapTypesChange = (java.lang.Object)request.getAttribute("alloy:resize:onWrapTypesChange");
java.lang.Object onWrapperChange = (java.lang.Object)request.getAttribute("alloy:resize:onWrapperChange");

_updateOptions(_options, "activeHandle", activeHandle);
_updateOptions(_options, "activeHandleEl", activeHandleEl);
_updateOptions(_options, "autoHide", autoHide);
_updateOptions(_options, "constrain", constrain);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "handles", handles);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "maxHeight", maxHeight);
_updateOptions(_options, "maxWidth", maxWidth);
_updateOptions(_options, "minHeight", minHeight);
_updateOptions(_options, "minWidth", minWidth);
_updateOptions(_options, "node", node);
_updateOptions(_options, "preserveRatio", preserveRatio);
_updateOptions(_options, "proxy", proxy);
_updateOptions(_options, "proxyEl", proxyEl);
_updateOptions(_options, "resizing", resizing);
_updateOptions(_options, "tickX", tickX);
_updateOptions(_options, "tickY", tickY);
_updateOptions(_options, "wrap", wrap);
_updateOptions(_options, "wrapTypes", wrapTypes);
_updateOptions(_options, "wrapper", wrapper);
_updateOptions(_options, "afterActiveHandleChange", afterActiveHandleChange);
_updateOptions(_options, "afterActiveHandleElChange", afterActiveHandleElChange);
_updateOptions(_options, "afterAutoHideChange", afterAutoHideChange);
_updateOptions(_options, "afterConstrainChange", afterConstrainChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterHandlesChange", afterHandlesChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterMaxHeightChange", afterMaxHeightChange);
_updateOptions(_options, "afterMaxWidthChange", afterMaxWidthChange);
_updateOptions(_options, "afterMinHeightChange", afterMinHeightChange);
_updateOptions(_options, "afterMinWidthChange", afterMinWidthChange);
_updateOptions(_options, "afterNodeChange", afterNodeChange);
_updateOptions(_options, "afterPreserveRatioChange", afterPreserveRatioChange);
_updateOptions(_options, "afterProxyChange", afterProxyChange);
_updateOptions(_options, "afterProxyElChange", afterProxyElChange);
_updateOptions(_options, "afterAlign", afterAlign);
_updateOptions(_options, "afterEnd", afterEnd);
_updateOptions(_options, "afterMouseUp", afterMouseUp);
_updateOptions(_options, "afterResize", afterResize);
_updateOptions(_options, "afterStart", afterStart);
_updateOptions(_options, "afterResizingChange", afterResizingChange);
_updateOptions(_options, "afterTickXChange", afterTickXChange);
_updateOptions(_options, "afterTickYChange", afterTickYChange);
_updateOptions(_options, "afterWrapChange", afterWrapChange);
_updateOptions(_options, "afterWrapTypesChange", afterWrapTypesChange);
_updateOptions(_options, "afterWrapperChange", afterWrapperChange);
_updateOptions(_options, "onActiveHandleChange", onActiveHandleChange);
_updateOptions(_options, "onActiveHandleElChange", onActiveHandleElChange);
_updateOptions(_options, "onAutoHideChange", onAutoHideChange);
_updateOptions(_options, "onConstrainChange", onConstrainChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onHandlesChange", onHandlesChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onMaxHeightChange", onMaxHeightChange);
_updateOptions(_options, "onMaxWidthChange", onMaxWidthChange);
_updateOptions(_options, "onMinHeightChange", onMinHeightChange);
_updateOptions(_options, "onMinWidthChange", onMinWidthChange);
_updateOptions(_options, "onNodeChange", onNodeChange);
_updateOptions(_options, "onPreserveRatioChange", onPreserveRatioChange);
_updateOptions(_options, "onProxyChange", onProxyChange);
_updateOptions(_options, "onProxyElChange", onProxyElChange);
_updateOptions(_options, "onAlign", onAlign);
_updateOptions(_options, "onEnd", onEnd);
_updateOptions(_options, "onMouseUp", onMouseUp);
_updateOptions(_options, "onResize", onResize);
_updateOptions(_options, "onStart", onStart);
_updateOptions(_options, "onResizingChange", onResizingChange);
_updateOptions(_options, "onTickXChange", onTickXChange);
_updateOptions(_options, "onTickYChange", onTickYChange);
_updateOptions(_options, "onWrapChange", onWrapChange);
_updateOptions(_options, "onWrapTypesChange", onWrapTypesChange);
_updateOptions(_options, "onWrapperChange", onWrapperChange);
%>

<%@ include file="init-ext.jsp" %>