<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<style>
body {
	padding: 10px;
}

#panelContainer {
	width: 400px;
}

#pb1 {
	height: 25px;
	width: 500px;
}
</style>

<alloy-util:script>
	window.msg = "Testing script tag";
</alloy-util:script>

<alloy-util:script>
	alert(window.msg);
</alloy-util:script>

<alloy-util:script printBuffer="true" />