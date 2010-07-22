<%@ include file="init.tagf" %>

<%@ attribute name="modules" type="java.lang.String" %>
<%@ attribute name="yuiVariable" required="true" type="java.lang.String" %>

<jsp:doBody var="javascript"/>

<alloy-util:cache modules="${modules}">${javascript}</alloy-util:cache>

<%
StringBuffer javascriptCache = (StringBuffer)request.getAttribute("javascriptCache");
Set<String> modulesCache = (LinkedHashSet<String>)request.getAttribute("modulesCache");

StringBuffer modulesSB = new StringBuffer();

Iterator<String> it = modulesCache.iterator();

while (it.hasNext()) {
	modulesSB.append(StringPool.APOSTROPHE);
	modulesSB.append(it.next());
	modulesSB.append(StringPool.APOSTROPHE);
	modulesSB.append(StringPool.COMMA);
}
%>

<script type="text/javascript">
	AUI().use(<%= modulesSB.toString() %> function(${yuiVariable}){
		<%= javascriptCache.toString() %>
	});
</script>
