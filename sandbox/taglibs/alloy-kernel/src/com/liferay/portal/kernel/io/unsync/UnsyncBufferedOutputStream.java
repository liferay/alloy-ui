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

import java.io.IOException;
import java.io.OutputStream;

/**
 * <p>
 * See http://issues.liferay.com/browse/LPS-6648.
 * </p>
 *
 * @author Shuyang Zhou
 */
public class UnsyncBufferedOutputStream extends UnsyncFilterOutputStream {

	public UnsyncBufferedOutputStream(OutputStream outputStream) {
		this(outputStream, _DEFAULT_BUFFER_SIZE);
	}

	public UnsyncBufferedOutputStream(OutputStream outputStream, int size) {
		super(outputStream);

		buffer = new byte[size];
	}

	public void flush() throws IOException {
		if (count > 0) {
			outputStream.write(buffer, 0, count);

			count = 0;
		}

		outputStream.flush();
	}

	public void write(byte[] byteArray, int offset, int length)
		throws IOException {

		if (length >= buffer.length) {
			if (count > 0) {
				outputStream.write(buffer, 0, count);

				count = 0;
			}

			outputStream.write(byteArray, offset, length);

			return;
		}

		if (count > 0 && length > buffer.length - count) {
			outputStream.write(buffer, 0, count);

			count = 0;
		}

		System.arraycopy(byteArray, offset, buffer, count, length);

		count += length;
	}

	public void write(byte[] byteArray) throws IOException {
		write(byteArray, 0, byteArray.length);
	}

	public void write(int b) throws IOException {
		if (count >= buffer.length) {
			outputStream.write(buffer, 0, count);

			count = 0;
		}

		buffer[count++] = (byte)b;
	}

	protected byte[] buffer;
	protected int count;

	private static int _DEFAULT_BUFFER_SIZE = 8192;

}