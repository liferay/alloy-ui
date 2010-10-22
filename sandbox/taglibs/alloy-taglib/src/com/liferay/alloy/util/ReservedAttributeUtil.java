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

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.liferay.alloy.tools.model.Attribute;
import com.liferay.alloy.tools.model.Component;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;

/**
 * <a href="ReservedAttributeUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class ReservedAttributeUtil {

	public static final List<String> RESERVED_ATTRIBUTES =	Arrays.asList(
		new String[] {
			"values", "value", "servletRequest", "servletResponse",
			"servletContext", "scopedAttribute", "scopedAttributes",
			"previousOut", "parent", "namespacedAttribute",
			"attributeNamespace", "bodyContent", "class", "dynamicAttribute",
			"dynamicAttributes", "id", "scriptPosition", "page"
		}
	);

	public static String getOriginalName(
		String componentName, String attributeName) {

		String originalName = StringUtils.uncapitalize(
			StringUtil.replaceFirst(
				attributeName, componentName.toLowerCase(), StringPool.BLANK));

		if (isReserved(originalName)) {
			attributeName = originalName;
		}

		return attributeName;
	}

	public static String getSafeName(Attribute attribute) {
		String name = attribute.getName();

		Component component = attribute.getComponent();

		if (isReserved(attribute) && (component != null)) {
			String componentName = component.getName();

			name = componentName.toLowerCase().concat(
				StringUtils.capitalize(name));
		}

		return name;
	}

	public static boolean isReserved(Attribute attribute) {
		return isReserved(attribute.getName());
	}

	public static boolean isReserved(String attributeName) {
		return RESERVED_ATTRIBUTES.contains(attributeName);
	}

}
