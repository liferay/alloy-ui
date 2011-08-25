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

<#include "init.ftl">
<#compress>
<#function isValidAttribute attributeName>
	<#return ((attributeName != "boundingBox") && (attributeName != "contentBox") && (attributeName != "srcNode")) />
</#function>
</#compress>
<%@ include file="${jspCommonInitPath}" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("${namespace}dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("${namespace}scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("${namespace}customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

if ((scopedAttributes != null) && !scopedAttributes.isEmpty()) {
	_options.putAll(scopedAttributes);
}

if ((dynamicAttributes != null) && !dynamicAttributes.isEmpty()) {
	_options.putAll(dynamicAttributes);
}

<#if component.isAlloyComponent()>
%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
</#if>
<#compress>
<#list component.getAttributesAndEvents() as attribute>
	<#assign defaultValueSuffix = BLANK>
	<#assign outputSimpleClassName = attribute.getOutputTypeSimpleClassName()>

	<#if attribute.getDefaultValue()??>
		<#assign defaultValueSuffix = getDefaultValueSuffix(outputSimpleClassName, attribute.getDefaultValue())>
	</#if>

	<#if isValidAttribute(attribute.getName())>
		<#assign namespacedName = QUOTE + namespace + attribute.getSafeName() + QUOTE>

		<#if (isPrimitiveType(outputSimpleClassName) || isNumericAttribute(outputSimpleClassName))>
			<#assign value = "String.valueOf(request.getAttribute(" + namespacedName + "))">
		<#else>
			<#assign value = "(" + attribute.getRawInputType() + ")request.getAttribute(" + namespacedName + ")">
		</#if>

		<#if outputSimpleClassName == "ArrayList">
			${attribute.getOutputType()} ${attribute.getSafeName()} = _toArrayList(GetterUtil.getObject(${value}${defaultValueSuffix}));
		<#elseif outputSimpleClassName == "HashMap">
			${attribute.getOutputType()} ${attribute.getSafeName()} = _toHashMap(GetterUtil.getObject(${value}${defaultValueSuffix}));
		<#elseif hasGetter(outputSimpleClassName)>
			${attribute.getOutputType()} ${attribute.getSafeName()} = GetterUtil.get${getGetterSuffix(outputSimpleClassName)}(${value}${defaultValueSuffix});
		<#else>
			${attribute.getRawOutputType()} ${attribute.getSafeName()} = (${attribute.getRawOutputType()})request.getAttribute(${namespacedName});
		</#if>
	</#if>
</#list>
</#compress>


<#list component.getAttributesAndEvents() as attribute>
_updateOptions(_options, "${attribute.getSafeName()}", ${attribute.getSafeName()});
</#list>
%>

<%@ include file="${jspRelativePath}/init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "${namespace}";
%>