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

package ${packagePath}.${component.getPackage()}.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
<#list component.getAuthors() as author>
 * @author ${author}
</#list>
 * @generated
 */
public class Base${component.getSafeName()}Tag extends ${component.getParentClass()} {

	@Override
	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	<#list component.getAttributesAndEvents() as attribute>
	public ${attribute.getInputType()} get${attribute.getCapitalizedName()}() {
		return _${attribute.getSafeName()};
	}

	</#list>
	<#list component.getAttributesAndEvents() as attribute>
	public void set${attribute.getCapitalizedName()}(${attribute.getInputType()} ${attribute.getSafeName()}) {
		_${attribute.getSafeName()} = ${attribute.getSafeName()};

		setScopedAttribute("${attribute.getSafeName()}", ${attribute.getSafeName()});
	}

	</#list>
	@Override
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
		_${attribute.getSafeName()} = ${defaultValue};
	</#list>
	}

	<#if component.isBodyContent() == true>
	@Override
	protected String getEndPage() {
		return _END_PAGE;
	}

	@Override
	protected String getStartPage() {
		return _START_PAGE;
	}
	<#else>
	@Override
	protected String getPage() {
		return _PAGE;
	}
	</#if>

	@Override
	protected void setAttributes(HttpServletRequest request) {
		<#list component.getAttributesAndEvents() as attribute>
		setNamespacedAttribute(request, "${attribute.getSafeName()}", _${attribute.getSafeName()});
		</#list>
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "${namespace}";

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
	private ${attribute.getInputType()} _${attribute.getSafeName()} = ${defaultValue};
	</#list>

}