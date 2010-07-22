<%@ include file="init.tagf" %>

<%@ attribute name="counter" type="java.lang.String" %>
<%@ attribute name="input" required="true" type="java.lang.String" %>
<%@ attribute name="maxLength" required="true" type="java.lang.Integer" %>

<%@ attribute name="inline" type="java.lang.Boolean" %>

<%@ tag dynamic-attributes="dynamicAttributes" %>

<alloy-util:createOptions
	optionsName="options"
	tagJspContext="<%= jspContext %>"
	dynamicAttributes="${dynamicAttributes}"
	excludeAttributes="jsVar,javaScriptAttributes"
	javaScriptAttributes="${dynamicAttributes.javaScriptAttributes ? '' : dynamicAttributes.javaScriptAttributes}"
/>

<alloy-util:component
	inline="${inline}"
	jsVar="${dynamicAttributes.jsVar == null ? 'charCounter1' : dynamicAttributes.jsVar}"
	module="aui-char-counter"
	name="CharCounter"
	options="${options}"
	tagJspContext="<%= jspContext %>"
	yuiVariable="A"
/>
