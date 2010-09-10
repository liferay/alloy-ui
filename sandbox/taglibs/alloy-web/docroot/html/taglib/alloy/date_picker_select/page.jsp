<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">
	<c:if test="<%= !hasBoundingBox %>">
		<div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox">
	</c:if>

	<div class="<%= CONTENT_BOX_CLASS %>" id="<%= uniqueId %>SrcNode">

		<div class="<%= CSS_DATEPICKER_SELECT_WRAPPER %>">

			<%
			Calendar calendar = Calendar.getInstance();

			Map<String, Object> map = new HashMap<String, Object>();

			map.put("d", Calendar.DATE);
			map.put("d-css", DATE_NODE_CLASS);
			map.put("d-current", calendar.get(Calendar.DATE));

			map.put("m", Calendar.MONTH);
			map.put("m-css", MONTH_NODE_CLASS);
			map.put("m-current", calendar.get(Calendar.MONTH));

			map.put("y", Calendar.YEAR);
			map.put("y-css", YEAR_NODE_CLASS);
			map.put("y-current", calendar.get(Calendar.YEAR));
			
			for (Object curNode : _appendOrder) {

				calendar.setTime(new Date());

				Integer type = (Integer)map.get(curNode);

				int endValue = calendar.getActualMaximum(type);
				int startValue = calendar.getActualMinimum(type);
				
				if (type == Calendar.YEAR) {
					int currentYear = calendar.get(Calendar.YEAR);
		
					endValue = GetterUtil.getInteger(
						String.valueOf(_yearRange.get(1)), currentYear + 10);
		
					startValue = GetterUtil.getInteger(
						String.valueOf(_yearRange.get(0)), currentYear - 10);
				}
			%>

			<select class="<%= map.get(((String)curNode).concat("-css")) %>">

				<%
				for (int i = startValue; i < endValue + 1; i++) {

					calendar.set(type, i);

					String displayName = calendar.getDisplayName(
						type, Calendar.LONG, Locale.getDefault());

					if (displayName == null) {
						displayName = String.valueOf(i);
					}

					boolean selected = (Integer)map.get(
						((String)curNode).concat("-current")) == i;
				%>

				<option <%= selected ? "selected" : StringPool.BLANK %> value="<%= i %>"><%= displayName %></option>

				<%
				}
				%>

			</select>

			<%
			}
			%>

		</div>

		<div class="<%= CSS_DATEPICKER_BUTTON_WRAPPER %>">
			<alloy:button-item icon="calendar" useJavaScript="false" />
		</div>

    </div>

	<c:if test="<%= !hasBoundingBox %>">
		</div>
	</c:if>
</c:if>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= options %>"
	var="DatePickerSelect1"
	module="aui-datepicker-select"
	name="DatePickerSelect"
/>