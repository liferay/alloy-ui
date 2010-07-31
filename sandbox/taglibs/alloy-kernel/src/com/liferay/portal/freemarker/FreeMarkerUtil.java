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

package com.liferay.portal.freemarker;

import com.liferay.portal.kernel.io.unsync.UnsyncStringWriter;
import com.liferay.portal.kernel.util.StringPool;

import freemarker.cache.ClassTemplateLoader;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;

import java.io.Writer;

/**
 * @author Tariq Dweik
 * @author Brian Wing Shun Chan
 */
public class FreeMarkerUtil {

	public static String process(String name, Object context)
		throws Exception {

		UnsyncStringWriter unsyncStringWriter = new UnsyncStringWriter();

		process(name, context, unsyncStringWriter);

		return unsyncStringWriter.toString();
	}

	public static void process(String name, Object context, Writer writer)
		throws Exception {

		Template template = _getConfiguration().getTemplate(name);

		template.process(context, writer);
	}

	private static Configuration _getConfiguration() {
		if (_configuration != null) {
			return _configuration;
		}

		_configuration = new Configuration();

		_configuration.setObjectWrapper(new DefaultObjectWrapper());
		_configuration.setTemplateLoader(
			new ClassTemplateLoader(FreeMarkerUtil.class, StringPool.SLASH));

		return _configuration;
	}

	private static Configuration _configuration;

}