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
public class UnsyncFilterOutputStream extends OutputStream {

	public UnsyncFilterOutputStream(OutputStream outputStream) {
		this.outputStream = outputStream;
	}

	public void close() throws IOException {
		try {
			flush();
		}
		catch (IOException ioe) {
		}

		outputStream.close();
	}

	public void flush() throws IOException {
		outputStream.flush();
	}

	public void write(byte[] byteArray) throws IOException {
		outputStream.write(byteArray, 0, byteArray.length);
	}

	public void write(byte[] byteArray, int offset, int length)
		throws IOException {

		outputStream.write(byteArray, offset, length);
	}

	public void write(int b) throws IOException {
		outputStream.write(b);
	}

	protected OutputStream outputStream;

}