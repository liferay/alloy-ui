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
java.lang.String NAMESPACE = "liferay:test:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("liferay:test:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("liferay:test:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("liferay:test:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

java.lang.String test = GetterUtil.getString((java.lang.String)request.getAttribute("liferay:test:test"));
boolean attrBooleanPrimitive = GetterUtil.getBoolean(String.valueOf(request.getAttribute("liferay:test:attrBooleanPrimitive")));
java.lang.Boolean attrBoolean = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("liferay:test:attrBoolean"));
int attrIntPrimitive = GetterUtil.getInteger(String.valueOf(request.getAttribute("liferay:test:attrIntPrimitive")));
java.lang.Integer attrInteger = GetterUtil.getInteger(String.valueOf(request.getAttribute("liferay:test:attrInteger")));

_updateOptions(_options, "test", test);
_updateOptions(_options, "attrBooleanPrimitive", attrBooleanPrimitive);
_updateOptions(_options, "attrBoolean", attrBoolean);
_updateOptions(_options, "attrIntPrimitive", attrIntPrimitive);
_updateOptions(_options, "attrInteger", attrInteger);
%>

<%@ include file="init-ext.jsp" %>