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

package com.liferay.portal.kernel.io;

import com.liferay.portal.kernel.nio.charset.CharsetEncoderUtil;
import com.liferay.portal.kernel.util.StringPool;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.CharsetEncoder;

/**
 * @author Shuyang Zhou
 */
public class OutputStreamWriter extends Writer {

	public OutputStreamWriter(OutputStream outputStream) {
		this(outputStream, StringPool.UTF8);
	}

	public OutputStreamWriter(OutputStream outputStream, String charsetName) {
		_outputStream = outputStream;
		_charsetName = charsetName;
		_charsetEncoder = CharsetEncoderUtil.getCharsetEncoder(charsetName);
	}

	public void close() throws IOException {
		_outputStream.close();
	}

	public void flush() throws IOException {
		_outputStream.flush();
	}

	public String getEncoding() {
		return _charsetName;
	}

	public void write(char[] charArray, int offset, int length)
		throws IOException {

		ByteBuffer byteBuffer = _charsetEncoder.encode(
			CharBuffer.wrap(charArray, offset, length));

		_outputStream.write(byteBuffer.array(), 0, byteBuffer.limit());
	}

	public void write(int c) throws IOException {
		ByteBuffer byteBuffer = _charsetEncoder.encode(
			CharBuffer.wrap(new char[] {(char)c}));

		_outputStream.write(byteBuffer.array(), 0, byteBuffer.limit());
	}

	public void write(String string, int offset, int length)
		throws IOException {

		ByteBuffer byteBuffer = _charsetEncoder.encode(
			CharBuffer.wrap(string, offset, length));

		_outputStream.write(byteBuffer.array(), 0, byteBuffer.limit());
	}

	private CharsetEncoder _charsetEncoder;
	private String _charsetName;
	private OutputStream _outputStream;

}