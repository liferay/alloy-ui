<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<button class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox" type="button">
	</c:if>

	<span class="<%= StringUtil.merge(new String[] { CSS_BUTTON_ITEM_ICON, CSS_ICON, CSS_CUSTOM_ICON }, StringPool.SPACE) %>"></span>

	<c:if test="<%= Validator.isNotNull(label) %>">
		<span class="<%= CSS_BUTTON_ITEM_LABEL %>">
			<%= label %>
		</span>
	</c:if>

	<c:if test="<%= !hasBoundingBox %>">
		</button>
	</c:if>
</c:if>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= _options %>"
	module="aui-button-item"
	name="ButtonItem"
/>