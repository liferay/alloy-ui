/**
 * Copyright (c) 2000-2011 Liferay, Inc. All rights reserved.
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
 
package com.liferay.alloy.taglib.alloy.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseLoadingMaskTag extends com.liferay.taglib.util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Object getHost() {
		return _host;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.String getMessageEl() {
		return _messageEl;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.Object getTarget() {
		return _target;
	}

	public java.lang.Object getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.Object getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.Object getAfterHostChange() {
		return _afterHostChange;
	}

	public java.lang.Object getAfterInit() {
		return _afterInit;
	}

	public java.lang.Object getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.Object getAfterMessageElChange() {
		return _afterMessageElChange;
	}

	public java.lang.Object getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.Object getAfterTargetChange() {
		return _afterTargetChange;
	}

	public java.lang.Object getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.Object getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.Object getOnHostChange() {
		return _onHostChange;
	}

	public java.lang.Object getOnInit() {
		return _onInit;
	}

	public java.lang.Object getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.Object getOnMessageElChange() {
		return _onMessageElChange;
	}

	public java.lang.Object getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.Object getOnTargetChange() {
		return _onTargetChange;
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setHost(java.lang.Object host) {
		_host = host;

		setScopedAttribute("host", host);
	}

	public void setInitialized(java.lang.Boolean initialized) {
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

	public void setTarget(java.lang.Object target) {
		_target = target;

		setScopedAttribute("target", target);
	}

	public void setAfterDestroy(java.lang.Object afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.Object afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterHostChange(java.lang.Object afterHostChange) {
		_afterHostChange = afterHostChange;

		setScopedAttribute("afterHostChange", afterHostChange);
	}

	public void setAfterInit(java.lang.Object afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.Object afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterMessageElChange(java.lang.Object afterMessageElChange) {
		_afterMessageElChange = afterMessageElChange;

		setScopedAttribute("afterMessageElChange", afterMessageElChange);
	}

	public void setAfterStringsChange(java.lang.Object afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTargetChange(java.lang.Object afterTargetChange) {
		_afterTargetChange = afterTargetChange;

		setScopedAttribute("afterTargetChange", afterTargetChange);
	}

	public void setOnDestroy(java.lang.Object onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.Object onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnHostChange(java.lang.Object onHostChange) {
		_onHostChange = onHostChange;

		setScopedAttribute("onHostChange", onHostChange);
	}

	public void setOnInit(java.lang.Object onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.Object onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnMessageElChange(java.lang.Object onMessageElChange) {
		_onMessageElChange = onMessageElChange;

		setScopedAttribute("onMessageElChange", onMessageElChange);
	}

	public void setOnStringsChange(java.lang.Object onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTargetChange(java.lang.Object onTargetChange) {
		_onTargetChange = onTargetChange;

		setScopedAttribute("onTargetChange", onTargetChange);
	}


	protected void cleanUp() {
		_destroyed = false;
		_host = null;
		_initialized = false;
		_messageEl = null;
		_strings = null;
		_target = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterHostChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterMessageElChange = null;
		_afterStringsChange = null;
		_afterTargetChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onHostChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onMessageElChange = null;
		_onStringsChange = null;
		_onTargetChange = null;
	}

	protected String getPage() {
		return _PAGE;
	}
	
	protected void setAttributes(HttpServletRequest request) {
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

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:loading-mask:";

	private static final String _PAGE =
		"/html/taglib/alloy/loading_mask/page.jsp";

	protected java.lang.Boolean _destroyed;
	protected java.lang.Object _host;
	protected java.lang.Boolean _initialized;
	protected java.lang.String _messageEl;
	protected java.lang.Object _strings;
	protected java.lang.Object _target;
	protected java.lang.Object _afterDestroy;
	protected java.lang.Object _afterDestroyedChange;
	protected java.lang.Object _afterHostChange;
	protected java.lang.Object _afterInit;
	protected java.lang.Object _afterInitializedChange;
	protected java.lang.Object _afterMessageElChange;
	protected java.lang.Object _afterStringsChange;
	protected java.lang.Object _afterTargetChange;
	protected java.lang.Object _onDestroy;
	protected java.lang.Object _onDestroyedChange;
	protected java.lang.Object _onHostChange;
	protected java.lang.Object _onInit;
	protected java.lang.Object _onInitializedChange;
	protected java.lang.Object _onMessageElChange;
	protected java.lang.Object _onStringsChange;
	protected java.lang.Object _onTargetChange;

}
