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

import com.liferay.portal.kernel.io.unsync.UnsyncBufferedOutputStream;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.FileUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.uuid.PortalUUIDUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * @author Raymond Augé
 */
public class FileCacheOutputStream extends OutputStream {

	public FileCacheOutputStream() throws IOException {
		_tempFile = File.createTempFile(
			PortalUUIDUtil.generate() + StringPool.DASH, _EXTENSION);

		_ubos = new UnsyncBufferedOutputStream(
			new FileOutputStream(_tempFile), _BUFFER);
	}

	public void cleanUp() {
		try {
			flush();
			close();

			if (_fis != null) {
				_fis.close();
			}

			FileUtil.delete(_tempFile);
		}
		catch (IOException ioe) {
			if (_log.isWarnEnabled()) {
				_log.warn(ioe.getMessage());
			}
		}
	}

	public void close() throws IOException {
		_ubos.close();
	}

	public void flush() throws IOException {
		_ubos.flush();
	}

	public byte[] getBytes() throws IOException {
		flush();
		close();

		return FileUtil.getBytes(_tempFile);
	}

	public File getFile() throws IOException {
		flush();
		close();

		return _tempFile;
	}

	public FileInputStream getFileInputStream() throws IOException {
		if (_fis == null) {
			flush();
			close();

			_fis = new FileInputStream(_tempFile);
		}

		return _fis;
	}

	public long getSize() {
		return _tempFile.length();
	}

	public void write(byte[] b) throws IOException {
		_ubos.write(b);
	}

	public void write(byte[] b, int off, int len) throws IOException {
		_ubos.write(b, off, len);
	}

	public void write(int b) throws IOException {
		_ubos.write(b);
	}

	private static final int _BUFFER = 2048;

	private static final String _EXTENSION = ".fcos";

	protected FileInputStream _fis;
	protected File _tempFile;
	protected UnsyncBufferedOutputStream _ubos;

	private static Log _log = LogFactoryUtil.getLog(
		FileCacheOutputStream.class);

}