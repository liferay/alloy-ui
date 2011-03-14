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
java.lang.String NAMESPACE = "alloy_util:component:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy_util:component:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy_util:component:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy_util:component:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

java.lang.Boolean defineVar = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy_util:component:defineVar"), true);
java.lang.String excludeAttributes = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:excludeAttributes"));
java.lang.String javaScriptAttributes = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:javaScriptAttributes"));
javax.servlet.jsp.JspContext tagPageContext = (javax.servlet.jsp.JspContext)request.getAttribute("alloy_util:component:tagPageContext");
java.lang.String var = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:var"));
java.lang.String module = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:module"));
java.lang.String name = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:name"));
java.util.Map options = (java.util.Map)request.getAttribute("alloy_util:component:options");

_updateOptions(_options, "defineVar", defineVar);
_updateOptions(_options, "excludeAttributes", excludeAttributes);
_updateOptions(_options, "javaScriptAttributes", javaScriptAttributes);
_updateOptions(_options, "tagPageContext", tagPageContext);
_updateOptions(_options, "var", var);
_updateOptions(_options, "module", module);
_updateOptions(_options, "name", name);
_updateOptions(_options, "options", options);
%>

<%@ include file="init-ext.jsp" %>