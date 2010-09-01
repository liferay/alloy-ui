<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-node-task:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-node-task:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:tree-node-task:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:tree-node-task:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:tree-node-task:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

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

String uniqueId = StringPool.BLANK;

boolean useJavaScript = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useJavaScript"), true);
boolean useMarkup = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useMarkup"), true);

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	String prefix = StringPool.POUND.concat(uniqueId);

	if (!hasBoundingBox) {
		_boundingBox = prefix.concat("BoundingBox");

		options.put("boundingBox", _boundingBox);
	}

	if (!hasSrcNode && !hasContentBox) {
		_srcNode = prefix.concat("SrcNode");

		options.put("srcNode", _srcNode);
	}

	if (!hasSrcNode && hasContentBox) {
		_contentBox = prefix.concat("ContentBox");

		options.put("contentBox", _contentBox);
	}
}

_updateOptions(options, "alwaysShowHitArea", _alwaysShowHitArea);
_updateOptions(options, "cache", _cache);
_updateOptions(options, "checkContainerEl", _checkContainerEl);
_updateOptions(options, "checkEl", _checkEl);
_updateOptions(options, "checkName", _checkName);
_updateOptions(options, "checked", _checked);
_updateOptions(options, "children", _children);
_updateOptions(options, "container", _container);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "draggable", _draggable);
_updateOptions(options, "expanded", _expanded);
_updateOptions(options, "hitAreaEl", _hitAreaEl);
_updateOptions(options, "iconEl", _iconEl);
_updateOptions(options, "treenodetaskId", _treenodetaskId);
_updateOptions(options, "index", _index);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "io", _io);
_updateOptions(options, "label", _label);
_updateOptions(options, "labelEl", _labelEl);
_updateOptions(options, "leaf", _leaf);
_updateOptions(options, "loaded", _loaded);
_updateOptions(options, "loading", _loading);
_updateOptions(options, "nextSibling", _nextSibling);
_updateOptions(options, "ownerTree", _ownerTree);
_updateOptions(options, "parentNode", _parentNode);
_updateOptions(options, "prevSibling", _prevSibling);
_updateOptions(options, "afterAlwaysShowHitAreaChange", _afterAlwaysShowHitAreaChange);
_updateOptions(options, "afterCacheChange", _afterCacheChange);
_updateOptions(options, "afterCheckContainerElChange", _afterCheckContainerElChange);
_updateOptions(options, "afterCheckElChange", _afterCheckElChange);
_updateOptions(options, "afterCheckNameChange", _afterCheckNameChange);
_updateOptions(options, "afterCheckedChange", _afterCheckedChange);
_updateOptions(options, "afterChildrenChange", _afterChildrenChange);
_updateOptions(options, "afterContainerChange", _afterContainerChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDraggableChange", _afterDraggableChange);
_updateOptions(options, "afterExpandedChange", _afterExpandedChange);
_updateOptions(options, "afterHitAreaElChange", _afterHitAreaElChange);
_updateOptions(options, "afterIconElChange", _afterIconElChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterIndexChange", _afterIndexChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterIoChange", _afterIoChange);
_updateOptions(options, "afterLabelChange", _afterLabelChange);
_updateOptions(options, "afterLabelElChange", _afterLabelElChange);
_updateOptions(options, "afterLeafChange", _afterLeafChange);
_updateOptions(options, "afterLoadedChange", _afterLoadedChange);
_updateOptions(options, "afterLoadingChange", _afterLoadingChange);
_updateOptions(options, "afterNextSiblingChange", _afterNextSiblingChange);
_updateOptions(options, "afterOwnerTreeChange", _afterOwnerTreeChange);
_updateOptions(options, "afterParentNodeChange", _afterParentNodeChange);
_updateOptions(options, "afterPrevSiblingChange", _afterPrevSiblingChange);
_updateOptions(options, "onAlwaysShowHitAreaChange", _onAlwaysShowHitAreaChange);
_updateOptions(options, "onCacheChange", _onCacheChange);
_updateOptions(options, "onCheckContainerElChange", _onCheckContainerElChange);
_updateOptions(options, "onCheckElChange", _onCheckElChange);
_updateOptions(options, "onCheckNameChange", _onCheckNameChange);
_updateOptions(options, "onCheckedChange", _onCheckedChange);
_updateOptions(options, "onChildrenChange", _onChildrenChange);
_updateOptions(options, "onContainerChange", _onContainerChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDraggableChange", _onDraggableChange);
_updateOptions(options, "onExpandedChange", _onExpandedChange);
_updateOptions(options, "onHitAreaElChange", _onHitAreaElChange);
_updateOptions(options, "onIconElChange", _onIconElChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onIndexChange", _onIndexChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onIoChange", _onIoChange);
_updateOptions(options, "onLabelChange", _onLabelChange);
_updateOptions(options, "onLabelElChange", _onLabelElChange);
_updateOptions(options, "onLeafChange", _onLeafChange);
_updateOptions(options, "onLoadedChange", _onLoadedChange);
_updateOptions(options, "onLoadingChange", _onLoadingChange);
_updateOptions(options, "onNextSiblingChange", _onNextSiblingChange);
_updateOptions(options, "onOwnerTreeChange", _onOwnerTreeChange);
_updateOptions(options, "onParentNodeChange", _onParentNodeChange);
_updateOptions(options, "onPrevSiblingChange", _onPrevSiblingChange);
%>

<%@ include file="init-ext.jsp" %>