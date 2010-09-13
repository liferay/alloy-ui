<%@ include file="/html/demos/init.jsp" %>

<style type="text/css" media="screen">
	div {
		overflow: hidden;
	}

	#resize1 {
		width: 300px;
		padding: 10px;
		margin: 10px;
		background: lightblue;
	}

	#resize3 {
		top: 300px;
		left: 600px;
		height: 330px;
		width: 150px;
		background: lightblue;
		position: absolute;
	}

	#resize4 {
		top: 100px;
		left: 500px;
		width: 300px;
		background: lightblue;
		position: fixed;
	}

	#parent {
		position: relative;
		width: 500px;
		height: 200px;
		border: 1px solid #ccc;
		border-width: 5px 10px 20px 30px;
	}
</style>

<h1>Alloy - Resize Demo</h1>

<textarea id="resize6" cols="30" rows="10">Resizable textarea
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</textarea>

<br /><br />

<div id="parent">
	<img src="../tooltip/assets/cream.jpg" id="resize5" />
</div>

<div id="resize1">
	<strong>Simple element - Preserving Ratio</strong><br />
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
	<br/><button class="destroy">Destroy-me!</button>
</div>

<br />

<button id="resize2">Button</button>

<div id="resize3">
	<strong>Absolute positioned element - Preserving Ratio</strong><br />
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
	<br/><button class="destroy">Destroy-me!</button>
</div>

<div id="resize4">
	<strong>Fixed positioned element - Preserving Ratio</strong><br />
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
	<br/><button class="destroy">Destroy-me!</button>
</div>

<alloy:resize
	node="#resize1"
	proxy="true"
	wrap="true"
	handles="t, tr, r, br, b, bl, l, tl"
/>

<alloy:resize
	node="#resize2"
	handles="br"
/>

<alloy:resize
	node="#resize3"
	proxy="true"
	autoHide="true"
	handles="t, tr, r, br, b, bl, l, tl"
/>

<alloy:resize
	node="#resize4"
	proxy="true"
/>

<alloy:resize
	node="#resize5"
	proxy="true"
/>

<alloy:resize
	node="#resize6"
	proxy="true"
/>

<script type="text/javascript" charset="utf-8">
AUI().use(
	'aui-resize',
	function(A) {
		/*
		resize1.plug(A.Plugin.ResizeConstrained, {
			preserveRatio: true,
			maxHeight: 170,
			maxWidth: 400
		});

		resize3.plug(A.Plugin.ResizeConstrained, {
			preserveRatio: true
		});

		resize4.plug(A.Plugin.ResizeConstrained, {
			preserveRatio: true,
			tickX: 30,
			tickY: 30
		});

		resize5.plug(A.Plugin.ResizeConstrained, {
			constrain: '#parent',
			minHeight: 30,
			minWidth: 30,
			preserveRatio: true,
		});

		// Extras

		A.all('#resize1 .destroy').on('click', function() {
			resize1.destroy();
		});

		A.all('#resize3 .destroy').on('click', function() {
			resize3.destroy();
		});

		A.all('#resize4 .destroy').on('click', function() {
			resize4.destroy();
		});
		*/
	}
);

</script>