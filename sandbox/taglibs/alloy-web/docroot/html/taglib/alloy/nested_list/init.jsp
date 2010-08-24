<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:nested-list:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:nested-list:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	if ((String)request.getAttribute("alloy:nested-list:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:nested-list:destroyed"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:nested-list:initialized"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:nested-list:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:nested-list:afterDestroyedChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:nested-list:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:nested-list:afterInitializedChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:nested-list:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:nested-list:onDestroyedChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:nested-list:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:nested-list:onInitializedChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:nested-list:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:nested-list:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:nested-list:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:nested-list:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:nested-list:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:nested-list:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:nested-list:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:nested-list:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:nested-list:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:nested-list:onInitializedChange") != null) {
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