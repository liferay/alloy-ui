package com.liferay.alloy.util;

import com.liferay.portal.kernel.util.ArrayUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.util.PwdGenerator;

/**
 * <a href="MarkupUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Bruno Basto
 */
public class MarkupUtil {

	public static String getClassName(Object... args) {
		Object[] classes =  ArrayUtil.clone(args);

		ArrayUtil.combine(
			new String[] { Constants.CSS_CLASS_PREFIX }, args, classes);

		return StringUtil.merge(classes, Constants.CSS_CLASS_DELIMITER);
	}

	public static String getUniqueId() {
		return PwdGenerator.getPassword(
			PwdGenerator.KEY2 + PwdGenerator.KEY3, 5);
	}

}