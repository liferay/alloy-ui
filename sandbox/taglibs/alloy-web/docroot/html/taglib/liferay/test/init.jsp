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
java.lang.String NAMESPACE = "liferay:test:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("liferay:test:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("liferay:test:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("liferay:test:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

java.lang.String test = GetterUtil.getString((java.lang.String)request.getAttribute("liferay:test:test"));

_updateOptions(_options, "test", test);
%>

<%@ include file="init-ext.jsp" %>