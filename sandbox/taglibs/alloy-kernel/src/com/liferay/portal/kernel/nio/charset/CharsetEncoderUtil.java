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

package com.liferay.portal.kernel.nio.charset;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.nio.charset.CodingErrorAction;

/**
 * @author Shuyang Zhou
 */
public class CharsetEncoderUtil {

	public static ByteBuffer encode(
		String charsetName, char[] charArray, int offset, int length) {

		return encode(charsetName, CharBuffer.wrap(charArray, offset, length));
	}

	public static ByteBuffer encode(String charsetName, CharBuffer charBuffer) {
		try {
			CharsetEncoder charsetEncoder = getCharsetEncoder(charsetName);

			return charsetEncoder.encode(charBuffer);
		}
		catch (CharacterCodingException cce) {
			throw new Error(cce);
		}
	}

	public static ByteBuffer encode(String charsetName, String string) {
		return encode(charsetName, CharBuffer.wrap(string));
	}

	public static CharsetEncoder getCharsetEncoder(String charsetName) {
		Charset charset = Charset.forName(charsetName);

		CharsetEncoder charsetEncoder = charset.newEncoder();

		charsetEncoder.onMalformedInput(CodingErrorAction.REPLACE);
		charsetEncoder.onUnmappableCharacter(CodingErrorAction.REPLACE);

		return charsetEncoder;
	}

}