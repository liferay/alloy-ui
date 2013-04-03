<%--
<#include "copyright.ftl">
--%>

<%@ include file="init.jsp" %>
<#if component.isAlloyComponent()>

<aui:component
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	options="<%= options %>"
	var="${component.getSafeName()}1"
	module="${component.getModule()}"
	name="${component.getName()}"
	yuiVariable="A"
/>
</#if>