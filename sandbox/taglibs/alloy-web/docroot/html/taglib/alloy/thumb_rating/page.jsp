<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="ThumbRating1"
		module="aui-rating"
		name="ThumbRating"
		yuiVariable="A"
	/>
</c:if>