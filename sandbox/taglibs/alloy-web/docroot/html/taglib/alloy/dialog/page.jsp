<%@ include file="init.jsp" %>

<alloy-util:component
	javaScriptAttributes="xy"
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= options %>"
	module="aui-dialog"
	name="Dialog"
/>