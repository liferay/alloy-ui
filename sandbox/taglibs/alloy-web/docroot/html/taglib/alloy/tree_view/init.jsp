<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:tree-view:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _children = (java.lang.Object)request.getAttribute("alloy:tree-view:children");
java.lang.Object _container = (java.lang.Object)request.getAttribute("alloy:tree-view:container");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view:destroyed"), false);
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:tree-view:index");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view:initialized"), false);
java.lang.Object _io = (java.lang.Object)request.getAttribute("alloy:tree-view:io");
java.lang.Object _lastSelected = (java.lang.Object)request.getAttribute("alloy:tree-view:lastSelected");
java.lang.Object _type = (java.lang.Object)request.getAttribute("alloy:tree-view:type");
java.lang.Object _afterChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterChildrenChange");
java.lang.Object _afterContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterContainerChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterDestroyedChange");
java.lang.Object _afterIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterIndexChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:tree-view:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterInitializedChange");
java.lang.Object _afterIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterIoChange");
java.lang.Object _afterLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterLastSelectedChange");
java.lang.Object _afterTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterTypeChange");
java.lang.Object _onChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onChildrenChange");
java.lang.Object _onContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onContainerChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onDestroyedChange");
java.lang.Object _onIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onIndexChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:tree-view:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onInitializedChange");
java.lang.Object _onIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onIoChange");
java.lang.Object _onLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onLastSelectedChange");
java.lang.Object _onTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onTypeChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:tree-view:children") != null) {
	scopedAttributes.put("children", _children);
}

if (request.getAttribute("alloy:tree-view:container") != null) {
	scopedAttributes.put("container", _container);
}

if (request.getAttribute("alloy:tree-view:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:tree-view:index") != null) {
	scopedAttributes.put("index", _index);
}

if (request.getAttribute("alloy:tree-view:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:tree-view:io") != null) {
	scopedAttributes.put("io", _io);
}

if (request.getAttribute("alloy:tree-view:lastSelected") != null) {
	scopedAttributes.put("lastSelected", _lastSelected);
}

if (request.getAttribute("alloy:tree-view:type") != null) {
	scopedAttributes.put("type", _type);
}

if (request.getAttribute("alloy:tree-view:afterChildrenChange") != null) {
	scopedAttributes.put("afterChildrenChange", _afterChildrenChange);
}

if (request.getAttribute("alloy:tree-view:afterContainerChange") != null) {
	scopedAttributes.put("afterContainerChange", _afterContainerChange);
}

if (request.getAttribute("alloy:tree-view:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:tree-view:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:tree-view:afterIndexChange") != null) {
	scopedAttributes.put("afterIndexChange", _afterIndexChange);
}

if (request.getAttribute("alloy:tree-view:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:tree-view:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:tree-view:afterIoChange") != null) {
	scopedAttributes.put("afterIoChange", _afterIoChange);
}

if (request.getAttribute("alloy:tree-view:afterLastSelectedChange") != null) {
	scopedAttributes.put("afterLastSelectedChange", _afterLastSelectedChange);
}

if (request.getAttribute("alloy:tree-view:afterTypeChange") != null) {
	scopedAttributes.put("afterTypeChange", _afterTypeChange);
}

if (request.getAttribute("alloy:tree-view:onChildrenChange") != null) {
	scopedAttributes.put("onChildrenChange", _onChildrenChange);
}

if (request.getAttribute("alloy:tree-view:onContainerChange") != null) {
	scopedAttributes.put("onContainerChange", _onContainerChange);
}

if (request.getAttribute("alloy:tree-view:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:tree-view:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:tree-view:onIndexChange") != null) {
	scopedAttributes.put("onIndexChange", _onIndexChange);
}

if (request.getAttribute("alloy:tree-view:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:tree-view:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:tree-view:onIoChange") != null) {
	scopedAttributes.put("onIoChange", _onIoChange);
}

if (request.getAttribute("alloy:tree-view:onLastSelectedChange") != null) {
	scopedAttributes.put("onLastSelectedChange", _onLastSelectedChange);
}

if (request.getAttribute("alloy:tree-view:onTypeChange") != null) {
	scopedAttributes.put("onTypeChange", _onTypeChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>