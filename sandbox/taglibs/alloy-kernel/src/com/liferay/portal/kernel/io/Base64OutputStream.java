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

import com.liferay.portal.kernel.util.CharPool;

import java.io.IOException;
import java.io.OutputStream;

/**
 * @author Tina Tian
 */
public class Base64OutputStream extends OutputStream {

	public Base64OutputStream(OutputStream outputStream) {
		_outputStream = outputStream;
		_unitBuffer = new byte[3];
		_unitBufferIndex = 0;
		_outputBuffer = new byte[4];
	}

	public void close() throws IOException {
		flush();

		_outputStream.close();
	}

	public void flush() throws IOException {
		if (_unitBufferIndex == 1) {
			encodeUnit(_unitBuffer[0]);
		}
		else if (_unitBufferIndex == 2) {
			encodeUnit(_unitBuffer[0], _unitBuffer[1]);
		}

		_unitBufferIndex = 0;

		_outputStream.flush();
	}

	public void write(byte[] bytes) throws IOException {
		write(bytes, 0, bytes.length);
	}

	public void write(byte[] bytes, int offset, int length) throws IOException {
		if (length <= 0) {
			return;
		}

		while ((_unitBufferIndex != 0) && (length > 0)) {
			write(bytes[offset++]);

			length--;
		}

		if (length <= 0) {
			return;
		}

		int bytesLength = length - (length % 3);

		length -= bytesLength;

		while (bytesLength > 0) {
			encodeUnit(bytes[offset], bytes[offset + 1], bytes[offset + 2]);

			bytesLength -=3 ;
			offset += 3;
		}

		while (length > 0) {
			write(bytes[offset++]);

			length--;
		}
	}

	public void write(int byteValue) throws IOException {
		_unitBuffer[_unitBufferIndex++] = (byte)byteValue;

		if (_unitBufferIndex == 3) {
			encodeUnit(_unitBuffer[0], _unitBuffer[1], _unitBuffer[2]);

			_unitBufferIndex = 0;
		}
	}

	protected void encodeUnit(byte byteValue) throws IOException {
		int intValue = byteValue & 0xff;

		intValue <<= 4;

		_outputBuffer[3] = (byte)CharPool.EQUAL;
		_outputBuffer[2] = (byte)CharPool.EQUAL;
		_outputBuffer[1] = (byte)getChar(intValue & 0x3f);

		intValue >>= 6;

		_outputBuffer[0] = (byte)getChar(intValue & 0x3f);

		_outputStream.write(_outputBuffer);
	}

	protected void encodeUnit(byte byte1, byte byte2) throws IOException {
		int intValue = byte1 & 0xff;

		intValue <<= 8;
		intValue |= byte2 & 0xff;
		intValue <<= 2;

		_outputBuffer[3] = (byte)CharPool.EQUAL;
		_outputBuffer[2] = (byte)getChar(intValue & 0x3f);

		intValue >>= 6;

		_outputBuffer[1] = (byte)getChar(intValue & 0x3f);

		intValue >>= 6;

		_outputBuffer[0] = (byte)getChar(intValue & 0x3f);

		_outputStream.write(_outputBuffer);
	}

	protected void encodeUnit(byte byte1, byte byte2, byte byte3)
		throws IOException {

		int intVallue = byte1 & 0xff;

		intVallue <<= 8;
		intVallue |= byte2 & 0xff;
		intVallue <<= 8;
		intVallue |= byte3 & 0xff;

		_outputBuffer[3] = (byte)getChar(intVallue & 0x3f);

		intVallue >>= 6;

		_outputBuffer[2] = (byte)getChar(intVallue & 0x3f);

		intVallue >>= 6;

		_outputBuffer[1] = (byte)getChar(intVallue & 0x3f);

		intVallue >>= 6;

		_outputBuffer[0] = (byte)getChar(intVallue & 0x3f);

		_outputStream.write(_outputBuffer);
	}

	protected char getChar(int sixbit) {
		if (sixbit >= 0 && sixbit <= 25) {
			return (char)(65 + sixbit);
		}

		if (sixbit >= 26 && sixbit <= 51) {
			return (char)(97 + (sixbit - 26));
		}

		if (sixbit >= 52 && sixbit <= 61) {
			return (char)(48 + (sixbit - 52));
		}

		if (sixbit == 62) {
			return CharPool.PLUS;
		}

		if (sixbit != 63) {
			return CharPool.QUESTION;
		}
		else {
			return CharPool.SLASH;
		}
	}

	private byte[] _outputBuffer;
	private OutputStream _outputStream;
	private byte[] _unitBuffer;
	private int _unitBufferIndex;

}