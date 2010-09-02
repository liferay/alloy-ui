<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="OverlayContextPanel1"
		module="aui-overlay"
		name="OverlayContextPanel"
		yuiVariable="A"
	/>
</c:if>