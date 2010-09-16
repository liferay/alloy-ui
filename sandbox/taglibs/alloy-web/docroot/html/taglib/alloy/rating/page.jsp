<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div id="<%= uniqueId %>BoundingBox" class="<%= BOUNDING_BOX_CLASS %>">
	</c:if>

   	<div id="<%= uniqueId %>SrcNode" class="<%= CONTENT_BOX_CLASS %>">
    	<div class="<%= CSS_RATING_LABEL_EL %>">
    		<%= _label %>
   		</div>
        <%
		for (int i = 1; i <= (Integer)_size; i++) {
		%>
			<a class="<%= CSS_RATING_EL.concat((i <= (Integer)_defaultSelected) ? StringPool.SPACE.concat(CSS_RATING_EL_ON) : StringPool.BLANK) %>" href="javascript:;"></a>

			<label for="<%= uniqueId %>Labeled<%= i %>" style="display:none;"><%= StringUtil.substitute(elementTitle, new Object[] {i, _size}) %></label>
			<input checked="<%= i == (Integer)_defaultSelected %>" id="<%= uniqueId %>Labeled<%= i %>" type="hidden" value="<%= i %>" />
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
	options="<%= options %>"
	module="aui-rating"
	name="Rating"
/>