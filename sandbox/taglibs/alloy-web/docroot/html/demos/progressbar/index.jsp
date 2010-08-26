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

		#pb1 {
			height: 25px;
			width: 650px;
		}

		#pb2 {
			height: 50px;
			width: 200px;
		}

		#pb3 {
			width: 400px;
			position: relative;
			text-align: center;
		}
	</style>
</head>

<body>

<div id="wrapper">
	<h1>Alloy - ProgressBar Demo</h1>

	<div id="pb1"></div>

	<div id="pb2"></div>

	<div id="pb3">
		<div class="aui-progress-bar-text">
			From markup
        </div>
	</div>
</div>

<alloy:progress-bar
	boundingBox="#pb1"
	onComplete="function(e) { this.set('label', 'complete!'); }"
	valueChange="function(e) { this.set('label', e.newVal + '%'); }"
	value="33"
	render="true"
/>

<alloy:progress-bar
	boundingBox="#pb2"
	orientation="vertical"
	height="300"
	value="50"
	render="true"
/>

<alloy:progress-bar
	contentBox="#pb3"
	value="75"
	render="true"
/>

</body>
</html>