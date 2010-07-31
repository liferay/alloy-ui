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

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.log.LogUtil;

/**
 * @author Brian Wing Shun Chan
 */
public class JavaProps {

	public static final double JAVA_CLASS_VERSION_JDK_4 = 48.0;

	public static final double JAVA_CLASS_VERSION_JDK_5 = 49.0;

	public static final double JAVA_CLASS_VERSION_JDK_6 = 50.0;

	public static final double JAVA_CLASS_VERSION_JDK_7 = 51.0;

	public static String getJavaClassPath() {
		return _instance._javaClassPath;
	}

	public static double getJavaClassVersion() {
		return _instance._javaClassVersion;
	}

	public static String getJavaRuntimeVersion() {
		return _instance._javaRuntimeVersion;
	}

	public static double getJavaSpecificationVersion() {
		return _instance._javaSpecificationVersion;
	}

	public static String getJavaVersion() {
		return _instance._javaVersion;
	}

	public static String getJavaVmVersion() {
		return _instance._javaVmVersion;
	}

	public static boolean isJDK4() {
		if (JavaProps.getJavaClassVersion() >=
				JavaProps.JAVA_CLASS_VERSION_JDK_4) {

			return true;
		}
		else {
			return false;
		}
	}

	public static boolean isJDK5() {
		if (JavaProps.getJavaClassVersion() >=
				JavaProps.JAVA_CLASS_VERSION_JDK_5) {

			return true;
		}
		else {
			return false;
		}
	}

	public static boolean isJDK6() {
		if (JavaProps.getJavaClassVersion() >=
				JavaProps.JAVA_CLASS_VERSION_JDK_6) {

			return true;
		}
		else {
			return false;
		}
	}

	public static boolean isJDK7() {
		if (JavaProps.getJavaClassVersion() >=
				JavaProps.JAVA_CLASS_VERSION_JDK_7) {

			return true;
		}
		else {
			return false;
		}
	}

	private JavaProps() {
		_javaClassPath = System.getProperty("java.class.path");
		_javaClassVersion = Double.parseDouble(System.getProperty(
			"java.class.version"));
		_javaRuntimeVersion = System.getProperty("java.runtime.version");
		_javaSpecificationVersion = Double.parseDouble(System.getProperty(
			"java.specification.version"));
		_javaVersion = System.getProperty("java.version");
		_javaVmVersion = System.getProperty("java.vm.version");

		LogUtil.debug(_log, System.getProperties());
	}

	private static Log _log = LogFactoryUtil.getLog(JavaProps.class);

	private static JavaProps _instance = new JavaProps();

	private String _javaClassPath;
	private double _javaClassVersion;
	private String _javaRuntimeVersion;
	private double _javaSpecificationVersion;
	private String _javaVersion;
	private String _javaVmVersion;

}