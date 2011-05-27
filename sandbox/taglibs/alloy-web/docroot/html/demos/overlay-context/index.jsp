<%@ include file="/html/demos/init.jsp" %>

<style type="text/css" media="screen">
#contextOverlay1 {
	width: 300px;
	border: 3px solid #000;
	background: #fff;
	padding: 3px;
	position: absolute;
}

.menu {
	position: absolute;
	width: 150px;
	background: #FFFFFF;
	border-color: #DEDEDE #BFBFBF #BFBFBF #DEDEDE;
	border-style: solid;
	border-width: 1px;
	margin: 0;
}

.menu ul, .menu li {
	margin: 0;
}

.menu li {
	border-bottom: 1px solid #DEDEDE;
	display: block;
	padding: 2px;
}

.menu li a {
	display: block;
	padding: 2px 5px;
	text-decoration: none;
	color: #336699;
}

.menu li a:hover {
	background: #ccc;
}

.menu-list span {
	background: #CCCCCC;
	float: left;
	font-size: 14px;
	list-style: none;
	margin-left: 5px;
	padding: 4px;
}

.menu-list a {
	text-decoration: none;
	color: #336699;
}

.extended-menus {
	clear: both;
	padding: 1em 0;
}

.extended-menus input {
	float: left;
}

.disabled-trigger {
	opacity: 0.5;
	color: #333;
}

</style>

<h1>Alloy - OverlayContext</h1>

<p><button id="simpleOverlay">Open simple OverlayContext</button></p>

<p><button id="simpleOverlay2">Open simple OverlayContext - another trigger</button></p>

<div id="menuList" class="menu-list">
	<span class="menu-item-1">
		<a href="javascript:;">Menu item 1</a>
	</span>
	<span class="menu-item-1">
		<a href="javascript:;">Menu item 1 - multiple triggers</a>
	</span>
	<span class="menu-item-1">
		<a href="javascript:;">Menu item 1 - multiple triggers</a>
	</span>

	<div class="extended-menus aui-helper-clearfix">

		<span id="menuItem2">
			<a href="javascript:;">Menu Trigger 1</a>
		</span>
		<span id="menuItem2-new" class="disabled-trigger">
			<a href="javascript:;">Menu Trigger 2</a>
		</span>
	</div>
</div>

<div id="contextOverlay1" class="aui-overlaycontext-hidden">
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>

<div id="menu1">
	<alloy:overlay-context
		cancellableHide="false"
		hideOn="mouseleave"
		hideDelay="1000"
		trigger=".menu-item-1"
		showDelay="0"
		showOn="mouseenter">
		
		<ul class="menu">
			<li>
				<a href="javascript:;">Page</a>
			</li>
			<li>
				<a href="javascript:;">Application</a>
			</li>
			<li>
				<a href="javascript:;">Web Content Display</a>
			</li>
			<li>
				<a href="javascript:;">Breadcrumb</a>
			</li>
			<li>
				<a href="javascript:;">Navigation</a>
			</li>
			<li>
				<a href="javascript:;">Site Map</a>
			</li>
		</ul>

	</alloy:overlay-context>
</div>

<div id="menu2">

	<alloy:overlay-context
		cancellableHide="true"
		hideOn="mouseleave"
		hideDelay="1000"
		trigger="#menuItem2"
		showDelay="0"
		showOn="mouseenter">

		<ul class="menu">
			<li>
				<a href="javascript:;">Control Panel</a>
			</li>
			<li>
				<a href="javascript:;">Public Pages</a>
			</li>
			<li>
				<a href="javascript:;">Private Pages</a>
			</li>
		</ul>

	</alloy:overlay-context>
	
</div>

<alloy:overlay-context
	boundingBox="#contextOverlay1"
	cancellableHide="false"
	hideOn="click"
	hideDelay="1000"
	trigger="button"
	showDelay="0"
	showOn="click"
	useMarkup="false"
/>