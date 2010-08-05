<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:scopedAttributes");

java.lang.String _checkContainerEl = (java.lang.String)request.getAttribute("alloy:tree-view-dd:checkContainerEl");
java.lang.String _checkEl = (java.lang.String)request.getAttribute("alloy:tree-view-dd:checkEl");
java.lang.String _checkName = (java.lang.String)request.getAttribute("alloy:tree-view-dd:checkName");
java.lang.Boolean _checked = (java.lang.Boolean)request.getAttribute("alloy:tree-view-dd:checked");
java.lang.String _children = (java.lang.String)request.getAttribute("alloy:tree-view-dd:children");
java.lang.String _container = (java.lang.String)request.getAttribute("alloy:tree-view-dd:container");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:tree-view-dd:destroyed");
java.lang.String _dropAction = (java.lang.String)request.getAttribute("alloy:tree-view-dd:dropAction");
java.lang.String _helper = (java.lang.String)request.getAttribute("alloy:tree-view-dd:helper");
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:index");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:tree-view-dd:initialized");
java.lang.Object _io = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:io");
java.lang.String _lastSelected = (java.lang.String)request.getAttribute("alloy:tree-view-dd:lastSelected");
java.lang.Number _lastY = (java.lang.Number)request.getAttribute("alloy:tree-view-dd:lastY");
java.lang.String _nodeContent = (java.lang.String)request.getAttribute("alloy:tree-view-dd:nodeContent");
java.lang.Number _scrollDelay = (java.lang.Number)request.getAttribute("alloy:tree-view-dd:scrollDelay");
java.lang.String _type = (java.lang.String)request.getAttribute("alloy:tree-view-dd:type");
java.lang.String _afterCheckContainerElChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterCheckContainerElChange");
java.lang.String _afterCheckElChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterCheckElChange");
java.lang.String _afterCheckNameChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterCheckNameChange");
java.lang.String _afterCheckedChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterCheckedChange");
java.lang.String _afterChildrenChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterChildrenChange");
java.lang.String _afterContainerChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterContainerChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterDestroyedChange");
java.lang.String _afterDropActionChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterDropActionChange");
java.lang.String _afterHelperChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterHelperChange");
java.lang.String _afterIndexChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterIndexChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterInitializedChange");
java.lang.String _afterIoChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterIoChange");
java.lang.String _afterLastSelectedChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterLastSelectedChange");
java.lang.String _afterLastYChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterLastYChange");
java.lang.String _afterNodeContentChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterNodeContentChange");
java.lang.String _afterScrollDelayChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterScrollDelayChange");
java.lang.String _afterTypeChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:afterTypeChange");
java.lang.String _onCheckContainerElChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onCheckContainerElChange");
java.lang.String _onCheckElChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onCheckElChange");
java.lang.String _onCheckNameChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onCheckNameChange");
java.lang.String _onCheckedChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onCheckedChange");
java.lang.String _onChildrenChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onChildrenChange");
java.lang.String _onContainerChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onContainerChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onDestroyedChange");
java.lang.String _onDropActionChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onDropActionChange");
java.lang.String _onHelperChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onHelperChange");
java.lang.String _onIndexChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onIndexChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onInitializedChange");
java.lang.String _onIoChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onIoChange");
java.lang.String _onLastSelectedChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onLastSelectedChange");
java.lang.String _onLastYChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onLastYChange");
java.lang.String _onNodeContentChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onNodeContentChange");
java.lang.String _onScrollDelayChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onScrollDelayChange");
java.lang.String _onTypeChange = (java.lang.String)request.getAttribute("alloy:tree-view-dd:onTypeChange");
%>

<%@ include file="init-ext.jsp" %>

<%
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

if (_dropAction != null) {
	scopedAttributes.put("dropAction", _dropAction);
}

if (_helper != null) {
	scopedAttributes.put("helper", _helper);
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

if (_lastSelected != null) {
	scopedAttributes.put("lastSelected", _lastSelected);
}

if (_lastY != null) {
	scopedAttributes.put("lastY", _lastY);
}

if (_nodeContent != null) {
	scopedAttributes.put("nodeContent", _nodeContent);
}

if (_scrollDelay != null) {
	scopedAttributes.put("scrollDelay", _scrollDelay);
}

if (_type != null) {
	scopedAttributes.put("type", _type);
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

if (_afterDropActionChange != null) {
	scopedAttributes.put("afterDropActionChange", _afterDropActionChange);
}

if (_afterHelperChange != null) {
	scopedAttributes.put("afterHelperChange", _afterHelperChange);
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

if (_afterLastSelectedChange != null) {
	scopedAttributes.put("afterLastSelectedChange", _afterLastSelectedChange);
}

if (_afterLastYChange != null) {
	scopedAttributes.put("afterLastYChange", _afterLastYChange);
}

if (_afterNodeContentChange != null) {
	scopedAttributes.put("afterNodeContentChange", _afterNodeContentChange);
}

if (_afterScrollDelayChange != null) {
	scopedAttributes.put("afterScrollDelayChange", _afterScrollDelayChange);
}

if (_afterTypeChange != null) {
	scopedAttributes.put("afterTypeChange", _afterTypeChange);
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

if (_onDropActionChange != null) {
	scopedAttributes.put("onDropActionChange", _onDropActionChange);
}

if (_onHelperChange != null) {
	scopedAttributes.put("onHelperChange", _onHelperChange);
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

if (_onLastSelectedChange != null) {
	scopedAttributes.put("onLastSelectedChange", _onLastSelectedChange);
}

if (_onLastYChange != null) {
	scopedAttributes.put("onLastYChange", _onLastYChange);
}

if (_onNodeContentChange != null) {
	scopedAttributes.put("onNodeContentChange", _onNodeContentChange);
}

if (_onScrollDelayChange != null) {
	scopedAttributes.put("onScrollDelayChange", _onScrollDelayChange);
}

if (_onTypeChange != null) {
	scopedAttributes.put("onTypeChange", _onTypeChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>