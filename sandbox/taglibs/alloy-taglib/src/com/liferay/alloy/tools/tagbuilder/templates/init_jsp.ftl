<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("${namespace}dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("${namespace}scopedAttributes");

<#list component.getAttributesAndEvents() as attribute>
<#assign simpleClassName = attribute.getJavaTypeSimpleClassName()>
<#if simpleClassName == "Object">
${attribute.getJavaType()} _${attribute.getSafeName()} = (${attribute.getJavaType()})request.getAttribute("${namespace}${attribute.getSafeName()}");
<#else>
${attribute.getJavaType()} _${attribute.getSafeName()} = GetterUtil.get${simpleClassName}((java.lang.String)request.getAttribute("${namespace}${attribute.getSafeName()}"));
</#if>
</#list>
%>

<%@ include file="init-ext.jsp" %>

<%
<#list component.getAttributesAndEvents() as attribute>
if (request.getAttribute("${namespace}${attribute.getSafeName()}") != null) {
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