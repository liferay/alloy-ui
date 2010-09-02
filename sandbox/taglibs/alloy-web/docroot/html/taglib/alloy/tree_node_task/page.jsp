<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="TreeNodeTask1"
		module="aui-tree"
		name="TreeNodeTask"
		yuiVariable="A"
	/>
</c:if>