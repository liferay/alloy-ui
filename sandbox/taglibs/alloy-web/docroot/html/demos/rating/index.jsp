<%@ include file="/html/demos/init.jsp" %>

<h1>Alloy - Rating</h1>

<div id="rating1">
	<input type="radio" name="rating1" value="v1" title="Horrible" />
	<input type="radio" name="rating1" value="v2" title="Very bad" />
	<input type="radio" name="rating1" value="v3" title="Bad" />
	<input type="radio" name="rating1" value="v4" title="Acceptable" />
	<input type="radio" name="rating1" value="v5" title="Good" />
	<input type="radio" name="rating1" value="v6" title="Very good" />
	<input type="radio" name="rating1" value="v7" title="perfect" />
</div>

<br/>

<alloy:rating
	label="Created from HTML markup"
	defaultSelected="3"
	canReset="false"
/>

<br/>

<alloy:thumb-rating
	label="Thumb Rating"
/>

<br />

<alloy:rating
	boundingBox="#rating1"
	defaultSelected="3"
	disabled="false"
	label="Label..."
	useMarkup="false"
/>