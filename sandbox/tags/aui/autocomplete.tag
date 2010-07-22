<%@ include file="init.tagf" %>

<%@ attribute name="alwaysShowContainer" type="java.lang.Boolean" %>
<%@ attribute name="applyLocalFilter" type="java.lang.Boolean" %>
<%@ attribute name="autoHighlight" type="java.lang.Boolean" %>
<%@ attribute name="contentBox" required="true" type="java.lang.String" %>
<%@ attribute name="dataSource" type="java.lang.String" %>
<%@ attribute name="dataSourceType" type="java.lang.String" %>
<%@ attribute name="delimChar" type="java.lang.String" %>
<%@ attribute name="forceSelection" type="java.lang.Boolean" %>
<%@ attribute name="input" type="java.lang.String" %>
<%@ attribute name="matchKey" type="java.lang.String" %>
<%@ attribute name="maxResultsDisplayed" type="java.lang.Integer" %>
<%@ attribute name="minQueryLength" type="java.lang.Integer" %>
<%@ attribute name="queryDelay" type="java.lang.Integer" %>
<%@ attribute name="queryInterval" type="java.lang.Integer" %>
<%@ attribute name="queryMatchCase" type="java.lang.Boolean" %>
<%@ attribute name="queryMatchContains" type="java.lang.Boolean" %>
<%@ attribute name="queryQuestionMark" type="java.lang.Boolean" %>
<%@ attribute name="schema" type="java.lang.String" %>
<%@ attribute name="schemaType" type="java.lang.String" %>
<%@ attribute name="suppressInputUpdate" type="java.lang.Boolean" %>
<%@ attribute name="typeAhead" type="java.lang.Boolean" %>
<%@ attribute name="typeAheadDelay" type="java.lang.Integer" %>
<%@ attribute name="uniqueName" type="java.lang.String" %>

<%@ attribute name="inline" type="java.lang.Boolean" %>
<%@ attribute name="render" type="java.lang.Boolean" %>

<%@ tag dynamic-attributes="dynamicAttributes" %>

<alloy-util:createOptions
	optionsName="options"
	tagJspContext="<%= jspContext %>"
	dynamicAttributes="${dynamicAttributes}"
	excludeAttributes="jsVar,javaScriptAttributes"
	javaScriptAttributes='${dynamicAttributes.javaScriptAttributes == null ? "dataSource,schema" : dynamicAttributes.javaScriptAttributes}'
/>

<alloy-util:component
	inline="${inline}"
	jsVar="${dynamicAttributes.jsVar == null ? 'autoComplete1' : dynamicAttributes.jsVar}"
	module="aui-autocomplete"
	name="AutoComplete"
	options="${options}"
	tagJspContext="<%= jspContext %>"
	yuiVariable="A"
/>
