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

import java.net.URL;
import java.net.URLClassLoader;

/**
 * @author Brian Wing Shun Chan
 */
public class PortalClassLoaderUtil {

	public static ClassLoader getClassLoader() {
		return _classLoader;
	}

	public static void setClassLoader(ClassLoader contextClassLoader) {
		if (ServerDetector.isJOnAS() && JavaProps.isJDK6()) {
			_classLoader = new URLClassLoader(new URL[0], contextClassLoader);
		}
		else {
			_classLoader = contextClassLoader;
		}
	}

	private static ClassLoader _classLoader;

}