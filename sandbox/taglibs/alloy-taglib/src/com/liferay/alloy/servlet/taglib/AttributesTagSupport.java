/**
 * Copyright (c) 2000-2010 Liferay, Inc. All rights reserved.
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

package com.liferay.alloy.servlet.taglib;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.DynamicAttributes;

import com.liferay.alloy.util.AttributeUtil;
import com.liferay.portal.kernel.util.StringPool;

/**
 * <a href="AttributesTagSupport.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class AttributesTagSupport
	extends BaseBodyTagSupport implements DynamicAttributes {

	public String getAttributeNamespace() {
		return _attributeNamespace;
	}

	public Object getDynamicAttribute(String key) {
		return _dynamicAttributes.get(key);
	}

	public Map<String, Object> getDynamicAttributes() {
		return _dynamicAttributes;
	}

	public Object getNamespacedAttribute(Object obj, String key) {
		return AttributeUtil.getAttribute(
			obj, getAttributeNamespace().concat(key));
	}

	public Object getScopedAttribute(String key) {
		return _scopedAttributes.get(key);
	}

	public Map<String, Object> getScopedAttributes() {
		return _scopedAttributes;
	}

	public void setAttributeNamespace(String attributeNamespace) {
		_attributeNamespace = attributeNamespace;
	}

	public void setDynamicAttribute(
		String uri, String localName, Object value) {

		_dynamicAttributes.put(localName, value);
	}

	public void setNamespacedAttribute(Object obj, String key, Object  value) {
		AttributeUtil.setAttribute(
			obj, getAttributeNamespace().concat(key), value);
	}

	public void setScopedAttribute(String name, Object value) {
		_scopedAttributes.put(name, value);
	}

	private String _attributeNamespace = StringPool.BLANK;

	private Map<String, Object> _dynamicAttributes =
		new HashMap<String, Object>();

	private Map<String, Object> _scopedAttributes =
		new HashMap<String, Object>();

}
