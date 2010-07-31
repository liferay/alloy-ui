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

package com.liferay.portal.kernel.util;

import com.liferay.portal.kernel.configuration.Filter;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;

import java.util.Properties;

/**
 * @author Brian Wing Shun Chan
 */
public class PropsUtil {

	public static String get(String key) {
		String value = null;

		try {
			Object returnObj = PortalClassInvoker.invoke(
				_CLASS, _METHOD_GET, key, false);

			if (returnObj != null) {
				value = (String)returnObj;
			}
		}
		catch (Exception e) {
			_log.error(e, e);
		}

		return value;
	}

	public static String get(String key, Filter filter) {
		String value = null;

		try {
			Object returnObj = PortalClassInvoker.invoke(
				_CLASS, _METHOD_GET, key, filter, false);

			if (returnObj != null) {
				value = (String)returnObj;
			}
		}
		catch (Exception e) {
			_log.error(e, e);
		}

		return value;
	}

	public static String[] getArray(String key) {
		String[] value = null;

		try {
			Object returnObj = PortalClassInvoker.invoke(
				_CLASS, _METHOD_GET_ARRAY, key, false);

			if (returnObj != null) {
				value = (String[])returnObj;
			}
		}
		catch (Exception e) {
			_log.error(e, e);
		}

		return value;
	}

	public static Properties getProperties() {
		Properties properties = null;

		try {
			Object returnObj = PortalClassInvoker.invoke(
				_CLASS, _METHOD_GET_PROPERTIES, false);

			if (returnObj != null) {
				properties = (Properties)returnObj;
			}
		}
		catch (Exception e) {
			_log.error(e, e);
		}

		return properties;
	}

	public static Properties getProperties(
		String prefix, boolean removePrefix) {

		Properties properties = null;

		try {
			Object returnObj = PortalClassInvoker.invoke(
				_CLASS, _METHOD_GET_PROPERTIES, prefix,
				new BooleanWrapper(removePrefix), false);

			if (returnObj != null) {
				properties = (Properties)returnObj;
			}
		}
		catch (Exception e) {
			_log.error(e, e);
		}

		return properties;
	}

	private static final String _CLASS = "com.liferay.portal.util.PropsUtil";

	private static final String _METHOD_GET = "get";

	private static final String _METHOD_GET_ARRAY = "getArray";

	private static final String _METHOD_GET_PROPERTIES = "getProperties";

	private static Log _log = LogFactoryUtil.getLog(PropsUtil.class);

}