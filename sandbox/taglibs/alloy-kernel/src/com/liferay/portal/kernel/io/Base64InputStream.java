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
import java.io.InputStream;

/**
 * @author Tina Tian
 */
public class Base64InputStream extends InputStream {

	public Base64InputStream(InputStream inputStream) {
		_inputStream = inputStream;
		_unitBufferIndex = 0;
		_avaiableBytes = 0;
		_unitBuffer = new byte[3];
	}

	public int available() throws IOException {
		return ((_inputStream.available() * 3) / 4) + _avaiableBytes;
	}

	public int read() throws IOException {
		if (_avaiableBytes == 0) {
			_avaiableBytes = decodeUnit(_unitBuffer, 0);

			if (_avaiableBytes <= 0) {
				return -1;
			}

			_unitBufferIndex = 0;
		}

		_avaiableBytes--;

		return _unitBuffer[_unitBufferIndex++] & 0xff;
	}

	public int read(byte[] buffer, int offset, int length) throws IOException {
		if ((length <= 0) || (offset < 0)) {
			return -1;
		}

		int initialLength = length;

		while ((_avaiableBytes > 0) && (length > 0)) {
			buffer[offset++] = _unitBuffer[_unitBufferIndex++];

			_avaiableBytes--;
			length--;
		}

		int bytesLength = length - (length % 3);

		while (bytesLength > 0) {
			int returnValue = decodeUnit(buffer, offset);

			if (returnValue > 0) {
				offset += returnValue;
				length -= returnValue;
			}

			if (returnValue < 3) {
				if (initialLength == length) {
					return -1;
				}

				return initialLength - length;
			}

			bytesLength -= 3;
		}

		while (length > 0) {
			int intValue = read();

			if (intValue == -1) {
				break;
			}

			buffer[offset++] = (byte)intValue;

			length--;
		}

		if (initialLength == length) {
			return -1;
		}

		return initialLength - length;
	}

	public long skip(long skip) throws IOException {
		long initialSkip = skip;

		while (skip > 0) {
			if (read() <= 0) {
				break;
			}

			skip--;
		}

		return initialSkip - skip;
	}

	protected int decode(
		byte[] bytes, byte[] outputBuffer, int position, int padNumber) {

		int intValue = 0;

		for(int next = 0; next < 4; next++) {
			intValue <<= 6;
			intValue |= bytes[next];
		}

		if (padNumber == 2) {
			intValue >>= 16;

			outputBuffer[position] = (byte)(intValue & 0xff);

			return 1;
		}
		else if (padNumber == 1) {
			intValue >>= 8;

			outputBuffer[position + 1] = (byte)(intValue & 0xff);

			intValue >>= 8;

			outputBuffer[position] = (byte)(intValue & 0xff);

			return 2;
		}
		else if (padNumber == 0) {
			outputBuffer[position + 2] = (byte)(intValue & 0xff);

			intValue >>= 8;

			outputBuffer[position + 1] = (byte)(intValue & 0xff);

			intValue >>= 8;

			outputBuffer[position] = (byte)(intValue & 0xff);

			return 3;
		}
		else {
			return -1;
		}
	}

	protected int decodeUnit(byte[] outputBuffer, int position)
		throws IOException {

		int intValue = -1;
		int padNumber = 0;
		int count = 0;
		byte[] decodeUnitBuffer = new byte[4];

		while (count < 4) {
			intValue = getEncodedByte();

			if (intValue == -1) {
				return -1;
			}

			if (intValue == -2) {
				if (count < 2) {
					return -1;
				}

				padNumber++;
				count++;

				while (count < 4) {
					intValue = getEncodedByte();

					if (intValue != -2) {
						return -1;
					}

					padNumber++;
					count++;
				}

				int returnValue = decode(
					decodeUnitBuffer, outputBuffer, position, padNumber);

				return returnValue;
			}

			decodeUnitBuffer[count++] = (byte)intValue;
		}

		return decode(decodeUnitBuffer, outputBuffer, position, padNumber);
	}

	protected int getByte(char character) {
		if ((character >= CharPool.UPPER_CASE_A) &&
			(character <= CharPool.UPPER_CASE_Z)) {

			return character - 65;
		}

		if ((character >= CharPool.LOWER_CASE_A) &&
			(character <= CharPool.LOWER_CASE_Z)) {

			return (character - 97) + 26;
		}

		if ((character >= CharPool.NUMBER_0) &&
			(character <= CharPool.NUMBER_9)) {

			return (character - 48) + 52;
		}

		if (character == CharPool.PLUS) {
			return 62;
		}

		if (character == CharPool.SLASH) {
			return 63;
		}

		if (character != CharPool.EQUAL) {
			return -1;
		}
		else {
			return 0;
		}
	}

	protected int getEncodedByte() throws IOException {
		while (true) {
			int returnValue = _inputStream.read();

			if (returnValue == -1) {
				return -1;
			}

			char character = (char)(returnValue & 0xff);

			if (character == CharPool.EQUAL) {
				return -2;
			}

			int byteValue = getByte(character);

			if (byteValue == -1) {
				continue;
			}

			return byteValue;
		}
	}

	private int _avaiableBytes;
	private InputStream _inputStream;
	private byte[] _unitBuffer;
	private int _unitBufferIndex;

}