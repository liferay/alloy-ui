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
	<h1>Alloy - ProgressBar Demo</h1>

	<div id="pb1">
		<alloy:progress-bar
			progressbarValue="33"
			label="33%"
			valueChange="function(e) { this.set('label', e.newVal + '%'); }"
			onComplete="function(e) { this.set('label', 'complete!'); }"
			width="650"
			height="25"
		/>
	</div>
	
	<br />

	<div id="pb2">
		<alloy:progress-bar
			orientation="vertical"
			height="50"
			progressbarValue="50"
			label="50%"
			width="200"
		/>
	</div>
	
	<br />

	<div id="pb3">
		<alloy:progress-bar
			progressbarValue="75"
			label="75%"
			height="50"
			width="400"
		/>
	</div>
</div>

</body>
</html>