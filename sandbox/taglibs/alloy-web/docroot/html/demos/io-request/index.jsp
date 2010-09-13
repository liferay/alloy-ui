<%@ include file="/html/demos/init.jsp" %>

<style type="text/css" media="screen">
	#wrapper {
		padding: 10px;
	}
	#demo {
		border-top: 1px solid #ccc;
		padding: 3px;
	}
</style>

<div id="wrapper">
	<h1>Alloy - io-request Demo</h1>

	<p class="about">
		io-request is a plugin for the IO utility which allows for a consistent interface to using the utility.<br />
		Features include:<br />
		<ul>
			<li>Ability to subscribe to on/after events (and allowing for the prevention of default handlers for "start", "success", "failure", "complete", and "end")</li>
			<li>Preventing the caching of the URI</li>
			<li>Automatically parsing response based on dataType (HTML, JSON, XML)</li>
			<li>Pre-configuring a connection and starting it at a later time (with optional, custom overrides)</li>
			<li>Specifying a default transaction method (GET or POST) for all connections</li>
			<li>Specifying a custom URI formatter to globally format the URI before a connection is started (this is useful if custom parameters must be added to the URL such as the session ID)</li>
		</ul>
	</p>

	<br />

	<div id="demo"></div>
</div>

<form action="assets/content.html" id="form">
	<input type="hidden" name="formInput" value="formInput value" />
</form>

<script type="text/javascript" charset="utf-8">

window.log = function(msg) {
	var demoNode = document.getElementById('demo');

	demoNode.innerHTML += '<br />' + msg;
}

</script>

<alloy:io-request
	autoLoad="true"
	cache="false"
	onStart="function(event, id) { log('-'); log(this.get('uri')); log('start'); }"
	onSuccess="function(event, id, xhr) { log('success'); }"
	onComplete="function(event, id, xhr) { log('complete'); }"
	onFailure="function(event, id, xhr) { log('failure'); }"
	onEnd="function(event, id) { log('end'); }"
	afterStart="function() { log('after start'); }"
	uri="/html/demos/io-request/assets/content.xml"
/>