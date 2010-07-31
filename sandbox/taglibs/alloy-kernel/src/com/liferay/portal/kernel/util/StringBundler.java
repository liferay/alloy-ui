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

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;

import java.io.IOException;
import java.io.Writer;

import java.lang.reflect.Constructor;

/**
 * <p>
 * See http://issues.liferay.com/browse/LPS-6072.
 * </p>
 *
 * @author Shuyang Zhou
 * @author Brian Wing Shun Chan
 */
public class StringBundler {

	public static final int UNSAFE_CREATE_THRESHOLD = GetterUtil.getInteger(
		System.getProperty(
			StringBundler.class.getName() + ".unsafe.create.threshold"));

	public StringBundler() {
		_array = new String[_DEFAULT_ARRAY_CAPACITY];
	}

	public StringBundler(int initialCapacity) {
		if (initialCapacity <= 0) {
			throw new IllegalArgumentException();
		}

		_array = new String[initialCapacity];
	}

	public StringBundler(String s) {
		_array = new String[_DEFAULT_ARRAY_CAPACITY];

		_array[0] = s;

		_arrayIndex = 1;
	}

	public StringBundler(String[] stringArray) {
		this(stringArray, 0);
	}

	public StringBundler(String[] stringArray, int extraSpace) {
		_array = new String[stringArray.length + extraSpace];

		for (int i = 0; i < stringArray.length; i++) {
			String s = stringArray[i];

			if ((s != null) && (s.length() > 0)) {
				_array[_arrayIndex++] = s;
			}
		}
	}

	public StringBundler append(boolean b) {
		if (b) {
			return append(_TRUE);
		}
		else {
			return append(_FALSE);
		}
	}

	public StringBundler append(char c) {
		return append(String.valueOf(c));
	}

	public StringBundler append(char[] charArray) {
		if (charArray == null) {
			return append("null");
		}
		else {
			return append(new String(charArray));
		}
	}

	public StringBundler append(double d) {
		return append(Double.toString(d));
	}

	public StringBundler append(float f) {
		return append(Float.toString(f));
	}

	public StringBundler append(int i) {
		return append(Integer.toString(i));
	}

	public StringBundler append(long l) {
		return append(Long.toString(l));
	}

	public StringBundler append(Object obj) {
		return append(String.valueOf(obj));
	}

	public StringBundler append(String s) {
		if (s == null) {
			s = StringPool.NULL;
		}

		if (s.length() == 0) {
			return this;
		}

		if (_arrayIndex >= _array.length) {
			expandCapacity(_array.length * 2);
		}

		_array[_arrayIndex++] = s;

		return this;
	}

	public StringBundler append(String[] stringArray) {
		if ((stringArray == null) || (stringArray.length == 0)) {
			return this;
		}

		if ((_array.length - _arrayIndex) < stringArray.length) {
			expandCapacity((_array.length + stringArray.length) * 2);
		}

		for (int i = 0; i < stringArray.length; i++) {
			String s = stringArray[i];

			if ((s != null) && (s.length() > 0)) {
				_array[_arrayIndex++] = s;
			}
		}

		return this;
	}

	public StringBundler append(StringBundler sb) {
		if ((sb == null) || (sb._arrayIndex == 0)) {
			return this;
		}

		if ((_array.length - _arrayIndex) < sb._arrayIndex) {
			expandCapacity((_array.length + sb._arrayIndex) * 2);
		}

		System.arraycopy(sb._array, 0, _array, _arrayIndex, sb._arrayIndex);

		_arrayIndex += sb._arrayIndex;

		return this;
	}

	public int capacity() {
		return _array.length;
	}

	public int index() {
		return _arrayIndex;
	}

	public int length() {
		int length = 0;

		for (int i = 0; i < _arrayIndex; i++) {
			length += _array[i].length();
		}

		return length;
	}

	public void setIndex(int newIndex) {
		if (newIndex < 0) {
			throw new ArrayIndexOutOfBoundsException(newIndex);
		}

		if (newIndex > _array.length) {
			String[] newArray = new String[newIndex];

			System.arraycopy(_array, 0, newArray, 0, _arrayIndex);

			_array = newArray;
		}

		if (_arrayIndex < newIndex) {
			for (int i = _arrayIndex; i < newIndex; i++) {
				_array[i] = StringPool.BLANK;
			}
		}

		if (_arrayIndex > newIndex) {
			for (int i = newIndex; i < _arrayIndex; i++) {
				_array[i] = null;
			}
		}

		_arrayIndex = newIndex;
	}

	public void setStringAt(String s, int index) {
		if ((index < 0) || (index >= _arrayIndex)) {
			throw new ArrayIndexOutOfBoundsException(index);
		}

		_array[index] = s;
	}

	public String stringAt(int index) {
		if ((index < 0) || (index >= _arrayIndex)) {
			throw new ArrayIndexOutOfBoundsException(index);
		}

		return _array[index];
	}

	public String toString() {
		if (_arrayIndex == 0) {
			return StringPool.BLANK;
		}

		if (_arrayIndex == 1) {
			return _array[0];
		}

		if (_arrayIndex == 2) {
			return _array[0].concat(_array[1]);
		}

		int length = 0;

		for (int i = 0; i < _arrayIndex; i++) {
			length += _array[i].length();
		}

		if ((_unsafeStringConstructor != null) &&
			(length >= UNSAFE_CREATE_THRESHOLD)) {

			return unsafeCreate(_array, _arrayIndex, length);
		}
		else if (_arrayIndex == 3) {
			return _array[0].concat(_array[1]).concat(_array[2]);
		}
		else {
			return safeCreate(_array, _arrayIndex, length);
		}
	}

	public void writeTo(Writer writer) throws IOException {
		for (int i = 0; i < _arrayIndex; i++) {
			writer.write(_array[i]);
		}
	}

	protected void expandCapacity(int newCapacity) {
		String[] newArray = new String[newCapacity];

		System.arraycopy(_array, 0, newArray, 0, _arrayIndex);

		_array = newArray;
	}

	protected String safeCreate(String[] array, int index, int length) {
		StringBuilder sb = new StringBuilder(length);

		for (int i = 0; i < index; i++) {
			sb.append(array[i]);
		}

		return sb.toString();
	}

	protected String unsafeCreate(String[] array, int index, int length) {
		char[] charArray = new char[length];

		int offset = 0;

		for (int i = 0; i < index; i++) {
			String s = array[i];

			s.getChars(0, s.length(), charArray, offset);

			offset += s.length();
		}

		try {
			return _unsafeStringConstructor.newInstance(0, length, charArray);
		}
		catch (Exception e) {
			throw new IllegalStateException(e);
		}
	}

	private static final int _DEFAULT_ARRAY_CAPACITY = 16;

	private static final String _FALSE = "false";

	private static final String _TRUE = "true";

	private static Log _log = LogFactoryUtil.getLog(StringBundler.class);

	private static Constructor<String> _unsafeStringConstructor;

	static {
		if (UNSAFE_CREATE_THRESHOLD > 0) {
			try {
				_unsafeStringConstructor = String.class.getDeclaredConstructor(
					int.class, int.class, char[].class);

				_unsafeStringConstructor.setAccessible(true);
			}
			catch (Exception e) {
				_log.error(e, e);
			}
		}
	}

	private String[] _array;
	private int _arrayIndex;

}