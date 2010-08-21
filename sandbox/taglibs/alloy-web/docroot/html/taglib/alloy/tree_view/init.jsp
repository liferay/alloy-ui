<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:scopedAttributes");

String uniqueId = StringPool.BLANK;
String srcNode = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean((java.io.Serializable)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId));
}

java.lang.String _children = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:children"));
java.lang.String _container = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:container"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view:destroyed"));
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:tree-view:index");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view:initialized"));
java.lang.Object _io = (java.lang.Object)request.getAttribute("alloy:tree-view:io");
java.lang.String _lastSelected = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:lastSelected"));
java.lang.String _type = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:type"));
java.lang.String _afterChildrenChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterChildrenChange"));
java.lang.String _afterContainerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterContainerChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterDestroyedChange"));
java.lang.String _afterIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterIndexChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterInitializedChange"));
java.lang.String _afterIoChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterIoChange"));
java.lang.String _afterLastSelectedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterLastSelectedChange"));
java.lang.String _afterTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:afterTypeChange"));
java.lang.String _onChildrenChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onChildrenChange"));
java.lang.String _onContainerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onContainerChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onDestroyedChange"));
java.lang.String _onIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onIndexChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onInitializedChange"));
java.lang.String _onIoChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onIoChange"));
java.lang.String _onLastSelectedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onLastSelectedChange"));
java.lang.String _onTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:onTypeChange"));
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