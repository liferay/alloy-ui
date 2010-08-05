package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseCharCounterTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseCharCounterTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.String getCounter() {
		return _counter;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.String getInput() {
		return _input;
	}

	public java.lang.Number getMaxLength() {
		return _maxLength;
	}

	public java.lang.String getAfterCounterChange() {
		return _afterCounterChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterInputChange() {
		return _afterInputChange;
	}

	public java.lang.String getAfterMaxLengthChange() {
		return _afterMaxLengthChange;
	}

	public java.lang.String getOnCounterChange() {
		return _onCounterChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnInputChange() {
		return _onInputChange;
	}

	public java.lang.String getOnMaxLengthChange() {
		return _onMaxLengthChange;
	}

	public void setCounter(java.lang.String counter) {
		_counter = counter;

		setScopedAttribute("counter", counter);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setInput(java.lang.String input) {
		_input = input;

		setScopedAttribute("input", input);
	}

	public void setMaxLength(java.lang.Number maxLength) {
		_maxLength = maxLength;

		setScopedAttribute("maxLength", maxLength);
	}

	public void setAfterCounterChange(java.lang.String afterCounterChange) {
		_afterCounterChange = afterCounterChange;

		setScopedAttribute("afterCounterChange", afterCounterChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterInputChange(java.lang.String afterInputChange) {
		_afterInputChange = afterInputChange;

		setScopedAttribute("afterInputChange", afterInputChange);
	}

	public void setAfterMaxLengthChange(java.lang.String afterMaxLengthChange) {
		_afterMaxLengthChange = afterMaxLengthChange;

		setScopedAttribute("afterMaxLengthChange", afterMaxLengthChange);
	}

	public void setOnCounterChange(java.lang.String onCounterChange) {
		_onCounterChange = onCounterChange;

		setScopedAttribute("onCounterChange", onCounterChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnInputChange(java.lang.String onInputChange) {
		_onInputChange = onInputChange;

		setScopedAttribute("onInputChange", onInputChange);
	}

	public void setOnMaxLengthChange(java.lang.String onMaxLengthChange) {
		_onMaxLengthChange = onMaxLengthChange;

		setScopedAttribute("onMaxLengthChange", onMaxLengthChange);
	}


	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "counter", _counter);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "input", _input);
		setNamespacedAttribute(request, "maxLength", _maxLength);
		setNamespacedAttribute(request, "afterCounterChange", _afterCounterChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterInputChange", _afterInputChange);
		setNamespacedAttribute(request, "afterMaxLengthChange", _afterMaxLengthChange);
		setNamespacedAttribute(request, "onCounterChange", _onCounterChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onInputChange", _onInputChange);
		setNamespacedAttribute(request, "onMaxLengthChange", _onMaxLengthChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:char-counter:";

	private static final String _PAGE =
		"/html/taglib/alloy/char_counter/page.jsp";

	private java.lang.String _counter;
	private java.lang.Boolean _destroyed;
	private java.lang.Boolean _initialized;
	private java.lang.String _input;
	private java.lang.Number _maxLength;
	private java.lang.String _afterCounterChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterInputChange;
	private java.lang.String _afterMaxLengthChange;
	private java.lang.String _onCounterChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onInputChange;
	private java.lang.String _onMaxLengthChange;

}
