<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:scopedAttributes");

java.lang.String _children = (java.lang.String)request.getAttribute("alloy:tree-view:children");
java.lang.String _container = (java.lang.String)request.getAttribute("alloy:tree-view:container");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:tree-view:destroyed");
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:tree-view:index");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:tree-view:initialized");
java.lang.Object _io = (java.lang.Object)request.getAttribute("alloy:tree-view:io");
java.lang.String _lastSelected = (java.lang.String)request.getAttribute("alloy:tree-view:lastSelected");
java.lang.String _type = (java.lang.String)request.getAttribute("alloy:tree-view:type");
java.lang.String _afterChildrenChange = (java.lang.String)request.getAttribute("alloy:tree-view:afterChildrenChange");
java.lang.String _afterContainerChange = (java.lang.String)request.getAttribute("alloy:tree-view:afterContainerChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:tree-view:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:tree-view:afterDestroyedChange");
java.lang.String _afterIndexChange = (java.lang.String)request.getAttribute("alloy:tree-view:afterIndexChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:tree-view:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:tree-view:afterInitializedChange");
java.lang.String _afterIoChange = (java.lang.String)request.getAttribute("alloy:tree-view:afterIoChange");
java.lang.String _afterLastSelectedChange = (java.lang.String)request.getAttribute("alloy:tree-view:afterLastSelectedChange");
java.lang.String _afterTypeChange = (java.lang.String)request.getAttribute("alloy:tree-view:afterTypeChange");
java.lang.String _onChildrenChange = (java.lang.String)request.getAttribute("alloy:tree-view:onChildrenChange");
java.lang.String _onContainerChange = (java.lang.String)request.getAttribute("alloy:tree-view:onContainerChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:tree-view:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:tree-view:onDestroyedChange");
java.lang.String _onIndexChange = (java.lang.String)request.getAttribute("alloy:tree-view:onIndexChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:tree-view:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:tree-view:onInitializedChange");
java.lang.String _onIoChange = (java.lang.String)request.getAttribute("alloy:tree-view:onIoChange");
java.lang.String _onLastSelectedChange = (java.lang.String)request.getAttribute("alloy:tree-view:onLastSelectedChange");
java.lang.String _onTypeChange = (java.lang.String)request.getAttribute("alloy:tree-view:onTypeChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_children != null) {
	scopedAttributes.put("children", _children);
}

if (_container != null) {
	scopedAttributes.put("container", _container);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
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

if (_type != null) {
	scopedAttributes.put("type", _type);
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

if (_afterTypeChange != null) {
	scopedAttributes.put("afterTypeChange", _afterTypeChange);
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