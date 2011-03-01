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

import com.liferay.portal.kernel.util.Validator;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * <a href="TypeUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class TypeUtil {

	public static final String BOOLEAN = "boolean";

	public static final String DOUBLE = "double";

	public static final String FLOAT = "float";

	public static final String INT = "int";

	public static final String LONG = "long";

	public static final String SHORT = "short";

	private TypeUtil() {
		_INPUT_TYPES = new HashMap<String, String>();
		_OUTPUT_TYPES = new HashMap<String, String>();

		_registerTypes(_INPUT_TYPES, ARRAYS, Object.class.getName());
		_registerTypes(_INPUT_TYPES, BOOLEANS, boolean.class.getName());
		_registerTypes(_INPUT_TYPES, FLOATS, float.class.getName());
		_registerTypes(_INPUT_TYPES, INTEGERS, int.class.getName());
		_registerTypes(_INPUT_TYPES, DOUBLES, double.class.getName());
		_registerTypes(_INPUT_TYPES, LONGS, long.class.getName());
		_registerTypes(_INPUT_TYPES, SHORTS, short.class.getName());
		_registerTypes(_INPUT_TYPES, NUMBERS, Object.class.getName());
		_registerTypes(_INPUT_TYPES, OBJECTS, Object.class.getName());
		_registerTypes(_INPUT_TYPES, STRINGS, String.class.getName());

		_registerTypes(_OUTPUT_TYPES, ARRAYS, ArrayList.class.getName());
		_registerTypes(_OUTPUT_TYPES, BOOLEANS, boolean.class.getName());
		_registerTypes(_OUTPUT_TYPES, FLOATS, float.class.getName());
		_registerTypes(_OUTPUT_TYPES, INTEGERS, int.class.getName());
		_registerTypes(_OUTPUT_TYPES, DOUBLES, double.class.getName());
		_registerTypes(_OUTPUT_TYPES, LONGS, long.class.getName());
		_registerTypes(_OUTPUT_TYPES, SHORTS, short.class.getName());
		_registerTypes(_OUTPUT_TYPES, NUMBERS, Number.class.getName());
		_registerTypes(_OUTPUT_TYPES, OBJECTS, HashMap.class.getName());
		_registerTypes(_OUTPUT_TYPES, STRINGS, String.class.getName());
	}

	public static String getInputJavaType(String type) {
		return _instance._getInputJavaType(type);
	}

	public static String getOutputJavaType(String type) {
		return _instance._getOutputJavaType(type);
	}

	public static boolean isPrimitiveType(String type) {
		return (TypeUtil.BOOLEAN.equals(type) || TypeUtil.DOUBLE.equals(type) ||
				TypeUtil.FLOAT.equals(type) || TypeUtil.INT.equals(type) ||
				TypeUtil.LONG.equals(type) || TypeUtil.SHORT.equals(type));
	}

	private String _getInputJavaType(String type) {
		if (_isJavaClass(type)) {
			return type;
		}

		String javaType = _INPUT_TYPES.get(type.toLowerCase());

		if (Validator.isNull(javaType)) {
			javaType = Object.class.getName();
		}

		return javaType;
	}

	private String _getOutputJavaType(String type) {
		if (_isJavaClass(type)) {
			return type;
		}

		String javaType = _OUTPUT_TYPES.get(type.toLowerCase());

		if (Validator.isNull(javaType)) {
			javaType = Object.class.getName();
		}

		return javaType;
	}

	private boolean _isJavaClass(String type) {
		if (isPrimitiveType(type)) {

			return true;
		}
		else {
			try {
				Class.forName(type);

				return true;
			}
			catch (ClassNotFoundException e) {
				return false;
			}
		}
	}

	private void _registerTypes(
		HashMap<String, String> map, String[] types, String javaType) {

		for (String type : types) {
			map.put(type.toLowerCase(), javaType);
		}
	}

	public static final String[] ARRAYS = {
		"array", "[]"
	};

	public static final String[] BOOLEANS = {
		"boolean", "bool"
	};

	public static final String[] DOUBLES = {
		"double"
	};

	public static final String[] FLOATS = {
		"float"
	};

	public static final String[] INTEGERS = {
		"integer", "int", "int | string"
	};

	public static final String[] LONGS = {
		"long"
	};

	public static final String[] NUMBERS = {
		"num", "number"
	};

	public static final String[] OBJECTS = {
		"object", "{}"
	};

	public static final String[] SHORTS = {
		"short"
	};

	public static final String[] STRINGS = {
		"node | string", "string", "string | node", "string | int"
	};

	private static HashMap<String, String> _INPUT_TYPES = null;

	private static HashMap<String, String> _OUTPUT_TYPES = null;

	private static TypeUtil _instance = new TypeUtil();

}