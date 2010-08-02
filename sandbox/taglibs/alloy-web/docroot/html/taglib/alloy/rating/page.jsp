<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:rating:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:rating:scopedAttributes");

java.lang.Integer _selectedIndex = (java.lang.Integer)request.getAttribute("alloy:rating:selectedIndex");
java.lang.Integer _defaultSelected = (java.lang.Integer)request.getAttribute("alloy:rating:defaultSelected");
java.lang.String _labelNode = (java.lang.String)request.getAttribute("alloy:rating:labelNode");
java.lang.String _label = (java.lang.String)request.getAttribute("alloy:rating:label");
java.lang.String _inputName = (java.lang.String)request.getAttribute("alloy:rating:inputName");
java.lang.Integer _size = (java.lang.Integer)request.getAttribute("alloy:rating:size");
java.lang.String _title = (java.lang.String)request.getAttribute("alloy:rating:title");
java.lang.String _hiddenInput = (java.lang.String)request.getAttribute("alloy:rating:hiddenInput");
java.lang.String _value = (java.lang.String)request.getAttribute("alloy:rating:value");
java.lang.String _canReset = (java.lang.String)request.getAttribute("alloy:rating:canReset");
java.lang.String _showTitle = (java.lang.String)request.getAttribute("alloy:rating:showTitle");
java.lang.String _elements = (java.lang.String)request.getAttribute("alloy:rating:elements");
java.lang.String _disabled = (java.lang.String)request.getAttribute("alloy:rating:disabled");
%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>

<%@ include file="page-ext.jsp" %>