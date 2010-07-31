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

package com.liferay.portal.kernel.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;

import java.util.List;
import java.util.Properties;

/**
 * @author Brian Wing Shun Chan
 * @author Alexander Chow
 */
public interface File {

	public void copyDirectory(String sourceDirName, String destinationDirName);

	public void copyDirectory(java.io.File source, java.io.File destination);

	public void copyFile(String source, String destination);

	public void copyFile(String source, String destination, boolean lazy);

	public void copyFile(java.io.File source, java.io.File destination);

	public void copyFile(
		java.io.File source, java.io.File destination, boolean lazy);

	public java.io.File createTempFile();

	public java.io.File createTempFile(String extension);

	public String createTempFileName();

	public String createTempFileName(String extension);

	public String decodeSafeFileName(String fileName);

	public boolean delete(String file);

	public boolean delete(java.io.File file);

	public void deltree(String directory);

	public void deltree(java.io.File directory);

	public String encodeSafeFileName(String fileName);

	public boolean exists(String fileName);

	public boolean exists(java.io.File file);

	public String extractText(InputStream is, String fileName);

	public String getAbsolutePath(java.io.File file);

	public byte[] getBytes(java.io.File file) throws IOException;

	public byte[] getBytes(InputStream is) throws IOException;

	public byte[] getBytes(InputStream is, int bufferSize) throws IOException;

	public String getExtension(String fileName);

	public String getPath(String fullFileName);

	public String getShortFileName(String fullFileName);

	public boolean isAscii(java.io.File file) throws IOException;

	public String[] listDirs(String fileName);

	public String[] listDirs(java.io.File file);

	public String[] listFiles(String fileName);

	public String[] listFiles(java.io.File file);

	public void mkdirs(String pathName);

	public boolean move(String sourceFileName, String destinationFileName);

	public boolean move(java.io.File source, java.io.File destination);

	public String read(String fileName) throws IOException;

	public String read(java.io.File file) throws IOException;

	public String read(java.io.File file, boolean raw) throws IOException;

	public String replaceSeparator(String fileName);

	public java.io.File[] sortFiles(java.io.File[] files);

	public String stripExtension(String fileName);

	public List<String> toList(Reader reader);

	public List<String> toList(String fileName);

	public Properties toProperties(java.io.FileInputStream fis);

	public Properties toProperties(String fileName);

	public void write(String fileName, String s) throws IOException;

	public void write(String fileName, String s, boolean lazy)
		throws IOException;

	public void write(String fileName, String s, boolean lazy, boolean append)
		throws IOException;

	public void write(String pathName, String fileName, String s)
		throws IOException;

	public void write(String pathName, String fileName, String s, boolean lazy)
		throws IOException;

	public void write(
			String pathName, String fileName, String s, boolean lazy,
			boolean append)
		throws IOException;

	public void write(java.io.File file, String s) throws IOException;

	public void write(java.io.File file, String s, boolean lazy)
		throws IOException;

	public void write(java.io.File file, String s, boolean lazy, boolean append)
		throws IOException;

	public void write(String fileName, byte[] bytes) throws IOException;

	public void write(java.io.File file, byte[] bytes) throws IOException;

	public void write(java.io.File file, byte[] bytes, int offset, int length)
		throws IOException;

	public void write(String fileName, InputStream is) throws IOException;

	public void write(java.io.File file, InputStream is) throws IOException;

}