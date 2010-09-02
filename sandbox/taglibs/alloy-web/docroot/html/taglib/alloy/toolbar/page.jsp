<%@page import="java.util.ArrayList"%>
<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	
	<c:if test="<%= !hasBoundingBox %>">
	    <div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox">
	</c:if>
	
	<c:if test="<%= Validator.isNotNull(bodyContent) %>">
		<span class="<%= CSS_TOOLBAR_CONTENT %>" id="<%= uniqueId %>SrcNode">
			<%= bodyContent %>
		</span>
	</c:if>
	
	<c:if test="<%= !hasBoundingBox %>">
    	</div>
    </c:if>
    
</c:if>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="Toolbar1"
		module="aui-toolbar"
		name="Toolbar"
		yuiVariable="A"
	/>
</c:if>