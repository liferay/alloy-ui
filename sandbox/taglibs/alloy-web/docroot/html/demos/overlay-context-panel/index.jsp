<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />
</head>

<style type="text/css" media="screen">

#simpleContextPanelWrapper {
	margin: 250px auto;
	width: 300px;
}

#contextpanel1 .aui-contentpanel-content {
	padding: 11px;
}

</style>

<body>
<h1>Alloy - ContextPanel</h1>

<p>
	Overlay point:
	<select id="overlayPoint">
		<option value="bc">BOTTOM CENTER</option>
		<option value="bl" selected="selected">BOTTOM LEFT</option>
		<option value="br">BOTTOM RIGHT</option>
		<option value="cc">CENTER CENTER</option>
		<option value="lc">LEFT CENTER</option>
		<option value="rc">RIGHT CENTER</option>
		<option value="tc">TOP CENTER</option>
		<option value="tl">TOP LEFT</option>
		<option value="tr">TOP RIGHT</option>
	</select>
	Target point:
	<select id="targetPoint">
		<option value="bc">BOTTOM CENTER</option>
		<option value="bl">BOTTOM LEFT</option>
		<option value="br">BOTTOM RIGHT</option>
		<option value="cc">CENTER CENTER</option>
		<option value="lc">LEFT CENTER</option>
		<option value="rc">RIGHT CENTER</option>
		<option value="tc" selected="selected">TOP CENTER</option>
		<option value="tl">TOP LEFT</option>
		<option value="tr">TOP RIGHT</option>
	</select>
	<br/>
	<br/>
	<button id="openContextPanelHere">Open ContextPanel here</button>
</p>

<div id="simpleContextPanelWrapper">
	<button id="simpleContextPanel">Open simple ContextPanel</button>
</div>

<div id="contextpanel1"></div>

<alloy:overlay-context-panel
	boundingBox="#contextpanel1"
	overlaycontextpanelBodyContent="Here s a sample ContextPanel. The pointer requires no images!<br/><br/>Type your name: <input type='text' value='Name'/> <button>Send</button>"
	trigger="#simpleContextPanel"
	cancellableHide="true"
	hideDelay="0"
	hideOnDocumentClick="false"
	anim="true"
/>

<%
Map<String, Object> anim = new HashMap<String, Object>();
Map<String, Object> duration = new HashMap<String, Object>();

duration.put("duration", .9);

anim.put("show", duration);

duration.put("duration", .2);

anim.put("hide", duration);

Map<String, Object> align = new HashMap<String, Object>();

align.put("node", "#openContextPanelHere");
align.put("points", new String[] {"tl", "bc"});
%>

<alloy:overlay-context-panel
	overlaycontextpanelBodyContent="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	trigger="#openContextPanelHere"
	cancellableHide="true"
	hideDelay="0"
	hideOnDocumentClick="false"
	align="<%= align %>"
	anim="<%= anim %>"
	width="300"
/>

</body>
</html>