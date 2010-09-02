<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />
	
	<style>
	body {
		padding: 10px;
	}
	</style>
</head>

<body>
<h1>Alloy - Rating</h1>

<div id="rating1">
	<input type="radio" name="rating1" value="v1" title="Horrible" />
	<input type="radio" name="rating1" value="v2" title="Very bad" />
	<input type="radio" name="rating1" value="v3" title="Bad" />
	<input type="radio" name="rating1" value="v4" title="Acceptable" />
	<input type="radio" name="rating1" value="v5" title="Good" />
	<input type="radio" name="rating1" value="v6" title="Very good" />
	<input type="radio" name="rating1" value="v7" title="perfect" />
</div>

<br/>

<alloy:rating
	label="Created from HTML markup"
	defaultSelected="3"
	canReset="false"
	render="true"
/>

<br/>

<alloy:thumb-rating
	label="Thumb Rating"
	render="true"
/>

<br />

<alloy:rating
	boundingBox="#rating1"
	defaultSelected="3"
	disabled="false"
	label="Label..."
	render="true"
	useMarkup="false"
/>

</body>
</html>