<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">

	<input id="<%= uniqueId %>Input" maxlength="<%= _maxLength %>" />
	<span id="<%= uniqueId %>Counter"><%= _maxLength %></span>

</c:if>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= options %>"
	module="aui-char-counter"
	name="CharCounter"
/>