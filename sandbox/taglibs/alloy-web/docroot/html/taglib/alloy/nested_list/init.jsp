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
java.lang.String NAMESPACE = "alloy:nested-list:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:nested-list:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:nested-list:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:nested-list:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.Boolean destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:nested-list:destroyed"), false);
java.lang.Boolean initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:nested-list:initialized"), false);
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:nested-list:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:nested-list:afterDestroyedChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:nested-list:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:nested-list:afterInitializedChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:nested-list:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:nested-list:onDestroyedChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:nested-list:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:nested-list:onInitializedChange");

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

<%@ include file="init-ext.jsp" %>