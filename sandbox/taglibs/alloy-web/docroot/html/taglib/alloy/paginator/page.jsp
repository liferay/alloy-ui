<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="Paginator1"
		module="aui-paginator"
		name="Paginator"
		yuiVariable="A"
	/>
</c:if>