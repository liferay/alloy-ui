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

import java.io.Serializable;

import java.text.DateFormat;

import java.util.Date;

/**
 * @author Brian Wing Shun Chan
 */
public class GetterUtil {

	public static String[] BOOLEANS = {"true", "t", "y", "on", "1"};

	public static final boolean DEFAULT_BOOLEAN = false;

	public static final boolean[] DEFAULT_BOOLEAN_VALUES = new boolean[0];

	public static final byte DEFAULT_BYTE = 0;

	public static final byte[] DEFAULT_BYTE_VALUES = new byte[0];

	public static final Date[] DEFAULT_DATE_VALUES = new Date[0];

	public static final double DEFAULT_DOUBLE = 0.0;

	public static final double[] DEFAULT_DOUBLE_VALUES = new double[0];

	public static final float DEFAULT_FLOAT = 0;

	public static final float[] DEFAULT_FLOAT_VALUES = new float[0];

	public static final int DEFAULT_INTEGER = 0;

	public static final int[] DEFAULT_INTEGER_VALUES = new int[0];

	public static final long DEFAULT_LONG = 0;

	public static final long[] DEFAULT_LONG_VALUES = new long[0];

	public static final short DEFAULT_SHORT = 0;

	public static final short[] DEFAULT_SHORT_VALUES = new short[0];

	public static final String DEFAULT_STRING = StringPool.BLANK;

