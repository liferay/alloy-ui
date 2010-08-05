<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-node-task:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-node-task:scopedAttributes");

java.lang.Boolean _alwaysShowHitArea = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:alwaysShowHitArea");
java.lang.Boolean _cache = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:cache");
java.lang.String _checkContainerEl = (java.lang.String)request.getAttribute("alloy:tree-node-task:checkContainerEl");
java.lang.String _checkEl = (java.lang.String)request.getAttribute("alloy:tree-node-task:checkEl");
java.lang.String _checkName = (java.lang.String)request.getAttribute("alloy:tree-node-task:checkName");
java.lang.Boolean _checked = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:checked");
java.lang.String _children = (java.lang.String)request.getAttribute("alloy:tree-node-task:children");
java.lang.String _container = (java.lang.String)request.getAttribute("alloy:tree-node-task:container");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:destroyed");
java.lang.Boolean _draggable = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:draggable");
java.lang.Boolean _expanded = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:expanded");
java.lang.String _hitAreaEl = (java.lang.String)request.getAttribute("alloy:tree-node-task:hitAreaEl");
java.lang.String _iconEl = (java.lang.String)request.getAttribute("alloy:tree-node-task:iconEl");
java.lang.String _treenodetaskId = (java.lang.String)request.getAttribute("alloy:tree-node-task:treenodetaskId");
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:tree-node-task:index");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:initialized");
java.lang.Object _io = (java.lang.Object)request.getAttribute("alloy:tree-node-task:io");
java.lang.String _label = (java.lang.String)request.getAttribute("alloy:tree-node-task:label");
java.lang.String _labelEl = (java.lang.String)request.getAttribute("alloy:tree-node-task:labelEl");
java.lang.Boolean _leaf = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:leaf");
java.lang.Boolean _loaded = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:loaded");
java.lang.Boolean _loading = (java.lang.Boolean)request.getAttribute("alloy:tree-node-task:loading");
java.lang.String _nextSibling = (java.lang.String)request.getAttribute("alloy:tree-node-task:nextSibling");
java.lang.String _ownerTree = (java.lang.String)request.getAttribute("alloy:tree-node-task:ownerTree");
java.lang.String _parentNode = (java.lang.String)request.getAttribute("alloy:tree-node-task:parentNode");
java.lang.String _prevSibling = (java.lang.String)request.getAttribute("alloy:tree-node-task:prevSibling");
java.lang.String _afterAlwaysShowHitAreaChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterAlwaysShowHitAreaChange");
java.lang.String _afterCacheChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterCacheChange");
java.lang.String _afterCheckContainerElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterCheckContainerElChange");
java.lang.String _afterCheckElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterCheckElChange");
java.lang.String _afterCheckNameChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterCheckNameChange");
java.lang.String _afterCheckedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterCheckedChange");
java.lang.String _afterChildrenChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterChildrenChange");
java.lang.String _afterContainerChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterContainerChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterDestroyedChange");
java.lang.String _afterDraggableChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterDraggableChange");
java.lang.String _afterExpandedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterExpandedChange");
java.lang.String _afterHitAreaElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterHitAreaElChange");
java.lang.String _afterIconElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterIconElChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterIdChange");
java.lang.String _afterIndexChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterIndexChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterInitializedChange");
java.lang.String _afterIoChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterIoChange");
java.lang.String _afterLabelChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterLabelChange");
java.lang.String _afterLabelElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterLabelElChange");
java.lang.String _afterLeafChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterLeafChange");
java.lang.String _afterLoadedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterLoadedChange");
java.lang.String _afterLoadingChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterLoadingChange");
java.lang.String _afterNextSiblingChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterNextSiblingChange");
java.lang.String _afterOwnerTreeChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterOwnerTreeChange");
java.lang.String _afterParentNodeChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterParentNodeChange");
java.lang.String _afterPrevSiblingChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:afterPrevSiblingChange");
java.lang.String _onAlwaysShowHitAreaChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onAlwaysShowHitAreaChange");
java.lang.String _onCacheChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onCacheChange");
java.lang.String _onCheckContainerElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onCheckContainerElChange");
java.lang.String _onCheckElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onCheckElChange");
java.lang.String _onCheckNameChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onCheckNameChange");
java.lang.String _onCheckedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onCheckedChange");
java.lang.String _onChildrenChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onChildrenChange");
java.lang.String _onContainerChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onContainerChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:tree-node-task:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onDestroyedChange");
java.lang.String _onDraggableChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onDraggableChange");
java.lang.String _onExpandedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onExpandedChange");
java.lang.String _onHitAreaElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onHitAreaElChange");
java.lang.String _onIconElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onIconElChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onIdChange");
java.lang.String _onIndexChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onIndexChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:tree-node-task:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onInitializedChange");
java.lang.String _onIoChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onIoChange");
java.lang.String _onLabelChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onLabelChange");
java.lang.String _onLabelElChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onLabelElChange");
java.lang.String _onLeafChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onLeafChange");
java.lang.String _onLoadedChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onLoadedChange");
java.lang.String _onLoadingChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onLoadingChange");
java.lang.String _onNextSiblingChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onNextSiblingChange");
java.lang.String _onOwnerTreeChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onOwnerTreeChange");
java.lang.String _onParentNodeChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onParentNodeChange");
java.lang.String _onPrevSiblingChange = (java.lang.String)request.getAttribute("alloy:tree-node-task:onPrevSiblingChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_alwaysShowHitArea != null) {
	scopedAttributes.put("alwaysShowHitArea", _alwaysShowHitArea);
}

