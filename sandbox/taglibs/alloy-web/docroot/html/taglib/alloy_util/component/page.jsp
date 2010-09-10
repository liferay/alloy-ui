<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy-util:script use="<%= _module %>" position="<%= position %>">
		var <%= _var %> = new <%= _yuiVariable %>.<%= _name %>(<%= optionsJSON.toString() %>);
	</alloy-util:script>
</c:if>