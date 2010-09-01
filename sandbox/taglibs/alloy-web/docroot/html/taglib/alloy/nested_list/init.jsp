<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:nested-list:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:nested-list:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:nested-list:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:nested-list:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:nested-list:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:nested-list:destroyed"), false);
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:nested-list:initialized"), false);
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:nested-list:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:nested-list:afterDestroyedChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:nested-list:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:nested-list:afterInitializedChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:nested-list:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:nested-list:onDestroyedChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:nested-list:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:nested-list:onInitializedChange"));

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

_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
%>

<%@ include file="init-ext.jsp" %>