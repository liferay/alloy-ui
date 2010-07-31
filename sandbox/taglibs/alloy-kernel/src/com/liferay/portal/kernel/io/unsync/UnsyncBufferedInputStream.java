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
import java.io.InputStream;

/**
 * <p>
 * See http://issues.liferay.com/browse/LPS-6648.
 * </p>
 *
 * @author Shuyang Zhou
 */
public class UnsyncBufferedInputStream extends UnsyncFilterInputStream {

	public UnsyncBufferedInputStream(InputStream inputStream) {
		this(inputStream, _DEFAULT_BUFFER_SIZE);
	}

	public UnsyncBufferedInputStream(InputStream inputStream, int size) {
		super(inputStream);

		buffer = new byte[size];
	}

	public int available() throws IOException {
		if (inputStream == null) {
			throw new IOException("Input stream is null");
		}

		return inputStream.available() + (firstInvalidIndex - index);
	}

	public void close() throws IOException {
		if (inputStream != null) {
			inputStream.close();

			inputStream = null;
		}

		buffer = null;
	}

	public void mark(int readLimit) {
		markLimit = readLimit;
		markIndex = index;
	}

	public boolean markSupported() {
		return true;
	}

	public int read() throws IOException {
		if (inputStream == null) {
			throw new IOException("Input stream is null");
		}

		if (index >= firstInvalidIndex) {
			readUnderlyingInputStream();

			if (index >= firstInvalidIndex) {
				return -1;
			}
		}

		return buffer[index++] & 0xff;
	}

	public int read(byte[] byteArray) throws IOException {
		return read(byteArray, 0, byteArray.length);
	}

	public int read(byte[] byteArray, int offset, int length)
		throws IOException {

		if (inputStream == null) {
			throw new IOException("Input stream is null");
		}

		if (length <= 0) {
			return 0;
		}

		int read = 0;

		while (true) {
			int available = firstInvalidIndex - index;

			if ((available + read) >= length) {

				// Enough data, stop reading

				int leftSize = length - read;

				System.arraycopy(
					buffer, index, byteArray, offset + read, leftSize);

				index += leftSize;

				return length;
			}

			if (available <= 0) {

				// No more data in buffer, continue reading

				readUnderlyingInputStream();

				available = firstInvalidIndex - index;

				if (available <= 0) {

					// Cannot read any more, stop reading

					if (read == 0) {
						return -1;
					}
					else {
						return read;
					}
				}
			}
			else {

				// Copy all in-memory data, continue reading

				System.arraycopy(
					buffer, index, byteArray, offset + read, available);

				index += available;
				read += available;
			}
		}
	}
	public void reset() throws IOException {
		if (inputStream == null) {
			throw new IOException("Input stream is null");
		}

		if (markIndex < 0) {
			throw new IOException("Resetting to invalid mark");
		}

		index = markIndex;
	}

	public long skip(long skip) throws IOException {
		if (inputStream == null) {
			throw new IOException("Input stream is null");
		}

		if (skip <= 0) {
			return 0;
		}
		long available = firstInvalidIndex - index;

		if (available > 0) {

			// Skip the data in buffer

			if (available < skip) {
				skip = available;
			}
		}
		else {

			// Skip the underlying input stream

			if (markIndex < 0) {

				// No mark required, skip

				skip = inputStream.skip(skip);
			}
			else {

				// Mark required, save the skipped data

				readUnderlyingInputStream();

				available = firstInvalidIndex - index;

				if (available > 0) {

					// Skip the data in buffer

					if (available < skip) {
						skip = available;
					}
				}
			}
		}

		index += skip;

		return skip;
	}

	protected void readUnderlyingInputStream() throws IOException {
		if (markIndex < 0) {

			// No mark required, fill the buffer

			index = firstInvalidIndex = 0;

			int number = inputStream.read(buffer);

			if (number > 0) {
				firstInvalidIndex = number;
			}

			return;
		}

		// Mark required

		if (index >= buffer.length) {

			// Buffer is full, clean up or grow

			if ((firstInvalidIndex - markIndex) > markLimit) {

				// Passed mark limit, get rid of all cache data

				markIndex = -1;
				index = 0;
			}
			else if (markIndex > _MAX_MARK_WASTE_SIZE) {

				// There are more than _MAX_MARK_WASTE_SIZE free space at the
				// beginning of buffer, clean up by shuffling the buffer

				int realDataSize = index - markIndex;

				System.arraycopy(
					buffer, markIndex, buffer, 0, realDataSize);

				markIndex = 0;
				index = realDataSize;
			}
			else {

				// Grow the buffer because we cannot get rid of cache data and
				// it is inefficient to shuffle the buffer

				int newBufferSize = index << 1;

				if ((newBufferSize - _MAX_MARK_WASTE_SIZE) > markLimit) {

					// Make thew new buffer size larger than the mark limit

					newBufferSize = markLimit + _MAX_MARK_WASTE_SIZE;
				}

				byte[] newBuffer = new byte[newBufferSize];

				System.arraycopy(buffer, 0, newBuffer, 0, index);

				buffer = newBuffer;
			}
		}

		// Read underlying input stream since the buffer has more space

		firstInvalidIndex = index;

		int number = inputStream.read(buffer, index, buffer.length - index);

		if (number > 0) {
			firstInvalidIndex += number;
		}
	}

	protected byte[] buffer;
	protected int firstInvalidIndex;
	protected int index;
	protected int markIndex = -1;
	protected int markLimit;

	private static int _DEFAULT_BUFFER_SIZE = 8192;

	private static int _MAX_MARK_WASTE_SIZE = 4096;

}