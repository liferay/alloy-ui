<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="OverlayContext1"
		module="aui-overlay"
		name="OverlayContext"
		yuiVariable="A"
	/>
</c:if>