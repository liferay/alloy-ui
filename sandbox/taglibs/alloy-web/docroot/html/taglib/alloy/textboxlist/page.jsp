<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="Textboxlist1"
		module="aui-textboxlist"
		name="Textboxlist"
		yuiVariable="A"
	/>
</c:if>