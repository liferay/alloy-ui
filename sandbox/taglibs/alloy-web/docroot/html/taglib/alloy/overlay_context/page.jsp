<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox">
	</c:if>

	<div class="<%= CONTENT_BOX_CLASS %>" id="<%= uniqueId %>SrcNode">
		<c:if test="<%= Validator.isNotNull(_bodyContent) %>">
			<%= _bodyContent %>
		</c:if>
	</div>

	<c:if test="<%= !hasBoundingBox %>">
		</div>
	</c:if>
</c:if>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="OverlayContext1"
		module="aui-overlay"
		name="OverlayContext"
		yuiVariable="A"
	/>
</c:if>