<%@ include file="init.jsp" %>

<%
String optionsJSON = (String)request.getAttribute("alloy_util:component:optionsJSON");

boolean useJavaScript = GetterUtil.getBoolean((Serializable)options.get("useJavaScript"), true);
%>
<c:if test="<%= useJavaScript %>">
	<script type="text/javascript">
		AUI().use('<%= _module %>', function(<%= _yuiVariable %>){
			var <%= _var %> = new <%= _yuiVariable %>.<%= _name %>(<%= optionsJSON %>);
		});
	</script>
</c:if>