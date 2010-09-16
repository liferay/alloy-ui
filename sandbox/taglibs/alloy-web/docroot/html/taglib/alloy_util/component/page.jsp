<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy-util:script use="<%= _module %>" position="<%= scriptPosition %>">
		 var component = new A.<%= _name %>(<%= optionsJSON.toString() %>);

		<c:if test="<%= Validator.isNotNull(_var) %>">
				window['<%= _var %>'] = component;
		</c:if>
	</alloy-util:script>
</c:if>