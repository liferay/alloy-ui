<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="ParseContent1"
		module="aui-parse-content"
		name="ParseContent"
		yuiVariable="A"
	/>
</c:if>