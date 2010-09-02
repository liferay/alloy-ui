<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="Calendar1"
		module="aui-calendar"
		name="Calendar"
		yuiVariable="A"
	/>
</c:if>