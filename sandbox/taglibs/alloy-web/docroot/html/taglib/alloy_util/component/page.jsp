<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy-util:script use="<%= module %>" position="<%= scriptPosition %>">
		<c:if test="<%= Validator.isNotNull(var) %>">
				<%= var %> =
		</c:if>

		(new A.<%= name %>(<%= _serialize(optionsJSON, javaScriptAttributes) %>));
	</alloy-util:script>
</c:if>