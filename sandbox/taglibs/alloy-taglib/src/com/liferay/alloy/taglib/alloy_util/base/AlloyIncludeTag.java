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

package com.liferay.alloy.taglib.alloy_util.base;

import com.liferay.portal.kernel.exception.SystemException;
import com.liferay.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;


/**
 * @author Eduardo Lundgren
 */
public class AlloyIncludeTag extends IncludeTag {

	protected boolean isDirectServletContextEnabled() {
		return false;
	}

	protected boolean isWARFile(HttpServletRequest request)
		throws SystemException {

		return false;
	}

	protected boolean themeResourceExists(String page)
		throws Exception {

		return false;
	}

}
