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
public class BaseTreeViewTag extends com.liferay.taglib.util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.Object getChildren() {
		return _children;
	}

	public java.lang.String getContainer() {
		return _container;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Object getIndex() {
		return _index;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.Object getIo() {
		return _io;
	}

	public java.lang.Object getLastSelected() {
		return _lastSelected;
	}

	public java.lang.String getType() {
		return _type;
	}

	public java.lang.Object getAfterChildrenChange() {
		return _afterChildrenChange;
	}

	public java.lang.Object getAfterContainerChange() {
		return _afterContainerChange;
	}

	public java.lang.Object getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.Object getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.Object getAfterIndexChange() {
		return _afterIndexChange;
	}

	public java.lang.Object getAfterInit() {
		return _afterInit;
	}

	public java.lang.Object getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.Object getAfterIoChange() {
		return _afterIoChange;
	}

	public java.lang.Object getAfterLastSelectedChange() {
		return _afterLastSelectedChange;
	}

	public java.lang.Object getAfterTypeChange() {
		return _afterTypeChange;
	}

	public java.lang.Object getOnChildrenChange() {
		return _onChildrenChange;
	}

	public java.lang.Object getOnContainerChange() {
		return _onContainerChange;
	}

	public java.lang.Object getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.Object getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.Object getOnIndexChange() {
		return _onIndexChange;
	}

	public java.lang.Object getOnInit() {
		return _onInit;
	}

	public java.lang.Object getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.Object getOnIoChange() {
		return _onIoChange;
	}

	public java.lang.Object getOnLastSelectedChange() {
		return _onLastSelectedChange;
	}

	public java.lang.Object getOnTypeChange() {
		return _onTypeChange;
	}

	public void setChildren(java.lang.Object children) {
		_children = children;

		setScopedAttribute("children", children);
	}

	public void setContainer(java.lang.String container) {
		_container = container;

		setScopedAttribute("container", container);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setIndex(java.lang.Object index) {
		_index = index;

		setScopedAttribute("index", index);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setIo(java.lang.Object io) {
		_io = io;

		setScopedAttribute("io", io);
	}

	public void setLastSelected(java.lang.Object lastSelected) {
		_lastSelected = lastSelected;

		setScopedAttribute("lastSelected", lastSelected);
	}

	public void setType(java.lang.String type) {
		_type = type;

		setScopedAttribute("type", type);
	}

	public void setAfterChildrenChange(java.lang.Object afterChildrenChange) {
		_afterChildrenChange = afterChildrenChange;

		setScopedAttribute("afterChildrenChange", afterChildrenChange);
	}

	public void setAfterContainerChange(java.lang.Object afterContainerChange) {
		_afterContainerChange = afterContainerChange;

		setScopedAttribute("afterContainerChange", afterContainerChange);
	}

	public void setAfterDestroy(java.lang.Object afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.Object afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterIndexChange(java.lang.Object afterIndexChange) {
		_afterIndexChange = afterIndexChange;

		setScopedAttribute("afterIndexChange", afterIndexChange);
	}

	public void setAfterInit(java.lang.Object afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.Object afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterIoChange(java.lang.Object afterIoChange) {
		_afterIoChange = afterIoChange;

		setScopedAttribute("afterIoChange", afterIoChange);
	}

	public void setAfterLastSelectedChange(java.lang.Object afterLastSelectedChange) {
		_afterLastSelectedChange = afterLastSelectedChange;

		setScopedAttribute("afterLastSelectedChange", afterLastSelectedChange);
	}

	public void setAfterTypeChange(java.lang.Object afterTypeChange) {
		_afterTypeChange = afterTypeChange;

		setScopedAttribute("afterTypeChange", afterTypeChange);
	}

	public void setOnChildrenChange(java.lang.Object onChildrenChange) {
		_onChildrenChange = onChildrenChange;

		setScopedAttribute("onChildrenChange", onChildrenChange);
	}

	public void setOnContainerChange(java.lang.Object onContainerChange) {
		_onContainerChange = onContainerChange;

		setScopedAttribute("onContainerChange", onContainerChange);
	}

	public void setOnDestroy(java.lang.Object onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.Object onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnIndexChange(java.lang.Object onIndexChange) {
		_onIndexChange = onIndexChange;

		setScopedAttribute("onIndexChange", onIndexChange);
	}

	public void setOnInit(java.lang.Object onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.Object onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnIoChange(java.lang.Object onIoChange) {
		_onIoChange = onIoChange;

		setScopedAttribute("onIoChange", onIoChange);
	}

	public void setOnLastSelectedChange(java.lang.Object onLastSelectedChange) {
		_onLastSelectedChange = onLastSelectedChange;

		setScopedAttribute("onLastSelectedChange", onLastSelectedChange);
	}

	public void setOnTypeChange(java.lang.Object onTypeChange) {
		_onTypeChange = onTypeChange;

		setScopedAttribute("onTypeChange", onTypeChange);
	}


	protected void cleanUp() {
		_children = null;
		_container = null;
		_destroyed = false;
		_index = null;
		_initialized = false;
		_io = null;
		_lastSelected = null;
		_type = "file";
		_afterChildrenChange = null;
		_afterContainerChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterIndexChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterIoChange = null;
		_afterLastSelectedChange = null;
		_afterTypeChange = null;
		_onChildrenChange = null;
		_onContainerChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onIndexChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onIoChange = null;
		_onLastSelectedChange = null;
		_onTypeChange = null;
	}

	protected String getPage() {
		return _PAGE;
	}
	
	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "children", _children);
		setNamespacedAttribute(request, "container", _container);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "index", _index);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "io", _io);
		setNamespacedAttribute(request, "lastSelected", _lastSelected);
		setNamespacedAttribute(request, "type", _type);
		setNamespacedAttribute(request, "afterChildrenChange", _afterChildrenChange);
		setNamespacedAttribute(request, "afterContainerChange", _afterContainerChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterIndexChange", _afterIndexChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterIoChange", _afterIoChange);
		setNamespacedAttribute(request, "afterLastSelectedChange", _afterLastSelectedChange);
		setNamespacedAttribute(request, "afterTypeChange", _afterTypeChange);
		setNamespacedAttribute(request, "onChildrenChange", _onChildrenChange);
		setNamespacedAttribute(request, "onContainerChange", _onContainerChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onIndexChange", _onIndexChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onIoChange", _onIoChange);
		setNamespacedAttribute(request, "onLastSelectedChange", _onLastSelectedChange);
		setNamespacedAttribute(request, "onTypeChange", _onTypeChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:tree-view:";

	private static final String _PAGE =
		"/html/taglib/alloy/tree_view/page.jsp";

	protected java.lang.Object _children;
	protected java.lang.String _container;
	protected java.lang.Boolean _destroyed;
	protected java.lang.Object _index;
	protected java.lang.Boolean _initialized;
	protected java.lang.Object _io;
	protected java.lang.Object _lastSelected;
	protected java.lang.String _type;
	protected java.lang.Object _afterChildrenChange;
	protected java.lang.Object _afterContainerChange;
	protected java.lang.Object _afterDestroy;
	protected java.lang.Object _afterDestroyedChange;
	protected java.lang.Object _afterIndexChange;
	protected java.lang.Object _afterInit;
	protected java.lang.Object _afterInitializedChange;
	protected java.lang.Object _afterIoChange;
	protected java.lang.Object _afterLastSelectedChange;
	protected java.lang.Object _afterTypeChange;
	protected java.lang.Object _onChildrenChange;
	protected java.lang.Object _onContainerChange;
	protected java.lang.Object _onDestroy;
	protected java.lang.Object _onDestroyedChange;
	protected java.lang.Object _onIndexChange;
	protected java.lang.Object _onInit;
	protected java.lang.Object _onInitializedChange;
	protected java.lang.Object _onIoChange;
	protected java.lang.Object _onLastSelectedChange;
	protected java.lang.Object _onTypeChange;

}
