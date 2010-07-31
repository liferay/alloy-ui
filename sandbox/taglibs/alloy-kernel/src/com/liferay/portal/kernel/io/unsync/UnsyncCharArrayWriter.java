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

package com.liferay.portal.kernel.io.unsync;

import com.liferay.portal.kernel.nio.charset.CharsetEncoderUtil;
import com.liferay.portal.kernel.util.StringPool;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;

/**
 * @author Shuyang Zhou
 */
public class UnsyncCharArrayWriter extends Writer {

	public UnsyncCharArrayWriter() {
		this(32);
	}

	public UnsyncCharArrayWriter(int initialSize) {
		buffer = new char[initialSize];
	}

	public Writer append(char c) {
		write(c);

		return this;
	}

	public Writer append(CharSequence charSequence) {
		String string = null;

		if (charSequence == null) {
			string = StringPool.NULL;
		}
		else {
			string = charSequence.toString();
		}

		write(string, 0, string.length());

		return this;
	}

	public Writer append(CharSequence charSequence, int start, int end) {
		String string = null;

		if (charSequence == null) {
			string = StringPool.NULL;
		}
		else {
			string = charSequence.subSequence(start, end).toString();
		}

		write(string, 0, string.length());

		return this;
	}

	public void close() {
	}

	public void flush() {
	}

	public void reset() {
		index = 0;
	}

	public int size() {
		return index;
	}

	public CharBuffer toCharBuffer() {
		return CharBuffer.wrap(buffer, 0, index);
	}

	public String toString() {
		return new String(buffer, 0, index);
	}

	public void write(char[] charArray) {
		write(charArray, 0, charArray.length);
	}

	public void write(char[] charArray, int offset, int length) {
		if (length <= 0) {
			return;
		}

		int newIndex = index + length;

		if (newIndex > buffer.length) {
			int newBufferSize = Math.max(buffer.length << 1, newIndex);

			char[] newBuffer = new char[newBufferSize];

			System.arraycopy(buffer, 0, newBuffer, 0, index);

			buffer = newBuffer;
		}

		System.arraycopy(charArray, offset, buffer, index, length);

		index = newIndex;
	}

	public void write(int c) {
		int newIndex = index + 1;

		if (newIndex > buffer.length) {
			int newBufferSize = Math.max(buffer.length << 1, newIndex);

			char[] newBuffer = new char[newBufferSize];

			System.arraycopy(buffer, 0, newBuffer, 0, buffer.length);

			buffer = newBuffer;
		}

		buffer[index] = (char)c;

		index = newIndex;
	}

	public void write(String string) {
		write(string, 0, string.length());
	}

	public void write(String string, int offset, int length) {
		if (length <= 0) {
			return;
		}

		int newIndex = index + length;

		if (newIndex > buffer.length) {
			int newBufferSize = Math.max(buffer.length << 1, newIndex);

			char[] newBuffer = new char[newBufferSize];

			System.arraycopy(buffer, 0, newBuffer, 0, index);

			buffer = newBuffer;
		}

		string.getChars(offset, offset + length, buffer, index);

		index = newIndex;
	}

	public int writeTo(CharBuffer charBuffer) {
		int length = charBuffer.remaining();

		if (length > index) {
			length = index;
		}

		if (length == 0) {
			return 0;
		}

		charBuffer.put(buffer, 0, length);

		return length;
	}

	public int writeTo(OutputStream outputStream, String charsetName)
		throws IOException {

		ByteBuffer byteBuffer = CharsetEncoderUtil.encode(
			charsetName, buffer, 0, index);

		int length = byteBuffer.limit();

		outputStream.write(byteBuffer.array(), 0, length);

		return length;
	}

	public int writeTo(Writer writer) throws IOException {
		writer.write(buffer, 0, index);

		return index;
	}

	protected char[] buffer;
	protected int index;

}