<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	
	<%
	final String CSS_CLEAR_FIX = MarkupUtil.getClassName("helper", "clearfix");
	final String CSS_COMPONENT = MarkupUtil.getClassName("component");
	final String CSS_PANEL = MarkupUtil.getClassName("panel");
	final String CSS_PANEL_CONTENT = MarkupUtil.getClassName("panel", "content");
	final String CSS_PANEL_HD = MarkupUtil.getClassName("panel", "hd");
	final String CSS_PANEL_HD_TEXT = MarkupUtil.getClassName("panel", "hd", "text");
	final String CSS_WIDGET = MarkupUtil.getClassName("widget");
	final String CSS_WIDGET_BD = MarkupUtil.getClassName("widget", "bd");
	final String CSS_WIDGET_HD = MarkupUtil.getClassName("widget", "hd");
	
	final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_COMPONENT, CSS_PANEL, CSS_WIDGET }, StringPool.SPACE);
	final String CONTENT_BOX_CLASS = StringUtil.merge(new String[] { CSS_PANEL_CONTENT }, StringPool.SPACE);
	final String HEADER_CLASS = StringUtil.merge(new String[] { CSS_WIDGET_HD, CSS_CLEAR_FIX, CSS_PANEL_HD }, StringPool.SPACE);
	%>
	
	<c:if test="<%= Validator.isNull(_boundingBox) %>">
		<div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox">
	</c:if>

	<div class="<%= CONTENT_BOX_CLASS %>" id="<%= uniqueId %>SrcNode">
		<div class="<%= HEADER_CLASS %>">
			<span class="<%= CSS_PANEL_HD_TEXT %>">
				<%= _headerContent %>
			</span>
		</div>
		<div class="<%= CSS_WIDGET_BD %>">
			<%= _panelBodyContent %>
		</div>
	</div>
		
	<c:if test="<%= Validator.isNull(_boundingBox) %>">
		</div>
	</c:if>

</c:if>

<alloy:component
	var="Panel1"
	module="aui-panel"
	name="Panel"
	options="${options}"
	yuiVariable="A"
/>