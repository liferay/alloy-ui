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

package com.liferay.portal.kernel.configuration;

import java.util.Map;

/**
 * @author Brian Wing Shun Chan
 */
public class Filter {

	public Filter(String selector1) {
		this(new String[] {selector1}, null);
	}

	public Filter(String selector1, String selector2) {
		this(new String[] {selector1, selector2}, null);
	}

	public Filter(String selector1, String selector2, String selector3) {
		this(new String[] {selector1, selector2, selector3}, null);
	}

	public Filter(String selector1, Map<String, String> variables) {
		this(new String[] {selector1}, variables);
	}

	public Filter(
		String selector1, String selector2, Map<String, String> variables) {

		this(new String[] {selector1, selector2}, variables);
	}

	public Filter(
		String selector1, String selector2, String selector3,
		Map<String, String> variables) {

		this(new String[] {selector1, selector2, selector3}, variables);
	}

	public Filter(String[] selectors, Map<String, String> variables) {
		_selectors = selectors;
		_variables = variables;
	}

	public String[] getSelectors() {
		return _selectors;
	}

	public Map<String, String> getVariables() {
		return _variables;
	}

	private String[] _selectors;
	private Map<String, String> _variables;

}