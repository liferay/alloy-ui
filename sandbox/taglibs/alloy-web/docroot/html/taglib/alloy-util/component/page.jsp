<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> options = (Map<String, Object>)request.getAttribute("aui:component:options");

String var = (String)request.getAttribute("aui:component:var");
String module = (String)request.getAttribute("aui:component:module");
String name = (String)request.getAttribute("aui:component:name");
String optionsJSON = (String)request.getAttribute("aui:component:optionsJSON");
String yuiVariable = (String)request.getAttribute("aui:component:yuiVariable");

boolean useJavaScript = GetterUtil.getBoolean((Serializable)options.get("useJavaScript"), true);
%>
<c:if test="<%= useJavaScript %>">
	<script type="text/javascript">
		AUI().use('<%= module %>', function(<%= yuiVariable %>){
			var <%= var %> = new <%= yuiVariable %>.<%= name %>(<%= optionsJSON %>);
		});
	</script>
</c:if>