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

import com.liferay.portal.kernel.util.Validator;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import flexjson.transformer.Transformer;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * <a href="JSONFactoryUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class JSONFactoryUtil {

	public static Object deserialize(Object obj) {
		return deserialize(obj.toString());
	}

	public static Object deserialize(String json) {
		return _deserializer.deserialize(json);
	}

	public static ArrayList<Object> getArrayList(Object obj) {
		return (ArrayList<Object>)safeDeserialize(obj);
	}

	public static HashMap<String, Object> getHashMap(Object obj) {
		return (HashMap)safeDeserialize(obj);
	}

	public static JSONArray getJSONArray(Object obj) {
		JSONArray json = null;

		try {
			json = new JSONArray(serialize(obj));
		}
		catch (JSONException e) {
			e.printStackTrace();
		}

		return json;
	}

	public static JSONObject getJSONObject(Object obj) {
		JSONObject json = null;

		try {
			json = new JSONObject(serialize(obj));
		}
		catch (JSONException e) {
			e.printStackTrace();
		}

		return json;
	}

	public static Object safeDeserialize(Object obj) {

		if (Validator.isNotNull(obj)) {
			return deserialize(StringUtil.unquote(serialize(obj)));
		}

		return null;
	}

	public static String serialize(Object obj) {
		return _serializer.deepSerialize(obj);
	}

	public static String serialize(
		Object obj, Transformer transformer, Class clazz) {

		JSONSerializer serializer =
			new JSONSerializer().transform(transformer, clazz);

		return serializer.deepSerialize(obj);
	}

	private static JSONDeserializer _deserializer = new JSONDeserializer();
	private static JSONSerializer _serializer = new JSONSerializer();

}