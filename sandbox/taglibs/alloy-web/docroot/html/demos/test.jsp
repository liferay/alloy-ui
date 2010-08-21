<%@ include file="/html/taglib/alloy/init.jsp" %>

<%@page import="java.util.HashMap"%>

<script src="http://alloy.liferay.com/deploy/build/yui/yui-min.js" type="text/javascript"></script>
<script src="http://alloy.liferay.com/deploy/build/aui-base/aui-base-min.js" type="text/javascript"></script>

<link href="http://alloy.liferay.com/deploy/build/aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" rel="stylesheet" />

<div id="rating1"></div>

<br/>

<div id="pb1"></div>

<br/>

<input id="input0" /> <span id="counter0"></span>

<alloy:char-counter
	counter="#counter0"
	input="#input0"
	maxLength="5"
	afterMaxLength="function(e) { console.log('max') }"
/>

<alloy:progress-bar
	boundingBox="#pb1"
	render="true"
	width="500"
	progressbarValue="90"
/>

<alloy:rating
	boundingBox="#rating1"
	label="Ratings"
	render="true"
	size="5"
	defaultSelected="2"
	useMarkup="true"
/>

<alloy:dialog
	render="true"
	title="Eduardo"
	dialogBodyContent="asdasdasdddddddd"
	width="300"
	height="300"
/>