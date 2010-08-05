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

package com.liferay.alloy.taglib.util;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

import com.liferay.alloy.servlet.taglib.AttributesTagSupport;
import com.liferay.alloy.servlet.taglib.TagServletResponseWrapper;
import com.liferay.portal.kernel.servlet.TrackedServletRequest;
import com.liferay.portal.kernel.util.ServerDetector;
import com.liferay.portal.kernel.util.Validator;

/**
 * @author Brian Wing Shun Chan
 * @author Eduardo Lundgren
 */
public class IncludeTag	extends AttributesTagSupport {

	public int doEndTag() throws JspException {
		try {
			String page = _getPage();

			if (Validator.isNull(page)) {
				page = _getEndPage();
			}

			_callSetAttributes();

			if (Validator.isNotNull(page)) {
				_doInclude(page);
			}

			return EVAL_PAGE;
		}
		finally {
			getDynamicAttributes().clear();

			_cleanUpSetAttributes();

			if (!ServerDetector.isResin()) {
				_page = null;

				cleanUp();
			}
		}
	}

	public int doStartTag() throws JspException {
		String page = _getStartPage();

		if (Validator.isNull(page)) {
			return EVAL_BODY_BUFFERED;
		}

		_callSetAttributes();

		_doInclude(page);

		return EVAL_BODY_INCLUDE;
	}

	public void _setPage(String page) {
		_page = page;
	}

	protected String _getEndPage() {
		return null;
	}

	protected String _getPage() {
		return _page;
	}

	protected String _getStartPage() {
		return null;
	}

	protected void _setAttributes(HttpServletRequest request) {

	}

	protected void cleanUp() {
	}

	protected void include(String page) throws Exception {
		ServletContext servletContext = getServletContext();
		HttpServletRequest request = getServletRequest();

		RequestDispatcher requestDispatcher =
			servletContext.getRequestDispatcher(page);

		requestDispatcher.include(
			request, new TagServletResponseWrapper(pageContext));
	}

	protected boolean isCleanUpSetAttributes() {
		return _CLEAN_UP_SET_ATTRIBUTES;
	}

	private void _callSetAttributes() {
		if (_calledSetAttributes) {
			return;
		}

		_calledSetAttributes = true;

		HttpServletRequest request =
			(HttpServletRequest)pageContext.getRequest();

		if (isCleanUpSetAttributes()) {
			_trackedRequest = new TrackedServletRequest(request);

			request = _trackedRequest;
		}

		setNamespacedAttribute(
			request, "dynamicAttributes", getDynamicAttributes());

		setNamespacedAttribute(
			request, "scopedAttributes", getScopedAttributes());

		_setAttributes(request);
	}

	private void _cleanUpSetAttributes() {
		_calledSetAttributes = false;

		if (isCleanUpSetAttributes()) {
			for (String name : _trackedRequest.getSetAttributes()) {
				_trackedRequest.removeAttribute(name);
			}

			_trackedRequest = null;
		}
	}

	private void _doInclude(String page) throws JspException {
		try {
			include(page);
		}
		catch (Exception e) {
			if (e instanceof JspException) {
				throw (JspException)e;
			}
		}
	}

	private static final boolean _CLEAN_UP_SET_ATTRIBUTES = false;

	private boolean _calledSetAttributes;
	private String _page;
	private TrackedServletRequest _trackedRequest;

}