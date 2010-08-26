<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:parse-content:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:parse-content:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:parse-content:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:parse-content:destroyed"), false);
java.lang.Object _host = (java.lang.Object)request.getAttribute("alloy:parse-content:host");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:parse-content:initialized"), false);
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:parse-content:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:afterDestroyedChange");
java.lang.Object _afterHostChange = (java.lang.Object)request.getAttribute("alloy:parse-content:afterHostChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:parse-content:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:afterInitializedChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:parse-content:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:onDestroyedChange");
java.lang.Object _onHostChange = (java.lang.Object)request.getAttribute("alloy:parse-content:onHostChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:parse-content:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:onInitializedChange");
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