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

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>

<%@ include file="page-ext.jsp" %>