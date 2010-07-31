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

import java.io.InputStream;

/**
 * <p>
 * See http://issues.liferay.com/browse/LPS-6648.
 * </p>
 *
 * @author Shuyang Zhou
 */
public class UnsyncByteArrayInputStream extends InputStream {

	public UnsyncByteArrayInputStream(byte[] buffer) {
		this.buffer = buffer;
		this.index = 0;
		this.capacity = buffer.length;
	}

	public UnsyncByteArrayInputStream(byte[] buffer, int offset, int length) {
		this.buffer = buffer;
		this.index = offset;
		this.capacity = Math.min(buffer.length, offset + length);
		this.markIndex = offset;
	}

	public int available() {
		return capacity - index;
	}

	public void mark(int readAheadLimit) {
		markIndex = index;
	}

	public boolean markSupported() {
		return true;
	}

	public int read() {
		if (index < capacity) {
			return buffer[index++] & 0xff;
		}
		else {
			return -1;
		}
	}

	public int read(byte[] byteArray) {
		return read(byteArray, 0, byteArray.length);
	}

	public int read(byte[] byteArray, int offset, int length) {
		if (length <= 0) {
			return 0;
		}

		if (index >= capacity) {
			return -1;
		}

		int read = length;

		if ((index + read) > capacity) {
			read = capacity - index;
		}

		System.arraycopy(buffer, index, byteArray, offset, read);

		index += read;

		return read;
	}

	public void reset() {
		index = markIndex;
	}

	public long skip(long skip) {
		if (skip < 0) {
			return 0;
		}

		if ((skip + index) > capacity) {
			skip = capacity - index;
		}

		index += skip;

		return skip;
	}

	protected byte[] buffer;
	protected int capacity;
	protected int index;
	protected int markIndex;

}