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

package com.liferay.alloy.tools.model;

/**
 * <a href="BaseModel.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public abstract class BaseModel implements Comparable {

	public int compareTo(Object o) {
		BaseModel model = (BaseModel)o;

		return _name.compareTo(model.getName());
	}

	public boolean equals(Object o) {
		BaseModel model = (BaseModel)o;

		return _name.equals(model.getName());
	}

	public String getName() {
		return _name;
	}

	public int hashCode() {
		return _name.hashCode();
	}

	public void setName(String name) {
		_name = name;
	}

	private String _name;

}
