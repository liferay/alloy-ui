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
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:live-search:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:live-search:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:live-search:customAttributes");

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
java.lang.Object data = (java.lang.Object)request.getAttribute("alloy:live-search:data");
java.lang.Number delay = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:live-search:delay")), 250);
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:live-search:destroyed")), false);
java.lang.Object hide = (java.lang.Object)request.getAttribute("alloy:live-search:hide");
java.util.ArrayList index = _toArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:live-search:index"), "[]"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:live-search:initialized")), false);
java.lang.String input = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:input"));
java.lang.Object matchRegex = (java.lang.Object)request.getAttribute("alloy:live-search:matchRegex");
java.lang.Object nodes = (java.lang.Object)request.getAttribute("alloy:live-search:nodes");
java.lang.Object show = (java.lang.Object)request.getAttribute("alloy:live-search:show");
java.lang.Object afterDataChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterDataChange");
java.lang.Object afterDelayChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterDelayChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:live-search:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterDestroyedChange");
java.lang.Object afterHideChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterHideChange");
java.lang.Object afterIndexChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterIndexChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:live-search:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterInitializedChange");
java.lang.Object afterInputChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterInputChange");
java.lang.Object afterMatchRegexChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterMatchRegexChange");
java.lang.Object afterNodesChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterNodesChange");
java.lang.Object afterShowChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterShowChange");
java.lang.Object onDataChange = (java.lang.Object)request.getAttribute("alloy:live-search:onDataChange");
java.lang.Object onDelayChange = (java.lang.Object)request.getAttribute("alloy:live-search:onDelayChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:live-search:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:live-search:onDestroyedChange");
java.lang.Object onHideChange = (java.lang.Object)request.getAttribute("alloy:live-search:onHideChange");
java.lang.Object onIndexChange = (java.lang.Object)request.getAttribute("alloy:live-search:onIndexChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:live-search:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:live-search:onInitializedChange");
java.lang.Object onInputChange = (java.lang.Object)request.getAttribute("alloy:live-search:onInputChange");
java.lang.Object onMatchRegexChange = (java.lang.Object)request.getAttribute("alloy:live-search:onMatchRegexChange");
java.lang.Object onNodesChange = (java.lang.Object)request.getAttribute("alloy:live-search:onNodesChange");
java.lang.Object onShowChange = (java.lang.Object)request.getAttribute("alloy:live-search:onShowChange");

_updateOptions(_options, "data", data);
_updateOptions(_options, "delay", delay);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "hide", hide);
_updateOptions(_options, "index", index);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "input", input);
_updateOptions(_options, "matchRegex", matchRegex);
_updateOptions(_options, "nodes", nodes);
_updateOptions(_options, "show", show);
_updateOptions(_options, "afterDataChange", afterDataChange);
_updateOptions(_options, "afterDelayChange", afterDelayChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterHideChange", afterHideChange);
_updateOptions(_options, "afterIndexChange", afterIndexChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterInputChange", afterInputChange);
_updateOptions(_options, "afterMatchRegexChange", afterMatchRegexChange);
_updateOptions(_options, "afterNodesChange", afterNodesChange);
_updateOptions(_options, "afterShowChange", afterShowChange);
_updateOptions(_options, "onDataChange", onDataChange);
_updateOptions(_options, "onDelayChange", onDelayChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onHideChange", onHideChange);
_updateOptions(_options, "onIndexChange", onIndexChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onInputChange", onInputChange);
_updateOptions(_options, "onMatchRegexChange", onMatchRegexChange);
_updateOptions(_options, "onNodesChange", onNodesChange);
_updateOptions(_options, "onShowChange", onShowChange);
%>

<%@ include file="init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "alloy:live-search:";
%>