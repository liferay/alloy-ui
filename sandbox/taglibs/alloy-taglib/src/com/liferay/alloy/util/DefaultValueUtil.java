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
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.Validator;
import jodd.util.ArraysUtil;
import org.apache.commons.collections.ListUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * <a href="DefaultValueUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class DefaultValueUtil {

	public static String getDefaultValue(String className, String value) {
		String defaultValue = StringPool.BLANK;

		if (className.equals(_JAVA_LANG_STRING) ||
			className.equals(_JAVA_UTIL_ARRAY_LIST) ||
			className.equals(_JAVA_UTIL_HASH_MAP) ||
			className.equals(_JAVA_LANG_OBJECT)) {

			if (!isValidStringValue(value)) {
				return defaultValue;
			}

			if (_EMPTY_STRINGS.contains(value)) {
				value = StringPool.BLANK;
			}

			if (className.equals(_JAVA_UTIL_ARRAY_LIST) &&
				!StringUtil.startsWith(
					value.trim(), StringPool.OPEN_BRACKET)) {

				value = "[]";
			}
			else if (className.equals(_JAVA_UTIL_HASH_MAP) &&
				!StringUtil.startsWith(
					value.trim(), StringPool.OPEN_CURLY_BRACE)) {

				value = "{}";
			}

			defaultValue = StringUtil.unquote(value);
		}
		else if (className.equals(_JAVA_LANG_INTEGER)) {
			if (_INFINITY.contains(value)) {
				value = String.valueOf(Integer.MAX_VALUE);
			}

			defaultValue = String.valueOf(GetterUtil.getInteger(value));
		}
		else if (className.equals(_JAVA_LANG_NUMBER)) {
			if (_INFINITY.contains(value)) {
				value = String.valueOf(Integer.MAX_VALUE);
			}

			defaultValue = String.valueOf(GetterUtil.getNumber(value));
		}
		else if (className.equals(_JAVA_LANG_FLOAT)) {
			if (_INFINITY.contains(value)) {
				value = String.valueOf(Float.MAX_VALUE);
			}

			defaultValue = String.valueOf(GetterUtil.getFloat(value));
		}
		else if (className.equals(_JAVA_LANG_BOOLEAN)) {
			defaultValue = String.valueOf(GetterUtil.getBoolean(value));
		}

		return defaultValue;
	}

	public static boolean isValidStringValue(String value) {
		value = StringUtil.trim(GetterUtil.getString(value));

		if (Validator.isNull(value)) {
			return false;
		}

		if (StringUtils.isAlpha(value) ||
			(!StringUtils.containsIgnoreCase(value, _GENERATED) &&
			!StringUtils.isAlpha(value.substring(0, 1)) &&
			!StringUtils.endsWith(value, StringPool.PERIOD))) {

			return true;
		}

		return false;
	}

	private static final List<String> _EMPTY_STRINGS =
		Arrays.asList("", "''", "\"\"", "(empty)", "empty", "EMPTY_STR",
			"undefined", "WidgetStdMod.BODY", "HTMLTextNode");

	private static final String _GENERATED = "generated";

	private static final List<String> _INFINITY =
		Arrays.asList("infinity", "Infinity", "INFINITY");

	private static final String _JAVA_LANG_BOOLEAN = "java.lang.Boolean";

	private static final String _JAVA_LANG_FLOAT = "java.lang.Float";

	private static final String _JAVA_LANG_INTEGER = "java.lang.Integer";

	private static final String _JAVA_LANG_NUMBER = "java.lang.Number";

	private static final String _JAVA_LANG_OBJECT = "java.lang.Object";

	private static final String _JAVA_LANG_STRING = "java.lang.String";

	private static final String _JAVA_UTIL_ARRAY_LIST = "java.util.ArrayList";

	private static final String _JAVA_UTIL_HASH_MAP = "java.util.HashMap";

}
