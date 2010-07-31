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

import java.io.Writer;

/**
 * @author Shuyang Zhou
 */
public class DummyWriter extends Writer {

	public Writer append(char c) {
		return this;
	}

	public Writer append(CharSequence charSequence) {
		return this;
	}

	public Writer append(CharSequence charSequence, int start, int end) {
		return this;
	}

	public void close() {
	}

	public void flush() {
	}

	public void write(char[] charArray) {
	}

	public void write(char[] charArray, int offset, int length) {
	}

	public void write(int c) {
	}

	public void write(String string) {
	}

	public void write(String string, int offset, int length) {
	}

}