<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="Tooltip1"
		module="aui-tooltip"
		name="Tooltip"
		yuiVariable="A"
	/>
</c:if>