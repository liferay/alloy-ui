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

package com.liferay.alloy.taglib.alloy_util;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.liferay.alloy.taglib.alloy_util.base.BaseComponentTag;
import com.liferay.alloy.util.ReservedAttributeUtil;
import com.liferay.portal.kernel.util.StringPool;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 */
public class ComponentTag extends BaseComponentTag {

	protected void _setAttributes(HttpServletRequest request) {
		Map<String, Object> options = getOptions();
		HashMap<String, Object> optionsJSON = new HashMap<String, Object>();

		_proccessAttributes(options, optionsJSON);

		super._setAttributes(request);
		setNamespacedAttribute(request, "options", options);
		setNamespacedAttribute(request, "optionsJSON", optionsJSON);
	}

	private boolean _isEventAttribute(String key) {
		Matcher afterMatcher = _EVENT_AFTER_REGEX.matcher(key);
		Matcher onMatcher = _EVENT_ON_REGEX.matcher(key);

		return (afterMatcher.find() || onMatcher.find());
	}

	private boolean _isValidAttribute(String key) {
		List<String> excludeAttributes = Collections.EMPTY_LIST;

		if (getExcludeAttributes() != null) {
			excludeAttributes = (List<String>)Arrays.asList(
				getExcludeAttributes().split(StringPool.COMMA));
		}

		return !(excludeAttributes.contains(key) ||
			key.equals(_DYNAMIC_ATTRIBUTES));
	}

	private void _proccessAttributes(Map<String, Object> options,
		Map<String, Object> newOptions) {

		Map<String, String> afterEventOptionsMap =
			new HashMap<String, String>();

		Map<String, String> onEventOptionsMap =	new HashMap<String, String>();

		for (String key : options.keySet()) {
			if (!_isValidAttribute(key)) {
				continue;
			}

			Object value = options.get(key);

			String originalKey =
				ReservedAttributeUtil.getOriginalName(getName(), key);

			if (value instanceof Map) {
				Map<String, Object> childOptionsMap =
					new HashMap<String, Object>();

				_proccessAttributes((Map)value, childOptionsMap);

				newOptions.put(originalKey, childOptionsMap);

				continue;
			}

			if (_isEventAttribute(key)) {
				_processEventAttribute(
					key, String.valueOf(value), afterEventOptionsMap,
						onEventOptionsMap);
			} else {
				newOptions.put(originalKey, value);
			}
		}

		if (afterEventOptionsMap.size() > 0) {
			newOptions.put(_AFTER, afterEventOptionsMap);
		}

		if (onEventOptionsMap.size() > 0) {
			newOptions.put(_ON, onEventOptionsMap);
		}
	}

	private void _processEventAttribute(String key, String value,
		Map<String, String> afterEventOptionsMap,
		Map<String, String> onEventsOptionsMap) {

		if (key.startsWith(_AFTER)) {
			String event = StringUtils.uncapitalize(
				key.replaceFirst(_AFTER, StringPool.BLANK));

			afterEventOptionsMap.put(event, value);
		} else {
			String event = StringUtils.uncapitalize(
				key.replaceFirst(_ON, StringPool.BLANK));

			onEventsOptionsMap.put(event, value);
		}
	}

	private static final String _AFTER = "after";

	private static final String _DYNAMIC_ATTRIBUTES = "dynamicAttributes";

	private static final Pattern _EVENT_AFTER_REGEX = Pattern
		.compile("after[A-Z]");

	private static final Pattern _EVENT_ON_REGEX = Pattern.compile("on[A-Z]");

	private static final String _ON = "on";

}