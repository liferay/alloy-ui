<%@ include file="init.jsp" %>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= options %>"
	module="aui-parse-content"
	name="ParseContent"
/>