	public static boolean get(Serializable value, boolean defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, defaultValue);
		}
		else if (value.getClass().isAssignableFrom(Boolean.class)) {
			return (Boolean)value;
		}

		return defaultValue;
	}

	public static Date get(
		Serializable value, DateFormat dateFormat, Date defaultValue) {

		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, dateFormat, defaultValue);
		}
		else if (value.getClass().isAssignableFrom(Date.class)) {
			return (Date)value;
		}

		return defaultValue;
	}

	public static double get(Serializable value, double defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, defaultValue);
		}
		else if (value.getClass().isAssignableFrom(Double.class)) {
			return (Double)value;
		}

		return defaultValue;
	}

	public static float get(Serializable value, float defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, defaultValue);
		}
		else if (value.getClass().isAssignableFrom(Float.class)) {
			return (Float)value;
		}

		return defaultValue;
	}

	public static int get(Serializable value, int defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, defaultValue);
		}
		else if (value.getClass().isAssignableFrom(Integer.class)) {
			return (Integer)value;
		}

		return defaultValue;
	}

	public static long get(Serializable value, long defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, defaultValue);
		}
		else if (value.getClass().isAssignableFrom(Long.class)) {
			return (Long)value;
		}

		return defaultValue;
	}

	public static short get(Serializable value, short defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, defaultValue);
		}
		else if (value.getClass().isAssignableFrom(Short.class)) {
			return (Short)value;
		}

		return defaultValue;
	}

	public static String get(Serializable value, String defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof String) {
			return get((String)value, defaultValue);
		}

		return defaultValue;
	}

	public static boolean get(String value, boolean defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		try {
			value = value.trim();

			if (value.equalsIgnoreCase(BOOLEANS[0]) ||
				value.equalsIgnoreCase(BOOLEANS[1]) ||
				value.equalsIgnoreCase(BOOLEANS[2]) ||
				value.equalsIgnoreCase(BOOLEANS[3]) ||
				value.equalsIgnoreCase(BOOLEANS[4])) {

				return true;
			}
			else {
				return false;
			}
		}
		catch (Exception e) {
		}

		return defaultValue;
	}

	public static Date get(
		String value, DateFormat dateFormat, Date defaultValue) {

		if (value == null) {
			return defaultValue;
		}

		try {
			Date date = dateFormat.parse(value.trim());

			if (date != null) {
				return date;
			}
		}
		catch (Exception e) {
		}

		return defaultValue;
	}

	public static double get(String value, double defaultValue) {
		if (value != null) {
			try {
				return Double.parseDouble(_trim(value));
			}
			catch (Exception e) {
			}
		}

		return defaultValue;
	}

	public static float get(String value, float defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		try {
			return Float.parseFloat(_trim(value));
		}
		catch (Exception e) {
		}

		return defaultValue;
	}

	public static int get(String value, int defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		return _parseInt(_trim(value), defaultValue);
	}

	public static long get(String value, long defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		return _parseLong(_trim(value), defaultValue);
	}

	public static short get(String value, short defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		return _parseShort(_trim(value), defaultValue);
	}

	public static String get(String value, String defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		return StringUtil.replace(
			value.trim(), StringPool.RETURN_NEW_LINE, StringPool.NEW_LINE);
	}

	public static boolean getBoolean(Serializable value) {
		return getBoolean(value, DEFAULT_BOOLEAN);
	}

	public static boolean getBoolean(Serializable value, boolean defaultValue) {
		return get(value, defaultValue);
	}

	public static boolean getBoolean(String value) {
		return getBoolean(value, DEFAULT_BOOLEAN);
	}

	public static boolean getBoolean(String value, boolean defaultValue) {
		return get(value, defaultValue);
	}

	public static boolean[] getBooleanValues(Serializable value) {
		return getBooleanValues(value, DEFAULT_BOOLEAN_VALUES);
	}

	public static boolean[] getBooleanValues(
		Serializable value, boolean[] defaultValue) {

		Class<?> classObject = value.getClass();

		if (classObject.isArray()) {
			Class<?> componentType = classObject.getComponentType();

			if (componentType.isAssignableFrom(String.class)) {
				return getBooleanValues((String[])value, defaultValue);
			}
			else if (componentType.isAssignableFrom(Boolean.class)) {
				return (boolean[])value;
			}
		}

		return defaultValue;
	}

	public static boolean[] getBooleanValues(String[] values) {
		return getBooleanValues(values, DEFAULT_BOOLEAN_VALUES);
	}

	public static boolean[] getBooleanValues(
		String[] values, boolean[] defaultValue) {

		if (values == null) {
			return defaultValue;
		}

		boolean[] booleanValues = new boolean[values.length];

		for (int i = 0; i < values.length; i++) {
			booleanValues[i] = getBoolean(values[i]);
		}

		return booleanValues;
	}

	public static Date getDate(Serializable value, DateFormat dateFormat) {
		return getDate(value, dateFormat, new Date());
	}

	public static Date getDate(
		Serializable value, DateFormat dateFormat, Date defaultValue) {

		return get(value, dateFormat, defaultValue);
	}

	public static Date getDate(String value, DateFormat dateFormat) {
		return getDate(value, dateFormat, new Date());
	}

	public static Date getDate(
		String value, DateFormat dateFormat, Date defaultValue) {

		return get(value, dateFormat, defaultValue);
	}

	public static Date[] getDateValues(
		Serializable value, DateFormat dateFormat) {

		return getDateValues(value, dateFormat, DEFAULT_DATE_VALUES);
	}

	public static Date[] getDateValues(
		Serializable value, DateFormat dateFormat, Date[] defaultValue) {

		Class<?> classObject = value.getClass();

		if (classObject.isArray()) {
			Class<?> componentType = classObject.getComponentType();

			if (componentType.isAssignableFrom(String.class)) {
				return getDateValues((String[])value, dateFormat, defaultValue);
			}
			else if (componentType.isAssignableFrom(Date.class)) {
				return (Date[])value;
			}
		}

		return defaultValue;
	}

	public static Date[] getDateValues(String[] values, DateFormat dateFormat) {
		return getDateValues(values, dateFormat, DEFAULT_DATE_VALUES);
	}

	public static Date[] getDateValues(
		String[] values, DateFormat dateFormat, Date[] defaultValue) {

		if (values == null) {
			return defaultValue;
		}

		Date[] dateValues = new Date[values.length];

		for (int i = 0; i < values.length; i++) {
			dateValues[i] = getDate(values[i], dateFormat);
		}

		return dateValues;
	}

	public static double getDouble(Serializable value) {
		return getDouble(value, DEFAULT_DOUBLE);
	}

	public static double getDouble(Serializable value, double defaultValue) {
		return get(value, defaultValue);
	}

	public static double getDouble(String value) {
		return getDouble(value, DEFAULT_DOUBLE);
	}

	public static double getDouble(String value, double defaultValue) {
		return get(value, defaultValue);
	}

	public static double[] getDoubleValues(Serializable value) {
		return getDoubleValues(value, DEFAULT_DOUBLE_VALUES);
	}

	public static double[] getDoubleValues(
		Serializable value, double[] defaultValue) {

		Class<?> classObject = value.getClass();

		if (classObject.isArray()) {
			Class<?> componentType = classObject.getComponentType();

			if (componentType.isAssignableFrom(String.class)) {
				return getDoubleValues((String[])value, defaultValue);
			}
			else if (componentType.isAssignableFrom(Double.class)) {
				return (double[])value;
			}
		}

		return defaultValue;
	}

	public static double[] getDoubleValues(String[] values) {
		return getDoubleValues(values, DEFAULT_DOUBLE_VALUES);
	}

	public static double[] getDoubleValues(
		String[] values, double[] defaultValue) {

		if (values == null) {
			return defaultValue;
		}

		double[] doubleValues = new double[values.length];

		for (int i = 0; i < values.length; i++) {
			doubleValues[i] = getDouble(values[i]);
		}

		return doubleValues;
	}

	public static float getFloat(Serializable value) {
		return getFloat(value, DEFAULT_FLOAT);
	}

	public static float getFloat(Serializable value, float defaultValue) {
		return get(value, defaultValue);
	}

	public static float getFloat(String value) {
		return getFloat(value, DEFAULT_FLOAT);
	}

	public static float getFloat(String value, float defaultValue) {
		return get(value, defaultValue);
	}

	public static float[] getFloatValues(Serializable value) {
		return getFloatValues(value, DEFAULT_FLOAT_VALUES);
	}

	public static float[] getFloatValues(
		Serializable value, float[] defaultValue) {

		Class<?> classObject = value.getClass();

		if (classObject.isArray()) {
			Class<?> componentType = classObject.getComponentType();

			if (componentType.isAssignableFrom(String.class)) {
				return getFloatValues((String[])value, defaultValue);
			}
			else if (componentType.isAssignableFrom(Float.class)) {
				return (float[])value;
			}
		}

		return defaultValue;
	}

	public static float[] getFloatValues(String[] values) {
		return getFloatValues(values, DEFAULT_FLOAT_VALUES);
	}

	public static float[] getFloatValues(
		String[] values, float[] defaultValue) {

		if (values == null) {
			return defaultValue;
		}

		float[] floatValues = new float[values.length];

		for (int i = 0; i < values.length; i++) {
			floatValues[i] = getFloat(values[i]);
		}

		return floatValues;
	}

	public static int getInteger(Serializable value) {
		return getInteger(value, DEFAULT_INTEGER);
	}

	public static int getInteger(Serializable value, int defaultValue) {
		return get(value, defaultValue);
	}

	public static int getInteger(String value) {
		return getInteger(value, DEFAULT_INTEGER);
	}

	public static int getInteger(String value, int defaultValue) {
		return get(value, defaultValue);
	}

	public static int[] getIntegerValues(Serializable value) {
		return getIntegerValues(value, DEFAULT_INTEGER_VALUES);
	}

	public static int[] getIntegerValues(
		Serializable value, int[] defaultValue) {

		Class<?> classObject = value.getClass();

		if (classObject.isArray()) {
			Class<?> componentType = classObject.getComponentType();

			if (componentType.isAssignableFrom(String.class)) {
				return getIntegerValues((String[])value, defaultValue);
			}
			else if (componentType.isAssignableFrom(Integer.class)) {
				return (int[])value;
			}
		}

		return defaultValue;
	}

	public static int[] getIntegerValues(String[] values) {
		return getIntegerValues(values, DEFAULT_INTEGER_VALUES);
	}

	public static int[] getIntegerValues(String[] values, int[] defaultValue) {
		if (values == null) {
			return defaultValue;
		}

		int[] intValues = new int[values.length];

		for (int i = 0; i < values.length; i++) {
			intValues[i] = getInteger(values[i]);
		}

		return intValues;
	}

	public static long getLong(Serializable value) {
		return getLong(value, DEFAULT_LONG);
	}

	public static long getLong(Serializable value, long defaultValue) {
		return get(value, defaultValue);
	}

	public static long getLong(String value) {
		return getLong(value, DEFAULT_LONG);
	}

	public static long getLong(String value, long defaultValue) {
		return get(value, defaultValue);
	}

	public static long[] getLongValues(Serializable value) {
		return getLongValues(value, DEFAULT_LONG_VALUES);
	}

	public static long[] getLongValues(
		Serializable value, long[] defaultValue) {

		Class<?> classObject = value.getClass();

		if (classObject.isArray()) {
			Class<?> componentType = classObject.getComponentType();

			if (componentType.isAssignableFrom(String.class)) {
				return getLongValues((String[])value, defaultValue);
			}
			else if (componentType.isAssignableFrom(Long.class)) {
				return (long[])value;
			}
		}

		return defaultValue;
	}

	public static long[] getLongValues(String[] values) {
		return getLongValues(values, DEFAULT_LONG_VALUES);
	}

	public static long[] getLongValues(String[] values, long[] defaultValue) {
		if (values == null) {
			return defaultValue;
		}

		long[] longValues = new long[values.length];

		for (int i = 0; i < values.length; i++) {
			longValues[i] = getLong(values[i]);
		}

		return longValues;
	}

	public static short getShort(Serializable value) {
		return getShort(value, DEFAULT_SHORT);
	}

	public static short getShort(Serializable value, short defaultValue) {
		return get(value, defaultValue);
	}

	public static short getShort(String value) {
		return getShort(value, DEFAULT_SHORT);
	}

	public static short getShort(String value, short defaultValue) {
		return get(value, defaultValue);
	}

	public static short[] getShortValues(Serializable value) {
		return getShortValues(value, DEFAULT_SHORT_VALUES);
	}

	public static short[] getShortValues(
		Serializable value, short[] defaultValue) {

		Class<?> classObject = value.getClass();

		if (classObject.isArray()) {
			Class<?> componentType = classObject.getComponentType();

			if (componentType.isAssignableFrom(String.class)) {
				return getShortValues((String[])value, defaultValue);
			}
			else if (componentType.isAssignableFrom(Short.class)) {
				return (short[])value;
			}
		}

		return defaultValue;
	}

	public static short[] getShortValues(String[] values) {
		return getShortValues(values, DEFAULT_SHORT_VALUES);
	}

	public static short[] getShortValues(
		String[] values, short[] defaultValue) {

		if (values == null) {
			return defaultValue;
		}

		short[] shortValues = new short[values.length];

		for (int i = 0; i < values.length; i++) {
			shortValues[i] = getShort(values[i]);
		}

		return shortValues;
	}

	public static String getString(Serializable value) {
		return getString(value, DEFAULT_STRING);
	}

	public static String getString(Serializable value, String defaultValue) {
		return get(value, defaultValue);
	}

	public static String getString(String value) {
		return getString(value, DEFAULT_STRING);
	}

	public static String getString(String value, String defaultValue) {
		return get(value, defaultValue);
	}

	private static int _parseInt(String value, int defaultValue) {
		int length = value.length();

		if (length <= 0) {
			return defaultValue;
		}

		int pos = 0;
		int limit = -Integer.MAX_VALUE;
		boolean negative = false;

		char c = value.charAt(0);

		if (c < CharPool.NUMBER_0) {
			if (c == CharPool.MINUS) {
				limit = Integer.MIN_VALUE;
				negative = true;
			}
			else if (c != CharPool.PLUS) {
				return defaultValue;
			}

			if (length == 1) {
				return defaultValue;
			}

			pos++;
		}

		int smallLimit = limit / 10;

		int result = 0;

		while (pos < length) {
			if (result < smallLimit) {
				return defaultValue;
			}

			c = value.charAt(pos++);

			if ((c < CharPool.NUMBER_0) || (c > CharPool.NUMBER_9)) {
				return defaultValue;
			}

			int number = c - CharPool.NUMBER_0;

			result *= 10;

			if (result < (limit + number)) {
				return defaultValue;
			}

			result -= number;
		}

		if (negative) {
			return result;
		}
		else {
			return -result;
		}
	}

	private static long _parseLong(String value, long defaultValue) {
		int length = value.length();

		if (length <= 0) {
			return defaultValue;
		}

		int pos = 0;
		long limit = -Long.MAX_VALUE;
		boolean negative = false;

		char c = value.charAt(0);

		if (c < CharPool.NUMBER_0) {
			if (c == CharPool.MINUS) {
				limit = Long.MIN_VALUE;
				negative = true;
			}
			else if (c != CharPool.PLUS) {
				return defaultValue;
			}

			if (length == 1) {
				return defaultValue;
			}

			pos++;
		}

		long smallLimit = limit / 10;

		long result = 0;

		while (pos < length) {
			if (result < smallLimit) {
				return defaultValue;
			}

			c = value.charAt(pos++);

			if ((c < CharPool.NUMBER_0) || (c > CharPool.NUMBER_9)) {
				return defaultValue;
			}

			int number = c - CharPool.NUMBER_0;

			result *= 10;

			if (result < (limit + number)) {
				return defaultValue;
			}

			result -= number;
		}

		if (negative) {
			return result;
		}
		else {
			return -result;
		}
	}

	private static short _parseShort(String value, short defaultValue) {
		int i = _parseInt(value, defaultValue);

		if ((i < Short.MIN_VALUE) || (i > Short.MAX_VALUE)) {
			return defaultValue;
		}

		return (short)i;
	}

	private static String _trim(String value) {
		value = value.trim();

		int length = value.length();

		StringBuilder sb = new StringBuilder(length);

		for (int i = 0; i < length; i++) {
			char c = value.charAt(i);

			if ((Character.isDigit(c)) ||
				((c == CharPool.DASH) && (i == 0)) ||
				(c == CharPool.PERIOD) || (c == CharPool.UPPER_CASE_E) ||
				(c == CharPool.LOWER_CASE_E)) {

				sb.append(c);
			}
		}

		return sb.toString();
	}

}