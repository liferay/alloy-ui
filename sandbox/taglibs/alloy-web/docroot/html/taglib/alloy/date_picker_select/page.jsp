<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox">
	</c:if>

	<div class="<%= CONTENT_BOX_CLASS %>" id="<%= uniqueId %>SrcNode">

		<div class="<%= CSS_DATEPICKER_SELECT_WRAPPER %>">

			<select id="yearNode" class="<%= YEAR_NODE_CLASS %>"></select>

			<select id="monthNode" class="<%= MONTH_NODE_CLASS %>"></select>

			<select id="dayNode" class="<%= DAY_NODE_CLASS %>"></select>

		</div>

		<div class="<%= CSS_DATEPICKER_BUTTON_WRAPPER %>">
			<button class="<%= CSS_DATEPICKER_BUTTON_BOUNDING_BOX_CLASS %>" type="button">
			    <span class="<%= CSS_DATEPICKER_BUTTON_ICON_CLASS %>"></span>
			</button>
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
	var="DatePickerSelect1"
	module="aui-datepicker-select"
	name="DatePickerSelect"
	yuiVariable="A"
/>