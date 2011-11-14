<#include "init.ftl">
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
<#compress>

<#assign isChildClassOfAttributeTagSupport = component.isChildClassOf("com.liferay.taglib.util.AttributesTagSupport")>
<#assign isChildClassOfIncludeTag = component.isChildClassOf("com.liferay.taglib.util.IncludeTag")>

</#compress>

package ${packagePath}.${component.getPackage()}.base;

<#if component.getWriteJSP() == true>
import javax.servlet.http.HttpServletRequest;
</#if>
import javax.servlet.jsp.JspException;

/**
<#list component.getAuthors() as author>
 * @author ${author}
</#list>
 * @generated
 */
public class Base${component.getClassName()} extends ${component.getParentClass()} {

	@Override
	public int doStartTag() throws JspException {
		<#if isChildClassOfAttributeTagSupport == true>
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		</#if>
		return super.doStartTag();
	}

	<#list component.getAttributesAndEvents() as attribute>
	<#if attribute.isGettable()>
	public ${attribute.getRawInputType()} get${attribute.getCapitalizedName()}() {
		return _${attribute.getSafeName()};
	}

	</#if>
	</#list>
	<#list component.getAttributesAndEvents() as attribute>
	<#if attribute.isSettable()>
	public void set${attribute.getCapitalizedName()}(${attribute.getRawInputType()} ${attribute.getSafeName()}) {
		_${attribute.getSafeName()} = ${attribute.getSafeName()};
		<#if isChildClassOfAttributeTagSupport == true>

		setScopedAttribute("${attribute.getSafeName()}", ${attribute.getSafeName()});
		</#if>
	}

	</#if>
	</#list>
	<#if isChildClassOfIncludeTag == true>
	@Override
	</#if>
	protected void cleanUp() {
	<#list component.getAttributesAndEvents() as attribute>
		<#compress>
		<#assign outputSimpleClassName = attribute.getOutputTypeSimpleClassName()>

		<#assign defaultValue = "">

		<#if attribute.getDefaultValue()??>
			<#assign defaultValue = attribute.getDefaultValue()>
		</#if>
		
		<#assign defaultValue = getCleanUpValue(outputSimpleClassName, defaultValue)>
		
		</#compress>
		<#if attribute.isGettable() || attribute.isSettable()>
		_${attribute.getSafeName()} = ${defaultValue};
		</#if>
	</#list>
	}

	<#if component.isBodyContent() == true>
	<#if isChildClassOfIncludeTag == true>
	@Override
	</#if>
	protected String getEndPage() {
		return _END_PAGE;
	}

	<#if isChildClassOfIncludeTag == true>
	@Override
	</#if>
	protected String getStartPage() {
		return _START_PAGE;
	}
	<#else>
	<#if isChildClassOfIncludeTag == true>
	@Override
	</#if>
	protected String getPage() {
		return _PAGE;
	}
	</#if>

	<#if component.getWriteJSP() == true>
	<#if isChildClassOfIncludeTag == true>
	@Override
	</#if>
	protected void setAttributes(HttpServletRequest request) {
		<#list component.getAttributesAndEvents() as attribute>
		<#if isChildClassOfAttributeTagSupport == true>
		setNamespacedAttribute(request, "${attribute.getSafeName()}", _${attribute.getSafeName()});
		<#else>
		request.setAttribute("${attribute.getName()}", _${attribute.getSafeName()});
		</#if>
		</#list>
	}

	</#if>
	<#if isChildClassOfAttributeTagSupport == true>
	protected static final String _ATTRIBUTE_NAMESPACE = "${namespace}";

	</#if>
	<#if component.isBodyContent() == true>
	private static final String _END_PAGE =
		"${jspRelativePath}/end.jsp";

	private static final String _START_PAGE =
		"${jspRelativePath}/start.jsp";
	<#else>
	private static final String _PAGE =
		"${jspRelativePath}/page.jsp";
	</#if>

	<#list component.getAttributesAndEvents() as attribute>
	<#compress>
	<#assign outputSimpleClassName = attribute.getOutputTypeSimpleClassName()>

	<#assign defaultValue = "">

	<#if attribute.getDefaultValue()??>
		<#assign defaultValue = attribute.getDefaultValue()>
	</#if>
	
	<#assign defaultValue = getCleanUpValue(outputSimpleClassName, defaultValue)>
	
	</#compress>
	<#if attribute.isGettable() || attribute.isSettable()>
	private ${attribute.getRawInputType()} _${attribute.getSafeName()} = ${defaultValue};
	</#if>
	</#list>

}