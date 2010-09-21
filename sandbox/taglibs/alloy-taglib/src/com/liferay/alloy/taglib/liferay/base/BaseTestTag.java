package com.liferay.alloy.taglib.liferay.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseTestTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseTestTag extends com.liferay.alloy.taglib.alloy_util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.String getTest() {
		return _test;
	}

	public void setTest(java.lang.String test) {
		_test = test;

		setScopedAttribute("test", test);
	}

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "test", _test);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "liferay:test:";

	private static final String _PAGE =
		"/html/taglib/liferay/test/page.jsp";

	private java.lang.String _test;

}
