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

	<h2>- Rating</h2>

	<div id="rating1"></div>

	<alloy:use yuiVariable="A">

		<alloy:rating
			boundingBox="#rating1"
			label="Sample Rating"
		/>

	</alloy:use>
	
</body>
