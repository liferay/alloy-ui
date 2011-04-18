<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">

	<input id="<%= uniqueId %>Input" maxlength="<%= maxLength %>" />
	<span id="<%= uniqueId %>Counter"><%= maxLength %></span>

</c:if>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= _options %>"
	module="yui3-aui-char-counter"
	name="CharCounter"
/>