<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox" style="width: <%= _width %>px">
	</c:if>
	
    <div class="<%= CONTENT_BOX_CLASS %>" id="<%= uniqueId %>SrcNode"></div>
	
	<c:if test="<%= !hasBoundingBox %>">
		</div>
	</c:if>
</c:if>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="Textboxlist1"
		module="aui-textboxlist"
		name="TextboxList"
		yuiVariable="A"
	/>
</c:if>