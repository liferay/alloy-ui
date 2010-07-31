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

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.liferay.portal.kernel.util.StringBundler;
import com.liferay.portal.kernel.util.StringPool;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 */
public class ComponentTag extends IncludeTag {

	public String getJsVar() {
		return _jsVar;
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

	public String getYuiVariable() {
		return _yuiVariable;
	}

	public void init() {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);
	}

	public void setJsVar(String jsVar) {
		_jsVar = jsVar;
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

	public void setYuiVariable(String yuiVariable) {
		_yuiVariable = yuiVariable;
	}

	protected void cleanUp() {
		_jsVar = null;
		_module = null;
		_options = null;
		_yuiVariable = null;
	}

	protected String getPage() {
		return _PAGE;
	}

	protected boolean isCleanUpSetAttributes() {
		return _CLEAN_UP_SET_ATTRIBUTES;
	}

	protected void setAttributes(HttpServletRequest request) {
		StringBundler optionsSB = new StringBundler();

		_buildOptionsString(optionsSB, getOptions());

		request.setAttribute(getAttributeNamespace() + "jsVar", getJsVar());

		request.setAttribute(getAttributeNamespace() + "module", getModule());

		request.setAttribute(getAttributeNamespace() + "name", getName());

		request.setAttribute(getAttributeNamespace() + "options",
			optionsSB.toString());

		request.setAttribute(getAttributeNamespace() + "yuiVariable",
			getYuiVariable());
	}

	private void _buildArrayString(StringBundler sb, Object[] array) {
		sb.append(StringPool.OPEN_BRACKET);

		for (int i = 0; i < array.length; i++) {
			Object item = array[i];

			if (_isArray(item)) {
				_buildArrayString(sb, (Object[])item);
			} else {
				sb.append(StringPool.APOSTROPHE + item.toString() +
					StringPool.APOSTROPHE);
			}

			if (i < array.length - 1) {
				sb.append(StringPool.COMMA);
			}
		}

		sb.append(StringPool.CLOSE_BRACKET);
	}

	private void _buildOptionsString(
		StringBundler sb,Map<String, Object> hashMap) {

		Set<String> keys = hashMap.keySet();
		Iterator<String> iterator = keys.iterator();

		sb.append(StringPool.OPEN_CURLY_BRACE);

		while (iterator.hasNext()) {
			String key = iterator.next().toString();
			Object value = hashMap.get(key);

			sb.append(key);
			sb.append(StringPool.COLON);

			if (value instanceof Map) {
				_buildOptionsString(sb, (Map<String, Object>)value);
			}
			else if (_isArray(value)) {
				_buildArrayString(sb, (Object[])value);
			}
			else {
				sb.append(value.toString());
			}

			if (iterator.hasNext()) {
				sb.append(StringPool.COMMA);
			}
		}

		sb.append(StringPool.CLOSE_CURLY_BRACE);
	}

	private boolean _isArray(Object obj) {
		Class<?> type = obj.getClass();

		return type.isArray();
	}

	private static final String _ATTRIBUTE_NAMESPACE = "aui:component:";

	private static final boolean _CLEAN_UP_SET_ATTRIBUTES = true;

	private static final String _PAGE =
		"/html/taglib/alloy-util/component/page.jsp";

	private String _jsVar;
	private String _module;
	private String _name;
	private Map<String, Object> _options;
	private String _yuiVariable;

}