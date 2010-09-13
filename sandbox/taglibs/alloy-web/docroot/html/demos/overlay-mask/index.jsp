<%@ include file="/html/demos/init.jsp" %>

<style type="text/css" media="screen">
#element1 {
	background: red;
	position: absolute;
	left: 200px;
	top: 200px;
	width: 100px;
	height: 100px;
	padding: 30px;
	z-index: 50
}

#element2 {
	background: blue;
	position: absolute;
	left: 400px;
	top: 200px;
	width: 100px;
	height: 200px;
}

#element3 {
	background: green;
	position: absolute;
	left: 600px;
	top: 200px;
	width: 300px;
	height: 100px;
}

.message {
	color: #fff;
	font-size: 24px;
	position: absolute;
	width: 400px;
	left: 50%;
	top: 50%;
	margin-left: -150px;
	z-index: 99999;
}
</style>

<h1>Alloy - OverlayMask</h1>

<p><button id="showOn-document">Show on document</button></p>
<p><button id="showOn-red">Show on red</button></p>
<p><button id="showOn-blue">Show on blue</button></p>
<p><button id="showOn-green">Show on green</button></p>

<div id="element1"></div>
<div id="element2"></div>
<div id="element3"></div>

Problem with zIndex attribute setter: Unable to find setter method for attribute: zIndex

<alloy:overlay-mask target="#element1" visible="true" />