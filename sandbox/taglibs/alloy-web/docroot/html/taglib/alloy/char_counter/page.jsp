<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:scopedAttributes");

java.lang.String _input = (java.lang.String)request.getAttribute("alloy:char-counter:input");
java.lang.Integer _maxLength = (java.lang.Integer)request.getAttribute("alloy:char-counter:maxLength");
java.lang.String _counter = (java.lang.String)request.getAttribute("alloy:char-counter:counter");
%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>

<%@ include file="page-ext.jsp" %>