<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:tree-view:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:tree-view:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:tree-view:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

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

_updateOptions(options, "children", _children);
_updateOptions(options, "container", _container);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "index", _index);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "io", _io);
_updateOptions(options, "lastSelected", _lastSelected);
_updateOptions(options, "type", _type);
_updateOptions(options, "afterChildrenChange", _afterChildrenChange);
_updateOptions(options, "afterContainerChange", _afterContainerChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterIndexChange", _afterIndexChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterIoChange", _afterIoChange);
_updateOptions(options, "afterLastSelectedChange", _afterLastSelectedChange);
_updateOptions(options, "afterTypeChange", _afterTypeChange);
_updateOptions(options, "onChildrenChange", _onChildrenChange);
_updateOptions(options, "onContainerChange", _onContainerChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onIndexChange", _onIndexChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onIoChange", _onIoChange);
_updateOptions(options, "onLastSelectedChange", _onLastSelectedChange);
_updateOptions(options, "onTypeChange", _onTypeChange);
%>

<%@ include file="init-ext.jsp" %>