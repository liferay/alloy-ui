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

package com.liferay.alloy.util;

import com.liferay.portal.kernel.util.CharPool;

import java.io.Serializable;
import java.text.NumberFormat;

/**
 * <a href="GetterUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class GetterUtil extends com.liferay.portal.kernel.util.GetterUtil {

	public static final Number DEFAULT_NUMBER = 0;

	public static Number get(Serializable value, Number defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, defaultValue);
		}
		else if (value.getClass().isAssignableFrom(Number.class)) {
			return (Number)value;
		}

		return defaultValue;
	}

	public static Number get(String value, Number defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (getFloat(value) == getInteger(value)) {
			return getInteger(value);
		}
		else {
			return getFloat(value);
		}
	}

	public static Number getNumber(Serializable value) {
		return getNumber(value, DEFAULT_NUMBER);
	}

	public static Number getNumber(Serializable value, Number defaultValue) {
		return get(value, defaultValue);
	}

	public static Number getNumber(String value) {
		return getNumber(value, DEFAULT_NUMBER);
	}

	public static Number getNumber(String value, Number defaultValue) {
		return get(value, defaultValue);
	}

}
