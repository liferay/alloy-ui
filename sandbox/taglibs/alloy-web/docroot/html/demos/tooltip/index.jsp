<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@page import="com.liferay.portal.kernel.util.ArrayUtil"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />
</head>

<style type="text/css" media="screen">

p {
	border: 1px solid #CCCCCC;
	margin: 10px;
	padding: 20px 15px;
	font-size: 12px;
}

p a {
	font-size: 14px;
	color: #000;
	cursor: pointer;
	font-weight: bold;
}

.aui-tooltip {
	color: #999;
	font-size: 14px;
}

</style>

<body>
<h1>Alloy - Tooltip</h1>

<button id="showAll">Show all Tooltips</button>

<br/><br/>

<p style="text-align: center;">
	<a href="javascript:void(0);" class="t1" title="Here s a sample Tooltip. The pointer requires no images! First trigger.">Tootip - Sharing the same trigger, content from title attribute</a>
	<br/><br/><br/><br/><br/>
	<a href="javascript:void(0);" class="t1" title="Here s a sample Tooltip. The pointer requires no images! Second trigger.">Tootip - Sharing the same trigger, content from title attribute</a>
</p>

<br/><br/><br/>

<p>
	<a href="javascript:void(0);" id="t2">Tootip - with image</a>
	<br/>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>

<br/><br/><br/>

<p>
	<a href="javascript:void(0);" id="t3">Tootip - Simple tooltip without arrow and no animation</a>
	<br/>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>

<br/><br/><br/>

<p>
	<a href="javascript:void(0);" id="t5">Tootip - youtube preview</a>
	<br/>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>

<%
Map<String, Object> align = new HashMap<String, Object>();

align.put("points", new String[] {"bc", "tc"});
%>

<alloy:tooltip
	trigger=".t1"
	align="<%= align %>"
	title="true"
/>

<alloy:tooltip
	bodyContent="<img src='/html/demos/tooltip/assets/cream.jpg' /><br/><div style='text-align: center;'>Ice cream sandwich taste test winner</div>"
	trigger="#t2"
/>

<%
align.put("points", new String[] {"lc", "rc"});
%>

<alloy:tooltip
	bodyContent="Simple tooltip without arrow! No animation."
	trigger="#t3"
	align="<%= align %>"
	showArrow="false"
	title="true"
/>

<alloy:tooltip
	bodyContent="<object width='560' height='340'><param name='movie' value='http://www.youtube.com/v/PiSxJwB29R8&hl=en&fs=1&'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/PiSxJwB29R8&hl=en&fs=1&' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='560' height='340'></embed></object>"
	trigger="#t5"
/>

<script type="text/javascript" charset="utf-8">

AUI().ready('aui-tooltip', 'aui-io-plugin', function(A) {

	// Extras

	A.on('click', function(event) { A.OverlayContextPanelManager.showAll(); event.halt(); }, '#showAll');

});

</script>

</body>
</html>