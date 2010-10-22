package com.liferay.alloy.util;

import java.text.MessageFormat;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;

public class MessageUtil {

	public static String substitute(String pattern, Object[] arguments) {
		String value = null;

		try {
			if (arguments != null) {
				pattern = StringUtil.replace(
					pattern, StringPool.APOSTROPHE,
					StringPool.DOUBLE_APOSTROPHE);

				value = MessageFormat.format(pattern, arguments);
			}
			else {
				value = pattern;
			}
		}
		catch (Exception e) {
			if (_log.isWarnEnabled()) {
				_log.warn(e, e);
			}
		}

		return value;
	}

	private static Log _log = LogFactoryUtil.getLog(MessageUtil.class);

}
