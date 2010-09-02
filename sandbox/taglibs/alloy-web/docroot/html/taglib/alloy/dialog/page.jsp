<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		javaScriptAttributes="xy"
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="Dialog1"
		module="aui-dialog"
		name="Dialog"
		yuiVariable="A"
	/>
</c:if>