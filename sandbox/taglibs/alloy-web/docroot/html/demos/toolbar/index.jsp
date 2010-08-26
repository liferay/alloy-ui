<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@page import="com.liferay.portal.kernel.util.ArrayUtil"%>

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
		.testing {
			display: block;
		}
		.aui-buttonitem-content {
			margin: 0;
		}
	</style>
</head>

<body>

<div id="wrapper">
	<h1>Alloy - Toolbar Demo</h1>
	<div id="demo1">
		<h2>Icon and Label</h2>
		
	</div>
	<div id="demo2">
		<h2>Label only</h2>
		
	</div>
	<div id="demo3">
		<h2>Icon only</h2>
		
	</div>
</div>

<%
Map<String, String> btn1 = new HashMap<String, String>();
btn1.put("label", "'Add'");
btn1.put("icon", "'plus'");

Map<String, String> btn2 = new HashMap<String, String>();
btn2.put("label", "'Remove'");
btn2.put("icon", "'minus'");

Map<String, String> btn3 = new HashMap<String, String>();
btn3.put("label", "'Config'");
btn3.put("icon", "'gear'");

Object[] children = new HashMap[] {};
children = ArrayUtil.append(children, btn1);
children = ArrayUtil.append(children, btn2);
children = ArrayUtil.append(children, btn3);
%>

<alloy:toolbar
	activeState="true"
	boundingBox="#demo1"
	children="<%= children %>"
	render="true"
/>

<%
btn1.put("label", "'Add'");
btn1.remove("icon");

btn2.put("label", "'Remove'");
btn2.remove("icon");

btn3.put("label", "'Config'");
btn3.remove("icon");

children = new HashMap[] {};
children = ArrayUtil.append(children, btn1);
children = ArrayUtil.append(children, btn2);
children = ArrayUtil.append(children, btn3);
%>

<alloy:toolbar
	activeState="true"
	boundingBox="#demo2"
	children="<%= children %>"
	render="true"
/>

<%
btn1.remove("label");
btn1.put("icon", "'plus'");

btn2.remove("label");
btn2.put("icon", "'minus'");

btn3.remove("label");
btn3.put("icon", "'gear'");

children = new HashMap[] {};
children = ArrayUtil.append(children, btn1);
children = ArrayUtil.append(children, btn2);
children = ArrayUtil.append(children, btn3);
%>

<alloy:toolbar
	activeState="true"
	boundingBox="#demo3"
	children="<%= children %>"
	render="true"
/>

</body>
</html>