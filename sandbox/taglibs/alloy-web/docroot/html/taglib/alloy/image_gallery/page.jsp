<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="ImageGallery1"
		module="aui-image-viewer"
		name="ImageGallery"
		yuiVariable="A"
	/>
</c:if>