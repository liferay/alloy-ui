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

import java.lang.reflect.Array;

import java.text.DateFormat;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

/**
 * @author Brian Wing Shun Chan
 */
public class ArrayUtil {

	public static boolean[] append(boolean[]... arrays) {
		int length = 0;

		for (boolean[] array : arrays) {
			length += array.length;
		}

		boolean[] newArray = new boolean[length];

		int previousLength = 0;

		for (boolean[] array : arrays) {
			System.arraycopy(array, 0, newArray, previousLength, array.length);

			previousLength += array.length;
		}

		return newArray;
	}

	public static boolean[] append(boolean[] array, boolean value) {
		boolean[] newArray = new boolean[array.length + 1];

		System.arraycopy(array, 0, newArray, 0, array.length);

		newArray[newArray.length - 1] = value;

		return newArray;
	}

	public static byte[] append(byte[]... arrays) {
		int length = 0;

		for (byte[] array : arrays) {
			length += array.length;
		}

		byte[] newArray = new byte[length];

		int previousLength = 0;

		for (byte[] array : arrays) {
			System.arraycopy(array, 0, newArray, previousLength, array.length);

			previousLength += array.length;
		}

		return newArray;
	}

	public static byte[] append(byte[] array, byte value) {
		byte[] newArray = new byte[array.length + 1];

		System.arraycopy(array, 0, newArray, 0, array.length);

		newArray[newArray.length - 1] = value;

		return newArray;
	}

	public static char[] append(char[]... arrays) {
		int length = 0;

		for (char[] array : arrays) {
			length += array.length;
		}

		char[] newArray = new char[length];

		int previousLength = 0;

		for (char[] array : arrays) {
			System.arraycopy(array, 0, newArray, previousLength, array.length);

			previousLength += array.length;
		}

		return newArray;
	}

	public static char[] append(char[] array, char value) {
		char[] newArray = new char[array.length + 1];

		System.arraycopy(array, 0, newArray, 0, array.length);

		newArray[newArray.length - 1] = value;

		return newArray;
	}

	public static double[] append(double[]... arrays) {
		int length = 0;

		for (double[] array : arrays) {
			length += array.length;
		}

		double[] newArray = new double[length];

		int previousLength = 0;

		for (double[] array : arrays) {
			System.arraycopy(array, 0, newArray, previousLength, array.length);

			previousLength += array.length;
		}

		return newArray;
	}

	public static double[] append(double[] array, double value) {
		double[] newArray = new double[array.length + 1];

		System.arraycopy(array, 0, newArray, 0, array.length);

		newArray[newArray.length - 1] = value;

		return newArray;
	}

	public static float[] append(float[]... arrays) {
		int length = 0;

		for (float[] array : arrays) {
			length += array.length;
		}

		float[] newArray = new float[length];

		int previousLength = 0;

		for (float[] array : arrays) {
			System.arraycopy(array, 0, newArray, previousLength, array.length);

			previousLength += array.length;
		}

		return newArray;
	}

	public static float[] append(float[] array, float value) {
		float[] newArray = new float[array.length + 1];

		System.arraycopy(array, 0, newArray, 0, array.length);

		newArray[newArray.length - 1] = value;

		return newArray;
	}

	public static int[] append(int[]... arrays) {
		int length = 0;

		for (int[] array : arrays) {
			length += array.length;
		}

		int[] newArray = new int[length];

		int previousLength = 0;

		for (int[] array : arrays) {
			System.arraycopy(array, 0, newArray, previousLength, array.length);

			previousLength += array.length;
		}

		return newArray;
	}

	public static int[] append(int[] array, int value) {
		int[] newArray = new int[array.length + 1];

		System.arraycopy(array, 0, newArray, 0, array.length);

		newArray[newArray.length - 1] = value;

		return newArray;
	}

	public static long[] append(long[]... arrays) {
		int length = 0;

		for (long[] array : arrays) {
			length += array.length;
		}

		long[] newArray = new long[length];

		int previousLength = 0;

		for (long[] array : arrays) {
			System.arraycopy(array, 0, newArray, previousLength, array.length);

			previousLength += array.length;
		}

		return newArray;
	}

	public static long[] append(long[] array, long value) {
		long[] newArray = new long[array.length + 1];

		System.arraycopy(array, 0, newArray, 0, array.length);

		newArray[newArray.length - 1] = value;

		return newArray;
	}

