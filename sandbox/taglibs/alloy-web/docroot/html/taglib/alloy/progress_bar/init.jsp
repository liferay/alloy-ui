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

<%@ include file="init-ext.jsp" %>

<%
if (_min != null) {
	scopedAttributes.put("min",  _min);
}

if (_orientation != null) {
	scopedAttributes.put("orientation",  _orientation);
}

if (_textNode != null) {
	scopedAttributes.put("textNode",  _textNode);
}

if (_height != null) {
	scopedAttributes.put("height",  _height);
}

if (_statusNode != null) {
	scopedAttributes.put("statusNode",  _statusNode);
}

if (_max != null) {
	scopedAttributes.put("max",  _max);
}

if (_ratio != null) {
	scopedAttributes.put("ratio",  _ratio);
}

if (_value != null) {
	scopedAttributes.put("value",  _value);
}

if (_label != null) {
	scopedAttributes.put("label",  _label);
}

if (_step != null) {
	scopedAttributes.put("step",  _step);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>