<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div id="<%= uniqueId %>BoundingBox" class="<%= BOUNDING_BOX_CLASS %>">
	</c:if>

   	<div id="<%= uniqueId %>SrcNode" class="<%= CONTENT_BOX_CLASS %>">
    	<div class="<%= CSS_RATING_LABEL_EL %>">
    		<%= _label %>
   		</div>

		<a class="<%= RATING_EL_UP_CLASS %>" href="javascript:;"></a>

		<label for="<%= uniqueId %>Up" style="display:none;"><%= StringUtil.substitute(elementTitle, new Object[] {"Good"}) %></label>
		<input checked="<%= 1 == (Integer)_defaultSelected %>" id="<%= uniqueId %>Up" type="hidden" value="<%= 1 %>" />
		
		<a class="<%= RATING_EL_DOWN_CLASS %>" href="javascript:;"></a>

		<label for="<%= uniqueId %>Down" style="display:none;"><%= StringUtil.substitute(elementTitle, new Object[] {"Bad"}) %></label>
		<input checked="<%= 2 == (Integer)_defaultSelected %>" id="<%= uniqueId %>Down" type="hidden" value="<%= 2 %>" />
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
		var="ThumbRating1"
		module="aui-rating"
		name="ThumbRating"
		yuiVariable="A"
	/>
</c:if>