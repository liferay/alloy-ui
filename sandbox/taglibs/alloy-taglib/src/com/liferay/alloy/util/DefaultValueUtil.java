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

import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.Validator;
import org.apache.commons.lang.StringUtils;

import java.util.HashMap;

/**
 * <a href="DefaultValueUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class DefaultValueUtil {

	public static final String[] _EMPTY_STRINGS = {
		"", "''", "\"\"", "(empty)", "empty", "EMPTY_STR", "undefined",
		"WidgetStdMod.BODY", "HTMLTextNode"
	};

	public static String getDefaultValue(String className, String value) {
		String defaultValue = StringPool.BLANK;

		if (_STRING_VALUES == null) {
			_STRING_VALUES = new HashMap<String, String>();

			_registerValues(_STRING_VALUES, _EMPTY_STRINGS, StringPool.BLANK);
		}

		if (className.equals(_JAVA_LANG_STRING) ||
			className.equals(_JAVA_LANG_OBJECT)) {

			if (isValidStringValue(value)) {
				defaultValue = StringUtil.unquote(
					GetterUtil.getString(
						_STRING_VALUES.get(value.toLowerCase()), value));
			}
		}
		else if (className.equals(_JAVA_LANG_INTEGER)) {
			defaultValue = String.valueOf(GetterUtil.getInteger(value));
		}
		else if (className.equals(_JAVA_LANG_NUMBER)) {
			defaultValue = String.valueOf(GetterUtil.getNumber(value));
		}
		else if (className.equals(_JAVA_LANG_BOOLEAN)) {
			defaultValue = String.valueOf(GetterUtil.getBoolean(value));
		}
		else if (className.equals(_JAVA_LANG_FLOAT)) {
			defaultValue = String.valueOf(GetterUtil.getFloat(value));
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

	private static void _registerValues(HashMap<String, String> map,
		String[] values, String value) {

		for (String val : values) {
			map.put(val.toLowerCase(), value);
		}
	}

	private static final String _GENERATED = "generated";

	private static final String _JAVA_LANG_BOOLEAN = "java.lang.Boolean";

	private static final String _JAVA_LANG_FLOAT = "java.lang.Float";

	private static final String _JAVA_LANG_INTEGER = "java.lang.Integer";

	private static final String _JAVA_LANG_NUMBER = "java.lang.Number";

	private static final String _JAVA_LANG_OBJECT = "java.lang.Object";

	private static final String _JAVA_LANG_STRING = "java.lang.String";

	private static HashMap<String, String> _STRING_VALUES = null;

}
