<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />

	<style type="text/css" media="screen">
		body {
			font-size: 12px;
		}

		#wrapper {
			padding: 10px;
		}
	</style>
</head>

<body>

<div id="wrapper">
	<h1>Alloy - colorpicker Demo</h1>

	<div id="demo"></div>
</div>

<alloy:color-picker
	render="true"
	boundingBox="#demo"
/>

</body>
</html>