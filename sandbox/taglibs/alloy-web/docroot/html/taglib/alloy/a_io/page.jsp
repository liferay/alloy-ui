<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="Aio1"
		module="aui-io"
		name="A.io"
		yuiVariable="A"
	/>
</c:if>