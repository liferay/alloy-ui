<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:scopedAttributes");

java.lang.String _appendOrder = (java.lang.String)request.getAttribute("alloy:date-picker-select:appendOrder");
java.lang.String _trigger = (java.lang.String)request.getAttribute("alloy:date-picker-select:trigger");
java.lang.String _populateDay = (java.lang.String)request.getAttribute("alloy:date-picker-select:populateDay");
java.lang.String _buttonNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:buttonNode");
java.lang.String _visible = (java.lang.String)request.getAttribute("alloy:date-picker-select:visible");
java.lang.String _populateYear = (java.lang.String)request.getAttribute("alloy:date-picker-select:populateYear");
java.lang.String _dayNodeName = (java.lang.String)request.getAttribute("alloy:date-picker-select:dayNodeName");
java.lang.String _populateMonth = (java.lang.String)request.getAttribute("alloy:date-picker-select:populateMonth");
java.lang.String _setValue = (java.lang.String)request.getAttribute("alloy:date-picker-select:setValue");
java.lang.String _yearNodeName = (java.lang.String)request.getAttribute("alloy:date-picker-select:yearNodeName");
java.lang.String _dayNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:dayNode");
java.lang.String _yearNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:yearNode");
java.lang.String _monthNodeName = (java.lang.String)request.getAttribute("alloy:date-picker-select:monthNodeName");
java.lang.String _monthNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:monthNode");
java.lang.String _baseName = (java.lang.String)request.getAttribute("alloy:date-picker-select:baseName");
java.lang.String _yearRange = (java.lang.String)request.getAttribute("alloy:date-picker-select:yearRange");
java.lang.String _selectWrapperNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:selectWrapperNode");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_appendOrder != null) {
	scopedAttributes.put("appendOrder",  _appendOrder);
}

if (_trigger != null) {
	scopedAttributes.put("trigger",  _trigger);
}

if (_populateDay != null) {
	scopedAttributes.put("populateDay",  _populateDay);
}

if (_buttonNode != null) {
	scopedAttributes.put("buttonNode",  _buttonNode);
}

if (_visible != null) {
	scopedAttributes.put("visible",  _visible);
}

if (_populateYear != null) {
	scopedAttributes.put("populateYear",  _populateYear);
}

if (_dayNodeName != null) {
	scopedAttributes.put("dayNodeName",  _dayNodeName);
}

if (_populateMonth != null) {
	scopedAttributes.put("populateMonth",  _populateMonth);
}

if (_setValue != null) {
	scopedAttributes.put("setValue",  _setValue);
}

if (_yearNodeName != null) {
	scopedAttributes.put("yearNodeName",  _yearNodeName);
}

if (_dayNode != null) {
	scopedAttributes.put("dayNode",  _dayNode);
}

if (_yearNode != null) {
	scopedAttributes.put("yearNode",  _yearNode);
}

if (_monthNodeName != null) {
	scopedAttributes.put("monthNodeName",  _monthNodeName);
}

if (_monthNode != null) {
	scopedAttributes.put("monthNode",  _monthNode);
}

if (_baseName != null) {
	scopedAttributes.put("baseName",  _baseName);
}

if (_yearRange != null) {
	scopedAttributes.put("yearRange",  _yearRange);
}

if (_selectWrapperNode != null) {
	scopedAttributes.put("selectWrapperNode",  _selectWrapperNode);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>