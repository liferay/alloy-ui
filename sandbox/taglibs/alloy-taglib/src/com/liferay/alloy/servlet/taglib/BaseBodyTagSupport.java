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

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.liferay.portal.kernel.util.StringPool;

/**
 * <a href="BaseBodyTagSupport.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class BaseBodyTagSupport extends BodyTagSupport {

	public String getBodyContentString() {
		BodyContent bodyContent = getBodyContent();

		if (bodyContent != null) {
			return bodyContent.getString();
		}

		return StringPool.BLANK;
	}

	public ServletContext getServletContext() {
		if (_servletContext != null) {
			return _servletContext;
		}

		return pageContext.getServletContext();
	}

	public HttpServletRequest getServletRequest() {
		return (HttpServletRequest)pageContext.getRequest();
	}

	public HttpServletResponse getServletResponse() {
		return (HttpServletResponse)pageContext.getResponse();
	}

	public void setServletContext(ServletContext servletContext) {
		_servletContext = servletContext;
	}

	private ServletContext _servletContext;

}
