<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:tree-view-dd:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _checkContainerEl = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:checkContainerEl");
java.lang.Object _checkEl = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:checkEl");
java.lang.Object _checkName = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:checkName");
java.lang.Boolean _checked = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view-dd:checked"), false);
java.lang.Object _children = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:children");
java.lang.Object _container = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:container");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view-dd:destroyed"), false);
java.lang.Object _dropAction = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:dropAction");
java.lang.Object _helper = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:helper");
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:index");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view-dd:initialized"), false);
java.lang.Object _io = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:io");
java.lang.Object _lastSelected = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:lastSelected");
java.lang.Number _lastY = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tree-view-dd:lastY"), 0);
java.lang.Object _nodeContent = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:nodeContent");
java.lang.Number _scrollDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tree-view-dd:scrollDelay"), 100);
java.lang.Object _type = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:type");
java.lang.Object _afterCheckContainerElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckContainerElChange");
java.lang.Object _afterCheckElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckElChange");
java.lang.Object _afterCheckNameChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckNameChange");
java.lang.Object _afterCheckedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckedChange");
java.lang.Object _afterChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterChildrenChange");
java.lang.Object _afterContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterContainerChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterDestroyedChange");
java.lang.Object _afterDropActionChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterDropActionChange");
java.lang.Object _afterHelperChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterHelperChange");
java.lang.Object _afterIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterIndexChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterInitializedChange");
java.lang.Object _afterIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterIoChange");
java.lang.Object _afterLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterLastSelectedChange");
java.lang.Object _afterLastYChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterLastYChange");
java.lang.Object _afterNodeContentChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterNodeContentChange");
java.lang.Object _afterScrollDelayChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterScrollDelayChange");
java.lang.Object _afterTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterTypeChange");
java.lang.Object _onCheckContainerElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckContainerElChange");
java.lang.Object _onCheckElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckElChange");
java.lang.Object _onCheckNameChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckNameChange");
java.lang.Object _onCheckedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckedChange");
java.lang.Object _onChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onChildrenChange");
java.lang.Object _onContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onContainerChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onDestroyedChange");
java.lang.Object _onDropActionChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onDropActionChange");
java.lang.Object _onHelperChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onHelperChange");
java.lang.Object _onIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onIndexChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onInitializedChange");
java.lang.Object _onIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onIoChange");
java.lang.Object _onLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onLastSelectedChange");
java.lang.Object _onLastYChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onLastYChange");
java.lang.Object _onNodeContentChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onNodeContentChange");
java.lang.Object _onScrollDelayChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onScrollDelayChange");
java.lang.Object _onTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onTypeChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:tree-view-dd:checkContainerEl") != null) {
	scopedAttributes.put("checkContainerEl", _checkContainerEl);
}

if (request.getAttribute("alloy:tree-view-dd:checkEl") != null) {
	scopedAttributes.put("checkEl", _checkEl);
}

if (request.getAttribute("alloy:tree-view-dd:checkName") != null) {
	scopedAttributes.put("checkName", _checkName);
}

if (request.getAttribute("alloy:tree-view-dd:checked") != null) {
	scopedAttributes.put("checked", _checked);
}

if (request.getAttribute("alloy:tree-view-dd:children") != null) {
	scopedAttributes.put("children", _children);
}

if (request.getAttribute("alloy:tree-view-dd:container") != null) {
	scopedAttributes.put("container", _container);
}

if (request.getAttribute("alloy:tree-view-dd:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:tree-view-dd:dropAction") != null) {
	scopedAttributes.put("dropAction", _dropAction);
}

if (request.getAttribute("alloy:tree-view-dd:helper") != null) {
	scopedAttributes.put("helper", _helper);
}

if (request.getAttribute("alloy:tree-view-dd:index") != null) {
	scopedAttributes.put("index", _index);
}

if (request.getAttribute("alloy:tree-view-dd:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:tree-view-dd:io") != null) {
	scopedAttributes.put("io", _io);
}

if (request.getAttribute("alloy:tree-view-dd:lastSelected") != null) {
	scopedAttributes.put("lastSelected", _lastSelected);
}

if (request.getAttribute("alloy:tree-view-dd:lastY") != null) {
	scopedAttributes.put("lastY", _lastY);
}

if (request.getAttribute("alloy:tree-view-dd:nodeContent") != null) {
	scopedAttributes.put("nodeContent", _nodeContent);
}

if (request.getAttribute("alloy:tree-view-dd:scrollDelay") != null) {
	scopedAttributes.put("scrollDelay", _scrollDelay);
}

