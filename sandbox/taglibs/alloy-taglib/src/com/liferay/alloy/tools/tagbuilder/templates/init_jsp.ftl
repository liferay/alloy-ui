<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("${namespace}dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("${namespace}scopedAttributes");

<#list component.getAttributes() as attribute>
${attribute.getType()} _${attribute.getName()} = (${attribute.getType()})request.getAttribute("${namespace}${attribute.getName()}");
</#list>
%>

<%@ include file="init-ext.jsp" %>

<%
<#list component.getAttributes() as attribute>
if (_${attribute.getName()} != null) {
	scopedAttributes.put("${attribute.getName()}",  _${attribute.getName()});
}

</#list>
%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>