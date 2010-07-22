<%@ include file="init.tagf" %>

<%@ attribute name="boundingBox" required="true" type="java.lang.String" %>
<%@ attribute name="canReset" type="java.lang.Boolean" %>
<%@ attribute name="defaultSelected" type="java.lang.Integer" %>
<%@ attribute name="disabled" type="java.lang.Boolean" %>
<%@ attribute name="elements" type="java.lang.String" %>
<%@ attribute name="hiddenInput" type="java.lang.String" %>
<%@ attribute name="label" type="java.lang.String" %>
<%@ attribute name="labelElement" type="java.lang.String" %>
<%@ attribute name="selectedIndex" type="java.lang.Integer" %>
<%@ attribute name="showTitle" type="java.lang.Boolean" %>
<%@ attribute name="size" type="java.lang.Integer" %>
<%@ attribute name="title" type="java.lang.String" %>
<%@ attribute name="value" type="java.lang.String" %>

<%@ attribute name="render" type="java.lang.Boolean" %>
<%@ attribute name="inline" type="java.lang.Boolean" %>

<%@ tag dynamic-attributes="dynamicAttributes" %>

<alloy-util:createOptions
	optionsName="options"
	tagJspContext="<%= jspContext %>"
	dynamicAttributes="${dynamicAttributes}"
	excludeAttributes="jsVar"
	javaScriptAttributes='${dynamicAttributes.javaScriptAttributes == null ? "" : dynamicAttributes.javaScriptAttributes}'
/>

<alloy-util:component
	inline="${inline}"
	jsVar="${dynamicAttributes.jsVar == null ? 'autoComplete1' : dynamicAttributes.jsVar}"
	module="aui-rating"
	name="Rating"
	options="${options}"
	tagJspContext="<%= jspContext %>"
	yuiVariable="A"
/>
