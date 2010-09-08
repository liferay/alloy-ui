<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />

	<style type="text/css">
	body {
		padding: 10px;
	}
		
	p {
		margin: 10px;
	}

	textarea {
		width: 300px;
		height: 100px;
	}
	</style>
</head>

<body>

<h1>Alloy - CharCounter</h1>

<p>
	<alloy:char-counter	maxLength="10" />
	character(s) remaining
</p>

<p>
	<alloy:char-counter	maxLength="20" />
	character(s) remaining
</p>

<p>
	<textarea id="input3"></textarea>
	<span id="counter3"></span> character(s) remaining
</p>

<!-- Without markup -->

<alloy:char-counter
	input= "#input3"
	counter= "#counter3"
	maxLength="225"
	onMaxLength="function(event) { alert('The max length was reach'); }"
	useMarkup="false" 
/>

</body>
</html>