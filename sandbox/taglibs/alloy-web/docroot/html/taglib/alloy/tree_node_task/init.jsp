<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-node-task:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-node-task:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:tree-node-task:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Boolean _alwaysShowHitArea = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:alwaysShowHitArea"), true);
java.lang.Boolean _cache = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:cache"), true);
java.lang.Object _checkContainerEl = (java.lang.Object)request.getAttribute("alloy:tree-node-task:checkContainerEl");
java.lang.Object _checkEl = (java.lang.Object)request.getAttribute("alloy:tree-node-task:checkEl");
java.lang.Object _checkName = (java.lang.Object)request.getAttribute("alloy:tree-node-task:checkName");
java.lang.Boolean _checked = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:checked"), false);
java.lang.Object _children = (java.lang.Object)request.getAttribute("alloy:tree-node-task:children");
java.lang.Object _container = (java.lang.Object)request.getAttribute("alloy:tree-node-task:container");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:destroyed"), false);
java.lang.Boolean _draggable = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:draggable"), true);
java.lang.Boolean _expanded = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:expanded"), false);
java.lang.Object _hitAreaEl = (java.lang.Object)request.getAttribute("alloy:tree-node-task:hitAreaEl");
java.lang.Object _iconEl = (java.lang.Object)request.getAttribute("alloy:tree-node-task:iconEl");
java.lang.Object _treenodetaskId = (java.lang.Object)request.getAttribute("alloy:tree-node-task:treenodetaskId");
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:tree-node-task:index");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:initialized"), false);
java.lang.Object _io = (java.lang.Object)request.getAttribute("alloy:tree-node-task:io");
java.lang.Object _label = (java.lang.Object)request.getAttribute("alloy:tree-node-task:label");
java.lang.Object _labelEl = (java.lang.Object)request.getAttribute("alloy:tree-node-task:labelEl");
java.lang.Boolean _leaf = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:leaf"), true);
java.lang.Boolean _loaded = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:loaded"), false);
java.lang.Boolean _loading = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-node-task:loading"), false);
java.lang.Object _nextSibling = (java.lang.Object)request.getAttribute("alloy:tree-node-task:nextSibling");
java.lang.Object _ownerTree = (java.lang.Object)request.getAttribute("alloy:tree-node-task:ownerTree");
java.lang.Object _parentNode = (java.lang.Object)request.getAttribute("alloy:tree-node-task:parentNode");
java.lang.Object _prevSibling = (java.lang.Object)request.getAttribute("alloy:tree-node-task:prevSibling");
java.lang.Object _afterAlwaysShowHitAreaChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterAlwaysShowHitAreaChange");
java.lang.Object _afterCacheChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterCacheChange");
java.lang.Object _afterCheckContainerElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterCheckContainerElChange");
java.lang.Object _afterCheckElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterCheckElChange");
java.lang.Object _afterCheckNameChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterCheckNameChange");
java.lang.Object _afterCheckedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterCheckedChange");
java.lang.Object _afterChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterChildrenChange");
java.lang.Object _afterContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterContainerChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterDestroyedChange");
java.lang.Object _afterDraggableChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterDraggableChange");
java.lang.Object _afterExpandedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterExpandedChange");
java.lang.Object _afterHitAreaElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterHitAreaElChange");
java.lang.Object _afterIconElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterIconElChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterIdChange");
java.lang.Object _afterIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterIndexChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterInitializedChange");
java.lang.Object _afterIoChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterIoChange");
java.lang.Object _afterLabelChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterLabelChange");
java.lang.Object _afterLabelElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterLabelElChange");
java.lang.Object _afterLeafChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterLeafChange");
java.lang.Object _afterLoadedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterLoadedChange");
java.lang.Object _afterLoadingChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterLoadingChange");
java.lang.Object _afterNextSiblingChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterNextSiblingChange");
java.lang.Object _afterOwnerTreeChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterOwnerTreeChange");
java.lang.Object _afterParentNodeChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterParentNodeChange");
java.lang.Object _afterPrevSiblingChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:afterPrevSiblingChange");
java.lang.Object _onAlwaysShowHitAreaChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onAlwaysShowHitAreaChange");
java.lang.Object _onCacheChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onCacheChange");
java.lang.Object _onCheckContainerElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onCheckContainerElChange");
java.lang.Object _onCheckElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onCheckElChange");
java.lang.Object _onCheckNameChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onCheckNameChange");
java.lang.Object _onCheckedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onCheckedChange");
java.lang.Object _onChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onChildrenChange");
java.lang.Object _onContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onContainerChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onDestroyedChange");
java.lang.Object _onDraggableChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onDraggableChange");
java.lang.Object _onExpandedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onExpandedChange");
java.lang.Object _onHitAreaElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onHitAreaElChange");
java.lang.Object _onIconElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onIconElChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onIdChange");
java.lang.Object _onIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onIndexChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onInitializedChange");
java.lang.Object _onIoChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onIoChange");
java.lang.Object _onLabelChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onLabelChange");
java.lang.Object _onLabelElChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onLabelElChange");
java.lang.Object _onLeafChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onLeafChange");
java.lang.Object _onLoadedChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onLoadedChange");
java.lang.Object _onLoadingChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onLoadingChange");
java.lang.Object _onNextSiblingChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onNextSiblingChange");
java.lang.Object _onOwnerTreeChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onOwnerTreeChange");
java.lang.Object _onParentNodeChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onParentNodeChange");
java.lang.Object _onPrevSiblingChange = (java.lang.Object)request.getAttribute("alloy:tree-node-task:onPrevSiblingChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:tree-node-task:alwaysShowHitArea") != null) {
	scopedAttributes.put("alwaysShowHitArea", _alwaysShowHitArea);
}

