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

java.util.ArrayList _children = JSONFactoryUtil.getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:children")));
java.lang.String _container = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:container"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:tree-view:destroyed"), false);
java.util.HashMap _index = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:index")));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:tree-view:initialized"), false);
java.util.HashMap _io = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:io")));
java.lang.Object _lastSelected = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:lastSelected"));
java.lang.String _type = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:type"), "file");
java.lang.Object _afterChildrenChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterChildrenChange"));
java.lang.Object _afterContainerChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterContainerChange"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterDestroyedChange"));
java.lang.Object _afterIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterIndexChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterInitializedChange"));
java.lang.Object _afterIoChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterIoChange"));
java.lang.Object _afterLastSelectedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterLastSelectedChange"));
java.lang.Object _afterTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:afterTypeChange"));
java.lang.Object _onChildrenChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onChildrenChange"));
java.lang.Object _onContainerChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onContainerChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onDestroyedChange"));
java.lang.Object _onIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onIndexChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onInitializedChange"));
java.lang.Object _onIoChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onIoChange"));
java.lang.Object _onLastSelectedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onLastSelectedChange"));
java.lang.Object _onTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:onTypeChange"));

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