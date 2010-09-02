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
import com.liferay.portal.kernel.util.Validator;

import java.io.Serializable;
import java.text.NumberFormat;

/**
 * <a href="GetterUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class GetterUtil extends com.liferay.portal.kernel.util.GetterUtil {

	public static final Number DEFAULT_NUMBER = 0;
	public static final Number DEFAULT_OBJECT= null;

	public static Number get(Serializable value, Number defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, defaultValue);
		}
		else if (value.getClass().isAssignableFrom(Byte.class)) {
			return (Byte)value;
		}
		else if (value.getClass().isAssignableFrom(Short.class)) {
			return (Short)value;
		}
		else if (value.getClass().isAssignableFrom(Integer.class)) {
			return (Integer)value;
		}
		else if (value.getClass().isAssignableFrom(Double.class)) {
			return (Double)value;
		}
		else if (value.getClass().isAssignableFrom(Float.class)) {
			return (Float)value;
		}
		else if (value.getClass().isAssignableFrom(Long.class)) {
			return (Long)value;
		}
		else if (value.getClass().isAssignableFrom(Number.class)) {
			return (Number)value;
		}

		return defaultValue;
	}

	public static Number get(String value, Number defaultValue) {
		if (Validator.isNull(value)) {
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

	public static Object getObject(Object value, Object defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		return value;
	}

	public static Object getObject(Object value) {
		return getObject(value, DEFAULT_OBJECT);
	}

}
