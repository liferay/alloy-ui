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

import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.jsp.PageContext;

/**
 * <a href="StringUtils.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class TagServletResponseWrapper extends HttpServletResponseWrapper {

	public TagServletResponseWrapper(PageContext pageContext) {

		super((HttpServletResponse) pageContext.getResponse());

		_printWriter = new PrintWriter(pageContext.getOut());
	}

	public PrintWriter getWriter() {
		return _printWriter;
	}

	private PrintWriter _printWriter;

}