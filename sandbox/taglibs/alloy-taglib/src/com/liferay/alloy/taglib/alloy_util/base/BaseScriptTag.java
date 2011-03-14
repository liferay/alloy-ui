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

package com.liferay.alloy.taglib.alloy_util.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 * @generated
 */
public class BaseScriptTag extends com.liferay.taglib.util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.String getPosition() {
		return _position;
	}

	public java.lang.Boolean getPrintBuffer() {
		return _printBuffer;
	}

	public java.lang.String getUse() {
		return _use;
	}

	public void setPosition(java.lang.String position) {
		_position = position;

		setScopedAttribute("position", position);
	}

	public void setPrintBuffer(java.lang.Boolean printBuffer) {
		_printBuffer = printBuffer;

		setScopedAttribute("printBuffer", printBuffer);
	}

	public void setUse(java.lang.String use) {
		_use = use;

		setScopedAttribute("use", use);
	}


	protected void cleanUp() {
		_position = null;
		_printBuffer = null;
		_use = null;
	}

	protected String getPage() {
		return _PAGE;
	}

	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "position", _position);
		setNamespacedAttribute(request, "printBuffer", _printBuffer);
		setNamespacedAttribute(request, "use", _use);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy_util:script:";

	private static final String _PAGE =
		"/html/taglib/alloy_util/script/page.jsp";

	protected java.lang.String _position;
	protected java.lang.Boolean _printBuffer;
	protected java.lang.String _use;

}
