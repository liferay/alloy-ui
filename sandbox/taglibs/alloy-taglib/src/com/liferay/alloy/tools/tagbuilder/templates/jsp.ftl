<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">

	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="${component.getSafeName()}1"
		module="${component.getModule()}"
		name="${component.getName()}"
		yuiVariable="A"
	/>
	
</c:if>