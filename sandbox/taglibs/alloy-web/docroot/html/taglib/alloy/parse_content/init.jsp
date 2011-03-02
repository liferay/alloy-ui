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

<%@ include file="/html/taglib/init-taglib.jsp" %>

<%
java.lang.String NAMESPACE = "alloy:parse-content:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:parse-content:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:parse-content:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:parse-content:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:parse-content:destroyed")), false);
java.lang.Object host = (java.lang.Object)request.getAttribute("alloy:parse-content:host");
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:parse-content:initialized")), false);
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:parse-content:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:afterDestroyedChange");
java.lang.Object afterHostChange = (java.lang.Object)request.getAttribute("alloy:parse-content:afterHostChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:parse-content:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:afterInitializedChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:parse-content:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:onDestroyedChange");
java.lang.Object onHostChange = (java.lang.Object)request.getAttribute("alloy:parse-content:onHostChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:parse-content:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:onInitializedChange");

_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "host", host);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterHostChange", afterHostChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onHostChange", onHostChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
%>

<%@ include file="init-ext.jsp" %>