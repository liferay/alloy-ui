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

package com.liferay.portal.kernel.servlet;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 * @author Brian Wing Shun Chan
 */
public class TrackedServletRequest extends HttpServletRequestWrapper {

	public TrackedServletRequest(HttpServletRequest request) {
		super(request);
	}

	@SuppressWarnings("unchecked")	
	public Set<String> getSetAttributes() {
		if (_setAttributes == null) {
			return Collections.EMPTY_SET;
		}
		else {
			return _setAttributes;
		}
	}

	public void setAttribute(String name, Object obj) {
		if (_setAttributes == null) {
			_setAttributes = new HashSet<String>();
		}

		_setAttributes.add(name);

		super.setAttribute(name, obj);
	}

	private Set<String> _setAttributes;

}