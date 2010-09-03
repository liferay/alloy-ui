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

package com.liferay.alloy.util.xml;

import org.dom4j.*;
import org.dom4j.io.SAXReader;
import java.io.File;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;

/**
 * @author Eduardo Lundgren
 */
public class SAXReaderUtil {

	public static Document createDocument() {
		return DocumentFactory.getInstance().createDocument();
	}

	public static Document createDocument(Element root) {
		return createDocument(root);
	}

	public static Document read(File file) throws DocumentException {
		return _saxReader.read(file);
	}

	public static Document read(InputStream is) throws DocumentException {
		return _saxReader.read(is);
	}

	public static Document read(Reader reader) throws DocumentException {
		return _saxReader.read(reader);
	}

	public static Document read(String xml) throws DocumentException {
		return _saxReader.read(new StringReader(xml));
	}

	private static SAXReader _saxReader = new SAXReader();

}