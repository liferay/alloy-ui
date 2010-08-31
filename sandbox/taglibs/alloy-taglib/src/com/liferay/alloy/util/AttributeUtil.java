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

import java.lang.reflect.Method;

import jodd.util.ReflectUtil;

/**
 * <a href="AttributeUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class AttributeUtil {

	public static Object getAttribute(Object obj, String key) {
		try {
			Class<?>[] paramClasses = { String.class };
			Object[] params = { key };

			return ReflectUtil.invoke(
				obj, "getAttribute", paramClasses, params);
		}
		catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	public static void setAttribute(Object obj, String key, Object  value) {
		try {
			Method setAttribute = ReflectUtil.findMethod(
				obj.getClass(), "setAttribute");

			setAttribute.setAccessible(true);

			setAttribute.invoke(obj, key, value);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}
