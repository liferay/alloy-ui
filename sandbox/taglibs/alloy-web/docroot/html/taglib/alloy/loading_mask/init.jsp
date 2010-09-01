<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:loading-mask:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:loading-mask:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:loading-mask:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:loading-mask:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:loading-mask:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:loading-mask:destroyed"), false);
java.lang.Object _host = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:host"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:loading-mask:initialized"), false);
java.lang.String _messageEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:messageEl"));
java.util.HashMap _strings = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:strings"), "{ loading: 'Loading&hellip;' }"));
java.lang.Object _target = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:target"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:afterDestroyedChange"));
java.lang.Object _afterHostChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:afterHostChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:afterInitializedChange"));
java.lang.Object _afterMessageElChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:afterMessageElChange"));
java.lang.Object _afterStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:afterStringsChange"));
java.lang.Object _afterTargetChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:afterTargetChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:onDestroyedChange"));
java.lang.Object _onHostChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:onHostChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:onInitializedChange"));
java.lang.Object _onMessageElChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:onMessageElChange"));
java.lang.Object _onStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:onStringsChange"));
java.lang.Object _onTargetChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:onTargetChange"));

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
_updateOptions(options, "host", _host);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "messageEl", _messageEl);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "target", _target);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterHostChange", _afterHostChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterMessageElChange", _afterMessageElChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTargetChange", _afterTargetChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onHostChange", _onHostChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onMessageElChange", _onMessageElChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTargetChange", _onTargetChange);
%>

<%@ include file="init-ext.jsp" %>