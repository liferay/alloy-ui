<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">

	<c:if test="<%= !hasBoundingBox %>">
	    <div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox">
	</c:if>

	<c:if test="<%= Validator.isNotNull(bodyContentString) %>">
		<span class="<%= CSS_TOOLBAR_CONTENT %>" id="<%= uniqueId %>SrcNode">
			<%= bodyContentString %>
		</span>
	</c:if>

	<c:if test="<%= !hasBoundingBox %>">
    	</div>
    </c:if>

</c:if>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= _options %>"
	module="aui-toolbar"
	name="Toolbar"
/>