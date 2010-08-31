<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div id="<%= uniqueId %>BoundingBox" class="<%= BOUNDING_BOX_CLASS %>" style="width: <%= _width %>px">
	</c:if>

    <div id="<%= uniqueId %>SrcNode" class="<%= CONTENT_BOX_CLASS %>">
        <div class="<%= CSS_PROGRESS_BAR_STATUS %>"></div>

        <div class="<%= CSS_PROGRESS_BAR_TEXT %>">
            <%= _label %>
        </div>
    </div>

	<c:if test="<%= !hasBoundingBox %>">
		</div>
	</c:if>
</c:if>

<alloy:component
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	options="<%= options %>"
	var="ProgressBar1"
	module="aui-progressbar"
	name="ProgressBar"
	yuiVariable="A"
/>