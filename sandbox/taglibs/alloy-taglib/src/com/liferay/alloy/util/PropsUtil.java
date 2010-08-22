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

import java.util.Properties;

import com.liferay.portal.configuration.ConfigurationImpl;
import com.liferay.portal.kernel.configuration.Configuration;
import com.liferay.portal.kernel.configuration.Filter;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;

/**
 * @author Brian Wing Shun Chan
 */
public class PropsUtil {

	public static void addProperties(Properties properties) {
		_instance._addProperties(properties);
	}

	public static boolean contains(String key) {
		return _instance._contains(key);
	}

	public static String get(String key) {
		return _instance._get(key);
	}

	public static String get(String key, Filter filter) {
		return _instance._get(key, filter);
	}

	public static String[] getArray(String key) {
		return _instance._getArray(key);
	}

	public static String[] getArray(String key, Filter filter) {
		return _instance._getArray(key, filter);
	}

	public static Properties getProperties() {
		return _instance._getProperties();
	}

	public static Properties getProperties(
		String prefix, boolean removePrefix) {

		return _instance._getProperties(prefix, removePrefix);
	}

	public static void removeProperties(Properties properties) {
		_instance._removeProperties(properties);
	}

	public static void set(String key, String value) {
		_instance._set(key, value);
	}

	private PropsUtil() {
		try {

			_configuration = new ConfigurationImpl(
				PropsUtil.class.getClassLoader(), PropsFiles.ALLOY);

		}
		catch (Exception e) {
			if (_log.isErrorEnabled()) {
				_log.error("Unable to initialize PropsUtil", e);
			}
		}
	}

	private void _addProperties(Properties properties) {
		_getConfiguration().addProperties(properties);
	}

	private boolean _contains(String key) {
		return _getConfiguration().contains(key);
	}

	private String _get(String key) {
		return _getConfiguration().get(key);
	}

	private String _get(String key, Filter filter) {
		return _getConfiguration().get(key, filter);
	}

	private String[] _getArray(String key) {
		return _getConfiguration().getArray(key);
	}

	private String[] _getArray(String key, Filter filter) {
		return _getConfiguration().getArray(key, filter);
	}

	private Configuration _getConfiguration() {
		if (_configuration == null) {
			_configuration = new ConfigurationImpl(
				PropsUtil.class.getClassLoader(), PropsFiles.ALLOY);
		}

		return _configuration;
	}

	private Properties _getProperties() {
		return _getConfiguration().getProperties();
	}

	private Properties _getProperties(String prefix, boolean removePrefix) {
		return _getConfiguration().getProperties(prefix, removePrefix);
	}

	private void _removeProperties(Properties properties) {
		_getConfiguration().removeProperties(properties);
	}

	private void _set(String key, String value) {
		_getConfiguration().set(key, value);
	}

	private static Log _log = LogFactoryUtil.getLog(PropsUtil.class);

	private static PropsUtil _instance = new PropsUtil();

	private Configuration _configuration;

}