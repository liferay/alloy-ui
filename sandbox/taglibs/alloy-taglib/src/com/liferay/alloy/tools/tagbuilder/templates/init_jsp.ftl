<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("${namespace}dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("${namespace}scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("${namespace}boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

<#list component.getAttributesAndEvents() as attribute>
<#assign simpleClassName = attribute.getJavaTypeSimpleClassName()>
<#if simpleClassName == "Object">
${attribute.getJavaType()} _${attribute.getSafeName()} = (${attribute.getJavaType()})request.getAttribute("${namespace}${attribute.getSafeName()}");
<#else>
<#if attribute.getDefaultValue()?? && (attribute.getDefaultValue() != "")>
<#if (simpleClassName == "String")>
${attribute.getJavaType()} _${attribute.getSafeName()} = GetterUtil.get${simpleClassName}((java.lang.String)request.getAttribute("${namespace}${attribute.getSafeName()}"), "${attribute.getDefaultValue()}");
<#else>
${attribute.getJavaType()} _${attribute.getSafeName()} = GetterUtil.get${simpleClassName}((java.lang.String)request.getAttribute("${namespace}${attribute.getSafeName()}"), ${attribute.getDefaultValue()});
</#if>
<#else>
${attribute.getJavaType()} _${attribute.getSafeName()} = GetterUtil.get${simpleClassName}((java.lang.String)request.getAttribute("${namespace}${attribute.getSafeName()}"));
</#if>
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
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>