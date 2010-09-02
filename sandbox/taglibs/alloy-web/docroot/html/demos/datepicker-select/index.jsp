<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-calendar/assets/skins/sam/aui-calendar.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-button-item/assets/skins/sam/aui-button-item.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />
	
	<style type="text/css" media="screen">
	body{
		padding: 10px;
	}
	
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
	
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>javascript/i18n/calendar-pt-br.js" type="text/javascript" charset="utf-8"></script>
</head>


<body>
<h1>Alloy - DatePicker</h1>

<div class="aui-datepicker-example aui-helper-clearfix" id="dynamicDatePicker">
	<h1>Creating dynamically</h1>
	
	<alloy:date-picker-select
		boundingBox="#dynamicDatePicker"
		render="true"
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
		render="true"
		yearRange="<%= new Integer[] {1980, 2010 } %>"
	/>
</div>

</body>
</html>