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
 */
public class BaseTestTag extends com.liferay.taglib.util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.String getTest() {
		return _test;
	}

	public void setTest(java.lang.String test) {
		_test = test;

		setScopedAttribute("test", test);
	}


	protected void cleanUp() {
		_test = null;
	}

	protected String getPage() {
		return _PAGE;
	}
	
	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "test", _test);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "liferay:test:";

	private static final String _PAGE =
		"/html/taglib/liferay/test/page.jsp";

	protected java.lang.String _test;

}
