<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:loading-mask:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:loading-mask:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:loading-mask:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:loading-mask:destroyed"), false);
java.lang.String _host = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:host"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:loading-mask:initialized"), false);
java.lang.String _messageEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:messageEl"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:loading-mask:strings");
java.lang.String _target = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:target"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:afterDestroyedChange"));
java.lang.String _afterHostChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:afterHostChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:afterInitializedChange"));
java.lang.String _afterMessageElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:afterMessageElChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:afterStringsChange"));
java.lang.String _afterTargetChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:afterTargetChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:onDestroyedChange"));
java.lang.String _onHostChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:onHostChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:onInitializedChange"));
java.lang.String _onMessageElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:onMessageElChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:onStringsChange"));
java.lang.String _onTargetChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:onTargetChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:loading-mask:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:loading-mask:host") != null) {
	scopedAttributes.put("host", _host);
}

if (request.getAttribute("alloy:loading-mask:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:loading-mask:messageEl") != null) {
	scopedAttributes.put("messageEl", _messageEl);
}

if (request.getAttribute("alloy:loading-mask:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:loading-mask:target") != null) {
	scopedAttributes.put("target", _target);
}

if (request.getAttribute("alloy:loading-mask:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:loading-mask:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:loading-mask:afterHostChange") != null) {
	scopedAttributes.put("afterHostChange", _afterHostChange);
}

if (request.getAttribute("alloy:loading-mask:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:loading-mask:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:loading-mask:afterMessageElChange") != null) {
	scopedAttributes.put("afterMessageElChange", _afterMessageElChange);
}

if (request.getAttribute("alloy:loading-mask:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:loading-mask:afterTargetChange") != null) {
	scopedAttributes.put("afterTargetChange", _afterTargetChange);
}

if (request.getAttribute("alloy:loading-mask:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:loading-mask:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:loading-mask:onHostChange") != null) {
	scopedAttributes.put("onHostChange", _onHostChange);
}

if (request.getAttribute("alloy:loading-mask:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:loading-mask:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:loading-mask:onMessageElChange") != null) {
	scopedAttributes.put("onMessageElChange", _onMessageElChange);
}

if (request.getAttribute("alloy:loading-mask:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:loading-mask:onTargetChange") != null) {
	scopedAttributes.put("onTargetChange", _onTargetChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>