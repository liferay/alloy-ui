package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

/**
 * <a href="BaseCharCounterTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseCharCounterTag extends IncludeTag {

	public void init() {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);
	}

	public java.lang.String getInput() {
		return _input;
	}

	public java.lang.Integer getMaxLength() {
		return _maxLength;
	}

	public java.lang.String getCounter() {
		return _counter;
	}

	public void setInput(java.lang.String input) {
		_input = input;

		setScopedAttribute("input", input);
	}

	public void setMaxLength(java.lang.Integer maxLength) {
		_maxLength = maxLength;

		setScopedAttribute("maxLength", maxLength);
	}

	public void setCounter(java.lang.String counter) {
		_counter = counter;

		setScopedAttribute("counter", counter);
	}

	protected String getPage() {
		return _PAGE;
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:char-counter:";

	private static final String _PAGE =
		"/html/taglib/alloy/char_counter/page.jsp";

	private java.lang.String _input;
	private java.lang.Integer _maxLength;
	private java.lang.String _counter;

}
