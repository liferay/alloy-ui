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

import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

/**
 * @author Brian Wing Shun Chan
 */
public class Randomizer extends Random {

	public static Randomizer getInstance() {
		return _instance;
	}

	public Randomizer() {
		super();
	}

	public Randomizer(long seed) {
		super(seed);
	}

	public int[] nextInt(int n, int size) {
		if (size > n) {
			size = n;
		}

		Set<Integer> set = new LinkedHashSet<Integer>();

		for (int i = 0; i < size; i++) {
			while (true) {
				Integer value = new Integer(nextInt(n));

				if (!set.contains(value)) {
					set.add(value);

					break;
				}
			}
		}

		int[] array = new int[set.size()];

		Iterator<Integer> itr = set.iterator();

		for (int i = 0; i < array.length; i++) {
			array[i] = itr.next().intValue();
		}

		return array;
	}

	public void randomize(char array[]) {
		int length = array.length;

		for (int i = 0; i < length - 1; i++) {
			int x = nextInt(length);
			char y = array[i];

			array[i] = array[i + x];
			array[i + x] = y;

			length--;
		}
	}

	public void randomize(int array[]) {
		int length = array.length;

		for (int i = 0; i < length - 1; i++) {
			int x = nextInt(length);
			int y = array[i];

			array[i] = array[i + x];
			array[i + x] = y;

			length--;
		}
	}

	public void randomize(List<Object> list) {
		int size = list.size();

		for (int i = 0; i <= size; i++) {
			Object obj = list.get(i);

			int j = nextInt(size);

			list.set(i, list.get(i + j));
			list.set(i + j, obj);

			size--;
		}
	}

	public void randomize(Object array[]) {
		int length = array.length;

		for (int i = 0; i < length - 1; i++) {
			int x = nextInt(length);
			Object y = array[i];

			array[i] = array[i + x];
			array[i + x] = y;

			length--;
		}
	}

	public String randomize(String s) {
		if (s == null) {
			return null;
		}

		char[] array = s.toCharArray();

		randomize(array);

		return new String(array);
	}

	private static Randomizer _instance = new Randomizer();

}