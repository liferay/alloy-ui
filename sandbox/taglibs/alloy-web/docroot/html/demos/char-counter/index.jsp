<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />

	<style type="text/css">
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
	<input type="text" id="input1"/>
	<span id="counter1"></span> character(s) remaining
</p>

<p>
	<input type="text" id="input2">
	<span id="counter2"></span> character(s) remaining
</p>

<p>
	<textarea id="input3"></textarea>
	<span id="counter3"></span> character(s) remaining
</p>

<alloy:char-counter
	input= "#input1"
	counter= "#counter1"
	maxLength="10"
	onMaxLength="function(event) { alert('The max length was reach'); }" 
/>

<alloy:char-counter
	input= "#input2"
	counter= "#counter2"
	maxLength="20"
/>

<alloy:char-counter
	input= "#input3"
	counter= "#counter3"
	maxLength="225"
/>

</body>
</html>