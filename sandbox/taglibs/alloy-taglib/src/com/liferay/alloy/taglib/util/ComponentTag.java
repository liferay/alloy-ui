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

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import com.liferay.alloy.util.JSONFactoryUtil;
import com.liferay.alloy.util.ReservedAttributeUtil;
import com.liferay.alloy.util.StringUtil;
import com.liferay.alloy.util.json.StringTransformer;
import com.liferay.portal.kernel.util.StringPool;
import flexjson.JSONSerializer;
import org.apache.commons.lang.StringUtils;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 */
public class ComponentTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public String getExcludeAttributes() {
		return _excludeAttributes;
	}

	public String getJavaScriptAttributes() {
		return _javaScriptAttributes;
	}

	public String getModule() {
		return _module;
	}

	public String getName() {
		return _name;
	}

	public Map<String, Object> getOptions() {
		return _options;
	}

	public PageContext getTagPageContext() {
		return _tagPageContext;
	}

	public String getVar() {
		return _var;
	}

	public String getYuiVariable() {
		return _yuiVariable;
	}

	public void setExcludeAttributes(String excludeAttributes) {
		_excludeAttributes = excludeAttributes;
	}

	public void setJavaScriptAttributes(String javaScriptAttributes) {
		_javaScriptAttributes = javaScriptAttributes;
	}

	public void setModule(String module) {
		_module = module;
	}

	public void setName(String name) {
		_name = name;
	}

	public void setOptions(Map<String, Object> options) {
		_options = options;
	}

	public void setTagPageContext(PageContext tagPageContext) {
		_tagPageContext = tagPageContext;
	}

	public void setVar(String var) {
		_var = var;
	}

	public void setYuiVariable(String yuiVariable) {
		_yuiVariable = yuiVariable;
	}

	protected String _getPage() {
		return _PAGE;
	}

	protected void _setAttributes(HttpServletRequest request) {
		Map<String, Object> options = getOptions();
		HashMap<String, Object> newOptions = new HashMap<String, Object>();

		_proccessAttributes(options, newOptions);

		setNamespacedAttribute(request, "excludeAttributes", _excludeAttributes);
		setNamespacedAttribute(request, "tagPageContext", _tagPageContext);
		setNamespacedAttribute(request, "javaScriptAttributes", _javaScriptAttributes);
		setNamespacedAttribute(request, "var", _var);
		setNamespacedAttribute(request, "module", _module);
		setNamespacedAttribute(request, "name", _name);
		setNamespacedAttribute(request, "options", options);
		setNamespacedAttribute(request, "optionsJSON", _serialize(newOptions));
		setNamespacedAttribute(request, "yuiVariable", _yuiVariable);
	}

	protected void cleanUp() {
		_var = null;
		_module = null;
		_name = null;
		_options = null;
		_yuiVariable = null;
		_excludeAttributes = null;
		_tagPageContext = null;
		_javaScriptAttributes = null;
	}

	protected boolean isCleanUpSetAttributes() {
		return _CLEAN_UP_SET_ATTRIBUTES;
	}

	private boolean _isEventAttribute(String key) {
		Matcher afterMatcher = _EVENT_AFTER_REGEX.matcher(key);
		Matcher onMatcher = _EVENT_ON_REGEX.matcher(key);

		return (afterMatcher.find() || onMatcher.find());
	}

	private boolean _isValidAttribute(String key) {
		List<String> excludeAttributes = Collections.EMPTY_LIST;

		if (_excludeAttributes != null) {
			excludeAttributes = (List<String>)Arrays.asList(
				_excludeAttributes.split(StringPool.COMMA));
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
				ReservedAttributeUtil.getOriginalName(_name, key);

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

	private String _serialize(Object value) {
		StringTransformer stringTransformer = new StringTransformer();

		stringTransformer.setJavaScriptAttributes(
			Arrays.asList(StringUtil.split(_javaScriptAttributes)));

		return JSONFactoryUtil.serialize(value, stringTransformer, String.class);
	}

	private static final String _AFTER = "after";

	private static final String _ATTRIBUTE_NAMESPACE = "aui:component:";

	private static final boolean _CLEAN_UP_SET_ATTRIBUTES = true;

	private static final String _DYNAMIC_ATTRIBUTES = "dynamicAttributes";

	private static final Pattern _EVENT_AFTER_REGEX = Pattern
		.compile("after[A-Z]");

	private static final Pattern _EVENT_ON_REGEX = Pattern.compile("on[A-Z]");

	private static final String _ON = "on";

	private static final String _PAGE =
		"/html/taglib/alloy-util/component/page.jsp";

	private String _excludeAttributes;
	private String _javaScriptAttributes;
	private String _module;
	private String _name;
	private Map<String, Object> _options;
	private PageContext _tagPageContext;
	private String _var;
	private String _yuiVariable;

}