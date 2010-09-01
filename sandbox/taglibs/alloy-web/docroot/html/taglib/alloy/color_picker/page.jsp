<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="ColorPicker1"
		module="aui-color-picker"
		name="ColorPicker"
		yuiVariable="A"
	/>
</c:if>