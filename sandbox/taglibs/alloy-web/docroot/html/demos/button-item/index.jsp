<%@ include file="/html/demos/init.jsp" %>

<style type="text/css" media="screen">
	#wrapper {
		padding: 10px;
	}

	#wrapper {
		padding: 10px;
		width: 800px;
		margin: 0 auto;
	}

	#withLabel .yui3-aui-buttonitem, #iconOnly .yui3-aui-buttonitem {
		display: block;
		clear: both;
	}
</style>

<%
String[] allIcons = new String[] {
	"carat-1-t",
	"carat-1-tr",
	"carat-1-r",
	"carat-1-br",
	"carat-1-b",
	"carat-1-bl",
	"carat-1-l",
	"carat-1-tl",
	"carat-2-t-b",
	"carat-2-r-l",
	"triangle-1-t",
	"triangle-1-tr",
	"triangle-1-r",
	"triangle-1-br",
	"triangle-1-b",
	"triangle-1-bl",
	"triangle-1-l",
	"triangle-1-tl",
	"triangle-2-t-b",
	"triangle-2-r-l",
	"arrow-1-t",
	"arrow-1-tr",
	"arrow-1-r",
	"arrow-1-br",
	"arrow-1-b",
	"arrow-1-bl",
	"arrow-1-l",
	"arrow-1-tl",
	"arrow-2-t-b",
	"arrow-2-tr-bl",
	"arrow-2-r-l",
	"arrow-2-br-tl",
	"arrowstop-1-t",
	"arrowstop-1-r",
	"arrowstop-1-b",
	"arrowstop-1-l",
	"arrowthick-1-t",
	"arrowthick-1-tr",
	"arrowthick-1-r",
	"arrowthick-1-br",
	"arrowthick-1-b",
	"arrowthick-1-bl",
	"arrowthick-1-l",
	"arrowthick-1-tl",
	"arrowthick-2-t-b",
	"arrowthick-2-tr-bl",
	"arrowthick-2-r-l",
	"arrowthick-2-br-tl",
	"arrowthickstop-1-t",
	"arrowthickstop-1-r",
	"arrowthickstop-1-b",
	"arrowthickstop-1-l",
	"arrowreturnthick-1-l",
	"arrowreturnthick-1-t",
	"arrowreturnthick-1-r",
	"arrowreturnthick-1-b",
	"arrowreturn-1-l",
	"arrowreturn-1-t",
	"arrowreturn-1-r",
	"arrowreturn-1-b",
	"arrowrefresh-1-l",
	"arrowrefresh-1-t",
	"arrowrefresh-1-r",
	"arrowrefresh-1-b",
	"arrow-4",
	"arrow-4-diag",
	"extlink",
	"newwin",
	"refresh",
	"shuffle",
	"transfer-r-l",
	"transferthick-r-l",
	"folder-collapsed",
	"folder-open",
	"document",
	"document-b",
	"note",
	"mail-closed",
	"mail-open",
	"suitcase",
	"comment",
	"person",
	"print",
	"trash",
	"locked",
	"unlocked",
	"bookmark",
	"tag",
	"home",
	"flag",
	"calendar",
	"cart",
	"pencil",
	"clock",
	"disk",
	"calculator",
	"zoomin",
	"zoomout",
	"search",
	"wrench",
	"gear",
	"heart",
	"star",
	"link",
	"cancel",
	"plus",
	"plusthick",
	"minus",
	"minusthick",
	"close",
	"closethick",
	"key",
	"lightbulb",
	"scissors",
	"clipboard",
	"copy",
	"contact",
	"image",
	"video",
	"script",
	"alert",
	"info",
	"notice",
	"help",
	"check",
	"bullet",
	"radio-off",
	"radio-on",
	"pin-l",
	"pin-b",
	"play",
	"pause",
	"seek-next",
	"seek-prev",
	"seek-end",
	"seek-first",
	"stop",
	"eject",
	"volume-off",
	"volume-on",
	"power",
	"signal-diag",
	"signal",
	"battery-0",
	"battery-1",
	"battery-2",
	"battery-3",
	"circle-plus",
	"circle-minus",
	"circle-close",
	"circle-triangle-r",
	"circle-triangle-b",
	"circle-triangle-l",
	"circle-triangle-t",
	"circle-arrow-r",
	"circle-arrow-b",
	"circle-arrow-l",
	"circle-arrow-t",
	"circle-zoomin",
	"circle-zoomout",
	"circle-check",
	"circlesmall-plus",
	"circlesmall-minus",
	"circlesmall-close",
	"squaresmall-plus",
	"squaresmall-minus",
	"squaresmall-close",
	"grip-dotted-vertical",
	"grip-dotted-horizontal",
	"grip-solid-vertical",
	"grip-solid-horizontal",
	"gripsmall-diagonal-br",
	"grip-diagonal-br",
	"loading"
};
%>

<div id="wrapper">
	<h1>Alloy - Button Demo</h1>

	<div id="demo">
		<div class="yui3-aui-layout">
			<div class="yui3-aui-column yui3-aui-w25 yui3-aui-column-first">
				<div class="yui3-aui-column-content yui3-aui-column-content-first" id="withLabel">
					<%
						for (String curIcon : allIcons) {
					%>
						<alloy:button-item icon="<%= curIcon %>" label="<%= curIcon %>" />					
					<%
						}
					%>
				</div>
			</div>

			<div class="yui3-aui-column yui3-aui-w75 yui3-aui-column-last">
				<div class="yui3-aui-column-content yui3-aui-column-content-last" id="iconOnly">
					<%
						for (String curIcon : allIcons) {
					%>
						<alloy:button-item icon="<%= curIcon %>" />					
					<%
						}
					%>
				</div>
			</div>
		</div>
	</div>
</div>