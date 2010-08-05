<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("${namespace}dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("${namespace}scopedAttributes");

<#list component.getAttributesAndEvents() as attribute>
${attribute.getJavaType()} _${attribute.getSafeName()} = (${attribute.getJavaType()})request.getAttribute("${namespace}${attribute.getSafeName()}");
</#list>
%>

<%@ include file="init-ext.jsp" %>

<%
<#list component.getAttributesAndEvents() as attribute>
if (_${attribute.getSafeName()} != null) {
	scopedAttributes.put("${attribute.getSafeName()}", _${attribute.getSafeName()});
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