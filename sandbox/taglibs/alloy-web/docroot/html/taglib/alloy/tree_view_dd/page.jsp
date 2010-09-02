<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="TreeViewDD1"
		module="aui-tree"
		name="TreeViewDD"
		yuiVariable="A"
	/>
</c:if>