<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:parse-content:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:parse-content:scopedAttributes");

String uniqueId = StringPool.BLANK;
String srcNode = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean((java.io.Serializable)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId));
}

java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:parse-content:destroyed"));
java.lang.String _host = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:host"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:parse-content:initialized"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:afterDestroyedChange"));
java.lang.String _afterHostChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:afterHostChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:afterInitializedChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:onDestroyedChange"));
java.lang.String _onHostChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:onHostChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:parse-content:onInitializedChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:parse-content:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:parse-content:host") != null) {
	scopedAttributes.put("host", _host);
}

if (request.getAttribute("alloy:parse-content:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:parse-content:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:parse-content:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:parse-content:afterHostChange") != null) {
	scopedAttributes.put("afterHostChange", _afterHostChange);
}

if (request.getAttribute("alloy:parse-content:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:parse-content:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:parse-content:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:parse-content:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:parse-content:onHostChange") != null) {
	scopedAttributes.put("onHostChange", _onHostChange);
}

if (request.getAttribute("alloy:parse-content:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:parse-content:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>