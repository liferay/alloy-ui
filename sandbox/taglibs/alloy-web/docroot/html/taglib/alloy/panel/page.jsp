<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox">
	</c:if>

	<div class="<%= CONTENT_BOX_CLASS %>" id="<%= uniqueId %>SrcNode">
		<div class="<%= HEADER_CLASS %>">
			<span class="<%= CSS_PANEL_HD_TEXT %>">
				<%= _headerContent %>
			</span>
			<span class="<%= TOOLBAR_CLASS %>">
				<span class="<%= CSS_TOOLBAR_CONTENT %>">
					<alloy:button-item icon="minus" useMarkup="true"/>
				</span>
			</span>
		</div>
		<div class="<%= CSS_WIDGET_BD %>">
			<%= _panelBodyContent %>
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
	var="Panel1"
	module="aui-panel"
	name="Panel"
	yuiVariable="A"
/>