	public static short[] append(short[]... arrays) {
		int length = 0;

		for (short[] array : arrays) {
			length += array.length;
		}

		short[] newArray = new short[length];

		int previousLength = 0;

		for (short[] array : arrays) {
			System.arraycopy(array, 0, newArray, previousLength, array.length);

			previousLength += array.length;
		}

		return newArray;
	}

	public static short[] append(short[] array, short value) {
		short[] newArray = new short[array.length + 1];

		System.arraycopy(array, 0, newArray, 0, array.length);

		newArray[newArray.length - 1] = value;

		return newArray;
	}

	public static <T> T[] append(T[]... arrays) {
		int length = 0;

		for (T[] array : arrays) {
			length += array.length;
		}

		Class<?> arraysClass = arrays.getClass();

		T[] newArray = (T[])Array.newInstance(
			arraysClass.getComponentType(), length);

		int previousLength = 0;

		for (T[] array : arrays) {
			System.arraycopy(array, 0, newArray, previousLength, array.length);

			previousLength += array.length;
		}

		return newArray;
	}

	public static <T> T[] append(T[] array, T value) {
		Class<?> arrayClass = array.getClass();

		T[] newArray = (T[])Array.newInstance(
			arrayClass.getComponentType(), array.length + 1);

		System.arraycopy(array, 0, newArray, 0, array.length);

		newArray[array.length] = value;

		return newArray;
	}

	public static <T> T[] append(T[] array1, T[] array2) {
		Class<?> array1Class = array1.getClass();

		T[] newArray = (T[])Array.newInstance(
			array1Class.getComponentType(), array1.length + array2.length);

		System.arraycopy(array1, 0, newArray, 0, array1.length);

		System.arraycopy(array2, 0, newArray, array1.length, array2.length);

		return newArray;
	}

	public static <T> T[][] append(T[][] array1, T[] value) {
		Class<?> array1Class = array1.getClass();

		T[][] newArray = (T[][])Array.newInstance(
			array1Class.getComponentType(), array1.length + 1);

		System.arraycopy(array1, 0, newArray, 0, array1.length);

		newArray[array1.length] = value;

		return newArray;
	}

	public static <T> T[][] append(T[][] array1, T[][] array2) {
		Class<?> array1Class = array1.getClass();

		T[][] newArray = (T[][])Array.newInstance(
			array1Class.getComponentType(), array1.length + array2.length);

		System.arraycopy(array1, 0, newArray, 0, array1.length);
		System.arraycopy(array2, 0, newArray, array1.length, array2.length);

		return newArray;
	}

