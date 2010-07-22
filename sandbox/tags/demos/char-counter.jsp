<%@ taglib prefix="alloy" tagdir="/WEB-INF/tags/aui" %>

<html>
<head>
	<link rel="stylesheet" href="${alloy.build.path}/aui-skin-base/css/aui-skin-base-min.css" type="text/css" />
	<link rel="stylesheet" href="${alloy.build.path}/aui-skin-classic/css/custom.css" type="text/css" />

	<style type="text/css">
		body {
			padding: 10px;
		}
	</style>

	<script src="${alloy.build.path}/yui/yui-min.js" type="text/javascript"></script>
	<script src="${alloy.build.path}/aui/aui.js" type="text/javascript"></script>
</head>
<body>
	<h1>Alloy TagFiles</h1>

	<h2>- Char Counter</h2>

	<input id="input1" type="text" />

	<span id="counter1"></span> character(s) remaining

	<alloy:use yuiVariable="A">

		<alloy:charCounter
			counter="#counter1"
			input="#input1"
			maxLength="5"
		/>

	</alloy:use>
</body>
