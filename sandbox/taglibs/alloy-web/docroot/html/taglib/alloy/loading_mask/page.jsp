<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="LoadingMask1"
		module="aui-loading-mask"
		name="LoadingMask"
		yuiVariable="A"
	/>
</c:if>