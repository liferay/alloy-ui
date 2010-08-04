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

	public static JSONObject addKeyPrefix(JSONObject json, String prefix) {
		JSONObject output = new JSONObject();

		try {
			Iterator<String> it = json.keys();

			while (it.hasNext()) {
				String key = it.next();
				String newKey = prefix.concat(
					org.apache.commons.lang.StringUtils.capitalize(key));

				output.put(newKey, json.get(key));
			}
		}
		catch(JSONException e) {
			e.printStackTrace();
		}

		return output;
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

	public static JSONObject merge(JSONObject json1, JSONObject json2) {
		JSONObject json = new JSONObject();

		try {
			Iterator<String> it1 = json1.keys();
			Iterator<String> it2 = json2.keys();

			while (it1.hasNext()) {
				String key = it1.next();

				json.put(key, json1.get(key));
			}

			while (it2.hasNext()) {
				String key = it2.next();

				json.put(key, json2.get(key));
			}
		}
		catch(JSONException e) {
			e.printStackTrace();
		}

		return json;
	}

	public static Iterator sortedKeys(JSONObject json) {
		HashMap hashMap = new HashMap();

		try {
			Iterator<String> it = json.keys();

			while (it.hasNext()) {
				String key = it.next();

				hashMap.put(key, json.get(key));
			}
		}
		catch(JSONException e) {
			e.printStackTrace();
		}

		return new TreeSet(hashMap.keySet()).iterator();
    }

}
