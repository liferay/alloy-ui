<%@ include file="/html/demos/init.jsp" %>

<style type="text/css" media="screen">
.datepicker-icon {
	font-size:15px;
	left:400px;
	line-height:25px;
	position:absolute;
	top:100px;
}

.aui-datepicker-example {
	clear: both;
	margin-bottom: 2em;
}
</style>

<h1>Alloy - DatePicker</h1>

<div class="aui-datepicker-example aui-helper-clearfix" id="dynamicDatePicker">
	<h1>Creating dynamically</h1>

	<alloy:date-picker-select
		boundingBox="#dynamicDatePicker"
		useMarkup="false"
	/>
</div>

<div class="aui-datepicker-example aui-helper-clearfix" id="staticDatePicker">
	<h1>Creating from HTML Markup</h1>

	<%
	Map<String, String> calendarConfig = new HashMap<String, String>();

	calendarConfig.put("dateFormat", "%m/%d/%y");
	%>

	<alloy:date-picker-select
		appendOrder='<%= new String[] {"y", "m", "d"} %>'
		calendar="<%= calendarConfig %>"
		yearRange="<%= new Integer[] {1980, 2010 } %>"
	/>
</div>