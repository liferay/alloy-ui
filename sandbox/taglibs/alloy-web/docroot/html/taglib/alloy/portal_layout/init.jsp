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
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:portal-layout:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:portal-layout:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:portal-layout:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

if ((scopedAttributes != null) && !scopedAttributes.isEmpty()) {
	_options.putAll(scopedAttributes);
}

if ((dynamicAttributes != null) && !dynamicAttributes.isEmpty()) {
	_options.putAll(dynamicAttributes);
}

%>

<%@ include file="/html/taglib/aui/init-alloy.jspf" %>

<%
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:portal-layout:destroyed")), false);
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:portal-layout:initialized")), false);
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:portal-layout:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:portal-layout:afterDestroyedChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:portal-layout:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:portal-layout:afterInitializedChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:portal-layout:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:portal-layout:onDestroyedChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:portal-layout:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:portal-layout:onInitializedChange");

_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
%>

<%@ include file="/html/taglib/alloy/portal_layout/init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "alloy:portal-layout:";
%>