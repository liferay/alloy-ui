<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="PortalLayout1"
		module="aui-portal-layout"
		name="PortalLayout"
		yuiVariable="A"
	/>
</c:if>