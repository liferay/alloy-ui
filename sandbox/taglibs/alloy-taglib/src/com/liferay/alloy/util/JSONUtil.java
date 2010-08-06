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

import com.liferay.portal.kernel.util.ArrayUtil;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.*;

/**
 * <a href="JSONUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class JSONUtil {

	public static JSONArray getJSONArray(JSONObject json, String key) {
		try {
			if (json.has(key)) {
				return json.getJSONArray(key);
			}
		}
		catch (JSONException e) {
			e.printStackTrace();
		}

		return null;
	}

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

	public static List<String> getList(JSONObject json, String key) {
		List<String> out = new ArrayList<String>();

		try {
			JSONArray jsonArray = getJSONArray(json, key);

			if (jsonArray != null) {
				for (int i = 0; i < jsonArray.length(); i++) {
					Object value = jsonArray.get(i);

					if (value != null) {
						out.add((String)value);
					}
				}
			}
		}
		catch (JSONException e) {
			e.printStackTrace();
		}

		return out;
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
