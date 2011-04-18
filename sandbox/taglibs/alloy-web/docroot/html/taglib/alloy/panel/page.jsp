<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox">
	</c:if>

	<div class="<%= CONTENT_BOX_CLASS %>" id="<%= uniqueId %>SrcNode">
		<div class="<%= HEADER_CLASS %>">
			<span class="<%= CSS_PANEL_HD_TEXT %>">
				<%= headerContent %>
			</span>
			<span class="<%= TOOLBAR_CLASS %>">
				<span class="<%= CSS_TOOLBAR_CONTENT %>">
					<alloy:button-item cssClass="yui3-aui-toolbar-first yui3-aui-toolbar-last yui3-aui-toolbar-item" icon="minus" useMarkup="true"/>
				</span>
			</span>
		</div>
		<div class="<%= CSS_WIDGET_BD %>">
			<c:if test="<%= Validator.isNotNull(bodyContentString) %>">
				<%= bodyContentString %>
			</c:if>

			<c:if test="<%= Validator.isNotNull(panelBodyContent) %>">
				<%= panelBodyContent %>
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
	module="aui-panel"
	name="Panel"
/>