<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
String jsVar = (String)request.getAttribute("aui:component:jsVar");
String module = (String)request.getAttribute("aui:component:module");
String name = (String)request.getAttribute("aui:component:name");
String options = (String)request.getAttribute("aui:component:options");
String yuiVariable = (String)request.getAttribute("aui:component:yuiVariable");
%>

<script type="text/javascript">
	AUI().use('<%= module %>', function(<%= yuiVariable %>){
		var <%= jsVar %> = new <%= yuiVariable %>.<%= name %>(<%= options %>);
	});
</script>