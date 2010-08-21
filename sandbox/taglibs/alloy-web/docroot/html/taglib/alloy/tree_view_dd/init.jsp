<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:scopedAttributes");

String uniqueId = StringPool.BLANK;
String srcNode = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean((java.io.Serializable)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId));
}

java.lang.String _checkContainerEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:checkContainerEl"));
java.lang.String _checkEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:checkEl"));
java.lang.String _checkName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:checkName"));
java.lang.Boolean _checked = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view-dd:checked"));
java.lang.String _children = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:children"));
java.lang.String _container = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:container"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view-dd:destroyed"));
java.lang.String _dropAction = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:dropAction"));
java.lang.String _helper = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:helper"));
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:index");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:tree-view-dd:initialized"));
java.lang.Object _io = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:io");
java.lang.String _lastSelected = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:lastSelected"));
java.lang.Number _lastY = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tree-view-dd:lastY"));
java.lang.String _nodeContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:nodeContent"));
java.lang.Number _scrollDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:tree-view-dd:scrollDelay"));
java.lang.String _type = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:type"));
java.lang.String _afterCheckContainerElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterCheckContainerElChange"));
java.lang.String _afterCheckElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterCheckElChange"));
java.lang.String _afterCheckNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterCheckNameChange"));
java.lang.String _afterCheckedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterCheckedChange"));
java.lang.String _afterChildrenChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterChildrenChange"));
java.lang.String _afterContainerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterContainerChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterDestroyedChange"));
java.lang.String _afterDropActionChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterDropActionChange"));
java.lang.String _afterHelperChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterHelperChange"));
java.lang.String _afterIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterIndexChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterInitializedChange"));
java.lang.String _afterIoChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterIoChange"));
java.lang.String _afterLastSelectedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterLastSelectedChange"));
java.lang.String _afterLastYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterLastYChange"));
java.lang.String _afterNodeContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterNodeContentChange"));
java.lang.String _afterScrollDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterScrollDelayChange"));
java.lang.String _afterTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:afterTypeChange"));
java.lang.String _onCheckContainerElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onCheckContainerElChange"));
java.lang.String _onCheckElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onCheckElChange"));
java.lang.String _onCheckNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onCheckNameChange"));
java.lang.String _onCheckedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onCheckedChange"));
java.lang.String _onChildrenChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onChildrenChange"));
java.lang.String _onContainerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onContainerChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onDestroyedChange"));
java.lang.String _onDropActionChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onDropActionChange"));
java.lang.String _onHelperChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onHelperChange"));
java.lang.String _onIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onIndexChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onInitializedChange"));
java.lang.String _onIoChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onIoChange"));
java.lang.String _onLastSelectedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onLastSelectedChange"));
java.lang.String _onLastYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onLastYChange"));
java.lang.String _onNodeContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onNodeContentChange"));
java.lang.String _onScrollDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onScrollDelayChange"));
java.lang.String _onTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:onTypeChange"));
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