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

package com.liferay.alloy.taglib.util;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.PageContext;

import com.liferay.portal.kernel.util.StringPool;
import org.apache.commons.lang.StringUtils;

/**
 * <a href="CreateConfigTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class CreateConfigTag extends IncludeTag {

	public String getExcludeAttributes() {
		return _excludeAttributes;
	}

	public String getJavaScriptAttributes() {
		return _javaScriptAttributes;
	}

	public Map<String, Object> getTagDynamicAttributes() {
		return _tagDynamicAttributes;
	}

	public PageContext getTagPageContext() {
		return _tagPageContext;
	}

	public Map<String, Object> getTagScopedAttributes() {
		return _tagScopedAttributes;
	}

	public String getVar() {
		return _var;
	}

	public void setExcludeAttributes(String excludeAttributes) {
		_excludeAttributes = excludeAttributes;
	}

	public void setJavaScriptAttributes(String javaScriptAttributes) {
		_javaScriptAttributes = javaScriptAttributes;
	}

	public void setTagDynamicAttributes(
		Map<String, Object> tagDynamicAttributes) {

		_tagDynamicAttributes = tagDynamicAttributes;
	}

	public void setTagPageContext(PageContext tagPageContext) {
		_tagPageContext = tagPageContext;
	}

	public void setTagScopedAttributes(
		Map<String, Object> tagScopedAttributes) {

		_tagScopedAttributes = tagScopedAttributes;
	}

	public void setVar(String var) {
		_var = var;

		setScopedAttribute("var", var);
	}

	protected void cleanUp() {
		_var = null;
		_excludeAttributes = null;
		_javaScriptAttributes = null;
	}

	protected boolean isCleanUpSetAttributes() {
		return _CLEAN_UP_SET_ATTRIBUTES;
	}

	protected void setAttributes(HttpServletRequest request) {
		Map<String, Object> tagDynamicAttributes = getTagDynamicAttributes();
		Map<String, Object> tagScopedAttributes = getTagScopedAttributes();
		Map<String, Object> options = new HashMap<String, Object>();

		if (tagDynamicAttributes != null) {
			_processAttributes(tagDynamicAttributes, options);
		}

		if (tagScopedAttributes != null) {
			_processAttributes(tagScopedAttributes, options);
		}

		pageContext.setAttribute(_var, options);
	}

	private Object _getEscapedAttributeValue(String key, Object rawValue) {
		if (rawValue != null) {
			List<String> javaScriptValues = Collections.EMPTY_LIST;

			if (_javaScriptAttributes != null) {
				javaScriptValues = (List<String>)Arrays.asList(
					_javaScriptAttributes.split(StringPool.COMMA));
			}

			if (!javaScriptValues.contains(key)) {
				String simpleClassName = rawValue.getClass().getSimpleName();

				if (simpleClassName.equals("String")) {
					StringBuilder sb = new StringBuilder();

					sb.append(StringPool.APOSTROPHE);
					sb.append(rawValue.toString());
					sb.append(StringPool.APOSTROPHE);

					return sb.toString();
				}
			}
		}

		return rawValue;
	}

	private boolean _isEventAttribute(String key) {
		Matcher afterMatcher = _EVENT_AFTER_REGEX.matcher(key);
		Matcher onMatcher = _EVENT_ON_REGEX.matcher(key);

		return (afterMatcher.find() || onMatcher.find());
	}

	private boolean _isValidAttribute(String key) {
		return !(_excludeAttributes.contains(key) ||
			key.equals(_DYNAMIC_ATTRIBUTES));
	}

	private void _processAttributes(Map<String, Object> sourceMap,
		Map<String, Object> optionsMap) {

		Map<String, String> afterEventOptionsMap =
			new HashMap<String, String>();

		Map<String, String> onEventOptionsMap =
			new HashMap<String, String>();

		for (String key : sourceMap.keySet()) {
			if (_isValidAttribute(key)) {
				Object value = sourceMap.get(key);

				if (value instanceof Map) {
					Map<String, Object> childOptionsMap =
						new HashMap<String, Object>();

					_processAttributes((HashMap)value, childOptionsMap);

					optionsMap.put(key, childOptionsMap);

					continue;
				}

				if (_isEventAttribute(key)) {
					_processEventAttribute(key, String.valueOf(value),
						afterEventOptionsMap, onEventOptionsMap);
				} else {
					optionsMap.put(key, _getEscapedAttributeValue(key, value));
				}
			}
		}

		if (afterEventOptionsMap.size() > 0) {
			optionsMap.put(_AFTER, afterEventOptionsMap);
		}

		if (onEventOptionsMap.size() > 0) {
			optionsMap.put(_ON, onEventOptionsMap);
		}
	}

	private void _processEventAttribute(String key, String value,
		Map<String, String> afterEventOptionsMap,
		Map<String, String> onEventsOptionsMap) {

		String event = StringPool.BLANK;

		if (key.startsWith(_AFTER)) {
			event = StringUtils.uncapitalize(
				key.replaceFirst(_AFTER, StringPool.BLANK));

			afterEventOptionsMap.put(event, value);
		} else {
			event = StringUtils.uncapitalize(
				key.replaceFirst(_ON, StringPool.BLANK));

			onEventsOptionsMap.put(event, value);
		}
	}

	private static final String _AFTER = "after";

	private static final boolean _CLEAN_UP_SET_ATTRIBUTES = true;

	private static final String _DYNAMIC_ATTRIBUTES = "dynamicAttributes";

	private static final Pattern _EVENT_AFTER_REGEX = Pattern
		.compile("after[A-Z]");

	private static final Pattern _EVENT_ON_REGEX = Pattern.compile("on[A-Z]");

	private static final String _ON = "on";

	private String _excludeAttributes;
	private String _javaScriptAttributes;
	private Map<String, Object> _tagDynamicAttributes;
	private PageContext _tagPageContext;
	private Map<String, Object> _tagScopedAttributes;
	private String _var;

}