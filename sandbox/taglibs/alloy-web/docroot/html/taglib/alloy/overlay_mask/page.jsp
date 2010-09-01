<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="OverlayMask1"
		module="aui-overlay"
		name="OverlayMask"
		yuiVariable="A"
	/>
</c:if>