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
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CodingErrorAction;

/**
 * @author Shuyang Zhou
 */
public class CharsetDecoderUtil {

	public static CharBuffer decode(String charsetName, byte[] byteArray) {
		return decode(charsetName, ByteBuffer.wrap(byteArray));
	}

	public static CharBuffer decode(
		String charsetName, byte[] byteArray, int offset, int length) {

		return decode(charsetName, ByteBuffer.wrap(byteArray, offset, length));
	}

	public static CharBuffer decode(String charsetName, ByteBuffer byteBuffer) {
		try {
			CharsetDecoder charsetDecoder = getCharsetDecoder(charsetName);

			return charsetDecoder.decode(byteBuffer);
		}
		catch (CharacterCodingException cce) {
			throw new Error(cce);
		}
	}

	public static CharsetDecoder getCharsetDecoder(String charsetName) {
		Charset charset = Charset.forName(charsetName);

		CharsetDecoder charsetDecoder = charset.newDecoder();

		charsetDecoder.onMalformedInput(CodingErrorAction.REPLACE);
		charsetDecoder.onUnmappableCharacter(CodingErrorAction.REPLACE);

		return charsetDecoder;
	}

}