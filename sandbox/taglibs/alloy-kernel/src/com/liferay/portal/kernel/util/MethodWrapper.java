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

import java.io.Serializable;

import java.lang.reflect.Method;

import java.util.Arrays;

/**
 * @author Brian Wing Shun Chan
 */
public class MethodWrapper implements Serializable {

	public MethodWrapper(String className, String methodName) {
		this(className, methodName, new Object[0]);
	}

	public MethodWrapper(String className, String methodName, Object argument) {
		this(className, methodName, new Object[] {argument});
	}

	public MethodWrapper(
		String className, String methodName, Object[] arguments) {

		_className = className;
		_methodName = methodName;
		_arguments = arguments;
	}

	public MethodWrapper(Method method, Object[] arguments) {
		this(method.getDeclaringClass().getName(), method.getName(), arguments);

		_argumentClassNames = new String[arguments.length];

		Class<?>[] parameterTypes = method.getParameterTypes();

		for (int i = 0; i < parameterTypes.length; i++) {
			_argumentClassNames[i] = parameterTypes[i].getName();
		}
	}

	public String getClassName() {
		return _className;
	}

	public String getMethodName() {
		return _methodName;
	}

	/**
	 * @deprecated Use <code>getArguments</code>.
	 */
	public Object[] getArgs() {
		return getArguments();
	}

	public String[] getArgumentClassNames() {
		return _argumentClassNames;
	}

	public Object[] getArguments() {
		Object[] arguments = new Object[_arguments.length];

		System.arraycopy(_arguments, 0, arguments, 0, _arguments.length);

		return arguments;
	}

	public String toString() {
		StringBundler sb = new StringBundler(9);

		sb.append("{className=");
		sb.append(_className);
		sb.append(", methodName=");
		sb.append(_methodName);

		if (_argumentClassNames != null) {
			sb.append(", argumentClassNames=");
			sb.append(Arrays.toString(_argumentClassNames));
		}

		sb.append(", arguments=");
		sb.append(Arrays.toString(_arguments));
		sb.append("}");

		return sb.toString();
	}

	private String _className;
	private String _methodName;
	private String[] _argumentClassNames;
	private Object[] _arguments;

}