if (_cache != null) {
	scopedAttributes.put("cache", _cache);
}

if (_checkContainerEl != null) {
	scopedAttributes.put("checkContainerEl", _checkContainerEl);
}

if (_checkEl != null) {
	scopedAttributes.put("checkEl", _checkEl);
}

if (_checkName != null) {
	scopedAttributes.put("checkName", _checkName);
}

if (_checked != null) {
	scopedAttributes.put("checked", _checked);
}

if (_children != null) {
	scopedAttributes.put("children", _children);
}

if (_container != null) {
	scopedAttributes.put("container", _container);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_draggable != null) {
	scopedAttributes.put("draggable", _draggable);
}

if (_expanded != null) {
	scopedAttributes.put("expanded", _expanded);
}

if (_hitAreaEl != null) {
	scopedAttributes.put("hitAreaEl", _hitAreaEl);
}

if (_iconEl != null) {
	scopedAttributes.put("iconEl", _iconEl);
}

if (_treenodetaskId != null) {
	scopedAttributes.put("treenodetaskId", _treenodetaskId);
}

if (_index != null) {
	scopedAttributes.put("index", _index);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_io != null) {
	scopedAttributes.put("io", _io);
}

if (_label != null) {
	scopedAttributes.put("label", _label);
}

if (_labelEl != null) {
	scopedAttributes.put("labelEl", _labelEl);
}

if (_leaf != null) {
	scopedAttributes.put("leaf", _leaf);
}

if (_loaded != null) {
	scopedAttributes.put("loaded", _loaded);
}

if (_loading != null) {
	scopedAttributes.put("loading", _loading);
}

if (_nextSibling != null) {
	scopedAttributes.put("nextSibling", _nextSibling);
}

if (_ownerTree != null) {
	scopedAttributes.put("ownerTree", _ownerTree);
}

if (_parentNode != null) {
	scopedAttributes.put("parentNode", _parentNode);
}

if (_prevSibling != null) {
	scopedAttributes.put("prevSibling", _prevSibling);
}

if (_afterAlwaysShowHitAreaChange != null) {
	scopedAttributes.put("afterAlwaysShowHitAreaChange", _afterAlwaysShowHitAreaChange);
}

if (_afterCacheChange != null) {
	scopedAttributes.put("afterCacheChange", _afterCacheChange);
}

if (_afterCheckContainerElChange != null) {
	scopedAttributes.put("afterCheckContainerElChange", _afterCheckContainerElChange);
}

if (_afterCheckElChange != null) {
	scopedAttributes.put("afterCheckElChange", _afterCheckElChange);
}

if (_afterCheckNameChange != null) {
	scopedAttributes.put("afterCheckNameChange", _afterCheckNameChange);
}

if (_afterCheckedChange != null) {
	scopedAttributes.put("afterCheckedChange", _afterCheckedChange);
}

if (_afterChildrenChange != null) {
	scopedAttributes.put("afterChildrenChange", _afterChildrenChange);
}

