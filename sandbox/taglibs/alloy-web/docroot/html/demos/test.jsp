<%@ include file="/html/taglib/alloy/init.jsp" %>

<%@page import="java.util.HashMap"%>

<script src="http://alloy.liferay.com/deploy/build/yui/yui-min.js" type="text/javascript"></script>
<script src="http://alloy.liferay.com/deploy/build/aui-base/aui-base-min.js" type="text/javascript"></script>

<link href="http://alloy.liferay.com/deploy/build/aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" rel="stylesheet" />
<link href="http://alloy.liferay.com/deploy/build/aui-button-item/assets/skins/sam/aui-button-item.css" type="text/css" rel="stylesheet" />
<link href="http://alloy.liferay.com/deploy/build/aui-panel/assets/skins/sam/aui-panel.css" type="text/css" rel="stylesheet" />
<link href="http://alloy.liferay.com/deploy/build/aui-progressbar/assets/skins/sam/aui-progressbar.css" type="text/css" rel="stylesheet" />

<style>
body {
	padding: 10px;
}

#panel {
	width: 400px;
}

#pb1 {
	height: 25px;
	width: 500px;
}
</style>

<br/>

<alloy:rating
	defaultSelected="2"
	label="Created from HTML markup"
	render="true"
	size="5"
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

<alloy:dialog
	render="true"
	title="Eduardo"
	dialogBodyContent="asdasdasdddddddd"
	width="300"
	height="300"
/>