<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div id="<%= uniqueId %>BoundingBox" class="<%= BOUNDING_BOX_CLASS %>" style="width: <%= width %>px; height: <%= height %>px">
	</c:if>

    <div id="<%= uniqueId %>SrcNode" class="<%= CONTENT_BOX_CLASS %>">
        <div class="<%= CSS_PROGRESS_BAR_STATUS %>"></div>

        <div class="<%= CSS_PROGRESS_BAR_TEXT %>">
        	<c:if test="<%= Validator.isNotNull(label) %>">
            	<%= label %>
            </c:if>
        </div>
    </div>

	<c:if test="<%= !hasBoundingBox %>">
		</div>
	</c:if>
</c:if>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= _options %>"
	module="aui-progressbar"
	name="ProgressBar"
/>