<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<script src="<%= PropsValues.ALLOY_BASE_PATH %>yui/yui-min.js" type="text/javascript"></script>
<script src="<%= PropsValues.ALLOY_BASE_PATH %>/aui-base/aui-base-min.js" type="text/javascript"></script>

<link href="<%= PropsValues.ALLOY_BASE_PATH %>/aui-panel/assets/skins/sam/aui-panel.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>/aui-button-item/assets/skins/sam/aui-button-item.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>/aui-datepicker-select/assets/skins/sam/aui-datepicker-select.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>/aui-progressbar/assets/skins/sam/aui-progressbar.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>/aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" rel="stylesheet" />

<style>
body {
	padding: 10px;
}

#panelContainer {
	width: 400px;
}

#pb1 {
	height: 25px;
	width: 500px;
}
</style>

<br/>

<alloy:rating
	label="Created from HTML markup"
	render="true"
	useMarkup="true"
/>

<br/>

<div id="pb1">
	<alloy:progress-bar
		boundingBox="#pb1"
		label="Created from HTML markup"
		render="true"
		width="500"
		progressbarValue="90"
		useMarkup="true"
	/>
</div>

<br/>

<alloy:button-item
	label="Test"
	icon="loading"
	render="true"
	useMarkup="true"
/>

<input id="input0" /> <span id="counter0"></span>

<alloy:char-counter
	counter="#counter0"
	input="#input0"
	maxLength="5"
	afterMaxLength="function(e) { console.log('max') }"
/>


<br /><br />

<div id="panelContainer">
	<alloy:panel
		collapsible="true"
		headerContent="Header"
		panelBodyContent="Test"
		render="true"
		useMarkup="true"
	/>
</div>

<br /><br />

<div id="datePicker"></div>

<alloy:date-picker-select
	appendOrder='<%= new String[] {"y", "m", "d"} %>'
	render="true"
	useMarkup="true"
	yearRange="<%= new Integer[] {1980, 2010} %>"
/>

<alloy:dialog
	render="true"
	title="Eduardo"
	dialogBodyContent="asdasdasdddddddd"
	width="300"
	height="300"
	xy="<%= new Object[] { 400, 200 } %>"
/>