if (_afterContainerChange != null) {
	scopedAttributes.put("afterContainerChange", _afterContainerChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterDraggableChange != null) {
	scopedAttributes.put("afterDraggableChange", _afterDraggableChange);
}

if (_afterExpandedChange != null) {
	scopedAttributes.put("afterExpandedChange", _afterExpandedChange);
}

if (_afterHitAreaElChange != null) {
	scopedAttributes.put("afterHitAreaElChange", _afterHitAreaElChange);
}

if (_afterIconElChange != null) {
	scopedAttributes.put("afterIconElChange", _afterIconElChange);
}

if (_afterIdChange != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (_afterIndexChange != null) {
	scopedAttributes.put("afterIndexChange", _afterIndexChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterIoChange != null) {
	scopedAttributes.put("afterIoChange", _afterIoChange);
}

if (_afterLabelChange != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (_afterLabelElChange != null) {
	scopedAttributes.put("afterLabelElChange", _afterLabelElChange);
}

if (_afterLeafChange != null) {
	scopedAttributes.put("afterLeafChange", _afterLeafChange);
}

if (_afterLoadedChange != null) {
	scopedAttributes.put("afterLoadedChange", _afterLoadedChange);
}

if (_afterLoadingChange != null) {
	scopedAttributes.put("afterLoadingChange", _afterLoadingChange);
}

if (_afterNextSiblingChange != null) {
	scopedAttributes.put("afterNextSiblingChange", _afterNextSiblingChange);
}

if (_afterOwnerTreeChange != null) {
	scopedAttributes.put("afterOwnerTreeChange", _afterOwnerTreeChange);
}

if (_afterParentNodeChange != null) {
	scopedAttributes.put("afterParentNodeChange", _afterParentNodeChange);
}

if (_afterPrevSiblingChange != null) {
	scopedAttributes.put("afterPrevSiblingChange", _afterPrevSiblingChange);
}

if (_onAlwaysShowHitAreaChange != null) {
	scopedAttributes.put("onAlwaysShowHitAreaChange", _onAlwaysShowHitAreaChange);
}

if (_onCacheChange != null) {
	scopedAttributes.put("onCacheChange", _onCacheChange);
}

if (_onCheckContainerElChange != null) {
	scopedAttributes.put("onCheckContainerElChange", _onCheckContainerElChange);
}

if (_onCheckElChange != null) {
	scopedAttributes.put("onCheckElChange", _onCheckElChange);
}

if (_onCheckNameChange != null) {
	scopedAttributes.put("onCheckNameChange", _onCheckNameChange);
}

if (_onCheckedChange != null) {
	scopedAttributes.put("onCheckedChange", _onCheckedChange);
}

if (_onChildrenChange != null) {
	scopedAttributes.put("onChildrenChange", _onChildrenChange);
}

if (_onContainerChange != null) {
	scopedAttributes.put("onContainerChange", _onContainerChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onDraggableChange != null) {
	scopedAttributes.put("onDraggableChange", _onDraggableChange);
}

if (_onExpandedChange != null) {
	scopedAttributes.put("onExpandedChange", _onExpandedChange);
}

if (_onHitAreaElChange != null) {
	scopedAttributes.put("onHitAreaElChange", _onHitAreaElChange);
}

if (_onIconElChange != null) {
	scopedAttributes.put("onIconElChange", _onIconElChange);
}

if (_onIdChange != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (_onIndexChange != null) {
	scopedAttributes.put("onIndexChange", _onIndexChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onIoChange != null) {
	scopedAttributes.put("onIoChange", _onIoChange);
}

if (_onLabelChange != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (_onLabelElChange != null) {
	scopedAttributes.put("onLabelElChange", _onLabelElChange);
}

if (_onLeafChange != null) {
	scopedAttributes.put("onLeafChange", _onLeafChange);
}

if (_onLoadedChange != null) {
	scopedAttributes.put("onLoadedChange", _onLoadedChange);
}

if (_onLoadingChange != null) {
	scopedAttributes.put("onLoadingChange", _onLoadingChange);
}

if (_onNextSiblingChange != null) {
	scopedAttributes.put("onNextSiblingChange", _onNextSiblingChange);
}

if (_onOwnerTreeChange != null) {
	scopedAttributes.put("onOwnerTreeChange", _onOwnerTreeChange);
}

if (_onParentNodeChange != null) {
	scopedAttributes.put("onParentNodeChange", _onParentNodeChange);
}

if (_onPrevSiblingChange != null) {
	scopedAttributes.put("onPrevSiblingChange", _onPrevSiblingChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>