if (request.getAttribute("alloy:tree-node-task:cache") != null) {
	scopedAttributes.put("cache", _cache);
}

if (request.getAttribute("alloy:tree-node-task:checkContainerEl") != null) {
	scopedAttributes.put("checkContainerEl", _checkContainerEl);
}

if (request.getAttribute("alloy:tree-node-task:checkEl") != null) {
	scopedAttributes.put("checkEl", _checkEl);
}

if (request.getAttribute("alloy:tree-node-task:checkName") != null) {
	scopedAttributes.put("checkName", _checkName);
}

if (request.getAttribute("alloy:tree-node-task:checked") != null) {
	scopedAttributes.put("checked", _checked);
}

if (request.getAttribute("alloy:tree-node-task:children") != null) {
	scopedAttributes.put("children", _children);
}

if (request.getAttribute("alloy:tree-node-task:container") != null) {
	scopedAttributes.put("container", _container);
}

if (request.getAttribute("alloy:tree-node-task:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:tree-node-task:draggable") != null) {
	scopedAttributes.put("draggable", _draggable);
}

if (request.getAttribute("alloy:tree-node-task:expanded") != null) {
	scopedAttributes.put("expanded", _expanded);
}

if (request.getAttribute("alloy:tree-node-task:hitAreaEl") != null) {
	scopedAttributes.put("hitAreaEl", _hitAreaEl);
}

if (request.getAttribute("alloy:tree-node-task:iconEl") != null) {
	scopedAttributes.put("iconEl", _iconEl);
}

if (request.getAttribute("alloy:tree-node-task:treenodetaskId") != null) {
	scopedAttributes.put("treenodetaskId", _treenodetaskId);
}

if (request.getAttribute("alloy:tree-node-task:index") != null) {
	scopedAttributes.put("index", _index);
}

if (request.getAttribute("alloy:tree-node-task:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:tree-node-task:io") != null) {
	scopedAttributes.put("io", _io);
}

if (request.getAttribute("alloy:tree-node-task:label") != null) {
	scopedAttributes.put("label", _label);
}

if (request.getAttribute("alloy:tree-node-task:labelEl") != null) {
	scopedAttributes.put("labelEl", _labelEl);
}

if (request.getAttribute("alloy:tree-node-task:leaf") != null) {
	scopedAttributes.put("leaf", _leaf);
}

if (request.getAttribute("alloy:tree-node-task:loaded") != null) {
	scopedAttributes.put("loaded", _loaded);
}

if (request.getAttribute("alloy:tree-node-task:loading") != null) {
	scopedAttributes.put("loading", _loading);
}

