<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<script type="text/javascript">
		AUI().use('<%= _module %>', function(<%= _yuiVariable %>){
			var <%= _var %> = new <%= _yuiVariable %>.<%= _name %>(<%= optionsJSON.toString() %>);
		});
	</script>
</c:if>