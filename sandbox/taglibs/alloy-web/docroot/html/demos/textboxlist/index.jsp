<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />

	<style type="text/css" media="screen">
		body {
			font-size: 12px;
		}

		#wrapper {
			padding: 10px;
		}
	</style>
</head>

<body>

<%
String[][] states = new String[][] {
	new String[] {"AL", "Alabama", "The Heart of Dixie"},
    new String[] {"AK", "Alaska", "The Land of the Midnight Sun"},
    new String[] {"AZ", "Arizona", "The Grand Canyon State"},
    new String[] {"AR", "Arkansas", "The Natural State"},
    new String[] {"CA", "California", "The Golden State"},
    new String[] {"CO", "Colorado", "The Mountain State"},
    new String[] {"CT", "Connecticut", "The Constitution State"},
    new String[] {"DE", "Delaware", "The First State"},
    new String[] {"DC", "District of Columbia", "The Nation's Capital"},
    new String[] {"FL", "Florida", "The Sunshine State"},
    new String[] {"GA", "Georgia", "The Peach State"},
    new String[] {"HI", "Hawaii", "The Aloha State"},
    new String[] {"ID", "Idaho", "Famous Potatoes"},
    new String[] {"IL", "Illinois", "The Prairie State"},
    new String[] {"IN", "Indiana", "The Hospitality State"},
    new String[] {"IA", "Iowa", "The Corn State"},
    new String[] {"KS", "Kansas", "The Sunflower State"},
	new String[] {"KY", "Kentucky", "The Bluegrass State"},
    new String[] {"LA", "Louisiana", "The Bayou State"},
    new String[] {"ME", "Maine", "The Pine Tree State"},
    new String[] {"MD", "Maryland", "Chesapeake State"},
    new String[] {"MA", "Massachusetts", "The Spirit of America"},
    new String[] {"MI", "Michigan", "Great Lakes State"},
    new String[] {"MN", "Minnesota", "North Star State"},
    new String[] {"MS", "Mississippi", "Magnolia State"},
    new String[] {"MO", "Missouri", "Show Me State"},
    new String[] {"MT", "Montana", "Big Sky Country"},
    new String[] {"NE", "Nebraska", "Beef State"},
    new String[] {"NV", "Nevada", "Silver State"},
    new String[] {"NH", "New Hampshire", "Granite State"},
    new String[] {"NJ", "New Jersey", "Garden State"},
    new String[] {"NM", "New Mexico", "Land of Enchantment"},
    new String[] {"NY", "New York", "Empire State"},
    new String[] {"NC", "North Carolina", "First in Freedom"},
    new String[] {"ND", "North Dakota", "Peace Garden State"},
    new String[] {"OH", "Ohio", "The Heart of it All"},
    new String[] {"OK", "Oklahoma", "Oklahoma is OK"},
    new String[] {"OR", "Oregon", "Pacific Wonderland"},
    new String[] {"PA", "Pennsylvania", "Keystone State"},
    new String[] {"RI", "Rhode Island", "Ocean State"},
    new String[] {"SC", "South Carolina", "Nothing Could be Finer"},
    new String[] {"SD", "South Dakota", "Great Faces, Great Places"},
    new String[] {"TN", "Tennessee", "Volunteer State"},
    new String[] {"TX", "Texas", "Lone Star State"},
    new String[] {"UT", "Utah", "Salt Lake State"},
	new String[] {"AR", "Arkansas", "The Natural State"},
    new String[] {"CA", "California", "The Golden State"},
    new String[] {"CO", "Colorado", "The Mountain State"},
    new String[] {"CT", "Connecticut", "The Constitution State"},
    new String[] {"DE", "Delaware", "The First State"},
    new String[] {"DC", "District of Columbia", "The Nation's Capital"},
    new String[] {"FL", "Florida", "The Sunshine State"},
    new String[] {"GA", "Georgia", "The Peach State"},
    new String[] {"HI", "Hawaii", "The Aloha State"},
    new String[] {"ID", "Idaho", "Famous Potatoes"},
    new String[] {"IL", "Illinois", "The Prairie State"},
    new String[] {"IN", "Indiana", "The Hospitality State"},
    new String[] {"IA", "Iowa", "The Corn State"},
    new String[] {"KS", "Kansas", "The Sunflower State"},
    new String[] {"VA", "Virginia", "Mother of States"},
    new String[] {"VT", "Vermont", "Green Mountain State"},
    new String[] {"WA", "Washington", "Green Tree State"},
    new String[] {"WV", "West Virginia", "Mountain State"},
    new String[] {"WI", "Wisconsin", "America's Dairyland"},
    new String[] {"WY", "Wyoming", "Like No Place on Earth"}
};

Map<String, String[]> schema = new HashMap<String, String[]>();

schema.put("resultFields", new String[] {"key", "name", "description"});
%>

<div id="wrapper">
	<h1>Alloy - textboxlist Demo</h1>

	<h4>Start typing the name of a state (such as Alaska, California, or Maine)</h4>
	
	<alloy:textboxlist
		dataSource="<%= states %>"
		matchKey="name"
		schema="<%= schema %>"
		typeAhead="true"
		width="600"
	/>
</div>

</body>
</html>