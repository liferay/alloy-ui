<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy-util:script use="<%= _module %>" position="<%= scriptPosition %>">

		<c:if test="<%= Validator.isNotNull(_var) %>">

				<c:if test="<%= _defineVar %>">
					var
				</c:if>

				<%= _var %> =
		</c:if>

		 (new A.<%= _name %>(<%= optionsJSON.toString() %>));

	</alloy-util:script>
</c:if>