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

import java.text.MessageFormat;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.ArrayUtil;
import com.liferay.portal.kernel.util.StringPool;

/**
 * <a href="StringUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class StringUtil extends com.liferay.portal.kernel.util.StringUtil {
	public static String camelize(String str) {
		StringBuilder sb = new StringBuilder();

		String[] parts =
			org.apache.commons.lang.StringUtils.splitByCharacterTypeCamelCase(
				str);

		if (parts != null) {
			for (int i = 0; i < parts.length; i++) {
				String part = parts[i].toLowerCase().trim();

				if (!org.apache.commons.lang.StringUtils.isAlphanumeric(part)) {
					continue;
				}

				if (i > 0) {
					part = org.apache.commons.lang.StringUtils.capitalize(part);
				}

				sb.append(part);
			}
		}

		return sb.toString();
	}

	public static String uncamelize(String str) {
		return uncamelize(str, StringPool.DASH);
	}

	public static String uncamelize(String str, String delimiter) {
		String[] output = {};

		String[] parts =
			org.apache.commons.lang.StringUtils.splitByCharacterTypeCamelCase(
				str);

		if (parts != null) {
			for (int i = 0; i < parts.length; i++) {
				String part = parts[i].toLowerCase().trim();

				if (!org.apache.commons.lang.StringUtils.isAlphanumeric(part)) {
					continue;
				}

				output = ArrayUtil.append(output, part);
			}
		}

		return org.apache.commons.lang.StringUtils.join(output, delimiter);
	}
	
	public static String substitute(String pattern, Object[] arguments) {
		
		String value = null;

		try {
			if (arguments != null) {
				pattern = replace(
					pattern, StringPool.APOSTROPHE,
					StringPool.DOUBLE_APOSTROPHE);

				value = MessageFormat.format(pattern, arguments);
			}
			else {
				value = pattern;
			}
		}
		catch (Exception e) {
			if (_log.isWarnEnabled()) {
				_log.warn(e, e);
			}
		}
		
		return value;
	}
	
	private static Log _log = LogFactoryUtil.getLog(StringUtil.class);

}
