<%@ include file="/html/demos/init.jsp" %>

<style type="text/css" media="screen">
	#wrapper {
		padding: 10px;
	}
</style>

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