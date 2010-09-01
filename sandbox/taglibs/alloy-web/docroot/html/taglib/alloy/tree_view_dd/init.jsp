<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

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

_updateOptions(options, "checkContainerEl", _checkContainerEl);
_updateOptions(options, "checkEl", _checkEl);
_updateOptions(options, "checkName", _checkName);
_updateOptions(options, "checked", _checked);
_updateOptions(options, "children", _children);
_updateOptions(options, "container", _container);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "dropAction", _dropAction);
_updateOptions(options, "helper", _helper);
_updateOptions(options, "index", _index);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "io", _io);
_updateOptions(options, "lastSelected", _lastSelected);
_updateOptions(options, "lastY", _lastY);
_updateOptions(options, "nodeContent", _nodeContent);
_updateOptions(options, "scrollDelay", _scrollDelay);
_updateOptions(options, "type", _type);
_updateOptions(options, "afterCheckContainerElChange", _afterCheckContainerElChange);
_updateOptions(options, "afterCheckElChange", _afterCheckElChange);
_updateOptions(options, "afterCheckNameChange", _afterCheckNameChange);
_updateOptions(options, "afterCheckedChange", _afterCheckedChange);
_updateOptions(options, "afterChildrenChange", _afterChildrenChange);
_updateOptions(options, "afterContainerChange", _afterContainerChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDropActionChange", _afterDropActionChange);
_updateOptions(options, "afterHelperChange", _afterHelperChange);
_updateOptions(options, "afterIndexChange", _afterIndexChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterIoChange", _afterIoChange);
_updateOptions(options, "afterLastSelectedChange", _afterLastSelectedChange);
_updateOptions(options, "afterLastYChange", _afterLastYChange);
_updateOptions(options, "afterNodeContentChange", _afterNodeContentChange);
_updateOptions(options, "afterScrollDelayChange", _afterScrollDelayChange);
_updateOptions(options, "afterTypeChange", _afterTypeChange);
_updateOptions(options, "onCheckContainerElChange", _onCheckContainerElChange);
_updateOptions(options, "onCheckElChange", _onCheckElChange);
_updateOptions(options, "onCheckNameChange", _onCheckNameChange);
_updateOptions(options, "onCheckedChange", _onCheckedChange);
_updateOptions(options, "onChildrenChange", _onChildrenChange);
_updateOptions(options, "onContainerChange", _onContainerChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDropActionChange", _onDropActionChange);
_updateOptions(options, "onHelperChange", _onHelperChange);
_updateOptions(options, "onIndexChange", _onIndexChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onIoChange", _onIoChange);
_updateOptions(options, "onLastSelectedChange", _onLastSelectedChange);
_updateOptions(options, "onLastYChange", _onLastYChange);
_updateOptions(options, "onNodeContentChange", _onNodeContentChange);
_updateOptions(options, "onScrollDelayChange", _onScrollDelayChange);
_updateOptions(options, "onTypeChange", _onTypeChange);
%>

<%@ include file="init-ext.jsp" %>