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

<%@ include file="init-ext.jsp" %>

<%
if (_selectedIndex != null) {
	scopedAttributes.put("selectedIndex",  _selectedIndex);
}

if (_defaultSelected != null) {
	scopedAttributes.put("defaultSelected",  _defaultSelected);
}

if (_labelNode != null) {
	scopedAttributes.put("labelNode",  _labelNode);
}

if (_label != null) {
	scopedAttributes.put("label",  _label);
}

if (_inputName != null) {
	scopedAttributes.put("inputName",  _inputName);
}

if (_size != null) {
	scopedAttributes.put("size",  _size);
}

if (_title != null) {
	scopedAttributes.put("title",  _title);
}

if (_hiddenInput != null) {
	scopedAttributes.put("hiddenInput",  _hiddenInput);
}

if (_value != null) {
	scopedAttributes.put("value",  _value);
}

if (_canReset != null) {
	scopedAttributes.put("canReset",  _canReset);
}

if (_showTitle != null) {
	scopedAttributes.put("showTitle",  _showTitle);
}

if (_elements != null) {
	scopedAttributes.put("elements",  _elements);
}

if (_disabled != null) {
	scopedAttributes.put("disabled",  _disabled);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>