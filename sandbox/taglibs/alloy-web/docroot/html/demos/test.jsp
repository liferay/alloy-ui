<%@ include file="/html/demos/init.jsp" %>

<style>
#panelContainer {
	width: 400px;
}

#pb1 {
	height: 25px;
	width: 500px;
}
</style>

<alloy:dialog
	title="Eduardo"
	dialogBodyContent="Test"
	width="300"
	height="300"
	xy="<%= new Object[] { 400, 200 } %>"
/>

<br/>

<alloy:rating
	label="Created from HTML markup"
	useJavaScript="true"
/>

<br/>

<div id="pb1">
	<alloy:progress-bar
		boundingBox="#pb1"
		label="Created from HTML markup"
		width="500"
		progressbarValue="90"
		scriptPosition="auto"
	/>
</div>

<br />

<alloy:char-counter
	maxLength="5"
	afterMaxLength="function(e) { console.log('max') }"
/>

<br /><br />

<div id="panelContainer">
	<alloy:panel
		collapsible="true"
		headerContent="Header"
		panelBodyContent="Test"
	/>
</div>

<br /><br />

<div class="aui-helper-clearfix">
	<alloy:date-picker-select
		appendOrder='<%= new String[] {"d", "m", "y"} %>'
	/>
</div>

<br />

<div id="buttonContainer"></div>

<alloy:button-item
	label="Test"
	icon="loading"
	render="#buttonContainer"
/>

<liferay:test test="Eduardo"/>

<alloy-util:script>
	window.msg = "Testing script tag";
</alloy-util:script>

<alloy-util:script>
	alert(window.msg);
</alloy-util:script>

<alloy-util:script printBuffer="true" />