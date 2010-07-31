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

/**
 * @author Brian Wing Shun Chan
 */
public class BooleanWrapper
	extends PrimitiveWrapper implements Comparable<BooleanWrapper> {

	public static final Class<?> TYPE = Boolean.TYPE;

	public BooleanWrapper() {
		this(false);
	}

	public BooleanWrapper(boolean value) {
		_value = value;
	}

	public int compareTo(BooleanWrapper booleanWrapper) {
		if (booleanWrapper == null) {
			return 1;
		}

		if (getValue() && !booleanWrapper.getValue()) {
			return 1;
		}
		else if (!getValue() && booleanWrapper.getValue()) {
			return -1;
		}
		else {
			return 0;
		}
	}

	public boolean getValue() {
		return _value;
	}

	public void setValue(boolean value) {
		_value = value;
	}

	private boolean _value;

}