package com.liferay.alloy.taglib.alloy_util.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseScriptTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseScriptTag extends AlloyIncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String getPage() {
		return _PAGE;
	}

	public java.lang.String getPosition() {
		return _position;
	}

	public java.lang.Boolean getPrintBuffer() {
		return _printBuffer;
	}

	public java.lang.String getUse() {
		return _use;
	}

	public void setPosition(java.lang.String position) {
		_position = position;

		setScopedAttribute("position", position);
	}

	public void setPrintBuffer(java.lang.Boolean printBuffer) {
		_printBuffer = printBuffer;

		setScopedAttribute("printBuffer", printBuffer);
	}

	public void setUse(java.lang.String use) {
		_use = use;

		setScopedAttribute("use", use);
	}

	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "position", _position);
		setNamespacedAttribute(request, "printBuffer", _printBuffer);
		setNamespacedAttribute(request, "use", _use);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy_util:script:";

	private static final String _PAGE =
		"/html/taglib/alloy_util/script/page.jsp";

	protected java.lang.String _position;
	protected java.lang.Boolean _printBuffer;
	protected java.lang.String _use;

}