if (request.getAttribute("alloy:tree-node-task:nextSibling") != null) {
	scopedAttributes.put("nextSibling", _nextSibling);
}

if (request.getAttribute("alloy:tree-node-task:ownerTree") != null) {
	scopedAttributes.put("ownerTree", _ownerTree);
}

if (request.getAttribute("alloy:tree-node-task:parentNode") != null) {
	scopedAttributes.put("parentNode", _parentNode);
}

if (request.getAttribute("alloy:tree-node-task:prevSibling") != null) {
	scopedAttributes.put("prevSibling", _prevSibling);
}

if (request.getAttribute("alloy:tree-node-task:afterAlwaysShowHitAreaChange") != null) {
	scopedAttributes.put("afterAlwaysShowHitAreaChange", _afterAlwaysShowHitAreaChange);
}

if (request.getAttribute("alloy:tree-node-task:afterCacheChange") != null) {
	scopedAttributes.put("afterCacheChange", _afterCacheChange);
}

if (request.getAttribute("alloy:tree-node-task:afterCheckContainerElChange") != null) {
	scopedAttributes.put("afterCheckContainerElChange", _afterCheckContainerElChange);
}

if (request.getAttribute("alloy:tree-node-task:afterCheckElChange") != null) {
	scopedAttributes.put("afterCheckElChange", _afterCheckElChange);
}

if (request.getAttribute("alloy:tree-node-task:afterCheckNameChange") != null) {
	scopedAttributes.put("afterCheckNameChange", _afterCheckNameChange);
}

if (request.getAttribute("alloy:tree-node-task:afterCheckedChange") != null) {
	scopedAttributes.put("afterCheckedChange", _afterCheckedChange);
}

if (request.getAttribute("alloy:tree-node-task:afterChildrenChange") != null) {
	scopedAttributes.put("afterChildrenChange", _afterChildrenChange);
}

if (request.getAttribute("alloy:tree-node-task:afterContainerChange") != null) {
	scopedAttributes.put("afterContainerChange", _afterContainerChange);
}

if (request.getAttribute("alloy:tree-node-task:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:tree-node-task:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:tree-node-task:afterDraggableChange") != null) {
	scopedAttributes.put("afterDraggableChange", _afterDraggableChange);
}

if (request.getAttribute("alloy:tree-node-task:afterExpandedChange") != null) {
	scopedAttributes.put("afterExpandedChange", _afterExpandedChange);
}

if (request.getAttribute("alloy:tree-node-task:afterHitAreaElChange") != null) {
	scopedAttributes.put("afterHitAreaElChange", _afterHitAreaElChange);
}

if (request.getAttribute("alloy:tree-node-task:afterIconElChange") != null) {
	scopedAttributes.put("afterIconElChange", _afterIconElChange);
}

if (request.getAttribute("alloy:tree-node-task:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:tree-node-task:afterIndexChange") != null) {
	scopedAttributes.put("afterIndexChange", _afterIndexChange);
}

if (request.getAttribute("alloy:tree-node-task:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:tree-node-task:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:tree-node-task:afterIoChange") != null) {
	scopedAttributes.put("afterIoChange", _afterIoChange);
}

