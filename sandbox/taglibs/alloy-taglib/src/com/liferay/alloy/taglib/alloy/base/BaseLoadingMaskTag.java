package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseLoadingMaskTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseLoadingMaskTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.String getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getHost() {
		return _host;
	}

	public java.lang.String getInitialized() {
		return _initialized;
	}

	public java.lang.String getMessageEl() {
		return _messageEl;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.String getTarget() {
		return _target;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterHostChange() {
		return _afterHostChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterMessageElChange() {
		return _afterMessageElChange;
	}

	public java.lang.String getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.String getAfterTargetChange() {
		return _afterTargetChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnHostChange() {
		return _onHostChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnMessageElChange() {
		return _onMessageElChange;
	}

	public java.lang.String getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.String getOnTargetChange() {
		return _onTargetChange;
	}

	public void setDestroyed(java.lang.String destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setHost(java.lang.String host) {
		_host = host;

		setScopedAttribute("host", host);
	}

	public void setInitialized(java.lang.String initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setMessageEl(java.lang.String messageEl) {
		_messageEl = messageEl;

		setScopedAttribute("messageEl", messageEl);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setTarget(java.lang.String target) {
		_target = target;

		setScopedAttribute("target", target);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterHostChange(java.lang.String afterHostChange) {
		_afterHostChange = afterHostChange;

		setScopedAttribute("afterHostChange", afterHostChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterMessageElChange(java.lang.String afterMessageElChange) {
		_afterMessageElChange = afterMessageElChange;

		setScopedAttribute("afterMessageElChange", afterMessageElChange);
	}

	public void setAfterStringsChange(java.lang.String afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTargetChange(java.lang.String afterTargetChange) {
		_afterTargetChange = afterTargetChange;

		setScopedAttribute("afterTargetChange", afterTargetChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnHostChange(java.lang.String onHostChange) {
		_onHostChange = onHostChange;

		setScopedAttribute("onHostChange", onHostChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnMessageElChange(java.lang.String onMessageElChange) {
		_onMessageElChange = onMessageElChange;

		setScopedAttribute("onMessageElChange", onMessageElChange);
	}

	public void setOnStringsChange(java.lang.String onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTargetChange(java.lang.String onTargetChange) {
		_onTargetChange = onTargetChange;

		setScopedAttribute("onTargetChange", onTargetChange);
	}

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "host", _host);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "messageEl", _messageEl);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "target", _target);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterHostChange", _afterHostChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterMessageElChange", _afterMessageElChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTargetChange", _afterTargetChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onHostChange", _onHostChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onMessageElChange", _onMessageElChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTargetChange", _onTargetChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:loading-mask:";

	private static final String _PAGE =
		"/html/taglib/alloy/loading_mask/page.jsp";

	private java.lang.String _destroyed;
	private java.lang.String _host;
	private java.lang.String _initialized;
	private java.lang.String _messageEl;
	private java.lang.Object _strings;
	private java.lang.String _target;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterHostChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterMessageElChange;
	private java.lang.String _afterStringsChange;
	private java.lang.String _afterTargetChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onHostChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onMessageElChange;
	private java.lang.String _onStringsChange;
	private java.lang.String _onTargetChange;

}
