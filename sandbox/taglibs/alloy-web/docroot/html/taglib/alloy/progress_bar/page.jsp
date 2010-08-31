<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">

	<%
	final String CSS_COMPONENT = MarkupUtil.getClassName("component");
	final String CSS_PROGRESS_BAR = MarkupUtil.getClassName("progress-bar");
	final String CSS_PROGRESS_BAR_CONTENT = MarkupUtil.getClassName("progress-bar", "content");
	final String CSS_PROGRESS_BAR_HORIZONTAL = MarkupUtil.getClassName("progress-bar", "horizontal");
	final String CSS_PROGRESS_BAR_STATUS = MarkupUtil.getClassName("progress-bar", "status");
	final String CSS_PROGRESS_BAR_TEXT = MarkupUtil.getClassName("progress-bar", "text");
	final String CSS_WIDGET = MarkupUtil.getClassName("widget");
	final String CSS_WIDGET_CONTENT_EXPANDED = MarkupUtil.getClassName("widget", "content", "expanded");

	final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_WIDGET, CSS_COMPONENT, CSS_PROGRESS_BAR, CSS_PROGRESS_BAR_HORIZONTAL }, StringPool.SPACE);
	final String CONTENT_BOX_CLASS = StringUtil.merge(new String[] { CSS_PROGRESS_BAR_CONTENT, CSS_WIDGET_CONTENT_EXPANDED }, StringPool.SPACE);
	%>

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