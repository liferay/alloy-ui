<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:scopedAttributes");

java.lang.String _min = (java.lang.String)request.getAttribute("alloy:progress-bar:min");
java.lang.String _orientation = (java.lang.String)request.getAttribute("alloy:progress-bar:orientation");
java.lang.String _textNode = (java.lang.String)request.getAttribute("alloy:progress-bar:textNode");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:progress-bar:height");
java.lang.String _statusNode = (java.lang.String)request.getAttribute("alloy:progress-bar:statusNode");
java.lang.String _max = (java.lang.String)request.getAttribute("alloy:progress-bar:max");
java.lang.String _ratio = (java.lang.String)request.getAttribute("alloy:progress-bar:ratio");
java.lang.Integer _value = (java.lang.Integer)request.getAttribute("alloy:progress-bar:value");
java.lang.String _label = (java.lang.String)request.getAttribute("alloy:progress-bar:label");
java.lang.String _step = (java.lang.String)request.getAttribute("alloy:progress-bar:step");
%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>

<%@ include file="page-ext.jsp" %>