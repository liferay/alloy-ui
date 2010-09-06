<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-button/assets/aui-button-core.css" type="text/css" media="screen" title="no title" charset="utf-8" />
</head>

<style type="text/css" media="screen">

.calendar-icon {
	font-size:15px;
	left:400px;
	line-height:25px;
	position:absolute;
	top:100px;
}

</style>

<body>
<h1>Alloy - Calendar</h1>

<input type="text" name="input1" size="55" value="" id="input1" />

<div class="calendar-icon">
	<alloy:button-item icon="calendar" />
	
	Click on the icon to load a Portuguese Calendar
</div>

<alloy:calendar
	dateFormat="%d/%m/%y %A"
	dates='<%= new String[] {"09/14/2009", "09/15/2009" } %>'
	maxDate="09/25/2009"
	minDate="09/05/2009"
	selectMultipleDates="true"
	setValue="true"
	trigger="#input1"
/>

<alloy:calendar
	firstDayOfWeek="0"
	trigger=".aui-buttonitem-content"
	onSelect="function(event) { alert( event.date.formatted ) }"
/>

<script type="text/javascript" charset="utf-8">

AUI().ready('aui-calendar-base', function(A) {

	A.on('mousedown', function() { A.CalendarManager.hideAll() }, document);

});

</script>

</body>
</html>