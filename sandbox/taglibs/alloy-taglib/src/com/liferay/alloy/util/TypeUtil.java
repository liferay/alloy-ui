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
import jodd.util.ReflectUtil;

import java.util.HashMap;

/**
 * <a href="TypeUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class TypeUtil {

	public static final String[] _ARRAY = {
		"array", "[]"
	};

	public static final String[] _BOOLEAN = {
		"boolean", "bool"
	};

	public static final String[] _FLOAT = {
		"float"
	};

	public static final String[] _INTEGER = {
		"integer", "int", "int | string"
	};

	public static final String[] _NUMBER = {
		"num", "number"
	};

	public static final String[] _OBJECT = {
		"object", "{}"
	};

	public static String getJavaType(String type) {
		if (type.startsWith(_JAVA_LANG)) {
			return type;
		}

		if (_TYPES == null) {
			_TYPES = new HashMap<String, String>();

			_registerTypes(_ARRAY, Object.class.getName());
			_registerTypes(_BOOLEAN, Boolean.class.getName());
			_registerTypes(_FLOAT, Float.class.getName());
			_registerTypes(_INTEGER, Integer.class.getName());
			_registerTypes(_NUMBER, Number.class.getName());
			_registerTypes(_OBJECT, Object.class.getName());
		}

		String javaType = _TYPES.get(type.toLowerCase());

		if (Validator.isNull(javaType)) {
			javaType = String.class.getName();
		}

		return javaType;
	}

	private static void _registerTypes(String[] types, String javaType) {
		for (String type : types) {
			_TYPES.put(type.toLowerCase(), javaType);
		}
	}

	private static final String _JAVA_LANG = "java.lang";

	private static HashMap<String, String> _TYPES = null;

}
