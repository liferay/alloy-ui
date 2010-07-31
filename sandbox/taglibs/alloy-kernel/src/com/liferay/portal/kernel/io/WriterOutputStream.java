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

import com.liferay.portal.kernel.nio.charset.CharsetDecoderUtil;
import com.liferay.portal.kernel.util.StringPool;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CoderResult;

/**
 * @author Shuyang Zhou
 */
public class WriterOutputStream extends OutputStream {

	public WriterOutputStream(Writer writer) {
		this(
			writer, StringPool.UTF8, _DEFAULT_INTPUT_BUFFER_SIZE,
			_DEFAULT_OUTPUT_BUFFER_SIZE, false);
	}

	public WriterOutputStream(Writer writer, String charsetName) {
		this(
			writer, charsetName, _DEFAULT_INTPUT_BUFFER_SIZE,
			_DEFAULT_OUTPUT_BUFFER_SIZE, false);
	}

	public WriterOutputStream(
		Writer writer, String charsetName, boolean autoFlush) {

		this(
			writer, charsetName, _DEFAULT_INTPUT_BUFFER_SIZE,
			_DEFAULT_OUTPUT_BUFFER_SIZE, autoFlush);
	}

	public WriterOutputStream(
		Writer writer, String charsetName, int inputBufferSize,
		int outputBufferSize) {

		this(writer, charsetName, inputBufferSize, outputBufferSize, false);
	}

	public WriterOutputStream(
		Writer writer, String charsetName, int inputBufferSize,
		int outputBufferSize, boolean autoFlush) {

		if (inputBufferSize < 4) {
			throw new IllegalArgumentException(
				"Input buffer size " + inputBufferSize + " is less than 4");
		}

		if (outputBufferSize <= 0) {
			throw new IllegalArgumentException(
				"Output buffer size " + outputBufferSize +
					" must be a positive number");
		}

		_writer = writer;
		_charsetName = charsetName;
		_charsetDecoder = CharsetDecoderUtil.getCharsetDecoder(charsetName);
		_inputBuffer = ByteBuffer.allocate(inputBufferSize);
		_outputBuffer = CharBuffer.allocate(outputBufferSize);
		_autoFlush = autoFlush;
	}

	public void close() throws IOException {
		_doDecode(true);
		_doFlush();

		_writer.close();
	}

	public void flush() throws IOException {
		_doFlush();

		_writer.flush();
	}

	public String getEncoding() {
		return _charsetName;
	}

	public void write(byte[] byteArray) throws IOException {
		write(byteArray, 0, byteArray.length);
	}

	public void write(byte[] byteArray, int offset, int length)
		throws IOException {

		while (length > 0) {
			int blockSize = Math.min(length, _inputBuffer.remaining());

			_inputBuffer.put(byteArray, offset, blockSize);

			_doDecode(false);

			length -= blockSize;
			offset += blockSize;
		}

		if (_autoFlush) {
			_doFlush();
		}
	}

	public void write(int b) throws IOException {
		write(new byte[] {(byte)b}, 0, 1);
	}

	private void _doDecode(boolean endOfInput) throws IOException {
		_inputBuffer.flip();

		while (true) {
			CoderResult coderResult = _charsetDecoder.decode(
				_inputBuffer, _outputBuffer, endOfInput);

			if (coderResult.isOverflow()) {
				_doFlush();
			}
			else if (coderResult.isUnderflow()) {
				break;
			}
			else {
				throw new IOException("Unexcepted coder result " + coderResult);
			}
		}

		_inputBuffer.compact();
	}

	private void _doFlush() throws IOException {
		if (_outputBuffer.position() > 0) {
			_writer.write(_outputBuffer.array(), 0, _outputBuffer.position());

			_outputBuffer.rewind();
		}
	}

	private static final int _DEFAULT_INTPUT_BUFFER_SIZE = 128;

	private static final int _DEFAULT_OUTPUT_BUFFER_SIZE = 1024;

	private boolean _autoFlush;
	private CharsetDecoder _charsetDecoder;
	private String _charsetName;
	private ByteBuffer _inputBuffer;
	private CharBuffer _outputBuffer;
	private Writer _writer;

}