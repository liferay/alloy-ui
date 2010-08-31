<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">

	<%
	final String CSS_CLEAR_FIX = MarkupUtil.getClassName("helper", "clearfix");
	final String CSS_COMPONENT = MarkupUtil.getClassName("component");
	final String CSS_RATING = MarkupUtil.getClassName("rating");
	final String CSS_RATING_CONTENT = MarkupUtil.getClassName("rating", "content");
	final String CSS_RATING_EL = MarkupUtil.getClassName("rating", "element");
	final String CSS_RATING_EL_HOVER  = MarkupUtil.getClassName("rating", "element", "hover");
	final String CSS_RATING_EL_ON = MarkupUtil.getClassName("rating", "element", "on");
	final String CSS_RATING_LABEL_EL = MarkupUtil.getClassName("rating", "label", "element");
	final String CSS_WIDGET = MarkupUtil.getClassName("widget");

	final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_WIDGET, CSS_COMPONENT, CSS_RATING }, StringPool.SPACE);
	final String CONTENT_BOX_CLASS = StringUtil.merge(new String[] { CSS_RATING_CONTENT, CSS_CLEAR_FIX }, StringPool.SPACE);
	%>

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

<alloy:component
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	options="<%= options %>"
	var="Rating1"
	module="aui-rating"
	name="Rating"
	yuiVariable="A"
/>