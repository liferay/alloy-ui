<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="NestedList1"
		module="aui-nested-list"
		name="NestedList"
		yuiVariable="A"
	/>
</c:if>