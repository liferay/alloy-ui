<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<%@ taglib prefix="liferay" uri="http://test.liferay.com/tld/liferay" %>

<link href="<%= PropsValues.ALLOY_BASE_PATH %>overlay/assets/skins/sam/overlay.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>widget/assets/skins/sam/widget.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>widget/assets/skins/sam/widget-stack.css" type="text/css" rel="stylesheet" />

<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-button-item/assets/skins/sam/aui-button-item.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-calendar/assets/skins/sam/aui-calendar-base.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-datepicker-select/assets/skins/sam/aui-datepicker-select.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-dialog/assets/skins/sam/aui-dialog.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-loading-mask/assets/skins/sam/aui-loading-mask.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-overlay/assets/skins/sam/aui-overlay-mask.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-panel/assets/skins/sam/aui-panel.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-progressbar/assets/skins/sam/aui-progressbar.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-rating/assets/skins/sam/aui-rating.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-resize/assets/skins/sam/aui-resize.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-base/css/aui-skin-base.css" type="text/css" rel="stylesheet" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />
<link href="<%= PropsValues.ALLOY_BASE_PATH %>aui-toolbar/assets/skins/sam/aui-toolbar.css" type="text/css" rel="stylesheet" />

<script src="<%= PropsValues.ALLOY_BASE_PATH %>yui/yui-min.js" type="text/javascript"></script>
<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui-base/aui-base-min.js" type="text/javascript"></script>

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

<alloy:dialog
	title="Eduardo"
	dialogBodyContent="asdasdasdddddddd"
	width="300"
	height="300"
	xy="<%= new Object[] { 400, 200 } %>"
/>

<br/>

<alloy:rating
	label="Created from HTML markup"
	useJavaScript="true"
/>

<br/>

<div id="pb1">
	<alloy:progress-bar
		boundingBox="#pb1"
		label="Created from HTML markup"
		width="500"
		progressbarValue="90"
	/>
</div>

<br />

<alloy:char-counter
	maxLength="5"
	afterMaxLength="function(e) { console.log('max') }"
/>

<br /><br />

<div id="panelContainer">
	<alloy:panel
		collapsible="true"
		headerContent="Header"
		panelBodyContent="Test"
	/>
</div>

<br /><br />

<div class="aui-helper-clearfix">
	<alloy:date-picker-select
		appendOrder='<%= new String[] {"d", "m", "y"} %>'
	/>
</div>

<br />

<div id="buttonContainer"></div>

<alloy:button-item
	label="Test"
	icon="loading"
	render="#buttonContainer"
/>

<liferay:test test="Eduardo"/>