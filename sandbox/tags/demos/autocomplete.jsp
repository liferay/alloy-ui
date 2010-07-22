<%@ taglib prefix="alloy" tagdir="/WEB-INF/tags/aui" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
	<link rel="stylesheet" href="${alloy.build.path}/aui-skin-base/css/aui-skin-base-min.css" type="text/css" />
	<link rel="stylesheet" href="${alloy.build.path}/aui-skin-classic/css/custom.css" type="text/css" />

	<style type="text/css">
		body {
			padding: 10px;
		}
	</style>

	<script src="${alloy.build.path}/yui/yui-min.js" type="text/javascript"></script>
	<script src="${alloy.build.path}/aui/aui.js" type="text/javascript"></script>
</head>
<body>
	<h1>Alloy TagFiles</h1>

	<h2>- AutoComplete</h2>

	<div id="autocomplete1"></div>

	<%
	String json = "[" +
    	"['AL', 'Alabama', 'The Heart of Dixie']," +
  	    "['AK', 'Alaska', 'The Land of the Midnight Sun']," +
	    "['AZ', 'Arizona', 'The Grand Canyon State']," +
        "['AR', 'Arkansas', 'The Natural State']" +
    "]";
	%>

	<c:set var="json" value="<%= json %>" />

	<alloy:use yuiVariable="A">

		<alloy:autocomplete
			contentBox="#autocomplete1"
			dataSource="${json}"
			delimChar=","
			matchKey="name"
			render="true"
			schema="{resultFields: ['key', 'name', 'description']}"
			typeAhead="true"
		/>

	</alloy:use>

</body>
