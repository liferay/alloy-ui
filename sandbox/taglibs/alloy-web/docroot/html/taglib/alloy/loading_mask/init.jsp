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
java.lang.Object _host = (java.lang.Object)request.getAttribute("alloy:loading-mask:host");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:loading-mask:initialized"), false);
java.lang.Object _messageEl = (java.lang.Object)request.getAttribute("alloy:loading-mask:messageEl");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:loading-mask:strings");
java.lang.Object _target = (java.lang.Object)request.getAttribute("alloy:loading-mask:target");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterDestroyedChange");
java.lang.Object _afterHostChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterHostChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterInitializedChange");
java.lang.Object _afterMessageElChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterMessageElChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterStringsChange");
java.lang.Object _afterTargetChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterTargetChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:loading-mask:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onDestroyedChange");
java.lang.Object _onHostChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onHostChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:loading-mask:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onInitializedChange");
java.lang.Object _onMessageElChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onMessageElChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onStringsChange");
java.lang.Object _onTargetChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onTargetChange");
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