if (request.getAttribute("alloy:tree-node-task:afterLabelChange") != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (request.getAttribute("alloy:tree-node-task:afterLabelElChange") != null) {
	scopedAttributes.put("afterLabelElChange", _afterLabelElChange);
}

if (request.getAttribute("alloy:tree-node-task:afterLeafChange") != null) {
	scopedAttributes.put("afterLeafChange", _afterLeafChange);
}

if (request.getAttribute("alloy:tree-node-task:afterLoadedChange") != null) {
	scopedAttributes.put("afterLoadedChange", _afterLoadedChange);
}

if (request.getAttribute("alloy:tree-node-task:afterLoadingChange") != null) {
	scopedAttributes.put("afterLoadingChange", _afterLoadingChange);
}

if (request.getAttribute("alloy:tree-node-task:afterNextSiblingChange") != null) {
	scopedAttributes.put("afterNextSiblingChange", _afterNextSiblingChange);
}

if (request.getAttribute("alloy:tree-node-task:afterOwnerTreeChange") != null) {
	scopedAttributes.put("afterOwnerTreeChange", _afterOwnerTreeChange);
}

if (request.getAttribute("alloy:tree-node-task:afterParentNodeChange") != null) {
	scopedAttributes.put("afterParentNodeChange", _afterParentNodeChange);
}

if (request.getAttribute("alloy:tree-node-task:afterPrevSiblingChange") != null) {
	scopedAttributes.put("afterPrevSiblingChange", _afterPrevSiblingChange);
}

if (request.getAttribute("alloy:tree-node-task:onAlwaysShowHitAreaChange") != null) {
	scopedAttributes.put("onAlwaysShowHitAreaChange", _onAlwaysShowHitAreaChange);
}

if (request.getAttribute("alloy:tree-node-task:onCacheChange") != null) {
	scopedAttributes.put("onCacheChange", _onCacheChange);
}

if (request.getAttribute("alloy:tree-node-task:onCheckContainerElChange") != null) {
	scopedAttributes.put("onCheckContainerElChange", _onCheckContainerElChange);
}

if (request.getAttribute("alloy:tree-node-task:onCheckElChange") != null) {
	scopedAttributes.put("onCheckElChange", _onCheckElChange);
}

if (request.getAttribute("alloy:tree-node-task:onCheckNameChange") != null) {
	scopedAttributes.put("onCheckNameChange", _onCheckNameChange);
}

if (request.getAttribute("alloy:tree-node-task:onCheckedChange") != null) {
	scopedAttributes.put("onCheckedChange", _onCheckedChange);
}

if (request.getAttribute("alloy:tree-node-task:onChildrenChange") != null) {
	scopedAttributes.put("onChildrenChange", _onChildrenChange);
}

if (request.getAttribute("alloy:tree-node-task:onContainerChange") != null) {
	scopedAttributes.put("onContainerChange", _onContainerChange);
}

if (request.getAttribute("alloy:tree-node-task:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:tree-node-task:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:tree-node-task:onDraggableChange") != null) {
	scopedAttributes.put("onDraggableChange", _onDraggableChange);
}

if (request.getAttribute("alloy:tree-node-task:onExpandedChange") != null) {
	scopedAttributes.put("onExpandedChange", _onExpandedChange);
}

if (request.getAttribute("alloy:tree-node-task:onHitAreaElChange") != null) {
	scopedAttributes.put("onHitAreaElChange", _onHitAreaElChange);
}

if (request.getAttribute("alloy:tree-node-task:onIconElChange") != null) {
	scopedAttributes.put("onIconElChange", _onIconElChange);
}

if (request.getAttribute("alloy:tree-node-task:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:tree-node-task:onIndexChange") != null) {
	scopedAttributes.put("onIndexChange", _onIndexChange);
}

if (request.getAttribute("alloy:tree-node-task:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:tree-node-task:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:tree-node-task:onIoChange") != null) {
	scopedAttributes.put("onIoChange", _onIoChange);
}

if (request.getAttribute("alloy:tree-node-task:onLabelChange") != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (request.getAttribute("alloy:tree-node-task:onLabelElChange") != null) {
	scopedAttributes.put("onLabelElChange", _onLabelElChange);
}

if (request.getAttribute("alloy:tree-node-task:onLeafChange") != null) {
	scopedAttributes.put("onLeafChange", _onLeafChange);
}

if (request.getAttribute("alloy:tree-node-task:onLoadedChange") != null) {
	scopedAttributes.put("onLoadedChange", _onLoadedChange);
}

if (request.getAttribute("alloy:tree-node-task:onLoadingChange") != null) {
	scopedAttributes.put("onLoadingChange", _onLoadingChange);
}

if (request.getAttribute("alloy:tree-node-task:onNextSiblingChange") != null) {
	scopedAttributes.put("onNextSiblingChange", _onNextSiblingChange);
}

if (request.getAttribute("alloy:tree-node-task:onOwnerTreeChange") != null) {
	scopedAttributes.put("onOwnerTreeChange", _onOwnerTreeChange);
}

if (request.getAttribute("alloy:tree-node-task:onParentNodeChange") != null) {
	scopedAttributes.put("onParentNodeChange", _onParentNodeChange);
}

if (request.getAttribute("alloy:tree-node-task:onPrevSiblingChange") != null) {
	scopedAttributes.put("onPrevSiblingChange", _onPrevSiblingChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>