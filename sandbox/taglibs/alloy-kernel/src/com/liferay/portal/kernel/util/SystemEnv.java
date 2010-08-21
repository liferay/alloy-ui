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

import com.liferay.portal.kernel.io.unsync.UnsyncBufferedReader;

import java.io.IOException;
import java.io.InputStreamReader;

import java.util.Enumeration;
import java.util.Properties;

/**
 * @author Brian Wing Shun Chan
 */
public class SystemEnv {

	public static Properties getProperties() {
		Properties props = new Properties();

		try {
			Runtime runtime = Runtime.getRuntime();
			Process process = null;

			String osName = System.getProperty("os.name").toLowerCase();

			if (osName.indexOf("windows ") > -1) {
				if (osName.indexOf("windows 9") > -1) {
					process = runtime.exec("command.com /c set");
				}
				else {
					process = runtime.exec("cmd.exe /c set");
				}
			}
			else {
				process = runtime.exec("env");
			}

			UnsyncBufferedReader unsyncBufferedReader =
				new UnsyncBufferedReader(
					new InputStreamReader(process.getInputStream()));

			String line;

			while ((line = unsyncBufferedReader.readLine()) != null) {
				int pos = line.indexOf(StringPool.EQUAL);

				if (pos != -1) {
					String key = line.substring(0, pos);
					String value = line.substring(pos + 1);

					props.setProperty(key, value);
				}
			}
		}
		catch (IOException ioe) {
			ioe.printStackTrace();
		}

		return props;
	}

	public static void setProperties(Properties props) {
		Properties envProps = getProperties();

		Enumeration<String> enu = (Enumeration<String>)envProps.propertyNames();

		while (enu.hasMoreElements()) {
			String key = enu.nextElement();

			props.setProperty("env." + key, (String)envProps.get(key));
		}
	}

}