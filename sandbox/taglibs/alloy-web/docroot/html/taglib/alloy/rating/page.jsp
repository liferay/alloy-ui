<%@page import="com.liferay.alloy.util.MarkupUtil"%>
<%@page import="com.liferay.alloy.util.PropsKeys"%>
<%@page import="com.liferay.alloy.util.PropsUtil"%>
<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">

	<div id="<%= uniqueId %>">
		<%
		for (int i = 1; i <= (Integer)_size; i++) {
		%>
			<a class="aui-rating-element<%= (i <= (Integer)_defaultSelected) ? " aui-rating-element-on" : StringPool.BLANK %>" href="javascript:;"></a>
		<%
		}
		%>
	</div>

</c:if>

<alloy:component
	var="Rating1"
	module="aui-rating"
	name="Rating"
	options="${options}"
	yuiVariable="A"
/>