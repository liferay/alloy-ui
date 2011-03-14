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

package com.liferay.alloy.taglib.liferay.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 * @generated
 */
public class BaseTestTag extends com.liferay.taglib.util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.String getTest() {
		return _test;
	}

	public boolean getAttrBooleanPrimitive() {
		return _attrBooleanPrimitive;
	}

	public java.lang.Boolean getAttrBoolean() {
		return _attrBoolean;
	}

	public int getAttrIntPrimitive() {
		return _attrIntPrimitive;
	}

	public java.lang.Integer getAttrInteger() {
		return _attrInteger;
	}

	public void setTest(java.lang.String test) {
		_test = test;

		setScopedAttribute("test", test);
	}

	public void setAttrBooleanPrimitive(boolean attrBooleanPrimitive) {
		_attrBooleanPrimitive = attrBooleanPrimitive;

		setScopedAttribute("attrBooleanPrimitive", attrBooleanPrimitive);
	}

	public void setAttrBoolean(java.lang.Boolean attrBoolean) {
		_attrBoolean = attrBoolean;

		setScopedAttribute("attrBoolean", attrBoolean);
	}

	public void setAttrIntPrimitive(int attrIntPrimitive) {
		_attrIntPrimitive = attrIntPrimitive;

		setScopedAttribute("attrIntPrimitive", attrIntPrimitive);
	}

	public void setAttrInteger(java.lang.Integer attrInteger) {
		_attrInteger = attrInteger;

		setScopedAttribute("attrInteger", attrInteger);
	}


	protected void cleanUp() {
		_test = null;
		_attrBooleanPrimitive = false;
		_attrBoolean = null;
		_attrIntPrimitive = 0;
		_attrInteger = null;
	}

	protected String getPage() {
		return _PAGE;
	}

	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "test", _test);
		setNamespacedAttribute(request, "attrBooleanPrimitive", _attrBooleanPrimitive);
		setNamespacedAttribute(request, "attrBoolean", _attrBoolean);
		setNamespacedAttribute(request, "attrIntPrimitive", _attrIntPrimitive);
		setNamespacedAttribute(request, "attrInteger", _attrInteger);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "liferay:test:";

	private static final String _PAGE =
		"/html/taglib/liferay/test/page.jsp";

	protected java.lang.String _test;
	protected boolean _attrBooleanPrimitive;
	protected java.lang.Boolean _attrBoolean;
	protected int _attrIntPrimitive;
	protected java.lang.Integer _attrInteger;

}
