<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:loading-mask:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:loading-mask:scopedAttributes");

java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:loading-mask:destroyed");
java.lang.String _host = (java.lang.String)request.getAttribute("alloy:loading-mask:host");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:loading-mask:initialized");
java.lang.String _messageEl = (java.lang.String)request.getAttribute("alloy:loading-mask:messageEl");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:loading-mask:strings");
java.lang.String _target = (java.lang.String)request.getAttribute("alloy:loading-mask:target");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:loading-mask:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:loading-mask:afterDestroyedChange");
java.lang.String _afterHostChange = (java.lang.String)request.getAttribute("alloy:loading-mask:afterHostChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:loading-mask:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:loading-mask:afterInitializedChange");
java.lang.String _afterMessageElChange = (java.lang.String)request.getAttribute("alloy:loading-mask:afterMessageElChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:loading-mask:afterStringsChange");
java.lang.String _afterTargetChange = (java.lang.String)request.getAttribute("alloy:loading-mask:afterTargetChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:loading-mask:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:loading-mask:onDestroyedChange");
java.lang.String _onHostChange = (java.lang.String)request.getAttribute("alloy:loading-mask:onHostChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:loading-mask:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:loading-mask:onInitializedChange");
java.lang.String _onMessageElChange = (java.lang.String)request.getAttribute("alloy:loading-mask:onMessageElChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:loading-mask:onStringsChange");
java.lang.String _onTargetChange = (java.lang.String)request.getAttribute("alloy:loading-mask:onTargetChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_host != null) {
	scopedAttributes.put("host", _host);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_messageEl != null) {
	scopedAttributes.put("messageEl", _messageEl);
}

if (_strings != null) {
	scopedAttributes.put("strings", _strings);
}

if (_target != null) {
	scopedAttributes.put("target", _target);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterHostChange != null) {
	scopedAttributes.put("afterHostChange", _afterHostChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterMessageElChange != null) {
	scopedAttributes.put("afterMessageElChange", _afterMessageElChange);
}

if (_afterStringsChange != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (_afterTargetChange != null) {
	scopedAttributes.put("afterTargetChange", _afterTargetChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onHostChange != null) {
	scopedAttributes.put("onHostChange", _onHostChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onMessageElChange != null) {
	scopedAttributes.put("onMessageElChange", _onMessageElChange);
}

if (_onStringsChange != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (_onTargetChange != null) {
	scopedAttributes.put("onTargetChange", _onTargetChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>