if (request.getAttribute("alloy:tree-view-dd:type") != null) {
	scopedAttributes.put("type", _type);
}

if (request.getAttribute("alloy:tree-view-dd:afterCheckContainerElChange") != null) {
	scopedAttributes.put("afterCheckContainerElChange", _afterCheckContainerElChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterCheckElChange") != null) {
	scopedAttributes.put("afterCheckElChange", _afterCheckElChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterCheckNameChange") != null) {
	scopedAttributes.put("afterCheckNameChange", _afterCheckNameChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterCheckedChange") != null) {
	scopedAttributes.put("afterCheckedChange", _afterCheckedChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterChildrenChange") != null) {
	scopedAttributes.put("afterChildrenChange", _afterChildrenChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterContainerChange") != null) {
	scopedAttributes.put("afterContainerChange", _afterContainerChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:tree-view-dd:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterDropActionChange") != null) {
	scopedAttributes.put("afterDropActionChange", _afterDropActionChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterHelperChange") != null) {
	scopedAttributes.put("afterHelperChange", _afterHelperChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterIndexChange") != null) {
	scopedAttributes.put("afterIndexChange", _afterIndexChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:tree-view-dd:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterIoChange") != null) {
	scopedAttributes.put("afterIoChange", _afterIoChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterLastSelectedChange") != null) {
	scopedAttributes.put("afterLastSelectedChange", _afterLastSelectedChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterLastYChange") != null) {
	scopedAttributes.put("afterLastYChange", _afterLastYChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterNodeContentChange") != null) {
	scopedAttributes.put("afterNodeContentChange", _afterNodeContentChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterScrollDelayChange") != null) {
	scopedAttributes.put("afterScrollDelayChange", _afterScrollDelayChange);
}

if (request.getAttribute("alloy:tree-view-dd:afterTypeChange") != null) {
	scopedAttributes.put("afterTypeChange", _afterTypeChange);
}

if (request.getAttribute("alloy:tree-view-dd:onCheckContainerElChange") != null) {
	scopedAttributes.put("onCheckContainerElChange", _onCheckContainerElChange);
}

if (request.getAttribute("alloy:tree-view-dd:onCheckElChange") != null) {
	scopedAttributes.put("onCheckElChange", _onCheckElChange);
}

if (request.getAttribute("alloy:tree-view-dd:onCheckNameChange") != null) {
	scopedAttributes.put("onCheckNameChange", _onCheckNameChange);
}

if (request.getAttribute("alloy:tree-view-dd:onCheckedChange") != null) {
	scopedAttributes.put("onCheckedChange", _onCheckedChange);
}

if (request.getAttribute("alloy:tree-view-dd:onChildrenChange") != null) {
	scopedAttributes.put("onChildrenChange", _onChildrenChange);
}

if (request.getAttribute("alloy:tree-view-dd:onContainerChange") != null) {
	scopedAttributes.put("onContainerChange", _onContainerChange);
}

if (request.getAttribute("alloy:tree-view-dd:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:tree-view-dd:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:tree-view-dd:onDropActionChange") != null) {
	scopedAttributes.put("onDropActionChange", _onDropActionChange);
}

if (request.getAttribute("alloy:tree-view-dd:onHelperChange") != null) {
	scopedAttributes.put("onHelperChange", _onHelperChange);
}

if (request.getAttribute("alloy:tree-view-dd:onIndexChange") != null) {
	scopedAttributes.put("onIndexChange", _onIndexChange);
}

if (request.getAttribute("alloy:tree-view-dd:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:tree-view-dd:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:tree-view-dd:onIoChange") != null) {
	scopedAttributes.put("onIoChange", _onIoChange);
}

if (request.getAttribute("alloy:tree-view-dd:onLastSelectedChange") != null) {
	scopedAttributes.put("onLastSelectedChange", _onLastSelectedChange);
}

if (request.getAttribute("alloy:tree-view-dd:onLastYChange") != null) {
	scopedAttributes.put("onLastYChange", _onLastYChange);
}

if (request.getAttribute("alloy:tree-view-dd:onNodeContentChange") != null) {
	scopedAttributes.put("onNodeContentChange", _onNodeContentChange);
}

if (request.getAttribute("alloy:tree-view-dd:onScrollDelayChange") != null) {
	scopedAttributes.put("onScrollDelayChange", _onScrollDelayChange);
}

if (request.getAttribute("alloy:tree-view-dd:onTypeChange") != null) {
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