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

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.TreeSet;

/**
 * <a href="JSONUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class JSONUtil {

	public static JSONObject getJSONObject(JSONObject json, String key) {
		try {
			if (json.has(key)) {
				return json.getJSONObject(key);
			}
		}
		catch (JSONException e) {
			e.printStackTrace();
		}

		return null;
	}

	public static String getString(JSONObject json, String key) {
		try {
			if (json.has(key)) {
				return json.getString(key);
			}
		}
		catch (JSONException e) {
			e.printStackTrace();
		}

		return null;
	}

}
