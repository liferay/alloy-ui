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
 * @generated
 */
public class BaseTreeNodeTaskTag extends com.liferay.taglib.util.IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public boolean getAlwaysShowHitArea() {
		return _alwaysShowHitArea;
	}

	public boolean getCache() {
		return _cache;
	}

	public java.lang.String getCheckContainerEl() {
		return _checkContainerEl;
	}

	public java.lang.String getCheckEl() {
		return _checkEl;
	}

	public java.lang.String getCheckName() {
		return _checkName;
	}

	public boolean getChecked() {
		return _checked;
	}

	public java.lang.Object getChildren() {
		return _children;
	}

	public java.lang.String getContainer() {
		return _container;
	}

	public boolean getDestroyed() {
		return _destroyed;
	}

	public boolean getDraggable() {
		return _draggable;
	}

	public boolean getExpanded() {
		return _expanded;
	}

	public java.lang.String getHitAreaEl() {
		return _hitAreaEl;
	}

	public java.lang.String getIconEl() {
		return _iconEl;
	}

	public java.lang.String getTreenodetaskId() {
		return _treenodetaskId;
	}

	public java.lang.Object getIndex() {
		return _index;
	}

	public boolean getInitialized() {
		return _initialized;
	}

	public java.lang.Object getIo() {
		return _io;
	}

	public java.lang.String getLabel() {
		return _label;
	}

	public java.lang.String getLabelEl() {
		return _labelEl;
	}

	public boolean getLeaf() {
		return _leaf;
	}

	public boolean getLoaded() {
		return _loaded;
	}

	public boolean getLoading() {
		return _loading;
	}

	public java.lang.Object getNextSibling() {
		return _nextSibling;
	}

	public java.lang.Object getOwnerTree() {
		return _ownerTree;
	}

	public java.lang.Object getParentNode() {
		return _parentNode;
	}

	public java.lang.Object getPrevSibling() {
		return _prevSibling;
	}

	public java.lang.Object getAfterAlwaysShowHitAreaChange() {
		return _afterAlwaysShowHitAreaChange;
	}

	public java.lang.Object getAfterCacheChange() {
		return _afterCacheChange;
	}

	public java.lang.Object getAfterCheckContainerElChange() {
		return _afterCheckContainerElChange;
	}

	public java.lang.Object getAfterCheckElChange() {
		return _afterCheckElChange;
	}

	public java.lang.Object getAfterCheckNameChange() {
		return _afterCheckNameChange;
	}

	public java.lang.Object getAfterCheckedChange() {
		return _afterCheckedChange;
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

	public java.lang.Object getAfterDraggableChange() {
		return _afterDraggableChange;
	}

	public java.lang.Object getAfterExpandedChange() {
		return _afterExpandedChange;
	}

	public java.lang.Object getAfterHitAreaElChange() {
		return _afterHitAreaElChange;
	}

	public java.lang.Object getAfterIconElChange() {
		return _afterIconElChange;
	}

	public java.lang.Object getAfterIdChange() {
		return _afterIdChange;
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

	public java.lang.Object getAfterLabelChange() {
		return _afterLabelChange;
	}

	public java.lang.Object getAfterLabelElChange() {
		return _afterLabelElChange;
	}

	public java.lang.Object getAfterLeafChange() {
		return _afterLeafChange;
	}

	public java.lang.Object getAfterLoadedChange() {
		return _afterLoadedChange;
	}

	public java.lang.Object getAfterLoadingChange() {
		return _afterLoadingChange;
	}

	public java.lang.Object getAfterNextSiblingChange() {
		return _afterNextSiblingChange;
	}

	public java.lang.Object getAfterOwnerTreeChange() {
		return _afterOwnerTreeChange;
	}

	public java.lang.Object getAfterParentNodeChange() {
		return _afterParentNodeChange;
	}

	public java.lang.Object getAfterPrevSiblingChange() {
		return _afterPrevSiblingChange;
	}

	public java.lang.Object getOnAlwaysShowHitAreaChange() {
		return _onAlwaysShowHitAreaChange;
	}

	public java.lang.Object getOnCacheChange() {
		return _onCacheChange;
	}

	public java.lang.Object getOnCheckContainerElChange() {
		return _onCheckContainerElChange;
	}

	public java.lang.Object getOnCheckElChange() {
		return _onCheckElChange;
	}

	public java.lang.Object getOnCheckNameChange() {
		return _onCheckNameChange;
	}

	public java.lang.Object getOnCheckedChange() {
		return _onCheckedChange;
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

	public java.lang.Object getOnDraggableChange() {
		return _onDraggableChange;
	}

	public java.lang.Object getOnExpandedChange() {
		return _onExpandedChange;
	}

	public java.lang.Object getOnHitAreaElChange() {
		return _onHitAreaElChange;
	}

	public java.lang.Object getOnIconElChange() {
		return _onIconElChange;
	}

	public java.lang.Object getOnIdChange() {
		return _onIdChange;
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

	public java.lang.Object getOnLabelChange() {
		return _onLabelChange;
	}

	public java.lang.Object getOnLabelElChange() {
		return _onLabelElChange;
	}

	public java.lang.Object getOnLeafChange() {
		return _onLeafChange;
	}

	public java.lang.Object getOnLoadedChange() {
		return _onLoadedChange;
	}

	public java.lang.Object getOnLoadingChange() {
		return _onLoadingChange;
	}

	public java.lang.Object getOnNextSiblingChange() {
		return _onNextSiblingChange;
	}

	public java.lang.Object getOnOwnerTreeChange() {
		return _onOwnerTreeChange;
	}

	public java.lang.Object getOnParentNodeChange() {
		return _onParentNodeChange;
	}

	public java.lang.Object getOnPrevSiblingChange() {
		return _onPrevSiblingChange;
	}

	public void setAlwaysShowHitArea(boolean alwaysShowHitArea) {
		_alwaysShowHitArea = alwaysShowHitArea;

		setScopedAttribute("alwaysShowHitArea", alwaysShowHitArea);
	}

	public void setCache(boolean cache) {
		_cache = cache;

		setScopedAttribute("cache", cache);
	}

	public void setCheckContainerEl(java.lang.String checkContainerEl) {
		_checkContainerEl = checkContainerEl;

		setScopedAttribute("checkContainerEl", checkContainerEl);
	}

	public void setCheckEl(java.lang.String checkEl) {
		_checkEl = checkEl;

		setScopedAttribute("checkEl", checkEl);
	}

	public void setCheckName(java.lang.String checkName) {
		_checkName = checkName;

		setScopedAttribute("checkName", checkName);
	}

	public void setChecked(boolean checked) {
		_checked = checked;

		setScopedAttribute("checked", checked);
	}

	public void setChildren(java.lang.Object children) {
		_children = children;

		setScopedAttribute("children", children);
	}

	public void setContainer(java.lang.String container) {
		_container = container;

		setScopedAttribute("container", container);
	}

	public void setDestroyed(boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDraggable(boolean draggable) {
		_draggable = draggable;

		setScopedAttribute("draggable", draggable);
	}

	public void setExpanded(boolean expanded) {
		_expanded = expanded;

		setScopedAttribute("expanded", expanded);
	}

	public void setHitAreaEl(java.lang.String hitAreaEl) {
		_hitAreaEl = hitAreaEl;

		setScopedAttribute("hitAreaEl", hitAreaEl);
	}

	public void setIconEl(java.lang.String iconEl) {
		_iconEl = iconEl;

		setScopedAttribute("iconEl", iconEl);
	}

	public void setTreenodetaskId(java.lang.String treenodetaskId) {
		_treenodetaskId = treenodetaskId;

		setScopedAttribute("treenodetaskId", treenodetaskId);
	}

	public void setIndex(java.lang.Object index) {
		_index = index;

		setScopedAttribute("index", index);
	}

	public void setInitialized(boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setIo(java.lang.Object io) {
		_io = io;

		setScopedAttribute("io", io);
	}

	public void setLabel(java.lang.String label) {
		_label = label;

		setScopedAttribute("label", label);
	}

	public void setLabelEl(java.lang.String labelEl) {
		_labelEl = labelEl;

		setScopedAttribute("labelEl", labelEl);
	}

	public void setLeaf(boolean leaf) {
		_leaf = leaf;

		setScopedAttribute("leaf", leaf);
	}

	public void setLoaded(boolean loaded) {
		_loaded = loaded;

		setScopedAttribute("loaded", loaded);
	}

	public void setLoading(boolean loading) {
		_loading = loading;

		setScopedAttribute("loading", loading);
	}

	public void setNextSibling(java.lang.Object nextSibling) {
		_nextSibling = nextSibling;

		setScopedAttribute("nextSibling", nextSibling);
	}

	public void setOwnerTree(java.lang.Object ownerTree) {
		_ownerTree = ownerTree;

		setScopedAttribute("ownerTree", ownerTree);
	}

	public void setParentNode(java.lang.Object parentNode) {
		_parentNode = parentNode;

		setScopedAttribute("parentNode", parentNode);
	}

	public void setPrevSibling(java.lang.Object prevSibling) {
		_prevSibling = prevSibling;

		setScopedAttribute("prevSibling", prevSibling);
	}

	public void setAfterAlwaysShowHitAreaChange(java.lang.Object afterAlwaysShowHitAreaChange) {
		_afterAlwaysShowHitAreaChange = afterAlwaysShowHitAreaChange;

		setScopedAttribute("afterAlwaysShowHitAreaChange", afterAlwaysShowHitAreaChange);
	}

	public void setAfterCacheChange(java.lang.Object afterCacheChange) {
		_afterCacheChange = afterCacheChange;

		setScopedAttribute("afterCacheChange", afterCacheChange);
	}

	public void setAfterCheckContainerElChange(java.lang.Object afterCheckContainerElChange) {
		_afterCheckContainerElChange = afterCheckContainerElChange;

		setScopedAttribute("afterCheckContainerElChange", afterCheckContainerElChange);
	}

	public void setAfterCheckElChange(java.lang.Object afterCheckElChange) {
		_afterCheckElChange = afterCheckElChange;

		setScopedAttribute("afterCheckElChange", afterCheckElChange);
	}

	public void setAfterCheckNameChange(java.lang.Object afterCheckNameChange) {
		_afterCheckNameChange = afterCheckNameChange;

		setScopedAttribute("afterCheckNameChange", afterCheckNameChange);
	}

	public void setAfterCheckedChange(java.lang.Object afterCheckedChange) {
		_afterCheckedChange = afterCheckedChange;

		setScopedAttribute("afterCheckedChange", afterCheckedChange);
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

	public void setAfterDraggableChange(java.lang.Object afterDraggableChange) {
		_afterDraggableChange = afterDraggableChange;

		setScopedAttribute("afterDraggableChange", afterDraggableChange);
	}

	public void setAfterExpandedChange(java.lang.Object afterExpandedChange) {
		_afterExpandedChange = afterExpandedChange;

		setScopedAttribute("afterExpandedChange", afterExpandedChange);
	}

	public void setAfterHitAreaElChange(java.lang.Object afterHitAreaElChange) {
		_afterHitAreaElChange = afterHitAreaElChange;

		setScopedAttribute("afterHitAreaElChange", afterHitAreaElChange);
	}

	public void setAfterIconElChange(java.lang.Object afterIconElChange) {
		_afterIconElChange = afterIconElChange;

		setScopedAttribute("afterIconElChange", afterIconElChange);
	}

	public void setAfterIdChange(java.lang.Object afterIdChange) {
		_afterIdChange = afterIdChange;

		setScopedAttribute("afterIdChange", afterIdChange);
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

	public void setAfterLabelChange(java.lang.Object afterLabelChange) {
		_afterLabelChange = afterLabelChange;

		setScopedAttribute("afterLabelChange", afterLabelChange);
	}

	public void setAfterLabelElChange(java.lang.Object afterLabelElChange) {
		_afterLabelElChange = afterLabelElChange;

		setScopedAttribute("afterLabelElChange", afterLabelElChange);
	}

	public void setAfterLeafChange(java.lang.Object afterLeafChange) {
		_afterLeafChange = afterLeafChange;

		setScopedAttribute("afterLeafChange", afterLeafChange);
	}

	public void setAfterLoadedChange(java.lang.Object afterLoadedChange) {
		_afterLoadedChange = afterLoadedChange;

		setScopedAttribute("afterLoadedChange", afterLoadedChange);
	}

	public void setAfterLoadingChange(java.lang.Object afterLoadingChange) {
		_afterLoadingChange = afterLoadingChange;

		setScopedAttribute("afterLoadingChange", afterLoadingChange);
	}

	public void setAfterNextSiblingChange(java.lang.Object afterNextSiblingChange) {
		_afterNextSiblingChange = afterNextSiblingChange;

		setScopedAttribute("afterNextSiblingChange", afterNextSiblingChange);
	}

	public void setAfterOwnerTreeChange(java.lang.Object afterOwnerTreeChange) {
		_afterOwnerTreeChange = afterOwnerTreeChange;

		setScopedAttribute("afterOwnerTreeChange", afterOwnerTreeChange);
	}

	public void setAfterParentNodeChange(java.lang.Object afterParentNodeChange) {
		_afterParentNodeChange = afterParentNodeChange;

		setScopedAttribute("afterParentNodeChange", afterParentNodeChange);
	}

	public void setAfterPrevSiblingChange(java.lang.Object afterPrevSiblingChange) {
		_afterPrevSiblingChange = afterPrevSiblingChange;

		setScopedAttribute("afterPrevSiblingChange", afterPrevSiblingChange);
	}

	public void setOnAlwaysShowHitAreaChange(java.lang.Object onAlwaysShowHitAreaChange) {
		_onAlwaysShowHitAreaChange = onAlwaysShowHitAreaChange;

		setScopedAttribute("onAlwaysShowHitAreaChange", onAlwaysShowHitAreaChange);
	}

	public void setOnCacheChange(java.lang.Object onCacheChange) {
		_onCacheChange = onCacheChange;

		setScopedAttribute("onCacheChange", onCacheChange);
	}

	public void setOnCheckContainerElChange(java.lang.Object onCheckContainerElChange) {
		_onCheckContainerElChange = onCheckContainerElChange;

		setScopedAttribute("onCheckContainerElChange", onCheckContainerElChange);
	}

	public void setOnCheckElChange(java.lang.Object onCheckElChange) {
		_onCheckElChange = onCheckElChange;

		setScopedAttribute("onCheckElChange", onCheckElChange);
	}

	public void setOnCheckNameChange(java.lang.Object onCheckNameChange) {
		_onCheckNameChange = onCheckNameChange;

		setScopedAttribute("onCheckNameChange", onCheckNameChange);
	}

	public void setOnCheckedChange(java.lang.Object onCheckedChange) {
		_onCheckedChange = onCheckedChange;

		setScopedAttribute("onCheckedChange", onCheckedChange);
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

	public void setOnDraggableChange(java.lang.Object onDraggableChange) {
		_onDraggableChange = onDraggableChange;

		setScopedAttribute("onDraggableChange", onDraggableChange);
	}

	public void setOnExpandedChange(java.lang.Object onExpandedChange) {
		_onExpandedChange = onExpandedChange;

		setScopedAttribute("onExpandedChange", onExpandedChange);
	}

	public void setOnHitAreaElChange(java.lang.Object onHitAreaElChange) {
		_onHitAreaElChange = onHitAreaElChange;

		setScopedAttribute("onHitAreaElChange", onHitAreaElChange);
	}

	public void setOnIconElChange(java.lang.Object onIconElChange) {
		_onIconElChange = onIconElChange;

		setScopedAttribute("onIconElChange", onIconElChange);
	}

	public void setOnIdChange(java.lang.Object onIdChange) {
		_onIdChange = onIdChange;

		setScopedAttribute("onIdChange", onIdChange);
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

	public void setOnLabelChange(java.lang.Object onLabelChange) {
		_onLabelChange = onLabelChange;

		setScopedAttribute("onLabelChange", onLabelChange);
	}

	public void setOnLabelElChange(java.lang.Object onLabelElChange) {
		_onLabelElChange = onLabelElChange;

		setScopedAttribute("onLabelElChange", onLabelElChange);
	}

	public void setOnLeafChange(java.lang.Object onLeafChange) {
		_onLeafChange = onLeafChange;

		setScopedAttribute("onLeafChange", onLeafChange);
	}

	public void setOnLoadedChange(java.lang.Object onLoadedChange) {
		_onLoadedChange = onLoadedChange;

		setScopedAttribute("onLoadedChange", onLoadedChange);
	}

	public void setOnLoadingChange(java.lang.Object onLoadingChange) {
		_onLoadingChange = onLoadingChange;

		setScopedAttribute("onLoadingChange", onLoadingChange);
	}

	public void setOnNextSiblingChange(java.lang.Object onNextSiblingChange) {
		_onNextSiblingChange = onNextSiblingChange;

		setScopedAttribute("onNextSiblingChange", onNextSiblingChange);
	}

	public void setOnOwnerTreeChange(java.lang.Object onOwnerTreeChange) {
		_onOwnerTreeChange = onOwnerTreeChange;

		setScopedAttribute("onOwnerTreeChange", onOwnerTreeChange);
	}

	public void setOnParentNodeChange(java.lang.Object onParentNodeChange) {
		_onParentNodeChange = onParentNodeChange;

		setScopedAttribute("onParentNodeChange", onParentNodeChange);
	}

	public void setOnPrevSiblingChange(java.lang.Object onPrevSiblingChange) {
		_onPrevSiblingChange = onPrevSiblingChange;

		setScopedAttribute("onPrevSiblingChange", onPrevSiblingChange);
	}

	@Override
	protected void cleanUp() {
		_alwaysShowHitArea = true;
		_cache = true;
		_checkContainerEl = null;
		_checkEl = null;
		_checkName = "tree-node-check";
		_checked = false;
		_children = null;
		_container = null;
		_destroyed = false;
		_draggable = true;
		_expanded = false;
		_hitAreaEl = null;
		_iconEl = null;
		_treenodetaskId = null;
		_index = null;
		_initialized = false;
		_io = null;
		_label = null;
		_labelEl = null;
		_leaf = true;
		_loaded = false;
		_loading = false;
		_nextSibling = null;
		_ownerTree = null;
		_parentNode = null;
		_prevSibling = null;
		_afterAlwaysShowHitAreaChange = null;
		_afterCacheChange = null;
		_afterCheckContainerElChange = null;
		_afterCheckElChange = null;
		_afterCheckNameChange = null;
		_afterCheckedChange = null;
		_afterChildrenChange = null;
		_afterContainerChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterDraggableChange = null;
		_afterExpandedChange = null;
		_afterHitAreaElChange = null;
		_afterIconElChange = null;
		_afterIdChange = null;
		_afterIndexChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterIoChange = null;
		_afterLabelChange = null;
		_afterLabelElChange = null;
		_afterLeafChange = null;
		_afterLoadedChange = null;
		_afterLoadingChange = null;
		_afterNextSiblingChange = null;
		_afterOwnerTreeChange = null;
		_afterParentNodeChange = null;
		_afterPrevSiblingChange = null;
		_onAlwaysShowHitAreaChange = null;
		_onCacheChange = null;
		_onCheckContainerElChange = null;
		_onCheckElChange = null;
		_onCheckNameChange = null;
		_onCheckedChange = null;
		_onChildrenChange = null;
		_onContainerChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onDraggableChange = null;
		_onExpandedChange = null;
		_onHitAreaElChange = null;
		_onIconElChange = null;
		_onIdChange = null;
		_onIndexChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onIoChange = null;
		_onLabelChange = null;
		_onLabelElChange = null;
		_onLeafChange = null;
		_onLoadedChange = null;
		_onLoadingChange = null;
		_onNextSiblingChange = null;
		_onOwnerTreeChange = null;
		_onParentNodeChange = null;
		_onPrevSiblingChange = null;
	}

	@Override
	protected String getPage() {
		return _PAGE;
	}

	@Override
	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "alwaysShowHitArea", _alwaysShowHitArea);
		setNamespacedAttribute(request, "cache", _cache);
		setNamespacedAttribute(request, "checkContainerEl", _checkContainerEl);
		setNamespacedAttribute(request, "checkEl", _checkEl);
		setNamespacedAttribute(request, "checkName", _checkName);
		setNamespacedAttribute(request, "checked", _checked);
		setNamespacedAttribute(request, "children", _children);
		setNamespacedAttribute(request, "container", _container);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "draggable", _draggable);
		setNamespacedAttribute(request, "expanded", _expanded);
		setNamespacedAttribute(request, "hitAreaEl", _hitAreaEl);
		setNamespacedAttribute(request, "iconEl", _iconEl);
		setNamespacedAttribute(request, "treenodetaskId", _treenodetaskId);
		setNamespacedAttribute(request, "index", _index);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "io", _io);
		setNamespacedAttribute(request, "label", _label);
		setNamespacedAttribute(request, "labelEl", _labelEl);
		setNamespacedAttribute(request, "leaf", _leaf);
		setNamespacedAttribute(request, "loaded", _loaded);
		setNamespacedAttribute(request, "loading", _loading);
		setNamespacedAttribute(request, "nextSibling", _nextSibling);
		setNamespacedAttribute(request, "ownerTree", _ownerTree);
		setNamespacedAttribute(request, "parentNode", _parentNode);
		setNamespacedAttribute(request, "prevSibling", _prevSibling);
		setNamespacedAttribute(request, "afterAlwaysShowHitAreaChange", _afterAlwaysShowHitAreaChange);
		setNamespacedAttribute(request, "afterCacheChange", _afterCacheChange);
		setNamespacedAttribute(request, "afterCheckContainerElChange", _afterCheckContainerElChange);
		setNamespacedAttribute(request, "afterCheckElChange", _afterCheckElChange);
		setNamespacedAttribute(request, "afterCheckNameChange", _afterCheckNameChange);
		setNamespacedAttribute(request, "afterCheckedChange", _afterCheckedChange);
		setNamespacedAttribute(request, "afterChildrenChange", _afterChildrenChange);
		setNamespacedAttribute(request, "afterContainerChange", _afterContainerChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDraggableChange", _afterDraggableChange);
		setNamespacedAttribute(request, "afterExpandedChange", _afterExpandedChange);
		setNamespacedAttribute(request, "afterHitAreaElChange", _afterHitAreaElChange);
		setNamespacedAttribute(request, "afterIconElChange", _afterIconElChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterIndexChange", _afterIndexChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterIoChange", _afterIoChange);
		setNamespacedAttribute(request, "afterLabelChange", _afterLabelChange);
		setNamespacedAttribute(request, "afterLabelElChange", _afterLabelElChange);
		setNamespacedAttribute(request, "afterLeafChange", _afterLeafChange);
		setNamespacedAttribute(request, "afterLoadedChange", _afterLoadedChange);
		setNamespacedAttribute(request, "afterLoadingChange", _afterLoadingChange);
		setNamespacedAttribute(request, "afterNextSiblingChange", _afterNextSiblingChange);
		setNamespacedAttribute(request, "afterOwnerTreeChange", _afterOwnerTreeChange);
		setNamespacedAttribute(request, "afterParentNodeChange", _afterParentNodeChange);
		setNamespacedAttribute(request, "afterPrevSiblingChange", _afterPrevSiblingChange);
		setNamespacedAttribute(request, "onAlwaysShowHitAreaChange", _onAlwaysShowHitAreaChange);
		setNamespacedAttribute(request, "onCacheChange", _onCacheChange);
		setNamespacedAttribute(request, "onCheckContainerElChange", _onCheckContainerElChange);
		setNamespacedAttribute(request, "onCheckElChange", _onCheckElChange);
		setNamespacedAttribute(request, "onCheckNameChange", _onCheckNameChange);
		setNamespacedAttribute(request, "onCheckedChange", _onCheckedChange);
		setNamespacedAttribute(request, "onChildrenChange", _onChildrenChange);
		setNamespacedAttribute(request, "onContainerChange", _onContainerChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDraggableChange", _onDraggableChange);
		setNamespacedAttribute(request, "onExpandedChange", _onExpandedChange);
		setNamespacedAttribute(request, "onHitAreaElChange", _onHitAreaElChange);
		setNamespacedAttribute(request, "onIconElChange", _onIconElChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onIndexChange", _onIndexChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onIoChange", _onIoChange);
		setNamespacedAttribute(request, "onLabelChange", _onLabelChange);
		setNamespacedAttribute(request, "onLabelElChange", _onLabelElChange);
		setNamespacedAttribute(request, "onLeafChange", _onLeafChange);
		setNamespacedAttribute(request, "onLoadedChange", _onLoadedChange);
		setNamespacedAttribute(request, "onLoadingChange", _onLoadingChange);
		setNamespacedAttribute(request, "onNextSiblingChange", _onNextSiblingChange);
		setNamespacedAttribute(request, "onOwnerTreeChange", _onOwnerTreeChange);
		setNamespacedAttribute(request, "onParentNodeChange", _onParentNodeChange);
		setNamespacedAttribute(request, "onPrevSiblingChange", _onPrevSiblingChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:tree-node-task:";

	private static final String _PAGE =
		"/html/taglib/alloy/tree_node_task/page.jsp";

	private boolean _alwaysShowHitArea = true;
	private boolean _cache = true;
	private java.lang.String _checkContainerEl = null;
	private java.lang.String _checkEl = null;
	private java.lang.String _checkName = "tree-node-check";
	private boolean _checked = false;
	private java.lang.Object _children = null;
	private java.lang.String _container = null;
	private boolean _destroyed = false;
	private boolean _draggable = true;
	private boolean _expanded = false;
	private java.lang.String _hitAreaEl = null;
	private java.lang.String _iconEl = null;
	private java.lang.String _treenodetaskId = null;
	private java.lang.Object _index = null;
	private boolean _initialized = false;
	private java.lang.Object _io = null;
	private java.lang.String _label = null;
	private java.lang.String _labelEl = null;
	private boolean _leaf = true;
	private boolean _loaded = false;
	private boolean _loading = false;
	private java.lang.Object _nextSibling = null;
	private java.lang.Object _ownerTree = null;
	private java.lang.Object _parentNode = null;
	private java.lang.Object _prevSibling = null;
	private java.lang.Object _afterAlwaysShowHitAreaChange = null;
	private java.lang.Object _afterCacheChange = null;
	private java.lang.Object _afterCheckContainerElChange = null;
	private java.lang.Object _afterCheckElChange = null;
	private java.lang.Object _afterCheckNameChange = null;
	private java.lang.Object _afterCheckedChange = null;
	private java.lang.Object _afterChildrenChange = null;
	private java.lang.Object _afterContainerChange = null;
	private java.lang.Object _afterDestroy = null;
	private java.lang.Object _afterDestroyedChange = null;
	private java.lang.Object _afterDraggableChange = null;
	private java.lang.Object _afterExpandedChange = null;
	private java.lang.Object _afterHitAreaElChange = null;
	private java.lang.Object _afterIconElChange = null;
	private java.lang.Object _afterIdChange = null;
	private java.lang.Object _afterIndexChange = null;
	private java.lang.Object _afterInit = null;
	private java.lang.Object _afterInitializedChange = null;
	private java.lang.Object _afterIoChange = null;
	private java.lang.Object _afterLabelChange = null;
	private java.lang.Object _afterLabelElChange = null;
	private java.lang.Object _afterLeafChange = null;
	private java.lang.Object _afterLoadedChange = null;
	private java.lang.Object _afterLoadingChange = null;
	private java.lang.Object _afterNextSiblingChange = null;
	private java.lang.Object _afterOwnerTreeChange = null;
	private java.lang.Object _afterParentNodeChange = null;
	private java.lang.Object _afterPrevSiblingChange = null;
	private java.lang.Object _onAlwaysShowHitAreaChange = null;
	private java.lang.Object _onCacheChange = null;
	private java.lang.Object _onCheckContainerElChange = null;
	private java.lang.Object _onCheckElChange = null;
	private java.lang.Object _onCheckNameChange = null;
	private java.lang.Object _onCheckedChange = null;
	private java.lang.Object _onChildrenChange = null;
	private java.lang.Object _onContainerChange = null;
	private java.lang.Object _onDestroy = null;
	private java.lang.Object _onDestroyedChange = null;
	private java.lang.Object _onDraggableChange = null;
	private java.lang.Object _onExpandedChange = null;
	private java.lang.Object _onHitAreaElChange = null;
	private java.lang.Object _onIconElChange = null;
	private java.lang.Object _onIdChange = null;
	private java.lang.Object _onIndexChange = null;
	private java.lang.Object _onInit = null;
	private java.lang.Object _onInitializedChange = null;
	private java.lang.Object _onIoChange = null;
	private java.lang.Object _onLabelChange = null;
	private java.lang.Object _onLabelElChange = null;
	private java.lang.Object _onLeafChange = null;
	private java.lang.Object _onLoadedChange = null;
	private java.lang.Object _onLoadingChange = null;
	private java.lang.Object _onNextSiblingChange = null;
	private java.lang.Object _onOwnerTreeChange = null;
	private java.lang.Object _onParentNodeChange = null;
	private java.lang.Object _onPrevSiblingChange = null;

}