	public static boolean[] clone(boolean[] array) {
		boolean[] newArray = new boolean[array.length];

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static byte[] clone(byte[] array) {
		byte[] newArray = new byte[array.length];

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static char[] clone(char[] array) {
		char[] newArray = new char[array.length];

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static double[] clone(double[] array) {
		double[] newArray = new double[array.length];

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static float[] clone(float[] array) {
		float[] newArray = new float[array.length];

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static int[] clone(int[] array) {
		int[] newArray = new int[array.length];

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static long[] clone(long[] array) {
		long[] newArray = new long[array.length];

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static short[] clone(short[] array) {
		short[] newArray = new short[array.length];

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static <T> T[] clone(T[] array) {
		Class<?> arrayClass = array.getClass();

		T[] newArray = (T[])Array.newInstance(
			arrayClass.getComponentType(), array.length + 1);

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static <T> T[][] clone(T[][] array) {
		Class<?> arrayClass = array.getClass();

		T[][] newArray = (T[][])Array.newInstance(
			arrayClass.getComponentType(), array.length + 1);

		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static void combine(
		Object[] array1, Object[] array2, Object[] combinedArray) {

		System.arraycopy(array1, 0, combinedArray, 0, array1.length);

		System.arraycopy(
			array2, 0, combinedArray, array1.length, array2.length);
	}

	public static boolean contains(boolean[] array, boolean value) {
		if ((array == null) || (array.length == 0)) {
			return false;
		}
		else {
			for (int i = 0; i < array.length; i++) {
				if (value == array[i]) {
					return true;
				}
			}

			return false;
		}
	}

	public static boolean contains(byte[] array, byte value) {
		if ((array == null) || (array.length == 0)) {
			return false;
		}
		else {
			for (int i = 0; i < array.length; i++) {
				if (value == array[i]) {
					return true;
				}
			}

			return false;
		}
	}

	public static boolean contains(char[] array, char value) {
		if ((array == null) || (array.length == 0)) {
			return false;
		}
		else {
			for (int i = 0; i < array.length; i++) {
				if (value == array[i]) {
					return true;
				}
			}

			return false;
		}
	}

	public static boolean contains(double[] array, double value) {
		if ((array == null) || (array.length == 0)) {
			return false;
		}
		else {
			for (int i = 0; i < array.length; i++) {
				if (value == array[i]) {
					return true;
				}
			}

			return false;
		}
	}

	public static boolean contains(int[] array, int value) {
		if ((array == null) || (array.length == 0)) {
			return false;
		}
		else {
			for (int i = 0; i < array.length; i++) {
				if (value == array[i]) {
					return true;
				}
			}

			return false;
		}
	}

	public static boolean contains(long[] array, long value) {
		if ((array == null) || (array.length == 0)) {
			return false;
		}
		else {
			for (int i = 0; i < array.length; i++) {
				if (value == array[i]) {
					return true;
				}
			}

			return false;
		}
	}

	public static boolean contains(Object[] array, Object value) {
		if ((array == null) || (array.length == 0) || (value == null)) {
			return false;
		}
		else {
			for (int i = 0; i < array.length; i++) {
				if (value.equals(array[i])) {
					return true;
				}
			}

			return false;
		}
	}

	public static boolean contains(short[] array, short value) {
		if ((array == null) || (array.length == 0)) {
			return false;
		}
		else {
			for (int i = 0; i < array.length; i++) {
				if (value == array[i]) {
					return true;
				}
			}

			return false;
		}
	}

	public static String[] distinct(String[] array) {
		return distinct(array, null);
	}

	public static String[] distinct(
		String[] array, Comparator<String> comparator) {

		if ((array == null) || (array.length == 0)) {
			return array;
		}

		Set<String> set = null;

		if (comparator == null) {
			set = new TreeSet<String>();
		}
		else {
			set = new TreeSet<String>(comparator);
		}

		for (int i = 0; i < array.length; i++) {
			String s = array[i];

			if (!set.contains(s)) {
				set.add(s);
			}
		}

		return set.toArray(new String[set.size()]);
	}

	public static int getLength(Object[] array) {
		if (array == null) {
			return 0;
		}
		else {
			return array.length;
		}
	}

	public static Object getValue(Object[] array, int pos) {
		if ((array == null) || (array.length <= pos)) {
			return null;
		}
		else {
			return array[pos];
		}
	}

	public static boolean[] remove(boolean[] array, boolean value) {
		List<Boolean> list = new ArrayList<Boolean>();

		for (int i = 0; i < array.length; i++) {
			if (value != array[i]) {
				list.add(new Boolean(array[i]));
			}
		}

		return toArray(list.toArray(new Boolean[list.size()]));
	}

	public static byte[] remove(byte[] array, byte value) {
		List<Byte> list = new ArrayList<Byte>();

		for (int i = 0; i < array.length; i++) {
			if (value != array[i]) {
				list.add(new Byte(array[i]));
			}
		}

		return toArray(list.toArray(new Byte[list.size()]));
	}

	public static char[] remove(char[] array, char value) {
		List<Character> list = new ArrayList<Character>();

		for (int i = 0; i < array.length; i++) {
			if (value != array[i]) {
				list.add(new Character(array[i]));
			}
		}

		return toArray(list.toArray(new Character[list.size()]));
	}

	public static double[] remove(double[] array, double value) {
		List<Double> list = new ArrayList<Double>();

		for (int i = 0; i < array.length; i++) {
			if (value != array[i]) {
				list.add(new Double(array[i]));
			}
		}

		return toArray(list.toArray(new Double[list.size()]));
	}

	public static int[] remove(int[] array, int value) {
		List<Integer> list = new ArrayList<Integer>();

		for (int i = 0; i < array.length; i++) {
			if (value != array[i]) {
				list.add(new Integer(array[i]));
			}
		}

		return toArray(list.toArray(new Integer[list.size()]));
	}

	public static long[] remove(long[] array, long value) {
		List<Long> list = new ArrayList<Long>();

		for (int i = 0; i < array.length; i++) {
			if (value != array[i]) {
				list.add(new Long(array[i]));
			}
		}

		return toArray(list.toArray(new Long[list.size()]));
	}

	public static short[] remove(short[] array, short value) {
		List<Short> list = new ArrayList<Short>();

		for (int i = 0; i < array.length; i++) {
			if (value != array[i]) {
				list.add(new Short(array[i]));
			}
		}

		return toArray(list.toArray(new Short[list.size()]));
	}

	public static String[] remove(String[] array, String value) {
		List<String> list = new ArrayList<String>();

		for (String s : array) {
			if (!s.equals(value)) {
				list.add(s);
			}
		}

		return list.toArray(new String[list.size()]);
	}

	public static String[] removeByPrefix(String[] array, String prefix) {
		List<String> list = new ArrayList<String>();

		for (String s : array) {
			if (!s.startsWith(prefix)) {
				list.add(s);
			}
		}

		return list.toArray(new String[list.size()]);
	}

	public static void reverse(String[] array) {
		for (int left = 0, right = array.length - 1; left < right;
				left++, right--) {

			String value = array[left];

			array[left] = array[right];
			array[right] = value;
		}
	}

	public static Boolean[] toArray(boolean[] array) {
		Boolean[] newArray = new Boolean[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = Boolean.valueOf(array[i]);
		}

		return newArray;
	}

	public static boolean[] toArray(Boolean[] array) {
		boolean[] newArray = new boolean[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = array[i].booleanValue();
		}

		return newArray;
	}

	public static Byte[] toArray(byte[] array) {
		Byte[] newArray = new Byte[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = Byte.valueOf(array[i]);
		}

		return newArray;
	}

	public static byte[] toArray(Byte[] array) {
		byte[] newArray = new byte[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = array[i].byteValue();
		}

		return newArray;
	}

	public static Character[] toArray(char[] array) {
		Character[] newArray = new Character[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = Character.valueOf(array[i]);
		}

		return newArray;
	}

	public static char[] toArray(Character[] array) {
		char[] newArray = new char[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = array[i].charValue();
		}

		return newArray;
	}

	public static Double[] toArray(double[] array) {
		Double[] newArray = new Double[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = new Double(array[i]);
		}

		return newArray;
	}

	public static double[] toArray(Double[] array) {
		double[] newArray = new double[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = array[i].doubleValue();
		}

		return newArray;
	}

	public static Float[] toArray(float[] array) {
		Float[] newArray = new Float[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = new Float(array[i]);
		}

		return newArray;
	}

	public static float[] toArray(Float[] array) {
		float[] newArray = new float[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = array[i].floatValue();
		}

		return newArray;
	}

	public static Integer[] toArray(int[] array) {
		Integer[] newArray = new Integer[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = new Integer(array[i]);
		}

		return newArray;
	}

	public static int[] toArray(Integer[] array) {
		int[] newArray = new int[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = array[i].intValue();
		}

		return newArray;
	}

	public static Long[] toArray(long[] array) {
		Long[] newArray = new Long[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = new Long(array[i]);
		}

		return newArray;
	}

	public static long[] toArray(Long[] array) {
		long[] newArray = new long[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = array[i].longValue();
		}

		return newArray;
	}

	public static Short[] toArray(short[] array) {
		Short[] newArray = new Short[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = new Short(array[i]);
		}

		return newArray;
	}

	public static short[] toArray(Short[] array) {
		short[] newArray = new short[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = array[i].shortValue();
		}

		return newArray;
	}

	public static String[] toStringArray(boolean[] array) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = String.valueOf(array[i]);
		}

		return newArray;
	}

	public static String[] toStringArray(byte[] array) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = String.valueOf(array[i]);
		}

		return newArray;
	}

	public static String[] toStringArray(char[] array) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = String.valueOf(array[i]);
		}

		return newArray;
	}

	public static String[] toStringArray(Date[] array, DateFormat df) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = df.format(array[i]);
		}

		return newArray;
	}

	public static String[] toStringArray(double[] array) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = String.valueOf(array[i]);
		}

		return newArray;
	}

	public static String[] toStringArray(float[] array) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = String.valueOf(array[i]);
		}

		return newArray;
	}

	public static String[] toStringArray(int[] array) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = String.valueOf(array[i]);
		}

		return newArray;
	}

	public static String[] toStringArray(long[] array) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = String.valueOf(array[i]);
		}

		return newArray;
	}

	public static String[] toStringArray(Object[] array) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = String.valueOf(array[i]);
		}

		return newArray;
	}

	public static String[] toStringArray(short[] array) {
		String[] newArray = new String[array.length];

		for (int i = 0; i < array.length; i++) {
			newArray[i] = String.valueOf(array[i]);
		}

		return newArray;
	}

}