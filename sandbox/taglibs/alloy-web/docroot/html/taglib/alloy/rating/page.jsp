<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div id="<%= uniqueId %>BoundingBox" class="<%= BOUNDING_BOX_CLASS %>">
	</c:if>

   	<div id="<%= uniqueId %>SrcNode" class="<%= CONTENT_BOX_CLASS %>">
    	<div class="<%= CSS_RATING_LABEL_EL %>">
    		<%= label %>
   		</div>
        <%
		for (int i = 1; i <= (Integer)size; i++) {
		%>
			<a class="<%= CSS_RATING_EL.concat((i <= (Integer)defaultSelected) ? StringPool.SPACE.concat(CSS_RATING_EL_ON) : StringPool.BLANK) %>" href="javascript:;"></a>

			<label for="<%= uniqueId %>Labeled<%= i %>" style="display:none;"><%= MessageUtil.substitute(elementTitle, new Object[] {i, size}) %></label>
			<input checked="<%= i == (Integer)defaultSelected %>" id="<%= uniqueId %>Labeled<%= i %>" type="hidden" value="<%= i %>" />
		<%
		}
		%>
    </div>

	<c:if test="<%= !hasBoundingBox %>">
		</div>
	</c:if>
</c:if>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= _options %>"
	module="aui-rating"
	name="Rating"
/>