<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />
</head>

<style type="text/css" media="screen">

#element1 {
	background: red;
	position: absolute;
	left: 200px;
	top: 200px;
	width: 100px;
	height: 100px;
	padding: 30px;
	z-index: 50
}

#element2 {
	background: blue;
	position: absolute;
	left: 400px;
	top: 200px;
	width: 100px;
	height: 200px;
}

#element3 {
	background: green;
	position: absolute;
	left: 600px;
	top: 200px;
	width: 300px;
	height: 100px;
}

.message {
	color: #fff;
	font-size: 24px;
	position: absolute;
	width: 400px;
	left: 50%;
	top: 50%;
	margin-left: -150px;
	z-index: 99999;
}

</style>

<body>
<h1>Alloy - OverlayMask</h1>

<p><button id="showOn-document">Show on document</button></p>
<p><button id="showOn-red">Show on red</button></p>
<p><button id="showOn-blue">Show on blue</button></p>
<p><button id="showOn-green">Show on green</button></p>

<div id="element1"></div>
<div id="element2"></div>
<div id="element3"></div>

Problem with zIndex attribute setter: Unable to find setter method for attribute: zIndex

<alloy:overlay-mask target="#element1" render="true" visible="true" />

</body>
</html>