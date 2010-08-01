<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
String var = (String)request.getAttribute("aui:component:var");
String module = (String)request.getAttribute("aui:component:module");
String name = (String)request.getAttribute("aui:component:name");
String options = (String)request.getAttribute("aui:component:options");
String yuiVariable = (String)request.getAttribute("aui:component:yuiVariable");
%>

<script type="text/javascript">
	AUI().use('<%= module %>', function(<%= yuiVariable %>){
		var <%= var %> = new <%= yuiVariable %>.<%= name %>(<%= options %>);
	});
</script>