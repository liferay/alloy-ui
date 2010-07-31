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

import com.liferay.portal.kernel.util.StringPool;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InterruptedIOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;

import java.util.Formatter;
import java.util.Locale;

/**
 * <p>
 * See http://issues.liferay.com/browse/LPS-6648.
 * </p>
 *
 * @author Shuyang Zhou
 */
public class UnsyncPrintWriter extends PrintWriter {

	public UnsyncPrintWriter(File file) throws IOException {
		this(new FileWriter(file), false);
	}

	public UnsyncPrintWriter(File file, String csn)
		throws FileNotFoundException, UnsupportedEncodingException {

		this(new OutputStreamWriter(new FileOutputStream(file), csn), false);
	}

	public UnsyncPrintWriter(OutputStream outputStream) {
		this(outputStream, false);
	}

	public UnsyncPrintWriter(OutputStream outputStream, boolean autoFlush) {
		this(new OutputStreamWriter(outputStream), autoFlush);
	}

	public UnsyncPrintWriter(String fileName) throws IOException {
		this(new FileWriter(fileName), false);
	}

	public UnsyncPrintWriter(String fileName, String csn)
		throws FileNotFoundException, UnsupportedEncodingException {

		this(
			new OutputStreamWriter(new FileOutputStream(fileName), csn), false);
	}

	public UnsyncPrintWriter(Writer writer) {
		this(writer, false);
	}

	public UnsyncPrintWriter(Writer writer, boolean autoFlush) {
		super(writer);

		_writer = writer;
		_autoFlush = autoFlush;
	}

	public PrintWriter append(char c) {
		write(c);

		return this;
	}

	public PrintWriter append(CharSequence charSequence) {
		if (charSequence == null) {
			write(StringPool.NULL);
		}
		else {
			write(charSequence.toString());
		}

		return this;
	}

	public PrintWriter append(CharSequence charSequence, int start, int end) {
		if (charSequence == null) {
			charSequence = StringPool.NULL;
		}

		write(charSequence.subSequence(start, end).toString());

		return this;
	}

	public boolean checkError() {
		if (_writer != null) {
			flush();
		}

		return _hasError;
	}

	public void close() {
		try {
			if (_writer == null) {
				return;
			}

			_writer.close();

			_writer = null;
		}
		catch (IOException ioe) {
			_hasError = true;
		}
	}

	public void flush() {
		if (_writer == null) {
			_hasError = true;
		}
		else {
			try {
				_writer.flush();
			}
			catch (IOException ioe) {
				_hasError = true;
			}
		}
	}

	public PrintWriter format(
		Locale locale, String format, Object... arguments) {

		if (_writer == null) {
			_hasError = true;
		}
		else {
			try {
				if ((_formatter == null) || (_formatter.locale() != locale)) {
					_formatter = new Formatter(this, locale);
				}

				_formatter.format(locale, format, arguments);

				if (_autoFlush) {
					_writer.flush();
				}
			}
			catch (InterruptedIOException iioe) {
				Thread currentThread = Thread.currentThread();

				currentThread.interrupt();
			}
			catch (IOException ioe) {
				_hasError = true;
			}
		}

		return this;
	}

	public PrintWriter format(String format, Object... arguments) {
		return format(Locale.getDefault(), format, arguments);
	}

	public void print(boolean b) {
		if (b) {
			write(StringPool.TRUE);
		}
		else {
			write(StringPool.FALSE);
		}
	}

	public void print(char c) {
		write(c);
	}

	public void print(char[] charArray) {
		write(charArray);
	}

	public void print(double d) {
		write(String.valueOf(d));
	}

	public void print(float f) {
		write(String.valueOf(f));
	}

	public void print(int i) {
		write(String.valueOf(i));
	}

	public void print(long l) {
		write(String.valueOf(l));
	}

	public void print(Object object) {
		write(String.valueOf(object));
	}

	public void print(String string) {
		if (string == null) {
			string = StringPool.NULL;
		}

		write(string);
	}

	public PrintWriter printf(
		Locale locale, String format, Object... arguments) {

		return format(locale, format, arguments);
	}

	public PrintWriter printf(String format, Object... arguments) {
		return format(format, arguments);
	}

	public void println() {
		if (_writer == null) {
			_hasError = true;
		}
		else {
			try {
				_writer.write(_LINE_SEPARATOR);

				if (_autoFlush) {
					_writer.flush();
				}
			}
			catch (InterruptedIOException iioe) {
				Thread currentThread = Thread.currentThread();

				currentThread.interrupt();
			}
			catch (IOException ioe) {
				_hasError = true;
			}
		}
	}

	public void println(boolean b) {
		print(b);
		println();
	}

	public void println(char c) {
		print(c);
		println();
	}

	public void println(char[] charArray) {
		print(charArray);
		println();
	}

	public void println(double d) {
		print(d);
		println();
	}

	public void println(float f) {
		print(f);
		println();
	}

	public void println(int i) {
		print(i);
		println();
	}

	public void println(long l) {
		print(l);
		println();
	}

	public void println(Object object) {
		print(object);
		println();
	}

	public void println(String string) {
		print(string);
		println();
	}

	public void write(char[] charArray) {
		write(charArray, 0, charArray.length);
	}

	public void write(char[] charArray, int offset, int length) {
		if (_writer == null) {
			_hasError = true;
		}
		else {
			try {
				_writer.write(charArray, offset, length);
			}
			catch (InterruptedIOException iioe) {
				Thread currentThread = Thread.currentThread();

				currentThread.interrupt();
			}
			catch (IOException ioe) {
				_hasError = true;
			}
		}
	}

	public void write(int c) {
		if (_writer == null) {
			_hasError = true;
		}
		else {
			try {
				_writer.write(c);
			}
			catch (InterruptedIOException iioe) {
				Thread currentThread = Thread.currentThread();

				currentThread.interrupt();
			}
			catch (IOException ioe) {
				_hasError = true;
			}
		}
	}

	public void write(String string) {
		if (_writer == null) {
			_hasError = true;
		}
		else {
			try {
				_writer.write(string);
			}
			catch (InterruptedIOException iioe) {
				Thread currentThread = Thread.currentThread();

				currentThread.interrupt();
			}
			catch (IOException ioe) {
				_hasError = true;
			}
		}
	}

	public void write(String string, int offset, int length) {
		if (_writer == null) {
			_hasError = true;
		}
		else {
			try {
				_writer.write(string, offset, length);
			}
			catch (InterruptedIOException iioe) {
				Thread currentThread = Thread.currentThread();

				currentThread.interrupt();
			}
			catch (IOException ioe) {
				_hasError = true;
			}
		}
	}

	private static String _LINE_SEPARATOR = System.getProperty(
		"line.separator");

	private boolean _autoFlush;
	private Formatter _formatter;
	private boolean _hasError;
	private Writer _writer;

}