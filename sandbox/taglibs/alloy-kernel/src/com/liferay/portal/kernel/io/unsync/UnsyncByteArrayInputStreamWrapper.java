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

import javax.servlet.ServletInputStream;

/**
 * @author Brian Wing Shun Chan
 */
public class UnsyncByteArrayInputStreamWrapper extends ServletInputStream {

	public UnsyncByteArrayInputStreamWrapper(
		UnsyncByteArrayInputStream unsyncByteArrayInputStream) {

		_unsyncByteArrayInputStream = unsyncByteArrayInputStream;
	}

	public int available() {
		return _unsyncByteArrayInputStream.available();
	}

	public void close() throws IOException {
		_unsyncByteArrayInputStream.close();
	}

	public void mark(int readLimit) {
		_unsyncByteArrayInputStream.mark(readLimit);
	}

	public boolean markSupported() {
		return _unsyncByteArrayInputStream.markSupported();
	}

	public int read() {
		return _unsyncByteArrayInputStream.read();
	}

	public int read(byte[] byteArray) {
		return _unsyncByteArrayInputStream.read(byteArray);
	}

	public int read(byte[] byteArray, int offset, int length) {
		return _unsyncByteArrayInputStream.read(byteArray, offset, length);
	}

	public int readLine(byte[] byteArray, int offset, int length) {
		return _unsyncByteArrayInputStream.read(byteArray, offset, length);
	}

	public void reset() {
		_unsyncByteArrayInputStream.reset();
	}

	public long skip(long skip) {
		return _unsyncByteArrayInputStream.skip(skip);
	}

	private UnsyncByteArrayInputStream _unsyncByteArrayInputStream;

}