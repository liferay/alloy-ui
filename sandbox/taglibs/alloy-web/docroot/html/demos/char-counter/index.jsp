<%@ include file="/html/demos/init.jsp" %>

<style type="text/css">
p {
	margin: 10px;
}

textarea {
	width: 300px;
	height: 100px;
}
</style>

<h1>Alloy - CharCounter</h1>

<p>
	<alloy:char-counter	maxLength="10" />
	character(s) remaining
</p>

<p>
	<alloy:char-counter	maxLength="20" />
	character(s) remaining
</p>

<p>
	<textarea id="input3"></textarea>
	<span id="counter3"></span> character(s) remaining
</p>

<!-- useMarkup="false" -->

<alloy:char-counter
	input= "#input3"
	counter= "#counter3"
	maxLength="225"
	onMaxLength="function(event) { alert('The max length was reach'); }"
	useMarkup="false"
/>