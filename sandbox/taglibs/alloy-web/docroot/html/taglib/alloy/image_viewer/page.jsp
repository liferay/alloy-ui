<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="ImageViewer1"
		module="aui-image-viewer"
		name="ImageViewer"
		yuiVariable="A"
	/>
</c:if>