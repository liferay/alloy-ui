<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />
</head>

<style type="text/css" media="screen">
body {
	font-size: 12px;
}
</style>

<body>
<h1>Alloy - Dialog</h1>

<p><button id="showAll">Show All</button></p>
<p><button id="hideAll">Hide All</button></p>

<alloy:dialog
	title="Dialog 1"
	dialogBodyContent="Testing body"
	width="500"
	height="250"
	stack="true"
/>

<script type="text/javascript" charset="utf-8">

AUI().ready('aui-dialog', 'aui-overlay-manager', 'dd-constrain', function(A) {

	A.get('#showAll').on('click', function() {
		A.DialogManager.showAll();
	});

	A.get('#hideAll').on('click', function() {
		A.DialogManager.hideAll();
	});

});

</script>

</body>
</html>