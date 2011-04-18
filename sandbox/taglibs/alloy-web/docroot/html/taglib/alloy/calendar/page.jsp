<%@ include file="init.jsp" %>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= _options %>"
	module="yui3-aui-calendar"
	name="Calendar"
/>