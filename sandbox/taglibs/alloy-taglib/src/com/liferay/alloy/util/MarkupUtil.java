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
			new String[] { CSS_CLASS_PREFIX }, args, classes);

		return StringUtil.merge(classes, CSS_CLASS_DELIMITER);
	}
	
	public static String getUniqueId() {
		return PwdGenerator.getPassword(
			PwdGenerator.KEY2 + PwdGenerator.KEY3, 10); 
	}

	private static final String CSS_CLASS_DELIMITER = 
		PropsValues.CSS_CLASS_DELIMITER;
	
	private static final String CSS_CLASS_PREFIX = 
		PropsValues.CSS_CLASS_PREFIX;
	
}