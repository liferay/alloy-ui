<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<button class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox" type="button">
	</c:if>

	<span class="<%= StringUtil.merge(new String[] { CSS_BUTTON_ITEM_ICON, CSS_ICON, CSS_CUSTOM_ICON }, StringPool.SPACE) %>"></span>

	<c:if test="<%= Validator.isNotNull(_label) %>">
		<span class="<%= CSS_BUTTON_ITEM_LABEL %>">
			<%= _label %>
		</span>
	</c:if>

	<c:if test="<%= !hasBoundingBox %>">
		</button>
	</c:if>
</c:if>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="ButtonItem1"
		module="aui-button-item"
		name="ButtonItem"
		yuiVariable="A"
	/>
</c:if>