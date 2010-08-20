package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseTreeNodeTaskTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseTreeNodeTaskTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.String getAlwaysShowHitArea() {
		return _alwaysShowHitArea;
	}

	public java.lang.String getCache() {
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

	public java.lang.String getChecked() {
		return _checked;
	}

	public java.lang.String getChildren() {
		return _children;
	}

	public java.lang.String getContainer() {
		return _container;
	}

	public java.lang.String getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getDraggable() {
		return _draggable;
	}

	public java.lang.String getExpanded() {
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

	public java.lang.String getInitialized() {
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

	public java.lang.String getLeaf() {
		return _leaf;
	}

	public java.lang.String getLoaded() {
		return _loaded;
	}

	public java.lang.String getLoading() {
		return _loading;
	}

	public java.lang.String getNextSibling() {
		return _nextSibling;
	}

	public java.lang.String getOwnerTree() {
		return _ownerTree;
	}

	public java.lang.String getParentNode() {
		return _parentNode;
	}

	public java.lang.String getPrevSibling() {
		return _prevSibling;
	}

	public java.lang.String getAfterAlwaysShowHitAreaChange() {
		return _afterAlwaysShowHitAreaChange;
	}

	public java.lang.String getAfterCacheChange() {
		return _afterCacheChange;
	}

	public java.lang.String getAfterCheckContainerElChange() {
		return _afterCheckContainerElChange;
	}

	public java.lang.String getAfterCheckElChange() {
		return _afterCheckElChange;
	}

	public java.lang.String getAfterCheckNameChange() {
		return _afterCheckNameChange;
	}

	public java.lang.String getAfterCheckedChange() {
		return _afterCheckedChange;
	}

	public java.lang.String getAfterChildrenChange() {
		return _afterChildrenChange;
	}

	public java.lang.String getAfterContainerChange() {
		return _afterContainerChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterDraggableChange() {
		return _afterDraggableChange;
	}

	public java.lang.String getAfterExpandedChange() {
		return _afterExpandedChange;
	}

	public java.lang.String getAfterHitAreaElChange() {
		return _afterHitAreaElChange;
	}

	public java.lang.String getAfterIconElChange() {
		return _afterIconElChange;
	}

	public java.lang.String getAfterIdChange() {
		return _afterIdChange;
	}

	public java.lang.String getAfterIndexChange() {
		return _afterIndexChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterIoChange() {
		return _afterIoChange;
	}

	public java.lang.String getAfterLabelChange() {
		return _afterLabelChange;
	}

	public java.lang.String getAfterLabelElChange() {
		return _afterLabelElChange;
	}

	public java.lang.String getAfterLeafChange() {
		return _afterLeafChange;
	}

	public java.lang.String getAfterLoadedChange() {
		return _afterLoadedChange;
	}

	public java.lang.String getAfterLoadingChange() {
		return _afterLoadingChange;
	}

	public java.lang.String getAfterNextSiblingChange() {
		return _afterNextSiblingChange;
	}

	public java.lang.String getAfterOwnerTreeChange() {
		return _afterOwnerTreeChange;
	}

	public java.lang.String getAfterParentNodeChange() {
		return _afterParentNodeChange;
	}

	public java.lang.String getAfterPrevSiblingChange() {
		return _afterPrevSiblingChange;
	}

	public java.lang.String getOnAlwaysShowHitAreaChange() {
		return _onAlwaysShowHitAreaChange;
	}

	public java.lang.String getOnCacheChange() {
		return _onCacheChange;
	}

	public java.lang.String getOnCheckContainerElChange() {
		return _onCheckContainerElChange;
	}

	public java.lang.String getOnCheckElChange() {
		return _onCheckElChange;
	}

	public java.lang.String getOnCheckNameChange() {
		return _onCheckNameChange;
	}

	public java.lang.String getOnCheckedChange() {
		return _onCheckedChange;
	}

	public java.lang.String getOnChildrenChange() {
		return _onChildrenChange;
	}

	public java.lang.String getOnContainerChange() {
		return _onContainerChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnDraggableChange() {
		return _onDraggableChange;
	}

	public java.lang.String getOnExpandedChange() {
		return _onExpandedChange;
	}

	public java.lang.String getOnHitAreaElChange() {
		return _onHitAreaElChange;
	}

	public java.lang.String getOnIconElChange() {
		return _onIconElChange;
	}

	public java.lang.String getOnIdChange() {
		return _onIdChange;
	}

	public java.lang.String getOnIndexChange() {
		return _onIndexChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnIoChange() {
		return _onIoChange;
	}

	public java.lang.String getOnLabelChange() {
		return _onLabelChange;
	}

	public java.lang.String getOnLabelElChange() {
		return _onLabelElChange;
	}

	public java.lang.String getOnLeafChange() {
		return _onLeafChange;
	}

	public java.lang.String getOnLoadedChange() {
		return _onLoadedChange;
	}

	public java.lang.String getOnLoadingChange() {
		return _onLoadingChange;
	}

	public java.lang.String getOnNextSiblingChange() {
		return _onNextSiblingChange;
	}

	public java.lang.String getOnOwnerTreeChange() {
		return _onOwnerTreeChange;
	}

	public java.lang.String getOnParentNodeChange() {
		return _onParentNodeChange;
	}

	public java.lang.String getOnPrevSiblingChange() {
		return _onPrevSiblingChange;
	}

	public void setAlwaysShowHitArea(java.lang.String alwaysShowHitArea) {
		_alwaysShowHitArea = alwaysShowHitArea;

		setScopedAttribute("alwaysShowHitArea", alwaysShowHitArea);
	}

	public void setCache(java.lang.String cache) {
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

	public void setChecked(java.lang.String checked) {
		_checked = checked;

		setScopedAttribute("checked", checked);
	}

	public void setChildren(java.lang.String children) {
		_children = children;

		setScopedAttribute("children", children);
	}

	public void setContainer(java.lang.String container) {
		_container = container;

		setScopedAttribute("container", container);
	}

	public void setDestroyed(java.lang.String destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDraggable(java.lang.String draggable) {
		_draggable = draggable;

		setScopedAttribute("draggable", draggable);
	}

	public void setExpanded(java.lang.String expanded) {
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

	public void setInitialized(java.lang.String initialized) {
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

	public void setLeaf(java.lang.String leaf) {
		_leaf = leaf;

		setScopedAttribute("leaf", leaf);
	}

	public void setLoaded(java.lang.String loaded) {
		_loaded = loaded;

		setScopedAttribute("loaded", loaded);
	}

	public void setLoading(java.lang.String loading) {
		_loading = loading;

		setScopedAttribute("loading", loading);
	}

	public void setNextSibling(java.lang.String nextSibling) {
		_nextSibling = nextSibling;

		setScopedAttribute("nextSibling", nextSibling);
	}

	public void setOwnerTree(java.lang.String ownerTree) {
		_ownerTree = ownerTree;

		setScopedAttribute("ownerTree", ownerTree);
	}

	public void setParentNode(java.lang.String parentNode) {
		_parentNode = parentNode;

		setScopedAttribute("parentNode", parentNode);
	}

	public void setPrevSibling(java.lang.String prevSibling) {
		_prevSibling = prevSibling;

		setScopedAttribute("prevSibling", prevSibling);
	}

	public void setAfterAlwaysShowHitAreaChange(java.lang.String afterAlwaysShowHitAreaChange) {
		_afterAlwaysShowHitAreaChange = afterAlwaysShowHitAreaChange;

		setScopedAttribute("afterAlwaysShowHitAreaChange", afterAlwaysShowHitAreaChange);
	}

	public void setAfterCacheChange(java.lang.String afterCacheChange) {
		_afterCacheChange = afterCacheChange;

		setScopedAttribute("afterCacheChange", afterCacheChange);
	}

	public void setAfterCheckContainerElChange(java.lang.String afterCheckContainerElChange) {
		_afterCheckContainerElChange = afterCheckContainerElChange;

		setScopedAttribute("afterCheckContainerElChange", afterCheckContainerElChange);
	}

	public void setAfterCheckElChange(java.lang.String afterCheckElChange) {
		_afterCheckElChange = afterCheckElChange;

		setScopedAttribute("afterCheckElChange", afterCheckElChange);
	}

	public void setAfterCheckNameChange(java.lang.String afterCheckNameChange) {
		_afterCheckNameChange = afterCheckNameChange;

		setScopedAttribute("afterCheckNameChange", afterCheckNameChange);
	}

	public void setAfterCheckedChange(java.lang.String afterCheckedChange) {
		_afterCheckedChange = afterCheckedChange;

		setScopedAttribute("afterCheckedChange", afterCheckedChange);
	}

	public void setAfterChildrenChange(java.lang.String afterChildrenChange) {
		_afterChildrenChange = afterChildrenChange;

		setScopedAttribute("afterChildrenChange", afterChildrenChange);
	}

	public void setAfterContainerChange(java.lang.String afterContainerChange) {
		_afterContainerChange = afterContainerChange;

		setScopedAttribute("afterContainerChange", afterContainerChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterDraggableChange(java.lang.String afterDraggableChange) {
		_afterDraggableChange = afterDraggableChange;

		setScopedAttribute("afterDraggableChange", afterDraggableChange);
	}

	public void setAfterExpandedChange(java.lang.String afterExpandedChange) {
		_afterExpandedChange = afterExpandedChange;

		setScopedAttribute("afterExpandedChange", afterExpandedChange);
	}

	public void setAfterHitAreaElChange(java.lang.String afterHitAreaElChange) {
		_afterHitAreaElChange = afterHitAreaElChange;

		setScopedAttribute("afterHitAreaElChange", afterHitAreaElChange);
	}

	public void setAfterIconElChange(java.lang.String afterIconElChange) {
		_afterIconElChange = afterIconElChange;

		setScopedAttribute("afterIconElChange", afterIconElChange);
	}

	public void setAfterIdChange(java.lang.String afterIdChange) {
		_afterIdChange = afterIdChange;

		setScopedAttribute("afterIdChange", afterIdChange);
	}

	public void setAfterIndexChange(java.lang.String afterIndexChange) {
		_afterIndexChange = afterIndexChange;

		setScopedAttribute("afterIndexChange", afterIndexChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterIoChange(java.lang.String afterIoChange) {
		_afterIoChange = afterIoChange;

		setScopedAttribute("afterIoChange", afterIoChange);
	}

	public void setAfterLabelChange(java.lang.String afterLabelChange) {
		_afterLabelChange = afterLabelChange;

		setScopedAttribute("afterLabelChange", afterLabelChange);
	}

	public void setAfterLabelElChange(java.lang.String afterLabelElChange) {
		_afterLabelElChange = afterLabelElChange;

		setScopedAttribute("afterLabelElChange", afterLabelElChange);
	}

	public void setAfterLeafChange(java.lang.String afterLeafChange) {
		_afterLeafChange = afterLeafChange;

		setScopedAttribute("afterLeafChange", afterLeafChange);
	}

	public void setAfterLoadedChange(java.lang.String afterLoadedChange) {
		_afterLoadedChange = afterLoadedChange;

		setScopedAttribute("afterLoadedChange", afterLoadedChange);
	}

	public void setAfterLoadingChange(java.lang.String afterLoadingChange) {
		_afterLoadingChange = afterLoadingChange;

		setScopedAttribute("afterLoadingChange", afterLoadingChange);
	}

	public void setAfterNextSiblingChange(java.lang.String afterNextSiblingChange) {
		_afterNextSiblingChange = afterNextSiblingChange;

		setScopedAttribute("afterNextSiblingChange", afterNextSiblingChange);
	}

	public void setAfterOwnerTreeChange(java.lang.String afterOwnerTreeChange) {
		_afterOwnerTreeChange = afterOwnerTreeChange;

		setScopedAttribute("afterOwnerTreeChange", afterOwnerTreeChange);
	}

	public void setAfterParentNodeChange(java.lang.String afterParentNodeChange) {
		_afterParentNodeChange = afterParentNodeChange;

		setScopedAttribute("afterParentNodeChange", afterParentNodeChange);
	}

	public void setAfterPrevSiblingChange(java.lang.String afterPrevSiblingChange) {
		_afterPrevSiblingChange = afterPrevSiblingChange;

		setScopedAttribute("afterPrevSiblingChange", afterPrevSiblingChange);
	}

	public void setOnAlwaysShowHitAreaChange(java.lang.String onAlwaysShowHitAreaChange) {
		_onAlwaysShowHitAreaChange = onAlwaysShowHitAreaChange;

		setScopedAttribute("onAlwaysShowHitAreaChange", onAlwaysShowHitAreaChange);
	}

	public void setOnCacheChange(java.lang.String onCacheChange) {
		_onCacheChange = onCacheChange;

		setScopedAttribute("onCacheChange", onCacheChange);
	}

	public void setOnCheckContainerElChange(java.lang.String onCheckContainerElChange) {
		_onCheckContainerElChange = onCheckContainerElChange;

		setScopedAttribute("onCheckContainerElChange", onCheckContainerElChange);
	}

	public void setOnCheckElChange(java.lang.String onCheckElChange) {
		_onCheckElChange = onCheckElChange;

		setScopedAttribute("onCheckElChange", onCheckElChange);
	}

	public void setOnCheckNameChange(java.lang.String onCheckNameChange) {
		_onCheckNameChange = onCheckNameChange;

		setScopedAttribute("onCheckNameChange", onCheckNameChange);
	}

	public void setOnCheckedChange(java.lang.String onCheckedChange) {
		_onCheckedChange = onCheckedChange;

		setScopedAttribute("onCheckedChange", onCheckedChange);
	}

	public void setOnChildrenChange(java.lang.String onChildrenChange) {
		_onChildrenChange = onChildrenChange;

		setScopedAttribute("onChildrenChange", onChildrenChange);
	}

	public void setOnContainerChange(java.lang.String onContainerChange) {
		_onContainerChange = onContainerChange;

		setScopedAttribute("onContainerChange", onContainerChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnDraggableChange(java.lang.String onDraggableChange) {
		_onDraggableChange = onDraggableChange;

		setScopedAttribute("onDraggableChange", onDraggableChange);
	}

	public void setOnExpandedChange(java.lang.String onExpandedChange) {
		_onExpandedChange = onExpandedChange;

		setScopedAttribute("onExpandedChange", onExpandedChange);
	}

	public void setOnHitAreaElChange(java.lang.String onHitAreaElChange) {
		_onHitAreaElChange = onHitAreaElChange;

		setScopedAttribute("onHitAreaElChange", onHitAreaElChange);
	}

	public void setOnIconElChange(java.lang.String onIconElChange) {
		_onIconElChange = onIconElChange;

		setScopedAttribute("onIconElChange", onIconElChange);
	}

	public void setOnIdChange(java.lang.String onIdChange) {
		_onIdChange = onIdChange;

		setScopedAttribute("onIdChange", onIdChange);
	}

	public void setOnIndexChange(java.lang.String onIndexChange) {
		_onIndexChange = onIndexChange;

		setScopedAttribute("onIndexChange", onIndexChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnIoChange(java.lang.String onIoChange) {
		_onIoChange = onIoChange;

		setScopedAttribute("onIoChange", onIoChange);
	}

	public void setOnLabelChange(java.lang.String onLabelChange) {
		_onLabelChange = onLabelChange;

		setScopedAttribute("onLabelChange", onLabelChange);
	}

	public void setOnLabelElChange(java.lang.String onLabelElChange) {
		_onLabelElChange = onLabelElChange;

		setScopedAttribute("onLabelElChange", onLabelElChange);
	}

	public void setOnLeafChange(java.lang.String onLeafChange) {
		_onLeafChange = onLeafChange;

		setScopedAttribute("onLeafChange", onLeafChange);
	}

	public void setOnLoadedChange(java.lang.String onLoadedChange) {
		_onLoadedChange = onLoadedChange;

		setScopedAttribute("onLoadedChange", onLoadedChange);
	}

	public void setOnLoadingChange(java.lang.String onLoadingChange) {
		_onLoadingChange = onLoadingChange;

		setScopedAttribute("onLoadingChange", onLoadingChange);
	}

	public void setOnNextSiblingChange(java.lang.String onNextSiblingChange) {
		_onNextSiblingChange = onNextSiblingChange;

		setScopedAttribute("onNextSiblingChange", onNextSiblingChange);
	}

	public void setOnOwnerTreeChange(java.lang.String onOwnerTreeChange) {
		_onOwnerTreeChange = onOwnerTreeChange;

		setScopedAttribute("onOwnerTreeChange", onOwnerTreeChange);
	}

	public void setOnParentNodeChange(java.lang.String onParentNodeChange) {
		_onParentNodeChange = onParentNodeChange;

		setScopedAttribute("onParentNodeChange", onParentNodeChange);
	}

	public void setOnPrevSiblingChange(java.lang.String onPrevSiblingChange) {
		_onPrevSiblingChange = onPrevSiblingChange;

		setScopedAttribute("onPrevSiblingChange", onPrevSiblingChange);
	}

	protected void _setAttributes(HttpServletRequest request) {
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

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:tree-node-task:";

	private static final String _PAGE =
		"/html/taglib/alloy/tree_node_task/page.jsp";

	private java.lang.String _alwaysShowHitArea;
	private java.lang.String _cache;
	private java.lang.String _checkContainerEl;
	private java.lang.String _checkEl;
	private java.lang.String _checkName;
	private java.lang.String _checked;
	private java.lang.String _children;
	private java.lang.String _container;
	private java.lang.String _destroyed;
	private java.lang.String _draggable;
	private java.lang.String _expanded;
	private java.lang.String _hitAreaEl;
	private java.lang.String _iconEl;
	private java.lang.String _treenodetaskId;
	private java.lang.Object _index;
	private java.lang.String _initialized;
	private java.lang.Object _io;
	private java.lang.String _label;
	private java.lang.String _labelEl;
	private java.lang.String _leaf;
	private java.lang.String _loaded;
	private java.lang.String _loading;
	private java.lang.String _nextSibling;
	private java.lang.String _ownerTree;
	private java.lang.String _parentNode;
	private java.lang.String _prevSibling;
	private java.lang.String _afterAlwaysShowHitAreaChange;
	private java.lang.String _afterCacheChange;
	private java.lang.String _afterCheckContainerElChange;
	private java.lang.String _afterCheckElChange;
	private java.lang.String _afterCheckNameChange;
	private java.lang.String _afterCheckedChange;
	private java.lang.String _afterChildrenChange;
	private java.lang.String _afterContainerChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterDraggableChange;
	private java.lang.String _afterExpandedChange;
	private java.lang.String _afterHitAreaElChange;
	private java.lang.String _afterIconElChange;
	private java.lang.String _afterIdChange;
	private java.lang.String _afterIndexChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterIoChange;
	private java.lang.String _afterLabelChange;
	private java.lang.String _afterLabelElChange;
	private java.lang.String _afterLeafChange;
	private java.lang.String _afterLoadedChange;
	private java.lang.String _afterLoadingChange;
	private java.lang.String _afterNextSiblingChange;
	private java.lang.String _afterOwnerTreeChange;
	private java.lang.String _afterParentNodeChange;
	private java.lang.String _afterPrevSiblingChange;
	private java.lang.String _onAlwaysShowHitAreaChange;
	private java.lang.String _onCacheChange;
	private java.lang.String _onCheckContainerElChange;
	private java.lang.String _onCheckElChange;
	private java.lang.String _onCheckNameChange;
	private java.lang.String _onCheckedChange;
	private java.lang.String _onChildrenChange;
	private java.lang.String _onContainerChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onDraggableChange;
	private java.lang.String _onExpandedChange;
	private java.lang.String _onHitAreaElChange;
	private java.lang.String _onIconElChange;
	private java.lang.String _onIdChange;
	private java.lang.String _onIndexChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onIoChange;
	private java.lang.String _onLabelChange;
	private java.lang.String _onLabelElChange;
	private java.lang.String _onLeafChange;
	private java.lang.String _onLoadedChange;
	private java.lang.String _onLoadingChange;
	private java.lang.String _onNextSiblingChange;
	private java.lang.String _onOwnerTreeChange;
	private java.lang.String _onParentNodeChange;
	private java.lang.String _onPrevSiblingChange;

}
