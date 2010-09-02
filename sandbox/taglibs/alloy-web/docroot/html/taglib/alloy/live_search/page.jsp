<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="LiveSearch1"
		module="aui-live-search"
		name="LiveSearch"
		yuiVariable="A"
	/>
</c:if>